// Shadcn/UI Design System
// Modern, accessible React component system built on Radix UI and Tailwind
// Popular in: Modern SaaS, Developer Tools, Startups

export const shadcnDesignSystem = {
  id: 'shadcn',
  name: 'Shadcn/UI',
  description: 'Modern component system with clean borders, accessible patterns, and minimal aesthetics',
  vendor: 'shadcn',
  usedBy: ['Modern SaaS', 'Developer Tools', 'Startups', 'AI Applications'],

  // Foundation tokens - immutable design system values
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
        7: 32,
        8: 40
      }
    },

    borderRadius: {
      none: 0,
      sm: 6,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999
    },

    borders: {
      width: {
        none: 0,
        thin: 1,
        medium: 2,
        thick: 3
      },
      style: 'solid',
      colors: {
        subtle: 'rgba(0, 0, 0, 0.1)',
        default: 'rgba(0, 0, 0, 0.15)',
        strong: 'rgba(0, 0, 0, 0.25)'
      }
    },

    shadows: {
      none: 'none',
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 1px 3px rgba(0,0,0,0.08)',
      lg: '0 2px 4px rgba(0,0,0,0.1)',
      xl: '0 4px 8px rgba(0,0,0,0.12)',
      subtle: '0 1px 2px rgba(0,0,0,0.04)' // very subtle
    },

    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
        fast: '100ms',
        normal: '200ms',
        slow: '300ms'
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)'
      }
    }
  },

  // Component patterns - how components look in Shadcn
  patterns: {
    button: {
      variant: 'outlined',
      padding: { x: 4, y: 2 }, // spacing scale units
      borderRadius: 'md',
      border: 'thin',
      shadow: 'none',
      hover: {
        background: 'subtle', // subtle background change
        borderColor: 'strong',
        translate: 'none'
      },
      fontWeight: 'medium',
      textTransform: 'none',
      letterSpacing: 'normal'
    },

    card: {
      variant: 'outlined',
      padding: 6, // spacing scale unit
      borderRadius: 'lg',
      border: 'thin',
      shadow: 'none',
      hover: {
        shadow: 'sm',
        borderColor: 'default',
        translate: 'none'
      }
    },

    input: {
      variant: 'outlined',
      padding: { x: 3, y: 2 },
      borderRadius: 'md',
      border: 'thin',
      background: 'transparent',
      focusStyle: 'ring' // focus ring instead of background change
    },

    table: {
      variant: 'bordered',
      rowPadding: 3,
      borderStyle: 'full', // borders on all cells
      headerStyle: 'bordered',
      headerBackground: 'subtle'
    },

    nav: {
      variant: 'ghost',
      itemPadding: { x: 3, y: 2 },
      itemBorderRadius: 'md',
      activeStyle: 'subtle-background', // subtle background, no elevation
      hoverStyle: 'background'
    }
  },

  // Semantic mappings
  semantics: {
    borderStrength: {
      subtle: 'subtle',
      default: 'default',
      strong: 'strong'
    }
  }
};
