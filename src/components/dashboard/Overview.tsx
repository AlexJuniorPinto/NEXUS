import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  MessageSquare,
  AlertCircle,
  DollarSign,
  PieChart
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
  Bar,
  Cell
} from 'recharts';
import { cn } from '../../lib/utils';

const data = [
  { name: 'Seg', value: 400, conv: 24, cpr: 0.12, rpr: 1.45 },
  { name: 'Ter', value: 300, conv: 18, cpr: 0.15, rpr: 1.20 },
  { name: 'Qua', value: 600, conv: 32, cpr: 0.11, rpr: 1.80 },
  { name: 'Qui', value: 800, conv: 45, cpr: 0.10, rpr: 2.10 },
  { name: 'Sex', value: 500, conv: 28, cpr: 0.14, rpr: 1.60 },
  { name: 'Sáb', value: 900, conv: 52, cpr: 0.09, rpr: 2.40 },
  { name: 'Dom', value: 700, conv: 38, cpr: 0.13, rpr: 1.90 },
];

const kpis = [
  { 
    label: 'ROI (RPR/CPR)', 
    value: '15.4x', 
    change: '+2.5x', 
    trend: 'up', 
    desc: 'Retorno sobre Investimento Meta',
    icon: TrendingUp 
  },
  { 
    label: 'Taxa de Conversão', 
    value: '18.4%', 
    change: '+2.1%', 
    trend: 'up', 
    desc: 'Conversas para Vendas',
    icon: Zap 
  },
  { 
    label: 'Custo Médio (CPR)', 
    value: 'R$ 0,12', 
    change: '-8%', 
    trend: 'up', 
    desc: 'Custo por Destinatário',
    icon: DollarSign 
  },
  { 
    label: 'Leads Totais', 
    value: '1.284', 
    change: '+18%', 
    trend: 'up', 
    desc: 'Novos contatos IA',
    icon: Users 
  },
];

export default function Overview() {
  const quotaUsage = 82; // 82% usage

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-orange/10 rounded-lg border border-brand-orange/20">
              <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(255,99,33,0.5)]" />
              <span className="text-[9px] font-mono font-bold text-brand-orange uppercase tracking-[0.2em]">SISTEMA_ATIVO_v2.4</span>
            </div>
            <div className="px-2 py-1 bg-brand-black/5 rounded-lg border border-brand-black/5">
              <span className="text-[9px] font-mono font-bold text-brand-black/30 uppercase tracking-[0.2em]">LATÊNCIA: 42ms</span>
            </div>
          </div>
          <h1 className="text-5xl font-display font-black tracking-tighter leading-none">DASHBOARD.</h1>
          <p className="text-brand-black/40 mt-4 font-medium max-w-md">Monitoramento em tempo real do seu Agente de IA e métricas de conversão estratégica.</p>
        </div>
        
        {/* Real-time Quota Tracker */}
        <div className="bg-white p-8 rounded-[40px] border border-brand-line shadow-sm flex items-center gap-8 min-w-[380px] hover:shadow-xl transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-brand-orange/10 transition-colors" />
          <div className="flex-1 space-y-4 relative z-10">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-brand-black/30 uppercase tracking-[0.2em]">USO_DA_COTA</span>
                <div className="text-2xl font-display font-bold tracking-tight">8.240 <span className="text-brand-black/20 text-sm font-mono">/ 10.000</span></div>
              </div>
              <div className={cn(
                "text-[10px] font-mono font-bold px-3 py-1.5 rounded-xl border",
                quotaUsage >= 80 ? "bg-brand-orange/10 border-brand-orange/20 text-brand-orange" : "bg-green-50 border-green-100 text-green-600"
              )}>
                {quotaUsage}%_CAPACIDADE
              </div>
            </div>
            <div className="h-3 bg-brand-paper rounded-full overflow-hidden p-0.5 border border-brand-line shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${quotaUsage}%` }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "h-full rounded-full transition-colors relative",
                  quotaUsage >= 90 ? "bg-red-500" : quotaUsage >= 80 ? "bg-brand-orange" : "bg-green-500"
                )}
              >
                <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </div>
          {quotaUsage >= 80 && (
            <div className="w-14 h-14 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center animate-pulse group-hover:animate-none shadow-lg shadow-brand-orange/10 relative z-10 border border-brand-orange/20">
              <AlertCircle size={28} />
            </div>
          )}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[40px] border border-brand-line shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="w-14 h-14 bg-brand-paper rounded-2xl flex items-center justify-center text-brand-black group-hover:bg-brand-black group-hover:text-white transition-all duration-500 shadow-sm">
                <kpi.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1.5 text-[10px] font-mono font-bold px-3 py-1.5 rounded-xl border shadow-sm",
                kpi.trend === 'up' ? "bg-green-50 border-green-100 text-green-600" : "bg-red-50 border-red-100 text-red-600"
              )}>
                {kpi.trend === 'up' ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
                {kpi.change}
              </div>
            </div>
            
            <div className="space-y-2 relative z-10">
              <div className="text-4xl font-display font-bold tracking-tighter">{kpi.value}</div>
              <div className="text-[10px] font-mono font-bold text-brand-black/30 uppercase tracking-[0.2em]">{kpi.label}</div>
              <div className="pt-6 mt-6 border-t border-brand-line">
                <div className="text-[11px] text-brand-black/40 font-medium leading-relaxed">{kpi.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-12 rounded-[48px] border border-brand-line shadow-sm hover:shadow-xl transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div className="space-y-1">
              <h3 className="text-2xl font-display font-bold tracking-tight uppercase">Performance de Vendas</h3>
              <p className="text-xs text-brand-black/40 font-medium font-mono uppercase tracking-widest">RELATÓRIO_RENDIMENTO_2026</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-brand-paper p-1.5 rounded-2xl border border-brand-line shadow-inner">
                <button className="px-6 py-2 bg-brand-black text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-xl shadow-lg">7D</button>
                <button className="px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-brand-black/30 hover:text-brand-black transition-colors">30D</button>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6321" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#FF6321" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 700, fontFamily: 'JetBrains Mono' }} 
                  dy={20}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 700, fontFamily: 'JetBrains Mono' }} 
                />
                <Tooltip 
                  cursor={{ stroke: '#FF6321', strokeWidth: 2, strokeDasharray: '5 5' }}
                  contentStyle={{ 
                    backgroundColor: '#0A0A0A', 
                    borderRadius: '24px', 
                    border: 'none',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
                    padding: '20px'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 700, fontFamily: 'JetBrains Mono' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FF6321" 
                  strokeWidth={5}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[48px] border border-brand-line shadow-sm hover:shadow-xl transition-all flex flex-col">
          <div className="mb-12 space-y-1">
            <h3 className="text-2xl font-display font-bold tracking-tight uppercase">Conversão por Dia</h3>
            <p className="text-xs text-brand-black/40 font-medium font-mono uppercase tracking-widest">EFICIÊNCIA_QUALIFICAÇÃO</p>
          </div>
          <div className="flex-1 min-h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 700, fontFamily: 'JetBrains Mono' }} 
                  dy={20}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 700, fontFamily: 'JetBrains Mono' }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 99, 33, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#0A0A0A', 
                    borderRadius: '24px', 
                    border: 'none',
                    padding: '20px',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 700, fontFamily: 'JetBrains Mono' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono' }}
                />
                <Bar 
                  dataKey="conv" 
                  fill="#FF6321" 
                  radius={[12, 12, 0, 0]} 
                  barSize={32}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#FF6321' : '#0A0A0A'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-10 pt-10 border-t border-brand-line flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-brand-orange rounded-full shadow-[0_0_10px_rgba(255,99,33,0.4)]" />
              <span className="text-[10px] font-mono font-bold text-brand-black/40 uppercase tracking-[0.2em]">PICO_DESEMPENHO</span>
            </div>
            <span className="text-sm font-display font-bold uppercase tracking-tight">Sábado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
