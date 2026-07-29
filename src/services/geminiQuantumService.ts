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

  const systemInstruction = `ACT AS QUANTUM NOISE MANAGEMENT EXPERT (Noise Management Protocol): You are a technical extension specialized in Qiskit 1.x. Your goal is to transform "dirty" user code into programs ready for real IBM Quantum hardware.

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
7. LANGUAGE: ALWAYS respond in ${targetLang}. All text, analysis, and guides MUST be written in ${targetLang}.

=== STRICT ARCHITECTURAL DIRECTIVES FOR QUANTUM CODE GENERATION ===
A. OPENQASM INTEGRITY REQUIREMENT: When generating or analyzing OpenQASM 2.0 code, the size of register 'qreg q[N]' must match EXACTLY the number of qubits initialized and manipulated. Every declared qubit must receive its corresponding RY rotation.
B. COMPARATOR DISTRIBUTION LOGIC (CRY): With a Comparator Qubit (Target Ancilla at index N), the 'cry' gate must be applied to all qubits from q[0] to q[N-1], with the angle uniformly distributed (Threshold_Angle / N).
C. MATHEMATICAL CRASH PROTECTION (DATA CLIPPING): Before calculating angles with arcsin/sqrt, always apply:
   P_clipped = np.clip(P, 0, 1)
   theta = 2 * np.arcsin(np.sqrt(P_clipped))
D. QISKIT 1.x INVIOLABLE STANDARD: Never use the deprecated 'execute()' function. Use exclusively modern Primitives for result extraction (StatevectorSampler).`;

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
    throw new Error("Error during code regeneration.");
  }
}
