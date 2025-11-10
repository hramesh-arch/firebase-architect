/**
 * UI Template Generator
 *
 * Generates UI-specific files based on selected template configuration
 */

import fs from 'fs';
import path from 'path';
import { TemplateConfigurator } from '../templates/template-configurator.js';
import { getTemplate } from '../templates/template-library.js';
import ResponsiveStandards from './responsive-standards.js';
import ora from 'ora';
import chalk from 'chalk';

/**
 * Generate UI template files for the project
 */
export async function generateUITemplate(architecture, projectPath) {
  if (!architecture.uiTemplate) {
    console.log(chalk.gray('No UI template specified, using default Material-UI setup\n'));
    return null;
  }

  const spinner = ora('Setting up UI template...').start();

  try {
    const { templateId, customization } = architecture.uiTemplate;
    const template = getTemplate(templateId);

    if (!template) {
      throw new Error(`Template '${templateId}' not found`);
    }

    spinner.text = `Setting up ${template.name}...`;

    // Create template configurator
    const configurator = new TemplateConfigurator(templateId);

    // Apply customizations if provided
    if (customization) {
      if (customization.colors) {
        configurator.setColors(customization.colors);
      }
      if (customization.typography) {
        configurator.setTypography(customization.typography);
      }
      if (customization.spacing) {
        configurator.setSpacing(customization.spacing);
      }
      if (customization.borderRadius) {
        configurator.setBorderRadius(customization.borderRadius);
      }
    }

    // Generate theme file
    const themeContent = configurator.generateThemeFile();
    const themeFileName = getThemeFileName(template.framework);
    const themePath = path.join(projectPath, 'apps', 'web', 'src', 'theme', themeFileName);

    fs.mkdirSync(path.dirname(themePath), { recursive: true });
    fs.writeFileSync(themePath, themeContent);

    // Save configuration
    await configurator.saveConfiguration(projectPath);

    // Generate responsive standards configuration
    await generateResponsiveConfig(template, projectPath);

    // Generate component library setup
    await generateComponentLibrarySetup(template, projectPath);

    // Generate example components
    await generateExampleComponents(template, projectPath);

    // Update package.json with dependencies
    await addTemplateDependencies(template, projectPath);

    spinner.succeed(`UI template configured: ${chalk.bold(template.name)}`);

    return {
      templateId: template.id,
      templateName: template.name,
      framework: template.framework,
      themePath: themePath.replace(projectPath, ''),
      components: template.components,
      layouts: template.layouts
    };

  } catch (error) {
    spinner.fail('Failed to set up UI template');
    console.error(error);
    return null;
  }
}

/**
 * Get theme file name based on framework
 */
function getThemeFileName(framework) {
  const fileNames = {
    'Material-UI (MUI)': 'theme.ts',
    'Ant Design': 'antd-theme.ts',
    'Tailwind CSS': 'tailwind.config.js',
    'CoreUI (Bootstrap)': '_variables.scss',
    'Shadcn/ui': 'globals.css',
    'Custom Healthcare UI': 'healthcare-theme.ts'
  };

  return fileNames[framework] || 'theme.ts';
}

/**
 * Generate component library setup
 */
async function generateComponentLibrarySetup(template, projectPath) {
  const setupContent = generateLibrarySetupContent(template);
  const setupPath = path.join(projectPath, 'apps', 'web', 'src', 'lib', 'ui-setup.ts');

  fs.mkdirSync(path.dirname(setupPath), { recursive: true});
  fs.writeFileSync(setupPath, setupContent);
}

/**
 * Generate library setup content
 */
function generateLibrarySetupContent(template) {
  switch (template.framework) {
    case 'Material-UI (MUI)':
      return `import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';

export function UIProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default UIProvider;
`;

    case 'Ant Design':
      return `import { ConfigProvider } from 'antd';
import antdTheme from '../theme/antd-theme';

export function UIProvider({ children }) {
  return (
    <ConfigProvider theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
}

export default UIProvider;
`;

    case 'Tailwind CSS':
      return `// Tailwind is configured via tailwind.config.js
// Import global styles in your app entry point
import '../theme/globals.css';

export function UIProvider({ children }) {
  return <>{children}</>;
}

export default UIProvider;
`;

    default:
      return `export function UIProvider({ children }) {
  return <>{children}</>;
}

export default UIProvider;
`;
  }
}

/**
 * Generate example components
 */
async function generateExampleComponents(template, projectPath) {
  const componentsPath = path.join(projectPath, 'apps', 'web', 'src', 'components');
  fs.mkdirSync(componentsPath, { recursive: true });

  // Generate example dashboard component
  const dashboardContent = generateDashboardComponent(template);
  fs.writeFileSync(
    path.join(componentsPath, 'Dashboard.tsx'),
    dashboardContent
  );

  // Generate example layout component
  const layoutContent = generateLayoutComponent(template);
  fs.writeFileSync(
    path.join(componentsPath, 'Layout.tsx'),
    layoutContent
  );
}

/**
 * Generate dashboard component based on template
 */
function generateDashboardComponent(template) {
  // Template-specific dashboard components will be added here
  return `// Dashboard component for ${template.name}
// This is a starter component - customize as needed

import React from 'react';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your ${template.name} powered application!</p>

      {/* Add your dashboard content here */}
      {/* Template includes: ${template.components.join(', ')} */}
    </div>
  );
}
`;
}

/**
 * Generate layout component based on template
 */
function generateLayoutComponent(template) {
  return `// Layout component for ${template.name}
// This provides the main application layout structure

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-layout">
      <header className="app-header">
        {/* Add navigation */}
      </header>

      <main className="app-content">
        {children}
      </main>

      <footer className="app-footer">
        {/* Add footer */}
      </footer>
    </div>
  );
}
`;
}

/**
 * Add template dependencies to package.json
 */
async function addTemplateDependencies(template, projectPath) {
  const packageJsonPath = path.join(projectPath, 'apps', 'web', 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Add template dependencies
  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...template.dependencies
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

/**
 * Generate responsive standards configuration
 */
async function generateResponsiveConfig(template, projectPath) {
  const configDir = path.join(projectPath, 'apps', 'web', 'src', 'config');
  fs.mkdirSync(configDir, { recursive: true });

  // Generate responsive.config.js with all standards
  const responsiveConfigContent = `/**
 * Responsive Design Standards
 * Auto-generated by Firebase Architect
 *
 * These standards ensure your application works beautifully across all devices
 */

// Breakpoints (mobile-first)
export const breakpoints = ${JSON.stringify(ResponsiveStandards.BREAKPOINTS, null, 2)};

// Container max-widths
export const containers = ${JSON.stringify(ResponsiveStandards.CONTAINER_MAX_WIDTHS, null, 2)};

// Spacing scale (based on 4px grid)
export const spacing = ${JSON.stringify(ResponsiveStandards.SPACING_SCALE, null, 2)};

// Touch target minimum sizes (WCAG AAA)
export const touchTargets = ${JSON.stringify(ResponsiveStandards.TOUCH_TARGETS, null, 2)};

// Z-index scale (prevents z-index wars)
export const zIndex = ${JSON.stringify(ResponsiveStandards.Z_INDEX, null, 2)};

// Transition speeds
export const transitions = ${JSON.stringify(ResponsiveStandards.TRANSITIONS, null, 2)};

// Animation easings
export const easings = ${JSON.stringify(ResponsiveStandards.EASINGS, null, 2)};

// Grid system
export const grid = {
  columns: ${JSON.stringify(ResponsiveStandards.GRID_COLUMNS, null, 4)},
  gutter: ${JSON.stringify(ResponsiveStandards.GRID_GUTTER, null, 4)}
};

// Responsive typography (fluid sizing)
export const fluidTypography = ${JSON.stringify(ResponsiveStandards.FLUID_TYPOGRAPHY, null, 2)};

// Component responsive patterns
export const componentPatterns = ${JSON.stringify(ResponsiveStandards.COMPONENT_RESPONSIVE_PATTERNS, null, 2)};

// Accessibility standards
export const accessibility = ${JSON.stringify(ResponsiveStandards.ACCESSIBILITY_STANDARDS, null, 2)};

/**
 * Helper: Get responsive value based on current breakpoint
 * Usage: const fontSize = getResponsiveValue(fluidTypography.h1);
 */
export function getResponsiveValue(values, currentBreakpoint = 'desktop') {
  return values[currentBreakpoint] || values.mobile || values;
}

/**
 * Helper: Media query generator
 * Usage: const mobileStyles = mediaQuery('sm', 'background: red;');
 */
export function mediaQuery(breakpoint, styles) {
  return \`@media (min-width: \${breakpoints[breakpoint]}) { \${styles} }\`;
}

export default {
  breakpoints,
  containers,
  spacing,
  touchTargets,
  zIndex,
  transitions,
  easings,
  grid,
  fluidTypography,
  componentPatterns,
  accessibility,
  getResponsiveValue,
  mediaQuery
};
`;

  fs.writeFileSync(
    path.join(configDir, 'responsive.config.js'),
    responsiveConfigContent
  );

  // Also generate viewport meta tag reminder
  const viewportMetaPath = path.join(configDir, 'viewport-meta.txt');
  fs.writeFileSync(
    viewportMetaPath,
    `Add this to your index.html <head>:\n\n${ResponsiveStandards.VIEWPORT_META}\n\nThis ensures proper responsive behavior on all devices.`
  );

  // Generate responsive best practices doc
  const bestPracticesPath = path.join(projectPath, '.claude', 'RESPONSIVE_BEST_PRACTICES.md');
  const bestPractices = generateResponsiveBestPracticesDoc(template);
  fs.writeFileSync(bestPracticesPath, bestPractices);
}

/**
 * Generate responsive best practices documentation
 */
function generateResponsiveBestPracticesDoc(template) {
  return `# Responsive Design Best Practices

## Overview

This ${template.name} application is configured with industry-standard responsive design practices.

## Breakpoints (Mobile-First)

\`\`\`javascript
${JSON.stringify(ResponsiveStandards.BREAKPOINTS, null, 2)}
\`\`\`

### Usage
Always design for mobile first, then enhance for larger screens:

\`\`\`css
/* Mobile first (default) */
.element {
  padding: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    padding: 24px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element {
    padding: 32px;
  }
}
\`\`\`

## Container Max-Widths

Keep content readable by limiting container widths:

\`\`\`javascript
${JSON.stringify(ResponsiveStandards.CONTAINER_MAX_WIDTHS, null, 2)}
\`\`\`

## Touch Targets (Accessibility)

All interactive elements MUST be at least **${ResponsiveStandards.TOUCH_TARGETS.minimum}** (WCAG AAA):

- Buttons: min ${ResponsiveStandards.TOUCH_TARGETS.comfortable}
- Icons: min ${ResponsiveStandards.TOUCH_TARGETS.minimum}
- Links: min ${ResponsiveStandards.TOUCH_TARGETS.minimum}

\`\`\`css
button {
  min-height: ${ResponsiveStandards.TOUCH_TARGETS.comfortable};
  min-width: ${ResponsiveStandards.TOUCH_TARGETS.comfortable};
}
\`\`\`

## Responsive Typography

Typography scales based on viewport size:

\`\`\`javascript
${JSON.stringify(ResponsiveStandards.FLUID_TYPOGRAPHY.h1, null, 2)}
\`\`\`

Example implementation:
\`\`\`css
h1 {
  font-size: ${ResponsiveStandards.FLUID_TYPOGRAPHY.h1.mobile};
}

@media (min-width: 768px) {
  h1 {
    font-size: ${ResponsiveStandards.FLUID_TYPOGRAPHY.h1.tablet};
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: ${ResponsiveStandards.FLUID_TYPOGRAPHY.h1.desktop};
  }
}
\`\`\`

## Component Patterns

### Navigation
${JSON.stringify(ResponsiveStandards.COMPONENT_RESPONSIVE_PATTERNS.navigation, null, 2)}

### Data Tables
${JSON.stringify(ResponsiveStandards.COMPONENT_RESPONSIVE_PATTERNS.dataTable, null, 2)}

### Forms
${JSON.stringify(ResponsiveStandards.COMPONENT_RESPONSIVE_PATTERNS.forms, null, 2)}

## Testing Checklist

${ResponsiveStandards.RESPONSIVE_TESTING_CHECKLIST.map(item => `- [ ] ${item}`).join('\n')}

## Common Device Sizes

Test on these devices:
\`\`\`javascript
${JSON.stringify(ResponsiveStandards.DEVICE_SIZES, null, 2)}
\`\`\`

## Configuration File

All responsive standards are available in: \`apps/web/src/config/responsive.config.js\`

Import and use in your components:
\`\`\`javascript
import { breakpoints, touchTargets, fluidTypography } from './config/responsive.config';
\`\`\`

## Quick Reference

- **Always mobile-first**: Design for small screens, enhance for large
- **Touch-friendly**: Min 44px for all interactive elements
- **Flexible layouts**: Use Grid/Flexbox, avoid fixed widths
- **Responsive images**: Use srcset and sizes attributes
- **Test on real devices**: Emulators are not enough
- **Landscape mode**: Test both portrait and landscape
- **Slow connections**: Test with throttled network

---

*These standards ensure your ${template.name} application works beautifully on all devices.*
`;
}

/**
 * Display template information
 */
export function displayTemplateInfo(templateInfo) {
  if (!templateInfo) return;

  console.log(chalk.cyan('\n🎨 UI Template:\n'));
  console.log(chalk.white(`   Template: ${chalk.bold(templateInfo.templateName)}`));
  console.log(chalk.white(`   Framework: ${templateInfo.framework}`));
  console.log(chalk.white(`   Theme file: ${templateInfo.themePath}`));
  console.log(chalk.white(`   Components: ${templateInfo.components.length} available`));
  console.log(chalk.white(`   Layouts: ${templateInfo.layouts.join(', ')}\n`));
}

export default generateUITemplate;
