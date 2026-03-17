import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, Users, ShieldCheck, Settings, X, Cpu, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tab: string) => void;
}

const items = [
  { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard, category: 'Navegação' },
  { id: 'agent-config', label: 'Configurar Agente', icon: Cpu, category: 'Navegação' },
  { id: 'whatsapp', label: 'Conectar WhatsApp', icon: MessageSquare, category: 'Navegação' },
  { id: 'leads', label: 'Gestão de Leads', icon: Users, category: 'Navegação' },
  { id: 'compliance', label: 'Legal & Compliance', icon: ShieldCheck, category: 'Navegação' },
  { id: 'settings', label: 'Configurações', icon: Settings, category: 'Navegação' },
];

export default function CommandPalette({ isOpen, onClose, onSelect }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      if (filteredItems[selectedIndex]) {
        onSelect(filteredItems[selectedIndex].id);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/20 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-[32px] shadow-2xl z-[101] overflow-hidden border border-brand-black/10"
          >
            <div className="p-6 border-b border-brand-line flex items-center gap-4 bg-brand-paper/30">
              <Search className="text-brand-orange" size={20} />
              <input
                autoFocus
                placeholder="EXECUTAR COMANDO..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-mono font-bold placeholder:text-brand-black/20 uppercase tracking-widest"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-brand-black/5 rounded-lg text-[9px] font-mono font-bold text-brand-black/40">ESC</div>
                <button onClick={onClose} className="p-2 hover:bg-brand-black hover:text-white rounded-xl transition-all">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="p-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-brand-paper rounded-2xl flex items-center justify-center mx-auto text-brand-black/20">
                    <Search size={24} />
                  </div>
                  <p className="text-[10px] font-mono font-bold text-brand-black/40 uppercase tracking-[0.2em]">
                    Nenhum comando encontrado para: <span className="text-brand-orange">"{query}"</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.id)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-left group relative overflow-hidden",
                        index === selectedIndex 
                          ? "bg-brand-black text-white shadow-xl shadow-brand-black/20" 
                          : "hover:bg-brand-paper"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        index === selectedIndex ? "bg-brand-orange text-white" : "bg-brand-black/5 text-brand-black/30 group-hover:bg-brand-black/10"
                      )}>
                        <item.icon size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm tracking-tight uppercase">{item.label}</span>
                        <span className={cn(
                          "text-[9px] font-mono uppercase tracking-widest mt-0.5",
                          index === selectedIndex ? "text-white/40" : "text-brand-black/20"
                        )}>{item.id.replace('-', '_')}.sys</span>
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <span className={cn(
                          "text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-lg border",
                          index === selectedIndex 
                            ? "bg-white/10 border-white/10 text-white/60" 
                            : "bg-brand-black/5 border-brand-black/5 text-brand-black/30"
                        )}>
                          {item.category}
                        </span>
                        {index === selectedIndex && (
                          <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-brand-paper/50 border-t border-brand-line flex items-center justify-between text-[9px] text-brand-black/40 font-mono font-bold uppercase tracking-[0.2em]">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-brand-black/5 rounded border border-brand-black/5">↑↓</span>
                  <span>NAVEGAR</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-brand-black/5 rounded border border-brand-black/5">ENTER</span>
                  <span>EXECUTAR</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-brand-black/5 rounded border border-brand-black/5">ESC</span>
                <span>FECHAR</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
