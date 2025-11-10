// Import from firebase-architect templates
// For now, we'll duplicate the data structure here for the standalone app

export const UI_TEMPLATES = {
  'material-modern': {
    id: 'material-modern',
    name: 'Material Modern',
    description: 'Clean, modern design based on Google Material Design principles. Perfect for data-heavy applications.',
    framework: 'Material-UI (MUI)',
    category: 'enterprise',
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
  }
};

export const COLOR_PALETTES = {
  'blue-professional': {
    primary: '#1976d2',
    secondary: '#dc004e',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3'
  },
  'green-healthcare': {
    primary: '#00a86b',
    secondary: '#0066cc',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8'
  },
  'purple-creative': {
    primary: '#6c63ff',
    secondary: '#ff6b9d',
    success: '#4caf50',
    warning: '#ffa726',
    error: '#ef5350',
    info: '#42a5f5'
  },
  'teal-modern': {
    primary: '#14b8a6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  'indigo-enterprise': {
    primary: '#3730a3',
    secondary: '#059669',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#dc2626',
    info: '#2563eb'
  },
  'orange-energetic': {
    primary: '#ea580c',
    secondary: '#0891b2',
    success: '#16a34a',
    warning: '#ca8a04',
    error: '#dc2626',
    info: '#0284c7'
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
