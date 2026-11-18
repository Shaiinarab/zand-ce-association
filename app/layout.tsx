import type { Metadata, Viewport } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import { SiteHeader } from "@/components/hub/site-header";
import { SiteFooter } from "@/components/hub/site-footer";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shaiinarab.github.io/zand-ce-association").replace(
  /\/?$/,
  "/",
);

export const viewport: Viewport = {
  themeColor: "#0F1620",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "انجمن مهندسی کامپیوتر زند — پورتال برنامه‌ها",
    template: "%s | انجمن مهندسی کامپیوتر زند",
  },
  description:
    "پورتال انجمن مهندسی کامپیوتر زند شیراز؛ سه مسیر عملی در هوش مصنوعی، مهندسی سیستم و بلاکچین، همراه با سندهای حاکمیت، کارگاه‌ها و عملیات انجمن.",
  keywords: [
    "انجمن مهندسی کامپیوتر",
    "کارگاه صفر",
    "بوت‌کرفت",
    "موسسه آموزش عالی زند",
    "شیراز",
    "Zand CE",
  ],
  authors: [{ name: "انجمن مهندسی کامپیوتر زند" }],
  openGraph: {
    title: "انجمن مهندسی کامپیوتر زند — پورتال برنامه‌ها",
    description:
      "کارگاه صفر، بوت‌کرفت و آخرین قطرات هایپ؛ سه مسیر عملی در یک اکوسیستم دانشجومحور.",
    images: ["og.png"],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "انجمن مهندسی کامپیوتر زند",
    description: "کارگاه صفر · بوت‌کرفت · آخرین قطرات هایپ",
    images: ["og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0F1620] text-[#DFE7EE] antialiased">
        <a href="#main" className="skip-link">
          پرش به محتوای اصلی
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
