import React from 'react';
import { X, Maximize2 } from 'lucide-react';
import { PdfSlidePreview } from './PdfSlidePreview';

export interface MAT101SlidePeekTarget {
  pdfFile: string;
  pdfLabel: string;
  slideNum: number;
  moduleId?: string;
}

interface MAT101SlidePeekModalProps {
  peek: MAT101SlidePeekTarget | null;
  onClose: () => void;
  onOpenFullReader?: (moduleId: string, pageNum: number) => void;
}

export const MAT101SlidePeekModal: React.FC<MAT101SlidePeekModalProps> = ({
  peek,
  onClose,
  onOpenFullReader,
}) => {
  if (!peek) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09251C]/65 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b-2 border-[#A55704] bg-[#09251C] px-5 py-3.5 text-[#F8EADC]">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-[#F3D2AF]">
              MAT101 Kaynak PDF Sayfası
            </div>
            <h3 className="truncate text-sm font-bold sm:text-base">
              {peek.pdfLabel} · Sayfa {peek.slideNum}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 p-1.5 text-white hover:bg-white/20"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto bg-[#FAF6F0] p-4 sm:p-5">
          <PdfSlidePreview
            pdfFile={peek.pdfFile}
            pageNumber={peek.slideNum}
            pdfLabel={peek.pdfLabel}
            caption={`${peek.pdfLabel} · Sayfa ${peek.slideNum} birebir sayfa görüntüsü`}
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 bg-white px-5 py-3">
          {peek.moduleId && onOpenFullReader && (
            <button
              type="button"
              onClick={() => {
                onOpenFullReader(peek.moduleId!, peek.slideNum);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#09251C] px-3.5 py-2 text-xs font-bold text-[#F8EADC] hover:bg-[#0f3a2c]"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              Lecture Notes Okuyucuda Aç
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
