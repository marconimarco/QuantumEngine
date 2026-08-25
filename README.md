For English go down.

  
  

Ita

# Quantum Engine & Quantum BI Assistant ⚛️🛡️

  

Piattaforma avanzata per la simulazione quantistica aziendale, Business Intelligence quantistica assistita da Intelligenza Artificiale (Google Gemini), generazione di circuiti OpenQASM 2.0 / Qiskit 1.x, inoltro a processori IBM Quantum reali e canali di comunicazione protetti con crittografia post-quantistica (PQC ML-KEM-768).

  

---

  

## 📋 Indice

1. [Requisiti di Sistema](#1-requisiti-di-sistema)

2. [Database e Gestione della Memoria](#2-database-e-gestione-della-memoria)

3. [Elenco Librerie e API Esterne](#3-elenco-librerie-e-api-esterne)

4. [Installazione e Configurazione Locale](#4-installazione-e-configurazione-locale)

5. [Variabili di Ambiente (.env)](#5-variabili-di-ambiente-env)

6. [Comandi Disponibili](#6-comandi-disponibili)

7. [Architettura del Progetto](#7-architettura-del-progetto)

  

---

  

## 1. Requisiti di Sistema

  

Per eseguire l'applicazione in locale o su un server dedicato sono richiesti i seguenti requisiti minimi:

  

| Componente | Requisito Minimo | Consigliato |

| :--- | :--- | :--- |

| **Sistema Operativo** | Windows 10/11, macOS (Intel o Apple Silicon), Linux (Ubuntu 20.04+, Debian, Fedora, Arch) | Qualsiasi OS a 64 bit |

| **Node.js** | Versione 18.x o 20.x LTS | Versione 20.x LTS o superiore |

| **Package Manager** | npm (v9+), pnpm (v8+), o bun | npm preinstallato con Node.js |

| **RAM** | 2 GB liberi | 4 GB+ liberi |

| **Spazio su Disco** | 500 MB per codice e node_modules | 1 GB+ |

| **Porta di Rete** | Porta locale 3000 libera | 3000 (configurata di default) |

| **Connessione Internet** | Richiesta per API Google Gemini, IBM Quantum e QRNG | Connessione stabile a banda larga |

  

---

  

## 2. Database e Gestione della Memoria

  

L'applicazione adotta un'architettura ad alta sicurezza con Zero-Data-Retention (Zero-Trace):

  

1. **Gestione Dati Temporanei in RAM (In-Memory Data Store):**

- Le sessioni di chat crittografate, le stanze PQC e i codici di invito temporanei sono memorizzati nella memoria volatile del server (Map<string, Room>).

- Non vengono salvati log su disco né conservate copie di messaggi privati o file caricati.

  

2. **Scrubber di Memoria Post-Quantistica (Zero-Trace RAM Scrubber):**

- Conforme agli standard NIST FIPS 140-3 Zeroization e FIPS 203.

- Tutti i buffer crittografici contenenti materiale sensibile (chiavi private Kyber, segreti condivisi, IV e chiavi simmetriche AES) vengono sovrascritti con byte casuali hardware (crypto.randomFillSync) e azzerati (.fill(0)) immediatamente dopo l'uso nel blocco finally.

  

3. **Buffer Files Volatili (Multer MemoryStorage):**

- I file e le tabelle CSV caricati dagli utenti vengono elaborati direttamente nello stream di memoria (multer.memoryStorage()) senza mai essere scritti sul filesystem del server.

  

4. **Persistenza Client-Side (Browser LocalStorage):**

- Le tabelle elaborate, le preferenze di visualizzazione, i preset di settore e i token di accesso IBM Quantum possono essere mantenuti localmente nel browser dell'utente (localStorage) senza transito verso database centralizzati di terze parti.

  

---

  

## 3. Elenco Librerie e API Esterne

  

### 🤖 Intelligenza Artificiale & Machine Learning

- **@google/genai (v1.29.0+):** SDK ufficiale di Google DeepMind per l'integrazione con Google Gemini (Gemini 3.5 Flash).

- Funzionalità: Analisi semantica dei dataset aziendali, Business Intelligence predittiva, calcolo dei vincoli di entanglement, generazione e validazione del codice OpenQASM 2.0 e Python Qiskit 1.x, calcolo degli angoli di rotazione quantistica 2*arcsin(sqrt(P)).

  

### 🛡️ Crittografia Post-Quantistica (PQC) & Hardware Security

- **crystals-kyber (v5.1.0+):** Implementazione dello standard ML-KEM-768 (CRYSTALS-Kyber) ratificato dal NIST (FIPS 203).

- Funzionalità: Scambio di chiavi resistente ad attacchi da computer quantistici (Algoritmo di Shor).

- **Modulo Crittografico Node.js Nativo (crypto):**

- Cifratura simmetrica autenticata AES-256-GCM (NIST SP 800-38D).

- Generazione di numeri casuali crittografici conformi a NIST SP 800-90B.

- **ANU Quantum Random Number Generator (QRNG API):**

- Endpoint: https://qrng.anu.edu.au/API/jsonI.php (Australian National University).

- Estrazione di vera entropia fisica dalle fluttuazioni quantistiche del vuoto ottico per l'iniezione nei seed crittografici.

  

### ⚛️ Quantum Computing & Hardware Gateway

- **IBM Quantum Platform API:**

- Endpoint Gateway: Inoltro job e circuiti su processori quantistici reali IBM (es. ibm_sherbrooke, ibm_brisbane, ibm_kyoto) o simulatori cloud Statevector con autenticazione tramite IBM Quantum API Token.

  

### 🎨 Frontend & Interfaccia Utente

- **react & react-dom (v19.0.1):** Core per l'interfaccia reattiva a componenti.

- **@tailwindcss/vite & tailwindcss (v4.1.14):** Framework CSS atomico per il design moderno ad alto contrasto.

- **motion (v12.23.24):** Libreria per animazioni fluide e transizioni di stato quantistiche (Bloch sphere, radar interattivi, barre di probabilità).

- **lucide-react (v0.546.0):** Set completo di icone vettoriali per crittografia, quantistica e business intelligence.

- **recharts (v3.8.1):** Grafici di distribuzione degli stati quantistici, distribuzioni di conteggio Shots e radar multidimensionali.

- **jspdf (v4.2.1) & jspdf-autotable (v5.0.7):** Motore di generazione documentale per report esecutivi e schede tecniche PDF.

  

### ⚙️ Backend, Server & Networking

- **express (v4.21.2):** Server web HTTP e API RESTful.

- **socket.io & socket.io-client (v4.8.3):** Canale di comunicazione WebSockets bidirezionale real-time per la chat cifrata PQC.

- **multer (v2.1.1):** Middleware per la gestione sicura in memoria degli upload di file CSV/Excel.

- **axios (v1.16.0):** Client HTTP per chiamate API esterne.

- **dotenv (v17.2.3):** Gestione sicura delle variabili di configurazione locali.

- **vite (v6.2.3), tsx (v4.21.0), esbuild (v0.28.0), typescript (v5.8.2):** Toolchain moderna per build, transpilazione Typescript e bundling unificato.

  

---

  

## 4. Installazione e Configurazione Locale

  

Segui questi passaggi per avviare l'applicazione sul tuo computer:

  

Passo 1: Clonazione o Download del Repository

git clone <URL_DEL_REPOSITORY>

cd quantum-engine

  

Passo 2: Installazione delle Dipendenze

npm install

(In alternativa: pnpm install oppure bun install)

  

Passo 3: Configurazione del File .env

Copia il file di esempio .env.example in un nuovo file .env ed inserisci la tua chiave API Google Gemini:

GEMINI_API_KEY="AIzaSy..."

VITE_IBM_QUANTUM_API_KEY="tuo_token_ibm_opzionale"

  

Passo 4: Avvio in Modalità Sviluppo

npm run dev

  

Apri il browser all'indirizzo:

http://localhost:3000

  

---

  

## 5. Variabili di Ambiente (.env)

  

| Variabile | Obbligatoria | Descrizione | Come ottenerla |

| :--- | :---: | :--- | :--- |

| GEMINI_API_KEY | Sì | Chiave per l'Agente AI di Business Intelligence e generazione codice quantistico. | Ottenibile gratuitamente su Google AI Studio (https://aistudio.google.com/). |

| VITE_IBM_QUANTUM_API_KEY | Opzionale | Token per inviare circuiti su computer quantistici reali IBM. | Ottenibile creando un account su IBM Quantum Platform (https://quantum.ibm.com/). |

| PORT | Opzionale | Porta HTTP del server (default: 3000). | Configurabile a piacere. |

  

---

  

## 6. Comandi Disponibili

  

| Comando | Descrizione |

| :--- | :--- |

| npm run dev | Avvia il server Node.js/Express + Vite in modalità sviluppo su http://localhost:3000. |

| npm run build | Compila l'interfaccia frontend Vite in dist/ e crea il bundle CommonJS del server dist/server.cjs tramite esbuild. |

| npm run start | Avvia il server compilato e ottimizzato per la produzione (node dist/server.cjs). |

| npm run lint | Esegue il controllo statico dei tipi TypeScript (tsc --noEmit). |

| npm run clean | Rimuove la cartella di build dist/. |

  

---

  

## 7. Architettura del Progetto

  

├── package.json # Configurazione dipendenze e script

├── tsconfig.json # Configurazione TypeScript

├── vite.config.ts # Configurazione Vite e plugin Tailwind CSS

├── server.ts # Server Express: API PQC, Gemini AI, IBM Proxy, WebSockets

├── .env.example # Template per le variabili di ambiente

├── README.md # Documentazione e guida di installazione

├── src/

│ ├── main.tsx # Entrypoint React

│ ├── App.tsx # Layout principale e navigazione tab

│ ├── index.css # Stili globali Tailwind CSS

│ ├── types.ts # Tipi TypeScript globali

│ ├── components/

│ │ ├── QuantumAgentsInterface.tsx # Agenti Quantistici, Calibrazione Dati e QASM

│ │ ├── IBMQuantumInterface.tsx # Invio a IBM Q, Traduzione Stati & Confronto Classico/Q

│ │ ├── PostQuantumChat.tsx # Chat crittografata PQC ML-KEM-768 + WebSockets

│ │ ├── PQCFileEncryptor.tsx # Cifratura/Decifratura file quantistica

│ │ ├── ExecutiveReportGenerator.tsx # Generatore Report Esecutivi PDF

│ │ └── ... # Componenti grafici (Bloch Sphere, Radar, ecc.)

│ └── lib/ # Utility crittografiche e matematiche

  

---

  

## 📜 Licenza & Conformità

- Sicurezza: Architettura conforme a NIST FIPS 203 (ML-KEM), NIST FIPS 140-3, NIST SP 800-38D (AES-GCM) e NIST SP 800-90B/C (TRNG).

- Quantum Computing: Compatibile con specifiche OpenQASM 2.0 e Qiskit 1.x.

  
  
  

ENG

  
  

# Quantum Engine & Quantum BI Assistant ⚛️🛡️

  

Advanced enterprise platform for quantum simulation, AI-driven Quantum Business Intelligence (powered by Google Gemini), OpenQASM 2.0 / Qiskit 1.x quantum circuit generation, real IBM Quantum hardware dispatching, and secure communication channels protected by Post-Quantum Cryptography (PQC ML-KEM-768).

  

---

  

## 📋 Table of Contents

1. [System Requirements](#1-system-requirements)

2. [Database and Memory Architecture](#2-database-and-memory-architecture)

3. [List of Libraries and External APIs](#3-list-of-libraries-and-external-apis)

4. [Local Installation and Setup](#4-local-installation-and-setup)

5. [Environment Variables (.env)](#5-environment-variables-env)

6. [Available Commands](#6-available-commands)

7. [Project Directory Structure](#7-project-directory-structure)

  

---

  

## 1. System Requirements

  

To run the application locally or deploy it to a dedicated server, the following minimum requirements must be met:

  

| Component | Minimum Requirement | Recommended |

| :--- | :--- | :--- |

| **Operating System** | Windows 10/11, macOS (Intel or Apple Silicon), Linux (Ubuntu 20.04+, Debian, Fedora, Arch) | Any modern 64-bit OS |

| **Node.js** | Version 18.x or 20.x LTS | Version 20.x LTS or higher |

| **Package Manager** | npm (v9+), pnpm (v8+), or bun | npm preinstalled with Node.js |

| **RAM** | 2 GB free | 4 GB+ free |

| **Disk Space** | 500 MB for source code and node_modules | 1 GB+ |

| **Network Port** | Local port 3000 available | 3000 (default configuration) |

| **Internet Connection** | Required for Google Gemini, IBM Quantum, and QRNG APIs | Stable broadband connection |

  

---

  

## 2. Database and Memory Architecture

  

The application adopts a high-security Zero-Data-Retention (Zero-Trace) architecture:

  

1. **In-Memory Volatile Store:**

- Encrypted chat sessions, ephemeral PQC rooms, and temporary invitation codes are stored purely in server volatile memory (Map<string, Room>).

- No chat logs or uploaded files are permanently retained on disk.

  

2. **Post-Quantum Zero-Trace RAM Scrubber:**

- Compliant with NIST FIPS 140-3 Zeroization and FIPS 203 standards.

- All cryptographic buffers containing sensitive key material (Kyber private keys, shared secrets, IVs, and symmetric AES keys) are overwritten with hardware random bytes (crypto.randomFillSync) and zeroed out (.fill(0)) immediately after execution inside a finally block.

  

3. **Volatile Memory File Buffers (Multer MemoryStorage):**

- User-uploaded CSV/Excel datasets and files are processed strictly in memory streams (multer.memoryStorage()) without ever touching the local filesystem.

  

4. **Client-Side Persistence (Browser LocalStorage):**

- Cleaned tables, user display preferences, industry presets, and IBM Quantum API tokens are stored locally within the user's browser (localStorage) with zero transit to third-party central databases.

  

---

  

## 3. List of Libraries and External APIs

  

### 🤖 Artificial Intelligence & Machine Learning

- **@google/genai (v1.29.0+):** Official Google DeepMind SDK integrating Google Gemini (Gemini 3.5 Flash).

- Capabilities: Semantic dataset analysis, predictive Business Intelligence, quantum entanglement constraint generation, OpenQASM 2.0 & Qiskit 1.x code synthesis/validation, and quantum state rotation angle computation: 2*arcsin(sqrt(P)).

  

### 🛡️ Post-Quantum Cryptography (PQC) & Hardware Security

- **crystals-kyber (v5.1.0+):** Implementation of the NIST-standardized ML-KEM-768 (CRYSTALS-Kyber) algorithm (FIPS 203).

- Capabilities: Quantum-resistant key encapsulation mechanism secure against Shor's algorithm attacks.

- **Node.js Cryptography Module (crypto):**

- Authenticated symmetric encryption using AES-256-GCM (NIST SP 800-38D).

- Cryptographically secure pseudo-random number generator (CSPRNG) conforming to NIST SP 800-90B.

- **ANU Quantum Random Number Generator (QRNG API):**

- Endpoint: https://qrng.anu.edu.au/API/jsonI.php (Australian National University).

- Physical entropy extraction from optical vacuum quantum fluctuations injected directly into cryptographic seeds.

  

### ⚛️ Quantum Computing & Hardware Gateway

- **IBM Quantum Platform API:**

- Gateway Endpoint: Job and quantum circuit dispatching to physical IBM Quantum superconducting processors (e.g., ibm_sherbrooke, ibm_brisbane, ibm_kyoto) and cloud Statevector simulators using IBM Quantum API tokens.

  

### 🎨 Frontend & User Interface

- **react & react-dom (v19.0.1):** Component-based reactive UI framework.

- **@tailwindcss/vite & tailwindcss (v4.1.14):** High-performance atomic utility CSS framework.

- **motion (v12.23.24):** High-fidelity animation library for quantum state transitions (Bloch sphere, radar visualizations, probability distribution bars).

- **lucide-react (v0.546.0):** Comprehensive vector icon suite.

- **recharts (v3.8.1):** Quantum state distribution charts, Shot count visualizations, and multi-variable radar diagrams.

- **jspdf (v4.2.1) & jspdf-autotable (v5.0.7):** PDF document generation engine for executive audit summaries and technical datasheets.

  

### ⚙️ Backend, Server & Networking

- **express (v4.21.2):** RESTful HTTP backend server.

- **socket.io & socket.io-client (v4.8.3):** Full-duplex real-time WebSockets communication layer for PQC encrypted messaging.

- **multer (v2.1.1):** Secure in-memory multipart file upload processor.

- **axios (v1.16.0):** Promise-based HTTP client for external service dispatching.

- **dotenv (v17.2.3):** Environment variable manager.

- **vite (v6.2.3), tsx (v4.21.0), esbuild (v0.28.0), typescript (v5.8.2):** Modern tooling for build pipelines, TypeScript compilation, and single-file CommonJS bundling.

  

---

  

## 4. Local Installation and Setup

  

Follow these steps to run the application on your local machine:

  

Step 1: Clone or Download the Repository

git clone <REPOSITORY_URL>

cd quantum-engine

  

Step 2: Install Dependencies

npm install

(Alternative: pnpm install or bun install)

  

Step 3: Configure Environment Variables

Copy the .env.example file to a new .env file and add your Google Gemini API key:

GEMINI_API_KEY="AIzaSy..."

VITE_IBM_QUANTUM_API_KEY="your_optional_ibm_token"

  

Step 4: Start the Development Server

npm run dev

  

Open your browser and navigate to:

http://localhost:3000

  

---

  

## 5. Environment Variables (.env)

  

| Variable | Required | Description | How to obtain |

| :--- | :---: | :--- | :--- |

| GEMINI_API_KEY | Yes | API key for the AI Business Intelligence Agent and quantum code synthesis. | Free from Google AI Studio (https://aistudio.google.com/). |

| VITE_IBM_QUANTUM_API_KEY | Optional | User API token to dispatch circuits to real IBM Quantum processors. | Available by creating an account on IBM Quantum Platform (https://quantum.ibm.com/). |

| PORT | Optional | Server HTTP listening port (default: 3000). | User configurable. |

  

---

  

## 6. Available Commands

  

| Command | Description |

| :--- | :--- |

| npm run dev | Boots the Express + Vite server in development mode on http://localhost:3000. |

| npm run build | Compiles the Vite frontend to dist/ and bundles the server into dist/server.cjs via esbuild. |

| npm run start | Runs the production-optimized bundled server (node dist/server.cjs). |

| npm run lint | Performs TypeScript static type checking without emitting files (tsc --noEmit). |

| npm run clean | Cleans up and deletes the dist/ build directory. |

  

---

  

## 7. Project Directory Structure

  

├── package.json # Dependencies and scripts configuration

├── tsconfig.json # TypeScript compiler configuration

├── vite.config.ts # Vite configuration with Tailwind CSS plugin

├── server.ts # Express server: PQC APIs, Gemini AI, IBM Proxy, WebSockets

├── .env.example # Environment variables template

├── README.md # Installation guide and documentation

├── src/

│ ├── main.tsx # React application entrypoint

│ ├── App.tsx # Main layout and tab navigation

│ ├── index.css # Global Tailwind CSS styles

│ ├── types.ts # Global TypeScript definitions

│ ├── components/

│ │ ├── QuantumAgentsInterface.tsx # Quantum Agents, Data Calibration & QASM generator

│ │ ├── IBMQuantumInterface.tsx # IBM Q Dispatcher, State Translation & Classical/Q Comparison

│ │ ├── PostQuantumChat.tsx # PQC ML-KEM-768 Encrypted Chat with WebSockets

│ │ ├── PQCFileEncryptor.tsx # Post-Quantum File Encryptor/Decryptor

│ │ ├── ExecutiveReportGenerator.tsx # Executive PDF Summary Generator

│ │ └── ... # Visual components (Bloch Sphere, Radar, etc.)

│ └── lib/ # Cryptographic and mathematical utilities

  

---

  

## 📜 Compliance & Standards

- Security: Compliant with NIST FIPS 203 (ML-KEM), NIST FIPS 140-3, NIST SP 800-38D (AES-GCM), and NIST SP 800-90B/C (TRNG).

- Quantum Computing: Fully compliant with OpenQASM 2.0 and Qiskit 1.x specifications.
