
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
