"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/#programs", label: "برنامه‌ها" },
  { href: "/#bootchain", label: "زنجیره بوت" },
  { href: "/docs/", label: "سندها" },
  { href: "/roadmap/", label: "نقشه راه" },
  { href: "/terminal/", label: "ترمینال" },
  { href: "/#join", label: "عضویت" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#4FBFAE]/15 bg-[#0F1620]/95 backdrop-blur no-print">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3" aria-label="خانه انجمن">
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
          className="ms-auto hidden items-center gap-x-5 gap-y-1 text-sm text-[#8FA3B0] md:flex"
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
          <span className="hub-mono inline-flex items-center gap-2 rounded bg-[#0B111A] px-2 py-1 text-[10px] tracking-widest text-[#5A7A96]">
            <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-[#4FBFAE]" />
            FALL 2026
          </span>
        </nav>

        <button
          type="button"
          className="ms-auto inline-flex min-h-10 items-center gap-2 rounded-md border border-[#4FBFAE]/25 px-3 text-xs font-bold text-[#DFE7EE] hover:border-[#4FBFAE] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden className="text-[#4FBFAE]">{menuOpen ? "×" : "☰"}</span>
          {menuOpen ? "بستن منو" : "فهرست"}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-site-nav"
          aria-label="ناوبری موبایل"
          className="border-t border-[#4FBFAE]/10 bg-[#0B111A] px-5 py-3 md:hidden"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-md border border-[#4FBFAE]/10 px-3 py-2.5 text-sm text-[#B8C7D0] hover:border-[#4FBFAE]/40 hover:text-[#4FBFAE]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/programs/crypto-hype/"
              onClick={closeMenu}
              className="col-span-2 rounded-md border border-[#4FBFAE]/25 px-3 py-2.5 text-sm font-bold text-[#4FBFAE]"
            >
              آخرین قطرات هایپ ارز دیجیتال
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
