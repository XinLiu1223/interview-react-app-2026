# Copilot / AI agent instructions for interview-react-app-2026

Purpose: Give AI coding agents the concise, actionable context they need to be productive in this repo.

## Big picture
- Frontend-only React + TypeScript app built with Vite. No backend or CI manifests detected.
- Entry point: `src/main.tsx` renders `src/App.tsx`. Static public assets live in `public/` and `src/assets/`.
- Uses React 19 with the React Compiler enabled via `@vitejs/plugin-react` + `babel-plugin-react-compiler`. This affects dev HMR and build performance — keep changes minimal when experimenting with compiler behavior.

## Important files to read first
- `package.json` — scripts: `dev`, `build` (`tsc -b && vite build`), `lint`, `preview`.
- `vite.config.ts` — plugin config (React Compiler + Babel plugin). Modify here to change build/refresh behavior.
- `tsconfig.app.json` — strict TypeScript settings (e.g., `noUnusedLocals`, `noUncheckedSideEffectImports`, `allowImportingTsExtensions`). Note code sometimes imports `.tsx` files with extensions (see `src/main.tsx`).
- `eslint.config.js` — project ESLint rules (typescript-eslint, react-hooks, vite refresh rules).
- `src/` (esp. `main.tsx`, `App.tsx`) — where app components and example patterns live.

## Project-specific conventions & gotchas
- TypeScript: `noEmit` + `moduleResolution: "bundler"` and `allowImportingTsExtensions: true`. Importing local `.ts/.tsx` files with explicit extensions is used in at least one place (`import App from './App.tsx'`) — follow existing import style for consistency.
- React Compiler: enabled via `vite.config.ts` and `babel-plugin-react-compiler`. Changing or removing this can change HMR behavior and build performance.
- Linting: ESLint is configured via `eslint.config.js` — run `npm run lint`. To auto-fix lints: `npm run lint -- --fix`.
- No test framework detected — if adding tests, include config and scripts in `package.json` and document them here.

## Typical developer workflows (examples)
- Start dev server with HMR: `npm run dev` (opens Vite dev server)
- Build production bundle: `npm run build` (runs `tsc -b` then `vite build`)
- Preview production build locally: `npm run preview` (after build)
- Run linter: `npm run lint` (add `-- --fix` to auto-fix)

## How to make safe changes
- When changing TypeScript config: run `npm run build` to detect type errors (it runs `tsc -b`).
- When changing lint rules: run `npm run lint` and include `--fix` when appropriate.
- When touching React Compiler or Babel config: test both `npm run dev` and `npm run build` — compiler changes can affect HMR and build output.

## Examples (do / don't)
- Do: Preserve explicit `.tsx` import extension where present (e.g., `src/main.tsx` -> `import App from './App.tsx'`).
- Do: Inspect `vite.config.ts` when HMR or refresh behavior changes unexpectedly.
- Don't: Assume tests exist; add a test framework and scripts when introducing tests.

## Integration points / external dependencies
- No external APIs or backend integrations are present. All external deps are npm packages (see `package.json`). Key ones: `vite`, `react`, `@vitejs/plugin-react`, `typescript`.

## When you need more info
- If a task requires CI config, tests, or Node engine policy, ask the maintainer for preferred choices — none are in the repo.

---

If you want, I can expand any section, add example PR checklists, or include common troubleshooting commands discovered while running this project's scripts. Any parts unclear or missing that you'd like me to add?