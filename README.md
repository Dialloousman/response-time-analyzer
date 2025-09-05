# LLM Response Time Analyzer

A powerful debugging and observability tool for individual developers working with Large Language Models (LLMs). Quickly identify performance bottlenecks, deployment issues, and response time anomalies in your LLM applications.

## 🎯 Perfect for Debugging Scenarios

**Scenario**: Your customers suddenly complain that your LLM-powered app is responding slower than usual.

**Solution**: Upload your response data and immediately see:

- **Timeline view**: Spot exactly when slowdowns started
- **Performance spikes**: Identify problematic time windows
- **Model comparison**: See which models or versions are causing issues
- **Detailed metrics**: Response times, costs, success rates, and token usage

Uploading project.mov…

## 🚀 Quick Start

### Prerequisites

Make sure you have installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd rtot-chart

# Install dependencies
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

The app will start at **http://localhost:5173**

### 3. Upload Your Data

1. **Prepare your LLM response data** in JSON format (see [Data Format](#data-format) below)
2. **Drag & drop** your JSON file into the upload area on the left
3. **Analyze** your response times in the chart and table on the right

That's it! 🎉

## 📊 Data Format

Your JSON file should contain an array of LLM responses with this structure:

```json
{
  "responses": [
    {
      "id": "resp_9129ea8d3f73430ad7dc182e",
      "timestamp": "2025-01-31T23:57:07.986Z",
      "model": "gpt-4",
      "prompt_tokens": 236,
      "completion_tokens": 1898,
      "total_tokens": 2134,
      "response_time_ms": 2370,
      "status": "success",
      "cost_usd": 0.087,
      "temperature": 0.8,
      "max_tokens": 500,
      "prompt_template": "standard_qa",
      "output": "Sample AI-generated output text...",
      "evaluation_metrics": {
        "relevance_score": 0.89,
        "factual_accuracy": 0.88,
        "coherence_score": 0.88,
        "response_quality": 0.86
      },
      "error": null
    }
  ]
}
```

### Required Fields

- `id`: Unique identifier for the response
- `timestamp`: ISO 8601 timestamp
- `model`: LLM model name (e.g., "gpt-4", "claude-3")
- `response_time_ms`: Response time in milliseconds
- `status`: "success", "error", or "timeout"

### Optional Fields

- `prompt_tokens`, `completion_tokens`, `total_tokens`: Token usage
- `cost_usd`: Cost in USD
- `temperature`, `max_tokens`: Model parameters
- `prompt_template`: Template identifier
- `output`: Generated response text
- `evaluation_metrics`: Quality scores
- `error`: Error details (for failed requests)

## 🛠️ How to Use

### 1. Response Time Chart (Top Panel)

- **Timeline view**: See response times over time
- **Click data points**: Get detailed info for specific responses
- **Spot patterns**: Identify performance degradation periods
- **Compare models**: Different models show as different lines

### 2. Data Table (Bottom Panel)

- **Sortable columns**: Click headers to sort by any metric
- **Detailed view**: See all response metadata
- **Filter & search**: Find specific responses quickly
- **Bulk selection**: Select multiple responses for analysis

### 3. Interactive Features

- **Synchronized selection**: Click chart points to highlight in table
- **Real-time filtering**: Table updates based on chart selections
- **Reset button**: Clear data and start over

## 🐛 Debugging Workflow Example

**Problem**: Customers report slow responses after your latest deployment

**Step 1**: Export your LLM response logs to JSON format

**Step 2**: Upload the file to the analyzer

**Step 3**: Look at the Response Time chart:

- See response times jumped from 1s to 10s
- Notice spikes correlate with your deployment time
- Identify which model version is causing issues

**Step 4**: Use the data table to:

- Sort by response time to find worst performers
- Check error rates for problematic periods
- Analyze token usage patterns

**Step 5**: Take action based on insights:

- Rollback problematic deployment
- Switch to better-performing model
- Optimize prompts to reduce token usage

## 🏗️ Architecture

Built with modern React hooks for optimal performance:

```
├── useFileData()     # Raw data management
├── useChartData()    # Chart transformations
├── useTableData()    # Table transformations
└── useChartSync()    # Selection synchronization
```

**Key Features**:

- ✅ **Decoupled components** - Chart and table work independently
- ✅ **Optimized performance** - Smart memoization and data caching
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Responsive design** - Works on any screen size

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Recharts** - Interactive charting
- **MUI DataGrid** - Advanced data table
- **Tailwind CSS** - Styling
- **Vite** - Fast development server

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📝 Sample Data

Want to try the tool immediately? Check out the `src/data/llm_responses.json` file in the repository for example LLM response data you can upload.

## 🤝 Contributing

This tool is designed for individual developer use. If you find bugs or have feature requests:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🙏🏽 Improvement To Come & Future Considerations

1. E2E Testing - Cypress, Playwright.
2. Unit Testing.
3. Dark Mode.
4. Further Accessibility Improvements
5. I8n.
6. Styling.
7. Optimized/Simplified date range handling and selection.

## 📄 License

MIT License - see LICENSE file for details.

---

**Happy debugging!** 🚀 Now you can quickly identify and resolve LLM performance issues before they impact your users.
