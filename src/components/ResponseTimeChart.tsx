import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'
import type { ResponseTimeChartProps } from '@/types'
import { colors } from '@/styles/colors'


export function ResponseTimeChart({ data, selectedItems, onItemSelect }: ResponseTimeChartProps) {
  const handleClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const clickedId = data.activePayload[0].payload.id
      onItemSelect([clickedId])
    }
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">
            {new Date(data.timestamp).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Response Time: <span className="font-medium text-gray-900">{data.responseTime}ms</span>
          </p>
          <p className="text-sm text-gray-600">
            Model: <span className="font-medium text-gray-900">{data.model}</span>
          </p>
          <p className="text-sm text-gray-600">
            Tokens: <span className="font-medium text-gray-900">{data.total_tokens}</span>
          </p>
          <p className="text-sm text-gray-600">
            Status: <span className={`font-medium ${data.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {data.status}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  const formatXAxisLabel = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  
  // Calculate average response time for reference line
  const avgResponseTime = data.length > 0 
    ? data.reduce((sum, d) => sum + d.responseTime, 0) / data.length 
    : 0

  return (
    <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Response Time Over Time</h3>
        <p className="text-sm text-gray-600 mt-1">
          {data.length} responses • Click on data points for details
        </p>
      </div>
      
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            onClick={handleClick}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={colors.gray[200]} />
            <XAxis
              dataKey="timestamp"
              tick={{ fontSize: 12 }}
              tickFormatter={formatXAxisLabel}
              stroke={colors.gray[600]}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke={colors.gray[600]}
              label={{ value: 'Response Time (ms)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Reference line for average */}
            <ReferenceLine 
              y={avgResponseTime} 
              stroke={colors.gray[400]} 
              strokeDasharray="5 5"
              label={{ value: `Avg: ${Math.round(avgResponseTime)}ms`, position: 'top' }}
            />
            
            {/* Single line for all data points */}
            <Line
              type="monotone"
              dataKey="responseTime"
              stroke={colors.primary[600]}
              strokeWidth={2}
              dot={{ r: 4, fill: colors.primary[600] }}
              activeDot={{ 
                r: 6, 
                stroke: colors.primary[600],
                strokeWidth: 2,
                fill: 'white'
              }}
              name="Response Time"
              connectNulls={false}
            />
            
            {/* Highlight selected items */}
            {selectedItems.length > 0 && (
              <Line
                type="monotone"
                dataKey="responseTime"
                data={data.filter(d => selectedItems.includes(d.id))}
                stroke={colors.red[500]}
                strokeWidth={3}
                dot={{ r: 6, fill: colors.red[500] }}
                name="Selected"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}