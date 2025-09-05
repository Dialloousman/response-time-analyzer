import { useMemo } from "react";
import type { LLMResponse, TableRow } from "@/types/index";
import { transformToTableData } from "@/utils/dataTransformers";

/**
 * Transforms LLM response data into table-ready format with formatted timestamps.
 * Memoizes the transformation to prevent unnecessary recalculations.
 */
export function useTableData(responses: LLMResponse[]): TableRow[] {
  return useMemo(() => {
    if (!responses || responses.length === 0) {
      return [];
    }
    return transformToTableData(responses);
  }, [responses]);
}
