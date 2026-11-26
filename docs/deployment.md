# Deployment

## GitHub Pages

The Pages workflow builds the site with the repository subpath supplied by `actions/configure-pages`. It publishes the `dist/` directory after content, TypeScript and Go checks pass.

Repository setting: **Settings → Pages → Build and deployment → GitHub Actions**.

## Vercel

Import `Shaiinarab/zand-ce-association` and keep the project root at the repository root. The repository's `vercel.json` runs `npm run build`, publishes `dist/`, and detects `api/search.go` as a Go Function.

The static pages work without server state. The Go endpoint only returns filtered HTML fragments; it does not collect personal data or persist user input.

## Local build

```bash
go mod download
npm run check
npm run typecheck
npm run build
```

To preview:

```bash
python3 -m http.server 8080 --directory dist
```

For GitHub Pages path simulation:

```bash
go run ./cmd/export -out dist -base-path /zand-ce-association -site-url https://shaiinarab.github.io/zand-ce-association
```

## Hosting caveat

Vercel's Hobby plan has personal/non-commercial eligibility conditions. Confirm that the account and association use fit the current terms before treating it as the association's long-term institutional host. GitHub Pages remains the static fallback.
