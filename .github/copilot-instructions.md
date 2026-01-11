# Copilot / AI agent instructions for interview-react-app-2026

Purpose: concise, discoverable guidance to help an AI agent be immediately productive in this repo.

## Quick start 🔧

- Run: `npm install` then `npm run dev` to boot Vite (HMR).
- Use `npm run build` to run TypeScript build (`tsc -b`) then `vite build` — this surfaces strict type errors that may not appear in dev.
- Lint: `npm run lint` (use `-- --fix` to auto-fix where safe).

## Project overview (what matters) 🧭

- Frontend-only React + TypeScript single-page app built with Vite. No backend or CI by default.
- Entry: `src/main.tsx` → `src/App.tsx`. Static assets in `public/` and `src/assets/`.
- Uses React 19 + `@vitejs/plugin-react` with `babel-plugin-react-compiler` (see `vite.config.ts`). Changes to the compiler or plugin require validating both dev HMR and production build flows.

## Conventions & patterns (be consistent) 📁

- Components use **default exports** and simple inline prop types (e.g., `src/hacker-rank-interview/CustomerList.tsx`).
- Imports include file extensions (e.g., `import App from './App.tsx'`) — do not remove extensions.
- Global CSS only (`src/*.css`). No CSS modules.
- No router and no network API layer — components are local and self-contained.

## Useful files & change targets 🔎

- Search customer UI: `src/hacker-rank-interview/SearchCustomer.tsx` (search input `data-testid="search-input"`, results `data-testid="searched-customers"`). The helper `searchAllFields` is a good unit-test target.
- Date filter sample data: `src/hacker-rank-date-filter/data/transactions.ts` and `TransactionTable.tsx` — useful for deterministic tests.
- Movie preview feature: `src/interview-movies-preview/*` — self-contained demo components that follow repo conventions.

## Tests & recommendations 🧪

- No test runner is pre-configured. Recommended stack: **Vitest + React Testing Library**.
- When adding tests:
  - Add `test` and `test:watch` scripts (e.g., `vitest`, `vitest --watch`).
  - Prefer focused unit tests using `data-testid` hooks already present in components.
  - Example: test `searchAllFields` for empty query, partial matches, and non-array inputs.

## TypeScript & linting notes ✅

- `tsconfig.app.json` enforces strict checking (`strict`, `noUnusedLocals`, `noUnusedParameters`). Use `npm run build` to reveal type errors.
- ESLint config is at `eslint.config.js` — run `npm run lint -- --fix` before PRs.

## PR checklist (quick) ✅

1. Run `npm run build` and fix any type errors.
2. Run `npm run lint -- --fix` and commit remaining fixes.
3. Run `npm run dev` and smoke test the UI / HMR behavior.
4. If adding tests, include `test` scripts and sample commands in the PR description.

## When to ask the maintainer 📬

- Add CI, tests, or change Node engine.
- Replace/remove the React Compiler plugin or major build tooling changes.
- Anything requiring repo-wide style or architectural changes.

---

If you want, I can add a tiny PR that: (A) adds a simple Vitest test for `SearchCustomer.tsx`, and (B) adds `test`/`test:watch` scripts. Which would you prefer?
