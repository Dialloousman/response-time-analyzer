import { useState } from "react";
import type { LLMResponse } from "@/types/index";

interface UseFileDataReturn {
  /** Array of uploaded LLM response data */
  responses: LLMResponse[];
  /** Whether data is currently being processed */
  isLoading: boolean;
  /** Current error message if any */
  error: string | null;
  /** Whether any data has been uploaded */
  hasData: boolean;
  /** Function to upload new response data */
  uploadData: (data: LLMResponse[]) => void;
  /** Function to reset all data and state */
  resetData: () => void;
  /** Function to set error message */
  setError: (error: string | null) => void;
  /** Function to set loading state */
  setLoading: (loading: boolean) => void;
}

/**
 * Manages file upload state including responses, loading, and error states.
 * Provides methods to upload data, reset state, and handle loading/error updates.
 */
export function useFileData(): UseFileDataReturn {
  const [responses, setResponses] = useState<LLMResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadData = (data: LLMResponse[]) => {
    setResponses(data);
    setError(null);
  };

  const resetData = () => {
    setResponses([]);
    setError(null);
    setIsLoading(false);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return {
    responses,
    isLoading,
    error,
    hasData: responses.length > 0,
    uploadData,
    resetData,
    setError,
    setLoading,
  };
}
