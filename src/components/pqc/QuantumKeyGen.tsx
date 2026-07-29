import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Key, 
  Copy, 
  Check, 
  ShieldAlert, 
  Cpu, 
  RefreshCcw,
  Fingerprint,
  Layers,
  Database
} from 'lucide-react';
import axios from 'axios';

export default function QuantumKeyGen() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [keys, setKeys] = useState<{
    publicKey: string;
    privateKey: string;
    algorithm: string;
  } | null>(null);
  const [copiedType, setCopiedType] = useState<'pub' | 'priv' | null>(null);

  const generateKeys = async () => {
    setIsGenerating(true);
    setKeys(null);
    try {
      const response = await axios.post('/api/pqc/keygen');
      if (response.data && response.data.publicKey) {
        setKeys(response.data);
      } else {
        alert('Error: Invalid server response.');
      }
    } catch (error: any) {
      console.error('Key generation failed', error);
      const errorMsg = error.response?.data?.error || 'Error during generation.';
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, type: 'pub' | 'priv') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <div className="inline-flex p-2 sm:p-3 bg-quantum-primary/10 border border-quantum-primary/30 rounded-xl sm:rounded-2xl mb-2">
          <Key className="w-6 h-6 sm:w-8 sm:h-8 text-quantum-primary" />
        </div>
        <h2 className="text-xl sm:text-4xl font-display font-black text-white uppercase tracking-tighter">
          NIST <span className="text-quantum-primary">Key Generator</span>
        </h2>
        <p className="text-[9px] sm:text-xs text-gray-500 font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
          Instantaneous generation of quantum-resistant asymmetric key pairs based on ML-KEM-768 standard.
        </p>
      </div>

      <div className="flex justify-center px-4">
        <button 
          onClick={generateKeys}
          disabled={isGenerating}
          className="relative group w-full sm:w-auto px-6 sm:px-12 py-4 sm:py-5 bg-quantum-primary text-black font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(0,242,255,0.2)] hover:shadow-[0_0_60px_rgba(0,242,255,0.4)] disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl sm:rounded-2xl" />
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {isGenerating ? <RefreshCcw className="w-4 h-4 sm:w-5 h-5 animate-spin" /> : <Cpu className="w-4 h-4 sm:w-5 h-5" />}
            {isGenerating ? 'Computing Entropy...' : 'Generate NIST Pairs'}
          </div>
        </button>
      </div>

      <AnimatePresence>
        {keys && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Public Key Card */}
            <div className="quantum-card bg-black/60 border-quantum-primary/20 hover:border-quantum-primary/40 transition-colors group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-quantum-primary/10 border border-quantum-primary/20 flex items-center justify-center">
                    <Database className="w-4 h-4 text-quantum-primary" />
                  </div>
                  <h3 className="text-white font-display font-bold uppercase tracking-widest text-[10px]">Public Key (NIST)</h3>
                </div>
                <span className="text-[8px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">1184 Bytes</span>
              </div>
              
              <div className="relative">
                <div className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 font-mono text-[9px] text-gray-400 break-all h-40 overflow-y-auto scrollbar-hide line-height-relaxed">
                  {keys.publicKey}
                </div>
                <button 
                  onClick={() => copyToClipboard(keys.publicKey, 'pub')}
                  className="absolute bottom-3 right-3 p-2.5 bg-black/60 hover:bg-quantum-primary border border-white/10 hover:border-quantum-primary rounded-lg text-gray-400 hover:text-black transition-all group/btn"
                >
                  {copiedType === 'pub' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Copy className="w-4 h-4" />
                      <span className="text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity">Copy</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Private Key Card */}
            <div className="quantum-card bg-black/60 border-quantum-secondary/20 hover:border-quantum-secondary/40 transition-colors group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-quantum-secondary/10 border border-quantum-secondary/20 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4 text-quantum-secondary" />
                  </div>
                  <h3 className="text-white font-display font-bold uppercase tracking-widest text-[10px]">Private Key (Secret)</h3>
                </div>
                <span className="text-[8px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">2400 Bytes</span>
              </div>
              
              <div className="relative">
                <div className="w-full bg-white/[0.03] border border-red-500/5 rounded-xl p-4 font-mono text-[9px] text-quantum-secondary/80 break-all h-40 overflow-y-auto scrollbar-hide line-height-relaxed blur-[2px] hover:blur-0 transition-all duration-300">
                  {keys.privateKey}
                </div>
                <button 
                  onClick={() => copyToClipboard(keys.privateKey, 'priv')}
                  className="absolute bottom-3 right-3 p-2.5 bg-black/60 hover:bg-quantum-secondary border border-white/10 hover:border-quantum-secondary rounded-lg text-gray-400 hover:text-white transition-all group/btn"
                >
                  {copiedType === 'priv' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Copy className="w-4 h-4" />
                      <span className="text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-opacity">Copy</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
          <Fingerprint className="w-5 h-5 text-quantum-primary shrink-0" />
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase mb-1">Entropy Injection</h4>
            <p className="text-[9px] text-gray-500 leading-relaxed font-mono uppercase">Physical qubits are used to generate unpredictable seeds of pure randomness.</p>
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
          <Layers className="w-5 h-5 text-quantum-primary shrink-0" />
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase mb-1">Lattice Algorithm</h4>
            <p className="text-[9px] text-gray-500 leading-relaxed font-mono uppercase">Based on matrix calculations that even future quantum computers cannot invert.</p>
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
          <RefreshCcw className="w-5 h-5 text-quantum-primary shrink-0" />
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase mb-1">Automatic Flush</h4>
            <p className="text-[9px] text-gray-500 leading-relaxed font-mono uppercase">Every generated key is immediately wiped from the backend volatile memory.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
