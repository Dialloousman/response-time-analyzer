import { LLMResponse } from "@/types";
import mockData from "@/data/mockData.json";

export const loadMockData = (): LLMResponse[] => {
  return mockData.responses;
};

export const getMockDataStats = () => {
  const data = loadMockData();
  return {
    totalResponses: data.length,
    models: [...new Set(data.map(r => r.model))],
    statuses: [...new Set(data.map(r => r.status))],
    dateRange: {
      start: new Date(Math.min(...data.map(r => new Date(r.timestamp).getTime()))),
      end: new Date(Math.max(...data.map(r => new Date(r.timestamp).getTime())))
    }
  };
};
