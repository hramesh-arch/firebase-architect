// Chakra UI Design System
// Modern, accessible component system for React applications
// Popular in startups and modern web applications

export const chakraDesignSystem = {
  id: 'chakra',
  name: 'Chakra UI',
  description: 'Simple, modular, and accessible component library with excellent developer experience',
  vendor: 'Segun Adebayo',
  usedBy: ['Startups', 'Modern Web Apps', 'SaaS Products'],

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
      md: 6,
      lg: 8,
      xl: 12,
      full: 9999
    },

    shadows: {
      none: 'none',
      sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      elevated: '0 2px 4px rgba(0, 0, 0, 0.08)'
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
        default: 'rgba(0, 0, 0, 0.16)',
        strong: 'rgba(0, 0, 0, 0.24)'
      }
    },

    typography: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica', 'Arial', sans-serif",
      fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.625
      }
    },

    transitions: {
      duration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms'
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)'
      }
    }
  },

  patterns: {
    button: {
      variant: 'solid-rounded',
      padding: { x: 4, y: 2 },
      borderRadius: 'md',
      border: 'none',
      shadow: 'sm',
      hover: {
        transform: 'scale',
        translate: 'none'
      },
      fontWeight: 'medium',
      textTransform: 'none',
      letterSpacing: 'normal'
    },

    card: {
      variant: 'elevated',
      padding: 5,
      borderRadius: 'lg',
      border: 'none',
      shadow: 'md',
      hover: {
        shadow: 'lg',
        translate: '-2px'
      }
    },

    input: {
      variant: 'outlined',
      padding: { x: 4, y: 2 },
      borderRadius: 'md',
      border: 'thin',
      background: 'transparent',
      focusStyle: 'ring'
    },

    table: {
      variant: 'simple',
      rowPadding: 4,
      borderStyle: 'divider',
      headerStyle: 'bold',
      headerBackground: 'none'
    },

    nav: {
      variant: 'tabs',
      itemPadding: { x: 4, y: 3 },
      itemBorderRadius: 'md',
      activeStyle: 'solid-background',
      hoverStyle: 'subtle-background'
    }
  },

  semantics: {
    colorMode: {
      light: 'default',
      dark: 'inverted'
    }
  }
};
