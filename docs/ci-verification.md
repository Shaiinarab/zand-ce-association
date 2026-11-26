# CI verification notes

The Go module checksum file (`go.sum`) is committed so clean checkouts can run `go test ./...` without modifying dependency metadata. The quality workflow checks content, TypeScript 7, Go tests and vet, and the generated static routes.
