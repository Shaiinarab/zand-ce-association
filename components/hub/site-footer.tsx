import Link from "next/link";

const WZ_URL = "https://shaiinarab.github.io/workshop-zero/index.html";
const BC_URL = "https://bootcraft-workshops.vercel.app/";
const CRYPTO_URL = "https://shaiinarab.github.io/crypto-hype-last-drops/";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#4FBFAE]/10 bg-[#0B111A] no-print">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-8 text-xs text-[#5A7A96]">
        <p>ساخته‌شده توسط دانشجوها، برای دانشجوها — آبان ۱۴۰۵</p>
        <nav aria-label="پیوندهای بیرونی" className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={WZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4FBFAE]"
          >
            کارگاه صفر ↗
          </a>
          <a
            href={BC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4FBFAE]"
          >
            بوت‌کرفت ↗
          </a>
          <a href={CRYPTO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#4FBFAE]">
            آخرین قطرات هایپ ↗
          </a>
          <Link href="/docs/" className="hover:text-[#4FBFAE]">
            سندهای انجمن
          </Link>
          <span className="hub-mono">ZAND CE HUB / V0.2</span>
        </nav>
      </div>
    </footer>
  );
}
