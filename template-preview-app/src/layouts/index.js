// Layout Templates Export
// Central export for all layout components

import DashboardGridLayout from './DashboardGridLayout';
import SpreadsheetLayout from './SpreadsheetLayout';
import KanbanLayout from './KanbanLayout';

export const LAYOUT_TEMPLATES = {
  dashboardGrid: {
    id: 'dashboardGrid',
    name: 'Dashboard Grid',
    description: 'Traditional dashboard with metrics, charts, and tables in a grid layout',
    component: DashboardGridLayout,
    category: 'dashboard',
    preview: 'Grid layout with stats cards, charts, and data tables'
  },
  spreadsheet: {
    id: 'spreadsheet',
    name: 'Spreadsheet',
    description: 'Dense table-focused layout similar to Airtable or Google Sheets',
    component: SpreadsheetLayout,
    category: 'data',
    preview: 'Dense data table with sticky headers and horizontal scrolling'
  },
  kanban: {
    id: 'kanban',
    name: 'Kanban Board',
    description: 'Vertical columns layout for project management and task tracking',
    component: KanbanLayout,
    category: 'project',
    preview: 'Horizontal scrolling columns with cards (Trello-style)'
  }
};

export const LAYOUT_TEMPLATE_LIST = Object.values(LAYOUT_TEMPLATES);

// Helper function to get layout by ID
export function getLayout(id) {
  return LAYOUT_TEMPLATES[id] || LAYOUT_TEMPLATES.dashboardGrid;
}
