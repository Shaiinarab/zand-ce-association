import type { MetadataRoute } from "next";
import { getAllDocs } from "@/lib/content";

const SITE_ROOT = `${(process.env.NEXT_PUBLIC_SITE_URL ?? "https://shaiinarab.github.io/zand-ce-association").replace(/\/+$/, "")}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "docs/",
    "roadmap/",
    "terminal/",
    "programs/crypto-hype/",
    ...getAllDocs().map((doc) => `docs/${doc.group}/${doc.slug}/`),
  ];

  return paths.map((path, index) => ({
    url: new URL(path, SITE_ROOT).toString(),
    lastModified: now,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path.startsWith("programs/") ? 0.85 : 0.65,
  }));
}
