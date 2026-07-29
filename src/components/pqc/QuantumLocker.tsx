import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Upload, 
  Download, 
  Key, 
  ShieldCheck, 
  AlertTriangle,
  FileText,
  Copy,
  Check,
  RefreshCcw,
  Zap
} from 'lucide-react';
import axios from 'axios';
import { useTranslation } from '../../lib/TranslationContext';

export default function QuantumLocker() {
  const { t } = useTranslation();
  const [activeMode, setActiveMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  
  // Encryption state
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    encryptedPayload: string;
    encapsulatedKey: string;
    unlockKey: string;
    algorithm: string;
  } | null>(null);

  // Decryption state
  const [decryptPayload, setDecryptPayload] = useState('');
  const [decryptEncKey, setDecryptEncKey] = useState('');
  const [decryptSecretKey, setDecryptSecretKey] = useState('');
  const [decryptedResult, setDecryptedResult] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const [copiedKey, setCopiedKey] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      
      if (activeMode === 'encrypt') {
        setSelectedFile(file);
      } else {
        // If in decrypt mode and file is .vault, try to read it
        if (file.name.endsWith('.vault')) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            setDecryptPayload(ev.target?.result as string);
          };
          reader.readAsText(file);
        } else {
          alert('Please select a file with .vault extension for decryption.');
        }
      }
    }
  };

  const handleModeSwitch = (mode: 'encrypt' | 'decrypt') => {
    setActiveMode(mode);
    // Optional: clear results when switching? 
    // No, maybe keep them but reset inputs for the other mode if needed
  };

  const clearAll = () => {
    if (activeMode === 'encrypt') {
      setInputText('');
      setSelectedFile(null);
      setResult(null);
    } else {
      setDecryptPayload('');
      setDecryptEncKey('');
      setDecryptSecretKey('');
      setDecryptedResult(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEncrypt = async () => {
    if (!inputText && !selectedFile) return;

    setIsProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      } else {
        formData.append('text', inputText);
      }

      const response = await axios.post('/api/pqc/encrypt', formData);

      if (response.data && response.data.encryptedPayload) {
        setResult(response.data);
      } else {
        console.error('Invalid response format', response.data);
        alert('Error: Invalid server response.');
      }
    } catch (error: any) {
      console.error('Encryption failed', error);
      const errorMsg = error.response?.data?.error || 'Error during encryption.';
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrypt = async () => {
    if (!decryptPayload || !decryptEncKey || !decryptSecretKey) {
      alert("Please enter payload, encapsulated key, and unlock key.");
      return;
    }

    setIsDecrypting(true);
    setDecryptedResult(null);

    try {
      const response = await axios.post('/api/pqc/decrypt', {
        encryptedPayload: decryptPayload,
        encapsulatedKey: decryptEncKey,
        unlockKey: decryptSecretKey
      });

      if (response.data && response.data.decryptedContent) {
        setDecryptedResult(response.data.decryptedContent);
      }
    } catch (error: any) {
      console.error('Decryption failed', error);
      const errorMsg = error.response?.data?.error || 'Error during decryption. Check keys.';
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsDecrypting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const downloadEncrypted = () => {
    if (!result) return;
    const blob = new Blob([result.encryptedPayload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantum_locked_${selectedFile?.name || 'text'}.vault`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10 py-4 sm:py-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-[1.5rem] bg-quantum-primary/10 border border-quantum-primary/20 flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(0,242,255,0.1)]">
             <div className="absolute inset-0 bg-quantum-primary/5 animate-pulse" />
             <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-quantum-primary relative" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tighter leading-none">
              PQC <span className="text-quantum-primary drop-shadow-[0_0_10px_rgba(0,242,255,0.4)]">Locker</span>
            </h2>
            <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
              <p className="text-[8px] sm:text-[11px] text-gray-500 font-mono uppercase tracking-[0.2em] font-black">
                NIST FIPS 203 // ML-KEM-768 Engine
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 p-1.5 bg-white/5 rounded-xl sm:rounded-[1.5rem] border border-white/5 shadow-inner backdrop-blur-md w-full sm:w-auto overflow-x-auto sm:overflow-visible">
          <button 
            onClick={() => handleModeSwitch('encrypt')}
            className={`flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-lg sm:rounded-2xl text-[9px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all whitespace-nowrap ${
              activeMode === 'encrypt' ? 'bg-quantum-primary text-black shadow-[0_0_20px_rgba(0,242,255,0.3)]' : 'text-gray-500 hover:text-white'
            }`}
          >
            Encrypt
          </button>
          <button 
            onClick={() => handleModeSwitch('decrypt')}
            className={`flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-lg sm:rounded-2xl text-[9px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all whitespace-nowrap ${
              activeMode === 'decrypt' ? 'bg-quantum-primary text-black shadow-[0_0_20px_rgba(0,242,255,0.3)]' : 'text-gray-500 hover:text-white'
            }`}
          >
            Decrypt
          </button>
          <div className="hidden sm:block w-[1px] h-8 bg-white/10 mx-2" />
          <button 
            onClick={clearAll}
            className="p-2 sm:p-3.5 text-gray-600 hover:text-amber-500 transition-colors bg-white/5 rounded-lg sm:rounded-2xl border border-white/5"
            title="Reset All"
          >
            <RefreshCcw className="w-4 h-4 sm:w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Input Section */}
        <div className="quantum-card bg-black/60 backdrop-blur-3xl p-6 sm:p-10 border-white/10 flex flex-col">
          {activeMode === 'encrypt' ? (
            <>
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="flex items-center gap-3 text-white font-display font-bold uppercase tracking-[0.15em] text-sm">
                  <Lock className="w-5 h-5 text-quantum-primary" />
                  Secure Encryption
                </h3>
                <Zap className="w-5 h-5 text-quantum-primary/20" />
              </div>

              <div className="space-y-6 sm:space-y-8 flex-1 flex flex-col">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-black ml-1">Original Text</label>
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter secret message to encrypt here..."
                    className="w-full h-32 sm:h-48 bg-black/40 border border-white/5 rounded-[1.2rem] sm:rounded-[1.5rem] p-4 sm:p-6 text-sm sm:text-base text-gray-200 placeholder:text-gray-700 focus:ring-2 focus:ring-quantum-primary/30 focus:border-quantum-primary/30 transition-all resize-none shadow-inner font-medium leading-relaxed outline-none"
                  />
                </div>

                <div className="relative">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-black ml-1 block mb-4">Or Upload File</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-[1.5rem] sm:rounded-[2rem] p-8 sm:p-12 flex flex-col items-center justify-center transition-all cursor-pointer group ${
                      selectedFile 
                        ? 'border-quantum-primary/40 bg-quantum-primary/5' 
                        : 'border-white/10 hover:border-quantum-primary/30 hover:bg-white/5'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                      className="hidden" 
                    />
                    <Upload className={`w-8 h-8 sm:w-10 sm:h-10 mb-4 transition-transform group-hover:-translate-y-2 ${
                      selectedFile ? 'text-quantum-primary shadow-[0_0_15px_rgba(0,242,255,0.4)]' : 'text-gray-700'
                    }`} />
                    <p className="text-xs sm:text-sm font-mono text-gray-400 font-black uppercase tracking-[0.2em] text-center">
                      {selectedFile ? selectedFile.name : 'Browse local files'}
                    </p>
                    <p className="text-[8px] sm:text-[9px] text-gray-600 mt-2 font-mono uppercase tracking-[0.2em]">Max 100MB • ML-KEM Encapsulation</p>
                  </div>
                </div>

                <button 
                  onClick={handleEncrypt}
                  disabled={isProcessing || (!inputText && !selectedFile)}
                  className="w-full py-4 sm:py-6 mt-auto bg-quantum-primary text-black font-black uppercase tracking-[0.3em] text-[10px] sm:text-[12px] rounded-xl sm:rounded-[1.5rem] hover:scale-[1.02] hover:bg-quantum-secondary hover:text-white active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(0,242,255,0.25)] disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 sm:gap-4"
                >
                  {isProcessing ? (
                    <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                  ) : (
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  )}
                  {isProcessing ? 'Processing Lattice signal...' : 'LOCK VAULT'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="flex items-center gap-3 text-white font-display font-bold uppercase tracking-[0.15em] text-sm">
                  <ShieldCheck className="w-5 h-5 text-quantum-primary" />
                  Decipher Gate
                </h3>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-black ml-1">Payload (.vault content)</label>
                  <textarea 
                    value={decryptPayload}
                    onChange={(e) => setDecryptPayload(e.target.value)}
                    placeholder="Paste the content of the .vault file..."
                    className="w-full h-24 sm:h-32 bg-black/40 border border-white/5 rounded-xl sm:rounded-[1.5rem] p-4 sm:p-6 text-[10px] sm:text-[11px] font-mono text-gray-400 placeholder:text-gray-700 focus:ring-2 focus:ring-quantum-primary/30 focus:border-quantum-primary/30 transition-all resize-none shadow-inner outline-none"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 sm:py-4 bg-white/5 border border-white/5 rounded-xl sm:rounded-[1.5rem] text-[10px] sm:text-[11px] text-gray-400 uppercase font-black tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                  >
                    <FileText className="w-4 h-4 sm:w-5 h-5" /> Load .vault File
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    className="hidden" 
                    accept=".vault"
                  />
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-black ml-1">Encapsulated Key (HEX)</label>
                    <input 
                      type="text"
                      value={decryptEncKey}
                      onChange={(e) => setDecryptEncKey(e.target.value)}
                      placeholder="HEX Identifier..."
                      className="w-full bg-black/40 border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-[11px] sm:text-sm text-quantum-primary font-mono placeholder:text-gray-800 focus:ring-2 focus:ring-quantum-primary/30 outline-none transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-black ml-1">Unlock Key (PrivateKey HEX)</label>
                    <input 
                      type="password"
                      value={decryptSecretKey}
                      onChange={(e) => setDecryptSecretKey(e.target.value)}
                      placeholder="Secret Lattice Sequence..."
                      className="w-full bg-black/40 border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-[11px] sm:text-sm text-white placeholder:text-gray-800 focus:ring-2 focus:ring-quantum-primary/30 outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleDecrypt}
                  disabled={isDecrypting || !decryptPayload || !decryptEncKey || !decryptSecretKey}
                  className="w-full py-4 sm:py-6 mt-4 sm:mt-6 bg-white/5 hover:bg-quantum-primary hover:text-black border border-white/10 text-white font-black uppercase tracking-[0.3em] text-[10px] sm:text-[12px] rounded-xl sm:rounded-[1.5rem] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 sm:gap-4"
                >
                  {isDecrypting ? (
                    <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                  {isDecrypting ? 'DECAPSULATING LATTICE...' : 'UNLOCK VAULT'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Results Section */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeMode === 'encrypt' ? (
              !result ? (
                <motion.div 
                  key="empty-encrypt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-black/20 p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                    <ShieldCheck className="w-10 h-10 text-white/5" />
                  </div>
                  <h4 className="text-gray-500 font-mono text-[11px] uppercase tracking-[0.3em] font-black">Awaiting encryption signal</h4>
                  <p className="text-[10px] text-gray-700 mt-4 max-w-[240px] leading-relaxed uppercase font-bold tracking-widest">Post-quantum lattice signals will appear here.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="results-encrypt"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="quantum-card bg-gradient-to-br from-quantum-surface/30 to-black/80 space-y-8 p-8 sm:p-10 border-quantum-primary/20"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-display font-black uppercase tracking-[0.2em] text-[13px]">Encryption result</h3>
                    <span className="px-3 py-1 bg-quantum-primary/20 text-quantum-primary text-[10px] font-black rounded-lg border border-quantum-primary/30 uppercase tracking-widest shadow-[0_0_15px_rgba(0,242,255,0.15)]">Secure Gateway</span>
                  </div>

                  <div className="p-6 bg-quantum-primary/5 border border-quantum-primary/10 rounded-[1.5rem] relative group">
                    <span className="absolute top-4 right-4 text-[9px] text-quantum-primary/40 font-mono uppercase tracking-[0.2em] font-black">Vault Hex</span>
                    <div className="text-[11px] font-mono text-gray-400 break-all leading-relaxed max-h-48 overflow-y-auto pr-4 scrollbar-hide">
                      {result.encryptedPayload.substring(0, 800)}...
                    </div>
                    <div className="mt-8 flex gap-3">
                      <button 
                        onClick={downloadEncrypted}
                        className="flex-1 py-4 bg-quantum-primary text-black text-[11px] font-black uppercase rounded-[1.2rem] hover:bg-quantum-secondary hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg"
                      >
                        <Download className="w-4 h-4" /> Download .vault
                      </button>
                      <button 
                        onClick={() => copyToClipboard(result.encapsulatedKey)}
                        className="px-6 py-4 bg-white/5 border border-white/10 text-white text-[11px] font-bold rounded-[1.2rem] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                      >
                         <Copy className="w-4 h-4" /> Copy Key
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] font-black ml-1">Unlock Key (SecretKey)</label>
                      <div className="relative group">
                        <div className="w-full bg-black/60 border border-white/5 rounded-[1.5rem] p-6 text-[11px] font-mono text-quantum-secondary break-all pr-16 leading-relaxed">
                          {result.unlockKey}
                        </div>
                        <button 
                          onClick={() => copyToClipboard(result.unlockKey)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 hover:bg-white/5 rounded-xl transition-all text-gray-400 hover:text-white"
                        >
                          {copiedKey ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                        <p className="text-[10px] text-amber-500/80 font-mono uppercase leading-relaxed font-black tracking-widest">
                          Warning: Private key is never stored. Data recovery is impossible if lost.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Architecture</span>
                        <span className="text-[11px] font-black text-quantum-primary uppercase tracking-[0.1em]">{result.algorithm}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5 }}
                          className="h-full bg-quantum-primary shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ) : (
              !decryptedResult ? (
                <motion.div 
                  key="empty-decrypt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-black/20 p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-quantum-primary/5 flex items-center justify-center mb-6 border border-quantum-primary/10">
                    <Key className="w-10 h-10 text-quantum-primary/30" />
                  </div>
                  <h4 className="text-gray-500 font-mono text-[11px] uppercase tracking-[0.3em] font-black">Secure parameters required</h4>
                  <p className="text-[10px] text-gray-700 mt-4 max-w-[240px] leading-relaxed uppercase font-bold tracking-widest">Provide encapsulated and secret keys to restore your data signal.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="results-decrypt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="quantum-card bg-gradient-to-br from-green-500/10 to-black/80 border-green-500/20 p-8 sm:p-10 space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-display font-black uppercase tracking-[0.2em] text-[13px]">Decrypted Data</h3>
                    <div className="flex items-center gap-3 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-green-500 shadow-[0_0_10px_#22c55e]" />
                      <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">Clean Data</span>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="p-8 bg-black/60 border border-white/10 rounded-[2rem] min-h-64 shadow-inner">
                      <p className="text-sm sm:text-base text-gray-200 leading-loose break-words whitespace-pre-wrap font-medium">
                        {decryptedResult}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => copyToClipboard(decryptedResult)}
                        className="py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] font-black uppercase rounded-2xl transition-all flex items-center justify-center gap-3"
                      >
                        <Copy className="w-5 h-5" /> Copy Plaintext
                      </button>
                      <button 
                        onClick={() => {
                          const blob = new Blob([decryptedResult], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'decrypted_message.txt';
                          a.click();
                        }}
                        className="py-5 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/10 text-[11px] font-black uppercase rounded-2xl transition-all flex items-center justify-center gap-3"
                      >
                        <Download className="w-5 h-5" /> Download TXT
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-center gap-6">
                       <span className="text-[10px] font-mono text-gray-600 uppercase font-black tracking-[0.3em]">ML-KEM-768 Decapsulated</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                       <span className="text-[10px] font-mono text-gray-600 uppercase font-black tracking-[0.3em]">Integrity: 100%</span>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
