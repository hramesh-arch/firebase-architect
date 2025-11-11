// Linear Design System
// Modern project management tool with minimal, fast, keyboard-first design
// Used in: Linear App, modern productivity tools

export const linearDesignSystem = {
  id: 'linear',
  name: 'Linear',
  description: 'Ultra-minimal design system with speed, clarity, and keyboard-first interactions',
  vendor: 'Linear',
  usedBy: ['Linear App', 'Modern Productivity Tools', 'Developer-focused Products'],

  // Foundation tokens - immutable design system values
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
        6: 24,
        7: 32,
        8: 48
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

    borders: {
      width: {
        none: 0,
        thin: 1
      },
      style: 'solid',
      colors: {
        subtle: 'rgba(0, 0, 0, 0.06)',
        default: 'rgba(0, 0, 0, 0.08)'
      }
    },

    shadows: {
      none: 'none',
      sm: '0 1px 2px rgba(0,0,0,0.02)',
      md: '0 1px 3px rgba(0,0,0,0.04)',
      lg: '0 2px 4px rgba(0,0,0,0.06)',
      xl: '0 4px 8px rgba(0,0,0,0.08)',
      minimal: '0 1px 2px rgba(0,0,0,0.01)' // barely visible
    },

    typography: {
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
        normal: '150ms',
        slow: '200ms'
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)'
      }
    }
  },

  // Component patterns - how components look in Linear
  patterns: {
    button: {
      variant: 'ghost',
      padding: { x: 3, y: 2 }, // spacing scale units
      borderRadius: 'sm',
      border: 'none',
      shadow: 'none',
      hover: {
        background: 'subtle', // very subtle background
        opacity: 0.8,
        translate: 'none'
      },
      fontWeight: 'medium',
      textTransform: 'none',
      letterSpacing: 'normal'
    },

    card: {
      variant: 'flat',
      padding: 5, // spacing scale unit
      borderRadius: 'md',
      border: 'none',
      shadow: 'none',
      hover: {
        background: 'subtle', // very subtle background change
        translate: 'none'
      },
      background: 'transparent'
    },

    input: {
      variant: 'ghost',
      padding: { x: 3, y: 2 },
      borderRadius: 'sm',
      border: 'none',
      background: 'transparent',
      focusStyle: 'subtle-background' // subtle background on focus
    },

    table: {
      variant: 'minimal',
      rowPadding: 2,
      borderStyle: 'divider-subtle', // very subtle dividers
      headerStyle: 'flat',
      headerBackground: 'none'
    },

    nav: {
      variant: 'flat',
      itemPadding: { x: 3, y: 2 },
      itemBorderRadius: 'sm',
      activeStyle: 'text-color', // just different text color, no background
      hoverStyle: 'opacity' // opacity change on hover
    }
  },

  // Semantic mappings
  semantics: {
    emphasis: {
      minimal: 'ghost',
      subtle: 'flat',
      default: 'minimal'
    }
  }
};
