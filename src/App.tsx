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

  if (!state.hasData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <FileUpload 
          onFileUpload={uploadData}
          isLoading={state.isLoading}
          error={state.error}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Pane - File Upload (collapsed when data exists) */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <FileUpload 
            onFileUpload={uploadData}
            isLoading={state.isLoading}
            error={state.error}
          />
        </div>

        {/* Right Pane - Visualization */}
        <div className="flex-1 flex flex-col">
          {/* Header with Reset Button */}
          <div className="bg-white border-b border-gray-200 p-4">
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

          {/* Chart Section */}
          <div className="flex-1 p-4">
            <div className="h-80 mb-4">
              <ResponseTimeChart
                data={state.chartData}
                selectedItems={selectedItems}
                onItemSelect={handleChartSelection}
              />
            </div>

            {/* Table Section */}
            <div className="h-96">
              <DataTable
                data={state.tableData}
                selectedItems={selectedItems}
                onSelectionChange={handleTableSelection}
              />
            </div>
          </div>
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
