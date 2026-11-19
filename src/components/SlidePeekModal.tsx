import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { resolveSlideForWeek } from '../data/bm103Data';

interface SlidePeekModalProps {
  peek: { weekId: string; slideNum: number } | null;
  onClose: () => void;
  onOpenFullReader?: (weekId: string, slideNumber: number) => void;
}

export const SlidePeekModal: React.FC<SlidePeekModalProps> = ({ peek, onClose, onOpenFullReader }) => {
  if (!peek) return null;

  const resolved = resolveSlideForWeek(peek.weekId, peek.slideNum);
  if (!resolved) return null;

  const { week, slide, requestedNum } = resolved;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09251C]/65 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="slide-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b-4 border-[#A55704] bg-[#09251C] px-5 py-3.5 text-[#F8EADC]">
          <div className="min-w-0">
            <div className="text-xs font-medium text-[#F3D2AF]">
              {week.tag} · {week.pdfName}
            </div>
            <h3 id="slide-modal-title" className="truncate text-base font-bold">
              PDF Sayfa {slide.n}
              {requestedNum !== slide.n ? ` (Referans: Sayfa ${requestedNum})` : ''} — {slide.t}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#F8EADC] transition-colors hover:bg-white/20 whitespace-nowrap"
          >
            Kapat <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="slide-content overflow-y-auto p-6 text-slate-800">
          <div dangerouslySetInnerHTML={{ __html: slide.body }} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-[#FAF6F0] px-5 py-3">
          <span className="min-w-0 text-xs text-slate-500 [overflow-wrap:anywhere]">
            Kaynak: {week.title}
          </span>
          {onOpenFullReader && (
            <button
              type="button"
              onClick={() => {
                onOpenFullReader(week.id, slide.n);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#09251C] px-3.5 py-1.5 text-xs font-semibold text-[#F8EADC] transition-colors hover:bg-[#0f3a2c] whitespace-nowrap"
            >
              <BookOpen className="h-3.5 w-3.5" />
              PDF Sayfa Okuyucuda Aç
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
