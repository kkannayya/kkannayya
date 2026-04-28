import { motion } from "motion/react";
import { LANGUAGES } from "../constants";
import { Language } from "../types";
import { Globe, ChevronRight } from "lucide-react";

interface LanguageSelectorProps {
  onSelect: (lang: Language) => void;
}

export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-6 py-2 bg-blue-100 rounded-2xl text-blue-600 text-sm font-black mb-6 border-2 border-blue-200"
        >
          <Globe className="w-4 h-4" />
          <span>PICK A PATH</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl font-black text-slate-800 mb-6 tracking-tight leading-tight italic"
        >
          Start your <br />
          <span className="text-blue-500">Language Vibe</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-xl max-w-lg mx-auto leading-relaxed font-bold"
        >
          Level up your skills with real-time feedback and engaging exercises.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(Object.entries(LANGUAGES) as [Language, typeof LANGUAGES.spanish][]).map(([key, data], idx) => (
          <motion.button
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            onClick={() => onSelect(key)}
            className="group relative bg-white border-4 border-slate-200 p-8 rounded-[3rem] text-left hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 shadow-[0_8px_0_0_#E2E8F0] hover:shadow-[0_8px_0_0_#60A5FA] active:translate-y-1 active:shadow-none"
            id={`lang-btn-${key}`}
          >
            <div className="flex items-start justify-between mb-8">
              <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500 block">
                {data.flag}
              </span>
              <div className="w-12 h-12 rounded-2xl border-4 border-slate-100 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-600 group-hover:text-white transition-all duration-300">
                <ChevronRight className="w-6 h-6" />
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-black text-slate-800 mb-2">{data.name}</h3>
              <p className="text-slate-500 font-bold leading-relaxed pr-8">
                Explore core vocabulary and perfect your vibe in {data.name}.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <span className="px-4 py-1.5 bg-blue-100 rounded-xl text-xs uppercase tracking-widest text-blue-600 font-black">Beginner</span>
              <span className="px-4 py-1.5 bg-green-100 rounded-xl text-xs uppercase tracking-widest text-green-600 font-black">Interactive</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
