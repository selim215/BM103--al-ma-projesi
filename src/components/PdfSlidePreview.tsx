import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Maximize2, X, FileImage, Loader2 } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// Caches PDF documents and rendered page images in memory across slide navigation
const pdfDocCache = new Map<string, Promise<pdfjsLib.PDFDocumentProxy>>();
const pageImageCache = new Map<string, string>();

async function loadPdfDocument(pdfFile: string): Promise<pdfjsLib.PDFDocumentProxy> {
  if (!pdfDocCache.has(pdfFile)) {
    const url = `/assets/aistudio/${encodeURIComponent(pdfFile)}`;
    const loadingTask = pdfjsLib.getDocument({ url });
    pdfDocCache.set(pdfFile, loadingTask.promise);
  }
  return pdfDocCache.get(pdfFile)!;
}

async function renderPdfPageToDataUrl(pdfFile: string, pageNumber: number): Promise<string> {
  const key = `${pdfFile}#${pageNumber}`;
  const cached = pageImageCache.get(key);
  if (cached) return cached;

  const pdfDoc = await loadPdfDocument(pdfFile);
  const clampedPage = Math.min(Math.max(1, pageNumber), pdfDoc.numPages);
  const page = await pdfDoc.getPage(clampedPage);
  const viewport = page.getViewport({ scale: 1.75 });

  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  await page.render({
    canvas,
    viewport,
  }).promise;

  const dataUrl = canvas.toDataURL('image/png');
  pageImageCache.set(key, dataUrl);
  return dataUrl;
}

interface PdfSlidePreviewProps {
  pdfFile: string;
  pageNumber: number;
  caption?: string;
  pdfLabel?: string;
  compact?: boolean;
}

export const PdfSlidePreview: React.FC<PdfSlidePreviewProps> = ({
  pdfFile,
  pageNumber,
  caption,
  pdfLabel,
  compact = false,
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(() => {
    return pageImageCache.get(`${pdfFile}#${pageNumber}`) || null;
  });
  const [loading, setLoading] = useState<boolean>(!imgSrc);
  const [error, setError] = useState<boolean>(false);
  const [zoomOpen, setZoomOpen] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    const key = `${pdfFile}#${pageNumber}`;
    const existing = pageImageCache.get(key);
    if (existing) {
      setImgSrc(existing);
      setLoading(false);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);

    renderPdfPageToDataUrl(pdfFile, pageNumber)
      .then((url) => {
        if (!active) return;
        setImgSrc(url);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [pdfFile, pageNumber]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs">
          <div className="flex min-w-0 items-center gap-1.5 font-semibold text-[#0f2342]">
            <FileImage className="h-3.5 w-3.5 shrink-0 text-red-700" />
            <span className="truncate">
              {pdfLabel || pdfFile} · Sayfa {pageNumber}
            </span>
          </div>
          {imgSrc && (
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="inline-flex shrink-0 items-center gap-1 rounded border border-slate-300 bg-white px-2 py-0.5 text-[11px] font-bold text-[#0f2342] hover:bg-slate-100"
            >
              <Maximize2 className="h-3 w-3" />
              Büyüt
            </button>
          )}
        </div>

        <div
          className={`relative flex w-full items-center justify-center bg-white ${
            compact ? 'min-h-[190px]' : 'min-h-[260px]'
          }`}
        >
          {loading && (
            <div className="flex flex-col items-center gap-2 py-10 text-xs font-medium text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin text-[#0f2342]" />
              <span>Slayt görseli PDF&apos;den yükleniyor...</span>
            </div>
          )}

          {!loading && error && (
            <div className="p-6 text-center text-xs text-slate-500">
              PDF sayfası önizlemesi şu an oluşturulamadı ({pdfLabel || pdfFile} · Sayfa {pageNumber}).
            </div>
          )}

          {!loading && !error && imgSrc && (
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="group relative block w-full cursor-zoom-in focus:outline-none"
              title="Slaytı tam boyutta büyütmek için tıklayın"
            >
              <img
                src={imgSrc}
                alt={caption || `${pdfLabel || pdfFile} Sayfa ${pageNumber}`}
                className="mx-auto block h-auto max-h-[460px] w-full object-contain"
              />
            </button>
          )}
        </div>

        {caption && (
          <div className="border-t border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-600">
            {caption}
          </div>
        )}
      </div>

      {zoomOpen && imgSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setZoomOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-xl border border-slate-300 bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
              <div className="text-sm font-bold text-[#0f2342]">
                {pdfLabel || pdfFile} · PDF Sayfa {pageNumber} (Birebir Slayt Görünümü)
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                className="rounded-lg border border-slate-300 bg-white p-1.5 text-slate-700 hover:bg-slate-100"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <img
              src={imgSrc}
              alt={caption || `${pdfLabel || pdfFile} Sayfa ${pageNumber}`}
              className="mx-auto h-auto w-full rounded border border-slate-200 object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};
