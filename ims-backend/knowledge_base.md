# 3. Knowledge Base

## 3.a — Structure

The knowledge base has two layers, deliberately kept separate:

1. **Extraction layer** (`feature_extraction.py`, plain Python) — turns each
   raw survey answer into one of a small set of discrete values. Structured
   questions (radio/boolean/select) map directly; free-text questions are
   reduced with keyword heuristics, since the expert's real decision
   criterion was never "what exact words did they use" but "does a real
   process exist or not."
2. **Reasoning layer** (`clips/rules.clp`, CLIPS) — receives only the
   discrete values from layer 1 as `indicator` facts, and reasons over them
   symbolically with `defrule`. CLIPS never touches raw text.

This split mirrors how the human expert actually worked in the interview:
first they mentally categorized what they heard, then they weighed it.

## 3.b — Facts, conditions, and variables

| # | Variable (indicator name)         | Source Q | Possible values                                  | Role in reasoning |
|---|------------------------------------|----------|---------------------------------------------------|--------------------|
| 1 | `data-scope`                       | Q1       | files, database-records, logs, reports, mixed     | Descriptive only |
| 2 | `categorization-defined`           | Q2       | yes, no                                           | Low-severity risk driver |
| 3 | `access-control-documented`        | Q3       | yes, no                                           | High-severity risk driver |
| 4 | `sensitivity-criteria-defined`     | Q4       | yes, no                                           | Moderate-severity risk driver |
| 5 | `quality-checks-defined`           | Q5       | yes, no                                           | Combines with #8 |
| 6 | `conflict-resolution-defined`      | Q6       | yes, no                                           | Moderate-severity risk driver |
| 7 | `archiving-policy-defined`         | Q7       | yes, no                                           | Moderate-severity risk driver |
| 8 | `automated-flagging`               | Q8       | yes, no                                           | Combines with #5 |
| 9 | `prioritization-basis`             | Q9       | urgency, authority, impact, fifo                  | Descriptive only |
| 10| `common-problem-resolved`          | Q10      | yes, no                                           | Descriptive only |
| 11| `tools-named`                      | Q11      | yes, no                                           | Descriptive only |
| 12| `backup-frequency`                 | Q12      | daily, weekly, monthly, rarely, never             | High/moderate risk driver |
| 13| `violation-handling-defined`       | Q13      | yes, no                                           | High-severity risk driver |
| 14| `accuracy-maintenance-defined`     | Q14      | yes, no                                           | Moderate-severity risk driver |
| 15| `incident-example-provided`        | Q15      | yes, no                                           | Low-severity risk driver |

## 3.c — Conclusions the system can produce

- **`risk-flag`** facts — one per gap identified, each carrying a
  `category`, a `severity` (`low` / `moderate` / `high`), and a
  human-readable `message`.
- **`recommendation`** facts — one per `risk-flag`, a concrete suggested
  action.
- **`overall-risk`** fact — the single rolled-up conclusion
  (`low` / `moderate` / `high`), plus the count of flags at each severity
  that produced it (see Section 4 for how the rollup rule decides this).

## 3.d — Why keyword heuristics for free-text answers

A real deployment would eventually want NLP/ML for this step. For a
15-question assessment scored per-submission with no training data, keyword
presence over a sufficiently long answer is a defensible, transparent proxy
for "a real process was described" — and keeps the actual expert-system part
(the CLIPS rules) focused on symbolic reasoning, which is what this
assignment is evaluating.
