import type { ResetButtonProps } from '@/types'

export function ResetButton({ onReset, disabled = false }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      disabled={disabled}
      className={`
        px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-200
        ${disabled
          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        }
      `}
      title="Upload a different dataset"
    >
      <div className="flex items-center space-x-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>Reset</span>
      </div>
    </button>
  )
}