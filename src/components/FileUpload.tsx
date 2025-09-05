import { useDropzone } from 'react-dropzone'
import type { FileUploadProps } from '@/types'
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
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Upload Response Data
        </h2>
        
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <div className="text-gray-600">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span>Processing file...</span>
                </div>
              ) : isDragActive ? (
                <p>Drop your JSON file here...</p>
              ) : (
                <div>
                  <p className="text-lg font-medium mb-2">Drag & drop your JSON file here</p>
                  <p className="text-sm text-gray-500">or click to select</p>
                </div>
              )}
            </div>
            
            {!isLoading && (
              <div className="text-xs text-gray-400">
                Supported format: JSON files with LLM response data
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>Expected format: Array of response objects with fields like</p>
          <p>id, timestamp, response_time_ms, model, etc.</p>
        </div>
      </div>
    </div>
  )
}