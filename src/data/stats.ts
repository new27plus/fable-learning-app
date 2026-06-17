import { Field, Difficulty } from "../types/concept";
import { concepts } from "./concepts";

const VALID_FIELDS: Field[] = [
  "经济学", "心理学", "管理学", "计算机科学", "哲学", "金融学",
];
const VALID_LEVELS: Difficulty[] = ["小白", "大学生", "研究生"];

console.log("=== 寓言学堂概念统计 ===\n");

// Total count
console.log(`总概念数: ${concepts.length}\n`);

// By field
console.log("按领域分布:");
const fieldCounts: Record<string, number> = {};
for (const c of concepts) {
  fieldCounts[c.field] = (fieldCounts[c.field] || 0) + 1;
}
for (const field of VALID_FIELDS) {
  const count = fieldCounts[field] || 0;
  const bar = "█".repeat(count) + "░".repeat(20 - Math.min(count, 20));
  console.log(`  ${field}: ${bar} ${count}`);
}

// By level
console.log("\n按难度分布:");
const levelCounts: Record<string, number> = {};
for (const c of concepts) {
  levelCounts[c.level] = (levelCounts[c.level] || 0) + 1;
}
for (const level of VALID_LEVELS) {
  const count = levelCounts[level] || 0;
  const bar = "█".repeat(count) + "░".repeat(20 - Math.min(count, 20));
  console.log(`  ${level}: ${bar} ${count}`);
}

// Cross distribution: field × level
console.log("\n领域 × 难度交叉分布:");
const cross: Record<string, Record<string, number>> = {};
for (const c of concepts) {
  if (!cross[c.field]) cross[c.field] = {};
  cross[c.field][c.level] = (cross[c.field][c.level] || 0) + 1;
}

// Header
const header = "领域".padEnd(10) + VALID_LEVELS.map(l => l.padStart(6)).join("");
console.log(header);
console.log("-".repeat(header.length));

for (const field of VALID_FIELDS) {
  const row = field.padEnd(10) + VALID_LEVELS.map(l => String(cross[field]?.[l] || 0).padStart(6)).join("");
  console.log(row);
}

// Total questions
const totalQuestions = concepts.reduce((sum, c) => sum + (c.questions?.length || 0), 0);
console.log(`\n总题目数: ${totalQuestions} (每概念 3 题)`);

// Unique IDs check
const ids = new Set(concepts.map(c => c.id));
if (ids.size !== concepts.length) {
  console.log(`\n⚠️  发现重复 ID: ${concepts.length - ids.size} 个`);
}

console.log("\n=== 统计完成 ===");
