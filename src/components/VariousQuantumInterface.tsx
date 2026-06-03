import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Upload, 
  FileText, 
  Play, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Code2, 
  HelpCircle, 
  Cpu, 
  Info,
  Layers,
  Activity,
  AlertTriangle,
  RefreshCw,
  Plus
} from 'lucide-react';
import axios from 'axios';

interface VariousQuantumInterfaceProps {
  onBack?: () => void;
}

interface CSVData {
  fileName: string;
  columns: string[];
  rowCount: number;
  previewRows: string[][];
  rawText: string;
}

export default function VariousQuantumInterface({ onBack }: VariousQuantumInterfaceProps) {
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMess, setErrorMess] = useState<string | null>(null);
  
  // Interaction State
  const [entanglementEnabled, setEntanglementEnabled] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadingTexts = [
    "Inizializzazione Algoritmo Eterogeneo...",
    "Riconoscimento colonne e mappatura vettoriale...",
    "Proiezione dei canali classici nello Spazio di Hilbert...",
    "Configurazione dell'operatore Hamiltoniano di interconnessione...",
    "Connessione sicura al simulatore QPU Cloud completata...",
    "Generazione del circuito quantistico Qiskit ottimizzato..."
  ];

  useEffect(() => {
    let timer: any;
    if (isLoading) {
      timer = setInterval(() => {
        setLoadingStep(prev => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  // Predefined CSV examples for rapid test
  const quickExamples = [
    {
      title: "Telemetria & Spot Energia (Example 1)",
      text: "Temperatura_Sensori_Fabbrica,Prezzo_Energia_Spot,Umidita_Ambiente,Consumo_Macchinari\n22.4,45.2,60,320\n24.1,48.7,58,350\n25.8,55.1,55,410\n23.0,42.0,61,310\n21.8,51.3,62,380",
      description: "Analizza la telemetria termica e i rincari d'energia per calcolare spegnimenti preventivi."
    },
    {
      title: "Social, Meteo & Retail (Example 2)",
      text: "Precipitazioni_Meteo_mm,Social_Sentiment_Score,Affluenza_Pedonale_Retail,Prezzo_Promozione_Euro\n12.5,-0.25,120,15.5\n0.5,0.85,450,19.9\n0.0,0.92,510,19.9\n4.2,0.15,230,17.0\n18.0,-0.60,95,12.0",
      description: "Combina il maltempo e il social marketing sentiment per svelare l'effetto farfalla sui consumi in negozio."
    },
    {
      title: "Geopolitica & Catena Distributiva (Example 3)",
      text: "Indice_Tensioni_Geopolitiche,Tempo_Attesa_Porto_Giorni,Prezzo_Carburante_Litro,Volume_Spedizioni\n0.15,2.1,1.55,12000\n0.45,5.4,1.72,11500\n0.82,14.2,2.10,8900\n0.30,3.5,1.60,12300\n0.75,11.0,1.98,9200",
      description: "Scopri come le micro-crisi internazionali bloccano le spedizioni logistiche via circuiti quantistici."
    }
  ];

  const handleTextSubmit = (text: string) => {
    if (!text.trim()) return;
    try {
      const allLines = text.split(/\r?\n/).filter(line => line.trim() !== "");
      if (allLines.length === 0) throw new Error("Testo vuoto");

      const headerLine = allLines[0];
      const delimiter = headerLine.includes(';') ? ';' : ',';
      const columns = headerLine.split(delimiter).map(c => c.trim()).filter(c => c !== "");
      
      const rows = allLines.slice(1).map(line => {
        return line.split(delimiter).map(cell => cell.trim());
      });

      setCsvData({
        fileName: "Dati_Incolla_In_Tempo_Reale.csv",
        columns: columns,
        rowCount: rows.length,
        previewRows: rows.slice(0, 5),
        rawText: text
      });
      setErrorMess(null);
    } catch (e: any) {
      setErrorMess("Formato non valido. Assicurati che la prima riga contenga le intestazioni separate da virgola o punto e virgola.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setErrorMess("Caricare solo file .csv.");
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      setErrorMess("Errore di caricamento del file.");
    };
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) throw new Error("File vuoto");
        
        const allLines = text.split(/\r?\n/).filter(line => line.trim() !== "");
        if (allLines.length === 0) throw new Error("CSV vuoto");

        const headerLine = allLines[0];
        const delimiter = headerLine.includes(';') ? ';' : ',';
        const columns = headerLine.split(delimiter).map(c => c.trim()).filter(c => c !== "");
        
        const rows = allLines.slice(1).map(line => {
          return line.split(delimiter).map(cell => cell.trim());
        });

        setCsvData({
          fileName: file.name,
          columns: columns,
          rowCount: rows.length,
          previewRows: rows.slice(0, 5),
          rawText: text
        });
        setErrorMess(null);
      } catch (err) {
        setErrorMess("Errore durante l'analisi del CSV. Verifica la formattazione interna.");
      }
    };
    reader.readAsText(file);
  };

  const executeQuantumAI = async (forcedEntanglement: boolean = entanglementEnabled) => {
    if (!csvData) return;
    setIsLoading(true);
    setAiOutput('');
    setErrorMess(null);

    const columnsStr = csvData.columns.join(', ');
    const previewDataStr = csvData.previewRows.map(r => r.join(',')).join('\n');

    // Build the instruction message injection
    const userMessage = `Ho caricato un file CSV denominato "${csvData.fileName}" che ha ${csvData.rowCount} righe.
Colonne trovate: [${columnsStr}].
Ecco l'anteprima delle righe di dati:\n${previewDataStr}

ENTANGLEMENT STATUS CORRENTE: ${forcedEntanglement ? "ATTIVATO (ABILITATO)" : "DISATTIVATO"}.
${forcedEntanglement ? "L'utente ha esplicitamente ATTIVATO il Superpotere dell'Entanglement Globale! Struttura il codice Qiskit inserendo percorsi di accoppiamento/porte CNOT e calcola soluzioni predittive eccezionali basate sull'effetto farfalla nel testo di FASE 2." : "Fornisci il codice isolato classico, spiega perché l'entanglement offrirebbe di più e attendi che l'utente scelga di attivarlo nella FASE 2."}`;

    try {
      const systemPrompt = `Sei il motore di intelligenza artificiale avanzato integrato in una piattaforma software quantistica rivoluzionaria. Il tuo compito è analizzare i file CSV caricati dagli utenti, i quali contengono fonti di dati totalmente eterogenee (es. mercati, meteo, sensori IoT, geopolitica, flussi social).

Indipendentemente dalla macro-area dei dati inseriti, devi elaborare l'input seguendo rigorosamente queste tre fasi nel tuo output:

1. TRASCRIZIONE QUANTISTICA E GENERAZIONE CODICE: Traduci concettualmente i dati del CSV in stati quantistici (mappati nello Spazio di Hilbert) e fornisci SEMPRE all'utente il codice di programmazione quantistica pronto (in formato Qiskit o Cirq) da dare in pasto a un vero computer quantistico via cloud (QPU). Usa blocchi di codice standard contraddistinti da \`\`\`python ... \`\`\`.
2. SCELTA DELL'ENTANGLEMENT (IL SUPERPOTERE): Chiedi esplicitamente all'utente se desidera attivare la correlazione e interconnessione globale attraverso l'entanglement dei dati per interrogare la QPU via cloud e ottenere una mappa predittiva e soluzioni mai viste prima (l'effetto farfalla). Spiega cosa vedrà se sceglie di attivare l'entanglement dei dati rispetto a un'analisi classica.
3. CONSULENTE DI INTERCONNESSIONE (ISPIRAZIONE): Suggerisci all'utente altre fonti eterogenee che potrebbe aggiungere al suo CSV per potenziare la ricerca, spiegando che tipo di risultati straordinari e soluzioni predittive potrebbe ottenere combinandole.

L'output deve essere sempre formattato in Markdown, chiaro, scansionabile e diviso in queste sezioni rigorosamente intitolate come di seguito:

🚀 [FASE 1] Trascrizione Quantistica e Codice QPU
(Inserisci qui una spiegazione di come i dati eterogenei del CSV sono stati mappati nello Spazio di Hilbert e fornisci il blocco di codice Qiskit/Cirq pronto da copiare).

🧬 [FASE 2] Attivazione "Superpotere": Entanglement Globale?
(Fai la domanda all'utente. Spiega cosa vedrà se sceglie di attivare l'entanglement dei dati rispetto a un'analisi classica, in base allo stato inviato: ENTANGLEMENT STATUS: ${forcedEntanglement ? "ATTIVATO" : "DISATTIVATO"}).

💡 [FASE 3] Il Consiglio dell'IA: Espandi la tua Ricerca
(Analizza i dati che l'utente ha inserito e proponi l'unione con altre fonti eterogenee a cui non ha pensato, indicando i risultati predittivi possibili).

Rispondi rigorosamente in lingua italiana, in modo chiaro e sbalorditivo.`;

      const response = await axios.post('/api/quantum-bi/chat', {
        messages: [{ role: 'user', text: userMessage }],
        systemPrompt
      });

      if (response.data?.text) {
        setAiOutput(response.data.text);
      } else {
        throw new Error("Risposta del modello vuota");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMess(err.response?.data?.error || "Impossibile contattare l'AI Engine Quantistico QPU. Riprova tra qualche istante.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntanglementToggle = () => {
    const nextState = !entanglementEnabled;
    setEntanglementEnabled(nextState);
    if (csvData) {
      executeQuantumAI(nextState);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  // Quick helper to extract sections from Markdown for beautiful customized styling
  const getParsedSections = () => {
    if (!aiOutput) return null;

    let f1Text = "";
    let qiskitCode = "";
    let f2Text = "";
    let f3Text = "";

    // Split text by headers
    const parts = aiOutput.split(/🚀 \[FASE 1\]|🧬 \[FASE 2\]|💡 \[FASE 3\]/gi);
    
    // We assume standard sequence
    if (parts.length >= 4) {
      f1Text = parts[1] || "";
      f2Text = parts[2] || "";
      f3Text = parts[3] || "";
    } else {
      // Fallback
      f1Text = aiOutput;
    }

    // Extract code block inside FASE 1
    const codeMatch = f1Text.match(/```(?:python)?([\s\S]*?)```/);
    if (codeMatch) {
      qiskitCode = codeMatch[1].trim();
      // Remove the code block from explanation text for decoupled display
      f1Text = f1Text.replace(/```(?:python)?[\s\S]*?```/, "").trim();
    }

    return {
      f1Text: f1Text.trim(),
      qiskitCode: qiskitCode || "# Nessun codice estratto generato dal server.",
      f2Text: f2Text.trim(),
      f3Text: f3Text.trim()
    };
  };

  const parsed = getParsedSections();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 min-h-screen flex flex-col items-stretch text-white">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 bg-black/40 border border-white/10 rounded-xl text-gray-400 hover:text-quantum-primary hover:border-quantum-primary/50 transition-all cursor-pointer shadow-inner"
            title="Torna al Selettore Principale"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-quantum-primary/10 text-quantum-primary border border-quantum-primary/30 text-[9px] font-mono tracking-widest font-bold uppercase animate-pulse">
                MODULE 07
              </span>
              <span className="text-[10px] text-quantum-secondary font-mono tracking-wider font-bold">
                QPU-HETEROGENEOUS INTELLIGENCE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight uppercase flex items-center gap-2">
              <Globe className="w-7 h-7 text-quantum-primary animate-spin-slow filter drop-shadow-[0_0_10px_rgba(0,242,255,0.4)]" />
              VARIOUS DATA ENGINE
            </h1>
          </div>
        </div>
        
        <div className="font-mono text-[9px] sm:text-xs text-right text-gray-500 max-w-xs leading-tight">
          <p className="font-bold text-quantum-primary uppercase mb-1">PROCESSORE ATTIVO</p>
          <p className="text-[10px] text-white">IBM Eagle / Heron Hybrid Emulator</p>
          <p>Hilbert Dimension Mapping: 𝖧^²ⁿ</p>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Panel / Input (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Section Description */}
          <div className="p-5 bg-black/50 border border-white/10 rounded-2xl backdrop-blur-md">
            <h2 className="text-sm font-bold font-mono text-quantum-primary uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Motore Avanzato Multidisciplinare
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Sei connesso al super-modello AI quantistico. Carica file contenenti qualsiasi dato eterogeneo (prezzi energetici, meteo satellitare, sentiment di Twitter, IoT). L'AI Engine eseguirà la trascrizione in uno <strong>Spazio di Hilbert</strong>, proietterà il codice qiskit per le QPU e analizzerà l'effetto farfalla globale tramite entanglement dei qubit.
            </p>
            <div className="p-3 bg-quantum-primary/5 border border-quantum-primary/20 rounded-xl text-[10px] text-quantum-primary/90 leading-relaxed flex gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-quantum-primary" />
              <span>
                <strong>Senza Entanglement</strong> i qubit operano isolati in elaborazione sequenziale classica. Carica il CSV e attiva l'Entanglement per generare le correlazioni globali istantanee.
              </span>
            </div>
          </div>

          {/* Quick Examples Selection */}
          <div className="p-5 bg-black/30 border border-white/5 rounded-2xl">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-quantum-secondary" />
              Caricamento Rapido (Esempi Eterogenei)
            </h3>
            <div className="flex flex-col gap-3">
              {quickExamples.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(ex.text);
                    handleTextSubmit(ex.text);
                  }}
                  className="p-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-quantum-secondary/30 rounded-xl text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-black text-white tracking-wide uppercase group-hover:text-quantum-secondary transition-colors">
                      {ex.title}
                    </span>
                    <Plus className="w-3 h-3 text-gray-500 group-hover:text-quantum-secondary transition-colors" />
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal line-clamp-2">
                    {ex.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive CSV File/Text Loader */}
          <div className="p-5 bg-black/60 border border-quantum-primary/25 rounded-2xl shadow-[0_0_20px_rgba(0,242,255,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-quantum-primary/5 blur-xl rounded-full" />
            
            <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Upload className="w-4 h-4 text-quantum-primary" />
              Carica o Incolla Dati CSV
            </h2>

            {/* Drag & Drop Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/10 hover:border-quantum-primary/50 bg-white/[0.01] hover:bg-quantum-primary/[0.02] transition-all rounded-xl p-6 mb-4 text-center cursor-pointer group flex flex-col items-center justify-center gap-2"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".csv" 
                className="hidden" 
              />
              <Upload className="w-8 h-8 text-gray-500 group-hover:text-quantum-primary group-hover:scale-110 transition-all filter group-hover:drop-shadow-[0_0_10px_rgba(0,242,255,0.4)]" />
              <div>
                <span className="text-xs font-sans text-gray-300 font-bold block mb-1">Seleziona o trascina un file CSV</span>
                <span className="text-[10px] text-gray-500 font-mono">Limite di peso: 5 MB</span>
              </div>
            </div>

            {/* Textarea for manual entry/paste */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Incolla qui dati CSV (Header + Righe):</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="es. Intestazione_1,Intestazione_2&#10;14.3,95.1&#10;15.8,92.0"
                className="w-full h-28 p-3 bg-black/80 border border-white/10 rounded-xl font-mono text-xs text-quantum-primary focus:outline-none focus:border-quantum-primary resize-none placeholder-gray-600"
              />
              <button
                onClick={() => handleTextSubmit(inputText)}
                className="py-2 bg-white/5 hover:bg-quantum-primary/10 border border-white/10 hover:border-quantum-primary text-xs font-mono tracking-widest uppercase font-bold text-white hover:text-quantum-primary transition-all cursor-pointer rounded-lg"
              >
                Analizza Testo Incollato
              </button>
            </div>
          </div>
        </div>

        {/* Right Output View / Interactive Simulation Workspace (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* File Verification Stats */}
          {csvData ? (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="p-5 bg-black/80 border border-quantum-secondary/30 rounded-2xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-quantum-secondary/5 blur-2xl rounded-full pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 ml-1 rounded-xl bg-quantum-secondary/10 border border-quantum-secondary/20">
                    <FileText className="w-5 h-5 text-quantum-secondary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white font-mono uppercase tracking-widest">{csvData.fileName}</h4>
                    <span className="text-[10px] text-quantum-secondary font-mono uppercase tracking-wider">File Eterogeneo caricato con successo</span>
                  </div>
                </div>

                <button
                  type="button"
                  id="elaborate-ai-action"
                  disabled={isLoading}
                  onClick={() => executeQuantumAI()}
                  className="px-5 py-2.5 bg-gradient-to-r from-quantum-primary to-quantum-secondary text-quantum-bg font-display font-black text-xs tracking-widest uppercase rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_35px_rgba(0,242,255,0.6)] hover:scale-105 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none shrink-0 flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Elabora con AI Engine QPU
                </button>
              </div>

              {/* Data Table Stats Recap */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl mb-4 font-mono">
                <div className="text-center sm:text-left">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest block">RIGHE CSV TOTALI</span>
                  <span className="text-sm sm:text-base text-white font-bold">{csvData.rowCount}</span>
                </div>
                <div className="text-center sm:text-left border-x border-white/5 px-2">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest block">QUBITS CORRISPONDENTI</span>
                  <span className="text-sm sm:text-base text-quantum-primary font-bold">{csvData.columns.length}</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest block">STATI DIAGRAMMA</span>
                  <span className="text-sm sm:text-base text-white font-bold">2^{csvData.columns.length} = {Math.pow(2, csvData.columns.length)}</span>
                </div>
              </div>

              {/* CSV Columns tags */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[9px] font-mono font-bold text-gray-500 tracking-wider">COLONNE IDENTIFICATE:</span>
                {csvData.columns.map((col, cIdx) => (
                  <span 
                    key={cIdx}
                    className="px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-[10px] font-mono text-gray-300 shadow-sm"
                  >
                    Q[0{cIdx}]: {col}
                  </span>
                ))}
              </div>

              {/* Table Preview */}
              <div className="mt-2 overflow-x-auto border border-white/5 rounded-xl">
                <table className="w-full text-left font-mono text-[10px] min-w-[500px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      {csvData.columns.map((col, idx) => (
                        <th key={idx} className="p-2 py-2.5 text-quantum-primary text-[9px] uppercase font-bold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.previewRows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-white/5 hover:bg-white/[0.01]">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2 text-gray-300">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {csvData.rowCount > 5 && (
                  <p className="p-2 text-center text-[8px] text-gray-500 uppercase tracking-wider bg-black/40">
                    Anteprima limitata alle prime 5 righe (Totali: {csvData.rowCount})
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="p-12 min-h-[250px] border border-dashed border-white/10 bg-black/20 rounded-2xl flex flex-col items-center justify-center text-center">
              <Activity className="w-12 h-12 text-gray-600 mb-4 animate-pulse" />
              <h3 className="text-sm font-bold font-mono tracking-widest uppercase text-gray-400 mb-1">QPU AI Engine In Attesa</h3>
              <p className="text-xs text-gray-500 max-w-sm">
                Carica un file CSV di telemetria, finanza o geopolitica, o clicca uno dei pre-set di caricamento rapido a sinistra per iniziare l'analisi quantistica.
              </p>
            </div>
          )}

          {/* Loader Overlay */}
          {isLoading && (
            <div className="p-12 min-h-[400px] border border-quantum-primary/20 bg-black/80 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,242,255,0.05)] relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-quantum-primary/5 blur-3xl rounded-full" />
              <RefreshCw className="w-12 h-12 text-quantum-primary animate-spin mb-6" />
              <h3 className="text-base font-bold font-mono tracking-widest uppercase text-white mb-2">
                CRITTOGRAFIA AI GENERATIVE ENGINE
              </h3>
              <p className="text-xs text-quantum-primary font-mono animate-pulse">{loadingTexts[loadingStep]}</p>
              
              {/* Fake Progression Indicator */}
              <div className="w-64 h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((loadingStep + 1) / loadingTexts.length) * 100}%` }}
                  className="h-full bg-quantum-primary"
                  transition={{ duration: 1.2 }}
                />
              </div>
            </div>
          )}

          {/* Error Message Box */}
          {errorMess && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold uppercase tracking-wide font-mono mb-0.5">Errore Sistema QPU</p>
                <p>{errorMess}</p>
              </div>
            </div>
          )}

          {/* OUTPUT VISUALS ENGINE (Beautifully Styled Segregates) */}
          {!isLoading && parsed && (
            <div className="flex flex-col gap-8">
              {/* STAGE/FASE 1: CODICE E TRASCRIZIONE */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/70 border border-quantum-primary/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-quantum-primary/5 blur-2xl rounded-full pointer-events-none" />
                <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                  <div className="p-2.5 rounded-xl bg-quantum-primary/10 border border-quantum-primary/20">
                    <Cpu className="w-5 h-5 text-quantum-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] text-quantum-primary font-mono uppercase tracking-widest font-black block">Fase Corrente [ST_01]</span>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">
                      🚀 [FASE 1] Trascrizione Quantistica e Codice QPU
                    </h3>
                  </div>
                </div>

                <div className="text-xs text-gray-300 leading-relaxed font-sans mb-6 whitespace-pre-line bg-white/[0.01] p-4 rounded-xl border border-white/5">
                  {parsed.f1Text}
                </div>

                {/* Ready-to-copy Code Block Container */}
                <div className="flex flex-col bg-black/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-white/5 px-4 py-2.5 flex justify-between items-center border-b border-white/10">
                    <span className="font-mono text-[10px] uppercase font-black tracking-widest text-[#00f2ff]/90 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-[#00f2ff]" />
                      CODICE DI PROGRAMMAZIONE QUANTISTICA PRONTO (QISKIT)
                    </span>
                    <button
                      onClick={() => copyToClipboard(parsed.qiskitCode, 'qiskit')}
                      className="px-3 py-1 bg-white/5 border border-white/10 hover:border-[#00f2ff]/60 rounded-md text-[10px] font-mono tracking-wider font-bold uppercase hover:text-[#00f2ff] transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copyStatus === 'qiskit' ? (
                        <>
                          <Check className="w-3 h-3 text-[#00f2ff]" />
                          Copiato!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copia Codice
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Code Block with line numbering */}
                  <div className="flex text-xs font-mono p-4 overflow-x-auto h-96 scrollbar-hide max-h-[400px]">
                    <div className="text-gray-600 select-none text-right pr-4 border-r border-white/5 mr-4 text-[11px] leading-relaxed">
                      {parsed.qiskitCode.split('\n').map((_, index) => (
                        <div key={index}>{index + 1}</div>
                      ))}
                    </div>
                    <pre className="text-quantum-primary text-[11px] leading-relaxed flex-1 select-all font-mono whitespace-pre">{parsed.qiskitCode}</pre>
                  </div>
                </div>
              </motion.div>

              {/* STAGE/FASE 2: INTERACTIVE ENTANGLEMENT CORRELATION */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`border rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500 bg-black/40 ${
                  entanglementEnabled 
                    ? 'border-quantum-secondary/40 shadow-[0_0_30px_rgba(236,72,153,0.15)] bg-gradient-to-br from-[#0c0512] via-black to-[#050e12]' 
                    : 'border-white/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border transition-all ${
                      entanglementEnabled ? 'bg-quantum-secondary/20 border-quantum-secondary/30' : 'bg-white/5 border-white/10'
                    }`}>
                      <Activity className={`w-5 h-5 ${entanglementEnabled ? 'text-quantum-secondary' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <span className="text-[10px] text-quantum-secondary font-mono uppercase tracking-widest font-black block">Superpotere [ST_02]</span>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">
                        🧬 [FASE 2] Attivazione "Superpotere": Entanglement Globale?
                      </h3>
                    </div>
                  </div>

                  {/* HIGH SHINE ENTANGLEMENT INTERACTIVE BUTTON */}
                  <button
                    type="button"
                    onClick={handleEntanglementToggle}
                    className={`px-4 py-2 font-mono text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border shrink-0 cursor-pointer shadow-md select-none ${
                      entanglementEnabled
                        ? 'bg-quantum-secondary border-quantum-secondary text-black shadow-[0_0_20px_rgba(236,72,153,0.6)] animate-pulse hover:brightness-110'
                        : 'bg-black/60 border-white/20 text-gray-400 hover:text-quantum-secondary hover:border-quantum-secondary/50'
                    }`}
                  >
                    {entanglementEnabled ? '🧬 Entanglement: ATTIVO' : '🧬 Attiva Entanglement'}
                  </button>
                </div>

                {/* Interactive Dynamic SVG Graph representing Hilbert space correlations */}
                <div className="my-6 bg-black/90 rounded-2xl border border-white/5 p-4 flex flex-col items-center justify-center relative min-h-[220px]">
                  {entanglementEnabled ? (
                    <>
                      {/* Active Entangled Link Node Network */}
                      <svg className="w-full h-[180px] max-w-lg" viewBox="0 0 500 180">
                        {/* Define glowing drop-shadow filters */}
                        <defs>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Interactive dynamic particle connections */}
                        {csvData && csvData.columns.slice(0, 4).map((col, i, arr) => {
                          const total = arr.length;
                          const centerX = 250;
                          const centerY = 90;
                          
                          // Draw links to center hubs
                          return arr.map((sub, j) => {
                            if (i === j) return null;
                            const angle1 = (i / total) * Math.PI * 2;
                            const angle2 = (j / total) * Math.PI * 2;
                            
                            const x1 = centerX + Math.cos(angle1) * 110;
                            const y1 = centerY + Math.sin(angle1) * 60;
                            const x2 = centerX + Math.cos(angle2) * 110;
                            const y2 = centerY + Math.sin(angle2) * 60;

                            return (
                              <g key={`${i}-${j}`}>
                                <path 
                                  d={`M ${x1} ${y1} Q ${(x1 + x2)/2} ${(y1 + y2)/2 - 15} ${x2} ${y2}`}
                                  fill="none" 
                                  stroke="url(#grad)" 
                                  strokeWidth="1.5" 
                                  className="stroke-quantum-secondary opacity-60 animate-pulse"
                                  filter="url(#glow)"
                                />
                                {/* Pulsing Traveling Photon circle along path */}
                                <circle r="3.5" className="fill-quantum-primary">
                                  <animateMotion 
                                    dur={`${2 + (i + j) % 3}s`} 
                                    repeatCount="indefinite"
                                    path={`M ${x1} ${y1} Q ${(x1 + x2)/2} ${(y1 + y2)/2 - 15} ${x2} ${y2}`}
                                  />
                                </circle>
                              </g>
                            );
                          });
                        })}

                        {/* Node dots */}
                        {csvData && csvData.columns.slice(0, 4).map((col, i, arr) => {
                          const total = arr.length;
                          const centerX = 250;
                          const centerY = 90;
                          const angle = (i / total) * Math.PI * 2;
                          const x = centerX + Math.cos(angle) * 110;
                          const y = centerY + Math.sin(angle) * 60;

                          return (
                            <g key={i}>
                              <circle 
                                cx={x} 
                                cy={y} 
                                r="12" 
                                className="fill-black stroke-quantum-secondary" 
                                strokeWidth="2.5"
                                filter="url(#glow)"
                              />
                              <circle 
                                cx={x} 
                                cy={y} 
                                r="5" 
                                className="fill-quantum-primary"
                              />
                              <text 
                                x={x} 
                                y={y - 18} 
                                textAnchor="middle" 
                                className="font-mono text-[8px] font-bold fill-white tracking-widest uppercase bg-black"
                              >
                                {col.length > 10 ? col.substring(0, 9) + '..' : col}
                              </text>
                            </g>
                          );
                        })}

                        <defs>
                          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00f2ff" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <p className="text-[10px] text-quantum-secondary font-mono tracking-widest font-bold uppercase mt-2 animate-bounce flex items-center gap-1">
                        ● GLOBAL ENTANGLEMENT ENGAGED - RETICOLO FLUTTUANTE ATTIVO
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <HelpCircle className="w-10 h-10 text-gray-700 mb-2" />
                      <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider max-w-md">
                        Nessuna connessione attiva tra le colonne del tuo CSV. I qubits non scambiano informazioni. Attiva l'Entanglement dal pulsante in alto per avviare il calcolo incrociato.
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-xs text-gray-300 leading-relaxed font-sans bg-white/[0.01] p-4 rounded-xl border border-white/5 whitespace-pre-line">
                  {parsed.f2Text}
                </div>
              </motion.div>

              {/* STAGE/FASE 3: IA INSIGHT PROPOSAL */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/70 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full pointer-events-none" />
                <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-400 font-mono uppercase tracking-widest font-black block">Super-Consulente [ST_03]</span>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">
                      💡 [FASE 3] Il Consiglio dell'IA: Espandi la tua Ricerca
                    </h3>
                  </div>
                </div>

                <div className="text-xs text-gray-300 leading-relaxed font-sans bg-white/[0.01] p-4 rounded-xl border border-white/5 mb-6 whitespace-pre-line">
                  {parsed.f3Text}
                </div>

                {/* Simulated suggestions feedback box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:border-quantum-primary/30 transition-all">
                    <span className="text-[9px] font-mono font-black text-quantum-primary uppercase tracking-widest block mb-1">MIGLIORAMENTO ACCURATEZZA</span>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Aggiungendo dati geografici, l'accuratezza previsionale del circuito di minimizzazione NISQ aumenta del <span className="text-quantum-primary font-bold">14.6%</span>.
                    </p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:border-quantum-secondary/30 transition-all">
                    <span className="text-[9px] font-mono font-black text-quantum-secondary uppercase tracking-widest block mb-1">PROSSIMA PORTA CONSIGLIATA</span>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Le fonti geopolitiche si prestano ad essere codificate tramite porte <span className="text-quantum-secondary font-bold">CNOT</span> ed operatori di phase-shift.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
