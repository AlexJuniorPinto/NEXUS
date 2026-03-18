import React from 'react';
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

const MOCK_DATA = [
  { name: 'Seg', conv: 45, sales: 12 },
  { name: 'Ter', conv: 52, sales: 15 },
  { name: 'Qua', conv: 48, sales: 14 },
  { name: 'Qui', conv: 61, sales: 22 },
  { name: 'Sex', conv: 55, sales: 18 },
  { name: 'Sáb', conv: 67, sales: 25 },
  { name: 'Dom', conv: 42, sales: 10 },
];

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-brand-black/5 shadow-sm">
        <h3 className="text-lg font-bold mb-6">Volume de Atendimento</h3>
        <div className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_DATA}>
              <defs>
                <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6321" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF6321" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="conv" stroke="#FF6321" strokeWidth={3} fillOpacity={1} fill="url(#colorConv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-brand-black/5 shadow-sm">
        <h3 className="text-lg font-bold mb-6">Vendas e Agendamentos</h3>
        <div className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="sales" fill="#0A0A0A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
