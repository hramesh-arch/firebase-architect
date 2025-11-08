import fs from 'fs';
import path from 'path';
import ora from 'ora';

export async function generateTypes(config, projectPath) {
  const spinner = ora('Generating TypeScript types...').start();

  // Types are already generated in monorepo.js as part of packages/core
  // This function handles additional type generation needs

  // Generate API response types if integrations exist
  if (config.integrations && config.integrations.length > 0) {
    let apiTypesContent = `// Generated API types for external integrations\n\n`;

    config.integrations.forEach(integration => {
      const name = integration.name || integration;
      apiTypesContent += `export interface ${capitalize(name)}Response {
  // TODO: Define response type for ${name}
  success: boolean;
  data?: any;
  error?: string;
}\n\n`;
    });

    const coreTypesPath = path.join(projectPath, 'packages/core/src/api-types.ts');
    fs.writeFileSync(coreTypesPath, apiTypesContent);
  }

  // Generate form types for data models
  if (config.dataModels) {
    let formTypesContent = `// Form types for data entry\n\n`;

    config.dataModels.forEach(model => {
      formTypesContent += `export type ${model.name}FormData = Omit<${model.name}, 'id' | 'createdAt' | 'updatedAt'>;\n`;
    });

    const coreFormsPath = path.join(projectPath, 'packages/core/src/form-types.ts');
    fs.writeFileSync(coreFormsPath, formTypesContent);

    // Update core index to export new types
    const indexPath = path.join(projectPath, 'packages/core/src/index.ts');
    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    if (!indexContent.includes('api-types')) {
      indexContent += `export * from './api-types';\n`;
    }
    if (!indexContent.includes('form-types')) {
      indexContent += `export * from './form-types';\n`;
    }
    fs.writeFileSync(indexPath, indexContent);
  }

  spinner.succeed('TypeScript types generated');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
