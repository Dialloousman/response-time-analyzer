import { useState, useCallback } from "react";

/**
 * Manages synchronized selection state between chart and table components.
 * Provides handlers for both chart and table selection events.
 */
export function useChartSync() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleChartSelection = useCallback((ids: string[]) => {
    setSelectedItems(ids);
  }, []);

  const handleTableSelection = useCallback((ids: string[]) => {
    setSelectedItems(ids);
  }, []);

  return {
    selectedItems,
    handleChartSelection,
    handleTableSelection,
  };
}
