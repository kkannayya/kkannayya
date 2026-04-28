/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Map, GraduationCap, ChevronLeft, LayoutGrid } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import Flashcards from './components/Flashcards';
import Exercise from './components/Exercise';
import Quiz from './components/Quiz';
import { Language } from './types';
import { LANGUAGES } from './constants';

type AppState = 'selection' | 'learning' | 'exercise' | 'quiz';

export default function App() {
  const [state, setState] = useState<AppState>('selection');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const startJourney = (lang: Language) => {
    setSelectedLanguage(lang);
    setState('learning');
  };

  const handleBack = () => {
    if (state === 'learning') setState('selection');
    else if (state === 'exercise') setState('learning');
    else if (state === 'quiz') setState('exercise');
  };

  const languageData = selectedLanguage ? LANGUAGES[selectedLanguage] : null;

  return (
    <div className="min-h-screen bg-brand-bg text-slate-800 font-sans selection:bg-blue-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-blue-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setState('selection')}>
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center rotate-3 shadow-[0_3px_0_0_#2563EB]">
            <span className="text-white font-black text-2xl">L</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-blue-600 italic">LINGOVIBE</span>
        </div>
        
        {state !== 'selection' && (
          <div className="hidden md:flex items-center gap-2">
            <NavItem active={state === 'learning'} emoji="📚" label="Vocab" />
            <NavItem active={state === 'exercise'} emoji="✏️" label="Practice" />
            <NavItem active={state === 'quiz'} emoji="🏆" label="Quiz" />
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-orange-100 px-4 py-1.5 rounded-2xl border-2 border-orange-200">
            <span className="text-orange-500">🔥</span>
            <span className="font-black text-orange-600 text-sm">14 DAYS</span>
          </div>
          {state !== 'selection' && (
            <button 
              onClick={() => setState('selection')}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors border-2 border-transparent hover:border-slate-200"
            >
              <LayoutGrid className="w-6 h-6 text-slate-400" />
            </button>
          )}
        </div>
      </nav>

      <main className="pt-28 pb-12 px-6">
        <AnimatePresence mode="wait">
          {state === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LanguageSelector onSelect={startJourney} />
            </motion.div>
          )}

          {state !== 'selection' && languageData && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleBack}
                  className="p-3 bg-white rounded-2xl border-4 border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-400 transition-all active:translate-y-1 active:shadow-none shadow-[0_4px_0_0_#E2E8F0]"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Current Unit</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{languageData.flag}</span>
                    <h3 className="text-3xl font-black text-slate-700 tracking-tight">{languageData.name} Journey</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white border-4 border-blue-100 rounded-[3.5rem] p-8 md:p-12 shadow-[0_12px_24px_-12px_rgba(59,130,246,0.2)]">
                {state === 'learning' && (
                  <Flashcards 
                    phrases={languageData.phrases} 
                    onComplete={() => setState('exercise')} 
                  />
                )}
                {state === 'exercise' && (
                  <Exercise 
                    languageName={languageData.name} 
                    onComplete={() => setState('quiz')} 
                  />
                )}
                {state === 'quiz' && (
                  <Quiz 
                    questions={languageData.quiz} 
                    languageName={languageData.name} 
                    onReset={() => setState('selection')} 
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t-4 border-blue-50 text-center">
        <p className="text-slate-300 text-xs font-black uppercase tracking-[0.3em]">Learn • Vibe • Grow</p>
      </footer>
    </div>
  );
}

function NavItem({ active, emoji, label }: { active: boolean, emoji: string, label: string }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-4 transition-all ${active ? 'bg-blue-500 border-blue-600 text-white shadow-[0_3px_0_0_#2563EB]' : 'border-transparent text-slate-400 hover:bg-slate-50'}`}>
      <span className="text-xl">{emoji}</span>
      <span className="text-sm font-black uppercase tracking-tight">{label}</span>
    </div>
  );
}
