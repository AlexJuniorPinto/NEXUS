import React from 'react';
import { Users, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

const STATS = [
  { label: 'Atendimentos', value: '367', icon: Users, color: 'blue' },
  { label: 'Taxa de Conversão', value: '22.4%', icon: TrendingUp, color: 'orange' },
  { label: 'Tempo de Resposta', value: '1.2s', icon: Clock, color: 'purple' },
  { label: 'Vendas Recuperadas', value: 'R$ 4.2k', icon: CheckCircle2, color: 'green' },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {STATS.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-brand-black/5 shadow-sm hover:shadow-md transition-shadow">
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
  );
}
