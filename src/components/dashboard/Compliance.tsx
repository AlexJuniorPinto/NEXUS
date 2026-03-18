import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, CheckCircle2, Clock, Globe, Fingerprint, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../../lib/utils';

interface SignaturePayload {
  user_ip: string;
  timestamp: string;
  opt_in_source: string;
  consent_type: string[];
}

export default function Compliance() {
  const [isSigned, setIsSigned] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [userIp, setUserIp] = useState('Detectando...');
  const [consentItems, setConsentItems] = useState({
    tos: false,
    dpa: false,
    privacy: false
  });

  useEffect(() => {
    // Simulate IP detection
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => setUserIp('192.168.1.1')); // Fallback
  }, []);

  const handleSign = async () => {
    setIsSigning(true);
    
    const payload: SignaturePayload = {
      user_ip: userIp,
      timestamp: new Date().toISOString(),
      opt_in_source: 'Portal do Cliente',
      consent_type: Object.entries(consentItems)
        .filter(([_, checked]) => checked)
        .map(([key]) => key.toUpperCase())
    };

    // Simulate API Call
    console.log('Enviando payload de compliance:', payload);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSigned(true);
    setIsSigning(false);
  };

  const allChecked = consentItems.tos && consentItems.dpa && consentItems.privacy;

  if (isSigned) {
    return (
      <div className="max-w-2xl mx-auto text-center py-6 md:py-12 px-4 md:px-0 font-sans">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 md:p-12 rounded-[32px] md:rounded-[48px] border border-brand-line shadow-xl"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <CheckCircle2 size={32} md:size={40} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">Conformidade Garantida</h2>
          <p className="text-sm md:text-base text-brand-black/50 mb-8 font-medium">
            Seus termos foram assinados digitalmente e registrados em nosso sistema de auditoria.
          </p>
          
          <div className="bg-brand-paper/50 rounded-2xl md:rounded-3xl p-6 text-left space-y-4 font-mono">
            <div className="flex items-center justify-between text-[10px] md:text-xs border-b border-brand-line pb-3">
              <span className="text-brand-black/40 font-bold uppercase tracking-widest">Status</span>
              <span className="text-green-600 font-bold">ASSINADO</span>
            </div>
            <div className="flex items-center justify-between text-[10px] md:text-xs border-b border-brand-line pb-3">
              <span className="text-brand-black/40 font-bold uppercase tracking-widest">Timestamp</span>
              <span className="font-bold">{format(new Date(), "dd/MM/yyyy HH:mm:ss", { locale: ptBR })}</span>
            </div>
            <div className="flex items-center justify-between text-[10px] md:text-xs border-b border-brand-line pb-3">
              <span className="text-brand-black/40 font-bold uppercase tracking-widest">Endereço IP</span>
              <span className="font-bold">{userIp}</span>
            </div>
            <div className="flex items-center justify-between text-[10px] md:text-xs">
              <span className="text-brand-black/40 font-bold uppercase tracking-widest">Protocolo</span>
              <span className="font-bold truncate max-w-[120px]">AUTH-{Math.random().toString(36).substring(7).toUpperCase()}</span>
            </div>
          </div>

          <button className="mt-8 md:mt-10 text-brand-orange font-bold text-sm hover:underline">
            Baixar Cópia dos Termos (PDF)
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 font-sans">
      <div className="mb-10 md:mb-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-orange/10 rounded-lg border border-brand-orange/20">
            <ShieldCheck size={12} className="text-brand-orange" />
            <span className="text-[9px] font-mono font-bold text-brand-orange uppercase tracking-[0.2em]">PROTOCOL_v4.0</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter leading-none mb-4 uppercase italic">Legal & Compliance.</h1>
        <p className="text-sm md:text-base text-brand-black/40 font-medium max-w-md">Para utilizar o Agente de IA, você deve aceitar os termos de processamento de dados e segurança.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[48px] border border-brand-line shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-paper rounded-2xl flex items-center justify-center text-brand-orange shadow-sm border border-brand-line shrink-0">
                <FileText size={24} md:size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight uppercase">Termos de Serviço e DPA</h3>
                <p className="text-[9px] md:text-[10px] font-mono font-bold text-brand-black/30 uppercase tracking-widest">LEGAL_REFDOC_8240</p>
              </div>
            </div>
            
            <div className="prose prose-sm max-h-[300px] md:max-h-[400px] overflow-y-auto pr-4 md:pr-6 mb-10 md:mb-12 text-brand-black/60 leading-relaxed font-medium scrollbar-thin scrollbar-thumb-brand-line scrollbar-track-transparent">
              <h4 className="text-brand-black font-bold uppercase tracking-tight text-base md:text-lg">1. Objeto</h4>
              <p>Estes termos regem o uso da plataforma NEXUS AI e o processamento de dados pessoais de seus leads via WhatsApp.</p>
              
              <h4 className="text-brand-black font-bold uppercase tracking-tight text-base md:text-lg mt-6 md:mt-8">2. Processamento de Dados (DPA)</h4>
              <p>A NEXUS atua como operadora de dados, processando informações sob instrução do cliente. Comprometemo-nos com o sigilo total e conformidade com a LGPD.</p>
              
              <h4 className="text-brand-black font-bold uppercase tracking-tight text-base md:text-lg mt-6 md:mt-8">3. Segurança</h4>
              <p>Implementamos criptografia de ponta a ponta e isolamento de banco de dados por tenant (multi-tenancy).</p>
              
              <p className="mt-8 p-4 bg-brand-paper/50 rounded-xl md:rounded-2xl border border-brand-line italic text-brand-black/40 text-[11px] md:text-xs">Ao assinar este documento, você declara estar ciente de todas as responsabilidades legais envolvidas no atendimento automatizado.</p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-4 p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-brand-line hover:bg-brand-paper/50 transition-all cursor-pointer group">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 md:w-6 md:h-6 rounded-lg border-brand-line text-brand-orange focus:ring-brand-orange/20 transition-all cursor-pointer"
                    checked={consentItems.tos}
                    onChange={e => setConsentItems(prev => ({ ...prev, tos: e.target.checked }))}
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-base md:text-lg group-hover:text-brand-orange transition-colors uppercase tracking-tight">Aceito os Termos de Serviço</div>
                  <div className="text-[9px] md:text-[10px] text-brand-black/40 font-medium font-mono uppercase tracking-widest mt-0.5">SIGN_ACK_TOS</div>
                </div>
              </label>

              <label className="flex items-start gap-4 p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-brand-line hover:bg-brand-paper/50 transition-all cursor-pointer group">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 md:w-6 md:h-6 rounded-lg border-brand-line text-brand-orange focus:ring-brand-orange/20 transition-all cursor-pointer"
                    checked={consentItems.dpa}
                    onChange={e => setConsentItems(prev => ({ ...prev, dpa: e.target.checked }))}
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-base md:text-lg group-hover:text-brand-orange transition-colors uppercase tracking-tight">Assino o DPA (LGPD)</div>
                  <div className="text-[9px] md:text-[10px] text-brand-black/40 font-medium font-mono uppercase tracking-widest mt-0.5">COMPLIANCE_AUTHORIZED</div>
                </div>
              </label>

              <label className="flex items-start gap-4 p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-brand-line hover:bg-brand-paper/50 transition-all cursor-pointer group">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 md:w-6 md:h-6 rounded-lg border-brand-line text-brand-orange focus:ring-brand-orange/20 transition-all cursor-pointer"
                    checked={consentItems.privacy}
                    onChange={e => setConsentItems(prev => ({ ...prev, privacy: e.target.checked }))}
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-base md:text-lg group-hover:text-brand-orange transition-colors uppercase tracking-tight">Política de Privacidade</div>
                  <div className="text-[9px] md:text-[10px] text-brand-black/40 font-medium font-mono uppercase tracking-widest mt-0.5">PRIVACY_POLICY_v2</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[48px] border border-brand-line shadow-sm hover:shadow-xl transition-all flex flex-col font-mono">
            <div className="mb-8 md:mb-10 space-y-1">
              <h3 className="text-xl md:text-2xl font-display font-bold tracking-tight uppercase">Autenticidade</h3>
              <p className="text-[10px] text-brand-black/30 font-bold uppercase tracking-widest">DIGITAL_CERT_LOG</p>
            </div>

            <div className="space-y-4 md:space-y-6 flex-1">
              <div className="flex items-center gap-4 p-4 rounded-2xl md:rounded-3xl bg-brand-paper/50 border border-brand-line/50">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-brand-black/40 shadow-sm border border-brand-line shrink-0">
                  <Globe size={18} md:size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-[8px] md:text-[9px] text-brand-black/40 font-bold uppercase tracking-[0.2em] mb-1">USER_IP</div>
                  <div className="text-xs md:text-sm font-bold text-brand-black truncate">{userIp}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl md:rounded-3xl bg-brand-paper/50 border border-brand-line/50">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-brand-black/40 shadow-sm border border-brand-line shrink-0">
                  <Clock size={18} md:size={22} />
                </div>
                <div>
                  <div className="text-[8px] md:text-[9px] text-brand-black/40 font-bold uppercase tracking-[0.2em] mb-1">TIME_STAMP</div>
                  <div className="text-xs md:text-sm font-bold text-brand-black">{format(new Date(), "dd/MM/yyyy", { locale: ptBR })}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl md:rounded-3xl bg-brand-paper/50 border border-brand-line/50">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-brand-black/40 shadow-sm border border-brand-line shrink-0">
                  <Fingerprint size={18} md:size={22} />
                </div>
                <div>
                  <div className="text-[8px] md:text-[9px] text-brand-black/40 font-bold uppercase tracking-[0.2em] mb-1">SOURCE_ID</div>
                  <div className="text-xs md:text-sm font-bold text-brand-black uppercase">PORTAL_v1.0</div>
                </div>
              </div>
            </div>

            <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-brand-line">
              <button
                disabled={!allChecked || isSigning}
                onClick={handleSign}
                className={cn(
                  "w-full py-4 md:py-6 rounded-2xl md:rounded-[32px] font-display font-bold text-lg md:text-xl transition-all flex items-center justify-center gap-3 uppercase tracking-tight",
                  allChecked && !isSigning
                    ? "bg-brand-black text-white hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/20 active:scale-95"
                    : "bg-brand-paper text-brand-black/20 cursor-not-allowed border border-brand-line"
                )}
              >
                {isSigning ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={20} md:size={24} />
                    <span>ASSINAR</span>
                  </>
                )}
              </button>
              <div className="mt-6 flex items-start gap-3 p-4 bg-brand-orange/5 rounded-2xl border border-brand-orange/10">
                <AlertCircle size={14} className="text-brand-orange shrink-0 mt-0.5" />
                <p className="text-[8px] md:text-[10px] text-brand-orange/70 font-bold leading-relaxed uppercase tracking-wider">
                  Esta ação tem validade jurídica sob o protocolo NEXUS_SEC_2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
