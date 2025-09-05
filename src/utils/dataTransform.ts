import type { LLMResponse, ChartDataPoint, TableRow } from '@/types'

export function transformToChartData(responses: LLMResponse[]): ChartDataPoint[] {
  return responses.map(response => ({
    id: response.id,
    timestamp: response.timestamp,
    responseTime: response.response_time_ms,
    model: response.model,
    status: response.status,
    total_tokens: response.total_tokens,
    formattedTime: formatTimestamp(response.timestamp)
  }))
}

export function transformToTableData(responses: LLMResponse[]): TableRow[] {
  return responses.map(response => ({
    id: response.id,
    timestamp: response.timestamp,
    responseTime: response.response_time_ms,
    model: response.model,
    total_tokens: response.total_tokens,
    status: response.status,
    formattedTime: formatTimestamp(response.timestamp),
    cost_usd: response.cost_usd
  }))
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export function isValidLLMResponseArray(data: any): data is LLMResponse[] {
  if (!Array.isArray(data)) {
    return false
  }

  // Check if at least the essential fields are present
  return data.every(item => 
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.timestamp === 'string' &&
    typeof item.response_time_ms === 'number' &&
    typeof item.model === 'string' &&
    typeof item.total_tokens === 'number' &&
    typeof item.status === 'string'
  )
}

export function detectAnomalies(responses: LLMResponse[]): string[] {
  if (responses.length === 0) return []

  const responseTimes = responses.map(r => r.response_time_ms)
  const mean = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
  const stdDev = Math.sqrt(
    responseTimes.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / responseTimes.length
  )

  const threshold = mean + (2 * stdDev)

  return responses
    .filter(response => response.response_time_ms > threshold)
    .map(response => response.id)
}