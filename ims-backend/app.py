"""
app.py

Stateless Flask API for the Information Management Expert System.
No database — every request is a self-contained request/response
cycle: receive answers -> extract indicators -> assert CLIPS facts
-> run inference -> return the conclusion. The CLIPS environment is
reset (not recreated) between requests for efficiency; reset()
clears all facts but keeps the loaded deftemplates/defrules.

Run with:  python app.py
Then POST answers to:  http://localhost:5000/assess
"""

from __future__ import annotations
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import clips

from feature_extraction import extract_indicators

RULES_PATH = os.path.join(os.path.dirname(__file__), "clips", "rules.clp")

app = Flask(__name__)
CORS(app)  # allow the Vite dev server (different origin/port) to call this API

# Load the knowledge base + rules once; reset (not reload) per request.
env = clips.Environment()
env.load(RULES_PATH)


def _quote(value: str) -> str:
    """Escape a value for safe embedding in a CLIPS assert string."""
    return value.replace('"', '\\"')


def run_inference(answers_by_id: dict[int, object]) -> dict:
    env.reset()

    indicators = extract_indicators(answers_by_id)
    for name, value in indicators:
        env.assert_string(f"(indicator (name {name}) (value {value}))")

    env.run()

    risk_flags = []
    recommendations = []
    overall = {"level": "low", "high_count": 0, "moderate_count": 0, "low_count": 0}
    descriptive = {}

    for fact in env.facts():
        tmpl = fact.template.name
        if tmpl == "risk-flag":
            risk_flags.append({
                "category": str(fact["category"]),
                "severity": str(fact["severity"]),
                "message": str(fact["message"]),
            })
        elif tmpl == "recommendation":
            recommendations.append({
                "for": str(fact["for"]),
                "text": str(fact["text"]),
            })
        elif tmpl == "overall-risk":
            overall = {
                "level": str(fact["level"]),
                "high_count": int(fact["high-count"]),
                "moderate_count": int(fact["moderate-count"]),
                "low_count": int(fact["low-count"]),
            }
        elif tmpl == "indicator":
            name = str(fact["name"])
            if name in ("data-scope", "prioritization-basis", "backup-frequency"):
                descriptive[name] = str(fact["value"])

    return {
        "overall_risk": overall,
        "risk_flags": risk_flags,
        "recommendations": recommendations,
        "descriptive": descriptive,
    }


@app.route("/assess", methods=["POST"])
def assess():
    """
    Expected request body (matches what the frontend's Review page
    already holds):

    {
      "answers": [
        { "questionId": 1, "type": "radio", "answer": "Database records" },
        { "questionId": 8, "type": "boolean", "answer": true },
        ...
      ]
    }
    """
    body = request.get_json(silent=True) or {}
    answers = body.get("answers")

    if not isinstance(answers, list):
        return jsonify({"error": "Expected a JSON body with an 'answers' array."}), 400

    answers_by_id = {}
    for entry in answers:
        if not isinstance(entry, dict) or "questionId" not in entry:
            continue
        answers_by_id[int(entry["questionId"])] = entry.get("answer")

    result = run_inference(answers_by_id)
    return jsonify(result)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
