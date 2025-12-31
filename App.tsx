
import React, { useState, useEffect, useCallback } from 'react';
import { GeminiService } from './services/geminiService';
import { MarketUpdate, MarketSector } from './types';
import SummarySection from './components/SummarySection';
import MarketCharts from './components/MarketCharts';
import NewsList from './components/NewsList';
import Sidebar from './components/Sidebar';
import { LineChart, LayoutDashboard, Newspaper, Video, BarChart3, Loader2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeSector, setActiveSector] = useState<MarketSector>(MarketSector.ENERGY);
  const [update, setUpdate] = useState<MarketUpdate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const gemini = new GeminiService();

  const loadData = useCallback(async (sector: MarketSector) => {
    setLoading(true);
    setError(null);
    try {
      const data = await gemini.fetchMarketSummary(sector);
      setUpdate(data);
    } catch (err) {
      setError("Failed to fetch market data. Please check your API configuration or network.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(activeSector);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSector]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <Sidebar 
        activeSector={activeSector} 
        onSectorChange={setActiveSector} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">MarketPulse Intelligence</h1>
              <p className="text-xs text-slate-400">Daily Financial Summaries • {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <button 
            onClick={() => loadData(activeSector)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Refresh Data"}
          </button>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-200">
              <AlertCircle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              <p className="text-slate-400 font-medium">Querying global financial databases...</p>
            </div>
          ) : update ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Summary & Insights */}
              <div className="lg:col-span-2 space-y-8">
                <SummarySection content={update.summary} />
                <MarketCharts sector={activeSector} />
              </div>

              {/* Right Column - Sources & Quick Links */}
              <div className="space-y-8">
                <NewsList sources={update.sources} />
                <VideoSuggestions summary={update.summary} />
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              Select a sector to view current market trends.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const VideoSuggestions: React.FC<{ summary: string }> = ({ summary }) => {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Video className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-bold">Watch Trends</h2>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group">
          <div className="aspect-video bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors">
              <Video className="w-5 h-5" />
            </div>
          </div>
          <h3 className="font-semibold text-sm leading-tight">Analyzing Today's Market Pulse</h3>
          <p className="text-xs text-slate-500 mt-1">Suggested YouTube Topic</p>
        </div>
        <p className="text-xs text-slate-500 italic">Based on AI summary of current events from Bloomberg and Morningstar.</p>
      </div>
    </section>
  );
};

export default App;
