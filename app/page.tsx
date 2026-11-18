import Link from "next/link";
import { JoinForm } from "@/components/hub/join-form";
import { asset } from "@/lib/base";
import { getGroupsWithDocs, getRoadmap, getStats } from "@/lib/content";

const WZ_URL = "https://shaiinarab.github.io/workshop-zero/index.html";
const BC_URL = "https://bootcraft-workshops.vercel.app/";
const CRYPTO_URL = "https://shaiinarab.github.io/crypto-hype-last-drops/";

const BOOT_LINES = [
  { n: "01", sys: "POWER ON", fa: "هویت مشترک — یک نام، یک زبان بصری" },
  { n: "02", sys: "FIRMWARE", fa: "منشور و شورا — تصمیم می‌گیرد چه چیزی بوت شود" },
  { n: "03", sys: "BOOT MANAGER", fa: "همین پورتال — مسیریابی به برنامه‌ها و سندها" },
  { n: "04", sys: "KERNEL + INITRAMFS", fa: "سه برنامه مستقل — هسته اجرایی" },
  { n: "05", sys: "USER SPACE", fa: "دیوار خروجی، منتورها، پادکست" },
];

const PROGRAMS = [
  {
    code: "WZ",
    tag: "AI APPLIED LAB",
    title: "کارگاه صفر",
    desc: "آزمایشگاه کاربردی هوش مصنوعی؛ یک هسته مشترک و سه مسیر تخصصی برای آفرینش دیجیتال، توسعه نرم‌افزار و پژوهش. هر جلسه با یک خروجی قابل بررسی تمام می‌شود.",
    meta: ["هسته مشترک F1 · F2", "۳ مسیر تخصصی", "۱۶ کارگاه"],
    status: { label: "فعال · در انتظار پایلوت", live: true },
    href: WZ_URL,
    cta: "ورود به کارگاه صفر",
  },
  {
    code: "BC",
    tag: "SYSTEMS WORKSHOP",
    title: "بوت‌کرفت",
    desc: "از فشردن Power تا کنترل کامل سیستم؛ سه ایستگاه عملی روی فریم‌ور، نصب و بازیابی. قانون طلایی: اول Snapshot، بعد آزمایش.",
    meta: ["۳ ایستگاه آزمایشگاهی", "سیاست ایمنی ۶ بندی", "۱۰ تا ۱۶ نفر در هر گروه"],
    status: { label: "فعال · آماده اجرا", live: true },
    href: BC_URL,
    cta: "ورود به بوت‌کرفت",
  },
  {
    code: "CRYPTO",
    tag: "BLOCKCHAIN / DEFI LAB",
    title: "آخرین قطرات هایپ ارز دیجیتال",
    desc: "بلاکچین را بعد از فروکش‌کردن هیجان بررسی کن: از اجماع و تراکنش تا DeFi، استخرهای نقدینگی و خواندن داده‌های آن‌چین؛ بدون اتصال کیف پول و بدون سیگنال معاملاتی.",
    meta: ["۲٫۵ ساعت: بنیاد بلاکچین", "۳ ساعت: DeFi و اقتصاد پروتکل", "۲ ساعت اختیاری: هوشمندی آن‌چین"],
    status: { label: "وب‌سایت آموزشی منتشرشده", live: true },
    href: "/programs/crypto-hype/",
    cta: "جزئیات مسیر و تمرین‌ها",
  },
  {
    code: "NEXT",
    tag: "ROADMAP SLOT",
    title: "جایگاه برنامه بعدی",
    desc: "پادکست «خارج از سرفصل» و حلقه‌های منتورینگ فارغ‌التحصیلان؛ طبق نقشه راه ۹۰ روزه، فقط پس از ارزیابی پایلوت و تأیید شورا فعال می‌شود. اینجا جای خالی را صادقانه نگه می‌داریم.",
    meta: ["پادکست پایلوت", "۲ تا ۳ حلقه منتورینگ", "درس‌آموخته‌ها در دیوار خروجی"],
    status: { label: "در انتظار شورا", live: false },
    href: null,
    cta: null,
  },
];

const WALL = [
  { kind: "پوستر", title: "پوستر رویداد علمی دانشگاه", from: "خروجی C1 کارگاه صفر" },
  { kind: "ویدیو", title: "ویدیوی ۳۰ ثانیه‌ای معرفی پروژه", from: "خروجی C4 کارگاه صفر" },
  { kind: "گزارش", title: "گزارش آزمایش قابل تکرار روی داده", from: "خروجی R3 کارگاه صفر" },
  { kind: "لاگ", title: "گزارش Incident بازیابی بوت", from: "ایستگاه D بوت‌کرفت" },
];

export default function HubPage() {
  const groups = getGroupsWithDocs();
  const stats = getStats();
  const roadmap = getRoadmap().slice(0, 3);

  return (
    <>
      {/* ---------- hero: boot sequence ---------- */}
      <section className="relative overflow-hidden border-b border-[#4FBFAE]/10">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div aria-hidden className="scan absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="hub-mono mb-4 text-xs tracking-[0.3em] text-[#4FBFAE]">
              ZAND CE / PROGRAM HUB — 002
            </p>
            <h1 className="text-4xl font-black leading-[1.3] md:text-5xl">
              سه مسیر عملی؛
              <br />
              یک درگاه مشترک.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#8FA3B0]">
              انجمن مهندسی کامپیوتر مؤسسه آموزش عالی زند شیراز یک اکوسیستم یادگیری
              دانشجومحور است: این پورتال مسیرها و سندها را یک‌جا می‌آورد؛ کارگاه صفر،
              بوت‌کرفت و آخرین قطرات هایپ سه تجربه عملی مستقل‌اند؛ دیوار خروجی هم جای
              نمایش دستاوردهای قابل بررسی است.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#4FBFAE] px-5 py-3 text-sm font-bold text-[#0B111A] transition-transform hover:scale-[1.02]"
              >
                مسیر هوش مصنوعی — کارگاه صفر
              </a>
              <a
                href={BC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#4FBFAE]/40 px-5 py-3 text-sm font-bold text-[#4FBFAE] transition-colors hover:bg-[#4FBFAE]/10"
              >
                مسیر سیستم‌ها — بوت‌کرفت
              </a>
              <Link
                href="/programs/crypto-hype/"
                className="rounded-md border border-[#4FBFAE]/30 px-5 py-3 text-sm font-bold text-[#DFE7EE] transition-colors hover:border-[#4FBFAE] hover:bg-[#4FBFAE]/10"
              >
                مسیر بلاکچین — آخرین قطرات هایپ
              </Link>
              <Link
                href="/docs/"
                className="rounded-md px-5 py-3 text-sm text-[#8FA3B0] underline-offset-4 hover:text-[#DFE7EE] hover:underline"
              >
                بسته کامل سندها
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "سند", v: stats.docs },
                { k: "حوزه", v: stats.groups },
                { k: "دروازه", v: stats.gates },
                { k: "تصمیم ثبت‌شده", v: stats.decisions },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-lg border border-[#4FBFAE]/15 bg-[#0B111A] px-3 py-2.5"
                >
                  <dt className="text-[11px] text-[#5A7A96]">{item.k}</dt>
                  <dd className="hub-mono mt-0.5 text-xl font-bold text-[#4FBFAE]">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* boot log */}
          <div
            dir="ltr"
            className="rounded-xl border border-[#4FBFAE]/20 bg-[#0B111A] p-5 font-mono text-[13px] leading-7 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.9)]"
          >
            <p className="text-[#5A7A96]">root@zand-ce:~$ boot --chain --verbose</p>
            {BOOT_LINES.map((line, i) => (
              <p key={line.n} className={`text-[#8FA3B0] bootline bootline-${i + 1}`}>
                <span className="text-[#4FBFAE]">[{line.n}]</span> {line.sys}
                <span className="text-[#5A7A96]"> → </span>
                <span className="text-[#DFE7EE]">{line.fa}</span>
              </p>
            ))}
            <p className="mt-2 text-[#4FBFAE] bootline bootline-5">
              status: chain understood <span className="boot-caret" aria-hidden />
            </p>
          </div>
        </div>
      </section>

      {/* ---------- programs ---------- */}
      <section id="programs" className="mx-auto max-w-6xl px-5 py-16">
        <p className="hub-mono mb-2 text-xs tracking-[0.3em] text-[#4FBFAE]">01 / PROGRAMS</p>
        <h2 className="text-2xl font-black md:text-3xl">
          سه برنامه اجرایی؛ یک جایگاه آینده صادقانه.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8FA3B0]">
          سه مسیر مستقل با خروجی‌های مشخص در دسترس‌اند. برنامه‌های آینده فقط پس از
          تعیین مسئول، مجوز و حداقل پشتیبانی به این فهرست اضافه می‌شوند.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {PROGRAMS.map((program) => (
            <article
              key={program.code}
              className="card-hover flex flex-col rounded-xl border border-[#4FBFAE]/15 bg-[#17212B] p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="hub-mono text-[11px] tracking-[0.25em] text-[#5A7A96]">
                  {program.tag}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    program.status.live
                      ? "bg-[#4FBFAE]/15 text-[#4FBFAE]"
                      : "border border-[#5A7A96]/40 text-[#5A7A96]"
                  }`}
                >
                  {program.status.label}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-black">{program.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-[#8FA3B0]">{program.desc}</p>
              <ul className="mt-4 space-y-1.5 text-[13px] text-[#8FA3B0]">
                {program.meta.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden className="text-[#4FBFAE]">
                      ▪
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {program.href ? (
                program.href === "/programs/crypto-hype/" ? (
                  <Link
                    href={program.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#4FBFAE] hover:underline"
                  >
                    {program.cta}
                    <span aria-hidden>→</span>
                  </Link>
                ) : (
                  <a
                    href={program.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#4FBFAE] hover:underline"
                  >
                    {program.cta}
                    <span aria-hidden>↗</span>
                  </a>
                )
              ) : (
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-[#5A7A96]">
                  پس از تأیید شورا لینک می‌گیرد
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ---------- boot chain ---------- */}
      <section id="bootchain" className="border-y border-[#4FBFAE]/10 bg-[#0B111A]">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="hub-mono mb-2 text-xs tracking-[0.3em] text-[#4FBFAE]">
            02 / BOOT_SEQUENCE.LOG
          </p>
          <h2 className="text-2xl font-black md:text-3xl">اکوسیستم هم مثل کامپیوتر بوت می‌شود.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8FA3B0]">
            اگر جایی گیر کرد، همان‌جا عیب‌یابی کن که زنجیره قطع شده؛ بقیه مراحل خودشان
            بازیابی می‌شوند.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {BOOT_LINES.map((line) => (
              <li
                key={line.n}
                className="rounded-lg border border-[#4FBFAE]/15 bg-[#17212B] p-4"
              >
                <p className="hub-mono text-[10px] tracking-[0.2em] text-[#4FBFAE]">
                  {line.n} / {line.sys}
                </p>
                <p className="mt-2 text-sm font-bold leading-6">{line.fa}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- system map ---------- */}
      <section id="system-map" className="mx-auto max-w-6xl px-5 py-16">
        <p className="hub-mono mb-2 text-xs tracking-[0.3em] text-[#4FBFAE]">03 / SYSTEM MAP</p>
        <h2 className="text-2xl font-black md:text-3xl">هفت حوزه، یک بسته قابل اجرا.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8FA3B0]">
          هر سند همین‌جاست؛ بدون پوشه‌گشتن. شمارنده‌ها از خود فایل‌ها خوانده می‌شوند، نه از
          یک متن بازاریابی.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <Link
              key={group.id}
              href={`/docs/#${group.id}`}
              className="card-hover group rounded-xl border border-[#4FBFAE]/15 bg-[#17212B] p-5"
            >
              <div className="flex items-center justify-between">
                <span aria-hidden className="text-2xl text-[#4FBFAE]">
                  {group.glyph}
                </span>
                <span className="hub-mono text-[10px] tracking-widest text-[#5A7A96]">
                  {group.en}
                </span>
              </div>
              <h3 className="mt-4 text-base font-black group-hover:text-[#4FBFAE]">
                {group.label}
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#8FA3B0]">{group.blurb}</p>
              <p className="hub-mono mt-4 text-[11px] text-[#5A7A96]">
                {String(group.docs.length).padStart(2, "0")} DOCS →
              </p>
            </Link>
          ))}
          <Link
            href="/terminal/"
            className="card-hover group flex flex-col justify-between rounded-xl border border-[#4FBFAE]/30 bg-[#0B111A] p-5"
          >
            <span aria-hidden className="hub-mono text-lg text-[#4FBFAE]">
              :~$
            </span>
            <div>
              <h3 className="mt-4 text-base font-black text-[#4FBFAE]">ترمینال پورتال</h3>
              <p className="mt-2 text-xs leading-6 text-[#8FA3B0]">
                با `ls` و `open` بین سندها حرکت کن؛ بدون ماوس.
              </p>
              <p className="hub-mono mt-4 text-[11px] text-[#4FBFAE]">LAUNCH →</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------- playbook + terminal ---------- */}
      <section className="border-y border-[#4FBFAE]/10 bg-[#0B111A]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2">
          <div className="rounded-xl border border-[#4FBFAE]/20 bg-[#17212B] p-7">
            <p className="hub-mono mb-3 text-xs tracking-[0.3em] text-[#4FBFAE]">
              04 / CREATIVE PLAYBOOK
            </p>
            <h2 className="text-2xl font-black">پلی‌بوک خلاقیت، همین‌جا.</h2>
            <p className="mt-3 text-sm leading-7 text-[#8FA3B0]">
              نسخه PDF پلی‌بوک Zand CE همراه جلد و دارایی‌های بصری در مخزن است تا کارگاه‌ها
              با یک هویت واحد اجرا شوند، نه با اسلایدهای پراکنده.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={asset("/Zand-CE-Creative-Playbook.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#4FBFAE] px-4 py-2.5 text-sm font-bold text-[#0B111A]"
              >
                دریافت PDF
              </a>
              <a
                href={asset("/playbook-cover.html")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#4FBFAE]/40 px-4 py-2.5 text-sm font-bold text-[#4FBFAE]"
              >
                دیدن جلد
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-[#4FBFAE]/20 bg-[#0B111A] p-7">
            <p className="hub-mono mb-3 text-xs tracking-[0.3em] text-[#4FBFAE]">
              05 / OPERATOR MODE
            </p>
            <h2 className="text-2xl font-black">پورتال را از ترمینال بگرد.</h2>
            <p className="mt-3 text-sm leading-7 text-[#8FA3B0]">
              یک ترمینال محلی و بدون شبکه: `ls` حوزه‌ها را می‌آورد، `open` سند را باز
              می‌کند و `status` شمارنده‌های زنده را نشان می‌دهد.
            </p>
            <div className="hub-mono mt-6 rounded-lg border border-[#4FBFAE]/20 bg-[#0F1620] p-4 text-[12px] leading-7 text-[#8FA3B0]">
              <p>
                <span className="text-[#4FBFAE]">:~$</span> ls governance
              </p>
              <p className="text-[#5A7A96]">01. charter-draft — منشور پیشنهادی</p>
              <p className="text-[#5A7A96]">02. roles — نقش‌ها و مسئولیت‌ها</p>
              <p>
                <span className="text-[#4FBFAE]">:~$</span> open charter-draft
              </p>
            </div>
            <Link
              href="/terminal/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#4FBFAE] hover:underline"
            >
              باز کردن ترمینال کامل <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- output wall ---------- */}
      <section id="wall" className="mx-auto max-w-6xl px-5 py-16">
        <p className="hub-mono mb-2 text-xs tracking-[0.3em] text-[#4FBFAE]">06 / OUTPUT WALL</p>
        <h2 className="text-2xl font-black md:text-3xl">هر جلسه، یک ساخته.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8FA3B0]">
          این چهار کارت، نمونه اول دیوار خروجی‌اند؛ بعد از پایلوت، همین بخش با خروجی‌های
          واقعی دانشجوها پر می‌شود و لینک هر کارت به اثر اصلی می‌رود.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WALL.map((item) => (
            <article
              key={item.title}
              className="card-hover rounded-lg border border-[#4FBFAE]/15 bg-[#17212B] p-5"
            >
              <span className="hub-mono inline-block rounded bg-[#4FBFAE]/10 px-2 py-0.5 text-[10px] tracking-widest text-[#4FBFAE]">
                {item.kind}
              </span>
              <h3 className="mt-3 text-sm font-bold leading-6">{item.title}</h3>
              <p className="mt-2 text-xs text-[#5A7A96]">{item.from}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- calendar ---------- */}
      <section id="calendar" className="border-t border-[#4FBFAE]/10 bg-[#0B111A]">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="hub-mono mb-2 text-xs tracking-[0.3em] text-[#4FBFAE]">07 / CALENDAR</p>
          <h2 className="text-2xl font-black md:text-3xl">
            پیش‌نویس تقویم ترم؛ تاریخ قطعی با شورا.
          </h2>
          <div className="mt-8 space-y-3">
            {roadmap.map((gate) => (
              <div
                key={gate.range}
                className="flex flex-col gap-1 rounded-lg border border-[#4FBFAE]/15 bg-[#17212B] p-4 sm:flex-row sm:items-center sm:gap-5"
              >
                <span className="hub-mono w-28 shrink-0 text-xs tracking-[0.2em] text-[#4FBFAE]">
                  {gate.range}
                </span>
                <span className="flex-1 text-sm font-bold">{gate.priority}</span>
                <span className="text-xs text-[#5A7A96]">{gate.gate}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-6 text-[#5A7A96]">
            مطابق قاعده توقف در نقشه راه انجمن: اگر مسئول، مجوز یا حداقل پشتیبانی فراهم
            نباشد، فعالیت عقب می‌افتد، نه اینکه بد اجرا شود.
          </p>
          <Link
            href="/roadmap/"
            className="mt-5 inline-flex text-sm font-bold text-[#4FBFAE] hover:underline"
          >
            دیدن کل نقشه راه ۹۰ روزه →
          </Link>
        </div>
      </section>

      {/* ---------- join ---------- */}
      <section id="join" className="mx-auto max-w-4xl px-5 py-16">
        <p className="hub-mono mb-2 text-xs tracking-[0.3em] text-[#4FBFAE]">08 / JOIN</p>
        <h2 className="text-2xl font-black md:text-3xl">یک فرم برای همه برنامه‌ها.</h2>
        <p className="mt-3 text-sm leading-7 text-[#8FA3B0]">
          فقط سه چیز می‌خواهیم: اسم، یک راه تماس، و اینکه کدام مسیر کنجکاوت کرده. اگر
          دستگاهت آماده نیست، از همان اول بدانیم تا دستگاه جایگزین برنامه‌ریزی شود.
        </p>
        <div className="mt-8">
          <JoinForm />
        </div>
      </section>
    </>
  );
}
