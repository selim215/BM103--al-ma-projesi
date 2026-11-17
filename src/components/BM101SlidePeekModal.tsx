import React, { useEffect } from 'react';
import { X, BookOpen, CheckCircle2, Code2 } from 'lucide-react';
import { BM101_WEEKS } from '../data/bm101Weeks';
import { PdfSlidePreview } from './PdfSlidePreview';

export interface BM101SlidePeekTarget {
  weekId?: string;
  pdfFile: string;
  pdfLabel: string;
  slideNum: number;
}

interface BM101SlidePeekModalProps {
  peek: BM101SlidePeekTarget | null;
  onClose: () => void;
  onOpenFullReader: (weekId: string, slideIdx: number) => void;
}

export const BM101SlidePeekModal: React.FC<BM101SlidePeekModalProps> = ({
  peek,
  onClose,
  onOpenFullReader,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!peek) return null;

  // Locate matching curated slide explanation across BM101 weeks
  let matchedWeek = peek.weekId
    ? BM101_WEEKS.find((w) => w.id === peek.weekId)
    : undefined;
  let matchedIdx = -1;

  if (matchedWeek) {
    matchedIdx = matchedWeek.slides.findIndex(
      (s) => s.pdfFile === peek.pdfFile && s.n === peek.slideNum
    );
  }
  if (matchedIdx < 0) {
    for (const w of BM101_WEEKS) {
      const idx = w.slides.findIndex(
        (s) => s.pdfFile === peek.pdfFile && s.n === peek.slideNum
      );
      if (idx >= 0) {
        matchedWeek = w;
        matchedIdx = idx;
        break;
      }
    }
  }
  if (!matchedWeek) {
    matchedWeek = BM101_WEEKS.find((w) => w.id === peek.weekId) || BM101_WEEKS[0];
  }

  const matchedSlide = matchedIdx >= 0 ? matchedWeek.slides[matchedIdx] : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bm101-peek-title"
    >
      <div
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b-2 border-red-700 bg-[#0f2342] px-5 py-3.5 text-white">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-red-300">
              {peek.pdfLabel} · PDF Sayfa {peek.slideNum}
            </div>
            <h3 id="bm101-peek-title" className="truncate text-base font-bold">
              {matchedSlide ? matchedSlide.t : `${peek.pdfLabel} — Sayfa ${peek.slideNum}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="shrink-0 rounded-lg p-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-5 overflow-y-auto p-5 lg:grid-cols-2">
          <div>
            <PdfSlidePreview
              pdfFile={peek.pdfFile}
              pageNumber={peek.slideNum}
              pdfLabel={peek.pdfLabel}
              caption={matchedSlide?.visualCaption || `${peek.pdfLabel} · Sayfa ${peek.slideNum} Birebir Görünüm`}
            />
          </div>

          <div className="space-y-4">
            {matchedSlide ? (
              <>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-1.5 text-xs font-extrabold uppercase tracking-wide text-[#0f2342]">
                    Slayt Açıklaması
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {matchedSlide.explanation}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                    Sınav Özeti &amp; Kritik Noktalar
                  </div>
                  <ul className="space-y-1.5 text-sm text-emerald-950">
                    {matchedSlide.summaryPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {matchedSlide.codeSnippet && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-slate-100">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-sky-300">
                      <Code2 className="h-3.5 w-3.5" />
                      İlgili C Kodu
                    </div>
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                      {matchedSlide.codeSnippet}
                    </pre>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                Bu PDF sayfasının birebir orijinal görünümü solda yer almaktadır. Hafta içi slayt okuyucudan ilgili dersin özet ve çözümlerini inceleyebilirsiniz.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-3">
          <span className="text-xs text-slate-500">
            Kaynak: {peek.pdfLabel} (Yalnızca BM101 arşivi)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Kapat
            </button>
            {matchedIdx >= 0 && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenFullReader(matchedWeek.id, matchedIdx);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f2342] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#1a3664]"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Slayt Okuyucuda Aç
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
