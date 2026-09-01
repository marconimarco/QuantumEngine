export interface QuantumRagScenario {
  id: string;
  scenarioNumber: number;
  macroarea: string;
  categoryCode: string; // 'FIN', 'LOG', 'ENE', 'CHIM', 'MAN', 'CYB', 'SAN', 'CLASSIC'
  title: string;
  focus: string; // 'Focus Entanglement' | 'Focus Ampiezza' | 'Focus Angolo' | 'Classico'
  isQuantum: boolean;
  inputs: Array<{ name: string; percentage: number }>;
  constraints: string;
  qasmCode?: string;
  classicFramework?: string;
}

export const QUANTUM_RAG_DATABASE: Record<string, QuantumRagScenario> = {
  // ==========================================
  // SEZIONE 1.1: FINANZA E MERCATI (Scenari 1-19)
  // ==========================================
  'F1': {
    id: 'F1',
    scenarioNumber: 1,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Hedging Quantistico Multilivello Cross-Asset',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'ASSET_A', percentage: 0.15 },
      { name: 'ASSET_B', percentage: 0.25 },
      { name: 'ASSET_C', percentage: 0.45 },
      { name: 'ASSET_D', percentage: 0.60 }
    ],
    constraints: 'A-B legati, C-D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.79540) q[0];
ry(1.04720) q[1];
ry(1.47063) q[2];
ry(1.77215) q[3];
cry(0.85748) q[0], q[1];
cry(0.20132) q[0], q[4];
cry(0.26514) q[1], q[4];
cry(0.37234) q[2], q[4];
cry(0.44872) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F2': {
    id: 'F2',
    scenarioNumber: 2,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Ottimizzazione Portafoglio con Vincoli di Cardinalità (QUBO)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'ENEL', percentage: 0.425 },
      { name: 'INTESA', percentage: 0.475 },
      { name: 'GENERALI', percentage: 0.525 },
      { name: 'STELLANTIS', percentage: 0.575 }
    ],
    constraints: 'ENEL-INTESA legati, GENERALI-STELLANTIS INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.42019) q[0];
ry(1.52078) q[1];
ry(1.62082) q[2];
ry(1.72141) q[3];
cry(0.85748) q[0], q[1];
cry(0.35412) q[0], q[4];
cry(0.37510) q[1], q[4];
cry(0.39524) q[2], q[4];
cry(0.41463) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F3': {
    id: 'F3',
    scenarioNumber: 3,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Allocazione Capitali per Requisiti Solvibilità (Basel IV)',
    focus: 'Focus Ampiezza',
    isQuantum: true,
    inputs: [
      { name: 'CAP_A', percentage: 0.20 },
      { name: 'CAP_B', percentage: 0.35 },
      { name: 'CAP_C', percentage: 0.50 },
      { name: 'CAP_D', percentage: 0.65 }
    ],
    constraints: 'Tutti INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.92730) q[0];
ry(1.30020) q[1];
ry(1.57080) q[2];
ry(1.94553) q[3];
cry(0.23182) q[0], q[4];
cry(0.32505) q[1], q[4];
cry(0.39270) q[2], q[4];
cry(0.48638) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F4': {
    id: 'F4',
    scenarioNumber: 4,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Arbitraggio di Volatilità su Opzioni Index-Linked',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'OPT_A', percentage: 0.10 },
      { name: 'OPT_B', percentage: 0.30 },
      { name: 'OPT_C', percentage: 0.40 },
      { name: 'OPT_D', percentage: 0.70 }
    ],
    constraints: 'A-B-C legati ad anello, D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.64350) q[0];
ry(1.15928) q[1];
ry(1.36944) q[2];
ry(1.98231) q[3];
cry(0.70748) q[0], q[1];
cry(0.70748) q[1], q[2];
cry(0.16088) q[0], q[4];
cry(0.28982) q[1], q[4];
cry(0.34236) q[2], q[4];
cry(0.49558) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F5': {
    id: 'F5',
    scenarioNumber: 5,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Ottimizzazione Portafoglio Socialmente Responsabile (ESG)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'ESG_A', percentage: 0.18 },
      { name: 'ESG_B', percentage: 0.22 },
      { name: 'ESG_C', percentage: 0.33 },
      { name: 'ESG_D', percentage: 0.44 }
    ],
    constraints: 'A-C legati, B-D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.87630) q[0];
ry(0.97641) q[1];
ry(1.22384) q[2];
ry(1.45231) q[3];
cry(0.85748) q[0], q[2];
cry(0.21908) q[0], q[4];
cry(0.24410) q[1], q[4];
cry(0.30596) q[2], q[4];
cry(0.36308) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F6': {
    id: 'F6',
    scenarioNumber: 6,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Market Timing Esatto per Liquidazione Asset',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'LIQ_A', percentage: 0.05 },
      { name: 'LIQ_B', percentage: 0.15 },
      { name: 'LIQ_C', percentage: 0.25 },
      { name: 'LIQ_D', percentage: 0.35 }
    ],
    constraints: 'Tutti INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.45102) q[0];
ry(0.79540) q[1];
ry(1.04720) q[2];
ry(1.30020) q[3];
cry(0.11276) q[0], q[4];
cry(0.19885) q[1], q[4];
cry(0.26180) q[2], q[4];
cry(0.32505) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F7': {
    id: 'F7',
    scenarioNumber: 7,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Selezione Paniere Sintetico per Tracking ETF',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'ETF_A', percentage: 0.12 },
      { name: 'ETF_B', percentage: 0.14 },
      { name: 'ETF_C', percentage: 0.16 },
      { name: 'ETF_D', percentage: 0.18 }
    ],
    constraints: 'A-B legati, C-D legati',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.70748) q[0];
ry(0.76772) q[1];
ry(0.82303) q[2];
ry(0.87630) q[3];
cry(0.75748) q[0], q[1];
cry(0.75748) q[2], q[3];
cry(0.17687) q[0], q[4];
cry(0.19193) q[1], q[4];
cry(0.20576) q[2], q[4];
cry(0.21908) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F8': {
    id: 'F8',
    scenarioNumber: 8,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Hedging Rischio Valutario su Contratti Fornitori',
    focus: 'Focus Ampiezza',
    isQuantum: true,
    inputs: [
      { name: 'VAL_A', percentage: 0.30 },
      { name: 'VAL_B', percentage: 0.45 },
      { name: 'VAL_C', percentage: 0.60 },
      { name: 'VAL_D', percentage: 0.75 }
    ],
    constraints: 'A-D legati, B-C INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.15928) q[0];
ry(1.47063) q[1];
ry(1.77215) q[2];
ry(2.09440) q[3];
cry(0.95748) q[0], q[3];
cry(0.28982) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.52360) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F9': {
    id: 'F9',
    scenarioNumber: 9,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Ribilanciamento Dinamico Fondo a Rischio Target',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'FON_A', percentage: 0.22 },
      { name: 'FON_B', percentage: 0.28 },
      { name: 'FON_C', percentage: 0.34 },
      { name: 'FON_D', percentage: 0.40 }
    ],
    constraints: 'A-B-C legati, D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.97641) q[0];
ry(1.11402) q[1];
ry(1.24505) q[2];
ry(1.36944) q[3];
cry(0.85748) q[0], q[1];
cry(0.85748) q[1], q[2];
cry(0.24410) q[0], q[4];
cry(0.27850) q[1], q[4];
cry(0.31126) q[2], q[4];
cry(0.34236) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F10': {
    id: 'F10',
    scenarioNumber: 10,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Arbitraggio Triangolare su Coppie di Valute FX',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'FX_A', percentage: 0.08 },
      { name: 'FX_B', percentage: 0.16 },
      { name: 'FX_C', percentage: 0.24 },
      { name: 'FX_D', percentage: 0.32 }
    ],
    constraints: 'Anello continuo A-B-C-D',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.57352) q[0];
ry(0.82303) q[1];
ry(1.02384) q[2];
ry(1.20253) q[3];
cry(0.70748) q[0], q[1];
cry(0.70748) q[1], q[2];
cry(0.70748) q[2], q[3];
cry(0.70748) q[3], q[0];
cry(0.14338) q[0], q[4];
cry(0.20576) q[1], q[4];
cry(0.25596) q[2], q[4];
cry(0.30063) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F11': {
    id: 'F11',
    scenarioNumber: 11,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Valutazione del Rischio Sistemico Interbancario',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'BANK_A', percentage: 0.50 },
      { name: 'BANK_B', percentage: 0.55 },
      { name: 'BANK_C', percentage: 0.60 },
      { name: 'BANK_D', percentage: 0.65 }
    ],
    constraints: 'A-B legati, B-C legati, D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.57080) q[0];
ry(1.67096) q[1];
ry(1.77215) q[2];
ry(1.94553) q[3];
cry(0.95748) q[0], q[1];
cry(0.95748) q[1], q[2];
cry(0.39270) q[0], q[4];
cry(0.41774) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.48638) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F12': {
    id: 'F12',
    scenarioNumber: 12,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Stress Testing Macroeconomico Monte Carlo Accelerato (QAE)',
    focus: 'Focus Ampiezza',
    isQuantum: true,
    inputs: [
      { name: 'MAC_A', percentage: 0.15 },
      { name: 'MAC_B', percentage: 0.30 },
      { name: 'MAC_C', percentage: 0.45 },
      { name: 'MAC_D', percentage: 0.60 }
    ],
    constraints: 'Tutti INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.79540) q[0];
ry(1.15928) q[1];
ry(1.47063) q[2];
ry(1.77215) q[3];
cry(0.19885) q[0], q[4];
cry(0.28982) q[1], q[4];
cry(0.36766) q[2], q[4];
cry(0.44304) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F13': {
    id: 'F13',
    scenarioNumber: 13,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Pricing di Derivati Esotici Multi-Sottostante (QAE)',
    focus: 'Focus Ampiezza',
    isQuantum: true,
    inputs: [
      { name: 'DER_A', percentage: 0.25 },
      { name: 'DER_B', percentage: 0.35 },
      { name: 'DER_C', percentage: 0.45 },
      { name: 'DER_D', percentage: 0.55 }
    ],
    constraints: 'A-B legati, C-D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.04720) q[0];
ry(1.30020) q[1];
ry(1.47063) q[2];
ry(1.67096) q[3];
cry(0.80748) q[0], q[1];
cry(0.26180) q[0], q[4];
cry(0.32505) q[1], q[4];
cry(0.36766) q[2], q[4];
cry(0.41774) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F14': {
    id: 'F14',
    scenarioNumber: 14,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Stima del Value at Risk (VaR) e Conditional VaR (QAE)',
    focus: 'Focus Ampiezza',
    isQuantum: true,
    inputs: [
      { name: 'VAR_A', percentage: 0.12 },
      { name: 'VAR_B', percentage: 0.24 },
      { name: 'VAR_C', percentage: 0.36 },
      { name: 'VAR_D', percentage: 0.48 }
    ],
    constraints: 'Tutti INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.70748) q[0];
ry(1.02384) q[1];
ry(1.28420) q[2];
ry(1.53000) q[3];
cry(0.17687) q[0], q[4];
cry(0.25596) q[1], q[4];
cry(0.32105) q[2], q[4];
cry(0.38250) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F15': {
    id: 'F15',
    scenarioNumber: 15,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Rilevamento Anomalie e Riciclaggio (AML) (QML)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'AML_A', percentage: 0.40 },
      { name: 'AML_B', percentage: 0.50 },
      { name: 'AML_C', percentage: 0.60 },
      { name: 'AML_D', percentage: 0.70 }
    ],
    constraints: 'A-B legati, C-D legati',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.36944) q[0];
ry(1.57080) q[1];
ry(1.77215) q[2];
ry(1.98231) q[3];
cry(0.90748) q[0], q[1];
cry(0.90748) q[2], q[3];
cry(0.34236) q[0], q[4];
cry(0.39270) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.49558) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F16': {
    id: 'F16',
    scenarioNumber: 16,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Valutazione Rischio di Controparte (CVA) (QAE)',
    focus: 'Focus Ampiezza',
    isQuantum: true,
    inputs: [
      { name: 'CVA_A', percentage: 0.33 },
      { name: 'CVA_B', percentage: 0.44 },
      { name: 'CVA_C', percentage: 0.55 },
      { name: 'CVA_D', percentage: 0.66 }
    ],
    constraints: 'A-C legati, B-D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.22384) q[0];
ry(1.45231) q[1];
ry(1.67096) q[2];
ry(1.90012) q[3];
cry(0.85748) q[0], q[2];
cry(0.30596) q[0], q[4];
cry(0.36308) q[1], q[4];
cry(0.41774) q[2], q[4];
cry(0.47503) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F17': {
    id: 'F17',
    scenarioNumber: 17,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Clustering Quantistico di Titoli Obbligazionari (QML)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'BON_A', percentage: 0.15 },
      { name: 'BON_B', percentage: 0.30 },
      { name: 'BON_C', percentage: 0.45 },
      { name: 'BON_D', percentage: 0.60 }
    ],
    constraints: 'A-B-C legati, D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.79540) q[0];
ry(1.15928) q[1];
ry(1.47063) q[2];
ry(1.77215) q[3];
cry(0.85748) q[0], q[1];
cry(0.85748) q[1], q[2];
cry(0.19885) q[0], q[4];
cry(0.28982) q[1], q[4];
cry(0.36766) q[2], q[4];
cry(0.44304) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F18': {
    id: 'F18',
    scenarioNumber: 18,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Scoring Creditizio Aziendale Non Lineare (QML)',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'SCO_A', percentage: 0.20 },
      { name: 'SCO_B', percentage: 0.40 },
      { name: 'SCO_C', percentage: 0.60 },
      { name: 'SCO_D', percentage: 0.80 }
    ],
    constraints: 'Tutti INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.92730) q[0];
ry(1.36944) q[1];
ry(1.77215) q[2];
ry(2.21430) q[3];
cry(0.23182) q[0], q[4];
cry(0.34236) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.55357) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'F19': {
    id: 'F19',
    scenarioNumber: 19,
    macroarea: 'Finanza e Mercati',
    categoryCode: 'FIN',
    title: 'Calcolo Probabilità di Default su Mutui Subprime (QAE)',
    focus: 'Focus Ampiezza',
    isQuantum: true,
    inputs: [
      { name: 'DEF_A', percentage: 0.35 },
      { name: 'DEF_B', percentage: 0.45 },
      { name: 'DEF_C', percentage: 0.55 },
      { name: 'DEF_D', percentage: 0.65 }
    ],
    constraints: 'A-B legati, C-D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.30020) q[0];
ry(1.47063) q[1];
ry(1.67096) q[2];
ry(1.94553) q[3];
cry(0.90748) q[0], q[1];
cry(0.32505) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.41774) q[2], q[4];
cry(0.48638) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },

  // ==========================================
  // SEZIONE 1.2: LOGISTICA E SUPPLY CHAIN (Scenari 20-28)
  // ==========================================
  'L20': {
    id: 'L20',
    scenarioNumber: 20,
    macroarea: 'Logistica e Smart Cities',
    categoryCode: 'LOG',
    title: 'Vehicle Routing Problem con Finestre Temporali (VRPTW)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'ROMA', percentage: 0.20 },
      { name: 'FIRENZE', percentage: 0.40 },
      { name: 'BOLOGNA', percentage: 0.80 },
      { name: 'MILANO', percentage: 0.50 }
    ],
    constraints: 'Tratta ROMA->FIRENZE->MILANO, BOLOGNA INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.92730) q[0];
ry(1.36944) q[1];
ry(2.21430) q[2];
ry(1.57080) q[3];
cry(0.85748) q[0], q[1];
cry(0.70748) q[1], q[3];
cry(0.18542) q[0], q[4];
cry(0.26224) q[1], q[4];
cry(0.37086) q[2], q[4];
cry(0.29318) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'L21': {
    id: 'L21',
    scenarioNumber: 21,
    macroarea: 'Logistica e Smart Cities',
    categoryCode: 'LOG',
    title: 'Ottimizzazione del Carico Container 3D (Bin Packing)',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'BOX_A', percentage: 0.35 },
      { name: 'BOX_B', percentage: 0.45 },
      { name: 'BOX_C', percentage: 0.55 },
      { name: 'BOX_D', percentage: 0.65 }
    ],
    constraints: 'Tutti INDEPENDENT (Distribuzione volumetrica pura)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.30020) q[0];
ry(1.47063) q[1];
ry(1.67096) q[2];
ry(1.94553) q[3];
cry(0.32505) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.41774) q[2], q[4];
cry(0.48638) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'L22': {
    id: 'L22',
    scenarioNumber: 22,
    macroarea: 'Logistica e Smart Cities',
    categoryCode: 'LOG',
    title: 'Schedulazione Turni Equipaggi Portuali/Aeroportuali',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'CREW_A', percentage: 0.15 },
      { name: 'CREW_B', percentage: 0.30 },
      { name: 'CREW_C', percentage: 0.45 },
      { name: 'CREW_D', percentage: 0.60 }
    ],
    constraints: 'A-B legati, C-D legati (Turni incrociati)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.79540) q[0];
ry(1.15928) q[1];
ry(1.47063) q[2];
ry(1.77215) q[3];
cry(0.75748) q[0], q[1];
cry(0.85748) q[2], q[3];
cry(0.19885) q[0], q[4];
cry(0.28982) q[1], q[4];
cry(0.36766) q[2], q[4];
cry(0.44304) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'L23': {
    id: 'L23',
    scenarioNumber: 23,
    macroarea: 'Logistica e Smart Cities',
    categoryCode: 'LOG',
    title: 'Pianificazione Flotta Droni per Consegne Ultimo Miglio',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'DRONE_A', percentage: 0.12 },
      { name: 'DRONE_B', percentage: 0.24 },
      { name: 'DRONE_C', percentage: 0.36 },
      { name: 'DRONE_D', percentage: 0.48 }
    ],
    constraints: 'A-B-C legati ad anello, D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.70748) q[0];
ry(1.02384) q[1];
ry(1.28420) q[2];
ry(1.53000) q[3];
cry(0.70748) q[0], q[1];
cry(0.70748) q[1], q[2];
cry(0.17687) q[0], q[4];
cry(0.25596) q[1], q[4];
cry(0.32105) q[2], q[4];
cry(0.38250) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'L24': {
    id: 'L24',
    scenarioNumber: 24,
    macroarea: 'Logistica e Smart Cities',
    categoryCode: 'LOG',
    title: 'Instradamento Multi-Modale (Nave, Treno, Camion)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'NAVE', percentage: 0.40 },
      { name: 'TRENO', percentage: 0.60 },
      { name: 'CAMION', percentage: 0.30 },
      { name: 'HUB_A', percentage: 0.50 }
    ],
    constraints: 'NAVE->TRENO->CAMION continua, HUB_A INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.36944) q[0];
ry(1.77215) q[1];
ry(1.15928) q[2];
ry(1.57080) q[3];
cry(0.95748) q[0], q[1];
cry(0.80748) q[1], q[2];
cry(0.34236) q[0], q[4];
cry(0.44304) q[1], q[4];
cry(0.28982) q[2], q[4];
cry(0.39270) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'L25': {
    id: 'L25',
    scenarioNumber: 25,
    macroarea: 'Logistica e Smart Cities',
    categoryCode: 'LOG',
    title: 'Allocazione Gate Aeroportuali per Voli Internazionali',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'GATE_A', percentage: 0.50 },
      { name: 'GATE_B', percentage: 0.55 },
      { name: 'GATE_C', percentage: 0.60 },
      { name: 'GATE_D', percentage: 0.65 }
    ],
    constraints: 'GATE_A e GATE_B legati, GATE_C e GATE_D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.57080) q[0];
ry(1.67096) q[1];
ry(1.77215) q[2];
ry(1.94553) q[3];
cry(0.95748) q[0], q[1];
cry(0.39270) q[0], q[4];
cry(0.41774) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.48638) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'L26': {
    id: 'L26',
    scenarioNumber: 26,
    macroarea: 'Logistica e Smart Cities',
    categoryCode: 'LOG',
    title: 'Ottimizzazione delle Scorte di Sicurezza Multi-Echelon',
    focus: 'Focus Ampiezza',
    isQuantum: true,
    inputs: [
      { name: 'SCORTA_A', percentage: 0.10 },
      { name: 'SCORTA_B', percentage: 0.20 },
      { name: 'SCORTA_C', percentage: 0.30 },
      { name: 'SCORTA_D', percentage: 0.40 }
    ],
    constraints: 'Tutti INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.64350) q[0];
ry(0.92730) q[1];
ry(1.15928) q[2];
ry(1.36944) q[3];
cry(0.16088) q[0], q[4];
cry(0.23182) q[1], q[4];
cry(0.28982) q[2], q[4];
cry(0.34236) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'L27': {
    id: 'L27',
    scenarioNumber: 27,
    macroarea: 'Logistica e Smart Cities',
    categoryCode: 'LOG',
    title: 'Valutazione Rischio di Interruzione della Catena di Fornitura',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'FORN_A', percentage: 0.45 },
      { name: 'FORN_B', percentage: 0.55 },
      { name: 'FORN_C', percentage: 0.65 },
      { name: 'FORN_D', percentage: 0.75 }
    ],
    constraints: 'A-B legati, B-C legati, D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.47063) q[0];
ry(1.67096) q[1];
ry(1.94553) q[2];
ry(2.09440) q[3];
cry(0.95748) q[0], q[1];
cry(0.95748) q[1], q[2];
cry(0.36766) q[0], q[4];
cry(0.41774) q[1], q[4];
cry(0.48638) q[2], q[4];
cry(0.52360) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'L28': {
    id: 'L28',
    scenarioNumber: 28,
    macroarea: 'Logistica e Smart Cities',
    categoryCode: 'LOG',
    title: 'Analisi Vulnerabilità della Rete di Distribuzione (Graph Theory)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'NODO_A', percentage: 0.30 },
      { name: 'NODO_B', percentage: 0.45 },
      { name: 'NODO_C', percentage: 0.60 },
      { name: 'NODO_D', percentage: 0.75 }
    ],
    constraints: 'A-B connesse, C-D connesse',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.15928) q[0];
ry(1.47063) q[1];
ry(1.77215) q[2];
ry(2.09440) q[3];
cry(0.85748) q[0], q[1];
cry(0.85748) q[2], q[3];
cry(0.28982) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.52360) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },

  // ==========================================
  // SEZIONE 1.3: ENERGIA E UTILITIES (Scenari 29-35)
  // ==========================================
  'E29': {
    id: 'E29',
    scenarioNumber: 29,
    macroarea: 'Energia e Utilities',
    categoryCode: 'ENE',
    title: 'Unit Commitment e Dispacciamento Ottimale Rete Elettrica (OPF)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'NOD_A', percentage: 0.25 },
      { name: 'NOD_B', percentage: 0.45 },
      { name: 'NOD_C', percentage: 0.65 },
      { name: 'NOD_D', percentage: 0.85 }
    ],
    constraints: 'A-B legati, C-D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.04720) q[0];
ry(1.47063) q[1];
ry(1.94553) q[2];
ry(2.34619) q[3];
cry(0.85748) q[0], q[1];
cry(0.26180) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.48638) q[2], q[4];
cry(0.58655) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'E30': {
    id: 'E30',
    scenarioNumber: 30,
    macroarea: 'Energia e Utilities',
    categoryCode: 'ENE',
    title: 'Pianificazione Posizionamento Turbine Eoliche Offshore',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'TURB_A', percentage: 0.35 },
      { name: 'TURB_B', percentage: 0.45 },
      { name: 'TURB_C', percentage: 0.55 },
      { name: 'TURB_D', percentage: 0.65 }
    ],
    constraints: 'Tutti INDEPENDENT (Analisi fluidodinamica geometrica pura)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.30020) q[0];
ry(1.47063) q[1];
ry(1.67096) q[2];
ry(1.94553) q[3];
cry(0.32505) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.41774) q[2], q[4];
cry(0.48638) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'E31': {
    id: 'E31',
    scenarioNumber: 31,
    macroarea: 'Energia e Utilities',
    categoryCode: 'ENE',
    title: 'Schedulazione Ricarica Intelligente Flotte Veicoli Elettrici (V2G)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'COLONN_A', percentage: 0.18 },
      { name: 'COLONN_B', percentage: 0.22 },
      { name: 'COLONN_C', percentage: 0.33 },
      { name: 'COLONN_D', percentage: 0.44 }
    ],
    constraints: 'A-C legati, B-D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.87630) q[0];
ry(0.97641) q[1];
ry(1.22384) q[2];
ry(1.45231) q[3];
cry(0.85748) q[0], q[2];
cry(0.21908) q[0], q[4];
cry(0.24410) q[1], q[4];
cry(0.30596) q[2], q[4];
cry(0.36308) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'E32': {
    id: 'E32',
    scenarioNumber: 32,
    macroarea: 'Energia e Utilities',
    categoryCode: 'ENE',
    title: 'Ottimizzazione Idraulica Pompe-Turbine per Bacini Idroelettrici',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'POMP_A', percentage: 0.12 },
      { name: 'POMP_B', percentage: 0.24 },
      { name: 'POMP_C', percentage: 0.36 },
      { name: 'POMP_D', percentage: 0.48 }
    ],
    constraints: 'A-B-C legati ad anello, D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.70748) q[0];
ry(1.02384) q[1];
ry(1.28420) q[2];
ry(1.53000) q[3];
cry(0.70748) q[0], q[1];
cry(0.70748) q[1], q[2];
cry(0.17687) q[0], q[4];
cry(0.25596) q[1], q[4];
cry(0.32105) q[2], q[4];
cry(0.38250) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'E33': {
    id: 'E33',
    scenarioNumber: 33,
    macroarea: 'Energia e Utilities',
    categoryCode: 'ENE',
    title: 'Configurazione Topologica Microgrid in Caso di Blackout',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'ACCUM_A', percentage: 0.40 },
      { name: 'ACCUM_B', percentage: 0.50 },
      { name: 'ACCUM_C', percentage: 0.60 },
      { name: 'ACCUM_D', percentage: 0.70 }
    ],
    constraints: 'A-B legati, C-D legati (Isolamento sezioni di rete)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.36944) q[0];
ry(1.57080) q[1];
ry(1.77215) q[2];
ry(1.98231) q[3];
cry(0.90748) q[0], q[1];
cry(0.90748) q[2], q[3];
cry(0.34236) q[0], q[4];
cry(0.39270) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.49558) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'E34': {
    id: 'E34',
    scenarioNumber: 34,
    macroarea: 'Energia e Utilities',
    categoryCode: 'ENE',
    title: 'Analisi Stabilità Transitoria della Rete con Energia Rinnovabile',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'FA_A', percentage: 0.50 },
      { name: 'FA_B', percentage: 0.55 },
      { name: 'FA_C', percentage: 0.60 },
      { name: 'FA_D', percentage: 0.65 }
    ],
    constraints: 'Tutti INDEPENDENT (Fasori di tensione angolari puri)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.57080) q[0];
ry(1.67096) q[1];
ry(1.77215) q[2];
ry(1.94553) q[3];
cry(0.39270) q[0], q[4];
cry(0.41774) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.48638) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'E35': {
    id: 'E35',
    scenarioNumber: 35,
    macroarea: 'Energia e Utilities',
    categoryCode: 'ENE',
    title: 'Simulazione Quantistica Invecchiamento Celle Batteria al Litio',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'ANOD_A', percentage: 0.30 },
      { name: 'ANOD_B', percentage: 0.45 },
      { name: 'ANOD_C', percentage: 0.60 },
      { name: 'ANOD_D', percentage: 0.75 }
    ],
    constraints: 'A-B legati, B-C legati, D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.15928) q[0];
ry(1.47063) q[1];
ry(1.77215) q[2];
ry(2.09440) q[3];
cry(0.95748) q[0], q[1];
cry(0.95748) q[1], q[2];
cry(0.28982) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.52360) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },

  // ==========================================
  // SEZIONE 1.4: CHIMICA, FARMACEUTICA E MATERIALI (Scenari 36-43)
  // ==========================================
  'C36': {
    id: 'C36',
    scenarioNumber: 36,
    macroarea: 'Chimica e Green Tech',
    categoryCode: 'CHIM',
    title: 'Calcolo Stato Fondamentale di Molecole Complesse (VQE)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'IDROGENO', percentage: 0.30 },
      { name: 'CARBONIO', percentage: 0.65 },
      { name: 'OSSIGENO', percentage: 0.85 },
      { name: 'AZOTO', percentage: 0.45 }
    ],
    constraints: 'IDR->CAR->OSS legati, AZO INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.15928) q[0];
ry(1.94553) q[1];
ry(2.34619) q[2];
ry(1.47063) q[3];
cry(0.90748) q[0], q[1];
cry(1.05748) q[1], q[2];
cry(0.25203) q[0], q[4];
cry(0.36647) q[1], q[4];
cry(0.42167) q[2], q[4];
cry(0.30138) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'C37': {
    id: 'C37',
    scenarioNumber: 37,
    macroarea: 'Chimica e Green Tech',
    categoryCode: 'CHIM',
    title: 'Simulazione Catalizzatori per Fissazione Azoto (Sintesi Ammoniaca)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'FE_A', percentage: 0.55 },
      { name: 'FE_B', percentage: 0.65 },
      { name: 'N2', percentage: 0.40 },
      { name: 'H2', percentage: 0.15 }
    ],
    constraints: 'FE_A->FE_B->N2 legati, H2 INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.67096) q[0];
ry(1.94553) q[1];
ry(1.36944) q[2];
ry(0.79540) q[3];
cry(1.15748) q[0], q[1];
cry(0.95748) q[1], q[2];
cry(0.38714) q[0], q[4];
cry(0.44304) q[1], q[4];
cry(0.32105) q[2], q[4];
cry(0.19885) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'C38': {
    id: 'C38',
    scenarioNumber: 38,
    macroarea: 'Chimica e Green Tech',
    categoryCode: 'CHIM',
    title: 'Screening Molecolare per Inibitori Enzimatici (Drug Discovery)',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'REC_A', percentage: 0.25 },
      { name: 'INIB_B', percentage: 0.35 },
      { name: 'INIB_C', percentage: 0.50 },
      { name: 'SOLV_D', percentage: 0.12 }
    ],
    constraints: 'Tutti INDEPENDENT (Mappatura geometrica di phase-shift)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.04720) q[0];
ry(1.30020) q[1];
ry(1.57080) q[2];
ry(0.70748) q[3];
cry(0.26180) q[0], q[4];
cry(0.32505) q[1], q[4];
cry(0.39270) q[2], q[4];
cry(0.17687) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'C39': {
    id: 'C39',
    scenarioNumber: 39,
    macroarea: 'Chimica e Green Tech',
    categoryCode: 'CHIM',
    title: 'Progettazione Polimeri ad Alta Conducibilità per Celle a Combustibile',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'MON_A', percentage: 0.42 },
      { name: 'MON_B', percentage: 0.48 },
      { name: 'CAT_C', percentage: 0.22 },
      { name: 'IMP_D', percentage: 0.08 }
    ],
    constraints: 'MON_A->MON_B legati, CAT_C->MON_B legati, IMP_D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.41162) q[0];
ry(1.53000) q[1];
ry(0.97641) q[2];
ry(0.57352) q[3];
cry(0.85748) q[0], q[1];
cry(0.75748) q[2], q[1];
cry(0.34212) q[0], q[4];
cry(0.36308) q[1], q[4];
cry(0.24410) q[2], q[4];
cry(0.14338) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'C40': {
    id: 'C40',
    scenarioNumber: 40,
    macroarea: 'Chimica e Green Tech',
    categoryCode: 'CHIM',
    title: 'Modellazione Materiali Superconduttori ad Alta Temperatura',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'CUO_A', percentage: 0.60 },
      { name: 'CUO_B', percentage: 0.70 },
      { name: 'BA_C', percentage: 0.50 },
      { name: 'O_D', percentage: 0.80 }
    ],
    constraints: 'CUO_A->CUO_B->O_D continua, BA_C INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.77215) q[0];
ry(1.98231) q[1];
ry(1.57080) q[2];
ry(2.21430) q[3];
cry(1.10748) q[0], q[1];
cry(1.20748) q[1], q[3];
cry(0.44304) q[0], q[4];
cry(0.49558) q[1], q[4];
cry(0.39270) q[2], q[4];
cry(0.55357) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'C41': {
    id: 'C41',
    scenarioNumber: 41,
    macroarea: 'Chimica e Green Tech',
    categoryCode: 'CHIM',
    title: 'Ottimizzazione del Folding di Catene Peptidiche (QUBO)',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'AMIN_A', percentage: 0.18 },
      { name: 'AMIN_B', percentage: 0.24 },
      { name: 'AMIN_C', percentage: 0.36 },
      { name: 'AMIN_D', percentage: 0.48 }
    ],
    constraints: 'Tutti INDEPENDENT (Ottimizzazione energetica di fase)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.87630) q[0];
ry(1.02384) q[1];
ry(1.28420) q[2];
ry(1.53000) q[3];
cry(0.21908) q[0], q[4];
cry(0.25596) q[1], q[4];
cry(0.32105) q[2], q[4];
cry(0.38250) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'C42': {
    id: 'C42',
    scenarioNumber: 42,
    macroarea: 'Chimica e Green Tech',
    categoryCode: 'CHIM',
    title: 'Scoperta di Catalizzatori per la Cattura della CO2 (MOF Materials)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'MET_A', percentage: 0.33 },
      { name: 'MET_B', percentage: 0.55 },
      { name: 'LIG_C', percentage: 0.66 },
      { name: 'CO2_D', percentage: 0.40 }
    ],
    constraints: 'MET_A->LIG_C legati, MET_B->LIG_C legati, CO2_D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.22384) q[0];
ry(1.67096) q[1];
ry(1.90012) q[2];
ry(1.36944) q[3];
cry(0.95748) q[0], q[2];
cry(0.85748) q[1], q[2];
cry(0.30596) q[0], q[4];
cry(0.41774) q[1], q[4];
cry(0.47503) q[2], q[4];
cry(0.34236) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'C43': {
    id: 'C43',
    scenarioNumber: 43,
    macroarea: 'Chimica e Green Tech',
    categoryCode: 'CHIM',
    title: 'Sviluppo di Elettrolizzatori ad Alta Efficienza per Idrogeno Verde',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'ANOD_A', percentage: 0.45 },
      { name: 'CATOD_B', percentage: 0.55 },
      { name: 'ELETT_C', percentage: 0.75 },
      { name: 'H2O_D', percentage: 0.50 }
    ],
    constraints: 'ANOD_A->ELETT_C legati, CATOD_B->ELETT_C legati, H2O_D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.47063) q[0];
ry(1.67096) q[1];
ry(2.09440) q[2];
ry(1.57080) q[3];
cry(1.00748) q[0], q[2];
cry(1.00748) q[1], q[2];
cry(0.36766) q[0], q[4];
cry(0.41774) q[1], q[4];
cry(0.52360) q[2], q[4];
cry(0.39270) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },

  // ==========================================
  // SEZIONE 1.5: PRODUZIONE E MANIFATTURA (Scenari 44-48)
  // ==========================================
  'M44': {
    id: 'M44',
    scenarioNumber: 44,
    macroarea: 'Manutenzione, Manifatturiero e Abbigliamento',
    categoryCode: 'MAN',
    title: 'Job-Shop Scheduling Problem su Macchine CNC Multitasking',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'CUSCINETTO_A', percentage: 0.55 },
      { name: 'MOTORE_PRINCIPALE', percentage: 0.72 },
      { name: 'POMPA_IDRAULICA', percentage: 0.40 },
      { name: 'RIDUTTORE_GIRI', percentage: 0.88 }
    ],
    constraints: 'CUSC->MOT->RID legati, POMP INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.67096) q[0];
ry(1.99104) q[1];
ry(1.36944) q[2];
ry(2.43846) q[3];
cry(1.15748) q[0], q[1];
cry(1.25748) q[1], q[3];
cry(0.34212) q[0], q[4];
cry(0.38714) q[1], q[4];
cry(0.29654) q[2], q[4];
cry(0.45612) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'M45': {
    id: 'M45',
    scenarioNumber: 45,
    macroarea: 'Manutenzione, Manifatturiero e Abbigliamento',
    categoryCode: 'MAN',
    title: 'Ottimizzazione del Taglio Lamiere e Vetro (Cutting Stock Problem)',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'LAM_A', percentage: 0.20 },
      { name: 'LAM_B', percentage: 0.45 },
      { name: 'LAM_C', percentage: 0.60 },
      { name: 'SCRAP_D', percentage: 0.15 }
    ],
    constraints: 'Tutti INDEPENDENT (Ottimizzazione bidimensionale geometrica pura)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.92730) q[0];
ry(1.47063) q[1];
ry(1.77215) q[2];
ry(0.79540) q[3];
cry(0.23182) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.19885) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'M46': {
    id: 'M46',
    scenarioNumber: 46,
    macroarea: 'Manutenzione, Manifatturiero e Abbigliamento',
    categoryCode: 'MAN',
    title: 'Bilanciamento Linea di Assemblaggio con Vincoli Ergonomici',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'STAZ_A', percentage: 0.30 },
      { name: 'STAZ_B', percentage: 0.35 },
      { name: 'STAZ_C', percentage: 0.50 },
      { name: 'ROB_D', percentage: 0.12 }
    ],
    constraints: 'STAZ_A->STAZ_B legati, STAZ_C->STAZ_B legati, ROB_D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.15928) q[0];
ry(1.30020) q[1];
ry(1.57080) q[2];
ry(0.70748) q[3];
cry(0.85748) q[0], q[1];
cry(0.75748) q[2], q[1];
cry(0.28982) q[0], q[4];
cry(0.32505) q[1], q[4];
cry(0.39270) q[2], q[4];
cry(0.17687) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'M47': {
    id: 'M47',
    scenarioNumber: 47,
    macroarea: 'Manutenzione, Manifatturiero e Abbigliamento',
    categoryCode: 'MAN',
    title: 'Pianificazione Manutenzione Impianti Industriali ad Alta Complessità',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'RISK_A', percentage: 0.45 },
      { name: 'RISK_B', percentage: 0.55 },
      { name: 'RISK_C', percentage: 0.65 },
      { name: 'COMP_D', percentage: 0.25 }
    ],
    constraints: 'RISK_A->RISK_B->RISK_C continua, COMP_D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.47063) q[0];
ry(1.67096) q[1];
ry(1.94553) q[2];
ry(1.04720) q[3];
cry(0.95748) q[0], q[1];
cry(1.05748) q[1], q[2];
cry(0.36766) q[0], q[4];
cry(0.41774) q[1], q[4];
cry(0.48638) q[2], q[4];
cry(0.26180) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'M48': {
    id: 'M48',
    scenarioNumber: 48,
    macroarea: 'Manutenzione, Manifatturiero e Abbigliamento',
    categoryCode: 'MAN',
    title: 'Configurazione Flessibile Isole Robotizzate di Saldatura',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'WELD_A', percentage: 0.40 },
      { name: 'WELD_B', percentage: 0.50 },
      { name: 'WELD_C', percentage: 0.60 },
      { name: 'CELL_D', percentage: 0.70 }
    ],
    constraints: 'WELD_A->WELD_B legati, WELD_C->CELL_D legati',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.36944) q[0];
ry(1.57080) q[1];
ry(1.77215) q[2];
ry(1.98231) q[3];
cry(0.90748) q[0], q[1];
cry(0.90748) q[2], q[3];
cry(0.34236) q[0], q[4];
cry(0.39270) q[1], q[4];
cry(0.44304) q[2], q[4];
cry(0.49558) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },

  // ==========================================
  // SEZIONE 1.6: SICUREZZA, TELECOMUNICAZIONI E RETI (Scenari 49-53)
  // ==========================================
  'S49': {
    id: 'S49',
    scenarioNumber: 49,
    macroarea: 'Cybersecurity',
    categoryCode: 'CYB',
    title: 'Distribuzione Chiavi Quantistiche (QKD) e Monitoraggio Intercettazioni',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'ALICE', percentage: 0.15 },
      { name: 'BOB', percentage: 0.15 },
      { name: 'EVE', percentage: 0.80 },
      { name: 'KEY_D', percentage: 0.50 }
    ],
    constraints: 'Tutti INDEPENDENT (Monitoraggio degli stati di fase puri)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.79540) q[0];
ry(0.79540) q[1];
ry(2.21430) q[2];
ry(1.57080) q[3];
cry(0.19885) q[0], q[4];
cry(0.19885) q[1], q[4];
cry(0.55357) q[2], q[4];
cry(0.39270) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'S50': {
    id: 'S50',
    scenarioNumber: 50,
    macroarea: 'Cybersecurity',
    categoryCode: 'CYB',
    title: 'Ottimizzazione Instradamento Traffico Rete 5G/6G Core',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'TRAF_A', percentage: 0.42 },
      { name: 'TRAF_B', percentage: 0.48 },
      { name: 'CORE_C', percentage: 0.22 },
      { name: 'NODE_D', percentage: 0.08 }
    ],
    constraints: 'TRAF_A->TRAF_B legati, CORE_C->TRAF_B legati, NODE_D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.41162) q[0];
ry(1.53000) q[1];
ry(0.97641) q[2];
ry(0.57352) q[3];
cry(0.85748) q[0], q[1];
cry(0.75748) q[2], q[1];
cry(0.34212) q[0], q[4];
cry(0.36308) q[1], q[4];
cry(0.24410) q[2], q[4];
cry(0.14338) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'S51': {
    id: 'S51',
    scenarioNumber: 51,
    macroarea: 'Cybersecurity',
    categoryCode: 'CYB',
    title: 'Pianificazione Frequenze e Celle per Stazioni Radio Base (Antenne)',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'CELL_A', percentage: 0.35 },
      { name: 'CELL_B', percentage: 0.45 },
      { name: 'CELL_C', percentage: 0.55 },
      { name: 'INTERF_D', percentage: 0.65 }
    ],
    constraints: 'Tutti INDEPENDENT (Copertura spaziale geometrica di frequenza)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.30020) q[0];
ry(1.47063) q[1];
ry(1.67096) q[2];
ry(1.94553) q[3];
cry(0.32505) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.41774) q[2], q[4];
cry(0.48638) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'S52': {
    id: 'S52',
    scenarioNumber: 52,
    macroarea: 'Cybersecurity',
    categoryCode: 'CYB',
    title: 'Rilevamento Attacchi DDoS Tramite Correlazione Quantistica del Traffico',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'FIREWALL_PERIMETRALE', percentage: 0.80 },
      { name: 'SERVER_DATABASE', percentage: 0.45 },
      { name: 'GATEWAY_VPN', percentage: 0.70 },
      { name: 'ENDPOINT_UTENTI', percentage: 0.30 }
    ],
    constraints: 'FIRE->VPN->SERV continua, END INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(2.21430) q[0];
ry(1.47063) q[1];
ry(1.98231) q[2];
ry(1.15928) q[3];
cry(1.10748) q[0], q[2];
cry(0.95748) q[2], q[1];
cry(0.42167) q[0], q[4];
cry(0.30138) q[1], q[4];
cry(0.39647) q[2], q[4];
cry(0.25203) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'S53': {
    id: 'S53',
    scenarioNumber: 53,
    macroarea: 'Cybersecurity',
    categoryCode: 'CYB',
    title: 'Allocazione Risorse di Rete per Network Slicing',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'SLICE_A', percentage: 0.33 },
      { name: 'SLICE_B', percentage: 0.55 },
      { name: 'BAND_C', percentage: 0.66 },
      { name: 'CAP_D', percentage: 0.40 }
    ],
    constraints: 'SLICE_A->BAND_C legati, SLICE_B->BAND_C legati, CAP_D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.22384) q[0];
ry(1.67096) q[1];
ry(1.90012) q[2];
ry(1.36944) q[3];
cry(0.95748) q[0], q[2];
cry(0.85748) q[1], q[2];
cry(0.30596) q[0], q[4];
cry(0.41774) q[1], q[4];
cry(0.47503) q[2], q[4];
cry(0.34236) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },

  // ==========================================
  // SEZIONE 1.7: SANITÀ E GENOMICA (Scenari 54-71)
  // ==========================================
  'G54': {
    id: 'G54',
    scenarioNumber: 54,
    macroarea: 'Sanità e Genomica',
    categoryCode: 'SAN',
    title: 'Screening Virtuale di Farmaci su Miliardi di Molecole (Grover Search)',
    focus: 'Focus Ampiezza',
    isQuantum: true,
    inputs: [
      { name: 'MOL_A', percentage: 0.12 },
      { name: 'MOL_B', percentage: 0.24 },
      { name: 'MOL_C', percentage: 0.36 },
      { name: 'TAR_D', percentage: 0.48 }
    ],
    constraints: 'Tutti INDEPENDENT (Algoritmo di Grover puro)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.70748) q[0];
ry(1.02384) q[1];
ry(1.28420) q[2];
ry(1.53000) q[3];
cry(0.17687) q[0], q[4];
cry(0.25596) q[1], q[4];
cry(0.32105) q[2], q[4];
cry(0.38250) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'G55': {
    id: 'G55',
    scenarioNumber: 55,
    macroarea: 'Sanità e Genomica',
    categoryCode: 'SAN',
    title: 'Ottimizzazione dei Piani di Radioterapia Oncologica Lineare (IGRT)',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'BEAM_A', percentage: 0.35 },
      { name: 'BEAM_B', percentage: 0.45 },
      { name: 'BEAM_C', percentage: 0.55 },
      { name: 'BEAM_D', percentage: 0.65 }
    ],
    constraints: 'Tutti INDEPENDENT (Fasori spaziali geometrici puri)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.30020) q[0];
ry(1.47063) q[1];
ry(1.67096) q[2];
ry(1.94553) q[3];
cry(0.32505) q[0], q[4];
cry(0.36766) q[1], q[4];
cry(0.41774) q[2], q[4];
cry(0.48638) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'G56': {
    id: 'G56',
    scenarioNumber: 56,
    macroarea: 'Sanità e Genomica',
    categoryCode: 'SAN',
    title: 'Previsione delle Anomalie nel Ripiegamento Proteico (Protein Folding)',
    focus: 'Focus Angolo',
    isQuantum: true,
    inputs: [
      { name: 'PEPT_A', percentage: 0.18 },
      { name: 'PEPT_B', percentage: 0.24 },
      { name: 'PEPT_C', percentage: 0.36 },
      { name: 'PEPT_D', percentage: 0.48 }
    ],
    constraints: 'Tutti INDEPENDENT (QUBO energetico di fase)',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(0.87630) q[0];
ry(1.02384) q[1];
ry(1.28420) q[2];
ry(1.53000) q[3];
cry(0.21908) q[0], q[4];
cry(0.25596) q[1], q[4];
cry(0.32105) q[2], q[4];
cry(0.38250) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'G57': {
    id: 'G57',
    scenarioNumber: 57,
    macroarea: 'Sanità e Genomica',
    categoryCode: 'SAN',
    title: 'Diagnostica Precoce del Cancro da Dati di Sequenziamento DNA (GWAS)',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'GENE_BRCA1', percentage: 0.25 },
      { name: 'GENE_TP53', percentage: 0.90 },
      { name: 'GENE_EGFR', percentage: 0.60 },
      { name: 'GENE_KRAS', percentage: 0.35 }
    ],
    constraints: 'BRCA1->TP53 legati, EGFR e KRAS INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.04720) q[0];
ry(2.49809) q[1];
ry(1.77215) q[2];
ry(1.30020) q[3];
cry(1.35748) q[0], q[1];
cry(0.24512) q[0], q[4];
cry(0.46824) q[1], q[4];
cry(0.36412) q[2], q[4];
cry(0.28546) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },
  'G58': {
    id: 'G58',
    scenarioNumber: 58,
    macroarea: 'Sanità e Genomica',
    categoryCode: 'SAN',
    title: 'Ottimizzazione dei Turni delle Sale Operatorie Ospedaliere',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'ROOM_A', percentage: 0.30 },
      { name: 'ROOM_B', percentage: 0.35 },
      { name: 'ROOM_C', percentage: 0.50 },
      { name: 'STAFF_D', percentage: 0.12 }
    ],
    constraints: 'ROOM_A->ROOM_B legati, ROOM_C->ROOM_B legati, STAFF_D INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.15928) q[0];
ry(1.30020) q[1];
ry(1.57080) q[2];
ry(0.70748) q[3];
cry(0.85748) q[0], q[1];
cry(0.75748) q[2], q[1];
cry(0.28982) q[0], q[4];
cry(0.32505) q[1], q[4];
cry(0.39270) q[2], q[4];
cry(0.17687) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  },

  // Generatore RAG per gli Scenari Genomica G59-G71 (Modello GWAS G57-conformant)
  'G59': {
    id: 'G59',
    scenarioNumber: 59,
    macroarea: 'Sanità e Genomica',
    categoryCode: 'SAN',
    title: 'Farmacogenomica e Risposta Individuale ai Chemioterapici',
    focus: 'Focus Entanglement',
    isQuantum: true,
    inputs: [
      { name: 'CYP2D6', percentage: 0.40 },
      { name: 'TPMT', percentage: 0.75 },
      { name: 'DPYD', percentage: 0.30 },
      { name: 'UGT1A1', percentage: 0.50 }
    ],
    constraints: 'CYP2D6->TPMT legati, DPYD e UGT1A1 INDEPENDENT',
    qasmCode: `OPENQASM 2.0;
include "qelib1.inc";
qreg q[5];
creg c[5];
ry(1.36944) q[0];
ry(2.09440) q[1];
ry(1.15928) q[2];
ry(1.57080) q[3];
cry(1.15748) q[0], q[1];
cry(0.30145) q[0], q[4];
cry(0.46124) q[1], q[4];
cry(0.25514) q[2], q[4];
cry(0.34582) q[3], q[4];
measure q[0] -> c[0];
measure q[1] -> c[1];
measure q[2] -> c[2];
measure q[3] -> c[3];
measure q[4] -> c[4];`
  }
};

// ==========================================
// SCENARI CLASSICI (72-107) - MODULO HPC / CPU-GPU
// ==========================================
export const CLASSICAL_RAG_DATABASE: Record<number, { title: string; macroarea: string; framework: string }> = {
  72: { title: 'Algoritmi Trading Alta Frequenza HFT Order Book Matching', macroarea: 'Finanza Classica', framework: 'C++20 / HPC Kernel AVX-512' },
  73: { title: 'Sentiment Analysis Finanziaria su Flussi Notizie', macroarea: 'Finanza Classica', framework: 'LLM / RoBERTa-Finance (HuggingFace)' },
  74: { title: 'Backtesting Tick-by-Tick su Dati Storici', macroarea: 'Finanza Classica', framework: 'CUDA / GPU Accelerated Backtester' },
  75: { title: 'Previsione Prezzi Serie Temporali con Transformer', macroarea: 'Finanza Classica', framework: 'PyTorch / Temporal Fusion Transformer' },
  76: { title: 'Riconoscimento Pattern Grafici Candlestick', macroarea: 'Finanza Classica', framework: 'TensorFlow / ResNet-50 Pattern Vision' },
  77: { title: 'Pricing Black-Scholes Multidimensionale Vettorizzato', macroarea: 'Finanza Classica', framework: 'NumPy / AVX Vectorized Solver' },
  78: { title: 'Modellazione Attuariale e Tariffazione Polizze Vita', macroarea: 'Finanza Classica', framework: 'XGBoost / Gradient Boosting Machine' },
  79: { title: 'Previsione della Domanda e Riordino Scorte', macroarea: 'Logistica Classica', framework: 'XGBoost / LightGBM Multi-Store Demand' },
  80: { title: 'Tracciamento Colli e Riconoscimento OCR Etichette', macroarea: 'Logistica Classica', framework: 'YOLOv8 / PaddleOCR Industrial' },
  81: { title: 'Ottimizzazione Flotta e Percorsi GPS in Tempo Reale', macroarea: 'Logistica Classica', framework: 'GIS / OSRM Graph Hopper Engine' },
  82: { title: 'Simulazione ad Eventi Discreti Digital Twin Magazzino', macroarea: 'Logistica Classica', framework: 'SimPy / Discrete Event Simulator' },
  83: { title: 'Previsione Irraggiamento Solare e Produzione FV', macroarea: 'Energia Classica', framework: 'LSTM / Bi-Directional Recurrent Network' },
  84: { title: 'Analisi Spettrale FFT Vibrazioni Turbine a Gas', macroarea: 'Energia Classica', framework: 'SciPy / Fast Fourier Transform FFT' },
  85: { title: 'Rilevamento Perdite Rete Idrica da Sensori di Flusso', macroarea: 'Energia Classica', framework: 'Isolation Forest / Anomaly Flow Detector' },
  86: { title: 'Controllo Predittivo Impianti HVAC con RL', macroarea: 'Energia Classica', framework: 'Stable-Baselines3 / Deep Q-Learning' },
  87: { title: 'Monitoraggio Usura Stradale da Dati Accelerometrici', macroarea: 'Energia Classica', framework: 'Edge-AI / Micro-Controller Signal Filter' },
  88: { title: 'Predizione Struttura 3D Proteine con Modelli AlphaFold', macroarea: 'Chimica Classica', framework: 'ESMFold / OpenFold PyTorch Core' },
  89: { title: 'Dinamica Molecolare Classica su Grandi Biomolecole', macroarea: 'Chimica Classica', framework: 'GROMACS / LAMMPS CUDA Engine' },
  90: { title: 'Generazione Molecole De Novo con Modelli Diffusivi', macroarea: 'Chimica Classica', framework: 'DiffDock / VAE Molecular Generator' },
  91: { title: 'Previsione Proprietà Tossicologiche ADMET Farmaci', macroarea: 'Chimica Classica', framework: 'PyTorch Geometric / Graph Neural Networks GNN' },
  92: { title: 'Ottimizzazione Reazioni di Sintesi Biocarburanti', macroarea: 'Chimica Classica', framework: 'Kinetic Studio / ODE Numerical Integrator' },
  93: { title: 'Formulazione Vernici Ecologiche con Algoritmi Genetici', macroarea: 'Chimica Classica', framework: 'DEAP / Multi-Objective Genetic Algorithm' },
  94: { title: 'Simulazione Fluidodinamica CFD Reattori Chimici', macroarea: 'Chimica Classica', framework: 'OpenFOAM / Navier-Stokes GPU Solver' },
  95: { title: 'Controllo Qualità Visivo Difetti di Produzione', macroarea: 'Manifattura Classica', framework: 'OpenCV / Convolutional Neural Networks CNN' },
  96: { title: 'Diagnostica Guasti Cuscinetti ad Alta Frequenza', macroarea: 'Manifattura Classica', framework: 'Signal Processing / Envelope Spectrum FFT' },
  97: { title: 'Ottimizzazione Parametri Stampaggio a Iniezione', macroarea: 'Manifattura Classica', framework: 'Bayesian Optimization / Optuna Tree-Parzen' },
  98: { title: 'Monitoraggio Acustico Presse e Macchinari Pesanti', macroarea: 'Manifattura Classica', framework: 'Audio CNN / Mel-Spectrogram Anomaly' },
  99: { title: 'Rilevamento Malware da Disassemblaggio Bytecode', macroarea: 'Cybersecurity Classica', framework: 'Ghidra / Random Forest Feature Extractor' },
  100: { title: 'Analisi Log Firewall e Correlazione Eventi SIEM', macroarea: 'Cybersecurity Classica', framework: 'Elasticsearch / Logstash Rule Matcher' },
  101: { title: 'Implementazione Crittografia Post-Quantum PQC (Kyber/Dilithium)', macroarea: 'Cybersecurity Classica', framework: 'Liboqs / NIST PQC Standard Lib' },
  102: { title: 'Riconoscimento Facciale e Biometrico per Accessi Sicuri', macroarea: 'Cybersecurity Classica', framework: 'FaceNet / dlib 128D Embedding' },
  103: { title: 'Rilevamento Precoce Ransomware da Pattern I/O Disco', macroarea: 'Cybersecurity Classica', framework: 'Kernel Driver / Disk Entropy Anomaly Analyzer' },
  104: { title: 'Mitigazione Attacchi DDoS su Scala Globale', macroarea: 'Cybersecurity Classica', framework: 'eBPF / XDP High-Speed Packet Filter' },
  105: { title: 'Modelli Predittivi Mortalità/Riammissione Cartelle EHR', macroarea: 'Sanità Classica', framework: 'MIMIC-IV / Logistic Regression & XGBoost' },
  106: { title: 'Ottimizzazione Flussi Pronto Soccorso e Triage', macroarea: 'Sanità Classica', framework: 'Queue Theory / Discrete Event Bed Scheduler' },
  107: { title: 'Allocazione Risorse e Posti Letto Ospedalieri', macroarea: 'Sanità Classica', framework: 'Linear Programming / PuLP Simplex Optimizer' }
};

// Helper function to find a RAG scenario by scenario ID, sector, name or input variables
export function findQuantumRagScenario(
  scenarioId?: string,
  sector?: string,
  scenarioName?: string,
  elementNames?: string[]
): QuantumRagScenario | undefined {
  // 1. Direct key lookup (e.g. "F1", "F2", "L20", "C38", "M44", "G57", "S49")
  if (scenarioId && QUANTUM_RAG_DATABASE[scenarioId]) {
    return QUANTUM_RAG_DATABASE[scenarioId];
  }

  // 2. Lookup by scenario ID format (e.g. "fin-q-1" -> scenario 1 -> F1, "log-q-20" -> scenario 20 -> L20)
  if (scenarioId) {
    const numMatch = scenarioId.match(/\d+/);
    const num = numMatch ? parseInt(numMatch[0], 10) : null;
    if (num !== null) {
      const match = Object.values(QUANTUM_RAG_DATABASE).find(s => s.scenarioNumber === num);
      if (match) return match;
    }
  }

  // 3. Lookup by matching element names (e.g. ENEL, INTESA -> F2; ROMA, FIRENZE -> L20; BRCA1, TP53 -> G57)
  if (elementNames && elementNames.length > 0) {
    const cleanUserEls = elementNames.map(e => e.toLowerCase().trim().replace(/[^a-z0-9_]/g, ''));
    let bestMatch: QuantumRagScenario | undefined;
    let maxMatchCount = 0;

    for (const sc of Object.values(QUANTUM_RAG_DATABASE)) {
      const dbEls = sc.inputs.map(i => i.name.toLowerCase().trim().replace(/[^a-z0-9_]/g, ''));
      const count = cleanUserEls.filter(u => dbEls.some(d => d.includes(u) || u.includes(d))).length;
      if (count > maxMatchCount && count >= 1) {
        maxMatchCount = count;
        bestMatch = sc;
      }
    }
    if (bestMatch && maxMatchCount >= 2) return bestMatch;
  }

  // 4. Lookup by scenario title / keyword
  if (scenarioName) {
    const cleanName = scenarioName.toLowerCase();
    const match = Object.values(QUANTUM_RAG_DATABASE).find(s => 
      s.title.toLowerCase().includes(cleanName) || cleanName.includes(s.title.toLowerCase())
    );
    if (match) return match;
  }

  // 5. Fallback by Sector default Golden Reference
  if (sector) {
    const s = sector.toLowerCase();
    let prefix = 'F1';
    if (s.includes('finan') || s === '1') prefix = 'F2'; // F2: QUBO Portfolio (ENEL, INTESA, GENERALI, STELLANTIS)
    else if (s.includes('logist') || s === '2') prefix = 'L20'; // L20: VRPTW Routing (ROMA, FIRENZE, BOLOGNA, MILANO)
    else if (s.includes('chem') || s.includes('chimic') || s === '3') prefix = 'C38'; // C38: Drug Discovery
    else if (s.includes('man') || s.includes('manifatt') || s === '4') prefix = 'M44'; // M44: Job-Shop / CNC
    else if (s.includes('sanit') || s.includes('health') || s === '5') prefix = 'G57'; // G57: DNA GWAS
    else if (s.includes('cyber') || s.includes('secur') || s === '6') prefix = 'S49'; // S49: QKD

    if (QUANTUM_RAG_DATABASE[prefix]) return QUANTUM_RAG_DATABASE[prefix];
  }

  return undefined;
}

