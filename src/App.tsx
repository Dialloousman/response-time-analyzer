import { AppProvider, useAppContext } from '@/context/AppContext'
import { FileUpload } from '@/components/FileUpload'
import { ResponseTimeChart } from '@/components/ResponseTimeChart'
import { DataTable } from '@/components/DataTable'
import { ResetButton } from '@/components/ResetButton'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useChartSync } from '@/hooks/useChartSync'

function AppContent() {
  const { state, uploadData, resetData } = useAppContext()
  const { selectedItems, handleChartSelection, handleTableSelection } = useChartSync()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Panel - Upload */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <FileUpload 
            onFileUpload={uploadData}
            isLoading={state.isLoading}
            error={state.error}
          />
        </div>

        {/* Right Panel - Chart and Table */}
        <div className="flex-1 flex flex-col">
          {/* Header with Reset Button */}
          {state.hasData && (
            <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Response Time Analysis
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Analyzing {state.responses.length} LLM responses
                  </p>
                </div>
                <ResetButton 
                  onReset={resetData}
                  disabled={state.isLoading}
                />
              </div>
            </div>
          )}

          {state.hasData ? (
            <div className="flex-1 flex flex-col p-4 gap-4">
              {/* Chart Section - Top Half */}
              <div className="flex-1 min-h-0">
                <ResponseTimeChart
                  data={state.chartData}
                  selectedItems={selectedItems}
                  onItemSelect={handleChartSelection}
                />
              </div>

              {/* Table Section - Bottom Half */}
              <div className="flex-1 min-h-0">
                <DataTable
                  data={state.tableData}
                  selectedItems={selectedItems}
                  onSelectionChange={handleTableSelection}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">Upload data to get started</p>
                <p className="text-sm mt-1">Select a JSON file from the panel on the left</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
