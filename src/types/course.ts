export type TopMode = 'learn' | 'slides' | 'a4' | 'exam';
export type SubTab = 'interactive' | 'hap' | 'quiz' | 'a4' | 'slides';

export interface HapBilgi {
  badge: string;
  q: string;
  a: string;
  slide: number;
}

export interface A4Section {
  h: string;
  items: string[];
}

export interface QuizQuestion {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
}

export interface SlideItem {
  n: number;
  t: string;
  body: string;
}

export interface WeekModule {
  id: string;
  tag: string;
  title: string;
  pdfName: string;
  desc: string;
  hapBilgiler: HapBilgi[];
  summaryA4: A4Section[];
  quiz: QuizQuestion[];
  slides: SlideItem[];
}

export type QuestionKind = 'tf' | 'test' | 'classic';

export interface ExamQuestion {
  kind: QuestionKind;
  points: number;
  src: string;
  q: string;
  opts?: string[];
  ans?: number;
  modelAnswer?: string;
  expectedKeywords?: string[];
  exp: string;
}

export interface ExamScenario {
  id: string;
  title: string;
  badge: string;
  desc: string;
  durationMin: number;
  formatSummary: string;
  questions: ExamQuestion[];
}
