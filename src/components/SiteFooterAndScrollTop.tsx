import React, { useEffect, useState } from 'react';
import { ArrowUp, Mail, Copy, Check, X, Sparkles } from 'lucide-react';

const FEEDBACK_EMAIL = 'selimh.aytekin@gmail.com';

export const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 180);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="En üste çık"
      title="En üste çık"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`no-print fixed bottom-5 right-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-[#0f2342] shadow-sm backdrop-blur-sm transition-all duration-200 focus:outline-none ${
        visible
          ? 'translate-y-0 opacity-40 hover:scale-105 hover:border-[#0f2342]/40 hover:bg-white hover:opacity-95 hover:shadow-md focus:opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
};

interface SehaFooterProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
}

export const SehaFooter: React.FC<SehaFooterProps> = ({
  variant = 'light',
  compact = false,
}) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(FEEDBACK_EMAIL).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div
      className={`no-print relative flex flex-col items-center justify-center text-center ${
        compact ? 'pt-2 pb-0.5' : 'py-5'
      }`}
    >
      {open && (
        <div
          className={`mb-3 w-full max-w-xs rounded-xl border p-4 text-left shadow-xl transition-all ${
            variant === 'dark'
              ? 'border-slate-700 bg-slate-900 text-slate-100'
              : 'border-slate-200 bg-white text-slate-800'
          }`}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-tight text-sky-500">
              <Sparkles className="h-3.5 w-3.5" />
              <span className={variant === 'dark' ? 'text-sky-300' : 'text-[#0f2342]'}>
                seha design · İletişim
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Paneli kapat"
              className={`rounded p-1 transition-colors ${
                variant === 'dark'
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <p
            className={`text-xs leading-relaxed ${
              variant === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Görüş, öneri ve geri bildirimleriniz için benimle iletişime geçebilirsiniz:
          </p>

          <div
            className={`mt-2.5 flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 ${
              variant === 'dark'
                ? 'border-slate-700 bg-slate-950/70'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <a
              href={`mailto:${FEEDBACK_EMAIL}?subject=BM101%20/%20BM103%20Geri%20Bildirimi`}
              className={`inline-flex min-w-0 items-center gap-1.5 truncate font-mono text-[11px] font-semibold underline-offset-2 hover:underline ${
                variant === 'dark' ? 'text-sky-300' : 'text-[#0f2342]'
              }`}
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-red-600" />
              <span className="truncate">{FEEDBACK_EMAIL}</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex shrink-0 items-center gap-1 rounded px-2 py-1 text-[10px] font-bold transition-colors ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : variant === 'dark'
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'border border-slate-300 bg-white text-[#0f2342] hover:bg-slate-100'
              }`}
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Kopyalandı' : 'Kopyala'}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Görüş, öneri ve geri bildirim için tıklayın"
        className={`cursor-pointer select-none rounded-full px-3 py-1 text-xs italic tracking-wide transition-all duration-300 focus:outline-none ${
          variant === 'dark'
            ? 'text-slate-300 opacity-45 hover:bg-white/5 hover:text-sky-200 hover:opacity-100 hover:[text-shadow:0_0_12px_rgba(125,211,252,0.85)]'
            : 'text-slate-400 opacity-50 hover:bg-sky-50/70 hover:text-[#0f2342] hover:opacity-100 hover:[text-shadow:0_0_10px_rgba(56,189,248,0.75)]'
        }`}
      >
        seha design
      </button>
    </div>
  );
};
