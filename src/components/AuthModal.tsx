import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ArrowRight, Bot } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Reset mode when modal opens
  React.useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication delay
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-brand-paper transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                  <Bot className="text-white w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xl tracking-tighter">NEXUS</span>
              </div>

              <div className="flex gap-4 mb-8 border-b border-brand-black/5">
                <button 
                  onClick={() => setMode('login')}
                  className={`pb-2 text-sm font-bold transition-all relative ${mode === 'login' ? 'text-brand-black' : 'text-brand-black/30'}`}
                >
                  Entrar
                  {mode === 'login' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />}
                </button>
                <button 
                  onClick={() => setMode('signup')}
                  className={`pb-2 text-sm font-bold transition-all relative ${mode === 'signup' ? 'text-brand-black' : 'text-brand-black/30'}`}
                >
                  Criar Conta
                  {mode === 'signup' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange" />}
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {mode === 'login' ? 'Bem-vindo de volta' : 'Comece sua jornada'}
              </h2>
              <p className="text-sm sm:text-base text-brand-black/50 mb-8">
                {mode === 'login' 
                  ? 'Acesse seu painel de controle e gerencie seu agente.' 
                  : 'Crie sua conta e automatize seu atendimento em minutos.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brand-black/40 ml-1">Nome da Empresa</label>
                      <input 
                        type="text" 
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Ex: Petshop Amigo"
                        className="w-full bg-brand-paper border-none rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 focus:ring-2 focus:ring-brand-orange transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brand-black/40 ml-1">Seu Nome</label>
                      <input 
                        type="text" 
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="w-full bg-brand-paper border-none rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 focus:ring-2 focus:ring-brand-orange transition-all text-sm"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-black/40 ml-1">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-black/20" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-brand-paper border-none rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-10 sm:pl-12 pr-4 focus:ring-2 focus:ring-brand-orange transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-black/40 ml-1">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-black/20" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-brand-paper border-none rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-10 sm:pl-12 pr-4 focus:ring-2 focus:ring-brand-orange transition-all text-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand-black text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg mt-4 flex items-center justify-center gap-2 hover:bg-brand-orange transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Entrar no Portal' : 'Criar Minha Conta'}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 sm:pt-8 border-t border-brand-black/5 text-center">
                <p className="text-xs sm:text-sm text-brand-black/40">
                  {mode === 'login' ? 'Ainda não tem um agente?' : 'Já possui uma conta?'} {' '}
                  <button 
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-brand-orange font-bold hover:underline"
                  >
                    {mode === 'login' ? 'Criar conta agora' : 'Fazer login'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
