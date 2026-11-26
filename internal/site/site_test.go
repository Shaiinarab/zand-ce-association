package site

import (
	"strings"
	"testing"
)

func TestSearchHTMLFiltersPaths(t *testing.T) {
	got := SearchHTML("robotics")
	if !strings.Contains(got, "روباتیک") { t.Fatal("expected robotics path") }
	if strings.Contains(got, "Bootcraft") { t.Fatal("unrelated path should not match") }
}

func TestSearchHTMLEmptyQueryReturnsAll(t *testing.T) {
	got := SearchHTML("")
	if !strings.Contains(got, "کارگاه صفر") || !strings.Contains(got, "مهندسی نرم‌افزار") { t.Fatal("expected full path catalogue") }
}

func TestSearchHTMLNoMatches(t *testing.T) {
	got := SearchHTML("not-a-real-topic")
	if !strings.Contains(got, "نتیجه‌ای پیدا نشد") { t.Fatal("expected empty state") }
}
