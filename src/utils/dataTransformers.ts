import type {
  LLMResponse,
  ChartDataPoint,
  TableRow,
  MockDataFile,
} from "@/types/index";

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

export const transformToChartData = (
  responses: LLMResponse[]
): ChartDataPoint[] => {
  return responses.map((response) => ({
    timestamp: response.timestamp,
    responseTime: response.response_time_ms,
    model: response.model,
    status: response.status,
    id: response.id,
    total_tokens: response.total_tokens || 0,
    formattedTime: new Date(response.timestamp).toLocaleString(),
  }));
};

export const transformToTableData = (responses: LLMResponse[]): TableRow[] => {
  return responses.map((response) => ({
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

export const getDataStats = (responses: LLMResponse[]) => {
  if (responses.length === 0) {
    return {
      totalResponses: 0,
      successCount: 0,
      errorCount: 0,
      timeoutCount: 0,
      averageResponseTime: 0,
      models: [],
      dateRange: { start: null, end: null },
    };
  }

  const successResponses = responses.filter((r) => r.status === "success");
  const errorResponses = responses.filter((r) => r.status === "error");
  const timeoutResponses = responses.filter((r) => r.status === "timeout");

  const models = [...new Set(responses.map((r) => r.model))];
  const timestamps = responses.map((r) => new Date(r.timestamp)).sort();

  const averageResponseTime =
    successResponses.length > 0
      ? successResponses.reduce((sum, r) => sum + r.response_time_ms, 0) /
        successResponses.length
      : 0;

  return {
    totalResponses: responses.length,
    successCount: successResponses.length,
    errorCount: errorResponses.length,
    timeoutCount: timeoutResponses.length,
    averageResponseTime: Math.round(averageResponseTime),
    models,
    dateRange: {
      start: timestamps[0] || null,
      end: timestamps[timestamps.length - 1] || null,
    },
  };
};
