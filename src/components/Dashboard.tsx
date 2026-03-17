import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Save,
  Bot
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface DashboardProps {
  onLogout: () => void;
}

const MOCK_DATA = [
  { name: 'Seg', conv: 45, sales: 12 },
  { name: 'Ter', conv: 52, sales: 15 },
  { name: 'Qua', conv: 48, sales: 14 },
  { name: 'Qui', conv: 61, sales: 22 },
  { name: 'Sex', conv: 55, sales: 18 },
  { name: 'Sáb', conv: 67, sales: 25 },
  { name: 'Dom', conv: 42, sales: 10 },
];

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemPrompt, setSystemPrompt] = useState(
    "Você é o assistente virtual do Petshop Amigo. Seu objetivo é agendar serviços de banho e tosa, tirar dúvidas sobre preços e horários, e ser sempre gentil e prestativo. Preços: Banho (P: R$40, M: R$60, G: R$80). Tosa: +R$20."
  );

  return (
    <div className="flex h-screen bg-brand-paper">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-brand-black/5 flex flex-col">
        <div className="p-6 flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tighter">NEXUS Portal</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
            { id: 'conversations', label: 'Conversas', icon: MessageSquare },
            { id: 'settings', label: 'Configurações', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-brand-orange/10 text-brand-orange' 
                  : 'text-brand-black/50 hover:bg-brand-paper hover:text-brand-black'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Bem-vindo, Petshop Amigo</h1>
            <p className="text-brand-black/50">Acompanhe o desempenho do seu agente de IA.</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Agente Online
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Atendimentos', value: '367', icon: Users, color: 'blue' },
                { label: 'Taxa de Conversão', value: '22.4%', icon: TrendingUp, color: 'orange' },
                { label: 'Tempo de Resposta', value: '1.2s', icon: Clock, color: 'purple' },
                { label: 'Vendas Recuperadas', value: 'R$ 4.2k', icon: CheckCircle2, color: 'green' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-brand-black/5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs font-medium text-brand-black/40 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[32px] border border-brand-black/5 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Volume de Atendimento</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_DATA}>
                      <defs>
                        <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF6321" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#FF6321" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="conv" stroke="#FF6321" strokeWidth={3} fillOpacity={1} fill="url(#colorConv)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-brand-black/5 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Vendas e Agendamentos</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="sales" fill="#0A0A0A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-8">
            <div className="bg-white p-8 rounded-[32px] border border-brand-black/5 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bot className="text-brand-orange" />
                Contexto da IA (Memória)
              </h3>
              <p className="text-sm text-brand-black/50 mb-6">
                Atualize as instruções do seu agente. Ele usará essas informações para responder seus clientes.
              </p>
              <textarea 
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full h-48 bg-brand-paper rounded-2xl p-6 text-sm leading-relaxed border-none focus:ring-2 focus:ring-brand-orange transition-all"
                placeholder="Ex: O cardápio de hoje é..."
              />
              <div className="mt-6 flex justify-end">
                <button className="bg-brand-black text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-orange transition-all active:scale-95">
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-brand-black/5 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Configurações da Conta</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-brand-paper rounded-2xl">
                  <div>
                    <div className="font-bold text-sm">Notificações no WhatsApp</div>
                    <div className="text-xs text-brand-black/40">Receba alertas de novas vendas</div>
                  </div>
                  <div className="w-12 h-6 bg-brand-orange rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-brand-paper rounded-2xl">
                  <div>
                    <div className="font-bold text-sm">Modo de Treinamento</div>
                    <div className="text-xs text-brand-black/40">O agente aprende com suas correções</div>
                  </div>
                  <div className="w-12 h-6 bg-brand-black/10 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
