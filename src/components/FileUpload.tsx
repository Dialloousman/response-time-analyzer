import { useDropzone } from 'react-dropzone'
import type { FileUploadProps } from '@/types/index'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useAppContext } from '@/context/AppContext'

export function FileUpload({ onFileUpload, isLoading, error }: FileUploadProps) {
  const { handleFile } = useFileUpload()
  const { setError, setLoading } = useAppContext()

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setLoading(true)
    setError(null)

    try {
      const result = await handleFile(file)
      
      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        onFileUpload(result.data)
      }
    } catch (err) {
      setError('Failed to process file')
    } finally {
      setLoading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    multiple: false,
    disabled: isLoading
  })

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex-shrink-0 mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Upload Response Data
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload JSON file with LLM response data
        </p>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div
          {...getRootProps()}
          className={`
            w-full border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-3">
            <div className="text-gray-600">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Processing...</span>
                </div>
              ) : isDragActive ? (
                <p className="text-sm">Drop your JSON file here...</p>
              ) : (
                <div>
                  <p className="text-sm font-medium mb-1">Drag & drop JSON file</p>
                  <p className="text-xs text-gray-500">or click to select</p>
                </div>
              )}
            </div>
            
            {!isLoading && (
              <div className="text-xs text-gray-400">
                JSON files with LLM response data
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex-shrink-0">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500 flex-shrink-0">
        <p className="mb-1">Expected format:</p>
        <p>Array of response objects with id, timestamp, response_time_ms, model, etc.</p>
      </div>
    </div>
  )
}