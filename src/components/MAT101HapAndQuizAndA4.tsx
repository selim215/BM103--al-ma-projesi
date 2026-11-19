import React, { useState } from 'react';
import { RotateCw, BookOpen, CheckCircle2, XCircle, RotateCcw, Printer } from 'lucide-react';
import { MAT101Module } from '../types/mat101';
import { LECTURE_NOTES_LABEL, LECTURE_NOTES_PDF, MAT101_MODULES } from '../data/mat101Modules';
import { MathText } from './MathText';

/* ============================================================
   MAT101 HAP KARTLAR
   ============================================================ */
export const MAT101HapCards: React.FC<{
  module: MAT101Module;
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number, moduleId?: string) => void;
}> = ({ module, onPeekSlide }) => {
  const [flippedMap, setFlippedMap] = useState<Record<number, boolean>>({});
  const allFlipped =
    module.hapBilgiler.length > 0 && module.hapBilgiler.every((_, i) => flippedMap[i]);

  const toggleAll = () => {
    const next: Record<number, boolean> = {};
    module.hapBilgiler.forEach((_, i) => {
      next[i] = !allFlipped;
    });
    setFlippedMap(next);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#09251C]">
            {module.tag} — MAT101 Hap Bilgiler &amp; Sınav Tuzakları
          </h2>
          <p className="text-sm text-slate-600">
            Kartlara tıklayarak cevabı açın; PDF sayfa numarasına tıklayarak Lecture Notes sayfasını görüntüleyin.
          </p>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
        >
          <RotateCw className="h-3.5 w-3.5" />
          {allFlipped ? 'Tüm Kartları Kapat' : 'Tüm Cevapları Aç'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {module.hapBilgiler.map((item, idx) => {
          const isFlipped = !!flippedMap[idx];
          return (
            <div
              key={`${module.id}-hap-${idx}`}
              className={`hap-perspective cursor-pointer select-none ${isFlipped ? 'hap-flipped' : ''}`}
              onClick={() => setFlippedMap((p) => ({ ...p, [idx]: !p[idx] }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFlippedMap((p) => ({ ...p, [idx]: !p[idx] }));
                }
              }}
            >
              <div className="hap-inner">
                <div className="hap-face flex flex-col justify-between rounded-xl border border-slate-200 bg-[#FAF6F0] p-5 hover:border-[#09251C]/40">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-500">
                    <span className="font-semibold text-[#A55704]">{item.badge}</span>
                    <div className="flex items-center gap-1.5">
                      {(item.afterMidterm || module.midtermScope === 'after-midterm') && (
                        <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                          Vize Dışı
                        </span>
                      )}
                      <span className="truncate">Lecture Notes s.{item.pdfPage}</span>
                    </div>
                  </div>
                  <div className="my-3 text-[15px] font-bold leading-snug text-[#09251C]">
                    <MathText text={item.q} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Cevap için tıklayın</span>
                    <RotateCw className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="hap-face hap-back flex flex-col justify-between rounded-xl border border-[#09251C] bg-[#09251C] p-5 text-[#F8EADC]">
                  <div className="flex items-center justify-between gap-2 text-xs text-[#F3D2AF]">
                    <span className="font-semibold text-[#F3D2AF]">{item.badge}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPeekSlide(LECTURE_NOTES_PDF, LECTURE_NOTES_LABEL, item.pdfPage, module.id);
                      }}
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-0.5 text-xs font-semibold text-[#F3D2AF] hover:bg-white/10 hover:underline"
                    >
                      <BookOpen className="h-3 w-3" />
                      s.{item.pdfPage}
                    </button>
                  </div>
                  <div className="my-2 overflow-y-auto text-sm leading-relaxed text-[#F8EADC]/90">
                    <MathText text={item.a} />
                  </div>
                  <div className="text-xs text-[#F3D2AF]/80">Geri dönmek için tıklayın</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ============================================================
   MAT101 HIZLI SORU ÇÖZ
   ============================================================ */
export const MAT101QuickQuiz: React.FC<{
  module: MAT101Module;
  answers: Record<number, number>;
  verified: boolean;
  onSelect: (qIdx: number, optIdx: number) => void;
  onVerify: () => void;
  onReset: () => void;
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number, moduleId?: string) => void;
}> = ({ module, answers, verified, onSelect, onVerify, onReset, onPeekSlide }) => {
  const answeredCount = Object.keys(answers).length;
  const correctCount = verified
    ? module.quiz.reduce((acc, q, idx) => (answers[idx] === q.ans ? acc + 1 : acc), 0)
    : 0;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#09251C]">
            {module.tag} — Konu Pekiştirme Testi
          </h2>
          <p className="text-sm text-slate-600">
            Şıkları işaretleyip doğrulayın; adım adım çözüm ve Lecture Notes sayfa referansını görün.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-semibold text-slate-700 tabular-nums">
            {verified
              ? `Skor: ${correctCount} / ${module.quiz.length}`
              : `İşaretlenen: ${answeredCount} / ${module.quiz.length}`}
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Sıfırla
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {module.quiz.map((q, qIdx) => {
          const chosen = answers[qIdx];
          const isCorrect = verified && chosen === q.ans;
          const isWrong = verified && chosen !== q.ans;

          return (
            <div
              key={`${module.id}-q-${qIdx}`}
              className={`rounded-xl border p-5 ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : isWrong
                  ? 'border-red-300 bg-red-50/40'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2 text-[15px] font-bold text-[#09251C]">
                <span className="min-w-0 flex-1">
                  {qIdx + 1}. <MathText text={q.q} />
                </span>
                {(q.afterMidterm || module.midtermScope === 'after-midterm') && (
                  <span className="shrink-0 rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    Vize Dışı / Final
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {q.opts.map((opt, oIdx) => {
                  const isChosen = chosen === oIdx;
                  const showOk = verified && oIdx === q.ans;
                  const showBad = verified && isChosen && oIdx !== q.ans;
                  return (
                    <label
                      key={oIdx}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-2.5 text-sm ${
                        showOk
                          ? 'border-emerald-500 bg-emerald-50 font-semibold text-emerald-950'
                          : showBad
                          ? 'border-red-400 bg-red-50 text-red-950'
                          : isChosen
                          ? 'border-[#09251C] bg-[#F8EADC]/60 font-semibold text-[#09251C]'
                          : 'border-slate-200 bg-white text-slate-800 hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`mat101-quiz-${module.id}-${qIdx}`}
                        checked={isChosen}
                        disabled={verified}
                        onChange={() => onSelect(qIdx, oIdx)}
                        className="mt-1 accent-[#09251C]"
                      />
                      <span>
                        <strong className="mr-1.5 font-mono">
                          {String.fromCharCode(65 + oIdx)})
                        </strong>
                        <MathText text={opt} />
                      </span>
                    </label>
                  );
                })}
              </div>

              {verified && (
                <div className="mt-3 flex flex-wrap items-start justify-between gap-2 rounded-lg border border-slate-200 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-slate-800">
                  <div className="flex min-w-0 flex-1 items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                    )}
                    <div className="min-w-0">
                      <MathText text={q.exp} />
                    </div>
                  </div>
                  {q.pdfPage && (
                    <button
                      type="button"
                      onClick={() =>
                        onPeekSlide(LECTURE_NOTES_PDF, LECTURE_NOTES_LABEL, q.pdfPage!, module.id)
                      }
                      className="inline-flex shrink-0 items-center gap-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-[#09251C] hover:bg-slate-100"
                    >
                      <BookOpen className="h-3 w-3" />
                      s.{q.pdfPage}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!verified && (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onVerify}
            className="rounded-lg bg-[#A55704] px-5 py-2.5 text-sm font-bold text-[#F8EADC] hover:bg-[#894603]"
          >
            Cevapları Doğrula ve Puanla
          </button>
        </div>
      )}
    </section>
  );
};

/* ============================================================
   MAT101 A4 ÖZETLER
   ============================================================ */
export const MAT101A4Sheet: React.FC<{ module: MAT101Module }> = ({ module }) => (
  <article className="a4-sheet mx-auto w-full max-w-[210mm] overflow-hidden border border-slate-300 bg-white p-5 text-[#111827] shadow-sm sm:p-8">
    <header className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b-2 border-[#09251C] pb-2.5">
      <div className="min-w-0">
        <div className="text-[11px] font-bold tracking-wide text-[#A55704]">
          MAT101 Matematik I (Calculus) · {module.tag}
        </div>
        <h2 className="text-lg font-extrabold text-[#09251C] [overflow-wrap:anywhere]">
          {module.title} — Özet
        </h2>
      </div>
      <div className="min-w-0 text-left text-xs text-slate-600 sm:text-right">
        <div>{module.chapterLabel}</div>
        <div>{LECTURE_NOTES_LABEL} · {module.pageRange}</div>
      </div>
    </header>

    <div className="a4-cols grid grid-cols-1 gap-4 md:grid-cols-2">
      {module.summaryA4.map((sec, idx) => (
        <section key={idx} className="a4-section min-w-0">
          <h3 className="mb-1.5 border-b border-slate-200 pb-1 text-sm font-bold text-[#A55704]">
            <MathText text={sec.h} />
          </h3>
          <ul className="list-disc space-y-1.5 pl-4 text-[13px] leading-snug text-slate-800">
            {sec.items.map((item, iIdx) => (
              <li key={iIdx}>
                <MathText text={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </article>
);

export const MAT101WeekA4View: React.FC<{ module: MAT101Module }> = ({ module }) => (
  <div className="space-y-5">
    <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <div>
        <h3 className="text-base font-bold text-[#09251C]">MAT101 A4 Formül &amp; Konu Özeti</h3>
        <p className="text-sm text-slate-600">
          Yalnızca Lecture Notes PDF&apos;inden derlenmiş yazdırılabilir A4 çalışma kağıdı.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-lg bg-[#A55704] px-4 py-2 text-sm font-bold text-[#F8EADC] hover:bg-[#894603]"
      >
        <Printer className="h-4 w-4" />
        A4 Yazdır / PDF Kaydet
      </button>
    </div>
    <div className="print-only-container">
      <MAT101A4Sheet module={module} />
    </div>
  </div>
);

export const MAT101AllA4View: React.FC = () => (
  <div className="space-y-6">
    <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6">
      <div>
        <h1 className="text-xl font-extrabold text-[#09251C]">
          MAT101 Tüm Modüller A4 Özet Paketi (Chapter 0–6)
        </h1>
        <p className="text-sm text-slate-600">
          210 sayfalık Lecture Notes konularının tamamını tek seferde A4 PDF olarak yazdırabilirsiniz.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-lg bg-[#A55704] px-4 py-2.5 text-sm font-bold text-[#F8EADC] hover:bg-[#894603]"
      >
        <Printer className="h-4 w-4" />
        Tümünü A4 Yazdır / PDF Kaydet
      </button>
    </div>
    <div className="print-only-container space-y-6">
      {MAT101_MODULES.map((m, idx) => (
        <div key={m.id} className={idx > 0 ? 'a4-page-break' : ''}>
          <MAT101A4Sheet module={m} />
        </div>
      ))}
    </div>
  </div>
);
