// Material Design System 3 (Material You)
// Google's latest design language with dynamic color and modern aesthetics
// Used in: Android, Google Workspace, Gmail, Google Cloud Console

export const materialDesignSystem = {
  id: 'material',
  name: 'Material 3',
  description: 'Google\'s modern design system with elevation, adaptive colors, and expressive motion',
  vendor: 'Google',
  usedBy: ['Android', 'Google Workspace', 'Gmail', 'Google Cloud'],

  // Foundation tokens - immutable design system values
  foundations: {
    spacing: {
      unit: 8,
      scale: {
        0: 0,
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        5: 24,
        6: 32,
        7: 48,
        8: 64
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
      sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      xl: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      elevated: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)'
    },

    typography: {
      fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700
      },
      lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75
      }
    },

    transitions: {
      duration: {
        fast: '150ms',
        normal: '250ms',
        slow: '350ms'
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
        decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)'
      }
    }
  },

  // Component patterns - how components look in Material Design
  patterns: {
    button: {
      variant: 'elevated',
      padding: { x: 4, y: 2 }, // spacing scale units
      borderRadius: 'md',
      shadow: 'md',
      hover: {
        shadow: 'lg',
        translate: 'none'
      },
      fontWeight: 'medium',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    card: {
      variant: 'elevated',
      padding: 5, // spacing scale unit
      borderRadius: 'lg',
      shadow: 'elevated',
      hover: {
        shadow: 'lg',
        translate: '-2px'
      },
      border: 'none'
    },

    input: {
      variant: 'filled',
      padding: { x: 4, y: 3 },
      borderRadius: 'sm',
      border: 'none',
      background: 'filled', // light gray background
      focusStyle: 'underline' // bottom border on focus
    },

    table: {
      variant: 'simple',
      rowPadding: 4,
      borderStyle: 'divider', // light dividers between rows
      headerStyle: 'elevated',
      headerBackground: 'subtle'
    },

    nav: {
      variant: 'elevated',
      itemPadding: { x: 4, y: 3 },
      itemBorderRadius: 'lg',
      activeStyle: 'elevated', // elevated with shadow
      hoverStyle: 'background' // background color change
    }
  },

  // Semantic mappings - how semantic meanings map to visual styles
  semantics: {
    elevation: {
      flat: 0,
      raised: 1,
      overlay: 2,
      modal: 3
    }
  }
};
