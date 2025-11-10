/**
 * Template Configurator
 *
 * Allows customization of UI templates with color palettes, fonts, and other styling options.
 */

import { getTemplate } from './template-library.js';
import fs from 'fs';
import path from 'path';

/**
 * Template configuration class
 */
export class TemplateConfigurator {
  constructor(templateId) {
    this.template = getTemplate(templateId);
    if (!this.template) {
      throw new Error(`Template '${templateId}' not found`);
    }
    this.config = JSON.parse(JSON.stringify(this.template.defaultConfig));
  }

  /**
   * Customize colors
   */
  setColors(colors) {
    this.config.colors = {
      ...this.config.colors,
      ...colors
    };
    return this;
  }

  /**
   * Set primary color with automatic palette generation
   */
  setPrimaryColor(color) {
    this.config.colors.primary = color;
    // Generate shades if needed
    this.config.colors.primaryLight = this.lighten(color, 20);
    this.config.colors.primaryDark = this.darken(color, 20);
    return this;
  }

  /**
   * Customize typography
   */
  setTypography(typography) {
    this.config.typography = {
      ...this.config.typography,
      ...typography
    };
    return this;
  }

  /**
   * Set font family
   */
  setFontFamily(fontFamily) {
    this.config.typography.fontFamily = fontFamily;
    return this;
  }

  /**
   * Set spacing scale
   */
  setSpacing(spacing) {
    this.config.spacing = spacing;
    return this;
  }

  /**
   * Set border radius
   */
  setBorderRadius(radius) {
    this.config.borderRadius = radius;
    return this;
  }

  /**
   * Get current configuration
   */
  getConfig() {
    return {
      templateId: this.template.id,
      templateName: this.template.name,
      framework: this.template.framework,
      config: this.config,
      components: this.template.components,
      layouts: this.template.layouts,
      dependencies: this.template.dependencies,
      assets: this.template.assets
    };
  }

  /**
   * Generate theme file content
   */
  generateThemeFile() {
    const framework = this.template.framework;

    switch (framework) {
      case 'Material-UI (MUI)':
        return this.generateMUITheme();
      case 'Ant Design':
        return this.generateAntDTheme();
      case 'Tailwind CSS':
        return this.generateTailwindConfig();
      case 'CoreUI (Bootstrap)':
        return this.generateBootstrapTheme();
      case 'Shadcn/ui':
        return this.generateShadcnTheme();
      case 'Custom Healthcare UI':
        return this.generateCustomTheme();
      default:
        return this.generateGenericTheme();
    }
  }

  /**
   * Generate Material-UI theme
   */
  generateMUITheme() {
    return `import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '${this.config.colors.primary}',
    },
    secondary: {
      main: '${this.config.colors.secondary}',
    },
    success: {
      main: '${this.config.colors.success}',
    },
    warning: {
      main: '${this.config.colors.warning}',
    },
    error: {
      main: '${this.config.colors.error}',
    },
    info: {
      main: '${this.config.colors.info}',
    },
    background: {
      default: '${this.config.colors.background}',
      paper: '${this.config.colors.surface}',
    },
    text: {
      primary: '${this.config.colors.text.primary}',
      secondary: '${this.config.colors.text.secondary}',
    },
  },
  typography: {
    fontFamily: ${this.config.typography.fontFamily},
    fontSize: ${this.config.typography.fontSize},
    fontWeightLight: ${this.config.typography.fontWeightLight},
    fontWeightRegular: ${this.config.typography.fontWeightRegular},
    fontWeightMedium: ${this.config.typography.fontWeightMedium},
    fontWeightBold: ${this.config.typography.fontWeightBold},
  },
  spacing: ${this.config.spacing},
  shape: {
    borderRadius: ${this.config.borderRadius},
  },
});

export default theme;
`;
  }

  /**
   * Generate Ant Design theme
   */
  generateAntDTheme() {
    return `import { theme } from 'antd';

const antdTheme = {
  token: {
    colorPrimary: '${this.config.colors.primary}',
    colorSuccess: '${this.config.colors.success}',
    colorWarning: '${this.config.colors.warning}',
    colorError: '${this.config.colors.error}',
    colorInfo: '${this.config.colors.info}',
    colorBgContainer: '${this.config.colors.surface}',
    colorBgLayout: '${this.config.colors.background}',
    colorText: '${this.config.colors.text.primary}',
    colorTextSecondary: '${this.config.colors.text.secondary}',
    fontSize: ${this.config.typography.fontSize},
    fontFamily: ${this.config.typography.fontFamily},
    borderRadius: ${this.config.borderRadius},
  },
};

export default antdTheme;
`;
  }

  /**
   * Generate Tailwind config
   */
  generateTailwindConfig() {
    return `module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '${this.config.colors.primary}',
        secondary: '${this.config.colors.secondary}',
        success: '${this.config.colors.success}',
        warning: '${this.config.colors.warning}',
        error: '${this.config.colors.error}',
        info: '${this.config.colors.info}',
        background: '${this.config.colors.background}',
        surface: '${this.config.colors.surface}',
      },
      fontFamily: {
        sans: ${JSON.stringify(this.config.typography.fontFamily.split(',').map(f => f.trim()))},
      },
      fontSize: {
        base: '${this.config.typography.fontSize}px',
      },
      borderRadius: {
        DEFAULT: '${this.config.borderRadius}px',
      },
    },
  },
  plugins: [],
};
`;
  }

  /**
   * Generate Bootstrap theme
   */
  generateBootstrapTheme() {
    return `// Bootstrap theme customization
$primary: ${this.config.colors.primary};
$secondary: ${this.config.colors.secondary};
$success: ${this.config.colors.success};
$warning: ${this.config.colors.warning};
$danger: ${this.config.colors.error};
$info: ${this.config.colors.info};

$body-bg: ${this.config.colors.background};
$body-color: ${this.config.colors.text.primary};

$font-family-sans-serif: ${this.config.typography.fontFamily};
$font-size-base: ${this.config.typography.fontSize}px;

$border-radius: ${this.config.borderRadius}px;
$border-radius-sm: ${this.config.borderRadius / 2}px;
$border-radius-lg: ${this.config.borderRadius * 1.5}px;

@import '~bootstrap/scss/bootstrap';
`;
  }

  /**
   * Generate Shadcn theme
   */
  generateShadcnTheme() {
    return `@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: ${this.config.colors.text.primary};

    --primary: ${this.config.colors.primary};
    --primary-foreground: 0 0% 100%;

    --secondary: ${this.config.colors.secondary};
    --secondary-foreground: 0 0% 9%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: ${this.config.colors.error};
    --destructive-foreground: 0 0% 100%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: ${this.config.colors.primary};

    --radius: ${this.config.borderRadius}px;
  }
}
`;
  }

  /**
   * Generate custom healthcare theme
   */
  generateCustomTheme() {
    return `// Healthcare UI Theme Configuration
export const healthcareTheme = {
  colors: {
    primary: '${this.config.colors.primary}',
    secondary: '${this.config.colors.secondary}',
    success: '${this.config.colors.success}',
    warning: '${this.config.colors.warning}',
    error: '${this.config.colors.error}',
    info: '${this.config.colors.info}',
    accent: '${this.config.colors.accent}',
    background: '${this.config.colors.background}',
    surface: '${this.config.colors.surface}',
    text: {
      primary: '${this.config.colors.text.primary}',
      secondary: '${this.config.colors.text.secondary}',
    },
  },
  typography: {
    fontFamily: ${this.config.typography.fontFamily},
    fontSize: ${this.config.typography.fontSize},
    lineHeight: ${this.config.typography.lineHeight},
    fontWeight: {
      light: ${this.config.typography.fontWeightLight},
      regular: ${this.config.typography.fontWeightRegular},
      medium: ${this.config.typography.fontWeightMedium},
      bold: ${this.config.typography.fontWeightBold},
    },
  },
  spacing: {
    unit: ${this.config.spacing},
    xs: ${this.config.spacing * 0.5},
    sm: ${this.config.spacing},
    md: ${this.config.spacing * 2},
    lg: ${this.config.spacing * 3},
    xl: ${this.config.spacing * 4},
  },
  borderRadius: {
    small: ${this.config.borderRadius / 2},
    medium: ${this.config.borderRadius},
    large: ${this.config.borderRadius * 2},
  },
  accessibility: ${JSON.stringify(this.config.accessibility, null, 2)},
};

export default healthcareTheme;
`;
  }

  /**
   * Generate generic theme
   */
  generateGenericTheme() {
    return `export const theme = ${JSON.stringify(this.config, null, 2)};

export default theme;
`;
  }

  /**
   * Save configuration to file
   */
  async saveConfiguration(projectPath) {
    const configPath = path.join(projectPath, '.firebase-architect');
    fs.mkdirSync(configPath, { recursive: true });

    const configFile = path.join(configPath, 'ui-template.json');
    fs.writeFileSync(configFile, JSON.stringify(this.getConfig(), null, 2));

    return configFile;
  }

  /**
   * Utility: Lighten color
   */
  lighten(color, percent) {
    // Simple lightening - in production, use a color manipulation library
    return color;
  }

  /**
   * Utility: Darken color
   */
  darken(color, percent) {
    // Simple darkening - in production, use a color manipulation library
    return color;
  }
}

/**
 * Preset color palettes
 */
export const COLOR_PALETTES = {
  'blue-professional': {
    primary: '#1976d2',
    secondary: '#dc004e',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336'
  },
  'green-healthcare': {
    primary: '#00a86b',
    secondary: '#0066cc',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545'
  },
  'purple-creative': {
    primary: '#6c63ff',
    secondary: '#ff6b9d',
    success: '#00d4aa',
    warning: '#ffb800',
    error: '#ff6060'
  },
  'teal-modern': {
    primary: '#14b8a6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  'indigo-enterprise': {
    primary: '#4f46e5',
    secondary: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  'orange-energetic': {
    primary: '#f97316',
    secondary: '#3b82f6',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444'
  }
};

/**
 * Preset font combinations
 */
export const FONT_COMBINATIONS = {
  'roboto-modern': {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    description: 'Clean and modern, perfect for data-heavy apps'
  },
  'inter-professional': {
    fontFamily: "'Inter', sans-serif",
    description: 'Professional and highly readable'
  },
  'opensans-friendly': {
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial, sans-serif",
    description: 'Friendly and accessible, great for healthcare'
  },
  'poppins-bold': {
    fontFamily: "'Poppins', sans-serif",
    description: 'Bold and attention-grabbing'
  },
  'lato-elegant': {
    fontFamily: "'Lato', sans-serif",
    description: 'Elegant and versatile'
  },
  'system-native': {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    description: 'Native system fonts for best performance'
  }
};

export default TemplateConfigurator;
