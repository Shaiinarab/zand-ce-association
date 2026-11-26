# Zand CE Hub — build specification

> This document supersedes the original v0.2 Next.js implementation notes. The original intent and acceptance criteria are retained where relevant; the active implementation is documented in [architecture-v0.4.md](architecture-v0.4.md).

## Current acceptance criteria

1. The Go exporter generates a Persian-first static site from the Markdown content folders.
2. All ten learning paths are discoverable from the homepage and the programs catalogue.
3. All Markdown documents in the seven content groups have generated reading pages.
4. The same exporter supports GitHub Pages subpaths and Vercel's root domain.
5. TypeScript 7 validates browser enhancements and emits the client bundle.
6. Vercel exposes a stateless Go search function; GitHub Pages uses browser-side search.
7. The three independent workshop repositories remain independent sources of truth.
8. The site clearly marks proposed content and does not imply institutional approval.

## Verification

```bash
npm run check
npm run typecheck
go test ./...
go vet ./...
npm run build
```

## Non-goals

No accounts, registration database, member records, payments, or persistent learner tracking in this release.
