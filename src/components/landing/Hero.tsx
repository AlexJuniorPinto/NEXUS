import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

interface HeroProps {
  onAuth: (mode: 'login' | 'signup') => void;
}

export default function Hero({ onAuth }: HeroProps) {
  return (
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
            className="text-5xl sm:text-7xl md:text-[100px] lg:text-[120px] font-display font-bold leading-[0.85] tracking-tighter mb-10 max-w-5xl"
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
              className="btn-primary text-base md:text-lg px-8 md:px-12 py-4 md:py-6 flex items-center justify-center gap-4 group shadow-2xl shadow-brand-orange/40"
            >
              Testar o Agente na Prática
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
