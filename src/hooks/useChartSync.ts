import { useState, useCallback } from 'react'

export function useChartSync() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleChartSelection = useCallback((ids: string[]) => {
    setSelectedItems(ids)
  }, [])

  const handleTableSelection = useCallback((ids: string[]) => {
    setSelectedItems(ids)
  }, [])

  return {
    selectedItems,
    handleChartSelection,
    handleTableSelection
  }
}