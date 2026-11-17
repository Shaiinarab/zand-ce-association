import Link from "next/link";

const NAV = [
  { href: "/#programs", label: "برنامه‌ها" },
  { href: "/#bootchain", label: "زنجیره بوت" },
  { href: "/docs/", label: "سندها" },
  { href: "/roadmap/", label: "نقشه راه" },
  { href: "/terminal/", label: "ترمینال" },
  { href: "/#join", label: "عضویت" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#4FBFAE]/15 bg-[#0F1620]/95 backdrop-blur no-print">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="خانه انجمن">
          <span
            aria-hidden
            className="hub-mono rounded border border-[#4FBFAE]/40 px-2 py-0.5 text-xs text-[#4FBFAE]"
          >
            ZAND/CE
          </span>
          <span className="text-sm font-bold">انجمن مهندسی کامپیوتر زند</span>
        </Link>
        <nav
          aria-label="ناوبری اصلی"
          className="ms-auto flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[#8FA3B0]"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[#4FBFAE]"
            >
              {item.label}
            </Link>
          ))}
          <span className="hub-mono hidden items-center gap-2 rounded bg-[#0B111A] px-2 py-1 text-[10px] tracking-widest text-[#5A7A96] md:inline-flex">
            <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-[#4FBFAE]" />
            FALL 2026
          </span>
        </nav>
      </div>
    </header>
  );
}
