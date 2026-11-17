import type { Metadata } from "next";
import Link from "next/link";
import { DocFilter } from "@/components/hub/doc-filter";
import { getGroupsWithDocs, getStats, hrefFor } from "@/lib/content";

export const metadata: Metadata = {
  title: "سندهای انجمن",
  description:
    "نقشه کامل ۷ حوزه و همه سندهای بسته آغاز کار انجمن علمی مهندسی کامپیوتر زند؛ قابل جست‌وجو و پیوند مستقیم.",
};

export default function DocsIndexPage() {
  const groups = getGroupsWithDocs();
  const stats = getStats();
  const items = groups.flatMap((group) =>
    group.docs.map((doc) => ({
      group: group.id,
      groupLabel: group.label,
      slug: doc.slug,
      title: doc.title,
      excerpt: doc.excerpt,
      minutes: doc.minutes,
      href: hrefFor(doc),
    })),
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="hub-mono mb-2 text-xs tracking-[0.3em] text-[#4FBFAE]">
            ZAND CE / DOCS INDEX
          </p>
          <h1 className="text-3xl font-black md:text-4xl">نقشه سندها</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8FA3B0]">
            {stats.docs} سند در {stats.groups} حوزه؛ از منشور و نقش‌ها تا ایمنی کارگاه،
            رضایت پادکست، حریم خصوصی و پرسش‌های باز. هر سند یک پیوند پایدار دارد.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/terminal/"
            className="rounded-md border border-[#4FBFAE]/30 px-3 py-2 text-xs font-bold text-[#4FBFAE] hover:bg-[#4FBFAE]/10"
          >
            جست‌وجو با ترمینال
          </Link>
          <Link
            href="/roadmap/"
            className="rounded-md border border-[#4FBFAE]/30 px-3 py-2 text-xs font-bold text-[#4FBFAE] hover:bg-[#4FBFAE]/10"
          >
            نقشه راه ۹۰ روزه
          </Link>
        </div>
      </div>

      <nav aria-label="حوزه‌ها" className="mt-8 flex flex-wrap gap-2">
        {groups.map((group) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            className="hub-mono rounded-full border border-[#4FBFAE]/20 px-3 py-1.5 text-[11px] text-[#8FA3B0] transition-colors hover:border-[#4FBFAE] hover:text-[#4FBFAE]"
          >
            {group.label} · {group.docs.length}
          </a>
        ))}
      </nav>

      <div className="mt-8">
        <DocFilter items={items} />
      </div>

      <div className="mt-14 space-y-14">
        {groups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-24">
            <div className="flex items-end justify-between gap-4 border-b border-[#4FBFAE]/15 pb-3">
              <div>
                <p className="hub-mono text-[10px] tracking-[0.3em] text-[#5A7A96]">
                  {group.en}
                </p>
                <h2 className="mt-1 text-xl font-black">
                  <span aria-hidden className="me-2 text-[#4FBFAE]">
                    {group.glyph}
                  </span>
                  {group.label}
                </h2>
              </div>
              <p className="max-w-md text-end text-xs leading-6 text-[#5A7A96]">
                {group.blurb}
              </p>
            </div>

            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {group.docs.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={hrefFor(doc)}
                    className="card-hover group flex h-full flex-col rounded-lg border border-[#4FBFAE]/15 bg-[#17212B] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="hub-mono text-[10px] text-[#5A7A96]">{doc.slug}</span>
                      <span className="hub-mono text-[10px] text-[#5A7A96]">
                        {doc.minutes} MIN
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-bold leading-6 group-hover:text-[#4FBFAE]">
                      {doc.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-6 text-[#8FA3B0]">
                      {doc.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-14 rounded-lg border border-[#4FBFAE]/15 bg-[#0B111A] p-4 text-xs leading-6 text-[#5A7A96]">
        این بسته پیش‌نویس است و ادعای مصوب بودن یا وابستگی رسمی به ACM یا IEEE ندارد.
        برای انتشار، مالک سازمانی، نام رسمی، استاد مشاور و مجوز محتوا باید تأیید شوند.
      </p>
    </div>
  );
}
