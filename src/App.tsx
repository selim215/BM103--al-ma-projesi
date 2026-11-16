import { useState } from 'react';
import { BookOpen, Printer } from 'lucide-react';
import { WEEKS } from './data/bm103Data';
import { SubTab, TopMode } from './types/course';
import { InteractiveLabs } from './components/InteractiveLabs';
import { HapCards } from './components/HapCards';
import { QuickQuiz } from './components/QuickQuiz';
import { AllA4View, WeekA4View } from './components/A4Summary';
import { AllSlidesView, WeekSlideReader } from './components/SlideReader';
import { ExamCenter } from './components/ExamCenter';
import { SlidePeekModal } from './components/SlidePeekModal';

export default function App() {
  const [topMode, setTopMode] = useState<TopMode>('learn');
  const [weekId, setWeekId] = useState<string>('w1');
  const [subTab, setSubTab] = useState<SubTab>('interactive');
  const [slideIdx, setSlideIdx] = useState<number>(0);

  const [allSlidesWeekId, setAllSlidesWeekId] = useState<string>('w1');
  const [allSlidesIdx, setAllSlidesIdx] = useState<number>(0);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, Record<number, number>>>({});
  const [quizVerified, setQuizVerified] = useState<Record<string, boolean>>({});

  const [peekSlide, setPeekSlide] = useState<{ weekId: string; slideNum: number } | null>(null);

  const activeWeek = WEEKS.find((w) => w.id === weekId) || WEEKS[0];

  const handleSelectWeek = (id: string) => {
    setWeekId(id);
    setTopMode('learn');
    setSlideIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFullReader = (targetWeekId: string, slideNum: number) => {
    const w = WEEKS.find((x) => x.id === targetWeekId);
    if (!w) return;
    const idx = w.slides.findIndex((s) => s.n === slideNum);
    setAllSlidesWeekId(targetWeekId);
    setAllSlidesIdx(idx >= 0 ? idx : 0);
    setTopMode('slides');
  };

  const handlePeekSlideBySource = (srcLabel: string) => {
    let targetWeekId = 'w1';
    if (srcLabel.includes('Ders Tanıtımı')) targetWeekId = 'w0';
    else {
      const match = srcLabel.match(/Hafta\s*(\d+)/i);
      if (match) targetWeekId = `w${match[1]}`;
    }
    const pageMatch = srcLabel.match(/(?:Sayfa|Slayt)\s*(\d+)/i);
    const slideNum = pageMatch ? parseInt(pageMatch[1], 10) : 1;
    setPeekSlide({ weekId: targetWeekId, slideNum });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Three-Zone Top Bar */}
      <header className="no-print sticky top-0 z-40 border-b-2 border-red-700 bg-[#0f2342] text-white">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-8 px-5 py-3.5">
          {/* Zone 1: Single-element Brand Wordmark */}
          <button
            type="button"
            onClick={() => setTopMode('learn')}
            className="shrink-0 whitespace-nowrap text-left text-lg font-extrabold tracking-tight text-white hover:text-slate-200"
          >
            BM103 Bilgisayar Mühendisliği
          </button>

          {/* Zone 2: 4 single-line text nav links */}
          <nav className="hidden items-center gap-6 md:flex">
            {[
              { id: 'learn', label: 'Haftalık Dersler' },
              { id: 'slides', label: 'PDF Sayfaları' },
              { id: 'a4', label: 'A4 Özetler' },
              { id: 'exam', label: 'Vize Sınav Merkezi' },
            ].map((nav) => {
              const active = topMode === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => setTopMode(nav.id as TopMode)}
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
            { id: 'slides', label: 'PDF Sayfaları' },
            { id: 'a4', label: 'A4 Özet' },
            { id: 'exam', label: 'Vize Sınavları' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => setTopMode(nav.id as TopMode)}
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
      <div className="mx-auto grid max-w-[1380px] grid-cols-1 items-start gap-6 px-5 py-6 lg:grid-cols-[290px_1fr]">
        {/* Sidebar */}
        <aside className="no-print rounded-xl border border-slate-200 bg-white p-4 lg:sticky lg:top-20">
          <div className="mb-3 px-2 text-xs font-bold tracking-wide text-slate-500">
            Vize Konuları ve Haftalar
          </div>

          <div className="space-y-1.5">
            {WEEKS.map((w) => {
              const isSelected = topMode === 'learn' && weekId === w.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => handleSelectWeek(w.id)}
                  className={`flex w-full items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    isSelected
                      ? 'border-[#0f2342]/30 bg-slate-100'
                      : 'border-transparent bg-transparent hover:bg-slate-50'
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
                      {w.pdfName}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <hr className="my-4 border-slate-200" />

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-950">
            <div className="font-bold">Vize Kapsamı ve Kaynak Sadakati</div>
            <p className="mt-1 leading-relaxed text-emerald-900">
              Buradaki tüm modüller vize sınavı kapsamındadır. İçerikler ve hocanın soru metodlarına özel 3 vize senaryosu yalnızca BM103 ders PDF&apos;lerine dayalıdır.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="min-w-0 space-y-5">
          {topMode === 'learn' && (
            <>
              {/* Hero Header Card */}
              <section className="no-print flex flex-wrap items-center justify-between gap-5 rounded-xl bg-[#0f2342] p-6 text-white">
                <div className="max-w-3xl">
                  <div className="mb-1 text-xs font-semibold text-red-300">
                    Doç. Dr. Feyza YILDIRIM OKAY · {activeWeek.tag} · {activeWeek.pdfName}
                  </div>
                  <h1 className="text-balance text-2xl font-extrabold leading-tight sm:text-3xl">
                    {activeWeek.title}
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    {activeWeek.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSubTab('slides')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-white/20 whitespace-nowrap"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    PDF Sayfalarına Git
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubTab('a4')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-700 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-red-800 whitespace-nowrap"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    A4 Özet Çıktı
                  </button>
                </div>
              </section>

              {/* Sub-tab Segmented Bar */}
              <div className="no-print flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-2">
                {[
                  { id: 'interactive', label: 'İnteraktif Konu Anlatımı' },
                  { id: 'hap', label: `Hap Bilgiler (${activeWeek.hapBilgiler.length})` },
                  { id: 'quiz', label: `Hızlı Soru Çöz (${activeWeek.quiz.length})` },
                  { id: 'a4', label: 'Kapsamlı Özet (A4/PDF)' },
                  { id: 'slides', label: `PDF Sayfaları (${activeWeek.slides.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSubTab(tab.id as SubTab)}
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

              {/* Active Sub-tab Content */}
              {subTab === 'interactive' && (
                <InteractiveLabs
                  week={activeWeek}
                  onPeekSlide={(wId, sNum) => setPeekSlide({ weekId: wId, slideNum: sNum })}
                  onJumpToWeek={(targetId) => handleSelectWeek(targetId)}
                />
              )}

              {subTab === 'hap' && (
                <HapCards
                  week={activeWeek}
                  onPeekSlide={(wId, sNum) => setPeekSlide({ weekId: wId, slideNum: sNum })}
                />
              )}

              {subTab === 'quiz' && (
                <QuickQuiz
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
                />
              )}

              {subTab === 'a4' && <WeekA4View week={activeWeek} />}

              {subTab === 'slides' && (
                <WeekSlideReader
                  week={activeWeek}
                  slideIdx={slideIdx}
                  onChangeSlideIdx={setSlideIdx}
                />
              )}
            </>
          )}

          {topMode === 'slides' && (
            <AllSlidesView
              selectedWeekId={allSlidesWeekId}
              selectedSlideIdx={allSlidesIdx}
              onSelectWeek={setAllSlidesWeekId}
              onSelectSlideIdx={setAllSlidesIdx}
            />
          )}

          {topMode === 'a4' && <AllA4View />}

          {topMode === 'exam' && (
            <ExamCenter onPeekSlideBySource={handlePeekSlideBySource} />
          )}
        </main>
      </div>

      <SlidePeekModal
        peek={peekSlide}
        onClose={() => setPeekSlide(null)}
        onOpenFullReader={handleOpenFullReader}
      />
    </div>
  );
}
