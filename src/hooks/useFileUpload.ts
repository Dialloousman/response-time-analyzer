import { useCallback } from 'react'
import type { LLMResponse } from '@/types'
import { isValidLLMResponseArray } from '@/utils/dataTransform'

interface UseFileUploadResult {
  handleFile: (file: File) => Promise<{ data?: LLMResponse[], error?: string }>
  validateFileType: (file: File) => boolean
}

export function useFileUpload(): UseFileUploadResult {
  const validateFileType = useCallback((file: File): boolean => {
    return file.type === 'application/json' || file.name.endsWith('.json')
  }, [])

  const handleFile = useCallback(async (file: File): Promise<{ data?: LLMResponse[], error?: string }> => {
    try {
      if (!validateFileType(file)) {
        return { error: 'Please upload a JSON file' }
      }

      const text = await file.text()
      const parsed = JSON.parse(text)
      
      let responses: LLMResponse[]
      
      if (parsed.responses && Array.isArray(parsed.responses)) {
        responses = parsed.responses
      } else if (Array.isArray(parsed)) {
        responses = parsed
      } else {
        return { error: 'Invalid file format. Expected array of responses or object with responses property' }
      }

      if (!isValidLLMResponseArray(responses)) {
        return { error: 'Invalid data format. Please check your JSON structure' }
      }

      return { data: responses }
    } catch (error) {
      if (error instanceof SyntaxError) {
        return { error: 'Invalid JSON format' }
      }
      return { error: 'Failed to process file' }
    }
  }, [validateFileType])

  return {
    handleFile,
    validateFileType
  }
}