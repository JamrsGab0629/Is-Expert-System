export type QuestionType = "select" | "radio" | "boolean" | "text" | "textarea";

export interface Question {
  id: number;
  title: string;
  prompt: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    title: "Type of Data",
    prompt: "What kind of data do you usually handle at work?",
    type: "radio",
    options: ["Files", "Database records", "Logs", "Reports", "A mix of these"],
  },
  {
    id: 2,
    title: "Data Categorization",
    prompt: "How do you decide where to put or how to categorize new data that comes in?",
    type: "radio",
    options: [
      "Yes — a documented categorization scheme (e.g. by department, type, or sensitivity)",
      "Yes — an informal but consistent habit for categorizing new data",
      "Not really — it's inconsistent and depends on who handles it",
      "No — new data isn't categorized at all",
    ],
  },
  {
    id: 3,
    title: "Access Control",
    prompt: "Who is allowed to access each type of data, and how do you control that?",
    type: "radio",
    options: [
      "Yes — formal role-based access with an approval process",
      "Yes — informal restrictions that people generally follow",
      "Not really — access isn't clearly restricted",
      "No — anyone can access any data",
    ],
  },
  {
    id: 4,
    title: "Sensitivity Criteria",
    prompt: "What makes a piece of data \"confidential\" or sensitive?",
    type: "radio",
    options: [
      "Yes — clear written criteria for what counts as confidential or sensitive",
      "Yes — an informal shared understanding, just not written down",
      "Not really — it's subjective and varies by person",
      "No — we don't distinguish sensitive data from anything else",
    ],
  },
  {
    id: 5,
    title: "Data Quality Checks",
    prompt: "How do you know if data is missing, duplicated, or corrupted?",
    type: "radio",
    options: [
      "Yes — regular checks such as validation or duplicate detection",
      "Yes — manual spot-checks when something seems off",
      "Rarely — only if a problem becomes obvious on its own",
      "No — we don't check for this",
    ],
  },
  {
    id: 6,
    title: "Conflict Resolution",
    prompt: "What do you do if two records don't match or conflict with each other?",
    type: "radio",
    options: [
      "Yes — a defined source-of-truth and escalation process",
      "Yes — we resolve it case-by-case, informally",
      "Rarely — conflicts often sit unresolved for a while",
      "No — we don't have a way to resolve this",
    ],
  },
  {
    id: 7,
    title: "Data Lifecycle",
    prompt: "When do you consider data as \"outdated,\" and how do you archive it?",
    type: "radio",
    options: [
      "Yes — a documented retention or archiving policy",
      "Yes — an informal but consistent practice",
      "Not really — we clean up occasionally with no fixed rule",
      "No — outdated data just stays indefinitely",
    ],
  },
  {
    id: 8,
    title: "Automated Flagging",
    prompt: "Do you have any automated system that flags invalid or suspicious data?",
    type: "boolean",
  },
  {
    id: 9,
    title: "Task Prioritization",
    prompt: "How do you decide which task or request to prioritize first if there are many at once?",
    type: "radio",
    options: [
      "By deadline or urgency",
      "By the requester's role or authority",
      "By potential impact or risk",
      "First-come, first-served",
    ],
  },
  {
    id: 10,
    title: "Common Problems",
    prompt: "What's the most common problem you experience in managing data, and how do you usually fix it?",
    type: "radio",
    options: [
      "Yes — we have a consistent fix for our most common issue",
      "Somewhat — we patch it each time but not systematically",
      "Not really — the same issue keeps recurring without a real fix",
      "We don't experience recurring problems",
    ],
  },
  {
    id: 11,
    title: "Tools & Software",
    prompt: "What tools or software do you use to store and manage data?",
    type: "radio",
    options: [
      "A dedicated database system (e.g. SQL/PostgreSQL/MySQL)",
      "Spreadsheets (e.g. Excel or Google Sheets)",
      "Cloud storage or SaaS platforms",
      "A mix of multiple tools",
    ],
  },
  {
    id: 12,
    title: "Backup Frequency",
    prompt: "How often do you back up data, and why is that important?",
    type: "select",
    options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
  },
  {
    id: 13,
    title: "Unauthorized Access",
    prompt: "What happens if someone tries to access data they're not supposed to see?",
    type: "radio",
    options: [
      "Yes — access is denied, logged, and an alert is sent",
      "Yes — it's typically denied, just not formally logged or alerted",
      "Not really — it depends on whether anyone notices",
      "No — there's no real response to this",
    ],
  },
  {
    id: 14,
    title: "Ongoing Accuracy",
    prompt: "How do you make sure data stays accurate over time?",
    type: "radio",
    options: [
      "Yes — scheduled reviews or reconciliations",
      "Yes — we check informally every so often",
      "Rarely — only if something looks obviously wrong",
      "No — we don't have an ongoing process for this",
    ],
  },
  {
    id: 15,
    title: "Case Example",
    prompt: "Can you give an example of a time you had to fix a big data problem? What did you do?",
    type: "radio",
    options: [
      "Yes — we resolved a significant data incident and documented what we did",
      "Yes — we've handled a smaller issue, nothing major",
      "Not that I can recall",
      "No, we haven't had to deal with this",
    ],
  },
];
