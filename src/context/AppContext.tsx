import { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { AppState, AppContextType, LLMResponse } from '@/types'
import { transformToChartData, transformToTableData } from '@/utils/dataTransform'

const initialState: AppState = {
  responses: [],
  chartData: [],
  tableData: [],
  selectedItems: [],
  isLoading: false,
  error: null,
  hasData: false,
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPLOAD_DATA'; payload: LLMResponse[] }
  | { type: 'SELECT_ITEMS'; payload: string[] }
  | { type: 'RESET_DATA' }

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    case 'UPLOAD_DATA':
      const chartData = transformToChartData(action.payload)
      const tableData = transformToTableData(action.payload)
      return {
        ...state,
        responses: action.payload,
        chartData,
        tableData,
        hasData: action.payload.length > 0,
        selectedItems: [],
        error: null,
      }
    
    case 'SELECT_ITEMS':
      return { ...state, selectedItems: action.payload }
    
    case 'RESET_DATA':
      return initialState
    
    default:
      return state
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const uploadData = (data: LLMResponse[]) => {
    dispatch({ type: 'UPLOAD_DATA', payload: data })
  }

  const selectItems = (ids: string[]) => {
    dispatch({ type: 'SELECT_ITEMS', payload: ids })
  }

  const resetData = () => {
    dispatch({ type: 'RESET_DATA' })
  }

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const contextValue: AppContextType = {
    state,
    uploadData,
    selectItems,
    resetData,
    setError,
    setLoading,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}