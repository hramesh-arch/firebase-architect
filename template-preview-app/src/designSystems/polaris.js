// Shopify Polaris Design System
// E-commerce focused design system from Shopify
// Optimized for merchant experiences and admin interfaces

export const polarisDesignSystem = {
  id: 'polaris',
  name: 'Polaris',
  description: 'Shopify\'s design system focused on commerce and merchant experiences',
  vendor: 'Shopify',
  usedBy: ['Shopify Admin', 'Shopify Apps', 'E-commerce Platforms'],

  foundations: {
    spacing: {
      unit: 4,
      scale: {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        7: 28,
        8: 32
      }
    },

    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999
    },

    shadows: {
      none: 'none',
      sm: '0 1px 0 rgba(0, 0, 0, 0.05)',
      md: '0 2px 4px rgba(0, 0, 0, 0.1)',
      lg: '0 4px 8px rgba(0, 0, 0, 0.12)',
      xl: '0 8px 16px rgba(0, 0, 0, 0.15)',
      elevated: '0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
    },

    borders: {
      width: {
        none: 0,
        thin: 1,
        medium: 2
      },
      style: 'solid',
      colors: {
        subtle: 'rgba(0, 0, 0, 0.08)',
        default: 'rgba(0, 0, 0, 0.13)',
        strong: 'rgba(0, 0, 0, 0.2)'
      }
    },

    typography: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', 'Roboto', sans-serif",
      fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeights: {
        tight: 1.2,
        normal: 1.4,
        relaxed: 1.6
      }
    },

    transitions: {
      duration: {
        fast: '100ms',
        normal: '200ms',
        slow: '300ms'
      },
      easing: {
        standard: 'cubic-bezier(0.64, 0, 0.35, 1)',
        in: 'cubic-bezier(0.5, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.3, 1)'
      }
    }
  },

  patterns: {
    button: {
      variant: 'outlined-high-contrast',
      padding: { x: 4, y: 2 },
      borderRadius: 'sm',
      border: 'thin',
      shadow: 'sm',
      hover: {
        background: 'slight',
        borderColor: 'strong',
        translate: 'none'
      },
      fontWeight: 'medium',
      textTransform: 'none',
      letterSpacing: 'normal'
    },

    card: {
      variant: 'outlined-clean',
      padding: 5,
      borderRadius: 'md',
      border: 'thin',
      shadow: 'sm',
      hover: {
        shadow: 'md',
        translate: 'none'
      }
    },

    input: {
      variant: 'outlined',
      padding: { x: 3, y: 2 },
      borderRadius: 'sm',
      border: 'thin',
      background: 'white',
      focusStyle: 'border-strong'
    },

    table: {
      variant: 'resource-list',
      rowPadding: 4,
      borderStyle: 'dividers',
      headerStyle: 'subdued',
      headerBackground: 'subtle'
    },

    nav: {
      variant: 'sidebar-items',
      itemPadding: { x: 4, y: 2 },
      itemBorderRadius: 'sm',
      activeStyle: 'background-border',
      hoverStyle: 'background'
    }
  },

  semantics: {
    tone: {
      success: 'green',
      warning: 'yellow',
      critical: 'red',
      info: 'blue',
      subdued: 'gray'
    }
  }
};
