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

    return { url: repoUrl };

  } catch (error) {
    spinner.fail('Failed to create GitHub repository');
    console.log(chalk.yellow('⚠️  You can create the repository manually and add it as a remote\n'));
    return null;
  }
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
