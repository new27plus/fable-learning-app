import * as SQLite from "expo-sqlite";
import { LearningRecord, Favorite, WrongAnswer } from "../types/concept";

let db: SQLite.SQLiteDatabase;
let initialized = false;

function getDb(): SQLite.SQLiteDatabase {
  if (!db) {
    db = SQLite.openDatabaseSync("fable.db");
  }
  return db;
}

export function initDatabase(): void {
  if (initialized) return;
  const database = getDb();
  database.execSync(`
    CREATE TABLE IF NOT EXISTS learning_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      concept_id TEXT NOT NULL,
      completed_at TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL
    );
  `);
  database.execSync(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      concept_id TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL
    );
  `);
  database.execSync(`
    CREATE TABLE IF NOT EXISTS wrong_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      concept_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      question TEXT NOT NULL,
      user_answer TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      explanation TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
  initialized = true;
}

export function addLearningRecord(
  conceptId: string,
  score: number,
  totalQuestions: number
): void {
  const database = getDb();
  database.runSync(
    "INSERT INTO learning_records (concept_id, completed_at, score, total_questions) VALUES (?, ?, ?, ?)",
    [conceptId, new Date().toISOString(), score, totalQuestions]
  );
}

export function getLearningRecords(): LearningRecord[] {
  const database = getDb();
  return database.getAllSync<LearningRecord>(
    "SELECT * FROM learning_records ORDER BY completed_at DESC"
  );
}

export function toggleFavorite(conceptId: string): boolean {
  const database = getDb();
  const existing = database.getFirstSync<{ id: number }>(
    "SELECT id FROM favorites WHERE concept_id = ?",
    [conceptId]
  );
  if (existing) {
    database.runSync("DELETE FROM favorites WHERE concept_id = ?", [conceptId]);
    return false;
  } else {
    database.runSync(
      "INSERT INTO favorites (concept_id, created_at) VALUES (?, ?)",
      [conceptId, new Date().toISOString()]
    );
    return true;
  }
}

export function getFavorites(): Favorite[] {
  const database = getDb();
  return database.getAllSync<Favorite>(
    "SELECT * FROM favorites ORDER BY created_at DESC"
  );
}

export function isFavorite(conceptId: string): boolean {
  const database = getDb();
  const row = database.getFirstSync<{ id: number }>(
    "SELECT id FROM favorites WHERE concept_id = ?",
    [conceptId]
  );
  return !!row;
}

export function addWrongAnswer(
  conceptId: string,
  questionId: string,
  question: string,
  userAnswer: string,
  correctAnswer: string,
  explanation: string
): void {
  const database = getDb();
  database.runSync(
    "INSERT INTO wrong_answers (concept_id, question_id, question, user_answer, correct_answer, explanation, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [conceptId, questionId, question, userAnswer, correctAnswer, explanation, new Date().toISOString()]
  );
}

export function getWrongAnswers(): WrongAnswer[] {
  const database = getDb();
  return database.getAllSync<WrongAnswer>(
    "SELECT * FROM wrong_answers ORDER BY created_at DESC"
  );
}
