import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type GroupDef = {
  id: string;
  dir: string;
  label: string;
  en: string;
  blurb: string;
  glyph: string;
};

export type Doc = {
  group: string;
  slug: string;
  file: string;
  title: string;
  excerpt: string;
  words: number;
  minutes: number;
};

export type Heading = { id: string; level: number; text: string };

export type RoadmapGate = {
  range: string;
  priority: string;
  gate: string;
};

export type DocWithBody = Doc & { markdown: string };

const ROOT = process.cwd();

export const GROUPS: GroupDef[] = [
  {
    id: "governance",
    dir: "00-governance",
    label: "حاکمیت",
    en: "GOVERNANCE",
    blurb: "منشور، نقش‌ها، نقشه راه و ثبت تصمیم",
    glyph: "◇",
  },
  {
    id: "orientation",
    dir: "01-orientation",
    label: "معارفه",
    en: "ORIENTATION",
    blurb: "برنامه معارفه و متن ارائه",
    glyph: "▷",
  },
  {
    id: "workshops",
    dir: "02-workshops",
    label: "کارگاه‌ها",
    en: "WORKSHOPS",
    blurb: "نقشه آموزشی، ایمنی و طرح کارگاه‌ها",
    glyph: "⚒",
  },
  {
    id: "podcast",
    dir: "03-podcast",
    label: "پادکست",
    en: "PODCAST",
    blurb: "پایلوت پادکست و چک‌لیست رضایت",
    glyph: "◉",
  },
  {
    id: "mentoring",
    dir: "04-alumni-mentoring",
    label: "منتورینگ",
    en: "MENTORING",
    blurb: "شبکه فارغ‌التحصیلان، منتورینگ و گردهمایی",
    glyph: "⇄",
  },
  {
    id: "operations",
    dir: "05-operations",
    label: "عملیات",
    en: "OPERATIONS",
    blurb: "فرم‌ها، شاخص‌ها، حریم خصوصی و تداوم",
    glyph: "⌘",
  },
  {
    id: "research",
    dir: "06-research",
    label: "پژوهش",
    en: "RESEARCH",
    blurb: "منابع، حدود شواهد و پرسش‌های باز",
    glyph: "◎",
  },
];

const groupById = new Map(GROUPS.map((g) => [g.id, g]));

export function getGroup(id: string): GroupDef | undefined {
  return groupById.get(id);
}

function readFile(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function stripMarkdown(input: string): string {
  return input
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function titleOf(markdown: string, fallback: string): string {
  const line = markdown.split(/\r?\n/).find((l) => /^#\s+/.test(l));
  return line ? stripMarkdown(line) : fallback;
}

export function excerptOf(markdown: string, max = 150): string {
  const lines = markdown.split(/\r?\n/);
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("#")) continue;
    if (t.startsWith("|")) continue;
    if (t.startsWith("-") || t.startsWith("*") || t.startsWith(">")) continue;
    if (/^\d+[.)]\s/.test(t)) continue;
    const plain = stripMarkdown(t);
    if (plain.length < 8) continue;
    return plain.length > max ? `${plain.slice(0, max - 1)}…` : plain;
  }
  return "";
}

function countWords(markdown: string): number {
  const plain = stripMarkdown(markdown);
  const words = plain.split(/\s+/).filter(Boolean);
  return words.length;
}

function toDoc(group: GroupDef, fileName: string): Doc {
  const markdown = readFile(path.join(group.dir, fileName));
  const words = countWords(markdown);
  return {
    group: group.id,
    slug: fileName.replace(/\.md$/, ""),
    file: path.join(group.dir, fileName),
    title: titleOf(markdown, fileName.replace(/\.md$/, "")),
    excerpt: excerptOf(markdown),
    words,
    minutes: Math.max(1, Math.round(words / 180)),
  };
}

export function getGroupsWithDocs(): Array<GroupDef & { docs: Doc[] }> {
  return GROUPS.map((group) => {
    const dir = path.join(ROOT, group.dir);
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .sort((a, b) => a.localeCompare(b, "en"));
    return { ...group, docs: files.map((f) => toDoc(group, f)) };
  });
}

export function getAllDocs(): Doc[] {
  return getGroupsWithDocs().flatMap((g) => g.docs);
}

export function getDoc(groupId: string, slug: string): DocWithBody | undefined {
  const group = groupById.get(groupId);
  if (!group) return undefined;
  const file = path.join(ROOT, group.dir, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const markdown = fs.readFileSync(file, "utf8");
  return { ...toDoc(group, `${slug}.md`), markdown };
}

export function getNeighbors(doc: Doc): { prev?: Doc; next?: Doc } {
  const docs = getAllDocs();
  const index = docs.findIndex((d) => d.group === doc.group && d.slug === doc.slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? docs[index - 1] : undefined,
    next: index < docs.length - 1 ? docs[index + 1] : undefined,
  };
}

export function hrefFor(doc: Pick<Doc, "group" | "slug">): string {
  return `/docs/${doc.group}/${doc.slug}/`;
}

export function getStats() {
  const groups = getGroupsWithDocs();
  const docs = groups.flatMap((g) => g.docs);
  const decisionsCsv = readFile("00-governance/decision-log.csv")
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0);
  const decisions = Math.max(0, decisionsCsv.length - 1);
  const roadmap = getRoadmap();
  return {
    docs: docs.length,
    groups: groups.length,
    workshops: groups.find((g) => g.id === "workshops")?.docs.length ?? 0,
    decisions,
    gates: roadmap.length,
    words: docs.reduce((sum, d) => sum + d.words, 0),
  };
}

export function getRoadmap(): RoadmapGate[] {
  const md = readFile(path.join("00-governance", "90-day-roadmap.md"));
  return md
    .split(/\r?\n/)
    .filter((line) => line.trim().startsWith("|"))
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim()),
    )
    .filter((cells) => cells.length >= 3)
    .filter((cells) => !cells.every((c) => /^:?-{2,}:?$/.test(c)))
    .filter((cells) => cells[0] !== "بازه")
    .map(([range, priority, gate]) => ({ range, priority, gate }));
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderMarkdown(markdown: string): {
  html: string;
  headings: Heading[];
} {
  const raw = marked.parse(markdown, { gfm: true, async: false }) as string;
  const headings: Heading[] = [];
  let index = 0;
  const html = raw.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      index += 1;
      const id = `sec-${index}`;
      const text = inner.replace(/<[^>]+>/g, "").trim();
      headings.push({ id, level: Number(level), text });
      return `<h${level} id="${id}" class="group">${inner}<a href="#${id}" class="ms-2 text-xs text-[#4FBFAE]/50 no-underline opacity-0 group-hover:opacity-100" aria-hidden="true">#</a></h${level}>`;
    },
  );
  return { html, headings };
}

export function excerptHtml(markdown: string, max = 220): string {
  return escapeHtml(excerptOf(markdown, max));
}
