import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check } from 'lucide-react';
import { LANGUAGES, LanguageCode } from '../types';

interface Props {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const activeLang = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/60 border border-white/10 rounded-full text-gray-400 hover:text-quantum-primary hover:border-quantum-primary/50 transition-all font-mono text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-md"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{activeLang.label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click outside overlay */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 bottom-full mb-2 w-40 sm:w-48 bg-black/95 border border-white/10 rounded-xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.5)] z-50 backdrop-blur-xl"
            >
              <div className="py-1 max-h-60 overflow-y-auto scrollbar-hide">
                {LANGUAGES.map((lang) => {
                  const isSelected = lang.code === currentLanguage;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 text-left text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-colors ${
                        isSelected 
                          ? 'text-quantum-primary bg-quantum-primary/5' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {isSelected && <Check className="w-3 h-3 text-quantum-primary" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
