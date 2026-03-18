import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './dashboard/Sidebar';
import StatsGrid from './dashboard/StatsGrid';
import Charts from './dashboard/Charts';
import Settings from './dashboard/Settings';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(
    "Você é o assistente virtual do Petshop Amigo. Seu objetivo é agendar serviços de banho e tosa, tirar dúvidas sobre preços e horários, e ser sempre gentil e prestativo. Preços: Banho (P: R$40, M: R$60, G: R$80). Tosa: +R$20."
  );

  return (
    <div className="flex min-h-screen bg-brand-paper font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={onLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden p-6 md:p-8 lg:p-12">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 lg:hidden mb-2">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-brand-black/50 hover:text-brand-black transition-colors"
              >
                <Menu size={24} />
              </button>
              <span className="font-display font-bold text-lg tracking-tighter">NEXUS Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Bem-vindo, Petshop Amigo</h1>
            <p className="text-brand-black/50 font-medium">Acompanhe o desempenho do seu agente de IA.</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider shrink-0">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Agente Online
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <StatsGrid />
            <Charts />
          </div>
        )}

        {activeTab === 'settings' && (
          <Settings 
            systemPrompt={systemPrompt} 
            setSystemPrompt={setSystemPrompt} 
          />
        )}

        {activeTab === 'conversations' && (
          <div className="bg-white p-8 rounded-[32px] border border-brand-black/5 shadow-sm text-center">
            <p className="text-brand-black/50 font-medium">Módulo de conversas em desenvolvimento.</p>
          </div>
        )}
      </main>
    </div>
  );
}
