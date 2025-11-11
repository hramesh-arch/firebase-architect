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
  // Source: https://m3.material.io/
  foundations: {
    // M3 uses 4dp base grid with 8dp alignment for components
    spacing: {
      unit: 4, // 4dp base unit
      scale: {
        0: 0,
        1: 4,   // 4dp - minimum spacing
        2: 8,   // 8dp - standard component spacing
        3: 12,  // 12dp
        4: 16,  // 16dp - standard padding
        5: 20,  // 20dp
        6: 24,  // 24dp - larger spacing
        7: 32,  // 32dp
        8: 48   // 48dp - minimum touch target
      }
    },

    // M3 Shape Scale: https://m3.material.io/styles/shape/shape-scale-tokens
    borderRadius: {
      none: 0,        // No rounding
      xs: 4,          // Extra Small - 4dp
      sm: 8,          // Small - 8dp
      md: 12,         // Medium - 12dp (default for cards)
      lg: 16,         // Large - 16dp
      xl: 24,         // Extra Large - 24dp
      full: 9999      // Full rounding
    },

    // M3 Elevation System: https://m3.material.io/styles/elevation/overview
    // Three-tier elevation with precise shadow specs
    shadows: {
      none: 'none',
      elevation1: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
      elevation2: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
      elevation3: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
      // Aliases for easier use
      sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
      md: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
      lg: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)'
    },

    // M3 Typography uses Roboto and Google Sans
    typography: {
      fontFamily: "'Roboto', 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75
      }
    },

    // M3 Motion System - standard easing curves
    transitions: {
      duration: {
        fast: '150ms',
        normal: '250ms',
        slow: '350ms'
      },
      easing: {
        standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',  // Standard easing
        accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',  // Accelerate
        decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)' // Decelerate
      }
    },

    // M3 specific: Border widths
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
        strong: 'rgba(0, 0, 0, 0.2)'
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
