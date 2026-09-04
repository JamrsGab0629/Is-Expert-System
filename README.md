# NIST Sources for the Information Management Expert System

## Purpose

This folder contains the professional reference sources used to support the
knowledge and rules of the Information Management Expert System.

The expert system evaluates organizational data-management practices and
produces risk levels and recommendations using CLIPS rules.

These sources are **supporting references**. They do not replace the required
real-world expert interview. The interview provides the subject-matter expert's
judgment, while NIST publications provide professional evidence and terminology
that can be used to justify the knowledge areas and practices.

---

## Primary NIST Source

### NIST Research Data Framework (RDaF)

**NIST Research Data Framework (RDaF) 2.0**

https://www.nist.gov/programs-projects/research-data-framework-rdaf

Full publication:

https://nvlpubs.nist.gov/nistpubs/SpecialPublications/1500-18/NIST.SP.1500-18r2.html

The RDaF provides a framework for managing data throughout its lifecycle and
covers topics such as data quality, data governance, data security, data
organization, preservation, and disposition.

This is the main NIST reference for the information-management portions of the
system.

---

## Additional NIST Sources

### 1. Data Classification

**NIST SP 1800-39 — Data Classification Practices**

https://csrc.nist.gov/pubs/sp/1800/39/ipd

Relevant to:

- Q2 — Data categorization
- Q4 — Confidential or sensitive data

It supports the concepts of discovering, identifying, labeling, and protecting
data according to its characteristics and sensitivity.

### 2. Access Control

**NIST IR 7316 — Assessment of Access Control Systems**

https://csrc.nist.gov/pubs/ir/7316/final

Relevant to:

- Q3 — Access control

It provides professional guidance concerning authorization and access-control
systems.

### 3. Data Confidentiality and Unauthorized Access

**NIST SP 1800-29 — Data Confidentiality: Detect, Respond to, and Recover from
Data Breaches**

https://csrc.nist.gov/pubs/sp/1800/29/final

Relevant to:

- Q4 — Sensitive data
- Q13 — Unauthorized access
- Q15 — Data incidents

This source is useful for supporting the importance of detecting, responding to,
and recovering from data-confidentiality incidents.

### 4. Data Integrity

**NIST Research Data Framework (RDaF)**

https://www.nist.gov/programs-projects/research-data-framework-rdaf

Relevant to:

- Q5 — Data quality
- Q6 — Conflicting records
- Q14 — Ongoing accuracy

The framework discusses data quality and integrity throughout the data
lifecycle.

### 5. Data Quality

**NIST Quality Data for RESTful Services**

https://www.nist.gov/itl/health-it-testing-infrastructure/testing-tools/qdar-quality-data-rest

Relevant to:

- Q5 — Missing, duplicated, or corrupted data
- Q8 — Automated flagging/validation
- Q14 — Maintaining accuracy

NIST discusses data-quality characteristics and validation-related practices.

### 6. Backup and Recovery

**NIST OT Backup Quick Start Guide**

https://www.nist.gov/publications/ot-backup-quick-start-guide

Relevant to:

- Q12 — Backup frequency

The guide discusses regular backups, testing backups, and recovery
considerations.

---

## Question-to-Source Mapping

| Question | Topic | Main NIST Support |
|---|---|---|
| Q1 | Type of data | RDaF |
| Q2 | Data categorization | RDaF / SP 1800-39 |
| Q3 | Access control | NIST IR 7316 |
| Q4 | Sensitive data | SP 1800-39 / SP 1800-29 |
| Q5 | Data quality checks | RDaF / NIST quality guidance |
| Q6 | Conflicting records | RDaF — data integrity |
| Q7 | Archiving / retention | RDaF — data lifecycle |
| Q8 | Automated validation/flagging | RDaF / NIST quality guidance |
| Q9 | Task prioritization | Primarily expert-derived |
| Q10 | Common data problems | Primarily expert-derived |
| Q11 | Tools/software | Primarily descriptive |
| Q12 | Backups | NIST backup/recovery guidance |
| Q13 | Unauthorized access | SP 1800-29 / NIST access-control guidance |
| Q14 | Ongoing accuracy | RDaF / data-quality guidance |
| Q15 | Past incident | SP 1800-29 |

---

## Relationship to the CLIPS Knowledge Base

The NIST sources support the **domain knowledge and importance of the
practices**, while the CLIPS rules encode the expert system's actual decision
logic.

For example:

```text
NIST guidance
     ↓
Professional data-management practice
     ↓
Expert interview / expert judgment
     ↓
Knowledge extracted from answer
     ↓
Indicator
     ↓
CLIPS IF/THEN rule
     ↓
Risk flag + recommendation
```

Example:

```text
Question:
How do you control access to data?

        ↓

Indicator:
access-control-documented = no

        ↓

CLIPS:
IF access-control-documented = no
THEN high access-control risk

        ↓

Recommendation:
Define and document access permissions.
```

---

## Important Note About Severity

NIST should **not** be cited as saying that the exact severity levels in this
system are mandatory.

The system's:

- `low`
- `moderate`
- `high`

severity classifications are part of the expert system's own decision model.

The real expert interview should provide the expert's reasoning for why a
practice is considered low, moderate, or high priority.

NIST is used to support why the underlying practice is important.

---

## Important Note About the Expert Interview

The project's template answers are not a substitute for an actual interview.

For the final submission:

1. Interview a qualified software/data/IT professional.
2. Record the expert's actual answers.
3. Replace the template answers with the real responses.
4. Extract indicators from the responses.
5. Verify that the four preset choices accurately represent the expert's
   answers.
6. Update the CLIPS rules if the expert's reasoning differs from the current
   rules.
7. Use NIST sources as supporting professional references.

A software engineer with relevant experience in databases, applications,
security, data validation, backups, or information management can be an
appropriate interview subject, provided their experience is relevant to the
questions.

---

## Suggested Citation Statement for the Project

> The knowledge areas and data-management practices considered by the expert
> system were informed by NIST publications, particularly the NIST Research
> Data Framework (RDaF), together with knowledge acquired from a subject-matter
> expert interview. NIST publications were used as supporting professional
> references, while the expert interview was used to establish the expert
> system's decision criteria and severity judgments.

---

## Files / References

The project can keep this README together with:

- `rules.clp` — CLIPS knowledge base and inference rules
- `feature_extraction.py` — converts survey answers into indicators
- `app.py` — Flask API that sends indicators to CLIPS
- `questions.*` — frontend questionnaire definitions
- `knowledge_base.md` — extracted expert knowledge
- `rules_and_inference.md` — explanation of the decision rules
- `README_NIST.md` — this NIST reference document
