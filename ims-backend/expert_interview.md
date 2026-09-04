# 2. Expert Interview

> **Important:** the answers below are a representative, industry-standard
> template — written to make every subsequent artifact in this project
> (knowledge base, rules, CLIPS code, tests) buildable and testable end to
> end. They are **not a transcript of a real interview**. For your actual
> submission, conduct the interview with a real subject-matter expert and
> replace the answers in this file with what they actually told you — see
> the note at the end of `domain_and_expert.md`.

## 2.a — Interview questions

These are the same 15 questions already implemented in the assessment
frontend, so that a real interviewee's answers can be collected either on
paper or directly through the app.

1. What kind of data do you usually handle at work?
2. How do you decide where to put or how to categorize new data that comes in?
3. Who is allowed to access each type of data, and how do you control that?
4. What makes a piece of data "confidential" or sensitive?
5. How do you know if data is missing, duplicated, or corrupted?
6. What do you do if two records don't match or conflict with each other?
7. When do you consider data as "outdated," and how do you archive it?
8. Do you have any automated system that flags invalid or suspicious data?
9. How do you decide which task or request to prioritize first if there are many at once?
10. What's the most common problem you experience in managing data, and how do you usually fix it?
11. What tools or software do you use to store and manage data?
12. How often do you back up data, and why is that important?
13. What happens if someone tries to access data they're not supposed to see?
14. How do you make sure data stays accurate over time?
15. Can you give an example of a time you had to fix a big data problem? What did you do?

## 2.b — Template answers (used to build/test this project)

1. **Data types:** Mostly database records — customer and transaction data —
   plus some log files and periodic reports.
2. **Categorization:** New data is filed by department and tagged with a
   data owner as soon as it arrives.
3. **Access control:** Access is role-based; only admins and the assigned
   department can view records, and only after manager approval.
4. **Sensitivity:** Anything containing personal information, financial
   data, or credentials is treated as confidential.
5. **Quality checks:** We run duplicate checks and validation scripts on a
   schedule and audit a sample manually.
6. **Conflict resolution:** We reconcile against the source-of-truth system
   and escalate to the data owner if the conflict persists.
7. **Archiving:** Data older than two years with no access activity is
   archived according to our retention policy.
8. **Automated flagging:** Yes — anomaly detection runs on ingestion.
9. **Prioritization:** By potential impact or risk — a request that touches
   customer-facing systems jumps the queue.
10. **Common problem:** Mismatched customer IDs after a batch import; fixed
    by re-running the sync job and manually verifying edge cases.
11. **Tools:** PostgreSQL, an internal admin dashboard, and cloud backups.
12. **Backup frequency:** Weekly, because a full week of transactions is the
    most we're willing to risk losing.
13. **Unauthorized access:** The attempt is denied, logged, and an alert is
    sent to the security channel.
14. **Ongoing accuracy:** Quarterly reconciliation and periodic audits
    against source systems.
15. **Past incident:** A batch import once duplicated several thousand
    customer records. The team wrote a de-duplication script, restored the
    affected table from backup, and added a validation step to the import
    pipeline so it couldn't happen the same way again.

## 2.c — What was extracted from this interview

Reading across these answers, the same shape of judgment repeats: for every
practice area (access, quality, backups, conflict handling, archiving,
incident response, ongoing accuracy), the expert is really answering one
underlying question — **"is there a defined, repeatable process for this, or
is it ad hoc / absent?"** — and treating a small number of those areas
(access control, data quality + automated flagging, backups, incident
response) as materially more urgent than the rest. That distinction between
"high-urgency gap" and "moderate-urgency gap" is exactly what became the
severity levels in the knowledge base and rules (Sections 3–4).

## 2.d — Note on answer format

The frontend originally collected answers 2–7, 10, 11, and 13–15 as free
text. They were later converted to four preset choices per question (see
`knowledge_base.md` §3.d) once testing showed free-text answers were too
easy to mis-read with keyword matching. The template answers in §2.b above
still describe the underlying situation in prose; when actually run through
the app, each of those would be selected as the closest matching preset
option (e.g. "Access is role-based; only admins... after manager approval"
→ *"Yes — formal role-based access with an approval process"*).
