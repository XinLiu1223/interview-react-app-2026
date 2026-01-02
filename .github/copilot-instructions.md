# Copilot / AI agent instructions for interview-react-app-2026

Purpose: Short, actionable guidance to help an AI agent be immediately productive in this repo.

## Big picture

- Frontend-only React + TypeScript single-page app built with Vite (no backend or CI configured).
- Entry point: `src/main.tsx` → `src/App.tsx`. Static assets: `public/` and `src/assets/`.
- Uses **React 19** with the **React Compiler** via `@vitejs/plugin-react` + `babel-plugin-react-compiler`. Changing compiler/babel config can affect both dev HMR and production builds — always validate both `dev` and `build` flows.

## Quick facts & scripts

- Key npm scripts (see `package.json`):
  - `npm run dev` — start Vite (HMR)
  - `npm run build` — `tsc -b` then `vite build` (type-check + bundle)
  - `npm run preview` — preview a production build
  - `npm run lint` — run ESLint (use `-- --fix` to autofix)
- There is **no test runner** configured. The codebase includes `data-testid` attributes to make adding tests straightforward.

## Project layout & example areas to inspect

- `src/` — application source
  - `src/hacker-rank-interview/` — simple, self-contained example components (e.g., `SearchCustomer.tsx`, `CustomerList.tsx`, `List.tsx`) useful for understanding component patterns
  - `src/interview-test/` — additional example components and patterns
- `vite.config.ts`, `tsconfig.app.json`, and `eslint.config.js` are the key toolchain files to read before changing build/lint behavior.

## Concrete patterns & examples

- Components use **default exports** and simple inline prop types. Example: `CustomerList` (default export) accepts `{ customers: typeof List }`.
- Imports often include explicit file extensions, e.g. `import App from './App.tsx'` — preserve this style when adding imports.
- Test hooks available in code:
  - `SearchCustomer.tsx` uses `data-testid="search-input"`
  - `CustomerList.tsx` renders results into `<tbody data-testid="searched-customers">`
- CSS is plain global CSS (`src/*.css`, `App.css`). No CSS modules.
- No router, no network API layer — components are local and self-contained; changes rarely require API mocking.

## TypeScript & linting details

- Type checking is strict: `tsconfig.app.json` enables `strict`, `noUnusedLocals`, and other strict flags. Run `npm run build` to surface type errors.
- ESLint is configured (`eslint.config.js` + TypeScript plugins). Use `npm run lint -- --fix` to apply automatic fixes.

## Tests (recommended, actionable)

- No test runner is configured; recommended stack: **Vitest + React Testing Library**.
- Concrete test targets and examples:
  - `SearchCustomer.tsx` — assert input change updates `CustomerList` rows using `data-testid="search-input"` and `data-testid="searched-customers"`.
  - `searchAllFields` — unit tests for empty query, non-array input, and partial field matches.
  - `DateSearch.tsx` / `TransactionTable.tsx` — use `src/hacker-rank-date-filter/data/transactions.ts` sample data to test filtering behavior.
- When adding tests: add `test` and `test:watch` scripts to `package.json` and include short examples in PRs showing how to run them.

## How to make safe changes (practical)

- Type errors: run `npm run build` (this runs `tsc -b`) to see TypeScript errors before pushing.
- Dev vs Build: if you change compiler/babel/plugin settings (see `vite.config.ts`), validate both `npm run dev` (HMR) and `npm run build` (production bundle).
- Lint: run `npm run lint -- --fix` and commit remaining fixes.
- Imports: preserve explicit file extensions (e.g., `import App from './App.tsx'`).
- Exports: prefer default exports for components to match existing patterns.

## PR checklist (practical)

1. Run `npm run build` (type-check + build) ✅
2. Run `npm run lint -- --fix` and commit remaining fixes ✅
3. Run `npm run dev` to verify HMR for UI changes ✅
4. If adding tests, include scripts and examples and ensure they pass locally ✅

## When to ask the maintainer

- Add CI, test runner, or bump Node engine.
- Replace or remove the React Compiler plugin, or make other major build-tooling changes.

---

Would you like me to add (pick one):

- a small PR checklist file, or
- an example Vitest test for `SearchCustomer`, or
- both?

I'll implement whichever you choose and open a short PR-style branch with the changes.
