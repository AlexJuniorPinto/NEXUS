import React from 'react';
import { Bot, Save, Bell, Zap, Sliders } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SettingsProps {
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
}

export default function Settings({ systemPrompt, setSystemPrompt }: SettingsProps) {
  return (
    <div className="max-w-3xl space-y-6 md:space-y-8 font-sans">
      <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-brand-line shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-[60px] -z-10" />
        
        <h3 className="text-xl md:text-2xl font-display font-bold mb-6 flex items-center gap-3 uppercase tracking-tight">
          <Bot className="text-brand-orange" />
          Memória de Sistema
        </h3>
        
        <p className="text-sm text-brand-black/40 mb-8 font-medium leading-relaxed">
          Defina o comportamento base e o conhecimento que o agente Nexus deve utilizar em todas as interações.
        </p>
        
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono block px-1">
            CONTEXT_MATRIZ_PROMPT
          </label>
          <textarea 
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full h-48 md:h-64 bg-brand-paper/50 rounded-2xl md:rounded-[32px] p-6 text-sm leading-relaxed border border-brand-line focus:border-brand-orange/50 transition-all outline-none resize-none font-medium"
            placeholder="Ex: Você é um consultor especializado em..."
          />
        </div>
        
        <div className="mt-8 flex justify-end">
          <button className="bg-brand-black text-white w-full sm:w-auto px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-orange transition-all active:scale-[0.98] shadow-lg shadow-brand-black/10 uppercase text-xs tracking-widest">
            <Save className="w-5 h-5" />
            Salvar Configuração
          </button>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-brand-line shadow-sm">
        <h3 className="text-xl md:text-2xl font-display font-bold mb-8 flex items-center gap-3 uppercase tracking-tight">
          <Sliders className="text-brand-orange" />
          Preferências Globais
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-5 md:p-6 bg-brand-paper/50 rounded-2xl md:rounded-3xl border border-brand-line group hover:border-brand-orange/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center text-brand-orange shadow-sm border border-brand-line shrink-0">
                <Bell size={20} md:size={24} />
              </div>
              <div>
                <div className="font-bold text-sm md:text-base group-hover:text-brand-orange transition-colors">Alertas em Tempo Real</div>
                <div className="text-[10px] md:text-xs text-brand-black/40 font-bold uppercase tracking-widest font-mono mt-1">PUSH_NOTIFICATIONS_ENABLED</div>
              </div>
            </div>
            <div className="w-12 h-6 md:w-14 md:h-7 bg-brand-orange rounded-full relative cursor-pointer shadow-inner">
              <div className="absolute right-1 top-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-md" />
            </div>
          </div>

          <div className="flex items-center justify-between p-5 md:p-6 bg-brand-paper/50 rounded-2xl md:rounded-3xl border border-brand-line group hover:border-brand-orange/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center text-brand-black/30 shadow-sm border border-brand-line shrink-0">
                <Zap size={20} md:size={24} />
              </div>
              <div>
                <div className="font-bold text-sm md:text-base group-hover:text-brand-orange transition-colors">Modo de Aprendizado</div>
                <div className="text-[10px] md:text-xs text-brand-black/40 font-bold uppercase tracking-widest font-mono mt-1">AI_SELF_TRAINING_ACTIVE</div>
              </div>
            </div>
            <div className="w-12 h-6 md:w-14 md:h-7 bg-brand-black/10 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
