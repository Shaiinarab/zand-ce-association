import type { Metadata } from "next";
import Link from "next/link";
import { getRoadmap, getStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "نقشه راه ۹۰ روزه",
  description:
    "دروازه‌های ۹۰ روزه انجمن با شرط عبور هر مرحله و قاعده توقف؛ تاریخ‌ها نسبی و وابسته به مجوز و ظرفیت‌اند.",
};

export default function RoadmapPage() {
  const gates = getRoadmap();
  const stats = getStats();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="hub-mono mb-2 text-xs tracking-[0.3em] text-[#4FBFAE]">ZAND CE / ROADMAP</p>
      <h1 className="text-3xl font-black md:text-4xl">نقشه راه ۹۰ روزه</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8FA3B0]">
        {stats.gates} دروازه؛ هر دروازه یک شرط عبور دارد و هیچ دروازه‌ای با «انجام شد»
        بدون شاهد بسته نمی‌شود. تاریخ‌ها نسبی‌اند و با امتحانات و مجوزها تنظیم می‌شوند.
      </p>

      <ol className="mt-10 space-y-4">
        {gates.map((gate, index) => (
          <li
            key={gate.range}
            className="relative rounded-xl border border-[#4FBFAE]/15 bg-[#17212B] p-5 ps-16"
          >
            <span
              aria-hidden
              className="hub-mono absolute start-4 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-[#4FBFAE]/30 bg-[#0B111A] text-xs font-bold text-[#4FBFAE]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="hub-mono text-[11px] tracking-[0.2em] text-[#4FBFAE]">
              {gate.range}
            </p>
            <h2 className="mt-2 text-base font-black leading-7">{gate.priority}</h2>
            <p className="mt-2 text-xs leading-6 text-[#8FA3B0]">
              <span className="font-bold text-[#DFE7EE]">شرط عبور: </span>
              {gate.gate}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-xl border border-[#E3B341]/30 bg-[#E3B341]/5 p-5">
        <p className="hub-mono text-[10px] tracking-[0.25em] text-[#E3B341]">STOP RULE</p>
        <p className="mt-2 text-sm leading-7 text-[#DFE7EE]">
          اگر مسئول، مجوز یا حداقل پشتیبانی فراهم نیست، فعالیت تعویق می‌افتد. ایده‌ها در
          backlog می‌مانند. هیچ فعالیتی برای «پر کردن تقویم» شروع نمی‌شود.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/docs/governance/90-day-roadmap/"
          className="rounded-md bg-[#4FBFAE] px-4 py-2.5 text-sm font-bold text-[#0B111A]"
        >
          متن کامل نقشه راه
        </Link>
        <Link
          href="/docs/governance/decision-log/"
          className="rounded-md border border-[#4FBFAE]/30 px-4 py-2.5 text-sm font-bold text-[#4FBFAE] hover:bg-[#4FBFAE]/10"
        >
          ثبت تصمیم‌ها
        </Link>
      </div>
    </div>
  );
}
