
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface MarketUpdate {
  summary: string;
  sources: GroundingChunk[];
  timestamp: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export enum MarketSector {
  ENERGY = 'Energy (OPEC/EIA)',
  ECONOMY = 'Economy (FRED)',
  MARKETS = 'Markets (Bloomberg)',
  STOCKS = 'Equities (Morningstar)'
}

export enum Language {
  EN = 'en',
  CN = 'cn'
}

export const Translations = {
  en: {
    app_title: "MarketPulse Intelligence",
    daily_summary: "Daily Financial Summaries",
    refresh: "Refresh Data",
    loading: "Querying global financial databases...",
    sources: "Source Intelligence",
    trends: "Watch Trends",
    indicator_trends: "Indicator Trends",
    volatility: "Current Volatility",
    sentiment: "Market Sentiment",
    view_more: "View More Sources",
    report_title: "Market Intelligence Report",
    grounding: "Grounding Enabled",
    analyzing: "Analyzing Today's Market Pulse",
    suggested: "Suggested Video Topic",
    ai_engine: "AI Insights Engine",
    ai_desc: "Powered by Gemini 3 with search grounding for real-time Bloomberg & FRED data sync.",
    agg_data: "Aggregated Data",
    select_sector: "Select a sector to view current market trends.",
    last_7_days: "Last 7 Days",
    last_30_days: "Last 30 Days",
    bullish: "Bullish",
    bearish: "Bearish",
    neutral: "Neutral"
  },
  cn: {
    app_title: "市场脉动智能 (MarketPulse)",
    daily_summary: "每日财经市场汇总",
    refresh: "刷新数据",
    loading: "正在查询全球金融数据库...",
    sources: "情报来源",
    trends: "趋势观察",
    indicator_trends: "指标趋势",
    volatility: "当前波动率",
    sentiment: "市场情绪",
    view_more: "查看更多来源",
    report_title: "市场情报报告",
    grounding: "联网增强已开启",
    analyzing: "深度解析今日市场脉搏",
    suggested: "推荐视频选题",
    ai_engine: "AI 洞察引擎",
    ai_desc: "由 Gemini 3 提供技术支持，结合实时搜索获取 Bloomberg 和 FRED 权威数据。",
    agg_data: "聚合数据",
    select_sector: "请选择一个板块以查看当前市场趋势。",
    last_7_days: "最近 7 天",
    last_30_days: "最近 30 天",
    bullish: "看涨",
    bearish: "看跌",
    neutral: "中性"
  }
};
