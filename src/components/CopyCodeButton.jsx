import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

const VARIANTS = {
  dark: {
    idle: 'border-white/20 bg-black/35 text-[#e8e8ed] hover:bg-black/55 hover:border-white/35',
    done: 'border-emerald-500/50 bg-emerald-500/15 text-emerald-200',
  },
  toolbar: {
    idle: 'border-apple-border bg-transparent text-apple-graphite hover:bg-apple-surface/60',
    done: 'border-emerald-500/40 bg-emerald-50 text-emerald-700',
  },
};

export default function CopyCodeButton({
  text,
  label = '코드 복사',
  copiedLabel = '복사됨',
  className = '',
  size = 'md',
  variant = 'dark',
}) {
  const [copied, setCopied] = useState(false);
  const styles = VARIANTS[variant] ?? VARIANTS.dark;

  const handleCopy = async () => {
    if (!text) return;
    const ok = await copyTextToClipboard(text);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const sizeClass =
    size === 'sm'
      ? 'min-h-[28px] gap-1 px-2.5 py-1 text-[11px]'
      : 'min-h-[32px] gap-1.5 px-[18px] py-[11px] text-[13px] font-semibold';

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center rounded-[980px] border tracking-tight transition-colors ${sizeClass} ${
        copied ? styles.done : styles.idle
      } ${className}`}
      aria-label={copied ? copiedLabel : label}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden />
          복사
        </>
      )}
    </button>
  );
}
