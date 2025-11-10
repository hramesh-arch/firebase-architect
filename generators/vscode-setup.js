import { execSync } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';

/**
 * Open project in VS Code
 */
export async function openInVSCode(projectPath) {
  // Check if VS Code CLI is available
  if (!isVSCodeAvailable()) {
    console.log(chalk.yellow('\n⚠️  VS Code CLI (code) not found.'));
    console.log(chalk.gray('   You can open the project manually in VS Code\n'));
    return false;
  }

  const { openNow } = await inquirer.prompt([{
    type: 'confirm',
    name: 'openNow',
    message: 'Open project in VS Code now?',
    default: true
  }]);

  if (!openNow) {
    console.log(chalk.gray(`   You can open it later with: code ${projectPath}\n`));
    return false;
  }

  const spinner = ora('Opening VS Code...').start();

  try {
    // Open in VS Code
    execSync(`code "${projectPath}"`, {
      stdio: 'pipe'
    });

    spinner.succeed('VS Code opened');

    // Also open the handoff prompt file
    try {
      const handoffPath = `${projectPath}/.claude/HANDOFF_PROMPT.md`;
      execSync(`code "${handoffPath}"`, {
        stdio: 'pipe'
      });
      console.log(chalk.green('   ✅ Opened HANDOFF_PROMPT.md\n'));
    } catch (error) {
      // Handoff file might not exist yet
    }

    return true;

  } catch (error) {
    spinner.fail('Could not open VS Code');
    console.log(chalk.gray(`   Open manually with: code ${projectPath}\n`));
    return false;
  }
}

/**
 * Check if VS Code CLI is available
 */
function isVSCodeAvailable() {
  try {
    execSync('code --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Display next steps for development
 */
export function displayNextSteps(projectPath, projectName, config) {
  console.log(chalk.cyan.bold('\n🎉 Setup Complete!\n'));

  console.log(chalk.white('Your Firebase project environment is ready:\n'));

  console.log(chalk.green('✅ Project structure created'));
  console.log(chalk.green('✅ Firebase project configured'));
  console.log(chalk.green('✅ Git repository initialized'));
  console.log(chalk.green('✅ Dependencies installed'));
  console.log(chalk.green('✅ Development roadmap generated\n'));

  console.log(chalk.cyan('📍 Project Location:\n'));
  console.log(chalk.white(`   ${projectPath}\n`));

  console.log(chalk.cyan('📋 Next Steps:\n'));
  console.log(chalk.white('   1. Review .claude/HANDOFF_PROMPT.md for complete context'));
  console.log(chalk.white('   2. Check .claude/ROADMAP.md for development plan'));
  console.log(chalk.white('   3. Copy .env.example to .env and add any secrets'));
  console.log(chalk.white('   4. Start development server: npm run dev:web'));
  console.log(chalk.white('   5. Begin building features from the roadmap\n'));

  console.log(chalk.cyan('🚀 Quick Commands:\n'));
  console.log(chalk.gray(`   cd ${projectName}`));
  console.log(chalk.gray('   code .                          # Open in VS Code'));
  console.log(chalk.gray('   npm run dev:web                 # Start web dev server'));
  console.log(chalk.gray('   npm run dev:mobile              # Start mobile dev'));
  console.log(chalk.gray('   firebase emulators:start        # Start Firebase emulators'));
  console.log(chalk.gray('   firebase deploy                 # Deploy to Firebase\n'));

  console.log(chalk.cyan('📚 Documentation:\n'));
  console.log(chalk.gray('   .claude/HANDOFF_PROMPT.md       # Start here!'));
  console.log(chalk.gray('   .claude/ROADMAP.md              # Development plan'));
  console.log(chalk.gray('   .claude/ARCHITECTURE.md         # System design'));
  console.log(chalk.gray('   .claude/TASKS.md                # Current sprint\n'));

  if (config.firebaseServices?.includes('auth')) {
    console.log(chalk.yellow('⚠️  Authentication Setup:\n'));
    console.log(chalk.white('   Enable auth providers in Firebase Console:'));
    console.log(chalk.underline(`   https://console.firebase.google.com/project/${config.projectName}/authentication/providers\n`));
  }

  console.log(chalk.magenta('💡 Pro Tip:\n'));
  console.log(chalk.white('   Use Claude Code in VS Code to build features from the roadmap.'));
  console.log(chalk.white('   Just say: "Read HANDOFF_PROMPT.md and start building"\n'));
}

/**
 * Display setup summary with metrics
 */
export function displaySetupSummary(stats) {
  console.log(chalk.cyan('\n📊 Setup Summary:\n'));

  if (stats.filesCreated) {
    console.log(chalk.white(`   📄 Files created: ${chalk.bold(stats.filesCreated)}`));
  }
  if (stats.dependenciesInstalled) {
    console.log(chalk.white(`   📦 Dependencies: ${chalk.bold(stats.dependenciesInstalled)}`));
  }
  if (stats.firebaseProject) {
    console.log(chalk.white(`   🔥 Firebase: ${chalk.bold(stats.firebaseProject)}`));
  }
  if (stats.githubRepo) {
    console.log(chalk.white(`   🐙 GitHub: ${chalk.bold(stats.githubRepo)}`));
  }
  if (stats.roadmapTasks) {
    console.log(chalk.white(`   ✅ Roadmap tasks: ${chalk.bold(stats.roadmapTasks)}`));
  }
  if (stats.setupTime) {
    console.log(chalk.white(`   ⏱️  Setup time: ${chalk.bold(stats.setupTime)}\n`));
  }
}
