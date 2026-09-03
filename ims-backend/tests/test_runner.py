"""
test_runner.py

Demonstration / evaluation script for the "Testing and Presentation"
grading criterion. Runs three representative organization profiles
(low, moderate, high risk) through the CLIPS inference engine directly
(no HTTP layer needed) and prints the conclusion for each, so the
behaviour can be captured for the report.

Run with:  python tests/test_runner.py
"""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import run_inference  # noqa: E402


def load_samples() -> dict:
    path = os.path.join(os.path.dirname(__file__), "sample_inputs.json")
    with open(path) as f:
        raw = json.load(f)
    # JSON object keys are strings; the pipeline expects int question IDs.
    return {
        profile: {int(qid): answer for qid, answer in answers.items()}
        for profile, answers in raw.items()
    }


def print_result(profile_name: str, result: dict) -> None:
    print(f"\n{'=' * 60}")
    print(f"PROFILE: {profile_name}")
    print(f"{'=' * 60}")
    overall = result["overall_risk"]
    print(f"Overall risk level : {overall['level'].upper()}")
    print(f"High / Moderate / Low flags : "
          f"{overall['high_count']} / {overall['moderate_count']} / {overall['low_count']}")

    if result["risk_flags"]:
        print("\nRisk flags raised:")
        for flag in result["risk_flags"]:
            print(f"  - [{flag['severity'].upper():8}] {flag['category']}: {flag['message']}")
    else:
        print("\nNo risk flags raised.")

    if result["recommendations"]:
        print("\nRecommendations:")
        for rec in result["recommendations"]:
            print(f"  - ({rec['for']}) {rec['text']}")

    print("\nDescriptive context:")
    for key, value in result["descriptive"].items():
        print(f"  - {key}: {value}")


def main():
    samples = load_samples()
    for profile_name, answers in samples.items():
        result = run_inference(answers)
        print_result(profile_name, result)


if __name__ == "__main__":
    main()
