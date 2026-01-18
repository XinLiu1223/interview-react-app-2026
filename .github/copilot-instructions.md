# Copilot / AI agent instructions for interview-react-app-2026

Purpose: concise, discoverable guidance to help an AI agent be immediately productive in this repo.

## Quick start 🔧

- Run: `npm install` then `npm run dev` to boot Vite (HMR).
- Use `npm run build` to run TypeScript build (`tsc -b`) then `vite build` — this surfaces strict type errors that may not appear in dev.
- Lint: `npm run lint` (use `-- --fix` to auto-fix where safe).

## Project overview (what matters) 🧭

- Frontend-only React + TypeScript single-page app built with Vite. No backend or CI by default.
- Entry: `src/main.tsx` → `src/App.tsx`. Static assets in `public/` and `src/assets/`.
- Uses React 19 + `@vitejs/plugin-react` with `babel-plugin-react-compiler` (see `vite.config.ts`). Changes to the compiler or plugin require validating both dev HMR and production build flows. Note: React Compiler impacts Vite dev & build performance.
- App structure: Collection of interview practice components organized in folders like `hacker-rank-interview/`, `interview-movies-preview/`, `interview-test/`. Components are rendered together in `App.tsx` without routing for navigation.
- Routing: `BrowserRouter` wraps the app in `main.tsx`, but main navigation is not routed; some components (e.g., `ServiceIntegration`) use internal routing with `Routes`/`Route`.
- Network: Most components are self-contained with local data, but `ServiceIntegration` includes fetch calls to external APIs (e.g., jsonplaceholder, restful-api.dev).
- Architecture: Not a cohesive application but a suite of isolated practice problems. Each folder represents a different coding challenge with its own data flow and patterns. No shared state management across components.

## Conventions & patterns (be consistent) 📁

- Components use **default exports** and simple inline prop types (e.g., `src/hacker-rank-interview/CustomerList.tsx`).
- Imports: Relative imports without file extensions (e.g., `import CustomerList from './CustomerList'`).
- Global CSS only (`src/*.css`). No CSS modules.
- Data flow: Components often include sample data directly (e.g., `List.tsx` as array) or from JSON files (e.g., `movie-data.json`).
- Atomic design: `interview-movies-preview/` follows atoms/molecules/organisms structure for component composition.
- Type definitions: Use dedicated `types/` subfolders for shared interfaces (e.g., `src/hacker-rank-date-filter/types/transactions.ts`).
- Testing hooks: Use `data-testid` attributes for elements (e.g., `data-testid="search-input"`, `data-testid="searched-customers"`) to enable easy testing.

## Useful files & change targets 🔎

- Search customer UI: `src/hacker-rank-interview/SearchCustomer.tsx` (search input `data-testid="search-input"`, results `data-testid="searched-customers"`). The helper `searchAllFields` is a good unit-test target.
- Date filter sample data: `src/hacker-rank-date-filter/data/transactions.ts` and `TransactionTable.tsx` — useful for deterministic tests. Types defined in `src/hacker-rank-date-filter/types/transactions.ts`.
- Movie preview feature: `src/interview-movies-preview/*` — self-contained demo components that follow atomic design (atoms/molecules/organisms). Data from `src/interview-movies-preview/static/movie-data.json`.
- Form validation: `src/interview-test/FormAnyInputChangeValidate.tsx` — example of real-time validation on input change. `src/interview-test/CrossFieldValidation.tsx` — cross-field validation logic.
- API integration: `src/interview-test/ServiceIntegration.tsx` — demonstrates fetch calls to external APIs, form submission, and internal routing (e.g., success page).
- Game components: `src/interview-test/TicTacToe.tsx` — state management for interactive games.

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
4. If adding tests, include `test`/`test:watch` scripts and sample commands in the PR description.

## When to ask the maintainer 📬

- Add CI, tests, or change Node engine.
- Replace/remove the React Compiler plugin or major build tooling changes.
- Anything requiring repo-wide style or architectural changes.
