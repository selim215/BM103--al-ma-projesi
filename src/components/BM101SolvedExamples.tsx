import React, { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Code2, Terminal, Cpu } from 'lucide-react';
import { BM101_SOLVED_EXAMPLES } from '../data/bm101PracticeAndExams';
import { BM101SolvedExample } from '../types/bm101';

interface BM101SolvedExamplesProps {
  filterWeekId?: string;
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number, weekId?: string) => void;
}

const CATEGORIES: Array<{ id: 'all' | BM101SolvedExample['category']; label: string }> = [
  { id: 'all', label: 'Tümü' },
  { id: 'akıs-diyagramı', label: 'Akış Diyagramları' },
  { id: 'temel-io', label: 'Temel G/Ç & ASCII' },
  { id: 'kosul-dongu', label: 'Koşullar & Döngüler' },
  { id: 'fonksiyon-scope', label: 'Fonksiyon & Scope' },
  { id: 'ozyineleme', label: 'Özyineleme (Recursion)' },
  { id: 'yildiz-desen', label: 'Yıldız Desenleri' },
];

export const BM101SolvedExamples: React.FC<BM101SolvedExamplesProps> = ({
  filterWeekId,
  onPeekSlide,
}) => {
  const [selectedCat, setSelectedCat] = useState<'all' | BM101SolvedExample['category']>('all');

  const filtered = useMemo(() => {
    return BM101_SOLVED_EXAMPLES.filter((ex) => {
      if (filterWeekId && ex.weekId !== filterWeekId) return false;
      if (selectedCat !== 'all' && ex.category !== selectedCat) return false;
      return true;
    });
  }, [filterWeekId, selectedCat]);

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-extrabold text-[#09251C]">
          BM101 Slayt &amp; Lab Örnek Sorularının Çözümleri
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          12 ders ve laboratuvar PDF&apos;inde yer alan tüm örnekler, akış diyagramları ve çıktı soruları; hangi PDF&apos;in hangi sayfasında olduğu belirtilerek adım adım çözülmüştür.
        </p>

        {!filterWeekId && (
          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCat(c.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  selectedCat === c.id
                    ? 'bg-[#09251C] text-[#F8EADC]'
                    : 'bg-[#FAF6F0] text-slate-700 hover:bg-[#F8EADC]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Bu filtre için eşleşen örnek soru bulunamadı.
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((ex, idx) => (
            <article
              key={ex.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              {/* Header with clickable PDF + Page locator */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-[#FAF6F0] px-5 py-3.5">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#A55704]">
                    Örnek #{idx + 1} · {ex.weekId.toUpperCase()}
                  </div>
                  <h2 className="text-base font-extrabold text-[#09251C] [overflow-wrap:anywhere]">
                    {ex.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onPeekSlide(ex.pdfFile, ex.pdfLabel, ex.slideNum, ex.weekId)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#09251C]/30 bg-white px-3 py-1.5 text-xs font-bold text-[#09251C] transition-colors hover:bg-[#09251C] hover:text-[#F8EADC]"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {ex.pdfLabel} · Sayfa {ex.slideNum}
                </button>
              </div>

              <div className="space-y-4 p-5">
                <p className="text-sm leading-relaxed text-slate-700">{ex.problem}</p>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                  {/* Code / Pseudo */}
                  <div className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 text-slate-100 lg:col-span-6">
                    <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-bold text-[#F3D2AF]">
                      <Code2 className="h-3.5 w-3.5" />
                      Çözüm Kodu / Sözde Kod
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
                      {ex.codeOrPseudo}
                    </pre>
                  </div>

                  {/* Output & Steps */}
                  <div className="min-w-0 space-y-3 lg:col-span-6">
                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 text-emerald-300">
                      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        <Terminal className="h-3.5 w-3.5" />
                        Beklenen Çıktı / Sonuç
                      </div>
                      <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                        {ex.expectedOutput}
                      </pre>
                    </div>

                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5">
                      <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-emerald-900">
                        Adım Adım Çözüm Mantığı
                      </div>
                      <ul className="space-y-1.5 text-xs leading-relaxed text-emerald-950">
                        {ex.stepByStepSolution.map((st, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {ex.memoryHighlight && (
                      <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-950">
                        <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                        <span>
                          <strong>Bellek Notu:</strong> {ex.memoryHighlight}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
