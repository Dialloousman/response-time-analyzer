import { useCallback } from 'react'
import { useAppContext } from '@/context/AppContext'

export function useChartSync() {
  const { state, selectItems } = useAppContext()

  const handleChartSelection = useCallback((ids: string[]) => {
    selectItems(ids)
  }, [selectItems])

  const handleTableSelection = useCallback((ids: string[]) => {
    selectItems(ids)
  }, [selectItems])

  return {
    selectedItems: state.selectedItems,
    handleChartSelection,
    handleTableSelection
  }
}