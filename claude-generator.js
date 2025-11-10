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
 * @param {string} architecture.targetDirectory - Where to create project (optional, defaults to parent dir)
 * @param {Array} architecture.platforms - ['web', 'mobile', 'functions']
 * @param {Array} architecture.features - List of features
 * @param {Array} architecture.userRoles - [{ role, permissions, description }]
 * @param {Array} architecture.dataModels - [{ name, fields, relationships }]
 * @param {Array} architecture.firebaseServices - ['auth', 'firestore', ...]
 * @param {Array} architecture.cloudFunctions - [{ name, type, description }]
 * @param {Array} architecture.integrations - [{ name, purpose }]
 * @param {Object} architecture.recommendedStack - { web, mobile, functions }
 * @param {Object} architecture.firebase - Firebase configuration (optional)
 * @param {boolean} architecture.firebase.create - Create Firebase project (default: true)
 * @param {string} architecture.firebase.projectId - Firebase project ID (defaults to projectName)
 * @param {Object} architecture.github - GitHub configuration (optional)
 * @param {boolean} architecture.github.create - Create GitHub repo (default: true)
 * @param {string} architecture.github.visibility - 'public' or 'private' (default: 'private')
 * @param {boolean} architecture.github.createIssues - Create issues from roadmap (default: false)
 * @param {Object} architecture.vscode - VS Code configuration (optional)
 * @param {boolean} architecture.vscode.open - Open in VS Code (default: true)
 */
export async function generateProject(architecture) {
  const startTime = Date.now();

  // Default to parent directory of firebase-architect
  const baseDir = architecture.targetDirectory || path.resolve(__dirname, '..');
  const projectPath = path.join(baseDir, architecture.projectName);

  // Ensure project doesn't exist
  if (fs.existsSync(projectPath)) {
    throw new Error(`Directory ${architecture.projectName} already exists!`);
  }

  console.log(`\n🏗️  Setting up ${architecture.projectName}...\n`);

  // Create project directory
  fs.mkdirSync(projectPath, { recursive: true });

  // Import all generator modules
  const { generateMonorepo } = await import('./generators/monorepo.js');
  const { generateClaudeContext } = await import('./generators/claude-context.js');
  const { generateSecurityRules } = await import('./generators/security-rules.js');
  const { generateTypes } = await import('./generators/types.js');
  const { generateDocs } = await import('./generators/docs.js');
  const { generateDevelopmentRoadmap } = await import('./generators/roadmap.js');
  const { setupFirebaseProject } = await import('./generators/firebase-setup.js');
  const { installDependencies, deployFirebaseResources } = await import('./generators/deployment.js');
  const { initializeGit, promptGitHubSetup, createGitHubRepository, pushToRemote, createGitHubIssuesFromRoadmap } = await import('./generators/git-setup.js');
  const { openInVSCode, displayNextSteps, displaySetupSummary } = await import('./generators/vscode-setup.js');

  const stats = {
    filesCreated: 0,
    dependenciesInstalled: null,
    firebaseProject: null,
    githubRepo: null,
    roadmapTasks: null
  };

  // Change to project directory for all operations
  const originalDir = process.cwd();
  process.chdir(projectPath);

  try {
    // PHASE 1: Generate Project Structure
    console.log('📁 Phase 1: Generating project structure...\n');

    await generateMonorepo(architecture);
    await generateClaudeContext(architecture, projectPath);

    if (architecture.dataModels) {
      await generateSecurityRules(architecture, projectPath);
      await generateTypes(architecture, projectPath);
    }

    await generateDocs(architecture, projectPath);
    await generateDevelopmentRoadmap(architecture, projectPath);

    console.log('✅ Project structure created\n');

    // PHASE 2: Firebase Setup
    if (architecture.firebase?.create !== false) {
      console.log('🔥 Phase 2: Setting up Firebase...\n');

      const config = {
        projectName: architecture.firebase?.projectId || architecture.projectName,
        displayName: architecture.displayName,
        dataModels: architecture.dataModels,
        platforms: architecture.platforms,
        firebaseServices: architecture.firebaseServices,
        cloudFunctions: architecture.cloudFunctions
      };

      try {
        const firebaseInfo = await setupFirebaseProject(config);
        stats.firebaseProject = firebaseInfo.projectId;
        console.log('✅ Firebase project configured\n');
      } catch (error) {
        console.log('⚠️  Firebase setup had issues (continuing...)\n');
      }
    }

    // PHASE 3: Install Dependencies
    console.log('📦 Phase 3: Installing dependencies...\n');

    try {
      const installed = await installDependencies(projectPath);
      if (installed) {
        stats.dependenciesInstalled = 'Complete';
        console.log('✅ Dependencies installed\n');
      }
    } catch (error) {
      console.log('⚠️  Dependency installation had issues (you can run npm install manually)\n');
    }

    // PHASE 4: Deploy Firebase Resources
    if (architecture.firebase?.create !== false && architecture.dataModels) {
      console.log('🚀 Phase 4: Deploying Firebase resources...\n');

      try {
        await deployFirebaseResources(projectPath, architecture);
        console.log('✅ Firebase rules and indexes deployed\n');
      } catch (error) {
        console.log('⚠️  Firebase deployment had issues (you can deploy manually)\n');
      }
    }

    // PHASE 5: Git & GitHub Setup
    console.log('📦 Phase 5: Setting up version control...\n');

    const gitInitialized = await initializeGit(projectPath, architecture);

    let githubInfo = null;
    if (architecture.github?.create !== false) {
      const githubOptions = architecture.github?.visibility ? {
        visibility: architecture.github.visibility,
        description: `${architecture.displayName} - Firebase Project`,
        useGhCLI: true
      } : await promptGitHubSetup();

      if (githubOptions) {
        githubInfo = await createGitHubRepository(projectPath, architecture.projectName, githubOptions);

        if (githubInfo) {
          stats.githubRepo = githubInfo.url;

          // Optionally push to remote
          if (architecture.github?.push !== false) {
            await pushToRemote(projectPath);
          }

          // Optionally create issues from roadmap
          if (architecture.github?.createIssues) {
            const roadmapPath = path.join(projectPath, '.claude', 'ROADMAP.md');
            await createGitHubIssuesFromRoadmap(projectPath, roadmapPath);
          }
        }
      }
    }

    console.log('✅ Version control configured\n');

    // PHASE 6: Final Summary & VS Code
    const setupTime = `${Math.round((Date.now() - startTime) / 1000)}s`;
    stats.setupTime = setupTime;

    displaySetupSummary(stats);
    displayNextSteps(projectPath, architecture.projectName, architecture);

    // Open in VS Code
    if (architecture.vscode?.open !== false) {
      await openInVSCode(projectPath);
    }

    // Return to original directory
    process.chdir(originalDir);

    return {
      projectPath,
      stats,
      handoffPrompt: path.join(projectPath, '.claude', 'HANDOFF_PROMPT.md'),
      roadmap: path.join(projectPath, '.claude', 'ROADMAP.md')
    };

  } catch (error) {
    // Return to original directory on error
    process.chdir(originalDir);
    throw error;
  }
}

// Export for use by Claude Code
export default generateProject;
