import { useCallback } from "react";
import type { LLMResponse } from "@/types/index";
import {
  parseUploadedData,
  validateResponseData,
} from "@/utils/dataTransformers";

interface UseFileUploadResult {
  handleFile: (file: File) => Promise<{ data?: LLMResponse[]; error?: string }>;
  validateFileType: (file: File) => boolean;
}

export function useFileUpload(): UseFileUploadResult {
  const validateFileType = useCallback((file: File): boolean => {
    return file.type === "application/json" || file.name.endsWith(".json");
  }, []);

  const handleFile = useCallback(
    async (file: File): Promise<{ data?: LLMResponse[]; error?: string }> => {
      try {
        if (!validateFileType(file)) {
          return { error: "Please upload a JSON file" };
        }

        const text = await file.text();
        const responses = parseUploadedData(text);

        // Validate each response
        for (const response of responses) {
          if (!validateResponseData(response)) {
            return {
              error: `Invalid response data format for ID: ${response.id}`,
            };
          }
        }

        return { data: responses };
      } catch (error) {
        if (error instanceof SyntaxError) {
          return { error: "Invalid JSON format" };
        }
        return {
          error:
            error instanceof Error ? error.message : "Failed to process file",
        };
      }
    },
    [validateFileType]
  );

  return {
    handleFile,
    validateFileType,
  };
}
