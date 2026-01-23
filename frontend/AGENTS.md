# AGENTS

Instructions for coding agents (and other collaborators) working on this repo. Assume the human partner is non-technical; your job is to guide them clearly.

## Repository Scope
- Devdom marketing/landing website. Priorities: blazingly fast loads, SEO- and GEO-friendly rendering, strong accessibility.
- Keep marketing focus: concise storytelling, fast UX, clean handoff to forms/CTAs.

## Tech Stack
- Use the latest Astro; when unsure, read current docs: https://docs.astro.build/en/getting-started/.
- React with TypeScript inside Astro is preferred.

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

## GEO best practices (January 2026)
- Answer-first structure: open pages with a concise answer/summary, then expand with clearly headed sections, FAQs, and scannable lists; favor topic/question coverage over single keywords.
- Strengthen entity signals: keep brand/product/person names consistent; add Organization/Person/Product/FAQ schema; include author bios, credentials, and source citations to reinforce E-E-A-T-style trust.
- Build semantic clusters: create pillar pages with interlinked subpages to prove topical authority; map clusters to the human’s priority topics/entities.
- Multimodal with metadata: use human-supplied images stored under `src/assets/images/`; request what each image depicts and its locale so you can craft alt text, captions, and IPTC/OG/Twitter metadata.
- Technical hygiene: keep LCP on mobile near/below ~1.8s; enforce HTTPS, canonical URLs, clean internal linking, sitemap/robots; log AI user agents where possible.
- Crawler guidance: honor/extend `robots.txt` for AI bots (e.g., GPTBot, Google-Extended, ClaudeBot, PerplexityBot). An optional `llms.txt` can be added, but major crawlers do not reliably use it yet—clarify with the human before adding.
- RAG-friendly content: write in short, self-contained paragraphs with clear headings so retrieval systems can quote accurately; avoid burying key facts in long blocks.
- Continuous monitoring: ask the human to track AI citations/mentions and run quarterly GEO audits; adjust structured data, entities, and clusters based on findings.

## Workflow Expectations
- When introducing new patterns, document them briefly in `README.md` or relevant docs.
- Prefer small, incremental changes with clear commit messages. Run available lint/tests if present; if commands are missing, suggest or add minimal scripts as needed.
