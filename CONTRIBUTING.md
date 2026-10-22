# Contributing to Whimsy.KE

Karibu! Follow these quick guidelines to keep the Whimsy.KE codebase clean, accessible, and delightful.

## Branch Naming

Use short, descriptive branch names prefixed by type:

- `feat/gift-builder-step-flow`
- `fix/mobile-sheet-safe-area`
- `docs/update-payment-guide`
- `chore/bump-dependencies`

## Commit Style (Conventional Commits)

Commits are validated automatically by `commitlint` via Husky. Format:

```text
<type>(<optional-scope>): <short summary in imperative mood>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

## Checks Before Pushing

Always run the full verification suite before opening a PR or tagging a milestone:

```bash
pnpm check
```

This runs:

1. `pnpm format:check` (Prettier + Tailwind class sorting)
2. `pnpm lint` (ESLint + `jsx-a11y` + strict TypeScript rules)
3. `pnpm typecheck` (`tsc --noEmit` with `noUncheckedIndexedAccess`)
4. `pnpm test` (Vitest unit & component tests)
5. `pnpm build` (Next.js production build)
