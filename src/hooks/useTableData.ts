import { useMemo } from 'react'
import type { LLMResponse, TableRow } from '@/types/index'
import { transformToTableData } from '@/utils/dataTransformers'

export function useTableData(responses: LLMResponse[]): TableRow[] {
  return useMemo(() => {
    if (!responses || responses.length === 0) {
      return []
    }
    return transformToTableData(responses)
  }, [responses])
}