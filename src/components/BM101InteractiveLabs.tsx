import React, { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  BookOpen,
  Layers,
  Cpu,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Terminal,
} from 'lucide-react';
import { BM101WeekModule } from '../types/bm101';

interface BM101InteractiveLabsProps {
  week: BM101WeekModule;
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number) => void;
}

interface TraceStep {
  stepNum: number;
  activeLine: number;
  title: string;
  whatHappens: string;
  memory: Array<{ scope: string; name: string; val: string; highlight?: boolean }>;
  stack?: Array<{ fn: string; vars: string; retAddr: string; active?: boolean }>;
  consoleOut: string;
  phase?: 'push' | 'base' | 'pop' | 'normal';
}

/* ============================================================
   HELPER: Generic Step-by-Step Execution & Memory Tracer UI
   ============================================================ */
const ExecutionTracerPanel: React.FC<{
  heading: string;
  codeLines: string[];
  steps: TraceStep[];
  accentLabel?: string;
}> = ({ heading, codeLines, steps, accentLabel }) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setStepIdx(0);
    setPlaying(false);
  }, [heading]);

  useEffect(() => {
    if (!playing) return;
    if (stepIdx >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => {
      setStepIdx((s) => Math.min(steps.length - 1, s + 1));
    }, 1450);
    return () => window.clearTimeout(t);
  }, [playing, stepIdx, steps.length]);

  const cur = steps[Math.min(stepIdx, steps.length - 1)];

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          {accentLabel && (
            <div className="text-[11px] font-bold uppercase tracking-wide text-[#A55704]">
              {accentLabel}
            </div>
          )}
          <h3 className="text-base font-extrabold text-[#09251C]">{heading}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStepIdx(0);
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Başa Al
          </button>
          <button
            type="button"
            disabled={stepIdx === 0}
            onClick={() => {
              setPlaying(false);
              setStepIdx((s) => Math.max(0, s - 1));
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
          >
            <SkipBack className="h-3.5 w-3.5" />
            Önceki
          </button>
          <button
            type="button"
            onClick={() => {
              if (stepIdx >= steps.length - 1) setStepIdx(0);
              setPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-1 rounded-lg bg-[#09251C] px-3 py-1.5 text-xs font-bold text-[#F8EADC] hover:bg-[#0f3a2c]"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? 'Durdur' : 'Oynat'}
          </button>
          <button
            type="button"
            disabled={stepIdx >= steps.length - 1}
            onClick={() => {
              setPlaying(false);
              setStepIdx((s) => Math.min(steps.length - 1, s + 1));
            }}
            className="inline-flex items-center gap-1 rounded-lg bg-[#A55704] px-3 py-1.5 text-xs font-bold text-[#F8EADC] hover:bg-[#894603] disabled:opacity-40"
          >
            Sonraki Adım
            <SkipForward className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Step Indicator Strip */}
      <div className="flex flex-wrap items-center gap-1.5">
        {steps.map((st, idx) => (
          <button
            key={st.stepNum}
            type="button"
            onClick={() => {
              setPlaying(false);
              setStepIdx(idx);
            }}
            className={`rounded-md border px-2.5 py-1 font-mono text-xs font-bold tabular-nums transition-colors ${
              idx === stepIdx
                ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                : idx < stepIdx
                ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                : 'border-slate-200 bg-[#FAF6F0] text-slate-600 hover:bg-[#F5ECE0]'
            }`}
          >
            Adım {st.stepNum}
          </button>
        ))}
      </div>

      {/* Main Split Stage */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Code Column */}
        <div className="min-w-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 text-slate-100 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-300">
            <span>C Kaynak Kodu</span>
            <span className="font-mono text-[#F3D2AF]">Satır {cur.activeLine}</span>
          </div>
          <div className="overflow-x-auto p-3 font-mono text-xs leading-6">
            {codeLines.map((line, i) => {
              const lineNum = i + 1;
              const isActive = lineNum === cur.activeLine;
              return (
                <div
                  key={lineNum}
                  className={`flex items-start gap-2.5 rounded px-2 ${
                    isActive ? 'bg-amber-500/25 font-bold text-amber-200 ring-1 ring-amber-400/50' : 'text-slate-300'
                  }`}
                >
                  <span className="w-5 shrink-0 select-none text-right text-slate-500">
                    {lineNum}
                  </span>
                  <span className="whitespace-pre">{line || ' '}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Stage: What happens + Memory + Call Stack + Console */}
        <div className="min-w-0 space-y-3.5 lg:col-span-7">
          {/* Step Explanation Banner */}
          <div
            className={`rounded-xl border p-3.5 ${
              cur.phase === 'base'
                ? 'border-emerald-300 bg-emerald-50'
                : cur.phase === 'pop'
                ? 'border-sky-300 bg-sky-50'
                : 'border-amber-300 bg-amber-50/80'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-extrabold uppercase text-[#09251C]">
                Adım {cur.stepNum} / {steps.length} · {cur.title}
              </span>
              {cur.phase && cur.phase !== 'normal' && (
                <span
                  className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold ${
                    cur.phase === 'push'
                      ? 'bg-[#09251C] text-[#F8EADC]'
                      : cur.phase === 'base'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-sky-700 text-white'
                  }`}
                >
                  {cur.phase === 'push' && (
                    <>
                      <ArrowDown className="h-3 w-3" /> Yığıta Ekle (PUSH)
                    </>
                  )}
                  {cur.phase === 'base' && 'Temel Durum (BASE CASE)'}
                  {cur.phase === 'pop' && (
                    <>
                      <ArrowUp className="h-3 w-3" /> Geri Dön &amp; Çıkar (POP)
                    </>
                  )}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-800">{cur.whatHappens}</p>
          </div>

          {/* Live Memory Cells */}
          <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-3.5">
            <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-[#09251C]">
              Bu Adımda Bellekteki (RAM) Geçerli Değerler
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {cur.memory.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs ${
                    m.highlight
                      ? 'border-red-400 bg-red-50 font-bold text-red-950'
                      : 'border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold text-slate-500">{m.scope}</div>
                    <div className="font-mono font-bold text-[#09251C]">{m.name}</div>
                  </div>
                  <span className="shrink-0 rounded bg-[#09251C] px-2 py-0.5 font-mono text-xs font-bold text-[#F3D2AF]">
                    {m.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Call Stack (if present for this tracer) */}
          {cur.stack && cur.stack.length > 0 && (
            <div className="rounded-xl border border-[#09251C]/25 bg-white p-3.5">
              <div className="mb-2 flex items-center justify-between text-xs font-extrabold uppercase tracking-wide text-[#09251C]">
                <span>Function Call Stack (Üstten Alta · LIFO)</span>
                <span className="font-mono text-[11px] text-slate-500">
                  Aktif Çerçeve: {cur.stack.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {[...cur.stack].reverse().map((frame, fIdx) => (
                  <div
                    key={fIdx}
                    className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 font-mono text-xs ${
                      frame.active || fIdx === 0
                        ? 'border-[#A55704] bg-[#F8EADC]/70 font-bold text-[#09251C]'
                        : 'border-slate-200 bg-[#FAF6F0] text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-[#A55704]">{fIdx === 0 ? '▶ ' : ''}</span>
                      <span>{frame.fn}</span>
                      <span className="ml-2 text-slate-600">[{frame.vars}]</span>
                    </div>
                    <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] text-slate-700">
                      Dönüş: {frame.retAddr}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Console Output */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 text-emerald-300">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              <Terminal className="h-3.5 w-3.5" />
              Bu Ana Kadar Konsol Ekran Çıktısı
            </div>
            <pre className="min-h-[36px] overflow-x-auto font-mono text-xs leading-relaxed">
              {cur.consoleOut || '(Henüz ekrana çıktı basılmadı)'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   WEEK 1 LAB: CPU/Memory + Lab 1 Average Simulator
   ============================================================ */
const Week1Lab: React.FC<{ onPeek: BM101InteractiveLabsProps['onPeekSlide'] }> = ({ onPeek }) => {
  const [n1, setN1] = useState(5);
  const [n2, setN2] = useState(8);
  const [useFloat, setUseFloat] = useState(true);
  const [activeComp, setActiveComp] = useState<'alu' | 'cu' | 'reg' | 'ram' | 'disk'>('alu');

  const compInfo = {
    alu: {
      title: 'ALU (Arithmetic Logic Unit)',
      desc: 'Toplama, çıkarma, çarpma, bölme gibi aritmetik işlemler ile (<, >, ==) karşılaştırma işlemlerini yürütür.',
    },
    cu: {
      title: 'CU (Control Unit — Kontrol Birimi)',
      desc: 'Bellekten komutları sırayla getirir, çözer ve ALU ile bellek arasındaki veri trafiğini koordine eder.',
    },
    reg: {
      title: 'Registers (Yazmaçlar)',
      desc: 'CPU içindeki en hızlı ancak en küçük kapasiteli geçici veri hücreleridir (PC, CIR, AC, MAR, MDR).',
    },
    ram: {
      title: 'Birincil Bellek (RAM — Volatile)',
      desc: 'Çalışan C programlarının değişkenlerini tutar. Elektrik kesildiğinde tüm veri silinir.',
    },
    disk: {
      title: 'İkincil Bellek (SSD / HDD — Non-volatile)',
      desc: 'Kaynak kodları (.c) ve derlenmiş .exe dosyalarını elektrik kesilse bile kalıcı olarak saklar.',
    },
  };

  const intAvg = Math.trunc((n1 + n2) / 2);
  const floatAvg = ((n1 + n2) / 2).toFixed(2);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-[#09251C]">
              1. Bilgisayar Mimarisi: CPU &amp; Bellek Etkileşimi
            </h3>
            <p className="text-xs text-slate-600">Bileşene tıklayarak görevini ve geçicilik durumunu inceleyin.</p>
          </div>
          <button
            type="button"
            onClick={() => onPeek('1__Giri__af4dadda.pdf', '1_ Giriş.pdf', 8)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#09251C] hover:bg-slate-100"
          >
            <BookOpen className="h-3.5 w-3.5" />
            1_ Giriş.pdf s.8
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {(
            [
              { id: 'cu', label: 'Control Unit' },
              { id: 'alu', label: 'ALU' },
              { id: 'reg', label: 'Registers' },
              { id: 'ram', label: 'RAM (Volatile)' },
              { id: 'disk', label: 'SSD/HDD (Kalıcı)' },
            ] as const
          ).map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveComp(b.id)}
              className={`rounded-lg border px-3 py-2.5 text-xs font-bold transition-colors ${
                activeComp === b.id
                  ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                  : 'border-slate-200 bg-[#FAF6F0] text-slate-700 hover:bg-[#F5ECE0]'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-[#A55704]/30 bg-[#FAF6F0] p-3.5">
          <div className="text-sm font-bold text-[#09251C]">{compInfo[activeComp].title}</div>
          <p className="mt-1 text-xs leading-relaxed text-slate-700">{compInfo[activeComp].desc}</p>
        </div>
      </div>

      {/* Lab 1 Simulator */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-[#09251C]">
              2. Lab 1 Simülatörü: İki Sayının Ortalaması (float vs int Farkı)
            </h3>
            <p className="text-xs text-slate-600">Sayıları ve veri tipini değiştirerek %.2f çıktısının nasıl etkilendiğini görün.</p>
          </div>
          <button
            type="button"
            onClick={() => onPeek('lab_260928_1e9ffad1.pdf', 'lab_260928.pdf', 10)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#09251C] hover:bg-slate-100"
          >
            <BookOpen className="h-3.5 w-3.5" />
            lab_260928.pdf s.10
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <label className="mb-1 flex justify-between text-xs font-bold text-slate-700">
                <span>1. Sayı (sayi1):</span>
                <span className="font-mono text-[#09251C]">{n1}</span>
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={n1}
                onChange={(e) => setN1(Number(e.target.value))}
                className="w-full accent-[#09251C]"
              />
            </div>
            <div>
              <label className="mb-1 flex justify-between text-xs font-bold text-slate-700">
                <span>2. Sayı (sayi2):</span>
                <span className="font-mono text-[#09251C]">{n2}</span>
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="w-full accent-[#09251C]"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUseFloat(true)}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-bold ${
                  useFloat ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                float kullan (Doğru: %.2f)
              </button>
              <button
                type="button"
                onClick={() => setUseFloat(false)}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-bold ${
                  !useFloat ? 'border-red-700 bg-red-700 text-white' : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                int kullan (Hatalı Tam Bölme)
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-100">
            <div className="text-slate-400">// Aktif Hesaplama</div>
            <div className="mt-1 text-sky-300">
              {useFloat ? `float ort = (${n1}.0 + ${n2}.0) / 2;` : `int ort = (${n1} + ${n2}) / 2;`}
            </div>
            <div className="mt-3 border-t border-slate-700 pt-2 text-emerald-300">
              Konsol Çıktısı: Ortalama: {useFloat ? floatAvg : intAvg}
            </div>
            {!useFloat && (n1 + n2) % 2 !== 0 && (
              <div className="mt-2 text-amber-300">
                Dikkat: ({n1}+{n2})/2 = {(n1 + n2) / 2} iken int kullanıldığı için .5 kesilip atıldı!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   WEEK 2 LAB: 6-Phase C Cycle + Flowchart Factorial Tracer
   ============================================================ */
const Week2Lab: React.FC<{ onPeek: BM101InteractiveLabsProps['onPeekSlide'] }> = ({ onPeek }) => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [factInput, setFactInput] = useState(4);

  const phases = [
    { name: '1. Edit', file: 'prog.c', desc: 'Kaynak kod editörde yazılır ve diske kaydedilir.' },
    { name: '2. Preprocess', file: 'prog.i', desc: '#include ve #define önişlemci komutları koda açılır.' },
    { name: '3. Compile', file: 'prog.obj', desc: 'Derleyici söz dizimini kontrol edip makine/nesne koduna çevirir.' },
    { name: '4. Link', file: 'prog.exe', desc: 'printf, scanf gibi kütüphane fonksiyonları bağlanarak çalıştırılabilir dosya üretilir.' },
    { name: '5. Load', file: 'RAM', desc: 'Loader programı ikincil bellekten ana belleğe (RAM) yükler.' },
    { name: '6. Execute', file: 'CPU', desc: 'CPU komutları tek tek alır, çözer ve çalıştırır.' },
  ];

  // Dynamic Factorial Flowchart trace for chosen x
  const factSteps: TraceStep[] = [];
  let stepN = 1;
  factSteps.push({
    stepNum: stepN++,
    activeLine: 1,
    title: 'Başla & x Okuma',
    whatHappens: `Kullanıcıdan x = ${factInput} okundu ve sonuc = 1 olarak başlatıldı.`,
    memory: [
      { scope: 'Akış', name: 'x', val: String(factInput), highlight: true },
      { scope: 'Akış', name: 'sonuc', val: '1', highlight: true },
    ],
    consoleOut: '',
  });
  let curX = factInput;
  let curRes = 1;
  while (curX >= 1) {
    const prevRes = curRes;
    curRes = curX * curRes;
    factSteps.push({
      stepNum: stepN++,
      activeLine: 3,
      title: `Karar: x (${curX}) >= 1 → EVET`,
      whatHappens: `sonuc = ${curX} * ${prevRes} = ${curRes} hesaplandı; sonra x bir azaltılarak ${curX - 1} yapıldı.`,
      memory: [
        { scope: 'Akış', name: 'x (yeni)', val: String(curX - 1), highlight: true },
        { scope: 'Akış', name: 'sonuc', val: String(curRes), highlight: true },
      ],
      consoleOut: '',
    });
    curX -= 1;
  }
  factSteps.push({
    stepNum: stepN,
    activeLine: 5,
    title: `Karar: x (${curX}) >= 1 → HAYIR (Döngü Biter)`,
    whatHappens: `Koşul yanlış olduğu için döngüden çıkılır ve ekrana sonuc = ${curRes} yazdırılır.`,
    memory: [
      { scope: 'Akış', name: 'x', val: '0' },
      { scope: 'Akış', name: 'sonuc', val: String(curRes), highlight: true },
    ],
    consoleOut: `${factInput}! = ${curRes}`,
  });

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-[#09251C]">
              1. C Programı Geliştirme 6 Fazı (Ders 2 s.36)
            </h3>
            <p className="text-xs text-slate-600">Her faza tıklayarak hangi dosyanın oluştuğunu ve hangi hataların nerede çıktığını inceleyin.</p>
          </div>
          <button
            type="button"
            onClick={() => onPeek('2-_Algoritma_ve_Ak___Diyagramlar__5171d132.pdf', '2- Algoritma ve Akış Diyagramları.pdf', 36)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#09251C] hover:bg-slate-100"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Ders 2 s.36
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {phases.map((p, idx) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setPhaseIdx(idx)}
              className={`rounded-lg border p-2.5 text-left transition-colors ${
                phaseIdx === idx
                  ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                  : 'border-slate-200 bg-[#FAF6F0] text-slate-800 hover:bg-[#F5ECE0]'
              }`}
            >
              <div className="text-xs font-bold">{p.name}</div>
              <div className={`mt-0.5 font-mono text-[11px] ${phaseIdx === idx ? 'text-[#F3D2AF]' : 'text-[#A55704]'}`}>
                {p.file}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-slate-200 bg-[#FAF6F0] p-3 text-xs leading-relaxed text-slate-800">
          <strong className="text-[#09251C]">{phases[phaseIdx].name}:</strong> {phases[phaseIdx].desc}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#09251C]">Lab 2 Faktöriyel Akışı için x değeri seçin:</span>
          <div className="flex gap-1.5">
            {[3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setFactInput(n)}
                className={`rounded px-3 py-1 font-mono text-xs font-bold ${
                  factInput === n ? 'bg-[#09251C] text-[#F8EADC]' : 'border border-slate-300 bg-white text-slate-700'
                }`}
              >
                x = {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ExecutionTracerPanel
        accentLabel="Lab 2 s.12 Akış Şeması Adım Takibi"
        heading={`Faktöriyel Akış Diyagramı Bellek İzleyici (x = ${factInput})`}
        codeLines={[
          'Oku x;  sonuc = 1;',
          'while (x >= 1) {',
          '    sonuc = x * sonuc;',
          '    x = x - 1;',
          '}  Yaz(sonuc);',
        ]}
        steps={factSteps}
      />
    </div>
  );
};

/* ============================================================
   WEEK 3 LAB: Scanf Memory Arrows + ++a/a++ + ASCII
   ============================================================ */
const Week3Lab: React.FC<{ onPeek: BM101InteractiveLabsProps['onPeekSlide'] }> = ({ onPeek }) => {
  const [asciiChar, setAsciiChar] = useState<'0' | 'A' | 'a' | '2'>('0');
  const [prefixInit, setPrefixInit] = useState(10);

  const asciiMap = {
    '0': { dec: 48, bin: '00110000' },
    '2': { dec: 50, bin: '00110010' },
    A: { dec: 65, bin: '01000001' },
    a: { dec: 97, bin: '01100001' },
  };

  const scanfSteps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 1,
      title: 'Değişken Tanımlama (RAM Yer Ayırma)',
      whatHappens: 'int a, b, c; ile bellekte 3 adet 4-byte tam sayı kutusu ayrılır. İlk değerleri henüz tanımsız (çöp değer) durumdadır.',
      memory: [
        { scope: 'Adres 0x1000', name: 'a', val: '? (tanımsız)' },
        { scope: 'Adres 0x1004', name: 'b', val: '? (tanımsız)' },
        { scope: 'Adres 0x1008', name: 'c', val: '? (tanımsız)' },
      ],
      consoleOut: '',
    },
    {
      stepNum: 2,
      activeLine: 3,
      title: 'scanf("%d", &a) Çalışması',
      whatHappens: 'Kullanıcı klavyeden 5 yazar. &a adresi (0x1000) scanf’e verildiği için 5 doğrudan a hücresine yazılır!',
      memory: [
        { scope: 'Adres 0x1000', name: 'a', val: '5', highlight: true },
        { scope: 'Adres 0x1004', name: 'b', val: '?' },
        { scope: 'Adres 0x1008', name: 'c', val: '?' },
      ],
      consoleOut: '1. sayiyi girin: 5',
    },
    {
      stepNum: 3,
      activeLine: 5,
      title: 'scanf("%d", &b) Çalışması',
      whatHappens: 'Kullanıcı klavyeden 7 yazar. &b adresi (0x1004) üzerinden b hücresi 7 olarak güncellenir.',
      memory: [
        { scope: 'Adres 0x1000', name: 'a', val: '5' },
        { scope: 'Adres 0x1004', name: 'b', val: '7', highlight: true },
        { scope: 'Adres 0x1008', name: 'c', val: '?' },
      ],
      consoleOut: '1. sayiyi girin: 5\n2. sayiyi girin: 7',
    },
    {
      stepNum: 4,
      activeLine: 6,
      title: 'c = a + b Hesaplaması',
      whatHappens: 'Bellekten a (5) ve b (7) okunup ALU’da toplanır; 12 sonucu c (0x1008) hücresine yazılır.',
      memory: [
        { scope: 'Adres 0x1000', name: 'a', val: '5' },
        { scope: 'Adres 0x1004', name: 'b', val: '7' },
        { scope: 'Adres 0x1008', name: 'c', val: '12', highlight: true },
      ],
      consoleOut: '1. sayiyi girin: 5\n2. sayiyi girin: 7',
    },
    {
      stepNum: 5,
      activeLine: 7,
      title: 'printf("%d+%d=%d", a, b, c)',
      whatHappens: 'Üç değişkenin güncel bellek değerleri okunarak formatlı şekilde konsola basılır.',
      memory: [
        { scope: 'Adres 0x1000', name: 'a', val: '5' },
        { scope: 'Adres 0x1004', name: 'b', val: '7' },
        { scope: 'Adres 0x1008', name: 'c', val: '12' },
      ],
      consoleOut: '1. sayiyi girin: 5\n2. sayiyi girin: 7\n5+7=12',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4">
        <span className="text-xs font-bold text-[#09251C]">
          Lab 3 Sayfa 30 Scanf Bellek Diyagramının Birebir Adım Simülasyonu
        </span>
        <button
          type="button"
          onClick={() => onPeek('lab_261012_77753471.pdf', 'lab_261012.pdf', 30)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#09251C] hover:bg-slate-100"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Slaytı Gör (lab_261012.pdf s.30)
        </button>
      </div>

      <ExecutionTracerPanel
        accentLabel="Lab 3 s.30 Bellek ve İşaretçi (&) İzleme"
        heading="scanf ve RAM Hücresi Adım Adım Güncelleme"
        codeLines={[
          'int a, b, c;',
          'printf("1. sayiyi girin: ");',
          'scanf("%d", &a);',
          'printf("2. sayiyi girin: ");',
          'scanf("%d", &b);',
          'c = a + b;',
          'printf("%d+%d=%d", a, b, c);',
        ]}
        steps={scanfSteps}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-2 text-xs font-extrabold text-[#09251C]">
            ASCII %c / %d Dönüştürücü (Lab 3 s.26–27)
          </div>
          <div className="flex gap-2">
            {(['0', '2', 'A', 'a'] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setAsciiChar(c)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-bold ${
                  asciiChar === c ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]' : 'bg-[#FAF6F0] text-slate-700'
                }`}
              >
                &apos;{c}&apos;
              </button>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-100">
            <div>printf(&quot;%c&quot;, c) → <span className="text-emerald-300">{asciiChar}</span></div>
            <div>printf(&quot;%d&quot;, c) → <span className="text-sky-300">{asciiMap[asciiChar].dec}</span></div>
            <div>8-bit İkili → <span className="text-amber-300">{asciiMap[asciiChar].bin}</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between text-xs font-extrabold text-[#09251C]">
            <span>Ön vs Son Artırım (++a ve a++)</span>
            <input
              type="number"
              value={prefixInit}
              onChange={(e) => setPrefixInit(Number(e.target.value) || 0)}
              className="w-16 rounded border border-slate-300 px-2 py-0.5 text-center font-mono text-xs"
            />
          </div>
          <div className="space-y-1.5 rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-100">
            <div>Başlangıç: a = {prefixInit}</div>
            <div className="text-sky-300">b = ++a; → Önce a={prefixInit + 1}, sonra b={prefixInit + 1}</div>
            <div className="text-amber-300">b = a++; (sıfırdan) → Önce b={prefixInit}, sonra a={prefixInit + 1}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   WEEK 4 LAB: Control Flow, Nested Loop & == vs = Tracer
   ============================================================ */
const Week4Lab: React.FC<{ onPeek: BM101InteractiveLabsProps['onPeekSlide'] }> = ({ onPeek }) => {
  const [scenario, setScenario] = useState<'while3' | 'nested' | 'continueBreak'>('nested');

  const whileSteps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 1,
      title: 'Başlangıç Ataması',
      whatHappens: 'product değişkeni 3 olarak bellekte oluşturulur.',
      memory: [{ scope: 'main', name: 'product', val: '3', highlight: true }],
      consoleOut: '',
    },
    {
      stepNum: 2,
      activeLine: 2,
      title: '1. Koşul: 3 <= 100 (DOĞRU)',
      whatHappens: '3 <= 100 sağlandığı için gövde çalışır: product = 3 * 3 = 9.',
      memory: [{ scope: 'main', name: 'product', val: '9', highlight: true }],
      consoleOut: '',
    },
    {
      stepNum: 3,
      activeLine: 3,
      title: '2. Koşul: 9 <= 100 (DOĞRU)',
      whatHappens: 'product = 3 * 9 = 27 olur.',
      memory: [{ scope: 'main', name: 'product', val: '27', highlight: true }],
      consoleOut: '',
    },
    {
      stepNum: 4,
      activeLine: 3,
      title: '3. Koşul: 27 <= 100 (DOĞRU)',
      whatHappens: 'product = 3 * 27 = 81 olur.',
      memory: [{ scope: 'main', name: 'product', val: '81', highlight: true }],
      consoleOut: '',
    },
    {
      stepNum: 5,
      activeLine: 3,
      title: '4. Koşul: 81 <= 100 (DOĞRU)',
      whatHappens: '81 hâlâ 100’den küçük olduğu için döngü bir kez daha çalışır: product = 3 * 81 = 243!',
      memory: [{ scope: 'main', name: 'product', val: '243', highlight: true }],
      consoleOut: '',
    },
    {
      stepNum: 6,
      activeLine: 5,
      title: '5. Koşul: 243 <= 100 (YANLIŞ → Çıkış)',
      whatHappens: 'Koşul sağlanmaz ve döngüden çıkılır. Sınavda sık sorulan sonuç: product = 243.',
      memory: [{ scope: 'main', name: 'product', val: '243', highlight: true }],
      consoleOut: 'Sonuc: 243',
    },
  ];

  const nestedSteps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 1,
      title: 'm = 0 Başlangıcı',
      whatHappens: 'Dış döngü m=0 ile başlar. İç döngü n=0 için n < m (0 < 0) YANLIŞ olduğundan hiç çalışmaz.',
      memory: [
        { scope: 'Dış for', name: 'm', val: '0', highlight: true },
        { scope: 'İç for', name: 'n', val: '0 (girmedi)' },
      ],
      consoleOut: 'B',
    },
    {
      stepNum: 2,
      activeLine: 3,
      title: 'm = 1 Turu (n=0 → 1 kez A)',
      whatHappens: 'n=0 (< 1) için 1 kez "A" basılır. n=1 olunca iç döngü biter ve "B\\n" basılır.',
      memory: [
        { scope: 'Dış for', name: 'm', val: '1', highlight: true },
        { scope: 'İç for', name: 'n', val: '1 (çıkış)' },
      ],
      consoleOut: 'B\nAB',
    },
    {
      stepNum: 3,
      activeLine: 3,
      title: 'm = 2 Turu (n=0, 1 → 2 kez A)',
      whatHappens: 'İç döngü n=0 ve n=1 için 2 kez "A" basar, sonra "B\\n" eklenir.',
      memory: [
        { scope: 'Dış for', name: 'm', val: '2', highlight: true },
        { scope: 'İç for', name: 'n', val: '2 (çıkış)' },
      ],
      consoleOut: 'B\nAB\nAAB',
    },
    {
      stepNum: 4,
      activeLine: 5,
      title: 'm = 3 Turu (n=0, 1, 2 → 3 kez A)',
      whatHappens: 'İç döngü 3 kez "A" basar ve "B\\n" ile 4. satır tamamlanır. Ardından m=4 olunca dış döngü biter.',
      memory: [
        { scope: 'Dış for', name: 'm', val: '4 (bitti)', highlight: true },
        { scope: 'İç for', name: 'n', val: '3' },
      ],
      consoleOut: 'B\nAB\nAAB\nAAAB',
    },
  ];

  const cbSteps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 2,
      title: 'i = 1, 2 Turları',
      whatHappens: 'i=1 ve i=2 için continue/break koşulu sağlanmaz; 1 ve 2 yazdırılır.',
      memory: [{ scope: 'for', name: 'i', val: '2', highlight: true }],
      consoleOut: '1 2 ',
    },
    {
      stepNum: 2,
      activeLine: 3,
      title: 'i = 3 → continue!',
      whatHappens: 'if (i == 3) continue; çalışır! printf satırı atlanır, i++ ile i=4 olur.',
      memory: [{ scope: 'for', name: 'i', val: '3 (atlandı)', highlight: true }],
      consoleOut: '1 2 ',
    },
    {
      stepNum: 3,
      activeLine: 5,
      title: 'i = 4 → Yazdırılır',
      whatHappens: 'i=4 için hem continue hem break yanlıştır, 4 ekrana basılır.',
      memory: [{ scope: 'for', name: 'i', val: '4', highlight: true }],
      consoleOut: '1 2 4 ',
    },
    {
      stepNum: 4,
      activeLine: 4,
      title: 'i = 5 → break! (Tam Çıkış)',
      whatHappens: 'if (i == 5) break; döngüyü tamamen kırar. 5 ve 6 yazdırılmaz.',
      memory: [{ scope: 'for', name: 'i', val: '5 (kırıldı)', highlight: true }],
      consoleOut: '1 2 4 ',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'nested', label: 'İç İçe Döngü (B / AB / AAB)' },
            { id: 'while3', label: 'while (product <= 100)' },
            { id: 'continueBreak', label: 'continue vs break İzleme' },
          ].map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setScenario(b.id as typeof scenario)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                scenario === b.id ? 'bg-[#09251C] text-[#F8EADC]' : 'bg-[#F5ECE0] text-[#09251C] hover:bg-[#F3D2AF]/50'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onPeek('lab_261019_d96f8c28.pdf', 'lab_261019.pdf', 30)}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#09251C]"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Lab 4 Slaytı
        </button>
      </div>

      {scenario === 'nested' && (
        <ExecutionTracerPanel
          accentLabel="Lab 4 s.30–31 İç İçe Döngü"
          heading="m ve n Sayaçları ile Adım Adım Satır Oluşumu"
          codeLines={[
            'for (int m = 0; m < 4; m++) {',
            '    for (int n = 0; n < m; n++)',
            '        printf("A");',
            '    printf("B\\n");',
            '}',
          ]}
          steps={nestedSteps}
        />
      )}

      {scenario === 'while3' && (
        <ExecutionTracerPanel
          accentLabel="Ders 4 s.23 while Örneği"
          heading="while (product <= 100) Adım Adım Bellek İzleme"
          codeLines={[
            'int product = 3;',
            'while (product <= 100) {',
            '    product = 3 * product;',
            '}',
            'printf("Sonuc: %d", product);',
          ]}
          steps={whileSteps}
        />
      )}

      {scenario === 'continueBreak' && (
        <ExecutionTracerPanel
          accentLabel="Lab 4 s.28–29 Akış Kırıcılar"
          heading="continue ve break Farkı Adım İzleyicisi"
          codeLines={[
            'for (int i = 1; i <= 6; i++) {',
            '    // Tur baslangici',
            '    if (i == 3) continue;',
            '    if (i == 5) break;',
            '    printf("%d ", i);',
            '}',
          ]}
          steps={cbSteps}
        />
      )}
    </div>
  );
};

/* ============================================================
   WEEK 5 LAB: Scope (Global vs Local vs Block) & Static Tracer
   ============================================================ */
const Week5Lab: React.FC<{ onPeek: BM101InteractiveLabsProps['onPeekSlide'] }> = ({ onPeek }) => {
  const [mode, setMode] = useState<'lab5Static' | 'deitelScope'>('lab5Static');

  const lab5Steps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 8,
      title: 'main() Başlıyor & Yerel a = 10',
      whatHappens: 'main() Stack Frame açılır; yerel a = 10 oluşur. static int a henüz fonk() çağrılmadığı için ilk çağrıyı bekler.',
      memory: [
        { scope: 'main() Frame', name: 'a', val: '10', highlight: true },
        { scope: 'Static Bellek (fonk)', name: 'a (static)', val: '3 (hazır)' },
      ],
      stack: [{ fn: 'main()', vars: 'a = 10', retAddr: 'OS', active: true }],
      consoleOut: 'main() a=10',
      phase: 'normal',
    },
    {
      stepNum: 2,
      activeLine: 2,
      title: '1. fonk() Çağrısı (PUSH)',
      whatHappens: 'fonk() yığıta eklenir. static int a = 3 ilk ve SON kez atanır. Ekrana "fonk() a=3" yazılır, ardından a *= 2 ile static a = 6 olur!',
      memory: [
        { scope: 'main() Frame', name: 'a', val: '10' },
        { scope: 'Static Bellek (fonk)', name: 'a (static)', val: '3 -> 6', highlight: true },
      ],
      stack: [
        { fn: 'main()', vars: 'a = 10', retAddr: 'OS' },
        { fn: 'fonk()', vars: 'static a = 6', retAddr: 'main Satır 11', active: true },
      ],
      consoleOut: 'main() a=10\nfonk() a=3',
      phase: 'push',
    },
    {
      stepNum: 3,
      activeLine: 11,
      title: 'fonk() Bitti (POP) → main() Devam',
      whatHappens: 'fonk() frame’i stack’ten çıkarılır ANCAK static a=6 değeri kalıcı bellekte YAŞAR! main’deki a hâlâ 10’dur.',
      memory: [
        { scope: 'main() Frame', name: 'a', val: '10', highlight: true },
        { scope: 'Static Bellek (fonk)', name: 'a (static)', val: '6 (korunuyor)' },
      ],
      stack: [{ fn: 'main()', vars: 'a = 10', retAddr: 'OS', active: true }],
      consoleOut: 'main() a=10\nfonk() a=3\nmain() a=10',
      phase: 'pop',
    },
    {
      stepNum: 4,
      activeLine: 3,
      title: '2. fonk() Çağrısı (PUSH)',
      whatHappens: 'fonk() tekrar çağrılır. static int a = 3 satırı BİR DAHA ÇALIŞMAZ! Kaldığı 6’yı basar, a *= 2 ile 12 olur.',
      memory: [
        { scope: 'main() Frame', name: 'a', val: '10' },
        { scope: 'Static Bellek (fonk)', name: 'a (static)', val: '6 -> 12', highlight: true },
      ],
      stack: [
        { fn: 'main()', vars: 'a = 10', retAddr: 'OS' },
        { fn: 'fonk()', vars: 'static a = 12', retAddr: 'main Satır 13', active: true },
      ],
      consoleOut: 'main() a=10\nfonk() a=3\nmain() a=10\nfonk() a=6',
      phase: 'push',
    },
    {
      stepNum: 5,
      activeLine: 13,
      title: 'KRİTİK TUZAK: printf("main() a=%d", fonk())',
      whatHappens: 'printf yazdırılmadan ÖNCE 3. kez fonk() çağrılır! Kaldığı 12’yi ekrana basar ("fonk() a=12"), a *= 2 ile 24 yapar ve 24 döndürür.',
      memory: [
        { scope: 'main() Frame', name: 'a', val: '10 (değişmedi)' },
        { scope: 'Static Bellek (fonk)', name: 'a (static)', val: '12 -> 24', highlight: true },
      ],
      stack: [
        { fn: 'main()', vars: 'a = 10', retAddr: 'OS' },
        { fn: 'fonk()', vars: 'static a = 24, ret = 24', retAddr: 'main printf içi', active: true },
      ],
      consoleOut: 'main() a=10\nfonk() a=3\nmain() a=10\nfonk() a=6\nfonk() a=12',
      phase: 'push',
    },
    {
      stepNum: 6,
      activeLine: 13,
      title: 'fonk() 24 Döndürür → main printf Basar',
      whatHappens: 'fonk()’tan dönen 24 değeri main’deki printf tarafından ekrana yazılır: "main() a=24".',
      memory: [
        { scope: 'main() Frame', name: 'a', val: '10' },
        { scope: 'Static Bellek', name: 'fonk.a (static)', val: '24', highlight: true },
      ],
      stack: [{ fn: 'main()', vars: 'a = 10', retAddr: 'OS', active: true }],
      consoleOut: 'main() a=10\nfonk() a=3\nmain() a=10\nfonk() a=6\nfonk() a=12\nmain() a=24',
      phase: 'pop',
    },
  ];

  const deitelSteps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 10,
      title: 'main Dış Blok (x = 5) & İç Blok (x = 7)',
      whatHappens: 'Global x=1 vardır. main x=5 oluşturur, içindeki { int x = 7; } bloğuna girince iç x=7 main’in x=5’ini geçici olarak gölgeler.',
      memory: [
        { scope: 'Global', name: 'x', val: '1' },
        { scope: 'main Dış', name: 'x', val: '5' },
        { scope: 'main İç Blok', name: 'x', val: '7 (AKTİF)', highlight: true },
      ],
      consoleOut: 'ic blok x=7\nmain dis x=5',
    },
    {
      stepNum: 2,
      activeLine: 3,
      title: '1. Tur: useLocal() → useStaticLocal() → useGlobal()',
      whatHappens: 'useLocal yerel x=25→26 (silinir). useStaticLocal static x=50→51 (kalıcı). useGlobal kendi x’i olmadığı için Global x=1→10 yapar!',
      memory: [
        { scope: 'Global', name: 'x', val: '1 -> 10', highlight: true },
        { scope: 'useStaticLocal', name: 'static x', val: '50 -> 51', highlight: true },
        { scope: 'useLocal', name: 'x (auto)', val: '26 (çıkınca silindi)' },
        { scope: 'main Dış', name: 'x', val: '5' },
      ],
      consoleOut: 'useLocal: 25->26\nuseStatic: 50->51\nuseGlobal: 1->10',
    },
    {
      stepNum: 3,
      activeLine: 6,
      title: '2. Tur: Kalıcı Değerler Devam Eder',
      whatHappens: 'useLocal yeniden 25 başlar! useStaticLocal kaldığı 51’den 52’ye çıkar! useGlobal global 10’u 100 yapar! main x hâlâ 5’tir.',
      memory: [
        { scope: 'Global', name: 'x', val: '10 -> 100', highlight: true },
        { scope: 'useStaticLocal', name: 'static x', val: '51 -> 52', highlight: true },
        { scope: 'useLocal', name: 'x (auto)', val: '25 -> 26' },
        { scope: 'main Dış', name: 'x', val: '5 (DEĞİŞMEDİ)' },
      ],
      consoleOut: 'useLocal: 25->26\nuseStatic: 51->52\nuseGlobal: 10->100\nSon main x=5',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode('lab5Static')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
              mode === 'lab5Static' ? 'bg-[#09251C] text-[#F8EADC]' : 'bg-[#F5ECE0] text-[#09251C]'
            }`}
          >
            Lab 5: static &amp; printf Değerlendirme Sırası
          </button>
          <button
            type="button"
            onClick={() => setMode('deitelScope')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
              mode === 'deitelScope' ? 'bg-[#09251C] text-[#F8EADC]' : 'bg-[#F5ECE0] text-[#09251C]'
            }`}
          >
            Ders 5: Global vs Local vs Block vs Static
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            onPeek(
              mode === 'lab5Static' ? 'lab_261026_b58eb079.pdf' : '5-_Fonksiyonlar_-_Temel_b14f8ed4.pdf',
              mode === 'lab5Static' ? 'lab_261026.pdf' : '5- Fonksiyonlar - Temel.pdf',
              mode === 'lab5Static' ? 24 : 17
            )
          }
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#09251C]"
        >
          <BookOpen className="h-3.5 w-3.5" />
          İlgili Slaytı Aç
        </button>
      </div>

      {mode === 'lab5Static' ? (
        <ExecutionTracerPanel
          accentLabel="Lab 5 s.24–25 Sınav Favorisi"
          heading="Static Kalıcılığı ve printf İçinde Fonksiyon Çağırma Sırası"
          codeLines={[
            'int fonk() {',
            '    static int a = 3;',
            '    printf("fonk() a=%d\\n", a);',
            '    a *= 2;',
            '    return a;',
            '}',
            'int main() {',
            '    int a = 10;',
            '    printf("main() a=%d\\n", a);',
            '    fonk();',
            '    printf("main() a=%d\\n", a);',
            '    fonk();',
            '    printf("main() a=%d\\n", fonk());',
            '    return 0;',
            '}',
          ]}
          steps={lab5Steps}
        />
      ) : (
        <ExecutionTracerPanel
          accentLabel="Ders 5 s.17–22 Tam Kapsam (Scope) Programı"
          heading="Global, Yerel, İç Blok ve Static Bellek Kopyalarının İzlenmesi"
          codeLines={[
            'int x = 1; // Global',
            'void useLocal() { int x = 25; x++; }',
            'void useStaticLocal() { static int x = 50; x++; }',
            'void useGlobal() { x *= 10; }',
            'int main() {',
            '    int x = 5;',
            '    { int x = 7; printf("%d", x); }',
            '    useLocal(); useStaticLocal(); useGlobal();',
            '    useLocal(); useStaticLocal(); useGlobal();',
            '    printf("Son main x=%d", x);',
            '}',
          ]}
          steps={deitelSteps}
        />
      )}
    </div>
  );
};

/* ============================================================
   WEEK 6 LAB: DETAILED FUNCTION CALL STACK & RECURSION
   ============================================================ */
const Week6Lab: React.FC<{ onPeek: BM101InteractiveLabsProps['onPeekSlide'] }> = ({ onPeek }) => {
  const [subMode, setSubMode] = useState<'callstack' | 'factorial' | 'moreRec'>('callstack');
  const [stackDemo, setStackDemo] = useState<'square' | 'proc4'>('square');
  const [factN, setFactN] = useState<3 | 4 | 5>(4);
  const [recKind, setRecKind] = useState<'rakam' | 'us' | 'fib'>('rakam');

  // Call Stack: Deitel fig05_06 (main -> square(a))
  const squareSteps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 7,
      title: 'Program Başlangıcı: main() Stack Frame PUSH',
      whatHappens: 'İşletim sistemi main() fonksiyonunu çağırır. Stack’e main çerçevesi eklenir: Dönüş adresi R1 (OS) ve yerel otomatik değişken a = 10.',
      memory: [{ scope: 'main() Otomatik Değişken', name: 'a', val: '10', highlight: true }],
      stack: [{ fn: 'main()', vars: 'a = 10', retAddr: 'R1 (OS)', active: true }],
      consoleOut: '',
      phase: 'push',
    },
    {
      stepNum: 2,
      activeLine: 8,
      title: 'square(a) Çağrılıyor → Yeni Frame PUSH (Step 1 -> Step 2)',
      whatHappens: 'main Satır 8’deki printf içinde square(a) çağrılır! a’nın değeri (10) kopyalanarak square içindeki x parametresine verilir. Dönüş noktası R2 (main printf içi) Stack’e kaydedilir.',
      memory: [
        { scope: 'main() Frame', name: 'a', val: '10' },
        { scope: 'square() Frame (Tepe)', name: 'x', val: '10', highlight: true },
      ],
      stack: [
        { fn: 'main()', vars: 'a = 10', retAddr: 'R1 (OS)' },
        { fn: 'square(x)', vars: 'x = 10', retAddr: 'R2 (main Satır 8)', active: true },
      ],
      consoleOut: '',
      phase: 'push',
    },
    {
      stepNum: 3,
      activeLine: 3,
      title: 'square İçinde Hesaplama ve Return (x * x = 100)',
      whatHappens: 'square fonksiyonu x * x = 10 * 10 = 100 değerini hesaplar ve R2 dönüş adresine geri dönmek üzere hazırlanır.',
      memory: [
        { scope: 'main() Frame', name: 'a', val: '10' },
        { scope: 'square() Frame (Tepe)', name: 'x / return', val: '10 -> 100', highlight: true },
      ],
      stack: [
        { fn: 'main()', vars: 'a = 10', retAddr: 'R1 (OS)' },
        { fn: 'square(x)', vars: 'x = 10, ret = 100', retAddr: 'R2 (main Satır 8)', active: true },
      ],
      consoleOut: '',
      phase: 'base',
    },
    {
      stepNum: 4,
      activeLine: 8,
      title: 'square Frame POP Edildi → Kontrol R2’ye Döndü',
      whatHappens: 'square çerçevesi bellekten silinir (x değişkeni yok olur!). Dönen 100 değeri main Satır 8’deki printf tarafından ekrana basılır.',
      memory: [
        { scope: 'main() Frame', name: 'a', val: '10' },
        { scope: 'square() Frame', name: 'x', val: '(POP edildi / Silindi)', highlight: true },
      ],
      stack: [{ fn: 'main()', vars: 'a = 10', retAddr: 'R1 (OS)', active: true }],
      consoleOut: '10 squared: 100',
      phase: 'pop',
    },
    {
      stepNum: 5,
      activeLine: 9,
      title: 'main() Return 0 → R1’e Dönüş (Stack Boşalır)',
      whatHappens: 'main() return 0 yapınca R1 dönüş adresiyle kontrol işletim sistemine döner ve tüm Call Stack temizlenir.',
      memory: [{ scope: 'Call Stack', name: 'Tüm Çerçeveler', val: 'Boşaltıldı' }],
      stack: [],
      consoleOut: '10 squared: 100',
      phase: 'pop',
    },
  ];

  // Multi-frame Procedure 1..4 + Overflow illustration
  const proc4Steps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 1,
      title: 'Proc1 -> Proc2 Çağrısı',
      whatHappens: 'Procedure 1 yürütülürken Procedure 2 çağrılır; Stack tepesine Proc2 eklenir.',
      memory: [
        { scope: 'Proc1', name: 'p1', val: '10' },
        { scope: 'Proc2', name: 'p2', val: '20', highlight: true },
      ],
      stack: [
        { fn: 'Procedure 1', vars: 'p1=10', retAddr: 'OS' },
        { fn: 'Procedure 2', vars: 'p2=20', retAddr: 'Proc1', active: true },
      ],
      consoleOut: 'Proc1 -> Proc2',
      phase: 'push',
    },
    {
      stepNum: 2,
      activeLine: 3,
      title: 'Proc2 -> Proc3 -> Proc4 (4 Katman Yığıt)',
      whatHappens: 'Zincirleme çağrılarla Procedure 3 ve ardından Procedure 4 yığıta push edilir. En üstte yalnızca Proc4 aktiftir, diğerleri bekler.',
      memory: [
        { scope: 'Proc1..3', name: 'p1, p2, p3', val: '10, 20, 30 (beklemede)' },
        { scope: 'Proc4 (Tepe)', name: 'p4', val: '40 (AKTİF)', highlight: true },
      ],
      stack: [
        { fn: 'Procedure 1', vars: 'p1=10', retAddr: 'OS' },
        { fn: 'Procedure 2', vars: 'p2=20', retAddr: 'Proc1' },
        { fn: 'Procedure 3', vars: 'p3=30', retAddr: 'Proc2' },
        { fn: 'Procedure 4', vars: 'p4=40', retAddr: 'Proc3', active: true },
      ],
      consoleOut: 'Proc1 -> Proc2 -> Proc3 -> Proc4',
      phase: 'push',
    },
    {
      stepNum: 3,
      activeLine: 5,
      title: 'Stack Overflow Riski (Eğer Durmazsa!)',
      whatHappens: 'Eğer bir fonksiyon durma koşulu olmadan sonsuz kez kendini çağırırsa binlerce Stack Frame bellek sınırını taşırır → Stack Overflow!',
      memory: [
        { scope: 'Yığıt Kapasitesi', name: 'Limit', val: 'DOLDU (Fatal Error)', highlight: true },
      ],
      stack: [
        { fn: 'Procedure 1..4', vars: '...', retAddr: '...' },
        { fn: 'Sonsuz Çağrı #N', vars: '...', retAddr: 'STACK OVERFLOW', active: true },
      ],
      consoleOut: 'HATA: Stack Overflow (Yığıt Taşması)!',
      phase: 'base',
    },
  ];

  // Dynamic Factorial Steps (Winding PUSH + Base Case + Unwinding POP) matching Ders 6 s.5-12
  const buildFactorialSteps = (n: number): TraceStep[] => {
    const steps: TraceStep[] = [];
    let sNum = 1;
    const stackFrames: Array<{ fn: string; vars: string; retAddr: string; active?: boolean }> = [
      { fn: 'main()', vars: `sonuc = bekler`, retAddr: 'OS' },
    ];

    // Winding phase
    for (let k = n; k >= 1; k--) {
      stackFrames.push({
        fn: `factorial(${k})`,
        vars: `n = ${k}`,
        retAddr: k === n ? 'main()' : `factorial(${k + 1})`,
      });
      const currentMem = stackFrames
        .filter((f) => f.fn !== 'main()')
        .map((f, idx, arr) => ({
          scope: f.fn,
          name: 'n',
          val: f.vars.replace('n = ', ''),
          highlight: idx === arr.length - 1,
        }));

      steps.push({
        stepNum: sNum++,
        activeLine: k === 1 ? 2 : 3,
        title: k === 1 ? `Base Case: factorial(1)` : `İleri Çağrı (PUSH): factorial(${k})`,
        whatHappens:
          k === 1
            ? `Durma koşuluna (n <= 1) ulaşıldı! factorial(1) doğrudan 1 döndürecek.`
            : `factorial(${k}), ${k} * factorial(${k - 1}) işlemini hesaplayabilmek için factorial(${k - 1})'i çağırır ve yığıtta bekler.`,
        memory: currentMem,
        stack: stackFrames.map((f, idx) => ({ ...f, active: idx === stackFrames.length - 1 })),
        consoleOut: '',
        phase: k === 1 ? 'base' : 'push',
      });
    }

    // Unwinding phase
    let acc = 1;
    for (let k = 1; k <= n; k++) {
      const prevAcc = acc;
      acc = k === 1 ? 1 : k * prevAcc;
      stackFrames.pop();
      const topFrame = stackFrames[stackFrames.length - 1];
      steps.push({
        stepNum: sNum++,
        activeLine: k === 1 ? 2 : 3,
        title: `Geri Çözülme (POP): factorial(${k}) → ${acc} Döndürür`,
        whatHappens:
          k === 1
            ? `factorial(1) = 1 döndürüldü ve Stack’ten POP edildi.`
            : `factorial(${k}) beklediği yanıtı (${prevAcc}) aldı: ${k} * ${prevAcc} = ${acc} hesaplayıp yukarıya döndürür!`,
        memory: [
          { scope: 'Dönüş Değeri', name: `factorial(${k})`, val: String(acc), highlight: true },
          { scope: 'Aktif Kalan', name: topFrame?.fn || 'main()', val: 'Devam ediyor' },
        ],
        stack: stackFrames.map((f, idx) => ({ ...f, active: idx === stackFrames.length - 1 })),
        consoleOut: k === n ? `${n}! = ${acc}` : '',
        phase: 'pop',
      });
    }
    return steps;
  };

  // Extra Recursion Tracers (Lab 6)
  const rakamSteps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 3,
      title: 'PUSH: rakamlarToplami(458)',
      whatHappens: '458 != 0 olduğu için son basamak 458 % 10 = 8 ayrılır ve rakamlarToplami(45) çağrılır.',
      memory: [{ scope: 'f(458)', name: 'n / sonBasamak', val: '458 / 8', highlight: true }],
      stack: [{ fn: 'f(458)', vars: '8 + f(45)', retAddr: 'main', active: true }],
      consoleOut: '',
      phase: 'push',
    },
    {
      stepNum: 2,
      activeLine: 3,
      title: 'PUSH: f(45) -> f(4) -> f(0)',
      whatHappens: 'f(45) → 5 + f(4); f(4) → 4 + f(0). f(0) içinde n == 0 Base Case sağlanır!',
      memory: [
        { scope: 'f(458)', name: 'bekleyen', val: '8 + f(45)' },
        { scope: 'f(45)', name: 'bekleyen', val: '5 + f(4)' },
        { scope: 'f(4)', name: 'bekleyen', val: '4 + f(0)' },
        { scope: 'f(0)', name: 'Base Case', val: 'return 0', highlight: true },
      ],
      stack: [
        { fn: 'f(458)', vars: '8 + f(45)', retAddr: 'main' },
        { fn: 'f(45)', vars: '5 + f(4)', retAddr: 'f(458)' },
        { fn: 'f(4)', vars: '4 + f(0)', retAddr: 'f(45)' },
        { fn: 'f(0)', vars: 'n=0 -> 0', retAddr: 'f(4)', active: true },
      ],
      consoleOut: '',
      phase: 'base',
    },
    {
      stepNum: 3,
      activeLine: 3,
      title: 'POP (Çözülme): 0 → 4 → 9 → 17',
      whatHappens: 'f(0)=0 döner → f(4): 4+0=4 → f(45): 5+4=9 → f(458): 8+9=17 main’e döner.',
      memory: [{ scope: 'Sonuç', name: 'rakamlarToplami(458)', val: '17', highlight: true }],
      stack: [{ fn: 'main()', vars: 'sonuc = 17', retAddr: 'OS', active: true }],
      consoleOut: 'Rakam Toplami: 17',
      phase: 'pop',
    },
  ];

  const usSteps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 3,
      title: 'PUSH: usAl(2, 3) -> usAl(2, 2) -> usAl(2, 1) -> usAl(2, 0)',
      whatHappens: 'us 0 olana kadar her çağrıda us bir azaltılarak yığıta yeni çerçeve açılır.',
      memory: [
        { scope: 'usAl(2,3)', name: 'bekleyen', val: '2 * usAl(2,2)' },
        { scope: 'usAl(2,2)', name: 'bekleyen', val: '2 * usAl(2,1)' },
        { scope: 'usAl(2,1)', name: 'bekleyen', val: '2 * usAl(2,0)' },
        { scope: 'usAl(2,0)', name: 'Base Case', val: 'return 1', highlight: true },
      ],
      stack: [
        { fn: 'usAl(2,3)', vars: 'us=3', retAddr: 'main' },
        { fn: 'usAl(2,2)', vars: 'us=2', retAddr: 'usAl(2,3)' },
        { fn: 'usAl(2,1)', vars: 'us=1', retAddr: 'usAl(2,2)' },
        { fn: 'usAl(2,0)', vars: 'us=0 -> 1', retAddr: 'usAl(2,1)', active: true },
      ],
      consoleOut: '',
      phase: 'base',
    },
    {
      stepNum: 2,
      activeLine: 3,
      title: 'POP (Çözülme): 1 → 2 → 4 → 8',
      whatHappens: 'usAl(2,0)=1 → usAl(2,1)=2*1=2 → usAl(2,2)=2*2=4 → usAl(2,3)=2*4=8 döner.',
      memory: [{ scope: 'Sonuç', name: 'usAl(2,3)', val: '8', highlight: true }],
      stack: [{ fn: 'main()', vars: 'sonuc = 8', retAddr: 'OS', active: true }],
      consoleOut: '2^3 = 8',
      phase: 'pop',
    },
  ];

  const fibSteps: TraceStep[] = [
    {
      stepNum: 1,
      activeLine: 3,
      title: 'fibonacci(4) İkiye Dallanır: fib(3) + fib(2)',
      whatHappens: 'LIFO nedeniyle ÖNCE sol dal olan fib(3) sonuna kadar çözülür; fib(2) stack’te bekler.',
      memory: [
        { scope: 'fib(4)', name: 'bekleyen', val: 'fib(3) + fib(2)' },
        { scope: 'fib(3)', name: 'bekleyen', val: 'fib(2) + fib(1)', highlight: true },
      ],
      stack: [
        { fn: 'fib(4)', vars: 'n=4', retAddr: 'main' },
        { fn: 'fib(3)', vars: 'n=3', retAddr: 'fib(4) sol', active: true },
      ],
      consoleOut: '',
      phase: 'push',
    },
    {
      stepNum: 2,
      activeLine: 2,
      title: 'Sol Dal Çözümü: fib(2) = fib(1)+fib(0) = 1+0 = 1 → fib(3) = 1+1 = 2',
      whatHappens: 'fib(2) kendi alt çağrıları fib(1)=1 ve fib(0)=0’dan 1 döndürür. fib(3) = 1 + fib(1)(1) = 2 olarak tamamlanır.',
      memory: [
        { scope: 'fib(3)', name: 'sonuç', val: '2', highlight: true },
        { scope: 'fib(4)', name: 'kalan iş', val: '2 + fib(2)' },
      ],
      stack: [
        { fn: 'fib(4)', vars: 'sol=2, sağ=fib(2)', retAddr: 'main', active: true },
      ],
      consoleOut: '',
      phase: 'pop',
    },
    {
      stepNum: 3,
      activeLine: 3,
      title: 'Sağ Dal Tekrar Hesaplanır! fib(2) = 1 → fib(4) = 2 + 1 = 3',
      whatHappens: 'Önemli özellik: fib(2) sol tarafta hesaplanmış olsa da tekrar çağrılır (1 döner). Sonuç fib(4) = 2 + 1 = 3!',
      memory: [
        { scope: 'Sonuç', name: 'fibonacci(4)', val: '3', highlight: true },
      ],
      stack: [{ fn: 'main()', vars: 'sonuc = 3', retAddr: 'OS', active: true }],
      consoleOut: 'fibonacci(4) = 3',
      phase: 'pop',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Top Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubMode('callstack')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
              subMode === 'callstack'
                ? 'bg-[#09251C] text-[#F8EADC]'
                : 'bg-[#F5ECE0] text-[#09251C] hover:bg-[#F3D2AF]/50'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            1. Function Call Stack &amp; R1/R2
          </button>
          <button
            type="button"
            onClick={() => setSubMode('factorial')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
              subMode === 'factorial'
                ? 'bg-[#A55704] text-[#F8EADC]'
                : 'bg-[#F5ECE0] text-[#09251C] hover:bg-[#F3D2AF]/50'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            2. Özyineli factorial(n) Sarılma &amp; Çözülme
          </button>
          <button
            type="button"
            onClick={() => setSubMode('moreRec')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors ${
              subMode === 'moreRec'
                ? 'bg-[#09251C] text-[#F8EADC]'
                : 'bg-[#F5ECE0] text-[#09251C] hover:bg-[#F3D2AF]/50'
            }`}
          >
            3. Lab 6 Özyineleme (Rakam Toplamı, Üs, Fibonacci)
          </button>
        </div>

        <button
          type="button"
          onClick={() =>
            onPeek(
              '6-_Fonksiyonlar_-_2_709f35c9.pdf',
              '6- Fonksiyonlar - 2.pdf',
              subMode === 'callstack' ? 17 : 6
            )
          }
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-[#09251C] hover:bg-slate-100"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Ders 6 Slaytını Gör
        </button>
      </div>

      {/* Mode 1: Call Stack */}
      {subMode === 'callstack' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#A55704]/30 bg-[#FAF6F0] p-4">
            <div className="text-xs leading-relaxed text-slate-800">
              <strong className="text-[#09251C]">Call Stack Kuralı (LIFO):</strong> Her fonksiyon çağrısında tepede yeni bir Stack Frame (otomatik yerel değişkenler + dönüş adresi R1/R2) açılır; fonksiyon bitince o frame bellekten silinir.
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStackDemo('square')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  stackDemo === 'square' ? 'bg-[#09251C] text-[#F8EADC]' : 'border border-slate-300 bg-white text-slate-700'
                }`}
              >
                main → square(a) (R1/R2)
              </button>
              <button
                type="button"
                onClick={() => setStackDemo('proc4')}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold ${
                  stackDemo === 'proc4' ? 'bg-red-700 text-white' : 'border border-slate-300 bg-white text-slate-700'
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                Proc 1..4 &amp; Stack Overflow
              </button>
            </div>
          </div>

          {stackDemo === 'square' ? (
            <ExecutionTracerPanel
              accentLabel="Ders 6 s.16–18 Deitel fig05_06.c"
              heading="main() -> square(a) Call Stack ve Return Location (R1 / R2) İzleyici"
              codeLines={[
                'int square(int x) { // Step 2: x=10, R2',
                '    int kare = x * x;',
                '    return kare; // -> R2 adresine 100 döner',
                '}',
                '',
                'int main() { // Step 1: a=10, R1',
                '    int a = 10;',
                '    printf("%d squared: %d", a, square(a)); // R2',
                '    return 0; // -> R1 adresine döner',
                '}',
              ]}
              steps={squareSteps}
            />
          ) : (
            <ExecutionTracerPanel
              accentLabel="Ders 6 s.19–20 Çoklu Çerçeve & Taşma"
              heading="Çoklu Prosedür Çağrı Yığıtı ve Stack Overflow Mekanizması"
              codeLines={[
                'void proc1() { int p1=10; proc2(); }',
                'void proc2() { int p2=20; proc3(); }',
                'void proc3() { int p3=30; proc4(); }',
                'void proc4() { int p4=40; /* en üstte */ }',
                '// Base Case olmayan özyineleme -> Stack Overflow!',
              ]}
              steps={proc4Steps}
            />
          )}
        </div>
      )}

      {/* Mode 2: Factorial Recursion */}
      {subMode === 'factorial' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#A55704]/30 bg-[#FAF6F0] p-4">
            <div className="text-xs text-slate-800">
              <strong className="text-[#A55704]">Özyinelemede İki Aşama (Ders 6 s.5–12):</strong> İlk olarak Base Case&apos;e kadar çerçeveler üst üste yığılır (PUSH); ardından tabandan yukarıya doğru çarpımlar çözülüp frame&apos;ler çıkarılır (POP).
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#09251C]">Girdi n:</span>
              {([3, 4, 5] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setFactN(n)}
                  className={`rounded-lg px-3 py-1 font-mono text-xs font-bold ${
                    factN === n ? 'bg-[#A55704] text-[#F8EADC]' : 'border border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  n = {n}
                </button>
              ))}
            </div>
          </div>

          <ExecutionTracerPanel
            accentLabel={`Ders 6 s.6–12 · factorial(${factN}) Yığıt Sarma & Çözülme`}
            heading={`Özyineli factorial(${factN}) Adım Adım Stack ve Bellek İzleyici`}
            codeLines={[
              'long factorial(long n) {',
              '    if (n <= 1) return 1; // Base Case',
              '    return n * factorial(n - 1); // Recursive Step',
              '}',
            ]}
            steps={buildFactorialSteps(factN)}
          />
        </div>
      )}

      {/* Mode 3: Extra Lab 6 Recursion */}
      {subMode === 'moreRec' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-4">
            {[
              { id: 'rakam', label: 'rakamlarToplami(458)' },
              { id: 'us', label: 'usAl(2, 3)' },
              { id: 'fib', label: 'fibonacci(4) Çağrı Ağacı' },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setRecKind(b.id as typeof recKind)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
                  recKind === b.id ? 'bg-[#09251C] text-[#F8EADC]' : 'bg-[#F5ECE0] text-[#09251C] hover:bg-[#F3D2AF]/50'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {recKind === 'rakam' && (
            <ExecutionTracerPanel
              accentLabel="Lab 6 s.10–11 Özyineleme"
              heading="rakamlarToplami(458) Adım Adım Yığıt Açılımı"
              codeLines={[
                'int rakamlarToplami(int n) {',
                '    if (n == 0) return 0;',
                '    return (n % 10) + rakamlarToplami(n / 10);',
                '}',
              ]}
              steps={rakamSteps}
            />
          )}

          {recKind === 'us' && (
            <ExecutionTracerPanel
              accentLabel="Lab 6 s.12–13 Özyineleme"
              heading="usAl(2, 3) Adım Adım Yığıt Açılımı"
              codeLines={[
                'int usAl(int taban, int us) {',
                '    if (us == 0) return 1;',
                '    return taban * usAl(taban, us - 1);',
                '}',
              ]}
              steps={usSteps}
            />
          )}

          {recKind === 'fib' && (
            <ExecutionTracerPanel
              accentLabel="Lab 5 s.14–17 & Ders 6 Fibonacci"
              heading="fibonacci(4) Dallanma ve Yığıt Çözülmesi"
              codeLines={[
                'long fibonacci(long n) {',
                '    if (n == 0 || n == 1) return n;',
                '    return fibonacci(n - 1) + fibonacci(n - 2);',
                '}',
              ]}
              steps={fibSteps}
            />
          )}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   MAIN DISPATCHER
   ============================================================ */
export const BM101InteractiveLabs: React.FC<BM101InteractiveLabsProps> = ({
  week,
  onPeekSlide,
}) => {
  switch (week.id) {
    case 'w1':
      return <Week1Lab onPeek={onPeekSlide} />;
    case 'w2':
      return <Week2Lab onPeek={onPeekSlide} />;
    case 'w3':
      return <Week3Lab onPeek={onPeekSlide} />;
    case 'w4':
      return <Week4Lab onPeek={onPeekSlide} />;
    case 'w5':
      return <Week5Lab onPeek={onPeekSlide} />;
    case 'w6':
      return <Week6Lab onPeek={onPeekSlide} />;
    default:
      return null;
  }
};
