import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, CheckCheck, Mic } from 'lucide-react';
import { cn } from '../../lib/utils';

export const SCENARIOS = [
  {
    id: 'agendamento',
    label: 'Agendamento',
    icon: <Bot size={14} />,
    name: 'Clínica Vitalle',
    messages: [
      { type: 'ai', text: 'Olá! Sou o assistente da Clínica Vitalle. Como posso ajudar hoje? 🚀' },
      { type: 'user', text: 'Gostaria de agendar uma consulta para amanhã.' },
      { type: 'ai', text: 'Perfeito! Temos horários disponíveis às 10:00, 14:30 e 16:00. Qual prefere?' },
      { type: 'user', text: 'Pode ser às 14:30.' },
      { type: 'ai', text: 'Agendamento confirmado para amanhã às 14:30! 🎉 Você receberá um lembrete 1 hora antes.' }
    ]
  },
  {
    id: 'vendas',
    label: 'Vendas / CRM',
    icon: <Bot size={14} />,
    name: 'Nexus Store',
    messages: [
      { type: 'ai', text: 'Bem-vindo à Nexus Store! Vi que você se interessou pelo novo MacBook Pro. Posso tirar alguma dúvida?' },
      { type: 'user', text: 'Qual a diferença entre o chip M3 e M3 Pro?' },
      { type: 'ai', text: 'O M3 Pro oferece até 20% mais performance em tarefas multi-core e suporte a mais memória unificada. Ideal para edição de vídeo 4K!' },
      { type: 'user', text: 'Entendi. Tem algum cupom de primeira compra?' },
      { type: 'ai', text: 'Sim! Use o cupom NEXUS10 para 10% de desconto. Deseja o link do checkout?' }
    ]
  },
  {
    id: 'suporte',
    label: 'Suporte Técnico',
    icon: <Bot size={14} />,
    name: 'Suporte Nexus',
    messages: [
      { type: 'ai', text: 'Olá! Sou o suporte técnico. Em que posso ajudar com sua plataforma hoje?' },
      { type: 'user', text: 'Não estou conseguindo exportar meus relatórios.' },
      { type: 'ai', text: 'Entendido. Isso geralmente ocorre por falta de permissão no navegador. Já tentou limpar o cache?' },
      { type: 'user', text: 'Ainda não. Vou tentar agora.' },
      { type: 'ai', text: 'Combinado! Se não funcionar, me avise que abro um chamado prioritário para você.' }
    ]
  },
  {
    id: 'imobiliaria',
    label: 'Imobiliária',
    icon: <Bot size={14} />,
    name: 'Lux Imóveis',
    messages: [
      { type: 'ai', text: 'Bem-vindo à Lux Imóveis. Buscando o imóvel dos seus sonhos no Itaim Bibi?' },
      { type: 'user', text: 'Sim, procuro cobertura com 3 suítes.' },
      { type: 'ai', text: 'Excelente escolha. Temos 2 opções exclusivas que acabaram de entrar no portfólio. Deseja receber o PDF com fotos?' },
      { type: 'user', text: 'Por favor, envie no meu email.' },
      { type: 'ai', text: 'Claro! Qual o seu melhor email para o envio imediato?' }
    ]
  }
];

export default function WhatsAppDemo() {
  const [activeScenario, setActiveScenario] = useState(0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="relative max-w-6xl mx-auto px-6 mb-32"
    >
      <div className="relative group">
        <div className="absolute -inset-10 bg-gradient-to-tr from-brand-orange/30 via-transparent to-indigo-500/30 blur-[120px] opacity-40 group-hover:opacity-70 transition-opacity duration-1000 -z-10"></div>
        
        <div className="relative glass rounded-[32px] md:rounded-[48px] p-2 md:p-3 shadow-[0_32px_128px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden">
          <div className="aspect-video md:aspect-[16/10] bg-[#FDFDFD] rounded-[24px] md:rounded-[40px] overflow-hidden relative border border-brand-line shadow-inner">
            {/* Dashboard Mockup Content */}
            <div className="absolute inset-0 flex flex-col opacity-50 lg:opacity-100">
              <div className="h-10 md:h-12 border-b border-brand-line flex items-center px-4 md:px-6 gap-3 md:gap-4 bg-white/50">
                <div className="flex gap-1.5">
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-red-400/20" />
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-yellow-400/20" />
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-400/20" />
                </div>
                <div className="h-4 md:h-5 w-32 md:w-48 bg-brand-black/5 rounded-full" />
              </div>
              
              <div className="flex-1 p-4 md:p-8 flex gap-4 md:gap-8 overflow-hidden">
                <div className="hidden sm:block w-32 md:w-48 space-y-3 md:space-y-4">
                  <div className="h-6 md:h-8 bg-brand-black/5 rounded-2xl w-full" />
                  <div className="h-6 md:h-8 bg-brand-black/5 rounded-2xl w-4/5" />
                  <div className="h-6 md:h-8 bg-brand-black/5 rounded-2xl w-full" />
                </div>
                
                <div className="flex-1 space-y-4 md:space-y-6">
                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <div className="h-16 md:h-24 bg-brand-black/5 rounded-2xl md:rounded-3xl" />
                    <div className="h-16 md:h-24 bg-brand-black/5 rounded-2xl md:rounded-3xl" />
                    <div className="h-16 md:h-24 bg-brand-black/5 rounded-2xl md:rounded-3xl" />
                  </div>
                  <div className="h-32 md:h-64 bg-brand-black/5 rounded-2xl md:rounded-[32px] w-full" />
                </div>
              </div>
            </div>

            {/* WhatsApp Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-black/5 backdrop-blur-[2px] p-4 z-10">
              <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6 max-w-md relative z-20">
                {SCENARIOS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveScenario(i)}
                    className={cn(
                      "px-3 md:px-4 py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-all border",
                      activeScenario === i 
                        ? "bg-brand-black text-white border-brand-black shadow-lg" 
                        : "bg-white/80 text-brand-black/40 border-brand-line hover:bg-white hover:text-brand-black"
                    )}
                  >
                    <div className="flex items-center gap-1.5 md:gap-2">
                      {s.icon}
                      {s.label}
                    </div>
                  </button>
                ))}
              </div>

              <motion.div 
                key={activeScenario}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[280px] md:max-w-sm bg-[#E5DDD5] rounded-[30px] md:rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] md:shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-white/40 overflow-hidden flex flex-col h-[320px] md:h-[420px] relative font-sans"
              >
                {/* WhatsApp Background Pattern */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />
                
                {/* WhatsApp Header */}
                <div className="bg-[#075E54] p-3 md:p-4 flex items-center justify-between text-white shrink-0 relative z-10 shadow-md">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/10">
                      <Bot className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm font-bold leading-none">{SCENARIOS[activeScenario].name}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-[8px] md:text-[10px] opacity-80 font-medium">Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 md:p-6 space-y-3 md:space-y-4 relative z-10 overflow-y-auto custom-scrollbar">
                  {SCENARIOS[activeScenario].messages.map((msg, idx) => (
                    <motion.div
                      key={`${activeScenario}-${idx}`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: idx * 0.2 }}
                      className={cn("flex", msg.type === 'ai' ? "justify-start" : "justify-end")}
                    >
                      <div className={cn(
                        "p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm max-w-[85%] relative border border-black/5",
                        msg.type === 'ai' ? "bg-white rounded-tl-none" : "bg-[#DCF8C6] rounded-tr-none"
                      )}>
                        <div className="text-[10px] md:text-xs text-brand-black leading-relaxed">
                          {msg.text}
                        </div>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-[8px] md:text-[9px] text-brand-black/40 font-medium">14:{30 + idx}</span>
                          {msg.type === 'user' && <CheckCheck size={10} className="text-[#34B7F1]" strokeWidth={3} />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp Footer */}
                <div className="p-3 md:p-4 bg-[#F0F0F0] flex items-center gap-2 md:gap-3 shrink-0 relative z-10">
                  <div className="flex-1 bg-white rounded-full flex items-center px-4 md:px-5 py-2 md:py-3 gap-3 shadow-sm border border-black/5">
                    <div className="flex-1 text-[10px] md:text-xs text-gray-400">Digite uma mensagem...</div>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#075E54] rounded-full flex items-center justify-center text-white shadow-lg">
                    <Mic size={18} md:size={20} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
