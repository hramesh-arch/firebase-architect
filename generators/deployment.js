import { execSync } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs';

/**
 * Deploy Firebase resources (rules and indexes)
 * This gets your Firebase project ready for development
 */
export async function deployFirebaseResources(projectPath, config) {
  console.log(chalk.cyan('\n📦 Deploying Firebase Resources...\n'));

  const results = {
    firestoreRules: false,
    firestoreIndexes: false,
    storageRules: false
  };

  // Deploy Firestore Rules
  if (fs.existsSync('firestore.rules')) {
    const spinner = ora('Deploying Firestore security rules...').start();
    try {
      execSync('npx firebase deploy --only firestore:rules', {
        cwd: projectPath,
        stdio: 'pipe',
        timeout: 60000 // 1 minute timeout
      });
      spinner.succeed('Firestore rules deployed');
      results.firestoreRules = true;
    } catch (error) {
      spinner.warn('Firestore rules deployment skipped (deploy manually later)');
      console.log(chalk.gray(`   Run: firebase deploy --only firestore:rules\n`));
    }
  }

  // Deploy Firestore Indexes
  if (fs.existsSync('firestore.indexes.json')) {
    const spinner = ora('Deploying Firestore indexes...').start();
    try {
      execSync('npx firebase deploy --only firestore:indexes', {
        cwd: projectPath,
        stdio: 'pipe',
        timeout: 60000
      });
      spinner.succeed('Firestore indexes deployed');
      results.firestoreIndexes = true;
    } catch (error) {
      spinner.warn('Firestore indexes deployment skipped (deploy manually later)');
      console.log(chalk.gray(`   Run: firebase deploy --only firestore:indexes\n`));
    }
  }

  // Deploy Storage Rules
  if (fs.existsSync('storage.rules')) {
    const spinner = ora('Deploying Storage security rules...').start();
    try {
      execSync('npx firebase deploy --only storage', {
        cwd: projectPath,
        stdio: 'pipe',
        timeout: 60000
      });
      spinner.succeed('Storage rules deployed');
      results.storageRules = true;
    } catch (error) {
      spinner.warn('Storage rules deployment skipped (deploy manually later)');
      console.log(chalk.gray(`   Run: firebase deploy --only storage\n`));
    }
  }

  return results;
}

/**
 * Install dependencies with retry logic
 */
export async function installDependencies(projectPath) {
  const spinner = ora('Installing dependencies...').start();

  const maxAttempts = 3;
  let attempt = 1;

  while (attempt <= maxAttempts) {
    try {
      spinner.text = `Installing dependencies (attempt ${attempt}/${maxAttempts})...`;

      execSync('npm install', {
        cwd: projectPath,
        stdio: 'pipe',
        timeout: 300000, // 5 minutes
        encoding: 'utf-8'
      });

      spinner.succeed(chalk.green('Dependencies installed'));
      return true;

    } catch (error) {
      if (attempt < maxAttempts) {
        spinner.text = `Install failed, retrying in ${2 * attempt} seconds...`;
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
        attempt++;
      } else {
        spinner.fail('Dependency installation failed after 3 attempts');
        console.log(chalk.yellow('\n⚠️  You may need to install dependencies manually:'));
        console.log(chalk.white(`   cd ${projectPath}`));
        console.log(chalk.white(`   npm install\n`));
        return false;
      }
    }
  }

  return false;
}

/**
 * Verify Firebase CLI is available and user is authenticated
 */
export function verifyFirebaseCLI() {
  try {
    // Check Firebase CLI exists
    execSync('npx firebase --version', { stdio: 'pipe' });

    // Check if logged in
    const projects = execSync('npx firebase projects:list', {
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Display deployment summary
 */
export function displayDeploymentSummary(results) {
  console.log(chalk.cyan('\n📊 Deployment Summary:\n'));

  const deployed = [];
  const pending = [];

  if (results.firestoreRules) {
    deployed.push('Firestore Rules');
  } else {
    pending.push('Firestore Rules');
  }

  if (results.firestoreIndexes) {
    deployed.push('Firestore Indexes');
  } else {
    pending.push('Firestore Indexes');
  }

  if (results.storageRules) {
    deployed.push('Storage Rules');
  } else {
    pending.push('Storage Rules');
  }

  if (deployed.length > 0) {
    console.log(chalk.green('   ✅ Deployed:'));
    deployed.forEach(item => console.log(chalk.white(`      • ${item}`)));
  }

  if (pending.length > 0) {
    console.log(chalk.yellow('\n   ⏳ Pending (deploy manually later):'));
    pending.forEach(item => console.log(chalk.gray(`      • ${item}`)));
  }

  console.log();
}
