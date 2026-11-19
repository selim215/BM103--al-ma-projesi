import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  FileText,
  KeyRound,
  ChevronLeft,
  ChevronRight,
  Lock,
  Sparkles,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { MAT101_PAST_MIDTERMS } from '../data/mat101PastMidterms';
import { MAT101PastMidtermPaper, MAT101PastQuestion } from '../types/mat101';
import { MathText } from './MathText';

interface MAT101PastMidtermSolverProps {
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number) => void;
}

export const MAT101PastMidtermSolver: React.FC<MAT101PastMidtermSolverProps> = ({
  onPeekSlide,
}) => {
  const [selectedPaperId, setSelectedPaperId] = useState<string>(MAT101_PAST_MIDTERMS[0].id);
  const [activeQIndex, setActiveQIndex] = useState<number>(0);

  // Per paper, per question num -> chosen option index (0..4 for MCQ)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Record<number, number>>>({});
  // Per paper, per question num -> classical self-attempt note
  const [classicalNotes, setClassicalNotes] = useState<Record<string, Record<number, string>>>({});
  // Per paper, per question num -> revealed boolean
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, Record<number, boolean>>>({});

  const activePaper: MAT101PastMidtermPaper =
    MAT101_PAST_MIDTERMS.find((p) => p.id === selectedPaperId) || MAT101_PAST_MIDTERMS[0];

  const safeQIdx = Math.min(Math.max(0, activeQIndex), activePaper.questions.length - 1);
  const q: MAT101PastQuestion = activePaper.questions[safeQIdx];

  const paperSelections = selectedOptions[activePaper.id] || {};
  const paperRevealed = revealedQuestions[activePaper.id] || {};
  const paperNotes = classicalNotes[activePaper.id] || {};

  const isRevealed = !!paperRevealed[q.num];
  const chosenOptIdx = paperSelections[q.num];
  const isMcq = q.type === 'mcq';
  const isCorrect = isMcq && isRevealed && chosenOptIdx === q.correctIndex;

  // Score metrics across active paper
  const mcqList = activePaper.questions.filter((item) => item.type === 'mcq');
  const answeredMcqCount = mcqList.filter((item) => paperRevealed[item.num]).length;
  const correctMcqCount = mcqList.filter(
    (item) => paperRevealed[item.num] && paperSelections[item.num] === item.correctIndex
  ).length;
  const solvedTotalCount = activePaper.questions.filter((item) => paperRevealed[item.num]).length;

  const handleSelectPaper = (id: string) => {
    setSelectedPaperId(id);
    setActiveQIndex(0);
  };

  const handlePickMcqOption = (optIdx: number) => {
    if (isRevealed) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [activePaper.id]: {
        ...(prev[activePaper.id] || {}),
        [q.num]: optIdx,
      },
    }));
    setRevealedQuestions((prev) => ({
      ...prev,
      [activePaper.id]: {
        ...(prev[activePaper.id] || {}),
        [q.num]: true,
      },
    }));
  };

  const handleRevealClassical = () => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [activePaper.id]: {
        ...(prev[activePaper.id] || {}),
        [q.num]: true,
      },
    }));
  };

  const handleResetQuestion = (qNum: number) => {
    setSelectedOptions((prev) => {
      const nextPaper = { ...(prev[activePaper.id] || {}) };
      delete nextPaper[qNum];
      return { ...prev, [activePaper.id]: nextPaper };
    });
    setRevealedQuestions((prev) => {
      const nextPaper = { ...(prev[activePaper.id] || {}) };
      delete nextPaper[qNum];
      return { ...prev, [activePaper.id]: nextPaper };
    });
  };

  const handleResetPaper = () => {
    setSelectedOptions((prev) => ({ ...prev, [activePaper.id]: {} }));
    setRevealedQuestions((prev) => ({ ...prev, [activePaper.id]: {} }));
    setClassicalNotes((prev) => ({ ...prev, [activePaper.id]: {} }));
    setActiveQIndex(0);
  };

  return (
    <div className="space-y-5">
      {/* Exam Header & Paper Switcher */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="min-w-0 max-w-3xl">
            <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-[#A55704]">
              <Sparkles className="h-3.5 w-3.5" />
              Gazi Üniversitesi MAT101 Çıkmış Vize Soruları (6 Sınav · 102 Soru)
            </div>
            <h1 className="text-xl font-extrabold text-[#09251C] sm:text-2xl">
              Önce İşaretle, Ardından Adım Adım Çözümü Gör
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Her soruda çözüm başlangıçta gizlidir. Önce soruyu kendiniz çözüp şıkkı işaretleyin (klasik sorularda kendi çözümünüzü kontrol edin); işaretlediğiniz anda doğruluk durumu ve adım adım çözüm açılır.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="rounded-lg border border-slate-200 bg-[#FAF6F0] px-3.5 py-2 text-right">
              <div className="text-[11px] font-bold uppercase text-slate-500">Aktif Sınav Durumu</div>
              <div className="font-mono text-sm font-extrabold text-[#09251C] tabular-nums">
                {solvedTotalCount} / {activePaper.questions.length} Çözüldü · Test Doğru: {correctMcqCount}/{answeredMcqCount}
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetPaper}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Sınavı Sıfırla
            </button>
          </div>
        </div>

        {/* 6 Past Paper Tabs */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {MAT101_PAST_MIDTERMS.map((paper) => {
            const active = paper.id === activePaper.id;
            const pSolved = paper.questions.filter((item) => revealedQuestions[paper.id]?.[item.num]).length;
            return (
              <button
                key={paper.id}
                type="button"
                onClick={() => handleSelectPaper(paper.id)}
                className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-left transition-all ${
                  active
                    ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC] shadow-sm'
                    : 'border-slate-200 bg-[#FAF6F0] text-[#09251C] hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-xs font-extrabold sm:text-sm">
                      {paper.yearLabel}
                    </span>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        active ? 'bg-[#A55704] text-[#F8EADC]' : 'bg-[#F8EADC] text-[#A55704]'
                      }`}
                    >
                      {paper.groupLabel}
                    </span>
                  </div>
                  <div className={`mt-0.5 text-[11px] ${active ? 'text-[#F3D2AF]/90' : 'text-slate-500'}`}>
                    {paper.questions.length} Soru · {paper.durationMin} dk
                    {paper.hasHandwrittenKey ? ' · El Yazısı Key' : ''}
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-md px-2 py-1 font-mono text-xs font-bold tabular-nums ${
                    active ? 'bg-white/15 text-[#F8EADC]' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {pSolved}/{paper.questions.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Paper Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-[#FAF6F0] px-4 py-2.5 text-xs text-slate-700">
          <div className="min-w-0">
            <strong className="text-[#09251C]">{activePaper.pdfLabel}</strong> ({activePaper.examDate}) — {activePaper.summaryNote}
          </div>
          <button
            type="button"
            onClick={() => onPeekSlide(activePaper.pdfFile, activePaper.pdfLabel, q.questionPage)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#09251C] hover:bg-[#F5ECE0]"
          >
            <FileText className="h-3.5 w-3.5 text-[#A55704]" />
            Orijinal Sınav Sayfası (s.{q.questionPage})
          </button>
        </div>
      </section>

      {/* Question Number Pills */}
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Soru Gezgini ({activePaper.yearLabel} · {activePaper.groupLabel})
          </span>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" /> Doğru
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" /> Yanlış
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-600" /> Klasik Çözüldü
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {activePaper.questions.map((item, idx) => {
            const active = idx === safeQIdx;
            const rev = !!paperRevealed[item.num];
            const ans = paperSelections[item.num];

            let pillStyle = 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100';
            if (rev) {
              if (item.type === 'mcq') {
                pillStyle =
                  ans === item.correctIndex
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                    : 'border-red-400 bg-red-50 text-red-900';
              } else {
                pillStyle = 'border-sky-400 bg-sky-50 text-sky-900';
              }
            }
            if (active) {
              pillStyle = 'border-[#09251C] bg-[#09251C] text-[#F8EADC] ring-2 ring-[#09251C]/25';
            }

            return (
              <button
                key={`${activePaper.id}-pill-${item.num}`}
                type="button"
                onClick={() => setActiveQIndex(idx)}
                className={`min-w-[2.4rem] rounded-lg border px-2.5 py-1.5 font-mono text-xs font-bold tabular-nums transition-colors ${pillStyle}`}
              >
                {item.type === 'classical' ? `K${item.num}` : item.num}
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Question Workspace */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        {/* Question Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#A55704] bg-[#09251C] px-5 py-3.5 text-[#F8EADC]">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded bg-[#A55704] px-2.5 py-1 font-mono text-xs font-extrabold text-[#F8EADC]">
              Soru {q.num} / {activePaper.questions.length}
            </span>
            <span className="rounded bg-white/15 px-2.5 py-1 text-xs font-semibold text-[#F3D2AF]">
              {q.topicTag}
            </span>
            <span className="text-xs text-[#F3D2AF]/85">
              {q.type === 'classical' ? 'Açık Uçlu / Klasik (10 Puan)' : 'Çoktan Seçmeli (A–E)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safeQIdx === 0}
              onClick={() => setActiveQIndex((i) => Math.max(0, i - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-bold text-[#F8EADC] hover:bg-white/20 disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Önceki
            </button>
            <button
              type="button"
              disabled={safeQIdx >= activePaper.questions.length - 1}
              onClick={() => setActiveQIndex((i) => Math.min(activePaper.questions.length - 1, i + 1))}
              className="inline-flex items-center gap-1 rounded-lg bg-[#A55704] px-2.5 py-1 text-xs font-bold text-[#F8EADC] hover:bg-[#894603] disabled:opacity-40"
            >
              Sonraki
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Question Stem */}
          <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-4 sm:p-5">
            <div className="mb-2 flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              <span>Orijinal Sınav Sorusu</span>
              <button
                type="button"
                onClick={() => onPeekSlide(activePaper.pdfFile, activePaper.pdfLabel, q.questionPage)}
                className="inline-flex items-center gap-1 text-[#09251C] hover:underline"
              >
                <FileText className="h-3 w-3" />
                PDF s.{q.questionPage}
              </button>
            </div>
            <div className="text-[15px] font-semibold leading-relaxed text-[#09251C] sm:text-base">
              <MathText text={q.questionLatex} />
            </div>
          </div>

          {/* Step 1: Options (MCQ) OR Classical Prompt */}
          {isMcq && q.options ? (
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {isRevealed
                  ? 'İşaretlenen Seçenek & Sonuç'
                  : '1. Adım: Cevabı Hesaplayıp Şıkkı İşaretleyin (Çözüm işaretledikten sonra açılır)'}
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {q.options.map((optLatex, oIdx) => {
                  const letter = String.fromCharCode(65 + oIdx);
                  const isChosen = chosenOptIdx === oIdx;
                  const isRightAnswer = q.correctIndex === oIdx;

                  let btnClass =
                    'border-slate-200 bg-white text-slate-900 hover:border-[#09251C] hover:bg-slate-50';
                  let badgeClass = 'bg-slate-100 text-[#09251C]';

                  if (isRevealed) {
                    if (isRightAnswer) {
                      btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500';
                      badgeClass = 'bg-emerald-600 text-white';
                    } else if (isChosen && !isRightAnswer) {
                      btnClass = 'border-red-400 bg-red-50 text-red-950';
                      badgeClass = 'bg-red-600 text-white';
                    } else {
                      btnClass = 'border-slate-200 bg-slate-50/60 text-slate-500';
                      badgeClass = 'bg-slate-200 text-slate-600';
                    }
                  }

                  return (
                    <button
                      key={`${activePaper.id}-q${q.num}-opt${oIdx}`}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => handlePickMcqOption(oIdx)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${btnClass} ${
                        isRevealed ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-extrabold ${badgeClass}`}
                      >
                        {letter}
                      </span>
                      <div className="min-w-0 flex-1 text-sm font-medium sm:text-[15px]">
                        <MathText text={optLatex} />
                      </div>
                      {isRevealed && isRightAnswer && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      )}
                      {isRevealed && isChosen && !isRightAnswer && (
                        <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
                1. Adım: Klasik Soru Çözüm Alanı (Kendiniz Çözdükten Sonra Açın)
              </div>
              <textarea
                rows={3}
                value={paperNotes[q.num] || ''}
                onChange={(e) =>
                  setClassicalNotes((prev) => ({
                    ...prev,
                    [activePaper.id]: {
                      ...(prev[activePaper.id] || {}),
                      [q.num]: e.target.value,
                    },
                  }))
                }
                placeholder="İsterseniz bulduğunuz ara adımları veya nihai sonucu buraya not edin..."
                className="w-full rounded-lg border border-slate-300 bg-white p-3 font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#09251C] focus:outline-none sm:text-sm"
              />
              {!isRevealed && (
                <button
                  type="button"
                  onClick={handleRevealClassical}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#09251C] px-4 py-2.5 text-xs font-bold text-[#F8EADC] hover:bg-[#0f3a2c]"
                >
                  <Eye className="h-4 w-4" />
                  Kendim Çözdüm · Adım Adım Çözümü Göster
                </button>
              )}
            </div>
          )}

          {/* Locked Placeholder vs Step-by-Step Solution Reveal */}
          {!isRevealed ? (
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-[#FAF6F0] px-4 py-4 text-xs text-slate-600 sm:text-sm">
              <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              <span>
                Adım adım çözüm şu anda gizli. Yukarıdan bir şık işaretlediğinizde (veya klasik soruyu onayladığınızda) detaylı çözüm otomatik olarak açılacaktır.
              </span>
            </div>
          ) : (
            <div className="space-y-4 rounded-xl border border-[#09251C]/20 bg-[#FAF6F0] p-4 sm:p-5">
              {/* Verdict Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  {isMcq ? (
                    isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm font-extrabold text-emerald-800 sm:text-base">
                          Doğru İşaretlediniz! (Cevap: {q.correctLabel})
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="text-sm font-extrabold text-red-800 sm:text-base">
                          Yanlış İşaretlediniz · Doğru Cevap: {q.correctLabel}
                        </span>
                      </>
                    )
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-[#09251C]" />
                      <span className="text-sm font-extrabold text-[#09251C] sm:text-base">
                        Klasik Soru Çözümü · Sonuç: <MathText text={q.correctLabel || ''} />
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {q.solutionKeyPage && (
                    <button
                      type="button"
                      onClick={() =>
                        onPeekSlide(activePaper.pdfFile, `${activePaper.pdfLabel} (El Yazısı Key)`, q.solutionKeyPage!)
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-950 hover:bg-amber-100"
                    >
                      <KeyRound className="h-3.5 w-3.5 text-amber-700" />
                      El Yazısı Çözüm (s.{q.solutionKeyPage})
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleResetQuestion(q.num)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Tekrar Çöz
                  </button>
                </div>
              </div>

              {q.officialNote && (
                <div className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs leading-relaxed text-amber-950">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                  <div>
                    <strong>Resmi Anahtar Notu: </strong>
                    <MathText text={q.officialNote} />
                  </div>
                </div>
              )}

              {/* Step-by-Step Walkthrough */}
              <div className="space-y-2.5">
                <div className="text-xs font-extrabold uppercase tracking-wide text-[#09251C]">
                  2. Adım: Adım Adım Detaylı Çözüm
                </div>
                <div className="space-y-2">
                  {q.stepByStepSolution.map((step, sIdx) => (
                    <div
                      key={`${activePaper.id}-q${q.num}-step${sIdx}`}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-800"
                    >
                      <MathText text={step} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Takeaway */}
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-xs leading-relaxed text-emerald-950 sm:text-sm">
                <strong className="font-extrabold text-emerald-900">Sınav İpucu &amp; Ana Fikir: </strong>
                <MathText text={q.keyTakeaway} />
              </div>

              {/* Next Question Shortcut */}
              {safeQIdx < activePaper.questions.length - 1 && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveQIndex(safeQIdx + 1)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#09251C] px-4 py-2 text-xs font-bold text-[#F8EADC] hover:bg-[#0f3a2c]"
                  >
                    Soru {activePaper.questions[safeQIdx + 1].num}&apos;e Geç
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
