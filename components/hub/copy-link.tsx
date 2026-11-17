"use client";

import { useState } from "react";

export function CopyLink({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={
        "rounded-md border border-[#4FBFAE]/30 px-3 py-1.5 text-xs font-bold text-[#4FBFAE] transition-colors hover:bg-[#4FBFAE]/10 " +
        className
      }
      aria-live="polite"
    >
      {copied ? "کپی شد ✓" : "کپی پیوند"}
    </button>
  );
}
