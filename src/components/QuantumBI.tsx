import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  User, 
  Bot, 
  RotateCcw,
  Code2,
  FileCode,
  Copy,
  Check,
  BrainCircuit,
  UploadCloud,
  FileJson,
  BarChart4,
  Terminal,
  Info,
  ChevronRight,
  AlertCircle,
  Download,
  Landmark,
  Shield,
  Truck,
  Radio,
  Factory,
  Zap
} from 'lucide-react';
import { useTranslation } from '../lib/TranslationContext';
import axios from 'axios';

interface Props {
  onSwitchToCross?: () => void;
  sectorId?: string;
}

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  type?: 'code' | 'json' | 'normal';
}

const SYSTEM_PROMPT = `You are the Specialized Quantum Business Intelligence Engine focused exclusively on Banking, Asset Portfolios, and Financial Risk Analytics.

CRITICAL APPLICATION CONTEXT (UI & CHAT LIFECYCLE):
You operate entirely inside a SINGLE, PRE-EXISTING WEB PAGE of the application. This page contains an active chat interface where you ask the user specific questions, and the user provides answers or asks for clarifications. 
- You must drive this chat conversation step-by-step.
- Once the user has no more questions, and you have collected all necessary inputs (no more questions to ask), the application will dynamically transition.
- Upon this lifecycle completion, the UI will display TWO COLUMNS containing the two requested code outputs ([START_PYTHON] and [START_COMPOSER]) directly below or alongside a full row summarizing the entire text history of the questions and answers exchanged between the user and you.
Act as a strict, clean backend pipeline component during code emission. Do not output any conversational text or prose outside of the specific tags during code generation.

REGOLE TASSATIVE DI CONVERSAZIONE (IN ITALIANO):
1. Conduci l'intervista ponendo UNA SOLA DOMANDA ALLA VOLTA. Non sovraccaricare mai l'utente con più domande contemporaneamente. Sii estremamente sintetico, conciso e breve in ogni singola risposta. Evita spiegazioni teoriche o introduzioni prolisse.
2. Sii cordiale, ma estremamente preciso e diretto ed orientato ai dati.
3. Quando l'utente inserisce percentuali o tassi nella chat, accetta l'input anche se formattato male, ma sanificalo internamente trasformandolo in formato decimale puro con il punto (es. 0.05 per 5%).
4. Non mostrare MAI all'utente parametri tecnici quantistici interni (come Qubit o QUBO Multipliers) durante l'intervista, eccetto quando richiesto esplicitamente per la configurazione delle risorse.
5. FONTE DI VERITÀ: Utilizza ESCLUSIVAMENTE i nomi delle colonne e i dati rilevati nel CSV fornito dall'utente. Non inventare nomi di asset, ticker o date che non siano presenti nel file. Elenca ESATTAMENTE quelli trovati.

---

FASE 0: PRE-REQUISITI DEL FILE CSV E ANALISI INIZIALE
All'inizio dell'intervista, quando ottieni le intestazioni e il campione di dati:
- Identifica la colonna temporale e gli Asset (le colonne con i valori numerici degli asset).
- Riporta all'utente l'elenco degli asset identificati per conferma.
- Proponi la mappatura e passa allo Step 1.

---

STRUTTURA DELL'ALBERO DECISIONALE

STEP 1: OBIETTIVO DELLA RICERCA
Sii estremamente sintetico. Chiedi all'utente di selezionare l'obiettivo indicando di digitare solo la lettera 'A' o 'B':
* **[A] Analisi del Rischio** (Quantum Value at Risk / qVaR e Quantum Amplitude Estimation)
* **[B] Ottimizzazione di Portafoglio** (Portfolio Optimization con QAOA)
Scrivi esplicitamente: "Digita semplicemente A o B per rispondere."

---

[RAMO A]: ANALISI DEL RISCHIO PURO (Quantum Amplitude Estimation & qVaR)
Segui questo ordine ponendo UNA DOMANDA ALLA VOLTA, attendendo la risposta dell'utente prima di passare alla successiva:
1. ORIZZONTE TEMPORALE: Simolazione in giorni (es. 30 giorni).
2. ASSEGNAZIONE RISORSE (QUBIT) PER SINGOLO ASSET: Elenca gli asset trovati e per ciascuno chiedi quanti qubit assegnare (es. da 2 a 5).
3. SCELTA METRICA PER SINGOLO ASSET: Chiedi per ciascun asset la metrica (es: 'Media' o 'Deviazione Standard').
4. TOLLERANZA AL RISCHIO (VaR): Chiedi il tasso massimo di tolleranza o limite VaR (es: 3%).
5. CONFIDENZA STATISTICA: "95% (Standard)" o "99% (Estremo)".
6. STRESS TESTING: "Normale", "Shock Geopolitico", "Iperinflazione".

---

[RAMO B]: OTTIMIZZAZIONE DI PORTAFOGLIO (Portfolio Optimization con QAOA)
Segui questo ordine ponendo UNA DOMANDA ALLA VOLTA:
1. Budget massimo di selezione asset.
2. Fattore di preferenza rischio/rendimento (risk factor da 0 a 1).
3. Assegnazione qubit per asset.

---

OUTPUT FINALE (CODE EMISSION):
Alla fine della raccolta dei dati dell'intervista e quando reputi che non vi siano altre domande, comunica che procederai alla configurazione fisica sul Quantum Processor IBM ed emetti esplicitamente i codici racchiusi in questi due esatti tag delimitatori (senza alcun testo aggiuntivo fuori dai tag):

[START_PYTHON]
# Codice Python Qiskit 1.x configurato con i parametri reali inseriti dall'utente per ciascun asset
import numpy as np
# ...
[END_PYTHON]

[START_COMPOSER]
// Circuito in codice OpenQASM 2.0 coerente con i qubit allocati, le porte h, cx e le rotazioni rz calcolate sui limiti reali dell'utente
OPENQASM 2.0;
include "qelib1.inc";
// ...
[END_COMPOSER]
`;

const SYSTEM_PROMPT_INSURANCE = `Sei l'Assistente AI di livello Enterprise della Quantum Business Intelligence specializzata in Insurance Risk and Claims (Settore ASSICURAZIONI) di Assicurazione Quantum. Il tuo obiettivo è guidare l'utente in un'intervista interattiva e dinamica ad ALBERO DECISIONALE, partendo dall'analisi delle colonne e dei dati di un file CSV caricato, per raccogliere i parametri necessari a generare un modello assicurativo-quantitativo.

REGOLE TASSATIVE DI CONVERSAZIONE:
1. Conduci l'intervista ponendo UNA SOLA DOMANDA ALLA VOLTA. Non sovraccaricare mai l'utente con elenchi di domande. Sii estremamente sintetico, conciso e breve in ogni singola risposta. Evita spiegazioni teoriche o introduzioni prolisse.
2. Sii cordiale, ma estremamente preciso e diretto.
3. Quando l'utente inserisce percentuali o tassi nella chat, accetta l'input anche se formattato male o ripetuto per errore, ma sanificalo internamente trasformandolo in formato decimale puro con il punto (es. 0.05 per 5%).
4. Non mostrare MAI all'utente parametri tecnici quantistici interni (come Qubit ecc.) durante l'intervista, eccetto quando richiesto esplicitamente per la configurazione delle risorse.
5. FONTE DI VERITÀ: Utilizza ESCLUSIVAMENTE i nomi delle colonne e i dati rilevati nel CSV fornito dall'utente. Non inventare nomi o date.

Se rilevi virgole (,) o punti e virgola (;) nei campi numerici della chat, devi rifiutarti di procedere ed emettere questo esatto avviso:
"❌ ERRORE DI FORMATTAZIONE INTERNO: Rilevate virgole o punti e virgola nei campi numerici. Il sistema quantistico richiede tassativamente il PUNTO (.) come separatore decimale. Correggi il file e ricaricalo per procedere."

---

FASE 0: PRE-REQUISITI DEL FILE CSV E ANALISI INIZIALE
Quando l'utente carica un file CSV valido, rispondi con questa esatta frase:
"Rilevato settore Assicurazioni e colonne del file. Cosa vorresti analizzare o calcolare unendo questi dati sul computer quantistico?"

---

FASE 1: MAPPATURA LOGICA ASSICURATIVA (Estensione del modello Banca)
Mappa le variabili nel modo seguente:
- Premi medi / Tassi di sinistrosità storici ➔ MEDIA MATEMATICA ➔ RY/RX gates (Definisce lo stato di partenza del rischio del portafoglio).
- Risarcimenti catastrofali / Costi variabili dei sinistri ➔ VOLATILITÀ/VARIANZA ➔ RZ Phase gates (Mappa l'incertezza e la deviazione standard attuariale).
- Soglie di frode / Picchi anomali di liquidazione ➔ CONTEGGIO SOGLIA ➔ X/CNOT emergency switches (Agisce come interruttore di allarme/alert per anomalie).

---

FASE 2: INTERVISTA ESPLICITA ALLOCAZIONE QUBIT
Non fare mai domande generiche o astratte. Chiedi esplicitamente quale modalità di allocazione hardware desiderano tra:
- OPZIONE [A]: 1 SINGLE QUBIT (Overlap/Efficiency Mode)
- OPZIONE [B]: SEPARATE QUBITS (Precision Mode)

* Se l'utente sceglie l'opzione a 1 SINGLE QUBIT (Overlap/Efficiency Mode):
Stampa TASSATIVAMENTE questo blueprint per la conferma prima di procedere alla generazione del codice, sostituendo '[Column 1]', '[Column 2]', [Value] con i dati veri del loro CSV:
"Hai scelto la modalità Efficienza (1 Solo Qubit). Ecco come verranno mappati i tuoi dati assicurativi sulla Sfera Quantistica:
Qubit q[0] (Asse Y) ➔ Assegnato alla variabile '[Column 1]' tramite la media calcolata di [Value].
Qubit q[0] (Asse X) ➔ Assegnato alla variabile '[Column 2]' tramite la metrica di sinistrosità di [Value].
Qubit q[0] (Asse Z - Fase) ➔ Assegnato alla componente di volatilità/rischio catastrofale.
Confermi questa mappatura visiva? (Rispondi SI per generare il codice, oppure NO per cambiare)"

* Se l'utente sceglie l'opzione SEPARATE QUBITS (Precision Mode):
Fai l'intervista colonna per colonna usando i nomi reali del CSV:
"Hai scelto la modalità Precisione. Dimmi esattamente come vuoi distribuire l'hardware:
Quanti qubit vuoi assegnare alla colonna '[Column 1]'? (Consigliato: 1)
Quanti qubit vuoi assegnare alla colonna '[Column 2]'? (Consigliato: 1)
[Ripeti per ogni colonna numerica trovata nel CSV...]"
Attendi la loro esplicita conferma numerica per ciascuna colonna prima di generare qualsiasi codice.

---

REGOLE DI GENERAZIONE DEL CODICE (STRICT CODE GENERATION & SAFETY)
- No prose outside tags: Non scrivere nessuna riga di testo discorsivo o di cortesia prima o dopo i tag [START_PYTHON] o [START_COMPOSER], altrimenti si romperà l'interfaccia.
- CNOT Anchor Rule: Il Qubit di Controllo deve essere la causa/trigger (es. Frode/Sinistro), il Qubit di Target deve essere l'effetto (es. Liquidazione/Impatto). Non invertire mai questo orientamento!
- Explicit Measurement Rule: Genera righe di misura separate per ciascun qubit attivo (es. measure q[0] -> c[0];).
- Italian Comments with Strict Insurance Context: Ogni singola riga di codice deve contenere un commento in italiano descrittivo che cita la colonna CSV di origine, la metrica operata e il qubit hardware target (es: # Porta RY per Media 'Premi_Medi' su q[0]).

Devi produrre ESCLUSIVAMENTE questi due blocchi di codice strutturati con questi esatti delimitatori:

[START_PYTHON]
(Codice completo Python Qiskit 1.x con i parametri e i commenti in italiano del settore assicurativo)
[END_PYTHON]

[START_COMPOSER]
1. GUIDA VISIVA AI PULSANTI (GATE) DA TRASCINARE
2. CODICE OPENQASM 2.0 (PANNELLO DI DESTRA) con istruzioni e commenti in italiano
[END_COMPOSER]
`;

export default function QuantumBI({ onSwitchToCross, sectorId = 'finance' }: Props) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [retryCountdown, setRetryCountdown] = useState<number>(0);
  const [lastUserMessage, setLastUserMessage] = useState<string>('');
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  
  // Final Results
  const [jsonConfig, setJsonConfig] = useState<string>('');
  const [pythonCode, setPythonCode] = useState<string>('');
  const [qasmCode, setQasmCode] = useState<string>('');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'json' | 'python' | 'qasm'>('json');

  // Sector and structural parsing states
  const [detectedSector, setDetectedSector] = useState<string>('Finanza / Commodity / Mercati');
  const [sectorBrief, setSectorBrief] = useState<string>('Finanza');
  const [numCols, setNumCols] = useState<number>(3);
  const [firstEntityName, setFirstEntityName] = useState<string>('Asset_1');
  const [allEntities, setAllEntities] = useState<string[]>([]);

  // Rotating bank icon and sector labels
  const [sectorRotationIndex, setSectorRotationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSectorRotationIndex(prev => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const cyclingSectors = [
    "Banca",
    "Assicurazioni",
    "Logistica",
    "Telecomunicazioni",
    "Manifattura",
    "Energia"
  ];
  const currentCyclingSector = cyclingSectors[sectorRotationIndex % cyclingSectors.length];

  const getSubtextForSector = (sector: string) => {
    switch (sector) {
      case 'Banca':
        return 'Financial Intelligence Node 01';
      case 'Assicurazioni':
        return 'Actuarial Risk Node 02';
      case 'Logistica':
        return 'Supply Chain Optimizer Node 03';
      case 'Telecomunicazioni':
        return 'Network Capacity Node 04';
      case 'Manifattura':
        return 'Predictive Maintenance Node 05';
      case 'Energia':
        return 'Grid Optimization Node 06';
      default:
        return 'Enterprise AI Node 01';
    }
  };

  const getIconForSector = (sector: string) => {
    switch (sector) {
      case 'Banca':
        return <Landmark className="w-8 h-8 text-quantum-primary" />;
      case 'Assicurazioni':
        return <Shield className="w-8 h-8 text-quantum-primary" />;
      case 'Logistica':
        return <Truck className="w-8 h-8 text-quantum-primary" />;
      case 'Telecomunicazioni':
        return <Radio className="w-8 h-8 text-quantum-primary" />;
      case 'Manifattura':
        return <Factory className="w-8 h-8 text-quantum-primary" />;
      case 'Energia':
        return <Zap className="w-8 h-8 text-quantum-primary" />;
      default:
        return <BrainCircuit className="w-8 h-8 text-quantum-primary" />;
    }
  };

  const getDynamicSystemPrompt = () => {
    const assetListBrief = allEntities.length > 0 ? allEntities.slice(0, 3).join(', ') : 'Oro, Platino, Petrolio';
    return `You are the Specialized Quantum Business Intelligence Engine and an Expert in Quantum Financial Data Engineering & Portfolio Management with Qiskit 1.x.

AUTOMATIC SECTOR CALIBRATION AND DATA METADATA:
- Calibrated Sector: "${detectedSector}" (Brief: "${sectorBrief}")
- Number of Columns in CSV: ${numCols}
- First Entity Name: "${firstEntityName}"
- All Entities Detected (from Colonna 0): ${allEntities.length > 0 ? JSON.stringify(allEntities) : '["Tech Giant A", "Global Index Fund", "Green Energy Bond"]'}

CRITICAL INSTRUCTIONS FOR CHAT CONVERSATION LIFE-CYCLE:
- You must conduct a structured, friendly interview in Italian to collect the parameters step-by-step.
- POST ONE SINGLE CONCISE QUESTION AT A TIME. DO NOT send multiple questions at once.
- Use the exact terminology of the detected sector "${detectedSector}" as mapped below.

CONVERSATIONAL INTERVIEW FLOW (ITALIANO) - RISPETTA QUESTO ORDINE PER LE DOMANDE:
1. **DOMANDA 1 (Fasi/Dimensioni Storiche - UNIVERSALE E COLLETTIVA)**:
   - "Ho rilevato i tuoi asset finanziari, che verranno analizzati TUTTI insieme in parallelo (${assetListBrief}). Per ciascuno di essi ci sono ${numCols} colonne storiche di dati disponibili (es. i vari periodi o metriche). DOMANDA 1: Quante di queste ${numCols} colonne storiche sequenziali (partendo dalla prima a sinistra) vuoi includere nella simulazione quantistica attuale? Scegli un numero da 1 a ${numCols}."
   - È tassativamente vietato isolare un singolo elemento (es. NO "per l'asset Oro"). La domanda deve essere collettiva e applicarsi a tutte le entità in parallelo nello stesso momento.

2. **DOMANDA 2 (Risoluzione del Calcolo Semplificata)**:
   - "Quale livello di risoluzione e accuratezza quantistica desideri applicare per l'analisi dei dati? Digita [A] per Standard (Calcolo rapido) o [B] per Alta Precisione (Calcolo approfondito)."
   - Non chiedere mai all'utente il numero di qubit o di inserire stringhe complesse separate da virgola (es. NO "3,3,3").

3. **DOMANDA 3 (Soglia Percentuale Adattiva per Settore)**:
   - Se Finanza/Banca/Assicurazioni (sectorBrief="Finanza"): "Qual è la tolleranza massima al rischio (limite Value at Risk - VaR o tasso di default) espressa in percentuale? (Inserisci un valore, consigliato: 1% - 5%)"
   - Se Logistica/Infrastrutture/Telecomunicazioni (sectorBrief="Logistica" o "Telecomunicazioni"): "Qual è la soglia limite di capacità o saturazione critica oltre la quale far scattare l'allarme di sistema? (Inserisci un valore, consigliato: 70% - 85%)"
   - Negli altri casi (sectorBrief="Retail" o "Universale"): "Qual è la soglia critica espressa in percentuale del limite desiderato? (Inserisci un valore, consigliato: 10% - 20%)"

4. **DOMANDA 4 (Scenario Rigido di Stress Adattivo)**:
   - Se Finanza/Banca/Assicurazioni (sectorBrief="Finanza"): "Scegli lo scenario per le onde di mercato: [Normale], [Shock Geopolitico], [Iperinflazione]."
   - Se Logistica/Supply Chain (sectorBrief="Logistica"): "Scegli lo scenario per la catena di distribuzione: [Normale], [Blocco Doganale / Sciopero], [Picco Stagionale / Black Friday]."
   - Se Telecomunicazioni/IT (sectorBrief="Telecomunicazioni"): "Scegli lo scenario per il carico dei nodi di rete: [Normale], [Saturazione di Picco], [Guasto di Canale / Interruzione Fibra]."
   - Negli altri casi (sectorBrief="Retail" o "Universale"): "Scegli lo scenario di stress opportuno: [Normale], [Picco Stagionale / Black Friday], [Blocco Fornitura]."

CODE GENERATION RULES (CRITICAL - DO NOT FAIL UNDER ANY CIRCUMSTANCES):
Once all 4 questions have been answered, announce that you are compiling the configuration and output the codes inside EXACT tags:

[START_JSON]
{
  "objective": "Risk Analysis",
  "sector": "${detectedSector}",
  "confidence_level": 0.95,
  "stress_test_scenario": "..."
}
[END_JSON]

[START_PYTHON]
# Code MUST be fully written in Qiskit 1.x with these rules:
# 1. Standard local simulation MUST use:
#    from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
#    from qiskit.primitives import StatevectorSampler
# 2. Allocate variables register of N size (N = sum of precision qubits for the variables) and a comparator qubit at index N:
#    qr = QuantumRegister(N + 1, 'q')
#    cr = ClassicalRegister(1, 'c')
#    qc = QuantumCircuit(qr, cr)
# 3. Calculate historical mapping rotational angles with:
#    theta = 2 * np.arcsin(np.sqrt(np.clip(P, 0, 1)))
#    Print mappings to console: "[Entità] -> [Colonna] -> Angolo calcolato: [X] rad"
# 4. Critical threshold angle calculation must use arcoseno:
#    threshold_angle = 2 * np.arcsin(np.sqrt(np.clip(soglia, 0, 1)))
# 5. Apply wave shift via controlled RY rotations (cry) from each of the N asset/variable qubits (qr[i]) to the comparator target qubit (qr[N]) using fractioned weight:
#    for i in range(N):
#        qc.cry(threshold_angle / N, qr[i], qr[N])
# 6. Measure EXCLUSIVELY the final target qubit (index N) into the 1-bit classical register (cr[0]):
#    qc.measure(qr[N], cr[0])
# 7. Standard local simulation MUST use StatevectorSampler stable Qiskit 1.x syntax to retrieve job result counts:
#    sampler = StatevectorSampler()
#    job = sampler.run([qc], shots=1000)
#    risultato = job.result()
#    data_circuito = risultato.data
#    counts = data_circuito.get_counts(qc)
#    voci_attive = counts.get('1', 0)
#    probabilita_superamento = (voci_attive / 1000) * 100
# 8. NEVER use np.arccos or older dict result formats. Always prevent domain errors with np.clip(..., 0, 1).
# 9. DO NOT write hardcoded static OpenQASM text. Generate OpenQASM 2.0 dynamically in Python utilizing:
#    from qiskit.qasm2 import dumps as qasm2_dumps
#    stringa_qasm = qasm2_dumps(qc)
#    print(stringa_qasm)
# 10. Avoid any other text outside [START_...] tags on code emission.
[END_PYTHON]

[START_COMPOSER]
// Dynamic OpenQASM 2.0 representation reflecting the correct circuit configuration with N variable qubits and 1 comparator qubit.
[END_COMPOSER]
`;
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const parsedParams = React.useMemo(() => {
    let assets = allEntities.length > 0 
      ? allEntities
      : (sectorId === 'insurance'
          ? ['Premi_Medi_Rca', 'Costo_Sinistri_Cat', 'Soglia_Frode_Alert']
          : ['Tech Giant A', 'Global Index Fund', 'Green Energy Bond']);

    let goal: 'A' | 'B' = 'A'; // Defaults to branch A (Risk) since it's the requested starting point
    let selectedColsCount = numCols;
    let qubitPrecision = 3;
    let criticalThreshold = 0.04;
    let stressScenario = 'Normale';

    const qubitsMap: Record<string, number> = {};
    const metricsMap: Record<string, string> = {};
    const varToleranceMap: Record<string, number> = {};

    // Initialize defaults per asset
    assets.forEach((asset) => {
      qubitsMap[asset] = 3;
      metricsMap[asset] = 'Media';
      varToleranceMap[asset] = 0.04;
    });

    // Clean messages: exclude system/API error messages from index scanning
    const cleanMessages = messages.filter(msg => {
      if (msg.role === 'user') return true;
      const t = msg.text;
      if (t.includes('[ERRORE') || t.includes('[ERRORE AI]') || t.includes('Si è verificato un errore') || t.includes('La risposta dell\'IA non è valida') || t.includes('Token non rilevato')) {
        return false;
      }
      return true;
    });

    cleanMessages.forEach((msg, index) => {
      if (msg.role === 'user') {
        const text = msg.text.trim();
        const upperText = text.toUpperCase();

        // Find the closest preceding bot question in our cleaned message array
        let prevBotMsg: any = null;
        for (let j = index - 1; j >= 0; j--) {
          if (cleanMessages[j].role === 'bot') {
            prevBotMsg = cleanMessages[j];
            break;
          }
        }

        if (prevBotMsg) {
          const prevBotText = prevBotMsg.text.toUpperCase();

          // Question 1: Number of historical columns to include (Universal)
          if (prevBotText.includes('COLONNE') || prevBotText.includes('STORICO') || prevBotText.includes('CRONOLOGIA') || prevBotText.includes('STORY') || prevBotText.includes('SPECULATION') || prevBotText.includes('METRICHE') || prevBotText.includes('FASI')) {
            const num = parseInt(text.replace(/[^\d]/g, ''), 10);
            if (num > 0 && num <= 20) {
              selectedColsCount = num;
            }
          }

          // Question 2: Simplified calculations accuracy/resolution choice (A vs B)
          if (prevBotText.includes('RISOLUZIONE') || prevBotText.includes('ACCURATEZZA') || prevBotText.includes('RAPIDO') || prevBotText.includes('APPROFONDITO') || prevBotText.includes('LIVELLO')) {
            if (upperText.includes('B') || upperText.includes('ALTA') || upperText.includes('PRECISIONE') || upperText.includes('APPROFONDITO')) {
              qubitPrecision = 5;
            } else {
              qubitPrecision = 3;
            }
          }

          // Question 3: Critical threshold percentage
          if (prevBotText.includes('SOGLIA') || prevBotText.includes('TOLLERANZA') || prevBotText.includes('VAR') || prevBotText.includes('SATURAZIONE') || prevBotText.includes('CAPACITÀ') || prevBotText.includes('CAPACITA')) {
            const percentMatch = text.match(/([0-9]+(?:[.,][0-9]+)?)\s*%/);
            let val = 0.04;
            if (percentMatch) {
              val = parseFloat(percentMatch[1].replace(',', '.')) / 100;
            } else {
              const numVal = parseFloat(text.replace(',', '.').replace(/[^\d.]/g, ''));
              if (numVal > 0 && numVal < 100) {
                val = numVal / 100;
              } else if (numVal >= 0 && numVal <= 1) {
                val = numVal;
              }
            }
            criticalThreshold = val;
            assets.forEach(a => { varToleranceMap[a] = val; });
          }

          // Question 4: Stress Scenario
          if (prevBotText.includes('SCENARIO') || prevBotText.includes('ONDE') || prevBotText.includes('FLUSSO') || prevBotText.includes('STRESS') || prevBotText.includes('CARICO') || prevBotText.includes('SHOCK') || prevBotText.includes('DISTRIBUZIONE') || prevBotText.includes('RETE')) {
            if (upperText.includes('GEOPOLITIC') || upperText.includes('SHOCK')) {
              stressScenario = 'Shock Geopolitico';
            } else if (upperText.includes('INFLAZ') || upperText.includes('IPERINFLAZ')) {
              stressScenario = 'Iperinflazione';
            } else if (upperText.includes('PICCO') || upperText.includes('BLACK FRIDAY') || upperText.includes('STAGIONALE')) {
              stressScenario = 'Picco Stagionale / Black Friday';
            } else if (upperText.includes('BLOCCO') || upperText.includes('FORNITURA') || upperText.includes('DOGANALE') || upperText.includes('SCIOPERO')) {
              stressScenario = 'Blocco Doganale / Sciopero';
            } else if (upperText.includes('SATURAZIONE') || upperText.includes('PICCO')) {
              stressScenario = 'Saturazione di Picco';
            } else if (upperText.includes('GUASTO') || upperText.includes('CANALE') || upperText.includes('INTERRUZIONE') || upperText.includes('FIBRA')) {
              stressScenario = 'Guasto di Canale / Interruzione Fibra';
            } else {
              stressScenario = 'Normale';
            }
          }
        }
      }
    });

    return {
      goal,
      assets,
      selectedColsCount,
      qubitPrecision,
      criticalThreshold,
      stressScenario,
      qubitsMap,
      metricsMap,
      varToleranceMap
    };
  }, [messages, csvHeaders, allEntities, numCols, sectorId]);

  const dynamicCodes = React.useMemo(() => {
    const p = parsedParams;

    // 1. Compute JSON String Configurations
    const json = JSON.stringify({
      objective: "Quantum Prediction Analysis",
      sector: detectedSector,
      selected_historical_columns: p.selectedColsCount,
      qubits_resolution: p.qubitPrecision,
      critical_threshold: p.criticalThreshold,
      stress_scenario: p.stressScenario,
      entities_count: p.assets.length
    }, null, 2);

    // 2. Pure dynamic Qiskit 1.x script reflecting all constraints
    const python = `# =====================================================================
# WORKSPACE CODICE PYTHON (QISKIT 1.x) - PURE QUANTUM ENGINE MOTOR
# SECTOR: ${detectedSector}
# =====================================================================
import pandas as pd
import numpy as np
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit.primitives import StatevectorSampler
from qiskit.qasm2 import dumps as qasm2_dumps

# 1. READ CSV (Architettura: Colonna 0 = Entità, Colonne successive = Campi numerici)
try:
    df = pd.read_csv('aa.csv')
    delimiter = ';' if df.shape[1] == 1 else ','
    if df.shape[1] == 1:
        df = pd.read_csv('aa.csv', sep=';')
except Exception:
    # Fallback robusto con dati allineati per il settore ${detectedSector}
    entities_fallback = ${JSON.stringify(p.assets)}
    data = {
        'Principale': entities_fallback,
        'Fase_1': [82.5, 45.2, 12.3] * (len(entities_fallback) // 3 + 1),
        'Fase_2': [88.1, 48.9, 14.5] * (len(entities_fallback) // 3 + 1),
        'Fase_3': [78.4, 42.1, 11.0] * (len(entities_fallback) // 3 + 1),
    }
    # taglia alle dimensioni reali delle entità
    for k in data.keys():
        data[k] = data[k][:len(entities_fallback)]
    df = pd.DataFrame(data)

# SCANSIONE SEMANTICA FLESSIBILE SULL'INTERO DATASET
date_cols = []
numeric_cols = []
entity_cols = []

for col in df.columns:
    col_lower = str(col).lower()
    looks_like_date = False
    for val in df[col].dropna().head(5):
        val_str = str(val).strip()
        if '-' in val_str or '/' in val_str:
            if any(char.isdigit() for char in val_str):
                looks_like_date = True
                break
    
    if 'date' in col_lower or 'data' in col_lower or 'time' in col_lower or 'giorno' in col_lower or 'index' in col_lower or 'id' in col_lower or looks_like_date:
        date_cols.append(col)
    else:
        try:
            non_na = df[col].dropna()
            numeric_count = pd.to_numeric(non_na.astype(str).str.replace(r'[\\s$%€]', '', regex=True), errors='coerce').notna().sum()
            ratio = numeric_count / len(non_na) if len(non_na) > 0 else 0
            if ratio >= 0.6:
                numeric_cols.append(col)
            else:
                entity_cols.append(col)
        except Exception:
            entity_cols.append(col)

if entity_cols:
    entita_rilevate = []
    for ecol in entity_cols:
        entita_rilevate.extend(df[ecol].dropna().astype(str).tolist())
    entita_rilevate = list(dict.fromkeys(entita_rilevate))
else:
    entita_rilevate = [str(c) for c in numeric_cols]

colonne_numeriche = [c for c in numeric_cols]

print(f"[SISTEMA: Rilevato settore '${detectedSector}' dal contenuto delle righe]")
print(f"Entità identificate: {entita_rilevate}")
print(f"Colonne temporali/storiche disponibili per l'analisi: {colonne_numeriche}")

# Applica moltiplicatore di volatilità/stress in base allo scenario
stress_scenario = "${p.stressScenario}"
multiplier = 1.0
if stress_scenario in ["Shock Geopolitico", "Picco Stagionale / Black Friday", "Saturazione di Picco"]:
    multiplier = 1.5
elif stress_scenario in ["Iperinflazione", "Blocco Fornitura", "Guasto di Canale"]:
    multiplier = 2.0

print(f"Scenario caricato: {stress_scenario} -> Moltiplicatore Stress: {multiplier}")

# 2. ARCHITECTURE & NORMALIZATION
num_entita = len(entita_rilevate)
num_colonne_selezionate = min(len(colonne_numeriche), ${p.selectedColsCount})
colonne_per_analisi = colonne_numeriche[:num_colonne_selezionate]

sub_df = df[colonne_per_analisi] if colonne_per_analisi else df
valori_numerici = pd.to_numeric(sub_df.values.flatten(), errors='coerce') if colonne_per_analisi else np.array([100.0])
cifra_massima = np.nanmax(valori_numerici) if len(valori_numerici) > 0 and not np.isnan(np.nanmax(valori_numerici)) else 100.0
if cifra_massima == 0:
    cifra_massima = 1.0

# 3. TRASFORMAZIONE E LOG DEI RADIANTI (Formula con arcoseno e clip preventivo)
angoli_mappatura = {}
print("\\n--- [LOG DI MAPPATURA QUANTISTICA IN RADIANTI] ---")
for entita in entita_rilevate:
    angoli_mappatura[entita] = {}
    for col in colonne_per_analisi:
        cifra_specifica = 0.0
        if entity_cols:
            row_match = df[df[entity_cols[0]].astype(str) == entita]
            if not row_match.empty:
                val = row_match[col].iloc[0]
                try:
                    cifra_specifica = float(str(val).replace(' ', ''))
                except Exception:
                    cifra_specifica = 0.0
        else:
            val = df[entita].mean() if entita in df.columns else 0.0
            try:
                cifra_specifica = float(val)
            except Exception:
                cifra_specifica = 0.0

        P = (cifra_specifica / cifra_massima) * multiplier
        P_clipped = np.clip(P, 0, 1)
        theta = 2 * np.arcsin(np.sqrt(P_clipped))
        angoli_mappatura[entita][col] = theta
        print(f"[{entita}] -> [{col}] -> Angolo calcolato: {theta:.6f} rad")
print("--------------------------------------------------\\n")

# 4. QUANTUM CIRCUIT SETUP (Qiskit 1.x Quantum Comparator Core)
qubits_per_col = ${p.qubitPrecision}
# N: Somma dei qubit di precisione scelti per le variabili analizzate
N = len(entita_rilevate) * len(colonne_per_analisi) * qubits_per_col

if N == 0:
    N = 3 # Safe minimal boundary

# Alloca un qubit aggiuntivo alla fine del registro (Indice N) come Comparatore Quantistico
qr = QuantumRegister(N + 1, 'q')
cr = ClassicalRegister(1, 'c')
qc = QuantumCircuit(qr, cr)

# Inizializza i qubit d'asset tramite rotazioni RY/RZ
qubit_idx = 0
for entita in entita_rilevate:
    for col in colonne_per_analisi:
        theta = angoli_mappatura[entita][col]
        for q_p in range(qubits_per_col):
            if qubit_idx < N:
                qc.ry(theta, qr[qubit_idx])
                qc.rz(theta / 2.0, qr[qubit_idx])
                qubit_idx += 1

# 5. ABILITAZIONE SOGLIA CRITICA E PORTE CRY SFASATE DI COMPARATORE (Sfasamento d'onda)
soglia_utente = ${p.criticalThreshold}
soglia_clipped = np.clip(soglia_utente, 0, 1)
threshold_angle = 2 * np.arcsin(np.sqrt(soglia_clipped))

print(f"Soglia Critica / Tolleranza impostata: {soglia_utente * 100:.2f}% (Angolo: {threshold_angle:.6f} rad)")

# Applica lo sfasamento d'onda tramite porte 'cry' controllate da ciascun d'asset verso l'unico qubit target (Indice N)
for i in range(N):
    qc.cry(threshold_angle / N, qr[i], qr[N])

# 6. MISURAZIONE ESCLUSIVA TARGET (Indice N nel registro classico a 1 solo bit)
qc.measure(qr[N], cr[0])

# 7. EXECUTION (Sintassi universale standard Qiskit 1.x - Regola di Abbattimento Bug)
sampler = StatevectorSampler()
job = sampler.run([qc], shots=1000)
risultato = job.result()

data_circuito = risultato.data
counts = data_circuito.get_counts(qc) # Questa è l'unica sintassi universale ammessa
voci_attive = counts.get('1', 0)
probabilita_superamento = (voci_attive / 1000) * 100

print("\\n┌────────────────────────────────────────────────────────┐")
print("│            RISULTATO COMPILATORE QUANTISTICO BI        │")
print("└────────────────────────────────────────────────────────┘")
print(f"Scenario Analizzato:       {stress_scenario}")
print(f"Istanze Totali Analizzate: {num_entita}")
print(f"Saturazione Superata (Jobs): {voci_attive} su 1000 shot ({voci_attive / 10:.2f}%)")
print("──────────────────────────────────────────────────────────")

# 8. OPENQASM EXPORT DINAMICO (dumps di qiskit.qasm2)
try:
    stringa_qasm = qasm2_dumps(qc)
    print("\\n[START_COMPOSER] OPENQASM DINAMICO COMPILATO:")
    print(stringa_qasm)
except Exception as e:
    print("Errore dumps OpenQASM:", e)
`;

    const dynamic_N = Math.max(3, p.assets.length * p.selectedColsCount * p.qubitPrecision);
    const qasm = `// =====================================================================
// CIRCUITO OPENQASM IBM ENGINE - SECTOR: ${detectedSector}
// =====================================================================
OPENQASM 2.0;
include "qelib1.inc";

// Alloca registro q di dimensioni N + 1 (N per variabili d'asset, l'ultimo è il Comparatore)
qreg q[${dynamic_N + 1}];
creg c[1]; // Registro classico per la misurazione di 1 solo bit

// Angolo di sfasamento di soglia calcolato dinamicamente:
// Soglia critica: ${(p.criticalThreshold * 100).toFixed(2)}%
// Angolo d'onda: ${(2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, p.criticalThreshold))))).toFixed(6)} rad

// 1. Inizializzazione degli asset sui qubit principali
ry(${(2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, p.criticalThreshold))))).toFixed(4)}) q[0];

// 2. Porte controllate CRY per accumulare l'errore o il superamento verso l'unico qubit target (Indice ${dynamic_N})
cry(${(2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, p.criticalThreshold)))) / dynamic_N).toFixed(4)}) q[0], q[${dynamic_N}];

// 3. Misurazione esclusiva del Qubit target finale nel registro classico c[0]
measure q[${dynamic_N}] -> c[0];
`;

    return { json, python, qasm };
  }, [parsedParams, detectedSector]);

  useEffect(() => {
    if (messages.length === 0) {
      // Phase 0: Initial Greeting & Prerequisites
      const initialText = `Benvenuto nella Quantum Engine BI. Sono il tuo assistente specializzato in Ingegneria dei Dati Quantum Computing.

Prima di iniziare, per assicurare che il computer quantistico legga correttamente i dati, ti ricordo i requisiti del file CSV:
• Deve essere un file .csv puro.
• I numeri decimali DEVONO usare il punto (es. 75.20) e NON la virgola.
• Le date devono essere in ordine cronologico e senza righe vuote.

Hai già un file pronto o desideri che ti aiuti a strutturarlo? Se lo hai già caricalo pure cliccando l'icona qui sotto.`;
      setMessages([{ id: 'start', role: 'bot', text: initialText }]);
    }
  }, [messages.length, sectorId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (retryCountdown > 0) {
      timer = setInterval(() => {
        setRetryCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [retryCountdown]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (role: 'user' | 'bot', text: string) => {
    setMessages(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, role, text }]);
  };

  const handleSend = async (overrideText?: string) => {
    const messageText = overrideText || input.trim();
    if (!messageText || isProcessing) return;

    // Persist exact last user prompt regardless of source, so retrying can't loop errors
    setLastUserMessage(messageText);
    setInput('');
    
    // Clear previous error on new attempt
    setErrorStatus(null);
    
    // Only add to UI if it's not a retry of the exact same message that's already visible
    const isRetry = messages.length > 0 && messages[messages.length - 1].role === 'user' && messages[messages.length - 1].text === messageText;
    
    if (!isRetry) {
      addMessage('user', messageText);
    }
    
    setIsProcessing(true);

    try {
      // Filter out system, error, and rate-limiting messages from history to prevent polluting context
      const cleanedHistory = messages.filter(m => {
        const text = m.text.trim();
        return !text.startsWith('[ERRORE') && !text.includes('Quota esaurita') && !text.includes('Riprova tra');
      });

      // In case of retry, we don't want to double count the last message in history
      const historyToPass = isRetry ? cleanedHistory : [...cleanedHistory, { role: 'user', text: messageText }];
      
      const activePrompt = getDynamicSystemPrompt();
      const response = await axios.post('/api/quantum-bi/chat', {
        messages: historyToPass,
        systemPrompt: activePrompt
      });

      // Check if the response contains HTML startup page
      if (typeof response.data === 'string' && (response.data.includes('<!doctype html>') || response.data.includes('Starting Server...'))) {
        throw new Error("SERVER_STARTING");
      }

      const botText = response.data?.text;
      
      if (!botText || typeof botText !== 'string' || botText.trim() === "") {
        console.error("Invalid AI Response payload:", response.data);
        throw new Error("La risposta dell'IA non è valida o è vuota. Riprova tra poco.");
      }

      addMessage('bot', botText);

      // Extract JSON, Python, and QASM if available (Safely and robustly)
      try {
        const extractCode = (text: string, lang: string): string => {
          // Custom tag extraction first
          if (lang === 'python') {
            const pythonTagMatch = text.match(/\[START_PYTHON\]([\s\S]*?)\[END_PYTHON\]/i);
            if (pythonTagMatch) return pythonTagMatch[1].trim();
          }
          if (lang === 'qasm') {
            const composerTagMatch = text.match(/\[START_COMPOSER\]([\s\S]*?)\[END_COMPOSER\]/i);
            if (composerTagMatch) {
              const inside = composerTagMatch[1];
              const qasmMatch = inside.match(/```(?:qasm|openqasm)?[\s\S]*?\n([\s\S]*?)\n```/i);
              if (qasmMatch) return qasmMatch[1].trim();
              return inside.trim();
            }
          }
          if (lang === 'json') {
            const jsonTagMatch = text.match(/\[START_JSON\]([\s\S]*?)\[END_JSON\]/i) || text.match(/BLOCCO 1: CONFIGURAZIONE JSON\s*\n*```json([\s\S]*?)```/i);
            if (jsonTagMatch) return jsonTagMatch[1].trim();
          }

          // 1. Try a complete match with ending backticks
          const fullRegex = new RegExp('```' + lang + '[\\s\\S]*?\\n([\\s\\S]*?)\\n```', 'i');
          const fullMatch = text.match(fullRegex);
          if (fullMatch) return fullMatch[1].trim();

          // 2. Try partial match if truncated (lacks ending backticks)
          const partialRegex = new RegExp('```' + lang + '[\\s\\S]*?\\n([\\s\\S]*)', 'i');
          const partialMatch = text.match(partialRegex);
          if (partialMatch) {
            let part = partialMatch[1];
            const nextBlock = part.indexOf('```');
            if (nextBlock !== -1) {
              part = part.substring(0, nextBlock);
            }
            return part.trim();
          }
          return '';
        };

        const jsonExtracted = extractCode(botText, 'json');
        const pythonExtracted = extractCode(botText, 'python');
        const qasmExtracted = extractCode(botText, 'qasm');

        if (jsonExtracted) setJsonConfig(jsonExtracted);
        if (pythonExtracted) setPythonCode(pythonExtracted);
        if (qasmExtracted) setQasmCode(qasmExtracted);
      } catch (parseErr) {
        console.warn("Could not parse code blocks from AI response", parseErr);
      }

    } catch (error: any) {
      console.error("AI Communication Error:", error);
      
      let status = error.response?.status;
      const responseData = error.response?.data;
      const isStartupHTML = (typeof responseData === 'string' && (responseData.includes('<!doctype html>') || responseData.includes('Starting Server...'))) || error.message === "SERVER_STARTING";
      
      if (isStartupHTML) {
        status = 503;
      }
      
      setErrorStatus(status || 500);
      const serverErrorField = error.response?.data?.error;
      
      let feedback = "";
      
      if (isStartupHTML) {
        feedback = "[ERRORE DI AVVIO]: Il server si sta ancora caricando o è stato appena riavviato per aggiornare la configurazione.";
      } else if (serverErrorField) {
        feedback = `[ERRORE AI]: ${serverErrorField}`;
      } else if (error.message) {
        feedback = `[ERRORE]: ${error.message}`;
      } else {
        feedback = "Si è verificato un errore imprevisto durante la comunicazione.";
      }

      if (status === 429) {
        // Dynamically extract retry seconds from Gemini error string, default to 30s to avoid spamming
        const secMatch = feedback.match(/Riprova tra ([\d.]+)/i);
        const parsedSecs = secMatch ? Math.ceil(parseFloat(secMatch[1])) : 29;
        setRetryCountdown(parsedSecs > 0 ? parsedSecs : 29);
        feedback += "\n\n💡 Suggerimento: Attendi che il timer scada prima di riprovare. Il limite di traffico gratuito è temporaneo.";
      } else if (status === 503 || isStartupHTML) {
        feedback += "\n\n🔄 Suggerimento: I server o l'ambiente sono carichi. Prova a fare clic su 'Riprova' tra qualche secondo.";
      }

      addMessage('bot', feedback);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const LIMITE_PESO_MB = 5;
    const LIMITE_PESO_BYTES = LIMITE_PESO_MB * 1024 * 1024;

    const outputMessaggio = document.getElementById("messaggio-sistema");
    if (outputMessaggio) {
      outputMessaggio.innerHTML = "";
    }

    if (!file.name.endsWith('.csv') && file.type !== "text/csv") {
      const errorMsg = "<span>❌ Errore: Formato non corretto. Caricare solo file .csv.</span>";
      if (outputMessaggio) {
        outputMessaggio.innerHTML = errorMsg;
      }
      addMessage('bot', "❌ Errore: Formato non corretto. Caricare solo file .csv.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > LIMITE_PESO_BYTES) {
      const errorMsg = "<span>❌ Errore: File troppo pesante. Limite 5 MB.</span>";
      if (outputMessaggio) {
        outputMessaggio.innerHTML = errorMsg;
      }
      addMessage('bot', "❌ Errore: File troppo pesante. Limite 5 MB.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      addMessage('bot', "Errore nella lettura del file. Verifica che il file non sia danneggiato.");
    };

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) throw new Error("File vuoto");

        const allLines = text.split(/\r?\n/).filter(line => line.trim() !== "");
        if (allLines.length > 0) {
          // Detect delimiter (comma or semicolon)
          const firstLine = allLines[0];
          const commaCount = (firstLine.match(/,/g) || []).length;
          const semiCount = (firstLine.match(/;/g) || []).length;
          const delimiter = semiCount > commaCount ? ';' : ',';

          // Validate each cell of the data rows for forbidden decimal commas or incorrect semicolons in numbers
          let hasCommaOrSemicolonError = false;
          let errorLine = -1;
          for (let i = 1; i < allLines.length; i++) {
            const line = allLines[i].trim();
            if (line === "") continue;
            const columns = line.split(delimiter);
            for (let j = 0; j < columns.length; j++) {
              const dato = columns[j].trim();
              if (dato.includes(',') || dato.includes(';')) {
                hasCommaOrSemicolonError = true;
                errorLine = i + 1;
                break;
              }
            }
            if (hasCommaOrSemicolonError) break;
          }

          if (hasCommaOrSemicolonError) {
            const errorText = "❌ ERRORE RIGIDO: Il file contiene virgole o punti e virgola alla riga " + errorLine + ". Sostituisci le virgole dei decimali con il punto (.) e ricarica.";
            if (outputMessaggio) {
              outputMessaggio.innerHTML = `<span style='color: #ef4444;'>${errorText}</span>`;
            }
            addMessage('bot', errorText);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
          }

          const headers = firstLine.split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
          setCsvHeaders(headers);
          setCurrentFile(file);

          // 1. ISPEZIONE TOTAL-DATASET & CLASSIFICAZIONE SEMANTICA FLESSIBILE
          const numColumns = headers.length;
          const dateCols: string[] = [];
          const numericCols: string[] = [];
          const entityCols: string[] = [];

          // Scan cell values column-by-column across up to 50 rows
          for (let colIdx = 0; colIdx < numColumns; colIdx++) {
            const header = headers[colIdx];
            const lowerHeader = header.toLowerCase();

            const cells: string[] = [];
            for (let i = 1; i < Math.min(allLines.length, 50); i++) {
              const row = allLines[i].trim();
              if (row === "") continue;
              const cols = row.split(delimiter);
              if (colIdx < cols.length) {
                cells.push(cols[colIdx].trim().replace(/^"|"$/g, ''));
              }
            }

            const isDateHeader = lowerHeader.includes('date') || lowerHeader.includes('data') || lowerHeader.includes('tempo') || lowerHeader.includes('time') || lowerHeader.includes('timestamp') || lowerHeader.includes('giorno') || lowerHeader.includes('index') || lowerHeader.includes('id');
            const looksLikeDate = cells.some(cell => {
              return /^\d{4}[-/]\d{2}[-/]\d{2}$/.test(cell) || /^\d{2}[-/]\d{2}[-/]\d{4}$/.test(cell);
            });

            if (isDateHeader || looksLikeDate) {
              dateCols.push(header);
              continue;
            }

            let numericCount = 0;
            let nonNumericCount = 0;

            cells.forEach(cell => {
              if (cell === "") return;
              const sanitized = cell.replace(/[\s$%€]/g, '');
              const parsed = parseFloat(sanitized);
              if (!isNaN(parsed) && isFinite(parsed)) {
                numericCount++;
              } else {
                nonNumericCount++;
              }
            });

            const totalCells = numericCount + nonNumericCount;
            const numericRatio = totalCells > 0 ? numericCount / totalCells : 0;

            if (numericRatio >= 0.6) {
              numericCols.push(header);
            } else {
              entityCols.push(header);
            }
          }

          // Distinct descriptive entities
          let parsedEntities: string[] = [];
          if (entityCols.length > 0) {
            entityCols.forEach(colName => {
              const colIdx = headers.indexOf(colName);
              if (colIdx !== -1) {
                for (let i = 1; i < allLines.length; i++) {
                  const row = allLines[i].trim();
                  if (row === "") continue;
                  const cols = row.split(delimiter);
                  if (colIdx < cols.length) {
                    const val = cols[colIdx].trim().replace(/^"|"$/g, '');
                    if (val !== "") {
                      parsedEntities.push(val);
                    }
                  }
                }
              }
            });
          }

          // Support CSV files that are organized with entities as column headers
          if (parsedEntities.length === 0) {
            parsedEntities = [...numericCols];
          }

          const uniqueEntities = Array.from(new Set(parsedEntities)).filter(x => x !== "");
          setAllEntities(uniqueEntities);

          const fallbackEntity = uniqueEntities.length > 0 ? uniqueEntities[0] : "Asset_1";
          setFirstEntityName(fallbackEntity);

          // Num of quantitative variables
          const numNumericColumns = entityCols.length > 0 ? numericCols.length : Math.max(1, headers.length - dateCols.length);
          setNumCols(numNumericColumns);

          // Automatic Sector Classification (Search inside all words of file)
          const sampleText = text.toLowerCase();
          let sectorStr = "Finanza / Commodity / Mercati";
          let sectorBriefStr = "Finanza";

          const hasFin = sampleText.includes("oro") || sampleText.includes("platino") || sampleText.includes("petrolio") || sampleText.includes("bitcoin") || sampleText.includes("eni") || sampleText.includes("aapl") || sampleText.includes("banca") || sampleText.includes("bank") || sampleText.includes("risk") || sampleText.includes("var") || sampleText.includes("rendimento") || sampleText.includes("asset");
          const hasRet = sampleText.includes("maglia") || sampleText.includes("pantalone") || sampleText.includes("scarpe") || sampleText.includes("giacca") || sampleText.includes("t-shirt") || sampleText.includes("vestito") || sampleText.includes("jeans") || sampleText.includes("retail") || sampleText.includes("abbigliamento") || sampleText.includes("magazzino") || sampleText.includes("giacenza") || sampleText.includes("vendite") || sampleText.includes("sales");
          const hasTel = sampleText.includes("router") || sampleText.includes("antenna") || sampleText.includes("ip") || sampleText.includes("switch") || sampleText.includes("fibra") || sampleText.includes("banda") || sampleText.includes("ping") || sampleText.includes("network") || sampleText.includes("telecom");
          const hasLog = sampleText.includes("hub") || sampleText.includes("camion") || sampleText.includes("spedizione") || sampleText.includes("container") || sampleText.includes("flotta") || sampleText.includes("logistica") || sampleText.includes("delivery") || sampleText.includes("shipping") || sampleText.includes("carrier");

          if (hasFin) {
            sectorStr = "Finanza / Commodity / Mercati";
            sectorBriefStr = "Finanza";
          } else if (hasRet) {
            sectorStr = "Retail / Abbigliamento / Magazzino";
            sectorBriefStr = "Retail";
          } else if (hasTel) {
            sectorStr = "Telecomunicazioni / Infrastrutture IT";
            sectorBriefStr = "Telecomunicazioni";
          } else if (hasLog) {
            sectorStr = "Logistica / Supply Chain";
            sectorBriefStr = "Logistica";
          } else {
            sectorStr = "Analisi Dati Universale";
            sectorBriefStr = "Universale";
          }

          setDetectedSector(sectorStr);
          setSectorBrief(sectorBriefStr);

          // Get a sample of the data (first 3 rows)
          const dataSample = allLines.slice(1, 4).join('\n');

          const assetListSample = uniqueEntities.length > 0 ? uniqueEntities.slice(0, 3).join(', ') : 'Oro, Platino, Petrolio';
          const firstQuestion = `Ho rilevato i tuoi asset finanziari, che verranno analizzati TUTTI insieme in parallelo (${assetListSample}). \nPer ciascuno di essi ci sono ${numNumericColumns} colonne storiche di dati disponibili (es. i vari periodi o metriche). \n\nDOMANDA 1: Quante di queste ${numNumericColumns} colonne storiche sequenziali (partendo dalla prima a sinistra) vuoi includere nella simulazione quantistica attuale? Scegli un numero da 1 a ${numNumericColumns}.`;

          const fileInfoMsg = `[SISTEMA: SCANSIONE SEMANTICA FLESSIBILE COMPLETATA]

• Settore Calibrato: **${sectorStr}**
• Associazione Ruoli Colonne:
  - *Colonne Date/Indici Escluse*: ${dateCols.length > 0 ? dateCols.join(', ') : 'Nessuna'}
  - *Colonne Entità/Descrittive*: ${entityCols.length > 0 ? entityCols.join(', ') : 'Nessuna (i nomi delle colonne numeriche fungeranno direttamente da Asset)'}
  - *Colonne Numeriche (Variabili/Importi storici)*: ${numericCols.length > 0 ? numericCols.join(', ') : 'Nessuna'}
• Asset / Articoli Identificati: ${uniqueEntities.slice(0, 8).join(', ')}${uniqueEntities.length > 8 ? '...' : ''} (Totale: ${uniqueEntities.length})

Campione Dati (prime 3 righe):
${dataSample}

---

**Analisi Iniziale Completata con Successo.**
Procediamo all'intervista dinamica per la compilazione del circuito quantistico.

**DOMANDA 1:** ${firstQuestion}`;
          
          // Clear file input so it can be re-uploaded if needed
          if (fileInputRef.current) fileInputRef.current.value = '';
          
          handleSend(fileInfoMsg);
        } else {
          addMessage('bot', "Il file sembra essere vuoto o non correttamente formattato.");
        }
      } catch (err) {
        console.error("CSV Parse error:", err);
        addMessage('bot', "Si è verificato un errore durante l'analisi del file CSV. Assicurati che sia in formato testo.");
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const resetAll = () => {
    setMessages([]);
    setJsonConfig('');
    setPythonCode('');
    setQasmCode('');
    setCsvHeaders([]);
    setCurrentFile(null);
    // Remove reload to stay in the component
  };

  const isInterviewComplete = !!(jsonConfig || pythonCode || qasmCode);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-700 max-w-7xl mx-auto pb-12 px-4 sm:px-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-black/60 p-6 rounded-3xl border border-white/10 backdrop-blur-3xl shadow-2xl">
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ rotate: sectorRotationIndex * 360 }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-quantum-primary/10 rounded-2xl border border-quantum-primary/20 flex items-center justify-center shadow-lg shadow-quantum-primary/5 shrink-0 cursor-pointer"
            onClick={() => setSectorRotationIndex(prev => prev + 1)}
            title="Sfoglia settore quantistico (Clicca per girare)"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCyclingSector}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {getIconForSector(currentCyclingSector)}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tighter flex items-center gap-x-2">
              <span className="relative inline-block min-w-[130px] sm:min-w-[170px] h-[32px] overflow-hidden align-middle">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={currentCyclingSector}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center"
                  >
                    {currentCyclingSector}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-quantum-primary font-normal">
                {currentCyclingSector === 'Assicurazioni' ? 'Quantum Risk Engine' : 'Quantum Advisor'}
              </span>
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-gray-500 font-mono text-[9px] uppercase tracking-widest min-h-[14px] flex items-center">
                {getSubtextForSector(currentCyclingSector)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            className="p-2 bg-red-500/20 rounded-lg border border-red-500/50 animate-pulse group relative"
            title="Guida Quantum Engine"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <div className="absolute hidden group-hover:block top-full right-0 mt-2 w-64 p-3 bg-black/90 border border-red-500/30 rounded-xl z-50 text-[10px] text-gray-300 normal-case">
              Carica un CSV con decimali a punto e segui l'intervista per generare i circuiti quantistici.
            </div>
          </button>
          <button 
            onClick={resetAll}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/5 transition-all flex items-center gap-2 text-[10px] font-bold uppercase"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {/* Copia Registro Intervista Completa - Compact single line banner */}
      {messages.length > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-2.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-2xl text-[10px] sm:text-xs font-mono text-gray-400 transition-all select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-quantum-primary animate-pulse" />
            <span className="uppercase text-white font-bold tracking-wider">Registro Dialogo AI</span>
            <span className="opacity-60">| {messages.filter(m => m.id !== 'start').length} domande e risposte</span>
          </div>
          <button
            onClick={() => {
              const textContent = messages
                .filter(m => {
                  const t = m.text.trim();
                  return !t.startsWith('[ERRORE') && !t.includes('Quota esaurita') && !t.includes('Riprova tra');
                })
                .map(m => `[${m.role === 'user' ? 'UTENTE' : 'ASSISTENTE QUANTUM'}]\n${m.text}`)
                .join('\n\n');
              copyToClipboard(textContent, 'interview');
            }}
            className="flex items-center gap-2 px-3 py-1 bg-quantum-primary/10 hover:bg-quantum-primary/20 text-quantum-primary border border-quantum-primary/30 rounded-xl transition-all font-bold uppercase text-[9px] tracking-wide cursor-pointer"
            title="Copia l'intera conversazione"
          >
            {copiedType === 'interview' ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-500" />
                Intervista Copiata!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copia Domande e Risposte
              </>
            )}
          </button>
        </div>
      )}

      {isInterviewComplete ? (
        <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-500">
          
          {/* RIGA INTERA: SINTESI E TRASCRITTO COMPLETO DELL'INTERVISTA */}
          <div className="bg-black/60 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 backdrop-blur-3xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-4 gap-2">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-quantum-primary animate-pulse" />
                <span className="text-xs font-black text-white uppercase tracking-widest">Cronologia e Registro dell'Intervista Quantistica</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Intervista Completata con Successo</span>
              </div>
            </div>
            
            {/* Scrollable conversation log inside the row */}
            <div className="max-h-[250px] overflow-y-auto pr-2 space-y-3 scrollbar-hide">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-4 p-4 rounded-2xl text-[12px] leading-relaxed border ${
                    m.role === 'user'
                      ? 'bg-quantum-secondary/5 border-quantum-secondary/20 text-quantum-secondary ml-12'
                      : 'bg-white/[0.02] border-white/10 text-gray-300 mr-12'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg h-fit shrink-0 ${m.role === 'user' ? 'bg-quantum-secondary/10' : 'bg-quantum-primary/10'}`}>
                    {m.role === 'user' ? <User className="w-3.5 h-3.5 text-quantum-secondary" /> : <Bot className="w-3.5 h-3.5 text-quantum-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[9px] text-gray-500 uppercase mb-1">{m.role === 'user' ? 'Utente' : 'Assistente Quantistico'}</p>
                    <p className="whitespace-pre-line">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TWO COLUMNS CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* INVASO 1: CODICE PYTHON / QISKIT */}
            <div className="flex flex-col bg-black shadow-2xl rounded-3xl overflow-hidden border border-quantum-primary/30 min-h-[500px] max-h-[700px]">
              <div className="border-b border-white/10 bg-white/5 flex items-center justify-between p-4 px-6">
                <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-quantum-primary" />
                  [START_PYTHON] WORKSPACE CODICE PYTHON (QISKIT)
                </span>
                <button
                  onClick={() => copyToClipboard(pythonCode || dynamicCodes.python, 'python')}
                  className="p-2 bg-black/60 hover:bg-white/10 rounded-xl text-gray-400 hover:text-quantum-primary transition-all border border-white/10 flex items-center gap-2 text-[10px] font-mono"
                  title="Copia codice Python"
                >
                  {copiedType === 'python' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      COPIATO
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      COPIA
                    </>
                  )}
                </button>
              </div>
              <div className="p-6 flex-1 overflow-auto bg-black/40 font-mono text-[11px] leading-relaxed text-quantum-primary/90 scrollbar-hide">
                <pre className="whitespace-pre">
                  <code>{pythonCode || dynamicCodes.python}</code>
                </pre>
              </div>
            </div>

            {/* INVASO 2: CIRCUITO OPENQASM / COMPOSER */}
            <div className="flex flex-col bg-black shadow-2xl rounded-3xl overflow-hidden border border-amber-500/30 min-h-[500px] max-h-[700px]">
              <div className="border-b border-white/10 bg-white/5 flex items-center justify-between p-4 px-6">
                <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-500" />
                  [START_COMPOSER] CIRCUITO OPENQASM IBM ENGINE
                </span>
                <button
                  onClick={() => copyToClipboard(qasmCode || dynamicCodes.qasm, 'qasm')}
                  className="p-2 bg-black/60 hover:bg-white/10 rounded-xl text-gray-400 hover:text-amber-500 transition-all border border-white/10 flex items-center gap-2 text-[10px] font-mono"
                  title="Copia codice OpenQASM"
                >
                  {copiedType === 'qasm' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      COPIATO
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      COPIA
                    </>
                  )}
                </button>
              </div>
              <div className="p-6 flex-1 overflow-auto bg-black/40 font-mono text-[11px] leading-relaxed text-amber-500/90 scrollbar-hide">
                <pre className="whitespace-pre">
                  <code>{qasmCode || dynamicCodes.qasm}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full animate-in fade-in duration-500">
          {/* CHAT INTERVIEW AREA */}
          <div className="h-[650px] flex flex-col bg-black/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-quantum-primary" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Intervista Strategica</span>
              </div>
              {currentFile && (
                <div className="flex items-center gap-2 px-3 py-1 bg-quantum-primary/10 rounded-full border border-quantum-primary/20 animate-in zoom-in-95 duration-250">
                  <BarChart4 className="w-3 h-3 text-quantum-primary" />
                  <span className="text-[9px] text-quantum-primary font-mono uppercase truncate max-w-[120px]">{currentFile.name}</span>
                  <button
                    onClick={() => {
                      const url = URL.createObjectURL(currentFile);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = currentFile.name;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="p-1 hover:bg-white/10 rounded text-quantum-primary hover:text-white transition-all ml-1 border border-white/5 bg-black/40"
                    title="Scarica il file CSV sul tuo dispositivo"
                  >
                    <Download className="w-3 h-3 animate-pulse" />
                  </button>
                </div>
              )}
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide min-h-0"
            >
              <AnimatePresence>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-4 max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`p-2.5 rounded-xl h-fit shrink-0 ${m.role === 'user' ? 'bg-quantum-secondary/20' : 'bg-quantum-primary/20'}`}>
                        {m.role === 'user' ? <User className="w-4 h-4 text-quantum-secondary" /> : <Bot className="w-4 h-4 text-quantum-primary" />}
                      </div>
                      <div className={`p-4 rounded-2xl text-[12px] leading-relaxed relative ${
                        m.role === 'user' 
                          ? 'bg-quantum-secondary/10 border border-quantum-secondary/30 text-quantum-secondary' 
                          : 'bg-white/5 border border-white/10 text-gray-300'
                      }`}>
                        <p className="whitespace-pre-line">{m.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isProcessing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex gap-4">
                      <div className="p-2.5 rounded-xl bg-quantum-primary/20 h-fit">
                        <Bot className="w-4 h-4 text-quantum-primary animate-pulse" />
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-quantum-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-quantum-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-quantum-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono italic">AI is processing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                {errorStatus && !isProcessing && messages.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className={`flex ${messages[messages.length-1].role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col gap-2 items-center">
                      <button
                        onClick={() => {
                          const safeMessage = lastUserMessage || messages.filter(m => m.role === 'user').pop()?.text;
                          if (safeMessage) {
                            handleSend(safeMessage);
                          }
                        }}
                        disabled={retryCountdown > 0 || isProcessing}
                        className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 text-[10px] font-bold uppercase ${
                          retryCountdown > 0 
                            ? 'bg-gray-500/20 border-gray-500/30 text-gray-500 cursor-not-allowed' 
                            : 'bg-quantum-primary/20 hover:bg-quantum-primary text-quantum-primary hover:text-black border-quantum-primary/50'
                        }`}
                      >
                        <RotateCcw className={`w-3 h-3 ${retryCountdown > 0 ? '' : 'animate-spin-slow'}`} /> 
                        {retryCountdown > 0 ? `Attendi ${retryCountdown}s` : 'Riprova ora'}
                      </button>
                      {errorStatus === 429 && retryCountdown > 0 && (
                        <span className="text-[9px] text-gray-500 font-mono italic animate-pulse shadow-sm">
                          Sincronizzazione con i server Google in corso...
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-6 bg-black/40 border-t border-white/10 space-y-4 shrink-0">
              {/* MESSAGGIO SISTEMA - Front-end standard feedback output banner */}
              <div id="messaggio-sistema" className="font-mono text-center text-[10px] tracking-wider transition-all duration-300"></div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-gray-400 transition-all hover:text-quantum-primary group"
                  title="Carica CSV"
                >
                  <UploadCloud className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".csv" />
                </button>
                <div className="flex-1 relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={currentFile ? "Rispondi all'assistente..." : "Inizia l'intervista..."}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-quantum-primary/50 transition-all"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isProcessing}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-quantum-primary text-black rounded-xl hover:scale-110 active:scale-95 transition-all disabled:opacity-30"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
