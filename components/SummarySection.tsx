
import React from 'react';
import { Language, Translations } from '../types';

interface SummarySectionProps {
  content: string;
  language: Language;
}

const SummarySection: React.FC<SummarySectionProps> = ({ content, language }) => {
  const t = Translations[language];
  
  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('###')) {
        return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-white">{line.replace('###', '')}</h3>;
      }
      if (line.startsWith('##')) {
        return <h2 key={i} className="text-2xl font-black mt-8 mb-4 border-b border-slate-800 pb-2 text-blue-400 uppercase tracking-tight">{line.replace('##', '')}</h2>;
      }
      if (line.match(/^\d\./)) {
        return <p key={i} className="ml-4 mb-2 text-slate-300 flex gap-3"><span className="text-blue-500 font-bold">{line.split('.')[0]}.</span> {line.split('.').slice(1).join('.')}</p>;
      }
      if (line.startsWith('*')) {
        return <li key={i} className="ml-6 mb-1 text-slate-300 list-disc">{line.replace('*', '').trim()}</li>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-slate-300 leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-800 flex justify-between items-center">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{t.report_title}</h2>
        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded uppercase font-bold">{t.grounding}</span>
      </div>
      <div className="p-8">
        {formatContent(content)}
      </div>
    </section>
  );
};

export default SummarySection;
