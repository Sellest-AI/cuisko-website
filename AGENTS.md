# Agent Instructions

**cuisko-web** — the marketing site for the Cuisko app (`../cuisko`): landing page, contact,
account-deletion help and the legal pages. Next.js (App Router) + Tailwind 4. Static, no backend.

## Commands

```bash
pnpm verify        # typecheck + lint — the pre-commit and pre-merge-commit hooks run this and
                   # refuse the commit if it fails. `--no-verify` bypasses them.
pnpm dev           # dev server on :3000
pnpm build         # production build — run it when touching routes, content/ or next.config.ts
```

## Pointers

- Colors in `src/app/globals.css` mirror `../cuisko/src/global/theme.ts` — keep the two in sync.
- The site speaks the app's UI, not a separate brand: `src/ui/components/` are web ports of
  `../cuisko/src/ui/components` (`ButtonPill`, `MealCard`, plate carousel,
  `TiltedPhoto`), and `glass` / `bg-screen` / `glow` in `globals.css` are the app's frosted surface,
  screen gradient and `RadialGradient`. Port from the app before inventing a new component.
- Images in `public/assets` come from the portfolio (`../portfolios/portfolio-2026`), which holds
  the most recent screens and renders; cut-outs it lacks come from `../cuisko/assets`. Plates are
  hand-picked from the app's own generated `plateImageId` images (Convex dev deployment), downscaled
  to 600px — pick for appetite, a full round plate and clean cut-out edges.
- Legal pages render `content/*.md` through MDX. The publisher details there, on `/contact` and in
  the app's own policies must stay identical.
- Site-wide constants (URLs, support email) live in `src/global/website.ts`.

## Never

| Rule                                                                   |
| ---------------------------------------------------------------------- |
| Never commit secrets, force-push, or `git commit` unless asked         |
| Never add a `Co-Authored-By` or any AI-attribution trailer to a commit |

## Writing a commit

**First, check the branch: `git branch --show-current`.** The `pre-commit` hook validates the branch
*name* against the type vocabulary; it cannot tell whether the change belongs there. If the change
does not serve what the branch exists to do, **stop and ask the user** which branch it belongs on.

- **The hooks check the files on disk, not what you commit.** An uncommitted edit can hide a broken
  commit, so trust `pnpm verify` only once nothing is left uncommitted. Commit `package.json` whole.
- **Into `main`:** rename a `claude/…` branch to `<type>/…` (the hook refuses it), merge `main` into
  it, verify, then a plain `git merge`. Never `--no-ff`.

Format is Conventional Commits. The rules live in `commitlint.config.js`, which the `commit-msg` hook
runs; branch names are checked by `.githooks/pre-commit`. When the two disagree with a doc, they win.
The full convention is `../cuisko/docs/CONVENTIONS.md` §10 — this repo follows it unchanged.

```
<type>(<scope>)?: <imperative subject, ≤72 chars, lowercase, no full stop>
```

Types: `feat` `fix` `refactor` `perf` `docs` `test` `chore` `ci` `revert`. Scopes here: `landing` ·
`legal` · `contact` · `ui` · `content` · `deps` · `config`. Prefer an existing scope over a synonym.
Branches: `<type>/<kebab-case-summary>`, plus `hotfix/`. One logical change per commit.

**Write the body for an agent reading `git log` a year from now.** It will have the diff; what it
cannot recover is intent:

- **The trigger** — what was broken, missing or newly required. Highest-value sentence in the message.
- **What changed by layer**, not by file.
- **What you deliberately did not do**, if a reader would wonder.

Omit the body only when the subject is complete alone (`chore(deps): bump next to 16.2`).

⚠️ **Never start a body line with `word:`.** The parser reads `Note:`, `Result:` as a footer token and
treats everything after it as footers. The `commit-msg` hook refuses it (`no-footer-shaped-body-line`),
except for real footer tokens — reword so the colon is mid-line.
