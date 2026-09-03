;; ============================================================
;;  Information Management Expert System
;;  CLIPS Knowledge Base + Rules
;;
;;  Domain: Organizational data management practice assessment
;;  Expert: Data Governance Officer / IT Systems Administrator
;;
;;  This file contains ONLY the knowledge base (deftemplates)
;;  and the rules (defrule). Facts describing a specific
;;  organization's answers are asserted at runtime by the
;;  Python backend (see app.py / feature_extraction.py) after
;;  it reads the survey responses coming from the frontend.
;; ============================================================

;; ------------------------------------------------------------
;; 1. TEMPLATES (the shape of every fact the engine can hold)
;; ------------------------------------------------------------

;; A single extracted indicator derived from one survey answer.
;; name  = the variable being described (see knowledge_base.md)
;; value = the value the expert's heuristics assigned to it
(deftemplate indicator
   (slot name (type SYMBOL))
   (slot value (type SYMBOL)))

;; A concern raised by the rules once indicators are evaluated.
(deftemplate risk-flag
   (slot category (type SYMBOL))
   (slot severity (type SYMBOL))   ; low | moderate | high
   (slot message (type STRING)))

;; A recommendation attached to a raised risk-flag.
(deftemplate recommendation
   (slot for (type SYMBOL))
   (slot text (type STRING)))

;; The final rolled-up conclusion of the consultation.
(deftemplate overall-risk
   (slot level (type SYMBOL))      ; low | moderate | high
   (slot high-count (type INTEGER))
   (slot moderate-count (type INTEGER))
   (slot low-count (type INTEGER)))

;; ------------------------------------------------------------
;; 2. RULES — the expert's decision-making, as IF/THEN logic
;;    (mirrors rules_and_inference.md — keep both in sync)
;; ------------------------------------------------------------

(defrule r-access-control-undocumented
   "If access permissions are not clearly defined, unauthorized
    access is the single biggest exposure an organization has."
   (indicator (name access-control-documented) (value no))
   =>
   (assert (risk-flag (category access-control) (severity high)
      (message "Access control roles or permissions are not clearly documented.")))
   (assert (recommendation (for access-control)
      (text "Define and document who may access each data category and how that access is granted, e.g. role-based access control."))))

(defrule r-no-quality-checks
   "No detection process AND no automated flagging means bad data
    can circulate for a long time before anyone notices."
   (indicator (name quality-checks-defined) (value no))
   (indicator (name automated-flagging) (value no))
   =>
   (assert (risk-flag (category data-quality) (severity high)
      (message "No process or automated system detects missing, duplicated, or corrupted data.")))
   (assert (recommendation (for data-quality)
      (text "Introduce basic validation checks (duplicate detection, required-field checks) and consider automated flagging for anomalies."))))

(defrule r-partial-quality-checks
   "A manual process exists but nothing automated backs it up."
   (indicator (name quality-checks-defined) (value yes))
   (indicator (name automated-flagging) (value no))
   =>
   (assert (risk-flag (category data-quality) (severity moderate)
      (message "Data quality relies on manual review with no automated safety net.")))
   (assert (recommendation (for data-quality)
      (text "Automate at least one quality check (e.g. duplicate or format validation) to reduce reliance on manual review."))))

(defrule r-backup-rarely-or-never
   "Backups only matter when you need them; rare/none is a
    single point of failure for the whole organization."
   (indicator (name backup-frequency) (value rarely|never))
   =>
   (assert (risk-flag (category backup) (severity high)
      (message "Backups are performed rarely or not at all.")))
   (assert (recommendation (for backup)
      (text "Establish at least a weekly backup schedule and verify restorability periodically."))))

(defrule r-backup-monthly
   (indicator (name backup-frequency) (value monthly))
   =>
   (assert (risk-flag (category backup) (severity moderate)
      (message "Backups occur only monthly, leaving a wide recovery gap.")))
   (assert (recommendation (for backup)
      (text "Consider increasing backup frequency to weekly for data that changes often."))))

(defrule r-no-sensitivity-criteria
   (indicator (name sensitivity-criteria-defined) (value no))
   =>
   (assert (risk-flag (category confidentiality) (severity moderate)
      (message "There is no clear definition of what makes data confidential or sensitive.")))
   (assert (recommendation (for confidentiality)
      (text "Define concrete criteria for classifying data as confidential (e.g. personal data, financial data, credentials)."))))

(defrule r-no-conflict-resolution
   (indicator (name conflict-resolution-defined) (value no))
   =>
   (assert (risk-flag (category data-integrity) (severity moderate)
      (message "There is no defined process for resolving conflicting or mismatched records.")))
   (assert (recommendation (for data-integrity)
      (text "Establish a source-of-truth policy and an escalation path for conflicting records."))))

(defrule r-no-archiving-policy
   (indicator (name archiving-policy-defined) (value no))
   =>
   (assert (risk-flag (category lifecycle) (severity moderate)
      (message "There is no clear policy for when data is considered outdated or how it is archived.")))
   (assert (recommendation (for lifecycle)
      (text "Define a data retention/archiving schedule based on data type and regulatory requirements."))))

(defrule r-no-violation-handling
   "Undefined consequences for unauthorized access attempts is
    treated as a high-severity gap: it is the safety net for
    every other control failing."
   (indicator (name violation-handling-defined) (value no))
   =>
   (assert (risk-flag (category incident-response) (severity high)
      (message "There is no defined response for unauthorized access attempts.")))
   (assert (recommendation (for incident-response)
      (text "Define and document a response procedure for attempted unauthorized access, including logging and alerting."))))

(defrule r-no-accuracy-maintenance
   (indicator (name accuracy-maintenance-defined) (value no))
   =>
   (assert (risk-flag (category ongoing-accuracy) (severity moderate)
      (message "There is no ongoing process to keep data accurate over time.")))
   (assert (recommendation (for ongoing-accuracy)
      (text "Schedule periodic data reviews or reconciliations to catch drift before it compounds."))))

(defrule r-no-categorization
   (indicator (name categorization-defined) (value no))
   =>
   (assert (risk-flag (category categorization) (severity low)
      (message "New data is not consistently categorized when it comes in.")))
   (assert (recommendation (for categorization)
      (text "Adopt a simple, consistent categorization scheme (e.g. by department or sensitivity) applied at intake."))))

(defrule r-no-incident-example
   (indicator (name incident-example-provided) (value no))
   =>
   (assert (risk-flag (category experience) (severity low)
      (message "No concrete example of past incident handling was provided.")))
   (assert (recommendation (for experience)
      (text "Document at least one past data incident and its resolution to build institutional knowledge."))))

;; ------------------------------------------------------------
;; 3. AGGREGATION — roll up every risk-flag into one conclusion
;;    Runs last (lower salience) so every other rule has already
;;    fired and every risk-flag fact that will exist, does.
;; ------------------------------------------------------------

(defrule r-summarize
   (declare (salience -10))
   =>
   (bind ?high (length$ (find-all-facts ((?f risk-flag)) (eq ?f:severity high))))
   (bind ?moderate (length$ (find-all-facts ((?f risk-flag)) (eq ?f:severity moderate))))
   (bind ?low (length$ (find-all-facts ((?f risk-flag)) (eq ?f:severity low))))
   (if (>= ?high 2)
      then (assert (overall-risk (level high) (high-count ?high) (moderate-count ?moderate) (low-count ?low)))
      else (if (or (= ?high 1) (>= ?moderate 2))
         then (assert (overall-risk (level moderate) (high-count ?high) (moderate-count ?moderate) (low-count ?low)))
         else (assert (overall-risk (level low) (high-count ?high) (moderate-count ?moderate) (low-count ?low))))))
