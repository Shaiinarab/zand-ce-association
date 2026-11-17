import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import { SiteHeader } from "@/components/hub/site-header";
import { SiteFooter } from "@/components/hub/site-footer";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://zand-ce-association.vercel.app").replace(
  /\/?$/,
  "/",
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "انجمن مهندسی کامپیوتر زند — پورتال برنامه‌ها",
    template: "%s | انجمن مهندسی کامپیوتر زند",
  },
  description:
    "یک اکوسیستم، دو برنامه فعال، یک دیوار خروجی؛ کارگاه صفر و بوت‌کرفت در یک دروازه مشترک، همراه با بسته کامل حاکمیت و عملیات انجمن.",
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
      "کارگاه صفر، بوت‌کرفت و دیوار خروجی؛ یک اکوسیستم دانشجومحور برای یادگیری عملی.",
    images: ["og.png"],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "انجمن مهندسی کامپیوتر زند",
    description: "کارگاه صفر · بوت‌کرفت · دیوار خروجی",
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
