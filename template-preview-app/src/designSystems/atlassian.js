// Atlassian Design System
// Design system powering Jira, Confluence, Trello, and other Atlassian products
// Enterprise collaboration and productivity focus

export const atlassianDesignSystem = {
  id: 'atlassian',
  name: 'Atlassian',
  description: 'Enterprise design system for collaboration tools with bold colors and clear hierarchy',
  vendor: 'Atlassian',
  usedBy: ['Jira', 'Confluence', 'Trello', 'Bitbucket'],

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
        7: 40,
        8: 48
      }
    },

    borderRadius: {
      none: 0,
      sm: 3,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999
    },

    shadows: {
      none: 'none',
      sm: '0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
      md: '0 4px 8px -2px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
      lg: '0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
      xl: '0 12px 24px -6px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
      elevated: '0 4px 8px -2px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)'
    },

    borders: {
      width: {
        none: 0,
        thin: 1,
        medium: 2
      },
      style: 'solid',
      colors: {
        subtle: 'rgba(9, 30, 66, 0.08)',
        default: 'rgba(9, 30, 66, 0.13)',
        strong: 'rgba(9, 30, 66, 0.25)'
      }
    },

    typography: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', sans-serif",
      fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeights: {
        tight: 1.2,
        normal: 1.42857143,
        relaxed: 1.71428571
      }
    },

    transitions: {
      duration: {
        fast: '100ms',
        normal: '200ms',
        slow: '300ms'
      },
      easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        in: 'cubic-bezier(0.8, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)'
      }
    }
  },

  patterns: {
    button: {
      variant: 'solid-bold',
      padding: { x: 3, y: 2 },
      borderRadius: 'sm',
      border: 'none',
      shadow: 'none',
      hover: {
        brightness: 0.95,
        translate: 'none'
      },
      fontWeight: 'medium',
      textTransform: 'none',
      letterSpacing: 'normal'
    },

    card: {
      variant: 'elevated',
      padding: 5,
      borderRadius: 'sm',
      border: 'none',
      shadow: 'md',
      hover: {
        shadow: 'lg',
        translate: 'none'
      }
    },

    input: {
      variant: 'outlined',
      padding: { x: 2, y: 2 },
      borderRadius: 'sm',
      border: 'medium',
      background: 'white',
      focusStyle: 'border-blue'
    },

    table: {
      variant: 'dynamic-table',
      rowPadding: 3,
      borderStyle: 'horizontal-lines',
      headerStyle: 'bold',
      headerBackground: 'none'
    },

    nav: {
      variant: 'side-navigation',
      itemPadding: { x: 3, y: 2 },
      itemBorderRadius: 'sm',
      activeStyle: 'bold-text-background',
      hoverStyle: 'background'
    }
  },

  semantics: {
    appearance: {
      default: 'subtle',
      primary: 'bold',
      danger: 'warning',
      subtle: 'ghost'
    }
  }
};
