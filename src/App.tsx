import React, { useState } from 'react';
import SectorSelector from './components/SectorSelector';
import QuantumDashboard from './components/QuantumDashboard';
import LanguageSelector from './components/LanguageSelector';
import IBMQuantumInterface from './components/IBMQuantumInterface';
import QuantumAgentsInterface from './components/QuantumAgentsInterface';
import { SectorId, SECTORS, LanguageCode } from './types';
import { TranslationProvider, useTranslation } from './lib/TranslationContext';
import { Cpu, Terminal, ArrowLeft, Layers, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('it');

  return (
    <TranslationProvider language={currentLanguage}>
      <AppContent currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
    </TranslationProvider>
  );
}

function AppContent({ currentLanguage, setCurrentLanguage }: { currentLanguage: LanguageCode; setCurrentLanguage: (lang: LanguageCode) => void }) {
  const { t } = useTranslation();
  
  // State management
  const [selectedSectorId, setSelectedSectorId] = useState<SectorId | null>(null);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [isIbmInterfaceOpen, setIsIbmInterfaceOpen] = useState(false);
  const [isAgentsOpen, setIsAgentsOpen] = useState(false);
  const [returnToSubMenu, setReturnToSubMenu] = useState<SectorId | null>(null);
  const [sharedQasm, setSharedQasm] = useState<string>('');

  const selectedSector = SECTORS.find(s => s.id === selectedSectorId);

  const handleSelectSector = (id: SectorId) => {
    if (id === 'quantum_code') {
      // "Write Q Code" triggers our advanced Quantum AI Agents system directly!
      setIsAgentsOpen(true);
    } else if (id === 'send_to_ibm') {
      setIsIbmInterfaceOpen(true);
    } else {
      setSelectedSectorId(id);
    }
  };

  const handleBackFromDashboard = () => {
    setSelectedSectorId(null);
  };

  const handleSendToIbm = (qasmCode: string) => {
    setSharedQasm(qasmCode);
    setReturnToSubMenu('quantum_code');
    setIsIbmInterfaceOpen(true);
    setIsAgentsOpen(false);
  };

  return (
    <div className="min-h-screen bg-quantum-bg selection:bg-quantum-primary selection:text-quantum-bg flex flex-col overflow-x-hidden overflow-y-auto scrollbar-hide relative text-white">
      
      {/* Dynamic flowing background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-quantum-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-quantum-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      {/* Elegant glassmorphism Top Header bar when on the primary Landing selector */}
      {!selectedSectorId && !isIbmInterfaceOpen && !isAgentsOpen && (
        <header className="relative z-50 w-full px-6 py-4 mx-auto max-w-7xl flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-quantum-primary animate-pulse" />
            <span className="font-display font-black uppercase tracking-[0.2em] text-xs sm:text-sm bg-gradient-to-r from-white via-gray-300 to-quantum-primary bg-clip-text text-transparent">
              Quantum Systems Core
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
          </div>
        </header>
      )}

      {/* Main container area */}
      <main className="relative z-10 flex-1 flex flex-col">
        {isIbmInterfaceOpen ? (
          <IBMQuantumInterface 
            onBack={() => {
              setIsIbmInterfaceOpen(false);
              // Return to the sub-view we originated from
              if (returnToSubMenu === 'quantum_code') {
                setIsAgentsOpen(true);
              }
            }} 
            initialCode={sharedQasm}
          />
        ) : isAgentsOpen ? (
          <QuantumAgentsInterface 
            onBack={() => {
              setIsAgentsOpen(false);
              setReturnToSubMenu(null);
            }}
            onSendToIbm={handleSendToIbm}
          />
        ) : selectedSector ? (
          <QuantumDashboard 
            sector={selectedSector} 
            onBack={handleBackFromDashboard}
            onSectorChange={handleSelectSector}
          />
        ) : (
          <SectorSelector 
            onSelect={handleSelectSector}
            initialSubMenu={returnToSubMenu}
            onSubMenuToggle={setIsSubMenuVisible}
            onOpenAgents={() => setIsAgentsOpen(true)}
            onOpenIbm={() => setIsIbmInterfaceOpen(true)}
          />
        )}
      </main>

      {/* Float Language selection menu exclusively on landing view */}
      {!selectedSectorId && !isSubMenuVisible && !isIbmInterfaceOpen && !isAgentsOpen && (
        <div className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 lg:right-8 z-30">
          <LanguageSelector 
            currentLanguage={currentLanguage} 
            onLanguageChange={setCurrentLanguage} 
          />
        </div>
      )}

      {/* Footer / Status bar bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 flex justify-between items-center bg-quantum-bg/85 backdrop-blur-md border-t border-white/5 z-20 select-none">
        <div className="flex gap-4">
          <span className="text-[7px] sm:text-[10px] text-quantum-primary font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] animate-pulse">
            {t('fidelity')}
          </span>
        </div>
        <div className="text-[7px] sm:text-[10px] text-quantum-primary font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] animate-pulse">
          {t('activeCore')}
        </div>
      </footer>
    </div>
  );
}
