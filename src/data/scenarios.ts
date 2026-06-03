export interface QuantumScenario {
  id: string;
  macroarea: string;
  technology: string;
  name: string;
  logicType: string;
  targetVariables: string;
}

export const QUANTUM_SCENARIOS: QuantumScenario[] = [
  // --- FINANZA E MERCATI (35 Scenari) ---
  {
    id: "fin-1",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "1. Hedging Quantistico Multilivello Cross-Asset",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Volatilità_Implicita, Correlazione_Dinamica, Tassi_Cambio_Spot"
  },
  {
    id: "fin-2",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "2. Ottimizzazione Portafoglio con Vincoli di Cardinalità (QUBO)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Matrice_Covarianza, Rendimento_Atteso, Budget_Massimo"
  },
  {
    id: "fin-3",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "3. Allocazione Capitali per Requisiti Solvibilità (Basel IV)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Attività_Ponderate_Rischio, Capitale_Tier_1, Esposizione_Lorda"
  },
  {
    id: "fin-4",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "4. Arbitraggio di Volatilità su Opzioni Index-Linked",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Smile_Volatilità, Delta, Gamma, Vega, Volumi_Scambio"
  },
  {
    id: "fin-5",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "5. Ottimizzazione Portafoglio Socialmente Responsabile (ESG)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Punteggio_ESG, Screening_Negativo, Tracking_Error"
  },
  {
    id: "fin-6",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "6. Market Timing Esatto per Liquidazione Asset",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Prezzo_Corrente, Coefficiente_Attesa_QAOA, Trend_Decadimento"
  },
  {
    id: "fin-7",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "7. Stress-Testing di Portafogli Illiquidi Non Lineari",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Asimmetria_Statistica, Tassi_Overnight_SOFR, Curve_Rendimenti"
  },
  {
    id: "fin-8",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "8. Pricing Opzioni Americane (Quantum Monte Carlo)",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Prezzo_Underlying, Strike_Price, Tasso_Risk_Free, Tempo_Scadenza"
  },
  {
    id: "fin-9",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "9. Previsione dei Flash Crash di Liquidità Interbancaria",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Riserve_Liquidità, Spread_CDS, Tassi_Insolvenza_Interbancari"
  },
  {
    id: "fin-10",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "10. Valutazione Rischio Default Cartolarizzazioni (CDO)",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Insolvenza_Sottostanti, Transizione_Rating, Recovery_Rate"
  },
  {
    id: "fin-11",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "11. Simulazione Impatto Politiche QE (Quantitative Easing)",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Tasso_Sconto_Ufficiale, Acquisti_Asset_Mensili, Velocità_Moneta"
  },
  {
    id: "fin-12",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "12. Rilevamento dello Spoofing e Layering Istituzionale (HFT)",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Ordini_Cancellati_2ms, Volume_Book_L3, ID_Market_Maker"
  },
  {
    id: "fin-13",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "13. Rilevamento Insider Trading tramite Rete Quantistica",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Timestamp_Millisecondi, Relazioni_Societarie, Volumi_Anomali"
  },
  {
    id: "fin-14",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "14. Valutazione del Rischio di De-Peg di Stablecoin",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Composizione_Collaterale, Flussi_Vendita_OTC, Sentiment_Social"
  },
  {
    id: "fin-15",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "15. Rilevamento Anomalie Flussi Capitali Offshore (AML)",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Frequenza_Bonifici_Frazionati, Giurisdizioni_Rischio, Titolarità_Effettiva"
  },
  {
    id: "fin-16",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "16. Identificazione Attacchi Speculativi su Materie Prime",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Posizioni_Nette_Fondi, Livelli_Stoccaggio, Futures_Short_Term"
  },
  {
    id: "fin-17",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "17. Rilevamento Frodi Assicurative Cross-Border",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "ID_Nodi_Estero, Indice_Anomalia_Graph, Frequenza_Sinistri"
  },
  {
    id: "fin-18",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "18. Andamento Consecutivo dei Rendimenti Asset (30 Giorni)",
    logicType: "Previsione Storica",
    targetVariables: "Rendimenti_Storici, Indice_Volatilità_LSTM, Volumi_Scambio_30D"
  },
  {
    id: "fin-19",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "19. Previsione dei Trend di Mercato a Lungo Termine",
    logicType: "Previsione Storica",
    targetVariables: "Indici_Prezzi_Consumo, Tassi_Occupazione, Bilancia_Commerciale"
  },
  {
    id: "fin-20",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "20. Stima dei Flussi di Cassa a Breve Termine",
    logicType: "Previsione Storica",
    targetVariables: "Fatture_Attive_Emesse, Fatture_Passive_Ricevute, Scadenze_Pagamenti"
  },
  {
    id: "fin-21",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "21. Analisi Impatto Tasso Sconto sui Prestiti",
    logicType: "Previsione Storica",
    targetVariables: "Decisioni_Baci_Fed, Quota_Capitale_Residua, Quota_Interessi"
  },
  {
    id: "fin-22",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "22. Previsione Prezzi Materie Prime per Contratti Termine",
    logicType: "Previsione Storica",
    targetVariables: "Domanda_Storica, Indici_Produzione, Scorte_Magazzino"
  },
  {
    id: "fin-23",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "23. Analisi Correlazioni Indici Azionari Regionali",
    logicType: "Previsione Storica",
    targetVariables: "Chiusure_Giornaliere_SP500, Chiusure_DAX, Volumi_Scambio_Daily"
  },
  {
    id: "fin-24",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "24. Impatto Oscillazioni Cambi su Capitali Immobilizzati",
    logicType: "Previsione Storica",
    targetVariables: "Tasso_Cambio_Valuta, Valore_Capitale_Immobilizzato, Indice_Inflazione"
  },
  {
    id: "fin-25",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "25. Modifica Valore Reale Portafogli vs Inflazione Estera",
    logicType: "Previsione Storica",
    targetVariables: "Rendimento_Nominale, Tasso_Inflazione_Estera, Orizzonte_Temporale"
  },
  {
    id: "fin-26",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "26. Identificazione Conti con Rendite Alte e Minor Churn",
    logicType: "Automatizzazione Processi",
    targetVariables: "Valore_Rendita_Conto, Indice_Fidelizzazione, Storico_Movimenti"
  },
  {
    id: "fin-27",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "27. Calcolo delle Tasse e Adempimenti Fiscali Automatizzati",
    logicType: "Automatizzazione Processi",
    targetVariables: "Codici_IVA, Ritenute_Acconto, Ammortamenti_Cespiti, Deduzioni"
  },
  {
    id: "fin-28",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "28. Rilevamento Transazioni Duplicate e Errori Data-Entry",
    logicType: "Automatizzazione Processi",
    targetVariables: "Importo_Transazione, ID_Beneficiario, Timestamp, Codice_Filiale"
  },
  {
    id: "fin-29",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "29. Monitoraggio Spese Aziendali vs Policy Interne",
    logicType: "Automatizzazione Processi",
    targetVariables: "Categoria_Merceologica, Massimale_Spesa, ID_Dipendente, Giustificativo"
  },
  {
    id: "fin-30",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "30. Punteggio Rischio Credito Carte Retail (Scoring)",
    logicType: "Automatizzazione Processi",
    targetVariables: "Saldo_Medio_Conto, Ritardi_Pagamenti, Anzianità_Lavorativa, Stipendio"
  },
  {
    id: "fin-31",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "31. Simulazione Arbitraggio Statistico Multifattoriale",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Cointegrazione, Spread_Medio, Frequenza_Segnale"
  },
  {
    id: "fin-32",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "32. Ottimizzazione Collaterale per Margini di Variazione (IM/VM)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Haircut_Applicato, Costo_Finanziamento, Soglia_Esposizione"
  },
  {
    id: "fin-33",
    macroarea: "Finanza e Mercati",
    technology: "Computer Quantistico (QPU)",
    name: "33. Pricing di Opzioni Autocallable con Barriera di Protezione",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Prezzo_Trigger, Barriera_Downside, Cedola_Periodica"
  },
  {
    id: "fin-34",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "34. Previsione dei Trend di Volatilità GARCH con Reti Neurali",
    logicType: "Previsione Storica",
    targetVariables: "Varianza_Condizionata, Rendimenti_Quadratici, Persistenza"
  },
  {
    id: "fin-35",
    macroarea: "Finanza e Mercati",
    technology: "IA Classica / HPC",
    name: "35. Automatizzazione Crediti Deteriorati e NPL Portfolio Scoring",
    logicType: "Automatizzazione Processi",
    targetVariables: "Grado_Recuperabilità, Giorni_Insolvenza, Valore_Collaterale"
  },

  // --- LOGISTICA E SMART CITIES (35 Scenari) ---
  {
    id: "log-1",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "1. Ottimizzazione Vehicle Routing Problem con Finestre Temporali",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Coordinate_Geografiche, Finestre_Orarie, Capacità_Carico, Tempi_Sosta"
  },
  {
    id: "log-2",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "2. Caricamento Stive delle Navi (3D Bin Packing)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Peso_Container, Dimensioni_Volumetriche, Porto_Destinazione, Baricentro"
  },
  {
    id: "log-3",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "3. Allocazione Slot Atterraggio Aeroporti Congestionati",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Slot_Orari, Turbolenze_Scia, Ritardi_Arrivo, Piani_Volo"
  },
  {
    id: "log-4",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "4. Ottimizzazione Flotte Veicoli Autonomi Guida Connessa",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Coordinate_Richieste, Stato_Carica_Veicoli, Mappa_Cantieri"
  },
  {
    id: "log-5",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "5. Traiettorie AGV in Mega-Hub di Magazzino",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Griglia_Magazzino, ID_Ordine, Velocità_AGV, Posizioni_Occupate"
  },
  {
    id: "log-6",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "6. Ottimizzazione Flotta per Azzeramento Chilometri a Vuoto",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Coordinate_Mezzi, Indice_Chilometri_Vuoti, Budget_Carburante"
  },
  {
    id: "log-7",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "7. Disposizione Spaziale Colonnine Ricarica EV (QUBO)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Distanza_Nodi_Rete, Capacità_Cabina, Densità_Veicoli_Zona"
  },
  {
    id: "log-8",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "8. Sincronizzazione Semafori Metropolitani Dinamici",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Veicoli_Minuto, Code_Incroci, Transito_Mezzi_Soccorso"
  },
  {
    id: "log-9",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "9. Modelli Evacuazione Civile per Alluvioni Lampo",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Livelli_Idrometrici, Millimetri_Pioggia, Larghezza_Carreggiate, Densità"
  },
  {
    id: "log-10",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "10. Instradamento Forze di Soccorso Post-Sismiche",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Mappa_Crolli, Ponti_Inagibili, Ostacoli_Droni, Capienza_Pronto_Soccorso"
  },
  {
    id: "log-11",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "11. Mitigazione Rischio Blackout Reti Ferroviarie",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Posizione_Treni, Binari_Deviamento, Priorità_Carico_Merce"
  },
  {
    id: "log-12",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "12. Flussi Rifiuti Urbani via Condotte Pneumatiche",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Livelli_Intasamento, Pressione_Aria, Picchi_Conferimento"
  },
  {
    id: "log-13",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "13. Effetto Domino Blocco Portuale su Arrivo Flotta",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "ID_Porto_Bloccato, Coefficiente_Domino, Ritardo_Propagato_Giorni"
  },
  {
    id: "log-14",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "14. Identificazione Rotte a Massimo Rischio Geopolitico",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "ID_Grafo_Rotta, Rischio_Stocastico_Geopolitico, Indice_Stabilità"
  },
  {
    id: "log-15",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "15. Pianificazione Dinamica Rotte Oceaniche Anti-Meteo",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Altezza_Onde, Direzione_Venti, Pescaggio_Cargo, Consumo_Bunker"
  },
  {
    id: "log-16",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "16. Riorganizzazione Catena del Freddo Intercontinentale",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Temperatura_IoT, Umidità_IoT, Livelli_Azoto, Transito_Doganale"
  },
  {
    id: "log-17",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "17. Previsione Colli Bottiglia per Variazioni Sanitarie",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Dazi_Commerciali, Codici_Doganali, Scioperi_Trasportatori"
  },
  {
    id: "log-18",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "18. Ottimizzazione Scorte Inter-Dock (Cross-Docking)",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "ETA_Camion, Numero_Colli, Baie_Carico_Libere"
  },
  {
    id: "log-19",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "19. Monitoraggio Usura Strutturale Ponti e Viadotti",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Frequenze_Vibrazione, Dilatazione_Termica, Veicoli_Pesanti_Ora"
  },
  {
    id: "log-20",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "20. Previsione Affluenza Passeggeri alle Fermate",
    logicType: "Previsione Storica",
    targetVariables: "Giorno_Settimana, Conditions_Meteo, Bigliettazione_Storica"
  },
  {
    id: "log-21",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "21. Monitoraggio Inquinamento Acustico Urbano",
    logicType: "Previsione Storica",
    targetVariables: "Decibel_Fonometri, Orario_Rilevazione, Vicinanza_Ferrovie"
  },
  {
    id: "log-22",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "22. Monitoraggio della Temperatura e Umidità nei Musei",
    logicType: "Previsione Storica",
    targetVariables: "ID_Sala, Gradi_Celsius, Umidità_Relativa, Numero_Visitatori"
  },
  {
    id: "log-23",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "23. Stima dell'ETA Lineare per Flotte Consegna",
    logicType: "Previsione Storica",
    targetVariables: "Velocità_Media, Distanza_Chilometrica, Indice_Traffico"
  },
  {
    id: "log-24",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "24. Statistiche Utilizzo Piste Ciclabili",
    logicType: "Previsione Storica",
    targetVariables: "Conteggio_Passaggi, Orario_Giornata, Condizioni_Meteo"
  },
  {
    id: "log-25",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "25. Contratti Acquisto e Costo Container Spot",
    logicType: "Previsione Storica",
    targetVariables: "Indice_Noli_Drewry, Quota_Contratti_Fissi, Prezzo_Spot_Container"
  },
  {
    id: "log-26",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "26. Allocazione Fondi Pubblici per Massimizzare PIL",
    logicType: "Previsione Storica",
    targetVariables: "Budget_Pubblico_Assegnato, Indice_Impatto_PIL, Trend_Crescita_Storico"
  },
  {
    id: "log-27",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "27. Sovraccarico Cabine Elettriche da Climatizzatori",
    logicType: "Previsione Storica",
    targetVariables: "Temperatura_Cabina_Celsius, Assorbimento_Ampere, Picco_Calore_Meteo"
  },
  {
    id: "log-28",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "28. Monitoraggio Stato Usura Manto Stradale (Buche)",
    logicType: "Automatizzazione Processi",
    targetVariables: "Coordinate_GPS, Vitelli_Giroscopio, Frame_Stradali"
  },
  {
    id: "log-29",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "29. Gestione Inventari Magazzino (Scorte Minime)",
    logicType: "Automatizzazione Processi",
    targetVariables: "Quantità_Scaffale, Lead_Time_Fornitore, Velocità_Vendita"
  },
  {
    id: "log-30",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "30. Manutenzione Ordinaria Mezzi Trasporto",
    logicType: "Automatizzazione Processi",
    targetVariables: "Chilometri_Tagliando, Ore_Utilizzo, Errori_Centralina_OBD"
  },
  {
    id: "log-31",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "31. Sincronizzazione di Flussi Ferroviari ad Alti Volumi",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tempo_Occupazione_Tratta, Capacità_Stazione, Margine_Ritardo"
  },
  {
    id: "log-32",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "32. Ottimizzazione Flotta Droni per Consegna Medicale Urgente",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Autonomia_Batteria, Peso_Carico, Condizioni_Vento_Lotta"
  },
  {
    id: "log-33",
    macroarea: "Logistica e Smart Cities",
    technology: "Computer Quantistico (QPU)",
    name: "33. Modellazione di Resilienza Urbana contro Allagamenti Costieri",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Livello_Marea, Portata_Canali, Altezza_Barriere"
  },
  {
    id: "log-34",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "34. Algoritmo di Disposizione Merci Slot Dynamic in Micro-Hub",
    logicType: "Previsione Storica",
    targetVariables: "Indice_Rotazione, Volume_Pezzo, Frequenza_Prelievi"
  },
  {
    id: "log-35",
    macroarea: "Logistica e Smart Cities",
    technology: "IA Classica / HPC",
    name: "35. Pianificazione Manutenzione Preventiva Condotte Idriche",
    logicType: "Automatizzazione Processi",
    targetVariables: "Pressione_Esercizio, Vita_Utile_Tubo, Storico_Perdite"
  },

  // --- CHIMICA E GREEN TECH (35 Scenari) ---
  {
    id: "ch-1",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "1. Bilanciamento Predittivo Reti Ricarica EV Urbane",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Assorbimento_Colonnine, Tariffe_Spot, Carichi_Zonali, Meteo"
  },
  {
    id: "ch-2",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "2. Dispacciamento Ottimale Rinnovabili Intermittenti",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Velocità_Vento, Irraggiamento_Solare, Capacità_BESS"
  },
  {
    id: "ch-3",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "3. Ottimizzazione Flusso Reattori Chimici Scomparsa",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Coefficiente_Miscelazione, Velocità_Reazione, Pressione, Viscosità"
  },
  {
    id: "ch-4",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "4. Simulazione Reticolo Celle Solari Perovskite",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Trasferimento_Carica, Distanze_Interatomiche, Degrado_UV"
  },
  {
    id: "ch-5",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "5. Sintesi Polimeri Biodegradabili Industriali",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Rapporto_Cellulosa_Riso, Temperatura_Fusione, Permeabilità_O2"
  },
  {
    id: "ch-6",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "6. Catalizzatori Elettrolisi Idrogeno Verde",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Energia_Legame, Corrosione_Acida, Sovratensione, Costo_Metalli"
  },
  {
    id: "ch-7",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "7. Stabilità Nuova Molecola Farmaceutica",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Energia_Conformazionale, ID_Legami_Molecola, Tasso_Decadimento"
  },
  {
    id: "ch-8",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "8. Screening Eccipienti per Massima Efficacia",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Rapporto_Principio_Attivo, Coefficiente_Solubilità, Indice_Efficacia"
  },
  {
    id: "ch-9",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "9. Geometria Cristallina Ottimale per Materiali",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "ID_Reticolo_Cristallino, Coefficiente_Densità, Indice_Leggerezza"
  },
  {
    id: "ch-10",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "10. Calcolo Stato Fondamentale Elettronico via VQE",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Operatore_Hamiltoniano, Numero_Orbitali, Angoli_Variazionali_VQE"
  },
  {
    id: "ch-11",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "11. Scoperta Nuovi Elettroliti per Batterie Stato Solido",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Conduttività_Ionica, Stabilità_Elettrochimica, Densità_Energia"
  },
  {
    id: "ch-12",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "12. Ottimizzazione Molecole per Cattura CO2",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Capacità_Assorbimento, Energia_Rigenerazione, Degradazione_Solvente"
  },
  {
    id: "ch-13",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "13. Superconduttori Alta Temperatura Reti Nazionali",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Temperatura_Critica_Tc, Campo_Magnetico, Densità_Corrente"
  },
  {
    id: "ch-14",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "14. Monitoraggio Inquinamento Centraline Urbane",
    logicType: "Previsione Storica",
    targetVariables: "Particolato_PM10, Biossido_Azoto_NO2, Ozono_O3, Velocità_Vento"
  },
  {
    id: "ch-15",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "15. Previsione Produzione Giornaliera Parco Eolico",
    logicType: "Previsione Storica",
    targetVariables: "Velocità_Vento_Stima, Direzione_Pale, Storico_Orario"
  },
  {
    id: "ch-16",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "16. Controllo Microclima Serre Idroponiche",
    logicType: "Previsione Storica",
    targetVariables: "Livelli_CO2, Conducibilità_EC, pH_Nutrimento, Ore_LED"
  },
  {
    id: "ch-17",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "17. Lettura e Fatturazione Smart Meter",
    logicType: "Automatizzazione Processi",
    targetVariables: "ID_Contatore, kWh_Consumati, Metri_Cubi_Gas, Timestamp"
  },
  {
    id: "ch-18",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "18. Smistamento Rifiuti da Telecamere AI (Riciclo)",
    logicType: "Automatizzazione Processi",
    targetVariables: "Frame_Rate, Spettrometria_Infrarossa, Densità, Contaminazione"
  },
  {
    id: "ch-19",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "19. Rilevamento Perdite Gas Condotte (Sensori Acustici)",
    logicType: "Automatizzazione Processi",
    targetVariables: "Decibel_Fondo, Frequenza_kHz, Pressione_Tubo, ID_Segmento"
  },
  {
    id: "ch-20",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "20. Previsione Dissipazione Termica in Elettrolizzatori",
    logicType: "Previsione Storica",
    targetVariables: "Temperatura_Anodo, Flusso_Acqua, Concentrazione_KOH"
  },
  {
    id: "ch-21",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "21. Pianificazione Manutenzione Sensori Emissioni Ciminiere",
    logicType: "Automatizzazione Processi",
    targetVariables: "Indice_Rischio_Sensore, Picchi_CO2, Ore_Servizio"
  },
  {
    id: "ch-22",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "22. Ottimizzazione Miscele Biocarburanti di Seconda Generazione",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Rapporto_Etantolo, Indice_Cetano, Viscosità_Cinematica"
  },
  {
    id: "ch-23",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "23. Simulazione VQE per Strati di Graphene Superconduttore",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Angolo_Twist, Gap_Energetico, Temperatura_Transizione"
  },
  {
    id: "ch-24",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "24. Sviluppo Molecolare Antidoti Tossine via Risonanza Quantistica",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Energia_Docking, Volume_Sito_Attivo, Tossicità_Stimata"
  },
  {
    id: "ch-25",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "25. Ottimizzazione Geometria Eliche per Generatori Eolici Marini",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Angolo_Attacco, Coefficiente_Sostentamento, Resistenza_Termica"
  },
  {
    id: "ch-26",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "26. Simulazione Meccaniche di Solubilizzazione Plastica",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "pH_Soluzione, Concentrazione_Enzimica, Velocità_Degrado"
  },
  {
    id: "ch-27",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "27. Previsione Curve di Scarica Batterie Litio-Zolfo",
    logicType: "Previsione Storica",
    targetVariables: "Tensione_Cella, Cicli_Carica, Resistenza_Interna"
  },
  {
    id: "ch-28",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "28. Monitoraggio Dispersione Polveri Sottili e Biossido",
    logicType: "Previsione Storica",
    targetVariables: "PM2_5, Direzione_Vento, Umidità_Aria, Indice_Traffico"
  },
  {
    id: "ch-29",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "29. Ottimizzazione Ciclo Purificazione Acque di Scarico Industriali",
    logicType: "Automatizzazione Processi",
    targetVariables: "Carico_Organico_COD, Grado_Torbidità, Flusso_Clorazione"
  },
  {
    id: "ch-30",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "30. Rilevamento Anomalie Flusso Calore in Pompe Geotermiche",
    logicType: "Automatizzazione Processi",
    targetVariables: "Delta_T_Geotermica, Pressione_Fluido, Coefficiente_COP"
  },
  {
    id: "ch-31",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "31. Simulazione Molecolare di Cristalli Fotoluminescenti",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Efficienza_Quantica, Lunghezza_Onda_Assorbimento, Tempo_Decadimento"
  },
  {
    id: "ch-32",
    macroarea: "Chimica e Green Tech",
    technology: "Computer Quantistico (QPU)",
    name: "32. Ottimizzazione Catalizzatori per Riduzione di NOx",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Superficie_Specificata, Selettività_N2, Temperatura_Finestra"
  },
  {
    id: "ch-33",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "33. Pricing Dinamico dei Certificati di Emissione Carbonio",
    logicType: "Previsione Storica",
    targetVariables: "Prezzo_Quota_EUA, Indice_Produzione_Industriale, Temperatura_Media"
  },
  {
    id: "ch-34",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "34. Monitoraggio Stato Catodi in Celle a Combustibile PEMFC",
    logicType: "Previsione Storica",
    targetVariables: "Perdita_Tensione, Umidità_Membrana, Flusso_H2"
  },
  {
    id: "ch-35",
    macroarea: "Chimica e Green Tech",
    technology: "IA Classica / HPC",
    name: "35. Automatizzazione Audit di Emissione Gas Serra per Impianti",
    logicType: "Automatizzazione Processi",
    targetVariables: "Fattore_Emissione, Consumo_Combustibile, Standard_SBTi"
  },

  // --- MANIFATTURA E ABBIGLIAMENTO (35 Scenari) ---
  {
    id: "man-1",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "1. Commesso Viaggiatore (TSP) per Robot Saldatura 3D",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Punti_Saldatura_XYZ, Raggio_Curvatura, Tempo_Arresto"
  },
  {
    id: "man-2",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "2. Allocazione Spazi nei Silos Stoccaggio Acciaio",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Peso_Bobina, Resistenza_Cemento, Frequenza_Prelievo"
  },
  {
    id: "man-3",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "3. Ottimizzazione Catene Montaggio JIT Adattive",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tempo_Ciclo_Robot, Scarti_Linea, Ritardi_Componenti"
  },
  {
    id: "man-4",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "4. Individuazione Nucleo Vincente Varianti a Massimo Reddito",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "ID_Variante_Maglia, Prezzo_Variante, Coefficiente_Rendimento_QPU"
  },
  {
    id: "man-5",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "5. Riduzione Costi Fissi Ottimizzando Ordine Materiali Grezzi",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Volume_Materiale_Grezzo, Vincolo_Logistico_QUBO, Costo_Ordinazione"
  },
  {
    id: "man-6",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "6. Modellazione Scudi Termici per Rientro Atmosferico",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Gradiente_Temperatura_Plasma, Pressione_Dinamica, Angolo_Incidenza"
  },
  {
    id: "man-7",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "7. Ottimizzazione Strutturale Drones Industriali (3D Topology)",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Coordinate_Nodi_CAD, Resistenza_Aerodinamica, Carico_Utile"
  },
  {
    id: "man-8",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "8. Leghe Titanio-Alluminio Pale Turbina",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Elasticità_Materiali, Resistenza_Fatica, Point_Rottura"
  },
  {
    id: "man-9",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "9. Tempi Stoccaggio e Calo Improvviso Domanda",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Tempo_Giacenza_Magazzino, Coefficiente_Incrocio_Entanglement, Calo_Domanda"
  },
  {
    id: "man-10",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "10. Manutenzione Predittiva Cavitazione Turbine",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Spettro_Vibrazione, Temperatura_Cuscinetti, Pressione_Fluido"
  },
  {
    id: "man-11",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "11. Intercettazione Quantistica Sciami Droni",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Tracce_Radar_Multiple, Velocità_Vettoriale_3D, Puntamento_Laser"
  },
  {
    id: "man-12",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "12. Simulazione Balistica e Zone d'Ombra Radar",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Altimetria_DTM, Coefficiente_Rifrazione, Frequenze_Antenne"
  },
  {
    id: "man-13",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "13. Prezzi Variabili per Smaltire Rimanenze al 100%",
    logicType: "Previsione Storica",
    targetVariables: "Elasticità_Prezzo_Storica, Volume_Rimanenze_Maglia, Margine_Minimo"
  },
  {
    id: "man-14",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "14. Previsione Articoli con Calo Maggiore da Trend Online",
    logicType: "Previsione Storica",
    targetVariables: "Indice_Trend_Social, Parola_Chiave_Scraping, Volume_Ricerche"
  },
  {
    id: "man-15",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "15. Calcolo ETA della Commessa Industriale",
    logicType: "Previsione Storica",
    targetVariables: "Pezzi_Produrre, Velocità_Macchina, Storico_Guasti"
  },
  {
    id: "man-16",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "16. Consumi Aria Compressa negli Impianti",
    logicType: "Previsione Storica",
    targetVariables: "Portata_Aria, Pressione_Esercizio, Assorbimento_kW"
  },
  {
    id: "man-17",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "17. Tracciamento RFID WIP in Fabbrica",
    logicType: "Previsione Storica",
    targetVariables: "ID_Tag_RFID, Codice_Pezzo, Timestamp_Varco, ID_Stazione"
  },
  {
    id: "man-18",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "18. Prezzo Minimo Ingresso con Massimo Margine",
    logicType: "Previsione Storica",
    targetVariables: "Costo_Materie_Prime, Tariffa_Lavorazione, Margine_Obiettivo"
  },
  {
    id: "man-19",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "19. Controllo Qualità Ottico Microchip (Vision)",
    logicType: "Automatizzazione Processi",
    targetVariables: "Dimensioni_Difetto_Pixel, Contrasto, ID_Lotto, Spessore"
  },
  {
    id: "man-20",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "20. Gestione Turni Operatori Assemblea",
    logicType: "Automatizzazione Processi",
    targetVariables: "ID_Operaio, Certificazioni_Macchinario, Ore_Straordinarie"
  },
  {
    id: "man-21",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "21. Monitoraggio Livelli Lubrificante CNC",
    logicType: "Automatizzazione Processi",
    targetVariables: "Livello_Olio_ml, Viscosità_Corrente, Temperatura_Fluido"
  },
  {
    id: "man-22",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "22. Ottimizzazione Taglio Tessuti Multistrato per Minimo Scarto",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Area_Pezzo, Orientamento_Trama, Percentuale_Sfrido"
  },
  {
    id: "man-23",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "23. Simulazione Quantistica Tolleranze Dimensioni Giunzioni Aeronautiche",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Deviazione_Micron, Spessore_Accoppiamento, Tensione_Serraggio"
  },
  {
    id: "man-24",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "24. Previsione Domanda Stagionale per Collezioni di Alta Moda",
    logicType: "Previsione Storica",
    targetVariables: "Trend_Colori, Ordini_B2B_Previsti, Indice_Fidelizzazione"
  },
  {
    id: "man-25",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "25. Ottimizzazione Flusso Logistico Interno con Carrelli AGV",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Distanza_Carrello, Tempo_Attesa_Slot, Capacità_Fornitura"
  },
  {
    id: "man-26",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "26. Simulazione Strutturale della Deformazione Tessuti Tecnici",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Modulo_Young, Spessore_Fibra, Coefficiente_Elasticità"
  },
  {
    id: "man-27",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "27. Controllo Qualità Robotizzato della Tensione di Cucitura",
    logicType: "Automatizzazione Processi",
    targetVariables: "Tensione_Filo_Newton, Velocità_Ago, Numero_Rotture"
  },
  {
    id: "man-28",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "28. Previsione Anomalie Termiche in Forni di Sinterizzazione",
    logicType: "Previsione Storica",
    targetVariables: "Temperatura_Interna, Pressione_Gas, Corrente_Resistenze"
  },
  {
    id: "man-29",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "29. Ottimizzazione Sequenze di Verniciatura per Riduzione Cambio Colore",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Rapporto_Perdita_Vernice, Tempo_Pulizia, Sequenza_Tinte"
  },
  {
    id: "man-30",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "30. Tracciabilità RFID in Tempo Reale della Linea di Assemblaggio",
    logicType: "Automatizzazione Processi",
    targetVariables: "ID_Modulo, Tempo_Stazione_Secondi, Stato_Completo"
  },
  {
    id: "man-31",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "31. Simulazione Usura Utensili in Lavorazioni ad Alta Velocità (HSM)",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Durezza_Rivestimento, Temperatura_Taglio, Avanzamento_Dente"
  },
  {
    id: "man-32",
    macroarea: "Manifattura e Abbigliamento",
    technology: "Computer Quantistico (QPU)",
    name: "32. Ottimizzazione Carichi di Lavoro su Linee di Produzione Parallele",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Saturazione_Linea, Tempo_Setup_Macchina, Priorità_Lotto"
  },
  {
    id: "man-33",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "33. Previsione Tempi di Consegna dei Fornitori Tessili Materie Prime",
    logicType: "Previsione Storica",
    targetVariables: "Lead_Time_Giorni, Affidabilità_Fornitore, Distanza_Spedizione"
  },
  {
    id: "man-34",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "34. Rilevamento Automatico Difetti di Tessitura con Visione Artificiale",
    logicType: "Automatizzazione Processi",
    targetVariables: "Fili_Mancanti, Macchie_Olio_Pixel, Grado_Irregolarità"
  },
  {
    id: "man-35",
    macroarea: "Manifattura e Abbigliamento",
    technology: "IA Classica / HPC",
    name: "35. Monitoraggio Vibrazioni per Manutenzione Predittiva Estrusori",
    logicType: "Previsione Storica",
    targetVariables: "Ampiezza_G_Vibrazione, Frequenza_Picco, Temperatura_Fusione"
  },

  // --- SANITÀ E GENOMICA (35 Scenari) ---
  {
    id: "san-1",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "1. Matchmaking Trapianti Organo Nazionale",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Compatibilità_HLA, Ore_Ischemia_Fredda, Distanza_Ospedali"
  },
  {
    id: "san-2",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "2. Ottimizzazione Piani Terapeutici Oncologici",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tasso_Replicazione, Volume_Massa_Tumore, Tolleranza_Epatica"
  },
  {
    id: "san-3",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "3. Allocazione Risorse Pronto Soccorso",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Indice_Gravità_Triage, Posti_Terapia_Intensiva, Distanza"
  },
  {
    id: "san-4",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "4. Screening Leganti Farmaci Orfani",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Sequenze_DNA_Mutato, Coordinate_3D_Tasca, Tossicità"
  },
  {
    id: "san-5",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "5. Modellazione Folding Proteico ripianato 3D",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Angoli_Torsione, Energie_Legame_H, Forze_Van_Der_Waals"
  },
  {
    id: "san-6",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "6. Correzione Tremore Chirurgia Robotica",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Frequenza_Cardiaca, Movimenti_Involontari, Feedback_Aptico"
  },
  {
    id: "san-7",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "7. Previsione Mutazioni Virali Epidemiologiche",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Campionamenti_Acque_Reflue, Flussi_Aerei, Tasso_Mutazione"
  },
  {
    id: "san-8",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "8. Ottimizzazione Vaccini mRNA Biocompatibili",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Stabilità_Nanoparticelle, Efficienza_Traduzione, Criogenia"
  },
  {
    id: "san-9",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "9. Diagnostica Bio-Marker Tumorali",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Fluorescenza_Molecolare, Densità_Marker, Legame_Anticorpi"
  },
  {
    id: "san-10",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "10. Monitoraggio Parametri Vitali Terapia Intensiva",
    logicType: "Previsione Storica",
    targetVariables: "Battito_BPM, Saturazione_SpO2, Pressione_Arteriosa"
  },
  {
    id: "san-11",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "11. Analisi Predittiva Tasso Riammissione Pazienti 30 Giorni",
    logicType: "Previsione Storica",
    targetVariables: "Giorni_Ricovero, Numero_Farmaci, Età, Controlli"
  },
  {
    id: "san-12",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "12. Monitoraggio Temperatura Frigoriferi Vaccini",
    logicType: "Previsione Storica",
    targetVariables: "Temperatura_Interna, Stato_Alimentazione, Apertura_Porta"
  },
  {
    id: "san-13",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "13. Trascrizione Automatica Visite NLP",
    logicType: "Automatizzazione Processi",
    targetVariables: "Traccia_Audio, Dizionario_Medico, ID_Paziente, Codice_ICD10"
  },
  {
    id: "san-14",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "14. Riconoscimento Fratture Ossee (X-Ray)",
    logicType: "Automatizzazione Processi",
    targetVariables: "Contrasto_Immagine, Coordinate_Contorni, Densità_Ossea"
  },
  {
    id: "san-15",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "15. Screening Sintomi Chatbot Medico",
    logicType: "Automatizzazione Processi",
    targetVariables: "Temperatura_Dichiarata, Presenza_Tosse, Patologie_Pregresse"
  },
  {
    id: "san-16",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "16. Classificazione ed Allineamento Sequenze Genomiche (NIST)",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Lunghezza_Genoma, Numero_Mutazioni, Rapporto_Match"
  },
  {
    id: "san-17",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "17. Ottimizzazione delle Catene di Approvvigionamento Plasma",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Giorni_Scadenza, Gruppo_Sanguigno, Distanza_Centro"
  },
  {
    id: "san-18",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "18. Previsione Rischio Cardio-Vascolare con Analisi Poligenica",
    logicType: "Previsione Storica",
    targetVariables: "Punteggio_PRS, Pressione_Sistolica, Livello_Colesterolo"
  },
  {
    id: "san-19",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "19. Monitoraggio Aderenza Terapeutica in Pazienti Cronici",
    logicType: "Previsione Storica",
    targetVariables: "Frequenza_Assunzione, Giorni_Ritardo, Numero_Prescrizioni"
  },
  {
    id: "san-20",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "20. Riorganizzazione Sale Operatorie basata su Urgenze",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Durata_Intervento, Disponibilità_Equipe, Comorbilità_Paziente"
  },
  {
    id: "san-21",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "21. Simulazione Molecolare di Antibiotici ad Ampio Spettro",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Affinità_Legame, Tossicità_Renale, Tasso_Resistenza"
  },
  {
    id: "san-22",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "22. Screening di Sicurezza ed Efficacia per Terapie Geniche",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Vettore_Virale_Dose, Tasso_Integrazione, Espressione_Proteica"
  },
  {
    id: "san-23",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "23. Ottimizzazione Dosaggio Radioterapia con Collisioni Quantistiche",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Dose_Tumore, Risparmio_Tessuto_Sano, Angolo_Fascio"
  },
  {
    id: "san-24",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "24. Previsione Ricoveri Ospedalieri per Condizioni Climatiche",
    logicType: "Previsione Storica",
    targetVariables: "Temperatura_Esterna, Livello_Umidità, Flusso_PS_Medio"
  },
  {
    id: "san-25",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "25. Controllo Qualità di Strumenti Chirurgici con Visione AI",
    logicType: "Automatizzazione Processi",
    targetVariables: "Grado_Affilatura, Micro_Crepe, Usura_Grip"
  },
  {
    id: "san-26",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "26. Tracciamento RFID Farmaci Oncologici ad Alto Valore",
    logicType: "Automatizzazione Processi",
    targetVariables: "ID_Fiala, Temperatura_Stoccaggio, Timestamp_Movimento"
  },
  {
    id: "san-27",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "27. Riconoscimento Noduli Polmonari in TAC Polmonari",
    logicType: "Automatizzazione Processi",
    targetVariables: "Diametro_Nodulo, Opacità_Vetro_Smerigliato, ID_Lotto"
  },
  {
    id: "san-28",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "28. Ottimizzazione Layout Reparti Ospedalieri per Minimo Contagio",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Distanza_Letti, Ricambi_Aria_Ora, Tasso_Saturazione"
  },
  {
    id: "san-29",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "29. Simulazione Quantistica Meccanismi Recettoriali S-ACE2",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Energia_Libera_Gibbs, Distanza_Idrogeno, Costante_Dissociazione"
  },
  {
    id: "san-30",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "30. Previsione Crisi Epilettiche da Tracciati EEG in Continuo",
    logicType: "Previsione Storica",
    targetVariables: "Ampiezza_Onda_uV, Frequenza_Hertz, Deviazione_Standard"
  },
  {
    id: "san-31",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "31. Automatizzazione Report Clinici per Studi Epidemiologici",
    logicType: "Automatizzazione Processi",
    targetVariables: "Fattore_Esposizione, Tasso_Prevalenza, Intervallo_Confidenza"
  },
  {
    id: "san-32",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "32. Ottimizzazione Distribuzione Farmaci Monouso nei Reparti",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Giacenza_Ottimale, Scadenze_Lotti, Distanza_Armadietto"
  },
  {
    id: "san-33",
    macroarea: "Sanità e Genomica",
    technology: "Computer Quantistico (QPU)",
    name: "33. Simulazione di Emodinamica Vascolare per Stent Coronarici",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Tensione_Taglio_Parete, Indice_Turbolenza, Pressione_Sanguigna"
  },
  {
    id: "san-34",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "34. Rilevamento Complicanze Post-Operatorie in Tempo Reale",
    logicType: "Previsione Storica",
    targetVariables: "Indice_Shock, Temperatura_Ascellare, Tasso_Respiratorio"
  },
  {
    id: "san-35",
    macroarea: "Sanità e Genomica",
    technology: "IA Classica / HPC",
    name: "35. Automatizzazione Prenotazione Esami per Liste d'Attesa Critiche",
    logicType: "Automatizzazione Processi",
    targetVariables: "Priorità_Codice, Tempo_Attesa_Giorni, ID_Macchinario_Slot"
  },

  // --- CYBERSECURITY (35 Scenari) ---
  {
    id: "cyb-1",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "1. Scansione Vulnerabilità e Migrazione a Reticoli (PQC)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Lunghezza_Chiavi, Volume_Dati_A_Rischio, Tempi_Firma"
  },
  {
    id: "cyb-2",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "2. Generazione e Distribuzione QKD (Chiavi)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Tasso_Errore_QBER, Attenuazione_dB, Impulsi_Laser"
  },
  {
    id: "cyb-3",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "3. Audit d'Integrità Ledger Web3 e Crypto",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Algoritmo_Firma_ECDSA, Volume_Transazioni, Rotazione_Chiavi"
  },
  {
    id: "cyb-4",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "4. Scansione Log per Violazioni Passate (Grover)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Dimensione_Log_GB, Indice_Entropia_Log, ID_Indicatore_IoC"
  },
  {
    id: "cyb-5",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "5. Malware Polimorfici nello Spazio Hilbert",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Frequenza_Mutazione_Stringhe, Chiamate_API, Traffico_Output"
  },
  {
    id: "cyb-6",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "6. De-anonimizzazione Flussi Dati Offuscati",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Entropia_Payload, Timestamp_Microsecondi, Nodi_Rimbalzo"
  },
  {
    id: "cyb-7",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "7. Simulazione Attacchi Ingegneria Sociale su Grafi",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Centralità_Dipendente, Email_Esterne, Esposizione_OSINT"
  },
  {
    id: "cyb-8",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "8. Identificazione Bug Latenti nel Codice Esposto",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Righe_Codice_Sorgente, Score_Vulnerabilità_Codice, ID_Contratto_Smart"
  },
  {
    id: "cyb-9",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "9. Mitigazione Attacchi DDoS da Botnet IoT",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Connessioni_Insolite, Provenienza_Pacchetti, Drop_Firewall"
  },
  {
    id: "cyb-10",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "10. Rilevamento Intrusione Wireless basato su Entropia Quantistica",
    logicType: "Monitoraggio Avanzato",
    targetVariables: "Indice_Rischio_Wireless, Livello_Rumore_dB, Deviazione_Entropica"
  },
  {
    id: "cyb-11",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "11. Ottimizzazione Chiavi Crittografiche Post-Quantistiche in Cloud",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Metrica_Sicurezza, Lunghezza_Chiave_NIST, Overhead_Comunicazione"
  },
  {
    id: "cyb-12",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "12. Audit d'Integrità Smart Contract Finanziari DeFi",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Linea_Codice, Vulnerabilità_Vettoriale, Livello_Fiducia"
  },
  {
    id: "cyb-13",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "13. Analisi di Comportamento Traffico Rete Militare Critico (HPC)",
    logicType: "Previsione Storica",
    targetVariables: "Pacchetti_Secondo, Indice_Anomalia_Porta, Deviazione_Standard_Dimensione"
  },
  {
    id: "cyb-14",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "14. Rilevamento Malware Polimorfo tramite Clusterizzazione Grafi",
    logicType: "Automatizzazione Processi",
    targetVariables: "Numero_Adiacenze_Grafo, Istogramma_Opcode, Segnatura_Sospetta"
  },
  {
    id: "cyb-15",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "15. Ottimizzazione Instradamento VPN di Massima Sicurezza",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Latenza_VPN, Grado_Cifratura_NBI, Distanza_Nodi"
  },
  {
    id: "cyb-16",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "16. Simulazione Crittanalisi Algoritmi Simmetrici Legacy",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Numero_Round, Dimensione_Stato, Complessità_Attacco"
  },
  {
    id: "cyb-17",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "17. Previsione Attacchi Phishing tramite NLP e Pattern Sociali",
    logicType: "Previsione Storica",
    targetVariables: "Tasso_Apertura_Email, Analisi_Urgenza_NLP, Similarità_Dominio"
  },
  {
    id: "cyb-18",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "18. Analisi Forense Anomalie File System su Standard Militari",
    logicType: "Automatizzazione Processi",
    targetVariables: "Timestamp_MFT, Blocchi_Sovrascritti, ID_Settore_Nand"
  },
  {
    id: "cyb-19",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "19. Monitoraggio Flusso Dati di Backplane d'Impianto Industriale SCADA",
    logicType: "Previsione Storica",
    targetVariables: "Comandi_Insoliti, Tempo_Risposta_PLC, Indice_Varianza"
  },
  {
    id: "cyb-20",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "20. Ottimizzazione Allocazione Honeypots per Decezione Attacchi",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Copertura_Rete, Risorse_Virtuali, Tasso_Attrattiva"
  },
  {
    id: "cyb-21",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "21. Simulazione di Forzatura Brute Force su Sistemi Privati",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Tempo_Attacco_Stimato, Dimensioni_Dizionario, Tentativi_Secondo"
  },
  {
    id: "cyb-22",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "22. Monitoraggio Attività Privilegiata in Sistemi Operativi",
    logicType: "Previsione Storica",
    targetVariables: "Numero_Chiamate_Sys, ID_Processo, Privilegi_Elevati"
  },
  {
    id: "cyb-23",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "23. Automatizzazione Risposta Incidenti (SOAR) con Generative AI",
    logicType: "Automatizzazione Processi",
    targetVariables: "Gravità_Allarme, Tempo_Contenimento, ID_Regola_Scattata"
  },
  {
    id: "cyb-24",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "24. Riconoscimento Impronte Digitali di Protocollo Encrypted SSL",
    logicType: "Automatizzazione Processi",
    targetVariables: "JA3_Fingerprint, Ciphers_Offerti, Lunghezza_Handshake"
  },
  {
    id: "cyb-25",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "25. Ottimizzazione delle Politiche di Zero-Trust Access Control",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Livello_Privilegio, Distanza_Dispositivo, Coefficiente_Rischio"
  },
  {
    id: "cyb-26",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "26. Simulazione Teoria dei Giochi Attaccante-Difensore Quantistica",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Matrice_Payoff, Strategia_Mista, Entanglement_Coeff"
  },
  {
    id: "cyb-27",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "27. Previsione Violazioni Credenziali da Data Breach Esterni",
    logicType: "Previsione Storica",
    targetVariables: "Indice_Esposizione_Darkweb, Complessità_Password, Giorni_Uptodate"
  },
  {
    id: "cyb-28",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "28. Analisi Sicurezza Sistemi Firmware IoT",
    logicType: "Automatizzazione Processi",
    targetVariables: "Certificati_Scaduti, Backdoor_Trovate, Livello_Offuscamento"
  },
  {
    id: "cyb-29",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "29. Monitoraggio Integrità Dati in Canali Satellitari Protetti",
    logicType: "Previsione Storica",
    targetVariables: "Percentuale_Errori_FEC, Rapporto_Segnale_Rumore, ID_Canale"
  },
  {
    id: "cyb-30",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "30. Rilevamento Ransomware dal Tasso di Scrittura su Disco",
    logicType: "Previsione Storica",
    targetVariables: "IOPS_Scrittura, Entropia_File_Creati, CPU_Saturazione"
  },
  {
    id: "cyb-31",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "31. Ottimizzazione Distribuzione Certificate Revocation Lists (CRL)",
    logicType: "Ottimizzazione Combinatoria",
    targetVariables: "Banda_Consumata, Tempo_Aggiornamento, Numero_Certificati"
  },
  {
    id: "cyb-32",
    macroarea: "Cybersecurity",
    technology: "Computer Quantistico (QPU)",
    name: "32. Simulazione Crittanalisi su Sistemi di Cifratura a Curve Ellittiche",
    logicType: "Risoluzione di Problematiche",
    targetVariables: "Dimensione_Chiave_ECC, Tasso_Insuccesso, Grado_Curva"
  },
  {
    id: "cyb-33",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "33. Previsione Pattern di Propagazione di Worm di Rete",
    logicType: "Previsione Storica",
    targetVariables: "Nodi_Infetti, Velocità_Propagazione, Grado_Connettività"
  },
  {
    id: "cyb-34",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "34. Rilevamento Data Exfiltration da Canali DNS Tunneling",
    logicType: "Automatizzazione Processi",
    targetVariables: "Lunghezza_Query_DNS, Subdomini_Unici, Frequenza_Query"
  },
  {
    id: "cyb-35",
    macroarea: "Cybersecurity",
    technology: "IA Classica / HPC",
    name: "35. Automatizzazione Patching dei Sistemi di Rete Critici",
    logicType: "Automatizzazione Processi",
    targetVariables: "Gravità_CVSS, Tempo_Patch, Test_Regressione_Stato"
  }
];
