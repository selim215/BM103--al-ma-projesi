import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { WeekModule } from '../types/course';
import { WEEKS } from '../data/bm103Data';

interface WeekSlideReaderProps {
  week: WeekModule;
  slideIdx: number;
  onChangeSlideIdx: (idx: number) => void;
}

export const WeekSlideReader: React.FC<WeekSlideReaderProps> = ({
  week,
  slideIdx,
  onChangeSlideIdx,
}) => {
  const safeIdx = Math.min(Math.max(0, slideIdx), Math.max(0, week.slides.length - 1));
  const slide = week.slides[safeIdx];

  if (!slide) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Bu hafta için PDF sayfası içeriği bulunamadı.
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#09251C]">
            {week.tag} — PDF Sayfa Okuyucu
          </h2>
          <p className="text-xs text-slate-500">
            {week.pdfName} · Gösterilen bölüm: {safeIdx + 1} / {week.slides.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
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
            className="inline-flex items-center gap-1 rounded-lg bg-[#09251C] px-3 py-1.5 text-xs font-semibold text-[#F8EADC] transition-colors hover:bg-[#0f3a2c] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
          >
            Sonraki
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* PDF page quick index strip */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {week.slides.map((s, idx) => (
          <button
            key={`${week.id}-s-${s.n}`}
            type="button"
            onClick={() => onChangeSlideIdx(idx)}
            className={`rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tabular-nums transition-colors ${
              idx === safeIdx
                ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                : 'border-slate-200 bg-[#FAF6F0] text-slate-700 hover:border-slate-300 hover:bg-[#F8EADC]'
            }`}
          >
            Sayfa {s.n}
          </button>
        ))}
      </div>

      {/* Page Frame */}
      <div className="overflow-hidden rounded-xl border border-[#09251C]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-4 border-[#A55704] bg-[#09251C] px-5 py-3.5 text-[#F8EADC]">
          <strong className="min-w-0 text-base font-bold [overflow-wrap:anywhere]">
            PDF Sayfa {slide.n}: {slide.t}
          </strong>
          <span className="shrink-0 font-mono text-xs text-[#F3D2AF]">
            {week.tag} · {safeIdx + 1}/{week.slides.length}
          </span>
        </div>
        <div
          className="slide-content min-h-[240px] bg-white p-6 text-[15px] leading-relaxed text-slate-800"
          dangerouslySetInnerHTML={{ __html: slide.body }}
        />
      </div>
    </section>
  );
};

interface AllSlidesViewProps {
  selectedWeekId: string;
  selectedSlideIdx: number;
  onSelectWeek: (weekId: string) => void;
  onSelectSlideIdx: (idx: number) => void;
}

export const AllSlidesView: React.FC<AllSlidesViewProps> = ({
  selectedWeekId,
  selectedSlideIdx,
  onSelectWeek,
  onSelectSlideIdx,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const activeWeek = WEEKS.find((w) => w.id === selectedWeekId) || WEEKS[0];

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase('tr-TR');
    if (!q) return [];
    const results: Array<{ week: WeekModule; slideIdx: number; slideNum: number; title: string }> = [];
    WEEKS.forEach((w) => {
      w.slides.forEach((s, idx) => {
        const plain = (s.t + ' ' + s.body.replace(/<[^>]+>/g, ' ')).toLocaleLowerCase('tr-TR');
        if (plain.includes(q)) {
          results.push({ week: w, slideIdx: idx, slideNum: s.n, title: s.t });
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
              Tüm PDF Sayfaları Arşivi
            </h1>
            <p className="text-sm text-slate-600">
              Yüklenen 7 ders PDF&apos;i içindeki tüm konu sayfaları arasında haftaya göre gezinin veya anahtar kelime arayın.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="PDF sayfasında ara (örn. ENIAC, Deadlock)..."
              className="w-full rounded-lg border border-slate-300 bg-[#FAF6F0] py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#09251C] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Week Selector Tabs */}
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
          {WEEKS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => {
                onSelectWeek(w.id);
                onSelectSlideIdx(0);
              }}
              className={`max-w-full rounded-lg px-3 py-1.5 text-left text-xs font-bold transition-colors sm:whitespace-nowrap ${
                w.id === activeWeek.id
                  ? 'bg-[#09251C] text-[#F8EADC]'
                  : 'bg-[#FAF6F0] text-slate-700 hover:bg-[#F8EADC]'
              }`}
            >
              {w.tag}: {w.title}
            </button>
          ))}
        </div>

        {searchQuery.trim() !== '' && (
          <div className="mt-4 rounded-lg border border-slate-200 bg-[#FAF6F0] p-4">
            <div className="mb-2 text-xs font-bold text-slate-600">
              Arama Sonuçları ({searchResults.length} eşleşme)
            </div>
            {searchResults.length === 0 ? (
              <div className="text-sm text-slate-500">Eşleşen PDF sayfası bulunamadı.</div>
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
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-left text-xs font-semibold text-[#09251C] transition-colors hover:border-[#09251C] hover:bg-[#F8EADC]"
                  >
                    <span className="text-[#A55704]">{res.week.tag} · Sayfa {res.slideNum}:</span>{' '}
                    {res.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <WeekSlideReader
        week={activeWeek}
        slideIdx={selectedSlideIdx}
        onChangeSlideIdx={onSelectSlideIdx}
      />
    </div>
  );
};
