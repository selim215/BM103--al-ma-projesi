import React, { useState } from 'react';
import { RotateCw, BookOpen, CheckCircle2, XCircle, RotateCcw, Printer } from 'lucide-react';
import { BM101WeekModule } from '../types/bm101';
import { BM101_WEEKS } from '../data/bm101Weeks';

/* ============================================================
   BM101 HAP KARTLAR
   ============================================================ */
export const BM101HapCards: React.FC<{
  week: BM101WeekModule;
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number, weekId?: string) => void;
}> = ({ week, onPeekSlide }) => {
  const [flippedMap, setFlippedMap] = useState<Record<number, boolean>>({});
  const allFlipped =
    week.hapBilgiler.length > 0 && week.hapBilgiler.every((_, i) => flippedMap[i]);

  const toggleAll = () => {
    const next: Record<number, boolean> = {};
    week.hapBilgiler.forEach((_, i) => {
      next[i] = !allFlipped;
    });
    setFlippedMap(next);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0f2342]">
            {week.tag} — BM101 Hap Bilgiler &amp; Sınav Tuzakları
          </h2>
          <p className="text-sm text-slate-600">
            Kartlara tıklayarak cevabı açın; PDF sayfasına tıklayarak slayt görselini hemen görüntüleyin.
          </p>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap"
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
                <div className="hap-face flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-5 hover:border-[#0f2342]/40">
                  <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
                    <span className="font-semibold text-red-700">{item.badge}</span>
                    <span className="truncate">{item.pdfLabel} s.{item.slide}</span>
                  </div>
                  <p className="my-3 text-[15px] font-bold leading-snug text-[#0f2342]">
                    {item.q}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Cevap için tıklayın</span>
                    <RotateCw className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="hap-face hap-back flex flex-col justify-between rounded-xl border border-[#0f2342] bg-[#0f2342] p-5 text-white">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-300">
                    <span className="font-semibold text-red-300">{item.badge}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPeekSlide(item.pdfFile, item.pdfLabel, item.slide, week.id);
                      }}
                      className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold text-sky-200 hover:bg-white/10 hover:underline whitespace-nowrap"
                    >
                      <BookOpen className="h-3 w-3" />
                      s.{item.slide}
                    </button>
                  </div>
                  <p className="my-2 overflow-y-auto text-sm leading-relaxed text-slate-100">
                    {item.a}
                  </p>
                  <div className="text-xs text-slate-300">Geri dönmek için tıklayın</div>
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
   BM101 HIZLI SORU ÇÖZ
   ============================================================ */
export const BM101QuickQuiz: React.FC<{
  week: BM101WeekModule;
  answers: Record<number, number>;
  verified: boolean;
  onSelect: (qIdx: number, optIdx: number) => void;
  onVerify: () => void;
  onReset: () => void;
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number, weekId?: string) => void;
}> = ({ week, answers, verified, onSelect, onVerify, onReset, onPeekSlide }) => {
  const answeredCount = Object.keys(answers).length;
  const correctCount = verified
    ? week.quiz.reduce((acc, q, idx) => (answers[idx] === q.ans ? acc + 1 : acc), 0)
    : 0;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#0f2342]">
            {week.tag} — Hızlı Soru Çöz ve Doğrula
          </h2>
          <p className="text-sm text-slate-600">
            Kod çıktısı ve kavram sorularını işaretleyip doğrulayın.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-semibold text-slate-700 tabular-nums">
            {verified
              ? `Skor: ${correctCount} / ${week.quiz.length}`
              : `İşaretlenen: ${answeredCount} / ${week.quiz.length}`}
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
        {week.quiz.map((q, qIdx) => {
          const chosen = answers[qIdx];
          const isCorrect = verified && chosen === q.ans;
          const isWrong = verified && chosen !== q.ans;

          return (
            <div
              key={`${week.id}-q-${qIdx}`}
              className={`rounded-xl border p-5 ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : isWrong
                  ? 'border-red-300 bg-red-50/40'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="mb-3 text-[15px] font-bold text-[#0f2342]">
                {qIdx + 1}. {q.q}
              </div>

              {q.code && (
                <pre className="mb-3 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-100">
                  {q.code}
                </pre>
              )}

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
                          ? 'border-[#0f2342] bg-slate-100 font-semibold text-[#0f2342]'
                          : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`bm101-quiz-${week.id}-${qIdx}`}
                        checked={isChosen}
                        disabled={verified}
                        onChange={() => onSelect(qIdx, oIdx)}
                        className="mt-0.5 accent-[#0f2342]"
                      />
                      <span>
                        <strong className="mr-1.5 font-mono">
                          {String.fromCharCode(65 + oIdx)})
                        </strong>
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>

              {verified && (
                <div className="mt-3 flex flex-wrap items-start justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800">
                  <div className="flex min-w-0 flex-1 items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                    )}
                    <span>{q.exp}</span>
                  </div>
                  {q.pdfFile && q.slide && (
                    <button
                      type="button"
                      onClick={() =>
                        onPeekSlide(q.pdfFile!, q.pdfLabel || q.pdfFile!, q.slide!, week.id)
                      }
                      className="inline-flex shrink-0 items-center gap-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-[#0f2342] hover:bg-slate-100"
                    >
                      <BookOpen className="h-3 w-3" />
                      s.{q.slide}
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
            className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-800"
          >
            Cevapları Doğrula ve Puanla
          </button>
        </div>
      )}
    </section>
  );
};

/* ============================================================
   BM101 A4 ÖZETLER
   ============================================================ */
export const BM101A4Sheet: React.FC<{ week: BM101WeekModule }> = ({ week }) => (
  <article className="a4-sheet mx-auto w-full max-w-[210mm] overflow-hidden border border-slate-300 bg-white p-5 text-[#111827] shadow-sm sm:p-8">
    <header className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b-2 border-[#0f2342] pb-2.5">
      <div className="min-w-0">
        <div className="text-[11px] font-bold tracking-wide text-red-700">
          BM101 Bilgisayar Programlama I (C Dili) · {week.tag}
        </div>
        <h2 className="text-lg font-extrabold text-[#0f2342] [overflow-wrap:anywhere]">
          {week.title} — Özet
        </h2>
      </div>
      <div className="min-w-0 text-left text-xs text-slate-600 sm:text-right">
        <div>Teorik: Dr. Hüseyin Temuçin · Lab: Arş. Gör. Kevser Özdem Karaca</div>
        <div className="[overflow-wrap:anywhere]">
          {week.pdfName} + {week.labPdfName}
        </div>
      </div>
    </header>

    <div className="a4-cols grid grid-cols-1 gap-4 md:grid-cols-2">
      {week.summaryA4.map((sec, idx) => (
        <section key={idx} className="a4-section min-w-0">
          <h3 className="mb-1.5 border-b border-slate-200 pb-1 text-sm font-bold text-red-700">
            {sec.h}
          </h3>
          <ul className="list-disc space-y-1 pl-4 text-[13px] leading-snug text-slate-800">
            {sec.items.map((item, iIdx) => (
              <li key={iIdx}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </article>
);

export const BM101WeekA4View: React.FC<{ week: BM101WeekModule }> = ({ week }) => (
  <div className="space-y-5">
    <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <div>
        <h3 className="text-base font-bold text-[#0f2342]">BM101 A4 Sınav Özeti</h3>
        <p className="text-sm text-slate-600">
          Yalnızca BM101 ders ve lab PDF&apos;lerinden derlenmiş yazdırılabilir özet sayfası.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800"
      >
        <Printer className="h-4 w-4" />
        A4 Yazdır / PDF Kaydet
      </button>
    </div>
    <div className="print-only-container">
      <BM101A4Sheet week={week} />
    </div>
  </div>
);

export const BM101AllA4View: React.FC = () => (
  <div className="space-y-6">
    <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6">
      <div>
        <h1 className="text-xl font-extrabold text-[#0f2342]">
          BM101 Tüm Haftaların A4 Özet Paketi
        </h1>
        <p className="text-sm text-slate-600">
          Hafta 1–6 tüm ders ve lab konularını tek seferde A4 PDF olarak yazdırabilirsiniz.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-800"
      >
        <Printer className="h-4 w-4" />
        Tümünü A4 Yazdır / PDF Kaydet
      </button>
    </div>
    <div className="print-only-container space-y-6">
      {BM101_WEEKS.map((w, idx) => (
        <div key={w.id} className={idx > 0 ? 'a4-page-break' : ''}>
          <BM101A4Sheet week={w} />
        </div>
      ))}
    </div>
  </div>
);
