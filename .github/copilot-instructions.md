# Copilot / AI agent instructions for interview-react-app-2026

Purpose: Give AI coding agents the concise, actionable context they need to be productive in this repo.

## Big picture

- Frontend-only React + TypeScript single-page app built with Vite. There is no backend or CI configuration in this repo.
- Entry point: `src/main.tsx` renders `src/App.tsx`. Public/static assets live under `public/` and `src/assets/`.
- Uses **React 19** with the **React Compiler** enabled via `@vitejs/plugin-react` + `babel-plugin-react-compiler`. This affects dev HMR and build performance — avoid broad changes to compiler config without testing both `dev` and `build` flows.

## Quick facts

- Scripts (see `package.json`):
  - `npm run dev` — start Vite dev server (HMR)
  - `npm run build` — `tsc -b` then `vite build` (type-check + bundle)
  - `npm run preview` — preview a production build
  - `npm run lint` — run ESLint (use `-- --fix` to autofix)
- No test runner configured; the codebase contains test-friendly attributes (see "Component patterns & tests" below).

## Important files to read first

- `package.json` — scripts and dependencies
- `vite.config.ts` — React plugin + Babel plugin configuration (look here if HMR or compiler behaviour changes)
- `tsconfig.app.json` — strict TypeScript settings (moduleResolution: "bundler", `allowImportingTsExtensions`, `noEmit`, etc.)
- `eslint.config.js` — uses `@typescript-eslint`, `react-hooks`, and `react-refresh` rules
- `src/` (start with `App.tsx`, `main.tsx`, and the `hacker-rank-interview/` folder for real examples)

## Component patterns & concrete examples

- Components use default exports and simple prop types. Example: `src/hacker-rank-interview/CustomerList.tsx` exports a `CustomerList` component that accepts `customers: typeof List`.
- Code uses explicit file extension imports in places (e.g., `import App from './App.tsx'`). Keep that style when adding new local imports.
- Test hooks are present: `SearchCustomer.tsx` renders the search input with `data-testid="search-input"`, and `CustomerList.tsx` contains `<tbody data-testid="searched-customers">`. Use these when writing unit/integration tests (React Testing Library / Vitest).
- CSS is plain global CSS in `src/*.css` and `App.css` (no CSS modules). Classes like `layout-row`, `card`, and `logo` are used across components.

## Conventions & gotchas

- TypeScript: project has _very strict_ checks enabled (`strict`, `noUnusedLocals`, `noUncheckedSideEffectImports`, etc.). Changes to typings or public APIs must be type-checked via `npm run build`.
- Compiler: `babel-plugin-react-compiler` is added in `vite.config.ts`. Modifying or removing this plugin can change hot reload behavior and should be validated by running both `dev` and `build`.
- Linting: ESLint is configured via `eslint.config.js` and includes `react-refresh` rules — run `npm run lint` to check styling and rules.
- No tests: There is no test framework configured; however, components already include `data-testid` attributes to make test authoring straightforward.

## Suggested test approach (if you add tests)

- Use Vitest or Jest + React Testing Library. Example test targets:
  - Search behavior in `SearchCustomer.tsx` (use `data-testid="search-input"` and assert rendered rows in `data-testid="searched-customers"`).
  - Edge cases: empty query, non-array input guards in `searchAllFields`.
- Add scripts to `package.json` (e.g., `test` and `test:watch`) and document them in this file.

## Typical developer workflows (examples)

1. Start dev server: `npm run dev` (HMR) — edit `src/App.tsx` to verify fast refresh
2. Fix lint issues: `npm run lint -- --fix`
3. Build + type-check: `npm run build` (runs `tsc -b` first)
4. Preview production bundle: `npm run preview` (after `build`)

## How to make safe changes

- When changing TypeScript config: run `npm run build` to detect type errors. Be conservative with `tsconfig` edits because of the strict settings.
- When changing compiler/babel config (in `vite.config.ts`): test both `npm run dev` and `npm run build` to verify HMR and production builds behave as expected.
- When adding lint rules: run `npm run lint` and include `-- --fix` where appropriate.

## When to ask the maintainer

- If a task requires CI, testing framework selection, or Node engine policy, ask for the preferred choices (none are currently configured).
- If you propose removing the React Compiler or changing major build tooling, discuss the trade-offs with the maintainer before landing the change.

---

If you'd like, I can also:

- Add a short PR checklist (build, lint, run dev, add tests) to speed up future contributions ✅
- Open a draft `test` script and example Vitest test that uses the existing `data-testid` attributes 💡

Would you like me to add either of these now? Please tell me which (PR checklist, example tests, or both) and I will add them.
