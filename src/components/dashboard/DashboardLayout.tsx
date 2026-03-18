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
  Cpu,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white relative">
      <div className="p-8 flex items-center justify-between">
        <div className={cn("flex items-center gap-3 overflow-hidden transition-all duration-500", isCollapsed ? "lg:opacity-0 lg:w-0 lg:scale-90" : "opacity-100 w-auto scale-100")}>
          <div className="w-10 h-10 bg-brand-black rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-black/20 rotate-3 hover:rotate-0 transition-transform group">
            <Bot className="text-brand-orange w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl tracking-tighter leading-none">NEXUS</span>
            <span className="text-[9px] font-bold text-brand-black/30 uppercase tracking-[0.3em] mt-1 font-mono">NÚCLEO v2.4</span>
          </div>
        </div>
        <button 
          onClick={() => isMobileMenuOpen ? setIsMobileMenuOpen(false) : setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl hover:bg-brand-paper transition-all active:scale-90 border border-transparent hover:border-brand-line group"
        >
          {isMobileMenuOpen ? <X size={18} className="group-hover:text-brand-orange transition-colors" /> : isCollapsed ? <ChevronRight size={18} className="group-hover:text-brand-orange transition-colors" /> : <ChevronLeft size={18} className="group-hover:text-brand-orange transition-colors" />}
        </button>
      </div>

      <div className="px-6 mb-4">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-brand-line to-transparent w-full" />
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsMobileMenuOpen(false);
            }}
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
            {(!isCollapsed || isMobileMenuOpen) && (
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

            {isCollapsed && !isMobileMenuOpen && (
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
          {(!isCollapsed || isMobileMenuOpen) ? (
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
            (isCollapsed && !isMobileMenuOpen) && "justify-center"
          )}
        >
          <LogOut size={18} className="transition-transform group-hover:translate-x-1" />
          {(!isCollapsed || isMobileMenuOpen) && <span>Terminar Sessão</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#FDFDFD] text-brand-black overflow-hidden selection:bg-brand-orange/10 selection:text-brand-orange font-sans">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden lg:flex bg-white border-r border-brand-line transition-all duration-500 ease-in-out flex-col relative z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden border-r border-brand-line shadow-2xl",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {SidebarContent}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FDFDFD]">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-brand-line flex items-center justify-between px-4 md:px-10 shrink-0 z-20">
          <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 lg:hidden text-brand-black/50 hover:text-brand-black transition-colors"
            >
              <Menu size={24} />
            </button>
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-3 md:gap-4 px-3 md:px-5 py-2 md:py-3 bg-brand-paper/30 border border-brand-line rounded-xl md:rounded-2xl text-brand-black/30 text-[10px] md:text-xs hover:bg-white hover:shadow-sm transition-all w-full max-w-md group font-mono truncate"
            >
              <Search size={16} className="group-hover:text-brand-orange transition-colors shrink-0" />
              <span className="font-bold tracking-tight uppercase truncate">EXECUTAR...</span>
              <div className="hidden sm:flex ml-auto items-center gap-1.5">
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded-lg border border-brand-line bg-white px-2 font-mono text-[9px] font-bold text-brand-black/40 shadow-sm">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4 md:gap-8 ml-4">
            <div className="hidden md:flex items-center gap-3">
              <button className="p-2.5 text-brand-black/30 hover:text-brand-orange hover:bg-brand-orange/5 rounded-xl transition-all relative group border border-transparent hover:border-brand-orange/10">
                <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-orange rounded-full border-2 border-white shadow-sm"></span>
              </button>
            </div>
            
            <div className="hidden sm:block h-8 w-px bg-brand-line"></div>
            
            <div className="flex items-center gap-3 md:gap-5 group cursor-pointer">
              <div className="text-right hidden sm:block space-y-0.5">
                <div className="text-[10px] md:text-xs font-black tracking-tight group-hover:text-brand-orange transition-colors uppercase">Empresa Exemplo</div>
                <div className="flex items-center justify-end gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse"></div>
                  <span className="text-[8px] text-brand-black/40 uppercase tracking-[0.2em] font-mono font-bold">PRO</span>
                </div>
              </div>
              <div className="relative shrink-0">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-brand-black flex items-center justify-center text-brand-orange font-black text-xs md:text-sm shadow-xl group-hover:scale-105 transition-transform border border-brand-orange/20">
                  EE
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
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
          setIsMobileMenuOpen(false);
        }}
      />
    </div>
  );
}
