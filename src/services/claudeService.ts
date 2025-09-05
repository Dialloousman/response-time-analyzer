import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

export interface ClaudeResponse {
  content: string;
  success: boolean;
  error?: string;
}

export const getClaudeResponse = async (prompt: string): Promise<ClaudeResponse> => {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    return {
      content: response.content[0].text,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching response from Claude:', error);
    return {
      content: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export const analyzeDataWithClaude = async (data: any[]): Promise<ClaudeResponse> => {
  const prompt = `Analyze this LLM response data and provide insights about performance patterns, anomalies, or recommendations:

Data: ${JSON.stringify(data.slice(0, 10), null, 2)}${data.length > 10 ? `\n\n(Showing first 10 of ${data.length} total entries)` : ''}

Please provide:
1. Key performance insights
2. Any anomalies or patterns you notice
3. Recommendations for optimization

Keep the response concise and actionable.`;

  return getClaudeResponse(prompt);
};
