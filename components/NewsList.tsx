
import React from 'react';
import { GroundingChunk, Language, Translations } from '../types';
import { Newspaper, ExternalLink, ChevronRight } from 'lucide-react';

interface NewsListProps {
  sources: GroundingChunk[];
  language: Language;
}

const NewsList: React.FC<NewsListProps> = ({ sources, language }) => {
  const t = Translations[language];
  const newsItems = sources.filter(s => s.web);

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-bold">{t.sources}</h2>
      </div>

      <div className="space-y-4">
        {newsItems.length > 0 ? (
          newsItems.map((item, idx) => (
            <a 
              key={idx}
              href={item.web?.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 bg-slate-800/30 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {item.web?.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-2 font-medium flex items-center gap-1">
                    {new URL(item.web?.uri || '').hostname}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-500 flex-shrink-0" />
              </div>
            </a>
          ))
        ) : (
          <div className="py-10 text-center">
            <p className="text-slate-500 text-sm">{language === Language.CN ? "正在寻找权威来源链接..." : "Searching for direct source links..."}</p>
          </div>
        )}
      </div>

      <button className="w-full mt-6 py-3 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 group">
        {t.view_more} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  );
};

export default NewsList;
