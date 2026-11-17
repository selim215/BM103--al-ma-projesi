import React, { useState } from 'react';
import { BookOpen, Printer, ArrowLeftRight, Code2 } from 'lucide-react';
import { BM101_WEEKS } from '../data/bm101Weeks';
import { BM101_SOLVED_EXAMPLES } from '../data/bm101PracticeAndExams';
import { BM101SubTab, BM101TopMode } from '../types/bm101';
import { BM101InteractiveLabs } from './BM101InteractiveLabs';
import { BM101SolvedExamples } from './BM101SolvedExamples';
import { BM101ExtraPractice } from './BM101ExtraPractice';
import { BM101ExamCenter } from './BM101ExamCenter';
import { BM101AllSlidesView, BM101WeekSlideReader } from './BM101SlideReader';
import {
  BM101AllA4View,
  BM101HapCards,
  BM101QuickQuiz,
  BM101WeekA4View,
} from './BM101HapAndQuizAndA4';
import { BM101SlidePeekModal, BM101SlidePeekTarget } from './BM101SlidePeekModal';
import { ScrollToTopButton, SehaFooter } from './SiteFooterAndScrollTop';

interface BM101WorkspaceProps {
  onOpenCourseSelector: () => void;
}

export const BM101Workspace: React.FC<BM101WorkspaceProps> = ({
  onOpenCourseSelector,
}) => {
  const [topMode, setTopMode] = useState<BM101TopMode>('learn');
  const [weekId, setWeekId] = useState<string>('w1');
  const [subTab, setSubTab] = useState<BM101SubTab>('interactive');
  const [slideIdx, setSlideIdx] = useState<number>(0);

  const [allSlidesWeekId, setAllSlidesWeekId] = useState<string>('w1');
  const [allSlidesIdx, setAllSlidesIdx] = useState<number>(0);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, Record<number, number>>>({});
  const [quizVerified, setQuizVerified] = useState<Record<string, boolean>>({});
  const [peekSlide, setPeekSlide] = useState<BM101SlidePeekTarget | null>(null);

  const activeWeek = BM101_WEEKS.find((w) => w.id === weekId) || BM101_WEEKS[0];
  const weekExamplesCount = BM101_SOLVED_EXAMPLES.filter((e) => e.weekId === activeWeek.id).length;

  const handleSelectWeek = (id: string) => {
    setWeekId(id);
    setTopMode('learn');
    setSlideIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePeekSlide = (
    pdfFile: string,
    pdfLabel: string,
    slideNum: number,
    targetWeekId?: string
  ) => {
    setPeekSlide({
      pdfFile,
      pdfLabel,
      slideNum,
      weekId: targetWeekId || activeWeek.id,
    });
  };

  const handleOpenFullReader = (targetWeekId: string, idx: number) => {
    setAllSlidesWeekId(targetWeekId);
    setAllSlidesIdx(idx >= 0 ? idx : 0);
    setTopMode('slides');
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-slate-50 text-slate-900">
      {/* Three-Zone Top Bar */}
      <header className="no-print sticky top-0 z-40 border-b-2 border-red-700 bg-[#0f2342] text-white">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-5 py-3.5 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => setTopMode('learn')}
            className="min-w-0 truncate text-left text-base font-extrabold tracking-tight text-white hover:text-slate-200 sm:text-lg"
          >
            BM101 Bilgisayar Programlama
          </button>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav className="hidden items-center gap-6 md:flex">
            {[
              { id: 'learn', label: 'Haftalık Dersler' },
              { id: 'examples', label: 'Örnek Çözümleri' },
              { id: 'extra', label: 'Harici Sorular' },
              { id: 'exam', label: 'Vize Sınav Merkezi' },
            ].map((nav) => {
              const active = topMode === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => setTopMode(nav.id as BM101TopMode)}
                  className={`shrink-0 whitespace-nowrap border-b-2 py-1 text-sm font-semibold transition-colors ${
                    active
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-slate-300 hover:border-slate-400 hover:text-white'
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setTopMode('exam')}
              className="shrink-0 whitespace-nowrap rounded-lg bg-red-700 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-red-800"
            >
              Vize Çöz
            </button>
          </div>
        </div>

        {/* Mobile Nav Strip */}
        <div className="flex items-center gap-4 overflow-x-auto border-t border-white/10 px-5 py-2 md:hidden">
          {[
            { id: 'learn', label: 'Dersler' },
            { id: 'examples', label: 'Örnekler' },
            { id: 'extra', label: 'Harici Sorular' },
            { id: 'slides', label: 'Slaytlar' },
            { id: 'exam', label: 'Vize Sınavı' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => setTopMode(nav.id as BM101TopMode)}
              className={`shrink-0 whitespace-nowrap text-xs font-semibold ${
                topMode === nav.id ? 'text-red-300 underline underline-offset-4' : 'text-slate-300'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main App Shell */}
      <div className="mx-auto grid w-full max-w-[1380px] flex-1 grid-cols-1 items-start gap-6 px-4 py-6 sm:px-5 lg:grid-cols-[290px_1fr]">
        {/* Sidebar */}
        <aside className="no-print rounded-xl border border-[#0f2342]/20 bg-[#f2f6fb] p-4 shadow-sm lg:sticky lg:top-20">
          {/* Course Switcher Box */}
          <div className="mb-4 rounded-lg border border-sky-300/80 bg-white p-3 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0f2342]">
                <Code2 className="h-3.5 w-3.5 text-sky-700" />
                Aktif Ders: BM101
              </span>
              <button
                type="button"
                onClick={onOpenCourseSelector}
                className="inline-flex items-center gap-1 rounded-md border border-[#0f2342]/25 bg-slate-50 px-2 py-1 text-[11px] font-bold text-[#0f2342] hover:bg-[#0f2342] hover:text-white"
              >
                <ArrowLeftRight className="h-3 w-3" />
                Ders Değiştir
              </button>
            </div>
          </div>

          <div className="mb-3 px-2 text-xs font-bold tracking-wide text-slate-600">
            BM101 Konular &amp; Laboratuvarlar
          </div>

          <div className="space-y-1.5">
            {BM101_WEEKS.map((w) => {
              const isSelected = topMode === 'learn' && weekId === w.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => handleSelectWeek(w.id)}
                  className={`flex w-full items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    isSelected
                      ? 'border-[#0f2342]/35 bg-white shadow-xs'
                      : 'border-transparent bg-white/60 hover:border-slate-300/70 hover:bg-white'
                  }`}
                >
                  <span
                    className={`mt-0.5 shrink-0 whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-bold ${
                      isSelected ? 'bg-red-700 text-white' : 'bg-[#0f2342] text-white'
                    }`}
                  >
                    {w.tag}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-snug text-[#0f2342]">
                      {w.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500">
                      {w.pdfName} + {w.labPdfName}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <hr className="my-4 border-slate-200" />

          {/* Quick Secondary Links inside Sidebar */}
          <div className="mb-4 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setTopMode('slides')}
              className={`rounded-lg border px-2.5 py-2 text-xs font-bold transition-colors ${
                topMode === 'slides'
                  ? 'border-[#0f2342] bg-[#0f2342] text-white'
                  : 'border-slate-200 bg-slate-50 text-[#0f2342] hover:bg-slate-100'
              }`}
            >
              12 PDF Arşivi
            </button>
            <button
              type="button"
              onClick={() => setTopMode('a4')}
              className={`rounded-lg border px-2.5 py-2 text-xs font-bold transition-colors ${
                topMode === 'a4'
                  ? 'border-[#0f2342] bg-[#0f2342] text-white'
                  : 'border-slate-200 bg-slate-50 text-[#0f2342] hover:bg-slate-100'
              }`}
            >
              Tüm A4 Özet
            </button>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-950">
            <div className="font-bold">İzole BM101 Kaynak Garantisi</div>
            <p className="mt-1 leading-relaxed text-emerald-900">
              Bu bölümde yalnızca yüklenen 6 ders ve 6 laboratuvar BM101 PDF&apos;i kullanılır. BM103 içerikleri kesinlikle karıştırılmaz.
            </p>
          </div>

          <div className="mt-2.5 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-950">
            <div className="font-bold">Bilgilendirme &amp; Sınav Uyarısı</div>
            <p className="mt-1 leading-relaxed text-amber-900">
              Bu içerikler yalnızca vizelere yardımcı olunması için hazırlanılmıştır. Kesinlik içermez; sınav soruları farklılık gösterebilir.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 space-y-5">
          {topMode === 'learn' && (
            <>
              <section className="no-print flex flex-wrap items-center justify-between gap-5 rounded-xl bg-[#0f2342] p-6 text-white">
                <div className="min-w-0 max-w-3xl">
                  <div className="mb-1 text-xs font-semibold text-sky-300 [overflow-wrap:anywhere]">
                    Teorik: Dr. Hüseyin Temuçin · Lab: Arş. Gör. Kevser Özdem Karaca · {activeWeek.tag} · {activeWeek.pdfName} &amp; {activeWeek.labPdfName}
                  </div>
                  <h1 className="text-balance text-2xl font-extrabold leading-tight [overflow-wrap:anywhere] sm:text-3xl">
                    {activeWeek.title}
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    {activeWeek.desc}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSubTab('slides')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white hover:bg-white/20 whitespace-nowrap"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    Görselli Slaytlar (1:1)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubTab('a4')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-red-800 whitespace-nowrap"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    A4 Özet Çıktı
                  </button>
                </div>
              </section>

              {/* Sub-tab Segmented Bar */}
              <div className="no-print flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-2">
                {[
                  { id: 'interactive', label: 'İnteraktif Laboratuvar & Bellek' },
                  { id: 'slides', label: `Görselli PDF Slaytları (${activeWeek.slides.length})` },
                  { id: 'examples', label: `Örnek Çözümleri (${weekExamplesCount})` },
                  { id: 'hap', label: `Hap Bilgiler (${activeWeek.hapBilgiler.length})` },
                  { id: 'quiz', label: `Hızlı Soru Çöz (${activeWeek.quiz.length})` },
                  { id: 'a4', label: 'A4 Özet' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSubTab(tab.id as BM101SubTab)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-colors whitespace-nowrap ${
                      subTab === tab.id
                        ? 'bg-[#0f2342] text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-[#0f2342]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {subTab === 'interactive' && (
                <BM101InteractiveLabs
                  week={activeWeek}
                  onPeekSlide={(pFile, pLabel, sNum) =>
                    handlePeekSlide(pFile, pLabel, sNum, activeWeek.id)
                  }
                />
              )}

              {subTab === 'slides' && (
                <BM101WeekSlideReader
                  week={activeWeek}
                  slideIdx={slideIdx}
                  onChangeSlideIdx={setSlideIdx}
                />
              )}

              {subTab === 'examples' && (
                <BM101SolvedExamples
                  filterWeekId={activeWeek.id}
                  onPeekSlide={handlePeekSlide}
                />
              )}

              {subTab === 'hap' && (
                <BM101HapCards week={activeWeek} onPeekSlide={handlePeekSlide} />
              )}

              {subTab === 'quiz' && (
                <BM101QuickQuiz
                  week={activeWeek}
                  answers={quizAnswers[activeWeek.id] || {}}
                  verified={!!quizVerified[activeWeek.id]}
                  onSelect={(qIdx, oIdx) =>
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [activeWeek.id]: {
                        ...(prev[activeWeek.id] || {}),
                        [qIdx]: oIdx,
                      },
                    }))
                  }
                  onVerify={() =>
                    setQuizVerified((prev) => ({
                      ...prev,
                      [activeWeek.id]: true,
                    }))
                  }
                  onReset={() => {
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [activeWeek.id]: {},
                    }));
                    setQuizVerified((prev) => ({
                      ...prev,
                      [activeWeek.id]: false,
                    }));
                  }}
                  onPeekSlide={handlePeekSlide}
                />
              )}

              {subTab === 'a4' && <BM101WeekA4View week={activeWeek} />}
            </>
          )}

          {topMode === 'examples' && (
            <BM101SolvedExamples onPeekSlide={handlePeekSlide} />
          )}

          {topMode === 'extra' && (
            <BM101ExtraPractice onPeekSlide={handlePeekSlide} />
          )}

          {topMode === 'slides' && (
            <BM101AllSlidesView
              selectedWeekId={allSlidesWeekId}
              selectedSlideIdx={allSlidesIdx}
              onSelectWeek={setAllSlidesWeekId}
              onSelectSlideIdx={setAllSlidesIdx}
            />
          )}

          {topMode === 'a4' && <BM101AllA4View />}

          {topMode === 'exam' && (
            <BM101ExamCenter onPeekSlide={handlePeekSlide} />
          )}
        </main>
      </div>

      <BM101SlidePeekModal
        peek={peekSlide}
        onClose={() => setPeekSlide(null)}
        onOpenFullReader={handleOpenFullReader}
      />

      <ScrollToTopButton />

      <footer className="mt-auto">
        <SehaFooter variant="light" />
      </footer>
    </div>
  );
};
