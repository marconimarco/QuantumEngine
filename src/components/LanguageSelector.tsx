import React, { useState } from 'react';
import { Globe, ChevronUp } from 'lucide-react';
import { LANGUAGES, LanguageCode } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../lib/TranslationContext';

interface Props {
  currentLanguage: LanguageCode;
  onLanguageChange: (code: LanguageCode) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: Props) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const selectedLang = LANGUAGES.find(l => l.code === currentLanguage);

  return (
    <div className="fixed bottom-28 right-4 sm:bottom-16 sm:right-6 z-50">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-full right-0 mb-2 w-48 quantum-card p-2 overflow-hidden"
            >
              <div className="max-h-64 overflow-y-auto scrollbar-hide">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-quantum-primary text-quantum-bg font-bold'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {t(`lang_${lang.code}`) || lang.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 quantum-glass px-4 py-2 hover:border-quantum-primary transition-colors group"
        >
          <Globe className="w-4 h-4 text-quantum-primary group-hover:animate-pulse" />
          <span className="text-sm font-medium text-white">{t(`lang_${currentLanguage}`) || selectedLang?.label}</span>
          <ChevronUp className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}
