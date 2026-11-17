import type { Metadata } from "next";
import { HubTerminal } from "@/components/hub/terminal";
import { getAllDocs, getGroup, getStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "ترمینال پورتال",
  description:
    "یک ترمینال محلی برای گشتن در سندهای انجمن: ls، open، status، boot و roadmap؛ بدون شبکه و بدون ذخیره داده.",
};

export default function TerminalPage() {
  const docs = getAllDocs().map((doc) => ({
    group: doc.group,
    groupLabel: getGroup(doc.group)?.label ?? doc.group,
    slug: doc.slug,
    title: doc.title,
  }));
  const stats = getStats();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="hub-mono mb-2 text-xs tracking-[0.3em] text-[#4FBFAE]">
        ZAND CE / TERMINAL
      </p>
      <h1 className="text-3xl font-black md:text-4xl">پورتال را از ترمینال بگرد.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8FA3B0]">
        همه‌چیز در مرورگر و بدون شبکه اجرا می‌شود. `ls` فهرست حوزه‌ها را می‌آورد،
        `open` سند را باز می‌کند و `status` شمارنده‌های زنده را نشان می‌دهد.
      </p>

      <div className="mt-8">
        <HubTerminal docs={docs} stats={stats} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { cmd: "ls governance", desc: "چهار سند حاکمیت را فهرست می‌کند" },
          { cmd: "open workshop-01", desc: "طرح کارگاه اول را باز می‌کند" },
          { cmd: "status", desc: "شمارنده‌های سند، کارگاه و دروازه" },
        ].map((item) => (
          <div
            key={item.cmd}
            className="rounded-lg border border-[#4FBFAE]/15 bg-[#17212B] p-4"
          >
            <p className="hub-mono text-xs text-[#4FBFAE]">{item.cmd}</p>
            <p className="mt-2 text-xs leading-6 text-[#8FA3B0]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
