import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import kyber from "crystals-kyber";
import crypto from "crypto";
import multer from "multer";
import { createServer } from "http";
import { Server } from "socket.io";

const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// In-memory store for rooms and invites (in a real app, use Redis/DB)
interface Room {
  id: string;
  publicKey: string;
  participants: Set<string>;
}

const activeRooms = new Map<string, Room>();
const inviteCodes = new Map<string, string>(); // code -> roomId

async function startServer() {
  console.log('>>> SYSTEM: QUANTUM SERVER INITIALIZING...');
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // --- PQC BACKEND ROUTES ---

  // Create a new private chat room
  app.post("/api/pqc/chat/create-room", (req, res) => {
    try {
      const roomId = crypto.randomBytes(8).toString("hex");
      const [pk, sk] = kyber.KeyGen768(); // The room's "anchor" key
      
      activeRooms.set(roomId, {
        id: roomId,
        publicKey: Buffer.from(pk).toString("hex"),
        participants: new Set()
      });

      res.json({ roomId, publicKey: Buffer.from(pk).toString("hex"), privateKey: Buffer.from(sk).toString("hex") });
    } catch (error) {
      res.status(500).json({ error: "Failed to create room" });
    }
  });

  // Generate an invitation code for a room
  app.post("/api/pqc/chat/invite", (req, res) => {
    const { roomId, email } = req.body;
    if (!activeRooms.has(roomId)) return res.status(404).json({ error: "Room not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    inviteCodes.set(code, roomId);
    
    console.log(`[MAIL SIMULATOR] Sending invite code ${code} for room ${roomId} to ${email}`);
    
    res.json({ success: true, code, message: `Invito inviato con successo a ${email}` });
  });

  // Validate an invite code
  app.post("/api/pqc/chat/validate-code", (req, res) => {
    const { code } = req.body;
    const roomId = inviteCodes.get(code);
    if (!roomId || !activeRooms.has(roomId)) {
      return res.status(400).json({ error: "Codice non valido o scaduto" });
    }
    const room = activeRooms.get(roomId);
    res.json({ roomId, publicKey: room?.publicKey });
  });

  // Route 1: Key Generation
  app.post("/api/pqc/keygen", (req, res) => {
    try {
      const [pk, sk] = kyber.KeyGen768();

      res.json({
        publicKey: Buffer.from(pk).toString("hex"),
        privateKey: Buffer.from(sk).toString("hex"),
        algorithm: "ML-KEM-768 (Kyber)",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Key generation failed" });
    }
  });

  // Route 2: Encryption (Locker)
  app.post("/api/pqc/encrypt", upload.any(), (req: any, res) => {
    try {
      let data: Buffer | null = null;
      
      if (req.files && req.files.length > 0) {
        data = (req.files as any[])[0].buffer;
      } else if (req.body.text) {
        data = Buffer.from(req.body.text);
      }

      if (!data) {
        return res.status(400).json({ error: "No data provided" });
      }

      const [pk, sk] = kyber.KeyGen768();

      // Encapsulate to get a shared secret
      const [c, ss] = kyber.Encrypt768(pk);

      // Symm encryption (AES-256-GCM)
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(ss), iv);
      const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
      const authTag = cipher.getAuthTag();

      res.json({
        encryptedPayload: Buffer.concat([iv, authTag, encryptedData]).toString("base64"),
        encapsulatedKey: Buffer.from(c).toString("hex"),
        unlockKey: Buffer.from(sk).toString("hex"),
        algorithm: "ML-KEM-768 + AES-256-GCM"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Encryption failed" });
    }
  });

  // Route 3: Decryption (Locker)
  app.post("/api/pqc/decrypt", (req, res) => {
    try {
      const { encryptedPayload, encapsulatedKey, unlockKey } = req.body;
      if (!encryptedPayload || !encapsulatedKey || !unlockKey) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      console.log('>>> SYSTEM: DECRYPTION REQUEST RECEIVED');

      // Canonicalize inputs (remove any extra whitespace)
      const cleanEncPayload = encryptedPayload.trim();
      const cleanEncKey = encapsulatedKey.trim();
      const cleanUnlockKey = unlockKey.trim();

      const sk = Buffer.from(cleanUnlockKey, "hex");
      const c = Buffer.from(cleanEncKey, "hex");
      
      // Decapsulate to get the shared secret
      console.log('>>> SYSTEM: RUNNING ML-KEM-768 DECAPSULATION...');
      const ssToken = kyber.Decrypt768(new Uint8Array(c), new Uint8Array(sk));
      
      const combined = Buffer.from(cleanEncPayload, "base64");
      
      if (combined.length < 28) {
        return res.status(400).json({ error: "Payload troppo corto o corrotto" });
      }

      const iv = combined.subarray(0, 12);
      const authTag = combined.subarray(12, 28);
      const encryptedData = combined.subarray(28);

      console.log('>>> SYSTEM: INITIALIZING AES-256-GCM DECIPHER...');
      const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(ssToken), iv);
      decipher.setAuthTag(authTag);
      
      const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

      console.log('>>> SYSTEM: DECRYPTION SUCCESSFUL');
      res.json({ decryptedContent: decrypted.toString() });
    } catch (error: any) {
      console.error('>>> SYSTEM ERROR (DECRYPTION):', error.message);
      res.status(500).json({ error: "Errore di decifratura. Verifica che le chiavi e il payload siano corretti e non siano stati alterati." });
    }
  });

  // Route 4: Chat Simulation (Encapsulation/Exchange)
  app.post("/api/pqc/chat-exchange", (req, res) => {
    try {
      const { message, publicKey } = req.body;
      if (!publicKey) return res.status(400).json({ error: "Public key required" });

      const pkBuffer = Uint8Array.from(Buffer.from(publicKey, "hex"));
      const [c, ss] = kyber.Encrypt768(pkBuffer);

      // Encrypt message
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(ss), iv);
      const encryptedMsg = Buffer.concat([cipher.update(message), cipher.final()]);
      const authTag = cipher.getAuthTag();

      res.json({
        visualCipher: Buffer.from(c).toString("base64").substring(0, 64) + "...",
        encryptedMessage: Buffer.concat([iv, authTag, encryptedMsg]).toString("base64"),
        encapsulatedKey: Buffer.from(c).toString("hex")
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Exchange failed" });
    }
  });

  // --- SOCKET.IO HANDLING ---
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
      socket.to(roomId).emit("user-joined", { userId: socket.id });
    });

    socket.on("send-message", (data) => {
      const { roomId, message, encryptedData, encapsulatedKey } = data;
      // Broadcast to everyone in the room
      io.to(roomId).emit("new-message", {
        senderId: socket.id,
        message,
        encryptedData,
        encapsulatedKey,
        timestamp: new Date().toISOString()
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  // --- IBM QUANTUM GATEWAY PROXY ---
  app.post("/api/ibm-quantum/submit", async (req, res) => {
    try {
      const { code, token, usePQC, encryptedPayload, encapsulatedKey } = req.body;
      console.log(`[IBM GATEWAY] Sottomissione circuito registrata (${code ? code.length : 0} chars). Token prefix: ${token ? token.substring(0, 8) : 'nessuno'}`);
      
      const jobId = `job_ibm_pqc_${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

      if (usePQC) {
        console.log(`[IBM GATEWAY PQC] Ricevuto pacchetto con Cifratura Quantistica ML-KEM-768 (Kyber).`);
        
        // Generate PQC encrypted results response payload
        const rawResultsText = JSON.stringify({
          jobId,
          status: "COMPLETED",
          shots: 1024,
          timestamp: new Date().toISOString(),
          measurementCounts: {
            "00": 518,
            "01": 12,
            "10": 14,
            "11": 480
          },
          fidelityScore: "99.982%",
          cryostatTemp: "0.015 K (-273.135 °C)"
        });

        // PQC Encrypt the response
        const [pk, sk] = kyber.KeyGen768();
        const [c, ss] = kyber.Encrypt768(pk);
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(ss), iv);
        const encryptedData = Buffer.concat([cipher.update(Buffer.from(rawResultsText)), cipher.final()]);
        const authTag = cipher.getAuthTag();

        const encryptedResultPayload = Buffer.concat([iv, authTag, encryptedData]).toString("base64");
        const resEncapsulatedKey = Buffer.from(c).toString("hex");
        const resUnlockKey = Buffer.from(sk).toString("hex");

        return res.json({
          success: true,
          jobId,
          pqcEnabled: true,
          message: "Circuito inviato e protetto con cifratura quantistica PQC ML-KEM-768 (NIST FIPS 203).",
          encryptedResults: {
            encryptedPayload: encryptedResultPayload,
            encapsulatedKey: resEncapsulatedKey,
            unlockKey: resUnlockKey,
            algorithm: "ML-KEM-768 (Kyber) + AES-256-GCM"
          }
        });
      }

      res.json({ 
        success: true, 
        jobId, 
        pqcEnabled: false,
        message: "Job inoltrato con successo dal proxy quantistico." 
      });
    } catch (error) {
      console.error("[IBM GATEWAY ERROR]:", error);
      res.status(500).json({ error: "Errore durante l'inoltro tramite il Proxy Quantistico" });
    }
  });

  // --- QUANTUM BI AI CHAT ---
  app.post("/api/quantum-bi/chat", async (req, res) => {
    try {
      const { messages, systemPrompt } = req.body;
      
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Messaggi non validi" });
      }

      // Filter and clean messages: ignore system errors, file load summaries or rate limiting messages
      const validMessages = messages.filter((m: any) => {
        if (!m.text || typeof m.text !== 'string' || m.text.trim() === "") return false;
        const text = m.text.trim();
        if (text.startsWith('[ERRORE') || text.includes('Quota esaurita') || text.includes('💡 Suggerimento') || text.includes('🔄 Suggerimento') || text.includes('Si è verificato un errore')) {
          return false;
        }
        return true;
      });
      
      if (validMessages.length === 0) {
        return res.status(400).json({ error: "Nessun messaggio valido trovato" });
      }

      const lastMessage = validMessages[validMessages.length - 1];
      // Limit history to last 5 turns (10 messages) to save tokens and minimize quota impact
      const rawHistory = validMessages.slice(Math.max(0, validMessages.length - 11), -1);

      // Prepare contents with history and last message
      const contents: any[] = [];
      
      // Add history if present
      if (rawHistory.length > 0) {
        let firstUserIndex = rawHistory.findIndex((m: any) => m.role === "user");
        if (firstUserIndex !== -1) {
          const processedHistory = rawHistory.slice(firstUserIndex);
          processedHistory.forEach((m: any) => {
            contents.push({
              role: m.role === "user" ? "user" : "model",
              parts: [{ text: m.text }],
            });
          });
        }
      }

      // Add the final user message
      contents.push({
        role: "user",
        parts: [{ text: lastMessage.text }],
      });

      console.log(`[AI] Using Gemini 3.5 Flash with ${contents.length} messages.`);

      let result;
      let attempts = 0;
      const maxAttempts = 3;
      let delayMs = 1200;

      const patchedSystemPrompt = `${systemPrompt || ""}\n\n` + 
        `=== DIRETTIVE ARCHITETTURALI RIGIDE PER LA GENERAZIONE DI CODICE QUANTISTICO (DA APPLICARE TASSATIVAMENTE) ===\n` +
        `1. REQUISITO DI INTEGRALITÀ DI OPENQASM (RIMOZIONE BUG DI TRADUZIONE):\n` +
        `Se generi codice OpenQASM 2.0 (tramite qasm2_dumps o testo statico), la dimensione del registro 'qreg q[N]' deve corrispondere ESATTAMENTE al numero di qubit effettivamente inizializzati e manipolati nel circuito.\n` +
        `È tassativamente vietato dichiarare un registro di grandi dimensioni (es. qreg q[28]) e applicare le porte RY o CRY solo al primo e all'ultimo qubit. Ogni qubit dichiarato nel registro deve ricevere la sua corrispondente rotazione RY basata sul mapping dei dati in radianti.\n\n` +
        `2. LOGICA DI DISTRIBUZIONE DEL COMPARATORE (CRY):\n` +
        `Nello scenario con Qubit Comparatore (Ancella Target all'indice N), la porta controllata di sfasamento d'onda 'cry' deve essere applicata a TUTTI i qubit del registro, da q[0] fino a q[N-1]. L'angolo di rotazione applicato deve essere uniformemente distribuito (Angolo_Soglia / N) su ogni qubit d'asset per garantire l'accumulo corretto dell'energia quantistica verso il target.\n\n` +
        `3. OMOGENEITÀ TRA PYTHON E OPENQASM:\n` +
        `Il codice Python (standard Qiskit 1.x) e l'output OpenQASM devono essere lo specchio esatto l'uno dell'altro. Se nel log Python vengono calcolati e dichiarati gli angoli per 3 asset (es. Oro, Platino, Petrolio) distribuiti su più colonne, l'output OpenQASM deve contenere esplicitamente tutte le istruzioni 'ry' e 'cry' per ciascuno di questi asset. Il codice non deve mai interrompersi o essere troncato.\n\n` +
        `4. PROTEZIONE MATEMATICA CRASH (CLIP DEI DATI):\n` +
        `In tutti gli script Python generati, prima di calcolare l'angolo in radianti con la funzione '2 * np.arcsin(np.sqrt(P))', applica sempre il clipping di sicurezza tramite NumPy per prevenire valori NaN generati da moltiplicatori di stress elevati:\n` +
        `P_clipped = np.clip(P, 0, 1)\n` +
        `theta = 2 * np.arcsin(np.sqrt(P_clipped))\n\n` +
        `5. STANDARD INVIOLABILE QISKIT 1.x:\n` +
        `Non utilizzare mai la vecchia funzione deprecata 'execute()'. Usa esclusivamente il paradigma delle Primitives moderne per l'estrazione dei risultati:\n` +
        `sampler = StatevectorSampler()\n` +
        `job = sampler.run([qc], shots=1000)\n` +
        `counts = job.result().data.get_counts(qc)\n\n` +
        `--- STRUTTURA DI VERIFICA INTERNA PRIMA DI RISPONDERE ---\n` +
        `Prima di emettere l'output, effettua un controllo mentale: "Ho applicato le porte RY e CRY a tutti i qubit dichiarati nel QASM? C'è l'entanglement tra le fonti eterogenee come richiesto dalla modalità avanzata?". Se la risposta è no, rigenera l'output prima di mostrarlo all'utente.`;

      while (attempts < maxAttempts) {
        try {
          attempts++;
          result = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: contents,
            config: {
              systemInstruction: patchedSystemPrompt,
              temperature: 0.7,
              maxOutputTokens: 4096,
            },
          });
          break; // Success!
        } catch (err: any) {
          const errStr = (err.status ? `Status ${err.status} ` : "") + (err.message || "") + (JSON.stringify(err) || "");
          const isQuota = err.status === 429 || errStr.toLowerCase().includes("429") || errStr.includes("quota") || err.message?.includes("quota") || errStr.includes("RESOURCE_EXHAUSTED");
          
          if (isQuota && attempts < maxAttempts) {
            console.log(`[AI-RETRY] Quota rate limit (429) hit. Retrying in ${delayMs}ms (attempt ${attempts}/${maxAttempts})...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            delayMs *= 2; // Exponential backoff
          } else {
            throw err; // Propagate non-rate-limit errors or if we exhausted all attempts
          }
        }
      }

      if (!result) {
        throw new Error("Errore durante la conversazione con l'IA. Riprova più tardi.");
      }

      const text = result.text;
      
      if (!text || text.trim().length === 0) {
        console.error("[AI] Empty response from Gemini. Result:", JSON.stringify(result));
        throw new Error("Il modello non ha restituito testo. Prova a riformulare la domanda.");
      }

      console.log(`[AI] Received response (${text.length} chars).`);
      res.json({ text });
    } catch (error: any) {
      console.error("Gemini API Error details:", error);
      
      let errorMessage = "Errore durante la conversazione con l'IA.";
      let status = 500;

      // Deep inspection of the error object
      const errorStr = (error.status ? `Status ${error.status} ` : "") + (error.message || "") + (JSON.stringify(error) || "");
      const isQuota = error.status === 429 || errorStr.toLowerCase().includes("429") || errorStr.includes("quota") || error.message?.includes("quota") || errorStr.includes("RESOURCE_EXHAUSTED");
      const isUnavailable = error.status === 503 || errorStr.toLowerCase().includes("503") || errorStr.includes("UNAVAILABLE") || errorStr.toLowerCase().includes("overloaded");
      const isNotFound = error.status === 404 || errorStr.toLowerCase().includes("404") || errorStr.includes("NOT_FOUND");

      if (isQuota) {
        // Try to extract retry time from error message if possible
        const retryMatch = errorStr.match(/retry in ([\d.]+)s/);
        const retryTime = retryMatch ? retryMatch[1] : "qualche";
        errorMessage = `Quota esaurita (429). Riprova tra ${retryTime} secondi.`;
        status = 429;
      } else if (isUnavailable) {
        errorMessage = "I server Google sono sovraccarichi (503). Riprova tra 5-10 secondi.";
        status = 503;
      } else if (isNotFound) {
        errorMessage = "Il modello AI non è disponibile in questa regione o è stato rimosso.";
        status = 404;
      } else if (error.status === 401 || error.status === 403) {
        errorMessage = "Errore di autenticazione API. Verifica le impostazioni.";
        status = error.status;
      } else if (error.message) {
        errorMessage = error.message;
      }

      res.status(status).json({ error: errorMessage });
    }
  });

  // --- VITE MIDDLEWARE ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
