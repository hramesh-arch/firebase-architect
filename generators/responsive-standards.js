/**
 * Responsive Design System Standards
 * These standards are applied to all Firebase Architect projects
 * to ensure proper responsive behavior across all devices
 */

// Industry-standard breakpoints (mobile-first)
export const BREAKPOINTS = {
  xs: '320px',   // Small phones
  sm: '640px',   // Large phones
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large desktops
};

// Container max-widths for optimal readability
export const CONTAINER_MAX_WIDTHS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%'
};

// Spacing scale (in pixels) - based on 4px grid
export const SPACING_SCALE = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px'
};

// Typography scale - fluid sizing
export const TYPOGRAPHY_SCALE = {
  xs: {
    fontSize: '12px',
    lineHeight: '16px'
  },
  sm: {
    fontSize: '14px',
    lineHeight: '20px'
  },
  base: {
    fontSize: '16px',
    lineHeight: '24px'
  },
  lg: {
    fontSize: '18px',
    lineHeight: '28px'
  },
  xl: {
    fontSize: '20px',
    lineHeight: '28px'
  },
  '2xl': {
    fontSize: '24px',
    lineHeight: '32px'
  },
  '3xl': {
    fontSize: '30px',
    lineHeight: '36px'
  },
  '4xl': {
    fontSize: '36px',
    lineHeight: '40px'
  },
  '5xl': {
    fontSize: '48px',
    lineHeight: '1'
  }
};

// Responsive typography (scales with viewport)
export const FLUID_TYPOGRAPHY = {
  h1: {
    mobile: '32px',
    tablet: '40px',
    desktop: '48px',
    lineHeight: '1.2'
  },
  h2: {
    mobile: '28px',
    tablet: '32px',
    desktop: '36px',
    lineHeight: '1.3'
  },
  h3: {
    mobile: '24px',
    tablet: '28px',
    desktop: '30px',
    lineHeight: '1.4'
  },
  h4: {
    mobile: '20px',
    tablet: '22px',
    desktop: '24px',
    lineHeight: '1.4'
  },
  body: {
    mobile: '16px',
    tablet: '16px',
    desktop: '16px',
    lineHeight: '1.6'
  },
  small: {
    mobile: '14px',
    tablet: '14px',
    desktop: '14px',
    lineHeight: '1.5'
  }
};

// Touch target sizes (WCAG AAA compliance)
export const TOUCH_TARGETS = {
  minimum: '44px',      // WCAG AAA minimum
  comfortable: '48px',  // Recommended for buttons
  large: '56px'        // For primary actions
};

// Z-index scale (prevents z-index wars)
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700
};

// Animation/Transition standards
export const TRANSITIONS = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms'
};

export const EASINGS = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
};

// Responsive grid systems
export const GRID_COLUMNS = {
  mobile: 4,
  tablet: 8,
  desktop: 12
};

export const GRID_GUTTER = {
  mobile: '16px',
  tablet: '24px',
  desktop: '32px'
};

// Common device sizes for testing
export const DEVICE_SIZES = {
  'iPhone SE': { width: 375, height: 667 },
  'iPhone 12/13': { width: 390, height: 844 },
  'iPhone 14 Pro Max': { width: 430, height: 932 },
  'iPad Mini': { width: 768, height: 1024 },
  'iPad Pro': { width: 1024, height: 1366 },
  'MacBook Air': { width: 1280, height: 832 },
  'Desktop': { width: 1920, height: 1080 },
  'Desktop 4K': { width: 3840, height: 2160 }
};

// Accessibility standards
export const ACCESSIBILITY_STANDARDS = {
  minTouchTarget: '44px',
  minContrastRatio: 4.5,      // WCAG AA
  minContrastRatioLarge: 3,   // WCAG AA for large text
  minContrastRatioAAA: 7,     // WCAG AAA
  focusOutlineWidth: '2px',
  focusOutlineOffset: '2px'
};

/**
 * Generate responsive CSS utilities
 */
export function generateResponsiveUtils(framework) {
  const utils = {
    breakpoints: BREAKPOINTS,
    spacing: SPACING_SCALE,
    typography: TYPOGRAPHY_SCALE,
    touchTargets: TOUCH_TARGETS
  };

  switch (framework) {
    case 'Tailwind CSS':
      return generateTailwindConfig(utils);
    case 'Material-UI (MUI)':
      return generateMUIThemeBreakpoints(utils);
    case 'Ant Design':
      return generateAntDesignBreakpoints(utils);
    default:
      return generateCSSVariables(utils);
  }
}

function generateTailwindConfig(utils) {
  return `module.exports = {
  theme: {
    screens: ${JSON.stringify(utils.breakpoints, null, 6)},
    spacing: ${JSON.stringify(utils.spacing, null, 6)},
    fontSize: ${JSON.stringify(utils.typography, null, 6)},
    minHeight: {
      'touch': '${utils.touchTargets.minimum}',
      'touch-comfortable': '${utils.touchTargets.comfortable}'
    },
    minWidth: {
      'touch': '${utils.touchTargets.minimum}',
      'touch-comfortable': '${utils.touchTargets.comfortable}'
    }
  }
}`;
}

function generateMUIThemeBreakpoints(utils) {
  return `import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: ${parseInt(utils.breakpoints.xs)},
      sm: ${parseInt(utils.breakpoints.sm)},
      md: ${parseInt(utils.breakpoints.md)},
      lg: ${parseInt(utils.breakpoints.lg)},
      xl: ${parseInt(utils.breakpoints.xl)}
    }
  },
  spacing: 4, // Base spacing unit (4px)
  typography: {
    fontSize: 16,
    h1: {
      fontSize: '${FLUID_TYPOGRAPHY.h1.mobile}',
      '@media (min-width:${utils.breakpoints.md})': {
        fontSize: '${FLUID_TYPOGRAPHY.h1.tablet}'
      },
      '@media (min-width:${utils.breakpoints.lg})': {
        fontSize: '${FLUID_TYPOGRAPHY.h1.desktop}'
      }
    },
    // ... other typography scales
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: '${utils.touchTargets.comfortable}',
          minWidth: '${utils.touchTargets.comfortable}'
        }
      }
    }
  }
});

export default theme;`;
}

function generateAntDesignBreakpoints(utils) {
  return `// Ant Design breakpoints configuration
export const antdBreakpoints = {
  xs: '${utils.breakpoints.xs}',
  sm: '${utils.breakpoints.sm}',
  md: '${utils.breakpoints.md}',
  lg: '${utils.breakpoints.lg}',
  xl: '${utils.breakpoints.xl}',
  xxl: '${utils.breakpoints['2xl']}'
};`;
}

function generateCSSVariables(utils) {
  return `:root {
  /* Breakpoints (use in media queries) */
  --breakpoint-sm: ${utils.breakpoints.sm};
  --breakpoint-md: ${utils.breakpoints.md};
  --breakpoint-lg: ${utils.breakpoints.lg};
  --breakpoint-xl: ${utils.breakpoints.xl};

  /* Spacing scale */
  --spacing-1: ${utils.spacing[1]};
  --spacing-2: ${utils.spacing[2]};
  --spacing-3: ${utils.spacing[3]};
  --spacing-4: ${utils.spacing[4]};
  --spacing-6: ${utils.spacing[6]};
  --spacing-8: ${utils.spacing[8]};

  /* Touch targets */
  --touch-target-min: ${utils.touchTargets.minimum};
  --touch-target-comfortable: ${utils.touchTargets.comfortable};

  /* Typography */
  --font-size-base: ${utils.typography.base.fontSize};
  --line-height-base: ${utils.typography.base.lineHeight};
}`;
}

/**
 * Viewport meta tag (essential for responsive design)
 */
export const VIEWPORT_META = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">';

/**
 * Responsive image best practices
 */
export const RESPONSIVE_IMAGE_GUIDELINES = {
  useSrcSet: true,
  lazyLoad: true,
  sizes: ['320w', '640w', '768w', '1024w', '1280w', '1920w'],
  formats: ['webp', 'avif', 'jpg'], // Modern formats first
  aspectRatios: {
    square: '1:1',
    landscape: '16:9',
    portrait: '4:5',
    ultrawide: '21:9'
  }
};

/**
 * Component responsiveness guidelines
 */
export const COMPONENT_RESPONSIVE_PATTERNS = {
  navigation: {
    mobile: 'hamburger menu',
    tablet: 'horizontal nav',
    desktop: 'full horizontal nav with dropdowns'
  },
  dataTable: {
    mobile: 'card view (stacked)',
    tablet: 'simplified table',
    desktop: 'full table with all columns'
  },
  forms: {
    mobile: 'single column',
    tablet: 'single or two columns',
    desktop: 'multi-column layout'
  },
  cards: {
    mobile: '1 column',
    tablet: '2 columns',
    desktop: '3-4 columns'
  },
  sidebar: {
    mobile: 'drawer (hidden)',
    tablet: 'collapsible sidebar',
    desktop: 'always visible sidebar'
  }
};

/**
 * Testing checklist for responsive design
 */
export const RESPONSIVE_TESTING_CHECKLIST = [
  'Test on iPhone SE (375px) - smallest common mobile',
  'Test on standard phone (390px)',
  'Test on tablet (768px)',
  'Test on laptop (1280px)',
  'Test on desktop (1920px)',
  'Test touch interactions on mobile',
  'Test landscape orientation on mobile',
  'Verify text readability at all sizes',
  'Check touch target sizes (min 44px)',
  'Test with browser zoom at 200%',
  'Verify images load correctly',
  'Check horizontal scrolling (should be none)',
  'Test with slow 3G connection',
  'Verify keyboard navigation works'
];

export default {
  BREAKPOINTS,
  CONTAINER_MAX_WIDTHS,
  SPACING_SCALE,
  TYPOGRAPHY_SCALE,
  FLUID_TYPOGRAPHY,
  TOUCH_TARGETS,
  Z_INDEX,
  TRANSITIONS,
  EASINGS,
  GRID_COLUMNS,
  GRID_GUTTER,
  DEVICE_SIZES,
  ACCESSIBILITY_STANDARDS,
  VIEWPORT_META,
  RESPONSIVE_IMAGE_GUIDELINES,
  COMPONENT_RESPONSIVE_PATTERNS,
  RESPONSIVE_TESTING_CHECKLIST,
  generateResponsiveUtils
};
