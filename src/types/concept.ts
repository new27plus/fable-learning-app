export type Difficulty = "小白" | "大学生" | "研究生";

export type Field =
  | "经济学"
  | "心理学"
  | "管理学"
  | "计算机科学"
  | "哲学"
  | "金融学";

export interface MetaphorMap {
  fableElement: string;
  theoryElement: string;
  reason: string;
}

export interface Example {
  title: string;
  content: string;
  type: "positive" | "negative";
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Concept {
  id: string;
  field: Field;
  level: Difficulty;
  storyTitle: string;
  conceptName: string;
  fable: string;
  plainExplanation: string;
  formalDefinition: string;
  importance: string;
  metaphorMap: MetaphorMap[];
  boundaries: string[];
  examples: Example[];
  questions: Question[];
}

export interface LearningRecord {
  id: number;
  concept_id: string;
  completed_at: string;
  score: number;
  total_questions: number;
}

export interface Favorite {
  id: number;
  concept_id: string;
  created_at: string;
}

export interface WrongAnswer {
  id: number;
  concept_id: string;
  question_id: string;
  question: string;
  user_answer: string;
  correct_answer: string;
  explanation: string;
  created_at: string;
}
