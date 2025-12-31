
import { GoogleGenAI } from "@google/genai";
import { MarketUpdate, MarketSector, Language } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async fetchMarketSummary(sector: MarketSector, lang: Language): Promise<MarketUpdate> {
    const languageInstruction = lang === Language.CN 
      ? "Please provide the entire response in Chinese (Simplified)." 
      : "Please provide the entire response in English.";

    const prompt = `
      ${languageInstruction}
      Provide a comprehensive financial market summary for today specifically focusing on ${sector}.
      Include:
      1. A professional summary of key events (3-4 paragraphs).
      2. Key data points (e.g., oil prices if Energy, interest rates if FRED, index movements if Markets).
      3. A list of top 3 news headlines from credible sources like Bloomberg, Morningstar, OPEC, or EIA as applicable.
      4. Recommendations for relevant financial video topics based on today's trends.
      
      Format the response using clear Markdown with headers.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || (lang === Language.CN ? "目前无法获取摘要。" : "No summary available at this time.");
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      return {
        summary: text,
        sources: chunks,
        timestamp: new Date().toLocaleString(lang === Language.CN ? 'zh-CN' : 'en-US'),
      };
    } catch (error) {
      console.error("Error fetching market summary:", error);
      throw error;
    }
  }
}
