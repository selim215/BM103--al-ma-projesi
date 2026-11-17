import React from 'react';
import { Cpu, Code2, ShieldCheck, ArrowRight, Layers, Terminal } from 'lucide-react';
import { CourseChoice } from '../types/bm101';
import { SehaFooter } from './SiteFooterAndScrollTop';

interface CourseSelectorModalProps {
  open: boolean;
  currentCourse: CourseChoice | null;
  onSelectCourse: (course: CourseChoice) => void;
  onClose?: () => void;
}

export const CourseSelectorModal: React.FC<CourseSelectorModalProps> = ({
  open,
  currentCourse,
  onSelectCourse,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-selector-title"
    >
      <div className="my-auto flex w-full max-w-4xl flex-col items-center">
        <div className="w-full overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 text-white shadow-2xl">
        {/* Top Accent Header */}
        <div className="border-b border-slate-800 bg-[#0f2342] px-6 py-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-red-300">
                <ShieldCheck className="h-4 w-4" />
                Gazi Üniversitesi · İnteraktif Vize & Ders Platformu
              </div>
              <h1
                id="course-selector-title"
                className="mt-1 text-xl font-extrabold tracking-tight text-white sm:text-2xl"
              >
                Hangi ders ile devam etmek istiyorsunuz?
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Her iki dersin PDF slaytları, laboratuvar simülasyonları ve vize sınav senaryoları birbirinden tamamen bağımsızdır.
              </p>
            </div>
            {currentCourse && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-white/20"
              >
                Mevcut Derse Dön ({currentCourse.toUpperCase()})
              </button>
            )}
          </div>
        </div>

        {/* Two Isolated Course Cards */}
        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 sm:p-8">
          {/* BM103 Card */}
          <button
            type="button"
            onClick={() => onSelectCourse('bm103')}
            className={`group flex flex-col justify-between rounded-xl border p-6 text-left transition-all ${
              currentCourse === 'bm103'
                ? 'border-red-500 bg-slate-800/90 ring-2 ring-red-500/40'
                : 'border-slate-700 bg-slate-800/60 hover:border-red-500/80 hover:bg-slate-800'
            }`}
          >
            <div>
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg bg-red-700/20 px-3 py-1.5 font-mono text-xs font-extrabold text-red-300">
                  <Cpu className="h-4 w-4" />
                  BM103
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  7 Haftalık Müfredat
                </span>
              </div>

              <h2 className="text-lg font-extrabold text-white group-hover:text-red-200">
                Bilgisayar Mühendisliğinin Temelleri
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Doç. Dr. Feyza YILDIRIM OKAY
              </p>

              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-slate-300">
                <li className="flex items-start gap-2">
                  <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                  <span>Donanım, Boole Cebri & Lojik Kapılar, Algoritmalar, İşletim Sistemleri, Mikroişlemciler</span>
                </li>
                <li className="flex items-start gap-2">
                  <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                  <span>D/Y + Test + Klasik formatında 3 özel Vize Senaryosu</span>
                </li>
                <li className="flex items-start gap-2">
                  <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                  <span>İnteraktif taban dönüşümü, lojik kapı & CPU laboratuvarları</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-700/80 pt-4 text-sm font-bold text-white group-hover:text-red-300">
              <span>BM103 ile Devam Et</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* BM101 Card */}
          <button
            type="button"
            onClick={() => onSelectCourse('bm101')}
            className={`group flex flex-col justify-between rounded-xl border p-6 text-left transition-all ${
              currentCourse === 'bm101'
                ? 'border-sky-400 bg-slate-800/90 ring-2 ring-sky-400/40'
                : 'border-slate-700 bg-slate-800/60 hover:border-sky-400/80 hover:bg-slate-800'
            }`}
          >
            <div>
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg bg-sky-500/20 px-3 py-1.5 font-mono text-xs font-extrabold text-sky-300">
                  <Code2 className="h-4 w-4" />
                  BM101
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  6 Ders + 6 Lab PDF (12 Kaynak)
                </span>
              </div>

              <h2 className="text-lg font-extrabold text-white group-hover:text-sky-200">
                Bilgisayar Programlama I (C Dili)
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Teorik: Dr. Hüseyin TEMUÇİN · Lab: Arş. Gör. Kevser Özdem KARACA
              </p>

              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-slate-300">
                <li className="flex items-start gap-2">
                  <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
                  <span>Slayt görselleriyle birebir yan yana açıklama ve özet</span>
                </li>
                <li className="flex items-start gap-2">
                  <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
                  <span>Adım adım Function Call Stack, Bellek Değerleri & Özyineleme (Recursion) simülatörü</span>
                </li>
                <li className="flex items-start gap-2">
                  <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
                  <span>Tüm slayt örneklerinin çözümleri, Harici Sorular & 3 soruluk Vize (Çıktı, Kodlama, Bellek)</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-700/80 pt-4 text-sm font-bold text-white group-hover:text-sky-300">
              <span>BM101 ile Devam Et</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>

        <div className="border-t border-slate-800 bg-[#0f2342]/80 px-6 py-3.5 text-center text-xs text-slate-300">
          <div>
            İstediğiniz zaman sol menüden &ldquo;Ders Değiştir&rdquo; butonunu kullanarak BM103 ve BM101 arasında geçiş yapabilirsiniz.
          </div>
          <SehaFooter variant="dark" compact />
        </div>
        </div>
      </div>
    </div>
  );
};
