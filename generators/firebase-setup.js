import { execSync } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';

/**
 * Creates a Firebase project and enables required services
 * Does NOT set up authentication - user can do that later if needed
 */
export async function setupFirebaseProject(config) {
  const spinner = ora('Setting up Firebase project...').start();

  try {
    // Check if project already exists
    const existingProjects = getFirebaseProjects();
    if (existingProjects.includes(config.projectName)) {
      spinner.info(chalk.yellow(`Firebase project '${config.projectName}' already exists`));

      const { useExisting } = await inquirer.prompt([{
        type: 'confirm',
        name: 'useExisting',
        message: 'Use existing Firebase project?',
        default: true
      }]);

      if (!useExisting) {
        throw new Error('Project name already taken. Please choose a different name.');
      }
    } else {
      // Create new Firebase project
      spinner.text = 'Creating Firebase project...';
      await createFirebaseProject(config.projectName, config.displayName || config.projectName);
      spinner.succeed(chalk.green(`Firebase project '${config.projectName}' created`));
    }

    // Add Firebase to the project directory
    spinner.start('Initializing Firebase in project...');
    initializeFirebaseInProject(config.projectName);
    spinner.succeed('Firebase initialized');

    // Enable required services (but NOT authentication)
    const services = determineRequiredServices(config);
    if (services.length > 0) {
      spinner.start('Enabling Firebase services...');
      await enableFirebaseServices(config.projectName, services);
      spinner.succeed(`Enabled: ${services.join(', ')}`);
    }

    return {
      projectId: config.projectName,
      consoleUrl: `https://console.firebase.google.com/project/${config.projectName}`
    };

  } catch (error) {
    spinner.fail('Firebase setup failed');
    throw error;
  }
}

/**
 * Get list of existing Firebase projects
 */
function getFirebaseProjects() {
  try {
    const result = execSync('npx firebase projects:list --json', {
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    const data = JSON.parse(result);
    return data.result?.map(p => p.projectId) || [];
  } catch (error) {
    // If command fails, return empty array (user might not have any projects)
    return [];
  }
}

/**
 * Create a new Firebase project using Firebase CLI
 */
async function createFirebaseProject(projectId, displayName) {
  try {
    // Firebase CLI doesn't directly support project creation via command line
    // We'll use firebase-tools API or guide user through manual creation

    console.log(chalk.yellow('\n⚠️  Firebase project creation requires manual step:'));
    console.log(chalk.white('\n1. Creating project placeholder...'));

    // Note: firebase projects:create is not available in all CLI versions
    // Alternative: Use Google Cloud SDK or guide user
    try {
      execSync(`npx firebase projects:create ${projectId} --display-name "${displayName}"`, {
        stdio: 'inherit'
      });
    } catch (error) {
      // If direct creation fails, provide instructions
      console.log(chalk.cyan('\n📋 Manual Setup Required:\n'));
      console.log(chalk.white('   1. Go to: https://console.firebase.google.com'));
      console.log(chalk.white('   2. Click "Add project"'));
      console.log(chalk.white(`   3. Enter project ID: ${chalk.bold(projectId)}`));
      console.log(chalk.white(`   4. Enter display name: ${chalk.bold(displayName)}`));
      console.log(chalk.white('   5. Follow the prompts (disable Analytics if you want)\n'));

      // Use inquirer for cross-platform compatibility
      const { created } = await inquirer.prompt([{
        type: 'confirm',
        name: 'created',
        message: 'Have you created the Firebase project?',
        default: false
      }]);

      if (!created) {
        throw new Error('Firebase project creation cancelled by user');
      }
    }
  } catch (error) {
    throw new Error(`Failed to create Firebase project: ${error.message}`);
  }
}

/**
 * Initialize Firebase in the project directory
 */
function initializeFirebaseInProject(projectId) {
  // Set the Firebase project as default
  execSync(`npx firebase use ${projectId}`, {
    stdio: 'pipe'
  });
}

/**
 * Determine which Firebase services to enable based on architecture
 */
function determineRequiredServices(config) {
  const services = [];

  // Firestore (always included for data storage)
  if (config.dataModels && config.dataModels.length > 0) {
    services.push('Firestore');
  }

  // Cloud Functions (if functions platform is included)
  if (config.platforms?.includes('functions') || config.cloudFunctions?.length > 0) {
    services.push('Cloud Functions');
  }

  // Cloud Storage (if mentioned in services)
  if (config.firebaseServices?.includes('storage')) {
    services.push('Cloud Storage');
  }

  // Hosting (if web platform is included)
  if (config.platforms?.includes('web')) {
    services.push('Hosting');
  }

  return services;
}

/**
 * Enable Firebase services for the project
 * Note: Some services are auto-enabled, but we'll initialize them in the project
 */
async function enableFirebaseServices(projectId, services) {
  const spinner = ora();

  for (const service of services) {
    try {
      spinner.start(`Enabling ${service}...`);

      switch (service) {
        case 'Firestore':
          // Firestore will be initialized when we deploy rules
          spinner.succeed(`${service} ready (will be initialized on first deploy)`);
          break;

        case 'Cloud Functions':
          // Functions are initialized via the generated code
          spinner.succeed(`${service} ready (deploy with: firebase deploy --only functions)`);
          break;

        case 'Cloud Storage':
          // Storage will be initialized when we deploy rules
          spinner.succeed(`${service} ready (will be initialized on first deploy)`);
          break;

        case 'Hosting':
          // Hosting is configured via firebase.json
          spinner.succeed(`${service} ready (deploy with: firebase deploy --only hosting)`);
          break;

        default:
          spinner.info(`${service} - manual configuration may be required`);
      }
    } catch (error) {
      spinner.warn(`${service} - enable manually in Firebase Console`);
    }
  }
}

/**
 * Display Firebase setup summary
 */
export function displayFirebaseSummary(firebaseInfo) {
  console.log(chalk.cyan('\n🔥 Firebase Project:'));
  console.log(chalk.white(`   Project ID: ${chalk.bold(firebaseInfo.projectId)}`));
  console.log(chalk.white(`   Console: ${chalk.underline(firebaseInfo.consoleUrl)}`));
  console.log(chalk.gray('\n   Note: Authentication is NOT configured. Set up in Firebase Console if needed.\n'));
}
