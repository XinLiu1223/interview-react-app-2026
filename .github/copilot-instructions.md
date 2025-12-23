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

## Tests (recommended approach when adding tests)

- Suggested tooling: Vitest + React Testing Library. Example targets:
  - Search behavior in `SearchCustomer.tsx` (assert change events on `data-testid="search-input"` and rows rendered in `data-testid="searched-customers"`).
  - Edge cases: empty query, non-array inputs to `searchAllFields`.
- When adding tests, add `test`/`test:watch` scripts to `package.json` and document how to run them.

## How to make safe changes

- Changing TypeScript config: run `npm run build` (type-check). Fix any type errors before opening a PR.
- Changing compiler/babel/plugin settings: verify both `npm run dev` and `npm run build` to ensure HMR and production builds still work.
- Lint rule changes: run `npm run lint` and include `-- --fix` where appropriate.

## PR checklist (suggested)

- Run `npm run build` (type-check + build) ✅
- Run `npm run lint -- --fix` and commit remaining fixes ✅
- Run `npm run dev` briefly to verify HMR/fast refresh (if UI changes) ✅
- If adding tests, include `test`/`test:watch` scripts and ensure they pass ✅

## When to ask the maintainer

- Propose adding CI, a testing framework, or new Node engine requirements.
- Propose removing / replacing the React Compiler or making large build-tooling changes.

---

If you'd like, I can add a short PR checklist file and an example Vitest test for `SearchCustomer` (using the existing `data-testid` attributes). Which would you prefer: **PR checklist**, **example test**, or **both**?
