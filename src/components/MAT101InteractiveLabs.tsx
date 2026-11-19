import React, { useState } from 'react';
import { BookOpen, Calculator, CheckCircle2, Compass, Sigma, Sparkles, TrendingUp } from 'lucide-react';
import { MAT101Module } from '../types/mat101';
import { LECTURE_NOTES_LABEL, LECTURE_NOTES_PDF } from '../data/mat101Modules';
import { MathText } from './MathText';

interface MAT101InteractiveLabsProps {
  module: MAT101Module;
  onPeekSlide: (pdfFile: string, pdfLabel: string, slideNum: number, moduleId?: string) => void;
  onJumpToMidterms: () => void;
}

/* ---------- Module 1 Lab: Quadratic & Sign Table ---------- */
const LabM1QuadraticSign: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-4);
  const [c, setC] = useState<number>(3);

  const safeA = a === 0 ? 1 : a;
  const delta = b * b - 4 * safeA * c;
  const vx = -b / (2 * safeA);
  const vy = safeA * vx * vx + b * vx + c;

  let rootMsg = 'Reel kök yok ($\\Delta < 0$): İfade her $x \\in \\mathbb{R}$ için $a$ ile aynı işaretlidir.';
  if (delta === 0) {
    const r = -b / (2 * safeA);
    rootMsg = `Çakışık kök ($\\Delta = 0$): $x_1 = x_2 = ${r.toFixed(2)}$. Çift katlı kök geçişinde işaret DEĞİŞMEZ.`;
  } else if (delta > 0) {
    const r1 = (-b - Math.sqrt(delta)) / (2 * safeA);
    const r2 = (-b + Math.sqrt(delta)) / (2 * safeA);
    const lo = Math.min(r1, r2);
    const hi = Math.max(r1, r2);
    rootMsg = `İki farklı reel kök ($\\Delta > 0$): $x_1 = ${lo.toFixed(2)}, \\; x_2 = ${hi.toFixed(2)}$. Kökler arası işaret $-a$, kök dışı $+a$ işaretlidir.`;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#09251C]">
          <Calculator className="h-4 w-4 text-[#A55704]" />
          İnteraktif Laboratuvar · İkinci Derece İfade, Tepe Noktası &amp; İşaret Tablosu
        </div>
        <span className="rounded bg-[#09251C] px-2 py-0.5 font-mono text-xs font-bold text-[#F8EADC]">
          <MathText text={`$f(x) = ${safeA}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}$`} />
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { label: 'Katsayı a (a ≠ 0)', val: a, min: -4, max: 4, set: (v: number) => setA(v === 0 ? 1 : v) },
          { label: 'Katsayı b', val: b, min: -10, max: 10, set: setB },
          { label: 'Sabit c', val: c, min: -10, max: 10, set: setC },
        ].map((ctrl) => (
          <div key={ctrl.label} className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-600">
              <span>{ctrl.label}</span>
              <span className="font-mono text-[#09251C]">{ctrl.val}</span>
            </div>
            <input
              type="range"
              min={ctrl.min}
              max={ctrl.max}
              step={1}
              value={ctrl.val}
              onChange={(e) => ctrl.set(parseInt(e.target.value, 10))}
              className="w-full accent-[#09251C]"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
          <div className="font-bold text-slate-500">Diskriminant (Δ = b² - 4ac)</div>
          <div className="mt-1 font-mono text-base font-extrabold text-[#09251C]">{delta}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
          <div className="font-bold text-slate-500">Tepe Noktası T(h, k)</div>
          <div className="mt-1 font-mono text-base font-extrabold text-[#09251C]">
            ({vx.toFixed(2)}, {vy.toFixed(2)})
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
          <div className="font-bold text-slate-500">Parabol Yönü</div>
          <div className="mt-1 text-sm font-extrabold text-[#A55704]">
            {safeA > 0 ? 'Kollar Yukarı (∪ · Min)' : 'Kollar Aşağı (∩ · Max)'}
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-950 sm:text-sm">
        <MathText text={rootMsg} />
      </div>
    </div>
  );
};

/* ---------- Module 2 Lab: Floor, Fractional Part & Signum ---------- */
const LabM2SpecialFunctions: React.FC = () => {
  const [xVal, setXVal] = useState<number>(-2.3);
  const floorVal = Math.floor(xVal);
  const fracVal = xVal - floorVal;
  const sgnVal = xVal > 0 ? 1 : xVal < 0 ? -1 : 0;
  const xAbsX = xVal * Math.abs(xVal) + 1;

  return (
    <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#09251C]">
          <Compass className="h-4 w-4 text-[#A55704]" />
          İnteraktif Laboratuvar · Tam Değer ⌊x⌋, Kesirli Kısım {'{x}'} &amp; Signum
        </div>
        <span className="rounded bg-[#09251C] px-2.5 py-0.5 font-mono text-xs font-bold text-[#F8EADC]">
          x = {xVal.toFixed(2)}
        </span>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3.5">
        <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-600">
          <span>x Değerini Kaydırın (Özellikle negatif ve tam sayıları test edin)</span>
          <div className="flex gap-1.5">
            {[-2.7, -1, 0, 1.99, 2.01].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setXVal(preset)}
                className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-bold text-[#09251C] hover:bg-slate-200"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
        <input
          type="range"
          min={-4}
          max={4}
          step={0.01}
          value={xVal}
          onChange={(e) => setXVal(parseFloat(e.target.value))}
          className="w-full accent-[#09251C]"
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="text-[11px] font-bold text-slate-500">Tam Değer ⌊x⌋</div>
          <div className="mt-1 font-mono text-lg font-extrabold text-[#09251C]">{floorVal}</div>
          <div className="mt-0.5 text-[11px] text-slate-500">
            {floorVal} ≤ {xVal.toFixed(2)} &lt; {floorVal + 1}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="text-[11px] font-bold text-slate-500">Kesirli Kısım x - ⌊x⌋</div>
          <div className="mt-1 font-mono text-lg font-extrabold text-sky-700">{fracVal.toFixed(2)}</div>
          <div className="mt-0.5 text-[11px] text-slate-500">Daima [0, 1) aralığındadır</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="text-[11px] font-bold text-slate-500">Signum sgn(x)</div>
          <div className="mt-1 font-mono text-lg font-extrabold text-[#A55704]">{sgnVal}</div>
          <div className="mt-0.5 text-[11px] text-slate-500">x=0 noktasında jump yapar</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="text-[11px] font-bold text-slate-500">Sınav Fonksiyonu x|x| + 1</div>
          <div className="mt-1 font-mono text-lg font-extrabold text-emerald-700">{xAbsX.toFixed(2)}</div>
          <div className="mt-0.5 text-[11px] text-slate-500">Kesin artan &amp; birebir</div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Module 3 Lab: Inverse Trig & Hyperbolic ---------- */
const LabM3TrigHyperbolic: React.FC = () => {
  const [xVal, setXVal] = useState<number>(0.6);
  const clampedUnit = Math.min(1, Math.max(-1, xVal));
  const cosOfArcsin = Math.sqrt(Math.max(0, 1 - clampedUnit * clampedUnit));
  const coshVal = Math.cosh(xVal);
  const sinhVal = Math.sinh(xVal);
  const arcsinhVal = Math.log(xVal + Math.sqrt(xVal * xVal + 1));

  return (
    <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#09251C]">
          <Sigma className="h-4 w-4 text-[#A55704]" />
          İnteraktif Laboratuvar · Ters Trig Üçgeni &amp; Hiperbolik Fonksiyonlar
        </div>
        <span className="rounded bg-[#09251C] px-2.5 py-0.5 font-mono text-xs font-bold text-[#F8EADC]">
          x = {xVal.toFixed(2)}
        </span>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3.5">
        <input
          type="range"
          min={-0.95}
          max={0.95}
          step={0.05}
          value={xVal}
          onChange={(e) => setXVal(parseFloat(e.target.value))}
          className="w-full accent-[#09251C]"
        />
        <div className="mt-1 flex justify-between text-[11px] text-slate-500">
          <span>-0.95</span>
          <span>0</span>
          <span>+0.95</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-xs">
          <div className="font-extrabold text-[#09251C]">Dik Üçgen Özdeşliği</div>
          <div className="mt-2 space-y-1 text-slate-700">
            <MathText text={`$\\arcsin(${clampedUnit.toFixed(2)}) = ${Math.asin(clampedUnit).toFixed(3)}\\text{ rad}$`} />
            <br />
            <MathText text={`$\\cos(\\arcsin x) = \\sqrt{1-x^2} = ${cosOfArcsin.toFixed(4)}$`} />
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-xs">
          <div className="font-extrabold text-[#09251C]">Hiperbolik Doğrulama</div>
          <div className="mt-2 space-y-1 text-slate-700">
            <MathText text={`$\\cosh^2 x - \\sinh^2 x = ${coshVal.toFixed(3)}^2 - (${sinhVal.toFixed(3)})^2 = ${(coshVal * coshVal - sinhVal * sinhVal).toFixed(4)}$`} />
            <br />
            <MathText text={`$\\operatorname{arcsinh}(x) = \\ln(x+\\sqrt{x^2+1}) = ${arcsinhVal.toFixed(4)}$`} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Module 4 Lab: Squeeze & One-Sided Limits ---------- */
const LabM4Limits: React.FC = () => {
  const [deltaPow, setDeltaPow] = useState<number>(2); // h = 10^-deltaPow
  const h = Math.pow(10, -deltaPow);

  const fPlus = (Math.sqrt(2) * h) / Math.sqrt(1 - Math.cos(2 * h));
  const fMinus = (Math.sqrt(2) * (-h)) / Math.sqrt(1 - Math.cos(-2 * h));
  const floorProd = Math.floor(1 / h) * h;

  return (
    <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#09251C]">
          <TrendingUp className="h-4 w-4 text-[#A55704]" />
          İnteraktif Laboratuvar · Sağ/Sol Limit Yakınsama Gözlemcisi (Sınav Kalıpları)
        </div>
        <span className="rounded bg-[#09251C] px-2.5 py-0.5 font-mono text-xs font-bold text-[#F8EADC]">
          h = 10^-{deltaPow} ({h})
        </span>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3.5">
        <div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Sıfıra Yaklaşma Hassasiyeti</span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setDeltaPow(p)}
                className={`rounded px-2.5 py-1 font-mono text-xs font-bold ${
                  deltaPow === p ? 'bg-[#09251C] text-[#F8EADC]' : 'border border-slate-200 bg-[#FAF6F0] text-slate-700'
                }`}
              >
                10^-{p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-emerald-200 bg-white p-3.5 text-xs">
          <div className="font-bold text-emerald-800">2024-25 A Q8 (Sağ Limit)</div>
          <div className="mt-1 text-slate-600">
            <MathText text="$f(+h) = \frac{\sqrt{2}h}{\sqrt{1-\cos 2h}}$" />
          </div>
          <div className="mt-2 font-mono text-base font-extrabold text-emerald-700">
            {fPlus.toFixed(6)} → +1
          </div>
        </div>

        <div className="rounded-lg border border-red-200 bg-white p-3.5 text-xs">
          <div className="font-bold text-red-800">2024-25 B Q8 (Sol Limit)</div>
          <div className="mt-1 text-slate-600">
            <MathText text="$f(-h) = \frac{\sqrt{2}(-h)}{\sqrt{1-\cos(-2h)}}$" />
          </div>
          <div className="mt-2 font-mono text-base font-extrabold text-red-700">
            {fMinus.toFixed(6)} → -1
          </div>
        </div>

        <div className="rounded-lg border border-sky-200 bg-white p-3.5 text-xs">
          <div className="font-bold text-sky-900">2024-25 A Q7 (Squeeze)</div>
          <div className="mt-1 text-slate-600">
            <MathText text="$\lfloor 1/h \rfloor \cdot h$" />
          </div>
          <div className="mt-2 font-mono text-base font-extrabold text-sky-700">
            {floorProd.toFixed(6)} → +1
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Module 5 Lab: Tangent & Normal Calculator ---------- */
const LabM5TangentNormal: React.FC = () => {
  const [curveId, setCurveId] = useState<'poly' | 'trig' | 'exam'>('exam');
  const [x0, setX0] = useState<number>(0);

  let label = '';
  let y0 = 0;
  let mT = 0;

  if (curveId === 'poly') {
    label = '$f(x) = x^2 - 2x + 3$';
    y0 = x0 * x0 - 2 * x0 + 3;
    mT = 2 * x0 - 2;
  } else if (curveId === 'trig') {
    label = '$f(x) = \\sin x + x$';
    y0 = Math.sin(x0) + x0;
    mT = Math.cos(x0) + 1;
  } else {
    label = '$f(x) = (3x^2 - 2)\\cos x$ (2022-23 A Q9)';
    y0 = (3 * x0 * x0 - 2) * Math.cos(x0);
    mT = 6 * x0 * Math.cos(x0) - (3 * x0 * x0 - 2) * Math.sin(x0);
  }

  const isHorizontal = Math.abs(mT) < 1e-6;
  const tangentEq = isHorizontal
    ? `y = ${y0.toFixed(2)}`
    : `y = ${mT.toFixed(2)}x ${y0 - mT * x0 >= 0 ? '+' : ''} ${(y0 - mT * x0).toFixed(2)}`;
  const normalEq = isHorizontal
    ? `x = ${x0.toFixed(2)} (Dikey Doğru!)`
    : `y = ${(-1 / mT).toFixed(2)}x ${y0 + x0 / mT >= 0 ? '+' : ''} ${(y0 + x0 / mT).toFixed(2)}`;

  return (
    <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#09251C]">
          <Calculator className="h-4 w-4 text-[#A55704]" />
          İnteraktif Laboratuvar · Teğet ve Normal Doğrusu Hesaplayıcı
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'exam', name: 'Sınav Eğrisi: (3x²-2)cos(x)' },
          { id: 'poly', name: 'Parabol: x² - 2x + 3' },
          { id: 'trig', name: 'Trig: sin(x) + x' },
        ].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setCurveId(c.id as 'poly' | 'trig' | 'exam');
              setX0(c.id === 'poly' ? 1 : 0);
            }}
            className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${
              curveId === c.id
                ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                : 'border-slate-300 bg-white text-[#09251C]'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3.5">
        <div className="mb-1 flex justify-between text-xs font-bold text-slate-600">
          <span>Değme Noktası x₀</span>
          <span className="font-mono text-[#09251C]">x₀ = {x0.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min={-2}
          max={2}
          step={0.5}
          value={x0}
          onChange={(e) => setX0(parseFloat(e.target.value))}
          className="w-full accent-[#09251C]"
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
          <div className="font-bold text-slate-500">Seçili Eğri &amp; Nokta</div>
          <div className="mt-1 font-semibold text-[#09251C]">
            <MathText text={label} />
          </div>
          <div className="mt-1 font-mono text-slate-600">P({x0.toFixed(1)}, {y0.toFixed(2)})</div>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-xs">
          <div className="font-bold text-emerald-800">Teğet (m_T = {mT.toFixed(2)})</div>
          <div className="mt-1 font-mono text-sm font-extrabold text-emerald-950">{tangentEq}</div>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-xs">
          <div className="font-bold text-amber-900">Normal Doğrusu</div>
          <div className="mt-1 font-mono text-sm font-extrabold text-amber-950">{normalEq}</div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Module 6 Lab: Indeterminate Forms Matcher ---------- */
const LabM6LHospital: React.FC = () => {
  const [formIdx, setFormIdx] = useState<number>(0);
  const forms = [
    {
      name: '0/0 veya ∞/∞',
      method: 'Doğrudan L\'Hospital Kuralı uygulanır.',
      example: '$\\lim_{x\\to 0}\\frac{e^x - 1 - x}{x^2} \\overset{\\text{L\'H}}{=} \\lim_{x\\to 0}\\frac{e^x-1}{2x} \\overset{\\text{L\'H}}{=} \\frac{1}{2}$',
    },
    {
      name: '0 · ∞ veya ∞ - ∞',
      method: 'Önce çarpımı $f / (1/g)$ kesrine çevir veya payda eşitle!',
      example: '$\\lim_{x\\to 0^+} x\\ln x = \\lim_{x\\to 0^+} \\frac{\\ln x}{1/x} \\overset{\\text{L\'H}}{=} \\lim_{x\\to 0^+} (-x) = 0$',
    },
    {
      name: '1^∞, 0^0 veya ∞^0',
      method: '$y = f^g \\implies \\ln y = g\\ln f$ dönüşümü yapıp limitte $e^{(\\cdot)}$ al!',
      example: '$\\lim_{x\\to 0^+} x^x: \\ln y = x\\ln x \\to 0 \\implies y \\to e^0 = 1$',
    },
  ];

  const active = forms[formIdx];

  return (
    <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-[#09251C]">
        <Sparkles className="h-4 w-4 text-[#A55704]" />
        İnteraktif Laboratuvar · 7 Belirsizlik Türü &amp; L&apos;Hospital Dönüşüm Rehberi
      </div>
      <div className="flex flex-wrap gap-2">
        {forms.map((f, idx) => (
          <button
            key={f.name}
            type="button"
            onClick={() => setFormIdx(idx)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${
              formIdx === idx
                ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                : 'border-slate-300 bg-white text-[#09251C]'
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4 text-sm">
        <div className="font-bold text-[#09251C]">
          <MathText text={active.method} />
        </div>
        <div className="mt-2 rounded bg-[#FAF6F0] p-3 text-slate-800">
          <MathText text={active.example} />
        </div>
      </div>
    </div>
  );
};

/* ---------- Module 7 Lab: Integration Strategy Picker ---------- */
const LabM7IntegrationStrategy: React.FC = () => {
  const [techIdx, setTechIdx] = useState<number>(0);
  const techniques = [
    {
      title: 'u-Değişken Değiştirme',
      cue: 'İntegrantta bir ifade ve onun türevi birlikte görülüyorsa ($f(g(x))g\'(x)$).',
      formula: '$\\int \\frac{2x}{x^2+5}\\,dx \\xrightarrow{u=x^2+5} \\ln(x^2+5)+C$',
    },
    {
      title: 'Kısmi İntegrasyon (LIATE)',
      cue: '$x^n e^x$, $x^n \\sin x$, $\\ln x$, $\\arctan x$ çarpımlarında $u$ seçimi LIATE sırasıyla yapılır.',
      formula: '$\\int u\\,dv = uv - \\int v\\,du$',
    },
    {
      title: 'Trigonometrik Dönüşüm',
      cue: '$\\sqrt{a^2-x^2} \\to a\\sin\\theta$, $\\sqrt{a^2+x^2} \\to a\\tan\\theta$, $\\sqrt{x^2-a^2} \\to a\\sec\\theta$.',
      formula: '$\\int \\frac{dx}{\\sqrt{9-x^2}} = \\arcsin\\left(\\frac{x}{3}\\right)+C$',
    },
    {
      title: 'Weierstrass t = tan(x/2)',
      cue: 'Paydada $\\sin x$ ve $\\cos x$ lineer toplamı ($1+\\sin x$, $2+\\cos x$) varsa.',
      formula: '$\\sin x = \\frac{2t}{1+t^2}, \\quad \\cos x = \\frac{1-t^2}{1+t^2}, \\quad dx = \\frac{2\\,dt}{1+t^2}$',
    },
  ];

  const t = techniques[techIdx];

  return (
    <div className="rounded-xl border border-slate-200 bg-[#FAF6F0] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-[#09251C]">
        <Sigma className="h-4 w-4 text-[#A55704]" />
        İnteraktif Laboratuvar · İntegral Teknik Seçim Rehberi
      </div>
      <div className="flex flex-wrap gap-2">
        {techniques.map((item, idx) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setTechIdx(idx)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${
              techIdx === idx
                ? 'border-[#09251C] bg-[#09251C] text-[#F8EADC]'
                : 'border-slate-300 bg-white text-[#09251C]'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4 text-sm">
        <div className="text-slate-700">
          <strong className="text-[#09251C]">Ne Zaman Kullanılır? </strong>
          <MathText text={t.cue} />
        </div>
        <div className="mt-2 rounded bg-[#09251C] p-3 text-[#F8EADC]">
          <MathText text={t.formula} />
        </div>
      </div>
    </div>
  );
};

export const MAT101InteractiveLabs: React.FC<MAT101InteractiveLabsProps> = ({
  module,
  onPeekSlide,
  onJumpToMidterms,
}) => {
  return (
    <div className="space-y-5">
      {/* Structured Lecture Notes Concept Cards */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#09251C]">
              {module.tag} · Kritik Lecture Notes Başlıkları ({module.pageRange})
            </h2>
            <p className="text-sm text-slate-600">
              Her başlığın Lecture Notes üzerindeki orijinal sayfasını tek tıkla açabilir veya alt kısımdaki interaktif laboratuvarla deneyebilirsiniz.
            </p>
          </div>
          <button
            type="button"
            onClick={onJumpToMidterms}
            className="rounded-lg bg-[#A55704] px-3.5 py-2 text-xs font-bold text-[#F8EADC] hover:bg-[#894603]"
          >
            Çıkmış Vize Sorularını Çöz →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {module.slides.map((s) => {
            const isAfterMidterm =
              Boolean(s.afterMidterm) || module.midtermScope === 'after-midterm';
            return (
              <article
                key={`${module.id}-card-${s.n}`}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-colors ${
                  s.isMidtermCutoff
                    ? 'border-amber-400 bg-amber-50/60 hover:border-amber-500'
                    : isAfterMidterm
                    ? 'border-dashed border-slate-300 bg-slate-100/60 opacity-90 hover:border-slate-400 hover:bg-white'
                    : 'border-slate-200 bg-[#FAF6F0]/80 hover:border-[#09251C]/40 hover:bg-white'
                }`}
              >
                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded bg-[#09251C] px-2 py-0.5 font-mono text-[11px] font-bold text-[#F8EADC]">
                        s.{s.n}
                      </span>
                      {s.isMidtermCutoff && (
                        <span className="rounded bg-amber-200 px-2 py-0.5 text-[10px] font-extrabold text-amber-950">
                          VİZE SON KONUSU · s.117–118
                        </span>
                      )}
                      {isAfterMidterm && (
                        <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                          Vize Dışı / Final
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onPeekSlide(LECTURE_NOTES_PDF, LECTURE_NOTES_LABEL, s.n, module.id)}
                      className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-bold text-[#09251C] hover:bg-[#FAF6F0]"
                    >
                      <BookOpen className="h-3 w-3 text-[#A55704]" />
                      PDF Sayfasını Gör
                    </button>
                  </div>

                  <h3 className="text-sm font-extrabold text-[#09251C] sm:text-base">
                    <MathText text={s.t} />
                  </h3>

                  <div className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                    <MathText text={s.explanation} />
                  </div>

                  <ul className="mt-3 space-y-1 text-xs text-slate-700">
                    {s.summaryPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>
                          <MathText text={pt} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {s.keyFormula && (
                  <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-[#09251C]">
                    <MathText text={`$$${s.keyFormula}$$`} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Module-specific Interactive Lab */}
      {module.id === 'm1' && <LabM1QuadraticSign />}
      {module.id === 'm2' && <LabM2SpecialFunctions />}
      {module.id === 'm3' && <LabM3TrigHyperbolic />}
      {module.id === 'm4' && <LabM4Limits />}
      {module.id === 'm5' && <LabM5TangentNormal />}
      {module.id === 'm6' && <LabM6LHospital />}
      {module.id === 'm7' && <LabM7IntegrationStrategy />}
    </div>
  );
};
