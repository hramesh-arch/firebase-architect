#!/usr/bin/env node

/**
 * Firebase Architect - Claude Code Native Version
 *
 * This version is designed to be invoked BY Claude Code, not as a standalone CLI.
 * Claude Code handles all the AI analysis, so we just need the code generation logic.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Main generator function
 * Called by Claude Code with architecture already analyzed
 *
 * @param {Object} architecture - Architecture designed by Claude Code
 * @param {string} architecture.projectName - Project name
 * @param {string} architecture.displayName - Display name
 * @param {string} architecture.description - Project description
 * @param {string} architecture.projectType - spa|fullstack-web|monorepo|mobile
 * @param {string} architecture.targetDirectory - Where to create project (optional, defaults to /Builds)
 * @param {Array} architecture.platforms - ['web', 'mobile', 'functions']
 * @param {Array} architecture.features - List of features
 * @param {Array} architecture.userRoles - [{ role, permissions, description }]
 * @param {Array} architecture.dataModels - [{ name, fields, relationships }]
 * @param {Array} architecture.firebaseServices - ['auth', 'firestore', ...]
 * @param {Array} architecture.cloudFunctions - [{ name, type, description }]
 * @param {Array} architecture.integrations - [{ name, purpose }]
 * @param {Object} architecture.recommendedStack - { web, mobile, functions }
 * @param {Object} architecture.git - Git configuration (optional)
 * @param {boolean} architecture.git.init - Initialize git repo
 * @param {boolean} architecture.git.initialCommit - Create initial commit
 * @param {string} architecture.git.remote - Remote repository URL
 * @param {boolean} architecture.git.push - Push to remote after commit
 */
export async function generateProject(architecture) {
  // Default to /Users/harshithramesh/Builds if not specified
  const baseDir = architecture.targetDirectory || '/Users/harshithramesh/Builds';
  const projectPath = path.join(baseDir, architecture.projectName);

  // Ensure project doesn't exist
  if (fs.existsSync(projectPath)) {
    throw new Error(`Directory ${architecture.projectName} already exists!`);
  }

  console.log(`\n🏗️  Generating ${architecture.projectName}...\n`);

  // Create project directory
  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Import generator modules
  const { generateMonorepo } = await import('./generators/monorepo.js');
  const { generateClaudeContext } = await import('./generators/claude-context.js');
  const { generateSecurityRules } = await import('./generators/security-rules.js');
  const { generateTypes } = await import('./generators/types.js');
  const { generateDocs } = await import('./generators/docs.js');
  const { generateDevelopmentRoadmap } = await import('./generators/roadmap.js');

  // Generate based on project type
  if (architecture.projectType === 'monorepo' || architecture.platforms?.length > 1) {
    await generateMonorepo(architecture);
  } else {
    // For single platform, still use monorepo structure but skip unnecessary apps
    await generateMonorepo(architecture);
  }

  // Generate Claude Code context
  await generateClaudeContext(architecture, projectPath);

  // Generate security rules
  if (architecture.dataModels) {
    await generateSecurityRules(architecture, projectPath);
  }

  // Generate TypeScript types
  if (architecture.dataModels) {
    await generateTypes(architecture, projectPath);
  }

  // Generate documentation
  await generateDocs(architecture, projectPath);

  // Generate development roadmap
  await generateDevelopmentRoadmap(architecture, projectPath);

  // Git initialization (if requested)
  if (architecture.git?.init !== false) {
    console.log('\n📦 Initializing git repository...\n');

    try {
      // Initialize git
      execSync('git init', { cwd: projectPath, stdio: 'ignore' });

      // Create .gitignore (already created by docs generator)

      // Initial commit
      if (architecture.git?.initialCommit !== false) {
        execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
        execSync(
          'git commit -m "Initial commit: Firebase Architect generated project\n\n🤖 Generated with Firebase Architect\n\nProject: ' +
            architecture.displayName +
            '\nType: ' +
            architecture.projectType +
            '\nPlatforms: ' +
            (architecture.platforms?.join(', ') || 'web') +
            '"',
          { cwd: projectPath, stdio: 'ignore' }
        );
        console.log('✅ Initial commit created\n');
      }

      // Add remote (if provided)
      if (architecture.git?.remote) {
        execSync(`git remote add origin ${architecture.git.remote}`, {
          cwd: projectPath,
          stdio: 'ignore'
        });
        console.log(`✅ Remote added: ${architecture.git.remote}\n`);

        // Push to remote (if requested)
        if (architecture.git?.push) {
          execSync('git branch -M main', { cwd: projectPath, stdio: 'ignore' });
          execSync('git push -u origin main', { cwd: projectPath, stdio: 'ignore' });
          console.log('✅ Pushed to remote\n');
        }
      }
    } catch (error) {
      console.log('⚠️  Git initialization had issues (this is optional, continuing...)\n');
    }
  }

  console.log('\n✅ Project generated successfully!\n');

  return {
    projectPath,
    nextSteps: [
      `cd ${architecture.projectName}`,
      'Review ARCHITECTURE.md for system design',
      'Check .claude/ directory for development guides',
      'Configure Firebase credentials in .env files',
      'Run: npm install',
      'Start development: npm run dev:web',
      ...(architecture.git?.remote && !architecture.git?.push
        ? ['Push to remote: git push -u origin main']
        : [])
    ]
  };
}

// Export for use by Claude Code
export default generateProject;
