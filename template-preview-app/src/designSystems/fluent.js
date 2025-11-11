// Microsoft Fluent Design System 2
// Modern Microsoft design language with depth, motion, and material
// Used in: Microsoft 365, Teams, Windows 11, Azure Portal

export const fluentDesignSystem = {
  id: 'fluent',
  name: 'Fluent 2',
  description: 'Microsoft\'s modern design system with depth, acrylic materials, and subtle animations',
  vendor: 'Microsoft',
  usedBy: ['Microsoft 365', 'Teams', 'Windows 11', 'Azure Portal'],

  foundations: {
    spacing: {
      unit: 4,
      scale: {
        0: 0,
        1: 2,
        2: 4,
        3: 8,
        4: 12,
        5: 16,
        6: 20,
        7: 24,
        8: 32
      }
    },

    borderRadius: {
      none: 0,
      sm: 2,
      md: 4,
      lg: 8,
      xl: 12,
      full: 9999
    },

    shadows: {
      none: 'none',
      sm: '0 1px 2px rgba(0, 0, 0, 0.07), 0 0.5px 1px rgba(0, 0, 0, 0.05)',
      md: '0 3.2px 7.2px rgba(0, 0, 0, 0.13), 0 0.6px 1.8px rgba(0, 0, 0, 0.11)',
      lg: '0 6.4px 14.4px rgba(0, 0, 0, 0.18), 0 1.2px 3.6px rgba(0, 0, 0, 0.16)',
      xl: '0 25.6px 57.6px rgba(0, 0, 0, 0.22), 0 4.8px 14.4px rgba(0, 0, 0, 0.18)',
      elevated: '0 4px 8px rgba(0, 0, 0, 0.14), 0 0px 2px rgba(0, 0, 0, 0.12)'
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
        default: 'rgba(0, 0, 0, 0.12)',
        strong: 'rgba(0, 0, 0, 0.16)'
      }
    },

    typography: {
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif",
      fontWeights: {
        light: 300,
        regular: 400,
        semibold: 600,
        bold: 700
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75
      }
    },

    transitions: {
      duration: {
        fast: '100ms',
        normal: '200ms',
        slow: '300ms'
      },
      easing: {
        standard: 'cubic-bezier(0.33, 0, 0.67, 1)', // Fluent curve
        accelerate: 'cubic-bezier(0.9, 0.1, 1, 0.2)',
        decelerate: 'cubic-bezier(0.1, 0.9, 0.2, 1)'
      }
    }
  },

  patterns: {
    button: {
      variant: 'subtle-elevated',
      padding: { x: 4, y: 2 },
      borderRadius: 'md',
      border: 'thin',
      shadow: 'none',
      hover: {
        background: 'subtle',
        shadow: 'sm',
        translate: 'none'
      },
      fontWeight: 'semibold',
      textTransform: 'none',
      letterSpacing: 'normal'
    },

    card: {
      variant: 'elevated-subtle',
      padding: 5,
      borderRadius: 'lg',
      border: 'thin',
      shadow: 'sm',
      hover: {
        shadow: 'md',
        borderColor: 'default',
        translate: 'none'
      },
      background: 'acrylic' // semi-transparent layered effect
    },

    input: {
      variant: 'outlined-underline',
      padding: { x: 3, y: 2 },
      borderRadius: 'sm',
      border: 'thin',
      background: 'transparent',
      focusStyle: 'border-bottom' // underline emphasis
    },

    table: {
      variant: 'minimal-lines',
      rowPadding: 3,
      borderStyle: 'subtle-divider',
      headerStyle: 'subtle-background',
      headerBackground: 'subtle'
    },

    nav: {
      variant: 'subtle-pill',
      itemPadding: { x: 4, y: 2 },
      itemBorderRadius: 'md',
      activeStyle: 'subtle-background',
      hoverStyle: 'subtle-background'
    }
  },

  semantics: {
    depth: {
      background: 0,
      content: 1,
      elevated: 2,
      overlay: 3
    }
  }
};
