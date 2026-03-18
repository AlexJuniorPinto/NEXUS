import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, QrCode, CheckCircle2, RefreshCw, ShieldCheck, AlertCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function WhatsAppIntegration() {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const handleConnect = async () => {
    setStatus('connecting');
    // Simulate getting QR Code
    await new Promise(resolve => setTimeout(resolve, 1000));
    setQrCode('https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=NEXUS-AI-CONNECT-TOKEN-12345');
    
    // Simulate connection after 8 seconds
    setTimeout(() => {
      setStatus('connected');
      setQrCode(null);
    }, 8000);
  };

  const handleDisconnect = () => {
    setStatus('disconnected');
    setQrCode(null);
    setShowDisconnectModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 md:pb-8 border-b border-brand-line">
        <div>
          <div className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.3em] mb-2 font-mono">Network Interface v1.2</div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter leading-none">CONEXÃO WHATSAPP.</h1>
          <p className="text-sm md:text-base text-brand-black/40 mt-4 font-medium">Vincule sua conta oficial para habilitar o processamento de mensagens.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500",
            status === 'connected' ? "bg-green-500/10 border-green-500/20 text-green-600" : 
            status === 'connecting' ? "bg-orange-500/10 border-orange-500/20 text-brand-orange" : 
            "bg-brand-black/5 border-brand-black/10 text-brand-black/40"
          )}>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              status === 'connected' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : 
              status === 'connecting' ? "bg-brand-orange animate-pulse" : 
              "bg-brand-black/20"
            )} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {status === 'connected' ? 'Link Ativo' : status === 'connecting' ? 'Sincronizando' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-brand-line shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/5 blur-[80px] -z-10" />
            
            {status === 'disconnected' && (
              <div className="text-center py-10 md:py-16 space-y-6 md:space-y-8">
                <div className="relative inline-block">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-paper rounded-[24px] md:rounded-[32px] flex items-center justify-center mx-auto text-brand-black/20 border border-brand-line border-dashed">
                    <QrCode size={40} md:size={48} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-7 h-7 md:w-8 md:h-8 bg-brand-orange rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg">
                    <RefreshCw size={14} md:size={16} />
                  </div>
                </div>
                <div className="max-w-xs mx-auto space-y-2 md:space-y-3">
                  <h4 className="text-xl md:text-2xl font-display font-bold tracking-tight">INICIAR PAREAMENTO</h4>
                  <p className="text-xs md:text-sm text-brand-black/40 font-medium leading-relaxed">Gere um token de autenticação seguro para vincular seu dispositivo.</p>
                </div>
                <button
                  onClick={handleConnect}
                  className="btn-primary px-8 md:px-12 py-4 md:py-5 text-base md:text-lg w-full sm:w-auto"
                >
                  GERAR QR CODE SEGURO
                </button>
              </div>
            )}

            {status === 'connecting' && qrCode && (
              <div className="text-center py-6 md:py-10 space-y-8 md:space-y-10">
                <div className="relative inline-block">
                  <div className="bg-white p-4 md:p-6 rounded-[32px] md:rounded-[40px] border border-brand-line shadow-2xl relative z-10">
                    <img src={qrCode} alt="WhatsApp QR Code" className="w-48 h-48 md:w-64 md:h-64 grayscale contrast-125 mx-auto" />
                  </div>
                  <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-10 h-10 md:w-12 md:h-12 border-t-2 border-l-2 border-brand-orange rounded-tl-xl md:rounded-tl-2xl" />
                  <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 border-b-2 border-r-2 border-brand-orange rounded-br-xl md:rounded-br-2xl" />
                </div>
                
                <div className="max-w-md mx-auto space-y-6">
                  <div className="flex items-center justify-center gap-3 text-brand-orange font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                    <RefreshCw size={16} md:size={18} className="animate-spin" />
                    Aguardando Handshake...
                  </div>
                  
                  <div className="text-left bg-brand-paper/30 border border-brand-line p-6 md:p-8 rounded-[24px] md:rounded-[32px] space-y-4">
                    <p className="text-[9px] md:text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.3em] font-mono">PASSO A PASSO:</p>
                    <ol className="space-y-3">
                      {[
                        'Abra o WhatsApp móvel',
                        'Acesse Aparelhos Conectados',
                        'Toque em "Conectar um Aparelho"',
                        'Aponte para o código acima'
                      ].map((step, i) => (
                        <li key={i} className="flex gap-3 md:gap-4 text-xs md:text-sm font-medium text-brand-black/60">
                          <span className="text-brand-orange font-mono font-bold">0{i+1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {status === 'connected' && (
              <div className="py-10 md:py-16 text-center space-y-8 md:space-y-10">
                <div className="relative inline-block">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-green-500/10 text-green-600 rounded-[24px] md:rounded-[32px] flex items-center justify-center mx-auto border border-green-500/20 shadow-sm">
                    <CheckCircle2 size={40} md:size={48} className="animate-bounce-slow" />
                  </div>
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full border-4 border-white shadow-sm" />
                </div>
                
                <div className="max-w-sm mx-auto space-y-2 md:space-y-3 px-4">
                  <h4 className="text-2xl md:text-3xl font-display font-bold tracking-tight">SISTEMA VINCULADO</h4>
                  <p className="text-xs md:text-sm text-brand-black/40 font-medium leading-relaxed">Mensagens estão sendo processadas em tempo real.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto pt-6 md:pt-8 px-4 font-mono">
                  <div className="bg-brand-paper/30 border border-brand-line p-5 md:p-6 rounded-[24px] md:rounded-[32px] text-left group hover:bg-brand-black hover:text-white transition-all duration-300">
                    <div className="text-[9px] text-brand-black/30 group-hover:text-white/40 font-bold uppercase tracking-widest mb-2">MSG_HOJE</div>
                    <div className="text-2xl md:text-3xl font-display font-bold">142</div>
                  </div>
                  <div className="bg-brand-paper/30 border border-brand-line p-5 md:p-6 rounded-[24px] md:rounded-[32px] text-left group hover:bg-brand-black hover:text-white transition-all duration-300">
                    <div className="text-[9px] text-brand-black/30 group-hover:text-white/40 font-bold uppercase tracking-widest mb-2">UPTIME</div>
                    <div className="text-2xl md:text-3xl font-display font-bold">04:12</div>
                  </div>
                </div>

                <div className="pt-6 md:pt-8">
                  <button 
                    onClick={() => setShowDisconnectModal(true)}
                    className="text-[9px] md:text-[10px] font-bold text-red-500 uppercase tracking-[0.2em] hover:text-red-600 transition-colors border-b border-red-500/20 pb-1"
                  >
                    TERMINAR SESSÃO ATIVA
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-black p-8 md:p-10 rounded-[32px] md:rounded-[40px] text-white space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-orange blur-[100px] rounded-full" />
            </div>
            
            <h3 className="text-lg md:text-xl font-display font-bold flex items-center gap-3 tracking-tight">
              <ShieldCheck size={20} md:size={24} className="text-brand-orange" /> SEGURANÇA
            </h3>
            
            <div className="space-y-6">
              {[
                { icon: AlertCircle, text: 'Utilizamos a API oficial para garantir máxima segurança da conta.' },
                { icon: ShieldCheck, text: 'Criptografia ativa em todas as comunicações da infraestrutura.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
                    <item.icon size={16} md:size={18} />
                  </div>
                  <p className="text-[11px] md:text-xs text-white/40 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 md:mt-12 p-5 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/10">
              <div className="text-[9px] md:text-[10px] text-brand-orange font-bold uppercase tracking-[0.2em] mb-3 font-mono">WEBHOOK_ENDPOINT</div>
              <div className="text-[8px] md:text-[9px] font-mono bg-black/40 p-3 rounded-xl border border-white/5 break-all text-white/60 leading-relaxed">
                https://api.nexus-ai.com/v1/webhook/cl_78234
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showDisconnectModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDisconnectModal(false)}
              className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-2xl border border-brand-line"
            >
              <button 
                onClick={() => setShowDisconnectModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-brand-paper rounded-full transition-colors"
              >
                <X size={18} md:size={20} className="text-brand-black/20" />
              </button>
              
              <div className="text-center space-y-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-500/10 text-red-500 rounded-[24px] md:rounded-[32px] flex items-center justify-center mx-auto border border-red-500/20">
                  <AlertCircle size={32} md:size={40} />
                </div>
                <div className="space-y-2 px-2">
                  <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight uppercase">TERMINAR CONEXÃO?</h3>
                  <p className="text-xs md:text-sm text-brand-black/40 font-medium leading-relaxed">
                    A IA parará de responder imediatamente.
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:gap-3 pt-2">
                  <button 
                    onClick={handleDisconnect}
                    className="w-full py-3 md:py-4 bg-red-500 text-white rounded-xl md:rounded-2xl font-bold hover:bg-red-600 transition-all active:scale-[0.98] text-sm"
                  >
                    SIM, DESCONECTAR agora.
                  </button>
                  <button 
                    onClick={() => setShowDisconnectModal(false)}
                    className="w-full py-3 md:py-4 bg-brand-paper text-brand-black/40 rounded-xl md:rounded-2xl font-bold hover:bg-brand-line transition-all active:scale-[0.98] text-sm"
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
