# AGENTS

Instructions for coding agents (and other collaborators) working on this repo. Assume the human partner is non-technical; your job is to guide them clearly.

## Repository Scope
- Devdom marketing/landing website. Priorities: blazingly fast loads, SEO- and GEO-friendly rendering, strong accessibility.
- Keep marketing focus: concise storytelling, fast UX, clean handoff to forms/CTAs.

## Tech Stack
- Use the latest Astro; when unsure, read current docs: https://docs.astro.build/en/getting-started/.
- React with TypeScript inside Astro is preferred.
- Brand tokens: always consult the canonical `frontend/src/styles/brand.css` before making any UI change. Use the defined CSS variables for colors, gradients, shadows, and typography; do not invent new ones without human approval. Keep `brand.css` in sync with human-provided brand updates.

## Frontend Architecture Guidelines (CRITICAL)
- Core principle: Astro renders HTML; React only adds necessary interactivity. JavaScript is a tax—pay it only when there is a clear return.
- Component decision tree (must follow, in order):
  1) Need client-side state/effects/events? No → .astro; Yes → React.
  2) Does it change after load? No → .astro; Yes → React island.
  3) Purely presentational? Yes → .astro; No → React island.
  If a React component fails these tests, it must not exist.
- Astro components (default) for layout, navigation, hero, pricing, testimonials, copy-heavy/SEO sections, footers. Zero JS, no framework imports, semantic HTML, prefer build-time data.
- React components (islands only) for forms, modals/dialogs, dropdowns/menus, toggles, calculators, cookie consent, or anything requiring state/effects. One component = one island; no global app shell, no shared global state between islands, no routing/layout in React.
- Hydration strategy required on every island: prefer `client:visible`, then `client:idle`, then `client:load` (must be justified). `client:only="react"` is last resort.
- Tailwind rules: use utilities for layout/spacing/typography; avoid long unreadable chains; prefer .astro + Tailwind for static UI; extract repeats into Astro components; use `@apply` sparingly for true globals.
- Styling hierarchy: (1) semantic HTML + Tailwind utilities, (2) Astro scoped styles, (3) global CSS for tokens/resets/typography, (4) CSS-in-JS only inside React islands; never for layout/theme site-wide.
- Performance non-negotiables: no React for static content, no full-page hydration, no layout in React, avoid unnecessary client libs/third-party scripts. Track JS per page, island count, and Core Web Vitals—React is first suspect on regressions.
- SEO/GEO: all SEO content must be server-rendered HTML; no JS-required content; use semantic tags; set metadata at build time; structured data must not depend on client JS. LLMs/crawlers should understand pages without executing JS.
- Directory convention (recommended): `src/components/astro/*` for Astro components, `src/components/react/*` for islands; keep layouts under `src/layouts/`, pages under `src/pages/`, styles under `src/styles/`. Separate Astro/React to prevent misuse.
- Red flags (require review): “easier in React”, “might need interactive later”, React for headings/text/layout, multiple islands sharing state, large UI libs for small interactions.
- Final rule: Astro is the site. React is a tool. Tailwind is an accelerator, not an excuse.

## Development Principles
- Follow DRY: before adding code, look for existing utilities/components to reuse or adapt.
- Default to static-first, cache-friendly, minimal-JS approaches.
- Keep dependencies lean and protect Core Web Vitals.

## Working With Humans
- Assume non-technical users. When human input is required (copy, images, metadata, running tests, starting scripts), ask clarifying questions and give step-by-step, plain-language instructions.
- Images are supplied by the human. Tell them exactly where to place files (e.g., `frontend/src/assets/images/<category>/` for optimized images, `frontend/public/` for passthrough). If folders do not exist, explain how to create them.
- Always ask what each provided image represents so you can write accurate alt text, captions, and SEO/GEO metadata (e.g., location, product name, people shown).
- Confirm expectations before major visual/content changes (brand tone, palettes, logos).
- Before shipping any change, double-check with the human that GEO goals are covered: target topics/entities, priority regions, brand terms/synonyms, and needed metadata or assets.
- When creating a new page or making significant changes to an existing page, pause and request design guidance from the human. They can provide either (a) an image mockup/screenshot or (b) a comprehensive text description of the intended layout, content order, imagery, and interactions. Confirm what each part of the design represents so you can align layout, accessibility text, SEO/GEO metadata, and component choices. Always cross-check that UI choices match the brand tokens.

## Accessibility, SEO, and GEO Workflow
- Before coding, gather or confirm: alt text, aria labels, captions, meta title/description, open graph tags, canonical URL, language/region targets, hreflang pairs, structured data type, expected images, and their subjects.
- Offer draft metadata when helpful, but ask the human to confirm anything content-sensitive.
- Enforce semantic HTML, keyboard support, logical focus order, and color-contrast compliance.
- For GEO/SEO, validate locale targets, sitemaps, canonical strategy, and structured data coverage.
- When GEO touches content, ask the human to approve the primary question/answer, entity names, and any claims that need citations or proof points.

## Astro practices the agent must always enforce
- Ship minimal JS: stick to Astro’s static-first output and hydrate only when necessary with `client:load`, `client:idle`, `client:visible`, `client:media`, or `client:only`. Match the directive to the UX need to keep Core Web Vitals healthy.
- Optimize images with `astro:assets` `<Image />`: keep sources under `src/assets`, set width/height, use responsive layouts/srcset, and prefer modern formats (AVIF/WebP). Enable responsive images when available.
- Add motion carefully: use Astro View Transitions for polish while preserving MPA behavior, and honor reduced-motion preferences.
- Lock in SEO plumbing: configure `site` in `astro.config.*` for correct absolute canonicals and routing, and generate sitemaps/robots via `@astrojs/sitemap`.
- Harden security: enable Astro’s experimental CSP (hash-based) when shipping interactive features to reduce XSS risk.
- Watch regressions: run Lighthouse CI (or similar) regularly to catch performance and Core Web Vitals issues before merging.

## GEO best practices
- Answer-first structure: open pages with a concise answer/summary, then expand with clearly headed sections, FAQs, and scannable lists; favor topic/question coverage over single keywords.
- Strengthen entity signals: keep brand/product/person names consistent; add Organization/Person/Product/FAQ schema; include author bios, credentials, and source citations to reinforce E-E-A-T-style trust.
- Build semantic clusters: create pillar pages with interlinked subpages to prove topical authority; map clusters to the human’s priority topics/entities.
- Multimodal with metadata: use human-supplied images stored under `frontend/src/assets/images/`; request what each image depicts and its locale so you can craft alt text, captions, and IPTC/OG/Twitter metadata.
- Technical hygiene: keep LCP on mobile near/below ~1.8s; enforce HTTPS, canonical URLs, clean internal linking, sitemap/robots; log AI user agents where possible.
- Crawler guidance: honor/extend `robots.txt` for AI bots (e.g., GPTBot, Google-Extended, ClaudeBot, PerplexityBot). An optional `llms.txt` can be added, but major crawlers do not reliably use it yet—clarify with the human before adding.
- RAG-friendly content: write in short, self-contained paragraphs with clear headings so retrieval systems can quote accurately; avoid burying key facts in long blocks.
- Continuous monitoring: ask the human to track AI citations/mentions and run quarterly GEO audits; adjust structured data, entities, and clusters based on findings.

## Workflow Expectations
- When introducing new patterns, document them briefly in `README.md` or relevant docs.
- Prefer small, incremental changes with clear commit messages. Run available lint/tests if present; if commands are missing, suggest or add minimal scripts as needed.
