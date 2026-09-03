# 4. Rules and Inference Process

## 4.a — The expert's decision-making, as IF/THEN rules

These are written here in plain English first; the CLIPS syntax in
`clips/rules.clp` is a direct, line-for-line translation of this list.

1. **IF** access control is not documented
   **THEN** raise a HIGH risk flag (`access-control`) and recommend defining
   role-based access.

2. **IF** no quality checks are defined **AND** no automated flagging exists
   **THEN** raise a HIGH risk flag (`data-quality`).
   **IF** quality checks are defined but automated flagging does not
   **THEN** raise a MODERATE risk flag (`data-quality`) instead — a
   documented manual process is a real mitigation, just not a sufficient one.

3. **IF** backups happen rarely or never
   **THEN** raise a HIGH risk flag (`backup`).
   **IF** backups happen only monthly
   **THEN** raise a MODERATE risk flag (`backup`) instead.

4. **IF** sensitivity/confidentiality criteria are not defined
   **THEN** raise a MODERATE risk flag (`confidentiality`).

5. **IF** there is no conflict-resolution process for mismatched records
   **THEN** raise a MODERATE risk flag (`data-integrity`).

6. **IF** there is no archiving/retention policy
   **THEN** raise a MODERATE risk flag (`lifecycle`).

7. **IF** there is no defined response to unauthorized access attempts
   **THEN** raise a HIGH risk flag (`incident-response`).

8. **IF** there is no ongoing accuracy-maintenance process
   **THEN** raise a MODERATE risk flag (`ongoing-accuracy`).

9. **IF** new data is not consistently categorized
   **THEN** raise a LOW risk flag (`categorization`).

10. **IF** no concrete past-incident example was given
    **THEN** raise a LOW risk flag (`experience`).

11. **(Rollup)** **IF** two or more HIGH flags were raised
    **THEN** the overall risk level is HIGH.
    **ELSE IF** exactly one HIGH flag, or two or more MODERATE flags, were
    raised **THEN** the overall risk level is MODERATE.
    **ELSE** the overall risk level is LOW.

Every recommendation is attached 1:1 to the rule that raised its risk flag,
so the system's output is always traceable back to a specific answer.

## 4.b — Why access control, data quality, backups, and incident response
are the four "HIGH" categories

This mirrors what came out of the interview (Section 2.c): these four are
the practice areas where a gap doesn't just create inconvenience, it creates
an unrecoverable failure mode — data permanently lost, a breach that goes
unnoticed, or bad data silently propagating. The other five areas
(confidentiality definitions, conflict resolution, archiving, ongoing
accuracy, categorization) are real but recoverable gaps, so they are
weighted as MODERATE or LOW.

## 4.c — Inference process used by the system

The system uses **CLIPS's default inference strategy: forward chaining with
pattern matching (the Rete algorithm)**, working from facts toward
conclusions:

1. The Python backend asserts one `indicator` fact per extracted variable
   (Section 3.b) into a freshly reset CLIPS environment.
2. CLIPS's Rete network matches every `defrule`'s left-hand side (its
   pattern conditions) against the current fact base. Whenever a rule's
   conditions are fully satisfied, that rule is placed on the **agenda**
   (CLIPS's list of rules that are ready to fire).
3. `(env.run())` fires agenda rules one at a time. Firing a rule executes
   its right-hand side — here, `assert`ing new `risk-flag` and
   `recommendation` facts. Newly asserted facts can themselves make further
   rules eligible to fire (this is what makes it *forward* chaining: the
   engine works from known facts toward new conclusions, never the reverse).
4. Rules 1–10 above all have equal, default salience (priority) and can fire
   in any order relative to each other since none of them depend on another
   rule's output — they only ever match on the original `indicator` facts.
5. The rollup rule (`r-summarize`) is given a lower salience
   (`(declare (salience -10))`), which guarantees it fires **last**, after
   every possible `risk-flag` has already been asserted. It counts flags by
   severity with `find-all-facts` and asserts the single `overall-risk`
   conclusion fact.
6. Once no more rules are eligible to fire, `run()` returns. The backend
   reads every `risk-flag`, `recommendation`, and the `overall-risk` fact
   out of the (now static) fact base and returns them as the API response.

Because every conclusion is a fact with a named category and a message
tied directly to one rule, the reasoning is fully explainable after the
fact — nothing is a black box.
