# Information Management Expert System — Backend

CLIPS-based inference engine (via `clipspy`) behind a small, stateless
Flask API. No database — every request is a self-contained
answers-in / conclusion-out cycle.

## Contents

```
domain_and_expert.md      Grading criterion 1 — domain & expert
expert_interview.md        Grading criterion 2 — interview Q&A + what was extracted
knowledge_base.md          Grading criterion 3 — facts, conditions, variables
rules_and_inference.md     Grading criterion 4 — IF/THEN rules + inference process description
clips/rules.clp            The actual CLIPS knowledge base + rules (criterion 5)
feature_extraction.py       Converts raw survey answers into CLIPS indicator facts
app.py                      Flask API (POST /assess) wrapping the CLIPS engine
tests/sample_inputs.json    Three sample organization profiles (low/moderate/high risk)
tests/test_runner.py        Runs the samples through the engine and prints the result (criterion 6)
requirements.txt
```

## Setup

```bash
cd ims-backend
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Run the demo / evaluation

This is the fastest way to see the system reason end-to-end, no server
needed:

```bash
python tests/test_runner.py
```

This prints, for each of the three sample profiles, the overall risk level,
every risk flag raised (with severity and message), every recommendation,
and the descriptive context — exactly the output to capture for the
"Testing and Evaluation" section of your report.

## Run the API server

```bash
python app.py
```

Starts on `http://localhost:5000`.

- `GET /health` → `{"status": "ok"}`
- `POST /assess` — body:
  ```json
  {
    "answers": [
      { "questionId": 1, "answer": "Database records" },
      { "questionId": 8, "answer": true },
      { "questionId": 12, "answer": "Weekly" }
    ]
  }
  ```
  Any subset of the 15 question IDs may be sent; missing ones are treated as
  unanswered (`no` / `unspecified`). Returns `overall_risk`, `risk_flags`,
  `recommendations`, and `descriptive`.

## Wiring up the frontend

The frontend's `Review.tsx` already reduces all answers to exactly the shape
this API expects. Where `Submit Assessment` currently just sets local
`submitted` state, replace it with:

```ts
const res = await fetch("http://localhost:5000/assess", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    answers: questions.map((q) => ({
      questionId: q.id,
      answer: answers[q.id],
    })),
  }),
});
const result = await res.json();
setSubmitted(true);
// store `result` in context/state if you want to show it later
```

Per the original assignment brief, the assessment-taking UI itself should
stay result-free ("ASSESSMENT COMPLETED — your responses have been
recorded"). If you want to *see* the reasoning for your own
demo/presentation, add a separate admin-only view (or just call `/assess`
directly with `curl`/Postman) rather than showing it on the participant-facing
Review page.
