import { useCallback } from "react";
import type { LLMResponse } from "@/types/index";
import {
  parseUploadedData,
  validateResponseData,
} from "@/utils/dataTransformers";

interface UseFileUploadResult {
  /** Function to process uploaded file and return parsed data or error */
  handleFile: (file: File) => Promise<{ data?: LLMResponse[]; error?: string }>;
  /** Function to validate if file type is supported */
  validateFileType: (file: File) => boolean;
}

/**
 * Handles file upload processing with validation and error handling.
 * Validates file types and parses JSON data into LLM response format.
 */
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
