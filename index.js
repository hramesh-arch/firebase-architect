#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import figlet from 'figlet';
import boxen from 'boxen';
import Table from 'cli-table3';
import gradient from 'gradient-string';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini AI
let genAI = null;

// Utility to execute commands
function executeCommand(command, options = {}) {
  try {
    return execSync(command, {
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: 'utf-8',
      ...options
    });
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return null;
  }
}

// Check prerequisites
function checkFirebaseCLI() {
  try {
    // Try local installation first
    executeCommand('npx firebase --version', { silent: true });
    return true;
  } catch {
    try {
      // Fallback to global installation
      executeCommand('firebase --version', { silent: true });
      return true;
    } catch {
      return false;
    }
  }
}

function checkFirebaseAuth() {
  try {
    const result = executeCommand('npx firebase projects:list', { silent: true });
    return result !== null;
  } catch {
    return false;
  }
}

// Display welcome banner
function displayWelcome() {
  console.clear();
  const banner = figlet.textSync('Firebase Architect', {
    font: 'Standard',
    horizontalLayout: 'default'
  });

  console.log(gradient.pastel.multiline(banner));
  console.log(chalk.cyan.bold('\n  v3.0 - AI-Powered Project Generation with Claude Code Integration\n'));
  console.log(chalk.gray('  From idea to production-ready code in minutes\n'));
}

// Main architect function
async function startArchitect() {
  displayWelcome();

  // Check prerequisites
  const spinner = ora('Checking prerequisites...').start();

  if (!checkFirebaseCLI()) {
    spinner.fail(chalk.red('Firebase CLI not installed'));
    console.log(chalk.yellow('\nPlease install Firebase CLI:'));
    console.log(chalk.white('npm install -g firebase-tools\n'));
    process.exit(1);
  }

  if (!checkFirebaseAuth()) {
    spinner.warn(chalk.yellow('Not logged into Firebase'));
    console.log(chalk.white('\nLogging you in...\n'));
    executeCommand('npx firebase login');
  }

  spinner.succeed(chalk.green('Prerequisites met'));

  // Main menu
  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'How would you like to start?',
      choices: [
        {
          name: '🤖 AI-Guided Setup (Conversational) - Recommended',
          value: 'conversational'
        },
        {
          name: '📋 Quick Setup (Template-based)',
          value: 'template'
        },
        {
          name: '✨ Custom from Prompt (Paste detailed requirements)',
          value: 'prompt'
        },
        {
          name: '🔍 Analyze Existing Project',
          value: 'analyze'
        }
      ]
    }
  ]);

  switch (mode) {
    case 'conversational':
      await conversationalMode();
      break;
    case 'template':
      await templateMode();
      break;
    case 'prompt':
      await promptMode();
      break;
    case 'analyze':
      await analyzeMode();
      break;
  }
}

// Conversational mode - AI guides the user
async function conversationalMode() {
  console.log(chalk.cyan('\n🤖 AI Architect Mode - I\'ll help you design your project\n'));

  // Get Gemini API key
  const apiKey = process.env.GEMINI_API_KEY || await getGeminiApiKey();
  if (!apiKey) {
    console.log(chalk.red('\nGemini API key required for AI mode'));
    process.exit(1);
  }

  genAI = new GoogleGenerativeAI(apiKey);

  // Start conversation
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectIdea',
      message: 'What are you building? (Describe your project in a few sentences):',
      validate: input => input.length > 10 || 'Please provide more details'
    }
  ]);

  // Analyze with Gemini
  const spinner = ora('Analyzing your requirements with AI...').start();
  const architecture = await analyzeRequirements(answers.projectIdea);
  spinner.succeed('Architecture analyzed');

  // Display architecture
  displayArchitecture(architecture);

  // Confirm
  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Proceed with this architecture?',
      default: true
    }
  ]);

  if (!proceed) {
    const { modify } = await inquirer.prompt([
      {
        type: 'input',
        name: 'modify',
        message: 'What would you like to change?'
      }
    ]);

    spinner.start('Refining architecture...');
    const refinedArchitecture = await refineArchitecture(architecture, modify);
    spinner.succeed('Architecture refined');
    displayArchitecture(refinedArchitecture);
  }

  // Get project details
  const projectDetails = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name (lowercase, hyphens):',
      validate: input => /^[a-z0-9-]+$/.test(input) || 'Lowercase and hyphens only'
    },
    {
      type: 'input',
      name: 'displayName',
      message: 'Display name:',
      default: (answers) => answers.projectName
    },
    {
      type: 'confirm',
      name: 'createFirebaseProject',
      message: 'Create new Firebase project?',
      default: true
    }
  ]);

  // Generate project
  await generateProject({
    ...architecture,
    ...projectDetails,
    mode: 'conversational'
  });
}

// Template mode - Quick setup with predefined templates
async function templateMode() {
  console.log(chalk.cyan('\n📋 Template Mode - Choose a project type\n'));

  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template:',
      choices: [
        { name: 'Single-Page Web App (React + Vite + Firebase)', value: 'spa' },
        { name: 'Full-Stack Web (React + Functions + Firestore)', value: 'fullstack-web' },
        { name: 'Monorepo Platform (Web + Mobile + Functions)', value: 'monorepo' },
        { name: 'Mobile-First (React Native + Expo + Firebase)', value: 'mobile' },
        { name: 'Healthcare Workflow (HEDIS-like)', value: 'healthcare' },
        { name: 'Document Processing (Prior Auth-like)', value: 'document' }
      ]
    }
  ]);

  const projectDetails = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: input => /^[a-z0-9-]+$/.test(input) || 'Lowercase and hyphens only'
    },
    {
      type: 'input',
      name: 'displayName',
      message: 'Display name:',
      default: (answers) => answers.projectName
    }
  ]);

  await generateFromTemplate(template, projectDetails);
}

// Prompt mode - Paste detailed requirements
async function promptMode() {
  console.log(chalk.cyan('\n✨ Custom Prompt Mode - Paste your requirements\n'));
  console.log(chalk.gray('Tip: Include details about features, user roles, data models, and integrations\n'));

  const { requirements } = await inquirer.prompt([
    {
      type: 'editor',
      name: 'requirements',
      message: 'Paste your project requirements (opens editor):'
    }
  ]);

  // Get Gemini API key
  const apiKey = process.env.GEMINI_API_KEY || await getGeminiApiKey();
  if (!apiKey) {
    console.log(chalk.red('\nGemini API key required for custom prompt mode'));
    process.exit(1);
  }

  genAI = new GoogleGenerativeAI(apiKey);

  // Analyze requirements
  const spinner = ora('Analyzing requirements with AI...').start();
  const architecture = await analyzeDetailedRequirements(requirements);
  spinner.succeed('Requirements analyzed');

  displayArchitecture(architecture);

  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Generate project with this architecture?',
      default: true
    }
  ]);

  if (proceed) {
    const projectDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        validate: input => /^[a-z0-9-]+$/.test(input) || 'Lowercase and hyphens only'
      }
    ]);

    await generateProject({
      ...architecture,
      ...projectDetails,
      mode: 'prompt',
      originalRequirements: requirements
    });
  }
}

// Analyze mode - Understand existing projects
async function analyzeMode() {
  console.log(chalk.cyan('\n🔍 Analyze Existing Project\n'));
  console.log(chalk.yellow('Feature coming soon!\n'));
  console.log(chalk.gray('This will analyze your existing Firebase project and generate:'));
  console.log(chalk.gray('- Architecture documentation'));
  console.log(chalk.gray('- Claude Code context files'));
  console.log(chalk.gray('- Security rule analysis'));
  console.log(chalk.gray('- Optimization suggestions\n'));
}

// AI Functions
async function analyzeRequirements(projectIdea) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are a senior Firebase architect. Analyze this project idea and design a complete architecture.

Project Idea: ${projectIdea}

Provide a JSON response with this structure:
{
  "projectType": "spa|fullstack-web|monorepo|mobile",
  "platforms": ["web", "mobile", "functions"],
  "description": "Brief description",
  "features": ["feature1", "feature2"],
  "userRoles": [{"role": "admin", "permissions": ["read", "write"]}],
  "dataModels": [
    {
      "name": "User",
      "fields": [{"name": "email", "type": "string", "required": true}],
      "relationships": []
    }
  ],
  "firebaseServices": ["auth", "firestore", "storage", "functions"],
  "integrations": ["stripe", "twilio"],
  "securityConsiderations": ["RBAC", "data validation"],
  "estimatedComplexity": "low|medium|high",
  "recommendedStack": {
    "web": "React + Vite + TypeScript",
    "mobile": "React Native + Expo",
    "functions": "TypeScript"
  }
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }

  throw new Error('Could not parse AI response');
}

async function analyzeDetailedRequirements(requirements) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are a senior Firebase architect. Parse these detailed requirements and extract a complete architecture.

Requirements:
${requirements}

Provide a comprehensive JSON response including:
- Project type and platforms
- All user roles with permissions
- Complete data models with fields, types, and relationships
- Required Firebase services
- External integrations
- Security rules considerations
- Firestore indexes needed
- Cloud Functions required
- Recommended tech stack

Use this JSON structure:
{
  "projectType": "string",
  "platforms": ["array"],
  "description": "string",
  "features": ["array"],
  "userRoles": [{"role": "string", "permissions": ["array"], "description": "string"}],
  "dataModels": [
    {
      "name": "string",
      "collection": "string",
      "fields": [{"name": "string", "type": "string", "required": boolean, "default": "any"}],
      "relationships": [{"model": "string", "type": "oneToMany|manyToOne", "field": "string"}],
      "indexes": [["field1", "field2"]]
    }
  ],
  "firebaseServices": ["array"],
  "cloudFunctions": [{"name": "string", "type": "http|callable|scheduled|trigger", "description": "string"}],
  "integrations": [{"name": "string", "purpose": "string"}],
  "securityRules": {"collection": "rules"},
  "estimatedComplexity": "string",
  "recommendedStack": {}
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }

  throw new Error('Could not parse AI response');
}

async function refineArchitecture(architecture, modifications) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Refine this architecture based on the user's feedback.

Current Architecture:
${JSON.stringify(architecture, null, 2)}

User Feedback:
${modifications}

Return the updated architecture as JSON with the same structure.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }

  return architecture;
}

// Display functions
function displayArchitecture(architecture) {
  console.log('\n' + chalk.cyan.bold('📐 Proposed Architecture\n'));

  // Project info
  console.log(boxen(
    chalk.white.bold(`${architecture.description || 'Custom Project'}\n\n`) +
    chalk.gray(`Type: ${architecture.projectType}\n`) +
    chalk.gray(`Complexity: ${architecture.estimatedComplexity || 'medium'}`),
    { padding: 1, borderColor: 'cyan', borderStyle: 'round' }
  ));

  // Platforms
  if (architecture.platforms && architecture.platforms.length > 0) {
    console.log(chalk.yellow('\n🚀 Platforms:'));
    architecture.platforms.forEach(platform => {
      console.log(chalk.gray(`  • ${platform}`));
    });
  }

  // Features
  if (architecture.features && architecture.features.length > 0) {
    console.log(chalk.yellow('\n✨ Features:'));
    architecture.features.forEach(feature => {
      console.log(chalk.gray(`  • ${feature}`));
    });
  }

  // User Roles
  if (architecture.userRoles && architecture.userRoles.length > 0) {
    console.log(chalk.yellow('\n👥 User Roles:'));
    const rolesTable = new Table({
      head: [chalk.cyan('Role'), chalk.cyan('Permissions')],
      colWidths: [20, 50]
    });
    architecture.userRoles.forEach(role => {
      rolesTable.push([
        role.role,
        (role.permissions || []).join(', ')
      ]);
    });
    console.log(rolesTable.toString());
  }

  // Data Models
  if (architecture.dataModels && architecture.dataModels.length > 0) {
    console.log(chalk.yellow('\n📊 Data Models:'));
    architecture.dataModels.forEach(model => {
      console.log(chalk.white(`\n  ${model.name}:`));
      if (model.fields) {
        model.fields.forEach(field => {
          const required = field.required ? chalk.red('*') : ' ';
          console.log(chalk.gray(`    ${required} ${field.name}: ${field.type}`));
        });
      }
    });
  }

  // Firebase Services
  if (architecture.firebaseServices && architecture.firebaseServices.length > 0) {
    console.log(chalk.yellow('\n🔥 Firebase Services:'));
    architecture.firebaseServices.forEach(service => {
      console.log(chalk.gray(`  • ${service}`));
    });
  }

  // Tech Stack
  if (architecture.recommendedStack) {
    console.log(chalk.yellow('\n💻 Recommended Stack:'));
    Object.entries(architecture.recommendedStack).forEach(([key, value]) => {
      console.log(chalk.gray(`  • ${key}: ${value}`));
    });
  }

  console.log('\n');
}

// Get Gemini API key
async function getGeminiApiKey() {
  console.log(chalk.yellow('\n⚠️  Gemini API key required for AI features'));
  console.log(chalk.gray('Get your key from: https://makersuite.google.com/app/apikey\n'));

  const { apiKey } = await inquirer.prompt([
    {
      type: 'password',
      name: 'apiKey',
      message: 'Gemini API Key:',
      validate: input => input.length > 0 || 'API key required'
    }
  ]);

  return apiKey;
}

// Generate project
async function generateProject(config) {
  console.log(chalk.cyan(`\n🏗️  Generating ${config.projectName}...\n`));

  const projectPath = path.join(process.cwd(), config.projectName);

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`\n❌ Directory ${config.projectName} already exists!`));
    process.exit(1);
  }

  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Import generator modules
  const { generateMonorepo } = await import('./generators/monorepo.js');
  const { generateClaudeContext } = await import('./generators/claude-context.js');
  const { generateSecurityRules } = await import('./generators/security-rules.js');
  const { generateTypes } = await import('./generators/types.js');
  const { generateDocs } = await import('./generators/docs.js');

  // Generate based on project type
  if (config.projectType === 'monorepo' || config.platforms?.length > 1) {
    await generateMonorepo(config);
  } else {
    // Single platform generation (to be implemented)
    console.log(chalk.yellow('Single platform generation coming soon'));
  }

  // Generate Claude Code context
  await generateClaudeContext(config, projectPath);

  // Generate security rules
  if (config.dataModels) {
    await generateSecurityRules(config, projectPath);
  }

  // Generate TypeScript types
  if (config.dataModels) {
    await generateTypes(config, projectPath);
  }

  // Generate documentation
  await generateDocs(config, projectPath);

  console.log(chalk.green.bold('\n✅ Project generated successfully!\n'));
  displayNextSteps(config);
}

function displayNextSteps(config) {
  const steps = [
    `cd ${config.projectName}`,
    'Review the generated architecture in ARCHITECTURE.md',
    'Check out .claude/ directory for Claude Code context',
    'Configure Firebase: Update .env files with credentials',
    'Install dependencies: npm install',
    'Start development: npm run dev'
  ];

  console.log(boxen(
    chalk.cyan.bold('Next Steps:\n\n') +
    steps.map((step, i) => chalk.white(`${i + 1}. ${step}`)).join('\n'),
    { padding: 1, borderColor: 'green', borderStyle: 'round' }
  ));

  console.log(chalk.gray('\n💡 Tip: Open this project in VS Code with Claude Code extension for guided development\n'));
}

async function generateFromTemplate(template, projectDetails) {
  console.log(chalk.cyan('\n🔄 Template-based generation coming soon!\n'));
  console.log(chalk.gray(`Template: ${template}`));
  console.log(chalk.gray(`Project: ${projectDetails.projectName}\n`));
}

// Run the architect
startArchitect().catch(console.error);
