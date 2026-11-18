import type { Metadata } from "next";
import Link from "next/link";

const WORKSHOP_URL = "https://shaiinarab.github.io/crypto-hype-last-drops/";

export const metadata: Metadata = {
  title: "آخرین قطرات هایپ ارز دیجیتال",
  description:
    "کارگاه عملی بلاکچین، DeFi و تحلیل داده‌های آن‌چین؛ از اجماع و تراکنش تا AMM و خواندن شاخص‌های بازار.",
  openGraph: {
    title: "آخرین قطرات هایپ ارز دیجیتال",
    description: "وقتی هیاهو می‌خوابد، زیرساخت و داده را می‌شود دقیق‌تر دید.",
  },
};

const MODULES = [
  {
    number: "01",
    title: "بلاکچین بعد از هایپ",
    duration: "۲٫۵ ساعت",
    description:
      "اجماع، بلوک، هش، تراکنش، کیف پول، قرارداد هوشمند، کارمزد و لایه دوم؛ همراه با مشاهده یک تراکنش عمومی در اکسپلورر.",
    output: "کالبدشکافی یک تراکنش عمومی",
  },
  {
    number: "02",
    title: "DeFi و اقتصاد پروتکل",
    duration: "۳ ساعت",
    description:
      "DEX، بازارساز خودکار، نقدینگی، اسلیپیج، Impermanent Loss، وام‌دهی، وثیقه و لیکوییدیشن.",
    output: "شبیه‌سازی AMM و مقایسه سازوکار دو پروتکل",
  },
  {
    number: "03",
    title: "هوشمندی داده آن‌چین",
    duration: "۲ ساعت · اختیاری",
    description:
      "خواندن TVL، Fees، Revenue، Exchange Flows، Open Interest، MVRV و SOPR با توجه به تعریف و محدودیت منبع.",
    output: "یادداشت تحلیلی کوتاه با منبع و محدودیت‌ها",
  },
];

const TOOLS = [
  { name: "Glassnode", focus: "شاخص‌های آن‌چین", href: "https://studio.glassnode.com/" },
  { name: "DeFiLlama", focus: "TVL، کارمزد و پروتکل‌ها", href: "https://defillama.com/" },
  { name: "Dune", focus: "پرس‌وجوی داده و داشبورد", href: "https://dune.com/" },
  { name: "CoinGlass", focus: "مشتقات، OI و لیکوییدیشن", href: "https://www.coinglass.com/" },
  { name: "CryptoQuant", focus: "جریان صرافی‌ها و شبکه", href: "https://cryptoquant.com/" },
  { name: "Etherscan", focus: "تراکنش و قرارداد اتریوم", href: "https://etherscan.io/" },
];

export default function CryptoHypeProgramPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-[#4FBFAE]/15">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="hub-mono text-xs tracking-[0.3em] text-[#4FBFAE]">
            ZAND CE / PROGRAM 03 · BLOCKCHAIN & DEFI
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-[#4FBFAE]/30 bg-[#4FBFAE]/10 px-3 py-1 text-xs font-bold text-[#4FBFAE]">
                وب‌سایت آموزشی منتشرشده
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.45] md:text-6xl">
                آخرین قطرات هایپ
                <span className="block text-[#4FBFAE]">ارز دیجیتال</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#8FA3B0]">
                وقتی هیجان قیمت فروکش می‌کند، هنوز سؤال‌های فنی مهمی باقی می‌مانند:
                بلاکچین چه مسئله‌ای را حل می‌کند؟ DeFi چطور کار می‌کند؟ و داده‌های
                آن‌چین دقیقاً چه چیزی را نشان می‌دهند و چه چیزی را نه؟
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={WORKSHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-[#4FBFAE] px-5 py-3 text-sm font-black text-[#0B111A] transition-colors hover:bg-[#78d6c5]"
                >
                  ورود به آزمایشگاه تعاملی ↗
                </a>
                <Link
                  href="/docs/workshops/workshop-03-last-drops/"
                  className="rounded-md border border-[#4FBFAE]/40 px-5 py-3 text-sm font-bold text-[#4FBFAE] hover:bg-[#4FBFAE]/10"
                >
                  طرح آموزشی کارگاه
                </Link>
                <Link href="/#programs" className="rounded-md px-4 py-3 text-sm text-[#8FA3B0] hover:text-white">
                  بازگشت به برنامه‌ها
                </Link>
              </div>
            </div>
            <aside className="rounded-xl border border-[#4FBFAE]/20 bg-[#0B111A]/90 p-5">
              <p className="hub-mono text-[10px] tracking-[0.25em] text-[#5A7A96]">FORMAT / 20 · 60 · 20</p>
              <p className="mt-3 text-3xl font-black text-[#4FBFAE]">۵٫۵ ساعت</p>
              <p className="mt-1 text-xs leading-6 text-[#8FA3B0]">
                هسته اصلی آموزشی؛ آزمایشگاه داده ۲ ساعته به‌صورت اختیاری برگزار می‌شود.
              </p>
              <div className="mt-5 border-t border-[#4FBFAE]/15 pt-4 text-xs leading-6 text-[#8FA3B0]">
                <p>۲۰٪ مفهوم و چارچوب</p>
                <p>۶۰٪ مشاهده و تمرین</p>
                <p>۲۰٪ جمع‌بندی و ارزیابی</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-3xl">
          <p className="hub-mono text-xs tracking-[0.3em] text-[#4FBFAE]">LEARNING PATH</p>
          <h2 className="mt-3 text-2xl font-black md:text-3xl">سه مرحله برای عبور از شعار به فهم فنی.</h2>
          <p className="mt-3 text-sm leading-7 text-[#8FA3B0]">
            هر بخش با یک خروجی قابل بررسی تمام می‌شود. استفاده از ابزارها برای پاسخ
            دادن به پرسش است، نه برای نمایش فهرستی از برندها.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {MODULES.map((module) => (
            <article key={module.number} className="card-hover rounded-xl border border-[#4FBFAE]/15 bg-[#17212B] p-6">
              <p className="hub-mono text-xs tracking-[0.25em] text-[#4FBFAE]">{module.number} / {module.duration}</p>
              <h3 className="mt-4 text-xl font-black">{module.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#8FA3B0]">{module.description}</p>
              <div className="mt-5 border-t border-[#4FBFAE]/15 pt-4">
                <p className="text-[11px] text-[#5A7A96]">خروجی جلسه</p>
                <p className="mt-1 text-sm font-bold text-[#DFE7EE]">{module.output}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#4FBFAE]/10 bg-[#0B111A]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2">
          <div>
            <p className="hub-mono text-xs tracking-[0.3em] text-[#4FBFAE]">PRACTICAL LABS</p>
            <h2 className="mt-3 text-2xl font-black">دموهایی که می‌شود با آن‌ها بازی کرد.</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[#8FA3B0]">
              <li><strong className="text-[#DFE7EE]">Blockchain Fit Check:</strong> بررسی اینکه یک مسئله واقعاً به بلاکچین نیاز دارد یا نه.</li>
              <li><strong className="text-[#DFE7EE]">Transaction Inspector:</strong> بازکردن هش تراکنش عمومی در Etherscan.</li>
              <li><strong className="text-[#DFE7EE]">AMM Simulator:</strong> درک مدل ساده نقدینگی و اثر معامله.</li>
              <li><strong className="text-[#DFE7EE]">Impermanent Loss Lab:</strong> مشاهده تفاوت LP با نگهداری ساده دارایی.</li>
              <li><strong className="text-[#DFE7EE]">Metric Field Guide:</strong> خواندن تعریف شاخص‌ها و محدودیت تفسیرشان.</li>
            </ul>
          </div>
          <div>
            <p className="hub-mono text-xs tracking-[0.3em] text-[#4FBFAE]">TOOLBOX</p>
            <h2 className="mt-3 text-2xl font-black">جعبه‌ابزار داده عمومی</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[#4FBFAE]/15 bg-[#17212B] p-4 transition-colors hover:border-[#4FBFAE]/50"
                >
                  <span className="font-bold text-[#4FBFAE]">{tool.name} ↗</span>
                  <span className="mt-1 block text-xs text-[#8FA3B0]">{tool.focus}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-xl border border-[#F0A36A]/25 bg-[#F0A36A]/5 p-6 md:p-8">
          <p className="hub-mono text-xs tracking-[0.25em] text-[#F0A36A]">SAFETY / EDUCATION ONLY</p>
          <h2 className="mt-3 text-xl font-black">این کارگاه کلاس معامله‌گری نیست.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#B9C5CE]">
            هیچ توصیه خریدوفروش، بازده تضمینی یا سیگنال معاملاتی ارائه نمی‌شود.
            تمرین‌ها با داده عمومی یا شبیه‌ساز انجام می‌شوند؛ هیچ کیف پولی متصل نمی‌شود
            و هیچ عبارت بازیابی یا کلید خصوصی لازم نیست. شاخص‌هایی مثل TVL، جریان
            صرافی و Open Interest به‌تنهایی سیگنال نیستند و باید با تعریف، بازه و
            محدودیت منبع خوانده شوند.
          </p>
        </div>
      </section>
    </div>
  );
}
