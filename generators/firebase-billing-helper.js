import { execSync } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';

/**
 * Helper to guide users through Firebase billing setup
 * Note: Actual billing setup requires manual payment information
 * This helper guides the user through the process
 */
export async function guideBillingSetup(projectId) {
  console.log(chalk.cyan('\n💳 Firebase Billing Setup\n'));

  console.log(chalk.white('Firebase has two pricing plans:\n'));
  console.log(chalk.white('  1. ✨ Spark Plan (Free)'));
  console.log(chalk.gray('     - Good for: Development, testing, small apps'));
  console.log(chalk.gray('     - Includes: Firestore, Auth, Storage (with limits)'));
  console.log(chalk.gray('     - Limitations: No Cloud Functions, limited quotas\n'));

  console.log(chalk.white('  2. 🚀 Blaze Plan (Pay as you go)'));
  console.log(chalk.gray('     - Good for: Production apps'));
  console.log(chalk.gray('     - Includes: Everything + Cloud Functions'));
  console.log(chalk.gray('     - Cost: Free tier included, then pay for usage'));
  console.log(chalk.gray('     - Requires: Credit card for verification\n'));

  const { needsBilling } = await inquirer.prompt([{
    type: 'confirm',
    name: 'needsBilling',
    message: 'Do you need to set up billing (Blaze Plan)?',
    default: false
  }]);

  if (!needsBilling) {
    console.log(chalk.green('\n✅ Using Spark Plan (Free) - No billing setup needed\n'));
    return { plan: 'spark', setupRequired: false };
  }

  // Check if billing is already enabled
  const billingStatus = await checkBillingStatus(projectId);

  if (billingStatus.enabled) {
    console.log(chalk.green(`\n✅ Billing already enabled: ${billingStatus.accountName}\n`));
    return { plan: 'blaze', setupRequired: false, existing: true };
  }

  // Guide user to set up billing
  console.log(chalk.yellow('\n⚠️  Billing setup requires payment information and must be done in the Console\n'));

  const { setupNow } = await inquirer.prompt([{
    type: 'list',
    name: 'setupNow',
    message: 'How would you like to proceed?',
    choices: [
      { name: '🌐 Open Firebase Console to set up billing now', value: 'console' },
      { name: '🔗 Link to existing billing account (gcloud)', value: 'link' },
      { name: '⏭️  Skip for now (set up later)', value: 'skip' }
    ]
  }]);

  if (setupNow === 'console') {
    const billingUrl = `https://console.firebase.google.com/project/${projectId}/usage`;
    console.log(chalk.cyan(`\n📋 Opening Firebase Console for billing setup...\n`));
    console.log(chalk.white(`   URL: ${billingUrl}\n`));
    console.log(chalk.white('   Steps:\n'));
    console.log(chalk.white('   1. Click "Modify plan"'));
    console.log(chalk.white('   2. Select "Blaze (Pay as you go)"'));
    console.log(chalk.white('   3. Enter payment information'));
    console.log(chalk.white('   4. Review and confirm\n'));

    // Open in browser
    try {
      execSync(`open "${billingUrl}"`, { stdio: 'pipe' });
    } catch (error) {
      console.log(chalk.gray(`   (If browser didn't open, visit the URL above)\n`));
    }

    const { completed } = await inquirer.prompt([{
      type: 'confirm',
      name: 'completed',
      message: 'Have you completed billing setup?',
      default: false
    }]);

    return {
      plan: 'blaze',
      setupRequired: true,
      completed
    };
  }

  if (setupNow === 'link') {
    return await linkBillingAccount(projectId);
  }

  console.log(chalk.yellow('\n⚠️  Billing not configured. You can set it up later in Firebase Console.\n'));
  console.log(chalk.gray(`   Visit: https://console.firebase.google.com/project/${projectId}/usage\n`));

  return { plan: 'spark', setupRequired: false, skipped: true };
}

/**
 * Check if billing is enabled for a Firebase project
 */
async function checkBillingStatus(projectId) {
  const spinner = ora('Checking billing status...').start();

  try {
    // Use gcloud to check billing status
    const result = execSync(
      `gcloud billing projects describe ${projectId} --format=json`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );

    const billing = JSON.parse(result);
    spinner.stop();

    if (billing.billingAccountName) {
      return {
        enabled: true,
        accountName: billing.billingAccountName,
        billingEnabled: billing.billingEnabled
      };
    }

    return { enabled: false };

  } catch (error) {
    spinner.stop();
    // Project might not have billing configured yet
    return { enabled: false };
  }
}

/**
 * Link Firebase project to existing billing account
 */
async function linkBillingAccount(projectId) {
  const spinner = ora('Fetching billing accounts...').start();

  try {
    // List available billing accounts
    const result = execSync(
      'gcloud billing accounts list --format=json',
      { encoding: 'utf-8', stdio: 'pipe' }
    );

    const accounts = JSON.parse(result);
    spinner.stop();

    if (accounts.length === 0) {
      console.log(chalk.yellow('\n⚠️  No billing accounts found in your Google Cloud account\n'));
      console.log(chalk.white('   Create one at: https://console.cloud.google.com/billing\n'));
      return { plan: 'spark', setupRequired: false };
    }

    // Let user choose billing account
    const choices = accounts.map(account => ({
      name: `${account.displayName} (${account.name})`,
      value: account.name
    }));

    const { billingAccount } = await inquirer.prompt([{
      type: 'list',
      name: 'billingAccount',
      message: 'Select billing account to link:',
      choices
    }]);

    // Link the billing account
    spinner.start('Linking billing account...');
    execSync(
      `gcloud billing projects link ${projectId} --billing-account=${billingAccount}`,
      { stdio: 'pipe' }
    );
    spinner.succeed('Billing account linked successfully');

    // Upgrade to Blaze plan in Firebase
    console.log(chalk.cyan('\n📋 Now upgrading to Blaze plan in Firebase...\n'));

    const upgradeUrl = `https://console.firebase.google.com/project/${projectId}/usage`;
    console.log(chalk.white(`   Visit: ${upgradeUrl}`));
    console.log(chalk.white('   Click "Modify plan" → "Blaze (Pay as you go)"\n'));

    try {
      execSync(`open "${upgradeUrl}"`, { stdio: 'pipe' });
    } catch (error) {
      // Browser might not open on some systems
    }

    return {
      plan: 'blaze',
      setupRequired: true,
      linked: true,
      billingAccount
    };

  } catch (error) {
    spinner.fail('Failed to link billing account');
    console.log(chalk.red(`   Error: ${error.message}\n`));
    return { plan: 'spark', setupRequired: false, error: error.message };
  }
}

/**
 * Display billing setup summary
 */
export function displayBillingSummary(billingResult, projectId) {
  console.log(chalk.cyan('\n💳 Billing Configuration:\n'));

  if (billingResult.plan === 'spark') {
    console.log(chalk.white('   📦 Plan: Spark (Free)'));
    console.log(chalk.gray('   ℹ️  Sufficient for development and testing'));

    if (billingResult.skipped) {
      console.log(chalk.yellow('\n   ⚠️  To enable Cloud Functions later:'));
      console.log(chalk.gray(`      Visit: https://console.firebase.google.com/project/${projectId}/usage`));
      console.log(chalk.gray('      Upgrade to Blaze Plan\n'));
    }
  }

  if (billingResult.plan === 'blaze') {
    console.log(chalk.white('   🚀 Plan: Blaze (Pay as you go)'));

    if (billingResult.existing) {
      console.log(chalk.green('   ✅ Billing already configured'));
    } else if (billingResult.completed) {
      console.log(chalk.green('   ✅ Billing setup completed'));
    } else if (billingResult.linked) {
      console.log(chalk.green('   ✅ Billing account linked'));
      console.log(chalk.yellow('   ⚠️  Complete upgrade in Firebase Console'));
    } else {
      console.log(chalk.yellow('   ⏳ Billing setup pending'));
    }

    console.log(chalk.gray('\n   ℹ️  Includes generous free tier'));
    console.log(chalk.gray('      Monitor usage in Console to avoid surprises\n'));
  }
}

/**
 * Quick check if project needs billing for its features
 */
export function checkIfBillingNeeded(config) {
  const needsBilling =
    config.cloudFunctions?.length > 0 ||
    config.platforms?.includes('functions') ||
    config.firebaseServices?.includes('functions');

  return {
    needed: needsBilling,
    reason: needsBilling ? 'Cloud Functions require Blaze Plan' : null
  };
}
