import { useMemo } from "react";
import type { LLMResponse, ChartDataPoint } from "@/types/index";
import { transformToChartData } from "@/utils/dataTransformers";

/**
 * Transforms LLM response data into chart-ready format with sorted timestamps.
 * Memoizes the transformation to prevent unnecessary recalculations.
 */
export function useChartData(responses: LLMResponse[]): ChartDataPoint[] {
  return useMemo(() => {
    if (!responses || responses.length === 0) {
      return [];
    }
    return transformToChartData(responses);
  }, [responses]);
}
