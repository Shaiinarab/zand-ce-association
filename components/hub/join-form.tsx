"use client";

import { useState } from "react";

const INTERESTS = [
  "مسیر Creative — کارگاه صفر",
  "مسیر Builder — کارگاه صفر",
  "مسیر Research — کارگاه صفر",
  "بوت‌کرفت — نصب و بازیابی سیستم",
  "منتورینگ یا پادکست",
  "هنوز مطمئن نیستم",
];

export function JoinForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [device, setDevice] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        dir="rtl"
        className="rounded-xl border border-[#4FBFAE]/30 bg-[#0B111A] p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-bold text-[#4FBFAE]">
          ثبت علاقه‌مندی دریافت شد، {name ? name : "هم‌دانشجویی عزیز"}.
        </p>
        <p className="mt-2 text-sm leading-7 text-[#8FA3B0]">
          این نسخه پیش‌نمایش است و داده‌ای جایی ارسال نمی‌شود؛ در انتشار نهایی، همین فرم به
          یک Google Forms گروهی متصل می‌شود و پاسخ‌ها طبق سند privacy-and-ai فقط برای
          مسئول هماهنگی قابل مشاهده است. تا آن زمان: کانال تلگرام انجمن را دنبال کن.
        </p>
      </div>
    );
  }

  return (
    <form
      dir="rtl"
      onSubmit={onSubmit}
      className="rounded-xl border border-[#4FBFAE]/20 bg-[#17212B] p-6"
      aria-label="فرم علاقه‌مندی برنامه‌ها"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="hub-name" className="mb-1.5 block text-sm text-[#8FA3B0]">
            نام (یا هر اسمی که با آن صدایت می‌زنیم)
          </label>
          <input
            id="hub-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="w-full rounded-md border border-[#4FBFAE]/20 bg-[#0B111A] px-3 py-2.5 text-sm text-[#DFE7EE] outline-none transition-colors focus:border-[#4FBFAE]"
            placeholder="مثلاً: سارا"
          />
        </div>
        <div>
          <label htmlFor="hub-contact" className="mb-1.5 block text-sm text-[#8FA3B0]">
            یک راه تماس (تلگرام یا ایمیل)
          </label>
          <input
            id="hub-contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            autoComplete="email"
            dir="ltr"
            className="w-full rounded-md border border-[#4FBFAE]/20 bg-[#0B111A] px-3 py-2.5 text-sm text-[#DFE7EE] outline-none transition-colors focus:border-[#4FBFAE]"
            placeholder="@username"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="hub-interest" className="mb-1.5 block text-sm text-[#8FA3B0]">
            کدام مسیر کنجکاوت کرده؟
          </label>
          <select
            id="hub-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full rounded-md border border-[#4FBFAE]/20 bg-[#0B111A] px-3 py-2.5 text-sm text-[#DFE7EE] outline-none transition-colors focus:border-[#4FBFAE]"
          >
            {INTERESTS.map((item) => (
              <option key={item} value={item} className="bg-[#0B111A]">
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#8FA3B0]">
        <input
          type="checkbox"
          checked={device}
          onChange={(e) => setDevice(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#4FBFAE]"
        />
        <span>
          دستگاه شخصی‌ام برای تمرین آماده نیست؛ برای دستگاه جایگزین یا کار دونفره برنامه
          ریزی کنید.
        </span>
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-[#4FBFAE] px-5 py-3 text-sm font-black text-[#0B111A] transition-transform hover:scale-[1.01]"
      >
        ثبت علاقه‌مندی (پیش‌نمایش)
      </button>
      <p className="mt-3 text-xs leading-6 text-[#5A7A96]">
        هیچ داده‌ای در این پیش‌نمایش ذخیره یا ارسال نمی‌شود. حداقل‌گرایی داده: فقط همین
        سه فیلد.
      </p>
    </form>
  );
}
