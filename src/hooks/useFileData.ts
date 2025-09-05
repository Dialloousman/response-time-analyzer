import { useState } from 'react'
import type { LLMResponse } from '@/types/index'

interface UseFileDataReturn {
  responses: LLMResponse[]
  isLoading: boolean
  error: string | null
  hasData: boolean
  uploadData: (data: LLMResponse[]) => void
  resetData: () => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
}

export function useFileData(): UseFileDataReturn {
  const [responses, setResponses] = useState<LLMResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadData = (data: LLMResponse[]) => {
    setResponses(data)
    setError(null)
  }

  const resetData = () => {
    setResponses([])
    setError(null)
    setIsLoading(false)
  }

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  return {
    responses,
    isLoading,
    error,
    hasData: responses.length > 0,
    uploadData,
    resetData,
    setError,
    setLoading,
  }
}