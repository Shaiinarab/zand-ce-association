import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_ROOT = `${(process.env.NEXT_PUBLIC_SITE_URL ?? "https://shaiinarab.github.io/zand-ce-association").replace(/\/+$/, "")}/`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("sitemap.xml", SITE_ROOT).toString(),
    host: new URL(SITE_ROOT).host,
  };
}
