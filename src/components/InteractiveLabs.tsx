import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Play, RotateCcw } from 'lucide-react';
import { WeekModule } from '../types/course';

interface InteractiveLabsProps {
  week: WeekModule;
  onPeekSlide: (weekId: string, slideNum: number) => void;
  onJumpToWeek?: (weekId: string) => void;
}

const SlideRefButton: React.FC<{
  weekId: string;
  slideNum: number;
  onPeekSlide: (w: string, s: number) => void;
}> = ({ weekId, slideNum, onPeekSlide }) => (
  <button
    type="button"
    onClick={() => onPeekSlide(weekId, slideNum)}
    className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-[#0f2342] transition-colors hover:bg-[#0f2342] hover:text-white whitespace-nowrap shrink-0"
  >
    <BookOpen className="h-3.5 w-3.5" />
    PDF Sayfa {slideNum}
  </button>
);

export const InteractiveLabs: React.FC<InteractiveLabsProps> = ({
  week,
  onPeekSlide,
  onJumpToWeek,
}) => {
  if (week.id === 'w1') return <LabW0 onPeekSlide={onPeekSlide} onJumpToWeek={onJumpToWeek} />;
  if (week.id === 'w2') return <LabW1 onPeekSlide={onPeekSlide} />;
  if (week.id === 'w3') return <LabW2 onPeekSlide={onPeekSlide} />;
  if (week.id === 'w4') return <LabW3 onPeekSlide={onPeekSlide} />;
  if (week.id === 'w5') return <LabW5 onPeekSlide={onPeekSlide} />;
  if (week.id === 'w6') return <LabW4 onPeekSlide={onPeekSlide} />;
  if (week.id === 'w7') return <LabW6 onPeekSlide={onPeekSlide} />;
  return null;
};

// ============================================================================
// HAFTA 1: DERS TANITIMI VE İZLENCE
// ============================================================================
const LabW0: React.FC<{
  onPeekSlide: (w: string, s: number) => void;
  onJumpToWeek?: (w: string) => void;
}> = ({ onPeekSlide, onJumpToWeek }) => {
  const syllabus = [
    { title: 'Bilgisayar Mühendisliği Tanımı ve Bileşenleri', targetWeek: 'w2', tag: 'Hafta 2' },
    { title: 'Boole Cebri ve Lojik Kapılar', targetWeek: 'w3', tag: 'Hafta 3' },
    { title: 'Algoritmalar, Akış Şemaları ve Sözde Kod', targetWeek: 'w4', tag: 'Hafta 4' },
    { title: 'İşletim Sistemleri', targetWeek: 'w5', tag: 'Hafta 5' },
    { title: 'Programlama Dilleri ve OOP', targetWeek: 'w6', tag: 'Hafta 6' },
    { title: 'Mikroişlemciler, Mimari ve Makine Dili', targetWeek: 'w7', tag: 'Hafta 7' },
    { title: 'Bilgisayar Ağları', targetWeek: null, tag: null },
    { title: 'Sayı Sistemleri', targetWeek: null, tag: null },
    { title: 'Yazılım Mühendisliği', targetWeek: null, tag: null },
    { title: 'Veri Yapıları', targetWeek: null, tag: null },
    { title: 'Veritabanı Sistemleri', targetWeek: null, tag: null },
    { title: 'Dosya Organizasyonu', targetWeek: null, tag: null },
    { title: 'Akademik Etik', targetWeek: null, tag: null },
    { title: 'Yapay Zeka', targetWeek: null, tag: null },
  ];

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            BM103 Ders Bilgileri ve Değerlendirme Ölçütleri
          </h2>
          <SlideRefButton weekId="w1" slideNum={2} onPeekSlide={onPeekSlide} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <div className="font-bold text-[#0f2342]">Ders Sorumlusu</div>
              <div>Doç. Dr. Feyza YILDIRIM OKAY · <code>feyzaokay@gazi.edu.tr</code> · Oda: 137</div>
            </div>
            <div>
              <div className="font-bold text-[#0f2342]">Dersin Asistanı</div>
              <div>Arş. Gör. Zeynep Sözen · <code>zeynepsozen@gazi.edu.tr</code> · Oda: Z-26</div>
            </div>
            <div>
              <div className="font-bold text-[#0f2342]">Ders Araçları Sınıf Kodu</div>
              <code className="inline-block rounded bg-red-50 px-2.5 py-1 text-sm font-bold text-red-800">
                xkfuqz5g
              </code>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0f2342] text-white">
                  <th className="border border-slate-300 px-3 py-2 text-left">Ölçüt</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Pay / Şart</th>
                </tr>
              </thead>
              <tbody className="font-mono tabular-nums">
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-sans">Arasınav (Vize)</td>
                  <td className="border border-slate-200 px-3 py-2 font-bold">%30</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-sans">Dönem Sonu Sınavı</td>
                  <td className="border border-slate-200 px-3 py-2 font-bold">%40</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-sans">Proje - Rapor + Sunum</td>
                  <td className="border border-slate-200 px-3 py-2 font-bold">%30</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-sans">Devam (%70)</td>
                  <td className="border border-slate-200 px-3 py-2 font-sans font-semibold">Geçme - Kalma</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            Ders Kitabı, Yardımcı Kaynaklar ve İzlence Başlıkları
          </h2>
          <SlideRefButton weekId="w1" slideNum={3} onPeekSlide={onPeekSlide} />
        </div>

        <ul className="mb-5 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
          <li>
            <strong>Ders Kitabı:</strong> Bilgisayar Mühendisliğine Giriş, Papatya Yayıncılık, Rıfat Çölkesen
          </li>
          <li>
            <strong>Yardımcı Kaynaklar:</strong> Bilgisayar Bilimine Giriş (Nobel Akademik Yayıncılık, J. Glenn Brookshear, Dennis Brylow) · Principles of Information Systems (R. M. Stair, G. W. Reynolds, Cengage Learning USA 2018)
          </li>
        </ul>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {syllabus.map((item, idx) =>
            item.targetWeek && onJumpToWeek ? (
              <button
                key={idx}
                type="button"
                onClick={() => onJumpToWeek(item.targetWeek!)}
                className="flex min-w-0 items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left text-xs font-semibold text-[#0f2342] transition-colors hover:border-[#0f2342] hover:bg-white"
              >
                <span className="min-w-0">{idx + 1}. {item.title}</span>
                <span className="ml-2 shrink-0 text-[11px] font-bold text-red-700">{item.tag} →</span>
              </button>
            ) : (
              <div
                key={idx}
                className="flex min-w-0 items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-600"
              >
                <span className="min-w-0">{idx + 1}. {item.title}</span>
                <span className="ml-2 shrink-0 text-[11px] text-slate-400">Sayfa 4</span>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// HAFTA 1: BİLGİSAYAR MÜHENDİSLİĞİ TANIMI VE BİLEŞENLERİ
// ============================================================================
const LabW1: React.FC<{ onPeekSlide: (w: string, s: number) => void }> = ({ onPeekSlide }) => {
  const [genFilter, setGenFilter] = useState<'0' | '1' | '2' | '3' | '4' | '5'>('1');

  const gens: Record<string, { title: string; slide: number; items: string[] }> = {
    '0': {
      title: 'Bilgisayar Öncesi Dönem (1642–1924)',
      slide: 6,
      items: [
        '1642 Pascal: Dişli çarklarla toplama-çıkarma',
        '1671 Leibniz: Çarpma ve bölme işlevleri',
        '1800 Jacquard: Dokuma makinesi & delikli kart',
        '1820 Charles Babbage: Analitik Makine',
        '1854 George Boole: Boole cebri',
        '1890 Herman Hollerith: Delikli kart + elektrik sinyali (1890 seçimleri)',
        '1911 Computer-Recording-Company → 1924 IBM',
      ],
    },
    '1': {
      title: '1. Kuşak (1940–1958) — Vakum Tüpleri',
      slide: 8,
      items: [
        '1944 Harvard Mark I: 18m×2,5m, sn\'de 5-10 işlem, programı sürekli yürüten ilk bilgisayar ama elektronik değil',
        '1946 ENIAC: Genel amaçlı ilk bilgisayar, 30 ton, 130 m²',
        'Vakumlu tüp teknolojisi: ENIAC, EDVAC, UNIVAC',
        'Özellikler: Büyük vakum tüpleri, fazla enerji/ısı, ana bellek, manyetik teyp, makine dili',
      ],
    },
    '2': {
      title: '2. Kuşak (1958–1964) — Transistör',
      slide: 14,
      items: [
        'Transistör teknolojisi (ortalama 10.000 transistör, el ile monte)',
        'İlk bilgisayar: IBM 1401 (Kart Okuma-Delme, İşlemci Ünitesi, Yazıcı)',
        'Az enerji, az ısı, çok daha küçük boyut',
        'Dönemin PC öncüleri: Programma 101 (1962, 1 MHz), Altair 8800, IBM PC, Macintosh; Türkiye\'de ilk: IBM 650-Data (1960)',
      ],
    },
    '3': {
      title: '3. Kuşak (1965–1971) — Entegre Devre',
      slide: 17,
      items: [
        'Transistörler bir araya getirilerek Entegre Devreler yapıldı',
        'İlk Merkezi İşlem Birimi (CPU) yapıldı; işletim sistemi altında programlar çalıştırıldı',
        'İlk model: IBM 360 (PDF\'te IBM 700, IBM 360)',
        'Düşük maliyet, yüksek güvenirlik, manyetik diskler',
      ],
    },
    '4': {
      title: '4. Kuşak (1972–1990) — Mikroişlemci',
      slide: 20,
      items: [
        'Silikon yonga / mikroişlemci teknolojisi (avuç içine sığacak küçüklük)',
        'İlk mikroişlemci: Intel 4004; Apple I ve IBM PC üretildi',
        'Disk ve CD\'ler, yapay zekâ kavramı, ağ sistemleri',
        'İlk virüsler: The Creeper (1971, ARPANET, zararsız), Elk Cloner (1982, Apple DOS 3.3, ilk kontrol dışı)',
      ],
    },
    '5': {
      title: '5. Kuşak (1990–...) — Yapay Zekâ',
      slide: 23,
      items: [
        'Yapay Zekâ teknolojileri kullanılan bilgisayarlar',
        'Kendi kendini denetleyebilen, daha akıllı ve insanlarla uyumlu zeki makineler',
        'Örnek: Kasparov ile satranç maçı yapan Deep Blue',
      ],
    },
  };

  const g = gens[genFilter];

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            1. İnteraktif Kuşaklar Zaman Tüneli
          </h2>
          <SlideRefButton weekId="w2" slideNum={g.slide} onPeekSlide={onPeekSlide} />
        </div>
        <p className="mb-3 text-sm text-slate-600">
          Bir dönem seçerek o kuşağın teknolojisini, ilk modellerini ve ayırt edici özelliklerini inceleyin:
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5 rounded-lg bg-slate-100 p-1.5">
          {[
            { id: '0', label: 'Bilgisayar Öncesi' },
            { id: '1', label: '1. Kuşak (Vakum Tüp)' },
            { id: '2', label: '2. Kuşak (Transistör)' },
            { id: '3', label: '3. Kuşak (Entegre Devre)' },
            { id: '4', label: '4. Kuşak (Mikroişlemci)' },
            { id: '5', label: '5. Kuşak (Yapay Zekâ)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setGenFilter(tab.id as '0' | '1' | '2' | '3' | '4' | '5')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                genFilter === tab.id
                  ? 'bg-white text-[#0f2342] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-base font-bold text-[#0f2342]">{g.title}</h3>
          <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            {g.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            2. Bilgisayar Sisteminin 5 İşlevi ve Giriş–İşleme–Çıktı Akışı
          </h2>
          <SlideRefButton weekId="w2" slideNum={26} onPeekSlide={onPeekSlide} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-bold text-[#0f2342]">1. Girdi İşlemleri</div>
            <p className="mt-1.5 text-sm text-slate-600">
              Klavye, fare, tarayıcı, mikrofon, kamera gibi birimlerle verilerin bilgisayara girilmesi.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-bold text-[#0f2342]">2. İşleme (CPU & Bellek)</div>
            <p className="mt-1.5 text-sm text-slate-600">
              <strong>Aritmetik İşlemler</strong> (çarpma, toplama, çıkarma, bölme, üs) +{' '}
              <strong>Koordinasyon ve Kontrol</strong> + <strong>Veri Saklama</strong> (RAM, HDD/SSD).
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-bold text-[#0f2342]">3. Çıktı İşlemleri</div>
            <p className="mt-1.5 text-sm text-slate-600">
              Ekran (Monitör), Yazıcı, Çizici (Plotter), Hoparlör, Sunu Cihazı ile rapor/grafik/ses görüntüsü oluşturma.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            3. Donanım ve Yazılım Bileşenleri Haritası
          </h2>
          <SlideRefButton weekId="w2" slideNum={29} onPeekSlide={onPeekSlide} />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="min-w-0 overflow-x-auto">
            <h3 className="mb-2 text-sm font-bold text-red-700">Donanım (Hardware)</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0f2342] text-white">
                  <th className="border border-slate-300 px-3 py-2 text-left">Kategori</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Birimler ve Kritik Notlar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-semibold">İç Donanım</td>
                  <td className="border border-slate-200 px-3 py-2">
                    Anakart · CPU (Aritmetik/Mantık + Denetim) · GPU · RAM (geçici) · ROM (kalıcı, BIOS/UEFI) · HDD (manyetik dönen disk) · SSD (flaş bellek, hareketsiz) · Güç Kaynağı (220V→12V, fanlı)
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Dış Donanım</td>
                  <td className="border border-slate-200 px-3 py-2">
                    Klavye · Fare/Touchpad (sol seçer, sağ menü açar) · Ekran/Monitör (çözünürlük)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Ek Donanım</td>
                  <td className="border border-slate-200 px-3 py-2">
                    Yazıcı, Çizici (Plotter), Tarayıcı, Ses Kartı, Hoparlör, Mikrofon, Kamera, TV kartı, Ekran Filtresi, Sunu Cihazı, Ağ Kartı, UPS, CD-ROM (650 MB+, CD-R/RW), DVD (4,7 GB)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="min-w-0 overflow-x-auto">
            <h3 className="mb-2 text-sm font-bold text-[#0f2342]">Yazılım (Software)</h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0f2342] text-white">
                  <th className="border border-slate-300 px-3 py-2 text-left">Kategori</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">Örnekler (PDF Sayfalarından)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-semibold">İşletim Sistemleri</td>
                  <td className="border border-slate-200 px-3 py-2">
                    <strong>Microsoft:</strong> Windows 98, XP, Vista, 7, 8, 8.1, 10, 11
                    <br />
                    <strong>Linux:</strong> Debian, Ubuntu, Fedora, OpenSuse, Pardus (Yerli)
                    <br />
                    <strong>Apple:</strong> Macintosh, Mac OS X, OS X, MacOS, MacOS 12.6
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Uygulama Yazılımları</td>
                  <td className="border border-slate-200 px-3 py-2">
                    Office (Word, Excel, PowerPoint), Oyunlar, Haberleşme (Skype), Güvenlik (Antivirüs, Firewall), Tarayıcılar (Chrome, Opera, Firefox), Otomasyon yazılımları
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// HAFTA 2: BOOLE CEBRİ VE LOJİK KAPILAR
// ============================================================================
type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

function evalGate(type: GateType, a: number, b: number): number {
  switch (type) {
    case 'AND':
      return a & b;
    case 'OR':
      return a | b;
    case 'NOT':
      return a ? 0 : 1;
    case 'NAND':
      return a & b ? 0 : 1;
    case 'NOR':
      return a | b ? 0 : 1;
    case 'XOR':
      return a ^ b;
    case 'XNOR':
      return a ^ b ? 0 : 1;
  }
}

const LabW2: React.FC<{ onPeekSlide: (w: string, s: number) => void }> = ({ onPeekSlide }) => {
  const [gateType, setGateType] = useState<GateType>('AND');
  const [gateA, setGateA] = useState<number>(0);
  const [gateB, setGateB] = useState<number>(0);
  const [decVal, setDecVal] = useState<number>(10);

  const isNot = gateType === 'NOT';
  const out = evalGate(gateType, gateA, gateB);
  const gateEquations: Record<GateType, string> = {
    AND: 'Z = A . B',
    OR: 'Z = A + B',
    NOT: "Z = A'",
    NAND: "Z = (A . B)' = A' + B'",
    NOR: "Z = (A + B)' = A' . B'",
    XOR: "Z = A ⊕ B = A'B + AB'",
    XNOR: "Z = A ⊗ B = A'B' + AB",
  };

  const rows = isNot
    ? [
        [0, evalGate('NOT', 0, 0)],
        [1, evalGate('NOT', 1, 0)],
      ]
    : [
        [0, 0, evalGate(gateType, 0, 0)],
        [0, 1, evalGate(gateType, 0, 1)],
        [1, 0, evalGate(gateType, 1, 0)],
        [1, 1, evalGate(gateType, 1, 1)],
      ];

  const bin4 = decVal.toString(2).padStart(4, '0');
  const oct = decVal.toString(8);
  const hex = decVal.toString(16).toUpperCase();

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            1. İnteraktif Lojik Kapı ve Doğruluk Tablosu Simülatörü
          </h2>
          <SlideRefButton weekId="w3" slideNum={7} onPeekSlide={onPeekSlide} />
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5 rounded-lg bg-slate-100 p-1.5">
          {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as GateType[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGateType(g)}
              className={`rounded-md px-3.5 py-1.5 font-mono text-xs font-bold transition-colors whitespace-nowrap ${
                gateType === g
                  ? 'bg-[#0f2342] text-white'
                  : 'text-slate-700 hover:bg-white hover:text-[#0f2342]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-6 rounded-xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-2">
          <div>
            <div className="mb-3 text-sm">
              <strong>Denklem:</strong>{' '}
              <code className="rounded bg-white px-2 py-0.5 font-mono font-bold text-[#0f2342]">
                {gateEquations[gateType]}
              </code>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div>
                <div className="mb-1 text-xs font-bold text-slate-600">Giriş A</div>
                <button
                  type="button"
                  onClick={() => setGateA((v) => (v ? 0 : 1))}
                  className={`h-10 w-14 rounded-lg border-2 font-mono text-base font-extrabold transition-colors ${
                    gateA
                      ? 'border-emerald-700 bg-emerald-700 text-white'
                      : 'border-[#0f2342] bg-white text-[#0f2342]'
                  }`}
                >
                  {gateA}
                </button>
              </div>

              {!isNot && (
                <div>
                  <div className="mb-1 text-xs font-bold text-slate-600">Giriş B</div>
                  <button
                    type="button"
                    onClick={() => setGateB((v) => (v ? 0 : 1))}
                    className={`h-10 w-14 rounded-lg border-2 font-mono text-base font-extrabold transition-colors ${
                      gateB
                        ? 'border-emerald-700 bg-emerald-700 text-white'
                        : 'border-[#0f2342] bg-white text-[#0f2342]'
                    }`}
                  >
                    {gateB}
                  </button>
                </div>
              )}

              <div className="pt-4 font-bold text-slate-400">→</div>

              <div>
                <div className="mb-1 text-xs font-bold text-slate-600">
                  Çıkış Z ({out ? 'AKTİF (1)' : 'PASİF (0)'})
                </div>
                <div
                  className={`inline-flex h-10 w-14 items-center justify-center rounded-lg border-2 font-mono text-base font-extrabold ${
                    out
                      ? 'border-emerald-700 bg-emerald-700 text-white'
                      : 'border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  {out}
                </div>
              </div>
            </div>

            <svg
              width="250"
              height="96"
              viewBox="0 0 250 96"
              className="h-auto max-w-full rounded-lg border border-slate-200 bg-white"
              aria-label={`${gateType} lojik kapı diyagramı`}
            >
              <line
                x1="16"
                y1="32"
                x2="72"
                y2="32"
                stroke={gateA ? '#047857' : '#64748b'}
                strokeWidth="3"
              />
              <text x="6" y="25" fontSize="12" fontWeight="bold" fill="#0f2342">
                A={gateA}
              </text>
              {!isNot && (
                <>
                  <line
                    x1="16"
                    y1="64"
                    x2="72"
                    y2="64"
                    stroke={gateB ? '#047857' : '#64748b'}
                    strokeWidth="3"
                  />
                  <text x="6" y="81" fontSize="12" fontWeight="bold" fill="#0f2342">
                    B={gateB}
                  </text>
                </>
              )}
              <rect
                x="72"
                y="16"
                width="96"
                height="64"
                rx="12"
                fill="#eff4fb"
                stroke="#0f2342"
                strokeWidth="2.5"
              />
              <text x="120" y="53" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f2342">
                {gateType}
              </text>
              {(gateType === 'NOT' ||
                gateType === 'NAND' ||
                gateType === 'NOR' ||
                gateType === 'XNOR') && (
                <circle cx="174" cy="48" r="5" fill="#fff" stroke="#b91c1c" strokeWidth="2.5" />
              )}
              <line
                x1="179"
                y1="48"
                x2="234"
                y2="48"
                stroke={out ? '#047857' : '#64748b'}
                strokeWidth="3"
              />
              <text
                x="192"
                y="38"
                fontSize="12"
                fontWeight="bold"
                fill={out ? '#047857' : '#b91c1c'}
              >
                Z={out}
              </text>
            </svg>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white font-mono text-sm tabular-nums">
              <thead>
                <tr className="bg-[#0f2342] text-white">
                  <th className="border border-slate-300 px-3 py-2 text-left">A</th>
                  {!isNot && <th className="border border-slate-300 px-3 py-2 text-left">B</th>}
                  <th className="border border-slate-300 px-3 py-2 text-left">Çıkış Z</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => {
                  const match = isNot ? r[0] === gateA : r[0] === gateA && r[1] === gateB;
                  const res = isNot ? r[1] : r[2];
                  return (
                    <tr
                      key={idx}
                      className={
                        match ? 'bg-emerald-100 font-bold text-emerald-950' : 'text-slate-700'
                      }
                    >
                      <td className="border border-slate-200 px-3 py-2">{r[0]}</td>
                      {!isNot && <td className="border border-slate-200 px-3 py-2">{r[1]}</td>}
                      <td className="border border-slate-200 px-3 py-2">{res}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            2. İnteraktif Tabanlar Dönüştürücü (0–15)
          </h2>
          <SlideRefButton weekId="w3" slideNum={5} onPeekSlide={onPeekSlide} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <label className="block text-sm font-bold text-[#0f2342]" htmlFor="dec-slider">
            Onluk (Decimal) Değer: <span className="font-mono text-red-700">{decVal}</span> (0–15 arası)
          </label>
          <input
            id="dec-slider"
            type="range"
            min={0}
            max={15}
            value={decVal}
            onChange={(e) => setDecVal(parseInt(e.target.value, 10))}
            className="my-3 w-full max-w-md accent-[#0f2342]"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm tabular-nums">
              <span className="text-slate-600">Onluk (Base 10)</span>
              <strong className="text-[#0f2342]">{decVal}</strong>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm tabular-nums">
              <span className="text-slate-600">İkilik (Base 2)</span>
              <strong className="text-[#0f2342]">{bin4}</strong>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-mono text-sm tabular-nums">
              <span className="text-slate-600">Sekizlik / Onaltılık</span>
              <strong className="text-[#0f2342]">
                {oct} / {hex}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            3. Boole İndirgeme Çözüm Adımları ve Karnaugh Diyagramı
          </h2>
          <SlideRefButton weekId="w3" slideNum={20} onPeekSlide={onPeekSlide} />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <pre className="min-w-0 overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
{`Soru 1: ABC + ABC' + AB' + BC'
= AB(C + C') + AB' + BC'   [C+C'=1]
= AB + AB' + BC'
= A(B + B') + BC'          [B+B'=1]
= A + BC'

Soru 2: (A+B)(AC+AC'+CC') + AB + B
= (A+B)(AC+AC') + AB + B   [CC'=0]
= (A+B)A + AB + B          [A(C+C')=A]
= A + AB + AB + B          [A.A=A]
= A(1 + B) + B = A + B`}
          </pre>
          <pre className="min-w-0 overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
{`Soru 3 İspat: A + A'B = A + B
= (A + AB) + A'B           [Yutma: A=A+AB]
= A + B(A + A')            [A+A'=1]
= A + B

Karnaugh Örneği (Sayfa 35):
F(x,y,z) = x'yz' + x'yz + xy'z' + xy'z
- Grup 1 (m3, m2): x'yz + x'yz' → x'y
- Grup 2 (m4, m5): xy'z' + xy'z → xy'
Sonuç: F(x,y,z) = x'y + xy'`}
          </pre>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// HAFTA 3: ALGORİTMALAR, AKIŞ ŞEMALARI VE SÖZDE KOD
// ============================================================================
const LabW3: React.FC<{ onPeekSlide: (w: string, s: number) => void }> = ({ onPeekSlide }) => {
  const [algoExample, setAlgoExample] = useState<'sum20' | 'fact' | 'euclid'>('sum20');
  const [algoStep, setAlgoStep] = useState<number>(0);

  const traces: Record<'sum20' | 'fact' | 'euclid', { title: string; slide: number; steps: string[] }> = {
    sum20: {
      title: '1–20 Arası Tamsayıların Toplamı (Sayfa 19)',
      slide: 19,
      steps: [
        'Adım 1: BAŞLA',
        'Adım 2: Sayac = 0, Toplam = 0',
        'Adım 3: Sayac = Sayac + 1 (Örn: 1)',
        'Adım 4: EĞER Sayac > 20 İSE GİT 7 (1 > 20 Hayır)',
        'Adım 5: Toplam = Toplam + Sayac (0 + 1 = 1)',
        'Adım 6: GİT 3 (Sayac 21 olana kadar döner; Toplam = 210)',
        'Adım 7: YAZ "1-20 Arası Sayıların Toplamı=", Toplam',
        'Adım 8: BİTİR',
      ],
    },
    fact: {
      title: 'N! Faktöriyel Sözde Kodu (Örnek N = 4, Sayfa 24)',
      slide: 24,
      steps: [
        '1. BAŞLA',
        '2. N al → N = 4',
        '3. FAKT ← 1, i ← 1',
        '5–7. WHILE i ≤ N (i=1): FAKT ← 1*1=1, i ← 2',
        '5–7. WHILE i ≤ N (i=2): FAKT ← 1*2=2, i ← 3',
        '5–7. WHILE i ≤ N (i=3): FAKT ← 2*3=6, i ← 4',
        '5–7. WHILE i ≤ N (i=4): FAKT ← 6*4=24, i ← 5 (Döngü biter)',
        '9–10. YAZ FAKT (24) → BİTİR',
      ],
    },
    euclid: {
      title: "Euclid's Algoritması (Örnek m = 48, n = 18, Sayfa 26)",
      slide: 26,
      steps: [
        'Başlangıç: m = 48, n = 18',
        'while n ≠ 0 (18 ≠ 0): r ← 48 mod 18 = 12; m ← 18; n ← 12',
        'while n ≠ 0 (12 ≠ 0): r ← 18 mod 12 = 6; m ← 12; n ← 6',
        'while n ≠ 0 (6 ≠ 0): r ← 12 mod 6 = 0; m ← 6; n ← 0',
        'n = 0 olduğu için döngü sonlanır → return m (6)',
      ],
    },
  };

  const tr = traces[algoExample];
  const safeStep = Math.min(algoStep, tr.steps.length - 1);

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            1. Akış Şeması 8 Standart Sembolü
          </h2>
          <SlideRefButton weekId="w4" slideNum={9} onPeekSlide={onPeekSlide} />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0f2342] text-white">
                  <th className="border border-slate-300 px-3 py-2 text-left">Sembol Adı</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">İşlevi (Sayfa 9)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Uçbirim (Terminal)</td>
                  <td className="border border-slate-200 px-3 py-2">İşlemin ya da programın başlayacağı ve sonlanacağı kısmı belirtir.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-semibold">İşlem (Process)</td>
                  <td className="border border-slate-200 px-3 py-2">İşlemcinin ya da belleğin içerisinde gerçekleşecek herhangi bir tipteki işlemi belirtir.</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Girdi / Çıktı (I/O)</td>
                  <td className="border border-slate-200 px-3 py-2">Bilgisayarın veri alacağını ya da çıktı vereceğini belirtir.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Karar (Decision)</td>
                  <td className="border border-slate-200 px-3 py-2">İkili sistemde cevap verilebilecek sorular (Evet/Hayır, Doğru/Yanlış).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="min-w-0 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#0f2342] text-white">
                  <th className="border border-slate-300 px-3 py-2 text-left">Sembol Adı</th>
                  <th className="border border-slate-300 px-3 py-2 text-left">İşlevi (Sayfa 9)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Bağlaç (Connector)</td>
                  <td className="border border-slate-200 px-3 py-2">Çizgiler kesişmeksizin akış diyagramı hazırlanmasını sağlar.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Belirlenmiş Eylem</td>
                  <td className="border border-slate-200 px-3 py-2">Önceden tanımlanmış eylem/fonksiyonların kullanılacağını belirtir (subroutine).</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Belge (Document)</td>
                  <td className="border border-slate-200 px-3 py-2">Bir belgenin girdi olarak alındığını ya da çıktı olarak verildiğini belirtir.</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-semibold">Akış Çizgileri</td>
                  <td className="border border-slate-200 px-3 py-2">Akış yönünü gösterir.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            2. İnteraktif Algoritma Adım İzleyici
          </h2>
          <SlideRefButton weekId="w4" slideNum={tr.slide} onPeekSlide={onPeekSlide} />
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5 rounded-lg bg-slate-100 p-1.5">
          {[
            { id: 'sum20', label: '1–20 Toplamı' },
            { id: 'fact', label: 'N! Faktöriyel' },
            { id: 'euclid', label: 'Euclid Algoritması' },
          ].map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => {
                setAlgoExample(ex.id as 'sum20' | 'fact' | 'euclid');
                setAlgoStep(0);
              }}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                algoExample === ex.id
                  ? 'bg-white text-[#0f2342] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <strong className="text-sm text-[#0f2342]">{tr.title}</strong>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAlgoStep((s) => Math.max(0, s - 1))}
                disabled={safeStep === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 whitespace-nowrap"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Geri
              </button>
              <button
                type="button"
                onClick={() => setAlgoStep((s) => (s + 1) % tr.steps.length)}
                className="inline-flex items-center gap-1 rounded-lg bg-[#0f2342] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3664] whitespace-nowrap"
              >
                Sonraki Adım
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setAlgoStep(0)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Sıfırla
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            {tr.steps.map((stepText, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setAlgoStep(idx)}
                className={`block w-full rounded-lg border px-3.5 py-2 text-left font-mono text-xs transition-colors ${
                  idx === safeStep
                    ? 'border-[#0f2342] bg-[#0f2342] font-bold text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {idx === safeStep ? '▶ ' : ''}
                {stepText}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// HAFTA 4: PROGRAMLAMA DİLLERİ VE OOP
// ============================================================================
const LabW4: React.FC<{ onPeekSlide: (w: string, s: number) => void }> = ({ onPeekSlide }) => {
  const [paradigm, setParadigm] = useState<'emirsel' | 'bildirimsel' | 'fonksiyonel' | 'oop'>('emirsel');
  const [oopLog, setOopLog] = useState<string>('Yukarıdaki sınıf metot veya alan erişim butonlarından birini deneyin.');

  const pCodes = {
    emirsel: {
      title: 'Emirsel (Nasıl yapılacağını adım adım söyle)',
      code: 'int t = 0;\nfor (int i = 1; i <= 5; i++)\n    t = t + i;',
    },
    bildirimsel: {
      title: 'Bildirimsel (Ne istediğini söyle, nasılını sistem bulsun)',
      code: 'SELECT SUM(sayi)\nFROM Sayilar\nWHERE sayi <= 5;',
    },
    fonksiyonel: {
      title: 'Fonksiyonel (Programı fonksiyonların birleşimi olarak kur)',
      code: '(reduce + (range 1 6))\n// LISP ailesi',
    },
    oop: {
      title: 'Nesne Yönelimli (Veri ve davranışı nesnelerde topla)',
      code: 'Sayac s = new Sayac(1, 5);\nint t = s.topla();',
    },
  };

  const pc = pCodes[paradigm];

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            1. Aynı Problem (1&apos;den 5&apos;e Toplam), 4 Farklı Paradigma
          </h2>
          <SlideRefButton weekId="w6" slideNum={17} onPeekSlide={onPeekSlide} />
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5 rounded-lg bg-slate-100 p-1.5">
          {[
            { id: 'emirsel', label: 'Emirsel' },
            { id: 'bildirimsel', label: 'Bildirimsel (SQL)' },
            { id: 'fonksiyonel', label: 'Fonksiyonel (LISP)' },
            { id: 'oop', label: 'Nesne Yönelimli' },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setParadigm(p.id as 'emirsel' | 'bildirimsel' | 'fonksiyonel' | 'oop')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                paradigm === p.id
                  ? 'bg-white text-[#0f2342] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-2 text-sm font-bold text-[#0f2342]">{pc.title}</div>
          <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
            {pc.code}
          </pre>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            2. Bir Programın Yolculuğu ve Hibrit Java Akışı
          </h2>
          <SlideRefButton weekId="w6" slideNum={35} onPeekSlide={onPeekSlide} />
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              Derlenen Programın Yolculuğu (Sayfa 37)
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-lg bg-[#0f2342] px-3 py-1.5 text-white">1. Editör (toplama.c)</span>
              <span className="text-slate-400">→</span>
              <span className="rounded-lg bg-[#0f2342] px-3 py-1.5 text-white">2. Derleyici (toplama.o)</span>
              <span className="text-slate-400">→</span>
              <span className="rounded-lg bg-[#0f2342] px-3 py-1.5 text-white">3. Bağlayıcı / Linker (+ Kütüphane) → toplama.exe</span>
              <span className="text-slate-400">→</span>
              <span className="rounded-lg bg-[#0f2342] px-3 py-1.5 text-white">4. Hata Ayıklayıcı (Debugger)</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
              Hibrit Gerçekleştirim — Java Örneği (Sayfa 35)
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-800">
              <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5">Merhaba.java</span>
              <span className="text-slate-400">→</span>
              <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5">javac (derleyici)</span>
              <span className="text-slate-400">→</span>
              <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5">Merhaba.class (bytecode)</span>
              <span className="text-slate-400">→</span>
              <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5">JVM (yorumlayıcı + JIT)</span>
              <span className="text-slate-400">→</span>
              <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5">Windows / Linux / macOS</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            3. İnteraktif OOP Laboratuvarı: Kapsülleme ve Çok Biçimlilik
          </h2>
          <SlideRefButton weekId="w6" slideNum={45} onPeekSlide={onPeekSlide} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setOopLog(
                  'HATA (Sayfa 45): laser1.RemainingPower = 999; → private alana yalnızca LaserClass içinden erişilebilir!'
                )
              }
              className="max-w-full rounded-lg bg-red-700 px-3.5 py-2 text-left font-mono text-xs font-bold text-white transition-colors hover:bg-red-800 sm:whitespace-nowrap"
            >
              laser1.RemainingPower = 999;
            </button>
            <button
              type="button"
              onClick={() =>
                setOopLog(
                  'GEÇERLİ (Sayfa 45): laser1.fire(); → public metot çağrıldı; güç yalnızca sınıfın kendi metotlarıyla değişebilir.'
                )
              }
              className="rounded-lg bg-emerald-700 px-3.5 py-2 font-mono text-xs font-bold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap"
            >
              laser1.fire();
            </button>
            <button
              type="button"
              onClick={() =>
                setOopLog(
                  'Çok Biçimlilik (Sayfa 47): for (Animal a : hayvanlar) a.makeSound(); → Dog: "Hav hav!" | Cat: "Miyav!" (Doğru davranışı nesnenin kendisi seçer).'
                )
              }
              className="rounded-lg bg-[#0f2342] px-3.5 py-2 font-mono text-xs font-bold text-white transition-colors hover:bg-[#1a3664] whitespace-nowrap"
            >
              hayvanlar.makeSound();
            </button>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800">
            {oopLog}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// HAFTA 5: İŞLETİM SİSTEMLERİ
// ============================================================================
type ProcState = 'hazir' | 'calisir' | 'askida' | 'sonlan';

const LabW5: React.FC<{ onPeekSlide: (w: string, s: number) => void }> = ({ onPeekSlide }) => {
  const [procState, setProcState] = useState<ProcState>('hazir');
  const [procLog, setProcLog] = useState<string>('Program başlatıldı → Hazır havuzuna alındı.');

  const nodes: Array<{ id: ProcState; label: string }> = [
    { id: 'hazir', label: 'HAZIR' },
    { id: 'calisir', label: 'ÇALIŞIR' },
    { id: 'askida', label: 'ASKIDA' },
    { id: 'sonlan', label: 'SONLAN' },
  ];

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            1. İnteraktif Proses Durum Modeli Simülatörü
          </h2>
          <SlideRefButton weekId="w5" slideNum={35} onPeekSlide={onPeekSlide} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-5 flex flex-wrap justify-center gap-3">
            {nodes.map((node) => {
              const active = procState === node.id;
              let activeClass = 'border-slate-300 bg-white text-slate-700';
              if (active) {
                if (node.id === 'askida') activeClass = 'border-amber-700 bg-amber-600 text-white';
                else if (node.id === 'sonlan') activeClass = 'border-red-700 bg-red-700 text-white';
                else activeClass = 'border-emerald-700 bg-emerald-700 text-white';
              }
              return (
                <div
                  key={node.id}
                  className={`rounded-xl border-2 px-6 py-3 text-sm font-extrabold transition-colors ${activeClass}`}
                >
                  {node.label}
                  {active ? ' (AKTİF)' : ''}
                </div>
              );
            })}
          </div>

          <div className="mb-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              disabled={procState !== 'hazir'}
              onClick={() => {
                setProcState('calisir');
                setProcLog("3. Prosesin tekrar sırası gelmiş, CPU'yu kullanabilir (Hazır → Çalışır).");
              }}
              className="rounded-lg bg-[#0f2342] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1a3664] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
            >
              3: Sırası Geldi (Hazır → Çalışır)
            </button>
            <button
              type="button"
              disabled={procState !== 'calisir'}
              onClick={() => {
                setProcState('hazir');
                setProcLog("2. Prosesin CPU'yu kullanma süresi dolmuş, sıra başka prosesin olabilir (Çalışır → Hazır).");
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
            >
              2: Süre Doldu (Çalışır → Hazır)
            </button>
            <button
              type="button"
              disabled={procState !== 'calisir'}
              onClick={() => {
                setProcState('askida');
                setProcLog('1. Olay beklemeye geç — örn. veri beklemek (Çalışır → Askıda).');
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
            >
              1: Olay Bekle (Çalışır → Askıda)
            </button>
            <button
              type="button"
              disabled={procState !== 'askida'}
              onClick={() => {
                setProcState('hazir');
                setProcLog('4. Beklenen olay gerçekleşir, proses çalışmaya hazır (Askıda → Hazır).');
              }}
              className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
            >
              4: Olay Gerçekleşti (Askıda → Hazır)
            </button>
            <button
              type="button"
              disabled={procState !== 'calisir'}
              onClick={() => {
                setProcState('sonlan');
                setProcLog('Süreç bitti, zamanlayıcı süreç tablosundan kaldırdı (Çalışır → Sonlan).');
              }}
              className="rounded-lg bg-red-700 px-3 py-2 text-xs font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
            >
              Sonlandır (Çalışır → Sonlan)
            </button>
            <button
              type="button"
              onClick={() => {
                setProcState('hazir');
                setProcLog('Yeni süreç başlatıldı → Hazır havuzuna alındı.');
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Yeniden Başlat
            </button>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800">
            {procLog}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            2. Yarış Yönetimi ve Kilitlenme (Deadlock — Coffman Koşulları)
          </h2>
          <SlideRefButton weekId="w5" slideNum={42} onPeekSlide={onPeekSlide} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-2 text-sm font-bold text-[#0f2342]">
              4 Coffman Koşulu (Hepsi aynı anda oluşursa Deadlock meydana gelir):
            </div>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
              <li>
                <strong>Mutual exclusion:</strong> Bazı kaynaklar yalnızca bir işlem tarafından aynı anda kullanılabilir.
              </li>
              <li>
                <strong>Hold and wait:</strong> Bir işlem en az bir kaynağı kullanırken, başka bir kaynağın serbest kalmasını bekler.
              </li>
              <li>
                <strong>No preemption:</strong> İşlem tuttuğu kaynakları zorla bırakamaz, ancak kendi isteğiyle bırakabilir.
              </li>
              <li>
                <strong>Circular wait:</strong> İşlemler arasında dairesel bir bekleme zinciri oluşur.
              </li>
            </ol>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-sm font-bold text-[#0f2342]">Sayfa 43 Kilitlenme Senaryosu</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                <strong>Resource 1</strong> → <em>Assigned to</em> → <strong>Process 1</strong>
              </li>
              <li>
                <strong>Process 1</strong> → <em>Waiting For</em> → <strong>Resource 2</strong>
              </li>
              <li>
                <strong>Resource 2</strong> → <em>Assigned to</em> → <strong>Process 2</strong>
              </li>
              <li>
                <strong>Process 2</strong> → <em>Waiting For</em> → <strong>Resource 1</strong>
              </li>
            </ul>
            <p className="mt-3 text-sm font-bold text-red-700">
              Sonuç: Dairesel bekleme zinciri nedeniyle iki işlem de süresiz bloke olur (Kilitlenme).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// HAFTA 6: MİKROİŞLEMCİLER & EK-C SANAL MAKİNE
// ============================================================================
const LabW6: React.FC<{ onPeekSlide: (w: string, s: number) => void }> = ({ onPeekSlide }) => {
  const [vmStep, setVmStep] = useState<number>(0);
  const [vm6C, setVm6C] = useState<number>(5);
  const [vm6D, setVm6D] = useState<number>(7);
  const [busMode, setBusMode] = useState<string>('Anlık');

  const h = (n: number) => (n & 0xff).toString(16).toUpperCase().padStart(2, '0');
  const sum = (vm6C + vm6D) & 0xff;

  const vmSteps = [
    {
      pc: 'A0',
      ir: '----',
      r5: '00',
      r6: '00',
      r0: '00',
      m6e: '00',
      desc: 'Başlangıç: Program A0 adresinden başlayarak belleğe yerleştirildi. PC = A0.',
    },
    {
      pc: 'A2',
      ir: '156C',
      r5: h(vm6C),
      r6: '00',
      r0: '00',
      m6e: '00',
      desc: `Adım 1 (Getir→Çöz→Yürüt): 156C IR'ye alınır, PC=A2 olur. 6C hücresindeki ${vm6C} (0x${h(vm6C)}) yazmaç 5'e yüklenir.`,
    },
    {
      pc: 'A4',
      ir: '166D',
      r5: h(vm6C),
      r6: h(vm6D),
      r0: '00',
      m6e: '00',
      desc: `Adım 2: 166D IR'ye alınır, PC=A4 olur. 6D hücresindeki ${vm6D} (0x${h(vm6D)}) yazmaç 6'ya yüklenir.`,
    },
    {
      pc: 'A6',
      ir: '5056',
      r5: h(vm6C),
      r6: h(vm6D),
      r0: h(sum),
      m6e: '00',
      desc: `Adım 3: 5056 IR'ye alınır, PC=A6 olur. ALU R5 ve R6'yı toplar, sonucu (${sum} = 0x${h(sum)}) yazmaç 0'a yazar.`,
    },
    {
      pc: 'A8',
      ir: '306E',
      r5: h(vm6C),
      r6: h(vm6D),
      r0: h(sum),
      m6e: h(sum),
      desc: "Adım 4: 306E IR'ye alınır, PC=A8 olur. Yazmaç 0'ın içeriği 6E bellek hücresine kaydedilir.",
    },
    {
      pc: 'AA',
      ir: 'C000',
      r5: h(vm6C),
      r6: h(vm6D),
      r0: h(sum),
      m6e: h(sum),
      desc: 'Adım 5: C000 IR\'ye alınır, PC=AA olur. HALT — Program yürütülmesi durdurulur.',
    },
  ];

  const cur = vmSteps[vmStep];

  const addrModes: Record<string, { cmd: string; desc: string }> = {
    Anlık: { cmd: 'MOV CL, 16h', desc: "Sabit değer doğrudan CL'ye yazılır" },
    Doğrudan: { cmd: 'MOV AX, [1000]', desc: "1000 adresindeki veri AX'e alınır" },
    Dolaylı: { cmd: 'MOV AX, [SI]', desc: 'Adres SI kaydedicisinden okunur' },
    Kaydedici: { cmd: 'MOV AL, BL', desc: 'İki kaydedici arasında aktarım' },
    İndisli: { cmd: 'MOV AX, [SI+4]', desc: "SI'daki adrese 4 eklenir" },
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            1. İnteraktif Sanal Makine (Ek-C) Çalıştırıcısı
          </h2>
          <SlideRefButton weekId="w7" slideNum={40} onPeekSlide={onPeekSlide} />
        </div>
        <p className="mb-3 text-sm text-slate-600">
          Sayfa 40–42&apos;deki toplama programını (<code>156C, 166D, 5056, 306E, C000</code>) adım adım çalıştırın:
        </p>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <label className="text-xs font-bold text-slate-700">
              Hücre [6C]:
              <input
                type="number"
                min={0}
                max={127}
                value={vm6C}
                onChange={(e) => setVm6C(Math.max(0, Math.min(127, parseInt(e.target.value, 10) || 0)))}
                className="ml-2 w-20 rounded border border-slate-300 bg-white px-2 py-1 font-mono text-sm"
              />
            </label>
            <label className="text-xs font-bold text-slate-700">
              Hücre [6D]:
              <input
                type="number"
                min={0}
                max={127}
                value={vm6D}
                onChange={(e) => setVm6D(Math.max(0, Math.min(127, parseInt(e.target.value, 10) || 0)))}
                className="ml-2 w-20 rounded border border-slate-300 bg-white px-2 py-1 font-mono text-sm"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setVmStep(0)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Sıfırla
              </button>
              <button
                type="button"
                onClick={() => setVmStep((s) => Math.min(5, s + 1))}
                disabled={vmStep >= 5}
                className="inline-flex items-center gap-1 rounded-lg bg-[#0f2342] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1a3664] disabled:opacity-40 whitespace-nowrap"
              >
                Sonraki Döngü Adımı
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setVmStep(5)}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 whitespace-nowrap"
              >
                <Play className="h-3.5 w-3.5" />
                Sonuna Git
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-amber-400 bg-amber-50 px-3 py-2 font-mono text-xs font-bold">
                <span>PC (Program Sayacı)</span>
                <span>{cur.pc}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-amber-400 bg-amber-50 px-3 py-2 font-mono text-xs font-bold">
                <span>IR (Komut Yazmacı)</span>
                <span>{cur.ir}</span>
              </div>
              <div
                className={`flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-xs ${
                  vmStep === 1 ? 'border-amber-400 bg-amber-50 font-bold' : 'border-slate-200 bg-white'
                }`}
              >
                <span>Yazmaç 5 (R5)</span>
                <span>0x{cur.r5}</span>
              </div>
              <div
                className={`flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-xs ${
                  vmStep === 2 ? 'border-amber-400 bg-amber-50 font-bold' : 'border-slate-200 bg-white'
                }`}
              >
                <span>Yazmaç 6 (R6)</span>
                <span>0x{cur.r6}</span>
              </div>
              <div
                className={`flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-xs ${
                  vmStep === 3 ? 'border-amber-400 bg-amber-50 font-bold' : 'border-slate-200 bg-white'
                }`}
              >
                <span>Yazmaç 0 (R0)</span>
                <span>0x{cur.r0}</span>
              </div>
              <div
                className={`flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-xs ${
                  vmStep >= 4 ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-950' : 'border-slate-200 bg-white'
                }`}
              >
                <span>Bellek [6E]</span>
                <span>
                  0x{cur.m6e} ({parseInt(cur.m6e, 16)})
                </span>
              </div>
            </div>

            <div className="min-w-0 overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
              <div className={vmStep === 1 ? 'font-bold text-amber-300' : ''}>
                A0-A1: 15 6C {vmStep === 1 ? '◀ Yürütülüyor (LOAD R5, [6C])' : ''}
              </div>
              <div className={vmStep === 2 ? 'font-bold text-amber-300' : ''}>
                A2-A3: 16 6D {vmStep === 2 ? '◀ Yürütülüyor (LOAD R6, [6D])' : ''}
              </div>
              <div className={vmStep === 3 ? 'font-bold text-amber-300' : ''}>
                A4-A5: 50 56 {vmStep === 3 ? '◀ Yürütülüyor (ADD R0, R5, R6)' : ''}
              </div>
              <div className={vmStep === 4 ? 'font-bold text-amber-300' : ''}>
                A6-A7: 30 6E {vmStep === 4 ? '◀ Yürütülüyor (STORE R0, [6E])' : ''}
              </div>
              <div className={vmStep === 5 ? 'font-bold text-emerald-300' : ''}>
                A8-A9: C0 00 {vmStep === 5 ? '◀ HALT (Dur)' : ''}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800">
            {cur.desc}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-[#0f2342]">
            2. Adresleme Modları Gezgini
          </h2>
          <SlideRefButton weekId="w7" slideNum={20} onPeekSlide={onPeekSlide} />
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5 rounded-lg bg-slate-100 p-1.5">
          {Object.keys(addrModes).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setBusMode(m)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                busMode === m
                  ? 'bg-white text-[#0f2342] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <strong className="text-[#0f2342]">{busMode} Adresleme:</strong>{' '}
          <code className="mx-1 rounded bg-white px-2 py-0.5 font-mono font-bold text-red-700">
            {addrModes[busMode].cmd}
          </code>{' '}
          — {addrModes[busMode].desc}
        </div>
      </section>
    </div>
  );
};
