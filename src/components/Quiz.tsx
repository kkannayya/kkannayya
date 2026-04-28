import { motion } from "motion/react";
import { CheckCircle2, XCircle, Info, Sparkles, RefreshCw } from "lucide-react";
import { useState } from "react";
import { QuizQuestion } from "../types";
import confetti from "canvas-confetti";

interface QuizProps {
  questions: QuizQuestion[];
  languageName: string;
  onReset: () => void;
}

export default function Quiz({ questions, languageName, onReset }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      if (score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0) === questions.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#22C55E', '#EF4444', '#F59E0B']
        });
      }
    }
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[3.5rem] p-12 shadow-[0_12px_24px_-12px_rgba(59,130,246,0.2)] border-4 border-blue-100 text-center"
      >
        <div className="w-24 h-24 bg-blue-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border-4 border-blue-200 shadow-[0_4px_0_0_#BFDBFE]">
          <Sparkles className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-4 italic tracking-tight">Mission Accomplished!</h2>
        <p className="text-slate-500 font-bold text-lg mb-10">You've mastered the vibes of {languageName}.</p>
        
        <div className="bg-slate-50 rounded-[2.5rem] p-10 mb-10 border-4 border-slate-100">
          <span className="block text-xs uppercase tracking-[0.3em] text-slate-400 font-black mb-4">FINAL SCORE VIBE</span>
          <div className="text-7xl font-mono font-black text-slate-800">
            {score}/{questions.length}
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-6 rounded-3xl font-black text-xl shadow-[0_6px_0_0_#2563EB] active:translate-y-1 active:shadow-none transition-all"
        >
          <RefreshCw className="w-6 h-6" />
          START OVER
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10 flex items-center justify-between gap-6">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-black shrink-0">
          CHALLENGE {currentIdx + 1} / {questions.length}
        </span>
        <div className="h-5 flex-1 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            className="h-full bg-green-400 shadow-[0_3px_0_0_#059669_inset]"
          />
        </div>
        <div className="bg-orange-100 border-2 border-orange-200 px-4 py-1 rounded-xl flex items-center gap-2">
          <span className="text-orange-500">💎</span>
          <span className="text-xs font-black text-orange-600">{score * 10}</span>
        </div>
      </div>

      <motion.div
        key={currentIdx}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-[3rem] p-10 shadow-[0_8px_0_0_#F1F5F9] border-4 border-slate-100"
      >
        <h3 className="text-3xl font-black text-slate-700 mb-10 italic tracking-tight leading-tight">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = option === selectedOption;
            
            let btnClass = "w-full text-left p-6 rounded-3xl border-4 transition-all flex items-center gap-6 active:translate-y-1 active:shadow-none ";
            let idxCircleClass = "w-12 h-12 flex items-center justify-center rounded-2xl font-black text-lg transition-colors ";

            if (!isAnswered) {
              if (isSelected) {
                btnClass += "border-blue-400 bg-blue-50 text-slate-800 shadow-[0_6px_0_0_#60A5FA]";
                idxCircleClass += "bg-blue-500 text-white";
              } else {
                btnClass += "border-slate-200 bg-white text-slate-600 shadow-[0_6px_0_0_#E2E8F0] hover:border-slate-300";
                idxCircleClass += "bg-slate-100 text-slate-400";
              }
            } else {
              if (isCorrect) {
                btnClass += "border-green-400 bg-green-50 text-green-800 shadow-[0_6px_0_0_#4ADE80]";
                idxCircleClass += "bg-green-500 text-white";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-red-400 bg-red-50 text-red-800 shadow-[0_6px_0_0_#F87171]";
                idxCircleClass += "bg-red-500 text-white";
              } else {
                btnClass += "border-slate-100 opacity-40 text-slate-400 cursor-default";
                idxCircleClass += "bg-slate-50 text-slate-200";
              }
            }

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={btnClass}
                id={`option-${option.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className={idxCircleClass}>{idx + 1}</span>
                <span className="font-black text-xl">{option}</span>
                {isAnswered && (
                  <div className="ml-auto">
                    {isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : (isSelected && <XCircle className="w-8 h-8 text-red-500" />)}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-10 -mx-10 -mb-10 p-10 border-t-4 flex items-center justify-between rounded-b-[3rem] ${
              selectedOption === currentQuestion.correctAnswer 
                ? "bg-green-100 border-green-200" 
                : "bg-red-100 border-red-200"
            }`}
          >
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg ${
                selectedOption === currentQuestion.correctAnswer ? "bg-green-500" : "bg-red-500"
              }`}>
                {selectedOption === currentQuestion.correctAnswer ? "✓" : "×"}
              </div>
              <div className="max-w-xs">
                <p className={`font-black text-2xl tracking-tight ${
                  selectedOption === currentQuestion.correctAnswer ? "text-green-700" : "text-red-700"
                }`}>
                  {selectedOption === currentQuestion.correctAnswer ? "Nicely done!" : "Not quite!"}
                </p>
                <p className={`font-bold text-sm leading-snug ${
                  selectedOption === currentQuestion.correctAnswer ? "text-green-600" : "text-red-600"
                }`}>
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className={`px-12 py-5 rounded-2xl font-black text-white text-lg transition-all active:translate-y-1 active:shadow-none ${
                selectedOption === currentQuestion.correctAnswer 
                  ? "bg-green-500 shadow-[0_6px_0_0_#059669]" 
                  : "bg-red-500 shadow-[0_6px_0_0_#B91C1C]"
              }`}
            >
              {currentIdx + 1 === questions.length ? "FINISH" : "CONTINUE"}
            </button>
          </motion.div>
        )}

        {!isAnswered && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="w-full bg-blue-500 disabled:opacity-30 text-white py-6 rounded-3xl font-black text-xl shadow-[0_6px_0_0_#2563EB] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest"
            >
              Check Answer
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
