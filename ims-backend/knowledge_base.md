# 3. Knowledge Base

## 3.a — Structure

The knowledge base has two layers, deliberately kept separate:

1. **Extraction layer** (`feature_extraction.py`, plain Python) — every
   question in the frontend is a fixed set of preset answers (radio, select,
   or boolean — no free text anywhere), so this layer is a direct,
   deterministic lookup from the exact answer text to a discrete value.
   There is no guessing involved: the respondent's choice *is* the fact.
2. **Reasoning layer** (`clips/rules.clp`, CLIPS) — receives only the
   discrete values from layer 1 as `indicator` facts, and reasons over them
   symbolically with `defrule`.

This split mirrors how the human expert actually worked in the interview:
first they mentally categorized what they heard into a small number of
buckets, then they weighed those buckets. Constraining every question to
four preset answers just makes that categorization step explicit and
reliable instead of inferred after the fact.

## 3.b — Facts, conditions, and variables

Every "defined?" question offers the same four-tier shape: a formally
documented process, an informal-but-consistent one, an inconsistent/ad-hoc
one, or none at all. The first two map to `yes`, the last two to `no` — this
mirrors how the expert interview treated "no fixed rule" the same as "no
process," and treated "we always do it this way, it's just not written down"
as functionally equivalent to a documented policy.

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
| 11| `tools-named`                      | Q11      | database, spreadsheets, cloud-saas, mixed-tools   | Descriptive only |
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

## 3.d — Why preset answers instead of free text

An earlier version of this system accepted free text for 9 of the 15
questions and used keyword heuristics (e.g. checking for words like "role"
or "audit") to guess a yes/no fact from it. That approach had a real
failure mode: a respondent who described a genuine process in words the
heuristic didn't anticipate would be scored as having no process at all —
a false positive that has nothing to do with their actual practices.

Constraining every question to four preset, mutually exclusive answers
removes that failure mode entirely. The respondent still gets to describe
where they stand (from "formally documented" down to "not at all"), but the
system reads their choice directly instead of inferring intent from
phrasing — which is also a more faithful match to how CLIPS is meant to be
used: reasoning over clean symbolic facts, not parsing prose.
