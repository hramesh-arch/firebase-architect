/**
 * Enterprise & Data-Intensive Application Responsive Standards
 *
 * Special considerations for CRMs, analytics platforms, workflow management,
 * and other data-heavy enterprise applications
 */

// Enterprise-focused breakpoints (optimized for larger screens)
export const ENTERPRISE_BREAKPOINTS = {
  mobile: '375px',   // Minimum - limited functionality
  tablet: '768px',   // Tablet - simplified views
  laptop: '1024px',  // Laptop - basic enterprise features
  desktop: '1280px', // Desktop - full features
  wide: '1440px',    // Wide screen - enhanced layouts
  ultrawide: '1920px' // Ultra-wide - maximum density
};

// Minimum recommended widths for different app types
export const MINIMUM_WIDTHS = {
  crm: '1024px',              // CRM needs horizontal space for columns
  analytics: '1280px',         // Analytics needs space for charts
  dataTable: '768px',          // Data tables need minimum width
  workflow: '1024px',          // Workflow tools need multi-column
  dashboard: '1280px',         // Dashboards need grid space
  formHeavy: '768px',          // Form-heavy apps work on tablets
  general: '375px'             // General apps work on mobile
};

// Data density modes (power users love compact views)
export const DENSITY_MODES = {
  compact: {
    rowHeight: '32px',
    padding: '8px',
    fontSize: '13px',
    spacing: '4px',
    description: 'Maximum data density - power users on large screens'
  },
  comfortable: {
    rowHeight: '40px',
    padding: '12px',
    fontSize: '14px',
    spacing: '8px',
    description: 'Balanced density - default for most users'
  },
  spacious: {
    rowHeight: '48px',
    padding: '16px',
    fontSize: '16px',
    spacing: '12px',
    description: 'Extra breathing room - accessibility focused'
  }
};

// Multi-panel layout configurations
export const PANEL_LAYOUTS = {
  // Two-panel (sidebar + main)
  twoPanel: {
    mobile: {
      sidebar: '0px',      // Hidden, use drawer
      main: '100%'
    },
    tablet: {
      sidebar: '240px',    // Collapsed sidebar
      main: 'calc(100% - 240px)'
    },
    desktop: {
      sidebar: '280px',    // Full sidebar
      main: 'calc(100% - 280px)'
    },
    wide: {
      sidebar: '320px',    // Wider sidebar for more nav
      main: 'calc(100% - 320px)'
    }
  },

  // Three-panel (sidebar + main + properties)
  threePanel: {
    mobile: {
      sidebar: '0px',
      main: '100%',
      properties: '0px'    // Hidden, use modal
    },
    tablet: {
      sidebar: '0px',      // Hide sidebar
      main: '100%',
      properties: '0px'    // Use bottom sheet
    },
    laptop: {
      sidebar: '240px',
      main: 'calc(100% - 540px)',
      properties: '300px'
    },
    desktop: {
      sidebar: '280px',
      main: 'calc(100% - 640px)',
      properties: '360px'
    },
    wide: {
      sidebar: '320px',
      main: 'calc(100% - 740px)',
      properties: '420px'
    }
  },

  // Split view (for comparing data)
  splitView: {
    mobile: {
      left: '100%',        // Stack vertically
      right: '100%'
    },
    tablet: {
      left: '100%',        // Still stack
      right: '100%'
    },
    laptop: {
      left: '50%',         // Side by side
      right: '50%'
    },
    desktop: {
      left: '50%',
      right: '50%'
    }
  }
};

// Data table responsive strategies
export const DATA_TABLE_STRATEGIES = {
  // Mobile: Card view (vertical stacking)
  mobile: {
    strategy: 'cards',
    columns: 'stack vertically',
    actions: 'show only primary action',
    pagination: 'simplified (prev/next)',
    filters: 'drawer/modal',
    description: 'Transform rows into cards with key fields'
  },

  // Tablet: Simplified table
  tablet: {
    strategy: 'simplified-table',
    columns: 'show 3-5 key columns',
    actions: 'dropdown menu',
    pagination: 'standard',
    filters: 'collapsible panel',
    description: 'Show essential columns, hide secondary data'
  },

  // Laptop: Full table with scroll
  laptop: {
    strategy: 'scrollable-table',
    columns: 'show most columns, horizontal scroll',
    actions: 'inline actions',
    pagination: 'full pagination controls',
    filters: 'always visible',
    description: 'Full table with horizontal scrolling'
  },

  // Desktop+: Full table with all features
  desktop: {
    strategy: 'full-table',
    columns: 'show all columns',
    actions: 'inline + bulk actions',
    pagination: 'full with page size selector',
    filters: 'always visible + advanced',
    description: 'All columns visible, full feature set'
  },

  // Ultra-wide: Dense table with extra features
  ultrawide: {
    strategy: 'dense-table',
    columns: 'show all + metadata columns',
    actions: 'inline + bulk + quick actions',
    pagination: 'full with jump-to-page',
    filters: 'advanced filters always visible',
    description: 'Compact density, maximum information'
  }
};

// Dashboard/Analytics responsive patterns
export const DASHBOARD_LAYOUTS = {
  // Mobile: Single column, stacked widgets
  mobile: {
    columns: 1,
    widgetSize: 'full-width',
    chartHeight: '200px',
    layout: 'vertical stack',
    navigation: 'bottom tabs or drawer',
    description: 'One widget at a time, vertical scroll'
  },

  // Tablet: 2 columns, medium widgets
  tablet: {
    columns: 2,
    widgetSize: '50% width',
    chartHeight: '250px',
    layout: '2-column grid',
    navigation: 'top tabs',
    description: 'Two widgets per row'
  },

  // Laptop: 2-3 columns, flexible grid
  laptop: {
    columns: 3,
    widgetSize: '33% width',
    chartHeight: '280px',
    layout: '3-column grid (can span)',
    navigation: 'sidebar + top nav',
    description: 'Three widgets per row, some can span'
  },

  // Desktop: 3-4 columns, dense grid
  desktop: {
    columns: 4,
    widgetSize: '25% width',
    chartHeight: '300px',
    layout: '4-column grid with spanning',
    navigation: 'full sidebar + top nav',
    description: 'Four widgets per row, complex layouts'
  },

  // Ultra-wide: 4-6 columns, maximum density
  ultrawide: {
    columns: 6,
    widgetSize: '16.66% width',
    chartHeight: '280px',
    layout: '6-column dense grid',
    navigation: 'expanded sidebar + top nav + breadcrumbs',
    description: 'Six widgets per row, very dense'
  }
};

// Form layouts for data entry
export const FORM_LAYOUTS = {
  mobile: {
    columns: 1,
    fieldWidth: '100%',
    labelPosition: 'top',
    spacing: '16px',
    description: 'Single column, labels above fields'
  },

  tablet: {
    columns: 2,
    fieldWidth: '50%',
    labelPosition: 'top',
    spacing: '16px',
    description: 'Two columns for shorter forms'
  },

  laptop: {
    columns: 2,
    fieldWidth: '50%',
    labelPosition: 'left or top',
    spacing: '12px',
    description: 'Two columns, inline labels option'
  },

  desktop: {
    columns: 3,
    fieldWidth: '33.33%',
    labelPosition: 'left',
    spacing: '12px',
    description: 'Three columns, inline labels'
  },

  ultrawide: {
    columns: 4,
    fieldWidth: '25%',
    labelPosition: 'left',
    spacing: '8px',
    description: 'Four columns for power users'
  }
};

// Column counts for different data intensities
export const COLUMN_VISIBILITY = {
  // CRM example: Contact list
  crm: {
    mobile: ['name', 'company', 'status'],
    tablet: ['name', 'company', 'email', 'phone', 'status'],
    laptop: ['name', 'company', 'email', 'phone', 'owner', 'lastContact', 'status'],
    desktop: ['name', 'company', 'email', 'phone', 'owner', 'lastContact', 'nextAction', 'value', 'status'],
    ultrawide: ['name', 'company', 'title', 'email', 'phone', 'owner', 'lastContact', 'nextAction', 'value', 'source', 'tags', 'status']
  },

  // Analytics: Metrics table
  analytics: {
    mobile: ['metric', 'value', 'change'],
    tablet: ['metric', 'value', 'change', 'trend'],
    laptop: ['metric', 'current', 'previous', 'change', 'trend'],
    desktop: ['metric', 'current', 'previous', 'change', 'trend', 'target', 'status'],
    ultrawide: ['metric', 'current', 'previous', 'change', 'percentChange', 'trend', 'target', 'status', 'lastUpdated']
  }
};

// Content width strategies for different app types
export const CONTENT_WIDTH_STRATEGIES = {
  // Full width (dashboards, analytics)
  fullWidth: {
    mobile: '100%',
    tablet: '100%',
    laptop: '100%',
    desktop: '100%',
    ultrawide: '100%',
    description: 'Use all available space - dashboards, data tables'
  },

  // Constrained (forms, content)
  constrained: {
    mobile: '100%',
    tablet: '100%',
    laptop: '960px',
    desktop: '1200px',
    ultrawide: '1400px',
    description: 'Limit width for readability - forms, content pages'
  },

  // Adaptive (grows with screen but has max)
  adaptive: {
    mobile: '100%',
    tablet: '100%',
    laptop: 'min(100%, 1200px)',
    desktop: 'min(100%, 1400px)',
    ultrawide: 'min(100%, 1600px)',
    description: 'Grows but never too wide - mixed content'
  }
};

// Responsive navigation patterns
export const NAVIGATION_PATTERNS = {
  mobile: {
    primary: 'bottom-nav or drawer',
    secondary: 'hidden in menu',
    breadcrumbs: 'hidden or collapsed',
    search: 'icon → opens overlay'
  },

  tablet: {
    primary: 'top horizontal nav',
    secondary: 'dropdown menus',
    breadcrumbs: 'visible',
    search: 'always visible'
  },

  desktop: {
    primary: 'sidebar navigation',
    secondary: 'sidebar sub-menus',
    breadcrumbs: 'full path visible',
    search: 'always visible + shortcuts'
  },

  ultrawide: {
    primary: 'expanded sidebar with icons + text',
    secondary: 'always expanded sub-menus',
    breadcrumbs: 'full path + actions',
    search: 'always visible + advanced filters'
  }
};

// Performance considerations for large screens
export const PERFORMANCE_STRATEGIES = {
  virtualScrolling: {
    enableAt: '100+ rows',
    description: 'Render only visible rows for large datasets'
  },

  lazyLoadCharts: {
    enableAt: '4+ charts on screen',
    description: 'Load charts as they come into viewport'
  },

  paginationRecommended: {
    mobile: 10,
    tablet: 25,
    laptop: 50,
    desktop: 100,
    ultrawide: 200,
    description: 'Recommended page sizes per device'
  }
};

// Accessibility for data-intensive apps
export const ENTERPRISE_ACCESSIBILITY = {
  keyboardShortcuts: {
    essential: true,
    examples: [
      'Ctrl+K: Global search',
      'Ctrl+/: Show shortcuts',
      'Escape: Close modals',
      'Arrow keys: Navigate tables',
      'Enter: Primary action',
      'Tab: Navigate fields'
    ]
  },

  focusManagement: {
    tableNavigation: 'Arrow keys navigate cells',
    modalFocus: 'Trap focus in modals',
    skipLinks: 'Skip to main content',
    focusVisible: '2px outline on all interactive elements'
  },

  screenReaderOptimization: {
    tableHeaders: 'Proper header associations',
    liveRegions: 'Announce dynamic updates',
    statusMessages: 'ARIA live for status changes',
    labels: 'Descriptive labels for all inputs'
  }
};

/**
 * Generate enterprise-specific responsive configuration
 */
export function generateEnterpriseResponsiveConfig(appType = 'crm') {
  return {
    breakpoints: ENTERPRISE_BREAKPOINTS,
    minimumWidth: MINIMUM_WIDTHS[appType] || MINIMUM_WIDTHS.general,
    densityModes: DENSITY_MODES,
    panelLayouts: PANEL_LAYOUTS,
    dataTableStrategy: DATA_TABLE_STRATEGIES,
    dashboardLayout: DASHBOARD_LAYOUTS,
    formLayout: FORM_LAYOUTS,
    contentWidthStrategy: getContentWidthStrategy(appType),
    navigationPattern: NAVIGATION_PATTERNS,
    accessibility: ENTERPRISE_ACCESSIBILITY
  };
}

function getContentWidthStrategy(appType) {
  const fullWidthApps = ['analytics', 'dashboard', 'dataTable'];
  const constrainedApps = ['formHeavy', 'general'];

  if (fullWidthApps.includes(appType)) {
    return CONTENT_WIDTH_STRATEGIES.fullWidth;
  } else if (constrainedApps.includes(appType)) {
    return CONTENT_WIDTH_STRATEGIES.constrained;
  } else {
    return CONTENT_WIDTH_STRATEGIES.adaptive;
  }
}

/**
 * Recommended minimum screen sizes for app types
 */
export const RECOMMENDED_MINIMUM_SCREENS = {
  crm: {
    minimum: '1024px',
    recommended: '1280px',
    optimal: '1440px',
    message: 'CRM works best on laptops and larger screens'
  },
  analytics: {
    minimum: '1280px',
    recommended: '1440px',
    optimal: '1920px',
    message: 'Analytics dashboards need wide screens for multiple charts'
  },
  workflow: {
    minimum: '1024px',
    recommended: '1280px',
    optimal: '1440px',
    message: 'Workflow tools benefit from multi-panel layouts'
  },
  dataTable: {
    minimum: '768px',
    recommended: '1024px',
    optimal: '1280px',
    message: 'Data tables need horizontal space'
  },
  general: {
    minimum: '375px',
    recommended: '768px',
    optimal: '1024px',
    message: 'General apps work on all screen sizes'
  }
};

export default {
  ENTERPRISE_BREAKPOINTS,
  MINIMUM_WIDTHS,
  DENSITY_MODES,
  PANEL_LAYOUTS,
  DATA_TABLE_STRATEGIES,
  DASHBOARD_LAYOUTS,
  FORM_LAYOUTS,
  COLUMN_VISIBILITY,
  CONTENT_WIDTH_STRATEGIES,
  NAVIGATION_PATTERNS,
  PERFORMANCE_STRATEGIES,
  ENTERPRISE_ACCESSIBILITY,
  RECOMMENDED_MINIMUM_SCREENS,
  generateEnterpriseResponsiveConfig
};
