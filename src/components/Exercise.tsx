import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Send, Sparkles, Loader2, MessageSquareText } from "lucide-react";
import { getLanguageFeedback } from "../services/geminiService";

interface ExerciseProps {
  languageName: string;
  onComplete: () => void;
}

export default function Exercise({ languageName, onComplete }: ExerciseProps) {
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    const result = await getLanguageFeedback(userInput, languageName);
    setFeedback(result || "Nice try! Keep practicing.");
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10 text-center">
        <div className="relative inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-[2.5rem] mb-6 border-4 border-blue-200 shadow-[0_4px_0_0_#BFDBFE]">
          <span className="text-5xl">🦉</span>
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-2 italic">Guided Practice</h2>
        <p className="text-slate-500 font-bold">Write a sentence in {languageName} and get instant vibes.</p>
      </div>

      <div className="bg-white rounded-[3rem] p-10 border-4 border-slate-200 shadow-[0_8px_0_0_#E2E8F0] mb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 font-black mb-4">Your Composition</label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`e.g., Me gusta comer tacos...`}
              className="w-full min-h-[160px] p-8 rounded-3xl bg-slate-50 border-4 border-slate-100 focus:border-blue-400 focus:bg-white resize-none text-slate-800 placeholder-slate-300 transition-all font-bold text-lg outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!userInput.trim() || isLoading}
            className="w-full flex items-center justify-center gap-4 bg-blue-500 disabled:opacity-30 text-white py-6 rounded-3xl font-black text-xl shadow-[0_6px_0_0_#2563EB] active:translate-y-1 active:shadow-none transition-all uppercase tracking-tight"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Send className="w-6 h-6" />
                Analyze Vibe
              </>
            )}
          </button>
        </form>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 p-8 bg-purple-100 rounded-[2.5rem] border-4 border-purple-200 relative overflow-hidden group shadow-[0_4px_0_0_#E9D5FF]"
          >
            <div className="absolute -top-4 -right-4 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
              <Sparkles className="w-20 h-20 text-purple-600" />
            </div>
            
            <h4 className="text-xs uppercase tracking-[0.2em] text-purple-600 font-black mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              TUTOR VIBE CHECK
            </h4>
            <div className="text-purple-900 leading-relaxed space-y-3 whitespace-pre-wrap font-bold text-lg relative z-10">
              {feedback}
            </div>
            
            <div className="mt-10 flex justify-end">
              <button
                onClick={onComplete}
                className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-[0_4px_0_0_#4C1D95] active:translate-y-1 active:shadow-none transition-all flex items-center gap-3 uppercase tracking-widest"
              >
                On to the Quiz
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 pb-4">
        <div className="bg-blue-50 p-6 rounded-3xl border-4 border-blue-100 shadow-[0_4px_0_0_#DBEAFE]">
          <h5 className="text-[11px] uppercase tracking-[0.2em] text-blue-400 font-black mb-2">VIBE TIP</h5>
          <p className="text-xs text-blue-600 font-bold leading-relaxed">Focus on natural phrasing to keep the hot streak alive!</p>
        </div>
        <div className="bg-green-50 p-6 rounded-3xl border-4 border-green-100 shadow-[0_4px_0_0_#DCFCE7]">
          <h5 className="text-[11px] uppercase tracking-[0.2em] text-green-400 font-black mb-2">VIBE GOAL</h5>
          <p className="text-xs text-green-600 font-bold leading-relaxed">Unlock the final challenge by analyzing your skills.</p>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
