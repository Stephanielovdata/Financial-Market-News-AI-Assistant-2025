
import React from 'react';
import { MarketSector, Language, Translations } from '../types';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { BarChart3 } from 'lucide-react';

interface MarketChartsProps {
  sector: MarketSector;
  language: Language;
}

const MarketCharts: React.FC<MarketChartsProps> = ({ sector, language }) => {
  const t = Translations[language];

  const generateData = () => {
    const base = Math.random() * 100;
    const days = language === Language.CN 
      ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return Array.from({ length: 7 }, (_, i) => ({
      name: days[i],
      value: Number((base + Math.random() * 20 - 10).toFixed(2)),
    }));
  };

  const data = generateData();

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold">{t.indicator_trends}</h2>
        </div>
        <select className="bg-slate-800 text-xs border-none rounded-lg px-2 py-1 outline-none text-slate-400">
          <option>{t.last_7_days}</option>
          <option>{t.last_30_days}</option>
        </select>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <p className="text-xs text-slate-500 mb-1">{t.volatility}</p>
          <p className="text-xl font-black text-slate-100">12.4%</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[40%]" />
          </div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <p className="text-xs text-slate-500 mb-1">{t.sentiment}</p>
          <p className="text-xl font-black text-slate-100">{t.bullish}</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-500 h-full w-[75%]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketCharts;
