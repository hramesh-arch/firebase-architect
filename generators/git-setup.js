import { execSync } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';

/**
 * Initialize Git repository
 */
export async function initializeGit(projectPath, config) {
  const spinner = ora('Initializing Git repository...').start();

  try {
    // Initialize git
    execSync('git init', {
      cwd: projectPath,
      stdio: 'pipe'
    });

    // Create initial commit
    execSync('git add .', {
      cwd: projectPath,
      stdio: 'pipe'
    });

    const commitMessage = `Initial commit: ${config.displayName || config.projectName}

🤖 Generated with Firebase Architect v3.0

Project: ${config.displayName || config.projectName}
Type: ${config.projectType}
Platforms: ${config.platforms?.join(', ') || 'web'}
Generated: ${new Date().toISOString()}`;

    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, {
      cwd: projectPath,
      stdio: 'pipe'
    });

    spinner.succeed('Git repository initialized with initial commit');
    return true;

  } catch (error) {
    spinner.fail('Git initialization failed');
    console.log(chalk.yellow('⚠️  You can initialize git manually later with: git init\n'));
    return false;
  }
}

/**
 * Prompt user for GitHub repository creation
 */
export async function promptGitHubSetup() {
  const { createGitHub } = await inquirer.prompt([{
    type: 'confirm',
    name: 'createGitHub',
    message: 'Create GitHub repository?',
    default: false
  }]);

  if (!createGitHub) {
    return null;
  }

  // Check if gh CLI is available
  if (!isGitHubCLIAvailable()) {
    console.log(chalk.yellow('\n⚠️  GitHub CLI (gh) not found.'));
    console.log(chalk.gray('   Install: https://cli.github.com/\n'));

    const { addRemoteManually } = await inquirer.prompt([{
      type: 'confirm',
      name: 'addRemoteManually',
      message: 'Add remote repository URL manually?',
      default: false
    }]);

    if (addRemoteManually) {
      const { repoUrl } = await inquirer.prompt([{
        type: 'input',
        name: 'repoUrl',
        message: 'Repository URL (e.g., https://github.com/user/repo.git):',
        validate: (input) => {
          if (!input) return 'Repository URL is required';
          if (!input.includes('github.com') && !input.includes('git@')) {
            return 'Please enter a valid GitHub repository URL';
          }
          return true;
        }
      }]);

      return { url: repoUrl, manual: true };
    }

    return null;
  }

  // Use GitHub CLI to create repo
  const { repoVisibility, repoDescription } = await inquirer.prompt([
    {
      type: 'list',
      name: 'repoVisibility',
      message: 'Repository visibility:',
      choices: [
        { name: 'Public', value: 'public' },
        { name: 'Private', value: 'private' }
      ],
      default: 'private'
    },
    {
      type: 'input',
      name: 'repoDescription',
      message: 'Repository description (optional):',
      default: 'Generated with Firebase Architect'
    }
  ]);

  return {
    visibility: repoVisibility,
    description: repoDescription,
    useGhCLI: true
  };
}

/**
 * Create GitHub repository using gh CLI
 */
export async function createGitHubRepository(projectPath, projectName, options) {
  if (!options) return null;

  // Manual remote URL
  if (options.manual) {
    const spinner = ora('Adding remote repository...').start();
    try {
      execSync(`git remote add origin ${options.url}`, {
        cwd: projectPath,
        stdio: 'pipe'
      });
      spinner.succeed(`Remote added: ${options.url}`);
      return { url: options.url };
    } catch (error) {
      spinner.fail('Failed to add remote');
      return null;
    }
  }

  // Create using gh CLI
  const spinner = ora('Creating GitHub repository...').start();

  try {
    const visibility = options.visibility === 'public' ? '--public' : '--private';
    const description = options.description ? `--description "${options.description}"` : '';

    const result = execSync(
      `gh repo create ${projectName} ${visibility} ${description} --source=. --remote=origin`,
      {
        cwd: projectPath,
        encoding: 'utf-8',
        stdio: 'pipe'
      }
    );

    // Get the repo URL
    const repoUrl = execSync('gh repo view --json url --jq .url', {
      cwd: projectPath,
      encoding: 'utf-8',
      stdio: 'pipe'
    }).trim();

    spinner.succeed(`GitHub repository created: ${repoUrl}`);

    // Set up GitHub repository features
    await setupGitHubFeatures(projectPath);

    return { url: repoUrl };

  } catch (error) {
    spinner.fail('Failed to create GitHub repository');
    console.log(chalk.yellow('⚠️  You can create the repository manually and add it as a remote\n'));
    return null;
  }
}

/**
 * Set up GitHub repository features (labels, issues, etc.)
 */
async function setupGitHubFeatures(projectPath) {
  const spinner = ora();

  try {
    // Create custom labels for development phases
    spinner.start('Creating GitHub labels...');

    const labels = [
      { name: '🏗️ setup', color: '0E8A16', description: 'Environment and project setup' },
      { name: '🔐 auth', color: 'FFA500', description: 'Authentication and authorization' },
      { name: '💾 database', color: '1D76DB', description: 'Database and data models' },
      { name: '⚡ functions', color: 'FBCA04', description: 'Cloud Functions' },
      { name: '🎨 ui', color: 'E99695', description: 'User interface' },
      { name: '📱 mobile', color: 'C5DEF5', description: 'Mobile app' },
      { name: '🧪 testing', color: 'BFD4F2', description: 'Tests and QA' },
      { name: '🚀 deployment', color: '5319E7', description: 'Deployment and DevOps' },
      { name: '📚 docs', color: '0075CA', description: 'Documentation' },
      { name: '🐛 bug', color: 'D73A4A', description: 'Something is not working' },
      { name: '✨ enhancement', color: 'A2EEEF', description: 'New feature or request' }
    ];

    for (const label of labels) {
      try {
        execSync(
          `gh label create "${label.name}" --color ${label.color} --description "${label.description}" --force`,
          {
            cwd: projectPath,
            stdio: 'pipe'
          }
        );
      } catch (error) {
        // Label might already exist, continue
      }
    }

    spinner.succeed('GitHub labels created');

    // Enable features
    try {
      spinner.start('Configuring repository settings...');

      // Enable issues, wiki, and projects
      execSync('gh repo edit --enable-issues --enable-wiki --enable-projects', {
        cwd: projectPath,
        stdio: 'pipe'
      });

      spinner.succeed('Repository features enabled');
    } catch (error) {
      spinner.warn('Could not configure all repository settings');
    }

  } catch (error) {
    spinner.warn('Could not set up all GitHub features - you can configure manually');
  }
}

/**
 * Optionally create GitHub Issues from roadmap
 */
export async function createGitHubIssuesFromRoadmap(projectPath, roadmapPath) {
  if (!isGitHubCLIAvailable()) {
    return false;
  }

  const { createIssues } = await inquirer.prompt([{
    type: 'confirm',
    name: 'createIssues',
    message: 'Create GitHub Issues from roadmap tasks?',
    default: false
  }]);

  if (!createIssues) {
    return false;
  }

  const spinner = ora('Creating GitHub Issues...').start();

  try {
    // Read roadmap and extract tasks
    const roadmapContent = fs.readFileSync(roadmapPath, 'utf-8');
    const tasks = extractTasksFromRoadmap(roadmapContent);

    let created = 0;
    for (const task of tasks) {
      try {
        execSync(
          `gh issue create --title "${task.title}" --body "${task.body}" --label "${task.labels.join(',')}"`,
          {
            cwd: projectPath,
            stdio: 'pipe'
          }
        );
        created++;
      } catch (error) {
        // Continue on error
      }
    }

    spinner.succeed(`Created ${created} GitHub Issues from roadmap`);
    return true;

  } catch (error) {
    spinner.warn('Could not create issues from roadmap');
    return false;
  }
}

/**
 * Extract tasks from roadmap markdown
 */
function extractTasksFromRoadmap(roadmapContent) {
  const tasks = [];
  const phases = roadmapContent.split(/## Phase \d+:/);

  for (const phase of phases) {
    if (!phase.trim()) continue;

    const phaseTitle = phase.split('\n')[0].trim();
    const checkboxes = phase.match(/- \[ \] (.+)/g) || [];

    for (const checkbox of checkboxes) {
      const taskTitle = checkbox.replace('- [ ] ', '').trim();
      const labels = determineLabelsForTask(taskTitle);

      tasks.push({
        title: taskTitle,
        body: `Part of: ${phaseTitle}\n\nSee ROADMAP.md for complete context.`,
        labels
      });
    }
  }

  return tasks;
}

/**
 * Determine labels for a task based on its title
 */
function determineLabelsForTask(taskTitle) {
  const labels = [];
  const lower = taskTitle.toLowerCase();

  if (lower.includes('auth') || lower.includes('login') || lower.includes('sign')) {
    labels.push('🔐 auth');
  }
  if (lower.includes('database') || lower.includes('firestore') || lower.includes('data model')) {
    labels.push('💾 database');
  }
  if (lower.includes('function') || lower.includes('api') || lower.includes('endpoint')) {
    labels.push('⚡ functions');
  }
  if (lower.includes('ui') || lower.includes('component') || lower.includes('screen') || lower.includes('page')) {
    labels.push('🎨 ui');
  }
  if (lower.includes('mobile') || lower.includes('react native') || lower.includes('expo')) {
    labels.push('📱 mobile');
  }
  if (lower.includes('test') || lower.includes('spec')) {
    labels.push('🧪 testing');
  }
  if (lower.includes('deploy') || lower.includes('ci/cd')) {
    labels.push('🚀 deployment');
  }
  if (lower.includes('doc') || lower.includes('readme')) {
    labels.push('📚 docs');
  }

  // Default to enhancement if no specific labels
  if (labels.length === 0) {
    labels.push('✨ enhancement');
  }

  return labels;
}

/**
 * Push to remote repository
 */
export async function pushToRemote(projectPath) {
  const { pushNow } = await inquirer.prompt([{
    type: 'confirm',
    name: 'pushNow',
    message: 'Push to remote repository now?',
    default: true
  }]);

  if (!pushNow) {
    console.log(chalk.gray('   You can push later with: git push -u origin main\n'));
    return false;
  }

  const spinner = ora('Pushing to remote...').start();

  try {
    // Ensure we're on main branch
    execSync('git branch -M main', {
      cwd: projectPath,
      stdio: 'pipe'
    });

    // Push to remote
    execSync('git push -u origin main', {
      cwd: projectPath,
      stdio: 'pipe',
      timeout: 60000 // 1 minute timeout
    });

    spinner.succeed('Pushed to remote repository');
    return true;

  } catch (error) {
    spinner.fail('Push failed');
    console.log(chalk.yellow('⚠️  You can push manually later with: git push -u origin main\n'));
    return false;
  }
}

/**
 * Check if GitHub CLI is available
 */
function isGitHubCLIAvailable() {
  try {
    execSync('gh --version', { stdio: 'pipe' });
    // Check if authenticated
    execSync('gh auth status', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Display Git setup summary
 */
export function displayGitSummary(gitInfo) {
  if (!gitInfo) return;

  console.log(chalk.cyan('\n📦 Git Repository:\n'));

  if (gitInfo.initialized) {
    console.log(chalk.green('   ✅ Git initialized with initial commit'));
  }

  if (gitInfo.repoUrl) {
    console.log(chalk.green(`   ✅ GitHub: ${chalk.underline(gitInfo.repoUrl)}`));
  }

  if (gitInfo.pushed) {
    console.log(chalk.green('   ✅ Pushed to remote'));
  }

  console.log();
}
