# Zand CE Hub v0.4 — Architecture

## Goals

- Keep the existing Markdown curriculum and governance documents as the canonical content source.
- Serve a Persian-first, accessible learning hub with a fast static-first experience.
- Publish the same generated pages to GitHub Pages and Vercel.
- Preserve Workshop Zero, Bootcraft and Crypto Hype as independent repositories and release units.
- Avoid accounts, student PII, databases and paid infrastructure in the MVP.

## Runtime and build

```text
Markdown sources
      |
      v
Go exporter (cmd/export + internal/site)
      |
      +---- dist/ ---- GitHub Pages
      |          |
      |          +---- browser search (TypeScript 7)
      |
      +---- dist/ ---- Vercel static output
                         |
                         +---- /api/search (Go Function)
                                      |
                                      +---- htmx 4 HTML fragment
```

Go is responsible for content inventory, page generation, metadata, sitemap and the Vercel search function. htmx enhances the search interaction when the Go endpoint exists. TypeScript provides client-side search so the same static build remains usable on GitHub Pages, where Go functions cannot run.

## Content model

The seven content folders remain the source of truth. The ten learning paths are represented in the Go catalogue and link to their detailed Markdown curricula. External workshop repositories remain independent and are linked rather than copied.

## Hosting

- GitHub Pages deploys `dist/` from Actions. The exporter receives the repository base path.
- Vercel builds with `npm run build`, serves `dist/`, and deploys `api/search.go` as a Go Function.
- No credentials, private data or persistence are required.
- The Vercel Hobby plan is intended for personal/non-commercial use; verify the current plan terms and the association's eligibility before relying on it for institutional operations.

## Quality gates

- Markdown inventory and required learning-path files.
- TypeScript 7 typecheck.
- Go tests and `go vet`.
- Static export smoke tests.
- CI deploys Pages only after all build checks pass.

## Explicit non-goals

No user accounts, student records, registration database, payment processing, AI chatbot, or persistent progress tracking in this release.
