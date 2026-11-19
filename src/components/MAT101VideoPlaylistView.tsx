import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Flag,
  Search,
} from 'lucide-react';
import {
  CALCULUS1_ORDERED_PLAYLIST,
  HIGHER_ORDER_PLAYLIST_URL,
  MAT101_YOUTUBE_PLAYLIST_URL,
  OrderedPlaylistVideoItem,
  videoWatchUrl,
} from '../data/mat101Youtube';
import { YoutubeLogoIcon } from './YoutubeVideoLink';

interface MAT101VideoPlaylistViewProps {
  onNavigateToTopic: (moduleId: string, slidePage?: number) => void;
  onBackToLearn: () => void;
}

type PlaylistFilter = 'all' | 'midterm' | 'higher-order' | 'after-midterm';

export const MAT101VideoPlaylistView: React.FC<MAT101VideoPlaylistViewProps> = ({
  onNavigateToTopic,
  onBackToLearn,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<PlaylistFilter>('all');

  const midtermCutoffIndex = useMemo(
    () => CALCULUS1_ORDERED_PLAYLIST.findIndex((item) => item.isMidtermCutoffEnd),
    []
  );

  const filteredItems = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr-TR');
    return CALCULUS1_ORDERED_PLAYLIST.filter((item, idx) => {
      if (filter === 'midterm' && idx > midtermCutoffIndex) return false;
      if (filter === 'higher-order' && !item.isHigherOrderGroup) return false;
      if (filter === 'after-midterm' && idx <= midtermCutoffIndex) return false;

      if (!q) return true;
      return (
        item.title.toLocaleLowerCase('tr-TR').includes(q) ||
        item.topicLabel.toLocaleLowerCase('tr-TR').includes(q) ||
        item.orderLabel.toLocaleLowerCase('tr-TR').includes(q)
      );
    });
  }, [search, filter, midtermCutoffIndex]);

  // Split sequential list into segments so the Higher Order Derivatives group is wrapped in a lightly highlighted block
  const renderRows = useMemo(() => {
    const elements: React.ReactNode[] = [];
    let higherOrderBucket: OrderedPlaylistVideoItem[] = [];

    const flushHigherOrderBucket = (keySuffix: string) => {
      if (higherOrderBucket.length === 0) return;
      elements.push(
        <div
          key={`higher-order-box-${keySuffix}`}
          className="my-4 rounded-xl border-2 border-[#A55704]/45 bg-[#F8EADC]/65 p-3.5 shadow-xs sm:p-4"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#A55704]/25 pb-2.5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded bg-[#F3D2AF] px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-[#09251C]">
                  <YoutubeLogoIcon className="h-3.5 w-3.5" />
                  Ek Oynatma Listesi · Yüksek Mertebeden Türevler
                </span>
                <span className="text-xs font-semibold text-[#7C3F02]">
                  ({higherOrderBucket.length} Video · Modül 5 s. 117–118)
                </span>
              </div>
              <p className="mt-1 text-xs text-[#09251C]/80">
                Vize kapsamındaki son konuya ait yüksek mertebeden türev konu anlatımı ve 5 örnek soru videosu.
              </p>
            </div>
            <a
              href={HIGHER_ORDER_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#A55704]/35 bg-white px-3 py-1.5 text-xs font-bold text-[#09251C] hover:bg-[#F3D2AF]/40"
            >
              <YoutubeLogoIcon className="h-3.5 w-3.5" />
              <span>Yüksek Mertebe Listesi</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          </div>

          <div className="space-y-2">
            {higherOrderBucket.map((item) => (
              <PlaylistRow
                key={`${item.playlistId}-${item.id}`}
                item={item}
                highlighted
                onNavigateToTopic={onNavigateToTopic}
              />
            ))}
          </div>

          {/* VİZE SON YER Marker right at the end of the Higher Order Derivatives videos */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-950">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded bg-red-700 px-2.5 py-1 text-xs font-black tracking-wider text-white">
                <Flag className="h-3.5 w-3.5" />
                VİZE SON YER
              </span>
              <span className="text-xs font-bold text-red-900 sm:text-sm">
                Yüksek Mertebeden Türevler vizede sorulacak son konudur. Sonraki videolar final kapsamındadır.
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToTopic('m5', 117)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-red-800 border border-red-200 hover:bg-red-100"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Modül 5 (s. 117–118) Aç
            </button>
          </div>
        </div>
      );
      higherOrderBucket = [];
    };

    filteredItems.forEach((item, index) => {
      if (item.isHigherOrderGroup) {
        higherOrderBucket.push(item);
        return;
      }
      flushHigherOrderBucket(String(index));
      const isAfterMidterm =
        midtermCutoffIndex >= 0 &&
        CALCULUS1_ORDERED_PLAYLIST.indexOf(item) > midtermCutoffIndex;

      elements.push(
        <PlaylistRow
          key={`${item.playlistId}-${item.id}`}
          item={item}
          dimmed={isAfterMidterm}
          onNavigateToTopic={onNavigateToTopic}
        />
      );
    });

    flushHigherOrderBucket('end');
    return elements;
  }, [filteredItems, midtermCutoffIndex, onNavigateToTopic]);

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <section className="rounded-xl bg-[#09251C] p-6 text-[#F8EADC]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs font-bold text-[#F3D2AF]">
              <YoutubeLogoIcon className="h-4 w-4" />
              <span>MAT101 · KALKÜLÜS 1 OYNATMA LİSTESİ (SIRALI DİZİN)</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Kalkülüs 1 Video Ders Listesi &amp; Konu Bağlantıları
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#F8EADC]/80">
              Calculus-1 oynatma listesindeki tüm <strong>122 video</strong>, Lecture Notes müfredat sırasına göre düzenlenmiştir.{' '}
              <strong>119. sayfa (Kapalı Türev) öncesi bütün konular</strong> (Hiperbolik Fonksiyonlar, Teğet/Normal Doğruları ve Hiperbolik Türevler dahil) vize kapsamına alınmış;{' '}
              <strong className="text-[#F3D2AF]">Yüksek Mertebe Türevler (6 video)</strong> bölümü ayriyeten eklenmiştir ve sonunda{' '}
              <strong className="text-red-300">VİZE SON YER</strong> sınırı yer alır.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onBackToLearn}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#F3D2AF]/30 bg-white/10 px-3.5 py-2 text-xs font-bold text-[#F8EADC] hover:bg-white/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Konu Anlatımına Dön
            </button>
            <a
              href={MAT101_YOUTUBE_PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#A55704] px-3.5 py-2 text-xs font-bold text-[#F8EADC] hover:bg-[#894603]"
            >
              <YoutubeLogoIcon className="h-3.5 w-3.5" />
              YouTube Oynatma Listesi
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="rounded-xl border border-[#09251C]/10 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: `Tüm Liste (${CALCULUS1_ORDERED_PLAYLIST.length})` },
              {
                id: 'midterm',
                label: `Vize Dahil (${midtermCutoffIndex + 1} Video · s. 1–118)`,
              },
              { id: 'higher-order', label: 'Yüksek Mertebe Türevler (Vize Son Yer)' },
              {
                id: 'after-midterm',
                label: `Vize Sonrası (${CALCULUS1_ORDERED_PLAYLIST.length - (midtermCutoffIndex + 1)} Video · s. 119+)`,
              },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as PlaylistFilter)}
                  className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                    active
                      ? 'bg-[#09251C] text-[#F8EADC]'
                      : 'border border-slate-200 bg-[#FAF6F0] text-[#09251C] hover:bg-[#F3D2AF]/35'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Video veya konu başlığı ara..."
              className="w-full rounded-lg border border-slate-300 bg-[#FAF6F0] py-2 pl-9 pr-3 text-xs font-medium text-[#09251C] placeholder:text-slate-400 focus:border-[#09251C] focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Ordered Playlist Items */}
      <section className="space-y-2">
        {renderRows.length > 0 ? (
          renderRows
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Arama kriterine uyan video bulunamadı.
          </div>
        )}
      </section>
    </div>
  );
};

interface PlaylistRowProps {
  item: OrderedPlaylistVideoItem;
  highlighted?: boolean;
  dimmed?: boolean;
  onNavigateToTopic: (moduleId: string, slidePage?: number) => void;
}

const PlaylistRow: React.FC<PlaylistRowProps> = ({
  item,
  highlighted = false,
  dimmed = false,
  onNavigateToTopic,
}) => {
  const url = videoWatchUrl(item.id, item.playlistId);

  return (
    <div
      className={`flex flex-col justify-between gap-3 rounded-xl border px-4 py-3 transition-colors sm:flex-row sm:items-center ${
        highlighted
          ? 'border-[#A55704]/35 bg-white hover:border-[#A55704]'
          : dimmed
          ? 'border-slate-200 bg-[#FAF6F0]/70 hover:border-slate-300 hover:bg-white'
          : 'border-[#09251C]/15 bg-white hover:border-[#A55704]/50'
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span
          className={`mt-0.5 inline-flex min-w-[46px] shrink-0 items-center justify-center rounded-md px-2 py-1 font-mono text-xs font-extrabold ${
            highlighted
              ? 'bg-[#A55704] text-[#F8EADC]'
              : dimmed
              ? 'bg-slate-400 text-white'
              : 'bg-[#09251C] text-[#F8EADC]'
          }`}
        >
          #{item.orderLabel}
        </span>

        <div className="min-w-0">
          <div className="text-sm font-bold leading-snug text-[#09251C] [overflow-wrap:anywhere]">
            {item.title}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded bg-[#FAF6F0] px-2 py-0.5 font-semibold text-[#09251C]/80">
              {item.topicLabel}
            </span>
            {item.slidePage && (
              <span className="font-mono text-slate-500">
                Lecture Notes s. {item.slidePage}
              </span>
            )}
            {dimmed && (
              <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                Vize Sonrası
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-[#09251C] transition-colors hover:border-red-300 hover:bg-red-100"
        >
          <YoutubeLogoIcon className="h-3.5 w-3.5" />
          <span>Videoyu İzle</span>
          <ExternalLink className="h-3 w-3 text-slate-500" />
        </a>

        <button
          type="button"
          onClick={() => onNavigateToTopic(item.moduleId, item.slidePage)}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#09251C]/20 bg-[#FAF6F0] px-3 py-1.5 text-xs font-bold text-[#09251C] transition-colors hover:bg-[#09251C] hover:text-[#F8EADC]"
        >
          <span>Konuya Git</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
