import { useMemo } from 'react'
import type { LLMResponse, ChartDataPoint } from '@/types/index'
import { transformToChartData } from '@/utils/dataTransformers'

export function useChartData(responses: LLMResponse[]): ChartDataPoint[] {
  return useMemo(() => {
    if (!responses || responses.length === 0) {
      return []
    }
    return transformToChartData(responses)
  }, [responses])
}