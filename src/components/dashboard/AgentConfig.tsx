import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Save, Sparkles, MessageSquare, Target, UserCircle, 
  ShieldCheck, ArrowLeft, Video, Phone, MoreVertical, 
  Smile, Paperclip, Camera, Mic, CheckCheck, Lock, Link2,
  ExternalLink, Zap, AlertCircle, Loader2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AgentConfig() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [config, setConfig] = useState({
    name: 'Nexus Assistant',
    personality: 'Profissional, prestativo e focado em conversão.',
    objective: 'Qualificar leads interessados em nossos serviços de consultoria e agendar reuniões.',
    tone: 'Formal',
    instructions: 'Sempre cumprimente o cliente pelo nome se disponível. Se o cliente perguntar sobre preços, explique que cada projeto é personalizado e peça o email para enviar uma proposta.',
    n8nWebhook: 'https://n8n.nexus.ai/webhook/agent-trigger'
  });

  const [activeScenario, setActiveScenario] = useState(0);

  const scenarios = [
    {
      id: 'consultoria',
      label: 'Consultoria',
      icon: <Target size={14} />,
      name: 'Nexus Consultoria',
      personality: 'Profissional e focado em conversão.',
      messages: [
        { type: 'ai', text: 'Olá! Sou o consultor da Nexus. Como posso ajudar sua empresa hoje?' },
        { type: 'user', text: 'Gostaria de saber mais sobre os serviços.' },
        { type: 'ai', text: 'Com certeza! Atuamos com consultoria estratégica para escala de negócios. Qual o tamanho atual do seu time?' }
      ]
    },
    {
      id: 'suporte',
      label: 'Suporte',
      icon: <ShieldCheck size={14} />,
      name: 'Suporte Técnico',
      personality: 'Paciente, técnico e resolutivo.',
      messages: [
        { type: 'ai', text: 'Olá! Sou o suporte técnico. Em que posso ajudar com sua plataforma?' },
        { type: 'user', text: 'Meu acesso está dando erro 404.' },
        { type: 'ai', text: 'Entendido. Pode me informar o e-mail da sua conta para eu verificar os logs agora mesmo?' }
      ]
    },
    {
      id: 'agendamento',
      label: 'Agendamento',
      icon: <Cpu size={14} />,
      name: 'Clínica Vitalle',
      personality: 'Eficiente e organizado.',
      messages: [
        { type: 'ai', text: 'Olá! Gostaria de agendar uma consulta?' },
        { type: 'user', text: 'Sim, para amanhã à tarde.' },
        { type: 'ai', text: 'Temos horários às 14:00 e 16:30. Qual funciona melhor para você?' }
      ]
    },
    {
      id: 'imobiliaria',
      label: 'Imobiliária',
      icon: <Sparkles size={14} />,
      name: 'Lux Imóveis',
      personality: 'Sofisticado e detalhista.',
      messages: [
        { type: 'ai', text: 'Bem-vindo à Lux. Buscando o imóvel dos seus sonhos?' },
        { type: 'user', text: 'Procuro cobertura no Itaim.' },
        { type: 'ai', text: 'Excelente escolha. Temos 3 opções exclusivas com vista definitiva. Deseja receber o catálogo via PDF?' }
      ]
    }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const testConnection = async () => {
    setWebhookStatus('pending');
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly succeed or fail for demo purposes
    const success = Math.random() > 0.3;
    setWebhookStatus(success ? 'success' : 'error');
    
    if (success) {
      setTimeout(() => setWebhookStatus('idle'), 5000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-brand-line">
        <div>
          <div className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.3em] mb-2">Configuração v4.0</div>
          <h1 className="text-5xl font-display font-bold tracking-tighter leading-none">AJUSTE DO AGENTE.</h1>
          <p className="text-brand-black/40 mt-4 font-medium">Calibre a personalidade e os objetivos da sua inteligência artificial.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">Agente Online</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-brand-line shadow-sm space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-[60px] -z-10" />
            
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] flex items-center gap-2 font-mono">
                <UserCircle size={14} className="text-brand-orange" /> [01] IDENTIFICAÇÃO DO AGENTE
              </label>
              <input
                type="text"
                value={config.name}
                onChange={e => setConfig({ ...config, name: e.target.value })}
                className="w-full px-6 py-4 bg-brand-paper border border-brand-line rounded-2xl text-sm outline-none focus:border-brand-orange/50 transition-all font-medium"
                placeholder="Ex: Consultor Nexus"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] flex items-center gap-2 font-mono">
                <Sparkles size={14} className="text-brand-orange" /> [02] MATRIZ DE PERSONALIDADE
              </label>
              <textarea
                rows={3}
                value={config.personality}
                onChange={e => setConfig({ ...config, personality: e.target.value })}
                className="w-full px-6 py-4 bg-brand-paper border border-brand-line rounded-2xl text-sm outline-none focus:border-brand-orange/50 transition-all resize-none font-medium leading-relaxed"
                placeholder="Como o agente deve se comportar?"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] flex items-center gap-2 font-mono">
                <Target size={14} className="text-brand-orange" /> [03] DIRETRIZ DE OBJETIVO
              </label>
              <textarea
                rows={3}
                value={config.objective}
                onChange={e => setConfig({ ...config, objective: e.target.value })}
                className="w-full px-6 py-4 bg-brand-paper border border-brand-line rounded-2xl text-sm outline-none focus:border-brand-orange/50 transition-all resize-none font-medium leading-relaxed"
                placeholder="O que o agente deve alcançar na conversa?"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] flex items-center gap-2 font-mono">
                <MessageSquare size={14} className="text-brand-orange" /> [04] PROTOCOLOS DE RESPOSTA
              </label>
              <textarea
                rows={6}
                value={config.instructions}
                onChange={e => setConfig({ ...config, instructions: e.target.value })}
                className="w-full px-6 py-4 bg-brand-paper border border-brand-line rounded-2xl text-sm outline-none focus:border-brand-orange/50 transition-all resize-none font-medium leading-relaxed"
                placeholder="Regras específicas, o que dizer e o que não dizer..."
              />
            </div>

            {/* n8n Integration Section */}
            <div className="pt-8 border-t border-brand-line space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] flex items-center gap-2 font-mono">
                  <Zap size={14} className="text-brand-orange" /> [05] INTEGRAÇÃO N8N
                </label>
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {webhookStatus === 'pending' && (
                      <motion.div
                        key="pending"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center gap-2 px-2 py-1 rounded-md bg-brand-paper border border-brand-line"
                      >
                        <Loader2 size={10} className="text-brand-orange animate-spin" />
                        <span className="text-[9px] font-bold text-brand-black/40 uppercase tracking-tighter">Testando...</span>
                      </motion.div>
                    )}
                    {webhookStatus === 'success' && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2 px-2 py-1 rounded-md bg-green-50 border border-green-100"
                      >
                        <CheckCheck size={10} className="text-green-600" />
                        <span className="text-[9px] font-bold text-green-600 uppercase tracking-tighter">Conectado</span>
                      </motion.div>
                    )}
                    {webhookStatus === 'error' && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2 px-2 py-1 rounded-md bg-red-50 border border-red-100"
                      >
                        <AlertCircle size={10} className="text-red-600" />
                        <span className="text-[9px] font-bold text-red-600 uppercase tracking-tighter">Erro de Conexão</span>
                      </motion.div>
                    )}
                    {webhookStatus === 'idle' && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 px-2 py-1 rounded-md bg-indigo-50 border border-indigo-100"
                      >
                        <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-tighter">Webhook Ativo</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={config.n8nWebhook}
                    onChange={e => setConfig({ ...config, n8nWebhook: e.target.value })}
                    className={cn(
                      "w-full pl-12 pr-6 py-4 bg-brand-paper border rounded-2xl text-sm outline-none transition-all font-mono",
                      webhookStatus === 'error' ? "border-red-200 focus:border-red-400 text-red-600" : 
                      webhookStatus === 'success' ? "border-green-200 focus:border-green-400 text-green-600" :
                      "border-brand-line focus:border-brand-orange/50 text-indigo-600"
                    )}
                    placeholder="https://seu-n8n.com/webhook/..."
                  />
                  <Link2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/20" />
                </div>
                <p className="text-[10px] text-brand-black/40 font-medium px-2">
                  Cole aqui a URL do Webhook do seu workflow no n8n para processar as mensagens do agente.
                </p>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-indigo-200">
                  <ExternalLink size={14} />
                  ABRIR WORKFLOW N8N
                </button>
                <button 
                  onClick={testConnection}
                  disabled={webhookStatus === 'pending'}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border",
                    webhookStatus === 'pending' ? "bg-brand-paper text-brand-black/20 border-brand-line cursor-not-allowed" :
                    webhookStatus === 'error' ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" :
                    webhookStatus === 'success' ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100" :
                    "bg-brand-paper hover:bg-brand-line text-brand-black/60 border-brand-line"
                  )}
                >
                  {webhookStatus === 'pending' ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "TESTAR CONEXÃO"
                  )}
                </button>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={cn(
                  "w-full py-5 rounded-3xl font-bold text-lg transition-all flex items-center justify-center gap-3 group relative overflow-hidden",
                  isSaving ? "bg-brand-paper text-brand-black/20" : "bg-brand-orange text-white hover:shadow-xl hover:shadow-brand-orange/20 active:scale-[0.98]"
                )}
              >
                {isSaving ? (
                  <div className="w-6 h-6 border-2 border-brand-black/10 border-t-brand-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={22} className="group-hover:rotate-12 transition-transform" />
                    ATUALIZAR MATRIZ DE IA
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          {/* Scenario Selector */}
          <div className="flex flex-wrap gap-2 p-1 bg-brand-paper border border-brand-line rounded-2xl">
            {scenarios.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveScenario(i)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeScenario === i 
                    ? "bg-brand-black text-white shadow-lg" 
                    : "text-brand-black/40 hover:bg-brand-line hover:text-brand-black"
                )}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>

          {/* WhatsApp Simulation */}
          <div className="bg-[#E5DDD5] rounded-[40px] overflow-hidden shadow-2xl border border-brand-line flex flex-col h-[600px] lg:h-[700px] relative">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] p-4 flex items-center justify-between text-white shrink-0 z-20 shadow-md">
              <div className="flex items-center gap-3">
                <ArrowLeft size={20} className="cursor-pointer" />
                <div className="relative">
                  <div className="w-10 h-10 bg-brand-paper rounded-full flex items-center justify-center text-brand-black overflow-hidden border border-white/20">
                    <UserCircle size={32} className="text-gray-400" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#075E54] rounded-full" />
                </div>
                <div>
                  <div className="font-bold text-sm leading-tight">{scenarios[activeScenario].name}</div>
                  <div className="text-[10px] opacity-80">ativo</div>
                </div>
              </div>
              <div className="flex items-center gap-5 opacity-90">
                <Video size={18} className="cursor-pointer hover:opacity-100" />
                <Phone size={18} className="cursor-pointer hover:opacity-100" />
                <MoreVertical size={18} className="cursor-pointer hover:opacity-100" />
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#E5DDD5] relative custom-scrollbar">
              {/* Subtle WhatsApp Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />
              
              <div className="relative z-10 space-y-4">
                {/* Date Separator */}
                <div className="flex justify-center my-6">
                  <div className="bg-[#D1E4F0] px-4 py-1.5 rounded-lg text-[10px] text-brand-black/60 font-bold uppercase tracking-widest shadow-sm">
                    Hoje
                  </div>
                </div>

                {/* Encryption Notice */}
                <div className="flex justify-center">
                  <div className="bg-[#FEF2CB] px-4 py-2 rounded-xl text-[11px] text-brand-black/70 flex items-center gap-2 shadow-sm max-w-[90%] text-center leading-tight border border-black/5">
                    <Lock size={12} className="shrink-0" />
                    As mensagens e chamadas desta conversa estão agora seguras com criptografia de ponta a ponta. Toque para obter mais informações.
                  </div>
                </div>

                <AnimatePresence mode="popLayout">
                  {scenarios[activeScenario].messages.map((msg, idx) => (
                    <motion.div
                      key={`${activeScenario}-${idx}`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: idx * 0.15 }}
                      className={cn("flex", msg.type === 'ai' ? "justify-start" : "justify-end")}
                    >
                      <div className={cn(
                        "p-3 rounded-xl shadow-sm max-w-[85%] relative border border-black/5",
                        msg.type === 'ai' ? "bg-white rounded-tl-none" : "bg-[#DCF8C6] rounded-tr-none"
                      )}>
                        {/* WhatsApp Tail */}
                        {msg.type === 'ai' ? (
                          <svg className="absolute top-0 -left-2" width="8" height="13" viewBox="0 0 8 13">
                            <path d="M1.533 3.568L8 0v13L1.533 3.568z" fill="white" />
                          </svg>
                        ) : (
                          <svg className="absolute top-0 -right-2" width="8" height="13" viewBox="0 0 8 13">
                            <path d="M6.467 3.568L0 0v13L6.467 3.568z" fill="#DCF8C6" />
                          </svg>
                        )}
                        <div className="text-sm text-brand-black leading-relaxed pr-8">
                          {msg.text}
                        </div>
                        <div className={cn("flex items-center gap-1 mt-1", msg.type === 'ai' ? "justify-end" : "justify-end")}>
                          <span className="text-[9px] text-brand-black/40 font-medium">
                            {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
                          </span>
                          {msg.type === 'user' && <CheckCheck size={13} className="text-[#34B7F1]" strokeWidth={2.5} />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* WhatsApp Footer */}
            <div className="p-3 bg-[#F0F0F0] flex items-center gap-3 shrink-0 z-20">
              <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2.5 gap-3 shadow-sm border border-black/5">
                <Smile size={24} className="text-gray-500 cursor-pointer hover:text-gray-700" />
                <div className="flex-1 text-sm text-gray-400 font-medium">Mensagem</div>
                <Paperclip size={22} className="text-gray-500 -rotate-45 cursor-pointer hover:text-gray-700" />
                <Camera size={22} className="text-gray-500 cursor-pointer hover:text-gray-700" />
              </div>
              <div className="w-12 h-12 bg-[#075E54] rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform cursor-pointer">
                <Mic size={22} />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="bg-green-500 text-white p-6 rounded-3xl shadow-xl shadow-green-500/20 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">Configurações Salvas!</div>
                  <div className="text-xs text-white/80">O Agente foi recalibrado com sucesso.</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
