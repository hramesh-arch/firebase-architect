// Template Configuration
// Central configuration separating Design Systems, Layouts, and Color Themes

import { DESIGN_SYSTEMS, DESIGN_SYSTEM_LIST } from '../designSystems';
import { LAYOUT_TEMPLATES, LAYOUT_TEMPLATE_LIST } from '../layouts';

// Color Themes - User-customizable color palettes
// These can be applied to any Design System + Layout combination
export const COLOR_THEMES = {
  blue: {
    id: 'blue',
    name: 'Ocean Blue',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827'
    }
  },
  purple: {
    id: 'purple',
    name: 'Royal Purple',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827'
    }
  },
  green: {
    id: 'green',
    name: 'Forest Green',
    colors: {
      primary: '#10b981',
      secondary: '#14b8a6',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827'
    }
  },
  orange: {
    id: 'orange',
    name: 'Sunset Orange',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      success: '#10b981',
      warning: '#fbbf24',
      error: '#ef4444',
      info: '#06b6d4',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827'
    }
  },
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#06b6d4',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9'
    }
  }
};

export const COLOR_THEME_LIST = Object.values(COLOR_THEMES);

// Typography Options
export const TYPOGRAPHY_OPTIONS = {
  system: {
    id: 'system',
    name: 'System Default',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontSize: 14
  },
  roboto: {
    id: 'roboto',
    name: 'Roboto',
    fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14
  },
  inter: {
    id: 'inter',
    name: 'Inter',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14
  },
  sfPro: {
    id: 'sfPro',
    name: 'SF Pro',
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14
  }
};

export const TYPOGRAPHY_LIST = Object.values(TYPOGRAPHY_OPTIONS);

// Navigation Style Options
export const NAVIGATION_STYLES = [
  { id: 'side', name: 'Side Navigation', description: 'Vertical sidebar navigation' },
  { id: 'top', name: 'Top Navigation', description: 'Horizontal top navigation bar' },
  { id: 'side-top', name: 'Side + Top', description: 'Combined sidebar and top bar' },
  { id: 'compact', name: 'Compact Side', description: 'Collapsed sidebar with icons' },
  { id: 'none', name: 'No Navigation', description: 'Content only, no navigation' }
];

// Template Presets - Pre-configured combinations for quick start
export const TEMPLATE_PRESETS = [
  {
    id: 'material-dashboard',
    name: 'Material Dashboard',
    description: 'Google Material Design with dashboard grid layout',
    designSystem: 'material',
    layout: 'dashboardGrid',
    theme: 'blue',
    typography: 'roboto',
    navigationStyle: 'side'
  },
  {
    id: 'shadcn-dashboard',
    name: 'Shadcn Dashboard',
    description: 'Minimalist Shadcn design with dashboard layout',
    designSystem: 'shadcn',
    layout: 'dashboardGrid',
    theme: 'purple',
    typography: 'inter',
    navigationStyle: 'side'
  },
  {
    id: 'linear-dashboard',
    name: 'Linear Dashboard',
    description: 'Ultra-minimal Linear design with flat aesthetics',
    designSystem: 'linear',
    layout: 'dashboardGrid',
    theme: 'blue',
    typography: 'sfPro',
    navigationStyle: 'compact'
  },
  {
    id: 'material-spreadsheet',
    name: 'Material Spreadsheet',
    description: 'Data-dense table view with Material Design',
    designSystem: 'material',
    layout: 'spreadsheet',
    theme: 'green',
    typography: 'roboto',
    navigationStyle: 'compact'
  },
  {
    id: 'linear-kanban',
    name: 'Linear Kanban',
    description: 'Project board with Linear minimalist design',
    designSystem: 'linear',
    layout: 'kanban',
    theme: 'blue',
    typography: 'sfPro',
    navigationStyle: 'side'
  }
];

// Helper Functions
export function getDesignSystem(id) {
  return DESIGN_SYSTEMS[id] || DESIGN_SYSTEMS.material;
}

export function getLayout(id) {
  return LAYOUT_TEMPLATES[id] || LAYOUT_TEMPLATES.dashboardGrid;
}

export function getColorTheme(id) {
  return COLOR_THEMES[id] || COLOR_THEMES.blue;
}

export function getTypography(id) {
  return TYPOGRAPHY_OPTIONS[id] || TYPOGRAPHY_OPTIONS.system;
}

export function getPreset(id) {
  return TEMPLATE_PRESETS.find(preset => preset.id === id);
}

// Build complete template configuration
export function buildTemplateConfig({
  designSystemId = 'material',
  layoutId = 'dashboardGrid',
  themeId = 'blue',
  typographyId = 'system',
  navigationStyle = 'side'
}) {
  return {
    designSystem: getDesignSystem(designSystemId),
    layout: getLayout(layoutId),
    theme: getColorTheme(themeId),
    typography: getTypography(typographyId),
    navigationStyle
  };
}

// Export aggregated lists
export { DESIGN_SYSTEMS, DESIGN_SYSTEM_LIST };
export { LAYOUT_TEMPLATES, LAYOUT_TEMPLATE_LIST };
