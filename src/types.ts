export type Language = 'spanish' | 'french' | 'japanese' | 'german';

export interface Phrase {
  original: string;
  translated: string;
  pronunciation?: string;
  example?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface LanguageData {
  name: string;
  flag: string;
  phrases: Phrase[];
  quiz: QuizQuestion[];
}
