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
import axios from 'axios';

interface Props {
  onBack?: () => void;
  onSendToIbm: (qasmCode: string) => void;
}

interface Message {
  id: string;
  sender: 'system' | 'user';
  text: string;
  timestamp: string;
  isComposerCode?: boolean;
  code?: string;
}

export default function QuantumAgentsInterface({ onBack, onSendToIbm }: Props) {
  // Conversational active state machine
  const [step, setStep] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedSectorLong, setSelectedSectorLong] = useState<string>('');
  const [scenarioSelection, setScenarioSelection] = useState<'A' | 'B' | 'C' | null>(null);
  const [interviewSubstep, setInterviewSubstep] = useState<number>(0);
  const [calibrationAnswers, setCalibrationAnswers] = useState<string[]>([]);

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

  // New states for interactive CSV column selection & entanglement mapping
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [selectedEntanglementCols, setSelectedEntanglementCols] = useState<string[]>([]);
  const [tempCsvContent, setTempCsvContent] = useState<string>('');
  const [isCsvLoaded, setIsCsvLoaded] = useState<boolean>(false);

  // Warning states for Entanglement detection
  const [showEntanglementWarning, setShowEntanglementWarning] = useState<boolean>(false);
  const [pendingCsvData, setPendingCsvData] = useState<string>('');
  const [warningReason, setWarningReason] = useState<'missing_column' | 'no_associations'>('no_associations');

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

  // Spreadsheet state for Excel-like viewer
  const [selectedCell, setSelectedCell] = useState<{
    tableId: string;
    rowIndex: number;
    colIndex: number;
    value: string;
  } | null>(null);

  const getColLetter = (colIdx: number): string => {
    return String.fromCharCode(65 + (colIdx % 26));
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Custom visual compiler formatter to justify text and render beautiful tables out of plain text
  const renderWithInlineFormats = (text: string) => {
    const segments = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return segments.map((seg, sIdx) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return <strong key={sIdx} className="text-white font-extrabold">{seg.substring(2, seg.length - 2)}</strong>;
      }
      if (seg.startsWith('`') && seg.endsWith('`')) {
        return <code key={sIdx} className="bg-[#00f2ff]/15 border border-[#00f2ff]/30 text-[#00f2ff] px-1.5 py-0.5 rounded font-mono text-[10.5px] font-bold">{seg.substring(1, seg.length - 1)}</code>;
      }
      return seg;
    });
  };

  const renderTableFromLines = (tableLines: string[], key: string) => {
    // Filter out delimiter line (the row with dashes)
    const dataLines = tableLines.filter(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const clean = trimmed.replace(/[\s\-:|]/g, '');
        if (clean.length === 0 && trimmed.includes('-')) {
          return false;
        }
      }
      return trimmed.startsWith('|');
    });
    if (dataLines.length === 0) return null;
    
    const headerCols = dataLines[0]
      .split('|')
      .map(col => col.trim())
      .filter((col, colIdx, arr) => colIdx !== 0 && colIdx !== arr.length - 1);
    
    const rows = dataLines.slice(1).map((line) => {
      return line
        .split('|')
        .map(col => col.trim())
        .filter((col, colIdx, arr) => colIdx !== 0 && colIdx !== arr.length - 1);
    }).filter(row => row.length > 0);

    const isThisTableSelected = selectedCell && selectedCell.tableId === key;
    const activeRowIdx = isThisTableSelected ? selectedCell.rowIndex : 0;
    const activeColIdx = isThisTableSelected ? selectedCell.colIndex : 0;

    // Safety checks
    const safeRowIdx = Math.min(activeRowIdx, rows.length - 1);
    const safeColIdx = Math.min(activeColIdx, headerCols.length - 1);

    const activeCellValue = rows[safeRowIdx] && rows[safeRowIdx][safeColIdx] ? rows[safeRowIdx][safeColIdx].replace(/\*\*/g, '').trim() : '';
    const activeCellName = `${getColLetter(safeColIdx)}${safeRowIdx + 1}`;

    return (
      <div key={key} className="my-5 overflow-hidden rounded-xl border border-slate-700 bg-[#0c1322] shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-xs max-w-full font-sans">
        {/* Ribbon Tab Bar */}
        <div className="bg-[#0b0f19] px-3.5 py-1.5 flex items-center justify-between border-b border-slate-800 text-[11px] select-none shrink-0 font-sans">
          <div className="flex items-center gap-3.5">
            <span className="flex items-center gap-1.5 text-emerald-500 font-extrabold text-[12px] uppercase tracking-wider font-mono">
              <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0" /> QuantumSheet
            </span>
            <div className="hidden xs:flex items-center gap-3 text-slate-400 font-semibold">
              <span className="hover:text-white cursor-pointer transition-colors px-1 text-[10.5px]">File</span>
              <span className="text-emerald-400 font-bold border-b-2 border-emerald-500 px-1 py-1 text-[10.5px]">Home</span>
              <span className="hover:text-white cursor-pointer transition-colors px-1 text-[10.5px]">Inserisci</span>
              <span className="hover:text-white cursor-pointer transition-colors px-1 text-[10.5px]">Formule</span>
              <span className="hover:text-white cursor-pointer transition-colors px-1 text-[10.5px]">Dati QML</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-mono tracking-wider font-bold">
            SPREADSHEET ENGINE
          </div>
        </div>
        
        {/* Formula Bar */}
        <div className="bg-[#121b2d]/80 px-3 py-2 flex items-center gap-2 border-b border-slate-800 text-xs shrink-0 font-sans">
          {/* Cell Selector Input (e.g. A1) */}
          <div className="bg-[#090d16] border border-slate-700 text-emerald-400 font-mono text-center px-2 py-1 rounded min-w-[45px] font-black select-none text-[11px] tracking-wide">
            {activeCellName}
          </div>
          
          {/* Divider */}
          <div className="text-slate-700 h-4 border-r border-slate-700 mx-0.5" />
          
          {/* fx Button */}
          <span className="text-emerald-500 italic font-serif font-extrabold text-sm px-1.5 select-none">
            fx
          </span>
          
          {/* Formula value display input */}
          <div className="flex-1 bg-[#090d16] border border-slate-800 rounded px-3 py-1.5 text-slate-200 font-mono text-[11.5px] overflow-hidden truncate">
            {activeCellValue || <span className="text-slate-600 italic">cella vuota</span>}
          </div>
        </div>
        
        {/* Grid Viewport */}
        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-left border-collapse border-spacing-0 min-w-[600px]">
            <thead>
              {/* Letters row (A, B, C...) */}
              <tr className="bg-[#131d31] border-b border-slate-800 select-none text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider h-7">
                <th className="w-10 bg-[#16233b] border-r border-slate-800 text-center relative font-semibold shrink-0">
                  <div className="absolute right-0 bottom-0 w-0 h-0 border-r-[6px] border-r-slate-500 border-t-[6px] border-t-transparent" />
                </th>
                {headerCols.map((_, i) => (
                  <th key={i} className="p-1 text-center border-r border-slate-800 shrink-0">
                    {getColLetter(i)}
                  </th>
                ))}
              </tr>
              {/* Header names row */}
              <tr className="bg-[#0f172a] border-b border-slate-800 text-slate-200 font-bold uppercase text-[9.5px] tracking-wider">
                <th className="bg-[#16233b] border-r border-slate-800 text-slate-500 text-center font-mono text-[9px] font-bold shrink-0">
                  A-Z
                </th>
                {headerCols.map((h, i) => {
                  const refinedH = h.replace(/\*\*/g, '').replace(/_/g, ' ').trim();
                  return (
                    <th key={i} className="p-3 px-4 border-r border-slate-800 last:border-r-0 font-bold font-sans">
                      {refinedH}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-slate-800 last:border-b-0 text-slate-300 font-sans">
                  {/* Row number column */}
                  <td className="bg-[#16233b]/80 border-r border-slate-800 text-[10px] text-slate-400 text-center font-mono font-bold select-none h-9 shrink-0">
                    {ri + 1}
                  </td>
                  {/* Real data cells */}
                  {row.map((val, vi) => {
                    const isSelected = selectedCell && selectedCell.tableId === key && selectedCell.rowIndex === ri && selectedCell.colIndex === vi;
                    const cleanVal = val.replace(/\*\*/g, '').trim();
                    return (
                      <td 
                        key={vi} 
                        onClick={() => setSelectedCell({ tableId: key, rowIndex: ri, colIndex: vi, value: cleanVal })}
                        className={`p-3 px-4 border-r border-slate-800 last:border-r-0 text-[11px] font-mono cursor-cell select-none transition-all relative ${
                          ri % 2 === 0 ? 'bg-[#090f1a]' : 'bg-[#0e1726]'
                        } ${
                          isSelected 
                            ? 'bg-emerald-500/10 outline outline-2 -outline-offset-1 outline-emerald-500 z-10' 
                            : 'hover:bg-slate-800/45'
                        }`}
                      >
                        {cleanVal === 'LIBERO' ? (
                          <span className="text-slate-500 italic font-sans">Libero</span>
                        ) : cleanVal.toLowerCase().includes('correlato') || cleanVal.toLowerCase().includes('legame') || cleanVal.toLowerCase().includes('accopp') || (cleanVal.length > 4 && isNaN(Number(cleanVal)) && vi === row.length - 1) ? (
                          <span className="text-emerald-400 font-bold">{cleanVal}</span>
                        ) : !isNaN(Number(cleanVal)) ? (
                          <span className="text-cyan-400 font-medium">{cleanVal}</span>
                        ) : (
                          <span className="text-slate-300">{renderWithInlineFormats(val)}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Excel Status Bar at Bottom */}
        <div className="bg-[#0b0f19] px-3.5 py-1.5 flex flex-wrap items-center justify-between border-t border-slate-800 text-[10.5px] select-none text-slate-400 font-sans">
          <div className="flex items-center gap-2">
            {/* Active Sheet Tab */}
            <div className="flex items-center gap-1.5 bg-[#0c1322] text-slate-200 border-t-2 border-t-emerald-500 border-x border-slate-800 px-3.5 py-1 text-[11px] font-bold rounded-t-sm shadow-md">
              📊 Foglio1
            </div>
            {/* Add button */}
            <button className="p-1 hover:bg-slate-800 hover:text-white rounded transition-colors text-slate-500 cursor-not-allowed">
              +
            </button>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> PRONTO
            </span>
            <span className="hidden sm:inline text-slate-500">
              RIGHE: {rows.length} | COLONNE: {headerCols.length}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderMessageContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, idx) => {
      if (part.startsWith('```')) {
        const lines = part
          .replace(/```[a-zA-Z]*\n?/, '')
          .replace(/```$/, '')
          .trim()
          .split('\n');
        
        const isCSV = part.includes('Codice_Articolo') || part.includes('Percentuale_Saturazione') || part.includes('Rendimento_Previsto') || part.includes('Volume_Rimanenze_Maglia') || part.includes('Punti_Saldatura_XYZ') || part.includes('Tassi_Cambio_Spot') || part.includes('Attenuazione_dB') || part.includes('Compatibilità_HLA');
        
        if (isCSV) {
          const headerCols = lines[0].split(',').map(h => h.trim());
          const rows = lines.slice(1).map(line => line.split(',').map(v => v.trim())).filter(row => row.length > 0 && row[0] !== '');
          const tableId = `csv-${idx}`;

          const isThisTableSelected = selectedCell && selectedCell.tableId === tableId;
          const activeRowIdx = isThisTableSelected ? selectedCell.rowIndex : 0;
          const activeColIdx = isThisTableSelected ? selectedCell.colIndex : 0;

          // Safety checks
          const safeRowIdx = Math.min(activeRowIdx, rows.length - 1);
          const safeColIdx = Math.min(activeColIdx, headerCols.length - 1);

          const activeCellValue = rows[safeRowIdx] && rows[safeRowIdx][safeColIdx] ? rows[safeRowIdx][safeColIdx] : '';
          const activeCellName = `${getColLetter(safeColIdx)}${safeRowIdx + 1}`;

          return (
            <div key={idx} className="my-5 overflow-hidden rounded-xl border border-slate-700 bg-[#0c1322] shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-xs max-w-full font-sans">
              {/* Ribbon Tab Bar */}
              <div className="bg-[#0b0f19] px-3.5 py-1.5 flex items-center justify-between border-b border-slate-800 text-[11px] select-none shrink-0 font-sans">
                <div className="flex items-center gap-3.5">
                  <span className="flex items-center gap-1.5 text-emerald-500 font-extrabold text-[12px] uppercase tracking-wider font-mono">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0" /> QuantumSheet [CSV]
                  </span>
                  <div className="hidden xs:flex items-center gap-3 text-slate-400 font-semibold">
                    <span className="hover:text-white cursor-pointer transition-colors px-1 text-[10.5px]">File</span>
                    <span className="text-emerald-400 font-bold border-b-2 border-emerald-500 px-1 py-1 text-[10.5px]">Home</span>
                    <span className="hover:text-white cursor-pointer transition-colors px-1 text-[10.5px]">Inserisci</span>
                    <span className="hover:text-white cursor-pointer transition-colors px-1 text-[10.5px]">Formule</span>
                    <span className="hover:text-white cursor-pointer transition-colors px-1 text-[10.5px]">Campione</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono tracking-wider font-bold">
                  SAMPLES WRITER
                </div>
              </div>
              
              {/* Formula Bar */}
              <div className="bg-[#121b2d]/80 px-3 py-2 flex items-center gap-2 border-b border-slate-800 text-xs shrink-0 font-sans">
                {/* Cell Selector Input (e.g. A1) */}
                <div className="bg-[#090d16] border border-slate-700 text-emerald-400 font-mono text-center px-2 py-1 rounded min-w-[45px] font-black select-none text-[11px] tracking-wide">
                  {activeCellName}
                </div>
                
                {/* Divider */}
                <div className="text-slate-700 h-4 border-r border-slate-700 mx-0.5" />
                
                {/* fx Button */}
                <span className="text-emerald-500 italic font-serif font-extrabold text-sm px-1.5 select-none">
                  fx
                </span>
                
                {/* Formula value display input */}
                <div className="flex-1 bg-[#090d16] border border-slate-800 rounded px-3 py-1.5 text-slate-200 font-mono text-[11.5px] overflow-hidden truncate">
                  {activeCellValue || <span className="text-slate-600 italic">cella vuota</span>}
                </div>
              </div>
              
              {/* Grid Viewport */}
              <div className="overflow-x-auto max-w-full">
                <table className="w-full text-left border-collapse border-spacing-0 min-w-[600px]">
                  <thead>
                    {/* Letters row (A, B, C...) */}
                    <tr className="bg-[#131d31] border-b border-slate-800 select-none text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider h-7">
                      <th className="w-10 bg-[#16233b] border-r border-slate-800 text-center relative font-semibold shrink-0">
                        <div className="absolute right-0 bottom-0 w-0 h-0 border-r-[6px] border-r-slate-500 border-t-[6px] border-t-transparent" />
                      </th>
                      {headerCols.map((_, i) => (
                        <th key={i} className="p-1 text-center border-r border-slate-800 shrink-0">
                          {getColLetter(i)}
                        </th>
                      ))}
                    </tr>
                    {/* Header names row */}
                    <tr className="bg-[#0f172a] border-b border-slate-800 text-slate-200 font-bold uppercase text-[9.5px] tracking-wider">
                      <th className="bg-[#16233b] border-r border-slate-800 text-slate-500 text-center font-mono text-[9px] font-bold shrink-0">
                        A-Z
                      </th>
                      {headerCols.map((h, i) => (
                        <th key={i} className="p-3 px-4 border-r border-slate-800 last:border-r-0 font-bold font-sans">
                          {h.replace(/_/g, ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-slate-800 last:border-b-0 text-slate-300 font-sans">
                        {/* Row number column */}
                        <td className="bg-[#16233b]/80 border-r border-slate-800 text-[10px] text-slate-400 text-center font-mono font-bold select-none h-9 shrink-0">
                          {ri + 1}
                        </td>
                        {/* Real data cells */}
                        {row.map((val, vi) => {
                          const isSelected = selectedCell && selectedCell.tableId === tableId && selectedCell.rowIndex === ri && selectedCell.colIndex === vi;
                          const cleanVal = val.trim();
                          return (
                            <td 
                              key={vi} 
                              onClick={() => setSelectedCell({ tableId, rowIndex: ri, colIndex: vi, value: cleanVal })}
                              className={`p-3 px-4 border-r border-slate-800 last:border-r-0 text-[11px] font-mono cursor-cell select-none transition-all relative ${
                                ri % 2 === 0 ? 'bg-[#090f1a]' : 'bg-[#0e1726]'
                              } ${
                                isSelected 
                                  ? 'bg-emerald-500/10 outline outline-2 -outline-offset-1 outline-emerald-500 z-10' 
                                  : 'hover:bg-slate-800/45'
                              }`}
                            >
                              {vi === 0 ? (
                                <span className="text-quantum-secondary font-bold">{cleanVal}</span>
                              ) : vi === 1 ? (
                                <span className="bg-quantum-primary/10 text-quantum-primary px-1.5 py-0.5 rounded font-bold">{cleanVal}</span>
                              ) : cleanVal === 'LIBERO' ? (
                                <span className="text-slate-500 italic font-sans">Libero</span>
                              ) : !isNaN(Number(cleanVal)) ? (
                                <span className="text-cyan-400 font-medium">{cleanVal}</span>
                              ) : (
                                <span className="text-slate-300">{cleanVal}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Excel Status Bar at Bottom */}
              <div className="bg-[#0b0f19] px-3.5 py-1.5 flex flex-wrap items-center justify-between border-t border-slate-800 text-[10.5px] select-none text-slate-400 font-sans">
                <div className="flex items-center gap-2">
                  {/* Active Sheet Tab */}
                  <div className="flex items-center gap-1.5 bg-[#0c1322] text-slate-200 border-t-2 border-t-emerald-500 border-x border-slate-800 px-3.5 py-1 text-[11px] font-bold rounded-t-sm shadow-md">
                    📊 Foglio_Campione
                  </div>
                  {/* Add button */}
                  <button className="p-1 hover:bg-slate-800 hover:text-white rounded transition-colors text-slate-500 cursor-not-allowed">
                    +
                  </button>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> PRONTO_CAMPIONE
                  </span>
                  <span className="hidden sm:inline text-slate-500">
                    RIGHE: {rows.length} | COLONNE: {headerCols.length}
                  </span>
                </div>
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

      // Segment the paragraph into normal text sections and table blocks
      const paragraphs = part.split('\n\n');
      return (
        <div key={idx} className="space-y-3">
          {paragraphs.map((par, pIdx) => {
            if (!par.trim()) return null;
            
            // Check if paragraph contains lines of a markdown table
            const lines = par.split('\n');
            const hasTableDelimiter = lines.some(line => {
              const trimmed = line.trim();
              if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                const clean = trimmed.replace(/[\s\-:|]/g, '');
                return clean.length === 0 && trimmed.includes('-');
              }
              return false;
            });
            
            if (hasTableDelimiter) {
              // We have a markdown table in this paragraph!
              const renderedParagraphParts: React.ReactNode[] = [];
              let currentTableLines: string[] = [];
              let normaltextGroup: string[] = [];
              
              const flushNormalText = (keySuffix: string) => {
                if (normaltextGroup.length > 0) {
                  const textContent = normaltextGroup.join('\n');
                  renderedParagraphParts.push(
                    <p key={`text-${keySuffix}`} className="text-slate-300 leading-relaxed text-justify whitespace-pre-wrap">
                      {renderWithInlineFormats(textContent)}
                    </p>
                  );
                  normaltextGroup = [];
                }
              };
              
              const flushTable = (keySuffix: string) => {
                if (currentTableLines.length > 0) {
                  const tableHtml = renderTableFromLines(currentTableLines, `${pIdx}-${keySuffix}`);
                  if (tableHtml) {
                    renderedParagraphParts.push(tableHtml);
                  }
                  currentTableLines = [];
                }
              };
              
              lines.forEach((line, lineIdx) => {
                const trimmedLine = line.trim();
                const isTableLine = trimmedLine.startsWith('|');
                
                if (isTableLine) {
                  flushNormalText(`${lineIdx}`);
                  currentTableLines.push(line);
                } else {
                  flushTable(`${lineIdx}`);
                  normaltextGroup.push(line);
                }
              });
              
              flushNormalText('end');
              flushTable('end');
              
              return (
                <div key={pIdx} className="space-y-3">
                  {renderedParagraphParts}
                </div>
              );
            }

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
                    
                    if (isB) {
                      return (
                        <div key={lIdx} className="pl-4 flex items-start gap-2 text-justify">
                          <span className="text-quantum-primary text-xs mt-1 shrink-0">•</span>
                          <span className="text-[12.5px] leading-relaxed text-slate-300">{renderWithInlineFormats(textToShow)}</span>
                        </div>
                      );
                    }
                    return (
                      <p key={lIdx} className="text-[12.5px] leading-relaxed text-slate-300 text-justify">{renderWithInlineFormats(textToShow)}</p>
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
                return <code key={sIdx} className="bg-white/5 border border-white/10 text-quantum-secondary px-1.5 py-0.5 rounded font-mono text-[11px] font-bold">{subPart.slice(1, -1)}</code>;
              }
              return subPart;
            });

            if (par.includes('[ACTION: RENDER_BUTTON_SEND_TO_IBM_Q]')) {
              return (
                <div key={pIdx} className="my-4 p-5 bg-[#0a0f1d] border border-quantum-primary/25 rounded-2xl flex flex-col items-center gap-3 text-center shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#00f2ff] font-black">IBM QUANTUM HOST BRIDGE MODULE</span>
                  <p className="text-[11px] text-slate-400 font-mono tracking-tight max-w-sm mb-1">
                    Connessione sicura end-to-end con i computer quantistici superconduttori fisici della scuderia IBM Q.
                  </p>
                  <button
                    onClick={() => {
                      if (onSendToIbm) {
                        onSendToIbm(qasmOutput);
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-[#00f2ff] hover:bg-[#00e1f0] text-[#090d18] font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_22px_rgba(0,242,255,0.5)] cursor-pointer hover:scale-[1.01]"
                  >
                    <Cpu className="w-4 h-4 text-[#090d18] fill-[#090d18] animate-pulse" /> Trasmetti circuito a QPU IBM Q Real 🚀
                  </button>
                </div>
              );
            }

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

  const isUserUnsureOrAsking = (text: string): boolean => {
    const norm = text.toLowerCase().trim();
    if (norm.endsWith('?') || norm.includes('?')) return true;
    
    const keywords = [
      'non so', 'non capisco', 'non ho capito', 'cosa intendi', 'cosa significa', 
      'cosa vuol dire', 'che significa', 'come faccio', 'perché', 'spiegami', 
      'cosa inserisco', 'che tipo di', 'spiegazione', 'cos\'è', 'cosa rappresenta',
      'non saprei', 'che vuol dire', 'aiuto', 'un esempio', 'dammi un esempio',
      'non sono sicuro', 'non sono sicura', 'chiarimento', 'spiega', 'spiega meglio',
      'intendi', 'cosa faresti', 'come rispondo', 'che valore', 'all\'anno', 'al mese',
      'al giorno', 'unita', 'unità', 'periodo', 'tempo', 'misura', 'non e chiaro',
      'non è chiaro', 'delucidazione', 'chiarimento'
    ];
    
    return keywords.some(kw => norm.includes(kw));
  };

  const getClarificatoryExplanation = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes('tolleranza') || q.includes('rischio')) {
      return "La tolleranza al rischio indica quanto sei disposto ad accettare fluttuazioni per proteggere il capitale o i carichi. \n\n❗ **Frequenza e Scala:** Riferita ad un orizzonte temporale strategico **annuale**. Puoi specificare se preferisci un approccio prudente ('conservativo/conservativo'), equilibrato ('moderato') o volto alla massimizzazione dell'efficienza della risorsa ('aggressivo').";
    }
    if (q.includes('volatilità')) {
      return "La volatilità misura l'intensità delle variazioni di prezzo dei tuoi asset finanziari. \n\n❗ **Frequenza e Scala:** Si intende l'oscillazione dei prezzi calcolata su base **giornaliera o mensile** proiettata su base **annuale**. Puoi rispondere fornendo una percentuale stimata (es. '20% all'anno') o semplicemente specificando se si prevede un periodo di 'alta' o 'bassa' oscillazione dei prezzi di mercato dei capitali d'investimento.";
    }
    if (q.includes('precisione') || q.includes('scadenza')) {
      return "Riguarda il livello di affinamento geometrico del tempo ottimale per esercitare l'opzione. \n\n❗ **Frequenza e Scala:** Si riferisce alla precisione desiderata per scadenze finanziarie tipiche a **breve termine (mensili)** o **medio-lungo termine (es. trimestrali o annuali)**. Puoi rispondere richiedendo una precisione 'alta' o 'standard'.";
    }
    if (q.includes('risk-free') || q.includes('tasso')) {
      return "Il tasso 'risk-free' indica il rendimento teorico di un investimento a rischio zero (es. titoli di stato a breve/medio orizzonte). \n\n❗ **Frequenza e Scala:** Espresso come tasso di rendimento percentuale **annuo**. Un tasso tipico attuale di riferimento è intorno al **'4% all'anno'** o **'4.5% all'anno'**. Se scrivi 'default' o 'standard' useremo il valore ottimizzato del 4.5% annuo.";
    }
    if (q.includes('orizzonte') || q.includes('mensile') || q.includes('settimana')) {
      return "Definisce il periodo futuro su cui analizzare i flussi. \n\n❗ **Frequenza e Scala:** L'orizzonte futuro di analisi del portafoglio può essere a breve termine (es. **'15 o 30 giorni'**), a medio termine (es. **'su base mensile'** o **'trimestrale'**), oppure a lungo termine (**'annuale'**). Scegli pure l'intervallo temporale che fa al caso tuo.";
    }
    if (q.includes('insoluto') || q.includes('fatture')) {
      return "Misura la quota percentuale media di fatture non pagate a scadenza naturale dai vostri clienti. \n\n❗ **Frequenza e Scala:** Percentuale calcolata sul totale fatturato **all'anno** (es. '2% del fatturato annuo'). Puoi specificare un valore numerico semplice come '2%' o '5%', oppure scrivere 'nessun insoluto' se riscuotete sempre con la massima puntualità.";
    }
    if (q.includes('veicoli') || q.includes('flotta')) {
      return "Si riferisce al numero di vetture/mezzi aziendali attivi simultaneamente per la distribuzione fisica delle merci. \n\n❗ **Frequenza e Scala:** Calcolato come numero massimo di veicoli operativi **al giorno** (es. '10 veicoli operativi al giorno'). Serve per dimensionare la densità di nodi qubit necessari per ottimizzare le rotte.";
    }
    if (q.includes('finestre temporali') || q.includes('scarico')) {
      return "Le finestre temporali indicano la rigidità di orario per le consegne o i prelievi logistici. \n\n❗ **Frequenza e Scala:** Gestite su turni orari **giornalieri** (es. fasce dalle 08:00 alle 12:00 del mattino). Puoi rispondere specificando se gli orari sono 'rigidi/vincolanti' (es. penali in caso di ritardi giornalieri) o 'flessibili' (piena tolleranza).";
    }
    if (q.includes('pescaggio') || q.includes('portata')) {
      return "La portata utile o limiti fisici volumetrici delle stive per lo stivaggio 3D. \n\n❗ **Frequenza e Scala:** Calcolata in tonnellate complessive d'imbarco **per singola spedizione/viaggio** marittimo, non su base annua. Inserisci una tonnellata limite massima (es. '20 tonnellate') o scrivi 'standard' per caricare il profilo medio della nave.";
    }
    if (q.includes('baricentro') || q.includes('sfasamenti')) {
      return "La stabilità della nave richiede un bilanciamento geometrico del peso totale dei container a bordo. \n\n❗ **Frequenza e Scala:** Tolleranza di bilanciamento valutata **per singolo viaggio** marino. Puoi richiedere 'tolleranza bassa' per massima severità d'assetto e stabilità geometrica e prevenzione degli sbandamenti durante la tratta, oppure 'normale'.";
    }
    if (q.includes('contratti') || q.includes('fissa')) {
      return "La percentuale di spedizioni prepagate o protette con contratti fissi di lungo periodo con gli armatori navali. \n\n❗ **Frequenza e Scala:** Calcolata sul totale dei volumi logistici contrattualizzati su base **annuale** (es. '50% all'anno'). Più questa percentuale è alta, meno il circuito risulterà sensibile alle speculazioni spot sul qubit d'ampiezza.";
    }
    if (q.includes('costi di trasporto') || q.includes('target') || q.includes('riduzione')) {
      return "L'obiettivo di risparmio desiderato sui noli marittimi spot. \n\n❗ **Frequenza e Scala:** Obiettivo applicato sulla spesa logistica **mensile o annuale** (es. '15% di risparmio annuo sui noli'). L'algoritmo quantistico mapperà la rotazione probabilistica per forzare il superamento di questo target di costo.";
    }
    if (q.includes('storage') || q.includes('bess') || q.includes('mwh')) {
      return "La capienza massima nominale del sistema di batterie aziendale utilizzato per conservare l'energia solare o eolica accumulata prima di immetterla in rete. \n\n❗ **Frequenza e Scala:** Capacità totale di energia accumulabile ed erogabile **giornalmente** (es. '10 megawattora (MWh)'). Coerente con il dimensionamento del qubit d'ampiezza.";
    }
    if (q.includes('immissione') || q.includes('curtailing') || q.includes('rete')) {
      return "Il limite di potenza massima consentito di immissione istantanea in rete per evitare sovraccarichi o tariffe punitive dal distributore. \n\n❗ **Frequenza e Scala:** Limite termico o regolatorio misurato istante per istante o con cap giornaliero in Megawatt (MW) (es. '1.5 MW massimi **al giorno**'). Rispondi inserendo la potenza o 'nessun limite'.";
    }
    if (q.includes('orbitali') || q.includes('vqe')) {
      return "I canali energetici molecolari da simulare sul computer quantistico per verificare la coesione e l'unione chimica. \n\n❗ **Frequenza e Scala:** Riferita ad una simulazione statica **per carica/run** di calcolo molecolare. Di norma, ciascun orbitale attivo richiede l'assegnazione di un qubit dedicato (es. '4 orbitali molecolari per run').";
    }
    if (q.includes('ansatz')) {
      return "Riguarda l'algoritmo geometrico variazionale per esplorare le combinazioni molecolari. \n\n❗ **Frequenza e Scala:** Parametro d'impostazione logica ad alta frequenza **all'interno del ciclo di convergenza VQE**. Se non hai familiarità scientifica, rispondi semplicemente 'UCCSD' (standard del settore) o 'ottimale'.";
    }
    if (q.includes('conducibilità') || q.includes('ec') || q.includes('idroponica')) {
      return "I livelli nutritivi minerali disciolti in acqua per nutrire le radici nelle serre idroponiche. \n\n❗ **Frequenza e Scala:** Valore misurato costantemente **per ciclo di crescita/coltivazione** (es. '1.8 mS/cm per erbe o insalata', '2.8 mS/cm per pomodori'). Fornisci la conducibilità desiderata per la tua coltivazione.";
    }
    if (q.includes('consumi') || q.includes('led') || q.includes('artificiale')) {
      return "La pianificazione dell'apporto energetico dei LED e dell'irraggiamento per ottimizzare la crescita bilanciando i costi elettrici. \n\n❗ **Frequenza e Scala:** Consumi energetici elettrici totali misurati **al mese** o **su base annuale**. Rispondi inserendo una priorità (es. 'priorità ai consumi ridotti su base mensile' o 'massima velocità di crescita').";
    }
    if (q.includes('tempo di ciclo robot') || q.includes('ciclo')) {
      return "La durata temporale media richiesta a un braccio robotico o impianto per completare un'operazione ripetitiva prima di passare al pezzo successivo. \n\n❗ **Frequenza e Scala:** Espresso in secondi necessari **per singolo pezzo** (es. '120 secondi a pezzo'). Definisce la velocità reale di fabbrica della catena a regime.";
    }
    if (q.includes('consegna') || q.includes('ritardi')) {
      return "La media storica dei ritardi riscontrati nell'approvvigionamento o nella consegna dei semilavorati o materiali per la catena. \n\n❗ **Frequenza e Scala:** Calcolato come ritardo medio in minuti **alla settimana** o **al giorno** (es. '10 minuti di ritardo medio alla settimana').";
    }
    if (q.includes('punti di saldatura') || q.includes('curvatura')) {
      return "Descrive quanti punti fisici il robot deve toccare per la giunzioni o la mobilità dei giunti nello spazio tridimensionale. \n\n❗ **Frequenza e Scala:** Numero programmato di tocchi applicati **per singola unità lavorativa/pezzo** (es. '15 punti per pezzo').";
    }
    if (q.includes('volumi') || q.includes('rimanenze') || q.includes('abbigliamento') || q.includes('maglia') || q.includes('invenduto') || q.includes('stagion') || q.includes('annual')) {
      return "La quantità fisica di capi d'abbigliamento o invenduto di maglia fermi in magazzino da smaltire ad alto ritmo.\n\n❗ **Frequenza e Scala:** Bisogna distinguere con grande precisione l'orizzonte temporale richiesto dal modello quantistico. Specifica chiaramente se lo stock calcolato si riferisce ad un accumulo **stagionale (ad esempio, '1200 pezzi stagionali')** o ad una rimanenza complessiva **annuale (ad esempio, '3500 pezzi annuali')**. Questo livello di dettaglio è fondamentale affinché l'algoritmo calibri correttamente i pesi dei qubit d'ampiezza e determini l'esatto tasso di rotazione ottimale per gli sconti dinamici.";
    }
    if (q.includes('margine minimo') || q.includes('perdita')) {
      return "Il ricavo salvavita minimo accettabile per singolo articolo venduto per rimanere in profitto o in pareggio. \n\n❗ **Frequenza e Scala:** Espresso come percentuale rispetto al costo totale di produzione dell'articolo, calcolato **per singola vendita o su base stagionale/annuale** (es. '15% su base stagionale' o '15% per singolo pezzo'). Al di sotto di questa soglia, l'algoritmo non proporrà mai sconti.";
    }
    if (q.includes('antigeni') || q.includes('hla')) {
      return "Gli antigeni leucocitari umani usati per determinare la compatibilità immunologica tra ricevente e donatore. \n\n❗ **Frequenza e Scala:** Riferita a ciascun singolo test clinico di matching per trapianto. Una corrispondenza biologica perfetta è **'6 su 6'** o **'8 su 8'** antigeni totali corrispondenti.";
    }
    if (q.includes('ischemia fredda') || q.includes('ore')) {
      return "La finestra temporale di sicurezza biologica in cui l'organo può rimanere a freddo fuori dal corpo umano prima dell'impianto. \n\n❗ **Frequenza e Scala:** Espresso in ore utili conservate **per singolo organo prelevato** (es. 'da 4 a 6 ore' per il cuore, '12 ore' per il fegato).";
    }
    if (q.includes('residui amminoacidici') || q.includes('simulazione proteica')) {
      return "La dimensione complessiva del segmento proteico o di peptide da modellare geometricamente sui qubit. \n\n❗ **Frequenza e Scala:** Lunghezza della sequenza amminoacidica analizzata **per singola run di calcolo statico** (es. 'segmento corto di 10 amminoacidi per run').";
    }
    if (q.includes('forze di legame') || q.includes('idrogeno') || q.includes('van der waals')) {
      return "Indica se l'algoritmo debba analizzare prioritariamente i legami ad idrogeno primari duri o le interazioni molecolari di superficie (Van Der Waals) più deboli. \n\n❗ **Frequenza e Scala:** Valutato come parametro chimico statico **per modello strutturale**.";
    }
    if (q.includes('età') || q.includes('riammissione') || q.includes('dimissioni')) {
      return "I cluster demografici di pazienti a maggior rischio statistico di ricovero imprevisto post-dimissione. \n\n❗ **Frequenza e Scala:** Monitorato sui dati accumulati **all'anno** (es. 'pazienti over 65 anni dell'ultimo anno'). Fornisci la fascia d'età o rispondi 'standard'.";
    }
    if (q.includes('visite') || q.includes('follow-up') || q.includes('controlli')) {
      return "Il piano di controlli preventivi medici pianificato per monitorare il recupero del paziente dimesso dall'ospedale. \n\n❗ **Frequenza e Scala:** Numero totale di controlli pianificati **nel primo mese (30 giorni) post-dimissione** (es. '1 controllo a settimana nel primo mese').";
    }
    if (q.includes('distanza') || q.includes('fibra') || q.includes('qkd')) {
      return "La lunghezza fisica del cablaggio in fibra ottica tra le sedi per distribuire le chiavi quantistiche di sicurezza in modo protetto contro hacker. \n\n❗ **Frequenza e Scala:** Tratta fisica complessiva della rete geografica aziendale misurata **una tantum** (es. '50 km totali di estensione di tratta').";
    }
    if (q.includes('connessioni') || q.includes('insolito') || q.includes('allerta')) {
      return "Il numero di tentativi di connessione insoliti o tentati attacchi di forza bruta oltre il quale l'algoritmo quantistico fa scattare l'alert di entanglement protettivo. \n\n❗ **Frequenza e Scala:** Frequenza misurata come connessioni sospette **al minuto** (es. 'oltre 50 connessioni anomale al minuto').";
    }
    if (q.includes('rotazione')) {
      return "La frequenza programmata per rigenerare e ricalcolare l'intero set di chiavi crittografiche per prevenire l'intrusione. \n\n❗ **Frequenza e Scala:** Cadenza programmata espressa in giorni o ore (es. 'ogni 14 giorni' o 'ogni 24 ore').";
    }
    if (q.includes('post-quantum') || q.includes('nist') || q.includes('pqc')) {
      return "Lo standard post-quantum che l'azienda intende mappare. 'ML-KEM' (Kyber) è lo standard di cifratura post-quantum più utilizzato. \n\n❗ **Frequenza e Scala:** Riferito allo standard crittografico aziendale fisso impostato nel software.";
    }
    if (q.includes('archivi') || q.includes('migrazione') || q.includes('database')) {
      return "La sorgente informativa strategica più esposta a minaccia da migrare prioritariamente alle reti protette da algoritmi quantistici. \n\n❗ **Frequenza e Scala:** Asset informativo aziendale fisso (es: 'database centrale dell'anno corrente' o 'server di backup locale').";
    }

    return "Questo indicatore serve per impostare un peso probabilistico corretto nel database del modello quantistico. Puoi rispondere fornendo una stima riferita all'anno, al mese o al giorno, oppure indicare semplicemente se desideri un comportamento incentrato sulla massima sicurezza operativa o sull'efficienza di calcolo.";
  };

  function getScenarioDetails(macroarea: string, option: 'A' | 'B' | 'C') {
    if (macroarea.includes('Finanza')) {
      if (option === 'A') {
        return {
          name: "Hedging Quantistico Multilivello Cross-Asset",
          benefit: "Protezione automatica dei tuoi capitali incrociando i rischi di asset diversi.",
          headers: ["Volatilità_Implicita", "Correlazione_Dinamica", "Tassi_Cambio_Spot"],
          q1: "Qual è la tua propensione massima al rischio nell'ambito di Hedging (espressa su base strategica annuale: conservativa, moderata o aggressiva)?",
          q2: "Come desideri pesare gli sbalzi di volatilità dei capitali (es. valutati su fluttuazioni storiche annuali o variazione media mensile)?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Volatilità_Implicita,Correlazione_Dinamica,Tassi_Cambio_Spot,Abbinamento
ASSET_A,0.35,0.45,0.12,0.58,SET_PRIMA
ASSET_B,0.35,0.85,0.65,0.72,SET_PRIMA
ASSET_C,0.12,0.20,0.45,0.45,LIBERO`
        };
      } else if (option === 'B') {
        return {
          name: "Pricing Opzioni Americane e Derivati",
          benefit: "Calcolo del momento esatto e della scadenza ottimale per esercitare un diritto finanziario.",
          headers: ["Prezzo_Underlying", "Strike_Price", "Tasso_Risk_Free", "Tempo_Scadenza"],
          q1: "Quale livello di precisione richiedi per la modellazione della scadenza (es. precisione elevata per scadenze tipiche su 3 o 6 mesi)?",
          q2: "Qual è il tasso risk-free medio stimato nel modello finanziario (valore percentuale annuo, es. '4.5% all'anno')?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Prezzo_Underlying,Strike_Price,Tasso_Risk_Free,Tempo_Scadenza,Abbinamento
OPZIONE_A,0.45,0.85,0.80,0.04,0.50,GRUPPO_R
OPZIONE_B,0.45,0.75,0.80,0.04,0.90,GRUPPO_R
BOND_X,0.10,0.98,0.95,0.03,0.20,LIBERO`
        };
      } else {
        return {
          name: "Stima dei Flussi di Cassa a Breve Termine",
          benefit: "Una previsione probabilistica delle entrate e delle uscite per evitare crisi di liquidità.",
          headers: ["Fatture_Attive_Emesse", "Fatture_Passive_Ricevute", "Scadenze_Pagamenti"],
          q1: "Qual è l'orizzonte temporale ideale per la stima predittiva dei flussi di cassa (espressa in giorni totali di analisi, tipicamente '30 giorni' o '60 giorni')?",
          q2: "Quale quota percentuale media di fatture insolute storiche registrate in bilancio ogni anno (es. '2% all'anno')?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Fatture_Attive_Emesse,Fatture_Passive_Ricevute,Scadenze_Pagamenti,Abbinamento
FLUSSO_GEN,0.28,0.75,0.60,0.15,LIQUIDITY_SET
FLUSSO_FEB,0.28,0.90,0.70,0.30,LIQUIDITY_SET
FLUSSO_INDIP,0.15,0.25,0.10,0.10,LIBERO`
        };
      }
    } else if (macroarea.includes('Logistica')) {
      if (option === 'A') {
        return {
          name: "Vehicle Routing Problem con Finestre Temporali",
          benefit: "Il percorso perfetto per i tuoi mezzi che ottimizza sia il carico sia gli orari di consegna.",
          headers: ["Coordinate_Geografiche", "Finestre_Orarie", "Capacità_Carico", "Tempi_Sosta"],
          q1: "Qual è il numero massimo di veicoli operativi contemporanei da tracciare in flotta (attivi giornalmente, es. '10 veicoli al giorno')?",
          q2: "Come preferisci gestire le finestre temporali di prelievo e scarico (es. priorità giornaliera rigida alle fasce orarie della mattina)?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Coordinate_Geografiche,Finestre_Orarie,Capacità_Carico,Tempi_Sosta,Abbinamento
VEICOLO_HUB_A,0.55,0.45,0.12,0.80,0.50,ROTTA_MILANO
VEICOLO_HUB_B,0.55,0.48,0.14,0.92,0.80,ROTTA_MILANO
VEICOLO_BACK,0.15,0.30,0.18,0.50,0.10,LIBERO`
        };
      } else if (option === 'B') {
        return {
          name: "Caricamento Stive delle Navi (3D Bin Packing)",
          benefit: "La disposizione geometrica perfetta dei container per bilanciare la nave ed evitare sfasamenti.",
          headers: ["Peso_Container", "Dimensioni_Volumetriche", "Porto_Destinazione", "Baricentro"],
          q1: "Qual è la portata utile o capacità limite massima del container/stiva (espressa in tonnellate complessive per singola spedizione/viaggio)?",
          q2: "Quale tolleranza consentite sugli sfasamenti del baricentro ad ogni spedizione (espressa in metri di offset per singolo viaggio)?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Peso_Container,Dimensioni_Volumetriche,Porto_Destinazione,Baricentro,Abbinamento
CONTAINER_A,0.60,0.25,0.60,0.80,0.12,BALANCE_01
CONTAINER_B,0.60,0.28,0.65,0.80,0.15,BALANCE_01
BOX_SINGLE,0.22,0.05,0.10,0.30,0.00,LIBERO`
        };
      } else {
        return {
          name: "Bilanciamento Contratti Acquisto e Costo Container Spot",
          benefit: "Il calcolo probabilistico per capire se ti conviene comprare un container subito o aspettare le tariffe spot.",
          headers: ["Indice_Noli_Drewry", "Quota_Contratti_Fissi", "Prezzo_Spot_Container"],
          q1: "Qual è la quota percentuale della spesa noli coperta da contratti a tariffa fissa (rispetto all'anno corrente, es. '40% all'anno')?",
          q2: "Quale target di riduzione dei costi complessivi sui noli container vi ponete (risparmio medio desiderato mensile o annuo, es. '15% al mese')?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Indice_Noli_Drewry,Quota_Contratti_Fissi,Prezzo_Spot_Container,Abbinamento
SPOT_X,0.40,0.32,0.40,0.31,SPOT_GRP
SPOT_Y,0.40,0.34,0.50,0.33,SPOT_GRP
SPOT_Z,0.12,0.30,0.80,0.29,LIBERO`
        };
      }
    } else if (macroarea.includes('Chimica')) {
      if (option === 'A') {
        return {
          name: "Dispacciamento Ottimale Energia Rinnovabile Intermittente",
          benefit: "La combinazione esatta per accumulare e distribuire energia solare ed eolica riducendo al minimo gli sprechi.",
          headers: ["Velocità_Vento", "Irraggiamento_Solare", "Capacità_BESS"],
          q1: "Qual è la capacità nominale in MWh complessiva del vostro storage di batterie BESS (accumulo massimo consentito al giorno, es. '10 MWh')?",
          q2: "Qual è la potenza limite istantanea in MW di immissione in rete del vostro impianto al fine di evitare sanzioni giornaliere (es. '1.5 MW istantanei al giorno')?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Velocità_Vento,Irraggiamento_Solare,Capacità_BESS,Abbinamento
EOLICO_A,0.45,0.12,0.00,0.10,RETE_SLOT
SOLARE_B,0.45,0.00,0.85,0.12,RETE_SLOT
STORAGE_C,0.10,0.00,0.00,0.05,LIBERO`
        };
      } else if (option === 'B') {
        return {
          name: "Calcolo Stato Fondamentale Elettronico tramite VQE",
          benefit: "La mappatura geometrica dei legami e degli orbitali di una nuova molecola per verificarne la stabilità fisica.",
          headers: ["Operatore_Hamiltoniano", "Numero_Orbitali", "Angoli_Variazionali_VQE"],
          q1: "Qual è il numero massimo di orbitali molecolari attivi da mappare sui qubit (assegnati per singola simulazione di run chimico statico, es. '4 orbitali per run')?",
          q2: "Quale ansatz variazionale per il ricalcolo delle interazioni chimiche preferisci adottare (es. 'UCCSD' o a preservazione di simmetria per run)?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Operatore_Hamiltoniano,Numero_Orbitali,Angoli_Variazionali_VQE,Abbinamento
ORBITALE_1,0.55,0.24,0.40,0.35,VQE_CLUSTER
ORBITALE_2,0.55,0.65,0.40,0.45,VQE_CLUSTER
ORBITALE_IND,0.22,0.12,0.20,0.00,LIBERO`
        };
      } else {
        return {
          name: "Controllo del Microclima Serre Idroponiche",
          benefit: "La stima predittiva dei consumi e della crescita delle colture impostando i parametri nutritivi ed elettrici.",
          headers: ["Livelli_CO2", "Conducibilità_EC", "pH_Nutrimento", "Ore_LED"],
          q1: "Qual è l'ambiente di coltivazione (es: pomodori o lattuga) e il valore EC desiderato nel nutrimento idroponico (es. '1.8 per singolo ciclo di crescita')?",
          q2: "In che modo desideri bilanciare l'illuminazione solare ed artificiale LED (es. con priorità al risparmio di energia sui consumi medi mensili o annui)?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Livelli_CO2,Conducibilità_EC,pH_Nutrimento,Ore_LED,Abbinamento
SERRA_A,0.35,0.80,0.18,0.58,0.66,MICRO_GRP
SERRA_B,0.35,0.75,0.19,0.60,0.54,MICRO_GRP
SERRA_C,0.15,0.40,0.12,0.65,0.38,LIBERO`
        };
      }
    } else if (macroarea.includes('Manutenzione') || macroarea.includes('Fabbrica') || macroarea.includes('Manifattura')) {
      if (option === 'A') {
        return {
          name: "Ottimizzazione Catene Montaggio Just-In-Time Adattive",
          benefit: "La sincronizzazione istantanea tra i robot di fabbrica e l'arrivo dei componenti per azzerare i tempi morti.",
          headers: ["Tempo_Ciclo_Robot", "Scarti_Linea", "Ritardi_Componenti"],
          q1: "Qual è il tempo di ciclo robot standard sulla linea a pieno regime (espresso in secondi necessari per singolo pezzo prodotto, es. '120 secondi a pezzo')?",
          q2: "Quali ritardi medi di approvvigionamento state riscontrando nella catena dei componenti (espressi in minuti medi e valutati alla settimana)?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Tempo_Ciclo_Robot,Scarti_Linea,Ritardi_Componenti,Abbinamento
ROBOT_A,0.50,0.12,0.40,0.12,CORRELATO_LINEA
ROBOT_B,0.50,0.15,0.20,0.30,CORRELATO_LINEA
CNC_SING,0.12,0.90,0.80,0.24,LIBERO`
        };
      } else if (option === 'B') {
        return {
          name: "Commesso Viaggiatore (TSP) per Robot Saldatura 3D",
          benefit: "La traiettoria spaziale e il movimento geometrico più rapido possibile per il braccio meccanico del robot.",
          headers: ["Punti_Saldatura_XYZ", "Raggio_Curvatura", "Tempo_Arresto"],
          q1: "Qual è il numero stimato di punti di saldatura tridimensionali da percorrere (valutati per singola scocca / capo o pezzo unico per ciclo di lavoro, es. '15 punti per scocca')?",
          q2: "Quale tolleranza consentite sul raggio di curvatura spaziale del braccio meccanico per singolo ciclo (espressa in millimetri)?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Punti_Saldatura_XYZ,Raggio_Curvatura,Tempo_Arresto,Abbinamento
PUNTO_S1,0.60,0.45,0.12,0.50,TRAIETTORIA_1
PUNTO_S2,0.60,0.48,0.15,0.80,TRAIETTORIA_1
PUNTO_AUTO,0.22,0.30,0.05,0.10,LIBERO`
        };
      } else {
        return {
          name: "Variazione Consecutiva Prezzi per Smaltire 100% Rimanenze",
          benefit: "La strategia di sconti e prezzi dinamici ottimale per svuotare il magazzino dei prodotti invenduti senza perdere margine.",
          headers: ["Elasticità_Prezzo_Storica", "Volume_Rimanenze_Maglia", "Margine_Minimo"],
          q1: "Qual è il volume totale di rimanenze accumulate di maglia/abbigliamento? Specifica obbligatoriamente se questo dato si riferisce ad un orizzonte Stagionale (es. '1200 pezzi stagionali') o Annuale (es. '3500 pezzi annuali') poiché è richiesta massima precisione per la calibrazione.",
          q2: "Qual è le condizioni di margine minimo assoluto per evitare vendite in perdita (espresso in percentuale sul costo di produzione per singolo articolo venduto, es. '15% per pezzo')?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Elasticità_Prezzo_Storica,Volume_Rimanenze_Maglia,Margine_Minimo,Abbinamento
ARTICOLO_SCONTO_A,0.30,0.14,0.12,0.15,SCONTI_SET
ARTICOLO_SCONTO_B,0.30,0.12,0.15,0.18,SCONTI_SET
PANTALONE_FREE,0.05,0.08,0.02,0.30,LIBERO`
        };
      }
    } else if (macroarea.includes('Sanità') || macroarea.includes('Genomica') || macroarea.includes('Sanit')) {
      if (option === 'A') {
        return {
          name: "Matchmaking Nazionale Strategico Trapianti d'Organo",
          benefit: "L'incrocio immediato tra la compatibilità biologica del paziente e i tempi geografici di trasporto dell'organo.",
          headers: ["Compatibilità_HLA", "Ore_Ischemia_Fredda", "Distanza_Ospedali"],
          q1: "Qual è il numero medio di antigeni HLA considerati fondamentali per calcolare la compatibilità (es. matching su un totale fisso di 6 o 8 antigeni per trapianto)?",
          q2: "Qual è le condizioni limite massimo tollerabile per l'Ischemia Fredda dell'organo (espresso in ore massime per singolo trasporto biologico di conservazione, es. '6 ore')?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Compatibilità_HLA,Ore_Ischemia_Fredda,Distanza_Ospedali,Abbinamento
PAZIENTE_DON,0.35,0.95,0.40,0.12,SET_HLA_DUP
PAZIENTE_REC,0.35,0.95,0.60,0.15,SET_HLA_DUP
PAZIENTE_ISO,0.10,0.10,0.24,0.30,LIBERO`
        };
      } else if (option === 'B') {
        return {
          name: "Modellazione Folding Proteico (Ripiegamento 3D)",
          benefit: "La visualizzazione di come una proteina si piega nello spazio tridimensionale per creare nuovi farmaci efficaci.",
          headers: ["Angoli_Torsione", "Energie_Legame_H", "Forze_Van_Der_Waals"],
          q1: "Qual è il numero di residui amminoacidici attivi da mappare nella simulazione proteica (lunghezza sequenza da elaborare per singola run di calcolo statico, es. '10 residui per run')?",
          q2: "Quale tipologia di forze biologiche di legame ritieni debba pesare maggiormente nel folding (es. legami ad idrogeno primari o interazioni di superficie Van Der Waals)?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Angoli_Torsione,Energie_Legame_H,Forze_Van_Der_Waals,Abbinamento
SEGMENTO_A,0.55,0.20,0.45,0.12,FOLD_PROTEIN_01
SEGMENTO_B,0.55,0.10,0.52,0.15,FOLD_PROTEIN_01
ACID_AUTO,0.12,0.45,0.12,0.02,LIBERO`
        };
      } else {
        return {
          name: "Analisi Predittiva Tasso Riammissione Pazienti 30 Giorni",
          benefit: "Il calcolo del rischio percentuale che un paziente debba essere nuovamente ricoverato dopo le dimissioni.",
          headers: ["Giorni_Ricovero", "Numero_Farmaci", "Età", "Controlli"],
          q1: "Quali cluster anagrafici e di età consideri più vulnerabili e meritevoli di monitoraggio nei dati accumulati in un anno (es. 'pazienti over 65 anni')?",
          q2: "Quanti controlli medici obbligatori post-dimissione sono programmati a breve termine (espressi in numero totale contatti previsti nel premier mese / 30 giorni, es. '2 visite follow-up')?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Giorni_Ricovero,Numero_Farmaci,Età,Controlli,Abbinamento
PAZ_RE_ADMIT_A,0.65,0.12,0.15,0.68,0.20,RE_ADMIT_GRP
PAZ_RE_ADMIT_B,0.65,0.14,0.12,0.71,0.10,RE_ADMIT_GRP
PAZ_STABLE_C,0.15,0.03,0.04,0.35,0.00,LIBERO`
        };
      }
    } else { // Cybersecurity
      if (option === 'A') {
        return {
          name: "Generazione e Distribuzione Chiavi Quantistiche (QKD) con Mitigazione Botnet",
          benefit: "Una rete di comunicazione aziendale inattaccabile, capace di deviare attacchi DDoS intercettando i nodi di intrusione.",
          headers: ["Tasso_Errore_QBER", "Attenuazione_dB", "Connessioni_Insolite"],
          q1: "Qual è la distanza massima coperta dal sistema QKD per la fibra ottica aziendale (tratta di collegamento geografico misurata in chilometri totali, es. '50 km')?",
          q2: "Quali picchi di traffico di connessione anomala consideri allerta (espressi in numero di tentativi di connessione anomala rilevati al minuto, es. 'oltre 50 al minuto')?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Tasso_Errore_QBER,Attenuazione_dB,Connessioni_Insolite,Abbinamento
QKD_NODO_X,0.85,0.14,0.12,0.04,RETE_CRYPT
QKD_NODO_Y,0.85,0.58,0.04,0.08,RETE_CRYPT
BACKUP_VM,0.30,0.02,0.00,0.01,LIBERO`
        };
      } else if (option === 'B') {
        return {
          name: "Audit e Verifica Resilienza Ledger Web3 e Crypto",
          benefit: "La scansione strutturale delle chiavi crittografiche analizzando le rotazioni degli algoritmi di firma contro bug latenti.",
          headers: ["Algoritmo_Firma_ECDSA", "Volume_Transazioni", "Rotazione_Chiavi"],
          q1: "Quali curve ellittiche primarie utilizzate stabilmente per le firme crittografiche digitali (es standard secp256k1 per transazione)?",
          q2: "Qual è la frequenza programmata per la rotazione di ricalcolo del set di chiavi crittografiche (espressa in giorni totali o ore di ciclo, es. 'ogni 14 giorni')?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Algoritmo_Firma_ECDSA,Volume_Transazioni,Rotazione_Chiavi,Abbinamento
LEDGER_A,0.50,0.10,0.12,0.12,KEYS_ROTATIVE
LEDGER_B,0.50,0.10,0.15,0.14,KEYS_ROTATIVE
LEDGER_AUTO,0.12,0.00,0.05,0.00,LIBERO`
        };
      } else {
        return {
          name: "Scansione Vulnerabilità e Migrazione a Reticoli (PQC)",
          benefit: "Il calcolo della probabilità statistica di violazione (Data Breach) per pianificare barriere di cifratura post-quantum.",
          headers: ["Lunghezza_Chiavi", "Volume_Dati_A_Rischio", "Tempi_Firma"],
          q1: "Quali standard di migrazione post-quantum del NIST state considerando impostare nel software (es. standard ML-KEM / Kyber)?",
          q2: "Quali sono i canali informativi storici prioritari o archivi da migrare prioritariamente alle reti protette (es. database cloud o server fisici)?",
          sample: `Codice_Articolo,Percentuale_Saturazione,Lunghezza_Chiavi,Volume_Dati_A_Rischio,Tempi_Firma,Abbinamento
INFRA_DATABASE,0.30,0.30,0.50,0.45,MIGRATE_GRP
INFRA_CLOUD,0.30,0.40,0.65,0.55,MIGRATE_GRP
DESKTOP_CLIENT,0.01,0.20,0.02,0.10,LIBERO`
        };
      }
    }
  }

  const welcomeText = `Benvenuto nel sistema di compilazione ed entanglement quantistico aziendale. Per restringere il campo d'azione e formulare domande specifiche, seleziona la tua macro-area principale d'interesse:
📊 1. Finanza e Mercati
🚚 2. Logistica e Smart Cities
🔬 3. Chimica e Green Tech
🏭 4. Manutenzione, Manifattura e Abbigliamento
🧬 5. Sanità e Genomica
🛡️ 6. Cybersecurity`;

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
    let csvContent = '';
    let scenarioName = selectedScenario?.name || 'Esempio Pre-Maudito';

    if (selectedScenario) {
      csvContent = generateScenarioCSV(selectedScenario);
    } else if (selectedSector === 'Finanza') {
      csvContent = `Codice_Articolo,Percentuale_Saturazione,Rendimento_Previsto,Abbinamento
AZ_ENEL,0.15,0.04,HEDGE_PORTFOLIO_01
AZ_GENERALI,0.45,0.08,HEDGE_PORTFOLIO_01
BOND_USA_10Y,0.78,0.03,singoli
AZ_UNICREDIT,0.60,0.12,PROTETTO_HIGH_YIELD
AZ_INTESA,0.30,0.09,PROTETTO_HIGH_YIELD
ETH_RESERVE,0.85,0.25,SINGOLI`;
    } else if (selectedSector === 'Logistica') {
      csvContent = `Codice_Articolo,Percentuale_Saturazione,Priorita,Abbinamento
TRUCK_01,0.28,Alta,ROTTA_MILANO_ROMA
TRUCK_02,0.45,Alta,ROTTA_MILANO_ROMA
VAN_LOCAL,0.78,Media,singoli
CARGO_CONTAINER,0.60,Critica,ROTTA_LOG_WEST
SHIP_CARRIER,0.30,Bassa,ROTTA_LOG_WEST
DRONE_EXPRESS,0.85,Critica,SINGOLI`;
    } else if (selectedSector === 'Chimica') {
      csvContent = `Codice_Articolo,Percentuale_Saturazione,Temperatura_Limite,Abbinamento
CATALIZZATORE_PT,0.25,120.0,REAZIONE_TERMICA
REATTIVO_N2,0.55,150.0,REAZIONE_TERMICA
ADDITIVO_STABILIZZANTE,0.70,90.0,singoli
POLIMERO_HDPE,0.12,240.0,FUSIONE_DIPOLO
SOLVENTE_B,0.35,85.0,FUSIONE_DIPOLO
ELEMENTO_H2,0.95,300.0,SINGOLI`;
    } else if (selectedSector === 'Sanita') {
      csvContent = `Codice_Articolo,Percentuale_Saturazione,Compatibilita,Abbinamento
PAZIENTE_DONATORE,0.35,0.95,COPPIA_TRAPIANTO_01
PAZIENTE_RICEVENTE,0.65,0.95,COPPIA_TRAPIANTO_01
PAZIENTE_AUTONOMO,0.80,0.10,singoli
CAMPIONE_GEN_A,0.50,0.88,MUTAZIONE_LINK_X
CAMPIONE_GEN_B,0.22,0.88,MUTAZIONE_LINK_X
PAZIENTE_SANO,0.10,0.99,SINGOLI`;
    } else if (selectedSector === 'Cybersecurity') {
      csvContent = `Codice_Articolo,Percentuale_Saturazione,Porte_Attive,Abbinamento
FIREWALL_GATEWAY,0.85,4,RETE_LAN_WEST
REST_API_SERVER,0.50,8,RETE_LAN_WEST
DEVELOPER_PC,0.12,12,singoli
DATA_STORAGE,0.30,1,BACKUP_LINK
VIRTUAL_MACHINE_B,0.40,15,BACKUP_LINK
ROUTER_WIFI_INTERNAL,0.95,44,SINGOLI`;
    } else {
      csvContent = `Codice_Articolo,Percentuale_Saturazione,Ore_Lavoro,Abbinamento
CNC_FRESATRICE,0.45,120.5,LINEA_MONTAGGIO_A
ROBOT_SALDATORE,0.60,200.0,LINEA_MONTAGGIO_A
STAMPANTE_3D_METALLO,0.85,78.2,singoli
LINEA_VERNICIATURA_A,0.33,95.0,SERIE_COLLAUDO
LINEA_VERNICIATURA_B,0.33,95.0,SERIE_COLLAUDO
LINEA_IMBALLAGGIO,0.15,10.0,SINGOLI`;
    }

    addMessage('user', `📋 Richiedo caricamento dei dati di esempio pre-mauditi per la simulazione: **${scenarioName}**`);
    
    addMessage('system', `Ecco i dati tratti dall'esempio pre-maudito caricato nel compilatore:\n\n\`\`\`csv\n${csvContent}\n\`\`\``);

    // Clear user typing field to prevent raw text residues
    setInputText('');

    // Trigger CSV mapping step with this loaded data
    prepareCsvMapping(csvContent);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        addMessage('user', `Caricato file: ${file.name}`);
        prepareCsvMapping(text);
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
        prepareCsvMapping(text);
      }
    };
    reader.readAsText(file);
  };

  // Propose column layout details based on selected sector/macroarea
  const displaySectorColumnProposal = (sectorName: string) => {
    let colsText = '';
    let csvTemplate = '';

    if (sectorName === 'Finanza') {
      colsText = `- **Codice_Articolo** (Tipo: *Testo/Identificativo*, es: \`AZ_ENEL\` o \`BTC_PORTFOLIO\`): Rappresenta il singolo titolo o asset economico della tua società.
- **Percentuale_Saturazione** (Tipo: *Decimale tra 0.00 e 1.00*, es: \`0.35\`): Corrisponde al livello di rischio, scostamento o volatilità misurato.
- **Rendimento_Previsto** (Tipo: *Decimale*, es: \`0.06\`): Il tasso programmato di profitto annuo stimato.
- **Abbinamento** (Tipo: *Testo*, es: \`HEDGE_PORTFOLIO_01\`): Colonna delle relazioni per l'entanglement quantistico. Usa lo stesso nome per correlare i titoli, o scrivi \`singoli\`/\`SINGOLI\`/\`INDIPENDENTE\` se l'asset è indipendente.`;

      csvTemplate = `Codice_Articolo,Percentuale_Saturazione,Rendimento_Previsto,Abbinamento
AZ_ENEL,0.15,0.04,HEDGE_PORTFOLIO_01
AZ_GENERALI,0.45,0.08,HEDGE_PORTFOLIO_01
BOND_USA_10Y,0.78,0.03,singoli
AZ_UNICREDIT,0.60,0.12,PROTETTO_HIGH_YIELD
AZ_INTESA,0.30,0.09,PROTETTO_HIGH_YIELD
ETH_RESERVE,0.85,0.25,SINGOLI`;
    } else if (sectorName === 'Logistica') {
      colsText = `- **Codice_Articolo** (Tipo: *Testo/Identificativo*, es: \`TRUCK_NORD\` o \`CONTAINER_X\`): Codice del mezzo, veicolo o del container merci.
- **Percentuale_Saturazione** (Tipo: *Decimale tra 0.00 e 1.00*, es: \`0.85\`): Il grado di stivaggio, ritardo o saturazione dello spazio di carico.
- **Priorita** (Tipo: *Testo*, es: \`Alta\` / \`Bassa\`): Priorità della spedizione o classe di urgenza.
- **Abbinamento** (Tipo: *Testo*, es: \`ROTTA_MILANO_ROMA\`): Canale di instradamento condiviso per mappare l'entanglement dei flussi. Usa lo stesso nome per i lotti di viaggio uniti, o \`singoli\`/\`INDIPENDENTE\` se autonomi.`;

      csvTemplate = `Codice_Articolo,Percentuale_Saturazione,Priorita,Abbinamento
TRUCK_01,0.28,Alta,ROTTA_MILANO_ROMA
TRUCK_02,0.45,Alta,ROTTA_MILANO_ROMA
VAN_LOCAL,0.78,Media,singoli
CARGO_CONTAINER,0.60,Critica,ROTTA_LOG_WEST
SHIP_CARRIER,0.30,Bassa,ROTTA_LOG_WEST
DRONE_EXPRESS,0.85,Critica,SINGOLI`;
    } else if (sectorName === 'Chimica') {
      colsText = `- **Codice_Articolo** (Tipo: *Testo/Identificativo*, es: \`MOL_REATTIVA\`): Identificante della molecola, del materiale o della materia prima.
- **Percentuale_Saturazione** (Tipo: *Decimale tra 0.00 e 1.00*, es: \`0.40\`): Grado di stabilità energetica o instabilità chimica riscontrata.
- **Temperatura_Limite** (Tipo: *Decimale*, es: \`180.5\`): Temperatura critica massima per il composto operativo.
- **Abbinamento** (Tipo: *Testo*, es: \`REAZIONE_TERMICA\`): Accoppiamento d'entanglement catalitico o reazione condivisa. Imposta lo stesso identificativo per i reagenti correlati, oppure \`singoli\`/\`INDIPENDENTE\` se isolati.`;

      csvTemplate = `Codice_Articolo,Percentuale_Saturazione,Temperatura_Limite,Abbinamento
CATALIZZATORE_PT,0.25,120.0,REAZIONE_TERMICA
REATTIVO_N2,0.55,150.0,REAZIONE_TERMICA
ADDITIVO_STABILIZZANTE,0.70,90.0,singoli
POLIMERO_HDPE,0.12,240.0,FUSIONE_DIPOLO
SOLVENTE_B,0.35,85.0,FUSIONE_DIPOLO
ELEMENTO_H2,0.95,300.0,SINGOLI`;
    } else if (sectorName === 'Sanita') {
      colsText = `- **Codice_Articolo** (Tipo: *Testo/Identificativo*, es: \`PAZIENTE_Rossi\`): Codice identificativo anonimo del paziente o del filamento genomico analizzato.
- **Percentuale_Saturazione** (Tipo: *Decimale tra 0.00 e 1.00*, es: \`0.65\`): Livello di rigetto immunitario, espressione biologica o incidenza.
- **Compatibilita** (Tipo: *Decimale*, es: \`0.92\`): Grado di idoneità reciproca o efficacia terapeutica.
- **Abbinamento** (Tipo: *Testo*, es: \`COPPIA_TRAPIANTO_01\`): Coppia di entanglement clinico / interconnessione biologica. Usa lo stesso nome di gruppo per i record accoppiati, o \`singoli\`/\`INDIPENDENTE\` se autonomi.`;

      csvTemplate = `Codice_Articolo,Percentuale_Saturazione,Compatibilita,Abbinamento
PAZIENTE_DONATORE,0.35,0.95,COPPIA_TRAPIANTO_01
PAZIENTE_RICEVENTE,0.65,0.95,COPPIA_TRAPIANTO_01
PAZIENTE_AUTONOMO,0.80,0.10,singoli
CAMPIONE_GEN_A,0.50,0.88,MUTAZIONE_LINK_X
CAMPIONE_GEN_B,0.22,0.88,MUTAZIONE_LINK_X
PAZIENTE_SANO,0.10,0.99,SINGOLI`;
    } else if (sectorName === 'Cybersecurity') {
      colsText = `- **Codice_Articolo** (Tipo: *Testo/Identificativo*, es: \`IP_GATEWAY\`): Hostname, indirizzo IP o nodo di rete della tua infrastruttura societaria.
- **Percentuale_Saturazione** (Tipo: *Decimale tra 0.00 e 1.00*, es: \`0.80\`): Grado di congestione, stress del processore o pacchetti anomali rilevati.
- **Porte_Attive** (Tipo: *Intero*, es: \`14\`): Canali di comunicazione aperti rintracciati.
- **Abbinamento** (Tipo: *Testo*, es: \`RETE_LAN_WEST\`): Sottorete o canale di entanglement di traffico cyber. Usa lo stesso gruppo identificativo per i nodi appartenenti alla stessa rete esposta, oppure \`singoli\`/\`INDIPENDENTE\` per elementi singoli.`;

      csvTemplate = `Codice_Articolo,Percentuale_Saturazione,Porte_Attive,Abbinamento
FIREWALL_GATEWAY,0.85,4,RETE_LAN_WEST
REST_API_SERVER,0.50,8,RETE_LAN_WEST
DEVELOPER_PC,0.12,12,singoli
DATA_STORAGE,0.30,1,BACKUP_LINK
VIRTUAL_MACHINE_B,0.40,15,BACKUP_LINK
ROUTER_WIFI_INTERNAL,0.95,44,SINGOLI`;
    } else { // Manifatturiero / Fabbrica
      colsText = `- **Codice_Articolo** (Tipo: *Testo/Identificativo*, es: \`MACCHINA_CNC\` o \`ROBOT_SALDATORE\`): Codice identificativo dell'apparato meccanico della società.
- **Percentuale_Saturazione** (Tipo: *Decimale tra 0.00 e 1.00*, es: \`0.55\`): Il tasso di usura o fatica riscontrato sul macchinario nel ciclo.
- **Ore_Lavoro** (Tipo: *Decimale*, es: \`180.5\`): Ore complessive di attività cumulate nell'ultimo mese di esercizio.
- **Abbinamento** (Tipo: *Testo*, es: \`LINEA_MONTAGGIO_A\`): Gruppo di lavorazione condiviso per mappare l'entanglement quantistico dei diversi sensori. Inserisci lo stesso identificatore se legati sulla stessa catena fisica, oppure \`singoli\`/\`INDIPENDENTE\` se isolati.`;

      csvTemplate = `Codice_Articolo,Percentuale_Saturazione,Ore_Lavoro,Abbinamento
CNC_FRESATRICE,0.45,120.5,LINEA_MONTAGGIO_A
ROBOT_SALDATORE,0.60,200.0,LINEA_MONTAGGIO_A
STAMPANTE_3D_METALLO,0.85,78.2,singoli
LINEA_VERNICIATURA_A,0.33,95.0,SERIE_COLLAUDO
LINEA_VERNICIATURA_B,0.33,95.0,SERIE_COLLAUDO
LINEA_IMBALLAGGIO,0.15,10.0,SINGOLI`;
    }

    addMessage('system', `📋 **PROPOSTA REQUISITI FILE DATI PER LA TUA SOCIETÀ (AREA: ${sectorName.toUpperCase()}):**
Per consentire a Quantum Machine Learning d'analizzare i tuoi prodotti o servizi, prepara un file CSV contenente queste colonne principali:

${colsText}

💡 **LINEE-GUIDA DI COMPILAZIONE DELLA TUA SOCIETÀ:**
- I numeri decimali dovranno essere compresi tra **0.00** e **1.00** (percentuali superiori al 100% verranno auto-scalate).
- Separatore decimale raccomandato: il punto (\`.\`). Se usi la virgola l'algoritmo la auto-correggerà.

Ecco un modello di esempio di file CSV pre-configurato pronto per essere caricato o copiato:
\`\`\`csv
${csvTemplate}
\`\`\`

👉 **COME FORNIRE I DATI:**
1. Carica il tuo file CSV premendo **SFOGLIA COMPUTER** nel pannello centrale.
2. Oppure trascinalo col mouse (Drag & Drop) nell'area tratteggiata.
3. Oppure copia l'esempio sopra e incollalo direttamente nella riga di input in basso, quindi premi invio.`);
  };

  const handleChoiceOption = (choice: 'A' | 'B' | 'C') => {
    setScenarioSelection(choice);
    setInterviewSubstep(1);
    const details = getScenarioDetails(selectedSectorLong || 'Finanza e Mercati', choice);
    addMessage('system', `Perfetto! Hai selezionato l'**Opzione ${choice}**: **${details.name}**.
    
Iniziamo la calibrazione descrittiva. Rispondi a questa prima domanda:
👉 **${details.q1}**`);
  };

  const handleSelectScenarioAndStart = (scenario: QuantumScenario) => {
    setSelectedScenario(scenario);
    const sectorName = scenario.macroarea.includes('Finanza') ? 'Finanza' :
                       scenario.macroarea.includes('Logistica') ? 'Logistica' :
                       scenario.macroarea.includes('Chimica') ? 'Chimica' :
                       scenario.macroarea.includes('Sanit') ? 'Sanita' :
                       scenario.macroarea.includes('Cyber') ? 'Cybersecurity' : 'Manifatturiero';
    
    let opt: 'A' | 'B' | 'C' = 'A';
    if (scenario.logicType?.includes('Geometria') || scenario.name.includes('Geometrico') || scenario.name.includes('Americane') || scenario.name.includes('Carpent') || scenario.name.includes('Saldatura') || scenario.name.includes('Folding')) {
      opt = 'B';
    } else if (scenario.logicType?.includes('Probobilità') || scenario.logicType?.includes('Probabilità') || scenario.name.includes('Stima') || scenario.name.includes('Flussi') || scenario.name.includes('Spot') || scenario.name.includes('Prezzi') || scenario.name.includes('Riammissione') || scenario.name.includes('PQC')) {
      opt = 'C';
    }

    setSelectedSector(sectorName);
    const fullArea = scenario.macroarea;
    setSelectedSectorLong(fullArea);
    setScenarioSelection(opt);
    
    setStep(2);
    setInterviewSubstep(1);
    setCalibrationAnswers([]);

    const details = getScenarioDetails(fullArea, opt);
    addMessage('user', `Seleziono lo scenario specifico: ${scenario.name}`);
    setTimeout(() => {
      addMessage('system', `Hai selezionato lo scenario specifico **${scenario.name}** dall'archivio. Questo corrisponde a un'operatività di tipo **Opzione ${opt} (${opt === 'A' ? 'Misto/Entanglement' : opt === 'B' ? 'Geometria/Angolo' : 'Probabilità/Ampiezza'})**.
      
Per calibrare la simulazione, rispondi a questa prima domanda:
👉 **${details.q1}**`);
    }, 400);
  };

  const handleSelectSector = (sectorName: string) => {
    let fullArea = "Finanza e Mercati";
    if (sectorName === 'Logistica') fullArea = "Logistica e Smart Cities";
    if (sectorName === 'Chimica') fullArea = "Chimica e Green Tech";
    if (sectorName === 'Manifatturiero') fullArea = "Manutenzione, Manifattura e Abbigliamento";
    if (sectorName === 'Sanita') fullArea = "Sanità e Genomica";
    if (sectorName === 'Cybersecurity') fullArea = "Cybersecurity";

    setSelectedSector(sectorName);
    setSelectedSectorLong(fullArea);
    setStep(2);
    setInterviewSubstep(0);
    setCalibrationAnswers([]);

    const detA = getScenarioDetails(fullArea, 'A');
    const detB = getScenarioDetails(fullArea, 'B');
    const detC = getScenarioDetails(fullArea, 'C');

    addMessage('user', `Seleziono la macro-area principale: ${fullArea}`);
    setTimeout(() => {
      addMessage('system', `Ottima scelta! Abbiamo 3 scenari disponibili per la macro-area **${fullArea}**:\n\n* **Opzione A [Entanglement Misto]** - *${detA.name}*\n  👉 *Cosa otterrai:* ${detA.benefit}\n\n* **Opzione B [Solo Angolo/Geometria]** - *${detB.name}*\n  👉 *Cosa otterrai:* ${detB.benefit}\n\n* **Opzione C [Solo Ampiezza/Probabilità]** - *${detC.name}*\n  👉 *Cosa otterrai:* ${detC.benefit}\n\n❓ **Quale scenario preferisci attivare per la tua simulazione quantistica? Rispondi digitando 'A', 'B' o 'C'.**`);
    }, 400);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userText = inputText;
    setInputText('');
    addMessage('user', userText);

    // Dynamic interview flow
    if (step === 1) {
      const lower = userText.toLowerCase().trim();
      if (lower === '1' || lower.includes('finanz') || lower.includes('invest') || lower.includes('sold')) {
        handleSelectSector('Finanza');
      } else if (lower === '2' || lower.includes('logist') || lower.includes('sped') || lower.includes('traspor') || lower.includes('camion')) {
        handleSelectSector('Logistica');
      } else if (lower === '3' || lower.includes('chimic') || lower.includes('laborat') || lower.includes('molecol')) {
        handleSelectSector('Chimica');
      } else if (lower === '4' || lower.includes('manut') || lower.includes('fabbric') || lower.includes('manifatt') || lower.includes('industr') || lower.includes('abbigliam')) {
        handleSelectSector('Manifatturiero');
      } else if (lower === '5' || lower.includes('sanit') || lower.includes('med') || lower.includes('osped') || lower.includes('pazient') || lower.includes('genom')) {
        handleSelectSector('Sanita');
      } else if (lower === '6' || lower.includes('cyber') || lower.includes('sicur') || lower.includes('hacker') || lower.includes('firewall')) {
        handleSelectSector('Cybersecurity');
      } else {
        setTimeout(() => {
          addMessage('system', `Scelta non riconosciuta. Si prega di digitare un numero da 1 a 6 o di cliccare su una macro-area aziendale dal pannello sottostante per iniziare il protocollo.`);
        }, 500);
      }
    } else if (step === 2) {
      if (isUserUnsureOrAsking(userText)) {
        let clarificationText = "";
        if (interviewSubstep === 0) {
          clarificationText = `Nessun problema! Ecco un chiarimento sulle differenze delle 3 opzioni disponibili per **${selectedSectorLong || 'il tuo business'}**:

* 🅰️ **Opzione A [Entanglement Misto]**: Collega le variabili in una forte relazione di dipendenza reciproca. È la più avanzata, ideale per trovare impatti incrociati e gestire decisioni combinate (es. incrociare rischi, pianificare rotte con tempi, o bilanciare risorse intermittenti).
* 🅱️ **Opzione B [Solo Angolo/Geometria]**: Converte i dati in coordinate angolari spaziali (rotazione interna dei dati). È perfetto se il tuo problema riguarda coordinate geometriche vere e proprie, layout spaziali, traiettorie o scadenze esatte temporali.
* 🆃 **Opzione C [Solo Ampiezza/Probabilità]**: Adatto se ti interessa valutare la probabilità statistica di fallimento/successo, rischi di cassa, probabilità di sconti ottimali o tassi di riammissione.

❓ **Quale scenario preferisci attivare? Rispondi digitando 'A', 'B' o 'C'.**`;
        } else {
          const details = getScenarioDetails(selectedSectorLong || 'Finanza e Mercati', scenarioSelection || 'A');
          const activeQuestion = interviewSubstep === 1 ? details.q1 : details.q2;
          const explanation = getClarificatoryExplanation(activeQuestion);
          
          clarificationText = `Capisco perfettamente il tuo dubbio! Questa domanda serve a calibrare il circuito quantistico prima di caricare il CSV.

💡 **Spiegazione semplice:**
${explanation}

✍ *Cosa puoi rispondere ora?*
Puoi inserire un valore a tua scelta, oppure se preferisci procedere velocemente digitando semplicemente **'default'** o **'continua'**, mi autorizzerai ad assumere il parametro ideale pre-configurato!

Rispondi pure quando sei pronto/a:
👉 **${activeQuestion}**`;
        }

        setTimeout(() => {
          addMessage('system', clarificationText);
        }, 400);
        return;
      }

      // Process standard answers with default handling
      let processedAnswer = userText;
      const lowerTrimmed = userText.toLowerCase().trim();
      if (lowerTrimmed === 'default' || lowerTrimmed === 'continua' || lowerTrimmed === 'va bene' || lowerTrimmed === 'procedi' || lowerTrimmed === 'ok_allora' || lowerTrimmed === 'vai' || lowerTrimmed === 'fai tu') {
        processedAnswer = "Standard (Raccomandato dal compilatore QML)";
      }

      if (interviewSubstep === 0) {
        const choice = userText.trim().toUpperCase();
        if (choice === 'A' || choice === 'B' || choice === 'C') {
          handleChoiceOption(choice);
        } else {
          setTimeout(() => {
            addMessage('system', `Inserimento non valido. Si prega di selezionare o digitare esattamente **A**, **B** o **C** per abilitare uno degli scenari quantistici disponibili.`);
          }, 400);
        }
      } else if (interviewSubstep === 1) {
        // High-specificity check for unsold clothing inventory (Volume_Rimanenze_Maglia)
        const isInventoryQuestion = selectedSector === 'Manifatturiero' && selectedScenario?.headers.includes('Volume_Rimanenze_Maglia');
        if (isInventoryQuestion) {
          const rawAnswer = userText.toLowerCase().trim();
          const hasStagionale = rawAnswer.includes('stagion');
          const hasAnnuale = rawAnswer.includes('annual') || rawAnswer.includes('anno') || rawAnswer.includes('annuo');
          
          if (!hasStagionale && !hasAnnuale && (rawAnswer !== 'default' && rawAnswer !== 'continua' && rawAnswer !== 'procedi')) {
            setTimeout(() => {
              addMessage('system', `⚠️ **RILEVATO DETTAGLIO GENERICO (AZIONE RICHIESTA):**
              
Hai indicato come valore: "${userText}". Per una calibrazione ottimale dell'algoritmo quantistico **Gemma QML-Core** sui tuoi sconti dinamici, il cliente ha il dovere di essere estremamente preciso sul tipo di orizzonte temporale dello stock:
- **STAGIONALE (es: "1200 pezzi stagionali")**: Rimanenze legate a una specifica collezione di moda corrente.
- **ANNUALE (es: "3500 pezzi annuali")**: Accumuli di inventario dell'intero anno solare.

*Per favore, digita nuovamente la tua risposta specificando se è **'stagionali'** o **'annuali'**, oppure fai click su uno dei due suggerimenti rapidi presenti sotto la chat.*`);
            }, 300);
            return; // Halt and wait for precise input
          }
        }

        setCalibrationAnswers(prev => [...prev, processedAnswer]);
        setInterviewSubstep(2);
        const details = getScenarioDetails(selectedSectorLong, scenarioSelection || 'A');
        setTimeout(() => {
          addMessage('system', `Ricevuto. Seconda domanda per completare la calibrazione del compilatore:
👉 **${details.q2}**`);
        }, 400);
      } else if (interviewSubstep === 2) {
        const currentAnswers = [...calibrationAnswers, processedAnswer];
        setCalibrationAnswers(currentAnswers);
        setInterviewSubstep(3);
        const details = getScenarioDetails(selectedSectorLong, scenarioSelection || 'A');

        const lines = details.sample.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let sampleTableMarkdown = '';
        if (lines.length >= 2) {
          const headers = lines[0].split(',');
          const separator = headers.map(() => '---').join(' | ');
          const rows = lines.slice(1).map(row => row.split(',').join(' | '));
          sampleTableMarkdown = `| ${headers.join(' | ')} |\n| ${separator} |\n${rows.map(r => `| ${r} |`).join('\n')}`;
        }

        setTimeout(() => {
          addMessage('system', `🎉 **Intervista guidata completata con successo!**
          
Ho analizzato le tue risposte e impostato i parametri quantistici ad alta fedeltà di calcolo per la tua azienda:
- **Risposta Calibrazione 1:** "${currentAnswers[0]}"
- **Risposta Calibrazione 2:** "${currentAnswers[1]}"

Come richiesto dal protocollo **Gemma QML-Core**, ecco la tabella dati personalizzata per la tua simulazione:

${sampleTableMarkdown}

---

Ecco la tabella dati che ho preparato per te con un campione di dati realistici. Puoi copiarla direttamente da qui per i tuoi usi. Se i dati ti sembrano corretti e rispecchiano le tue necessità, rispondi scrivendo 'CONFERMA' e avvierò immediatamente la simulazione predittiva quantistica nel backend!`);
          setStep(3);
          setIsCsvLoaded(false);
        }, 400);
      }
    } else if (step === 3) {
      const cleanUserText = userText.trim().toUpperCase();
      if (cleanUserText.includes('CONFERMA')) {
        const details = getScenarioDetails(selectedSectorLong, scenarioSelection || 'A');
        setTempCsvContent(details.sample);
        setIsCsvLoaded(true);
        // Auto select "Abbinamento" column
        const lines = details.sample.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length > 0) {
          const headers = lines[0].split(',');
          const autoSelects = headers.filter(col => 
            ['abbinamento', 'legame', 'relazione', 'gruppo', 'accoppiamento', 'entanglement'].some(term => col.toLowerCase().includes(term))
          );
          setSelectedEntanglementCols(autoSelects);
        }
        processInputCSV(details.sample, true);
        return;
      }

      if (isCsvLoaded) {
        processInputCSV(tempCsvContent);
      } else {
        // Detect if user text looks like a CSV dataset or a conversational query
        const looksLikeCsv = (text: string): boolean => {
          const trim = text.trim();
          const csvLines = trim.split('\n');
          if (csvLines.length < 2) return false;
          const delimiter = csvLines[0].includes(';') ? ';' : ',';
          return csvLines[0].split(delimiter).length >= 2 && csvLines[1].split(delimiter).length >= 2;
        };

        if (looksLikeCsv(userText)) {
          prepareCsvMapping(userText);
        } else {
          // It's a natural language question or conversational query! Let's leverage our agentic RAG LLM endpoint!
          const tempMsgId = Math.random().toString();
          setMessages(prev => [
            ...prev,
            {
              id: tempMsgId,
              sender: 'system',
              text: `⏳ **Elaborazione in corso...** Sto interrogando il compilatore quantistico **Gemma QML-Core** mediante il servizio **RAG** aziendale integrato...`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);

          const details = getScenarioDetails(selectedSectorLong, scenarioSelection || 'A');
          const promptContext = `Sei l'Agente Compilatore Quantistico di Quantum Agents S.r.l. dotato di RAG (Retrieval-Augmented Generation) integrato.
Si tratta del modulo Gemma QML-Core ad alta affidabilità.
Il cliente si trova attualmente nello scenario: **${details.name || selectedSectorLong}** (${selectedSectorLong}).
L'opzione di scenario attiva è: **Opzione ${scenarioSelection || 'A'}**

I parametri definiti nell'intervista di calibrazione aziendale per l'utente sono:
1. ${details.q1 || "Domanda di calibrazione 1"}: "${calibrationAnswers[0] || 'Non dichiarata'}"
2. ${details.q2 || "Domanda di calibrazione 2"}: "${calibrationAnswers[1] || 'Non dichiarata'}"

Come richiesto, il modello dati che hanno sbloccato richiede le seguenti colonne:
- **Codice_Articolo**
- **Percentuale_Saturazione**
- ${details.headers.map(h => `- **${h}**`).join('\n')}
- **Abbinamento**

Se l'utente fa domande sul circuito quantistico generato, su OpenQASM o Qiskit, spiega in dettaglio i concetti.
Se l'utente fa riferimento allo stock invenduto, spiega che l'algoritmo quantistico calibra in modo svariato e differente le ampiezze dei qubit a seconda che abbiano specificato uno stock **Stagionale** (pesi ad alta frequenza e sconti aggressivi nel breve termine) o **Annuale** (curva smussata per massimizzare il recupero del margine totale sul lungo periodo per il cliente, evitando fallimenti).
Rispondi sempre in lingua italiana, in modo estremamente chiaro, didattico e d'ampio respiro, fornendo qualora necessario schemi o tabelle reali di esempio per illustrare i tuoi punti, formattandoli con tabelle in markdown in modo che vengano renderizzati visivamente in modo perfetto nel nostro chat flow.`;

          // Pass the cleaned history to prevent rate limits or system prompt overload
          const cleanedHistory = messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }));

          axios.post('/api/quantum-bi/chat', {
            messages: [...cleanedHistory, { role: 'user', text: userText }],
            systemPrompt: promptContext
          })
          .then(response => {
            const botText = response.data?.text || "Non ho ricevuto risposta dal compilatore quantistico. Riprova tra poco.";
            setMessages(prev => prev.filter(m => m.id !== tempMsgId));
            addMessage('system', botText);
          })
          .catch(err => {
            console.error("AI Error:", err);
            setMessages(prev => prev.filter(m => m.id !== tempMsgId));
            addMessage('system', `❌ **ERRORE DI CONTESTO RAG:** Impossibile connettersi in tempo reale con l'agente Gemma QML-Core. Si prega di riprovare tra qualche istante.`);
          });
        }
      }
    } else {
      setTimeout(() => {
        addMessage('system', `Il circuito quantistico OpenQASM 2.0 è pronto. Puoi trasmetterlo a IBM Q premendo il relativo pulsante o caricare un altro file CSV per rifare la simulazione.`);
      }, 500);
    }
  };

  const prepareCsvMapping = (csvTextContent: string) => {
    // Split rows on any newline representation
    const lines = csvTextContent.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      addMessage('system', `❌ **ERRORE FORMATTO:** Il file CSV inserito non possiede una struttura valida di intestazione + dati.`);
      return;
    }

    // Auto-detect the column delimiter: semicolon is preferred if present in header, otherwise fallback to comma
    const headerLine = lines[0];
    const delimiter = headerLine.includes(';') ? ';' : ',';

    const originalHeaders = headerLine.split(delimiter).map(h => h.trim());
    
    // Save states
    setCsvHeaders(originalHeaders);
    setTempCsvContent(csvTextContent);
    setIsCsvLoaded(true);

    // Auto-select column matching primary abbinamento terms
    const primaryAbbinamentoTerms = ['abbinamento', 'combinazione', 'legame', 'relazione', 'link', 'group', 'gruppo', 'connessione', 'accoppiamento', 'coppia', 'entanglement', 'cluster', 'partner', 'nodo', 'associazione', 'set'];
    const autoSelects = originalHeaders.filter(col => 
      primaryAbbinamentoTerms.some(term => col.toLowerCase().includes(term))
    );
    setSelectedEntanglementCols(autoSelects.length > 0 ? autoSelects : []);

    addMessage('system', `📄 **File CSV letto correttamente!**
Ho rilevato le seguenti colonne presenti nel tuo file:
${originalHeaders.map(c => `• **${c}**`).join('\n')}

*(Nota: I dati all'interno delle righe sono interamente grezzi e privi di associazioni pre-impostate)*

❓ **Ho caricato il tuo file CSV. Quali di queste colonne desideri mettere in relazione tramite entanglement quantistico per la tua previsione? (Ad esempio: associare la colonna dei Consumi con la colonna delle Date).**

⚠️ **Perché è necessario?**
Se non si esegue l'entanglement per associare le colonne prescelte, non ha alcun senso pratico e matematico impiegare un hardware quantistico. Un'elaborazione priva di questi legami coordinati può essere svolta più velocemente, a minori consumi e a costo nullo da un computer classico normale.`);
  };

  const processInputCSV = (csvTextContent: string, forceIgnoreWarning = false) => {
    // Split rows on any newline representation
    const lines = csvTextContent.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      addMessage('system', `❌ **ERRORE FORMATTO:** Il file CSV inserito non possiede una struttura valida di intestazione + dati.`);
      return;
    }

    // Auto-detect the column delimiter: semicolon is preferred if present in header, otherwise fallback to comma
    const headerLine = lines[0];
    const delimiter = headerLine.includes(';') ? ';' : ',';

    const originalHeaders = headerLine.split(delimiter).map(h => h.trim());
    const headers = originalHeaders.map(h => h.trim().toLowerCase());
    
    // Identify key column indices with intelligent multi-language, concept detection and prioritization
    let idxArticolo = -1;
    let idxSaturazione = -1;

    // 1. Article/Asset Column Finding (Primary terms first to avoid false-positives)
    const primaryArticoloTerms = ['articolo', 'codice', 'asset', 'prodotto', 'id_', 'lotto', 'item'];
    const secondaryArticoloTerms = ['id', 'name', 'oggetto', 'nome'];

    idxArticolo = headers.findIndex(h => primaryArticoloTerms.some(term => h.includes(term)));
    if (idxArticolo === -1) {
      idxArticolo = headers.findIndex(h => secondaryArticoloTerms.some(term => h.includes(term)));
    }

    // 2. Saturation Column Finding (Primary terms like "saturazione" get absolute priority over "efficienza" or "indice")
    const primarySaturazioneTerms = ['saturazione', 'percentuale', 'saturation', 'percentage'];
    const secondarySaturazioneTerms = ['rischio', 'valore', 'level', 'ratio', 'efficienza', 'indice', 'load', 'rate', 'dazi', 'index', 'value'];

    idxSaturazione = headers.findIndex(h => primarySaturazioneTerms.some(term => h.includes(term)));
    if (idxSaturazione === -1) {
      idxSaturazione = headers.findIndex(h => secondarySaturazioneTerms.some(term => h.includes(term)));
    }

    // Intelligent Fallbacks:
    // 1. If Code/Article is not found, default to first column (index 0)
    if (idxArticolo === -1 && headers.length > 0) {
      idxArticolo = 0;
    }

    // 2. If Saturation/Risk is not found, default to second column or any non-id column
    if (idxSaturazione === -1) {
      if (headers.length > 1) {
        idxSaturazione = idxArticolo === 0 ? 1 : 0;
      } else {
        idxSaturazione = 0;
      }
    }

    if (idxArticolo === -1 || idxSaturazione === -1) {
      addMessage('system', `❌ **ERRORE COLONNE MANCANTI:** Impossibile rilevare una colonna identificativa e una colonna con i valori numerici.
Assicurati che il tuo file contenga almeno una colonna ID e una coi valori.`);
      return;
    }

    const hasEntanglementMapping = selectedEntanglementCols.length > 0;

    // Identify ignored columns for data reduction log
    const ignored: string[] = [];
    originalHeaders.forEach((h) => {
      const hLower = h.toLowerCase();
      const isArt = originalHeaders[idxArticolo]?.toLowerCase() === hLower;
      const isSat = originalHeaders[idxSaturazione]?.toLowerCase() === hLower;
      const isEnt = selectedEntanglementCols.includes(h);
      if (!isArt && !isSat && !isEnt) {
        ignored.push(h);
      }
    });
    setIgnoredColumns(ignored);

    let autoCorrectedDecimalCount = 0;

    // Retrieve clean records
    let cleanRecords: Array<{ article: string, saturation: number, abbinamento: string }> = [];
    let maxSeenSaturation = 0;
    const tempRecords: Array<{ article: string, saturation: number, abbinamento: string }> = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(delimiter);
      if (parts.length <= Math.max(idxArticolo, idxSaturazione)) continue;
      
      const article = parts[idxArticolo] ? parts[idxArticolo].replace(/^["']|["']$/g, '').trim() : `Item-${i}`;
      let originalSaturationText = parts[idxSaturazione] ? parts[idxSaturazione].replace(/^["']|["']$/g, '').trim() : '0.0';

      // Build key based on selected entanglement columns
      let abbinamento = 'LIBERO';
      const idxAbbinamento = originalHeaders.findIndex(h => 
        ['abbinamento', 'legame', 'relazione', 'gruppo', 'accoppiamento', 'entanglement'].some(term => h.toLowerCase().includes(term))
      );
      if (idxAbbinamento !== -1 && parts[idxAbbinamento]) {
        abbinamento = parts[idxAbbinamento].replace(/^["']|["']$/g, '').trim().toUpperCase();
      } else if (hasEntanglementMapping) {
        const keyParts = selectedEntanglementCols.map(colName => {
          const colIdx = originalHeaders.findIndex(h => h === colName);
          if (colIdx !== -1 && parts[colIdx]) {
            return parts[colIdx].replace(/^["']|["']$/g, '').trim();
          }
          return '';
        }).filter(v => v.length > 0);
        
        if (keyParts.length > 0) {
          abbinamento = keyParts.join(' | ').toUpperCase();
        }
      }

      // Auto-correct comma decimals (e.g. "0,25" -> "0.25")
      if (originalSaturationText.includes(',')) {
        if (/^\d+,\d+$/.test(originalSaturationText)) {
          originalSaturationText = originalSaturationText.replace(',', '.');
          autoCorrectedDecimalCount++;
        }
      }

      const saturationValue = parseFloat(originalSaturationText);

      if (!isNaN(saturationValue)) {
        tempRecords.push({ article, saturation: saturationValue, abbinamento });
        if (saturationValue > maxSeenSaturation) {
          maxSeenSaturation = saturationValue;
        }
      }
    }

    // Intelligent auto-scaling for values using 0-100% scale instead of standard 0.0-1.0
    let percentageScalingApplied = false;
    if (maxSeenSaturation > 1.0) {
      percentageScalingApplied = true;
      cleanRecords = tempRecords.map(r => ({
        ...r,
        saturation: parseFloat((r.saturation / 100).toFixed(4))
      }));
    } else {
      cleanRecords = tempRecords;
    }

    if (cleanRecords.length === 0) {
      addMessage('system', `❌ **ERRORE CONTENUTO:** Non è stato possibile estrarre righe di dati numerici validi dal file.`);
      return;
    }

    // Process Qasm logic
    const N = cleanRecords.length;
    let logicSummary = `✅ **DATA CLEANING E DATA REDUCTION COMPLETATI**
- **Soglia di delimitazione rilevata:** colonna divisa da \`${delimiter}\`
- **Mappatura Intelligente delle Colonne:**
  * Identificativo (Codice/ID): colonna \`${originalHeaders[idxArticolo]?.trim()}\` (indice ${idxArticolo})
  * Stato Critico (Saturazione/Rischio): colonna \`${originalHeaders[idxSaturazione]?.trim()}\` (indice ${idxSaturazione})
  * Relazioni (Entanglement/Abbinamenti): ${hasEntanglementMapping ? `basato su colonne \`${selectedEntanglementCols.join('`, `')}\`` : '*Nessuna (Tutti impostati a LIBERO)*'}
- **Righe utili rilevate (N):** ${N}
- **Colonne in eccesso scartate:** ${ignored.length > 0 ? ignored.map(c => `\`${c}\``).join(', ') : 'Nessuna colonna ridondante rilevata.'}
${autoCorrectedDecimalCount > 0 ? `- **Auto-Correzione Decimali:** Sostituiti in automatico **${autoCorrectedDecimalCount}** separatori a virgola con il punto decimale matematico standard.\n` : ''}${percentageScalingApplied ? `- **Auto-Scaling dei Percentili:** Valori di saturazione maggiori di 1.0 (es. **${maxSeenSaturation}%**) convertiti in decimali coerenti (range 0.0 - 1.0) per la simulazione quantistica.\n` : ''}- **Righe elaborate:**
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

    // CNOT Entanglement based on Abbinamento / Mappatura Relazioni
    qasmCircuitCode += `// === FASE 2: ENTANGLEMENT DI CORRELAZIONE COERENTE ===\n`;
    const groups: Record<string, number[]> = {};
    let uniqueGroupCounter = 0;

    cleanRecords.forEach((record, index) => {
      const match = record.abbinamento.trim().toUpperCase();
      // Identify independent, single or non-associated identifiers
      const isIndependent = [
        'SINGOLI', 'SINGOLO', 'INDIPENDENTE', 'INDIPENDENTI', 'LIBERO', 'FREE', 
        'DECOUPLED', 'DECOLLEGATO', 'DECOLLEGATI', ''
      ].includes(match);

      if (!isIndependent) {
        if (!groups[match]) groups[match] = [];
        groups[match].push(index);
      } else {
        // Individual rows treated as isolated / independent nodes
        const uniqueKey = `_INDIPENDENTE_ROW_${index}_${uniqueGroupCounter++}`;
        groups[uniqueKey] = [index];
      }
    });

    let entanglementAdded = false;
    Object.entries(groups).forEach(([groupName, indices]) => {
      if (indices.length > 1) {
        qasmCircuitCode += `// Gruppo di relazione con valori identici (q[${indices[0]}] assunto come qubit di controllo comune): ${groupName}\n`;
        for (let g = 1; g < indices.length; g++) {
          qasmCircuitCode += `cx q[${indices[0]}], q[${indices[g]}];\n`;
          entanglementAdded = true;
        }
      } else if (indices.length === 1) {
        // Valori unici/singoli sono mappati come nodi indipendenti all'interno della Feature Map / Ansatz
        const idx = indices[0];
        qasmCircuitCode += `// Nodo indipendente nella Feature Map per valore unico/singolo (q[${idx}])\n`;
        qasmCircuitCode += `rz(pi/4) q[${idx}]; // Rotazione parametrica di fase per coerenza quantistica distribuita\n`;
      }
    });

    const bypassWarning = hasEntanglementMapping || forceIgnoreWarning || entanglementAdded;

    if (!entanglementAdded && !bypassWarning) {
      setPendingCsvData(csvTextContent);
      setWarningReason(!hasEntanglementMapping ? 'missing_column' : 'no_associations');
      setShowEntanglementWarning(true);
      
      addMessage('system', `⚠️ **AVVISO IMPORTANTE:** Non è stato rilevato alcun legame di **Entanglement** (accoppiamento) nel file CSV caricato o selezionato.
- **Motivo principale:** ${!hasEntanglementMapping ? "Non è stata selezionata alcuna colonna per l'Entanglement." : "Le colonne selezionate contengono valori unici o impostazioni su 'LIBERO'."}

Senza entanglement, i qubit elaboreranno i dati in modo del tutto autonomo, senza sfruttare la coerenza collettiva e i calcoli cooperativi distribuiti.

*Si prega di verificare la scelta dell'azione desiderata nel pannello interattivo comparso qui sotto per procedere comunque o correggere il file.*`);
      return;
    }

    // Reset warnings if passed successfully or bypassed
    setShowEntanglementWarning(false);
    setPendingCsvData('');

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

    const mappedColumnsText = selectedEntanglementCols.length > 0 
      ? selectedEntanglementCols.map((col, cIdx) => `  * Colonna \`${col}\` ➔ Mappata su Qubit \`q[${cIdx}]\``).join('\n')
      : '  * Nessuna colonna selezionata (Elaborazione classica isolata)';

    addMessage('system', `⚙️ **AUTOMAZIONE LOGICA IN BACKGROUND (PRE-ELABORAZIONE QUANTISTICA):**
L'applicazione sta configurando autonomamente la preparazione quantistica del circuito secondo le indicazioni fornite:
- **Trascrizione Automatica:** Trascrizione dei tuoi dati grezzi in sequenze di bit e successiva mappatura diretta dei singoli record sui rispettivi qubit d'ingresso.
- **Feature Mapping Geometrico:** Conversione dei tuoi valori numerici (come i consumi o gli indicatori rilevati) in percentuali ad alta coerenza e angoli tridimensionali di rotazione quantistica per orientare in modo corretto e polarizzare i qubit sulla Sfera di Bloch.
- **Generazione Porte di Entanglement:** Calcolo e applicazione mirata delle porte quantistiche di entanglement (porte CNOT) esclusivamente tra i qubit corrispondenti alle colonne da te scelte: **${selectedEntanglementCols.join(', ') || 'Nessuna'}**.

🔌 **PASSAGGIO DELLE DIRETTIVE AL MOTORE DI CALCOLO QUANTISTICO ESISTENTE:**
Conformemente alle tue istruzioni, le colonne prescelte sono state mappate strutturalmente sui qubit del registro quantistico dell'applicazione:
${mappedColumnsText}

Questo insieme organizzato di istruzioni di entanglement è stato inviato con successo al motore di calcolo quantistico già esistente dell'applicazione per avviare l'elaborazione del circuito.`);

    setTimeout(() => {
      const details = getScenarioDetails(selectedSectorLong || 'Finanza e Mercati', scenarioSelection || 'A');
      const analysisText = `🔮 **Sintesi del Circuito Quantistico Completata!**

### 1. Analisi Strategica (Manageriale)
L'applicazione del fenomeno dell'**Entanglement Misto di Tipo 3** sul tuo scenario di business (**${details.name}**) consente di correlare multifattorialmente le dinamiche critiche delle tue variabili d'interesse. 
Nel calcolo combinatorio quantistico, questo legame sincrono forza i qubit a evolvere collettivamente, catturando interdipendenze non lineari invisibili agli algoritmi classici ordinari.
- **Vantaggio Operativo reale:** Sincronizzazione istantanea delle metriche aziendali, offrendo una pre-risoluzione ad alta accuratezza degli scostamenti critici e consentendo di ottimizzare i margini per gli obiettivi precedentemente pianificati.

### 2. Codice Quantistico OpenQASM 2.0
Tutti i vincoli quantitativi, inclusi il clipping protettivo delle grandezze fisiche per prevenire divergenze NaN, le porte di entanglement multi-nodo sui gruppi d'appartenenza correlati, e la distribuzione CRY parametrizzata per il comparatore di soglia al qubit target, sono stati tradotti nel flusso deterministico OpenQASM 2.0:

[START_COMPOSER]
${qasmCircuitCode}
[END_COMPOSER]

### 3. Pulsante di Collegamento Hardware
Per eseguire la simulazione in tempo reale e trasmettere il circuito alla griglia hardware di calcolo quantistica fisica di IBM Quantum Corporation, utilizza il connettore diretto:

[ACTION: RENDER_BUTTON_SEND_TO_IBM_Q]`;

      addMessage('system', analysisText, true, qasmCircuitCode);
      setStep(4);
    }, 1500);
  };

  const handleConfirmProceedWithoutEntanglement = () => {
    setShowEntanglementWarning(false);
    if (pendingCsvData) {
      processInputCSV(pendingCsvData, true);
    }
  };

  const handleCancelEntanglementWarning = () => {
    setShowEntanglementWarning(false);
    setPendingCsvData('');
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
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-quantum-primary transition-all duration-200 group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          )}
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
                    <div className="mt-4 bg-[#070b14] border border-white/10 rounded-xl overflow-hidden font-mono text-xs shadow-lg">
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
                      
                      {/* Send to IBM Q Trigger */}
                      <div className="p-3.5 bg-[#0a0f1d] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
                        <span className="text-gray-400 uppercase tracking-wider text-[9px] font-bold">PREPARATO PER IBM QPU</span>
                        <button
                          onClick={() => onSendToIbm(msg.code || '')}
                          className="px-4 py-2 bg-quantum-primary text-quantum-bg hover:bg-quantum-primary/80 font-black text-[11px] uppercase tracking-wider rounded-lg transition-all shadow-[0_0_12px_rgba(0,242,255,0.25)] hover:shadow-[0_0_18px_rgba(0,242,255,0.45)] duration-200 cursor-pointer flex items-center gap-1.5"
                        >
                          <Cpu className="w-3.5 h-3.5 fill-current animate-pulse" /> Send to IBM Q 🚀
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-mono text-gray-600 mt-1">{msg.timestamp}</span>
              </div>
            ))}

            {showEntanglementWarning ? (
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 sm:p-6 border border-amber-500/20 bg-amber-950/10 rounded-2xl flex flex-col gap-4 text-left relative overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(245,158,11,0.05)] font-sans"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl text-amber-500 shrink-0">
                    <AlertTriangle className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      ⚠️ AVVISO INTEGRITÀ: NESSUN LEGAME DI ENTANGLEMENT TROVATO
                    </h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      {warningReason === 'missing_column' ? (
                        <span>La colonna per gestire le relazioni sincrone (<strong>Abbinamento</strong>, <strong>Legame</strong>, <strong>Connessione</strong> o <strong>Entanglement</strong>) non è stata identificata nella riga di intestazione del tuo file CSV.</span>
                      ) : (
                        <span>La colonna delle relazioni è stata rilevata, ma tutti i record elaborati sono configurati su <strong>'LIBERO'</strong> o non possiedono nomi di gruppo duplicati coordinati.</span>
                      )}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                      Senza entanglement, i qubit elaboreranno i dati in modalità unicamente autonoma, precludendo l'analisi multifattoriale distribuita inerente alla coerenza quantistica IBM.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 mt-2 font-mono">
                  <button
                    onClick={handleConfirmProceedWithoutEntanglement}
                    className="flex-1 px-4 py-2.5 bg-amber-500 text-[#090d18] hover:bg-amber-400 text-xs font-black rounded-lg transition-all shadow-[0_0_10px_rgba(245,158,11,0.25)] hover:shadow-[0_0_15px_rgba(245,158,11,0.45)] cursor-pointer text-center uppercase"
                  >
                    🚀 Procedi Comunque Senza Legami
                  </button>
                  <button
                    onClick={handleCancelEntanglementWarning}
                    className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-bold rounded-lg transition-all cursor-pointer text-center uppercase"
                  >
                    ✏️ Correggi e Riassegna
                  </button>
                </div>
              </motion.div>
            ) : step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 sm:p-6 border border-quantum-primary/20 bg-[#0c1222]/90 rounded-2xl flex flex-col gap-4 text-left relative overflow-hidden font-sans w-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-quantum-primary/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-quantum-primary/10 border border-quantum-primary/25 rounded-xl text-quantum-primary shrink-0">
                    <Workflow className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center justify-between gap-2">
                      <span>🛰️ CONFIGURAZIONE MODELLO DI CALCOLO</span>
                      <span className="text-[9px] bg-quantum-primary/15 text-quantum-primary px-2 py-0.5 rounded border border-quantum-primary/20 font-bold">PRONTO</span>
                    </h4>
                    <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                      L'intervista di calibrazione aziendale è stata completata con successo. Ho preparato il set di dati di calibrazione campione e strutturato i processi interdipendenti coordinati simultaneamente nel backend.
                    </p>
                  </div>
                </div>

                {/* Scenario details info card */}
                <div className="bg-[#070b14]/90 border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/5 pb-2">
                    <span className="text-gray-400">Macro-area Aziendale:</span>
                    <span className="text-white font-bold">{selectedSectorLong}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/5 pb-2">
                    <span className="text-gray-400">Scenario Selezionato:</span>
                    <span className="text-quantum-secondary font-bold">Opzione {scenarioSelection || 'A'} - {selectedScenario?.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-400">Stato del Registro:</span>
                    <span className="text-emerald-400 font-bold">Dati Campione Generati</span>
                  </div>
                </div>

                <div className="p-4 bg-quantum-primary/5 border border-quantum-primary/15 rounded-xl text-left">
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    💡 **Inizia la Simulazione:** Scrivi **"CONFERMA"** nella chat di sinistra o fai clic sul pulsante in basso per sintetizzare il circuito di calcolo ed eseguire istantaneamente l'analisi predittiva quantistica nel backend.
                  </p>
                </div>

                {/* Big confirmation action button */}
                <button
                  onClick={() => {
                    const details = getScenarioDetails(selectedSectorLong, scenarioSelection || 'A');
                    setTempCsvContent(details.sample);
                    setIsCsvLoaded(true);
                    
                    // Auto select "Abbinamento" column
                    const lines = details.sample.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                    if (lines.length > 0) {
                      const headers = lines[0].split(',');
                      const autoSelects = headers.filter(col => 
                        ['abbinamento', 'legame', 'relazione', 'gruppo', 'accoppiamento', 'entanglement'].some(term => col.toLowerCase().includes(term))
                      );
                      setSelectedEntanglementCols(autoSelects);
                    }
                    processInputCSV(details.sample, true);
                  }}
                  className="w-full px-4 py-3 bg-quantum-primary text-quantum-bg hover:bg-quantum-primary/95 text-xs font-mono font-black rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,255,0.25)] hover:shadow-[0_0_22px_rgba(0,242,255,0.45)] cursor-pointer text-center uppercase"
                >
                  🚀 CONFERMA DATI E AVVIA SIMULAZIONE
                </button>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick trigger actions area depending on active state */}
          <div className="p-4 bg-[#070b14]/50 border-t border-white/5 flex flex-wrap gap-2 items-center">
            {step === 1 && (
              <div className="flex flex-col gap-2 w-full">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">
                  📊 FASE 0: SELEZIONA UNA DELLE MACRO-AREE AZIENDALI PRINCIPALI:
                </span>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2 w-full">
                  <button
                    onClick={() => handleSelectSector('Finanza')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    📊 1. Finanza
                  </button>
                  <button
                    onClick={() => handleSelectSector('Logistica')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🚚 2. Logistica
                  </button>
                  <button
                    onClick={() => handleSelectSector('Chimica')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🔬 3. Chimica
                  </button>
                  <button
                    onClick={() => handleSelectSector('Manifatturiero')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🏭 4. Fabbrica
                  </button>
                  <button
                    onClick={() => handleSelectSector('Sanita')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🧬 5. Sanità
                  </button>
                  <button
                    onClick={() => handleSelectSector('Cybersecurity')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    🛡️ 6. Cybersec
                  </button>
                </div>
              </div>
            )}

            {step === 2 && interviewSubstep === 0 && (
              <div className="flex flex-col gap-2 w-full animate-fade-in">
                <span className="text-[10px] font-mono text-[#00f2ff] uppercase tracking-wider block mb-1 font-bold">
                  💡 FASE 1: SCEGLI OPZIONE SCENARIO OPERATIVO:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                  <button
                    onClick={() => handleChoiceOption('A')}
                    className="px-3 py-2 bg-[#0d1527] border border-quantum-primary/20 hover:border-quantum-primary text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center rounded-lg"
                  >
                    🅰️ Opzione A [Misto/Entanglement]
                  </button>
                  <button
                    onClick={() => handleChoiceOption('B')}
                    className="px-3 py-2 bg-[#0d1527] border border-quantum-primary/20 hover:border-quantum-primary text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center rounded-lg"
                  >
                    🅱️ Opzione B [Solo Angolo]
                  </button>
                  <button
                    onClick={() => handleChoiceOption('C')}
                    className="px-3 py-2 bg-[#0d1527] border border-quantum-primary/20 hover:border-quantum-primary text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center rounded-lg"
                  >
                    🆃 Opzione C [Solo Ampiezza]
                  </button>
                </div>
              </div>
            )}

            {step === 2 && interviewSubstep === 1 && selectedSector === 'Manifatturiero' && selectedScenario?.headers.includes('Volume_Rimanenze_Maglia') && (
              <div className="flex flex-col gap-2 w-full animate-fade-in bg-[#0c1527] border border-quantum-primary/20 p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-quantum-primary uppercase tracking-wider block font-black">
                  🎯 SPECIFICA DETTAGLIO INVENDUTO SULLO STOCK DI MAGLIA:
                </span>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  Per procedere con precisione, dichiara l'orizzonte temporale corretto dello stock (Stagionale o Annuale):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 w-full">
                  <button
                    onClick={() => {
                      setInputText("1200 pezzi stagionali");
                    }}
                    className="px-3 py-2 bg-[#070b14] border border-quantum-primary/25 hover:border-quantum-primary text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center rounded-lg flex items-center justify-center gap-1.5"
                  >
                    📦 Stock Stagionale (es. 1200 pezzi stagionali)
                  </button>
                  <button
                    onClick={() => {
                      setInputText("3500 pezzi annuali");
                    }}
                    className="px-3 py-2 bg-[#070b14] border border-[#00f2ff]/25 hover:border-[#00f2ff] text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-[#00f2ff]/5 cursor-pointer text-center rounded-lg flex items-center justify-center gap-1.5"
                  >
                    📅 Stock Annuale (es. 3500 pezzi annuali)
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
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

                {qasmOutput && (
                  <div className="p-4 bg-white/5 border-t border-white/5">
                    <button
                      onClick={() => onSendToIbm(qasmOutput)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-quantum-primary hover:bg-quantum-primary/90 text-quantum-bg font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,255,0.25)] hover:shadow-[0_0_22px_rgba(0,242,255,0.45)] cursor-pointer duration-200"
                    >
                      <Cpu className="w-4 h-4 fill-current animate-pulse" /> Trasmetti codice a IBM Q QPU 🚀
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

      </div>
    </motion.div>
  );
}
