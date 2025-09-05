export interface LLMResponse {
  id: string;
  timestamp: string;
  model: string;
  prompt_tokens: number;
  completion_tokens: number | null;
  total_tokens: number | null;
  response_time_ms: number;
  status: "success" | "error" | "timeout";
  cost_usd: number;
  temperature: number;
  max_tokens: number;
  prompt_template: string;
  output: string | null;
  evaluation_metrics: {
    relevance_score: number;
    factual_accuracy: number;
    coherence_score: number;
    response_quality: number;
  } | null;
  error: {
    type: string;
    message: string;
  } | null;
}

export interface MockDataFile {
  responses: LLMResponse[];
}

export interface ChartDataPoint {
  timestamp: string;
  responseTime: number;
  model: string;
  status: string;
  id: string;
  total_tokens: number;
  formattedTime?: string;
}

export interface TableRow {
  id: string;
  timestamp: string;
  responseTime: number;
  model: string;
  total_tokens: number;
  status: string;
  formattedTime: string;
  cost_usd: number;
}

export interface AppState {
  responses: LLMResponse[];
  chartData: ChartDataPoint[];
  tableData: TableRow[];
  selectedItems: string[];
  isLoading: boolean;
  error: string | null;
  hasData: boolean;
}

export interface AppContextType {
  state: AppState;
  uploadData: (data: LLMResponse[]) => void;
  selectItems: (ids: string[]) => void;
  resetData: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export interface FileUploadProps {
  onFileUpload: (data: LLMResponse[]) => void;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export interface ResponseTimeChartProps {
  data: ChartDataPoint[];
  selectedItems: string[];
  onItemSelect: (ids: string[]) => void;
}

export interface DataTableProps {
  data: TableRow[];
  selectedItems: string[];
  onSelectionChange: (ids: string[]) => void;
}

export interface ResetButtonProps {
  onReset: () => void;
  disabled?: boolean;
}
