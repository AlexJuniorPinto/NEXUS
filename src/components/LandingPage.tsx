import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, Zap, BarChart3, ShieldCheck, Menu, X, ChevronDown, MessageCircle, CheckCheck, Lock, Mic } from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onAuth: (mode: 'login' | 'signup') => void;
}

export default function LandingPage({ onAuth }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeScenario, setActiveScenario] = useState(0);

  const scenarios = [
    {
      id: 'agendamento',
      label: 'Agendamento',
      icon: <Zap size={14} />,
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
      icon: <BarChart3 size={14} />,
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
      icon: <ShieldCheck size={14} />,
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
      icon: <ArrowRight size={14} />,
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

  return (
    <div className="min-h-screen bg-brand-paper selection:bg-brand-orange selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between bg-white/40 backdrop-blur-md border border-white/20 rounded-full px-6 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-7 h-7 bg-brand-black rounded-lg flex items-center justify-center transition-transform group-hover:rotate-3">
                <Bot className="text-brand-orange w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-tighter uppercase">NEXUS</span>
            </div>
            <div className="h-4 w-px bg-brand-black/10 mx-1" />
            <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-green-500">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">Status: Live</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onAuth('login')}
              className="bg-brand-black text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-all active:scale-95 shadow-lg shadow-brand-black/10"
            >
              Portal do Cliente
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-4 md:hidden border border-brand-black/5"
            >
              <button 
                onClick={() => { onAuth('login'); setIsMenuOpen(false); }}
                className="w-full bg-brand-paper text-brand-black py-4 rounded-2xl font-bold"
              >
                Portal do Cliente
              </button>
              <button 
                onClick={() => { onAuth('signup'); setIsMenuOpen(false); }}
                className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold"
              >
                Começar Agora
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-orange/10 blur-[160px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[140px] rounded-full"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-line shadow-sm text-brand-orange text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
            >
              <Zap className="w-3 h-3 fill-current" />
              Agente de IA de Próxima Geração
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-[120px] font-display font-bold leading-[0.85] tracking-tighter mb-10 max-w-5xl"
            >
              O ATENDIMENTO <br className="hidden md:block" />
              <span className="text-brand-orange italic font-serif font-medium">inteligente</span> <br className="hidden md:block" />
              NO PILOTO AUTOMÁTICO.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-brand-black/50 max-w-2xl mb-12 font-medium leading-tight"
            >
              Qualifique leads, agende serviços e recupere vendas 24/7 com o Agente de IA que entende seu negócio.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center w-full"
            >
              <button 
                onClick={() => onAuth('signup')}
                className="btn-primary text-lg px-12 py-6 flex items-center justify-center gap-4 group shadow-2xl shadow-brand-orange/40"
              >
                Testar o Agente na Prática
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="relative max-w-6xl mx-auto"
          >
            {/* Main App Preview Container */}
            <div className="relative group">
              {/* Impeccable Gradient Design */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-brand-orange/30 via-transparent to-indigo-500/30 blur-[120px] opacity-40 group-hover:opacity-70 transition-opacity duration-1000 -z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,99,33,0.1)_0%,transparent_70%)] blur-3xl -z-20"></div>
              
              <div className="relative glass rounded-[48px] p-3 shadow-[0_32px_128px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden">
                <div className="aspect-[16/10] bg-[#FDFDFD] rounded-[40px] overflow-hidden relative border border-brand-line shadow-inner">
                  {/* Dashboard Mockup Content */}
                  <div className="absolute inset-0 flex flex-col">
                    {/* Mock Header */}
                    <div className="h-12 border-b border-brand-line flex items-center px-6 gap-4 bg-white/50">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/20" />
                      </div>
                      <div className="h-5 w-48 bg-brand-black/5 rounded-full" />
                    </div>
                    
                    {/* Mock Body */}
                    <div className="flex-1 p-8 flex gap-8">
                      {/* Sidebar Mock */}
                      <div className="w-48 space-y-4">
                        <div className="h-8 bg-brand-black/5 rounded-2xl w-full" />
                        <div className="h-8 bg-brand-black/5 rounded-2xl w-4/5" />
                        <div className="h-8 bg-brand-black/5 rounded-2xl w-full" />
                        <div className="h-8 bg-brand-black/5 rounded-2xl w-3/4" />
                      </div>
                      
                      {/* Content Mock */}
                      <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-24 bg-brand-black/5 rounded-3xl" />
                          <div className="h-24 bg-brand-black/5 rounded-3xl" />
                          <div className="h-24 bg-brand-black/5 rounded-3xl" />
                        </div>
                        <div className="h-64 bg-brand-black/5 rounded-[32px] w-full" />
                      </div>
                    </div>
                  </div>

                  {/* Improved WhatsApp Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-black/5 backdrop-blur-[2px] p-4">
                    {/* Scenario Selector */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-md relative z-20">
                      {scenarios.map((s, i) => (
                        <button
                          key={s.id}
                          onClick={() => setActiveScenario(i)}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                            activeScenario === i 
                              ? "bg-brand-black text-white border-brand-black shadow-lg" 
                              : "bg-white/80 text-brand-black/40 border-brand-line hover:bg-white hover:text-brand-black"
                          )}
                        >
                          <div className="flex items-center gap-2">
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
                      className="w-full max-w-sm bg-[#E5DDD5] rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-white/40 overflow-hidden flex flex-col h-[420px] relative"
                    >
                      {/* WhatsApp Background Pattern */}
                      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />
                      
                      {/* WhatsApp Header */}
                      <div className="bg-[#075E54] p-4 flex items-center justify-between text-white shrink-0 relative z-10 shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/10">
                            <Bot className="text-white w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-sm font-bold leading-none">{scenarios[activeScenario].name}</div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-[10px] opacity-80 font-medium">Online</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 opacity-70">
                          <div className="w-4 h-4 rounded-full border-2 border-white/40" />
                          <div className="w-4 h-4 rounded-full border-2 border-white/40" />
                        </div>
                      </div>

                      {/* Chat Area */}
                      <div className="flex-1 p-6 space-y-4 relative z-10 overflow-y-auto custom-scrollbar">
                        {/* Date Tag */}
                        <div className="flex justify-center mb-6">
                          <div className="bg-[#D1E9F9] px-4 py-1 rounded-lg text-[10px] font-bold text-brand-black/50 uppercase tracking-widest shadow-sm">
                            Hoje
                          </div>
                        </div>

                        <AnimatePresence mode="popLayout">
                          {scenarios[activeScenario].messages.map((msg, idx) => (
                            <motion.div
                              key={`${activeScenario}-${idx}`}
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: idx * 0.2 }}
                              className={cn("flex", msg.type === 'ai' ? "justify-start" : "justify-end")}
                            >
                              <div className={cn(
                                "p-4 rounded-2xl shadow-sm max-w-[85%] relative border border-black/5",
                                msg.type === 'ai' ? "bg-white rounded-tl-none" : "bg-[#DCF8C6] rounded-tr-none"
                              )}>
                                <div className="text-xs text-brand-black leading-relaxed">
                                  {msg.text}
                                </div>
                                <div className={cn("flex items-center gap-1 mt-1.5", msg.type === 'ai' ? "justify-end" : "justify-end")}>
                                  <span className="text-[9px] text-brand-black/40 font-medium">
                                    14:{30 + idx}
                                  </span>
                                  {msg.type === 'user' && <CheckCheck size={12} className="text-[#34B7F1]" strokeWidth={3} />}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* WhatsApp Footer */}
                      <div className="p-4 bg-[#F0F0F0] flex items-center gap-3 shrink-0 relative z-10">
                        <div className="flex-1 bg-white rounded-full flex items-center px-5 py-3 gap-3 shadow-sm border border-black/5">
                          <div className="flex-1 text-xs text-gray-400">Digite uma mensagem...</div>
                        </div>
                        <div className="w-12 h-12 bg-[#075E54] rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
                          <Mic size={20} />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="platform" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] mb-8 tracking-tighter">
                UMA PLATAFORMA <br />
                <span className="text-brand-orange">SEM LIMITES.</span>
              </h2>
              <p className="text-xl text-brand-black/50 mb-12 leading-tight max-w-md">
                Desenvolvemos a tecnologia mais avançada para que você possa focar no que realmente importa: crescer seu negócio.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: 'Qualificação Inteligente', desc: 'Nossa IA filtra leads curiosos e foca em quem realmente quer comprar.', icon: Zap },
                  { title: 'Agendamento Direto', desc: 'Integração nativa com sua agenda para marcações sem intervenção humana.', icon: BarChart3 },
                  { title: 'Recuperação de Carrinho', desc: 'Identifica desistências e reativa o cliente com ofertas personalizadas.', icon: ArrowRight },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-brand-paper border border-brand-line flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                      <item.icon className="w-6 h-6 text-brand-orange group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-brand-black/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[60px] bg-brand-paper border border-brand-line overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/tech/800/800" 
                  alt="Technology" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-orange/10 mix-blend-multiply"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-[40px] shadow-2xl border-white/60 max-w-[240px] animate-bounce-slow">
                <div className="text-4xl font-display font-bold text-brand-orange mb-2">99.9%</div>
                <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-[0.2em]">Uptime Garantido</div>
              </div>
            </div>
          </div>

          <div className="bg-brand-black rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-orange blur-[120px] rounded-full"></div>
            </div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[0.9] tracking-tighter">
                PRONTO PARA <br /> QUALQUER <span className="text-brand-orange italic font-serif font-medium">setor.</span>
              </h2>
              <p className="text-lg text-white/50 mb-12 leading-relaxed">
                De restaurantes a clínicas, o NEXUS entende seu negócio e fala a língua do seu cliente. Nossa IA é treinada com dados específicos do seu nicho.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {['Restaurantes', 'Petshops', 'Clínicas', 'Imobiliárias', 'Varejo', 'Educação', 'SaaS'].map((tag) => (
                  <span key={tag} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange hover:border-brand-orange transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
              
              <button 
                onClick={() => onAuth('signup')}
                className="btn-primary bg-white text-brand-black hover:bg-brand-orange hover:text-white px-12 py-6 text-xl"
              >
                Criar meu Agente agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-brand-paper/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-md">
              <h2 className="text-5xl font-display font-bold leading-[0.9] tracking-tighter mb-6">
                DÚVIDAS <br /> <span className="text-brand-orange">FREQUENTES.</span>
              </h2>
              <p className="text-brand-black/50 font-medium">Tudo o que você precisa saber para começar a escalar suas vendas.</p>
            </div>
            <div className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.3em] pb-2 border-b border-brand-line">
              Suporte 24/7 Disponível
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                q: "Como a NEXUS integra com meu WhatsApp?",
                a: "A integração é feita via QR Code oficial, similar ao WhatsApp Web. Em menos de 2 minutos seu agente já está pronto para responder seus clientes."
              },
              {
                q: "Preciso saber programar para configurar a IA?",
                a: "Absolutamente não. Nossa interface é 100% visual e intuitiva. Você treina seu agente conversando com ele em português simples."
              },
              {
                q: "O agente consegue fechar vendas sozinho?",
                a: "Sim! Ele é capaz de qualificar o lead, apresentar seu catálogo, tirar dúvidas técnicas e até enviar links de checkout ou agendar reuniões."
              },
              {
                q: "Meus dados e dos meus clientes estão seguros?",
                a: "Segurança é nossa prioridade. Utilizamos criptografia de nível bancário e estamos em total conformidade com a LGPD. Seus dados são privados e protegidos."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-brand-line rounded-[32px] p-8 hover:border-brand-orange/30 transition-all cursor-default shadow-sm hover:shadow-md"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center justify-between group-hover:text-brand-orange transition-colors">
                  {faq.q}
                  <ChevronDown size={20} className="text-brand-black/20 group-hover:text-brand-orange transition-all duration-300 group-hover:rotate-180" />
                </h3>
                <p className="text-brand-black/50 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 relative">
            <div className="glass p-12 md:p-20 rounded-[60px] border-white/60 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-brand-orange/5 -z-10"></div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tighter">AINDA TEM DÚVIDAS?</h3>
              <p className="text-brand-black/50 mb-12 max-w-md mx-auto font-medium">Nossa equipe técnica está pronta para te ajudar a configurar seu primeiro agente.</p>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-green-500/20 active:scale-95 group"
              >
                <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                Conversar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-brand-black/5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-orange rounded flex items-center justify-center">
              <Bot className="text-white w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg tracking-tighter">NEXUS</span>
          </div>
          <div className="text-[10px] text-brand-black/30 uppercase tracking-widest font-bold">
            © 2026 NEXUS AI • Automação Inteligente
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-xs font-bold text-brand-black/40 hover:text-brand-orange transition-colors">Termos</a>
            <a href="#" className="text-xs font-bold text-brand-black/40 hover:text-brand-orange transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
