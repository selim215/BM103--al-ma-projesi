import React from 'react';
import { Printer } from 'lucide-react';
import { WeekModule } from '../types/course';
import { WEEKS } from '../data/bm103Data';

interface A4SheetProps {
  week: WeekModule;
}

export const A4Sheet: React.FC<A4SheetProps> = ({ week }) => (
  <article className="a4-sheet mx-auto w-full max-w-[210mm] overflow-hidden border border-slate-300 bg-white p-5 text-[#111827] shadow-sm sm:p-8">
    <header className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b-2 border-[#09251C] pb-2.5">
      <div className="min-w-0">
        <div className="text-[11px] font-bold tracking-wide text-[#A55704]">
          BM103 Bilgisayar Mühendisliğinin Temelleri · {week.tag}
        </div>
        <h2 className="text-lg font-extrabold text-[#09251C] [overflow-wrap:anywhere]">
          {week.title} — Nokta Atışı Özet
        </h2>
      </div>
      <div className="min-w-0 text-left text-xs text-slate-600 sm:text-right">
        <div>Doç. Dr. Feyza YILDIRIM OKAY</div>
        <div className="[overflow-wrap:anywhere]">Kaynak: {week.pdfName}</div>
      </div>
    </header>

    <div className="a4-cols grid grid-cols-1 gap-4 md:grid-cols-2">
      {week.summaryA4.map((sec, idx) => (
        <section key={idx} className="a4-section min-w-0">
          <h3 className="mb-1.5 border-b border-slate-200 pb-1 text-sm font-bold text-[#A55704] [overflow-wrap:anywhere]">
            {sec.h}
          </h3>
          <ul className="list-disc space-y-1 pl-4 text-[13px] leading-snug text-slate-800 [overflow-wrap:anywhere]">
            {sec.items.map((item, iIdx) => (
              <li key={iIdx} className="min-w-0">{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </article>
);

export const WeekA4View: React.FC<{ week: WeekModule }> = ({ week }) => {
  return (
    <div className="space-y-5">
      <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
        <div>
          <h3 className="text-base font-bold text-[#09251C]">
            A4 Yazdırılabilir / PDF Özet Modu
          </h3>
          <p className="text-sm text-slate-600">
            Uzun paragraflar olmadan yalnızca sınav odaklı temel maddeleri içerir. Tarayıcı yazdırma diyaloğundan PDF kaydedebilirsiniz.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#A55704] px-4 py-2 text-sm font-bold text-[#F8EADC] transition-colors hover:bg-[#894603] whitespace-nowrap shrink-0"
        >
          <Printer className="h-4 w-4" />
          A4 Yazdır / PDF Kaydet
        </button>
      </div>
      <div className="print-only-container">
        <A4Sheet week={week} />
      </div>
    </div>
  );
};

export const AllA4View: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <h1 className="text-xl font-extrabold text-[#09251C]">
            Tüm Haftaların Kapsamlı A4 Özet Paketi
          </h1>
          <p className="text-sm text-slate-600">
            Hafta 1&apos;den Hafta 7&apos;ye kadar tüm haftaların nokta atışı özetleri tek seferde A4 PDF olarak çıktı alınabilir.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#A55704] px-4 py-2.5 text-sm font-bold text-[#F8EADC] transition-colors hover:bg-[#894603] whitespace-nowrap shrink-0"
        >
          <Printer className="h-4 w-4" />
          Tümünü A4 Yazdır / PDF Kaydet
        </button>
      </div>

      <div className="print-only-container space-y-6">
        {WEEKS.map((w, idx) => (
          <div key={w.id} className={idx > 0 ? 'a4-page-break' : ''}>
            <A4Sheet week={w} />
          </div>
        ))}
      </div>
    </div>
  );
};
