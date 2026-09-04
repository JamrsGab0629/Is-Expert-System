"""
feature_extraction.py

Converts the raw answers coming from the React frontend into the
discrete indicator values the CLIPS knowledge base reasons over.

Every question in the frontend is now a fixed set of preset choices
(radio / select / boolean) rather than free text, so this file is a
direct, deterministic lookup from the exact answer text to a value —
no keyword guessing, no heuristics, no ambiguity. See
knowledge_base.md for the full mapping this file implements.
"""

from __future__ import annotations
from typing import Any


def _lookup(answer: Any, mapping: dict[str, str], default: str) -> str:
    if isinstance(answer, str) and answer in mapping:
        return mapping[answer]
    return default


# --- Q2: Data Categorization -------------------------------------------------
CATEGORIZATION_MAP = {
    "Yes — a documented categorization scheme (e.g. by department, type, or sensitivity)": "yes",
    "Yes — an informal but consistent habit for categorizing new data": "yes",
    "Not really — it's inconsistent and depends on who handles it": "no",
    "No — new data isn't categorized at all": "no",
}

# --- Q3: Access Control ------------------------------------------------------
ACCESS_CONTROL_MAP = {
    "Yes — formal role-based access with an approval process": "yes",
    "Yes — informal restrictions that people generally follow": "yes",
    "Not really — access isn't clearly restricted": "no",
    "No — anyone can access any data": "no",
}

# --- Q4: Sensitivity Criteria -------------------------------------------------
SENSITIVITY_MAP = {
    "Yes — clear written criteria for what counts as confidential or sensitive": "yes",
    "Yes — an informal shared understanding, just not written down": "yes",
    "Not really — it's subjective and varies by person": "no",
    "No — we don't distinguish sensitive data from anything else": "no",
}

# --- Q5: Data Quality Checks --------------------------------------------------
QUALITY_CHECKS_MAP = {
    "Yes — regular checks such as validation or duplicate detection": "yes",
    "Yes — manual spot-checks when something seems off": "yes",
    "Rarely — only if a problem becomes obvious on its own": "no",
    "No — we don't check for this": "no",
}

# --- Q6: Conflict Resolution --------------------------------------------------
CONFLICT_RESOLUTION_MAP = {
    "Yes — a defined source-of-truth and escalation process": "yes",
    "Yes — we resolve it case-by-case, informally": "yes",
    "Rarely — conflicts often sit unresolved for a while": "no",
    "No — we don't have a way to resolve this": "no",
}

# --- Q7: Data Lifecycle -------------------------------------------------------
ARCHIVING_MAP = {
    "Yes — a documented retention or archiving policy": "yes",
    "Yes — an informal but consistent practice": "yes",
    "Not really — we clean up occasionally with no fixed rule": "no",
    "No — outdated data just stays indefinitely": "no",
}

# --- Q10: Common Problems (descriptive only — no rule currently uses this) ---
COMMON_PROBLEM_MAP = {
    "Yes — we have a consistent fix for our most common issue": "yes",
    "Somewhat — we patch it each time but not systematically": "yes",
    "Not really — the same issue keeps recurring without a real fix": "no",
    "We don't experience recurring problems": "yes",
}

# --- Q11: Tools & Software (descriptive only) ---------------------------------
TOOLS_MAP = {
    "A dedicated database system (e.g. SQL/PostgreSQL/MySQL)": "database",
    "Spreadsheets (e.g. Excel or Google Sheets)": "spreadsheets",
    "Cloud storage or SaaS platforms": "cloud-saas",
    "A mix of multiple tools": "mixed-tools",
}

# --- Q13: Unauthorized Access -------------------------------------------------
VIOLATION_HANDLING_MAP = {
    "Yes — access is denied, logged, and an alert is sent": "yes",
    "Yes — it's typically denied, just not formally logged or alerted": "yes",
    "Not really — it depends on whether anyone notices": "no",
    "No — there's no real response to this": "no",
}

# --- Q14: Ongoing Accuracy ----------------------------------------------------
ACCURACY_MAP = {
    "Yes — scheduled reviews or reconciliations": "yes",
    "Yes — we check informally every so often": "yes",
    "Rarely — only if something looks obviously wrong": "no",
    "No — we don't have an ongoing process for this": "no",
}

# --- Q15: Case Example --------------------------------------------------------
INCIDENT_EXAMPLE_MAP = {
    "Yes — we resolved a significant data incident and documented what we did": "yes",
    "Yes — we've handled a smaller issue, nothing major": "yes",
    "Not that I can recall": "no",
    "No, we haven't had to deal with this": "no",
}

# --- Q1: Type of Data (descriptive only) --------------------------------------
DATA_SCOPE_MAP = {
    "files": "files",
    "database records": "database-records",
    "logs": "logs",
    "reports": "reports",
    "a mix of these": "mixed",
}

# --- Q9: Task Prioritization (descriptive only) -------------------------------
PRIORITY_MAP = {
    "by deadline or urgency": "urgency",
    "by the requester's role or authority": "authority",
    "by potential impact or risk": "impact",
    "first-come, first-served": "fifo",
}

# --- Q12: Backup Frequency ----------------------------------------------------
BACKUP_MAP = {
    "daily": "daily",
    "weekly": "weekly",
    "monthly": "monthly",
    "rarely": "rarely",
    "never": "never",
}


def extract_indicators(answers_by_id: dict[int, Any]) -> list[tuple[str, str]]:
    indicators: list[tuple[str, str]] = []

    q1 = answers_by_id.get(1)
    indicators.append((
        "data-scope",
        DATA_SCOPE_MAP.get((q1 or "").strip().lower(), "unspecified"),
    ))

    indicators.append(("categorization-defined", _lookup(answers_by_id.get(2), CATEGORIZATION_MAP, "no")))
    indicators.append(("access-control-documented", _lookup(answers_by_id.get(3), ACCESS_CONTROL_MAP, "no")))
    indicators.append(("sensitivity-criteria-defined", _lookup(answers_by_id.get(4), SENSITIVITY_MAP, "no")))
    indicators.append(("quality-checks-defined", _lookup(answers_by_id.get(5), QUALITY_CHECKS_MAP, "no")))
    indicators.append(("conflict-resolution-defined", _lookup(answers_by_id.get(6), CONFLICT_RESOLUTION_MAP, "no")))
    indicators.append(("archiving-policy-defined", _lookup(answers_by_id.get(7), ARCHIVING_MAP, "no")))

    q8 = answers_by_id.get(8)
    indicators.append((
        "automated-flagging",
        "yes" if q8 is True or str(q8).strip().lower() == "yes" else "no",
    ))

    q9 = answers_by_id.get(9)
    indicators.append((
        "prioritization-basis",
        PRIORITY_MAP.get((q9 or "").strip().lower(), "unspecified"),
    ))

    indicators.append(("common-problem-resolved", _lookup(answers_by_id.get(10), COMMON_PROBLEM_MAP, "no")))
    indicators.append(("tools-named", _lookup(answers_by_id.get(11), TOOLS_MAP, "unspecified")))

    q12 = answers_by_id.get(12)
    indicators.append((
        "backup-frequency",
        BACKUP_MAP.get((q12 or "").strip().lower(), "unspecified"),
    ))

    indicators.append(("violation-handling-defined", _lookup(answers_by_id.get(13), VIOLATION_HANDLING_MAP, "no")))
    indicators.append(("accuracy-maintenance-defined", _lookup(answers_by_id.get(14), ACCURACY_MAP, "no")))
    indicators.append(("incident-example-provided", _lookup(answers_by_id.get(15), INCIDENT_EXAMPLE_MAP, "no")))

    return indicators
