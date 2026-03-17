import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  LogOut,
  Bell,
  Bot,
  MessageSquare,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import CommandPalette from './CommandPalette';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

const navItems = [
  { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
  { id: 'agent-config', label: 'Configurar Agente', icon: Cpu },
  { id: 'whatsapp', label: 'Conectar WhatsApp', icon: MessageSquare },
  { id: 'leads', label: 'Gestão de Leads', icon: Users },
  { id: 'compliance', label: 'Legal & Compliance', icon: ShieldCheck },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export default function DashboardLayout({ children, activeTab, setActiveTab, onLogout }: { 
  children: React.ReactNode, 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  onLogout: () => void
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex h-screen bg-[#FDFDFD] text-brand-black overflow-hidden selection:bg-brand-orange/10 selection:text-brand-orange">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-brand-line transition-all duration-500 ease-in-out flex flex-col relative z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        <div className="p-8 flex items-center justify-between">
          <div className={cn("flex items-center gap-3 overflow-hidden transition-all duration-500", isCollapsed ? "opacity-0 w-0 scale-90" : "opacity-100 w-auto scale-100")}>
            <div className="w-10 h-10 bg-brand-black rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-black/20 rotate-3 hover:rotate-0 transition-transform group">
              <Bot className="text-brand-orange w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tighter leading-none">NEXUS</span>
              <span className="text-[9px] font-bold text-brand-black/30 uppercase tracking-[0.3em] mt-1 font-mono">NÚCLEO v2.4</span>
            </div>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl hover:bg-brand-paper transition-all active:scale-90 border border-transparent hover:border-brand-line group"
          >
            {isCollapsed ? <ChevronRight size={18} className="group-hover:text-brand-orange transition-colors" /> : <ChevronLeft size={18} className="group-hover:text-brand-orange transition-colors" />}
          </button>
        </div>

        <div className="px-6 mb-4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-line to-transparent w-full" />
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group relative overflow-hidden",
                activeTab === item.id 
                  ? "bg-brand-black text-white shadow-2xl shadow-brand-black/20" 
                  : "text-brand-black/40 hover:bg-brand-paper hover:text-brand-black"
              )}
            >
              <div className={cn(
                "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                activeTab === item.id ? "bg-brand-orange text-white" : "bg-brand-black/5 text-brand-black/30 group-hover:bg-brand-black/10"
              )}>
                <item.icon size={18} className="group-hover:scale-110 transition-transform" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col items-start">
                  <span className="font-bold text-xs tracking-tight uppercase">{item.label}</span>
                  <span className={cn(
                    "text-[8px] font-mono uppercase tracking-widest leading-none mt-0.5",
                    activeTab === item.id ? "text-white/40" : "text-brand-black/20"
                  )}>
                    {item.id.replace('-', '_')}.sys
                  </span>
                </div>
              )}
              
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute inset-0 bg-brand-black -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-brand-black text-white text-[10px] font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap z-50 shadow-xl border border-white/10 uppercase tracking-widest">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto space-y-4">
          <div className="bg-brand-paper/50 rounded-[24px] p-5 border border-brand-line relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-orange/5 blur-2xl rounded-full group-hover:bg-brand-orange/10 transition-colors" />
            {!isCollapsed ? (
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-brand-black/30 uppercase tracking-[0.2em] font-mono">STATUS_REDE</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Ativo</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-bold text-brand-black/40 uppercase tracking-widest">
                    <span>CARGA API</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full h-1 bg-brand-black/5 rounded-full overflow-hidden">
                    <div className="w-[42%] h-full bg-brand-orange" />
                  </div>
                </div>
                <button className="w-full py-2.5 bg-brand-black text-white rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-brand-orange transition-all shadow-lg shadow-brand-black/10">
                  LOGS_SISTEMA
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <ShieldCheck size={18} className="text-brand-black/20" />
              </div>
            )}
          </div>

          <button 
            onClick={onLogout}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-brand-black/40 hover:bg-red-50 hover:text-red-600 transition-all group font-bold text-xs uppercase tracking-widest",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut size={18} className="transition-transform group-hover:translate-x-1" />
            {!isCollapsed && <span>Terminar Sessão</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FDFDFD]">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-brand-line flex items-center justify-between px-10 shrink-0 z-20">
          <div className="flex items-center gap-6 flex-1">
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-4 px-5 py-3 bg-brand-paper/30 border border-brand-line rounded-2xl text-brand-black/30 text-xs hover:bg-white hover:shadow-sm transition-all w-full max-w-md group font-mono"
            >
              <Search size={16} className="group-hover:text-brand-orange transition-colors" />
              <span className="font-bold tracking-tight uppercase">EXECUTAR COMANDO...</span>
              <div className="ml-auto flex items-center gap-1.5">
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-lg border border-brand-line bg-white px-2 font-mono text-[9px] font-bold text-brand-black/40 shadow-sm">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <button className="p-2.5 text-brand-black/30 hover:text-brand-orange hover:bg-brand-orange/5 rounded-xl transition-all relative group border border-transparent hover:border-brand-orange/10">
                <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-orange rounded-full border-2 border-white shadow-sm"></span>
              </button>
            </div>
            
            <div className="h-8 w-px bg-brand-line"></div>
            
            <div className="flex items-center gap-5 group cursor-pointer">
              <div className="text-right hidden sm:block space-y-0.5">
                <div className="text-xs font-black tracking-tight group-hover:text-brand-orange transition-colors uppercase">Empresa Exemplo</div>
                <div className="flex items-center justify-end gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse"></div>
                  <span className="text-[9px] text-brand-black/40 uppercase tracking-[0.2em] font-mono font-bold">LICENÇA_PRO</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-brand-black flex items-center justify-center text-brand-orange font-black text-sm shadow-xl group-hover:scale-105 transition-transform border border-brand-orange/20">
                  EE
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
        onSelect={(tab) => {
          setActiveTab(tab);
          setIsCommandPaletteOpen(false);
        }}
      />
    </div>
  );
}
