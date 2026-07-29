export type SectorId = 'finance' | 'insurance' | 'logistics' | 'energy' | 'telecom' | 'manufacturing' | 'mitigation' | 'translator' | 'crosscode' | 'quantumbi' | 'quantum_code' | 'pqc_group' | 'pqc_locker' | 'pqc_keygen' | 'pqc_chat' | 'realq' | 'large' | 'various' | 'send_to_ibm';

export interface Sector {
  id: SectorId;
  name: string;
  icon: string;
  description: string;
  focus: string;
  variablesLabel: string;
  stressEvent: string;
  placeholder?: string;
  isSpecial?: boolean;
}

export type LanguageCode = 'it' | 'en' | 'zh' | 'ja' | 'ko' | 'de' | 'fr' | 'es' | 'ru' | 'uk';

export const LANGUAGES: Array<{ code: LanguageCode; label: string }> = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'Inglese' },
  { code: 'zh', label: 'Cinese' },
  { code: 'ja', label: 'Giapponese' },
  { code: 'ko', label: 'Coreana' },
  { code: 'de', label: 'Tedesco' },
  { code: 'fr', label: 'Francese' },
  { code: 'es', label: 'Spagnolo' },
  { code: 'ru', label: 'Russo' },
  { code: 'uk', label: 'Ucraino' },
];

export interface DeepInsight {
  label: string;
  value: string;
  description: string;
  type?: 'volatility' | 'confidence' | 'protection' | 'resolution';
}

export interface SimulationResult {
  summary: string;
  configSummary: {
    mode: 'File-Driven' | 'Manual' | 'Special';
    activeAssets: number;
    totalQubits: number;
  };
  quantumConfidence: number;
  recommendedAlgorithm: string;
  comparison: {
    classical: { label: string; value: number; unit: string };
    quantum: { label: string; value: number; unit: string };
    improvement: number;
  };
  matrix: Array<{ name: string; weight: number; insight: string }>;
  metrics: Array<{ label: string; value: number; unit: string; trend: 'up' | 'down' | 'neutral' }>;
  stressImpact: string;
  fidelity: number;
  speedup: number;
  deepInsights?: DeepInsight[];
  logisticsData?: {
    nodes: Array<{ name: string; x: number; y: number; type: 'hub' | 'delivery' }>;
    optimizedRoute: string[];
    routeExplanation: string;
  };
}

export const SECTORS: Sector[] = [
  {
    id: 'translator',
    name: 'Quantum Translator',
    icon: 'Languages',
    description: 'Traduci tra Python (Qiskit), OpenQASM e Composer Visivo.',
    focus: 'Quantum Code Translation',
    variablesLabel: 'Circuit Logic',
    stressEvent: 'Sintassi Errata',
    isSpecial: true,
  },
  {
    id: 'finance',
    name: 'Banca',
    icon: 'Landmark',
    description: 'Analisi del rischio e scenari predittivi ultra-veloci. Ottimizzazione portafoglio, pricing derivati e fraud detection.',
    focus: 'Ottimizzazione & Risk Analysis',
    variablesLabel: 'Variabili/Modelli',
    placeholder: 'es: Pricing Opzioni, Fraud Pattern A, Ribilanciamento High-Yield...',
    stressEvent: 'USD Crash (Crollo del Dollaro)',
    isSpecial: true,
  },
  {
    id: 'insurance',
    name: 'Assicurazioni',
    icon: 'ShieldCheck',
    description: 'Underwriting granulare, modellazione catastrofi e ottimizzazione riserve Solvency II via Quantum ML.',
    focus: 'Risk Classification & ALM',
    variablesLabel: 'Input di Rischio',
    placeholder: 'es: Dati IoT Salute, Modelli Climatici 2030, Solvency II Gap...',
    stressEvent: 'Picco di Sinistralità Catastrofale',
  },
  {
    id: 'logistics',
    name: 'Logistica',
    icon: 'Truck',
    description: 'Ottimizzazione rotte "Last Mile" e configurazioni magazzino tra miliardi di possibilità in tempo reale.',
    focus: 'Last-Mile & Route Opt',
    variablesLabel: 'Nodi/Rotte',
    placeholder: 'es: Consegne Milano Centro, Hub Malpensa, Corrieri Zona 4...',
    stressEvent: 'Interruzione Supply Chain Mondiale',
  },
  {
    id: 'telecom',
    name: 'Telecom',
    icon: 'Rss',
    description: 'Gestione delle frequenze e del traffico nelle reti 6G ad altissima densità per minimizzare le latenze.',
    focus: '6G Network Opt',
    variablesLabel: 'Frequenze/Celle',
    stressEvent: 'Solar Flare (Tempesta Solare)',
  },
  {
    id: 'manufacturing',
    name: 'Manifattura',
    icon: 'Factory',
    description: 'Ottimizzazione processi di assemblaggio robotico per ridurre i tempi morti al millisecondo.',
    focus: 'Robotic Assembly Opt',
    variablesLabel: 'Processi/Robot',
    stressEvent: 'Hardware Failure Totale',
  },
  {
    id: 'energy',
    name: 'Energia',
    icon: 'Wand2',
    description: 'Bilancia la smart grid e l\'integrazione delle rinnovabili gestendo la volatilità meteorologica.',
    focus: 'Grid Balancing',
    variablesLabel: 'Punti di Rete',
    stressEvent: 'Grid Blackout (Blackout Totale)',
  },
  {
    id: 'mitigation',
    name: 'Gestione rumore',
    icon: 'Zap',
    description: 'Pulisci il rumore NISQ e ottimizza il codice per hardware reale (IBM, Google).',
    focus: 'Quantum Error Mitigation',
    variablesLabel: 'Gate/Qubit',
    stressEvent: 'Decoerenza Termica',
    isSpecial: true,
  },
  {
    id: 'crosscode',
    name: 'Cross Code',
    icon: 'Terminal',
    description: 'Analisi e cross-compilazione tra algoritmi quantistici e codice classico ad alte prestazioni.',
    focus: 'Quantum-Classical Interop',
    variablesLabel: 'Hybrid Logic',
    stressEvent: 'Memory Leak',
    isSpecial: true,
  },
  {
    id: 'quantumbi',
    name: 'Quantum BI',
    icon: 'TableProperties',
    description: 'Business Intelligence Quantistica: Analizza file CSV complessi e trasforma i dati in algoritmi di ottimizzazione.',
    focus: 'Data-Driven Quantum Analysis',
    variablesLabel: 'CSV Columns',
    stressEvent: 'Data Corruption',
    isSpecial: true,
  },

  {
    id: 'pqc_group',
    name: 'pqc_cryptography',
    icon: 'ShieldCheck',
    description: 'Strumenti avanzati di crittografia post-quantistica basata su standard NIST.',
    focus: 'Quantum-Safe Security',
    variablesLabel: 'Security Params',
    stressEvent: 'Quantum Decryption',
    isSpecial: true,
  },
  {
    id: 'pqc_locker',
    name: 's_pqc_locker_name',
    icon: 'Lock',
    description: 'Post-Quantum Crypto-Locker: Cifra file e testi con standard NIST ML-KEM-768.',
    focus: 'Quantum-Safe Encryption',
    variablesLabel: 'Payload Data',
    stressEvent: 'Brute Force Attack',
    isSpecial: true,
  },
  {
    id: 'pqc_keygen',
    name: 's_pqc_keygen_name',
    icon: 'Key',
    description: 'Generatore di coppie di chiavi Quantum-Resistant basato su reticoli (ML-KEM).',
    focus: 'Quantum Key Management',
    variablesLabel: 'Security Level',
    stressEvent: 'Key Compromise',
    isSpecial: true,
  },
  {
    id: 'pqc_chat',
    name: 's_pqc_chat_name',
    icon: 'MessageSquare',
    description: 'Chat sicura usa-e-getta protetta da scambi di chiavi post-quantistici.',
    focus: 'Secure Communication',
    variablesLabel: 'Session Entropy',
    stressEvent: 'Man-in-the-middle',
    isSpecial: true,
  },
  {
    id: 'realq',
    name: 'HELP',
    icon: 'HelpCircle',
    description: 'Hardware Gateway: Invia i tuoi circuiti direttamente ai processori quantistici IBM e monitora i job in tempo reale.',
    focus: 'Quantum Hardware Integration',
    variablesLabel: 'Jobs/Qasm',
    stressEvent: 'Network Latency',
    isSpecial: true,
  },
  {
    id: 'large',
    name: 'LARGE',
    icon: 'Cpu',
    description: 'Interfaccia Quantistica B2B Universale per l\'elaborazione di scenari macroeconomici e codice Qiskit.',
    focus: 'Universal Code Generation',
    variablesLabel: 'Scenario Params',
    stressEvent: 'Quantum Collapse',
    isSpecial: true,
  },
  {
    id: 'various',
    name: 'VARIOUS',
    icon: 'Globe',
    description: 'Motore Quantistico Eterogeneo per l\'interconnessione globale e l\'analisi dell\'effetto farfalla.',
    focus: 'Heterogeneous Entanglement',
    variablesLabel: 'Heterogeneous Sources',
    stressEvent: 'Butterfly Effect Peak',
    isSpecial: true,
  },
  {
    id: 'quantum_code',
    name: 'Write Q Code',
    icon: 'Code2',
    description: 'Accedi agli strumenti avanzati di sviluppo e analisi quantistica.',
    focus: 'Quantum Development Suite',
    variablesLabel: 'Code Modules',
    stressEvent: 'Compilation Fail',
    isSpecial: true,
  },

];
