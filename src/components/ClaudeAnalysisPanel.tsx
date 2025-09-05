import React, { useState } from 'react';
import { useClaudeAnalysis } from '../hooks/useClaudeAnalysis';

interface ClaudeAnalysisPanelProps {
  data: any[];
  className?: string;
}

export const ClaudeAnalysisPanel: React.FC<ClaudeAnalysisPanelProps> = ({ 
  data, 
  className = '' 
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const { isLoading, response, error, analyzeData, sendPrompt, clearResponse } = useClaudeAnalysis();

  const handleAnalyzeData = () => {
    analyzeData(data);
  };

  const handleCustomPrompt = () => {
    sendPrompt(customPrompt);
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Claude AI Analysis</h3>
      
      {/* Data Analysis Button */}
      <div className="mb-4">
        <button
          onClick={handleAnalyzeData}
          disabled={isLoading || !data || data.length === 0}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Data with Claude'}
        </button>
        <p className="text-xs text-gray-500 mt-1">
          Claude will analyze your LLM response data for insights and patterns
        </p>
      </div>

      {/* Custom Prompt Section */}
      <div className="mb-4">
        <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Custom Prompt
        </label>
        <textarea
          id="custom-prompt"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Ask Claude anything about your data..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
        <button
          onClick={handleCustomPrompt}
          disabled={isLoading || !customPrompt.trim()}
          className="mt-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {isLoading ? 'Sending...' : 'Send to Claude'}
        </button>
      </div>

      {/* Response Display */}
      {response && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium text-gray-800">Claude's Response</h4>
            <button
              onClick={clearResponse}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Clear
            </button>
          </div>
          
          {response.success ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                {response.content}
              </pre>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-800">
                Error: {response.error || 'Unknown error occurred'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* API Key Notice */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> Make sure to set your VITE_ANTHROPIC_API_KEY in the .env file to use Claude AI features.
        </p>
      </div>
    </div>
  );
};
