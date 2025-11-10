/**
 * UI Template Library
 *
 * Defines all available UI templates with their configurations,
 * including colors, fonts, components, and asset requirements.
 */

export const UI_TEMPLATES = {
  // Template 1: Material-UI Modern
  'material-modern': {
    id: 'material-modern',
    name: 'Material Modern',
    description: 'Clean, modern design based on Google Material Design principles. Perfect for data-heavy applications.',
    framework: 'Material-UI (MUI)',
    category: 'enterprise',
    preview: {
      thumbnail: '/templates/material-modern/thumbnail.png',
      screenshots: [
        '/templates/material-modern/dashboard.png',
        '/templates/material-modern/table.png',
        '/templates/material-modern/forms.png'
      ],
      liveDemo: 'https://mui.com/store/previews/berry-react-material-admin/'
    },
    defaultConfig: {
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3',
        background: '#f5f5f5',
        surface: '#ffffff',
        text: {
          primary: '#000000de',
          secondary: '#00000099'
        }
      },
      typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
      },
      spacing: 8,
      borderRadius: 4,
      shadows: 'elevation'
    },
    components: [
      'AppBar', 'Drawer', 'DataGrid', 'Card', 'Button', 'TextField',
      'Select', 'Autocomplete', 'DatePicker', 'Dialog', 'Snackbar',
      'Tabs', 'Stepper', 'Accordion', 'Chip', 'Avatar', 'Badge'
    ],
    layouts: ['dashboard', 'list-view', 'form-view', 'detail-view', 'settings'],
    dependencies: {
      '@mui/material': '^5.15.0',
      '@mui/icons-material': '^5.15.0',
      '@mui/x-data-grid': '^6.18.0',
      '@mui/x-date-pickers': '^6.18.0',
      '@emotion/react': '^11.11.0',
      '@emotion/styled': '^11.11.0'
    },
    assets: {
      fonts: ['Roboto'],
      icons: 'material-icons'
    }
  },

  // Template 2: Ant Design Pro
  'ant-design-pro': {
    id: 'ant-design-pro',
    name: 'Ant Design Pro',
    description: 'Enterprise-grade admin template with comprehensive business components. Trusted by Fortune 500 companies.',
    framework: 'Ant Design',
    category: 'enterprise',
    preview: {
      thumbnail: '/templates/ant-design-pro/thumbnail.png',
      screenshots: [
        '/templates/ant-design-pro/dashboard.png',
        '/templates/ant-design-pro/table.png',
        '/templates/ant-design-pro/forms.png'
      ],
      liveDemo: 'https://preview.pro.ant.design/dashboard/analysis'
    },
    defaultConfig: {
      colors: {
        primary: '#1890ff',
        success: '#52c41a',
        warning: '#faad14',
        error: '#f5222d',
        info: '#1890ff',
        background: '#f0f2f5',
        surface: '#ffffff',
        text: {
          primary: 'rgba(0, 0, 0, 0.85)',
          secondary: 'rgba(0, 0, 0, 0.65)'
        }
      },
      typography: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600
      },
      spacing: 8,
      borderRadius: 2,
      shadows: 'subtle'
    },
    components: [
      'Layout', 'Menu', 'Table', 'Form', 'Card', 'Button', 'Input',
      'Select', 'DatePicker', 'Modal', 'Message', 'Notification',
      'Tabs', 'Steps', 'Collapse', 'Tag', 'Avatar', 'Badge', 'Descriptions'
    ],
    layouts: ['pro-layout', 'list-page', 'form-page', 'detail-page', 'result-page'],
    dependencies: {
      'antd': '^5.12.0',
      '@ant-design/icons': '^5.2.0',
      '@ant-design/pro-components': '^2.6.0',
      '@ant-design/pro-layout': '^7.17.0'
    },
    assets: {
      fonts: ['system'],
      icons: 'ant-design-icons'
    }
  },

  // Template 3: TailAdmin Modern
  'tailadmin-modern': {
    id: 'tailadmin-modern',
    name: 'TailAdmin Modern',
    description: 'Modern, utility-first design with Tailwind CSS. Highly customizable and developer-friendly.',
    framework: 'Tailwind CSS',
    category: 'modern',
    preview: {
      thumbnail: '/templates/tailadmin/thumbnail.png',
      screenshots: [
        '/templates/tailadmin/dashboard.png',
        '/templates/tailadmin/table.png',
        '/templates/tailadmin/forms.png'
      ],
      liveDemo: 'https://react-demo.tailadmin.com/'
    },
    defaultConfig: {
      colors: {
        primary: '#3c50e0',
        secondary: '#80caee',
        success: '#10b981',
        warning: '#fbbf24',
        error: '#ef4444',
        info: '#3b82f6',
        background: '#f1f5f9',
        surface: '#ffffff',
        text: {
          primary: '#1c2434',
          secondary: '#64748b'
        }
      },
      typography: {
        fontFamily: "'Satoshi', 'Inter', sans-serif",
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
      },
      spacing: 4,
      borderRadius: 6,
      shadows: 'tailwind'
    },
    components: [
      'Card', 'Button', 'Input', 'Select', 'DataTable', 'Modal',
      'Dropdown', 'Alert', 'Badge', 'Breadcrumb', 'Pagination',
      'Tabs', 'Accordion', 'Switch', 'Checkbox', 'Radio'
    ],
    layouts: ['dashboard', 'analytics', 'ecommerce', 'crm', 'settings'],
    dependencies: {
      'tailwindcss': '^3.4.0',
      '@headlessui/react': '^1.7.17',
      '@heroicons/react': '^2.1.1',
      'apexcharts': '^3.45.0',
      'react-apexcharts': '^1.4.1'
    },
    assets: {
      fonts: ['Satoshi', 'Inter'],
      icons: 'heroicons'
    }
  },

  // Template 4: CoreUI Enterprise
  'coreui-enterprise': {
    id: 'coreui-enterprise',
    name: 'CoreUI Enterprise',
    description: 'Bootstrap-based enterprise solution with 55M+ downloads. Battle-tested and reliable.',
    framework: 'CoreUI (Bootstrap)',
    category: 'enterprise',
    preview: {
      thumbnail: '/templates/coreui/thumbnail.png',
      screenshots: [
        '/templates/coreui/dashboard.png',
        '/templates/coreui/table.png',
        '/templates/coreui/forms.png'
      ],
      liveDemo: 'https://coreui.io/react/demo/4.0/free/'
    },
    defaultConfig: {
      colors: {
        primary: '#321fdb',
        secondary: '#9da5b1',
        success: '#2eb85c',
        warning: '#f9b115',
        error: '#e55353',
        info: '#39f',
        background: '#ebedef',
        surface: '#ffffff',
        text: {
          primary: '#4f5d73',
          secondary: '#768192'
        }
      },
      typography: {
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
      },
      spacing: 16,
      borderRadius: 4,
      shadows: 'bootstrap'
    },
    components: [
      'Sidebar', 'Header', 'Table', 'Form', 'Card', 'Button', 'Input',
      'Select', 'Modal', 'Toast', 'Alert', 'Tabs', 'Accordion',
      'Badge', 'Spinner', 'Progress', 'Dropdown', 'Pagination'
    ],
    layouts: ['dashboard', 'widgets', 'tables', 'forms', 'charts'],
    dependencies: {
      '@coreui/react': '^4.11.0',
      '@coreui/icons': '^3.0.1',
      '@coreui/icons-react': '^2.2.1',
      'react-bootstrap': '^2.9.0',
      'bootstrap': '^5.3.0'
    },
    assets: {
      fonts: ['system'],
      icons: 'coreui-icons'
    }
  },

  // Template 5: Shadcn Modern
  'shadcn-modern': {
    id: 'shadcn-modern',
    name: 'Shadcn Modern',
    description: 'Beautifully designed, accessible components built with Radix UI and Tailwind. Copy-paste friendly.',
    framework: 'Shadcn/ui',
    category: 'modern',
    preview: {
      thumbnail: '/templates/shadcn/thumbnail.png',
      screenshots: [
        '/templates/shadcn/dashboard.png',
        '/templates/shadcn/table.png',
        '/templates/shadcn/forms.png'
      ],
      liveDemo: 'https://ui.shadcn.com/examples/dashboard'
    },
    defaultConfig: {
      colors: {
        primary: 'hsl(222.2 47.4% 11.2%)',
        secondary: 'hsl(210 40% 96.1%)',
        success: 'hsl(142.1 76.2% 36.3%)',
        warning: 'hsl(38 92% 50%)',
        error: 'hsl(0 84.2% 60.2%)',
        info: 'hsl(221.2 83.2% 53.3%)',
        background: 'hsl(0 0% 100%)',
        surface: 'hsl(0 0% 98%)',
        text: {
          primary: 'hsl(222.2 84% 4.9%)',
          secondary: 'hsl(215.4 16.3% 46.9%)'
        }
      },
      typography: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600
      },
      spacing: 4,
      borderRadius: 8,
      shadows: 'subtle'
    },
    components: [
      'Card', 'Button', 'Input', 'Select', 'DataTable', 'Dialog',
      'DropdownMenu', 'Alert', 'Badge', 'Tabs', 'Sheet', 'Command',
      'Calendar', 'Form', 'Separator', 'Toast', 'Switch', 'Checkbox'
    ],
    layouts: ['dashboard', 'tasks', 'mail', 'playground', 'settings'],
    dependencies: {
      '@radix-ui/react-alert-dialog': '^1.0.5',
      '@radix-ui/react-dropdown-menu': '^2.0.6',
      '@radix-ui/react-select': '^2.0.0',
      '@radix-ui/react-tabs': '^1.0.4',
      'tailwindcss': '^3.4.0',
      'class-variance-authority': '^0.7.0',
      'clsx': '^2.0.0',
      'tailwind-merge': '^2.2.0'
    },
    assets: {
      fonts: ['Inter'],
      icons: 'lucide-react'
    }
  },

  // Template 6: Med Refills Healthcare
  'med-refills-healthcare': {
    id: 'med-refills-healthcare',
    name: 'Med Refills Healthcare',
    description: 'Clean, accessible design optimized for healthcare applications. HIPAA-compliant UI patterns.',
    framework: 'Custom Healthcare UI',
    category: 'healthcare',
    preview: {
      thumbnail: '/templates/med-refills/thumbnail.png',
      screenshots: [
        '/templates/med-refills/dashboard.png',
        '/templates/med-refills/prescriptions.png',
        '/templates/med-refills/refills.png'
      ],
      liveDemo: 'https://example.com/med-refills-demo'
    },
    defaultConfig: {
      colors: {
        primary: '#0066cc', // Medical blue
        secondary: '#00a86b', // Medical green
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545',
        info: '#17a2b8',
        background: '#f8f9fa',
        surface: '#ffffff',
        accent: '#6c63ff', // Prescription purple
        text: {
          primary: '#212529',
          secondary: '#6c757d'
        }
      },
      typography: {
        fontFamily: "'Open Sans', 'Helvetica Neue', Arial, sans-serif",
        fontSize: 16, // Larger for readability
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        lineHeight: 1.6 // Increased for accessibility
      },
      spacing: 16,
      borderRadius: 8,
      shadows: 'soft',
      accessibility: {
        highContrast: true,
        focusIndicators: true,
        minimumTouchTarget: 44 // WCAG AAA compliance
      }
    },
    components: [
      'PrescriptionCard', 'RefillButton', 'MedicationList', 'DosageSchedule',
      'PharmacyLocator', 'InsuranceCard', 'PatientProfile', 'AppointmentCard',
      'AlertBanner', 'StatusBadge', 'TimelineView', 'ScanPrescription',
      'AutoRefillToggle', 'DoctorContact', 'MedicationReminder'
    ],
    layouts: [
      'patient-dashboard',
      'prescriptions-list',
      'refill-request',
      'medication-details',
      'pharmacy-selection',
      'insurance-info',
      'appointment-booking'
    ],
    dependencies: {
      '@mui/material': '^5.15.0',
      '@mui/icons-material': '^5.15.0',
      'react-qr-reader': '^3.0.0-beta-1', // For prescription scanning
      'date-fns': '^2.30.0',
      'react-hook-form': '^7.49.0',
      'zod': '^3.22.0'
    },
    assets: {
      fonts: ['Open Sans'],
      icons: 'material-icons + custom-medical-icons',
      illustrations: ['prescription-bottle', 'pharmacy', 'doctor', 'calendar']
    },
    specialFeatures: {
      prescriptionScanning: true,
      autoRefillReminders: true,
      insuranceIntegration: true,
      hipaaCompliant: true,
      accessibilityAAA: true,
      offlineMode: true
    }
  }
};

/**
 * Get template by ID
 */
export function getTemplate(templateId) {
  return UI_TEMPLATES[templateId];
}

/**
 * Get all templates
 */
export function getAllTemplates() {
  return Object.values(UI_TEMPLATES);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category) {
  return Object.values(UI_TEMPLATES).filter(t => t.category === category);
}

/**
 * Get template categories
 */
export function getCategories() {
  return [...new Set(Object.values(UI_TEMPLATES).map(t => t.category))];
}
