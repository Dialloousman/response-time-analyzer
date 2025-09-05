import { FileUpload } from "@/components/FileUpload";
import { ResponseTimeChart } from "@/components/ResponseTimeChart";
import { DataTable } from "@/components/DataTable";
import { ResetButton } from "@/components/ResetButton";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useChartSync } from "@/hooks/useChartSync";
import { useFileData } from "@/hooks/useFileData";
import { useChartData } from "@/hooks/useChartData";
import { useTableData } from "@/hooks/useTableData";

/**
 * Main application content component that orchestrates data flow and UI layout.
 * Manages file upload, chart display, and table interactions with synchronized selection.
 */
function AppContent() {
  const {
    responses,
    isLoading,
    error,
    hasData,
    uploadData,
    resetData,
    setError,
    setLoading,
  } = useFileData();
  const chartData = useChartData(responses);
  const tableData = useTableData(responses);
  const { selectedItems, handleChartSelection, handleTableSelection } =
    useChartSync();

  return (
    <div className="min-h-screen bg-gray-50  w-full">
      <div className="flex h-screen">
        {/* Left Panel - Upload */}
        <div className="w-96 bg-white border-r border-gray-200 flex-shrink-0">
          <FileUpload
            onFileUpload={uploadData}
            isLoading={isLoading}
            error={error}
            setError={setError}
            setLoading={setLoading}
          />
        </div>

        {/* Right Panel - Chart and Table */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Header with Reset Button */}
          {hasData && (
            <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Response Time Analysis
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Analyzing {responses.length} LLM responses
                  </p>
                </div>
                <ResetButton onReset={resetData} disabled={isLoading} />
              </div>
            </div>
          )}

          {hasData ? (
            <div className="flex-1 flex flex-col p-4 gap-4">
              {/* Chart Section - Top Half */}
              <div className="flex-1 min-h-0">
                <ResponseTimeChart
                  data={chartData}
                  selectedItems={selectedItems}
                  onItemSelect={handleChartSelection}
                />
              </div>

              {/* Table Section - Bottom Half */}
              <div className="flex-1 ">
                {tableData && tableData.length > 0 ? (
                  <DataTable
                    data={tableData}
                    selectedItems={selectedItems}
                    onSelectionChange={handleTableSelection}
                  />
                ) : (
                  <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No data to display</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">
                  Upload data to get started
                </p>
                <p className="text-sm mt-1">
                  Select a JSON file from the panel on the left
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Root application component wrapped with error boundary for error handling.
 * Provides the main application shell and error recovery capabilities.
 */
function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
