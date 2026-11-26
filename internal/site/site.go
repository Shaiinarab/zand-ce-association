package site

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
)

type Path struct {
	Code, Slug, Category, Title, Description, Level, Status, Source, Href string
	External bool
}

var Paths = []Path{
	{"AI", "workshop-zero", "AI & INTELLIGENCE", "کارگاه صفر · آزمایشگاه هوش مصنوعی", "هوش مصنوعی کاربردی، آفرینش دیجیتال، توسعه Agent و پژوهش؛ با هسته مشترک و سه مسیر تخصصی.", "چندسطحی", "پروژه مستقل", "Workshop Zero", "https://shaiinarab.github.io/workshop-zero/index.html", true},
	{"SYS", "bootcraft", "SYSTEMS", "Bootcraft · سیستم و زیرساخت", "Firmware، UEFI، دیسک، نصب سیستم‌عامل، بوت‌لودر، لینوکس و بازیابی کنترل‌شده.", "مقدماتی تا متوسط", "پروژه مستقل", "Bootcraft", "https://shaiinarab.github.io/bootcraft-workshops/", true},
	{"WEB3", "crypto-hype", "BLOCKCHAIN & DATA", "آخرین قطرات هایپ · بلاکچین و DeFi", "فهم بلاکچین، قرارداد هوشمند، AMM و تحلیل داده‌های عمومی آن‌چین؛ بدون توصیه معاملاتی.", "مقدماتی تا متوسط", "پروژه مستقل", "Crypto Hype", "https://shaiinarab.github.io/crypto-hype-last-drops/", true},
	{"SE", "software-engineering", "SOFTWARE", "مهندسی نرم‌افزار و برنامه‌نویسی", "از الگوریتم و Git تا وب، Backend، API، پایگاه داده، تست، CI و پروژه تیمی.", "مقدماتی تا پیشرفته", "طرح آموزشی", "طرح مسیر", "/docs/02-workshops/path-software-engineering/", false},
	{"GAME", "game-development", "INTERACTIVE MEDIA", "بازی‌سازی و تجربه تعاملی", "طراحی بازی، Godot، Unity، ورودی، فیزیک، صدا، تست و انتشار بازی کوچک.", "مقدماتی تا پیشرفته", "طرح آموزشی", "طرح مسیر", "/docs/02-workshops/path-game-development/", false},
	{"IOT", "iot-embedded", "EMBEDDED & CONNECTED", "اینترنت اشیا و سیستم‌های نهفته", "ESP32، Arduino، سنسورها، پروتکل‌ها، MQTT، داشبورد و امنیت دستگاه.", "مقدماتی تا پیشرفته", "طرح آموزشی", "طرح مسیر", "/docs/02-workshops/path-iot-embedded/", false},
	{"ROB", "robotics", "ROBOTICS", "روباتیک و سامانه‌های خودمختار", "الکترونیک، موتور، حسگر، کنترل، ROS 2، شبیه‌سازی و حرکت ایمن.", "مقدماتی تا پیشرفته", "طرح آموزشی", "طرح مسیر", "/docs/02-workshops/path-robotics/", false},
	{"SEC", "cybersecurity", "CYBER DEFENSE", "امنیت سایبری و دفاع دیجیتال", "مدل تهدید، سخت‌سازی، امنیت وب و شبکه، تحلیل رخداد و توسعه امن.", "مقدماتی تا پیشرفته", "طرح آموزشی", "طرح مسیر", "/docs/02-workshops/path-cybersecurity/", false},
	{"CTF", "ctf", "SECURITY CHALLENGES", "فتح پرچم · CTF", "چالش‌های Web، Crypto، Forensics، Reverse، Pwn و OSINT در محیط مجاز و ایزوله.", "مقدماتی تا پیشرفته", "طرح آموزشی", "طرح مسیر", "/docs/02-workshops/path-ctf/", false},
	{"NET", "networking", "NETWORKS & INFRA", "شبکه و زیرساخت", "TCP/IP، subnetting، switching، routing، DNS، Linux Networking و مجازی‌سازی.", "مقدماتی تا پیشرفته", "طرح آموزشی", "طرح مسیر", "/docs/02-workshops/path-networking/", false},
}

var groups = []string{"00-governance", "01-orientation", "02-workshops", "03-podcast", "04-alumni-mentoring", "05-operations", "06-research"}
var md = goldmark.New(goldmark.WithExtensions(extension.GFM))

func esc(s string) string { return template.HTMLEscapeString(s) }
func href(base, path string) string {
	if strings.HasPrefix(path, "http://") || strings.HasPrefix(path, "https://") { return path }
	return strings.TrimRight(base, "/") + "/" + strings.TrimLeft(path, "/")
}
func write(out, name, body string) error {
	target := filepath.Join(out, filepath.FromSlash(name))
	if err := os.MkdirAll(filepath.Dir(target), 0755); err != nil { return err }
	return os.WriteFile(target, []byte(body), 0644)
}
func markdown(source string) template.HTML {
	var b bytes.Buffer
	if err := md.Convert([]byte(source), &b); err != nil { return template.HTML("<p>Unable to render document.</p>") }
	return template.HTML(b.String())
}
func shell(base, title, description, body string) string {
	return fmt.Sprintf(`<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0a1018"><meta name="description" content="%s">
<title>%s · Zand CE Hub</title><link rel="icon" type="image/svg+xml" href="%s/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="%s/assets/site.css">
<script defer src="https://unpkg.com/htmx.org@4.0.0/dist/htmx.min.js"></script>
<script defer src="%s/assets/app.js"></script>
</head><body>
<a class="skip" href="#main">رفتن به محتوای اصلی</a>
<header class="top"><a class="brand" href="%s/"><span class="brand-mark">Z</span><span><b>ZAND CE</b><small>COMPUTER ENGINEERING</small></span></a>
<nav aria-label="ناوبری اصلی"><a href="%s/programs/">مسیرهای یادگیری</a><a href="%s/docs/">کتابخانه اسناد</a><a href="%s/roadmap/">نقشه راه</a><a class="nav-cta" href="https://github.com/Shaiinarab/zand-ce-association">مشارکت در GitHub ↗</a></nav></header>
<main id="main">%s</main>
<footer class="footer"><div><b>ZAND CE HUB</b><p>درگاه یادگیری و مستندات انجمن مهندسی کامپیوتر مؤسسه آموزش عالی زند شیراز</p></div><div class="footer-links"><a href="%s/programs/">مسیرها</a><a href="%s/docs/">اسناد</a><a href="https://github.com/Shaiinarab/zand-ce-association">مخزن پروژه</a></div><p class="fine">وضعیت برنامه‌ها پیشنهادی است و به‌معنی تصویب رسمی، تأیید زمان‌بندی یا وابستگی به ACM/IEEE نیست.</p></footer>
</body></html>`, esc(description), esc(title), base, base, base, base, base, base, base, body, base, base)
}
func card(p Path, base string) string {
	target := href(base, p.Href)
	rel := ""
	if p.External { rel = ` target="_blank" rel="noopener noreferrer"` }
	return fmt.Sprintf(`<a class="path-card" href="%s"%s data-path-card><div class="card-top"><span class="code">%s</span><span class="status">%s</span></div><p class="eyebrow">%s</p><h3>%s</h3><p class="muted">%s</p><div class="card-bottom"><span>%s</span><span class="arrow">←</span></div></a>`, esc(target), rel, esc(p.Code), esc(p.Status), esc(p.Category), esc(p.Title), esc(p.Description), esc(p.Level))
}
func Export(root, out, base, siteURL string) error {
	root, _ = filepath.Abs(root)
	out, _ = filepath.Abs(out)
	if err := os.RemoveAll(out); err != nil { return err }
	if err := os.MkdirAll(out, 0755); err != nil { return err }
	for _, asset := range []string{"site.css", "app.js"} {
		src := filepath.Join(root, "web", "static", asset)
		data, err := os.ReadFile(src); if err != nil { return fmt.Errorf("read asset %s: %w", src, err) }
		if err := write(out, "assets/"+asset, string(data)); err != nil { return err }
	}
	if err := write(out, ".nojekyll", ""); err != nil { return err }

	var cards strings.Builder
	for _, p := range Paths { cards.WriteString(card(p, base)) }
	home := fmt.Sprintf(`<section class="hero"><div class="hero-grid"></div><div class="hero-copy"><p class="eyebrow mono">ZAND CE / OPEN LEARNING ECOSYSTEM</p><span class="hero-kicker">LEARN · BUILD · SHARE</span><h1>از کنجکاوی<br><em>تا ساختن.</em></h1><p class="hero-lead">یک درگاه برای مسیرهای یادگیری، کارگاه‌های مستقل، اسناد و پروژه‌های دانشجویی مهندسی کامپیوتر. مسیرت را انتخاب کن، خروجی واقعی بساز و فرایندت را مستند کن.</p><div class="hero-actions"><a class="button primary" href="%s/programs/">کاوش مسیرهای یادگیری <span>←</span></a><a class="button ghost" href="%s/docs/">مرور کتابخانه اسناد</a></div><div class="hero-note"><span class="pulse"></span> محتوای باز و پروژه‌محور · فارسی‌محور · ابزارهای آزاد</div></div><div class="hero-visual" aria-label="نمای گرافیکی شبکه دانش"><div class="orbit orbit-a"></div><div class="orbit orbit-b"></div><div class="core"><span>۰۱</span><b>BUILD</b><small>YOUR NEXT</small></div><span class="node n1">AI</span><span class="node n2">SYS</span><span class="node n3">WEB</span><span class="node n4">SEC</span><span class="node n5">DATA</span><span class="node n6">∞</span><div class="visual-caption">A CONNECTED LEARNING MAP</div></div></section>
<section class="section intro"><div><p class="eyebrow mono">THE HUB / 001</p><h2>دانش را به <em>خروجی</em> تبدیل کن.</h2></div><p class="muted intro-copy">به‌جای فهرست بلند ابزارها، با مسئله شروع می‌کنیم. هر مسیر باید پیش‌نیاز، تمرین، خروجی قابل بررسی و مرز ایمنی روشن داشته باشد. سه پروژه اجرایی موجود نیز مخزن و چرخه انتشار مستقل خود را حفظ می‌کنند.</p></section>
<section class="section paths-section"><div class="section-head"><div><p class="eyebrow mono">LEARNING PATHS / 01—10</p><h2>مسیرهای یادگیری</h2></div><a class="text-link" href="%s/programs/">مشاهده کاتالوگ کامل ←</a></div><form class="search" role="search" action="%s/api/search" method="get" hx-get="%s/api/search" hx-trigger="input changed delay:180ms, search" hx-target="#path-results" hx-swap="innerHTML"><span>⌕</span><input id="path-search" type="search" name="q" placeholder="جست‌وجو در مسیرها؛ مثلاً امنیت، بازی‌سازی، شبکه..." aria-label="جست‌وجو در مسیرهای یادگیری" autocomplete="off"><kbd>SEARCH</kbd></form><div class="path-grid" id="path-results">%s</div><noscript><p class="muted">برای جست‌وجوی زنده، JavaScript را فعال کنید. همه مسیرها در فهرست بالا نمایش داده می‌شوند.</p></noscript></section>
<section class="section projects"><div class="section-head"><div><p class="eyebrow mono">INDEPENDENT PROJECTS / 03</p><h2>سه آزمایشگاه مستقل</h2></div><span class="muted">یک درگاه مشترک، سه چرخه انتشار مستقل</span></div><div class="project-grid"><a class="project-card ai" href="https://shaiinarab.github.io/workshop-zero/"><span>01 / AI LAB</span><h3>Workshop Zero</h3><p>آزمایشگاه هوش مصنوعی؛ خلاقیت، ساخت ابزار و پژوهش.</p><b>ورود به پروژه ↗</b></a><a class="project-card sys" href="https://shaiinarab.github.io/bootcraft-workshops/"><span>02 / SYSTEMS</span><h3>Bootcraft</h3><p>از Firmware و بوت تا لینوکس و بازیابی سیستم.</p><b>ورود به پروژه ↗</b></a><a class="project-card chain" href="https://shaiinarab.github.io/crypto-hype-last-drops/"><span>03 / BLOCKCHAIN</span><h3>Last Drops of Crypto Hype</h3><p>بلاکچین، DeFi و تحلیل داده‌های عمومی آن‌چین.</p><b>ورود به پروژه ↗</b></a></div></section>
<section class="method"><div class="section method-inner"><p class="eyebrow mono">THE LEARNING LOOP</p><h2>فهمیدن کافی نیست.<br><em>چیزی بساز.</em></h2><div class="loop"><article><span>01</span><h3>LEARN</h3><p>مفهوم را از منبع معتبر یاد بگیر.</p></article><article><span>02</span><h3>BUILD</h3><p>یک تمرین کوچک و قابل اجرا بساز.</p></article><article><span>03</span><h3>VERIFY</h3><p>تست کن، محدودیت‌ها را ثبت کن.</p></article><article><span>04</span><h3>SHARE</h3><p>مستند کن و با جامعه به اشتراک بگذار.</p></article></div></div></section>
<section class="section resources"><div><p class="eyebrow mono">OPEN KNOWLEDGE / START HERE</p><h2>منابعی برای عمیق‌تر شدن</h2><p class="muted">این‌ها مرجع مطالعه‌اند، نه محتوای کپی‌شده. مجوز و شرایط هر منبع را جداگانه رعایت کنید.</p></div><div class="resource-list"><a href="https://github.com/ossu/computer-science"><b>OSSU Computer Science</b><span>برنامه جامع علوم کامپیوتر ↗</span></a><a href="https://teachyourselfcs.com/"><b>Teach Yourself CS</b><span>راهنمای خودآموزی مبانی ↗</span></a><a href="https://missing.csail.mit.edu/"><b>MIT Missing Semester</b><span>ابزارهای ضروری کار با رایانه ↗</span></a><a href="https://github.com/sindresorhus/awesome"><b>Awesome Lists</b><span>فهرست منابع منتخب متن‌باز ↗</span></a><a href="https://www.open.edu/openlearn/"><b>OpenLearn</b><span>دوره‌های رایگان Open University ↗</span></a></div></section>`, href(base,"/programs"), href(base,"/docs"), href(base,"/programs"), href(base,"/api/search"), href(base,"/api/search"), cards.String())
	if err := write(out, "index.html", shell(base, "درگاه یادگیری", "درگاه یادگیری و پروژه‌های انجمن مهندسی کامپیوتر زند شیراز", home)); err != nil { return err }

	programBody := fmt.Sprintf(`<section class="page-hero"><p class="eyebrow mono">ZAND CE / LEARNING PATHS</p><h1>مسیرت را پیدا کن.<br><em>بعد چیزی بساز.</em></h1><p class="hero-lead">ده مسیر از مبانی برنامه‌نویسی تا هوش مصنوعی، امنیت، شبکه و سیستم‌های تعاملی. وضعیت «طرح آموزشی» به معنی تصویب یا زمان‌بندی قطعی نیست.</p></section><section class="section"><div class="section-head"><div><p class="eyebrow mono">CATALOG / 001—010</p><h2>کاتالوگ مسیرها</h2></div><a class="text-link" href="%s/docs/">کتابخانه اسناد ←</a></div><div class="path-grid">%s</div></section>`, href(base,"/docs"), cards.String())
	if err := write(out, "programs/index.html", shell(base, "مسیرهای یادگیری", "کاتالوگ مسیرهای یادگیری انجمن مهندسی کامپیوتر زند", programBody)); err != nil { return err }

	docsCards := ""
	for _, group := range groups {
		dir := filepath.Join(root, group)
		entries, err := os.ReadDir(dir); if err != nil { continue }
		var items strings.Builder
		for _, entry := range entries {
			if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".md") { continue }
			slug := strings.TrimSuffix(entry.Name(), ".md")
			raw, err := os.ReadFile(filepath.Join(dir, entry.Name())); if err != nil { continue }
			title := slug
			for _, line := range strings.Split(string(raw), "\n") { if strings.HasPrefix(line, "# ") { title = strings.TrimSpace(strings.TrimPrefix(line, "# ")); break } }
			route := "/docs/"+group+"/"+slug+"/"
			items.WriteString(fmt.Sprintf(`<a class="doc-link" href="%s"><span>%s</span><b>%s</b><i>باز کردن ←</i></a>`, esc(href(base,route)), esc(group), esc(title)))
			docHTML := markdown(string(raw))
			docBody := fmt.Sprintf(`<section class="doc-hero"><a class="back" href="%s/docs/">← بازگشت به کتابخانه</a><p class="eyebrow mono">%s / DOCUMENT</p><h1>%s</h1></section><article class="prose">%s</article>`, href(base,""), esc(group), esc(title), docHTML)
			if err := write(out, strings.TrimPrefix(route,"/") + "index.html", shell(base,title,title,docBody)); err != nil { return err }
		}
		if items.Len() > 0 {
			docsCards += fmt.Sprintf(`<section class="doc-group"><h2>%s</h2><div class="doc-list">%s</div></section>`, esc(group), items.String())
		}
	}
	docsBody := fmt.Sprintf(`<section class="page-hero"><p class="eyebrow mono">KNOWLEDGE BASE / DOCUMENTS</p><h1>کتابخانه <em>اسناد</em></h1><p class="hero-lead">منشور، نقشه راه، طرح کارگاه‌ها، عملیات، پژوهش و مستندات اجرایی. هر سند از فایل اصلی مخزن تولید می‌شود.</p></section><section class="section">%s</section>`, docsCards)
	if err := write(out,"docs/index.html",shell(base,"کتابخانه اسناد","کتابخانه اسناد انجمن مهندسی کامپیوتر زند",docsBody)); err != nil { return err }

	roadmapPath := filepath.Join(root,"00-governance","90-day-roadmap.md")
	roadmap, err := os.ReadFile(roadmapPath); if err != nil { return err }
	roadmapBody := fmt.Sprintf(`<section class="doc-hero"><p class="eyebrow mono">OPERATIONS / ROADMAP</p><h1>نقشه راه <em>۹۰ روزه</em></h1><p class="hero-lead">این نقشه پیشنهادی و نسبی است؛ زمان‌بندی با امتحانات، مسئولیت‌ها و مجوزها تنظیم می‌شود.</p></section><article class="prose">%s</article>`, markdown(string(roadmap)))
	if err := write(out,"roadmap/index.html",shell(base,"نقشه راه","نقشه راه پیشنهادی ۹۰ روزه انجمن",roadmapBody)); err != nil { return err }

	notFound := fmt.Sprintf(`<section class="page-hero"><p class="eyebrow mono">404 / NOT FOUND</p><h1>این مسیر پیدا نشد.</h1><p class="hero-lead">احتمالاً لینک قدیمی است یا آدرس را اشتباه وارد کرده‌اید.</p><a class="button primary" href="%s">بازگشت به خانه</a></section>`, href(base, ""))
	if err := write(out,"404.html",shell(base,"صفحه پیدا نشد","صفحه موردنظر پیدا نشد",notFound)); err != nil { return err }

	var urls []string
	urls = append(urls, siteURL+"/", siteURL+"/programs/", siteURL+"/docs/", siteURL+"/roadmap/")
	for _, group := range groups {
		entries,_ := os.ReadDir(filepath.Join(root,group))
		for _, e := range entries { if !e.IsDir() && strings.HasSuffix(e.Name(),".md") { urls=append(urls,siteURL+"/docs/"+group+"/"+strings.TrimSuffix(e.Name(),".md")+"/") } }
	}
	sort.Strings(urls)
	var sm strings.Builder
	sm.WriteString(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
	for _, u := range urls { sm.WriteString("<url><loc>"+esc(u)+"</loc></url>") }
	sm.WriteString("</urlset>")
	if err := write(out,"sitemap.xml",sm.String()); err != nil { return err }
	if err := write(out,"robots.txt","User-agent: *\nAllow: /\nSitemap: "+strings.TrimRight(siteURL,"/")+"/sitemap.xml\n"); err != nil { return err }
	return nil
}

func SearchHTML(query string) string {
	q := strings.ToLower(strings.TrimSpace(query))
	var b strings.Builder
	for _, p := range Paths {
		haystack := strings.ToLower(strings.Join([]string{p.Code,p.Category,p.Title,p.Description,p.Level}, " "))
		if q != "" && !strings.Contains(haystack,q) { continue }
		b.WriteString(card(p,""))
	}
	if b.Len()==0 { return `<p class="empty">نتیجه‌ای پیدا نشد. عبارت دیگری را امتحان کنید.</p>` }
	return b.String()
}
