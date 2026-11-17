import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, CheckCircle2, Code2, FileText } from 'lucide-react';
import { BM101WeekModule } from '../types/bm101';
import { BM101_WEEKS } from '../data/bm101Weeks';
import { PdfSlidePreview } from './PdfSlidePreview';

interface BM101WeekSlideReaderProps {
  week: BM101WeekModule;
  slideIdx: number;
  onChangeSlideIdx: (idx: number) => void;
}

export const BM101WeekSlideReader: React.FC<BM101WeekSlideReaderProps> = ({
  week,
  slideIdx,
  onChangeSlideIdx,
}) => {
  const safeIdx = Math.min(Math.max(0, slideIdx), Math.max(0, week.slides.length - 1));
  const slide = week.slides[safeIdx];

  if (!slide) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Bu hafta için PDF slaytı bulunamadı.
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-[#0f2342]">
            {week.tag} — Görselli Slayt Okuyucu (1:1 PDF + Yan Yana Özet)
          </h2>
          <p className="text-xs text-slate-500">
            Kaynaklar: {week.pdfName} &amp; {week.labPdfName} · Gösterilen slayt: {safeIdx + 1} / {week.slides.length}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={safeIdx === 0}
            onClick={() => onChangeSlideIdx(safeIdx - 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Önceki
          </button>
          <button
            type="button"
            disabled={safeIdx >= week.slides.length - 1}
            onClick={() => onChangeSlideIdx(safeIdx + 1)}
            className="inline-flex items-center gap-1 rounded-lg bg-[#0f2342] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#1a3664] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
          >
            Sonraki
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Slide quick chips distinguishing Ders vs Lab */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {week.slides.map((s, idx) => (
          <button
            key={`${week.id}-s-${idx}-${s.pdfFile}-${s.n}`}
            type="button"
            onClick={() => onChangeSlideIdx(idx)}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tabular-nums transition-colors ${
              idx === safeIdx
                ? 'border-[#0f2342] bg-[#0f2342] text-white'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            <span
              className={`rounded px-1 text-[10px] font-bold ${
                s.sourceKind === 'lab'
                  ? idx === safeIdx
                    ? 'bg-sky-400 text-slate-950'
                    : 'bg-sky-100 text-sky-900'
                  : idx === safeIdx
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 text-red-900'
              }`}
            >
              {s.sourceKind === 'lab' ? 'LAB' : 'DERS'}
            </span>
            <span>s.{s.n}</span>
          </button>
        ))}
      </div>

      {/* Frame Header */}
      <div className="overflow-hidden rounded-xl border border-[#0f2342]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-4 border-red-700 bg-[#0f2342] px-5 py-3.5 text-white">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-sky-300">
              {slide.sourceKind === 'lab' ? 'Laboratuvar PDF' : 'Ders Slaytı'} · {slide.pdfLabel} · Sayfa {slide.n}
            </div>
            <strong className="block text-base font-bold [overflow-wrap:anywhere]">
              {slide.t}
            </strong>
          </div>
          <span className="shrink-0 font-mono text-xs text-slate-300">
            {safeIdx + 1} / {week.slides.length}
          </span>
        </div>

        {/* 1:1 Image + Side-by-Side Explanation & Summary */}
        <div className="grid grid-cols-1 gap-5 bg-white p-5 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <PdfSlidePreview
              pdfFile={slide.pdfFile}
              pageNumber={slide.n}
              pdfLabel={slide.pdfLabel}
              caption={slide.visualCaption || `${slide.pdfLabel} · Sayfa ${slide.n} birebir slayt görüntüsü`}
            />
          </div>

          <div className="min-w-0 space-y-4 lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-[#0f2342]">
                <FileText className="h-3.5 w-3.5 text-red-700" />
                Görsel &amp; Slayt Açıklaması
              </div>
              <p className="text-sm leading-relaxed text-slate-800 [overflow-wrap:anywhere]">
                {slide.explanation}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
              <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                Slayt Sınav Özeti
              </div>
              <ul className="space-y-1.5 text-sm text-emerald-950">
                {slide.summaryPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {slide.codeSnippet && (
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-slate-100">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-sky-300">
                  <Code2 className="h-3.5 w-3.5" />
                  Slayttaki C Kodu
                </div>
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                  {slide.codeSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface BM101AllSlidesViewProps {
  selectedWeekId: string;
  selectedSlideIdx: number;
  onSelectWeek: (weekId: string) => void;
  onSelectSlideIdx: (idx: number) => void;
}

const ALL_12_PDFS = [
  { file: '1__Giri__af4dadda.pdf', label: '1_ Giriş.pdf (34 s.)', pages: 34 },
  { file: '2-_Algoritma_ve_Ak___Diyagramlar__5171d132.pdf', label: '2- Algoritma ve Akış Diyagramları.pdf (37 s.)', pages: 37 },
  { file: '3-_Degiskenler__Temel_I_O_9662527d.pdf', label: '3- Degiskenler, Temel I_O.pdf (36 s.)', pages: 36 },
  { file: '4-_Program_Denetimi_a066062c.pdf', label: '4- Program Denetimi.pdf (32 s.)', pages: 32 },
  { file: '5-_Fonksiyonlar_-_Temel_b14f8ed4.pdf', label: '5- Fonksiyonlar - Temel.pdf (27 s.)', pages: 27 },
  { file: '6-_Fonksiyonlar_-_2_709f35c9.pdf', label: '6- Fonksiyonlar - 2.pdf (27 s.)', pages: 27 },
  { file: 'lab_260928_1e9ffad1.pdf', label: 'lab_260928.pdf · Lab 1 (11 s.)', pages: 11 },
  { file: 'lab_261005_bac67355.pdf', label: 'lab_261005.pdf · Lab 2 (18 s.)', pages: 18 },
  { file: 'lab_261012_77753471.pdf', label: 'lab_261012.pdf · Lab 3 (33 s.)', pages: 33 },
  { file: 'lab_261019_d96f8c28.pdf', label: 'lab_261019.pdf · Lab 4 (31 s.)', pages: 31 },
  { file: 'lab_261026_b58eb079.pdf', label: 'lab_261026.pdf · Lab 5 (25 s.)', pages: 25 },
  { file: 'lab_261109_edd840a7.pdf', label: 'lab_261109.pdf · Lab 6 (21 s.)', pages: 21 },
];

export const BM101AllSlidesView: React.FC<BM101AllSlidesViewProps> = ({
  selectedWeekId,
  selectedSlideIdx,
  onSelectWeek,
  onSelectSlideIdx,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rawBrowsePdf, setRawBrowsePdf] = useState<string>(ALL_12_PDFS[0].file);
  const [rawPageNum, setRawPageNum] = useState<number>(1);
  const [rawBrowserOpen, setRawBrowserOpen] = useState<boolean>(false);

  const activeWeek = BM101_WEEKS.find((w) => w.id === selectedWeekId) || BM101_WEEKS[0];
  const activeRawPdfObj = ALL_12_PDFS.find((p) => p.file === rawBrowsePdf) || ALL_12_PDFS[0];

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase('tr-TR');
    if (!q) return [];
    const results: Array<{ week: BM101WeekModule; slideIdx: number; slideNum: number; title: string; pdfLabel: string }> = [];
    BM101_WEEKS.forEach((w) => {
      w.slides.forEach((s, idx) => {
        const plain = `${s.t} ${s.explanation} ${s.summaryPoints.join(' ')} ${s.pdfLabel}`.toLocaleLowerCase('tr-TR');
        if (plain.includes(q)) {
          results.push({ week: w, slideIdx: idx, slideNum: s.n, title: s.t, pdfLabel: s.pdfLabel });
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
            <h1 className="text-xl font-extrabold text-[#0f2342]">
              BM101 PDF Slayt Arşivi (6 Ders + 6 Lab PDF)
            </h1>
            <p className="text-sm text-slate-600">
              Kritik görselli slaytların birebir görüntüsü ile yan yana özetini inceleyin veya 12 PDF dosyasının istediğiniz sayfasını doğrudan açın.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setRawBrowserOpen((v) => !v)}
              className={`rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${
                rawBrowserOpen
                  ? 'border-[#0f2342] bg-[#0f2342] text-white'
                  : 'border-slate-300 bg-slate-50 text-[#0f2342] hover:bg-slate-100'
              }`}
            >
              {rawBrowserOpen ? 'Açıklamalı Görünüme Dön' : '12 PDF’ten İstediğin Sayfayı Aç'}
            </button>
          </div>
        </div>

        {!rawBrowserOpen ? (
          <>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div className="flex flex-wrap gap-1.5">
                {BM101_WEEKS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      onSelectWeek(w.id);
                      onSelectSlideIdx(0);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                      w.id === activeWeek.id
                        ? 'bg-[#0f2342] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {w.tag}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ara (Call Stack, static, ASCII)..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0f2342] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {searchQuery.trim() !== '' && (
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 text-xs font-bold text-slate-600">
                  Sonuçlar ({searchResults.length})
                </div>
                {searchResults.length === 0 ? (
                  <div className="text-sm text-slate-500">Eşleşen slayt bulunamadı.</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {searchResults.map((res, idx) => (
                      <button
                        key={`${res.week.id}-${res.slideNum}-${idx}`}
                        type="button"
                        onClick={() => {
                          onSelectWeek(res.week.id);
                          onSelectSlideIdx(res.slideIdx);
                          setSearchQuery('');
                        }}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-left text-xs font-semibold text-[#0f2342] hover:border-[#0f2342]"
                      >
                        <span className="text-red-700">{res.pdfLabel} s.{res.slideNum}:</span> {res.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-600">PDF Dosyası Seçiniz (12 Kaynak)</label>
                <select
                  value={rawBrowsePdf}
                  onChange={(e) => {
                    setRawBrowsePdf(e.target.value);
                    setRawPageNum(1);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-[#0f2342]"
                >
                  {ALL_12_PDFS.map((p) => (
                    <option key={p.file} value={p.file}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-600">
                  Sayfa Numarası (1 – {activeRawPdfObj.pages})
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={rawPageNum <= 1}
                    onClick={() => setRawPageNum((p) => Math.max(1, p - 1))}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-[#0f2342] disabled:opacity-40"
                  >
                    &lt; Önceki
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={activeRawPdfObj.pages}
                    value={rawPageNum}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 1;
                      setRawPageNum(Math.min(Math.max(1, val), activeRawPdfObj.pages));
                    }}
                    className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-center font-mono text-sm font-bold text-[#0f2342]"
                  />
                  <button
                    type="button"
                    disabled={rawPageNum >= activeRawPdfObj.pages}
                    onClick={() => setRawPageNum((p) => Math.min(activeRawPdfObj.pages, p + 1))}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-[#0f2342] disabled:opacity-40"
                  >
                    Sonraki &gt;
                  </button>
                </div>
              </div>
            </div>
            <PdfSlidePreview
              pdfFile={activeRawPdfObj.file}
              pageNumber={rawPageNum}
              pdfLabel={activeRawPdfObj.label}
              caption={`${activeRawPdfObj.label} · Sayfa ${rawPageNum} / ${activeRawPdfObj.pages}`}
            />
          </div>
        )}
      </div>

      {!rawBrowserOpen && (
        <BM101WeekSlideReader
          week={activeWeek}
          slideIdx={selectedSlideIdx}
          onChangeSlideIdx={onSelectSlideIdx}
        />
      )}
    </div>
  );
};
