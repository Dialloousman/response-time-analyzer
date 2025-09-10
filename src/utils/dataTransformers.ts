import type {
  LLMResponse,
  ChartDataPoint,
  TableRow,
  MockDataFile,
} from "@/types/index";

/**
 * Parses uploaded JSON string into LLM response array.
 * Validates file structure and handles parsing errors gracefully.
 */
export const parseUploadedData = (jsonString: string): LLMResponse[] => {
  try {
    const data: MockDataFile = JSON.parse(jsonString);

    if (!data.responses || !Array.isArray(data.responses)) {
      throw new Error('Invalid data format: Expected "responses" array');
    }

    return data.responses;
  } catch (error) {
    throw new Error(
      `Failed to parse JSON data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Transforms LLM responses into chart-ready data points.
 * Sorts by timestamp and formats data for visualization.
 */
export const transformToChartData = (
  responses: LLMResponse[]
): ChartDataPoint[] => {
  return responses
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .map((response) => ({
      timestamp: response.timestamp,
      responseTime: response.response_time_ms,
      model: response.model,
      status: response.status,
      id: response.id,
      total_tokens: response.total_tokens || 0,
      formattedTime: new Date(response.timestamp).toLocaleString(),
    }));
};

/**
 * Transforms LLM responses into table-ready row data.
 * Sorts by timestamp and formats data for tabular display.
 */
export const transformToTableData = (responses: LLMResponse[]): TableRow[] => {
  return responses
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .map((response) => ({
      id: response.id,
      timestamp: response.timestamp,
      responseTime: response.response_time_ms,
      model: response.model,
      total_tokens: response.total_tokens || 0,
      status: response.status,
      formattedTime: new Date(response.timestamp).toLocaleString(),
      cost_usd: response.cost_usd,
    }));
};

/**
 * Validates that a response object matches the LLMResponse interface.
 * Performs type checking and required field validation.
 */
export const validateResponseData = (
  response: any
): response is LLMResponse => {
  return (
    typeof response === "object" &&
    response !== null &&
    typeof response.id === "string" &&
    typeof response.timestamp === "string" &&
    typeof response.model === "string" &&
    typeof response.response_time_ms === "number" &&
    typeof response.status === "string" &&
    ["success", "error", "timeout"].includes(response.status)
  );
};
