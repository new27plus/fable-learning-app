import { LearningRecord, Favorite, WrongAnswer } from "../types/concept";

// Web implementation using localStorage

const STORAGE_KEYS = {
  LEARNING_RECORDS: "fable_learning_records",
  FAVORITES: "fable_favorites",
  WRONG_ANSWERS: "fable_wrong_answers",
};

function getStorageData<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setStorageData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function initDatabase(): void {
  if (!localStorage.getItem(STORAGE_KEYS.LEARNING_RECORDS)) {
    localStorage.setItem(STORAGE_KEYS.LEARNING_RECORDS, "[]");
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, "[]");
  }
  if (!localStorage.getItem(STORAGE_KEYS.WRONG_ANSWERS)) {
    localStorage.setItem(STORAGE_KEYS.WRONG_ANSWERS, "[]");
  }
}

export function addLearningRecord(
  conceptId: string,
  score: number,
  totalQuestions: number
): void {
  const records = getStorageData<LearningRecord>(STORAGE_KEYS.LEARNING_RECORDS);
  records.unshift({
    id: Date.now(),
    concept_id: conceptId,
    completed_at: new Date().toISOString(),
    score,
    total_questions: totalQuestions,
  });
  setStorageData(STORAGE_KEYS.LEARNING_RECORDS, records);
}

export function getLearningRecords(): LearningRecord[] {
  return getStorageData<LearningRecord>(STORAGE_KEYS.LEARNING_RECORDS);
}

export function toggleFavorite(conceptId: string): boolean {
  const favorites = getStorageData<Favorite>(STORAGE_KEYS.FAVORITES);
  const index = favorites.findIndex((f) => f.concept_id === conceptId);
  if (index >= 0) {
    favorites.splice(index, 1);
    setStorageData(STORAGE_KEYS.FAVORITES, favorites);
    return false;
  } else {
    favorites.unshift({
      id: Date.now(),
      concept_id: conceptId,
      created_at: new Date().toISOString(),
    });
    setStorageData(STORAGE_KEYS.FAVORITES, favorites);
    return true;
  }
}

export function getFavorites(): Favorite[] {
  return getStorageData<Favorite>(STORAGE_KEYS.FAVORITES);
}

export function isFavorite(conceptId: string): boolean {
  const favorites = getStorageData<Favorite>(STORAGE_KEYS.FAVORITES);
  return favorites.some((f) => f.concept_id === conceptId);
}

export function addWrongAnswer(
  conceptId: string,
  questionId: string,
  question: string,
  userAnswer: string,
  correctAnswer: string,
  explanation: string
): void {
  const wrongAnswers = getStorageData<WrongAnswer>(STORAGE_KEYS.WRONG_ANSWERS);
  wrongAnswers.unshift({
    id: Date.now(),
    concept_id: conceptId,
    question_id: questionId,
    question,
    user_answer: userAnswer,
    correct_answer: correctAnswer,
    explanation,
    created_at: new Date().toISOString(),
  });
  setStorageData(STORAGE_KEYS.WRONG_ANSWERS, wrongAnswers);
}

export function getWrongAnswers(): WrongAnswer[] {
  return getStorageData<WrongAnswer>(STORAGE_KEYS.WRONG_ANSWERS);
}
