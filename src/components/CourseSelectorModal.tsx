import React from 'react';
import { Cpu, Code2, ShieldCheck, ArrowRight, Layers, Terminal, Sigma, Award } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-[#0b120f]/85 p-4 backdrop-blur-3xl sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-selector-title"
    >
      <div className="my-auto flex w-full max-w-6xl flex-col items-center">
        <div className="w-full overflow-hidden rounded-2xl border border-[#A55704]/65 bg-[#09251C] text-[#F8EADC] shadow-2xl">
          {/* Top Accent Header */}
          <div className="border-b border-[#A55704]/45 bg-[#061a13] px-6 py-5 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#F3D2AF]">
                  <ShieldCheck className="h-4 w-4 text-[#F3D2AF]" />
                  Gazi Üniversitesi · İnteraktif Vize &amp; Ders Platformu
                </div>
                <h1
                  id="course-selector-title"
                  className="mt-1 text-xl font-extrabold tracking-tight text-[#F8EADC] sm:text-2xl"
                >
                  Hangi ders ile devam etmek istiyorsunuz?
                </h1>
                <p className="mt-1 text-sm text-[#F3D2AF]/85">
                  Tüm derslerin PDF kaynakları, interaktif laboratuvarları ve vize soru çözümleri birbirinden tamamen bağımsızdır.
                </p>
              </div>
              {currentCourse && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-[#F3D2AF]/40 bg-[#A55704] px-3.5 py-2 text-xs font-bold text-[#F8EADC] transition-colors hover:bg-[#F3D2AF] hover:text-[#09251C]"
                >
                  Mevcut Derse Dön ({currentCourse.toUpperCase()})
                </button>
              )}
            </div>
          </div>

          {/* Three Isolated Course Cards */}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-3 sm:p-8">
            {/* BM103 Card */}
            <button
              type="button"
              onClick={() => onSelectCourse('bm103')}
              className={`group flex flex-col justify-between rounded-xl border p-5 text-left transition-all ${
                currentCourse === 'bm103'
                  ? 'border-red-400 bg-[#0f3629] ring-2 ring-red-400/40'
                  : 'border-[#A55704]/45 bg-[#0d2f24] hover:border-red-400/80 hover:bg-[#123c2e]'
              }`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-red-500/35 bg-red-700/25 px-3 py-1.5 font-mono text-xs font-extrabold text-red-300">
                    <Cpu className="h-4 w-4" />
                    BM103
                  </span>
                  <span className="text-xs font-semibold text-[#F3D2AF]/80">
                    7 Haftalık Müfredat
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-[#F8EADC] group-hover:text-red-200">
                  Bilgisayar Mühendisliğinin Temelleri
                </h2>
                <p className="mt-1 text-xs font-medium text-[#F3D2AF]/80">
                  Doç. Dr. Feyza YILDIRIM OKAY
                </p>

                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[#F8EADC]/90">
                  <li className="flex items-start gap-2">
                    <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                    <span>Donanım, Boole Cebri &amp; Lojik Kapılar, Algoritmalar, İşletim Sistemleri, Mikroişlemciler</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                    <span>D/Y + Test + Klasik formatında 3 özel Vize Senaryosu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                    <span>İnteraktif taban dönüşümü, lojik kapı &amp; CPU laboratuvarları</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#A55704]/40 pt-4 text-sm font-bold text-[#F3D2AF] group-hover:text-red-300">
                <span>BM103 ile Devam Et</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* BM101 Card */}
            <button
              type="button"
              onClick={() => onSelectCourse('bm101')}
              className={`group flex flex-col justify-between rounded-xl border p-5 text-left transition-all ${
                currentCourse === 'bm101'
                  ? 'border-sky-400 bg-[#0f3629] ring-2 ring-sky-400/40'
                  : 'border-[#A55704]/45 bg-[#0d2f24] hover:border-sky-400/80 hover:bg-[#123c2e]'
              }`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-sky-400/35 bg-sky-500/20 px-3 py-1.5 font-mono text-xs font-extrabold text-sky-300">
                    <Code2 className="h-4 w-4" />
                    BM101
                  </span>
                  <span className="text-xs font-semibold text-[#F3D2AF]/80">
                    6 Ders + 6 Lab PDF (12 Kaynak)
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-[#F8EADC] group-hover:text-sky-200">
                  Bilgisayar Programlama I (C Dili)
                </h2>
                <p className="mt-1 text-xs font-medium text-[#F3D2AF]/80">
                  Teorik: Dr. Hüseyin TEMUÇİN · Lab: Arş. Gör. Kevser Özdem KARACA
                </p>

                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[#F8EADC]/90">
                  <li className="flex items-start gap-2">
                    <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
                    <span>Slayt görselleriyle birebir yan yana açıklama ve özet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
                    <span>Adım adım Function Call Stack, Bellek Değerleri &amp; Özyineleme (Recursion) simülatörü</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-400" />
                    <span>Tüm slayt örneklerinin çözümleri, Harici Sorular &amp; 3 soruluk Vize (Çıktı, Kodlama, Bellek)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#A55704]/40 pt-4 text-sm font-bold text-[#F3D2AF] group-hover:text-sky-300">
                <span>BM101 ile Devam Et</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* MAT101 Card */}
            <button
              type="button"
              onClick={() => onSelectCourse('mat101')}
              className={`group flex flex-col justify-between rounded-xl border p-5 text-left transition-all ${
                currentCourse === 'mat101'
                  ? 'border-emerald-400 bg-[#0f3629] ring-2 ring-emerald-400/40'
                  : 'border-[#A55704]/45 bg-[#0d2f24] hover:border-emerald-400/80 hover:bg-[#123c2e]'
              }`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/35 bg-emerald-500/20 px-3 py-1.5 font-mono text-xs font-extrabold text-emerald-300">
                    <Sigma className="h-4 w-4" />
                    MAT101
                  </span>
                  <span className="text-xs font-semibold text-[#F3D2AF]/80">
                    Lecture Notes (210 s.) + 6 Vize
                  </span>
                </div>

                <h2 className="text-lg font-extrabold text-[#F8EADC] group-hover:text-emerald-200">
                  Matematik I (Calculus)
                </h2>
                <p className="mt-1 text-xs font-medium text-[#F3D2AF]/80">
                  Lecture Notes (Chapter 0–6) &amp; 2022–2025 Çıkmış Vize Çözümleri
                </p>

                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[#F8EADC]/90">
                  <li className="flex items-start gap-2">
                    <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>Vize kapsamı: Yüksek Mertebeden Türevlere kadar (s. 1–118) + Sonrası (Final)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>6 Geçmiş Vize (102 Soru): Önce şıkkı işaretle, sonra adım adım çözümü &amp; el yazısı key gör</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>Bölüm tamamlama takibi, ilerleme çubuğu, interaktif lablar ve A4 özetler</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#A55704]/40 pt-4 text-sm font-bold text-[#F3D2AF] group-hover:text-emerald-300">
                <span>MAT101 ile Devam Et</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>

          <div className="border-t border-[#A55704]/45 bg-[#061a13] px-6 py-3.5 text-center text-xs text-[#F3D2AF]/90">
            <div>
              İstediğiniz zaman sol menüden &ldquo;Ders Değiştir&rdquo; butonunu kullanarak BM103, BM101 ve MAT101 arasında geçiş yapabilirsiniz.
            </div>
            <SehaFooter variant="dark" compact />
          </div>
        </div>
      </div>
    </div>
  );
};
