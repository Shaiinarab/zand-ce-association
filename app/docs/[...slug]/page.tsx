import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyLink } from "@/components/hub/copy-link";
import { ScrollProgress } from "@/components/hub/scroll-progress";
import {
  getAllDocs,
  getDoc,
  getGroup,
  getNeighbors,
  hrefFor,
  renderMarkdown,
} from "@/lib/content";

type Params = { slug: string[] };

export function generateStaticParams(): Params[] {
  return getAllDocs().map((doc) => ({ slug: [doc.group, doc.slug] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug[0], slug[1]);
  if (!doc) return { title: "سند پیدا نشد" };
  return {
    title: doc.title,
    description: doc.excerpt,
    openGraph: { title: doc.title, description: doc.excerpt },
  };
}

export default async function DocPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = getDoc(slug[0], slug[1]);
  if (!doc) notFound();

  const group = getGroup(doc.group);
  const { prev, next } = getNeighbors(doc);
  const { html, headings } = renderMarkdown(doc.markdown);

  return (
    <>
      <ScrollProgress />
      <div className="mx-auto max-w-6xl px-5 py-10">
        <nav aria-label="مسیر" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#5A7A96]">
          <Link href="/" className="hover:text-[#4FBFAE]">
            خانه
          </Link>
          <span aria-hidden>/</span>
          <Link href="/docs/" className="hover:text-[#4FBFAE]">
            سندها
          </Link>
          <span aria-hidden>/</span>
          <Link href={`/docs/#${doc.group}`} className="hover:text-[#4FBFAE]">
            {group?.label}
          </Link>
          <span aria-hidden>/</span>
          <span className="hub-mono text-[#8FA3B0]">{doc.slug}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article>
            <header className="border-b border-[#4FBFAE]/15 pb-6">
              <p className="hub-mono text-[10px] tracking-[0.3em] text-[#4FBFAE]">
                {group?.en} / {doc.slug.toUpperCase()}
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
                {doc.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#5A7A96]">
                <span className="hub-mono">{doc.minutes} MIN READ</span>
                <span aria-hidden>·</span>
                <span className="hub-mono">{doc.words} WORDS</span>
                <span aria-hidden>·</span>
                <span className="hub-mono" dir="ltr">
                  {doc.file}
                </span>
                <CopyLink className="ms-auto" />
              </div>
            </header>

            <div
              className="prose-hub mt-8"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <nav
              aria-label="سندهای قبلی و بعدی"
              className="mt-12 grid gap-3 border-t border-[#4FBFAE]/15 pt-6 sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={hrefFor(prev)}
                  className="card-hover rounded-lg border border-[#4FBFAE]/15 bg-[#17212B] p-4"
                >
                  <p className="text-[10px] text-[#5A7A96]">قبلی</p>
                  <p className="mt-1 text-sm font-bold">{prev.title}</p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={hrefFor(next)}
                  className="card-hover rounded-lg border border-[#4FBFAE]/15 bg-[#17212B] p-4 sm:text-end"
                >
                  <p className="text-[10px] text-[#5A7A96]">بعدی</p>
                  <p className="mt-1 text-sm font-bold">{next.title}</p>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>

          <aside className="no-print lg:sticky lg:top-24 lg:self-start">
            {headings.length > 0 && (
              <nav
                aria-label="فهرست بخش‌ها"
                className="rounded-xl border border-[#4FBFAE]/15 bg-[#0B111A] p-4"
              >
                <p className="hub-mono mb-3 text-[10px] tracking-[0.25em] text-[#5A7A96]">
                  ON THIS PAGE
                </p>
                <ul className="space-y-1.5 text-xs leading-6">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={heading.level === 3 ? "ps-3" : ""}
                    >
                      <a
                        href={`#${heading.id}`}
                        className="text-[#8FA3B0] hover:text-[#4FBFAE]"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="mt-4 rounded-xl border border-[#4FBFAE]/15 bg-[#0B111A] p-4 text-xs leading-6 text-[#5A7A96]">
              <p className="mb-2 font-bold text-[#8FA3B0]">یادآوری انتشار</p>
              <p>
                محتوای این مخزن پیش‌نویس است. نقل از آن باید وضعیت «تأییدنشده» را حفظ
                کند. داده شخصی و رضایت‌نامه‌ها جای دیگری نگه‌داری می‌شوند.
              </p>
              <Link
                href="/docs/operations/privacy-and-ai/"
                className="mt-3 inline-block font-bold text-[#4FBFAE] hover:underline"
              >
                سیاست داده و AI →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
