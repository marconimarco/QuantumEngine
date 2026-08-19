import React, { useState } from 'react';
import { Shield, Key, Lock, User, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff, Sparkles, Cpu, Layers } from 'lucide-react';
import { loginUser, CurrentUserSession } from '../services/authService';

interface LoginScreenProps {
  onLoginSuccess: (user: CurrentUserSession) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim()) {
      setErrorMessage('Inserisci il nome utente.');
      return;
    }
    if (!password) {
      setErrorMessage('Inserisci la password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = loginUser(username, password);
      setIsLoading(false);

      if (result.success && result.user) {
        onLoginSuccess(result.user);
      } else {
        setErrorMessage(result.message || 'Credenziali non valide.');
      }
    }, 400);
  };

  const handleQuickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-quantum-bg flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none text-white font-sans">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-quantum-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-quantum-secondary/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-white/[0.03] border border-quantum-primary/30 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(0,242,255,0.15)] mb-4 backdrop-blur-md">
            <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-quantum-primary animate-pulse" />
          </div>
          <h1 className="text-xl sm:text-2xl font-display font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-gray-200 to-quantum-primary bg-clip-text text-transparent">
            Spark Quantum Engine
          </h1>
          <p className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-widest uppercase mt-1">
            B2B Enterprise Quantum Systems Gateway
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-gradient-to-b from-[#0f172a]/90 to-[#0b0f19]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-quantum-primary" />
              <span className="text-xs font-display font-bold uppercase tracking-wider text-white">
                Autenticazione Sicura
              </span>
            </div>
            <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-quantum-primary/10 text-quantum-primary border border-quantum-primary/30 rounded-full">
              NIST FIPS 203 Ready
            </span>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-2.5 text-red-200 text-xs font-mono animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-quantum-primary" />
                <span>Username</span>
              </label>
              <input
                id="login-username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="es. admin oppure quantum_user"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-quantum-primary/50 focus:border-transparent transition-all font-mono"
                autoComplete="username"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-quantum-primary" />
                  <span>Password</span>
                </div>
              </label>
              <div className="relative">
                <input
                  id="login-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Inserisci password..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-quantum-primary/50 focus:border-transparent transition-all font-mono"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="submit-login-button"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-quantum-primary to-cyan-400 hover:from-cyan-300 hover:to-quantum-primary text-black font-display font-bold uppercase tracking-[0.15em] text-xs rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Verifica Credenziali...</span>
                </>
              ) : (
                <>
                  <span>Accedi alla Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Login / Credenziali predefinite */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-quantum-primary" />
              <span>Accesso Rapido (Credenziali Demo):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                id="quick-fill-admin-btn"
                onClick={() => handleQuickFill('admin', 'AdminPassword2026!')}
                className="p-2.5 bg-white/[0.02] hover:bg-quantum-primary/10 border border-white/10 hover:border-quantum-primary/40 rounded-xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white group-hover:text-quantum-primary">
                    👑 Amministratore
                  </span>
                  <span className="text-[9px] font-mono text-quantum-primary">Admin</span>
                </div>
                <div className="text-[10px] font-mono text-gray-400 mt-1">
                  User: <span className="text-gray-200">admin</span>
                </div>
                <div className="text-[9px] font-mono text-gray-500">
                  Pass: AdminPassword2026!
                </div>
              </button>

              <button
                type="button"
                id="quick-fill-user-btn"
                onClick={() => handleQuickFill('quantum_user', 'UserPassword2026!')}
                className="p-2.5 bg-white/[0.02] hover:bg-quantum-secondary/10 border border-white/10 hover:border-quantum-secondary/40 rounded-xl text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white group-hover:text-cyan-300">
                    👤 Utente Standard
                  </span>
                  <span className="text-[9px] font-mono text-cyan-300">User</span>
                </div>
                <div className="text-[10px] font-mono text-gray-400 mt-1">
                  User: <span className="text-gray-200">quantum_user</span>
                </div>
                <div className="text-[9px] font-mono text-gray-500">
                  Pass: UserPassword2026!
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-[10px] text-gray-500 font-mono flex items-center justify-center gap-2">
          <Shield className="w-3.5 h-3.5 text-quantum-primary/70" />
          <span>Spark Quantum Engine • Multi-Tenant RBAC Security</span>
        </div>
      </div>
    </div>
  );
}
