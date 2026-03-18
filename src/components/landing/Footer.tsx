import React from 'react';
import { Bot } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-brand-black/5 bg-white font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-orange rounded flex items-center justify-center">
            <Bot className="text-white w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg tracking-tighter">NEXUS</span>
        </div>
        <div className="text-[10px] text-brand-black/30 uppercase tracking-widest font-bold text-center md:text-left">
          © {new Date().getFullYear()} NEXUS AI • Automação Inteligente
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-xs font-bold text-brand-black/40 hover:text-brand-orange transition-colors">Termos</a>
          <a href="#" className="text-xs font-bold text-brand-black/40 hover:text-brand-orange transition-colors">Privacidade</a>
        </div>
      </div>
    </footer>
  );
}
