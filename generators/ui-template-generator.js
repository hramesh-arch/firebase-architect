/**
 * UI Template Generator
 *
 * Generates UI-specific files based on selected template configuration
 */

import fs from 'fs';
import path from 'path';
import { TemplateConfigurator } from '../templates/template-configurator.js';
import { getTemplate } from '../templates/template-library.js';
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
