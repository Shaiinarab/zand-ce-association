"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { asset } from "@/lib/base";

export type TerminalDoc = {
  group: string;
  groupLabel: string;
  slug: string;
  title: string;
};

type Line = { kind: "in" | "out" | "ok" | "warn" | "dim"; text: string };

const BOOT = [
  "[01] POWER ON        → هویت مشترک؛ یک نام، یک زبان بصری",
  "[02] FIRMWARE        → منشور و شورا؛ چه چیزی مجاز است بوت شود",
  "[03] BOOT MANAGER    → همین پورتال؛ مسیریابی به برنامه‌ها",
  "[04] KERNEL+INITRAMFS→ کارگاه صفر + بوت‌کرفت؛ هسته اجرایی",
  "[05] USER SPACE      → دیوار خروجی، منتورها، پادکست",
];

export function HubTerminal({
  docs,
  stats,
}: {
  docs: TerminalDoc[];
  stats: { docs: number; groups: number; workshops: number; decisions: number; gates: number };
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<Line[]>([
    { kind: "dim", text: "ZAND CE HUB terminal v0.2 — local only, no network." },
    { kind: "out", text: "برای شروع `help` را تایپ کن. با ↑/↓ تاریخچه را ببین." },
  ]);

  const groups = useMemo(() => {
    const map = new Map<string, { label: string; docs: TerminalDoc[] }>();
    for (const doc of docs) {
      const entry = map.get(doc.group) ?? { label: doc.groupLabel, docs: [] };
      entry.docs.push(doc);
      map.set(doc.group, entry);
    }
    return map;
  }, [docs]);

  function print(next: Line[]) {
    setLines((prev) => [...prev, ...next].slice(-120));
  }

  function run(raw: string) {
    const command = raw.trim();
    if (!command) return;
    setHistory((prev) => [command, ...prev].slice(0, 50));
    setHistoryIndex(-1);
    print([{ kind: "in", text: command }]);

    const [verb, ...rest] = command.split(/\s+/);
    const arg = rest.join(" ");

    switch (verb.toLowerCase()) {
      case "help":
        print([
          { kind: "ok", text: "دستورهای موجود:" },
          { kind: "out", text: "help            این راهنما" },
          { kind: "out", text: "ls              فهرست حوزه‌ها" },
          { kind: "out", text: "ls <group>      سندهای یک حوزه" },
          { kind: "out", text: "open <n|slug>   باز کردن سند با شماره یا نام" },
          { kind: "out", text: "status          شمارنده‌های زنده" },
          { kind: "out", text: "boot            نمایش زنجیره بوت" },
          { kind: "out", text: "roadmap         رفتن به نقشه راه ۹۰ روزه" },
          { kind: "out", text: "playbook        دانلود پلی‌بوک خلاقیت" },
          { kind: "out", text: "join            رفتن به فرم عضویت" },
          { kind: "out", text: "home            بازگشت به خانه" },
          { kind: "out", text: "clear           پاک کردن صفحه" },
        ]);
        return;

      case "ls": {
        if (!arg) {
          print([
            { kind: "ok", text: `${groups.size} حوزه، ${docs.length} سند:` },
            ...[...groups.entries()].map(([id, group]) => ({
              kind: "out" as const,
              text: `${id.padEnd(12)} ${String(group.docs.length).padStart(2)} سند — ${group.label}`,
            })),
          ]);
          return;
        }
        const found = groups.get(arg);
        if (!found) {
          print([{ kind: "warn", text: `حوزه پیدا نشد: ${arg}` }]);
          return;
        }
        print([
          { kind: "ok", text: `${arg} — ${found.label}` },
          ...found.docs.map((doc, i) => ({
            kind: "out" as const,
            text: `${String(i + 1).padStart(2)}. ${doc.slug} — ${doc.title}`,
          })),
        ]);
        return;
      }

      case "open": {
        if (!arg) {
          print([{ kind: "warn", text: "نام یا شماره سند را بده: open charter-draft" }]);
          return;
        }
        const direct = docs.find(
          (d) => d.slug === arg || `${d.group}/${d.slug}` === arg,
        );
        if (direct) {
          print([{ kind: "ok", text: `باز کردن: ${direct.title}` }]);
          router.push(`/docs/${direct.group}/${direct.slug}/`);
          return;
        }
        const index = Number(arg);
        if (Number.isInteger(index) && index >= 1 && index <= docs.length) {
          const doc = docs[index - 1];
          print([{ kind: "ok", text: `باز کردن: ${doc.title}` }]);
          router.push(`/docs/${doc.group}/${doc.slug}/`);
          return;
        }
        print([
          { kind: "warn", text: `سند پیدا نشد: ${arg}` },
          { kind: "dim", text: "با `ls governance` فهرست را ببین." },
        ]);
        return;
      }

      case "status":
        print([
          { kind: "ok", text: "ZAND CE HUB / live counters" },
          { kind: "out", text: `documents   ${stats.docs}` },
          { kind: "out", text: `domains     ${stats.groups}` },
          { kind: "out", text: `workshops   ${stats.workshops}` },
          { kind: "out", text: `decisions   ${stats.decisions}` },
          { kind: "out", text: `roadmap     ${stats.gates} gates` },
          {
            kind: "dim",
            text: "approval: draft — institution approval and council sign-off pending",
          },
        ]);
        return;

      case "boot":
        print([
          { kind: "ok", text: "root@zand-ce:~$ boot --chain --verbose" },
          ...BOOT.map((text) => ({ kind: "out" as const, text })),
          { kind: "ok", text: "status: chain understood_" },
        ]);
        return;

      case "roadmap":
        router.push("/roadmap/");
        return;

      case "playbook":
        print([{ kind: "ok", text: "باز کردن پلی‌بوک خلاقیت…" }]);
        window.open(asset("/Zand-CE-Creative-Playbook.pdf"), "_blank", "noopener,noreferrer");
        return;

      case "join":
        router.push("/#join");
        return;

      case "home":
        router.push("/");
        return;

      case "clear":
        setLines([]);
        return;

      default:
        print([
          { kind: "warn", text: `دستور ناشناخته: ${verb}` },
          { kind: "dim", text: "`help` را امتحان کن." },
        ]);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next]) {
        setHistoryIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setValue(next === -1 ? "" : history[next]);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#4FBFAE]/25 bg-[#0B111A] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 border-b border-[#4FBFAE]/15 bg-[#0F1620] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF7B72]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E3B341]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4FBFAE]" aria-hidden />
        <span className="hub-mono ms-2 text-[11px] tracking-widest text-[#5A7A96]">
          root@zand-ce: ~/hub
        </span>
        <span className="hub-mono ms-auto text-[10px] text-[#5A7A96]">LOCAL / READ-ONLY</span>
      </div>

      <div
        dir="ltr"
        className="hub-mono max-h-[26rem] min-h-[18rem] overflow-y-auto px-4 py-4 text-[13px] leading-7"
        role="log"
        aria-live="polite"
        aria-label="خروجی ترمینال"
      >
        {lines.map((line, i) => (
          <p
            key={`${i}-${line.text.slice(0, 12)}`}
            className={
              line.kind === "in"
                ? "text-[#DFE7EE]"
                : line.kind === "ok"
                  ? "text-[#4FBFAE]"
                  : line.kind === "warn"
                    ? "text-[#E3B341]"
                    : line.kind === "dim"
                      ? "text-[#5A7A96]"
                      : "text-[#8FA3B0]"
            }
          >
            {line.kind === "in" ? (
              <>
                <span className="text-[#5A7A96]">zand@ce</span>
                <span className="text-[#4FBFAE]">:~$ </span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </p>
        ))}
        <form
          className="mt-2 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue("");
            inputRef.current?.focus();
          }}
        >
          <label htmlFor="hub-terminal-input" className="sr-only">
            دستور ترمینال
          </label>
          <span className="text-[#5A7A96]">zand@ce</span>
          <span className="text-[#4FBFAE]">:~$</span>
          <input
            id="hub-terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-[#DFE7EE] outline-none placeholder:text-[#3d5568]"
            placeholder="help"
            aria-describedby="hub-terminal-hint"
          />
        </form>
      </div>

      <div
        id="hub-terminal-hint"
        className="flex flex-wrap items-center gap-2 border-t border-[#4FBFAE]/15 px-4 py-3"
      >
        <span className="hub-mono text-[10px] tracking-widest text-[#5A7A96]">QUICK:</span>
        {["help", "ls", "status", "boot", "roadmap"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              run(cmd);
              inputRef.current?.focus();
            }}
            className="hub-mono rounded border border-[#4FBFAE]/25 px-2 py-1 text-[11px] text-[#8FA3B0] transition-colors hover:border-[#4FBFAE] hover:text-[#4FBFAE]"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
