
import React from 'react';
import { MarketSector, Language, Translations } from '../types';
import { Flame, Landmark, Globe2, TrendingUp, Cpu } from 'lucide-react';

interface SidebarProps {
  activeSector: MarketSector;
  onSectorChange: (sector: MarketSector) => void;
  language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSector, onSectorChange, language }) => {
  const t = Translations[language];
  const sectors = [
    { id: MarketSector.ENERGY, icon: Flame, color: 'text-orange-500' },
    { id: MarketSector.ECONOMY, icon: Landmark, color: 'text-emerald-500' },
    { id: MarketSector.MARKETS, icon: Globe2, color: 'text-blue-500' },
    { id: MarketSector.STOCKS, icon: TrendingUp, color: 'text-rose-500' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter italic">FINPULSE</span>
        </div>

        <nav className="space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">{t.agg_data}</p>
          {sectors.map((sector) => {
            const Icon = sector.icon;
            const isActive = activeSector === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => onSectorChange(sector.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? sector.color : 'text-slate-500'}`} />
                <span className="text-sm font-semibold">{sector.id}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
          <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-2">
            <Cpu className="w-3 h-3 text-blue-400" /> {t.ai_engine}
          </h4>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            {t.ai_desc}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
