import { Field, Difficulty } from "../types/concept";
import { concepts } from "./concepts";

const VALID_FIELDS: Field[] = [
  "经济学", "心理学", "管理学", "计算机科学", "哲学", "金融学",
];
const VALID_LEVELS: Difficulty[] = ["小白", "大学生", "研究生"];

let errors = 0;
const warnings: string[] = [];

function err(id: string, msg: string) {
  console.error(`  [ERROR] ${id}: ${msg}`);
  errors++;
}

function warn(id: string, msg: string) {
  warnings.push(`  [WARN] ${id}: ${msg}`);
}

console.log(`Validating ${concepts.length} concepts...\n`);

const ids = new Set<string>();
const questionIds = new Set<string>();

for (const c of concepts) {
  const id = c.id || "(missing id)";

  // Uniqueness
  if (ids.has(id)) {
    err(id, "duplicate id");
  }
  ids.add(id);

  // ID format: kebab-case
  if (id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
    err(id, `invalid id format (should be kebab-case): "${id}"`);
  }

  // Required fields
  for (const key of [
    "id", "field", "level", "storyTitle", "conceptName",
    "fable", "plainExplanation", "formalDefinition", "importance",
  ]) {
    if (!(c as any)[key]) err(id, `missing field: ${key}`);
  }

  // Field value
  if (!VALID_FIELDS.includes(c.field)) {
    err(id, `invalid field: "${c.field}"`);
  }

  // Level value
  if (!VALID_LEVELS.includes(c.level)) {
    err(id, `invalid level: "${c.level}"`);
  }

  // Text length checks
  if (c.storyTitle && (c.storyTitle.length < 2 || c.storyTitle.length > 20)) {
    warn(id, `storyTitle length ${c.storyTitle.length} (recommended 2-20)`);
  }
  if (c.conceptName && (c.conceptName.length < 2 || c.conceptName.length > 10)) {
    warn(id, `conceptName length ${c.conceptName.length} (recommended 2-10)`);
  }
  if (c.fable && c.fable.length < 100) {
    warn(id, `fable too short: ${c.fable.length} chars (recommended 100+)`);
  }
  if (c.fable && c.fable.length > 500) {
    warn(id, `fable too long: ${c.fable.length} chars (recommended <500)`);
  }

  // Chinese quotation marks check
  if (c.fable && /"[^"]*"/.test(c.fable)) {
    warn(id, 'fable uses ASCII quotes instead of Chinese quotes ""');
  }
  if (c.plainExplanation && /"[^"]*"/.test(c.plainExplanation)) {
    warn(id, 'plainExplanation uses ASCII quotes instead of Chinese quotes ""');
  }

  // metaphorMap: exactly 4
  if (!c.metaphorMap || c.metaphorMap.length !== 4) {
    err(id, `metaphorMap should have 4 items, got ${c.metaphorMap?.length}`);
  } else {
    for (let i = 0; i < 4; i++) {
      const m = c.metaphorMap[i];
      if (!m.fableElement || !m.theoryElement || !m.reason) {
        err(id, `metaphorMap[${i}] missing fableElement/theoryElement/reason`);
      }
    }
  }

  // boundaries: exactly 3
  if (!c.boundaries || c.boundaries.length !== 3) {
    err(id, `boundaries should have 3 items, got ${c.boundaries?.length}`);
  }

  // examples: exactly 2
  if (!c.examples || c.examples.length !== 2) {
    err(id, `examples should have 2 items, got ${c.examples?.length}`);
  } else {
    const types = c.examples.map(e => e.type);
    if (!types.includes("positive") || !types.includes("negative")) {
      warn(id, `examples should have one positive and one negative`);
    }
    for (let i = 0; i < 2; i++) {
      const e = c.examples[i];
      if (!e.title || !e.content) {
        err(id, `examples[${i}] missing title/content`);
      }
    }
  }

  // questions: exactly 3
  if (!c.questions || c.questions.length !== 3) {
    err(id, `questions should have 3 items, got ${c.questions?.length}`);
  } else {
    for (let i = 0; i < 3; i++) {
      const q = c.questions[i];
      if (!q.id || !q.question || !q.options || !q.explanation) {
        err(id, `questions[${i}] missing id/question/options/explanation`);
      }

      // Question ID uniqueness
      if (q.id) {
        if (questionIds.has(q.id)) {
          err(id, `duplicate question id: "${q.id}"`);
        }
        questionIds.add(q.id);

        // Question ID format: {concept-id}-q{n}
        if (!q.id.startsWith(id + "-q")) {
          warn(id, `question id "${q.id}" should start with "${id}-q"`);
        }
      }

      if (q.options.length !== 4) {
        err(id, `questions[${i}] should have 4 options, got ${q.options.length}`);
      }
      if (q.answerIndex < 0 || q.answerIndex > 3) {
        err(id, `questions[${i}] answerIndex out of range: ${q.answerIndex}`);
      }
    }
  }
}

// Print warnings
if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const w of warnings) {
    console.log(w);
  }
}

// Summary by field
console.log("\nDistribution by field:");
const fieldCounts: Record<string, number> = {};
for (const c of concepts) {
  fieldCounts[c.field] = (fieldCounts[c.field] || 0) + 1;
}
for (const [field, count] of Object.entries(fieldCounts)) {
  console.log(`  ${field}: ${count}`);
}

// Summary by level
console.log("\nDistribution by level:");
const levelCounts: Record<string, number> = {};
for (const c of concepts) {
  levelCounts[c.level] = (levelCounts[c.level] || 0) + 1;
}
for (const level of VALID_LEVELS) {
  console.log(`  ${level}: ${levelCounts[level] || 0}`);
}

console.log(`\nTotal: ${concepts.length} concepts`);
console.log(`Warnings: ${warnings.length}`);
if (errors === 0) {
  console.log("All validations passed!");
} else {
  console.error(`\n${errors} error(s) found.`);
  process.exit(1);
}
