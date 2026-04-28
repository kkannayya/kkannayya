import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Phrase } from "../types";
import { Volume2, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";

interface FlashcardsProps {
  phrases: Phrase[];
  onComplete: () => void;
}

export default function Flashcards({ phrases, onComplete }: FlashcardsProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentIdx === phrases.length - 1 && isFlipped) {
      onComplete();
      return;
    }
    setDirection(1);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => Math.min(prev + 1, phrases.length - 1));
    }, 50);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => Math.max(prev - 1, 0));
    }, 50);
  };

  const currentPhrase = phrases[currentIdx];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-black text-slate-800 mb-2 italic">Master Vocabulary</h2>
        <p className="text-slate-500 font-bold">Tap to flip. Vibe with the words.</p>
      </div>

      <div className="relative w-full max-w-sm h-80 perspective-[1000px] mb-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIdx}
            custom={direction}
            initial={{ x: direction * 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full cursor-pointer touch-action-none"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-full h-full relative transform-style-3d shadow-[0_12px_0_0_#CBD5E1] rounded-[3rem]"
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-[3rem] border-4 border-slate-200 flex flex-col items-center justify-center p-12 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-blue-500 font-black mb-6">Original</span>
                <h3 className="text-4xl font-black text-slate-800 mb-4">{currentPhrase.original}</h3>
                {currentPhrase.pronunciation && (
                  <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-1.5 rounded-2xl text-sm border-2 border-slate-100">
                    <Volume2 className="w-5 h-5 text-blue-400" />
                    <span className="font-mono font-bold italic">{currentPhrase.pronunciation}</span>
                  </div>
                )}
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 backface-hidden bg-blue-500 text-white rounded-[3rem] border-4 border-blue-600 flex flex-col items-center justify-center p-12 text-center shadow-[0_12px_0_0_#2563EB]"
                style={{ transform: "rotateY(180deg)" }}
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-black mb-6">Translate</span>
                <h3 className="text-4xl font-black mb-4">{currentPhrase.translated}</h3>
                <div className="h-1 w-12 bg-white/20 rounded-full my-4" />
                <p className="text-blue-100 text-sm font-bold italic">Keep it up!</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute -bottom-20 left-0 right-0 flex justify-center items-center gap-6">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="p-4 bg-white border-4 border-slate-200 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-400 disabled:opacity-20 transition-all active:translate-y-1 shadow-[0_4px_0_0_#E2E8F0] active:shadow-none"
            id="prev-btn"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {phrases.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-10 bg-blue-500' : 'w-2 bg-slate-200'}`} 
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-4 bg-green-500 border-4 border-green-600 rounded-2xl text-white hover:bg-green-600 transition-all active:translate-y-1 shadow-[0_4px_0_0_#059669] active:shadow-none"
            id="next-btn"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="mt-12">
        <button 
          onClick={() => {
            setCurrentIdx(0);
            setIsFlipped(false);
          }}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-500 text-sm font-black transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          RESET DECK
        </button>
      </div>
    </div>
  );
}
