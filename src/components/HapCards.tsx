import React, { useState } from 'react';
import { RotateCw, BookOpen } from 'lucide-react';
import { WeekModule } from '../types/course';

interface HapCardsProps {
  week: WeekModule;
  onPeekSlide: (weekId: string, slideNum: number) => void;
}

export const HapCards: React.FC<HapCardsProps> = ({ week, onPeekSlide }) => {
  const [flippedMap, setFlippedMap] = useState<Record<number, boolean>>({});

  const toggleCard = (idx: number) => {
    setFlippedMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const allFlipped = week.hapBilgiler.length > 0 && week.hapBilgiler.every((_, i) => flippedMap[i]);

  const toggleAll = () => {
    const nextState: Record<number, boolean> = {};
    week.hapBilgiler.forEach((_, i) => {
      nextState[i] = !allFlipped;
    });
    setFlippedMap(nextState);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#09251C]">
            {week.tag} — Hap Bilgiler ve Hızlı Tekrar Kartları
          </h2>
          <p className="text-sm text-slate-600">
            Kartlara tıklayarak cevabı görün; PDF sayfa numarasına tıklayarak ilgili sayfaya göz atın.
          </p>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
        >
          <RotateCw className="h-3.5 w-3.5" />
          {allFlipped ? 'Tüm Kartları Kapat' : 'Tüm Cevapları Aç'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {week.hapBilgiler.map((item, idx) => {
          const isFlipped = !!flippedMap[idx];
          return (
            <div
              key={`${week.id}-hap-${idx}`}
              className={`hap-perspective cursor-pointer select-none ${isFlipped ? 'hap-flipped' : ''}`}
              onClick={() => toggleCard(idx)}
              role="button"
              tabIndex={0}
              aria-pressed={isFlipped}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCard(idx);
                }
              }}
            >
              <div className="hap-inner">
                {/* Front */}
                <div className="hap-face flex flex-col justify-between rounded-xl border border-slate-200 bg-[#FAF6F0] p-5 transition-colors hover:border-[#09251C]/40">
                  <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
                    <span className="font-semibold text-[#A55704]">{item.badge}</span>
                    <span>PDF Sayfa {item.slide}</span>
                  </div>
                  <p className="my-3 text-[15px] font-bold leading-snug text-[#09251C]">
                    {item.q}
                  </p>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Cevabı görmek için tıklayın</span>
                    <RotateCw className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>

                {/* Back */}
                <div className="hap-face hap-back flex flex-col justify-between rounded-xl border border-[#09251C] bg-[#09251C] p-5 text-[#F8EADC]">
                  <div className="flex items-center justify-between gap-2 text-xs text-[#F3D2AF]/80">
                    <span className="font-semibold text-[#F3D2AF]">{item.badge}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPeekSlide(week.id, item.slide);
                      }}
                      className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold text-[#F3D2AF] underline-offset-2 hover:bg-white/10 hover:underline whitespace-nowrap"
                    >
                      <BookOpen className="h-3 w-3" />
                      Sayfa {item.slide}
                    </button>
                  </div>
                  <p className="my-2 overflow-y-auto text-sm leading-relaxed text-[#F8EADC]">
                    {item.a}
                  </p>
                  <div className="text-xs text-[#F3D2AF]/75">
                    Soruya dönmek için karta tıklayın
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
