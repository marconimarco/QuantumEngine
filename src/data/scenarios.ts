export interface QuantumScenario {
  id: string;
  macroarea: string;
  technology: string;
  name: string;
  logicType: string;
  targetVariables: string;
}

export const QUANTUM_SCENARIOS: QuantumScenario[] = [
  // =========================================================================
  // SEZIONE 1: SCENARI PER COMPUTER QUANTISTICO (IBM QUANTUM QPU)
  // =========================================================================

  // 1.1 FINANZA E MERCATI (Finance) - [IBM QPU]
  {
    id: "fin-q-1",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "1. Hedging Quantistico Multilivello Cross-Asset",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Volatilità_Implicita, Correlazione_Dinamica, Tassi_Cambio_Spot"
  },
  {
    id: "fin-q-2",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "2. Ottimizzazione Portafoglio con Vincoli di Cardinalità (QUBO)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Matrice_Covarianza, Rendimento_Atteso, Budget_Massimo"
  },
  {
    id: "fin-q-3",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "3. Allocazione Capitali per Requisiti Solvibilità (Basel IV)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Attività_Ponderate_Rischio, Capitale_Tier_1, Esposizione_Lorda"
  },
  {
    id: "fin-q-4",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "4. Arbitraggio di Volatilità su Opzioni Index-Linked",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Smile_Volatilità, Delta, Gamma, Vega, Volumi_Scambio"
  },
  {
    id: "fin-q-5",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "5. Ottimizzazione Portafoglio Socialmente Responsabile (ESG)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Punteggio_ESG, Screening_Negativo, Tracking_Error"
  },
  {
    id: "fin-q-6",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "6. Market Timing Esatto per Liquidazione Asset",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Impatto_Prezzo, Profondità_Book, Costo_Transazione"
  },
  {
    id: "fin-q-7",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "7. Selezione Paniere Sintetico per Tracking ETF",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Beta_Atteso, Tracking_Difference, Liquidità_Media"
  },
  {
    id: "fin-q-8",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "8. Hedging Rischio Valutario su Contratti Fornitori",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tasso_Forward, Esposizione_Netta, Costo_Premio"
  },
  {
    id: "fin-q-9",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "9. Ribilanciamento Dinamico Fondo a Rischio Target",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Volatilità_Realizzata, Turnover_Portafoglio, Limite_Drawdown"
  },
  {
    id: "fin-q-10",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "10. Arbitraggio Triangolare su Coppie di Valute FX",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Bid_Ask_Spread, Latenza_Esecuzione, Saldo_Conto"
  },
  {
    id: "fin-q-11",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "11. Valutazione del Rischio Sistemico Interbancario",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Esposizione_Interconnessa, Indice_Leva, Probabilità_Contagio"
  },
  {
    id: "fin-q-12",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "12. Stress Testing Macroeconomico Monte Carlo Accelerato",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Tasso_Inflazione, Disoccupazione, Tasso_Default_Medio"
  },
  {
    id: "fin-q-13",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "13. Pricing di Derivati Esotici Multi-Sottostante (QAE)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Correlazione_Asset, Volatilità_Locale, Struttura_Scadenze"
  },
  {
    id: "fin-q-14",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "14. Stima del Value at Risk (VaR) e Conditional VaR",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Distribuzione_Perdite, Livello_Confidenza, Orizzonte_Temporale"
  },
  {
    id: "fin-q-15",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "15. Rilevamento Anomalie e Riciclaggio (AML)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Frequenza_Transazioni, Importo_Medio, Distanza_Pattern"
  },
  {
    id: "fin-q-16",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "16. Valutazione Rischio di Controparte (CVA)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Profilo_Esposizione, Rating_Controparte, Tasso_Recupero"
  },
  {
    id: "fin-q-17",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "17. Clustering Quantistico di Titoli Obbligazionari",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Duration_Modificata, Rendimento_Scadenza, Spread_Creditizio"
  },
  {
    id: "fin-q-18",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "18. Scoring Creditizio Aziendale Non Lineare",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Rapporto_Indebitamento, Margine_Operativo, Storico_Pagamenti"
  },
  {
    id: "fin-q-19",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "19. Calcolo Probabilità di Default su Mutui Subprime",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Loan_to_Value, Rapporto_Rata_Reddito, Punteggio_FICO"
  },
  {
    id: "fin-q-51",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "51. Valutazione del Rischio di Liquidità Bancaria (Stress Test)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Tasso_Prelievo, Riserve_Interbancarie, Scadenza_Titoli_Stato"
  },
  {
    id: "fin-q-52",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "52. Assicurazioni: Calcolo dei Premi per Eventi Catastrofici",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Lat_Long, Storico_Alluvioni, Valore_Immobile, Indice_Climatico"
  },
  {
    id: "fin-q-53",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "53. Previsione dei Tassi di Cambio (Forex Market)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Coppia_Valutaria, PIL_Paese, Tasso_Inflazione, Bilancia_Commerciale"
  },
  {
    id: "fin-q-54",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "54. Previsione del Churn Rate di Clienti Private Banking",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Patrimonio_Gestito, Numero_Reclami, Frequenza_Accesso_App"
  },
  {
    id: "fin-q-55",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "55. Trading Algoritmico basato su Micro-Trend di Volatilità (VIX)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Indice_VIX, Prezzo_Futures, Open_Interest"
  },
  {
    id: "fin-q-56",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "56. Finanziamenti alle Imprese tramite Tokenizzazione Real Estate",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Mq_Immobile, Rendimento_Affitti, Token_Emessi, Tasso_Occupazione"
  },
  {
    id: "fin-q-57",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "57. Analisi dei Flussi di Cassa per Prestiti Peer-to-Peer (P2P Lending)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Rata_Mensile, Ritardo_Pagamenti_Giorni, Tasso_Interesse"
  },
  {
    id: "fin-q-58",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "58. Previsione del Prezzo delle Materie Prime (Commodities)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Grano_Tonnellate, Scorte_Mondiali, Previsioni_Siccità, Costo_Fertilizzanti"
  },
  {
    id: "fin-q-59",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "59. Ottimizzazione delle Emissioni di Green Bond Aziendali",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Capitale_Richiesto, Tasso_Cedola, Tonnellate_CO2_Evitate"
  },

  // 1.2 LOGISTICA E SUPPLY CHAIN (Logistics) - [IBM QPU]
  {
    id: "log-q-1",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "1. Vehicle Routing Problem con Finestre Temporali (VRPTW)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Distanza_Km, Finestra_Temporale, Capacità_Veicolo"
  },
  {
    id: "log-q-2",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "2. Ottimizzazione del Carico Container 3D (Bin Packing)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Volume_Oggetto, Peso_Massimo, Baricentro_Stabilità"
  },
  {
    id: "log-q-3",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "3. Schedulazione Turni Equipaggi Portuali/Aeroportuali",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Certificazione_Ruolo, Ore_Lavoro_Massime, Riposo_Minimo"
  },
  {
    id: "log-q-4",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "4. Pianificazione Flotta Droni per Consegne Ultimo Miglio",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Autonomia_Batteria, Peso_Pacco, Raggio_Azione"
  },
  {
    id: "log-q-5",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "5. Instradamento Multi-Modale (Nave, Treno, Camion)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tempo_Transito, Costo_Modale, Emissioni_CO2"
  },
  {
    id: "log-q-6",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "6. Allocazione Gate Aeroportuali per Voli Internazionali",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Dimensione_Aeromobile, Tempo_Stazionamento, Distanza_Terminal"
  },
  {
    id: "log-q-7",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "7. Ottimizzazione delle Scorte di Sicurezza Multi-Echelon",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Lead_Time_Fornitore, Varianza_Domanda, Costo_Stoccaggio"
  },
  {
    id: "log-q-8",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "8. Valutazione Rischio di Interruzione della Catena di Fornitura",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Rischio_Geopolitico, Affidabilità_Vettore, Dipendenza_Fornitore"
  },
  {
    id: "log-q-9",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "9. Analisi Vulnerabilità della Rete di Distribuzione (Graph Theory)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Centralità_Nodo, Ridondanza_Percorso, Flusso_Critico"
  },
  {
    id: "log-q-14",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "14. Condivisione delle Bici Elettriche (Bike Sharing Optimization)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Stazione_Id, Bici_Disponibili, Meteo_Temperatura, Ora_Punta"
  },
  {
    id: "log-q-15",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "15. Ottimizzazione delle Rotte dei Corrieri Espresso (Last Mile Delivery)",
    logicType: "Ottimizzazione Combinatoria (QAOA)",
    targetVariables: "Numero_Pacchi, Finestra_Oraria, Traffico_Indice, ZTL_Accesso"
  },
  {
    id: "log-q-16",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "16. Gestione dei Parcheggi Intelligenti con Sensori IoT",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Stallo_ID, Stato_Occupato, Durata_Sosta, Tariffa_Oraria"
  },
  {
    id: "log-q-17",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "17. Distribuzione dei Carichi sui Treni Merci Alta Velocità",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Vagone_ID, Peso_Merce, Centro_Gravità, Velocità_Tratta"
  },
  {
    id: "log-q-18",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "18. Gestione della Raccolta Rifiuti Urbana Predittiva",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Cassonetto_ID, Percentuale_Riempimento, Giorni_Ultimo_Svuotamento"
  },
  {
    id: "log-q-19",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "19. Consegne Drone-to-Home in Aree Urbane Dense",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Peso_Pacco, Autonomia_Drone, Vento_Nodi, No_Fly_Zone"
  },
  {
    id: "log-q-20",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "20. Ottimizzazione dei Flussi di Evacuazione in Caso di Emergenza",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Edificio_ID, Numero_Persone, Uscite_Disponibili, Ostruzione_Via"
  },
  {
    id: "log-q-21",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "21. Carpooling Aziendale e Algoritmi di Matching dei Dipendenti",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Dipendente_ID, Indirizzo_Casa, Orario_Ingresso, Posti_Auto"
  },
  {
    id: "log-q-22",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "22. Ottimizzazione delle Catene del Freddo per Alimenti Deperibili",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Lotto_Cibo, Temperatura_Camion, Soglia_Critica_Tempo"
  },
  {
    id: "log-q-23",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "23. Gestione dei Flussi Turistici nei Musei e Monumenti Storici",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Attrazione_ID, Biglietti_Venduti, Capacità_Massima, Tempo_Permanenza"
  },
  {
    id: "log-q-24",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "24. Approvvigionamento Just-In-Time per Cantieri Edili Metropolitani",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Materiale_Cemento, Ora_Consegna_Tassativa, Traffico_Mezzi_Pesanti"
  },
  {
    id: "log-q-25",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "25. Ottimizzazione dei Percorsi dei Mezzi di Soccorso (Ambulanze/Vigili)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Codice_Emergenza, Lat_Long_Evento, Barriere_Architettoniche"
  },
  {
    id: "log-q-26",
    macroarea: "Logistica e Supply Chain",
    technology: "Computer Quantistico (QPU)",
    name: "26. Pianificazione della Distribuzione Postale e dei Centri di Smistamento Hub",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Cap_Destinazione, Volume_Lettere, Capacità_Hub_Centrale"
  },

  // 1.3 ENERGIA E UTILITIES (Energy) - [IBM QPU]
  {
    id: "ene-q-1",
    macroarea: "Energia e Utilities",
    technology: "Computer Quantistico (QPU)",
    name: "1. Unit Commitment e Dispacciamento Ottimale Rete Elettrica (OPF)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Capacità_Generazione, Costo_Marginale, Limiti_Rampa"
  },
  {
    id: "ene-q-2",
    macroarea: "Energia e Utilities",
    technology: "Computer Quantistico (QPU)",
    name: "2. Pianificazione Posizionamento Turbine Eoliche Offshore",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Velocità_Vento_Media, Effetto_Scia, Profondità_Fondali"
  },
  {
    id: "ene-q-3",
    macroarea: "Energia e Utilities",
    technology: "Computer Quantistico (QPU)",
    name: "3. Schedulazione Ricarica Intelligente Flotte Veicoli Elettrici (V2G)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Stato_Carica_SOC, Tariffe_Orarie, Orario_Partenza"
  },
  {
    id: "ene-q-4",
    macroarea: "Energia e Utilities",
    technology: "Computer Quantistico (QPU)",
    name: "4. Ottimizzazione Idraulica Pompe-Turbine per Bacini Idroelettrici",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Livello_Invaso, Flusso_Acqua, Prezzo_Energia_Picco"
  },
  {
    id: "ene-q-5",
    macroarea: "Energia e Utilities",
    technology: "Computer Quantistico (QPU)",
    name: "5. Configurazione Topologica Microgrid in Caso di Blackout",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Carichi_Critici, Riserva_Storage, Capacità_Linee"
  },
  {
    id: "ene-q-6",
    macroarea: "Energia e Utilities",
    technology: "Computer Quantistico (QPU)",
    name: "6. Analisi Stabilità Transitoria della Rete con Energia Rinnovabile",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Frequenza_Rete, Tensione_Nodi, Inerzia_Sintetica"
  },
  {
    id: "ene-q-7",
    macroarea: "Energia e Utilities",
    technology: "Computer Quantistico (QPU)",
    name: "7. Simulazione Quantistica Invecchiamento Celle Batteria al Litio",
    logicType: "Simulazione Quantistica",
    targetVariables: "Formazione_SEI, Diffusione_Ioni, Resistenza_Interna"
  },

  // 1.4 CHIMICA, FARMACEUTICA E MATERIALI (Chemistry) - [IBM QPU]
  {
    id: "chm-q-1",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "1. Calcolo Stato Fondamentale di Molecole Complesse (VQE)",
    logicType: "Simulazione Quantistica",
    targetVariables: "Energia_Legame, Distanza_Interatomica, Superficie_Potenziale"
  },
  {
    id: "chm-q-2",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "2. Simulazione Catalizzatori per Fissazione Azoto (Sintesi Ammoniaca)",
    logicType: "Simulazione Quantistica",
    targetVariables: "Centro_FeMo_Cofattore, Barriera_Attivazione, Stato_Spin"
  },
  {
    id: "chm-q-3",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "3. Screening Molecolare per Inibitori Enzimatici (Drug Discovery)",
    logicType: "Ottimizzazione Combinatoria / VQE",
    targetVariables: "Affinità_Binding, Forma_Tascabile, Docking_Score"
  },
  {
    id: "chm-q-4",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "4. Progettazione Polimeri ad Alta Conducibilità per Celle a Combustibile",
    logicType: "Simulazione Quantistica",
    targetVariables: "Conducibilità_Protonica, Stabilità_Termica, Permeabilità_Gas"
  },
  {
    id: "chm-q-5",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "5. Modellazione Materiali Superconduttori ad Alta Temperatura",
    logicType: "Simulazione Quantistica",
    targetVariables: "Temperatura_Critica_Tc, Accoppiamento_Elettrone_Fonone, Gap_Energia"
  },
  {
    id: "chm-q-6",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "6. Ottimizzazione del Folding di Catene Peptidiche (QUBO)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Angoli_Dihedral, Interazioni_Idrofobiche, Ponti_Disolfuro"
  },
  {
    id: "chm-q-7",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "7. Scoperta di Catalizzatori per la Cattura della CO2 (MOF Materials)",
    logicType: "Simulazione Quantistica",
    targetVariables: "Dimensione_Pori, Affinità_Chimica, Volume_Gas_Assorbito"
  },
  {
    id: "chm-q-8",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "8. Sviluppo di Elettrolizzatori ad Alta Efficienza per Idrogeno Verde",
    logicType: "Simulazione Quantistica",
    targetVariables: "Materiale_Anodo, Concentrazione_Acido, Tensione_Soglia"
  },
  {
    id: "chm-q-9",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "9. Simulazione di Celle Solari a Perovskite di Nuova Generazione",
    logicType: "Simulazione Quantistica",
    targetVariables: "Spessore_Strato, Efficienza_Conversione, Tasso_Degradazione_Umidità"
  },
  {
    id: "chm-q-10",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "10. Ottimizzazione delle Reazioni di Riciclo Chimico delle Plastiche (PET)",
    logicType: "Simulazione Quantistica",
    targetVariables: "Temperatura_Reattore, Tipo_Enzima_Mutato, Residuo_Tossico"
  },
  {
    id: "chm-q-11",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "11. Progettazione di Nuovi Polimeri Biodegradabili per il Packaging Alimentare",
    logicType: "Simulazione Quantistica",
    targetVariables: "Tasso_Degradazione_Giorni, Resistenza_Trazione, Permeabilità_Ossigeno"
  },
  {
    id: "chm-q-12",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "12. Riduzione del Rumore Termico nei Superconduttori per Reti Elettriche Smart",
    logicType: "Simulazione Quantistica",
    targetVariables: "Composizione_Materiale, Temperatura_Critica, Pressione_Atmosferica"
  },
  {
    id: "chm-q-13",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "13. Sintesi di Fertilizzanti Green senza il Processo Haber-Bosch",
    logicType: "Simulazione Quantistica",
    targetVariables: "Pressione_Bar, Catalizzatore_Ferro_Rutenio, Emissione_Co2_Tonnellata"
  },
  {
    id: "chm-q-14",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "14. Trattamento delle Acque Reflue Industriali tramite Filtri al Grafene",
    logicType: "Simulazione Quantistica",
    targetVariables: "Dimensione_Maglia_Grafene, Concentrazione_Metalli_Pesanti, Flusso_Litri_Ora"
  },
  {
    id: "chm-q-15",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "15. Creazione di Vetri Intelligenti Termocromici per l'Isolamento degli Edifici",
    logicType: "Simulazione Quantistica",
    targetVariables: "Ossido_Vanadio, Temperatura_Transizione, Trasparenza_Infrarossi"
  },
  {
    id: "chm-q-16",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "16. Sviluppo di Bioplastiche da Scarti Agricoli (Lignina)",
    logicType: "Simulazione Quantistica",
    targetVariables: "Tonnellate_Paglia, Resa_Lignina, Elasticità_Polimero"
  },
  {
    id: "chm-q-17",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "17. Ottimizzazione dello Stoccaggio dell'Idrogeno in Idruri Metallici Solidi",
    logicType: "Simulazione Quantistica",
    targetVariables: "Lega_Magnesio_Nichel, Pressione_Assorbimento, Percentuale_Idrogeno_Stoccato"
  },
  {
    id: "chm-q-18",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "18. Progettazione di Membrane per la Desalinizzazione Energeticamente Efficiente",
    logicType: "Simulazione Quantistica",
    targetVariables: "Spessore_Membrana, Pressione_Osmotica, Percentuale_Sale_Rimosso"
  },
  {
    id: "chm-q-19",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "19. Sviluppo di Liquidi Ionici per il Riciclo delle Batterie a Ioni di Litio",
    logicType: "Simulazione Quantistica",
    targetVariables: "Tipo_Liquido_Ionico, Solubilità_Cobalto, Efficienza_Estrazione_Meteo"
  },
  {
    id: "chm-q-20",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "20. Riduzione dell'Impronta di Carbonio nella Production del Cemento Green",
    logicType: "Simulazione Quantistica",
    targetVariables: "Calcare_Percentuale, Argilla_Sostitutiva, Temperatura_Fornace"
  },
  {
    id: "chm-q-21",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "21. Formulazione di Additivi Eco-Friendly per Oli Lubrificanti Industriali",
    logicType: "Simulazione Quantistica",
    targetVariables: "Indice_Viscosità, Coefficiente_Attrito, Biodegradabilità_Percentuale"
  },
  {
    id: "chm-q-22",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "22. Progettazione di Materiali per l'Isolamento Acustico da Pneumatici Riciclati",
    logicType: "Simulazione Quantistica",
    targetVariables: "Grammatura_Gomma, Frequenza_Suono_Hertz, Abbattimento_Decibel"
  },
  {
    id: "chm-q-23",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "Computer Quantistico (QPU)",
    name: "23. Ottimizzazione della Produzione di Enzimi Industriali tramite Biologia Sintetica",
    logicType: "Simulazione Quantistica",
    targetVariables: "Sequenza_Dna_Enzima, Resa_Produttiva_Grammi, Stabilità_Ph"
  },

  // 1.5 PRODUZIONE E MANIFATTURA (Manufacturing) - [IBM QPU]
  {
    id: "man-q-1",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "1. Job-Shop Scheduling Problem su Macchine CNC Multitasking",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tempo_Lavorazione, Sequenza_Macchine, Tempo_Setup"
  },
  {
    id: "man-q-2",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "2. Ottimizzazione del Taglio Lamiere e Vetro (Cutting Stock Problem)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Dimensioni_Pezzo, Sfrido_Scarto, Foglio_Master"
  },
  {
    id: "man-q-3",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "3. Bilanciamento Linea di Assemblaggio con Vincoli Ergonomici",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tempo_Ciclo_Takt, Postazioni_Lavoro, Indice_Fatica"
  },
  {
    id: "man-q-4",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "4. Pianificazione Manutenzione Impianti Industriali ad Alta Complessità",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Probabilità_Guasto, Costo_Fermo, Disponibilità_Tecnici"
  },
  {
    id: "man-q-5",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "5. Configurazione Flessibile Isole Robotizzate di Saldatura",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Traiettoria_Braccio, Punti_Saldatura, Evitamento_Collisioni"
  },
  {
    id: "man-q-10",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "10. Manutenzione Predittiva dei Robot di Saldatura Automotive",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Vibrazione_Asse, Temperatura_Giunto, Corrente_Assorbita, Guasto_Verificato"
  },
  {
    id: "man-q-11",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "11. Ottimizzazione del Piazzamento dei Pezzi nel Taglio Tessile (Fashion Nesting)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "ID_Sagoma, Area_Tessuto, Scarto_Percentuale, Direzione_Trama"
  },
  {
    id: "man-q-12",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "12. Bilanciamento delle Linee di Assemblaggio Manifatturiere Complesse",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "ID_Stazione, Tempo_Ciclo_Secondi, Precedenza_Fase, Saturazione_Operatore"
  },
  {
    id: "man-q-13",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "13. Tintura Industriale dei Tessuti e Formulazione Ricette Colore (Color Matching)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Grammi_Pigmento, Riflettanza_Spettro, Tipo_Filato, Delta_E_Errore"
  },
  {
    id: "man-q-14",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "14. Gestione dell'Inventario Just-In-Time dei Componenti Meccanici",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Codice_Ricambio, Tempo_Consegna_Fornitore, Scorta_Minima, Lead_Time"
  },
  {
    id: "man-q-15",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "15. Pianificazione della Produzione di Abbigliamento su Commessa (Fast Fashion)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "ID_Ordine_Brand, Quantità_Capi, Data_Consegna_Tassativa, Macchine_Cucito"
  },
  {
    id: "man-q-16",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "16. Monitoraggio dell'Usura degli Utensili di Taglio CNC (Frese/Torni)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Giri_Mandrino, Sforzo_Motore_Ampere, Rugosità_Superficiale, Ore_Lavoro"
  },
  {
    id: "man-q-17",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "17. Ottimizzazione energetica delle Fornaci da Fonderia Metalli",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tonnellate_Rottame, Consumo_Mwh, Temperatura_Colata, Prezzo_Energia_Ora"
  },
  {
    id: "man-q-18",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "18. Progettazione di Tessuti Tecnici Militari o Sportivi ad Alta Resistenza",
    logicType: "Simulazione Quantistica",
    targetVariables: "Densità_Fili, Resistenza_Kevlar, Peso_Grammi_Mq, Elasticità"
  },
  {
    id: "man-q-19",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "19. Gestione della Catena di Fornitura della Pelle e Riduzione degli Scarti di Taglio",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "ID_Pelle_Bovina, Presenza_Cicatrici_Difetti, Superficie_Utile_Mq"
  },
  {
    id: "man-q-20",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "20. Ottimizzazione dei Processi di Galvanica sui Componenti di Moda (Fibbie/Bottoni)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tempo_Bagno_Chimico, Spessore_Oro_Micron, Corrente_Cella, Lucentezza"
  },
  {
    id: "man-q-21",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "21. Manutenzione e Calibrazione delle Macchine da Stampa Digitale su Tessuto",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Ugello_Stato, Viscosità_Inchiostro, Velocità_Avanzamento, Errore_Allineamento"
  },
  {
    id: "man-q-22",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "22. Riduzione dei Tempi di Set-Up delle Presse Meccaniche (SMED Quantistico)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "ID_Stampo_Cambio, Tempo_Smontaggio_Minuti, Attrezzaggio_Pronto"
  },
  {
    id: "man-q-23",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "23. Ottimizzazione della Cucitura Automatica di Airbag per l'Automotive",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tensione_Filo, Velocità_Ago, Spessore_Tessuto_Nylon, Salto_Punto_Difetto"
  },
  {
    id: "man-q-24",
    macroarea: "Produzione e Manifattura",
    technology: "Computer Quantistico (QPU)",
    name: "24. Gestione Ecologica del Lavaggio Industriale dei Capi d'Abbigliamento (Stone Wash)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Chili_Jeans, Litri_Acqua, Grammi_Enzimi, Grado_Scolorimento"
  },

  // 1.6 SICUREZZA, TELECOMUNICAZIONI E RETI (Security) - [IBM QPU]
  {
    id: "sec-q-1",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "Computer Quantistico (QPU)",
    name: "1. Distribuzione Chiavi Quantistiche (QKD) e Monitoraggio Intercettazioni",
    logicType: "Protocollo Quantistico",
    targetVariables: "Quantum_Bit_Error_Rate, Tasso_Generazione_Chiavi, Attenuazione_Fibra"
  },
  {
    id: "sec-q-2",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "Computer Quantistico (QPU)",
    name: "2. Ottimizzazione Instradamento Traffico Rete 5G/6G Core (Traffic Engineering)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Banda_Richiesta, Latenza_Max, Utilizzo_Link"
  },
  {
    id: "sec-q-3",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "Computer Quantistico (QPU)",
    name: "3. Pianificazione Frequenze e Celle per Stazioni Radio Base (Antenne)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Interferenza_Co_Canale, Copertura_Geografica, Potenza_Trasmissione"
  },
  {
    id: "sec-q-4",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "Computer Quantistico (QPU)",
    name: "4. Rilevamento Attacchi DDoS Tramite Correlazione Quantistica del Traffico",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Pacchetti_Secondo, Entropia_Indirizzi_IP, Flussi_Sincroni"
  },
  {
    id: "sec-q-5",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "Computer Quantistico (QPU)",
    name: "5. Allocazione Risorse di Rete per Network Slicing",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "SLA_Garantito, Isolamento_Fetta, Risorse_Elaborazione"
  },
  {
    id: "sec-q-10",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "Computer Quantistico (QPU)",
    name: "10. Generazione di Chiavi Crittografiche a Entropia Pura (Algoritmo QRNG)",
    logicType: "Protocollo Quantistico",
    targetVariables: "Rumore_Hardware, Seme_Casuale, Timestamp_Microsecondi"
  },
  {
    id: "sec-q-11",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "Computer Quantistico (QPU)",
    name: "11. Protezione dei Sistemi di Controllo Industriale SCADA (Fabbriche/Centrali)",
    logicType: "Protocollo Quantistico",
    targetVariables: "Comando_Plc, Valvola_Stato, Frequenza_Modbus_Pacchetti"
  },

  // 1.7 SANITÀ E GENOMICA (Healthcare & Genomics) - [IBM QPU]
  {
    id: "hea-q-1",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "1. Screening Virtuale di Farmaci su Miliardi di Molecole (Grover Search)",
    logicType: "Ottimizzazione Combinatoria / VQE",
    targetVariables: "ID_Molecola, Punteggio_Docking, Tossicità_Stimata, Peso_Dalton"
  },
  {
    id: "hea-q-2",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "2. Ottimizzazione dei Piani di Radioterapia Oncologica Lineare (IGRT)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Volume_Tumore, Distanza_Organi_Sani, Angolo_Fascio, Dose_Gy"
  },
  {
    id: "hea-q-3",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "3. Previsione delle Anomalie nel Ripiegamento Proteico (Protein Folding)",
    logicType: "Simulazione Quantistica",
    targetVariables: "Sequenza_Amminoacidi, Carica_Elettrica, Angolo_Torsione, Energia_Stato"
  },
  {
    id: "hea-q-4",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "4. Diagnostica precoce del Cancro da Dati di Sequenziamento DNA (GWAS)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Paziente_ID, Snp_Mutazione_Codice, Frequenza_Allelica, Stato_Malattia"
  },
  {
    id: "hea-q-5",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "5. Ottimizzazione dei Turni delle Sale Operatorie Ospedaliere",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "ID_Chirurgo, Tipo_Intervento, Tempo_Stimato_Minuti, Emergenza_Flag"
  },
  {
    id: "hea-q-6",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "6. Analisi Farmacogenomica per Terapie Personalizzate Cardiovascolari",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Profilo_Cip2c19, Dosaggio_Farmaco, Efficacia_Anticoagulante, Emorragia_Rischio"
  },
  {
    id: "hea-q-7",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "7. Monitoraggio e Previsione della Diffusione Epidemica (Modelli SIR Quantistici)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Comune_ID, Tasso_Contagio_R0, Densità_Popolazione, Hub_Trasporti"
  },
  {
    id: "hea-q-8",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "8. Elaborazione Ultrarapida di Immagini da Risonanza Magnetica (RMN Quantistica)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Segnale_Radiofrequenza, K_Space_Data, Risoluzione_Voxel, Rumore_Fisico"
  },
  {
    id: "hea-q-9",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "9. Ottimizzazione delle Catene di Distribuzione dei Vaccini a Breve Scadenza",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Hub_Vaccinale, Scorte_Dosi, Temperatura_Criogenica, Popolazione_Target"
  },
  {
    id: "hea-q-10",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "10. Identificazione di Biomarcatori Rari per Malattie Neurodegenerative (Alzheimer)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Proteina_Beta_Amyloid, Livello_Liquor, Punteggio_Cognitivo, Età_Paziente"
  },
  {
    id: "hea-q-11",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "11. Ottimizzazione dei Piani di Trattamento del Diabete tramite Microinfusori IoT",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Glicemia_Sensore, Carboidrati_Assunti, Unità_Insulina_Erogata"
  },
  {
    id: "hea-q-12",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "12. Modellazione Quantistica delle Interazioni tra Microbioma Intestinale e Sistema Immunitario",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Ceppo_Batterico_Percentuale, Citochine_Infiammatorie, Permeabilità_Intestinale"
  },
  {
    id: "hea-q-13",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "13. Progettazione di Scaffold Biocompatibili per la Stampa 3D di Organi (Tissue Engineering)",
    logicType: "Simulazione Quantistica",
    targetVariables: "Idrogel_Composizione, Porosità_Matrice, Fattore_Crescita_Cellulare, Sopravvivenza_Cellule"
  },
  {
    id: "hea-q-14",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "14. Selezione Quantistica dei Donatori per il Trapianto di Midollo Osseo (Compatibilità HLA)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "ID_Donatore, ID_Ricevente, Geni_HLA_A_B_C, Punteggio_Mismatch"
  },
  {
    id: "hea-q-15",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "15. Ottimizzazione dei Parametri di Ventilazione Meccanica in Terapia Intensiva",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Saturazione_Ossigeno, Pressione_Co2_Sangue, Volume_Tidale_Ventilatore"
  },
  {
    id: "hea-q-16",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "16. Ricerca di Nuovi Antibiotici contro i Superbatteri Resistenti (MRSA)",
    logicType: "Simulazione Quantistica",
    targetVariables: "Struttura_Peptide, Inibizione_Batterica_Percentuale, Permeabilità_Membrana"
  },
  {
    id: "hea-q-17",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "17. Ottimizzazione dei Flussi di Pronto Soccorso tramite Triage Quantistico Predittivo",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Paziente_Sintomi_Codice, Età, Parametri_Vitali_Anomali, Tempo_Attesa"
  },
  {
    id: "hea-q-18",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "18. Analisi dei Dati di Espressione Genica su Singola Cellula (scRNA-seq)",
    logicType: "Analisi di Correlazione / Rischio",
    targetVariables: "Cell_ID, Gene_Espresso_Conteggio, Marker_Superficie, Tipo_Cellulare"
  },
  {
    id: "hea-q-19",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "19. Progettazione di Nanoparticelle Lipidiche per il Rilascio Mirato di Farmaci (Targeted Delivery)",
    logicType: "Simulazione Quantistica",
    targetVariables: "Diametro_Nanoparticella, Carica_Zeta, Percentuale_Rilascio_Stomaco_Intestino"
  },
  {
    id: "hea-q-20",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "20. Ottimizzazione dei Piani di Riabilitazione Neurologica Post-Ictus tramite Interfacce Cervello-Computer (BCI)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Canale_Eeg_Segnale, Frequenza_Alfa_Beta, Movimento_Inteso_Flag"
  },

  // =========================================================================
  // SEZIONE 2: SCENARI PER MACCHINA CLASSICA (IA CLASSICA / HPC MULTITHREAD)
  // =========================================================================

  // 2.1 FINANZA E MERCATI (Finance) - [IA CLASSICA / HPC]
  {
    id: "fin-c-20",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "20. Algoritmo di Trading ad Alta Frequenza (HFT) e Order Book Matching",
    logicType: "Elaborazione in Tempo Reale",
    targetVariables: "Flusso_Ordini, Profondità_Livello_2, Latenza_Microsecondi"
  },
  {
    id: "fin-c-21",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "21. Analisi del Sentiment Finanziario da Notizie e Social (LLM)",
    logicType: "Natural Language Processing & Classificazione",
    targetVariables: "Polarità_Testo, Frequenza_Menzioni, Indice_Fiducia"
  },
  {
    id: "fin-c-22",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "22. Backtesting Storico Parallelo su Dati Tick-by-Tick",
    logicType: "Calcolo Parallelo HPC Vettoriale",
    targetVariables: "Prezzo_Esecuzione, Slippage, Sharpe_Ratio"
  },
  {
    id: "fin-c-23",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "23. Previsione Serie Storiche Prezzi con Reti Neurali LSTM/Transformer",
    logicType: "Machine Learning Supervisionato",
    targetVariables: "Rendimento_Precedente, Media_Mobile, Volumi_24h"
  },
  {
    id: "fin-c-24",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "24. Riconoscimento Pattern Tecnici su Grafici Candlestick (Computer Vision)",
    logicType: "Deep Learning Visivo",
    targetVariables: "Supporto_Resistenza, Trendline, Formazioni_Note"
  },
  {
    id: "fin-c-25",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "25. Calcolo Black-Scholes Analitico per Grandi Volumi di Contratti",
    logicType: "HPC Vettorizzato Analitico",
    targetVariables: "Strike_Price, Scadenza, Tasso_Privo_Rischio"
  },
  {
    id: "fin-c-26",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "26. Pricing di Polizze Vita Personalizzate (Insurtech)",
    logicType: "Machine Learning Tabellare",
    targetVariables: "Età, Indice_Massa_Corporea, Storico_Clinico, Ore_Sport_Settimana"
  },

  // 2.2 LOGISTICA E SUPPLY CHAIN (Logistics) - [IA CLASSICA / HPC]
  {
    id: "log-c-10",
    macroarea: "Logistica e Supply Chain",
    technology: "IA Classica / HPC",
    name: "10. Previsione della Domanda di Vendita con Gradient Boosting (XGBoost)",
    logicType: "Machine Learning Tabellare",
    targetVariables: "Storico_Vendite, Promozioni, Stagionalità"
  },
  {
    id: "log-c-11",
    macroarea: "Logistica e Supply Chain",
    technology: "IA Classica / HPC",
    name: "11. Tracciamento Visivo Automatico Colli con Telecamere OCR",
    logicType: "Computer Vision & Edge AI",
    targetVariables: "Codice_Barcode, Condizione_Imballo, Velocità_Nastro"
  },
  {
    id: "log-c-12",
    macroarea: "Logistica e Supply Chain",
    technology: "IA Classica / HPC",
    name: "12. Monitoraggio Flotta GPS e Geofencing in Tempo Reale",
    logicType: "Elaborazione Streaming Dati",
    targetVariables: "Coordinate_Lat_Lon, Velocità_Attuale, Consumo_Carburante"
  },
  {
    id: "log-c-13",
    macroarea: "Logistica e Supply Chain",
    technology: "IA Classica / HPC",
    name: "13. Simulazione Discreta di Magazzino (Digital Twin)",
    logicType: "HPC Monte Carlo Classico",
    targetVariables: "Tempi_Prelievo, Blocchi_Carrello, Tempo_Ciclo"
  },
  {
    id: "log-c-27",
    macroarea: "Logistica e Supply Chain",
    technology: "IA Classica / HPC",
    name: "27. Veicoli Autonomi: Navigazione e Rilevamento Ostacoli",
    logicType: "Computer Vision & Edge AI",
    targetVariables: "Distanza_Lidar, Velocità_Veicolo, Angolo_Sterzo, Meteo_Visibilità"
  },
  {
    id: "log-c-28",
    macroarea: "Logistica e Supply Chain",
    technology: "IA Classica / HPC",
    name: "28. Disposizione dei Prodotti nei Magazzini di E-Commerce (Picking)",
    logicType: "Machine Learning Tabellare",
    targetVariables: "ID_Prodotto, Frequenza_Acquisto_Combinato, Peso_Oggetto, Scaffale_Slot"
  },
  {
    id: "log-c-29",
    macroarea: "Logistica e Supply Chain",
    technology: "IA Classica / HPC",
    name: "29. Sincronizzazione dei Semafori Urbani in Tempo Real",
    logicType: "Elaborazione Streaming Dati",
    targetVariables: "Flusso_Auto_Minuto, Lunghezza_Coda, Tempo_Rosso"
  },
  {
    id: "log-c-30",
    macroarea: "Logistica e Supply Chain",
    technology: "IA Classica / HPC",
    name: "30. Ottimizzazione dei Turni del Personale del Trasporto Pubblico",
    logicType: "Machine Learning Tabellare",
    targetVariables: "ID_Autista, Ore_Guida_Settimanali, Riposo_Garantito, Linea_Assegnata"
  },
  {
    id: "log-c-31",
    macroarea: "Logistica e Supply Chain",
    technology: "IA Classica / HPC",
    name: "31. Gestione della Rete di Illuminazione Pubblica Adattiva",
    logicType: "Elaborazione Streaming Dati",
    targetVariables: "Lampione_ID, Luminosità_Ambientale, Passaggio_Pedoni_Ora"
  },

  // 2.3 ENERGIA E UTILITIES (Energy) - [IA CLASSICA / HPC]
  {
    id: "ene-c-8",
    macroarea: "Energia e Utilities",
    technology: "IA Classica / HPC",
    name: "8. Previsione Irraggiamento Solare e Produzione Fotovoltaica",
    logicType: "Machine Learning Regressione",
    targetVariables: "Copertura_Nuvolosa, Temperatura_Ambiente, Angolo_Solare"
  },
  {
    id: "ene-c-9",
    macroarea: "Energia e Utilities",
    technology: "IA Classica / HPC",
    name: "9. Manutenzione Predittiva Turbine a Gas tramite Sensori di Vibrazione",
    logicType: "Analisi Serie Temporali & Anomaly Detection",
    targetVariables: "Ampiezza_Vibrazione, Pressione_Scarico, Ore_Esercizio"
  },
  {
    id: "ene-c-10",
    macroarea: "Energia e Utilities",
    technology: "IA Classica / HPC",
    name: "10. Rilevamento Perdite nella Rete Idrica da Sensori di Flusso",
    logicType: "Anomaly Detection Distribuito",
    targetVariables: "Differenza_Pressione, Portata_Notturna, Storico_Rotture"
  },
  {
    id: "ene-c-11",
    macroarea: "Energia e Utilities",
    technology: "IA Classica / HPC",
    name: "11. Ottimizzazione Termica degli Edifici (HVAC) con Reinforcement Learning",
    logicType: "Controllo Ottimo con Agenti RL",
    targetVariables: "Occupazione_Stanze, Temperatura_Esterna, Consumo_KWh"
  },
  {
    id: "ene-c-12",
    macroarea: "Energia e Utilities",
    technology: "IA Classica / HPC",
    name: "12. Manutenzione Stradale Ottimizzata tramite Dati Accelerometro Bus",
    logicType: "Analisi Serie Temporali & Anomaly Detection",
    targetVariables: "Lat_Long, Intensità_Scossone, Frequenza_Passaggio_Bus"
  },

  // 2.4 CHIMICA, FARMACEUTICA E MATERIALI (Chemistry) - [IA CLASSICA / HPC]
  {
    id: "chm-c-7",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "IA Classica / HPC",
    name: "7. Predizione Struttura Terziaria Proteine con AlphaFold / ESMFold",
    logicType: "Deep Learning Transformer Strutturale",
    targetVariables: "Sequenza_Aminoacidi, Matrice_Distanze, Punteggio_pLDDT"
  },
  {
    id: "chm-c-8",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "IA Classica / HPC",
    name: "8. Dinamica Molecolare Classica (GROMACS/LAMMPS) su GPU",
    logicType: "Calcolo Parallelo HPC su Tensor Core",
    targetVariables: "Traiettorie_Atomi, Campi_Forza, Fluttuazione_RMSD"
  },
  {
    id: "chm-c-9",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "IA Classica / HPC",
    name: "9. Generazione di Nuove Molecole con Modelli Diffusivi / VAE",
    logicType: "AI Generativa Chimica",
    targetVariables: "Proprietà_QED, Sintetizzabilità_SA, Solubilità_LogP"
  },
  {
    id: "chm-c-10",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "IA Classica / HPC",
    name: "10. Tossicologia Predittiva e ADMET in Silico",
    logicType: "Classificazione Machine Learning",
    targetVariables: "Assorbimento_Intestinale, Legame_Proteico, Biodisponibilità"
  },
  {
    id: "chm-c-11",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "IA Classica / HPC",
    name: "11. Massimizzazione dell'Efficienza dei Biocarburanti dalle Alghe",
    logicType: "Machine Learning Regressione",
    targetVariables: "Ceppo_Algale, Intensità_Luce_Led, Nutrienti_Azoto, Resa_Lipidica"
  },
  {
    id: "chm-c-12",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "IA Classica / HPC",
    name: "12. Formulazione di Vernici Ecologiche Senza Composti Organici Volatili (VOC)",
    logicType: "Machine Learning Regressione",
    targetVariables: "Solvente_Acqua, Legante_Bio, Tempo_Essiccazione, Riflessione_Uv"
  },
  {
    id: "chm-c-13",
    macroarea: "Chimica, Farmaceutica e Materiali",
    technology: "IA Classica / HPC",
    name: "13. Ottimizzazione della Combustione dell'Idrogeno nelle Turbine Industriali",
    logicType: "HPC Vettorizzato Analitico",
    targetVariables: "Mix_Idrogeno_Metano, Temperatura_Fiamma, Emissione_NOx"
  },

  // 2.5 PRODUZIONE E MANIFATTURA (Manufacturing) - [IA CLASSICA / HPC]
  {
    id: "man-c-6",
    macroarea: "Produzione e Manifattura",
    technology: "IA Classica / HPC",
    name: "6. Controllo Qualità Automatico con Telecamere e Reti Convoluzionali (CNN)",
    logicType: "Computer Vision Industriale",
    targetVariables: "Difetto_Superficie, Tolleranza_Dimensionale, Confidenza_Classificatore"
  },
  {
    id: "man-c-7",
    macroarea: "Produzione e Manifattura",
    technology: "IA Classica / HPC",
    name: "7. Manutenzione Predittiva su Cuscinetti con Analisi Spettrale FFT",
    logicType: "Signal Processing & Reti Neurali",
    targetVariables: "Frequenza_Passaggio_Sfere, Picco_Spettro, Temperatura_Cuscinetto"
  },
  {
    id: "man-c-8",
    macroarea: "Produzione e Manifattura",
    technology: "IA Classica / HPC",
    name: "8. Ottimizzazione Parametri di Stampaggio Iniezione Plastica",
    logicType: "Ottimizzazione Bayesiana",
    targetVariables: "Pressione_Iniezione, Temperatura_Stampo, Tempo_Raffreddamento"
  },
  {
    id: "man-c-9",
    macroarea: "Produzione e Manifattura",
    technology: "IA Classica / HPC",
    name: "9. Riconoscimento Anomalie Acustiche su Presse Industriali",
    logicType: "Audio AI & Anomaly Detection",
    targetVariables: "Spettrogramma_Audio, Livello_Decibel, Distanza_Euclidea"
  },
  {
    id: "man-c-11",
    macroarea: "Produzione e Manifattura",
    technology: "IA Classica / HPC",
    name: "11. Controllo Qualità Ottico di Fine Linea con Computer Vision",
    logicType: "Computer Vision Industriale",
    targetVariables: "Pixel_Anomalia, Micro_Cricca, Spessore_Lamiera, Esito_Scarto"
  },
  {
    id: "man-c-12",
    macroarea: "Produzione e Manifattura",
    technology: "IA Classica / HPC",
    name: "12. Ottimizzazione della Produzione di Vetro Industriale per Elettrodomestici",
    logicType: "Controllo Ottimo con Agenti RL",
    targetVariables: "Mix_Silice, Temperatura_Forno, Velocità_Raffreddamento, Inclusione_Bolle"
  },
  {
    id: "man-c-13",
    macroarea: "Produzione e Manifattura",
    technology: "IA Classica / HPC",
    name: "13. Pianificazione delle Manutenzioni dei Carrelli Elevatori (Muletti) di Fabbrica",
    logicType: "Analisi Serie Temporali & Anomaly Detection",
    targetVariables: "Muletto_ID, Ore_Moto, Stato_Carica_Batteria, Pressione_Idraulica"
  },

  // 2.6 SICUREZZA, TELECOMUNICAZIONI E RETI (Security) - [IA CLASSICA / HPC]
  {
    id: "sec-c-6",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "IA Classica / HPC",
    name: "6. Rilevamento Malware Tramite Analisi del Bytecode ed Euristica",
    logicType: "Classificazione ML / NLP",
    targetVariables: "Chiamate_API_Sospette, Entropia_File, Sezioni_PE"
  },
  {
    id: "sec-c-7",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "IA Classica / HPC",
    name: "7. Analisi Log Firewall per Prevenzione Intrusioni (SIEM)",
    logicType: "Elaborazione Big Data & ML",
    targetVariables: "Porta_Destinazione, Frequenza_Tentativi, Indirizzo_Origine"
  },
  {
    id: "sec-c-8",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "IA Classica / HPC",
    name: "8. Crittografia Post-Quantum (PQC: Kyber, Dilithium) su Processori Classici",
    logicType: "Crittografia Reticolare Vettorializzata",
    targetVariables: "Dimensione_Chiave, Tempo_Cifratura, Tempo_Decifratura"
  },
  {
    id: "sec-c-9",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "IA Classica / HPC",
    name: "9. Riconoscimento Facciale e Biometrico per Controllo Accessi",
    logicType: "Deep Learning Embedding",
    targetVariables: "Vettore_Embedding, Distanza_Coseno, Soglia_Verifica"
  },
  {
    id: "sec-c-12",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "IA Classica / HPC",
    name: "12. Rilevamento di Attacchi Ransomware e Propagazione Laterale in Rete",
    logicType: "Elaborazione Big Data & ML",
    targetVariables: "Volume_Scrittura_Disco, Tentativi_Login_Falliti, Estensione_File_Modificata"
  },
  {
    id: "sec-c-13",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "IA Classica / HPC",
    name: "13. Smascheramento di Attacchi DDoS Coordinati da Botnet Globali",
    logicType: "Elaborazione Big Data & ML",
    targetVariables: "IP_Sorgente, Pacchetti_Secondo, Dimensione_Payload, Porta_Target"
  },
  {
    id: "sec-c-14",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "IA Classica / HPC",
    name: "14. Identificazione di Minacce Persistenti Avanzate (APT) nei Log di Sistema",
    logicType: "Elaborazione Big Data & ML",
    targetVariables: "ID_Utente, Privilegi_Spostamento, Orario_Anomalo_Connessione"
  },
  {
    id: "sec-c-15",
    macroarea: "Sicurezza, Telecomunicazioni e Reti",
    technology: "IA Classica / HPC",
    name: "15. Rilevamento di Anomalie nei Sistemi di Pagamento Elettronici",
    logicType: "Elaborazione Big Data & ML",
    targetVariables: "Importo_Transazione, Nazione_Esecuzione, Device_ID"
  }
];
