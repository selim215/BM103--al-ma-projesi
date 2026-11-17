import React, { useEffect, useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  BookOpen,
  ListChecks,
  FileText,
} from 'lucide-react';
import { EXAM_SCENARIOS } from '../data/bm103Data';
import { ExamQuestion, ExamScenario } from '../types/course';

interface ExamCenterProps {
  onPeekSlideBySource: (srcLabel: string) => void;
}

type ClassicGrade = 'full' | 'partial' | 'zero';

function getKindLabel(kind: ExamQuestion['kind']): string {
  if (kind === 'tf') return 'Doğru / Yanlış';
  if (kind === 'classic') return 'Klasik';
  return 'Test';
}

function suggestClassicGrade(text: string | undefined, keywords?: string[]): ClassicGrade {
  const normalized = (text || '').trim().toLowerCase();
  if (!normalized || normalized.length < 4) return 'zero';
  if (!keywords || keywords.length === 0) return 'partial';
  let hits = 0;
  keywords.forEach((kw) => {
    if (normalized.includes(kw.toLowerCase())) hits += 1;
  });
  const ratio = hits / keywords.length;
  if (ratio >= 0.55) return 'full';
  if (ratio >= 0.2) return 'partial';
  return 'zero';
}

function getQuestionEarnedPoints(
  q: ExamQuestion,
  idx: number,
  choiceAnswers: Record<number, number>,
  classicGrades: Record<number, ClassicGrade>
): number {
  if (q.kind === 'classic') {
    const grade = classicGrades[idx] ?? 'zero';
    if (grade === 'full') return q.points;
    if (grade === 'partial') return Math.round(q.points / 2);
    return 0;
  }
  return choiceAnswers[idx] === q.ans ? q.points : 0;
}

export const ExamCenter: React.FC<ExamCenterProps> = ({ onPeekSlideBySource }) => {
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const [choiceAnswers, setChoiceAnswers] = useState<Record<number, number>>({});
  const [classicAnswers, setClassicAnswers] = useState<Record<number, string>>({});
  const [classicGrades, setClassicGrades] = useState<Record<number, ClassicGrade>>({});
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(0);
  const [viewAllReview, setViewAllReview] = useState<boolean>(false);
  const [historyScores, setHistoryScores] = useState<
    Record<string, { earned: number; totalPoints: number }>
  >({});

  const activeScenario: ExamScenario | undefined = EXAM_SCENARIOS.find(
    (e) => e.id === activeExamId
  );

  useEffect(() => {
    if (!activeExamId || submitted) return;
    const timer = window.setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeExamId, submitted]);

  useEffect(() => {
    if (activeScenario && !submitted && timeLeftSec === 0 && activeExamId) {
      handleSubmitExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeftSec]);

  const startScenario = (sc: ExamScenario) => {
    setActiveExamId(sc.id);
    setChoiceAnswers({});
    setClassicAnswers({});
    setClassicGrades({});
    setCurrentQ(0);
    setSubmitted(false);
    setViewAllReview(false);
    setTimeLeftSec(sc.durationMin * 60);
  };

  const computeTotals = (
    sc: ExamScenario,
    choices: Record<number, number>,
    grades: Record<number, ClassicGrade>
  ) => {
    let earned = 0;
    let totalPoints = 0;
    sc.questions.forEach((item, idx) => {
      totalPoints += item.points;
      earned += getQuestionEarnedPoints(item, idx, choices, grades);
    });
    return { earned, totalPoints };
  };

  const handleSubmitExam = () => {
    if (!activeScenario || submitted) return;
    const initialGrades: Record<number, ClassicGrade> = {};
    activeScenario.questions.forEach((item, idx) => {
      if (item.kind === 'classic') {
        initialGrades[idx] = suggestClassicGrade(classicAnswers[idx], item.expectedKeywords);
      }
    });
    setClassicGrades(initialGrades);

    const { earned, totalPoints } = computeTotals(activeScenario, choiceAnswers, initialGrades);
    setHistoryScores((prev) => ({
      ...prev,
      [activeScenario.id]: { earned, totalPoints },
    }));
    setSubmitted(true);
    setViewAllReview(true);
  };

  const handleUpdateClassicGrade = (qIdx: number, grade: ClassicGrade) => {
    if (!activeScenario) return;
    const nextGrades = { ...classicGrades, [qIdx]: grade };
    setClassicGrades(nextGrades);
    const { earned, totalPoints } = computeTotals(activeScenario, choiceAnswers, nextGrades);
    setHistoryScores((prev) => ({
      ...prev,
      [activeScenario.id]: { earned, totalPoints },
    }));
  };

  const exitExam = () => {
    setActiveExamId(null);
    setSubmitted(false);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isQuestionAnswered = (item: ExamQuestion, idx: number) => {
    if (item.kind === 'classic') {
      return (classicAnswers[idx] || '').trim().length > 0;
    }
    return choiceAnswers[idx] !== undefined;
  };

  // Scenario Picker View
  if (!activeScenario) {
    return (
      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h1 className="text-xl font-extrabold text-[#0f2342]">
            Vize Sınav Merkezi — Hocanın Soru Metodlarına Özel 3 Vize Senaryosu
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Üç senaryonun tamamı dersin vize metodolojisine uygun olarak{' '}
            <strong className="text-[#0f2342]">Doğru / Yanlış</strong>,{' '}
            <strong className="text-[#0f2342]">Test</strong> ve{' '}
            <strong className="text-[#0f2342]">Klasik</strong> bölümlerinden oluşur. Tarih ezberi yerine{' '}
            <strong className="text-[#0f2342]">ilkler</strong>, işlem yerine{' '}
            <strong className="text-[#0f2342]">sözel Minterm/Maxterm</strong> ve hem sözel hem sayısal sorular içerir.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {EXAM_SCENARIOS.map((sc) => {
            const past = historyScores[sc.id];
            const totalPts = sc.questions.reduce((acc, item) => acc + item.points, 0);
            return (
              <article
                key={sc.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#0f2342]"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2 text-xs font-bold">
                    <span className="text-red-700">{sc.badge}</span>
                    <span className="font-mono text-slate-500 tabular-nums">
                      {sc.questions.length} Soru · {sc.durationMin} Dk
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-[#0f2342]">{sc.title}</h2>
                  <div className="mt-2 text-xs font-semibold text-slate-700">
                    {sc.formatSummary} · Toplam {totalPts} Puan
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{sc.desc}</p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  {past && (
                    <div className="mb-3 flex items-center justify-between text-xs font-semibold text-emerald-800">
                      <span>Son Deneme Puanı</span>
                      <span className="font-mono tabular-nums">
                        {past.earned} / {past.totalPoints} Puan
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => startScenario(sc)}
                    className="w-full rounded-lg bg-[#0f2342] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1a3664] whitespace-nowrap"
                  >
                    {past ? 'Sınavı Yeniden Başlat' : 'Sınava Başla'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Exam or Review View
  const totalQ = activeScenario.questions.length;
  const answeredCount = activeScenario.questions.filter((item, idx) =>
    isQuestionAnswered(item, idx)
  ).length;
  const q = activeScenario.questions[currentQ];

  const { earned: totalEarned, totalPoints } = submitted
    ? computeTotals(activeScenario, choiceAnswers, classicGrades)
    : { earned: 0, totalPoints: activeScenario.questions.reduce((a, b) => a + b.points, 0) };

  let objCorrect = 0;
  let objWrong = 0;
  let objBlank = 0;
  let classicFull = 0;
  let classicPartial = 0;
  let classicZero = 0;

  if (submitted) {
    activeScenario.questions.forEach((item, idx) => {
      if (item.kind === 'classic') {
        const g = classicGrades[idx] ?? 'zero';
        if (g === 'full') classicFull += 1;
        else if (g === 'partial') classicPartial += 1;
        else classicZero += 1;
      } else {
        if (choiceAnswers[idx] === undefined) objBlank += 1;
        else if (choiceAnswers[idx] === item.ans) objCorrect += 1;
        else objWrong += 1;
      }
    });
  }

  const renderClassicReviewBox = (item: ExamQuestion, idx: number) => {
    const userText = (classicAnswers[idx] || '').trim();
    const grade = classicGrades[idx] ?? 'zero';
    const pts = getQuestionEarnedPoints(item, idx, choiceAnswers, classicGrades);

    return (
      <div className="space-y-3">
        <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-3.5">
          <div className="mb-1 text-xs font-bold text-slate-500">Sizin Yanıtınız</div>
          {userText ? (
            <p className="whitespace-pre-line text-sm text-slate-800 [overflow-wrap:anywhere]">{userText}</p>
          ) : (
            <p className="text-sm italic text-slate-400">Boş bırakıldı.</p>
          )}
        </div>

        <div className="min-w-0 rounded-lg border border-emerald-300 bg-emerald-50/70 p-3.5">
          <div className="mb-1 text-xs font-bold text-emerald-900">
            Örnek Tam Puan Cevabı ({item.points} Puan)
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-emerald-950 [overflow-wrap:anywhere]">
            {item.modelAnswer}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5">
          <div className="text-xs font-semibold text-slate-700">
            Klasik Değerlendirme ({pts} / {item.points} Puan) · Anahtar kelime eşleşmesine göre önerildi, düzenleyebilirsiniz:
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'full', label: `Tam Puan (${item.points}p)` },
                { id: 'partial', label: `Yarım Puan (${Math.round(item.points / 2)}p)` },
                { id: 'zero', label: '0 Puan' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleUpdateClassicGrade(idx, opt.id)}
                className={`rounded-md border px-2.5 py-1 text-xs font-bold transition-colors whitespace-nowrap ${
                  grade === opt.id
                    ? opt.id === 'full'
                      ? 'border-emerald-700 bg-emerald-700 text-white'
                      : opt.id === 'partial'
                      ? 'border-amber-700 bg-amber-700 text-white'
                      : 'border-red-700 bg-red-700 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Top Exam Status Bar */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-red-700">{activeScenario.badge}</div>
            <h1 className="text-lg font-extrabold text-[#0f2342]">{activeScenario.title}</h1>
            <div className="mt-0.5 text-xs font-medium text-slate-500">
              {activeScenario.formatSummary}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!submitted ? (
              <div
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-sm font-bold tabular-nums ${
                  timeLeftSec <= 120
                    ? 'border-red-300 bg-red-50 text-red-800'
                    : 'border-slate-200 bg-slate-50 text-[#0f2342]'
                }`}
              >
                <Clock className="h-4 w-4" />
                {formatTime(timeLeftSec)}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3.5 py-1.5 font-mono text-sm font-bold text-emerald-900 tabular-nums">
                Toplam Puan: {totalEarned} / {totalPoints}
              </div>
            )}

            <button
              type="button"
              onClick={exitExam}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              Senaryolara Dön
            </button>

            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmitExam}
                className="rounded-lg bg-red-700 px-4 py-1.5 text-xs font-bold text-white hover:bg-red-800 whitespace-nowrap"
              >
                Sınavı Bitir ({answeredCount}/{totalQ})
              </button>
            ) : (
              <button
                type="button"
                onClick={() => startScenario(activeScenario)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f2342] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#1a3664] whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Tekrar Çöz
              </button>
            )}
          </div>
        </div>

        {/* Question Navigation Dots */}
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
          {activeScenario.questions.map((item, idx) => {
            const isAns = isQuestionAnswered(item, idx);
            const isCur = !viewAllReview && currentQ === idx;
            let dotClass = 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50';

            if (submitted) {
              if (item.kind === 'classic') {
                const g = classicGrades[idx] ?? 'zero';
                dotClass =
                  g === 'full'
                    ? 'border-emerald-700 bg-emerald-700 text-white'
                    : g === 'partial'
                    ? 'border-amber-600 bg-amber-600 text-white'
                    : 'border-red-700 bg-red-700 text-white';
              } else if (choiceAnswers[idx] === item.ans) {
                dotClass = 'border-emerald-700 bg-emerald-700 text-white';
              } else {
                dotClass = 'border-red-700 bg-red-700 text-white';
              }
            } else if (isAns) {
              dotClass = 'border-blue-600 bg-blue-50 font-bold text-[#0f2342]';
            }

            const shortType = item.kind === 'tf' ? 'D/Y' : item.kind === 'classic' ? 'K' : 'T';

            return (
              <button
                key={idx}
                type="button"
                title={`${idx + 1}. Soru (${getKindLabel(item.kind)} · ${item.points} Puan)`}
                onClick={() => {
                  setViewAllReview(false);
                  setCurrentQ(idx);
                }}
                className={`inline-flex h-8 min-w-[2.4rem] items-center justify-center gap-1 rounded-lg border px-1.5 font-mono text-xs font-bold tabular-nums transition-all ${dotClass} ${
                  isCur ? 'ring-2 ring-red-700 ring-offset-1' : ''
                }`}
              >
                <span>{idx + 1}</span>
                <span className="text-[10px] opacity-80">{shortType}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Post-submission Summary Banner */}
      {submitted && (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 font-mono text-sm tabular-nums">
              <div>
                <span className="font-sans text-xs text-slate-500">Toplam Puan</span>
                <div className="text-2xl font-extrabold text-[#0f2342]">
                  {totalEarned} / {totalPoints}
                </div>
              </div>
              <div>
                <span className="font-sans text-xs text-slate-500">D/Y + Test Doğru</span>
                <div className="text-lg font-bold text-emerald-700">{objCorrect}</div>
              </div>
              <div>
                <span className="font-sans text-xs text-slate-500">D/Y + Test Yanlış/Boş</span>
                <div className="text-lg font-bold text-red-700">{objWrong + objBlank}</div>
              </div>
              <div>
                <span className="font-sans text-xs text-slate-500">Klasik (Tam / Yarım / 0)</span>
                <div className="text-lg font-bold text-[#0f2342]">
                  {classicFull} / {classicPartial} / {classicZero}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setViewAllReview((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#0f2342] hover:bg-slate-100 whitespace-nowrap"
            >
              <ListChecks className="h-4 w-4" />
              {viewAllReview ? 'Tek Tek Soru Görünümü' : 'Tüm Çözümleri Listele'}
            </button>
          </div>
        </section>
      )}

      {/* Question Card(s) */}
      {submitted && viewAllReview ? (
        <div className="space-y-4">
          {activeScenario.questions.map((item, idx) => {
            const earnedPts = getQuestionEarnedPoints(item, idx, choiceAnswers, classicGrades);
            const isFull = earnedPts === item.points;
            const isPartial = earnedPts > 0 && earnedPts < item.points;

            const cardBorder = isFull
              ? 'border-emerald-300 bg-emerald-50/30'
              : isPartial
              ? 'border-amber-300 bg-amber-50/30'
              : 'border-red-300 bg-red-50/30';

            return (
              <article key={idx} className={`rounded-xl border p-5 ${cardBorder}`}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold text-slate-600 tabular-nums">
                    <span>
                      Soru {idx + 1} / {totalQ}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[#0f2342]">{getKindLabel(item.kind)}</span>
                    <span className="text-slate-300">·</span>
                    <span className={isFull ? 'text-emerald-800' : isPartial ? 'text-amber-800' : 'text-red-800'}>
                      {earnedPts} / {item.points} Puan
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPeekSlideBySource(item.src)}
                    className="inline-flex max-w-full items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-left text-xs font-semibold text-[#0f2342] hover:bg-slate-100 [overflow-wrap:anywhere]"
                  >
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    {item.src}
                  </button>
                </div>

                <div className="mb-3 whitespace-pre-line text-[15px] font-bold text-[#0f2342] [overflow-wrap:anywhere]">
                  {item.q}
                </div>

                {item.kind === 'classic' ? (
                  renderClassicReviewBox(item, idx)
                ) : (
                  <div className="space-y-1.5">
                    {(item.opts ?? []).map((opt, oIdx) => {
                      const chosen = choiceAnswers[idx];
                      const ok = oIdx === item.ans;
                      const bad = chosen === oIdx && chosen !== item.ans;
                      return (
                        <div
                          key={oIdx}
                          className={`rounded-lg border px-3.5 py-2 text-sm ${
                            ok
                              ? 'border-emerald-500 bg-emerald-50 font-semibold text-emerald-950'
                              : bad
                              ? 'border-red-400 bg-red-50 text-red-950'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {item.kind === 'test' && (
                            <strong className="mr-1.5 font-mono">
                              {String.fromCharCode(65 + oIdx)})
                            </strong>
                          )}
                          {opt}
                          {ok && (
                            <span className="ml-2 text-xs font-bold text-emerald-700">
                              ✓ Doğru Cevap
                            </span>
                          )}
                          {bad && (
                            <span className="ml-2 text-xs font-bold text-red-700">
                              ✕ Sizin Seçiminiz
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-3 flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800">
                  {isFull ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  ) : item.kind === 'classic' ? (
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                  )}
                  <div>
                    <strong>PDF Dayanağı & Açıklama:</strong> {item.exp}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <article className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold text-slate-600 tabular-nums">
              <span>
                Soru {currentQ + 1} / {totalQ}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-red-700">{getKindLabel(q.kind)}</span>
              <span className="text-slate-300">·</span>
              <span className="text-[#0f2342]">{q.points} Puan</span>
            </div>

            {submitted ? (
              <button
                type="button"
                onClick={() => onPeekSlideBySource(q.src)}
                className="inline-flex max-w-full items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-left text-xs font-semibold text-[#0f2342] hover:bg-slate-100 [overflow-wrap:anywhere]"
              >
                <BookOpen className="h-3.5 w-3.5 shrink-0" />
                {q.src}
              </button>
            ) : (
              <span className="text-xs text-slate-400">Kaynak bilgisi sınav sonunda açılır</span>
            )}
          </div>

          <h2 className="mb-4 whitespace-pre-line text-base font-bold leading-snug text-[#0f2342] [overflow-wrap:anywhere]">
            {q.q}
          </h2>

          {q.kind === 'classic' ? (
            submitted ? (
              renderClassicReviewBox(q, currentQ)
            ) : (
              <div className="space-y-2">
                <label
                  htmlFor={`classic-q-${currentQ}`}
                  className="block text-xs font-semibold text-slate-600"
                >
                  Klasik Yanıtınız (Sözel açıklama veya adım adım sayısal çözüm yazınız):
                </label>
                <textarea
                  id={`classic-q-${currentQ}`}
                  rows={6}
                  value={classicAnswers[currentQ] || ''}
                  onChange={(e) =>
                    setClassicAnswers((prev) => ({ ...prev, [currentQ]: e.target.value }))
                  }
                  placeholder="Cevabınızı buraya yazınız..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/40 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0f2342] focus:bg-white focus:outline-none"
                />
              </div>
            )
          ) : (
            <div className={q.kind === 'tf' ? 'grid grid-cols-1 gap-3 sm:grid-cols-2' : 'space-y-2.5'}>
              {(q.opts ?? []).map((opt, oIdx) => {
                const isChosen = choiceAnswers[currentQ] === oIdx;
                const showOk = submitted && oIdx === q.ans;
                const showBad = submitted && isChosen && oIdx !== q.ans;

                return (
                  <label
                    key={oIdx}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                      showOk
                        ? 'border-emerald-500 bg-emerald-50 font-semibold text-emerald-950'
                        : showBad
                        ? 'border-red-400 bg-red-50 text-red-950'
                        : isChosen
                        ? 'border-[#0f2342] bg-slate-100 font-semibold text-[#0f2342]'
                        : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                    } ${submitted ? 'cursor-default' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`exam-q-${currentQ}`}
                      checked={isChosen}
                      disabled={submitted}
                      onChange={() =>
                        setChoiceAnswers((prev) => ({ ...prev, [currentQ]: oIdx }))
                      }
                      className="mt-0.5 accent-[#0f2342]"
                    />
                    <span className="min-w-0 [overflow-wrap:anywhere]">
                      {q.kind === 'test' && (
                        <strong className="mr-1.5 font-mono">
                          {String.fromCharCode(65 + oIdx)})
                        </strong>
                      )}
                      {opt}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {submitted && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
              {getQuestionEarnedPoints(q, currentQ, choiceAnswers, classicGrades) === q.points ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              ) : q.kind === 'classic' ? (
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
              )}
              <div className="min-w-0 [overflow-wrap:anywhere]">
                <strong>Açıklama:</strong> {q.exp}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentQ === 0}
                onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 whitespace-nowrap"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Önceki Soru
              </button>
              {!submitted && isQuestionAnswered(q, currentQ) && (
                <button
                  type="button"
                  onClick={() => {
                    if (q.kind === 'classic') {
                      setClassicAnswers((prev) => {
                        const next = { ...prev };
                        delete next[currentQ];
                        return next;
                      });
                    } else {
                      setChoiceAnswers((prev) => {
                        const next = { ...prev };
                        delete next[currentQ];
                        return next;
                      });
                    }
                  }}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 whitespace-nowrap"
                >
                  Yanıtı Temizle
                </button>
              )}
            </div>

            {currentQ < totalQ - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentQ((c) => Math.min(totalQ - 1, c + 1))}
                className="inline-flex items-center gap-1 rounded-lg bg-[#0f2342] px-4 py-2 text-xs font-bold text-white hover:bg-[#1a3664] whitespace-nowrap"
              >
                Sonraki Soru
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : !submitted ? (
              <button
                type="button"
                onClick={handleSubmitExam}
                className="rounded-lg bg-red-700 px-4 py-2 text-xs font-bold text-white hover:bg-red-800 whitespace-nowrap"
              >
                Sınavı Bitir ve Puanla
              </button>
            ) : null}
          </div>
        </article>
      )}
    </div>
  );
};
