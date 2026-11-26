package handler

import (
	"net/http"
	"strings"

	"github.com/Shaiinarab/zand-ce-association/internal/site"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Set("Allow", http.MethodGet)
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "public, max-age=60, stale-while-revalidate=300")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	_, _ = w.Write([]byte(site.SearchHTML(strings.TrimSpace(r.URL.Query().Get("q")))))
}
