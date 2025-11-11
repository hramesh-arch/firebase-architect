// Ant Design System
// Enterprise-class UI design language from Alibaba
// Used in: Alibaba, Ant Financial, enterprise applications across Asia

export const antdDesignSystem = {
  id: 'antd',
  name: 'Ant Design',
  description: 'Enterprise UI design language with natural, efficient, and intuitive user experience',
  vendor: 'Ant Group (Alibaba)',
  usedBy: ['Alibaba', 'Ant Financial', 'Tencent', 'Baidu'],

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
        7: 40,
        8: 48
      }
    },

    borderRadius: {
      none: 0,
      sm: 2,
      md: 6,
      lg: 8,
      xl: 16,
      full: 9999
    },

    shadows: {
      none: 'none',
      sm: '0 1px 2px rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02)',
      md: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
      lg: '0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03)',
      xl: '0 9px 28px 8px rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03), 0 16px 64px 16px rgba(0, 0, 0, 0.02)',
      elevated: '0 2px 8px rgba(0, 0, 0, 0.15)'
    },

    borders: {
      width: {
        none: 0,
        thin: 1,
        medium: 2
      },
      style: 'solid',
      colors: {
        subtle: 'rgba(0, 0, 0, 0.06)',
        default: 'rgba(0, 0, 0, 0.15)',
        strong: 'rgba(0, 0, 0, 0.25)'
      }
    },

    typography: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeights: {
        tight: 1.35,
        normal: 1.5715,
        relaxed: 1.8
      }
    },

    transitions: {
      duration: {
        fast: '100ms',
        normal: '200ms',
        slow: '300ms'
      },
      easing: {
        standard: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        in: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        out: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
      }
    }
  },

  patterns: {
    button: {
      variant: 'primary-filled',
      padding: { x: 4, y: 2 },
      borderRadius: 'sm',
      border: 'thin',
      shadow: 'sm',
      hover: {
        shadow: 'md',
        brightness: 1.1,
        translate: 'none'
      },
      fontWeight: 'regular',
      textTransform: 'none',
      letterSpacing: 'normal'
    },

    card: {
      variant: 'bordered-hover',
      padding: 5,
      borderRadius: 'sm',
      border: 'thin',
      shadow: 'none',
      hover: {
        shadow: 'md',
        borderColor: 'strong',
        translate: '-2px'
      }
    },

    input: {
      variant: 'outlined',
      padding: { x: 3, y: 2 },
      borderRadius: 'sm',
      border: 'thin',
      background: 'transparent',
      focusStyle: 'border-glow'
    },

    table: {
      variant: 'striped-hover',
      rowPadding: 4,
      borderStyle: 'horizontal-lines',
      headerStyle: 'light-background',
      headerBackground: 'subtle'
    },

    nav: {
      variant: 'underline-active',
      itemPadding: { x: 4, y: 3 },
      itemBorderRadius: 'sm',
      activeStyle: 'bottom-border',
      hoverStyle: 'text-color'
    }
  },

  semantics: {
    emphasis: {
      primary: 'filled',
      default: 'outlined',
      text: 'ghost',
      link: 'text-only'
    }
  }
};
