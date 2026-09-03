"""
feature_extraction.py

Converts the raw answers coming from the React frontend into the
discrete indicator values the CLIPS knowledge base reasons over.

The frontend sends one entry per question:
    { "questionId": 3, "type": "textarea", "answer": "..." }

Structured questions (radio / boolean / select) map straight across.
Free-text questions (textarea / text) are reduced to a yes/no signal
using simple keyword heuristics, matching what a human triager would
look for at a glance. This keeps the CLIPS rules themselves clean,
symbolic, and readable, per the assignment's separation between
knowledge acquisition and rule definition.

See knowledge_base.md for the full mapping this file implements.
"""

from __future__ import annotations
from typing import Any


def _text(answer: Any) -> str:
    return (answer or "").strip().lower() if isinstance(answer, str) else ""


def _has_any(text: str, keywords: list[str]) -> bool:
    return any(kw in text for kw in keywords)


def _yes_if_present(answer: Any, min_length: int = 12) -> str:
    """A free-text answer counts as 'a process exists' once it's
    non-trivial in length — an empty or one-word answer means the
    respondent doesn't actually have a defined process."""
    text = _text(answer)
    return "yes" if len(text) >= min_length else "no"


def _yes_if_keywords(answer: Any, keywords: list[str], min_length: int = 12) -> str:
    text = _text(answer)
    if len(text) < min_length:
        return "no"
    return "yes" if _has_any(text, keywords) else "no"


def _symbolize(value: Any, allowed: list[str], default: str) -> str:
    if isinstance(value, str) and value.strip().lower().replace(" ", "-") in allowed:
        return value.strip().lower().replace(" ", "-")
    return default


# Question ID -> extraction rule. Each entry returns (indicator_name, value)
def extract_indicators(answers_by_id: dict[int, Any]) -> list[tuple[str, str]]:
    indicators: list[tuple[str, str]] = []

    # Q1 — Type of data (radio) — descriptive only, not a risk driver
    q1 = answers_by_id.get(1)
    data_scope_map = {
        "files": "files",
        "database records": "database-records",
        "logs": "logs",
        "reports": "reports",
        "a mix of these": "mixed",
    }
    indicators.append((
        "data-scope",
        data_scope_map.get((q1 or "").strip().lower(), "unspecified"),
    ))

    # Q2 — Categorization process defined?
    indicators.append((
        "categorization-defined",
        _yes_if_present(answers_by_id.get(2)),
    ))

    # Q3 — Access control documented?
    indicators.append((
        "access-control-documented",
        _yes_if_keywords(
            answers_by_id.get(3),
            ["role", "permission", "clearance", "admin", "restrict", "approval"],
        ),
    ))

    # Q4 — Sensitivity criteria defined?
    indicators.append((
        "sensitivity-criteria-defined",
        _yes_if_keywords(
            answers_by_id.get(4),
            ["confidential", "sensitive", "pii", "personal", "restricted", "classified"],
        ),
    ))

    # Q5 — Quality checks defined?
    indicators.append((
        "quality-checks-defined",
        _yes_if_keywords(
            answers_by_id.get(5),
            ["duplicate", "valid", "audit", "checksum", "review", "cross-check", "verify"],
        ),
    ))

    # Q6 — Conflict resolution process defined?
    indicators.append((
        "conflict-resolution-defined",
        _yes_if_keywords(
            answers_by_id.get(6),
            ["source of truth", "escalate", "verify", "reconcile", "compare"],
        ),
    ))

    # Q7 — Archiving policy defined?
    indicators.append((
        "archiving-policy-defined",
        _yes_if_keywords(
            answers_by_id.get(7),
            ["archive", "retention", "delete", "outdated", "expire"],
        ),
    ))

    # Q8 — Automated flagging system (boolean)
    q8 = answers_by_id.get(8)
    indicators.append((
        "automated-flagging",
        "yes" if q8 is True or str(q8).strip().lower() == "yes" else "no",
    ))

    # Q9 — Prioritization basis (radio) — descriptive only
    q9 = answers_by_id.get(9)
    priority_map = {
        "by deadline or urgency": "urgency",
        "by the requester's role or authority": "authority",
        "by potential impact or risk": "impact",
        "first-come, first-served": "fifo",
    }
    indicators.append((
        "prioritization-basis",
        priority_map.get((q9 or "").strip().lower(), "unspecified"),
    ))

    # Q10 — Common problem + fix described? (descriptive, low weight)
    indicators.append((
        "common-problem-resolved",
        _yes_if_present(answers_by_id.get(10)),
    ))

    # Q11 — Tools/software named? (descriptive)
    indicators.append((
        "tools-named",
        "yes" if _text(answers_by_id.get(11)) else "no",
    ))

    # Q12 — Backup frequency (select)
    indicators.append((
        "backup-frequency",
        _symbolize(
            answers_by_id.get(12),
            ["daily", "weekly", "monthly", "rarely", "never"],
            "unspecified",
        ),
    ))

    # Q13 — Violation / unauthorized access handling defined?
    indicators.append((
        "violation-handling-defined",
        _yes_if_keywords(
            answers_by_id.get(13),
            ["deny", "revoke", "alert", "log", "report", "block", "notify"],
        ),
    ))

    # Q14 — Ongoing accuracy maintenance defined?
    indicators.append((
        "accuracy-maintenance-defined",
        _yes_if_keywords(
            answers_by_id.get(14),
            ["review", "update", "reconcile", "audit", "periodic", "routine"],
        ),
    ))

    # Q15 — Concrete incident example provided?
    indicators.append((
        "incident-example-provided",
        _yes_if_present(answers_by_id.get(15), min_length=25),
    ))

    return indicators
