import React, { useEffect, useState } from 'react';
import {
  Clock,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Code2,
  Terminal,
  Cpu,
  Layers,
} from 'lucide-react';
import { BM101_EXAM_SCENARIOS } from '../data/bm101PracticeAndExams';
import { BM101ExamScenario } from '../types/bm101';

interface BM101ExamCenterProps {
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number) => void;
}

function normalizeOutput(s: string): string {
  return s
    .trim()
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

function normalizeVal(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, '');
}

export const BM101ExamCenter: React.FC<BM101ExamCenterProps> = ({ onPeekSlide }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [q1Input, setQ1Input] = useState<string>('');
  const [q2Input, setQ2Input] = useState<string>('');
  const [q3Inputs, setQ3Inputs] = useState<Record<number, string>>({});
  const [q2SelfPts, setQ2SelfPts] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(3600);
  const [scoresMap, setScoresMap] = useState<Record<string, number>>({});

  const activeScenario: BM101ExamScenario | undefined = BM101_EXAM_SCENARIOS.find(
    (s) => s.id === activeId
  );

  useEffect(() => {
    if (!activeId || submitted) return;
    const t = window.setInterval(() => {
      setTimeLeftSec((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [activeId, submitted]);

  const startExam = (sc: BM101ExamScenario) => {
    setActiveId(sc.id);
    setQ1Input('');
    setQ2Input('');
    setQ3Inputs({});
    setQ2SelfPts(0);
    setSubmitted(false);
    setTimeLeftSec(sc.durationMin * 60);
  };

  const evaluateQ1 = (sc: BM101ExamScenario): number => {
    const userNorm = normalizeOutput(q1Input);
    const expNorm = normalizeOutput(sc.q1Output.expectedOutput);
    if (!userNorm) return 0;
    if (userNorm === expNorm) return sc.q1Output.points;
    const userLines = userNorm.split('\n');
    const expLines = expNorm.split('\n');
    let hits = 0;
    expLines.forEach((line, i) => {
      if (userLines[i] === line) hits += 1;
    });
    return Math.round((hits / Math.max(1, expLines.length)) * sc.q1Output.points);
  };

  const suggestQ2Points = (sc: BM101ExamScenario): number => {
    const code = q2Input.toLowerCase();
    if (code.trim().length < 20) return 0;
    let hits = 0;
    sc.q2Coding.rubricKeywords.forEach((kw) => {
      if (code.includes(kw.toLowerCase())) hits += 1;
    });
    const ratio = hits / Math.max(1, sc.q2Coding.rubricKeywords.length);
    return Math.round(ratio * sc.q2Coding.points);
  };

  const evaluateQ3 = (sc: BM101ExamScenario): number => {
    const totalSlots = sc.q3Memory.expectedSlots.length;
    let hits = 0;
    sc.q3Memory.expectedSlots.forEach((slot, idx) => {
      const userVal = normalizeVal(q3Inputs[idx] || '');
      const expVal = normalizeVal(slot.expectedValue);
      if (userVal && (userVal === expVal || expVal.includes(userVal))) {
        hits += 1;
      }
    });
    return Math.round((hits / Math.max(1, totalSlots)) * sc.q3Memory.points);
  };

  const handleFinish = () => {
    if (!activeScenario || submitted) return;
    const p1 = evaluateQ1(activeScenario);
    const p2 = suggestQ2Points(activeScenario);
    const p3 = evaluateQ3(activeScenario);
    setQ2SelfPts(p2);
    setScoresMap((prev) => ({ ...prev, [activeScenario.id]: p1 + p2 + p3 }));
    setSubmitted(true);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!activeScenario) {
    return (
      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h1 className="text-xl font-extrabold text-[#0f2342]">
            BM101 Vize Sınav Merkezi — Hocanın 3 Soruluk Sınav Formatına Özel Senaryolar
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Her vize senaryosu tam olarak{' '}
            <strong className="text-[#0f2342]">3 sorudan</strong> oluşur:{' '}
            <strong className="text-[#0f2342]">1)</strong> Kod verip ekran çıktısı sorma (30p) ·{' '}
            <strong className="text-[#0f2342]">2)</strong> C programı / fonksiyonu yazma (40p) ·{' '}
            <strong className="text-[#0f2342]">3)</strong> Kod çalışırken verilen adımda bellekteki &amp; Call Stack&apos;teki değerleri sorma (30p).
          </p>
        </section>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {BM101_EXAM_SCENARIOS.map((sc) => {
            const past = scoresMap[sc.id];
            return (
              <article
                key={sc.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 hover:border-[#0f2342]"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2 text-xs font-bold">
                    <span className="text-red-700">{sc.badge}</span>
                    <span className="font-mono text-slate-500">{sc.durationMin} Dk</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-[#0f2342]">{sc.title}</h2>
                  <div className="mt-2 text-xs font-semibold text-slate-700">{sc.formatSummary}</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{sc.desc}</p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  {past !== undefined && (
                    <div className="mb-3 flex items-center justify-between text-xs font-bold text-emerald-800">
                      <span>Son Puan</span>
                      <span className="font-mono">{past} / 100 Puan</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => startExam(sc)}
                    className="w-full rounded-lg bg-[#0f2342] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1a3664]"
                  >
                    {past !== undefined ? 'Senaryoyu Tekrar Çöz' : '3 Soruluk Vizeye Başla'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  const p1 = submitted ? evaluateQ1(activeScenario) : 0;
  const p3 = submitted ? evaluateQ3(activeScenario) : 0;
  const totalScore = p1 + q2SelfPts + p3;

  return (
    <div className="space-y-6">
      {/* Top Status Bar */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-red-700">{activeScenario.badge}</div>
            <h1 className="text-lg font-extrabold text-[#0f2342]">{activeScenario.title}</h1>
            <div className="text-xs text-slate-500">{activeScenario.formatSummary}</div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {!submitted ? (
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-sm font-bold text-[#0f2342]">
                <Clock className="h-4 w-4" />
                {formatTime(timeLeftSec)}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3.5 py-1.5 font-mono text-sm font-bold text-emerald-900">
                Toplam Puan: {totalScore} / 100
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Senaryolara Dön
            </button>

            {!submitted ? (
              <button
                type="button"
                onClick={handleFinish}
                className="rounded-lg bg-red-700 px-4 py-1.5 text-xs font-bold text-white hover:bg-red-800"
              >
                Sınavı Bitir &amp; Çözümleri Aç
              </button>
            ) : (
              <button
                type="button"
                onClick={() => startExam(activeScenario)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f2342] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#1a3664]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Baştan Başla
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SORU 1: Kod -> Ekran Çıktısı */}
      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-red-700" />
            <h2 className="text-base font-extrabold text-[#0f2342]">
              {activeScenario.q1Output.title} ({activeScenario.q1Output.points} Puan)
            </h2>
          </div>
          {submitted && (
            <div className="flex items-center gap-2">
              <span className="rounded bg-emerald-100 px-2.5 py-1 font-mono text-xs font-bold text-emerald-900">
                {p1} / {activeScenario.q1Output.points}p
              </span>
              <button
                type="button"
                onClick={() =>
                  onPeekSlide(
                    activeScenario.q1Output.pdfFile,
                    activeScenario.q1Output.srcLabel,
                    activeScenario.q1Output.slideNum
                  )
                }
                className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-[#0f2342]"
              >
                <BookOpen className="h-3.5 w-3.5" />
                {activeScenario.q1Output.srcLabel}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 p-5">
          <p className="text-sm font-medium text-slate-800">{activeScenario.q1Output.prompt}</p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100">
              {activeScenario.q1Output.code}
            </pre>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-600">
                Ekran Çıktısı Cevabınız (Her printf çıktısını satırına uygun yazınız):
              </label>
              <textarea
                rows={7}
                disabled={submitted}
                value={q1Input}
                onChange={(e) => setQ1Input(e.target.value)}
                placeholder={'Örnek:\nmain-1: g=5 p=3\nislem: ...'}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-900 focus:border-[#0f2342] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {submitted && (
            <div className="grid grid-cols-1 gap-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 lg:grid-cols-2">
              <div className="rounded-lg bg-slate-900 p-3 font-mono text-xs text-emerald-300">
                <div className="mb-1 text-[10px] font-bold uppercase text-slate-400">
                  Beklenen Kesin Ekran Çıktısı
                </div>
                <pre className="whitespace-pre-wrap">{activeScenario.q1Output.expectedOutput}</pre>
              </div>
              <div className="space-y-1.5 text-xs text-emerald-950">
                <div className="font-bold">Adım Adım Çalışma İzlemesi:</div>
                {activeScenario.q1Output.stepTrace.map((t, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* SORU 2: Program Yazma */}
      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-red-700" />
            <h2 className="text-base font-extrabold text-[#0f2342]">
              {activeScenario.q2Coding.title} ({activeScenario.q2Coding.points} Puan)
            </h2>
          </div>
          {submitted && (
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-100 px-2.5 py-1 font-mono text-xs font-bold text-amber-900">
                {q2SelfPts} / {activeScenario.q2Coding.points}p
              </span>
              <button
                type="button"
                onClick={() =>
                  onPeekSlide(
                    activeScenario.q2Coding.pdfFile,
                    activeScenario.q2Coding.srcLabel,
                    activeScenario.q2Coding.slideNum
                  )
                }
                className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-[#0f2342]"
              >
                <BookOpen className="h-3.5 w-3.5" />
                {activeScenario.q2Coding.srcLabel}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 p-5">
          <p className="whitespace-pre-line text-sm font-medium text-slate-800">
            {activeScenario.q2Coding.prompt}
          </p>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
            <div className="font-bold text-[#0f2342]">Kısıtlar ve Örnek G/Ç:</div>
            <ul className="mt-1 list-disc space-y-0.5 pl-4">
              {activeScenario.q2Coding.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            <div className="mt-2 font-mono text-[11px] font-semibold text-emerald-800">
              {activeScenario.q2Coding.sampleIO}
            </div>
          </div>

          <textarea
            rows={10}
            disabled={submitted}
            value={q2Input}
            onChange={(e) => setQ2Input(e.target.value)}
            placeholder={'#include <stdio.h>\n\n// C kodunuzu buraya yazınız...'}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-900 focus:border-[#0f2342] focus:bg-white focus:outline-none"
          />

          {submitted && (
            <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-950">
                  Öz Değerlendirme Puanı ({q2SelfPts} / {activeScenario.q2Coding.points}):
                </span>
                <div className="flex gap-1.5">
                  {[0, 20, 30, 40].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setQ2SelfPts(val);
                        setScoresMap((prev) => ({
                          ...prev,
                          [activeScenario.id]: p1 + val + p3,
                        }));
                      }}
                      className={`rounded px-2.5 py-1 font-mono text-xs font-bold ${
                        q2SelfPts === val
                          ? 'bg-emerald-700 text-white'
                          : 'border border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {val}p
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3.5 font-mono text-xs leading-relaxed text-slate-100">
                  {activeScenario.q2Coding.modelCode}
                </pre>
                <div className="space-y-2 text-xs text-emerald-950">
                  <div className="font-bold">Rubrik Kontrol Listesi:</div>
                  {activeScenario.q2Coding.rubricChecklist.map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700" />
                      <span>{r}</span>
                    </div>
                  ))}
                  <p className="pt-2 text-slate-700">{activeScenario.q2Coding.exp}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* SORU 3: Çalışma Anında Bellek & Call Stack Değerleri */}
      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-red-700" />
            <h2 className="text-base font-extrabold text-[#0f2342]">
              {activeScenario.q3Memory.title} ({activeScenario.q3Memory.points} Puan)
            </h2>
          </div>
          {submitted && (
            <div className="flex items-center gap-2">
              <span className="rounded bg-emerald-100 px-2.5 py-1 font-mono text-xs font-bold text-emerald-900">
                {p3} / {activeScenario.q3Memory.points}p
              </span>
              <button
                type="button"
                onClick={() =>
                  onPeekSlide(
                    activeScenario.q3Memory.pdfFile,
                    activeScenario.q3Memory.srcLabel,
                    activeScenario.q3Memory.slideNum
                  )
                }
                className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-[#0f2342]"
              >
                <BookOpen className="h-3.5 w-3.5" />
                {activeScenario.q3Memory.srcLabel}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 p-5">
          <p className="text-sm font-medium text-slate-800">{activeScenario.q3Memory.prompt}</p>
          <div className="rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-950">
            İstenen An: {activeScenario.q3Memory.targetMoment}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100 lg:col-span-6">
              {activeScenario.q3Memory.code}
            </pre>

            <div className="space-y-2.5 lg:col-span-6">
              <div className="text-xs font-bold text-[#0f2342]">
                Bu Andaki Bellek Hücre Değerlerini Yazınız:
              </div>
              {activeScenario.q3Memory.expectedSlots.map((slot, sIdx) => {
                const userVal = q3Inputs[sIdx] || '';
                const matched =
                  submitted &&
                  normalizeVal(userVal) !== '' &&
                  (normalizeVal(userVal) === normalizeVal(slot.expectedValue) ||
                    normalizeVal(slot.expectedValue).includes(normalizeVal(userVal)));

                return (
                  <div
                    key={sIdx}
                    className={`rounded-lg border p-2.5 text-xs ${
                      submitted
                        ? matched
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-red-300 bg-red-50/60'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-bold text-[#0f2342]">
                        {slot.scope} → <span className="font-mono text-red-700">{slot.variable}</span>
                      </span>
                      {submitted && (
                        <span className="font-mono font-bold text-emerald-900">
                          Doğru: {slot.expectedValue}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      disabled={submitted}
                      value={userVal}
                      onChange={(e) =>
                        setQ3Inputs((prev) => ({ ...prev, [sIdx]: e.target.value }))
                      }
                      placeholder="Bu andaki değeri yazınız..."
                      className="w-full rounded border border-slate-300 bg-white px-2.5 py-1 font-mono text-xs text-slate-900 focus:border-[#0f2342] focus:outline-none"
                    />
                    {submitted && (
                      <div className="mt-1 text-[11px] text-slate-700">{slot.note}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {submitted && (
            <div className="grid grid-cols-1 gap-4 rounded-xl border border-sky-200 bg-sky-50/60 p-4 lg:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-[#0f2342]">
                  <Layers className="h-3.5 w-3.5" />
                  Bu Andaki Call Stack Sıralaması (Alttan Üste)
                </div>
                <div className="space-y-1.5">
                  {activeScenario.q3Memory.expectedStackOrder.map((st, idx) => (
                    <div
                      key={idx}
                      className="rounded border border-sky-300 bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#0f2342]"
                    >
                      {st}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-extrabold text-[#0f2342]">
                  Adım Adım Bellek Zaman Çizelgesi
                </div>
                <div className="space-y-1.5 text-xs text-slate-800">
                  {activeScenario.q3Memory.timelineSteps.map((ts) => (
                    <div key={ts.step} className="rounded border border-slate-200 bg-white p-2">
                      <span className="font-mono font-bold text-red-700">
                        Adım {ts.step} ({ts.line}):
                      </span>{' '}
                      {ts.action} → <span className="font-mono font-semibold">{ts.memorySummary}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};
