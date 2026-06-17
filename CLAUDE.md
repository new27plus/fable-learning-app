# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

「寓言学堂」— a fully offline Chinese mobile learning app that teaches abstract concepts through fables, concept explanations, metaphor mapping, boundary warnings, and quizzes. No server, no backend, no login, no online APIs. All content and user data stored locally.

## Commands

```bash
npm install          # Install dependencies
npx expo start       # Start dev server (scan QR with Expo Go)
npx expo start --android
npx expo start --ios
npx tsc --noEmit     # Type-check without building
npm run lint         # Expo lint
```

## Architecture

**Stack:** Expo SDK 54, React Native 0.81, TypeScript, Expo Router 6, expo-sqlite 16

**Routing:** File-based via Expo Router (`app/` directory). Root layout in `app/_layout.tsx` initializes the SQLite database on mount via `useEffect`. All routes use `Stack` navigator. Dynamic segments use `[id]`/`[field]` brackets.

**Data flow:**
- Content is a static TypeScript array in `src/data/concepts.ts` — not JSON. This is the single source of truth for all learning content (12 concepts, 2 per field).
- User data (learning records, favorites, wrong answers) lives in SQLite via `src/lib/db.ts`.
- Pages read content from the concepts array and user state from SQLite. There is no global state management — each page fetches its own data on mount or via `useFocusEffect`.
- The database uses synchronous APIs (`openDatabaseSync`, `runSync`, `getAllSync`, `getFirstSync`, `execSync`).

**Key patterns:**
- Pages that need fresh data on revisit (favorites, records, wrong-answers) use `useFocusEffect` from expo-router, not `useEffect`.
- The story page intentionally hides `conceptName` — it only shows `storyTitle`. The concept is revealed on the explanation page.
- Quiz scoring: correct answers increment a counter, wrong answers are persisted to SQLite immediately. Learning records are written only after completing all questions.
- The `fable` field in concepts uses template literals (backticks) because it contains multi-paragraph Chinese text. All other string fields use regular double quotes. Chinese quotation marks in text content use `""` (U+201C/U+201D curly quotes), not ASCII `"`.

**Components** in `src/components/` are stateless presentational — they receive data via props and call callbacks. No component owns state that outlives its parent.

## Adding New Concepts

Add entries to the `concepts` array in `src/data/concepts.ts`. Each concept must have:
- A unique `id` (kebab-case, used as route param)
- `field` must be one of the 6 values in `src/types/concept.ts` `Field` type
- `level` must be one of `"小白" | "大学生" | "研究生"`
- Exactly 3 questions with `answerIndex` (0-3)
- `fable` as a template literal (backticks) for multi-line content

If adding a new field, update the `Field` type in `src/types/concept.ts` and the `FIELDS`/`FIELD_ICONS`/`FIELD_COLORS` maps in `src/utils/concept.ts`.

## Design Tokens

All design tokens live in `src/theme/tokens.ts`. Import `colors`, `typography`, `spacing`, `radius`, `shadows` from there. The design fuses Apple HIG (clean hierarchy, whitespace), Material 3 (tonal color system, color roles), and HarmonyOS (ultra-rounded corners, soft warmth).

Key values:
- Surface: `#FEFCF9` (warm off-white)
- Primary: `#D4603A` (terracotta)
- Text: `#1C1B18` (onSurface), `#6B6660` (onSurfaceVariant)
- Cards: `surfaceBright` (#FFFFFF), `radius.lg` (20px), `shadows.md`
- Field colors are in `fieldColors` within tokens.ts, re-exported via `FIELD_COLORS` in `src/utils/concept.ts`
