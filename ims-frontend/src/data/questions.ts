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
    type: "textarea",
    placeholder: "Describe the process you follow, e.g. folder structure, tags, department rules…",
  },
  {
    id: 3,
    title: "Access Control",
    prompt: "Who is allowed to access each type of data, and how do you control that?",
    type: "textarea",
    placeholder: "Describe roles, permissions, or approval steps involved…",
  },
  {
    id: 4,
    title: "Sensitivity Criteria",
    prompt: "What makes a piece of data \"confidential\" or sensitive?",
    type: "textarea",
    placeholder: "Describe how sensitivity is defined or flagged…",
  },
  {
    id: 5,
    title: "Data Quality Checks",
    prompt: "How do you know if data is missing, duplicated, or corrupted?",
    type: "textarea",
    placeholder: "Describe checks, tools, or habits used to catch issues…",
  },
  {
    id: 6,
    title: "Conflict Resolution",
    prompt: "What do you do if two records don't match or conflict with each other?",
    type: "textarea",
    placeholder: "Describe how discrepancies are investigated and resolved…",
  },
  {
    id: 7,
    title: "Data Lifecycle",
    prompt: "When do you consider data as \"outdated,\" and how do you archive it?",
    type: "textarea",
    placeholder: "Describe the criteria and the archiving process…",
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
    type: "textarea",
    placeholder: "Describe the recurring issue and your usual fix…",
  },
  {
    id: 11,
    title: "Tools & Software",
    prompt: "What tools or software do you use to store and manage data?",
    type: "text",
    placeholder: "e.g. spreadsheets, a database system, cloud storage…",
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
    type: "textarea",
    placeholder: "Describe what safeguards or consequences apply…",
  },
  {
    id: 14,
    title: "Ongoing Accuracy",
    prompt: "How do you make sure data stays accurate over time?",
    type: "textarea",
    placeholder: "Describe ongoing review, validation, or maintenance habits…",
  },
  {
    id: 15,
    title: "Case Example",
    prompt: "Can you give an example of a time you had to fix a big data problem? What did you do?",
    type: "textarea",
    placeholder: "Walk through what happened and the steps you took…",
  },
];
