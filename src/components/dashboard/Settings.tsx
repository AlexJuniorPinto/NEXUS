import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard, 
  Globe, 
  Shield, 
  Save,
  ChevronRight,
  LogOut,
  Zap,
  Check,
  ShieldAlert,
  RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatePresence } from 'framer-motion';

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const sections = [
    { id: 'profile', label: 'Perfil', icon: User, desc: 'Informações pessoais e avatar' },
    { id: 'account', label: 'Conta & Plano', icon: CreditCard, desc: 'Assinatura e faturamento' },
    { id: 'notifications', label: 'Notificações', icon: Bell, desc: 'Alertas e comunicações' },
    { id: 'security', label: 'Segurança', icon: Shield, desc: 'Senha e autenticação' },
    { id: 'compliance', label: 'LGPD & Compliance', icon: ShieldAlert, desc: 'Privacidade e RoPA' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-brand-line">
        <div>
          <div className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.3em] mb-2">System Preferences v2.0</div>
          <h1 className="text-5xl font-display font-bold tracking-tighter leading-none">CONFIGURAÇÕES.</h1>
          <p className="text-brand-black/40 mt-4 font-medium">Gerencie sua identidade, segurança e preferências globais.</p>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-paper/50 border border-brand-line rounded-[40px] p-8 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-start gap-4 px-6 py-5 rounded-[24px] text-left transition-all duration-300 group relative overflow-hidden",
                  activeSection === section.id 
                    ? "bg-brand-black text-white shadow-2xl shadow-brand-black/20" 
                    : "text-brand-black/50 hover:bg-brand-black/5 hover:text-brand-black"
                )}
              >
                <div className={cn(
                  "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  activeSection === section.id ? "bg-brand-orange text-white" : "bg-brand-black/5 text-brand-black/30 group-hover:bg-brand-black/10"
                )}>
                  <section.icon size={20} />
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-sm tracking-tight">{section.label}</div>
                  <div className={cn(
                    "text-[10px] font-medium leading-none",
                    activeSection === section.id ? "text-white/40" : "text-brand-black/30"
                  )}>{section.desc}</div>
                </div>
                {activeSection === section.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <ChevronRight size={16} className="text-brand-orange" />
                  </motion.div>
                )}
              </button>
            ))}
            
            <div className="pt-6 mt-6 border-t border-brand-line">
              <button className="w-full flex items-center gap-4 px-6 py-4 rounded-[24px] font-bold text-sm text-red-500 hover:bg-red-50 transition-all group">
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                  <LogOut size={18} />
                </div>
                Sair da Conta
              </button>
            </div>
          </div>

          <div className="bg-brand-black p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 blur-[60px] rounded-full" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center shadow-lg shadow-brand-orange/20">
                <Zap size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-display font-bold tracking-tight">CENTRAL DE AJUDA</h4>
                <p className="text-xs text-white/40 leading-relaxed">Precisa de suporte técnico ou consultoria em LGPD? Nossa equipe está disponível 24/7.</p>
              </div>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all">
                ABRIR CHAMADO
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[40px] border border-brand-line shadow-sm overflow-hidden min-h-[600px] flex flex-col">
            <div className="p-10 md:p-14 flex-1">
              <AnimatePresence mode="wait">
                {activeSection === 'profile' && (
                  <motion.div 
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b border-brand-line">
                      <div className="relative group">
                        <div className="w-32 h-32 bg-brand-paper rounded-[40px] flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden">
                          <img 
                            src="https://picsum.photos/seed/user123/400/400" 
                            alt="Avatar" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-orange text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
                          <Globe size={18} />
                        </button>
                      </div>
                      <div className="text-center sm:text-left space-y-2">
                        <h3 className="text-3xl font-display font-bold tracking-tight">SEU PERFIL</h3>
                        <p className="text-sm text-brand-black/40 font-medium">Esta identidade será visível para sua equipe e nos relatórios gerados.</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="px-3 py-1 bg-brand-paper rounded-full text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">ID: NEX-8234</span>
                          <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Status: Ativo</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">NOME COMPLETO</label>
                        <input 
                          type="text" 
                          defaultValue="Admin Nexus"
                          className="w-full px-6 py-4 bg-brand-paper/50 border border-brand-line rounded-2xl text-sm font-medium outline-none focus:border-brand-orange/50 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">EMAIL PROFISSIONAL</label>
                        <input 
                          type="email" 
                          defaultValue="admin@nexus-ai.com"
                          className="w-full px-6 py-4 bg-brand-paper/50 border border-brand-line rounded-2xl text-sm font-medium outline-none focus:border-brand-orange/50 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-3 sm:col-span-2">
                        <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">BIO / CARGO CORPORATIVO</label>
                        <input 
                          type="text" 
                          defaultValue="Diretor de Operações Estratégicas"
                          className="w-full px-6 py-4 bg-brand-paper/50 border border-brand-line rounded-2xl text-sm font-medium outline-none focus:border-brand-orange/50 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'account' && (
                  <motion.div 
                    key="account"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="p-8 bg-brand-black text-white rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/20 blur-[60px] rounded-full" />
                      <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-brand-orange text-white rounded-2xl flex items-center justify-center shadow-xl shadow-brand-orange/20">
                          <Zap size={32} />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] mb-1">PLANO ATUAL</div>
                          <h4 className="text-2xl font-display font-bold tracking-tight">NEXUS PRO</h4>
                          <p className="text-xs text-white/40">Renovação automática em 12 de Abril, 2026</p>
                        </div>
                      </div>
                      <button className="px-6 py-3 bg-white text-brand-black rounded-xl text-xs font-bold hover:bg-brand-paper transition-all active:scale-95 relative z-10">
                        UPGRADE PLANO
                      </button>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">MÉTODO DE PAGAMENTO PADRÃO</h4>
                      <div className="flex items-center justify-between p-6 bg-brand-paper/50 border border-brand-line rounded-[24px] group hover:border-brand-black transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-9 bg-white border border-brand-line rounded-lg flex items-center justify-center text-[10px] font-bold shadow-sm">VISA</div>
                          <div className="space-y-0.5">
                            <span className="text-sm font-bold block tracking-tight">•••• •••• •••• 4242</span>
                            <span className="text-[10px] text-brand-black/40 font-medium uppercase">Expira em 12/28</span>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-brand-black/20 group-hover:text-brand-black transition-colors" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="p-6 bg-brand-paper/30 border border-brand-line rounded-[24px] space-y-2">
                        <div className="text-[10px] text-brand-black/30 font-bold uppercase tracking-widest font-mono">ÚLTIMA FATURA</div>
                        <div className="text-xl font-display font-bold">R$ 297,00</div>
                        <button className="text-[10px] font-bold text-brand-orange hover:underline uppercase tracking-widest">Download PDF</button>
                      </div>
                      <div className="p-6 bg-brand-paper/30 border border-brand-line rounded-[24px] space-y-2">
                        <div className="text-[10px] text-brand-black/30 font-bold uppercase tracking-widest font-mono">CONSUMO API</div>
                        <div className="text-xl font-display font-bold">82% / 10k</div>
                        <div className="w-full h-1 bg-brand-black/5 rounded-full overflow-hidden">
                          <div className="w-[82%] h-full bg-brand-orange" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'notifications' && (
                  <motion.div 
                    key="notifications"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <h4 className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">PREFERÊNCIAS DE ALERTA EM TEMPO REAL</h4>
                    <div className="space-y-2">
                      {[
                        { label: 'Novos Leads Qualificados', desc: 'Receba um alerta instantâneo quando a IA fechar um lead de alta prioridade.' },
                        { label: 'Relatórios de Performance', desc: 'Resumo analítico semanal enviado diretamente para seu email.' },
                        { label: 'Alertas de Conectividade', desc: 'Notificações críticas sobre o status da API do WhatsApp e integração.' },
                        { label: 'Novidades & Updates', desc: 'Fique por dentro das novas funcionalidades e modelos de IA disponíveis.' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-brand-paper/30 border border-brand-line rounded-[24px] hover:bg-brand-paper/50 transition-colors">
                          <div className="space-y-1">
                            <p className="font-bold text-sm tracking-tight">{item.label}</p>
                            <p className="text-xs text-brand-black/40 font-medium leading-relaxed max-w-sm">{item.desc}</p>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer group">
                            <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                            <div className="w-12 h-6 bg-brand-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-orange"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeSection === 'security' && (
                  <motion.div 
                    key="security"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="grid gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">SENHA ATUAL</label>
                        <div className="relative">
                          <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-brand-paper/50 border border-brand-line rounded-2xl text-sm font-medium outline-none focus:border-brand-orange/50 transition-all" />
                          <Lock size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-black/20" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">NOVA SENHA</label>
                          <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-brand-paper/50 border border-brand-line rounded-2xl text-sm font-medium outline-none focus:border-brand-orange/50 transition-all" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">CONFIRMAR SENHA</label>
                          <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-brand-paper/50 border border-brand-line rounded-2xl text-sm font-medium outline-none focus:border-brand-orange/50 transition-all" />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-red-50 rounded-[32px] border border-red-100 space-y-4">
                      <div className="flex items-center gap-3 text-red-600">
                        <Shield size={20} />
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] font-mono">ZONA DE SEGURANÇA CRÍTICA</h4>
                      </div>
                      <p className="text-xs text-red-900/60 leading-relaxed font-medium">Ao excluir sua conta, todos os dados de leads, configurações de agentes e históricos de conversas serão permanentemente removidos de nossos servidores em conformidade com a LGPD.</p>
                      <button className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors border-b border-red-500/20 pb-1">
                        EXCLUIR MINHA CONTA PERMANENTEMENTE
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'compliance' && (
                  <motion.div 
                    key="compliance"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div>
                      <h4 className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono mb-6">REGISTRO DE OPERAÇÕES (RoPA)</h4>
                      <div className="bg-brand-paper/30 border border-brand-line rounded-[32px] overflow-hidden">
                        {[
                          { label: 'Dados Processados', value: 'Nome, Telefone, Histórico de Chat, Intenção de Compra' },
                          { label: 'Base Legal', value: 'Execução de Contrato / Consentimento Explícito' },
                          { label: 'Retenção de Dados', value: '5 anos após encerramento da conta' },
                          { label: 'DPO Responsável', value: 'dpo@nexus-ai.com' },
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 border-b border-brand-line last:border-0 hover:bg-brand-paper/50 transition-colors">
                            <span className="text-xs font-bold text-brand-black/60 uppercase tracking-widest">{item.label}</span>
                            <span className="text-sm font-medium text-brand-black/40 mt-1 sm:mt-0">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100 flex flex-col sm:flex-row gap-6">
                      <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                        <Shield size={28} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-display font-bold text-blue-900 tracking-tight">MONITORAMENTO ATIVO ANPD</p>
                        <p className="text-xs text-blue-800/70 leading-relaxed font-medium">
                          Em conformidade com a Resolução 15/2024 da ANPD, qualquer incidente de segurança será notificado aos titulares e à autoridade competente em até 3 dias úteis.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 py-4 bg-brand-paper rounded-2xl text-xs font-bold hover:bg-brand-black hover:text-white transition-all duration-300 uppercase tracking-widest">
                        Exportar Relatório LGPD
                      </button>
                      <button className="flex-1 py-4 bg-brand-paper rounded-2xl text-xs font-bold hover:bg-brand-black hover:text-white transition-all duration-300 uppercase tracking-widest">
                        Termos de Uso & DPA
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Save Button Footer */}
            <div className="px-10 py-8 bg-brand-paper/30 border-t border-brand-line flex items-center justify-between">
              <div className="hidden sm:block">
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest"
                    >
                      <Check size={16} />
                      Alterações salvas com sucesso
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={cn(
                  "px-10 py-4 rounded-2xl font-bold transition-all flex items-center gap-3 min-w-[200px] justify-center",
                  isSaving ? "bg-brand-black/10 text-brand-black/20" : "bg-brand-orange text-white hover:shadow-2xl hover:shadow-brand-orange/30 active:scale-95"
                )}
              >
                {isSaving ? (
                  <RefreshCw size={20} className="animate-spin" />
                ) : (
                  <>
                    <Save size={20} />
                    SALVAR ALTERAÇÕES
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
