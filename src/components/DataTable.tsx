import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import type { DataTableProps } from '@/types/index'
import { colors } from '@/styles/colors'

export function DataTable({ data, selectedItems, onSelectionChange }: DataTableProps) {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
      renderCell: (params) => (
        <span className="font-mono text-xs text-gray-600">
          {params.value.slice(0, 12)}...
        </span>
      )
    },
    {
      field: 'formattedTime',
      headerName: 'Time',
      width: 120,
      renderCell: (params) => (
        <span className="text-sm">{params.value}</span>
      )
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 140,
      renderCell: (params) => (
        <span className="text-sm font-medium">{params.value}</span>
      )
    },
    {
      field: 'responseTime',
      headerName: 'Response Time',
      type: 'number',
      width: 130,
      renderCell: (params) => (
        <span className="text-sm font-mono">
          {params.value}ms
        </span>
      )
    },
    {
      field: 'total_tokens',
      headerName: 'Tokens',
      type: 'number',
      width: 100,
      renderCell: (params) => (
        <span className="text-sm font-mono">{params.value}</span>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => {
        const isSuccess = params.value === 'success'
        return (
          <span className={`
            text-xs px-2 py-1 rounded-full font-medium
            ${isSuccess 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
            }
          `}>
            {params.value}
          </span>
        )
      }
    },
    {
      field: 'cost_usd',
      headerName: 'Cost',
      type: 'number',
      width: 100,
      renderCell: (params) => (
        <span className="text-sm font-mono text-gray-600">
          ${params.value?.toFixed(4) || '0.0000'}
        </span>
      )
    }
  ]

  const handleSelectionChange = (newSelection: any) => {
    // Convert MUI selection model to string array
    onSelectionChange(newSelection)
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Response Data</h3>
            <p className="text-sm text-gray-600 mt-1">
              {data.length} total responses
              {selectedItems.length > 0 && ` • ${selectedItems.length} selected`}
            </p>
          </div>
        </div>
      </div>
      
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          rowSelectionModel={selectedItems as any}
          onRowSelectionModelChange={handleSelectionChange}
          disableRowSelectionOnClick={false}
          getRowHeight={() => 'auto'}
          sx={{
            border: 0,
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${colors.gray[200]}`,
              fontSize: '0.875rem'
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.gray[50],
              borderBottom: `2px solid ${colors.gray[200]}`,
              fontSize: '0.875rem',
              fontWeight: 600
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: colors.primary[50]
              },
              '&.Mui-selected': {
                backgroundColor: `${colors.primary[100]} !important`,
                '&:hover': {
                  backgroundColor: `${colors.primary[200]} !important`
                }
              }
            },
            '& .MuiCheckbox-root': {
              color: colors.primary[600]
            }
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
            sorting: {
              sortModel: [{ field: 'timestamp', sort: 'desc' }]
            }
          }}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </div>
    </div>
  )
}