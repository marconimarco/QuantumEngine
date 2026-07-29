import { Type } from "@google/genai";
import { getGeminiClient } from "./apiKeyService";

export async function optimizeQuantumCode(userCode: string, lang: string = 'en') {
  const ai = getGeminiClient();
  const langNames: Record<string, string> = {
    it: 'ITALIAN',
    en: 'ENGLISH',
    zh: 'CHINESE',
    ja: 'JAPANESE',
    ko: 'KOREAN',
    de: 'GERMAN',
    fr: 'FRENCH',
    es: 'SPANISH',
    ru: 'RUSSIAN',
    uk: 'UKRAINIAN'
  };
  const targetLang = langNames[lang] || 'ENGLISH';

  const systemInstruction = `ACT AS QUANTUM NOISE MANAGEMENT EXPERT (Gestione Rumore Protocol): You are a technical extension specialized in Qiskit 1.x. Your goal is to transform "dirty" user code into programs ready for real IBM Quantum hardware.

PROCESSING RULES:
1. PHYSICAL CANCELLATION: If you see redundant gates (e.g., two consecutive X or Z gates on the same qubit), you MUST eliminate them. Do not leave them commented.
2. INDEX CONSISTENCY: Always verify the number of qubits. If the code uses index [i], the circuit must be declared as QuantumCircuit(i+1).
3. ZERO RESIDUES: Remove all traces of old user error comments or placeholders.
4. MANDATORY ANTI-NOISE PROTOCOL: Always include these active lines in the final script:
   sampler.options.resilience_level = 1
   sampler.options.dynamical_decoupling.enable = True
   sampler.options.dynamical_decoupling.sequence_type = 'XY4'
5. PYTHON SYNTAX: Never leave empty for loops. Always import numpy as np if np.pi is present. Use SamplerV2 and IBM Runtime Service setup.
6. STYLE: Be succinct. Return exclusively JSON.
7. LANGUAGE: Return the 'analysis' and 'guide' fields in the following language: ${targetLang}.

=== DIRETTIVE ARCHITETTURALI RIGIDE PER LA GENERAZIONE DI CODICE QUANTISTICO ===
A. REQUISITO DI INTEGRALITÀ DI OPENQASM: Se generi o analizzi codice OpenQASM 2.0, la dimensione del registro 'qreg q[N]' deve corrispondere ESATTAMENTE al numero di qubit effettivamente inizializzati e manipolati nel circuito. Ogni qubit dichiarato nel registro deve ricevere la sua corrispondente rotazione RY.
B. LOGICA DI DISTRIBUZIONE DEL COMPARATORE (CRY): Con Qubit Comparatore (Ancella Target all'indice N), la porta cry deve essere applicata a tutti i qubit del registro q[0] fino a q[N-1], con l'angolo uniformemente distribuito (Angolo_Soglia / N).
C. PROTEZIONE MATEMATICA CRASH (CLIP DEI DATI): Prima di calcolare angoli con arcsin/sqrt, applica sempre:
   P_clipped = np.clip(P, 0, 1)
   theta = 2 * np.arcsin(np.sqrt(P_clipped))
D. STANDARD INVIOLABILE QISKIT 1.x: Non utilizzare mai la funzione deprecata 'execute()'. Usa esclusivamente il paradigma delle Primitives moderne per l'estrazione dei risultati (StatevectorSampler).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: userCode,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.STRING,
              description: `A very brief explanation of improvements in ${targetLang}.`,
            },
            optimizedCode: {
              type: Type.STRING,
              description: "The complete and regenerated Qiskit 1.x code.",
            },
            guide: {
              type: Type.STRING,
              description: `Key points in ${targetLang}.`,
            }
          },
          required: ["analysis", "optimizedCode", "guide"],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Errore durante la rigenerazione del codice.");
  }
}
