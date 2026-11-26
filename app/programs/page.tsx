import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "مسیرهای یادگیری",
  description: "کاتالوگ مسیرهای عملی انجمن مهندسی کامپیوتر زند؛ از برنامه‌نویسی و بازی‌سازی تا IoT، روباتیک، امنیت و شبکه.",
};

const PATHS = [
  { code: "AI", category: "AI & INTELLIGENCE", title: "کارگاه صفر · آزمایشگاه هوش مصنوعی", description: "هوش مصنوعی کاربردی، آفرینش دیجیتال، توسعه Agent و پژوهش؛ با هسته مشترک و سه مسیر تخصصی.", level: "چندسطحی", status: "پروژه مستقل", href: "https://shaiinarab.github.io/workshop-zero/index.html", external: true },
  { code: "SYS", category: "SYSTEMS", title: "Bootcraft · سیستم و زیرساخت", description: "Firmware، UEFI، دیسک، نصب سیستم‌عامل، بوت‌لودر، لینوکس و بازیابی کنترل‌شده.", level: "مقدماتی تا متوسط", status: "پروژه مستقل", href: "https://shaiinarab.github.io/bootcraft-workshops/", external: true },
  { code: "WEB3", category: "BLOCKCHAIN & DATA", title: "آخرین قطرات هایپ · بلاکچین و DeFi", description: "فهم بلاکچین، قرارداد هوشمند، AMM و تحلیل داده‌های عمومی آن‌چین؛ بدون توصیه معاملاتی.", level: "مقدماتی تا متوسط", status: "پروژه مستقل", href: "https://shaiinarab.github.io/crypto-hype-last-drops/", external: true },
  { code: "SE", category: "SOFTWARE", title: "مهندسی نرم‌افزار و برنامه‌نویسی", description: "از الگوریتم و Git تا وب، Backend، API، پایگاه داده، تست، CI و پروژه تیمی.", level: "مقدماتی تا پیشرفته", status: "طرح آموزشی", href: "/docs/workshops/path-software-engineering/", external: false },
  { code: "GAME", category: "INTERACTIVE MEDIA", title: "بازی‌سازی و تجربه تعاملی", description: "طراحی بازی، Godot، Unity، ورودی، فیزیک، صدا، تست و انتشار بازی کوچک.", level: "مقدماتی تا پیشرفته", status: "طرح آموزشی", href: "/docs/workshops/path-game-development/", external: false },
  { code: "IOT", category: "EMBEDDED & CONNECTED", title: "اینترنت اشیا و سیستم‌های نهفته", description: "ESP32، Arduino، سنسورها، پروتکل‌ها، MQTT، داشبورد و امنیت دستگاه.", level: "مقدماتی تا پیشرفته", status: "طرح آموزشی", href: "/docs/workshops/path-iot-embedded/", external: false },
  { code: "ROB", category: "ROBOTICS", title: "روباتیک و سامانه‌های خودمختار", description: "الکترونیک، موتور، حسگر، کنترل، ROS 2، شبیه‌سازی و حرکت ایمن.", level: "مقدماتی تا پیشرفته", status: "طرح آموزشی", href: "/docs/workshops/path-robotics/", external: false },
  { code: "SEC", category: "CYBER DEFENSE", title: "امنیت سایبری و دفاع دیجیتال", description: "مدل تهدید، سخت‌سازی، امنیت وب و شبکه، تحلیل رخداد و توسعه امن.", level: "مقدماتی تا پیشرفته", status: "طرح آموزشی", href: "/docs/workshops/path-cybersecurity/", external: false },
  { code: "CTF", category: "SECURITY CHALLENGES", title: "فتح پرچم · CTF", description: "چالش‌های Web، Crypto، Forensics، Reverse، Pwn و OSINT در محیط مجاز و ایزوله.", level: "مقدماتی تا پیشرفته", status: "طرح آموزشی", href: "/docs/workshops/path-ctf/", external: false },
  { code: "NET", category: "NETWORKS & INFRA", title: "شبکه و زیرساخت", description: "TCP/IP، subnetting، switching، routing، DNS، Linux Networking و مجازی‌سازی.", level: "مقدماتی تا پیشرفته", status: "طرح آموزشی", href: "/docs/workshops/path-networking/", external: false },
];

export default function ProgramsPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-[#4FBFAE]/15">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="hub-mono text-xs tracking-[0.3em] text-[#4FBFAE]">ZAND CE / LEARNING PATHS</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.5] md:text-6xl">از کنجکاوی تا ساختن.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#8FA3B0]">
            مسیرهای یادگیری انجمن، مجموعه‌ای از تجربه‌های پروژه‌محور در مهندسی کامپیوترند.
            هر مسیر خروجی، پیش‌نیاز و مرز ایمنی مشخص دارد. مسیرهای مستقل به‌عنوان پروژه مستقل
            باقی می‌مانند و از این درگاه به هم متصل می‌شوند.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-[#8FA3B0]">
            <span className="rounded-full border border-[#4FBFAE]/25 px-3 py-2">۱۰ مسیر آموزشی</span>
            <span className="rounded-full border border-[#4FBFAE]/25 px-3 py-2">پروژه‌محور</span>
            <span className="rounded-full border border-[#4FBFAE]/25 px-3 py-2">ابزارهای قابل جایگزینی</span>
            <span className="rounded-full border border-[#4FBFAE]/25 px-3 py-2">محتوای فارسی و انگلیسی</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hub-mono text-xs tracking-[0.3em] text-[#4FBFAE]">PATH CATALOG / 001—010</p>
            <h2 className="mt-3 text-2xl font-black md:text-3xl">کاتالوگ مسیرها</h2>
          </div>
          <Link href="/docs/" className="text-sm font-bold text-[#4FBFAE] hover:underline">مرور همه طرح‌ها و اسناد ←</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PATHS.map((path) => {
            const card = (
              <article className="card-hover flex h-full flex-col rounded-xl border border-[#4FBFAE]/15 bg-[#17212B] p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="hub-mono text-xs tracking-[0.25em] text-[#4FBFAE]">{path.code}</span>
                  <span className="rounded-full border border-[#5A7A96]/40 px-2.5 py-1 text-[10px] text-[#8FA3B0]">{path.status}</span>
                </div>
                <p className="hub-mono mt-5 text-[10px] tracking-[0.2em] text-[#5A7A96]">{path.category}</p>
                <h3 className="mt-3 text-xl font-black leading-8">{path.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#8FA3B0]">{path.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[#4FBFAE]/10 pt-4">
                  <span className="text-xs text-[#5A7A96]">{path.level}</span>
                  <span className="text-sm font-bold text-[#4FBFAE]">{path.external ? "ورود به پروژه ↗" : "مشاهده مسیر ←"}</span>
                </div>
              </article>
            );
            return path.external ? (
              <a key={path.code} href={path.href} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
            ) : (
              <Link key={path.code} href={path.href} className="block">{card}</Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#4FBFAE]/10 bg-[#0B111A]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
          <div><p className="hub-mono text-xs text-[#4FBFAE]">LEARN</p><h2 className="mt-2 font-black">مفهوم را بفهم</h2><p className="mt-2 text-sm leading-7 text-[#8FA3B0]">پیش‌نیازها و مفاهیم پایه را با منابع قابل بررسی یاد بگیر.</p></div>
          <div><p className="hub-mono text-xs text-[#4FBFAE]">BUILD</p><h2 className="mt-2 font-black">چیزی بساز</h2><p className="mt-2 text-sm leading-7 text-[#8FA3B0]">هر مرحله با یک تمرین یا خروجی قابل نمایش تمام می‌شود.</p></div>
          <div><p className="hub-mono text-xs text-[#4FBFAE]">SHARE</p><h2 className="mt-2 font-black">مستند و منتشر کن</h2><p className="mt-2 text-sm leading-7 text-[#8FA3B0]">پروژه را تست کن، مستند کن و در دیوار خروجی انجمن ارائه بده.</p></div>
        </div>
      </section>
    </div>
  );
}
