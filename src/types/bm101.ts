export type CourseChoice = 'bm103' | 'bm101';

export type BM101TopMode = 'learn' | 'examples' | 'extra' | 'exam' | 'slides' | 'a4';
export type BM101SubTab = 'interactive' | 'examples' | 'hap' | 'quiz' | 'a4' | 'slides';

export interface BM101HapBilgi {
  badge: string;
  q: string;
  a: string;
  pdfFile: string;
  pdfLabel: string;
  slide: number;
}

export interface BM101A4Section {
  h: string;
  items: string[];
}

export interface BM101QuizQuestion {
  q: string;
  code?: string;
  opts: string[];
  ans: number;
  exp: string;
  pdfFile?: string;
  pdfLabel?: string;
  slide?: number;
}

export interface BM101SlideItem {
  n: number;
  pdfFile: string;
  pdfLabel: string;
  sourceKind: 'ders' | 'lab';
  t: string;
  hasVisual: boolean;
  visualCaption?: string;
  explanation: string;
  summaryPoints: string[];
  codeSnippet?: string;
}

export interface BM101WeekModule {
  id: string;
  tag: string;
  title: string;
  pdfName: string;
  labPdfName: string;
  desc: string;
  hapBilgiler: BM101HapBilgi[];
  summaryA4: BM101A4Section[];
  quiz: BM101QuizQuestion[];
  slides: BM101SlideItem[];
}

export interface BM101SolvedExample {
  id: string;
  weekId: string;
  category: 'akıs-diyagramı' | 'temel-io' | 'kosul-dongu' | 'fonksiyon-scope' | 'ozyineleme' | 'yildiz-desen';
  title: string;
  pdfFile: string;
  pdfLabel: string;
  slideNum: number;
  problem: string;
  codeOrPseudo: string;
  expectedOutput: string;
  stepByStepSolution: string[];
  memoryHighlight?: string;
}

export interface BM101ExtraExercise {
  id: string;
  weekId: string;
  kind: 'output' | 'memory' | 'recursion' | 'bug' | 'coding';
  difficulty: 'Temel' | 'Orta' | 'Vize Seviyesi';
  title: string;
  prompt: string;
  code: string;
  quickCheckOpts?: string[];
  quickCheckAns?: number;
  expectedOutputOrSnapshot: string;
  solutionSteps: string[];
  relatedPdf: string;
  relatedPdfFile: string;
  relatedSlide: number;
}

export interface BM101MemorySlotExpectation {
  scope: string;
  variable: string;
  expectedValue: string;
  note: string;
}

export interface BM101ExamQuestion1Output {
  title: string;
  points: number;
  srcLabel: string;
  pdfFile: string;
  slideNum: number;
  prompt: string;
  code: string;
  expectedOutput: string;
  stepTrace: string[];
  exp: string;
}

export interface BM101ExamQuestion2Coding {
  title: string;
  points: number;
  srcLabel: string;
  pdfFile: string;
  slideNum: number;
  prompt: string;
  constraints: string[];
  sampleIO: string;
  rubricKeywords: string[];
  rubricChecklist: string[];
  modelCode: string;
  exp: string;
}

export interface BM101ExamQuestion3Memory {
  title: string;
  points: number;
  srcLabel: string;
  pdfFile: string;
  slideNum: number;
  prompt: string;
  targetMoment: string;
  code: string;
  expectedSlots: BM101MemorySlotExpectation[];
  expectedStackOrder: string[];
  timelineSteps: Array<{
    step: number;
    line: string;
    action: string;
    memorySummary: string;
  }>;
  exp: string;
}

export interface BM101ExamScenario {
  id: string;
  title: string;
  badge: string;
  desc: string;
  durationMin: number;
  formatSummary: string;
  q1Output: BM101ExamQuestion1Output;
  q2Coding: BM101ExamQuestion2Coding;
  q3Memory: BM101ExamQuestion3Memory;
}
