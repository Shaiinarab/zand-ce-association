# Spec — Zand CE Hub v0.2 (merge `zand-ce-hub-source` into the starter)

Status: ready-for-dev
Date: 2026-11-17
Owner: Shahin Arab (acting secretary)
Goal: one deployable Persian-first hub that presents the association starter pack and three practical programs, without inventing institutional approval.

## Frozen intent

Merge the Next.js hub landing source (`zand-ce-hub-source.zip`) into `zand-ce-association-starter`, make it build and run, and keep the starter's 27 governance/workshop documents as the single source of truth for content.

## Users and jobs

- Prospective student: understand the three practical programs and reach the correct workshop in under two minutes.
- Council member: open any governance document from one map, without hunting through folders.
- Organizer/demo reviewer: see live counts (docs, workshops, decisions, roadmap gates) rather than stale marketing copy.

## Acceptance criteria

1. Given a clean checkout, when `npm ci && npm run build` runs, then a static export lands in `out/` with zero type errors.
2. Given `npm run dev`, when `/` loads, then the hero, three program cards, boot chain, output wall, calendar and local-only interest preview render RTL Persian on a dark lab palette.
3. Given `/programs/crypto-hype`, when it loads, then the blockchain workshop overview links to the live practical lab and the workshop curriculum document.
3. Given `/docs`, when it loads, then every markdown file in `00-governance` … `06-research` appears exactly once, grouped by domain, with a title and excerpt.
4. Given `/docs/<group>/<doc>`, when it loads, then the markdown renders with headings, tables, lists, links, a table of contents and previous/next navigation.
5. Given `/roadmap`, when it loads, then the 90-day roadmap table is rendered as gates with the stop rule preserved verbatim.
6. Given `/terminal`, when the user types `help`, `ls`, `open <doc>`, `status`, `boot`, `roadmap` or `clear`, then the terminal responds locally and `open` navigates to the document.
7. Given the repository, when `git status` runs, then `node_modules/`, `.next/`, `out/` and `.vercel/` are ignored.
8. Given GitHub Pages or Vercel, when the repo is connected, then the provided workflow/config builds the static export without a server runtime.

## Non-goals

- No backend, database, authentication or member-data storage.
- No claim of institutional approval, ACM/IEEE affiliation, or verified workshop content.
- No automatic publishing to GitHub or Vercel.

## Code map

- `app/layout.tsx` — RTL shell, metadata, local Vazirmatn font.
- `app/page.tsx` — hub landing; reads live stats from `lib/content.ts`.
- `app/docs/page.tsx` — system map of all documents.
- `app/docs/[...slug]/page.tsx` — static markdown route with TOC and navigation.
- `app/programs/crypto-hype/page.tsx` — blockchain and DeFi workshop overview.
- `app/sitemap.ts` and `app/robots.ts` — static SEO discovery files.
- `app/roadmap/page.tsx` — parsed 90-day roadmap.
- `app/terminal/page.tsx` + `components/hub/terminal.tsx` — local command terminal.
- `components/hub/join-form.tsx` — interest form preview (no network).
- `lib/content.ts` — filesystem content model, excerpts, stats, roadmap parser.
- `public/` — og image, creative playbook PDF, cover, generated originals.
- `next.config.ts` — `output: "export"`, trailing slashes, unoptimized images.
- `.github/workflows/pages.yml` — build + deploy `out/` to GitHub Pages.
- `vercel.json` — framework preset, no runtime secrets.

## Verification

- `npm run check && npm run typecheck && npm run build` (must exit 0 and produce `out/index.html`, the crypto program page, `sitemap.xml` and `robots.txt`).
- `npm run dev` + `curl` smoke checks for `/`, `/docs`, `/docs/governance/charter-draft`, `/roadmap`, `/terminal`.
- Content parity: count of `.md` files equals count of document cards.
- Accessibility: skip link, landmarks, labelled form fields, reduced-motion CSS.

## Stop rule

If a document, owner, permission or minimum support is missing, the activity is deferred; the hub must show the gap rather than hide it.
