import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Printer,
  ArrowLeftRight,
  Sigma,
  Award,
  CheckCircle2,
  Check,
  ChevronRight,
  Flag,
  AlertTriangle,
  MapPin,
} from 'lucide-react';
import { LECTURE_NOTES_LABEL, MAT101_MODULES } from '../data/mat101Modules';
import { MAT101SubTab, MAT101TopMode } from '../types/mat101';
import { MAT101InteractiveLabs } from './MAT101InteractiveLabs';
import { MAT101PastMidtermSolver } from './MAT101PastMidtermSolver';
import { MAT101AllSlidesView, MAT101ModuleSlideReader } from './MAT101LectureReader';
import {
  MAT101AllA4View,
  MAT101HapCards,
  MAT101QuickQuiz,
  MAT101WeekA4View,
} from './MAT101HapAndQuizAndA4';
import { MAT101SlidePeekModal, MAT101SlidePeekTarget } from './MAT101SlidePeekModal';
import { ScrollToTopButton, SehaFooter } from './SiteFooterAndScrollTop';
import { YoutubeLogoIcon } from './YoutubeVideoLink';
import { MAT101VideoPlaylistView } from './MAT101VideoPlaylistView';

interface MAT101WorkspaceProps {
  onOpenCourseSelector: () => void;
}

const COMPLETED_STORAGE_KEY = 'mat101_completed_modules_v1';
const LAST_MODULE_STORAGE_KEY = 'mat101_last_module_v1';

export const MAT101Workspace: React.FC<MAT101WorkspaceProps> = ({
  onOpenCourseSelector,
}) => {
  const [topMode, setTopMode] = useState<MAT101TopMode>('learn');
  const [moduleId, setModuleId] = useState<string>(() => {
    try {
      const saved = window.localStorage.getItem(LAST_MODULE_STORAGE_KEY);
      if (saved && MAT101_MODULES.some((m) => m.id === saved)) {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'm1';
  });
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem(COMPLETED_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (id): id is string =>
              typeof id === 'string' && MAT101_MODULES.some((m) => m.id === id)
          );
        }
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [subTab, setSubTab] = useState<MAT101SubTab>('interactive');
  const [slideIdx, setSlideIdx] = useState<number>(0);

  const [allSlidesModuleId, setAllSlidesModuleId] = useState<string>('m1');
  const [allSlidesIdx, setAllSlidesIdx] = useState<number>(0);
  const [directPdfPage, setDirectPdfPage] = useState<number | undefined>(undefined);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, Record<number, number>>>({});
  const [quizVerified, setQuizVerified] = useState<Record<string, boolean>>({});
  const [peekSlide, setPeekSlide] = useState<MAT101SlidePeekTarget | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedModules));
    } catch {
      // ignore storage errors
    }
  }, [completedModules]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LAST_MODULE_STORAGE_KEY, moduleId);
    } catch {
      // ignore storage errors
    }
  }, [moduleId]);

  const activeIndex = Math.max(
    0,
    MAT101_MODULES.findIndex((m) => m.id === moduleId)
  );
  const activeModule = MAT101_MODULES[activeIndex] || MAT101_MODULES[0];
  const nextModule =
    activeIndex + 1 < MAT101_MODULES.length ? MAT101_MODULES[activeIndex + 1] : null;
  const isModuleCompleted = completedModules.includes(activeModule.id);

  const progressStats = useMemo(() => {
    const midtermModules = MAT101_MODULES.filter((m) => m.midtermScope !== 'after-midterm');
    const midtermCompleted = midtermModules.filter((m) =>
      completedModules.includes(m.id)
    ).length;
    const totalCompleted = completedModules.length;
    const midtermPercent = Math.round((midtermCompleted / midtermModules.length) * 100);
    const totalPercent = Math.round((totalCompleted / MAT101_MODULES.length) * 100);
    return {
      midtermTotal: midtermModules.length,
      midtermCompleted,
      midtermPercent,
      totalModules: MAT101_MODULES.length,
      totalCompleted,
      totalPercent,
    };
  }, [completedModules]);

  const toggleModuleComplete = (id: string) => {
    setCompletedModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectModule = (id: string) => {
    setModuleId(id);
    setTopMode('learn');
    setSlideIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePeekSlide = (
    pdfFile: string,
    pdfLabel: string,
    slideNum: number,
    targetModuleId?: string
  ) => {
    setPeekSlide({
      pdfFile,
      pdfLabel,
      slideNum,
      moduleId: targetModuleId,
    });
  };

  const handleOpenFullReader = (targetModuleId: string, pageNum: number) => {
    const mod = MAT101_MODULES.find((m) => m.id === targetModuleId);
    const idx = mod ? mod.slides.findIndex((s) => s.n === pageNum) : -1;
    setAllSlidesModuleId(targetModuleId);
    if (idx >= 0) {
      setAllSlidesIdx(idx);
      setDirectPdfPage(undefined);
    } else {
      setDirectPdfPage(pageNum);
    }
    setTopMode('slides');
  };

  const handleNavigateFromPlaylist = (targetModuleId: string, slidePage?: number) => {
    setModuleId(targetModuleId);
    setTopMode('learn');
    setSubTab('interactive');
    if (slidePage) {
      const mod = MAT101_MODULES.find((m) => m.id === targetModuleId);
      const idx = mod ? mod.slides.findIndex((s) => s.n === slidePage) : -1;
      setSlideIdx(idx >= 0 ? idx : 0);
    } else {
      setSlideIdx(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#FAF6F0] text-[#09251C]">
      {/* Three-Zone Top Bar */}
      <header className="no-print sticky top-0 z-40 border-b-2 border-[#A55704] bg-[#09251C] text-[#F8EADC]">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-5 py-3.5 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => setTopMode('learn')}
            className="min-w-0 truncate text-left text-base font-extrabold tracking-tight text-[#F8EADC] hover:text-[#F3D2AF] sm:text-lg"
          >
            MAT101 Matematik I (Calculus)
          </button>

          {/* Zone 2: Single-line Nav Links */}
          <nav className="hidden items-center gap-5 md:flex">
            {[
              { id: 'learn', label: 'Konu Anlatımı' },
              { id: 'midterms', label: 'Çıkmış Vize Çözümleri' },
              { id: 'slides', label: 'Lecture Notes (PDF)' },
              { id: 'a4', label: 'A4 Özetler' },
              { id: 'videos', label: 'Video Dersler', isVideo: true },
            ].map((nav) => {
              const active = topMode === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => setTopMode(nav.id as MAT101TopMode)}
                  className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 py-1 text-sm font-semibold transition-colors ${
                    active
                      ? 'border-[#F3D2AF] text-[#F8EADC]'
                      : 'border-transparent text-[#F8EADC]/75 hover:border-[#F3D2AF]/60 hover:text-[#F8EADC]'
                  }`}
                >
                  {nav.isVideo && <YoutubeLogoIcon className="h-3.5 w-3.5" />}
                  <span>{nav.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setTopMode('midterms')}
              className="shrink-0 whitespace-nowrap rounded-lg bg-[#A55704] px-4 py-2 text-xs font-bold text-[#F8EADC] transition-colors hover:bg-[#894603]"
            >
              Çıkmış Vize Çöz
            </button>
          </div>
        </div>

        {/* Mobile Nav Strip */}
        <div className="flex items-center gap-4 overflow-x-auto border-t border-[#F3D2AF]/15 px-5 py-2 md:hidden">
          {[
            { id: 'learn', label: 'Konular' },
            { id: 'midterms', label: 'Çıkmış Vizeler' },
            { id: 'slides', label: 'Lecture Notes' },
            { id: 'a4', label: 'A4 Özetler' },
            { id: 'videos', label: 'Video Dersler', isVideo: true },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => setTopMode(nav.id as MAT101TopMode)}
              className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold ${
                topMode === nav.id ? 'text-[#F3D2AF] underline underline-offset-4' : 'text-[#F8EADC]/75'
              }`}
            >
              {nav.isVideo && <YoutubeLogoIcon className="h-3.5 w-3.5" />}
              <span>{nav.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main App Shell */}
      <div className="mx-auto grid w-full max-w-[1380px] flex-1 grid-cols-1 items-start gap-6 px-4 py-6 sm:px-5 lg:grid-cols-[290px_1fr]">
        {/* Sidebar */}
        <aside className="no-print sidebar-scroll rounded-xl border border-[#09251C]/15 bg-[#F5ECE0] p-4 shadow-sm lg:sticky lg:top-20 lg:max-h-[calc(100vh-6.25rem)] lg:overflow-y-auto lg:overscroll-contain">
          {/* Course Switcher Box */}
          <div className="mb-3 rounded-lg border border-emerald-300/80 bg-white p-3 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#09251C]">
                <Sigma className="h-3.5 w-3.5 text-emerald-700" />
                Aktif Ders: MAT101
              </span>
              <button
                type="button"
                onClick={onOpenCourseSelector}
                className="inline-flex items-center gap-1 rounded-md border border-[#09251C]/20 bg-[#FAF6F0] px-2 py-1 text-[11px] font-bold text-[#09251C] hover:bg-[#09251C] hover:text-[#F8EADC]"
              >
                <ArrowLeftRight className="h-3 w-3" />
                Ders Değiştir
              </button>
            </div>
          </div>

          {/* Compact Sidebar Progress Summary */}
          <div className="mb-4 rounded-lg border border-[#09251C]/10 bg-white p-3">
            <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-[#09251C]">
              <span>Vize İlerlemesi</span>
              <span className="font-mono text-emerald-700">
                {progressStats.midtermCompleted}/{progressStats.midtermTotal} ({progressStats.midtermPercent}%)
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#FAF6F0]">
              <div
                className="h-full rounded-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${progressStats.midtermPercent}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
              <span>Kaldığın Yer: {activeModule.tag}</span>
              <span>Genel: {progressStats.totalCompleted}/{progressStats.totalModules}</span>
            </div>
          </div>

          <div className="mb-2.5 px-1 text-xs font-bold tracking-wide text-[#09251C]/70">
            Vize Kapsamı (Yüksek Mertebeden Türeve Kadar)
          </div>

          <div className="space-y-1.5">
            {MAT101_MODULES.map((m, idx) => {
              const isSelected = topMode === 'learn' && moduleId === m.id;
              const isDone = completedModules.includes(m.id);
              const isFirstAfterMidterm =
                m.midtermScope === 'after-midterm' &&
                (idx === 0 || MAT101_MODULES[idx - 1].midtermScope !== 'after-midterm');

              return (
                <React.Fragment key={m.id}>
                  {isFirstAfterMidterm && (
                    <div className="pt-3 pb-1">
                      <div className="flex items-center gap-2 border-t border-dashed border-[#A55704]/50 pt-2.5">
                        <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#A55704]">
                          Vize Sınırı Sonrası (Vizede Yok)
                        </span>
                      </div>
                      <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                        Yüksek Mertebeden Türevler sonrası final içindir.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleSelectModule(m.id)}
                    className={`flex w-full items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? 'border-[#A55704]/45 bg-white shadow-xs'
                        : isDone
                        ? 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-300 hover:bg-white'
                        : m.midtermScope === 'after-midterm'
                        ? 'border-transparent bg-white/45 opacity-85 hover:border-[#09251C]/20 hover:bg-white hover:opacity-100'
                        : 'border-transparent bg-white/65 hover:border-[#A55704]/25 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`mt-0.5 shrink-0 whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-bold ${
                        isSelected
                          ? 'bg-[#A55704] text-[#F8EADC]'
                          : isDone
                          ? 'bg-emerald-700 text-white'
                          : m.midtermScope === 'after-midterm'
                          ? 'bg-slate-500 text-white'
                          : 'bg-[#09251C] text-[#F8EADC]'
                      }`}
                    >
                      {m.tag}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-1.5">
                        <span className="block text-sm font-bold leading-snug text-[#09251C]">
                          {m.title}
                        </span>
                        {isDone && (
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                            aria-label="Tamamlandı"
                          />
                        )}
                      </span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="truncate">
                          {m.chapterLabel} · {m.pageRange}
                        </span>
                        {m.midtermScope === 'partial' && (
                          <span className="rounded bg-[#F3D2AF]/70 px-1.5 py-0.5 text-[10px] font-bold text-[#7C3F02]">
                            Son Konu: Yük. Mer. Türev
                          </span>
                        )}
                        {m.midtermScope === 'after-midterm' && (
                          <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                            Vize Dışı
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          <hr className="my-4 border-[#09251C]/10" />

          {/* Quick Action Shortcut for Past Midterms */}
          <div className="mb-4 grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => setTopMode('midterms')}
              className={`rounded-lg border px-2.5 py-2 text-xs font-bold transition-colors ${
                topMode === 'midterms'
                  ? 'border-[#A55704] bg-[#A55704] text-[#F8EADC]'
                  : 'border-[#A55704]/30 bg-[#F8EADC]/60 text-[#7C3F02] hover:bg-[#F3D2AF]/60'
              }`}
            >
              6 Çıkmış Vize
            </button>
            <button
              type="button"
              onClick={() => setTopMode('a4')}
              className={`rounded-lg border px-2.5 py-2 text-xs font-bold transition-colors ${
                topMode === 'a4'
                  ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                  : 'border-[#09251C]/15 bg-white text-[#09251C] hover:bg-[#FAF6F0]'
              }`}
            >
              Tüm A4 Özet
            </button>
          </div>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-950">
            <div className="font-bold">İzole MAT101 Kaynak Garantisi</div>
            <p className="mt-1 leading-relaxed text-emerald-900">
              Bu bölümde yalnızca yüklenen 210 sayfalık Lecture Notes ve 2022–2025 arası 6 çıkmış MAT101 vize PDF&apos;i kullanılır. BM103/BM101 içerikleri karıştırılmaz.
            </p>
          </div>

          <div className="mt-2.5 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-950">
            <div className="font-bold">Vize Kapsamı &amp; Sınav Uyarısı</div>
            <p className="mt-1 leading-relaxed text-amber-900">
              Vizede sorulacak <strong>son konu Yüksek Mertebeden Türevler</strong>&apos;dir (Modül 5 · s. 117–118). Sonrasındaki konular vizede yoktur. İçerikler yardımcı amaçlıdır; kesinlik içermez.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 space-y-5">
          {/* Top Extra Area: Clickable Strip to Open Ordered Calculus-1 Video Playlist */}
          {topMode !== 'videos' && (
            <button
              type="button"
              onClick={() => {
                setTopMode('videos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="no-print group flex w-full flex-wrap items-center justify-between gap-3 rounded-xl border border-[#A55704]/30 bg-white px-4 py-3 text-left shadow-xs transition-all hover:border-[#A55704]/70 hover:bg-[#F8EADC]/45"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#A55704]/25 bg-[#F8EADC]">
                  <YoutubeLogoIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#09251C] sm:text-sm">
                    <span>Kalkülüs 1 Sıralı Video Ders Listesi (122 Video)</span>
                    <span className="rounded bg-[#F3D2AF] px-2 py-0.5 text-[10px] font-extrabold text-[#7C3F02]">
                      + Yüksek Mertebe Türevler (VİZE SON YER)
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-600">
                    Tüm oynatma listesindeki videoları konu başlıklarıyla sırayla gör; ilgili videoya veya MAT101 konusuna doğrudan geç.
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#A55704] px-3.5 py-2 text-xs font-bold text-[#F8EADC] transition-colors group-hover:bg-[#894603]">
                <span>Listeyi Aç</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </button>
          )}

          {topMode === 'learn' && (
            <>
              {/* Visual Progress Bar & Where-You-Left-Off Tracker */}
              <section className="no-print rounded-xl border border-[#09251C]/10 bg-white p-4 shadow-xs sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-[#09251C]">
                        <MapPin className="h-3.5 w-3.5 text-[#A55704]" />
                        Çalışma İlerlemesi &amp; Kaldığın Yer
                      </span>
                      <span className="rounded bg-[#FAF6F0] px-2 py-0.5 text-[11px] font-bold text-[#09251C]">
                        Şu an: {activeModule.tag} ({activeIndex + 1}/{MAT101_MODULES.length})
                      </span>
                      {isModuleCompleted && (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                          <CheckCircle2 className="h-3 w-3" />
                          Bu Bölüm Tamamlandı
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-600">
                      Vize kapsamı (Modül 1–5 · Yüksek Mertebeden Türevler dahil):{' '}
                      <strong className="text-emerald-800">
                        {progressStats.midtermCompleted} / {progressStats.midtermTotal} bölüm (%{progressStats.midtermPercent})
                      </strong>{' '}
                      · Tüm müfredat: {progressStats.totalCompleted} / {progressStats.totalModules} (%{progressStats.totalPercent})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleModuleComplete(activeModule.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                        isModuleCompleted
                          ? 'border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'border-[#09251C]/20 bg-[#FAF6F0] text-[#09251C] hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-800'
                      }`}
                    >
                      {isModuleCompleted ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Tamamlandı
                        </>
                      ) : (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Bölümü Tamamla
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Overall Visual Bar */}
                <div className="mt-3">
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#FAF6F0]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#09251C] via-[#A55704] to-emerald-600 transition-all duration-300"
                      style={{ width: `${progressStats.totalPercent}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Segment Steps (Where You Left Off + Midterm Cutoff Marker) */}
                <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-7">
                  {MAT101_MODULES.map((m) => {
                    const isDone = completedModules.includes(m.id);
                    const isCurrent = m.id === activeModule.id;
                    const isAfterMidterm = m.midtermScope === 'after-midterm';

                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectModule(m.id)}
                        className={`group flex flex-col justify-between rounded-lg border px-2.5 py-2 text-left transition-all ${
                          isCurrent
                            ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC] shadow-xs'
                            : isDone
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-950 hover:border-emerald-500'
                            : isAfterMidterm
                            ? 'border-dashed border-slate-300 bg-[#FAF6F0] text-slate-600 hover:border-slate-400'
                            : 'border-[#09251C]/15 bg-white text-[#09251C] hover:border-[#A55704]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[11px] font-extrabold">{m.tag}</span>
                          {isDone ? (
                            <CheckCircle2
                              className={`h-3.5 w-3.5 shrink-0 ${
                                isCurrent ? 'text-emerald-300' : 'text-emerald-600'
                              }`}
                            />
                          ) : isCurrent ? (
                            <span className="h-2 w-2 rounded-full bg-[#F3D2AF]" />
                          ) : null}
                        </div>
                        <div
                          className={`mt-1 truncate text-[10px] font-semibold ${
                            isCurrent
                              ? 'text-[#F3D2AF]'
                              : m.midtermScope === 'partial'
                              ? 'text-[#A55704]'
                              : isAfterMidterm
                              ? 'text-slate-400'
                              : 'text-slate-500'
                          }`}
                        >
                          {isCurrent
                            ? 'Kaldığın Yer'
                            : m.midtermScope === 'partial'
                            ? 'Vize Son Konu'
                            : isAfterMidterm
                            ? 'Vize Dışı'
                            : 'Vize Dahil'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Hero Header Card */}
              <section className="no-print rounded-xl bg-[#09251C] p-6 text-[#F8EADC]">
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div className="min-w-0 max-w-3xl">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#F3D2AF] [overflow-wrap:anywhere]">
                      <span>
                        MAT101 Matematik I · {activeModule.tag} · {activeModule.chapterLabel} · {LECTURE_NOTES_LABEL} ({activeModule.pageRange})
                      </span>
                      {activeModule.midtermScope === 'full' && (
                        <span className="rounded bg-emerald-500/25 px-2 py-0.5 text-[11px] font-bold text-emerald-200">
                          Tamamı Vize Dahili
                        </span>
                      )}
                      {activeModule.midtermScope === 'partial' && (
                        <span className="rounded bg-[#A55704]/35 px-2 py-0.5 text-[11px] font-bold text-[#F3D2AF]">
                          Vize Sınırı: Yüksek Mertebeden Türevler (s. 117–118)
                        </span>
                      )}
                      {activeModule.midtermScope === 'after-midterm' && (
                        <span className="rounded bg-white/15 px-2 py-0.5 text-[11px] font-bold text-[#F8EADC]/80">
                          Vize Dışı · Final Kapsamı
                        </span>
                      )}
                    </div>
                    <h1 className="text-balance text-2xl font-extrabold leading-tight [overflow-wrap:anywhere] sm:text-3xl">
                      {activeModule.title}
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-[#F8EADC]/80">
                      {activeModule.desc}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => setTopMode('midterms')}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-emerald-400/40 bg-emerald-500/20 px-3.5 py-2 text-xs font-bold text-emerald-100 hover:bg-emerald-500/30"
                    >
                      <Award className="h-3.5 w-3.5" />
                      Çıkmış Vize Çöz
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubTab('slides')}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#F3D2AF]/30 bg-white/10 px-3.5 py-2 text-xs font-bold text-[#F8EADC] hover:bg-white/20"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Lecture Notes (PDF)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubTab('a4')}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#A55704] px-3.5 py-2 text-xs font-bold text-[#F8EADC] hover:bg-[#894603]"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      A4 Özet Çıktı
                    </button>
                  </div>
                </div>

                {activeModule.midtermCutoffNote && (
                  <div
                    className={`mt-4 flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs leading-relaxed ${
                      activeModule.midtermScope === 'partial'
                        ? 'border-[#F3D2AF]/35 bg-[#A55704]/25 text-[#F8EADC]'
                        : 'border-[#F3D2AF]/25 bg-white/10 text-[#F8EADC]/85'
                    }`}
                  >
                    {activeModule.midtermScope === 'partial' ? (
                      <Flag className="mt-0.5 h-4 w-4 shrink-0 text-[#F3D2AF]" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#F3D2AF]" />
                    )}
                    <span>{activeModule.midtermCutoffNote}</span>
                  </div>
                )}
              </section>

              {/* Sub-tab Segmented Bar */}
              <div className="no-print flex flex-wrap gap-1.5 rounded-xl border border-[#09251C]/10 bg-white p-2">
                {[
                  { id: 'interactive', label: 'İnteraktif Konu Anlatımı' },
                  { id: 'hap', label: `Hap Bilgiler (${activeModule.hapBilgiler.length})` },
                  { id: 'quiz', label: `Hızlı Soru Çöz (${activeModule.quiz.length})` },
                  { id: 'a4', label: 'A4 Özet' },
                  { id: 'slides', label: `Lecture Notes (${activeModule.slides.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSubTab(tab.id as MAT101SubTab)}
                    className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
                      subTab === tab.id
                        ? 'bg-[#09251C] text-[#F8EADC]'
                        : 'text-slate-600 hover:bg-[#FAF6F0] hover:text-[#09251C]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {subTab === 'interactive' && (
                <MAT101InteractiveLabs
                  module={activeModule}
                  onPeekSlide={(pFile, pLabel, sNum, mId) =>
                    handlePeekSlide(pFile, pLabel, sNum, mId)
                  }
                  onJumpToMidterms={() => setTopMode('midterms')}
                />
              )}

              {subTab === 'hap' && (
                <MAT101HapCards
                  module={activeModule}
                  onPeekSlide={handlePeekSlide}
                />
              )}

              {subTab === 'quiz' && (
                <MAT101QuickQuiz
                  module={activeModule}
                  answers={quizAnswers[activeModule.id] || {}}
                  verified={!!quizVerified[activeModule.id]}
                  onSelect={(qIdx, oIdx) =>
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [activeModule.id]: {
                        ...(prev[activeModule.id] || {}),
                        [qIdx]: oIdx,
                      },
                    }))
                  }
                  onVerify={() =>
                    setQuizVerified((prev) => ({
                      ...prev,
                      [activeModule.id]: true,
                    }))
                  }
                  onReset={() => {
                    setQuizAnswers((prev) => ({
                      ...prev,
                      [activeModule.id]: {},
                    }));
                    setQuizVerified((prev) => ({
                      ...prev,
                      [activeModule.id]: false,
                    }));
                  }}
                  onPeekSlide={handlePeekSlide}
                />
              )}

              {subTab === 'a4' && <MAT101WeekA4View module={activeModule} />}

              {subTab === 'slides' && (
                <MAT101ModuleSlideReader
                  module={activeModule}
                  slideIdx={slideIdx}
                  onChangeSlideIdx={setSlideIdx}
                />
              )}

              {/* End-of-Section Completion Checkmark Bar */}
              <section
                className={`no-print flex flex-wrap items-center justify-between gap-4 rounded-xl border p-5 transition-colors ${
                  isModuleCompleted
                    ? 'border-emerald-300 bg-emerald-50/80'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex min-w-0 items-start gap-3">
                  <button
                    type="button"
                    onClick={() => toggleModuleComplete(activeModule.id)}
                    aria-pressed={isModuleCompleted}
                    aria-label={`${activeModule.tag} bölümünü tamamlandı olarak işaretle`}
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
                      isModuleCompleted
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-slate-50 text-slate-400 hover:border-emerald-500 hover:text-emerald-600'
                    }`}
                  >
                    <Check className="h-5 w-5 stroke-[2.75]" />
                  </button>
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-[#09251C]">
                      {isModuleCompleted
                        ? `${activeModule.tag} Tamamlandı`
                        : `${activeModule.tag} Bölüm Sonu Kontrolü`}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600">
                      {isModuleCompleted
                        ? 'Bu modülü tamamladınız. İlerlemeniz kaydedildi; isterseniz işareti kaldırabilir veya sıradaki bölüme geçebilirsiniz.'
                        : activeModule.midtermScope === 'partial'
                        ? 'Yüksek Mertebeden Türevler (s. 117–118) dahil vize konularını bitirdiyseniz işaretleyin.'
                        : 'Bu bölümdeki konuları ve soruları tamamladığınızda işaretleyerek ilerleme çubuğunu güncelleyin.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggleModuleComplete(activeModule.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-extrabold transition-colors ${
                      isModuleCompleted
                        ? 'border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'border border-[#09251C] bg-[#09251C] text-[#F8EADC] hover:bg-[#0f3a2c]'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isModuleCompleted ? 'Tamamlandı ✓ (Kaldır)' : 'Bölümü Tamamladım ✓'}
                  </button>

                  {nextModule && (
                    <button
                      type="button"
                      onClick={() => handleSelectModule(nextModule.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#09251C]/20 bg-white px-4 py-2.5 text-xs font-bold text-[#09251C] hover:bg-[#FAF6F0]"
                    >
                      <span>
                        Sonraki: {nextModule.tag}
                        {nextModule.midtermScope === 'after-midterm' ? ' (Vize Dışı)' : ''}
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </section>
            </>
          )}

          {topMode === 'midterms' && (
            <MAT101PastMidtermSolver
              onPeekSlide={(pFile, pLabel, sNum) => handlePeekSlide(pFile, pLabel, sNum)}
            />
          )}

          {topMode === 'slides' && (
            <MAT101AllSlidesView
              selectedModuleId={allSlidesModuleId}
              selectedSlideIdx={allSlidesIdx}
              directPageNum={directPdfPage}
              onSelectModule={setAllSlidesModuleId}
              onSelectSlideIdx={setAllSlidesIdx}
            />
          )}

          {topMode === 'a4' && <MAT101AllA4View />}

          {topMode === 'videos' && (
            <MAT101VideoPlaylistView
              onNavigateToTopic={handleNavigateFromPlaylist}
              onBackToLearn={() => setTopMode('learn')}
            />
          )}
        </main>
      </div>

      <MAT101SlidePeekModal
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
