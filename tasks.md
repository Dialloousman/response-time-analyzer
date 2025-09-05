# Response Time Over Time (RTOT) Chart - Implementation Tasks

## Project Overview

Building a React application with Vite + TypeScript that visualizes LLM response time data with a two-pane UI:

- **Left Pane**: Data upload page with drag-and-drop JSON file upload
- **Right Pane**: Data visualization page with chart (top) and data grid (bottom) + reset functionality

Based on HoneyHive take-home requirements with focus on code quality, performance with 1000+ responses, and clean UX.

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Data Table**: MUI DataGrid
- **State Management**: React Context + Custom Hooks
- **Testing**: Jest + React Testing Library

## Implementation Tasks

### Phase 1: Project Setup & Foundation

- [x] 1.1 Initialize Vite + React + TypeScript project
- [x] 1.2 Install and configure Tailwind CSS
- [x] 1.3 Install core dependencies (Recharts, MUI DataGrid, react-dropzone)
- [x] 1.4 Set up TypeScript configuration with path aliases
- [x] 1.5 Configure Vite for path resolution
- [x] 1.6 Set up basic project structure (components/, hooks/, context/, types/, utils/, **tests**/, data/)

### Phase 2: Type Definitions & Data Models

- [x] 2.1 Create TypeScript interfaces for response data structure
- [x] 2.2 Define context types for state management
- [x] 2.4 Define component prop types

### Phase 3: State Management & Custom Hooks

- [x] 3.1 Create React Context for global state (file data, selected items, filters)
- [x] 3.2 Implement custom hook for file upload logic
- [x] 3.3 Implement custom hook for data transformation (chart data, table data)
- [x] 3.4 Implement custom hook for chart-table synchronization
- [ ] 3.5 Implement custom hook for filtering logic

### Phase 4: Core Components

- [x] 4.1 Create FileUpload component (drag-and-drop + manual selection) - Left Pane
- [x] 4.2 Create ResponseTimeChart component (Recharts line chart) - Right Pane Top
- [x] 4.3 Create DataTable component (MUI DataGrid) - Right Pane Bottomgreat
- [x] 4.4 Create ResetButton component - Right Pane Top Right
- [x] 4.5 Create main App layout with two-pane design (left: upload, right: visualization)
- [x] 4.6 Create LoadingStates and ErrorBoundary components

### Phase 5: Data Transformation & Business Logic

- [x] 5.1 Implement data parsing utilities for JSON files
- [x] 5.2 Create chart data transformation functions
- [x] 5.3 Implement table data formatting utilities
- [ ] 5.4 Create filtering and sorting utilities
- [x] 5.5 Implement anomaly detection for chart markers

### Phase 6: Integration & Synchronization

- [x] 6.1 Connect chart and table selection synchronization
- [x] 6.2 Implement tooltip data display
- [x] 6.3 Add visual feedback for file upload states
- [x] 6.4 Implement responsive design adjustments
- [x] 6.5 Add error handling and validation

### Phase 7: Testing Implementation

- [ ] 7.1 Set up Jest and React Testing Library configuration
- [ ] 7.2 Create test utilities and mock data factories
- [ ] 7.3 Write unit tests for custom hooks
- [ ] 7.4 Write component tests for presentational components
- [ ] 7.5 Write integration tests for chart-table synchronization
- [ ] 7.6 Write tests for data transformation utilities

### Phase 8: Polish & Documentation

- [ ] 8.1 Add comprehensive error boundaries
- [ ] 8.2 Implement loading states and skeleton components
- [ ] 8.3 Add accessibility improvements (ARIA labels, keyboard navigation)
- [ ] 8.4 Create comprehensive README with setup instructions and approach explanation
- [ ] 8.5 Document key decisions and assumptions made
- [ ] 8.6 Performance optimization for large datasets (1000+ responses)
- [ ] 8.7 Add "What I'd improve with more time" section to README

### Phase 9: Final Integration & Testing

- [ ] 9.1 End-to-end testing of complete user flow
- [ ] 9.2 Performance testing with large datasets (1000+ entries)
- [ ] 9.3 Cross-browser compatibility testing
- [ ] 9.4 Mobile responsiveness verification
- [ ] 9.5 Final code review and cleanup

## Success Criteria

- [ ] **Upload & Process Data**: Drag-and-drop JSON file upload works smoothly with 1000+ responses
- [ ] **Visualize the Data**: One clear visualization (response times over time) with tooltips and labels
- [ ] **Present Data Gracefully**: Clean data grid showing individual responses without layout breaks
- [ ] **Refine Component Rendering**: Minimal re-renders, synchronized visualization and grid
- [ ] **Code Quality**: Well-structured codebase with proper state management and library choices
- [ ] **Performance**: Handles large datasets smoothly with optimized rendering
- [ ] **Error Handling**: Proper error states and edge case handling
- [ ] **UX Design**: Clean, intuitive interface matching the wireframe design
- [ ] **Documentation**: Comprehensive README with setup, approach, and assumptions

## Notes

- **UI Layout**: Two-pane design - Left: Data upload page, Right: Data visualization page (chart top, table bottom)
- **Reset Functionality**: Reset button in top-right of visualization pane to upload different dataset
- **Performance Focus**: Optimize for 1000+ responses with minimal re-renders
- **Code Quality**: Think like a technical lead - what codebase would you want to inherit?
- **Error States**: Consider loading states and error handling throughout
- **Documentation**: Document key decisions and what you'd improve with more time
- **Separation of Concerns**: Hooks for data transformation, components for presentation
- **TypeScript**: Strict typing for better maintainability and developer experience
