// IBM Carbon Design System
// IBM's open-source design system for digital products and experiences
// Used in: IBM Cloud, Watson, enterprise software

export const carbonDesignSystem = {
  id: 'carbon',
  name: 'Carbon',
  description: 'IBM\'s enterprise design system with precision, accessibility, and productivity focus',
  vendor: 'IBM',
  usedBy: ['IBM Cloud', 'IBM Watson', 'Red Hat', 'Enterprise Software'],

  foundations: {
    spacing: {
      unit: 8,
      scale: {
        0: 0,
        1: 2,
        2: 4,
        3: 8,
        4: 16,
        5: 24,
        6: 32,
        7: 48,
        8: 64
      }
    },

    borderRadius: {
      none: 0,
      sm: 0,
      md: 0,
      lg: 0,
      xl: 0,
      full: 0 // Carbon uses no border radius (sharp corners)
    },

    shadows: {
      none: 'none',
      sm: '0 1px 2px rgba(0, 0, 0, 0.12)',
      md: '0 2px 6px rgba(0, 0, 0, 0.16)',
      lg: '0 4px 8px rgba(0, 0, 0, 0.16)',
      xl: '0 8px 16px rgba(0, 0, 0, 0.16)',
      elevated: '0 2px 6px rgba(0, 0, 0, 0.16)'
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

    typography: {
      fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600
      },
      lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75
      }
    },

    transitions: {
      duration: {
        fast: '110ms',
        normal: '240ms',
        slow: '400ms'
      },
      easing: {
        standard: 'cubic-bezier(0.5, 0, 0.1, 1)', // IBM curve
        productive: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
        expressive: 'cubic-bezier(0.4, 0.14, 0.3, 1)'
      }
    }
  },

  patterns: {
    button: {
      variant: 'outlined-sharp',
      padding: { x: 4, y: 3 },
      borderRadius: 'none',
      border: 'thin',
      shadow: 'none',
      hover: {
        background: 'strong',
        translate: 'none'
      },
      fontWeight: 'regular',
      textTransform: 'none',
      letterSpacing: 'normal'
    },

    card: {
      variant: 'outlined-sharp',
      padding: 4,
      borderRadius: 'none',
      border: 'thin',
      shadow: 'none',
      hover: {
        borderColor: 'strong',
        translate: 'none'
      },
      background: 'layer'
    },

    input: {
      variant: 'outlined-underline',
      padding: { x: 4, y: 3 },
      borderRadius: 'none',
      border: 'none',
      background: 'field',
      focusStyle: 'outline' // thick outline on focus
    },

    table: {
      variant: 'data-table',
      rowPadding: 4,
      borderStyle: 'full-grid',
      headerStyle: 'dark-background',
      headerBackground: 'layer'
    },

    nav: {
      variant: 'side-nav',
      itemPadding: { x: 4, y: 3 },
      itemBorderRadius: 'none',
      activeStyle: 'left-border',
      hoverStyle: 'background'
    }
  },

  semantics: {
    layers: {
      ui01: 'background',
      ui02: 'layer-01',
      ui03: 'layer-02',
      ui04: 'layer-03'
    }
  }
};
