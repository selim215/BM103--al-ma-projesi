import React from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { WeekModule } from '../types/course';

interface QuickQuizProps {
  week: WeekModule;
  answers: Record<number, number>;
  verified: boolean;
  onSelect: (qIdx: number, optIdx: number) => void;
  onVerify: () => void;
  onReset: () => void;
}

export const QuickQuiz: React.FC<QuickQuizProps> = ({
  week,
  answers,
  verified,
  onSelect,
  onVerify,
  onReset,
}) => {
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
            Soruları işaretleyin ve alt kısımdaki doğrulama butonuyla kaynak açıklamalarını inceleyin.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-semibold tabular-nums text-slate-700">
            {verified
              ? `Skor: ${correctCount} / ${week.quiz.length}`
              : `İşaretlenen: ${answeredCount} / ${week.quiz.length}`}
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap"
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
              key={`${week.id}-quiz-${qIdx}`}
              className={`rounded-xl border p-5 transition-colors ${
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

              <div className="space-y-2">
                {q.opts.map((opt, oIdx) => {
                  const isChosen = chosen === oIdx;
                  const showOk = verified && oIdx === q.ans;
                  const showBad = verified && isChosen && oIdx !== q.ans;

                  return (
                    <label
                      key={oIdx}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                        showOk
                          ? 'border-emerald-500 bg-emerald-50 font-semibold text-emerald-950'
                          : showBad
                          ? 'border-red-400 bg-red-50 text-red-950'
                          : isChosen
                          ? 'border-[#0f2342] bg-slate-100 font-semibold text-[#0f2342]'
                          : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                      } ${verified ? 'cursor-default' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`quiz-${week.id}-${qIdx}`}
                        checked={isChosen}
                        disabled={verified}
                        onChange={() => onSelect(qIdx, oIdx)}
                        className="mt-0.5 accent-[#0f2342]"
                      />
                      <span className="min-w-0 [overflow-wrap:anywhere]">
                        <strong className="mr-1.5 font-mono">{String.fromCharCode(65 + oIdx)})</strong>
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>

              {verified && (
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800">
                  {isCorrect ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                  )}
                  <div className="min-w-0 [overflow-wrap:anywhere]">
                    <strong className={isCorrect ? 'text-emerald-800' : 'text-red-800'}>
                      {isCorrect ? 'Doğru' : chosen === undefined ? 'Boş Bırakıldı' : 'Yanlış'}
                    </strong>
                    <span className="mx-1.5 text-slate-400">·</span>
                    <span>{q.exp}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!verified && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-slate-500">
            Tüm soruları işaretledikten sonra doğrulayabilirsiniz.
          </span>
          <button
            type="button"
            onClick={onVerify}
            className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-800 whitespace-nowrap"
          >
            Cevapları Doğrula ve Puanla
          </button>
        </div>
      )}
    </section>
  );
};
