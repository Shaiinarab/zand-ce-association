package main

import (
	"flag"
	"io"
	"log"
	"os"
	"path/filepath"

	"github.com/Shaiinarab/zand-ce-association/internal/site"
)

func main() {
	out := flag.String("out", "dist", "directory for the static site")
	basePath := flag.String("base-path", "", "URL prefix, e.g. /zand-ce-association for GitHub Pages")
	siteURL := flag.String("site-url", "https://shaiinarab.github.io/zand-ce-association", "canonical site origin")
	root := flag.String("root", ".", "repository root containing the content folders")
	flag.Parse()

	if err := site.Export(*root, *out, *basePath, *siteURL); err != nil {
		log.Fatal(err)
	}
	if err := copyPublic(filepath.Join(*root, "public"), *out); err != nil && !os.IsNotExist(err) {
		log.Fatal(err)
	}
	log.Printf("Zand CE Hub exported to %s", *out)
}

func copyPublic(src, dst string) error {
	return filepath.WalkDir(src, func(path string, entry os.DirEntry, walkErr error) error {
		if walkErr != nil { return walkErr }
		rel, err := filepath.Rel(src, path)
		if err != nil { return err }
		if rel == "." { return nil }
		target := filepath.Join(dst, rel)
		if entry.IsDir() { return os.MkdirAll(target, 0755) }
		in, err := os.Open(path)
		if err != nil { return err }
		defer in.Close()
		if err := os.MkdirAll(filepath.Dir(target), 0755); err != nil { return err }
		out, err := os.Create(target)
		if err != nil { return err }
		defer out.Close()
		_, err = io.Copy(out, in)
		return err
	})
}
