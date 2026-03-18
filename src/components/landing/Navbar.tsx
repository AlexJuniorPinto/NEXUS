import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Menu, X } from 'lucide-react';

interface NavbarProps {
  onAuth: (mode: 'login' | 'signup') => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Navbar({ onAuth, isMenuOpen, setIsMenuOpen }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 font-sans">
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
  );
}
