# Cuisko website

**The website for [Cuisko](https://cuisko.app), the meal planner that starts with the food you
already own.**

It holds the landing page, the contact and support pages, and the legal pages the app and its store
listings link to. The site is static and has no backend. The app itself lives in its own repository.

## Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS 4, with the app's colors and surfaces mirrored in `globals.css`
- **Content:** the legal pages are Markdown, rendered through MDX
- **Language:** TypeScript

## Pages

| Route                         | What it is                                  |
| ----------------------------- | ------------------------------------------- |
| `/`                           | Landing page                                |
| `/contact`                    | Support email and publisher details         |
| `/help/delete-account`        | How to delete a Cuisko account and its data |
| `/policies/privacy-policy`    | Privacy policy                              |
| `/policies/terms-of-use`      | Terms of use                                |
| `/policies/legal-notices`     | Legal notices                               |

## Layout

```
src/app/         routes, root layout and globals.css (theme tokens)
src/components/  site chrome (header, footer) and the landing sections
src/ui/          web ports of the app's UI components
src/global/      site-wide constants: URLs, store links, support email
content/         the legal pages, as Markdown
public/assets/   screens, plates, mascot and videos from the app
```

## Running it locally

Requires Node and pnpm.

```bash
pnpm install
pnpm dev       # http://localhost:3000
```

`pnpm verify` runs typecheck and lint, and the git hooks run it before every commit. Run
`pnpm build` when you change routes, `content/` or `next.config.ts`.

## Documentation

- [AGENTS.md](AGENTS.md): the rules coding agents follow in this repo, including the commit format

## License

Copyright (c) 2026 Sellest-AI. All rights reserved.
