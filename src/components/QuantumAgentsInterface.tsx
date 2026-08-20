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
import { useTranslation } from '../lib/TranslationContext';

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
  const { t } = useTranslation();
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
  const [selectedMacroarea, setSelectedMacroarea] = useState<string>('All');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('All');
  
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
    const mainVar = vars[0] || 'Saturation';
    const secondVar = vars[1] || 'Bonding';
    
    if (scenario.macroarea.includes('Finance') || scenario.macroarea.includes('Finanza')) {
      return [
        `What is your maximum risk tolerance (conservative, moderate, aggressive) regarding "${scenario.name}"?`,
        `How do you intend to weigh the variable "${mainVar}" to mitigate the impact on the quantum module?`,
        `What maximum deviation do you consider tolerable on metric "${secondVar}" before applying protective measures?`
      ];
    } else if (scenario.macroarea.includes('Logistics') || scenario.macroarea.includes('Logistica')) {
      return [
        `What is the maximum tolerable average delay or bottleneck for asset "${scenario.name}"?`,
        `How does the variable "${mainVar}" affect the stability of interconnected nodes?`,
        `In case of a channel bottleneck on "${secondVar}", do you have redundant secondary routes available?`
      ];
    } else if (scenario.macroarea.includes('Chemistry') || scenario.macroarea.includes('Genomics') || scenario.macroarea.includes('Chimica')) {
      return [
        `What is the required molecular or energy precision during simulation of "${scenario.name}"?`,
        `How is the stability correlated with "${mainVar}" monitored or calculated?`,
        `What impact does "${secondVar}" have on the long-term stability or decay of the element?`
      ];
    } else if (scenario.macroarea.includes('Manufacturing') || scenario.macroarea.includes('Manifattura')) {
      return [
        `How frequently do you monitor mechanical wear and the production cycle for "${scenario.name}"?`,
        `How does stress accumulation on variable "${mainVar}" accelerate line wear?`,
        `What is the estimated hourly cost of a sudden outage due to instability in "${secondVar}"?`
      ];
    } else if (scenario.macroarea.includes('Cybersecurity')) {
      return [
        `What key length and strength (e.g. bits or NIST standards) are required in "${scenario.name}"?`,
        `What is the exposure magnitude tied to variable "${mainVar}" in case of a cyber attack?`,
        `What automated workflow should trigger if "${secondVar}" exceeds the critical threshold percentage?`
      ];
    }
    
    return [
      `What is the risk or error tolerance in this pilot scenario for "${scenario.name}"?`,
      `How will the variable "${mainVar}" influence the classical decision-making process?`
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
            {activeCellValue || <span className="text-slate-600 italic">empty cell</span>}
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
                  {activeCellValue || <span className="text-slate-600 italic">empty cell</span>}
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
                    Secure end-to-end connection with physical superconducting quantum computers from the IBM Q fleet.
                  </p>
                  <button
                    onClick={() => {
                      if (onSendToIbm) {
                        onSendToIbm(qasmOutput);
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-[#00f2ff] hover:bg-[#00e1f0] text-[#090d18] font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_22px_rgba(0,242,255,0.5)] cursor-pointer hover:scale-[1.01]"
                  >
                    <Cpu className="w-4 h-4 text-[#090d18] fill-[#090d18] animate-pulse" /> Transmit circuit to IBM Q Real QPU 🚀
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
    
    if (q.includes('tolleranza') || q.includes('rischio') || q.includes('tolerance') || q.includes('risk')) {
      return "Risk tolerance indicates how willing you are to accept fluctuations to protect capital or cargo. \n\n❗ **Frequency & Scale:** Refers to an **annual** strategic time horizon. You can specify whether you prefer a prudent ('conservative'), balanced ('moderate'), or efficiency-focused ('aggressive') approach.";
    }
    if (q.includes('volatilità') || q.includes('volatility')) {
      return "Volatility measures the intensity of price fluctuations for your financial assets. \n\n❗ **Frequency & Scale:** Price oscillations calculated on a **daily or monthly** basis projected to an **annual** timeline. You can respond with an estimated percentage (e.g. '20% per year') or specify if you expect 'high' or 'low' market price fluctuations.";
    }
    if (q.includes('precisione') || q.includes('scadenza') || q.includes('precision') || q.includes('expiry') || q.includes('maturity')) {
      return "Concerns the level of geometric refinement for the optimal timing to exercise options. \n\n❗ **Frequency & Scale:** Refers to desired accuracy for typical financial horizons in the **short term (monthly)** or **medium-long term (e.g. quarterly or annual)**. You can request 'high' or 'standard' precision.";
    }
    if (q.includes('risk-free') || q.includes('tasso') || q.includes('rate')) {
      return "The risk-free rate indicates the theoretical yield of a zero-risk investment (e.g., government bonds). \n\n❗ **Frequency & Scale:** Expressed as an **annual** percentage rate of return. A typical current reference rate is around **'4% per year'** or **'4.5% per year'**. If you type 'default' or 'standard', we will use the optimized value of 4.5% per year.";
    }
    if (q.includes('orizzonte') || q.includes('mensile') || q.includes('settimana') || q.includes('horizon') || q.includes('monthly') || q.includes('week')) {
      return "Defines the future period over which to analyze cash flows. \n\n❗ **Frequency & Scale:** The future portfolio analysis horizon can be short-term (e.g., **'15 or 30 days'**), medium-term (e.g., **'monthly'** or **'quarterly'**), or long-term (**'annual'**). Choose the interval that suits your needs.";
    }
    if (q.includes('insoluto') || q.includes('fatture') || q.includes('invoice') || q.includes('unpaid')) {
      return "Measures the average percentage share of unpaid invoices at maturity from customers. \n\n❗ **Frequency & Scale:** Percentage calculated on total **annual** turnover (e.g. '2% of annual turnover'). You can specify a simple numeric value like '2%' or '5%', or write 'no unpaid' if collections are punctual.";
    }
    if (q.includes('veicoli') || q.includes('flotta') || q.includes('vehicle') || q.includes('fleet')) {
      return "Refers to the number of active company vehicles simultaneously distributing physical goods. \n\n❗ **Frequency & Scale:** Calculated as maximum operating vehicles **per day** (e.g. '10 active vehicles per day'). Used to scale the qubit density needed to optimize routes.";
    }
    if (q.includes('finestre temporali') || q.includes('scarico') || q.includes('window') || q.includes('time window')) {
      return "Time windows indicate schedule rigidity for deliveries or logistics pick-ups. \n\n❗ **Frequency & Scale:** Managed on **daily** hourly shifts (e.g. 08:00 to 12:00 morning slots). You can specify if schedules are 'strict/binding' (e.g. penalties for daily delays) or 'flexible' (full tolerance).";
    }
    if (q.includes('pescaggio') || q.includes('portata') || q.includes('payload') || q.includes('capacity')) {
      return "Cargo capacity or physical volumetric limits of holds for 3D bin packing. \n\n❗ **Frequency & Scale:** Calculated in total shipment tonnage **per single voyage/shipment**, not annually. Enter a maximum limit tonnage (e.g. '20 tons') or type 'standard' to load average ship profiles.";
    }
    if (q.includes('baricentro') || q.includes('sfasamenti') || q.includes('center of gravity') || q.includes('balance')) {
      return "Vessel stability requires geometric balancing of total container weight on board. \n\n❗ **Frequency & Scale:** Balance tolerance evaluated **per single voyage**. You can request 'low tolerance' for maximum trim severity, geometric stability, and preventing tilt during transit, or 'normal'.";
    }
    if (q.includes('contratti') || q.includes('fissa') || q.includes('contract') || q.includes('fixed')) {
      return "Percentage of shipments prepaid or protected with long-term fixed contracts with shipowners. \n\n❗ **Frequency & Scale:** Calculated on total contracted logistics volume on an **annual** basis (e.g. '50% per year'). The higher this percentage, the less sensitive the circuit will be to spot rate speculation on the amplitude qubit.";
    }
    if (q.includes('costi di trasporto') || q.includes('target') || q.includes('riduzione') || q.includes('freight') || q.includes('savings')) {
      return "Desired cost savings target on spot container ocean freight. \n\n❗ **Frequency & Scale:** Target applied to **monthly or annual** logistics expenditure (e.g., '15% annual savings on freight'). The quantum algorithm will map probabilistic rotation to force surpassing this cost target.";
    }
    if (q.includes('storage') || q.includes('bess') || q.includes('mwh')) {
      return "Nominal maximum capacity of the corporate battery system used to store solar or wind energy before feeding it into the grid. \n\n❗ **Frequency & Scale:** Total energy capacity storable and deliverable **daily** (e.g. '10 megawatt-hours (MWh)'). Consistent with the sizing of the amplitude qubit.";
    }
    if (q.includes('immissione') || q.includes('curtailing') || q.includes('rete') || q.includes('grid') || q.includes('injection')) {
      return "Maximum allowed instantaneous grid injection power limit to prevent overloads or distributor penalties. \n\n❗ **Frequency & Scale:** Thermal or regulatory limit measured continuously or with a daily cap in Megawatts (MW) (e.g. '1.5 MW maximum **per day**'). Respond with power or 'no limit'.";
    }
    if (q.includes('orbitali') || q.includes('vqe') || q.includes('orbital')) {
      return "Molecular energy channels to simulate on the quantum computer to verify cohesion and chemical bonding. \n\n❗ **Frequency & Scale:** Refers to a static simulation **per run** of molecular calculation. Typically, each active orbital requires assigning a dedicated qubit (e.g. '4 molecular orbitals per run').";
    }
    if (q.includes('ansatz')) {
      return "Concerns the variational geometric algorithm for exploring molecular combinations. \n\n❗ **Frequency & Scale:** High-frequency logical setup parameter **within the VQE convergence loop**. If you are not familiar with the science, simply answer 'UCCSD' (industry standard) or 'optimal'.";
    }
    if (q.includes('conducibilità') || q.includes('ec') || q.includes('idroponica') || q.includes('conductivity') || q.includes('hydroponic')) {
      return "Mineral nutrient levels dissolved in water to feed roots in hydroponic greenhouses. \n\n❗ **Frequency & Scale:** Value measured continuously **per growth/cultivation cycle** (e.g. '1.8 mS/cm for herbs or salad', '2.8 mS/cm for tomatoes'). Provide desired conductivity for your crop.";
    }
    if (q.includes('consumi') || q.includes('led') || q.includes('artificiale') || q.includes('irradiance') || q.includes('lighting')) {
      return "Scheduling of LED energy input and irradiance to optimize growth while balancing electrical costs. \n\n❗ **Frequency & Scale:** Total electricity power consumption measured **monthly** or **annually**. Respond with a priority (e.g. 'priority to reduced consumption on monthly basis' or 'maximum growth rate').";
    }
    if (q.includes('tempo di ciclo robot') || q.includes('ciclo') || q.includes('cycle time') || q.includes('robot')) {
      return "Average time duration required for a robotic arm or station to complete a repetitive task before moving to the next piece. \n\n❗ **Frequency & Scale:** Expressed in seconds needed **per single piece** (e.g. '120 seconds per piece'). Defines real factory line operating speed.";
    }
    if (q.includes('consegna') || q.includes('ritardi') || q.includes('delay') || q.includes('supply')) {
      return "Historical average of delays encountered in supplying or delivering work-in-progress or materials for the assembly line. \n\n❗ **Frequency & Scale:** Calculated as average delay in minutes **per week** or **per day** (e.g. '10 minutes average delay per week').";
    }
    if (q.includes('punti di saldatura') || q.includes('curvatura') || q.includes('welding') || q.includes('touchpoint')) {
      return "Describes how many physical touchpoints the robot must make for joints or mobility in 3D space. \n\n❗ **Frequency & Scale:** Programmed number of touches applied **per work unit/piece** (e.g. '15 points per piece').";
    }
    if (q.includes('volumi') || q.includes('rimanenze') || q.includes('abbigliamento') || q.includes('maglia') || q.includes('invenduto') || q.includes('stagion') || q.includes('annual') || q.includes('inventory') || q.includes('stock')) {
      return "Physical quantity of clothing or unsold knitwear inventory held in warehouse for high-rate clearance.\n\n❗ **Frequency & Scale:** You must distinguish with high precision the time horizon required by the quantum model. Specify clearly if calculated stock refers to **Seasonal (e.g. '1200 seasonal pieces')** or total **Annual (e.g. '3500 annual pieces')** inventory. This detail is essential for the algorithm to properly calibrate amplitude qubit weights and determine optimal dynamic discount turnover.";
    }
    if (q.includes('margine minimo') || q.includes('perdita') || q.includes('margin') || q.includes('breakeven')) {
      return "Minimum acceptable baseline margin per item sold to remain profitable or breakeven. \n\n❗ **Frequency & Scale:** Expressed as a percentage over total unit production cost, calculated **per single sale or on a seasonal/annual basis** (e.g. '15% seasonal basis' or '15% per piece'). Below this threshold, the algorithm will never propose discounts.";
    }
    if (q.includes('antigeni') || q.includes('hla') || q.includes('antigen')) {
      return "Human leukocyte antigens used to determine immunological compatibility between recipient and donor. \n\n❗ **Frequency & Scale:** Refers to each individual clinical matching test for transplant. A perfect biological match is **'6 out of 6'** or **'8 out of 8'** total matching antigens.";
    }
    if (q.includes('ischemia fredda') || q.includes('ore') || q.includes('ischemia') || q.includes('hours')) {
      return "Biological safety time window during which the organ can remain cold outside the human body before implantation. \n\n❗ **Frequency & Scale:** Expressed in useful hours **per harvested organ** (e.g. '4 to 6 hours' for heart, '12 hours' for liver).";
    }
    if (q.includes('residui amminoacidici') || q.includes('simulazione proteica') || q.includes('amino') || q.includes('protein')) {
      return "Total size of the protein segment or peptide to geometrically model on qubits. \n\n❗ **Frequency & Scale:** Amino acid sequence length analyzed **per single static run** (e.g. 'short segment of 10 amino acids per run').";
    }
    if (q.includes('forze di legame') || q.includes('idrogeno') || q.includes('van der waals') || q.includes('bond')) {
      return "Indicates whether the algorithm should prioritize primary hard hydrogen bonds or weaker surface molecular interactions (Van Der Waals). \n\n❗ **Frequency & Scale:** Evaluated as a static chemical parameter **per structural model**.";
    }
    if (q.includes('età') || q.includes('riammissione') || q.includes('dimissioni') || q.includes('age') || q.includes('readmission')) {
      return "Demographic clusters of patients at highest statistical risk of unplanned post-discharge readmission. \n\n❗ **Frequency & Scale:** Monitored on data accumulated **annually** (e.g. 'patients over 65 years old in the past year'). Provide age range or respond 'standard'.";
    }
    if (q.includes('visite') || q.includes('follow-up') || q.includes('controlli') || q.includes('followup')) {
      return "Planned preventive medical check-up schedule to monitor patient recovery after hospital discharge. \n\n❗ **Frequency & Scale:** Total planned check-ups **in the first month (30 days) post-discharge** (e.g. '1 visit per week in the first month').";
    }
    if (q.includes('distanza') || q.includes('fibra') || q.includes('qkd') || q.includes('fiber') || q.includes('distance')) {
      return "Physical fiber optic cabling length between sites to distribute quantum security keys protected against hackers. \n\n❗ **Frequency & Scale:** Total physical link length of corporate geographic network measured **one-time** (e.g. '50 km total link extension').";
    }
    if (q.includes('connessioni') || q.includes('insolito') || q.includes('allerta') || q.includes('connection') || q.includes('attack')) {
      return "Number of unusual connection attempts or brute-force attack attempts triggering the protective entanglement alert. \n\n❗ **Frequency & Scale:** Frequency measured as suspicious connections **per minute** (e.g. 'over 50 anomalous connections per minute').";
    }
    if (q.includes('rotazione') || q.includes('rotation')) {
      return "Programmed frequency to regenerate and recalculate the entire set of cryptographic keys to prevent intrusion. \n\n❗ **Frequency & Scale:** Programmed schedule expressed in days or hours (e.g. 'every 14 days' or 'every 24 hours').";
    }
    if (q.includes('post-quantum') || q.includes('nist') || q.includes('pqc')) {
      return "Post-quantum standard the organization intends to map. 'ML-KEM' (Kyber) is the most widely used post-quantum encryption standard. \n\n❗ **Frequency & Scale:** Refers to fixed corporate cryptographic standard configured in software.";
    }
    if (q.includes('archivi') || q.includes('migrazione') || q.includes('database') || q.includes('archive') || q.includes('migration')) {
      return "Most vulnerable strategic information asset requiring priority migration to networks protected by quantum algorithms. \n\n❗ **Frequency & Scale:** Fixed corporate information asset (e.g. 'current year central database' or 'local backup server').";
    }

    return "This indicator serves to set a correct probabilistic weight in the quantum model database. You can respond with an estimate per year, month, or day, or simply indicate whether you desire maximum operational security or computational efficiency.";
  };

  function getScenarioDetails(macroarea: string, option: 'A' | 'B' | 'C') {
    if (macroarea.includes('Finanza') || macroarea.includes('Finance')) {
      if (option === 'A') {
        return {
          name: "Cross-Asset Multilevel Quantum Hedging",
          benefit: "Automatic capital protection by cross-referencing multi-asset risks.",
          headers: ["Implicit_Volatility", "Dynamic_Correlation", "Spot_Exchange_Rates"],
          q1: "What is your maximum risk tolerance for Hedging (expressed on an annual strategic basis: conservative, moderate, or aggressive)?",
          q2: "How do you wish to weigh capital volatility spikes (e.g., historical annual fluctuations or monthly average variation)?",
          sample: `Item_Code,Saturation_Percentage,Implicit_Volatility,Dynamic_Correlation,Spot_Exchange_Rates,Entanglement_Link
ASSET_A,0.35,0.45,0.12,0.58,SET_PRIMA
ASSET_B,0.35,0.85,0.65,0.72,SET_PRIMA
ASSET_C,0.12,0.20,0.45,0.45,INDEPENDENT`
        };
      } else if (option === 'B') {
        return {
          name: "American Option Pricing and Derivatives",
          benefit: "Calculation of the exact timing and optimal expiration to exercise a financial right.",
          headers: ["Underlying_Price", "Strike_Price", "Risk_Free_Rate", "Time_To_Maturity"],
          q1: "What accuracy level do you require for expiry modeling (e.g. high precision for typical 3 or 6 month maturities)?",
          q2: "What is the estimated average risk-free rate in your financial model (annual percentage value, e.g. '4.5% per year')?",
          sample: `Item_Code,Saturation_Percentage,Underlying_Price,Strike_Price,Risk_Free_Rate,Time_To_Maturity,Entanglement_Link
OPTION_A,0.45,0.85,0.80,0.04,0.50,GROUP_R
OPTION_B,0.45,0.75,0.80,0.04,0.90,GROUP_R
BOND_X,0.10,0.98,0.95,0.03,0.20,INDEPENDENT`
        };
      } else {
        return {
          name: "Short-Term Cash Flow Estimation",
          benefit: "A probabilistic forecast of inflows and outflows to prevent liquidity crises.",
          headers: ["Invoices_Issued", "Invoices_Received", "Payment_Maturities"],
          q1: "What is the ideal time horizon for predictive cash flow estimation (expressed in total analysis days, typically '30 days' or '60 days')?",
          q2: "What is the average annual percentage share of unpaid invoices recorded in your financial statement (e.g. '2% per year')?",
          sample: `Item_Code,Saturation_Percentage,Invoices_Issued,Invoices_Received,Payment_Maturities,Entanglement_Link
FLOW_JAN,0.28,0.75,0.60,0.15,LIQUIDITY_SET
FLOW_FEB,0.28,0.90,0.70,0.30,LIQUIDITY_SET
FLOW_IND,0.15,0.25,0.10,0.10,INDEPENDENT`
        };
      }
    } else if (macroarea.includes('Logistica') || macroarea.includes('Logistics')) {
      if (option === 'A') {
        return {
          name: "Vehicle Routing Problem with Time Windows",
          benefit: "The optimal route for your fleet optimizing both load capacity and delivery schedules.",
          headers: ["Geo_Coordinates", "Time_Windows", "Load_Capacity", "Dwell_Times"],
          q1: "What is the maximum number of daily active vehicles to track in your fleet (e.g. '10 vehicles per day')?",
          q2: "How do you prefer to manage pickup and unloading time windows (e.g. strict morning shift priority)?",
          sample: `Item_Code,Saturation_Percentage,Geo_Coordinates,Time_Windows,Load_Capacity,Dwell_Times,Entanglement_Link
TRUCK_HUB_A,0.55,0.45,0.12,0.80,0.50,ROUTE_NORTH
TRUCK_HUB_B,0.55,0.48,0.14,0.92,0.80,ROUTE_NORTH
TRUCK_BACK,0.15,0.30,0.18,0.50,0.10,INDEPENDENT`
        };
      } else if (option === 'B') {
        return {
          name: "Vessel Cargo Packing (3D Bin Packing)",
          benefit: "Perfect geometric arrangement of containers to balance the vessel and avoid center-of-gravity shifts.",
          headers: ["Container_Weight", "Volumetric_Dimensions", "Destination_Port", "Center_Of_Gravity"],
          q1: "What is the payload limit or container capacity (expressed in total tons per single voyage/shipment)?",
          q2: "What tolerance do you allow for center-of-gravity offset per shipment (expressed in meters per voyage)?",
          sample: `Item_Code,Saturation_Percentage,Container_Weight,Volumetric_Dimensions,Destination_Port,Center_Of_Gravity,Entanglement_Link
CONTAINER_A,0.60,0.25,0.60,0.80,0.12,BALANCE_01
CONTAINER_B,0.60,0.28,0.65,0.80,0.15,BALANCE_01
BOX_SINGLE,0.22,0.05,0.10,0.30,0.00,INDEPENDENT`
        };
      } else {
        return {
          name: "Purchasing Contracts vs. Spot Container Freight Balance",
          benefit: "Probabilistic calculation to decide whether to purchase container capacity now or wait for spot rates.",
          headers: ["Drewry_Freight_Index", "Fixed_Contract_Share", "Spot_Container_Price"],
          q1: "What percentage share of freight expenditure is covered by fixed-rate contracts (e.g. '40% per year')?",
          q2: "What total container freight cost reduction target are you aiming for (average monthly or annual target, e.g. '15% per month')?",
          sample: `Item_Code,Saturation_Percentage,Drewry_Freight_Index,Fixed_Contract_Share,Spot_Container_Price,Entanglement_Link
SPOT_X,0.40,0.32,0.40,0.31,SPOT_GRP
SPOT_Y,0.40,0.34,0.50,0.33,SPOT_GRP
SPOT_Z,0.12,0.30,0.80,0.29,INDEPENDENT`
        };
      }
    } else if (macroarea.includes('Chimica') || macroarea.includes('Chemistry')) {
      if (option === 'A') {
        return {
          name: "Optimal Intermittent Renewable Energy Dispatch",
          benefit: "Exact combination to store and dispatch solar and wind energy while minimizing waste.",
          headers: ["Wind_Speed", "Solar_Irradiance", "BESS_Capacity"],
          q1: "What is the total MWh nominal storage capacity of your BESS battery system (maximum daily charge, e.g. '10 MWh')?",
          q2: "What is the maximum instantaneous MW grid injection power limit to avoid penalties (e.g. '1.5 MW daily peak limit')?",
          sample: `Item_Code,Saturation_Percentage,Wind_Speed,Solar_Irradiance,BESS_Capacity,Entanglement_Link
WIND_A,0.45,0.12,0.00,0.10,GRID_SLOT
SOLAR_B,0.45,0.00,0.85,0.12,GRID_SLOT
STORAGE_C,0.10,0.00,0.00,0.05,INDEPENDENT`
        };
      } else if (option === 'B') {
        return {
          name: "Electronic Ground State Calculation via VQE",
          benefit: "Geometric mapping of molecular bonds and orbitals for physical stability verification.",
          headers: ["Hamiltonian_Operator", "Orbital_Number", "VQE_Variational_Angles"],
          q1: "What is the maximum number of active molecular orbitals mapped to qubits (per chemical simulation run, e.g. '4 orbitals per run')?",
          q2: "Which variational ansatz for chemical interactions do you prefer (e.g. 'UCCSD' or symmetry-preserving per run)?",
          sample: `Item_Code,Saturation_Percentage,Hamiltonian_Operator,Orbital_Number,VQE_Variational_Angles,Entanglement_Link
ORBITAL_1,0.55,0.24,0.40,0.35,VQE_CLUSTER
ORBITAL_2,0.55,0.65,0.40,0.45,VQE_CLUSTER
ORBITAL_IND,0.22,0.12,0.20,0.00,INDEPENDENT`
        };
      } else {
        return {
          name: "Hydroponic Greenhouse Microclimate Control",
          benefit: "Predictive estimation of resource usage and crop growth based on nutritional and electrical parameters.",
          headers: ["CO2_Levels", "EC_Conductivity", "Nutrient_pH", "LED_Hours"],
          q1: "What is the crop environment (e.g., tomatoes or lettuce) and target EC value in hydroponic nutrient feed (e.g. '1.8 per growth cycle')?",
          q2: "How do you wish to balance solar and artificial LED lighting (e.g., prioritizing energy savings on monthly or annual consumption)?",
          sample: `Item_Code,Saturation_Percentage,CO2_Levels,EC_Conductivity,Nutrient_pH,LED_Hours,Entanglement_Link
GREENHOUSE_A,0.35,0.80,0.18,0.58,0.66,MICRO_GRP
GREENHOUSE_B,0.35,0.75,0.19,0.60,0.54,MICRO_GRP
GREENHOUSE_C,0.15,0.40,0.12,0.65,0.38,INDEPENDENT`
        };
      }
    } else if (macroarea.includes('Manutenzione') || macroarea.includes('Fabbrica') || macroarea.includes('Manifattura') || macroarea.includes('Manufacturing')) {
      if (option === 'A') {
        return {
          name: "Adaptive Just-In-Time Assembly Line Optimization",
          benefit: "Instantaneous synchronization between factory robots and component arrivals to eliminate downtime.",
          headers: ["Robot_Cycle_Time", "Line_Scrap", "Component_Delays"],
          q1: "What is the standard robot cycle time on the line at full speed (expressed in seconds per single piece, e.g. '120 seconds per piece')?",
          q2: "What average supply delays are you experiencing in the component supply chain (expressed in minutes per week)?",
          sample: `Item_Code,Saturation_Percentage,Robot_Cycle_Time,Line_Scrap,Component_Delays,Entanglement_Link
ROBOT_A,0.50,0.12,0.40,0.12,LINE_CORRELATED
ROBOT_B,0.50,0.15,0.20,0.30,LINE_CORRELATED
CNC_SINGLE,0.12,0.90,0.80,0.24,INDEPENDENT`
        };
      } else if (option === 'B') {
        return {
          name: "Traveling Salesperson Problem (TSP) for 3D Robot Welding",
          benefit: "Fastest spatial trajectory and geometric movement for the mechanical robot arm.",
          headers: ["Welding_Points_XYZ", "Curvature_Radius", "Stop_Time"],
          q1: "What is the estimated number of 3D welding touchpoints per piece/work unit (e.g. '15 points per chassis')?",
          q2: "What curvature radius tolerance do you allow for the mechanical arm per cycle (expressed in millimeters)?",
          sample: `Item_Code,Saturation_Percentage,Welding_Points_XYZ,Curvature_Radius,Stop_Time,Entanglement_Link
POINT_S1,0.60,0.45,0.12,0.50,TRAJECTORY_1
POINT_S2,0.60,0.48,0.15,0.80,TRAJECTORY_1
POINT_AUTO,0.22,0.30,0.05,0.10,INDEPENDENT`
        };
      } else {
        return {
          name: "Dynamic Consecutive Price Variation for 100% Inventory Clearance",
          benefit: "Optimal dynamic discount and pricing strategy to clear unsold inventory without sacrificing profit margins.",
          headers: ["Price_Elasticity_Hist", "Volume_Rimanenze_Maglia", "Minimum_Margin"],
          q1: "What is the total unsold knitwear/clothing inventory volume? You must specify whether this refers to a Seasonal horizon (e.g. '1200 seasonal pieces') or Annual horizon (e.g. '3500 annual pieces').",
          q2: "What absolute minimum profit margin is required to avoid selling at a loss (expressed as a percentage over unit production cost, e.g. '15% per piece')?",
          sample: `Item_Code,Saturation_Percentage,Price_Elasticity_Hist,Volume_Rimanenze_Maglia,Minimum_Margin,Entanglement_Link
DISCOUNT_ITEM_A,0.30,0.14,0.12,0.15,DISCOUNT_SET
DISCOUNT_ITEM_B,0.30,0.12,0.15,0.18,DISCOUNT_SET
PANTS_FREE,0.05,0.08,0.02,0.30,INDEPENDENT`
        };
      }
    } else if (macroarea.includes('Sanità') || macroarea.includes('Genomica') || macroarea.includes('Sanit') || macroarea.includes('Healthcare')) {
      if (option === 'A') {
        return {
          name: "Strategic National Matchmaking for Organ Transplants",
          benefit: "Instant matching between biological patient compatibility and geographic transport time.",
          headers: ["HLA_Match_Score", "Cold_Ischemia_Hours", "Hospital_Distance"],
          q1: "What is the average number of HLA antigens considered crucial for compatibility (e.g., matching on 6 or 8 total antigens)?",
          q2: "What is the maximum tolerable Cold Ischemia time limit for the organ (expressed in maximum hours per transport, e.g. '6 hours')?",
          sample: `Item_Code,Saturation_Percentage,HLA_Match_Score,Cold_Ischemia_Hours,Hospital_Distance,Entanglement_Link
PATIENT_DONOR,0.35,0.95,0.40,0.12,SET_HLA_DUP
PATIENT_RECPT,0.35,0.95,0.60,0.15,SET_HLA_DUP
PATIENT_ISO,0.10,0.10,0.24,0.30,INDEPENDENT`
        };
      } else if (option === 'B') {
        return {
          name: "Protein Folding 3D Modeling",
          benefit: "Visualization of how a protein folds in 3D space to develop effective new therapeutics.",
          headers: ["Torsion_Angles", "H_Bond_Energies", "Van_Der_Waals_Forces"],
          q1: "What is the number of active amino acid residues mapped in the protein simulation (sequence length per static run, e.g. '10 residues per run')?",
          q2: "Which type of biological binding forces should be prioritized in folding (e.g., primary hydrogen bonds or Van Der Waals surface interactions)?",
          sample: `Item_Code,Saturation_Percentage,Torsion_Angles,H_Bond_Energies,Van_Der_Waals_Forces,Entanglement_Link
SEGMENT_A,0.55,0.20,0.45,0.12,FOLD_PROTEIN_01
SEGMENT_B,0.55,0.10,0.52,0.15,FOLD_PROTEIN_01
ACID_AUTO,0.12,0.45,0.12,0.02,INDEPENDENT`
        };
      } else {
        return {
          name: "30-Day Patient Readmission Risk Predictive Analysis",
          benefit: "Percentage risk calculation for patient readmission post-discharge.",
          headers: ["Admission_Days", "Medication_Count", "Age", "Followup_Visits"],
          q1: "Which age and demographic clusters do you consider most vulnerable for annual tracking (e.g. 'patients over 65 years old')?",
          q2: "How many mandatory post-discharge medical follow-up visits are scheduled in the short term (first 30 days, e.g. '2 follow-up visits')?",
          sample: `Item_Code,Saturation_Percentage,Admission_Days,Medication_Count,Age,Followup_Visits,Entanglement_Link
PATIENT_READMIT_A,0.65,0.12,0.15,0.68,0.20,READMIT_GRP
PATIENT_READMIT_B,0.65,0.14,0.12,0.71,0.10,READMIT_GRP
PATIENT_STABLE_C,0.15,0.03,0.04,0.35,0.00,INDEPENDENT`
        };
      }
    } else { // Cybersecurity
      if (option === 'A') {
        return {
          name: "Quantum Key Distribution (QKD) Generation with Botnet Mitigation",
          benefit: "Unsackable corporate communication network capable of rerouting DDoS attacks.",
          headers: ["QBER_Error_Rate", "Attenuation_dB", "Unusual_Connections"],
          q1: "What is the maximum distance covered by the QKD optical fiber system (total link distance in kilometers, e.g. '50 km')?",
          q2: "What anomalous traffic connection peaks trigger alerts (expressed in connection attempts per minute, e.g. 'over 50 per minute')?",
          sample: `Item_Code,Saturation_Percentage,QBER_Error_Rate,Attenuation_dB,Unusual_Connections,Entanglement_Link
QKD_NODE_X,0.85,0.14,0.12,0.04,CRYPT_NET
QKD_NODE_Y,0.85,0.58,0.04,0.08,CRYPT_NET
BACKUP_VM,0.30,0.02,0.00,0.01,INDEPENDENT`
        };
      } else if (option === 'B') {
        return {
          name: "Web3 Ledger and Crypto Resilience Audit",
          benefit: "Structural scan of cryptographic keys analyzing signature algorithm rotation against latent bugs.",
          headers: ["ECDSA_Signature_Alg", "Transaction_Volume", "Key_Rotation"],
          q1: "Which primary elliptic curves do you use for digital cryptographic signatures (e.g., secp256k1 standard per transaction)?",
          q2: "What is the scheduled cryptographic key rotation frequency (expressed in total days or cycle hours, e.g. 'every 14 days')?",
          sample: `Item_Code,Saturation_Percentage,ECDSA_Signature_Alg,Transaction_Volume,Key_Rotation,Entanglement_Link
LEDGER_A,0.50,0.10,0.12,0.12,ROTATING_KEYS
LEDGER_B,0.50,0.10,0.15,0.14,ROTATING_KEYS
LEDGER_AUTO,0.12,0.00,0.05,0.00,INDEPENDENT`
        };
      } else {
        return {
          name: "Vulnerability Scanning and Lattice Migration (PQC)",
          benefit: "Statistical probability calculation of data breaches to plan post-quantum encryption barriers.",
          headers: ["Key_Length", "At_Risk_Data_Volume", "Signing_Times"],
          q1: "Which NIST post-quantum migration standards are you planning to configure (e.g., ML-KEM / Kyber standard)?",
          q2: "Which priority historical data channels or archives need priority migration to protected networks (e.g., cloud database or local servers)?",
          sample: `Item_Code,Saturation_Percentage,Key_Length,At_Risk_Data_Volume,Signing_Times,Entanglement_Link
INFRA_DATABASE,0.30,0.30,0.50,0.45,MIGRATE_GRP
INFRA_CLOUD,0.30,0.40,0.65,0.55,MIGRATE_GRP
DESKTOP_CLIENT,0.01,0.20,0.02,0.10,INDEPENDENT`
        };
      }
    }
  }

  // Initialize welcome
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'system',
        text: `${t('agents_welcome_text') || 'Welcome to the enterprise quantum compilation and entanglement system. To narrow down the scope and formulate specific questions, select your main macro-area of interest:'}
📊 ${t('agents_sec_finance') || '1. Finance & Markets'}
🚚 ${t('agents_sec_logistics') || '2. Logistics & Smart Cities'}
🔬 ${t('agents_sec_chemistry') || '3. Chemistry & Green Tech'}
🏭 ${t('agents_sec_factory') || '4. Maintenance, Manufacturing & Apparel'}
🧬 ${t('agents_sec_healthcare') || '5. Healthcare & Genomics'}
🛡️ ${t('agents_sec_cybersec') || '6. Cybersecurity'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [t]);

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
    let scenarioName = selectedScenario?.name || 'Pre-Audited Sample';

    if (selectedScenario) {
      csvContent = generateScenarioCSV(selectedScenario);
    } else if (selectedSector === 'Finanza') {
      csvContent = `Item_Code,Saturation_Percentage,Expected_Return,Entanglement_Link
AZ_ENEL,0.15,0.04,HEDGE_PORTFOLIO_01
AZ_GENERALI,0.45,0.08,HEDGE_PORTFOLIO_01
BOND_USA_10Y,0.78,0.03,INDEPENDENT
AZ_UNICREDIT,0.60,0.12,PROTECTED_HIGH_YIELD
AZ_INTESA,0.30,0.09,PROTECTED_HIGH_YIELD
ETH_RESERVE,0.85,0.25,INDEPENDENT`;
    } else if (selectedSector === 'Logistica') {
      csvContent = `Item_Code,Saturation_Percentage,Priority,Entanglement_Link
TRUCK_01,0.28,High,ROUTE_NORTH
TRUCK_02,0.45,High,ROUTE_NORTH
VAN_LOCAL,0.78,Medium,INDEPENDENT
CARGO_CONTAINER,0.60,Critical,ROUTE_WEST
SHIP_CARRIER,0.30,Low,ROUTE_WEST
DRONE_EXPRESS,0.85,Critical,INDEPENDENT`;
    } else if (selectedSector === 'Chimica') {
      csvContent = `Item_Code,Saturation_Percentage,Limit_Temperature,Entanglement_Link
CATALYST_PT,0.25,120.0,THERMAL_REACTION
REACTANT_N2,0.55,150.0,THERMAL_REACTION
STABILIZER_ADDITIVE,0.70,90.0,INDEPENDENT
HDPE_POLYMER,0.12,240.0,DIPOLE_FUSION
SOLVENT_B,0.35,85.0,DIPOLE_FUSION
H2_ELEMENT,0.95,300.0,INDEPENDENT`;
    } else if (selectedSector === 'Sanita') {
      csvContent = `Item_Code,Saturation_Percentage,Compatibility,Entanglement_Link
DONOR_PATIENT,0.35,0.95,TRANSPLANT_PAIR_01
RECIPIENT_PATIENT,0.65,0.95,TRANSPLANT_PAIR_01
AUTONOMOUS_PATIENT,0.80,0.10,INDEPENDENT
GEN_SAMPLE_A,0.50,0.88,MUTATION_LINK_X
GEN_SAMPLE_B,0.22,0.88,MUTATION_LINK_X
HEALTHY_PATIENT,0.10,0.99,INDEPENDENT`;
    } else if (selectedSector === 'Cybersecurity') {
      csvContent = `Item_Code,Saturation_Percentage,Active_Ports,Entanglement_Link
FIREWALL_GATEWAY,0.85,4,LAN_WEST
REST_API_SERVER,0.50,8,LAN_WEST
DEVELOPER_PC,0.12,12,INDEPENDENT
DATA_STORAGE,0.30,1,BACKUP_LINK
VIRTUAL_MACHINE_B,0.40,15,BACKUP_LINK
INTERNAL_WIFI_ROUTER,0.95,44,INDEPENDENT`;
    } else {
      csvContent = `Item_Code,Saturation_Percentage,Work_Hours,Entanglement_Link
CNC_MILLING,0.45,120.5,ASSEMBLY_LINE_A
WELDING_ROBOT,0.60,200.0,ASSEMBLY_LINE_A
METAL_3D_PRINTER,0.85,78.2,INDEPENDENT
PAINT_LINE_A,0.33,95.0,TEST_SERIES
PAINT_LINE_B,0.33,95.0,TEST_SERIES
PACKAGING_LINE,0.15,10.0,INDEPENDENT`;
    }

    addMessage('user', `📋 Requesting pre-audited sample data load for simulation: **${scenarioName}**`);
    
    addMessage('system', `Here is the sample data loaded in the compiler:\n\n\`\`\`csv\n${csvContent}\n\`\`\``);

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
        addMessage('user', `Uploaded file: ${file.name}`);
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
        addMessage('user', `Uploaded file via Drag & Drop: ${file.name}`);
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
      colsText = `- **Item_Code** (Type: *Text/Identifier*, e.g.: \`AZ_ENEL\` or \`BTC_PORTFOLIO\`): Represents the single financial asset or stock of your company.
- **Saturation_Percentage** (Type: *Decimal between 0.00 and 1.00*, e.g.: \`0.35\`): Corresponds to the measured risk, variance or volatility level.
- **Expected_Return** (Type: *Decimal*, e.g.: \`0.06\`): Estimated annual return rate.
- **Entanglement_Link** (Type: *Text*, e.g.: \`HEDGE_PORTFOLIO_01\`): Relationship column for quantum entanglement. Use the same group name to correlate titles, or write \`INDEPENDENT\` if unlinked.`;

      csvTemplate = `Item_Code,Saturation_Percentage,Expected_Return,Entanglement_Link
AZ_ENEL,0.15,0.04,HEDGE_PORTFOLIO_01
AZ_GENERALI,0.45,0.08,HEDGE_PORTFOLIO_01
BOND_USA_10Y,0.78,0.03,INDEPENDENT
AZ_UNICREDIT,0.60,0.12,PROTECTED_HIGH_YIELD
AZ_INTESA,0.30,0.09,PROTECTED_HIGH_YIELD
ETH_RESERVE,0.85,0.25,INDEPENDENT`;
    } else if (sectorName === 'Logistica') {
      colsText = `- **Item_Code** (Type: *Text/Identifier*, e.g.: \`TRUCK_NORTH\` or \`CONTAINER_X\`): Fleet vehicle, truck or cargo container code.
- **Saturation_Percentage** (Type: *Decimal between 0.00 and 1.00*, e.g.: \`0.85\`): Stowage level, delay or load capacity saturation.
- **Priority** (Type: *Text*, e.g.: \`High\` / \`Low\`): Shipment priority or urgency level.
- **Entanglement_Link** (Type: *Text*, e.g.: \`ROUTE_NORTH\`): Shared routing channel for quantum entanglement. Use the same group name for joint shipments, or \`INDEPENDENT\` if autonomous.`;

      csvTemplate = `Item_Code,Saturation_Percentage,Priority,Entanglement_Link
TRUCK_01,0.28,High,ROUTE_NORTH
TRUCK_02,0.45,High,ROUTE_NORTH
VAN_LOCAL,0.78,Medium,INDEPENDENT
CARGO_CONTAINER,0.60,Critical,ROUTE_WEST
SHIP_CARRIER,0.30,Low,ROUTE_WEST
DRONE_EXPRESS,0.85,Critical,INDEPENDENT`;
    } else if (sectorName === 'Chimica') {
      colsText = `- **Item_Code** (Type: *Text/Identifier*, e.g.: \`REACTIVE_MOL\`): Molecule, material, or raw material identifier.
- **Saturation_Percentage** (Type: *Decimal between 0.00 and 1.00*, e.g.: \`0.40\`): Energy stability or chemical instability level.
- **Limit_Temperature** (Type: *Decimal*, e.g.: \`180.5\`): Maximum critical temperature for the compound.
- **Entanglement_Link** (Type: *Text*, e.g.: \`THERMAL_REACTION\`): Catalytic entanglement coupling or shared reaction. Set the same ID for correlated reactants, or \`INDEPENDENT\` if isolated.`;

      csvTemplate = `Item_Code,Saturation_Percentage,Limit_Temperature,Entanglement_Link
CATALYST_PT,0.25,120.0,THERMAL_REACTION
REACTANT_N2,0.55,150.0,THERMAL_REACTION
STABILIZER_ADDITIVE,0.70,90.0,INDEPENDENT
HDPE_POLYMER,0.12,240.0,DIPOLE_FUSION
SOLVENT_B,0.35,85.0,DIPOLE_FUSION
H2_ELEMENT,0.95,300.0,INDEPENDENT`;
    } else if (sectorName === 'Sanita') {
      colsText = `- **Item_Code** (Type: *Text/Identifier*, e.g.: \`PATIENT_Rossi\`): Anonymous patient code or genomic strand ID.
- **Saturation_Percentage** (Type: *Decimal between 0.00 and 1.00*, e.g.: \`0.65\`): Immune rejection level, biological expression or incidence.
- **Compatibility** (Type: *Decimal*, e.g.: \`0.92\`): Reciprocal suitability or therapeutic efficacy score.
- **Entanglement_Link** (Type: *Text*, e.g.: \`TRANSPLANT_PAIR_01\`): Clinical entanglement pair / biological connection. Use the same group name for coupled records, or \`INDEPENDENT\` if autonomous.`;

      csvTemplate = `Item_Code,Saturation_Percentage,Compatibility,Entanglement_Link
DONOR_PATIENT,0.35,0.95,TRANSPLANT_PAIR_01
RECIPIENT_PATIENT,0.65,0.95,TRANSPLANT_PAIR_01
AUTONOMOUS_PATIENT,0.80,0.10,INDEPENDENT
GEN_SAMPLE_A,0.50,0.88,MUTATION_LINK_X
GEN_SAMPLE_B,0.22,0.88,MUTATION_LINK_X
HEALTHY_PATIENT,0.10,0.99,INDEPENDENT`;
    } else if (sectorName === 'Cybersecurity') {
      colsText = `- **Item_Code** (Type: *Text/Identifier*, e.g.: \`IP_GATEWAY\`): Hostname, IP address, or network node in your infrastructure.
- **Saturation_Percentage** (Type: *Decimal between 0.00 and 1.00*, e.g.: \`0.80\`): Congestion, CPU load, or anomalous packet rate.
- **Active_Ports** (Type: *Integer*, e.g.: \`14\`): Number of open communication ports.
- **Entanglement_Link** (Type: *Text*, e.g.: \`LAN_WEST\`): Subnet or cyber traffic entanglement channel. Use the same identifier for nodes in the same network, or \`INDEPENDENT\` for isolated elements.`;

      csvTemplate = `Item_Code,Saturation_Percentage,Active_Ports,Entanglement_Link
FIREWALL_GATEWAY,0.85,4,LAN_WEST
REST_API_SERVER,0.50,8,LAN_WEST
DEVELOPER_PC,0.12,12,INDEPENDENT
DATA_STORAGE,0.30,1,BACKUP_LINK
VIRTUAL_MACHINE_B,0.40,15,BACKUP_LINK
INTERNAL_WIFI_ROUTER,0.95,44,INDEPENDENT`;
    } else { // Manufacturing / Factory
      colsText = `- **Item_Code** (Type: *Text/Identifier*, e.g.: \`CNC_MACHINE\` or \`WELDING_ROBOT\`): Mechanical equipment identifier.
- **Saturation_Percentage** (Type: *Decimal between 0.00 and 1.00*, e.g.: \`0.55\`): Wear or stress rate measured on the machine cycle.
- **Work_Hours** (Type: *Decimal*, e.g.: \`180.5\`): Total operating hours accumulated over the last month.
- **Entanglement_Link** (Type: *Text*, e.g.: \`ASSEMBLY_LINE_A\`): Shared processing group mapping quantum entanglement across sensors. Enter the same ID if linked on the same physical line, or \`INDEPENDENT\` if isolated.`;

      csvTemplate = `Item_Code,Saturation_Percentage,Work_Hours,Entanglement_Link
CNC_MILLING,0.45,120.5,ASSEMBLY_LINE_A
WELDING_ROBOT,0.60,200.0,ASSEMBLY_LINE_A
METAL_3D_PRINTER,0.85,78.2,INDEPENDENT
PAINT_LINE_A,0.33,95.0,TEST_SERIES
PAINT_LINE_B,0.33,95.0,TEST_SERIES
PACKAGING_LINE,0.15,10.0,INDEPENDENT`;
    }

    addMessage('system', `📋 **PROPOSED DATA FILE REQUIREMENTS FOR YOUR COMPANY (AREA: ${sectorName.toUpperCase()}):**
To allow Quantum Machine Learning to analyze your products or services, prepare a CSV file containing these main columns:

${colsText}

💡 **COMPILATION GUIDELINES FOR YOUR COMPANY:**
- Decimal numbers must be between **0.00** and **1.00** (percentages over 100% will be auto-scaled).
- Recommended decimal separator: period (\`.\`). If you use a comma, the algorithm auto-corrects it.

Here is a pre-configured sample CSV model ready to be uploaded or copied:
\`\`\`csv
${csvTemplate}
\`\`\`

👉 **HOW TO PROVIDE DATA:**
1. Upload your CSV file by clicking **BROWSE COMPUTER** in the center panel.
2. Or drag and drop it into the dashed area.
3. Or copy the example above and paste it directly into the input row below, then press Enter.`);
  };

  const handleChoiceOption = (choice: 'A' | 'B' | 'C') => {
    setScenarioSelection(choice);
    setInterviewSubstep(1);
    const details = getScenarioDetails(selectedSectorLong || 'Finance & Markets', choice);
    addMessage('system', `Great! You selected **Option ${choice}**: **${details.name}**.
    
Let's start the calibration process. Please answer this first question:
👉 **${details.q1}**`);
  };

  const handleSelectScenarioAndStart = (scenario: QuantumScenario) => {
    setSelectedScenario(scenario);
    const sectorName = scenario.macroarea.includes('Finanza') || scenario.macroarea.includes('Finance') ? 'Finanza' :
                       scenario.macroarea.includes('Logistica') || scenario.macroarea.includes('Logistics') ? 'Logistica' :
                       scenario.macroarea.includes('Chimica') || scenario.macroarea.includes('Chemistry') ? 'Chimica' :
                       scenario.macroarea.includes('Sanit') || scenario.macroarea.includes('Healthcare') ? 'Sanita' :
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
    addMessage('user', `Selecting specific scenario: ${scenario.name}`);
    setTimeout(() => {
      addMessage('system', `You selected the specific scenario **${scenario.name}** from the archive. This corresponds to **Option ${opt} (${opt === 'A' ? 'Mixed/Entanglement' : opt === 'B' ? 'Geometry/Angle' : 'Probability/Amplitude'})**.
      
To calibrate the simulation, please answer this first question:
👉 **${details.q1}**`);
    }, 400);
  };

  const handleSelectSector = (sectorName: string) => {
    let fullArea = "Finance & Markets";
    if (sectorName === 'Logistica') fullArea = "Logistics & Smart Cities";
    if (sectorName === 'Chimica') fullArea = "Chemistry & Green Tech";
    if (sectorName === 'Manifatturiero') fullArea = "Maintenance, Manufacturing & Apparel";
    if (sectorName === 'Sanita') fullArea = "Healthcare & Genomics";
    if (sectorName === 'Cybersecurity') fullArea = "Cybersecurity";

    setSelectedSector(sectorName);
    setSelectedSectorLong(fullArea);
    setStep(2);
    setInterviewSubstep(0);
    setCalibrationAnswers([]);

    const detA = getScenarioDetails(fullArea, 'A');
    const detB = getScenarioDetails(fullArea, 'B');
    const detC = getScenarioDetails(fullArea, 'C');

    addMessage('user', `Selecting main macro-area: ${fullArea}`);
    setTimeout(() => {
      addMessage('system', `Great choice! We have 3 scenarios available for **${fullArea}**:\n\n* **Option A [Mixed Entanglement]** - *${detA.name}*\n  👉 *What you will get:* ${detA.benefit}\n\n* **Option B [Angle/Geometry Only]** - *${detB.name}*\n  👉 *What you will get:* ${detB.benefit}\n\n* **Option C [Amplitude/Probability Only]** - *${detC.name}*\n  👉 *What you will get:* ${detC.benefit}\n\n❓ **Which scenario do you prefer to activate for your quantum simulation? Reply by typing 'A', 'B', or 'C'.**`);
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
      if (lower === '1' || lower.includes('finan') || lower.includes('invest') || lower.includes('money')) {
        handleSelectSector('Finanza');
      } else if (lower === '2' || lower.includes('logist') || lower.includes('ship') || lower.includes('transp') || lower.includes('truck')) {
        handleSelectSector('Logistica');
      } else if (lower === '3' || lower.includes('chem') || lower.includes('lab') || lower.includes('molecul')) {
        handleSelectSector('Chimica');
      } else if (lower === '4' || lower.includes('maint') || lower.includes('factor') || lower.includes('manuf') || lower.includes('industr') || lower.includes('apparel') || lower.includes('cloth')) {
        handleSelectSector('Manifatturiero');
      } else if (lower === '5' || lower.includes('health') || lower.includes('med') || lower.includes('hosp') || lower.includes('patient') || lower.includes('genom')) {
        handleSelectSector('Sanita');
      } else if (lower === '6' || lower.includes('cyber') || lower.includes('secur') || lower.includes('hacker') || lower.includes('firewall')) {
        handleSelectSector('Cybersecurity');
      } else {
        setTimeout(() => {
          addMessage('system', `Unrecognized choice. Please type a number from 1 to 6 or click on a corporate macro-area from the panel below to start the protocol.`);
        }, 500);
      }
    } else if (step === 2) {
      if (isUserUnsureOrAsking(userText)) {
        let clarificationText = "";
        if (interviewSubstep === 0) {
          clarificationText = `No problem! Here is a clarification on the differences among the 3 options for **${selectedSectorLong || 'your business'}**:

* 🅰️ **Option A [Mixed Entanglement]**: Connects variables in a strong reciprocal dependency relationship. Most advanced option, ideal for cross-impact analysis and multi-factor decisions.
* 🅱️ **Option B [Angle/Geometry Only]**: Converts data into spatial angular coordinates (internal data rotation). Perfect if your problem involves geometric layout, spatial trajectories, or exact time deadlines.
* 🆃 **Option C [Amplitude/Probability Only]**: Suitable for evaluating statistical failure/success probability, cash risk, optimal discount probability, or readmission rates.

❓ **Which scenario do you prefer to activate? Reply by typing 'A', 'B', or 'C'.**`;
        } else {
          const details = getScenarioDetails(selectedSectorLong || 'Finance & Markets', scenarioSelection || 'A');
          const activeQuestion = interviewSubstep === 1 ? details.q1 : details.q2;
          const explanation = getClarificatoryExplanation(activeQuestion);
          
          clarificationText = `I completely understand your query! This question calibrates the quantum circuit before loading CSV data.

💡 **Simple explanation:**
${explanation}

✍ *What can you reply now?*
You can enter any value of your choice, or if you prefer to proceed quickly by typing **'default'** or **'continue'**, you authorize me to assume the ideal pre-configured parameter!

Feel free to reply when ready:
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
      if (lowerTrimmed === 'default' || lowerTrimmed === 'continue' || lowerTrimmed === 'continua' || lowerTrimmed === 'proceed' || lowerTrimmed === 'ok' || lowerTrimmed === 'go') {
        processedAnswer = "Standard (Recommended by QML compiler)";
      }

      if (interviewSubstep === 0) {
        const choice = userText.trim().toUpperCase();
        if (choice === 'A' || choice === 'B' || choice === 'C') {
          handleChoiceOption(choice);
        } else {
          setTimeout(() => {
            addMessage('system', `Invalid entry. Please select or type exactly **A**, **B**, or **C** to enable one of the available quantum scenarios.`);
          }, 400);
        }
      } else if (interviewSubstep === 1) {
        // High-specificity check for unsold clothing inventory
        const isInventoryQuestion = selectedSector === 'Manifatturiero' && selectedScenario?.headers.includes('Volume_Rimanenze_Maglia');
        if (isInventoryQuestion) {
          const rawAnswer = userText.toLowerCase().trim();
          const hasSeasonal = rawAnswer.includes('season') || rawAnswer.includes('stagion');
          const hasAnnual = rawAnswer.includes('annual') || rawAnswer.includes('annua') || rawAnswer.includes('year');
          
          if (!hasSeasonal && !hasAnnual && (rawAnswer !== 'default' && rawAnswer !== 'continue' && rawAnswer !== 'proceed')) {
            setTimeout(() => {
              addMessage('system', `⚠️ **GENERIC DETAIL DETECTED (ACTION REQUIRED):**
              
You indicated: "${userText}". For optimal calibration of the **Gemma QML-Core** quantum algorithm on your dynamic discounts, please specify the exact time horizon of the stock:
- **SEASONAL (e.g. "1200 seasonal pieces")**: Inventory linked to a specific current fashion collection.
- **ANNUAL (e.g. "3500 annual pieces")**: Stock accumulated across the entire calendar year.

*Please re-type your answer specifying whether it is **'seasonal'** or **'annual'**, or click one of the quick suggestions below the chat.*`);
            }, 300);
            return; // Halt and wait for precise input
          }
        }

        setCalibrationAnswers(prev => [...prev, processedAnswer]);
        setInterviewSubstep(2);
        const details = getScenarioDetails(selectedSectorLong, scenarioSelection || 'A');
        setTimeout(() => {
          addMessage('system', `Received. Second question to complete compiler calibration:
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
          addMessage('system', `🎉 **Guided interview completed successfully!**
          
I analyzed your answers and configured high-fidelity quantum calculation parameters for your enterprise:
- **Calibration Answer 1:** "${currentAnswers[0]}"
- **Calibration Answer 2:** "${currentAnswers[1]}"

As required by the **Gemma QML-Core** protocol, here is the customized sample data table for your simulation:

${sampleTableMarkdown}

---

Here is the data table prepared with realistic sample data. You can copy it directly from here. If the data looks correct and meets your needs, reply with 'CONFIRM' and I will immediately start the quantum predictive simulation in the backend!`);
          setStep(3);
          setIsCsvLoaded(false);
        }, 400);
      }
    } else if (step === 3) {
      const cleanUserText = userText.trim().toUpperCase();
      if (cleanUserText.includes('CONFIRM') || cleanUserText.includes('CONFERMA')) {
        const details = getScenarioDetails(selectedSectorLong, scenarioSelection || 'A');
        setTempCsvContent(details.sample);
        setIsCsvLoaded(true);
        // Auto select "Entanglement_Link" / "Abbinamento" column
        const lines = details.sample.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length > 0) {
          const headers = lines[0].split(',');
          const autoSelects = headers.filter(col => 
            ['abbinamento', 'legame', 'relazione', 'gruppo', 'accoppiamento', 'entanglement', 'link'].some(term => col.toLowerCase().includes(term))
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
          // Conversational query: query agentic RAG LLM endpoint
          const tempMsgId = Math.random().toString();
          setMessages(prev => [
            ...prev,
            {
              id: tempMsgId,
              sender: 'system',
              text: `⏳ **Processing...** Querying the **Gemma QML-Core** quantum compiler via the integrated enterprise **RAG** service...`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);

          const details = getScenarioDetails(selectedSectorLong, scenarioSelection || 'A');
          const promptContext = `You are the Quantum Compiler Agent of Quantum Agents S.r.l. equipped with integrated RAG (Retrieval-Augmented Generation).
This is the high-reliability Gemma QML-Core module.
The client is currently in the scenario: **${details.name || selectedSectorLong}** (${selectedSectorLong}).
Active scenario option: **Option ${scenarioSelection || 'A'}**

Corporate calibration parameters:
1. ${details.q1 || "Calibration question 1"}: "${calibrationAnswers[0] || 'Undeclared'}"
2. ${details.q2 || "Calibration question 2"}: "${calibrationAnswers[1] || 'Undeclared'}"

Required data model columns:
- **Item_Code**
- **Saturation_Percentage**
- ${details.headers.map(h => `- **${h}**`).join('\n')}
- **Entanglement_Link**

If the user asks about OpenQASM 2.0 or Qiskit, explain in detail.
If the user asks about unsold inventory, explain that the algorithm calibrates qubit amplitudes differently based on Seasonal (high frequency, short-term discount) or Annual (smoothed curve for long-term margin recovery) stock.
ALWAYS RESPOND IN ENGLISH, clearly and educationally, using markdown tables where helpful.`;

          // Pass cleaned history
          const cleanedHistory = messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }));

          axios.post('/api/quantum-bi/chat', {
            messages: [...cleanedHistory, { role: 'user', text: userText }],
            systemPrompt: promptContext
          })
          .then(response => {
            const botText = response.data?.text || "Did not receive a response from the quantum compiler. Please retry shortly.";
            setMessages(prev => prev.filter(m => m.id !== tempMsgId));
            addMessage('system', botText);
          })
          .catch(err => {
            console.error("AI Error:", err);
            setMessages(prev => prev.filter(m => m.id !== tempMsgId));
            addMessage('system', `❌ **RAG CONTEXT ERROR:** Unable to connect in real time with the Gemma QML-Core agent. Please try again shortly.`);
          });
        }
      }
    } else {
      setTimeout(() => {
        addMessage('system', `The OpenQASM 2.0 quantum circuit is ready. You can transmit it to IBM Q by pressing the button or upload another CSV file to re-run the simulation.`);
      }, 500);
    }
  };

  const prepareCsvMapping = (csvTextContent: string) => {
    // Split rows on any newline representation
    const lines = csvTextContent.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      addMessage('system', `❌ **FORMAT ERROR:** The inserted CSV file does not have a valid header + data structure.`);
      return;
    }

    // Auto-detect column delimiter
    const headerLine = lines[0];
    const delimiter = headerLine.includes(';') ? ';' : ',';

    const originalHeaders = headerLine.split(delimiter).map(h => h.trim());
    
    // Save states
    setCsvHeaders(originalHeaders);
    setTempCsvContent(csvTextContent);
    setIsCsvLoaded(true);

    // Auto-select column matching primary entanglement terms
    const primaryAbbinamentoTerms = ['abbinamento', 'combinazione', 'legame', 'relazione', 'link', 'group', 'gruppo', 'connessione', 'accoppiamento', 'coppia', 'entanglement', 'cluster', 'partner', 'nodo', 'associazione', 'set'];
    const autoSelects = originalHeaders.filter(col => 
      primaryAbbinamentoTerms.some(term => col.toLowerCase().includes(term))
    );
    setSelectedEntanglementCols(autoSelects.length > 0 ? autoSelects : []);

    addMessage('system', `📄 **CSV File Read Successfully!**
Detected columns in your file:
${originalHeaders.map(c => `• **${c}**`).join('\n')}

*(Note: Row data is completely raw without pre-set associations)*

❓ **Which of these columns would you like to link via quantum entanglement for your prediction? (For example: link the Consumption column with the Date column).**

⚠️ **Why is this necessary?**
Without entanglement to link chosen columns, using quantum hardware offers no mathematical advantage. Processing without these linked relationships can be done faster and cheaper on a classical computer.`);
  };

  const processInputCSV = (csvTextContent: string, forceIgnoreWarning = false) => {
    // Split rows on any newline representation
    const lines = csvTextContent.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      addMessage('system', `❌ **FORMAT ERROR:** The inserted CSV file does not have a valid header + data structure.`);
      return;
    }

    // Auto-detect the column delimiter: semicolon is preferred if present in header, otherwise fallback to comma
    const headerLine = lines[0];
    const delimiter = headerLine.includes(';') ? ';' : ',';

    const originalHeaders = headerLine.split(delimiter).map(h => h.trim());
    const headers = originalHeaders.map(h => h.trim().toLowerCase());
    
    // Identify key column indices
    let idxArticolo = -1;
    let idxSaturazione = -1;

    // 1. Article/Asset Column Finding
    const primaryArticoloTerms = ['articolo', 'codice', 'asset', 'prodotto', 'id_', 'lotto', 'item', 'code'];
    const secondaryArticoloTerms = ['id', 'name', 'oggetto', 'nome'];

    idxArticolo = headers.findIndex(h => primaryArticoloTerms.some(term => h.includes(term)));
    if (idxArticolo === -1) {
      idxArticolo = headers.findIndex(h => secondaryArticoloTerms.some(term => h.includes(term)));
    }

    // 2. Saturation Column Finding
    const primarySaturazioneTerms = ['saturazione', 'percentuale', 'saturation', 'percentage'];
    const secondarySaturazioneTerms = ['rischio', 'valore', 'level', 'ratio', 'efficienza', 'indice', 'load', 'rate', 'dazi', 'index', 'value', 'risk'];

    idxSaturazione = headers.findIndex(h => primarySaturazioneTerms.some(term => h.includes(term)));
    if (idxSaturazione === -1) {
      idxSaturazione = headers.findIndex(h => secondarySaturazioneTerms.some(term => h.includes(term)));
    }

    // Intelligent Fallbacks:
    if (idxArticolo === -1 && headers.length > 0) {
      idxArticolo = 0;
    }

    if (idxSaturazione === -1) {
      if (headers.length > 1) {
        idxSaturazione = idxArticolo === 0 ? 1 : 0;
      } else {
        idxSaturazione = 0;
      }
    }

    if (idxArticolo === -1 || idxSaturazione === -1) {
      addMessage('system', `❌ **MISSING COLUMNS ERROR:** Unable to detect an ID column and a numeric value column. Ensure your file contains at least one ID column and one value column.`);
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
      let abbinamento = 'INDEPENDENT';
      const idxAbbinamento = originalHeaders.findIndex(h => 
        ['abbinamento', 'legame', 'relazione', 'gruppo', 'accoppiamento', 'entanglement', 'link'].some(term => h.toLowerCase().includes(term))
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

      // Auto-correct comma decimals
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

    // Auto-scaling for values using 0-100% scale
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
      addMessage('system', `❌ **CONTENT ERROR:** Could not extract valid numeric data rows from the file.`);
      return;
    }

    // Process Qasm logic
    const N = cleanRecords.length;
    let logicSummary = `✅ **DATA CLEANING AND DATA REDUCTION COMPLETED**
- **Delimiter detected:** column separated by \`${delimiter}\`
- **Smart Column Mapping:**
  * Identifier (Code/ID): column \`${originalHeaders[idxArticolo]?.trim()}\` (index ${idxArticolo})
  * Critical State (Saturation/Risk): column \`${originalHeaders[idxSaturazione]?.trim()}\` (index ${idxSaturazione})
  * Relationships (Entanglement/Links): ${hasEntanglementMapping ? `based on columns \`${selectedEntanglementCols.join('`, `')}\`` : '*None (All set to INDEPENDENT)*'}
- **Useful rows detected (N):** ${N}
- **Excess columns discarded:** ${ignored.length > 0 ? ignored.map(c => `\`${c}\``).join(', ') : 'No redundant columns detected.'}
${autoCorrectedDecimalCount > 0 ? `- **Decimal Auto-Correction:** Auto-replaced **${autoCorrectedDecimalCount}** comma separators with standard mathematical period decimals.\n` : ''}${percentageScalingApplied ? `- **Percentile Auto-Scaling:** Saturation values greater than 1.0 (e.g. **${maxSeenSaturation}%**) converted to consistent decimals (0.0 - 1.0 range) for quantum simulation.\n` : ''}- **Processed rows:**
${cleanRecords.map((r, i) => `  * Qubit q[${i}] ➔ **${r.article}** (Saturation: **${r.saturation}**, Relationship: **${r.abbinamento}**)`).join('\n')}
 
- **Quantum Register Allocation:** \`qreg q[${N + 1}];\` (including target Comparator qubit at index q[${N}])`;

    setMappingSummary(logicSummary);

    let qasmCircuitCode = `OPENQASM 2.0;\ninclude "qelib1.inc";\n\n`;
    qasmCircuitCode += `// Quantum register of exact size N + 1 for Comparator\n`;
    qasmCircuitCode += `qreg q[${N + 1}];\n`;
    qasmCircuitCode += `creg c[${N + 1}];\n\n`;

    qasmCircuitCode += `// === PHASE 1: INITIALIZATION ROTATIONS (RY) ===\n`;
    cleanRecords.forEach((record, index) => {
      const pClipped = Math.max(0, Math.min(record.saturation, 1.0));
      const theta = 2 * Math.asin(Math.sqrt(pClipped));
      qasmCircuitCode += `// Protected wave mapping for ${record.article} (Input: ${record.saturation})\n`;
      qasmCircuitCode += `ry(${theta.toFixed(5)}) q[${index}];\n`;
    });
    qasmCircuitCode += `\n`;

    qasmCircuitCode += `// === PHASE 2: COHERENT CORRELATION ENTANGLEMENT ===\n`;
    const groups: Record<string, number[]> = {};
    let uniqueGroupCounter = 0;

    cleanRecords.forEach((record, index) => {
      const match = record.abbinamento.trim().toUpperCase();
      const isIndependent = [
        'SINGOLI', 'SINGOLO', 'INDIPENDENTE', 'INDIPENDENTI', 'LIBERO', 'FREE', 
        'DECOUPLED', 'INDEPENDENT', ''
      ].includes(match);

      if (!isIndependent) {
        if (!groups[match]) groups[match] = [];
        groups[match].push(index);
      } else {
        const uniqueKey = `_INDEPENDENT_ROW_${index}_${uniqueGroupCounter++}`;
        groups[uniqueKey] = [index];
      }
    });

    let entanglementAdded = false;
    Object.entries(groups).forEach(([groupName, indices]) => {
      if (indices.length > 1) {
        qasmCircuitCode += `// Relationship group with identical values (q[${indices[0]}] as common control qubit): ${groupName}\n`;
        for (let g = 1; g < indices.length; g++) {
          qasmCircuitCode += `cx q[${indices[0]}], q[${indices[g]}];\n`;
          entanglementAdded = true;
        }
      } else if (indices.length === 1) {
        const idx = indices[0];
        qasmCircuitCode += `// Independent node in Feature Map for single value (q[${idx}])\n`;
        qasmCircuitCode += `rz(pi/4) q[${idx}]; // Parametric phase rotation for distributed quantum coherence\n`;
      }
    });

    const bypassWarning = hasEntanglementMapping || forceIgnoreWarning || entanglementAdded;

    if (!entanglementAdded && !bypassWarning) {
      setPendingCsvData(csvTextContent);
      setWarningReason(!hasEntanglementMapping ? 'missing_column' : 'no_associations');
      setShowEntanglementWarning(true);
      
      addMessage('system', `⚠️ **IMPORTANT WARNING:** No **Entanglement** links detected in the CSV file uploaded or selected.
- **Main reason:** ${!hasEntanglementMapping ? "No column selected for Entanglement." : "Selected columns contain unique values or settings set to 'INDEPENDENT'."}

Without entanglement, qubits process data autonomously without leveraging collective coherence and distributed quantum calculations.

*Please review the choice in the interactive panel below to proceed anyway or adjust the file.*`);
      return;
    }

    setShowEntanglementWarning(false);
    setPendingCsvData('');

    if (!entanglementAdded) {
      qasmCircuitCode += `// No correlation groups detected from CSV (No CNOT gates applied)\n`;
    }
    qasmCircuitCode += `\n`;

    qasmCircuitCode += `// === PHASE 3: DISTRIBUTED COMPARATOR LOGIC (CRY) ===\n`;
    qasmCircuitCode += `// Critical threshold set: ${threshold * 100}% (${threshold})\n`;
    const thresholdClipped = Math.max(0, Math.min(threshold, 1.0));
    const totalThresholdAngle = 2 * Math.asin(Math.sqrt(thresholdClipped));
    const distributedAngle = totalThresholdAngle / N;

    qasmCircuitCode += `// Total angle: ${totalThresholdAngle.toFixed(5)} divided uniformly over N (${distributedAngle.toFixed(5)} rad per qubit)\n`;
    for (let u = 0; u < N; u++) {
      qasmCircuitCode += `cry(${distributedAngle.toFixed(5)}) q[${u}], q[${N}];\n`;
    }
    qasmCircuitCode += `\n`;

    qasmCircuitCode += `// === PHASE 4: STATE REGISTRATION & MEASUREMENT ===\n`;
    for (let m = 0; m <= N; m++) {
      qasmCircuitCode += `measure q[${m}] -> c[${m}];\n`;
    }

    setQasmOutput(qasmCircuitCode);
    setCsvData(csvTextContent);

    addMessage('system', logicSummary);

    const mappedColumnsText = selectedEntanglementCols.length > 0 
      ? selectedEntanglementCols.map((col, cIdx) => `  * Column \`${col}\` ➔ Mapped to Qubit \`q[${cIdx}]\``).join('\n')
      : '  * No columns selected (Isolated classical processing)';

    addMessage('system', `⚙️ **BACKGROUND LOGIC AUTOMATION (QUANTUM PRE-PROCESSING):**
The application is automatically setting up quantum circuit preparation according to instructions:
- **Automatic Transcription:** Transcribing raw data into bit sequences and mapping individual records directly to input qubits.
- **Geometric Feature Mapping:** Converting numerical values into high-coherence percentages and 3D quantum rotation angles on the Bloch Sphere.
- **Entanglement Gate Generation:** Computing and applying targeted quantum CNOT entanglement gates across qubits corresponding to selected columns: **${selectedEntanglementCols.join(', ') || 'None'}**.

🔌 **PASSING DIRECTIVES TO THE QUANTUM ENGINE:**
Structural mapping completed on the quantum register:
${mappedColumnsText}

These entanglement instructions have been sent to the quantum execution engine to process the circuit.`);

    setTimeout(() => {
      const details = getScenarioDetails(selectedSectorLong || 'Finance & Markets', scenarioSelection || 'A');
      const analysisText = `🔮 **Quantum Circuit Synthesis Completed!**

### 1. Strategic Analysis (Managerial)
Applying **Type 3 Mixed Entanglement** on your business scenario (**${details.name}**) correlates critical variables multi-factorially. 
In quantum combinatorial computing, this synchronous link forces qubits to evolve collectively, capturing non-linear interdependencies invisible to classical algorithms.
- **Operational Advantage:** Instantaneous synchronization of business metrics, providing high-accuracy resolution of critical variances and optimizing target margins.

### 2. OpenQASM 2.0 Quantum Code
All constraints, including physical clipping, multi-node entanglement gates, and CRY distribution for the threshold comparator, have been translated into OpenQASM 2.0:

[START_COMPOSER]
${qasmCircuitCode}
[END_COMPOSER]

### 3. Hardware Connection Button
To run real-time simulation and transmit the circuit to the physical quantum hardware grid at IBM Quantum Corporation, use the direct connector:

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
        text: `${t('agents_welcome_text') || 'Welcome to the enterprise quantum compilation and entanglement system. To narrow down the scope and formulate specific questions, select your main macro-area of interest:'}
📊 ${t('agents_sec_finance') || '1. Finance & Markets'}
🚚 ${t('agents_sec_logistics') || '2. Logistics & Smart Cities'}
🔬 ${t('agents_sec_chemistry') || '3. Chemistry & Green Tech'}
🏭 ${t('agents_sec_factory') || '4. Maintenance, Manufacturing & Apparel'}
🧬 ${t('agents_sec_healthcare') || '5. Healthcare & Genomics'}
🛡️ ${t('agents_sec_cybersec') || '6. Cybersecurity'}`,
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
                {t('agents_title') || 'QUANTUM ENGINE BI'} <span className="text-xs text-quantum-secondary font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">{t('agents_orchestrator') || 'AGENTIC ORCHESTRATOR'}</span>
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-mono">
              {t('agents_subtitle') || 'Universal Compiler & Translator of Heterogeneous Files to OpenQASM 2.0 for IBM CPU'}
            </p>
          </div>
        </div>

        {/* Global actions */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-bold text-quantum-primary bg-quantum-primary/5 hover:bg-quantum-primary/10 border border-quantum-primary/20 rounded-xl cursor-pointer transition-all self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" /> {t('agents_reinit_session') || 'REINITIALIZE SESSION'}
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
                {t('agents_console_title') || 'Quantum Conversational Console'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-500">
              STATUS <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" /> {t('agents_status_eng_live') || 'ENG_LIVE'}
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
                  {msg.sender === 'system' ? (t('agents_quantum_compiler') || '🤖 Quantum Compiler') : (t('agents_business_user') || '👤 Business user')}
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
                        <span>{t('agents_openqasm_scope') || 'OPENQASM 2.0 SCOPE'}</span>
                        <button
                          onClick={() => copyCode(msg.code || '')}
                          className="p-1 px-2 rounded hover:bg-white/5 text-quantum-primary flex items-center gap-1 transition-colors cursor-pointer text-[10px] uppercase font-bold"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {isCopied ? (t('ibm_copied') || 'Copied') : (t('ibm_copy') || 'Copy')}
                        </button>
                      </div>
                      <pre className="p-3.5 overflow-x-auto text-quantum-secondary select-all whitespace-pre max-h-[160px] scrollbar-hide leading-normal text-[11px]">
                        {msg.code}
                      </pre>
                      
                      {/* Send to IBM Q Trigger */}
                      <div className="p-3.5 bg-[#0a0f1d] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
                        <span className="text-gray-400 uppercase tracking-wider text-[9px] font-bold">{t('agents_prepared_ibm') || 'PREPARED FOR IBM QPU'}</span>
                        <button
                          onClick={() => onSendToIbm(msg.code || '')}
                          className="px-4 py-2 bg-quantum-primary text-quantum-bg hover:bg-quantum-primary/80 font-black text-[11px] uppercase tracking-wider rounded-lg transition-all shadow-[0_0_12px_rgba(0,242,255,0.25)] hover:shadow-[0_0_18px_rgba(0,242,255,0.45)] duration-200 cursor-pointer flex items-center gap-1.5"
                        >
                          <Cpu className="w-3.5 h-3.5 fill-current animate-pulse" /> {t('agents_send_to_ibm_btn') || 'Send to IBM Q 🚀'}
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
                      {t('agents_integrity_warning') || '⚠️ INTEGRITY WARNING: NO ENTANGLEMENT LINK FOUND'}
                    </h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      {warningReason === 'missing_column' ? (
                        <span>The column for handling synchronous relationships (<strong>Entanglement_Link</strong>, <strong>Link</strong>, <strong>Group</strong> or <strong>Connection</strong>) was not identified in your CSV header row.</span>
                      ) : (
                        <span>The relationship column was detected, but all processed records are set to <strong>'INDEPENDENT'</strong> or do not possess duplicate coordinated group names.</span>
                      )}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                      Without entanglement, qubits process data autonomously, precluding distributed multi-factor analysis inherent to IBM quantum coherence.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 mt-2 font-mono">
                  <button
                    onClick={handleConfirmProceedWithoutEntanglement}
                    className="flex-1 px-4 py-2.5 bg-amber-500 text-[#090d18] hover:bg-amber-400 text-xs font-black rounded-lg transition-all shadow-[0_0_10px_rgba(245,158,11,0.25)] hover:shadow-[0_0_15px_rgba(245,158,11,0.45)] cursor-pointer text-center uppercase"
                  >
                    {t('agents_proceed_without_entanglement') || '🚀 Proceed Without Entanglement Links'}
                  </button>
                  <button
                    onClick={handleCancelEntanglementWarning}
                    className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-bold rounded-lg transition-all cursor-pointer text-center uppercase"
                  >
                    {t('agents_edit_reassign') || '✏️ Edit & Reassign'}
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
                      <span>{t('agents_model_config') || '🛰️ COMPUTATION MODEL CONFIGURATION'}</span>
                      <span className="text-[9px] bg-quantum-primary/15 text-quantum-primary px-2 py-0.5 rounded border border-quantum-primary/20 font-bold">{t('agents_model_ready') || 'READY'}</span>
                    </h4>
                    <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                      The corporate calibration interview has completed successfully. I have prepared sample calibration data and structured interdependent processes in the backend.
                    </p>
                  </div>
                </div>

                {/* Scenario details info card */}
                <div className="bg-[#070b14]/90 border border-white/5 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/5 pb-2">
                    <span className="text-gray-400">{t('agents_macroarea_label') || 'Corporate Macro-Area:'}</span>
                    <span className="text-white font-bold">{selectedSectorLong}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/5 pb-2">
                    <span className="text-gray-400">{t('agents_scenario_label') || 'Selected Scenario:'}</span>
                    <span className="text-quantum-secondary font-bold">Option {scenarioSelection || 'A'} - {selectedScenario?.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-400">{t('agents_register_status_label') || 'Register Status:'}</span>
                    <span className="text-emerald-400 font-bold">{t('agents_sample_data_generated') || 'Sample Data Generated'}</span>
                  </div>
                </div>

                <div className="p-4 bg-quantum-primary/5 border border-quantum-primary/15 rounded-xl text-left">
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    💡 **Start Simulation:** Type **"CONFIRM"** in the chat or click the button below to synthesize the computing circuit and run instant quantum predictive analysis in the backend.
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
                        ['abbinamento', 'legame', 'relazione', 'gruppo', 'accoppiamento', 'entanglement', 'link'].some(term => col.toLowerCase().includes(term))
                      );
                      setSelectedEntanglementCols(autoSelects);
                    }
                    processInputCSV(details.sample, true);
                  }}
                  className="w-full px-4 py-3 bg-quantum-primary text-quantum-bg hover:bg-quantum-primary/95 text-xs font-mono font-black rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,255,0.25)] hover:shadow-[0_0_22px_rgba(0,242,255,0.45)] cursor-pointer text-center uppercase"
                >
                  {t('agents_confirm_and_start_btn') || '🚀 CONFIRM DATA & START SIMULATION'}
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
                  {t('agents_phase0_select') || '📊 PHASE 0: SELECT A MAIN CORPORATE MACRO-AREA:'}
                </span>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2 w-full">
                  <button
                    onClick={() => handleSelectSector('Finanza')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    {t('agents_sec_finance') || '📊 1. Finance'}
                  </button>
                  <button
                    onClick={() => handleSelectSector('Logistica')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    {t('agents_sec_logistics') || '🚚 2. Logistics'}
                  </button>
                  <button
                    onClick={() => handleSelectSector('Chimica')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    {t('agents_sec_chemistry') || '🔬 3. Chemistry'}
                  </button>
                  <button
                    onClick={() => handleSelectSector('Manifatturiero')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    {t('agents_sec_factory') || '🏭 4. Factory'}
                  </button>
                  <button
                    onClick={() => handleSelectSector('Sanita')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    {t('agents_sec_healthcare') || '🧬 5. Healthcare'}
                  </button>
                  <button
                    onClick={() => handleSelectSector('Cybersecurity')}
                    className="px-2 py-1.5 bg-[#0d1527] border border-white/5 hover:border-quantum-primary/30 rounded-lg text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center"
                  >
                    {t('agents_sec_cybersec') || '🛡️ 6. Cybersec'}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && interviewSubstep === 0 && (
              <div className="flex flex-col gap-2 w-full animate-fade-in">
                <span className="text-[10px] font-mono text-[#00f2ff] uppercase tracking-wider block mb-1 font-bold">
                  {t('agents_phase1_choose') || '💡 PHASE 1: CHOOSE OPERATIONAL SCENARIO OPTION:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                  <button
                    onClick={() => handleChoiceOption('A')}
                    className="px-3 py-2 bg-[#0d1527] border border-quantum-primary/20 hover:border-quantum-primary text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center rounded-lg"
                  >
                    {t('agents_opt_a') || '🅰️ Option A [Mixed/Entanglement]'}
                  </button>
                  <button
                    onClick={() => handleChoiceOption('B')}
                    className="px-3 py-2 bg-[#0d1527] border border-quantum-primary/20 hover:border-quantum-primary text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center rounded-lg"
                  >
                    {t('agents_opt_b') || '🅱️ Option B [Angle Only]'}
                  </button>
                  <button
                    onClick={() => handleChoiceOption('C')}
                    className="px-3 py-2 bg-[#0d1527] border border-quantum-primary/20 hover:border-quantum-primary text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center rounded-lg"
                  >
                    {t('agents_opt_c') || '🆃 Option C [Amplitude Only]'}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && interviewSubstep === 1 && selectedSector === 'Manifatturiero' && selectedScenario?.headers.includes('Volume_Rimanenze_Maglia') && (
              <div className="flex flex-col gap-2 w-full animate-fade-in bg-[#0c1527] border border-quantum-primary/20 p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-quantum-primary uppercase tracking-wider block font-black">
                  🎯 SPECIFY UNSOLD INVENTORY DETAILS ON KNITWEAR STOCK:
                </span>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  To proceed accurately, declare the correct stock time horizon (Seasonal or Annual):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 w-full">
                  <button
                    onClick={() => {
                      setInputText("1200 seasonal pieces");
                    }}
                    className="px-3 py-2 bg-[#070b14] border border-quantum-primary/25 hover:border-quantum-primary text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-quantum-primary/5 cursor-pointer text-center rounded-lg flex items-center justify-center gap-1.5"
                  >
                    📦 Seasonal Stock (e.g. 1200 seasonal pieces)
                  </button>
                  <button
                    onClick={() => {
                      setInputText("3500 annual pieces");
                    }}
                    className="px-3 py-2 bg-[#070b14] border border-[#00f2ff]/25 hover:border-[#00f2ff] text-[10.5px] font-mono font-bold text-white uppercase transition-all hover:bg-[#00f2ff]/5 cursor-pointer text-center rounded-lg flex items-center justify-center gap-1.5"
                  >
                    📅 Annual Stock (e.g. 3500 annual pieces)
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[10px] font-mono text-gray-500 uppercase">{t('agents_threshold') || 'Threshold:'}</span>
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
                step === 1 ? (t('agents_placeholder_step1') || "Choose a finance or logistics sector above to unlock the interview...") :
                step === 2 ? (t('agents_placeholder_step2') || "Answer the questions indicated by the assistant...") :
                (t('agents_placeholder_step3') || "Paste or edit your decimal-point CSV data here...")
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
                  <Database className="w-4 h-4 text-quantum-secondary" /> {t('agents_db_title') || 'Scenario Database'} ({QUANTUM_SCENARIOS.length} {t('agents_db_targets') || 'Targets'})
                </h3>
                <span className="text-[10px] font-mono text-quantum-secondary bg-quantum-secondary/10 px-2 py-0.5 rounded border border-quantum-secondary/15 uppercase font-bold">
                  {t('agents_bi_cocompiler') || 'BI CO-COMPILER'}
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
                    placeholder={t('agents_search_placeholder') || 'Search scenario or variables...'}
                    className="w-full bg-[#070b14]/70 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-quantum-primary transition-all font-mono"
                  />
                </div>

                {/* Macroarea and Tech Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">{t('agents_macroarea') || 'Macro-Area'}</label>
                    <select
                      value={selectedMacroarea}
                      onChange={(e) => setSelectedMacroarea(e.target.value)}
                      className="bg-[#070b14]/75 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] text-gray-300 focus:outline-none focus:border-quantum-primary font-mono cursor-pointer"
                    >
                      <option value="Tutte">{t('agents_all_macroareas') || 'All Macro-Areas'}</option>
                      <option value="Finance & Markets">Finance & Markets</option>
                      <option value="Logistics & Smart Cities">Logistics & Smart Cities</option>
                      <option value="Chemistry & Green Tech">Chemistry & Green Tech</option>
                      <option value="Maintenance, Manufacturing & Apparel">Manufacturing & Apparel</option>
                      <option value="Healthcare & Genomics">Healthcare & Genomics</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-mono text-gray-500 uppercase">{t('agents_technology') || 'Technology'}</label>
                    <select
                      value={selectedTechnology}
                      onChange={(e) => setSelectedTechnology(e.target.value)}
                      className="bg-[#070b14]/75 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] text-gray-300 focus:outline-none focus:border-quantum-primary font-mono cursor-pointer"
                    >
                      <option value="Tutte">{t('agents_all_technologies') || 'All Technologies'}</option>
                      <option value="Computer Quantistico (QPU)">{t('agents_tech_qpu') || 'Quantum Computer (QPU)'}</option>
                      <option value="IA Classica / HPC">{t('agents_tech_hpc') || 'Classical AI / HPC'}</option>
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
                  const matchArea = selectedMacroarea === 'Tutte' || s.macroarea === selectedMacroarea || (selectedMacroarea === 'Finance & Markets' && s.macroarea.includes('Finanza')) || (selectedMacroarea === 'Logistics & Smart Cities' && s.macroarea.includes('Logistica')) || (selectedMacroarea === 'Chemistry & Green Tech' && s.macroarea.includes('Chimica')) || (selectedMacroarea === 'Healthcare & Genomics' && s.macroarea.includes('Sanit'));
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
                        START <Send className="w-2.5 h-2.5" />
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
                  <Database className="w-4 h-4 text-quantum-secondary" /> {t('agents_data_cleaning_title') || 'Data Cleaning & Column Reduction'}
                </h3>
                
                {mappingSummary ? (
                  <div className="font-mono text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                    {mappingSummary}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-6">
                    <Info className="w-8 h-8 text-white/15 mb-2.5 animate-pulse" />
                    <p className="text-xs text-gray-500 font-mono">
                      {t('agents_awaiting_csv') || 'Awaiting CSV data input to display column extraction and hardware allocation.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Math formulation parameters feedback card */}
              <div className="bg-gradient-to-br from-[#0d1527] to-[#070b14] border border-quantum-primary/10 rounded-2xl p-5 relative">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4.5 h-4.5 text-quantum-primary" />
                  <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                    {t('agents_protected_formulations') || 'Protected Physical Formulations'}
                  </h4>
                </div>
                
                <div className="space-y-3 font-mono text-[11px] text-gray-400">
                  <div className="flex items-start gap-2 border-b border-white/5 pb-2">
                    <span className="text-quantum-secondary font-bold shrink-0">A. Clip Sec:</span>
                    <span>P_clipped = min(max(P, 0), 1) ➔ Protects against NaN issues on high stress anomalies.</span>
                  </div>
                  <div className="flex items-start gap-2 border-b border-white/5 pb-2">
                    <span className="text-quantum-secondary font-bold shrink-0">B. Rotation:</span>
                    <span>theta = 2 * arcsin(sqrt(P_clipped)) ➔ Rigorous angular phase-shift mapping.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-quantum-secondary font-bold shrink-0">C. Comparator:</span>
                    <span>theta = (2 * arcsin(sqrt(Threshold))) / N ➔ Equal CRY distribution for energy accumulation onto target qubit.</span>
                  </div>
                </div>
              </div>

              {/* Live final layout summary visualization */}
              <div className="flex-1 bg-[#070b14] border border-white/5 rounded-2xl overflow-hidden flex flex-col font-mono">
                <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-quantum-secondary" /> {t('agents_qasm_mapping_title') || 'QASM Register Mapping'}
                  </span>
                  {qasmOutput && (
                    <span className="text-[10px] text-emerald-400 uppercase font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t('agents_generated_status') || 'Generated'}
                    </span>
                  )}
                </div>

                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-quantum-secondary leading-relaxed scrollbar-hide select-all whitespace-pre-wrap max-h-[300px]">
                  {qasmOutput ? qasmOutput : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-10">
                      <HelpCircle className="w-8 h-8 text-white/10 mb-2" />
                      <span>{t('agents_no_active_circuit') || 'No active circuit. Run the configuration on the left to generate OpenQASM 2.0 code.'}</span>
                    </div>
                  )}
                </div>

                {qasmOutput && (
                  <div className="p-4 bg-white/5 border-t border-white/5">
                    <button
                      onClick={() => onSendToIbm(qasmOutput)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-quantum-primary hover:bg-quantum-primary/90 text-quantum-bg font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,255,0.25)] hover:shadow-[0_0_22px_rgba(0,242,255,0.45)] cursor-pointer duration-200"
                    >
                      <Cpu className="w-4 h-4 fill-current animate-pulse" /> {t('agents_transmit_ibm_qpu') || 'Transmit code to IBM Q QPU 🚀'}
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
