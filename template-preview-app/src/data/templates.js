// Import from firebase-architect templates
// For now, we'll duplicate the data structure here for the standalone app

export const UI_TEMPLATES = {
  'material-modern': {
    id: 'material-modern',
    name: 'Material Modern',
    description: 'Clean, modern design based on Google Material Design principles. Perfect for data-heavy applications.',
    framework: 'Material-UI (MUI)',
    category: 'enterprise',
    badge: 'Popular',
    defaultConfig: {
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3'
      },
      typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: 14
      },
      spacing: 8,
      borderRadius: 4
    },
    components: ['AppBar', 'Drawer', 'DataGrid', 'Card', 'Button', 'TextField', 'Dialog', 'Menu'],
    layouts: ['dashboard', 'list-view', 'form-view', 'detail-view']
  },

  'ant-design-pro': {
    id: 'ant-design-pro',
    name: 'Ant Design Pro',
    description: 'Enterprise-grade UI design language and React components. Battle-tested in production.',
    framework: 'Ant Design',
    category: 'enterprise',
    defaultConfig: {
      colors: {
        primary: '#1890ff',
        secondary: '#13c2c2',
        success: '#52c41a',
        warning: '#faad14',
        error: '#f5222d',
        info: '#1890ff'
      },
      typography: {
        fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: 14
      },
      spacing: 8,
      borderRadius: 2
    },
    components: ['Table', 'Form', 'Menu', 'Card', 'Modal', 'Button', 'Input', 'Select'],
    layouts: ['dashboard', 'list', 'form', 'detail', 'settings']
  },

  'tailadmin-modern': {
    id: 'tailadmin-modern',
    name: 'TailAdmin Modern',
    description: 'Minimalist Tailwind-based admin template. Highly customizable and performance-optimized.',
    framework: 'Tailwind CSS',
    category: 'modern',
    defaultConfig: {
      colors: {
        primary: '#3c50e0',
        secondary: '#80caee',
        success: '#10b981',
        warning: '#fbbf24',
        error: '#ef4444',
        info: '#3b82f6'
      },
      typography: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 14
      },
      spacing: 4,
      borderRadius: 6
    },
    components: ['Card', 'Button', 'Input', 'Table', 'Modal', 'Dropdown', 'Badge', 'Alert'],
    layouts: ['dashboard', 'analytics', 'tables', 'forms']
  },

  'coreui-enterprise': {
    id: 'coreui-enterprise',
    name: 'CoreUI Enterprise',
    description: 'Bootstrap-based admin template for enterprise applications. Professional and reliable.',
    framework: 'CoreUI (Bootstrap)',
    category: 'enterprise',
    defaultConfig: {
      colors: {
        primary: '#321fdb',
        secondary: '#9da5b1',
        success: '#2eb85c',
        warning: '#f9b115',
        error: '#e55353',
        info: '#39f'
      },
      typography: {
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontSize: 14
      },
      spacing: 16,
      borderRadius: 4
    },
    components: ['Card', 'Button', 'Form', 'Table', 'Nav', 'Modal', 'Badge', 'Alert'],
    layouts: ['dashboard', 'widgets', 'charts', 'tables']
  },

  'shadcn-modern': {
    id: 'shadcn-modern',
    name: 'Shadcn Modern',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS. Copy and own.',
    framework: 'Shadcn/ui',
    category: 'modern',
    badge: 'New',
    defaultConfig: {
      colors: {
        primary: 'hsl(222.2 47.4% 11.2%)',
        secondary: 'hsl(210 40% 96.1%)',
        success: 'hsl(142.1 76.2% 36.3%)',
        warning: 'hsl(38 92% 50%)',
        error: 'hsl(0 84.2% 60.2%)',
        info: 'hsl(221.2 83.2% 53.3%)'
      },
      typography: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 14
      },
      spacing: 4,
      borderRadius: 8
    },
    components: ['Card', 'Button', 'Input', 'Select', 'DataTable', 'Dialog', 'DropdownMenu', 'Alert'],
    layouts: ['dashboard', 'tasks', 'mail', 'playground', 'settings']
  },

  'clean-accessible': {
    id: 'clean-accessible',
    name: 'Clean Accessible',
    description: 'Beautiful, highly accessible design inspired by Med Refills app. WCAG AAA compliant with excellent readability.',
    framework: 'React + Material-UI',
    category: 'professional',
    badge: 'Popular',
    defaultConfig: {
      colors: {
        primary: '#0066cc',
        secondary: '#00a86b',
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545',
        info: '#17a2b8'
      },
      typography: {
        fontFamily: "'Open Sans', 'Helvetica Neue', Arial, sans-serif",
        fontSize: 16
      },
      spacing: 16,
      borderRadius: 8
    },
    components: ['Card', 'Button', 'Input', 'Select', 'DataTable', 'SearchBar', 'FilterPanel', 'ActionMenu'],
    layouts: ['dashboard', 'list-with-filters', 'detail-view', 'profile', 'settings']
  },

  'linear-modern': {
    id: 'linear-modern',
    name: 'Linear Modern',
    description: 'Minimalist, keyboard-first design inspired by Linear. Fast, clean, and efficient.',
    framework: 'React + Tailwind',
    category: 'modern',
    badge: 'Fast',
    defaultConfig: {
      colors: {
        primary: '#5e6ad2',
        secondary: '#8b8d98',
        success: '#0f9960',
        warning: '#ffab00',
        error: '#e5493a',
        info: '#4dabf7'
      },
      typography: {
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontSize: 14
      },
      spacing: 8,
      borderRadius: 6
    },
    components: ['CommandBar', 'IssueCard', 'Sidebar', 'Modal', 'Dropdown'],
    layouts: ['issues', 'projects', 'roadmap', 'inbox']
  },

  'notion-flexible': {
    id: 'notion-flexible',
    name: 'Notion Flexible',
    description: 'Block-based, highly flexible design inspired by Notion. Drag-and-drop everything.',
    framework: 'React + Custom Blocks',
    category: 'modern',
    badge: 'Flexible',
    defaultConfig: {
      colors: {
        primary: '#2383e2',
        secondary: '#787774',
        success: '#0f7b6c',
        warning: '#f3aa18',
        error: '#eb5757',
        info: '#529cca'
      },
      typography: {
        fontFamily: "'ui-sans-serif', -apple-system, sans-serif",
        fontSize: 14
      },
      spacing: 8,
      borderRadius: 3
    },
    components: ['Block', 'Page', 'Database', 'PropertyPicker', 'Sidebar'],
    layouts: ['page', 'database', 'calendar', 'board']
  },

  'asana-robust': {
    id: 'asana-robust',
    name: 'Asana Robust',
    description: 'Full-featured project management UI inspired by Asana. Lists, boards, timelines.',
    framework: 'React + Redux',
    category: 'enterprise',
    badge: 'Robust',
    defaultConfig: {
      colors: {
        primary: '#f06a6a',
        secondary: '#848199',
        success: '#6fc194',
        warning: '#fcc34d',
        error: '#ff6b6b',
        info: '#4299e1'
      },
      typography: {
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontSize: 13
      },
      spacing: 8,
      borderRadius: 4
    },
    components: ['TaskCard', 'ListView', 'BoardView', 'Timeline', 'Sidebar', 'CustomFields'],
    layouts: ['list', 'board', 'timeline', 'calendar', 'portfolio']
  },

  'airtable-grid': {
    id: 'airtable-grid',
    name: 'Airtable Grid',
    description: 'Spreadsheet-like grid view inspired by Airtable. Excel meets database power.',
    framework: 'React + Grid System',
    category: 'modern',
    badge: 'Data',
    defaultConfig: {
      colors: {
        primary: '#2d7ff9',
        secondary: '#6c757d',
        success: '#18bfff',
        warning: '#fcb400',
        error: '#f82b60',
        info: '#2d7ff9'
      },
      typography: {
        fontFamily: "'Inter', -apple-system, sans-serif",
        fontSize: 13
      },
      spacing: 0,
      borderRadius: 4
    },
    components: ['GridCell', 'ColumnHeader', 'RowNumber', 'FieldType', 'FilterBar'],
    layouts: ['grid', 'gallery', 'kanban', 'calendar']
  },

  'monday-timeline': {
    id: 'monday-timeline',
    name: 'Monday Timeline',
    description: 'Timeline and Gantt view inspired by Monday.com. Visual project scheduling.',
    framework: 'React + Timeline',
    category: 'enterprise',
    badge: 'Visual',
    defaultConfig: {
      colors: {
        primary: '#ff5ac4',
        secondary: '#676879',
        success: '#00ca72',
        warning: '#fdab3d',
        error: '#e44258',
        info: '#0086c0'
      },
      typography: {
        fontFamily: "'Poppins', -apple-system, sans-serif",
        fontSize: 14
      },
      spacing: 8,
      borderRadius: 6
    },
    components: ['TimelineBar', 'TaskRow', 'DateHeader', 'GroupCollapse', 'StatusColumn'],
    layouts: ['main-table', 'timeline', 'calendar', 'gantt']
  },

  'trello-board': {
    id: 'trello-board',
    name: 'Trello Board',
    description: 'Visual card-based board inspired by Trello. Simple, intuitive drag and drop.',
    framework: 'React + DnD',
    category: 'modern',
    badge: 'Simple',
    defaultConfig: {
      colors: {
        primary: '#0079bf',
        secondary: '#5e6c84',
        success: '#61bd4f',
        warning: '#f2d600',
        error: '#eb5a46',
        info: '#00c2e0'
      },
      typography: {
        fontFamily: "'-apple-system', BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: 14
      },
      spacing: 8,
      borderRadius: 8
    },
    components: ['Card', 'List', 'Board', 'Label', 'Checklist', 'CoverImage'],
    layouts: ['board']
  }
};

export const COLOR_PALETTES = {
  'grayscale-minimal': {
    primary: '#1a1a1a',
    secondary: '#666666',
    success: '#2d3748',
    warning: '#4a5568',
    error: '#000000',
    info: '#4a5568'
  },
  'charcoal-pro': {
    primary: '#2d3748',
    secondary: '#4a5568',
    success: '#48bb78',
    warning: '#ed8936',
    error: '#f56565',
    info: '#4299e1'
  },
  'vibrant-bold': {
    primary: '#e91e63',
    secondary: '#9c27b0',
    success: '#00e676',
    warning: '#ffea00',
    error: '#ff1744',
    info: '#00b0ff'
  },
  'ocean-blue': {
    primary: '#0077b6',
    secondary: '#00b4d8',
    success: '#06d6a0',
    warning: '#ffd60a',
    error: '#ef476f',
    info: '#0096c7'
  },
  'sunset-warm': {
    primary: '#ff6b35',
    secondary: '#f7931e',
    success: '#6ab04c',
    warning: '#f9ca24',
    error: '#eb4d4b',
    info: '#4834d4'
  },
  'forest-earth': {
    primary: '#2d6a4f',
    secondary: '#52b788',
    success: '#40916c',
    warning: '#e76f51',
    error: '#d62828',
    info: '#457b9d'
  },
  'royal-purple': {
    primary: '#6a4c93',
    secondary: '#8a5a44',
    success: '#52b788',
    warning: '#fb8500',
    error: '#d62828',
    info: '#4361ee'
  },
  'neon-cyber': {
    primary: '#00fff9',
    secondary: '#ff006e',
    success: '#39ff14',
    warning: '#ffbe0b',
    error: '#ff006e',
    info: '#8338ec'
  },
  'pastel-soft': {
    primary: '#a8dadc',
    secondary: '#f1faee',
    success: '#90e0ef',
    warning: '#ffd97d',
    error: '#e76f51',
    info: '#457b9d'
  },
  'midnight-dark': {
    primary: '#0d1b2a',
    secondary: '#1b263b',
    success: '#2a9d8f',
    warning: '#e9c46a',
    error: '#e76f51',
    info: '#457b9d'
  }
};

export const FONT_COMBINATIONS = {
  'roboto-modern': {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    description: 'Clean and modern, perfect for data-heavy apps'
  },
  'inter-professional': {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    description: 'Professional and highly readable'
  },
  'opensans-friendly': {
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial, sans-serif",
    description: 'Friendly and accessible, great for healthcare'
  },
  'poppins-bold': {
    fontFamily: "'Poppins', sans-serif",
    description: 'Bold and modern, makes a statement'
  },
  'lato-elegant': {
    fontFamily: "'Lato', 'Helvetica Neue', Arial, sans-serif",
    description: 'Elegant and professional'
  },
  'system-native': {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    description: 'Native system fonts for best performance'
  }
};

export function getTemplate(templateId) {
  return UI_TEMPLATES[templateId];
}

export function getAllTemplates() {
  return Object.values(UI_TEMPLATES);
}

export function getTemplatesByCategory(category) {
  return getAllTemplates().filter(t => t.category === category);
}

export function getCategories() {
  return [...new Set(getAllTemplates().map(t => t.category))];
}
