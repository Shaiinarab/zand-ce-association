"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Item = {
  group: string;
  groupLabel: string;
  slug: string;
  title: string;
  excerpt: string;
  minutes: number;
  href: string;
};

export function DocFilter({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");

  const groups = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of items) map.set(item.group, item.groupLabel);
    return [...map.entries()];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (group !== "all" && item.group !== group) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.groupLabel.toLowerCase().includes(q)
      );
    });
  }, [items, query, group]);

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-xl border border-[#4FBFAE]/20 bg-[#0B111A] p-4 md:flex-row md:items-center">
        <div className="flex-1">
          <label htmlFor="doc-search" className="mb-1.5 block text-xs text-[#8FA3B0]">
            جست‌وجو در سندها
          </label>
          <input
            id="doc-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثلاً: رضایت، ایمنی، نقشه راه…"
            className="w-full rounded-md border border-[#4FBFAE]/20 bg-[#0F1620] px-3 py-2.5 text-sm text-[#DFE7EE] outline-none focus:border-[#4FBFAE]"
          />
        </div>
        <div className="md:w-56">
          <label htmlFor="doc-group" className="mb-1.5 block text-xs text-[#8FA3B0]">
            حوزه
          </label>
          <select
            id="doc-group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-full rounded-md border border-[#4FBFAE]/20 bg-[#0F1620] px-3 py-2.5 text-sm text-[#DFE7EE] outline-none focus:border-[#4FBFAE]"
          >
            <option value="all">همه حوزه‌ها</option>
            {groups.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#5A7A96]" role="status" aria-live="polite">
        {filtered.length === items.length
          ? `${items.length} سند در ${groups.length} حوزه`
          : `${filtered.length} نتیجه از ${items.length} سند`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-lg border border-[#4FBFAE]/20 bg-[#17212B] p-6 text-sm text-[#8FA3B0]">
          چیزی پیدا نشد. عبارت کوتاه‌تری امتحان کن یا فیلتر حوزه را بردار.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((item) => (
            <Link
              key={`${item.group}/${item.slug}`}
              href={item.href}
              className="card-hover group rounded-xl border border-[#4FBFAE]/15 bg-[#17212B] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="hub-mono text-[10px] tracking-widest text-[#5A7A96]">
                  {item.groupLabel}
                </span>
                <span className="hub-mono text-[10px] text-[#5A7A96]">
                  {item.minutes} MIN
                </span>
              </div>
              <h3 className="mt-3 text-base font-black group-hover:text-[#4FBFAE]">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#8FA3B0]">
                {item.excerpt}
              </p>
              <p className="hub-mono mt-4 text-[10px] tracking-widest text-[#4FBFAE]/70">
                {item.group}/{item.slug} →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
