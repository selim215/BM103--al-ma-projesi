import React, { useMemo, useState } from 'react';
import { BookOpen, Eye, EyeOff, CheckCircle2, XCircle, Code2 } from 'lucide-react';
import { BM101_EXTRA_EXERCISES } from '../data/bm101PracticeAndExams';
import { BM101ExtraExercise } from '../types/bm101';

interface BM101ExtraPracticeProps {
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number, weekId?: string) => void;
}

const KIND_LABELS: Record<BM101ExtraExercise['kind'], string> = {
  output: 'Ekran Çıktısı',
  memory: 'Bellek / Stack İzleme',
  recursion: 'Özyineleme (Recursion)',
  bug: 'Hata Avı',
  coding: 'Program / Fonksiyon Yazma',
};

export const BM101ExtraPractice: React.FC<BM101ExtraPracticeProps> = ({ onPeekSlide }) => {
  const [kindFilter, setKindFilter] = useState<'all' | BM101ExtraExercise['kind']>('all');
  const [selectedOpts, setSelectedOpts] = useState<Record<string, number>>({});
  const [revealedMap, setRevealedMap] = useState<Record<string, boolean>>({});

  const list = useMemo(() => {
    if (kindFilter === 'all') return BM101_EXTRA_EXERCISES;
    return BM101_EXTRA_EXERCISES.filter((item) => item.kind === kindFilter);
  }, [kindFilter]);

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-extrabold text-[#09251C]">
          BM101 Harici Çalışma Soruları &amp; Vize Alıştırmaları
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Ders ve lab konularını pekiştirmek için hazırlanmış ekstra kod çıktısı tahmin etme, bellek snapshot izleme, özyineleme, hata bulma ve C kodlama alıştırmaları.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setKindFilter('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
              kindFilter === 'all'
                ? 'bg-[#09251C] text-[#F8EADC]'
                : 'bg-[#FAF6F0] text-slate-700 hover:bg-[#F8EADC]'
            }`}
          >
            Tümü ({BM101_EXTRA_EXERCISES.length})
          </button>
          {(Object.keys(KIND_LABELS) as Array<BM101ExtraExercise['kind']>).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKindFilter(k)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                kindFilter === k
                  ? 'bg-[#09251C] text-[#F8EADC]'
                  : 'bg-[#FAF6F0] text-slate-700 hover:bg-[#F8EADC]'
              }`}
            >
              {KIND_LABELS[k]}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-5">
        {list.map((item) => {
          const isRevealed = !!revealedMap[item.id];
          const chosen = selectedOpts[item.id];
          const hasMcq = !!item.quickCheckOpts && item.quickCheckAns !== undefined;

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-[#FAF6F0] px-5 py-3.5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                    <span className="text-[#A55704]">{KIND_LABELS[item.kind]}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-600">{item.difficulty}</span>
                  </div>
                  <h2 className="text-base font-extrabold text-[#09251C]">{item.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onPeekSlide(
                      item.relatedPdfFile,
                      item.relatedPdf.split('·')[0].trim(),
                      item.relatedSlide,
                      item.weekId
                    )
                  }
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#09251C] hover:bg-[#F8EADC]"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {item.relatedPdf}
                </button>
              </div>

              <div className="space-y-4 p-5">
                <p className="text-sm font-medium text-slate-800">{item.prompt}</p>

                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 text-slate-100">
                  <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-bold text-[#F3D2AF]">
                    <Code2 className="h-3.5 w-3.5" />
                    Alıştırma Kodu
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
                    {item.code}
                  </pre>
                </div>

                {hasMcq && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-600">Hızlı Tahmin Seçin:</div>
                    {item.quickCheckOpts!.map((opt, oIdx) => {
                      const isPicked = chosen === oIdx;
                      const showOk = isRevealed && oIdx === item.quickCheckAns;
                      const showBad = isRevealed && isPicked && oIdx !== item.quickCheckAns;
                      return (
                        <label
                          key={oIdx}
                          className={`flex cursor-pointer items-start gap-2.5 rounded-lg border px-3.5 py-2.5 font-mono text-xs transition-colors ${
                            showOk
                              ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-950'
                              : showBad
                              ? 'border-red-400 bg-red-50 text-red-950'
                              : isPicked
                              ? 'border-[#09251C] bg-[#F8EADC]/60 font-bold text-[#09251C]'
                              : 'border-slate-200 bg-white text-slate-800 hover:bg-[#FAF6F0]'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`ext-${item.id}`}
                            checked={isPicked}
                            onChange={() =>
                              setSelectedOpts((prev) => ({ ...prev, [item.id]: oIdx }))
                            }
                            className="mt-0.5 accent-[#09251C]"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-1">
                  {hasMcq && isRevealed && chosen !== undefined ? (
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                        chosen === item.quickCheckAns ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {chosen === item.quickCheckAns ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" /> Doğru Tahmin!
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" /> Aşağıdaki adım çözümünü inceleyin.
                        </>
                      )}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">
                      Önce kendiniz kağıt üzerinde çözüp ardından çözümü açınız.
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setRevealedMap((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#09251C] px-4 py-2 text-xs font-bold text-[#F8EADC] hover:bg-[#0f3a2c]"
                  >
                    {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {isRevealed ? 'Çözümü Gizle' : 'Çözümü & Çıktıyı Göster'}
                  </button>
                </div>

                {isRevealed && (
                  <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                    <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-300">
                      <div className="mb-1 text-[10px] font-bold uppercase text-slate-400">
                        Kesin Çıktı / Çözüm Özeti
                      </div>
                      <pre className="overflow-x-auto whitespace-pre-wrap">
                        {item.expectedOutputOrSnapshot}
                      </pre>
                    </div>
                    <ul className="space-y-1.5 text-xs leading-relaxed text-emerald-950">
                      {item.solutionSteps.map((s, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
