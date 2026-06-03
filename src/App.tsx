import React, { useState } from 'react';
import SectorSelector from './components/SectorSelector';
import QuantumDashboard from './components/QuantumDashboard';
import LanguageSelector from './components/LanguageSelector';
import IBMQuantumInterface from './components/IBMQuantumInterface';
import QuantumAgentsInterface from './components/QuantumAgentsInterface';
import { SectorId, SECTORS, LanguageCode } from './types';
import { TranslationProvider, useTranslation } from './lib/TranslationContext';
import { Cpu, Users } from 'lucide-react';

export default function App() {
  const [selectedSectorId, setSelectedSectorId] = useState<SectorId | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('it');

  return (
    <TranslationProvider language={currentLanguage}>
      <AppContent 
        selectedSectorId={selectedSectorId} 
        setSelectedSectorId={setSelectedSectorId}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />
    </TranslationProvider>
  );
}

function AppContent({ 
  selectedSectorId, 
  setSelectedSectorId, 
  currentLanguage, 
  setCurrentLanguage 
}: any) {
  const { t } = useTranslation();
  const [returnToSubMenu, setReturnToSubMenu] = useState<SectorId | null>(null);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [isIbmInterfaceOpen, setIsIbmInterfaceOpen] = useState(false);
  const [isAgentsOpen, setIsAgentsOpen] = useState(false);
  const selectedSector = SECTORS.find(s => s.id === selectedSectorId);

  const handleBack = () => {
    const quantumCodeGroupIds = ['crosscode', 'translator'];
    const pqcGroupIds = ['pqc_locker', 'pqc_keygen', 'pqc_chat'];
    
    if (quantumCodeGroupIds.includes(selectedSectorId as string)) {
      setReturnToSubMenu('quantum_code');
    } else if (pqcGroupIds.includes(selectedSectorId as string)) {
      setReturnToSubMenu('pqc_group');
    } else {
      setReturnToSubMenu(null);
    }
    
    setSelectedSectorId(null);
  };

  const handleSelect = (id: SectorId) => {
    setReturnToSubMenu(null);
    setIsIbmInterfaceOpen(false);
    setIsAgentsOpen(false);
    setSelectedSectorId(id);
  };

  return (
    <div className="min-h-screen bg-quantum-bg selection:bg-quantum-primary selection:text-quantum-bg flex flex-col overflow-x-hidden overflow-y-auto scrollbar-hide">
      {/* Background visual elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-quantum-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-quantum-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      {/* Floating SEND TO IBM Q tab - staccata dalle altre, a bordo pagina a destra, a metà */}
      {!selectedSectorId && !isSubMenuVisible && !isIbmInterfaceOpen && !isAgentsOpen && (
        <button
          id="floating-send-to-ibm"
          onClick={() => setIsIbmInterfaceOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-quantum-primary hover:bg-quantum-primary/90 text-quantum-bg shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_25px_rgba(0,242,255,0.6)] border-l border-y border-quantum-primary/80 py-4 px-2 sm:px-2.5 rounded-l-xl flex flex-col items-center gap-2 transition-all group cursor-pointer hover:pr-4"
        >
          <Cpu className="w-4 h-4 text-quantum-bg group-hover:scale-125 group-hover:rotate-12 transition-transform" />
          <span className="[writing-mode:vertical-rl] font-mono text-[9px] sm:text-[10px] font-black tracking-[0.15em] leading-none select-none">
            SEND TO IBM Q
          </span>
        </button>
      )}

      {/* Floating AGENTS tab - staccata dalle altre, a bordo pagina a sinistra, a metà */}
      {!selectedSectorId && !isSubMenuVisible && !isIbmInterfaceOpen && !isAgentsOpen && (
        <button
          id="floating-agents"
          onClick={() => setIsAgentsOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-quantum-secondary hover:bg-quantum-secondary/90 text-quantum-bg shadow-[0_0_15px_rgba(0,242,260,0.3)] hover:shadow-[0_0_25px_rgba(0,242,260,0.6)] border-r border-y border-quantum-secondary/80 py-4 px-2 sm:px-2.5 rounded-r-xl flex flex-col items-center gap-2 transition-all group cursor-pointer hover:pl-4"
        >
          <Users className="w-4 h-4 text-quantum-bg group-hover:scale-125 group-hover:-rotate-12 transition-transform" />
          <span className="[writing-mode:vertical-rl] font-mono text-[9px] sm:text-[10px] font-black tracking-[0.15em] leading-none select-none">
            AGENTS
          </span>
        </button>
      )}

      <main className="relative z-10 flex-1 flex flex-col">
        {isIbmInterfaceOpen ? (
          <IBMQuantumInterface onBack={() => setIsIbmInterfaceOpen(false)} />
        ) : isAgentsOpen ? (
          <QuantumAgentsInterface onBack={() => setIsAgentsOpen(false)} />
        ) : !selectedSectorId || !selectedSector ? (
          <div className="flex-1 flex flex-col">
            <SectorSelector 
              onSelect={handleSelect} 
              initialSubMenu={returnToSubMenu} 
              onSubMenuToggle={setIsSubMenuVisible}
            />
          </div>
        ) : (
          <QuantumDashboard 
            sector={selectedSector} 
            onBack={handleBack} 
            onSectorChange={handleSelect}
          />
        )}
      </main>

      {!selectedSectorId && !isSubMenuVisible && !isIbmInterfaceOpen && !isAgentsOpen && (
        <div className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 lg:right-8 z-30">
          <LanguageSelector 
            currentLanguage={currentLanguage} 
            onLanguageChange={setCurrentLanguage} 
          />
        </div>
      )}

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 flex justify-between items-center bg-quantum-bg/85 backdrop-blur-md border-t border-white/5 z-20">
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
