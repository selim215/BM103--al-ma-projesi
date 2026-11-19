import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, CheckCircle2, FileText, Sigma } from 'lucide-react';
import { MAT101Module } from '../types/mat101';
import {
  LECTURE_NOTES_LABEL,
  LECTURE_NOTES_PDF,
  LECTURE_NOTES_TOTAL_PAGES,
  MAT101_MODULES,
} from '../data/mat101Modules';
import { PdfSlidePreview } from './PdfSlidePreview';
import { MathText } from './MathText';

interface MAT101ModuleSlideReaderProps {
  module: MAT101Module;
  slideIdx: number;
  onChangeSlideIdx: (idx: number) => void;
}

export const MAT101ModuleSlideReader: React.FC<MAT101ModuleSlideReaderProps> = ({
  module,
  slideIdx,
  onChangeSlideIdx,
}) => {
  const safeIdx = Math.min(Math.max(0, slideIdx), Math.max(0, module.slides.length - 1));
  const slide = module.slides[safeIdx];

  if (!slide) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Bu modül için PDF sayfası bulunamadı.
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-[#09251C]">
            {module.tag} — Lecture Notes (PDF + Yan Yana Açıklama)
          </h2>
          <p className="text-xs text-slate-500">
            Kaynak: {LECTURE_NOTES_LABEL} ({module.pageRange}) · Gösterilen: {safeIdx + 1} / {module.slides.length}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            disabled={safeIdx === 0}
            onClick={() => onChangeSlideIdx(safeIdx - 1)}
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Önceki
          </button>
          <button
            type="button"
            disabled={safeIdx >= module.slides.length - 1}
            onClick={() => onChangeSlideIdx(safeIdx + 1)}
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-[#09251C] px-3 py-1.5 text-xs font-semibold text-[#F8EADC] hover:bg-[#0f3a2c] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sonraki
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {module.slides.map((s, idx) => {
          const isAfter = Boolean(s.afterMidterm) || module.midtermScope === 'after-midterm';
          return (
            <button
              key={`${module.id}-slide-${s.n}-${idx}`}
              type="button"
              onClick={() => onChangeSlideIdx(idx)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tabular-nums transition-colors ${
                idx === safeIdx
                  ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                  : s.isMidtermCutoff
                  ? 'border-amber-400 bg-amber-50 text-amber-950 hover:bg-amber-100'
                  : isAfter
                  ? 'border-dashed border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span>s.{s.n}</span>
              {s.isMidtermCutoff && (
                <span className="font-sans text-[10px] font-extrabold text-amber-700">
                  (Vize Son)
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-[#09251C]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-4 border-[#A55704] bg-[#09251C] px-5 py-3.5 text-[#F8EADC]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#F3D2AF]">
              <span>
                {module.chapterLabel} · {LECTURE_NOTES_LABEL} · Sayfa {slide.n}
              </span>
              {slide.isMidtermCutoff && (
                <span className="rounded bg-amber-400/25 px-2 py-0.5 text-[10px] font-extrabold text-amber-200">
                  VİZE SON KONUSU
                </span>
              )}
              {(slide.afterMidterm || module.midtermScope === 'after-midterm') && (
                <span className="rounded bg-slate-500/40 px-2 py-0.5 text-[10px] font-bold text-slate-200">
                  Vize Dışı / Final
                </span>
              )}
            </div>
            <strong className="block text-base font-bold [overflow-wrap:anywhere]">
              <MathText text={slide.t} />
            </strong>
          </div>
          <span className="shrink-0 font-mono text-xs text-[#F3D2AF]/85">
            s.{slide.n} / {LECTURE_NOTES_TOTAL_PAGES}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 bg-white p-5 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <PdfSlidePreview
              pdfFile={LECTURE_NOTES_PDF}
              pageNumber={slide.n}
              pdfLabel={LECTURE_NOTES_LABEL}
              caption={slide.visualCaption || `${LECTURE_NOTES_LABEL} · Sayfa ${slide.n} birebir görüntü`}
            />
          </div>

          <div className="min-w-0 space-y-4 lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-4">
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-[#09251C]">
                <FileText className="h-3.5 w-3.5 text-[#A55704]" />
                Not &amp; Kavram Açıklaması
              </div>
              <div className="text-sm leading-relaxed text-slate-800">
                <MathText text={slide.explanation} />
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
              <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                Sayfa Sınav Özeti
              </div>
              <ul className="space-y-1.5 text-sm text-emerald-950">
                {slide.summaryPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span className="min-w-0">
                      <MathText text={pt} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {slide.keyFormula && (
              <div className="rounded-xl border border-[#09251C] bg-[#09251C] p-4 text-[#F8EADC]">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#F3D2AF]">
                  <Sigma className="h-3.5 w-3.5" />
                  Kritik Formül / Özdeşlik
                </div>
                <div className="overflow-x-auto text-sm text-[#F8EADC]">
                  <MathText text={`$$${slide.keyFormula}$$`} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface MAT101AllSlidesViewProps {
  selectedModuleId: string;
  selectedSlideIdx: number;
  directPageNum?: number;
  onSelectModule: (moduleId: string) => void;
  onSelectSlideIdx: (idx: number) => void;
}

export const MAT101AllSlidesView: React.FC<MAT101AllSlidesViewProps> = ({
  selectedModuleId,
  selectedSlideIdx,
  directPageNum,
  onSelectModule,
  onSelectSlideIdx,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rawBrowserOpen, setRawBrowserOpen] = useState<boolean>(!!directPageNum);
  const [rawPageNum, setRawPageNum] = useState<number>(directPageNum || 1);

  const activeModule = MAT101_MODULES.find((m) => m.id === selectedModuleId) || MAT101_MODULES[0];

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase('tr-TR');
    if (!q) return [];
    const results: Array<{ mod: MAT101Module; slideIdx: number; page: number; title: string }> = [];
    MAT101_MODULES.forEach((mod) => {
      mod.slides.forEach((s, idx) => {
        const plain = `${s.t} ${s.explanation} ${s.summaryPoints.join(' ')} ${mod.title}`.toLocaleLowerCase('tr-TR');
        if (plain.includes(q)) {
          results.push({ mod, slideIdx: idx, page: s.n, title: s.t });
        }
      });
    });
    return results;
  }, [searchQuery]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-[#09251C]">
              MAT101 Lecture Notes Arşivi (210 Sayfa · Chapter 0–6)
            </h1>
            <p className="text-sm text-slate-600">
              Önemli sayfaları yan yana Türkçe özetlerle inceleyin veya 210 sayfalık Lecture Notes PDF&apos;inin istediğiniz sayfasını doğrudan açın.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRawBrowserOpen((v) => !v)}
            className={`rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${
              rawBrowserOpen
                ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                : 'border-slate-300 bg-[#FAF6F0] text-[#09251C] hover:bg-[#F5ECE0]'
            }`}
          >
            {rawBrowserOpen ? 'Modül Özetli Görünüme Dön' : '210 Sayfadan İstediğin Sayfayı Aç'}
          </button>
        </div>

        {!rawBrowserOpen ? (
          <>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div className="flex flex-wrap gap-1.5">
                {MAT101_MODULES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      onSelectModule(m.id);
                      onSelectSlideIdx(0);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                      m.id === activeModule.id
                        ? 'bg-[#09251C] text-[#F8EADC]'
                        : 'bg-[#F5ECE0] text-[#09251C] hover:bg-[#F3D2AF]/50'
                    }`}
                  >
                    {m.tag} ({m.pageRange})
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ara (Squeeze, IVT, Weierstrass)..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#09251C] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {searchQuery.trim() !== '' && (
              <div className="mt-4 rounded-lg border border-slate-200 bg-[#FAF6F0] p-4">
                <div className="mb-2 text-xs font-bold text-slate-600">
                  Sonuçlar ({searchResults.length})
                </div>
                {searchResults.length === 0 ? (
                  <div className="text-sm text-slate-500">Eşleşen sayfa bulunamadı.</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {searchResults.map((res, idx) => (
                      <button
                        key={`${res.mod.id}-${res.page}-${idx}`}
                        type="button"
                        onClick={() => {
                          onSelectModule(res.mod.id);
                          onSelectSlideIdx(res.slideIdx);
                          setSearchQuery('');
                        }}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-left text-xs font-semibold text-[#09251C] hover:border-[#09251C]"
                      >
                        <span className="text-[#A55704]">{res.mod.tag} s.{res.page}:</span>{' '}
                        <MathText text={res.title} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-600">
                  Lecture Notes Doğrudan Sayfa Gezgini (1 – {LECTURE_NOTES_TOTAL_PAGES})
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {[
                    { label: 'Ch.0 Cebir (s.1)', page: 1 },
                    { label: 'Ch.1 Kümeler (s.16)', page: 16 },
                    { label: 'Ch.2 Fonksiyonlar (s.28)', page: 28 },
                    { label: 'Hiperbolik (s.69)', page: 69 },
                    { label: 'Ch.3 Limit (s.76)', page: 76 },
                    { label: 'Ch.4 Türev (s.107)', page: 107 },
                    { label: 'Ch.5 Uygulama (s.134)', page: 134 },
                    { label: 'Ch.6 İntegral (s.183)', page: 183 },
                  ].map((jump) => (
                    <button
                      key={jump.page}
                      type="button"
                      onClick={() => setRawPageNum(jump.page)}
                      className="rounded border border-slate-300 bg-slate-50 px-2 py-1 text-[11px] font-bold text-[#09251C] hover:bg-slate-100"
                    >
                      {jump.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={rawPageNum <= 1}
                  onClick={() => setRawPageNum((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-[#09251C] disabled:opacity-40"
                >
                  &lt; Önceki
                </button>
                <input
                  type="number"
                  min={1}
                  max={LECTURE_NOTES_TOTAL_PAGES}
                  value={rawPageNum}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10) || 1;
                    setRawPageNum(Math.min(Math.max(1, val), LECTURE_NOTES_TOTAL_PAGES));
                  }}
                  className="w-20 rounded-lg border border-slate-300 px-2 py-2 text-center font-mono text-sm font-bold text-[#09251C]"
                />
                <button
                  type="button"
                  disabled={rawPageNum >= LECTURE_NOTES_TOTAL_PAGES}
                  onClick={() => setRawPageNum((p) => Math.min(LECTURE_NOTES_TOTAL_PAGES, p + 1))}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-[#09251C] disabled:opacity-40"
                >
                  Sonraki &gt;
                </button>
              </div>
            </div>

            <PdfSlidePreview
              pdfFile={LECTURE_NOTES_PDF}
              pageNumber={rawPageNum}
              pdfLabel={LECTURE_NOTES_LABEL}
              caption={`${LECTURE_NOTES_LABEL} · Sayfa ${rawPageNum} / ${LECTURE_NOTES_TOTAL_PAGES}`}
            />
          </div>
        )}
      </div>

      {!rawBrowserOpen && (
        <MAT101ModuleSlideReader
          module={activeModule}
          slideIdx={selectedSlideIdx}
          onChangeSlideIdx={onSelectSlideIdx}
        />
      )}
    </div>
  );
};
