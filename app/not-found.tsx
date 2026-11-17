import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-16 text-center">
      <p className="hub-mono text-xs tracking-[0.3em] text-[#4FBFAE]">404 / KERNEL PANIC?</p>
      <h1 className="mt-4 text-3xl font-black">این مسیر بوت نمی‌شود.</h1>
      <p className="mt-3 max-w-lg text-sm leading-7 text-[#8FA3B0]">
        سند یا صفحه پیدا نشد. از نقشه سندها شروع کن یا با ترمینال مسیر را پیدا کن؛
        زنجیره بوت اینجا قطع شده، نه در جای دیگری.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/docs/"
          className="rounded-md bg-[#4FBFAE] px-4 py-2.5 text-sm font-bold text-[#0B111A]"
        >
          نقشه سندها
        </Link>
        <Link
          href="/terminal/"
          className="rounded-md border border-[#4FBFAE]/40 px-4 py-2.5 text-sm font-bold text-[#4FBFAE]"
        >
          ترمینال
        </Link>
        <Link
          href="/"
          className="rounded-md px-4 py-2.5 text-sm text-[#8FA3B0] hover:text-[#DFE7EE]"
        >
          خانه
        </Link>
      </div>
    </div>
  );
}
