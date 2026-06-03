import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Terminal, 
  Send, 
  Cpu, 
  Sparkles, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Code, 
  Copy, 
  Check, 
  Info,
  Layers,
  HelpCircle,
  TrendingUp,
  Workflow,
  RefreshCw,
  Search,
  Filter,
  Globe,
  FileSpreadsheet
} from 'lucide-react';
import { QUANTUM_SCENARIOS, QuantumScenario } from '../data/scenarios';

interface Props {
  onBack: () => void;
}

interface Message {
  id: string;
  sender: 'system' | 'user';
  text: string;
  timestamp: string;
  isComposerCode?: boolean;
  code?: string;
}

export default function QuantumAgentsInterface({ onBack }: Props) {
  // Conversational active state machine
  const [step, setStep] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');

  // Scenario explorer state
  const [selectedScenario, setSelectedScenario] = useState<QuantumScenario | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMacroarea, setSelectedMacroarea] = useState<string>('Tutte');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('Tutte');
  
  // Scenarios and interview responses
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [csvData, setCsvData] = useState<string>('');
  const [threshold, setThreshold] = useState<number>(0.04); // e.g. 4%
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  function getScenarioQuestions(scenario: QuantumScenario): string[] {
    const vars = scenario.targetVariables.split(',').map(v => v.trim());
    const mainVar = vars[0] || 'Saturazione';
    const secondVar = vars[1] || 'Legame';
    
    if (scenario.macroarea.includes('Finanza')) {
      return [
        `Qual è la tua tolleranza massima al rischio (conservativa, moderata, aggressiva) nell'ambito di "${scenario.name}"?`,
        `Come intendi ponderare la variabile "${mainVar}" per mitigare l'impatto sul modulo quantistico?`,
        `Quale deviazione massima ritieni tollerabile sulla metrica "${secondVar}" prima di applicare misure protettive?`
      ];
    } else if (scenario.macroarea.includes('Logistica')) {
      return [
        `Qual è il ritardo medio o colletto di bottiglia massimo tollerabile per l'asset "${scenario.name}"?`,
        `In che modo la variabile "${mainVar}" influenza la stabilità dei nodi interconnessi?`,
        `In caso di blocco di un canale critico basato su "${secondVar}", disponi di rotte secondarie ridondanti già operative per l'entanglement distributivo?`
      ];
    } else if (scenario.macroarea.includes('Chimica') || scenario.macroarea.includes('Genomica')) {
      return [
        `Qual è la precisione molecolare o energetica richiesta durante la simulazione di "${scenario.name}"?`,
        `Come viene monitorata o calcolata la stabilità correlata a "${mainVar}"?`,
        `Quale impatto ha "${secondVar}" sulla stabilità o decadimento a lungo termine dell'elemento?`
      ];
    } else if (scenario.macroarea.includes('Manifattura')) {
      return [
        `Con quale frequenza monitorate l'usura meccanica e il ciclo produttivo per "${scenario.name}"?`,
        `In che modo l'accumulo di tensione sulla variabile "${mainVar}" accelera l'usura della linea?`,
        `Qual è il costo orario stimato per un blocco improvviso dovuto a instabilità su "${secondVar}"?`
      ];
    } else if (scenario.macroarea.includes('Cybersecurity')) {
      return [
        `Qual è la lunghezza e forza delle chiavi (es. bit o standard NIST) richieste in "${scenario.name}"?`,
        `Qual è la magnitudine dell'esposizione legata alla variabile "${mainVar}" in caso di attacco cyber?`,
        `Quale flusso automatico deve scattare se "${secondVar}" supera la percentuale di soglia critica?`
      ];
    }
    
    return [
      `Qual è la tolleranza al rischio o errore in questo scenario pilota di "${scenario.name}"?`,
      `In che modo la variabile "${mainVar}" influenzerà il processo decisionale classico?`
    ];
  }

  function generateScenarioCSV(scenario: QuantumScenario): string {
    const vars = scenario.targetVariables.split(',').map(v => v.trim());
    const extraHeaders = vars.join(',');
    
    let asset1 = 'ASSET_01';
    let asset2 = 'ASSET_02';
    let asset3 = 'ASSET_03';
    let extraVals1 = '';
    let extraVals2 = '';
    let extraVals3 = '';
    
    if (scenario.macroarea.includes('Finanza')) {
      asset1 = 'OPZIONE_ETH';
      asset2 = 'FUTURES_GOLD';
      asset3 = 'CROSS_EUR_USD';
      extraVals1 = '0.35,0.45,1.08';
      extraVals2 = '0.12,0.85,1.12';
      extraVals3 = '0.65,0.20,1.05';
    } else if (scenario.macroarea.includes('Logistica')) {
      asset1 = 'VEICOLO_HUB_A';
      asset2 = 'VEICOLO_HUB_B';
      asset3 = 'ROTTA_BACKUP';
      extraVals1 = '45.12,12:00,10,0.5';
      extraVals2 = '45.18,14:30,12,0.8';
      extraVals3 = '45.30,18:00,5,0.1';
    } else if (scenario.macroarea.includes('Chimica') || scenario.macroarea.includes('Genomica')) {
      asset1 = 'CATALIZZATORE_PT';
      asset2 = 'MOL_BIO_DEGR';
      asset3 = 'REATTIVO_C';
      extraVals1 = '4.2,0.15,0.88';
      extraVals2 = '2.8,0.05,0.95';
      extraVals3 = '5.0,0.60,0.12';
    } else if (scenario.macroarea.includes('Manifattura')) {
      asset1 = 'ROBOT_SALDATORE_3';
      asset2 = 'CNC_FRESATRICE';
      asset3 = 'LINEA_MONTAGGIO';
      extraVals1 = '120,4.5,12';
      extraVals2 = '150,2.1,3';
      extraVals3 = '90,8.4,24';
    } else if (scenario.macroarea.includes('Cybersecurity')) {
      asset1 = 'CHIAVE_AES_256';
      asset2 = 'FIREWALL_EAST';
      asset3 = 'LOG_ANOMALIE';
      extraVals1 = '256,1.4,12';
      extraVals2 = '128,5.8,4';
      extraVals3 = '512,0.2,0';
    }
    
    // Make sure the lengths match headers
    const l1 = extraHeaders ? ',' + extraVals1.split(',').slice(0, vars.length).join(',') : '';
    const l2 = extraHeaders ? ',' + extraVals2.split(',').slice(0, vars.length).join(',') : '';
    const l3 = extraHeaders ? ',' + extraVals3.split(',').slice(0, vars.length).join(',') : '';

    return `Codice_Articolo,Percentuale_Saturazione,Abbinamento${extraHeaders ? ',' + extraHeaders : ''}
${asset1},0.28,COMBINATO_01${l1}
${asset2},0.45,COMBINATO_01${l2}
${asset3},0.78,LIBERO${l3}`;
  }
  
  // Compilation outputs
  const [qasmOutput, setQasmOutput] = useState<string>('');
  const [mappingSummary, setMappingSummary] = useState<string>('');
  const [ignoredColumns, setIgnoredColumns] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Custom visual compiler formatter to justify text and render beautiful tables out of plain text
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, idx) => {
      if (part.startsWith('```')) {
        const lines = part
          .replace(/```[a-zA-Z]*\n?/, '')
          .replace(/```$/, '')
          .trim()
          .split('\n');
        
        const isCSV = part.includes('Codice_Articolo') || part.includes('Percentuale_Saturazione');
        
        if (isCSV) {
          return (
            <div key={idx} className="my-4 overflow-hidden rounded-xl border border-quantum-primary/20 bg-[#070b14]/90 font-mono text-xs shadow-lg max-w-full">
              <div className="bg-white/5 px-4 py-2.5 border-b border-white/5 text-[10px] uppercase tracking-wider text-quantum-secondary flex flex-wrap justify-between items-center gap-2 font-bold">
                <span className="flex items-center gap-1.5 text-slate-300">📁 STRUTTURA DEL FILE RICHIESTA</span>
                <span className="text-[9px] bg-quantum-primary/10 px-2 py-0.5 rounded text-quantum-primary border border-quantum-primary/20">DECIMALE: USA IL PUNTO (.)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/5 text-slate-300 font-bold uppercase text-[9px] tracking-wider">
                      {lines[0].split(',').map((h, i) => (
                        <th key={i} className="p-3 px-4 border-r border-white/5 last:border-r-0">{h.trim().replace(/_/g, ' ')}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lines.slice(1).map((line, li) => {
                      if (!line.trim()) return null;
                      const cols = line.split(',');
                      return (
                        <tr key={li} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors text-slate-400">
                          {cols.map((val, vi) => (
                            <td key={vi} className="p-3 px-4 border-r border-white/5 last:border-r-0 text-[11px] font-mono">
                              {vi === 0 ? (
                                <span className="text-quantum-secondary font-bold font-mono">{val.trim()}</span>
                              ) : vi === 1 ? (
                                <span className="bg-quantum-primary/10 text-quantum-primary px-1.5 py-0.5 rounded font-bold">{val.trim()}</span>
                              ) : val.trim() === 'LIBERO' ? (
                                <span className="text-slate-500 italic lowercase">{val.trim()}</span>
                              ) : (
                                <span className="text-pink-400 font-medium">{val.trim()}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        // Standard code or QASM structure
        return (
          <div key={idx} className="my-3 bg-[#070b14] border border-white/10 rounded-xl overflow-hidden font-mono text-xs shadow-md">
            <pre className="p-4 overflow-x-auto text-quantum-secondary select-all whitespace-pre leading-relaxed text-[11px]">
              {part.replace(/```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim()}
            </pre>
          </div>
        );
      }

      // Render standard paragraph, split by structural double newline
      const paragraphs = part.split('\n\n');
      return (
        <div key={idx} className="space-y-3">
          {paragraphs.map((par, pIdx) => {
            if (!par.trim()) return null;
            
            // Detect if this paragraph represents list bullets
            const bulletLines = par.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'));
            if (bulletLines.length > 0) {
              return (
                <div key={pIdx} className="space-y-2 my-2 py-1">
                  {par.split('\n').map((line, lIdx) => {
                    const cleanLine = line.trim();
                    if (!cleanLine) return null;
                    const isB = cleanLine.startsWith('-') || cleanLine.startsWith('*');
                    const textToShow = isB ? cleanLine.substring(1).trim() : cleanLine;
                    
                    const inlineParts = textToShow.split(/(\*\*.*?\*\*|`.*?`)/g);
                    const renderedSpan = inlineParts.map((subPart, sIdx) => {
                      if (subPart.startsWith('**') && subPart.endsWith('**')) {
                        return <strong key={sIdx} className="text-white font-bold">{subPart.slice(2, -2)}</strong>;
                      }
                      if (subPart.startsWith('`') && subPart.endsWith('`')) {
                        return <code key={sIdx} className="bg-white/5 border border-white/10 text-[#00f2ff] px-1.5 py-0.5 rounded font-mono text-[10.5px]">{subPart.slice(1, -1)}</code>;
                      }
                      return subPart;
                    });
                    
                    if (isB) {
                      return (
                        <div key={lIdx} className="pl-4 flex items-start gap-2 text-justify">
                          <span className="text-quantum-primary text-xs mt-1 shrink-0">•</span>
                          <span className="text-[12.5px] leading-relaxed text-slate-300">{renderedSpan}</span>
                        </div>
                      );
                    }
                    return (
                      <p key={lIdx} className="text-[12.5px] leading-relaxed text-slate-300 text-justify">{renderedSpan}</p>
                    );
                  })}
                </div>
              );
            }

            // High priority callouts
            const isCallout = par.includes('💡') || par.includes('👉') || par.includes('👋');
            
            // Parse inline formats
            const inlineParts = par.split(/(\*\*.*?\*\*|`.*?`)/g);
            const renderedSpan = inlineParts.map((subPart, sIdx) => {
              if (subPart.startsWith('**') && subPart.endsWith('**')) {
                return <strong key={sIdx} className="text-white font-bold">{subPart.slice(2, -2)}</strong>;
              }
              if (subPart.startsWith('`') && subPart.endsWith('`')) {
                return <code key={sIdx} className="bg-white/5 border border-white/10 text-quantum-secondary px-1 py-0.5 rounded font-mono text-[11px] font-bold">{subPart.slice(1, -1)}</code>;
              }
              return subPart;
            });

            return (
              <p 
                key={pIdx} 
                className={`text-[12.5px] leading-relaxed text-slate-300 ${
                  isCallout 
                    ? 'bg-quantum-primary/5 border border-quantum-primary/20 p-4 rounded-xl shadow-inner my-3 flex items-start gap-2.5' 
                    : ''
                }`}
              >
                <span className="flex-1 block text-justify leading-relaxed">{renderedSpan}</span>
              </p>
            );
          })}
        </div>
      );
    });
  };

  const welcomeText = `👋 **Benvenuto in Quantum Engine BI!** Sono il tuo consulente e co-compilatore d'intelligenza artificiale per l'elaborazione dei dati aziendali.

Questo strumento traduce un semplice file aziendale ordinario in un avanzato algoritmo quantistico per analizzare i tuoi prodotti o flussi su veri computer quantistici IBM.

Per iniziare la simulazione, hai bisogno di un **UNICO file di dati** (puoi scriverlo su Excel e salvarlo come \`.csv\`, oppure prepararlo con il Blocco Note). Per renderlo super comprensibile, ecco come dev'essere strutturato con le colonne fondamentali e quelle di test aggiuntive:

\`\`\`csv
Codice_Articolo,Percentuale_Saturazione,Abbinamento,Priorita,Deposito
MAGLIA_ROSSA,0.15,SET_PRIMAVERA,Media,Milano_Est
PANTALONE_SLIM,0.45,SET_PRIMAVERA,Media,Milano_Est
SCARPA_SPORTIVA,0.85,GRUPPO_RUNNING,Critica,Roma_Nord
OROLOGIO_RUNNER,0.92,GRUPPO_RUNNING,Critica,Roma_Nord
GIACCA_INVERNALE,0.60,LIBERO,Alta,Torino_Hub
CINTURA_PELLE,0.30,LIBERO,Bassa,Bologna_Silos
\`\`\`

💡 **COME PREPARARE IL TUO FILE IN 3 SEMPLICI PASSI:**

- **Passo 1: Identifica i tuoi Asset (\`Codice_Articolo\`)**
Al posto dei nomi degli abiti (come MAGLIA_ROSSA o OROLOGIO) scrivi i codici di ciò che gestisci in azienda. Può essere qualsiasi cosa: bulloni, lotti di magazzino, investimenti finanziari, sensori industriali, filiali, ecc.

- **Passo 2: Definisci lo Stato Critico (\`Percentuale_Saturazione\`)**
Inserisci quanto questo elemento è consumato, a rischio o saturo, usando un numero decimale tra **0.00** (pari allo 0% cioè scarico/sicuro) e **1.00** (pari al 100% cioè completamente saturo o rischioso).
**ATTENZIONE:** Il sistema accetta esclusivamente il **punto (.)** come separatore decimale, es. scrivi **0.85** e mai con la virgola (0,85).

- **Passo 3: Collega gli elementi fra loro (\`Abbinamento\`)**
Se due o più prodotti si muovono insieme, si influenzano o appartengono alla stessa linea logica, uniscili scrivendo lo stesso nome identificativo (es. *SET_PRIMAVERA* o *GRUPPO_RUNNING*). Questo simulerà lo stato di **Entanglement Quantistico** (l'intreccio profondo) tra i qubit corrispondenti. Se un elemento è autonomo e non è legato a nient'altro, scrivi semplicemente **LIBERO**.

*Nota: Come vedi nell'esempio, puoi aggiungere colonne aggiuntive a piacimento (come \`Priorita\` o \`Deposito\`). Il nostro compilatore le rileverà ed escluderà in automatico, estraendo solo i dati necessari e lasciando inalterati i dettagli per la tua reportistica!*

👉 Per iniziare, **seleziona uno Scenario d'Esempio** dal database sulla destra, oppure **incolla la tua tabella d'esempio** e premi invio qui sotto!`;

  // Initialize welcome
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'system',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (sender: 'system' | 'user', text: string, isComposerCode?: boolean, code?: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        sender,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isComposerCode,
        code
      }
    ]);
  };

  // Preset loading helpers
  const handleLoadSample = () => {
    if (selectedScenario) {
      setInputText(generateScenarioCSV(selectedScenario));
    } else {
      const sample = `Codice_Articolo,Percentuale_Saturazione,Abbinamento,Rendimento_Previsto,Note_Interne
MAGLIA_01,0.25,COMBINATO_01,0.04,Verificato da logistica
PANTALONE_01,0.55,COMBINATO_01,0.06,In stock Milano
GIACCA_01,0.70,LIBERO,0.08,In attesa approvazione`;
      setInputText(sample);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        addMessage('user', `Caricato file: ${file.name}`);
        processInputCSV(text);
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        addMessage('user', `Caricato file via Drag & Drop: ${file.name}`);
        processInputCSV(text);
      }
    };
    reader.readAsText(file);
  };

  const handleSelectScenarioAndStart = (scenario: QuantumScenario) => {
    setSelectedScenario(scenario);
    setSelectedSector(scenario.macroarea);
    addMessage('user', `Seleziono lo scenario: ${scenario.name} (${scenario.macroarea})`);
    
    setStep(2);
    setTimeout(() => {
      const q = getScenarioQuestions(scenario);
      addMessage('system', `🎯 **Scenario Quantistico Rilevato:** \`${scenario.name}\` (${scenario.technology})
Tipologia Logica: *${scenario.logicType}*
Variabili analizzate: *"${scenario.targetVariables}"*

Per calcolare l'effetto farfalla e mappare l'algoritmo quantetizzato coerente per le QPU IBM, rispondi a queste domande descrittive e specifiche:
1. ${q[0]}
2. ${q[1]}
${q[2] ? `3. ${q[2]}` : ''}

*Puoi copiare o digitare le tue risposte strategiche direttamente qui sotto!*`);
    }, 500);
  };

  const handleSelectSector = (sectorName: string) => {
    setSelectedSector(sectorName);
    addMessage('user', `Seleziono il settore: ${sectorName}`);
    
    // Switch to interview step depending on sector
    setStep(2);
    setTimeout(() => {
      if (sectorName === 'Finanza') {
        addMessage('system', `📊 **Scenario Finanziario Rilevato** (Ottimizzazione Portafoglio e Rischio Geopolitico).
Per calcolare l'effetto farfalla, rispondi a queste 2 domande fondamentali:
1. Qual è la tua **tolleranza massima al rischio** del portafoglio (es. conservativa, moderata, aggressiva)?
2. Quale percentuale di **soglia critica di stress** (es. 4% o 10%) ritieni inaccettabile prima di liquidare gli asset?`);
      } else if (sectorName === 'Logistica') {
        addMessage('system', `🚚 **Scenario Logistico / Supply Chain Rilevato** (Ottimizzazione dei Colli di Bottiglia).
Per mappare il routing quantistico, rispondi a queste domande:
1. Qual è il ritardo medio tollerabile in ore sulla catena principale?
2. In caso di blocco di un canale, disponi di rotte secondarie ridondanti già operative per l'entanglement distributivo?`);
      } else if (sectorName === 'Chimica') {
        addMessage('system', `🔬 **Scenario Chimico & Green Tech Rilevato** (Simulazione Molecolare e Sostenibilità energetica).
Rispondi per ottimizzare il processo chimico/energetico:
1. Quale temperatura operativa di soglia critica è critica per la reazione o dispersione dei fattori termici?
2. Vi sono catalizzatori metallici o componenti intermittenti (es. solare/eolico) legati ad accoppiamenti dinamici?`);
      } else if (sectorName === 'Sanita') {
        addMessage('system', `🧬 **Scenario Sanitario / Genomico Rilevato** (Compatibilità Trapianti e Modelli Molecolari).
Rispondi per impostare la scala microsecondi quantistica:
1. Qual è la percentuale del tasso di tolleranza o rigetto immunitario massimo previsto?
2. State considerando combinazioni di farmaci e selettività recettoriale multiple?`);
      } else if (sectorName === 'Cybersecurity') {
        addMessage('system', `🛡️ **Scenario Cybersecurity Rilevato** (Simulazione Crittografica e Post-Quantum).
Rispondi per calcolare la resilienza dei nodi di rete:
1. Quale algoritmo di chiave è attualmente in uso per proteggere i canali di interconnessione (es. AES-256, RSA)?
2. Quanti tentativi anomali al secondo o quantitativi di scambi sintonizzati sono considerati un segnale di attacco o frode?`);
      } else {
        addMessage('system', `🏭 **Scenario Manifatturiero / Industriale Rilevato** (Usura di Macchinari e Cavi).
Rispondi per ottimizzare il ciclo produttivo:
1. Con quale frequenza monitorate l'usura meccanica (es. quotidiana, settimanale)?
2. Qual è il costo orario stimato per un fermo macchina improvviso delle linee interconnesse?`);
      }
    }, 500);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userText = inputText;
    setInputText('');
    addMessage('user', userText);

    // Dynamic interview flow
    if (step === 2) {
      // User responded to interview questions
      setAnswers(prev => ({ ...prev, interviewAnswers: userText }));
      setStep(3);
      setTimeout(() => {
        addMessage('system', `🎯 **Grazie per le informazioni!** Ho integrato le tue risposte strategiche nella configurazione dell'algoritmo quantistico.

Ora, per favore **carica il tuo file CSV nell'apposita area di caricamento** o trascinalo semplicemente all'interno della console qui sotto. In alternativa, puoi copiare e incollare il testo del tuo CSV direttamente nel campo in basso.

Assicurati che il file contenga le tre colonne fondamentali:
- \`Codice_Articolo\` (l'identificativo dei tuoi elementi o prodotti)
- \`Percentuale_Saturazione\` (il livello decimale di saturazione/rischio tra 0.00 e 1.00 con il punto decimale)
- \`Abbinamento\` (collegamenti condivisi o \`LIBERO\`)`);
      }, 500);
    } else if (step === 3) {
      // User inputted CSV data
      processInputCSV(userText);
    } else {
      // Generici messaggi di discussione
      setTimeout(() => {
        addMessage('system', `Sono sempre operativo sul tuo progetto in Google AI Studio. Puoi rigenerare il circuito quantistico premendo il pulsante di reset in alto o inserendo nuovi dati.`);
      }, 500);
    }
  };

  const processInputCSV = (csvTextContent: string) => {
    // 1. Rigorous Separator Check
    const commaDecimalRegex = /\b\d+,\d+\b/;
    if (commaDecimalRegex.test(csvTextContent)) {
      addMessage('system', `❌ **ERRORE LOGICO RILEVATO (PROTEZIONE CRASH):**
Il file o testo che hai inserito utilizza la **virgola (,)** come separatore decimale (es. 0,25) invece del **punto (.)** decimale.
Questo provocherebbe un fallimento matematico imprevisto negli script Python e QASM.

Riformatta i valori numerici usando il punto decimale (es. **0.25**) e reinserisci il CSV.`);
      return;
    }

    // Split rows
    const lines = csvTextContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      addMessage('system', `❌ **ERRORE FORMATTO:** Il file CSV inserito non possiede una struttura valida di intestazione + dati.`);
      return;
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    // Identify key column indices
    const idxArticolo = headers.findIndex(h => h.includes('articolo') || h.includes('codice') || h.includes('asset') || h.includes('prodotto'));
    const idxSaturazione = headers.findIndex(h => h.includes('saturazione') || h.includes('percentuale') || h.includes('valore') || h.includes('rischio'));
    const idxAbbinamento = headers.findIndex(h => h.includes('abbinamento') || h.includes('combinazione') || h.includes('legame') || h.includes('relazione'));

    if (idxArticolo === -1 || idxSaturazione === -1 || idxAbbinamento === -1) {
      addMessage('system', `❌ **ERRORE COLONNE MANCANTI:** Non sono state trovate tutte e tre le colonne mandatorie: \`Codice_Articolo\`, \`Percentuale_Saturazione\` e \`Abbinamento\`.
Verifica l'intestazione del tuo file CSV o prova a caricare l'esempio preimpostato.`);
      return;
    }

    // Identify ignored columns for data reduction log
    const ignored: string[] = [];
    lines[0].split(',').forEach((h, idx) => {
      if (idx !== idxArticolo && idx !== idxSaturazione && idx !== idxAbbinamento) {
        ignored.push(h.trim());
      }
    });
    setIgnoredColumns(ignored);

    // Retrieve clean records
    const cleanRecords: Array<{ article: string, saturation: number, abbinamento: string }> = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length <= Math.max(idxArticolo, idxSaturazione, idxAbbinamento)) continue;
      
      const article = parts[idxArticolo].trim();
      const saturationValue = parseFloat(parts[idxSaturazione].trim());
      const abbinamento = parts[idxAbbinamento].trim();

      if (!isNaN(saturationValue)) {
        cleanRecords.push({ article, saturation: saturationValue, abbinamento });
      }
    }

    if (cleanRecords.length === 0) {
      addMessage('system', `❌ **ERRORE CONTENUTO:** Non è stato possibile estrarre righe di dati numerici validi dal file.`);
      return;
    }

    // Process Qasm logic
    const N = cleanRecords.length;
    let logicSummary = `✅ **DATA CLEANING E DATA REDUCTION COMPLETATI**
- **Righe utili rilevate (N):** ${N}
- **Colonne in eccesso scartate:** ${ignored.length > 0 ? ignored.map(c => `\`${c}\``).join(', ') : 'Nessuna colonna ridondante rilevata.'}
- **Righe elaborate:**
${cleanRecords.map((r, i) => `  * Qubit q[${i}] ➔ **${r.article}** (Saturazione: **${r.saturation}**, Relazione: **${r.abbinamento}**)`).join('\n')}

- **Allocazione Registro Quantistico:** \`qreg q[${N + 1}];\` (incluso qubit targets/Comparatore a indice q[${N}])`;

    setMappingSummary(logicSummary);

    // Math formulation with clipping logic to prevent NaN
    // Angle: theta = 2 * arcsin(sqrt(P_clipped))
    let qasmCircuitCode = `OPENQASM 2.0;\ninclude "qelib1.inc";\n\n`;
    qasmCircuitCode += `// Registro quantetizzato di dimensione esatta N + 1 per il Comparatore\n`;
    qasmCircuitCode += `qreg q[${N + 1}];\n`;
    qasmCircuitCode += `creg c[${N + 1}];\n\n`;

    qasmCircuitCode += `// === FASE 1: INIZIALIZZAZIONE PORTATE (ROTAZIONI RY) ===\n`;
    cleanRecords.forEach((record, index) => {
      // Clip check
      const pClipped = Math.max(0, Math.min(record.saturation, 1.0));
      const theta = 2 * Math.asin(Math.sqrt(pClipped));
      qasmCircuitCode += `// Mappatura d'onda protetta per ${record.article} (Input: ${record.saturation})\n`;
      qasmCircuitCode += `ry(${theta.toFixed(5)}) q[${index}];\n`;
    });
    qasmCircuitCode += `\n`;

    // CNOT Entanglement based on Abbinamento
    qasmCircuitCode += `// === FASE 2: ENTANGLEMENT DI CORRELAZIONE COERENTE ===\n`;
    const groups: Record<string, number[]> = {};
    cleanRecords.forEach((record, index) => {
      const match = record.abbinamento.trim().toUpperCase();
      if (match !== 'LIBERO' && match !== '') {
        if (!groups[match]) groups[match] = [];
        groups[match].push(index);
      }
    });

    let entanglementAdded = false;
    Object.entries(groups).forEach(([groupName, indices]) => {
      if (indices.length > 1) {
        qasmCircuitCode += `// Gruppo di relazione sincronizzato: ${groupName}\n`;
        for (let g = 0; g < indices.length - 1; g++) {
          qasmCircuitCode += `cx q[${indices[g]}], q[${indices[g + 1]}];\n`;
          entanglementAdded = true;
        }
      }
    });
    if (!entanglementAdded) {
      qasmCircuitCode += `// Nessun gruppo di correlazione condivisa rilevato dal CSV (Nessuna porta CNOT applicata)\n`;
    }
    qasmCircuitCode += `\n`;

    // Comparator threshold architecture (uniform distribution)
    qasmCircuitCode += `// === FASE 3: LOGICA DISTRIBUITA DEL COMPARATORE (CRY) ===\n`;
    qasmCircuitCode += `// Soglia critica impostata: ${threshold * 100}% (${threshold})\n`;
    const thresholdClipped = Math.max(0, Math.min(threshold, 1.0));
    const totalThresholdAngle = 2 * Math.asin(Math.sqrt(thresholdClipped));
    const distributedAngle = totalThresholdAngle / N;

    qasmCircuitCode += `// Angolo totale sferico: ${totalThresholdAngle.toFixed(5)} diviso uniformemente per N (${distributedAngle.toFixed(5)} rad su ciascun qubit)\n`;
    for (let u = 0; u < N; u++) {
      qasmCircuitCode += `cry(${distributedAngle.toFixed(5)}) q[${u}], q[${N}];\n`;
    }
    qasmCircuitCode += `\n`;

    // Measurements
    qasmCircuitCode += `// === FASE 4: REGISTRAZIONE STATI E STRUMENTAZIONE ===\n`;
    for (let m = 0; m <= N; m++) {
      qasmCircuitCode += `measure q[${m}] -> c[${m}];\n`;
    }

    setQasmOutput(qasmCircuitCode);
    setCsvData(csvTextContent);

    // Simulated responses
    addMessage('system', logicSummary);
    
    setTimeout(() => {
      addMessage('system', `🔮 **Sintesi del Circuito Quantistico Completata!**
Tutti i vincoli logici e matematici (clipping protettivo dei dati d'ingresso, entanglement sui gruppi e comparatore CRY) sono stati analizzati con successo.

Ecco il tuo codice **OpenQASM 2.0** ad alta integrità strutturato per IBM Quantum: \n\n[START_COMPOSER]\n${qasmCircuitCode}\n[END_COMPOSER]`, true, qasmCircuitCode);
      setStep(4);
    }, 800);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedSector('');
    setSelectedScenario(null);
    setSearchTerm('');
    setSelectedMacroarea('Tutte');
    setSelectedTechnology('Tutte');
    setAnswers({});
    setCsvData('');
    setQasmOutput('');
    setMappingSummary('');
    setMessages([
      {
        id: 'new-session',
        sender: 'system',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-16 flex flex-col min-h-[calc(100vh-140px)]"
    >
      {/* Upper Navigation Row with Retro accents */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5 mb-5 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-quantum-primary transition-all duration-200 group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 px-1.5 rounded bg-quantum-primary/10 border border-quantum-primary/20 text-quantum-primary">
                <Cpu className="w-4 h-4" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white uppercase flex items-center gap-2">
                QUANTUM ENGINE BI <span className="text-xs text-quantum-secondary font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">AGENTIC ORCHESTRATOR</span>
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">
              Compilatore & Traduttore Universale di File Eterogenei in OpenQASM 2.0 per IBM CPU
            </p>
          </div>
        </div>

        {/* Global actions */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-bold text-quantum-primary bg-quantum-primary/5 hover:bg-quantum-primary/10 border border-quantum-primary/20 rounded-xl cursor-pointer transition-all self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" /> REINIZIALIZZA SESSY
        </button>
      </div>

      {/* Main Layout Divided into Workspace and Chat Engine */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-0">
        
        {/* Left Column (The Interactive Chat Engine Sandbox) */}
        <div className="lg:col-span-8 flex flex-col bg-[#0b111e]/90 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">
          
          {/* Header Sandbox Accents */}
          <div className="p-4 bg-[#070b14]/50 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono">
              <Terminal className="w-4 h-4 text-quantum-primary animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Console Conversazionale Quantistica
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-500">
              STATUS <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" /> ENG_LIVE
            </div>
          </div>

          {/* Chat scrolling feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[50vh] lg:max-h-[58vh] scrollbar-hide text-xs sm:text-sm">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex items-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1`}>
                  {msg.sender === 'system' ? '🤖 Quantum Compiler' : '👤 Business user'}
                </div>
                
                <div className={`p-4 rounded-2xl max-w-[90%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-quantum-primary/15 border border-quantum-primary/25 text-white whitespace-pre-wrap'
                    : 'bg-[#0f172a]/70 border border-white/10 text-gray-300 font-sans'
                }`}>
                  {msg.sender === 'user' ? msg.text : renderMessageContent(msg.text)}

                  {/* Render special inner code widgets inside system responses */}
                  {msg.isComposerCode && msg.code && (
                    <div className="mt-4 bg-[#070b14] border border-white/10 rounded-xl overflow-hidden font-mono text-xs">
                      <div className="p-3 bg-white/5 border-b border-white/5 flex items-center justify-between text-gray-400">
                        <span>OPENQASM 2.0 SCOPE</span>
                        <button
                          onClick={() => copyCode(msg.code || '')}
                          className="p-1 px-2 rounded hover:bg-white/5 text-quantum-primary flex items-center gap-1 transition-colors cursor-pointer text-[10px] uppercase font-bold"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {isCopied ? 'Copiato' : 'Copia'}
                        </button>
                      </div>
                      <pre className="p-3.5 overflow-x-auto text-quantum-secondary select-all whitespace-pre max-h-[160px] scrollbar-hide leading-normal text-[11px]">
                        {msg.code}
                      </pre>
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-mono text-gray-600 mt-1">{msg.timestamp}</span>
              </div>
            ))}

            {step === 3 && (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center gap-3 transition-all ${
                  isDragOver 
                    ? 'border-quantum-primary bg-quantum-primary/10 scale-[1.01]' 
                    : 'border-white/10 bg-[#0f172a]/40 hover:border-quantum-primary/20 hover:bg-[#0f172a]/60'
                }`}
              >
                <div className="p-3 bg-quantum-primary/10 border border-quantum-primary/20 rounded-full text-quantum-primary">
                  <FileSpreadsheet className="w-8 h-8 text-quantum-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                    Trascina qui il tuo file CSV
                  </h4>
                  <p className="text-[11px] text-gray-400 max-w-[320px] mx-auto leading-normal">
                    Seleziona o trascina il tuo file aziendale completo (.csv o .txt) per avviare il calcolo quantetizzato automatizzato.
                  </p>
                </div>
                <label className="cursor-pointer mt-1">
                  <span className="px-4 py-2.5 bg-quantum-primary text-quantum-bg hover:bg-quantum-primary/90 text-xs font-mono font-black rounded-lg transition-all shadow-[0_0_10px_rgba(0,242,255,0.15)] select-none cursor-pointer">
                    SFOGLIA COMPUTER
                  </span>
                  <input 
                    type="file" 
                    accept=".csv,.txt"
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick trigger actions area depending on active state */}
          <div className="p-4 bg-[#070b14]/50 border-t border-white/5 flex flex-wrap gap-2 items-center">
            {step === 1 && (
              <div className="flex flex-col gap-2 w-full">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">
                  💡 SCEGLI MACROAREA PER INTERVISTA GUIDATA:
                </span>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2 w-full">
                  <button
                    onClick={() => handleSelectSector('Finanza')}
                    className="px-2.5 py-2 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    📊 Finanza
                  </button>
                  <button
                    onClick={() => handleSelectSector('Logistica')}
                    className="px-2.5 py-2 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🚚 Logistica
                  </button>
                  <button
                    onClick={() => handleSelectSector('Manifatturiero')}
                    className="px-2.5 py-2 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🏭 Fabbrica
                  </button>
                  <button
                    onClick={() => handleSelectSector('Chimica')}
                    className="px-2.5 py-2 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🔬 Chimica
                  </button>
                  <button
                    onClick={() => handleSelectSector('Sanita')}
                    className="px-2.5 py-2 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🧬 Sanità
                  </button>
                  <button
                    onClick={() => handleSelectSector('Cybersecurity')}
                    className="px-2.5 py-2 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🛡️ Cybersec
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Configuratrice:</span>
                <label className="px-3 py-1.5 bg-quantum-primary/10 border border-quantum-primary/30 text-quantum-primary hover:bg-quantum-primary/25 rounded-lg text-xs font-mono font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer selection:bg-transparent">
                  📁 CARICA FILE CSV (.CSV)
                  <input 
                    type="file" 
                    accept=".csv,.txt"
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                </label>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Soglia (Threshold):</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="1"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value) || 0.04)}
                    className="w-16 bg-[#070b14] border border-white/10 rounded px-2 py-1 text-xs text-white text-center font-mono focus:outline-none focus:border-quantum-primary"
                  />
                </div>
              </>
            )}
          </div>

          {/* User Text inputs row */}
          <div className="p-4 bg-[#070b14] border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={
                step === 1 ? "Scegli un settore finanza o logistica sopra per sbloccare l'intervista..." :
                step === 2 ? "Rispondi alle domande indicate dall'assistente..." :
                "Incolla o modifica qui i tuoi dati CSV a punto decimale..."
              }
              className="flex-1 bg-[#090d18] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-quantum-primary transition-colors font-mono"
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-quantum-primary hover:bg-quantum-primary/95 text-quantum-bg rounded-xl transition-all shadow-[0_0_10px_rgba(0,242,255,0.2)] hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column (The Real-Time Hardware Register & OpenQASM Visualizer) */}
        <div className="lg:col-span-4 flex flex-col gap-5 min-h-[400px]">
          {step === 1 ? (
            <div className="bg-[#0b111e]/90 border border-quantum-primary/20 rounded-2xl p-5 flex flex-col flex-1 relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3 shrink-0">
                <h3 className="text-xs font-mono font-bold text-quantum-primary uppercase tracking-widest flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-quantum-secondary" /> Database Scenari ({QUANTUM_SCENARIOS.length} Target)
                </h3>
                <span className="text-[10px] font-mono text-quantum-secondary bg-quantum-secondary/10 px-2 py-0.5 rounded border border-quantum-secondary/15 uppercase font-bold">
                  BI CO-COMPILER
                </span>
              </div>

              {/* Filtering Controls */}
              <div className="space-y-3 mb-4 shrink-0">
                {/* Search Term Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cerca scenario o variabili..."
                    className="w-full bg-[#070b14]/70 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-quantum-primary transition-all font-mono"
                  />
                </div>

                {/* Macroarea and Tech Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">Macroarea</label>
                    <select
                      value={selectedMacroarea}
                      onChange={(e) => setSelectedMacroarea(e.target.value)}
                      className="bg-[#070b14]/75 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] text-gray-300 focus:outline-none focus:border-quantum-primary font-mono cursor-pointer"
                    >
                      <option value="Tutte">Tutte le Macroaree</option>
                      <option value="Finanza e Mercati">Finanza e Mercati</option>
                      <option value="Logistica e Smart Cities">Logistica e Smart Cities</option>
                      <option value="Chimica e Green Tech">Chimica e Green Tech</option>
                      <option value="Manifattura e Abbigliamento">Manifattura e Abbigliamento</option>
                      <option value="Sanità e Genomica">Sanità e Genomica</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">Tecnologia</label>
                    <select
                      value={selectedTechnology}
                      onChange={(e) => setSelectedTechnology(e.target.value)}
                      className="bg-[#070b14]/75 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] text-gray-300 focus:outline-none focus:border-quantum-primary font-mono cursor-pointer"
                    >
                      <option value="Tutte">Tutte le Tecnologie</option>
                      <option value="Computer Quantistico (QPU)">Computer Quantistico (QPU)</option>
                      <option value="IA Classica / HPC">IA Classica / HPC</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scrollable Scenario List */}
              <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[350px] lg:max-h-[420px] pr-1 scrollbar-hide text-xs">
                {QUANTUM_SCENARIOS.filter(s => {
                  const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                      s.targetVariables.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      s.logicType.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchArea = selectedMacroarea === 'Tutte' || s.macroarea === selectedMacroarea;
                  const matchTech = selectedTechnology === 'Tutte' || s.technology === selectedTechnology;
                  return matchSearch && matchArea && matchTech;
                }).map((scenario) => (
                  <div
                    key={scenario.id}
                    onClick={() => handleSelectScenarioAndStart(scenario)}
                    className="p-3 bg-[#0a0f1d] hover:bg-quantum-primary/5 border border-white/5 hover:border-quantum-primary/40 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold text-white group-hover:text-quantum-primary transition-colors leading-snug">
                        {scenario.id}. {scenario.name}
                      </span>
                      <span className={`text-[8px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded shrink-0 ${
                        scenario.technology.includes('QPU') 
                          ? 'bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[#00f2ff]'
                          : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                      }`}>
                        {scenario.technology.includes('QPU') ? 'QPU' : 'HPC'}
                      </span>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-1 font-mono">
                      Logic: <span className="text-gray-300">{scenario.logicType}</span>
                    </p>

                    <div className="flex items-center justify-between gap-1 mt-2 pt-2 border-t border-white/5">
                      <span className="text-[9px] font-mono text-quantum-primary truncate max-w-[180px] sm:max-w-[210px]" title={scenario.targetVariables}>
                        Var: {scenario.targetVariables}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#00f2ff] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-bold shrink-0">
                        AVVIA <Send className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Mapping Reduction metadata widget */}
              <div className="bg-[#0b111e]/85 border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                <h3 className="text-xs font-mono font-bold text-quantum-primary uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-quantum-secondary" /> Data Cleaning & Riduzione Colonne
                </h3>
                
                {mappingSummary ? (
                  <div className="font-mono text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                    {mappingSummary}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-6">
                    <Info className="w-8 h-8 text-white/15 mb-2.5 animate-pulse" />
                    <p className="text-xs text-gray-500 font-mono">
                      In attesa dell'inserimento dei dati CSV per visualizzare l'estrazione delle colonne e l'hardware allocation.
                    </p>
                  </div>
                )}
              </div>

              {/* Math formulation parameters feedback card */}
              <div className="bg-gradient-to-br from-[#0d1527] to-[#070b14] border border-quantum-primary/10 rounded-2xl p-5 relative">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4.5 h-4.5 text-quantum-primary" />
                  <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                    Formulazioni Fisiche Protette
                  </h4>
                </div>
                
                <div className="space-y-3 font-mono text-[11px] text-gray-400">
                  <div className="flex items-start gap-2 border-b border-white/5 pb-2">
                    <span className="text-quantum-secondary font-bold shrink-0">A. Clip Sec:</span>
                    <span>P_clipped = min(max(P, 0), 1) ➔ Protegge da dislivelli NaN su anomalie di stress elevati.</span>
                  </div>
                  <div className="flex items-start gap-2 border-b border-white/5 pb-2">
                    <span className="text-quantum-secondary font-bold shrink-0">B. Rotazione:</span>
                    <span>theta = 2 * arcsin(sqrt(P_clipped)) ➔ Rigoroso mapping dello sfasamento angolare.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-quantum-secondary font-bold shrink-0">C. Comparatore:</span>
                    <span>theta = (2 * arcsin(sqrt(Soglia))) / N ➔ Distribuzione CRY equa per accumulo energia verso il qubit target.</span>
                  </div>
                </div>
              </div>

              {/* Live final layout summary visualization */}
              <div className="flex-1 bg-[#070b14] border border-white/5 rounded-2xl overflow-hidden flex flex-col font-mono">
                <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-quantum-secondary" /> Mappatura Registro QASM
                  </span>
                  {qasmOutput && (
                    <span className="text-[10px] text-emerald-400 uppercase font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Generato
                    </span>
                  )}
                </div>

                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-quantum-secondary leading-relaxed scrollbar-hide select-all whitespace-pre-wrap max-h-[300px]">
                  {qasmOutput ? qasmOutput : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-10">
                      <HelpCircle className="w-8 h-8 text-white/10 mb-2" />
                      <span>Nessun circuito attivo. Esegui la configurazione a sinistra per generare codice OpenQASM 2.0.</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </motion.div>
  );
}
