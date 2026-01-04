# Copilot / AI agent instructions for interview-react-app-2026

Purpose: concise, discoverable guidance to help an AI agent be immediately productive in this repo.

## Big picture 🔧

- Frontend-only React + TypeScript single-page app built with Vite. No backend or CI configured by default.
- Entry point: `src/main.tsx` → `src/App.tsx`. Static assets live in `public/` and `src/assets/`.
- Uses **React 19** and the **React Compiler** via `@vitejs/plugin-react` with `babel-plugin-react-compiler` (see `vite.config.ts`). Changing compiler/babel/plugin settings affects both dev HMR and production build — always validate both flows.

## Quick facts & common commands ⚡

- Key npm scripts (see `package.json`):
  - `npm run dev` — start Vite (HMR)
  - `npm run build` — `tsc -b` then `vite build` (type-check + bundle) — useful for surfacing type errors
  - `npm run preview` — preview a production build
  - `npm run lint` — run ESLint (use `-- --fix` to apply auto-fixes)
- Platform notes: runs on Windows/macOS/Linux; no special env vars needed for basic dev.

## Project conventions & patterns 📁

- Components use **default exports** and simple inline prop types. Example: `src/hacker-rank-interview/CustomerList.tsx`.
- Imports intentionally include file extensions (e.g., `import App from './App.tsx'`) — preserve this style.
- Global CSS only: `src/*.css` (no CSS modules).
- No router and no network API layer — components are local and self-contained. Most changes do not require network mocks.
- Example sample data: `src/hacker-rank-date-filter/data/transactions.ts` (useful for unit tests and examples).

## Test hooks & example targets 🧪

- There is **no test runner** configured. The codebase includes test-friendly selectors (`data-testid`). Useful targets:
  - `src/hacker-rank-interview/SearchCustomer.tsx` — input has `data-testid="search-input"`; assert it updates rows in `CustomerList` (`data-testid="searched-customers"`).
  - `searchAllFields` (local function in `SearchCustomer.tsx`) — unit tests for empty query, non-array input, partial-field matches.
  - `DateSearch.tsx` / `TransactionTable.tsx` — use `src/hacker-rank-date-filter/data/transactions.ts` to test date filtering logic.
- Recommended test stack: **Vitest + React Testing Library**. When adding tests:
  - Add `test` and `test:watch` scripts (e.g., `vitest`, `vitest --watch`).
  - Keep tests focused and use the existing `data-testid` hooks.

## TypeScript & linting details ✅

- Type checking is strict (see `tsconfig.app.json`: `strict`, `noUnusedLocals`, `noUnusedParameters`). Use `npm run build` to expose type errors early.
- ESLint config is in `eslint.config.js` (TypeScript-aware rules). Run `npm run lint -- --fix` and commit remaining fixes before opening a PR.

## Making safe changes (practical tips) 🔍

- Validate both dev and build flows when you touch build tooling or compilers (run `npm run dev` and `npm run build`).
- Preserve explicit file extensions and default export style to match repository conventions.
- Keep changes small and add tests for new behaviors — e.g., add a Vitest test for `SearchCustomer.tsx` demonstrating the `searchAllFields` behavior.

## PR checklist ✅

1. Run `npm run build` (type-check + build)
2. Run `npm run lint -- --fix` and commit remaining fixes
3. Run `npm run dev` and manually smoke test UI/HMR
4. If adding tests: include `test` scripts and sample commands in PR description

## When to ask the maintainer 📬

- Add CI, test runner, or bump Node engine
- Replace or remove the React Compiler plugin or swap major build tooling
- Any change that requires repository-wide coding style decisions

---

If you'd like, I can:

- add a tiny PR checklist file, or
- implement a sample Vitest test for `SearchCustomer.tsx`, or
- do both and open a short branch with changes. Which would you prefer?
