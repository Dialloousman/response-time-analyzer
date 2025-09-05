import { useState, useCallback } from 'react';
import { getClaudeResponse, analyzeDataWithClaude, ClaudeResponse } from '../services/claudeService';

export interface UseClaudeAnalysisReturn {
  isLoading: boolean;
  response: ClaudeResponse | null;
  error: string | null;
  analyzeData: (data: any[]) => Promise<void>;
  sendPrompt: (prompt: string) => Promise<void>;
  clearResponse: () => void;
}

export const useClaudeAnalysis = (): UseClaudeAnalysisReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ClaudeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeData = useCallback(async (data: any[]) => {
    if (!data || data.length === 0) {
      setError('No data provided for analysis');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await analyzeDataWithClaude(data);
      setResponse(result);
      
      if (!result.success) {
        setError(result.error || 'Analysis failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setResponse({
        content: '',
        success: false,
        error: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendPrompt = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await getClaudeResponse(prompt);
      setResponse(result);
      
      if (!result.success) {
        setError(result.error || 'Request failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setResponse({
        content: '',
        success: false,
        error: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResponse = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return {
    isLoading,
    response,
    error,
    analyzeData,
    sendPrompt,
    clearResponse,
  };
};
