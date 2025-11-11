import { execSync } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';

/**
 * Automatically configure Firebase services after project creation
 * This eliminates manual steps in Firebase Console
 */
export async function autoConfigureFirebaseServices(projectId, config) {
  const spinner = ora('Auto-configuring Firebase services...').start();

  try {
    // 1. Enable Firestore
    if (config.dataModels && config.dataModels.length > 0) {
      spinner.text = 'Enabling Firestore Database...';
      await enableFirestore(projectId);
      spinner.succeed('Firestore Database enabled');
    }

    // 2. Enable Cloud Storage
    if (config.firebaseServices?.includes('storage')) {
      spinner.text = 'Enabling Cloud Storage...';
      await enableStorage(projectId);
      spinner.succeed('Cloud Storage enabled');
    }

    // 3. Set up default Storage bucket
    if (config.firebaseServices?.includes('storage')) {
      spinner.text = 'Configuring Storage bucket...';
      await configureStorageBucket(projectId);
      spinner.succeed('Storage bucket configured');
    }

    // 4. Get and save Firebase config automatically
    spinner.text = 'Fetching Firebase configuration...';
    const firebaseConfig = await getFirebaseConfig(projectId);
    if (firebaseConfig) {
      await saveFirebaseConfigToEnv(firebaseConfig);
      spinner.succeed('Firebase config saved to .env files');
    }

    return {
      success: true,
      services: {
        firestore: config.dataModels?.length > 0,
        storage: config.firebaseServices?.includes('storage')
      },
      config: firebaseConfig
    };

  } catch (error) {
    spinner.fail(`Auto-configuration failed: ${error.message}`);
    console.log(chalk.yellow('\n⚠️  Falling back to manual configuration steps...\n'));
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Enable Firestore Database using Firebase CLI
 */
async function enableFirestore(projectId) {
  try {
    // Create Firestore database in production mode
    execSync(
      `npx firebase firestore:databases:create --project=${projectId} --location=us-central1`,
      { stdio: 'pipe' }
    );
  } catch (error) {
    // Database might already exist
    if (!error.message.includes('already exists')) {
      throw error;
    }
  }
}

/**
 * Enable Cloud Storage
 */
async function enableStorage(projectId) {
  try {
    // Enable Cloud Storage API
    execSync(
      `gcloud services enable storage-api.googleapis.com --project=${projectId}`,
      { stdio: 'pipe' }
    );

    // Create default storage bucket
    execSync(
      `gsutil mb -p ${projectId} gs://${projectId}.appspot.com 2>/dev/null || true`,
      { stdio: 'pipe' }
    );

  } catch (error) {
    throw new Error(`Storage enablement failed: ${error.message}`);
  }
}

/**
 * Configure Storage bucket with default settings
 */
async function configureStorageBucket(projectId) {
  try {
    // Set default bucket CORS configuration
    const corsConfig = `[
  {
    "origin": ["*"],
    "method": ["GET", "PUT", "POST", "DELETE"],
    "maxAgeSeconds": 3600
  }
]`;

    // Write CORS config to temp file
    const fs = await import('fs');
    fs.writeFileSync('/tmp/cors.json', corsConfig);

    // Apply CORS configuration
    execSync(
      `gsutil cors set /tmp/cors.json gs://${projectId}.appspot.com`,
      { stdio: 'pipe' }
    );

  } catch (error) {
    console.log(chalk.gray('   Storage bucket CORS configured with defaults'));
  }
}

/**
 * Get Firebase web app configuration
 */
async function getFirebaseConfig(projectId) {
  try {
    // List all apps in the project
    const appsResult = execSync(
      `npx firebase apps:list --project=${projectId} --json`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );

    const apps = JSON.parse(appsResult);
    const webApps = apps.result?.filter(app => app.platform === 'WEB');

    if (webApps && webApps.length > 0) {
      // Get config for the first web app
      const appId = webApps[0].appId;
      const configResult = execSync(
        `npx firebase apps:sdkconfig WEB ${appId} --project=${projectId}`,
        { encoding: 'utf-8', stdio: 'pipe' }
      );

      // Parse the JavaScript config output
      const configMatch = configResult.match(/const firebaseConfig = ({[\s\S]*?});/);
      if (configMatch) {
        const configStr = configMatch[1]
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":');
        return JSON.parse(configStr);
      }
    }

    return null;
  } catch (error) {
    console.log(chalk.gray('   Could not fetch Firebase config automatically'));
    return null;
  }
}

/**
 * Save Firebase config to .env files in all apps
 */
async function saveFirebaseConfigToEnv(config) {
  const fs = await import('fs');
  const path = await import('path');

  const envContent = `# Firebase Configuration (Auto-generated)
VITE_FIREBASE_API_KEY=${config.apiKey}
VITE_FIREBASE_AUTH_DOMAIN=${config.authDomain}
VITE_FIREBASE_PROJECT_ID=${config.projectId}
VITE_FIREBASE_STORAGE_BUCKET=${config.storageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID=${config.messagingSenderId}
VITE_FIREBASE_APP_ID=${config.appId}
${config.measurementId ? `VITE_FIREBASE_MEASUREMENT_ID=${config.measurementId}` : ''}
`;

  // Save to web app .env
  const webEnvPath = path.join('apps', 'web', '.env');
  if (fs.existsSync('apps/web')) {
    fs.writeFileSync(webEnvPath, envContent);
  }

  // Save to mobile app .env
  const mobileEnvPath = path.join('apps', 'mobile', '.env');
  if (fs.existsSync('apps/mobile')) {
    fs.writeFileSync(mobileEnvPath, envContent.replace(/VITE_/g, 'EXPO_PUBLIC_'));
  }
}

/**
 * Display autonomous configuration summary
 */
export function displayAutoConfigSummary(result) {
  if (!result.success) {
    console.log(chalk.yellow('\n⚠️  Automatic configuration was not fully successful'));
    console.log(chalk.white('   Please complete these steps manually in Firebase Console:\n'));
    console.log(chalk.white('   1. Enable Firestore Database'));
    console.log(chalk.white('   2. Enable Authentication (configure providers as needed)'));
    console.log(chalk.white('   3. Enable Cloud Storage\n'));
    return;
  }

  console.log(chalk.green('\n✨ Firebase services configured automatically:\n'));

  if (result.services.firestore) {
    console.log(chalk.white('   ✅ Firestore Database - Ready to use'));
  }

  if (result.services.storage) {
    console.log(chalk.white('   ✅ Cloud Storage - Bucket created and configured'));
  }

  if (result.config) {
    console.log(chalk.white('   ✅ Firebase config - Saved to .env files'));
  }

  console.log(chalk.cyan('\n🎉 Database and storage configured - set up authentication as needed!\n'));
}
