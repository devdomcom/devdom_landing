# Devdom Landing

This repository hosts the source for the Devdom marketing/landing site, built with Astro 5+, React, TypeScript, and Tailwind CSS 4. Frontend code lives in `frontend/`.

## Quick start
- `cd frontend`
- `npm install`
- `npm run dev` to start the local server
- `npm run build` to produce the static site in `frontend/dist/`
- Helper commands (run inside `frontend/`):
  - `make create` to start a new feature branch safely
  - `make save` to run checks, commit, and push
  - `make discard` to drop all uncommitted frontend changes (with confirmation)

## Tech notes
- Uses `@astrojs/react` for React islands and `@tailwindcss/vite` (Tailwind 4).
- Global styles live in `frontend/src/styles/global.css`; images go under `frontend/src/assets/images/<category>/`.

## Color system
- Palette lives in `frontend/src/styles/brand.css` (`--color-*`), with paired light/dark semantic tokens (`--surface-*`, `--text-*`, `--action-*`, `--status-*`, etc.).
- Tailwind maps palette + semantics in `frontend/tailwind.config.cjs` (e.g., `bg-surface-card`, `text-ink-primary`, `border-border-subtle`, `bg-action-primary`, `text-action-link`).
- Components must consume semantic tokens, not raw palette, so light/dark swaps happen automatically. Palette-only usage is reserved for visual swatches or special brand treatments.
- Focus rings use `--focus-ring-color`; overlays use `--overlay-scrim`; form controls use `--field-*`; statuses use `--status-*`.

## License
- Code is MIT. Brand, name, logo, and content are not licensed for reuse.
- See `LICENSE` for the full MIT license text.
