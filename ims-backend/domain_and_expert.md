# 1. Domain and Expert Definition

## 1.a — Domain and problem

**Domain:** Organizational information/data management practice assessment.

**Problem:** Small and mid-sized organizations rarely have a formal data
governance audit. Instead, an experienced IT systems administrator or data
governance officer can usually tell — after a short conversation — whether an
organization's data-handling practices carry meaningful operational risk
(unauthorized access, data corruption going unnoticed, unrecoverable data
loss, inconsistent records). This project encodes that quick expert judgment
into a rule-based expert system: an organization answers a structured set of
questions about its current practices, and the system reproduces the kind of
risk assessment and recommendations a human expert would give after hearing
the same answers.

This is a good fit for an expert-system approach because:
- The expert's reasoning is genuinely rule-based ("if there's no documented
  access policy, that's the highest-priority gap") rather than requiring
  statistical inference over large data.
- The knowledge is elicitable through a structured interview (Section 2).
- The conclusion is explainable: every flagged risk traces back to one
  specific rule and one specific answer.

## 1.b — Subject-matter expert

**Role simulated:** Data Governance Officer / IT Systems Administrator —
someone who regularly audits how a department or small company handles data,
and gives recommendations on access control, backups, and data quality
practices.

> **Note on this submission:** the interview in `expert_interview.md` is
> written as a **template populated with representative, industry-standard
> answers** so that every downstream artifact (knowledge base, rules, CLIPS
> code) could be built and tested end-to-end. For your own submission, this
> is the file to replace: interview an actual IT administrator, data
> governance contact, or similarly experienced person at your school/company
> using the same 15 questions, and swap in **their real answers**. Because
> the questions and the knowledge base structure stay the same, doing so
> does not require touching the CLIPS rules or the backend — only
> `expert_interview.md` (and, if their answers reveal genuinely different
> decision criteria, the extraction keywords in `feature_extraction.py` and
> the thresholds in `rules.clp`).
