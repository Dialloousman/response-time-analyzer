/**
 * Represents a single LLM response with timing, token usage, and evaluation metrics.
 * Contains all data points needed for analysis and visualization.
 */
export interface LLMResponse {
  /** Unique identifier for the response */
  id: string;
  /** ISO timestamp when the response was generated */
  timestamp: string;
  /** Name of the LLM model used */
  model: string;
  /** Number of tokens in the input prompt */
  prompt_tokens: number;
  /** Number of tokens in the generated response */
  completion_tokens: number | null;
  /** Total tokens used (prompt + completion) */
  total_tokens: number | null;
  /** Response time in milliseconds */
  response_time_ms: number;
  /** Status of the response generation */
  status: "success" | "error" | "timeout";
  /** Cost in USD for this response */
  cost_usd: number;
  /** Temperature setting used for generation */
  temperature: number;
  /** Maximum tokens allowed for generation */
  max_tokens: number;
  /** Template used for the prompt */
  prompt_template: string;
  /** Generated response text */
  output: string | null;
  /** Quality evaluation metrics for the response */
  evaluation_metrics: {
    /** Relevance score (0-1) */
    relevance_score: number;
    /** Factual accuracy score (0-1) */
    factual_accuracy: number;
    /** Coherence score (0-1) */
    coherence_score: number;
    /** Overall response quality score (0-1) */
    response_quality: number;
  } | null;
  /** Error information if response failed */
  error: {
    /** Type of error that occurred */
    type: string;
    /** Error message description */
    message: string;
  } | null;
}

/**
 * Container for uploaded JSON data containing an array of LLM responses.
 * Used for parsing and validating uploaded file structure.
 */
export interface MockDataFile {
  /** Array of LLM response objects */
  responses: LLMResponse[];
}

/**
 * Data point format optimized for chart visualization.
 * Includes formatted time strings and essential metrics for plotting.
 */
export interface ChartDataPoint {
  /** ISO timestamp for the data point */
  timestamp: string;
  /** Response time in milliseconds */
  responseTime: number;
  /** Name of the LLM model */
  model: string;
  /** Status of the response */
  status: string;
  /** Unique identifier for the response */
  id: string;
  /** Total tokens used */
  total_tokens: number;
  /** Human-readable formatted timestamp */
  formattedTime?: string;
}

/**
 * Row data format optimized for table display.
 * Includes formatted timestamps and cost information for tabular presentation.
 */
export interface TableRow {
  /** Unique identifier for the response */
  id: string;
  /** ISO timestamp for the response */
  timestamp: string;
  /** Response time in milliseconds */
  responseTime: number;
  /** Name of the LLM model */
  model: string;
  /** Total tokens used */
  total_tokens: number;
  /** Status of the response */
  status: string;
  /** Human-readable formatted timestamp */
  formattedTime: string;
  /** Cost in USD for this response */
  cost_usd: number;
}

/**
 * Complete application state containing all data and UI state.
 * Centralized state management for the entire application.
 */
export interface AppState {
  /** Array of raw LLM response data */
  responses: LLMResponse[];
  /** Chart-optimized data points */
  chartData: ChartDataPoint[];
  /** Table-optimized row data */
  tableData: TableRow[];
  /** Currently selected item IDs */
  selectedItems: string[];
  /** Loading state indicator */
  isLoading: boolean;
  /** Current error message */
  error: string | null;
  /** Whether data has been loaded */
  hasData: boolean;
}

/**
 * Context interface for sharing application state and actions.
 * Provides type safety for context consumers throughout the app.
 */
export interface AppContextType {
  /** Current application state */
  state: AppState;
  /** Upload new response data */
  uploadData: (data: LLMResponse[]) => void;
  /** Select items by their IDs */
  selectItems: (ids: string[]) => void;
  /** Reset all data and state */
  resetData: () => void;
  /** Set error message */
  setError: (error: string | null) => void;
  /** Set loading state */
  setLoading: (loading: boolean) => void;
}

/**
 * Props for the file upload component.
 * Handles file processing callbacks and loading/error state management.
 */
export interface FileUploadProps {
  /** Callback when file is successfully uploaded and parsed */
  onFileUpload: (data: LLMResponse[]) => void;
  /** Whether file is currently being processed */
  isLoading: boolean;
  /** Current error message to display */
  error: string | null;
  /** Function to set error message */
  setError: (error: string | null) => void;
  /** Function to set loading state */
  setLoading: (loading: boolean) => void;
}

/**
 * Props for the response time chart component.
 * Manages chart data display and item selection interactions.
 */
export interface ResponseTimeChartProps {
  /** Chart data points to display */
  data: ChartDataPoint[];
  /** Currently selected item IDs */
  selectedItems: string[];
  /** Callback when items are selected in the chart */
  onItemSelect: (ids: string[]) => void;
}

/**
 * Props for the data table component.
 * Handles table data display and row selection management.
 */
export interface DataTableProps {
  /** Table row data to display */
  data: TableRow[];
  /** Currently selected item IDs */
  selectedItems: string[];
  /** Callback when selection changes in the table */
  onSelectionChange: (ids: string[]) => void;
}

/**
 * Props for the reset button component.
 * Manages reset action callback and disabled state.
 */
export interface ResetButtonProps {
  /** Callback function when reset button is clicked */
  onReset: () => void;
  /** Whether the button should be disabled */
  disabled?: boolean;
}
