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
      <div className="max-w-2xl mx-auto text-center py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[48px] border border-brand-black/5 shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Conformidade Garantida</h2>
          <p className="text-brand-black/50 mb-8">
            Seus termos foram assinados digitalmente e registrados em nosso sistema de auditoria.
          </p>
          
          <div className="bg-brand-paper rounded-3xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-brand-black/5 pb-3">
              <span className="text-brand-black/40 font-bold uppercase tracking-widest">Status</span>
              <span className="text-green-600 font-bold">ASSINADO</span>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-brand-black/5 pb-3">
              <span className="text-brand-black/40 font-bold uppercase tracking-widest">Timestamp</span>
              <span className="font-mono">{format(new Date(), "dd/MM/yyyy HH:mm:ss", { locale: ptBR })}</span>
            </div>
            <div className="flex items-center justify-between text-xs border-b border-brand-black/5 pb-3">
              <span className="text-brand-black/40 font-bold uppercase tracking-widest">Endereço IP</span>
              <span className="font-mono">{userIp}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-brand-black/40 font-bold uppercase tracking-widest">ID da Transação</span>
              <span className="font-mono text-[10px]">AUTH-NEXUS-{Math.random().toString(36).substring(7).toUpperCase()}</span>
            </div>
          </div>

          <button className="mt-10 text-brand-orange font-bold text-sm hover:underline">
            Baixar Cópia dos Termos (PDF)
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-orange/10 rounded-lg border border-brand-orange/20">
            <ShieldCheck size={12} className="text-brand-orange" />
            <span className="text-[9px] font-mono font-bold text-brand-orange uppercase tracking-[0.2em]">SECURITY_PROTOCOL_v4.0</span>
          </div>
        </div>
        <h1 className="text-5xl font-display font-black tracking-tighter leading-none mb-4 uppercase italic">Legal & Compliance.</h1>
        <p className="text-brand-black/40 font-medium max-w-md">Para utilizar o Agente de IA, você deve aceitar os termos de processamento de dados e segurança.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-12 rounded-[48px] border border-brand-line shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-brand-paper rounded-2xl flex items-center justify-center text-brand-orange shadow-sm border border-brand-line">
                <FileText size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-bold tracking-tight uppercase">Termos de Serviço e DPA</h3>
                <p className="text-[10px] font-mono font-bold text-brand-black/30 uppercase tracking-widest">LEGAL_DOCUMENTATION_REF_8240</p>
              </div>
            </div>
            
            <div className="prose prose-sm max-h-[400px] overflow-y-auto pr-6 mb-12 text-brand-black/60 leading-relaxed font-medium scrollbar-thin scrollbar-thumb-brand-line scrollbar-track-transparent">
              <h4 className="text-brand-black font-bold uppercase tracking-tight text-lg">1. Objeto</h4>
              <p>Estes termos regem o uso da plataforma NEXUS AI e o processamento de dados pessoais de seus leads via WhatsApp.</p>
              
              <h4 className="text-brand-black font-bold uppercase tracking-tight text-lg mt-8">2. Processamento de Dados (DPA)</h4>
              <p>A NEXUS atua como operadora de dados, processando informações sob instrução do cliente (Controlador). Comprometemo-nos com o sigilo total e conformidade com a LGPD.</p>
              
              <h4 className="text-brand-black font-bold uppercase tracking-tight text-lg mt-8">3. Segurança</h4>
              <p>Implementamos criptografia de ponta a ponta e isolamento de banco de dados por tenant (multi-tenancy).</p>
              
              <p className="mt-8 p-4 bg-brand-paper rounded-2xl border border-brand-line italic text-brand-black/40">Ao assinar este documento, você declara estar ciente de todas as responsabilidades legais envolvidas no atendimento automatizado.</p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-4 p-6 rounded-[32px] border border-brand-line hover:bg-brand-paper transition-all cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-lg border-brand-line text-brand-orange focus:ring-brand-orange/20 transition-all cursor-pointer"
                    checked={consentItems.tos}
                    onChange={e => setConsentItems(prev => ({ ...prev, tos: e.target.checked }))}
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-lg group-hover:text-brand-orange transition-colors uppercase tracking-tight">Aceito os Termos de Serviço</div>
                  <div className="text-xs text-brand-black/40 font-medium font-mono uppercase tracking-widest mt-1">READ_AND_ACKNOWLEDGED_TOS</div>
                </div>
              </label>

              <label className="flex items-start gap-4 p-6 rounded-[32px] border border-brand-line hover:bg-brand-paper transition-all cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-lg border-brand-line text-brand-orange focus:ring-brand-orange/20 transition-all cursor-pointer"
                    checked={consentItems.dpa}
                    onChange={e => setConsentItems(prev => ({ ...prev, dpa: e.target.checked }))}
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-lg group-hover:text-brand-orange transition-colors uppercase tracking-tight">Assino o Data Processing Agreement (DPA)</div>
                  <div className="text-xs text-brand-black/40 font-medium font-mono uppercase tracking-widest mt-1">LGPD_COMPLIANCE_AUTHORIZED</div>
                </div>
              </label>

              <label className="flex items-start gap-4 p-6 rounded-[32px] border border-brand-line hover:bg-brand-paper transition-all cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-lg border-brand-line text-brand-orange focus:ring-brand-orange/20 transition-all cursor-pointer"
                    checked={consentItems.privacy}
                    onChange={e => setConsentItems(prev => ({ ...prev, privacy: e.target.checked }))}
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-lg group-hover:text-brand-orange transition-colors uppercase tracking-tight">Política de Privacidade</div>
                  <div className="text-xs text-brand-black/40 font-medium font-mono uppercase tracking-widest mt-1">DATA_PROTECTION_POLICY_v2</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[48px] border border-brand-line shadow-sm hover:shadow-xl transition-all flex flex-col">
            <div className="mb-10 space-y-1">
              <h3 className="text-2xl font-display font-bold tracking-tight uppercase">Prova de Autenticidade</h3>
              <p className="text-xs text-brand-black/40 font-medium font-mono uppercase tracking-widest">DIGITAL_FINGERPRINT_LOG</p>
            </div>

            <div className="space-y-8 flex-1">
              <div className="flex items-center gap-5 p-4 rounded-3xl bg-brand-paper/50 border border-brand-line/50">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-black/40 shadow-sm border border-brand-line">
                  <Globe size={22} />
                </div>
                <div>
                  <div className="text-[10px] text-brand-black/40 font-mono font-bold uppercase tracking-[0.2em] mb-1">USER_IP_ADDRESS</div>
                  <div className="text-sm font-mono font-bold text-brand-black">{userIp}</div>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 rounded-3xl bg-brand-paper/50 border border-brand-line/50">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-black/40 shadow-sm border border-brand-line">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="text-[10px] text-brand-black/40 font-mono font-bold uppercase tracking-[0.2em] mb-1">SYSTEM_TIMESTAMP</div>
                  <div className="text-sm font-mono font-bold text-brand-black">{format(new Date(), "dd 'de' MMMM, yyyy", { locale: ptBR })}</div>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 rounded-3xl bg-brand-paper/50 border border-brand-line/50">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-black/40 shadow-sm border border-brand-line">
                  <Fingerprint size={22} />
                </div>
                <div>
                  <div className="text-[10px] text-brand-black/40 font-mono font-bold uppercase tracking-[0.2em] mb-1">OPT_IN_SOURCE</div>
                  <div className="text-sm font-mono font-bold text-brand-black uppercase">PORTAL_CLIENTE_v1</div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-brand-line">
              <button
                disabled={!allChecked || isSigning}
                onClick={handleSign}
                className={cn(
                  "w-full py-6 rounded-[32px] font-display font-bold text-xl transition-all flex items-center justify-center gap-3 uppercase tracking-tight",
                  allChecked && !isSigning
                    ? "bg-brand-black text-white hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/20 active:scale-95"
                    : "bg-brand-paper text-brand-black/20 cursor-not-allowed border border-brand-line"
                )}
              >
                {isSigning ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>PROCESSANDO_PROTOCOLO...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={24} />
                    <span>ASSINAR_DIGITALMENTE</span>
                  </>
                )}
              </button>
              <div className="mt-6 flex items-start gap-3 p-4 bg-brand-orange/5 rounded-2xl border border-brand-orange/10">
                <AlertCircle size={16} className="text-brand-orange shrink-0 mt-0.5" />
                <p className="text-[10px] text-brand-orange/70 font-mono font-bold leading-relaxed uppercase tracking-wider">
                  ESTA AÇÃO TEM VALIDADE JURÍDICA EQUIVALENTE A UMA ASSINATURA MANUSCRITA SOB O PROTOCOLO DE SEGURANÇA NEXUS_SEC_2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
