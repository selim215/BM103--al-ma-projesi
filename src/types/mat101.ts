export type MAT101TopMode = 'learn' | 'midterms' | 'slides' | 'a4' | 'videos';
export type MAT101SubTab = 'interactive' | 'hap' | 'quiz' | 'a4' | 'slides';

export type MAT101MidtermScope = 'full' | 'partial' | 'after-midterm';

export interface MAT101HapBilgi {
  badge: string;
  q: string;
  a: string;
  pdfPage: number;
  afterMidterm?: boolean;
  youtubeUrl?: string;
  youtubeTitle?: string;
}

export interface MAT101A4Section {
  h: string;
  items: string[];
  afterMidterm?: boolean;
}

export interface MAT101QuizQuestion {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
  pdfPage?: number;
  afterMidterm?: boolean;
}

export interface MAT101SlideItem {
  n: number; // 1-based page inside lecture_notes_b5c6234b.pdf
  t: string;
  hasVisual: boolean;
  visualCaption?: string;
  explanation: string;
  summaryPoints: string[];
  keyFormula?: string;
  isMidtermCutoff?: boolean;
  afterMidterm?: boolean;
  youtubeUrl?: string;
  youtubeTitle?: string;
}

export interface MAT101Module {
  id: string;
  tag: string;
  title: string;
  chapterLabel: string;
  pageRange: string;
  desc: string;
  midtermScope: MAT101MidtermScope;
  midtermCutoffNote?: string;
  youtubeUrl?: string;
  youtubeTitle?: string;
  hapBilgiler: MAT101HapBilgi[];
  summaryA4: MAT101A4Section[];
  quiz: MAT101QuizQuestion[];
  slides: MAT101SlideItem[];
}

export interface MAT101PastQuestion {
  num: number;
  type: 'mcq' | 'classical';
  topicTag: string;
  questionLatex: string;
  options?: string[]; // A..E for mcq
  correctIndex?: number; // 0..4 for mcq
  correctLabel?: string; // e.g. 'A', 'B', ... or final classical expression
  questionPage: number; // page inside exam pdf
  solutionKeyPage?: number; // optional handwritten key page (e.g. 2022-23 A/B)
  stepByStepSolution: string[];
  keyTakeaway: string;
  officialNote?: string;
}

export interface MAT101PastMidtermPaper {
  id: string;
  yearLabel: string;
  groupLabel: 'Grup A' | 'Grup B';
  examDate: string;
  durationMin: number;
  pdfFile: string;
  pdfLabel: string;
  hasHandwrittenKey: boolean;
  summaryNote: string;
  questions: MAT101PastQuestion[];
}
