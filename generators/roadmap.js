import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

/**
 * Generate a comprehensive development roadmap based on the AI-analyzed architecture
 * This creates a step-by-step guide for implementing the project with Claude Code
 */
export async function generateDevelopmentRoadmap(config, projectPath) {
  const spinner = ora('Generating development roadmap...').start();

  const roadmap = buildRoadmap(config);

  // Save to .claude/ROADMAP.md
  const claudeDir = path.join(projectPath, '.claude');
  fs.writeFileSync(path.join(claudeDir, 'ROADMAP.md'), roadmap);

  // Also enhance the existing TASKS.md
  const enhancedTasks = buildEnhancedTasks(config);
  fs.writeFileSync(path.join(claudeDir, 'TASKS.md'), enhancedTasks);

  spinner.succeed('Development roadmap generated');
}

/**
 * Build the main roadmap document
 */
function buildRoadmap(config) {
  const sections = [];

  // Header
  sections.push(`# Development Roadmap: ${config.displayName || config.projectName}`);
  sections.push('');
  sections.push(`**Generated:** ${new Date().toLocaleString()}`);
  sections.push(`**Project Type:** ${config.projectType}`);
  sections.push(`**Estimated Complexity:** ${config.estimatedComplexity || 'Medium'}`);
  sections.push('');
  sections.push('---');
  sections.push('');

  // Overview
  sections.push('## 🎯 Project Overview');
  sections.push('');
  sections.push(config.description || 'A Firebase-powered application with modern architecture.');
  sections.push('');
  sections.push('### Key Features');
  if (config.features && config.features.length > 0) {
    config.features.forEach(feature => {
      sections.push(`- ${feature}`);
    });
  } else {
    sections.push('- Features to be defined');
  }
  sections.push('');
  sections.push('---');
  sections.push('');

  // Phase 1: Foundation (Already Complete)
  sections.push('## ✅ Phase 1: Foundation (COMPLETE)');
  sections.push('');
  sections.push('The following have been set up automatically:');
  sections.push('');
  sections.push('### Project Structure');
  sections.push('- ✅ Monorepo with workspaces configured');
  sections.push('- ✅ TypeScript configuration across all packages');
  sections.push('- ✅ Build tools (Vite for web, Expo for mobile)');
  sections.push('- ✅ Linting and formatting (ESLint, Prettier)');
  sections.push('');
  sections.push('### Data Layer');
  if (config.dataModels && config.dataModels.length > 0) {
    sections.push('- ✅ Data models defined:');
    config.dataModels.forEach(model => {
      sections.push(`  - ${model.name} (${model.fields?.length || 0} fields)`);
    });
    sections.push('- ✅ TypeScript interfaces generated');
    sections.push('- ✅ Zod validation schemas created');
    sections.push('- ✅ Firestore CRUD hooks implemented (TanStack Query)');
  }
  sections.push('');
  sections.push('### Security');
  sections.push('- ✅ Firestore security rules generated');
  sections.push('- ✅ Role-based access control (RBAC) configured');
  if (config.userRoles && config.userRoles.length > 0) {
    sections.push('- ✅ User roles:');
    config.userRoles.forEach(role => {
      sections.push(`  - ${role.role}: ${role.permissions?.join(', ') || 'permissions defined'}`);
    });
  }
  sections.push('');
  sections.push('### Infrastructure');
  sections.push('- ✅ Firebase project created and configured');
  sections.push('- ✅ Firestore rules and indexes deployed');
  sections.push('- ✅ Git repository initialized');
  sections.push('- ✅ Project documentation generated');
  sections.push('');
  sections.push('---');
  sections.push('');

  // Phase 2: Core Implementation
  sections.push('## 🚧 Phase 2: Core Implementation (START HERE)');
  sections.push('');
  sections.push('### 2.1 Implement Cloud Functions');
  sections.push('');
  sections.push('**Priority:** High');
  sections.push('**Location:** `apps/functions/src/index.ts`');
  sections.push('');

  if (config.cloudFunctions && config.cloudFunctions.length > 0) {
    sections.push('The following Cloud Functions have been scaffolded and need implementation:');
    sections.push('');

    // Group by type
    const httpFunctions = config.cloudFunctions.filter(f => f.type === 'http' || f.type === 'https');
    const callableFunctions = config.cloudFunctions.filter(f => f.type === 'callable');
    const scheduledFunctions = config.cloudFunctions.filter(f => f.type === 'scheduled');
    const triggerFunctions = config.cloudFunctions.filter(f => f.type === 'trigger');

    if (httpFunctions.length > 0) {
      sections.push('#### HTTP/HTTPS Functions');
      httpFunctions.forEach((fn, i) => {
        sections.push(`${i + 1}. **${fn.name}**`);
        sections.push(`   - Purpose: ${fn.description || 'Implement endpoint logic'}`);
        sections.push(`   - TODO: Implement request handling, validation, and response`);
        sections.push('');
      });
    }

    if (callableFunctions.length > 0) {
      sections.push('#### Callable Functions (Client SDK)');
      callableFunctions.forEach((fn, i) => {
        sections.push(`${i + 1}. **${fn.name}**`);
        sections.push(`   - Purpose: ${fn.description || 'Implement callable function logic'}`);
        sections.push(`   - TODO: Implement function logic, validate inputs, return results`);
        sections.push('');
      });
    }

    if (scheduledFunctions.length > 0) {
      sections.push('#### Scheduled Functions (Cron Jobs)');
      scheduledFunctions.forEach((fn, i) => {
        sections.push(`${i + 1}. **${fn.name}**`);
        sections.push(`   - Purpose: ${fn.description || 'Implement scheduled task'}`);
        sections.push(`   - TODO: Implement cron job logic`);
        sections.push('');
      });
    }

    if (triggerFunctions.length > 0) {
      sections.push('#### Database Triggers');
      triggerFunctions.forEach((fn, i) => {
        sections.push(`${i + 1}. **${fn.name}**`);
        sections.push(`   - Purpose: ${fn.description || 'Implement trigger logic'}`);
        sections.push(`   - TODO: Implement onCreate/onUpdate/onDelete handler`);
        sections.push('');
      });
    }
  } else {
    sections.push('No Cloud Functions defined yet. Consider adding:');
    sections.push('- Data validation functions');
    sections.push('- Background processing tasks');
    sections.push('- Email/notification triggers');
    sections.push('- Scheduled maintenance jobs');
    sections.push('');
  }

  sections.push('**With Claude Code:** Ask Claude to implement each function one at a time.');
  sections.push('');
  sections.push('---');
  sections.push('');

  // 2.2 Build UI Components
  sections.push('### 2.2 Build UI Components');
  sections.push('');
  sections.push('**Priority:** High');
  sections.push('**Locations:** `apps/web/src/components/` and `apps/mobile/app/components/`');
  sections.push('');

  if (config.dataModels && config.dataModels.length > 0) {
    sections.push('Basic pages have been generated. Now enhance them with:');
    sections.push('');

    config.dataModels.forEach((model, i) => {
      sections.push(`${i + 1}. **${model.name} Components**`);
      sections.push(`   - [ ] List view with filtering and sorting`);
      sections.push(`   - [ ] Detail view with all fields`);
      sections.push(`   - [ ] Create/Edit form with validation`);
      sections.push(`   - [ ] Delete confirmation modal`);
      sections.push(`   - [ ] Search and filtering UI`);
      sections.push('');
    });
  }

  sections.push('**With Claude Code:** Ask Claude to enhance each component with:');
  sections.push('- Loading states and error handling');
  sections.push('- Form validation and user feedback');
  sections.push('- Responsive design for mobile and tablet');
  sections.push('- Accessibility features (ARIA labels, keyboard navigation)');
  sections.push('');
  sections.push('---');
  sections.push('');

  // 2.3 Add Integrations
  if (config.integrations && config.integrations.length > 0) {
    sections.push('### 2.3 Add External Integrations');
    sections.push('');
    sections.push('**Priority:** Medium');
    sections.push('**Location:** `apps/functions/src/integrations/`');
    sections.push('');
    sections.push('The following integrations were identified in your requirements:');
    sections.push('');

    config.integrations.forEach((integration, i) => {
      sections.push(`${i + 1}. **${integration.name}**`);
      sections.push(`   - Purpose: ${integration.purpose || 'Integration implementation'}`);
      sections.push(`   - [ ] Set up API credentials in Firebase Functions config`);
      sections.push(`   - [ ] Create integration wrapper/client`);
      sections.push(`   - [ ] Implement error handling and retry logic`);
      sections.push(`   - [ ] Add webhook handlers (if needed)`);
      sections.push(`   - [ ] Test integration end-to-end`);
      sections.push('');
    });

    sections.push('**With Claude Code:** Ask Claude to implement each integration with proper error handling.');
    sections.push('');
    sections.push('---');
    sections.push('');
  }

  // Phase 3: Enhanced Features
  sections.push('## 🎨 Phase 3: Enhanced Features');
  sections.push('');

  sections.push('### 3.1 User Experience');
  sections.push('- [ ] Add loading skeletons and optimistic updates');
  sections.push('- [ ] Implement toast notifications for success/error messages');
  sections.push('- [ ] Add confirmation dialogs for destructive actions');
  sections.push('- [ ] Implement real-time updates (Firestore listeners)');
  sections.push('- [ ] Add pagination for large lists');
  sections.push('- [ ] Implement search functionality');
  sections.push('');

  sections.push('### 3.2 Advanced Features');
  sections.push('- [ ] Add file upload to Cloud Storage (if needed)');
  sections.push('- [ ] Implement user settings and preferences');
  sections.push('- [ ] Add analytics tracking');
  sections.push('- [ ] Implement email notifications (SendGrid, Mailgun, etc.)');
  sections.push('- [ ] Add export functionality (CSV, PDF)');
  sections.push('- [ ] Implement data import/bulk operations');
  sections.push('');

  if (config.userRoles && config.userRoles.length > 1) {
    sections.push('### 3.3 Role-Based Features');
    sections.push('');
    config.userRoles.forEach(role => {
      sections.push(`**${role.role}**:`);
      sections.push(`- [ ] Implement ${role.role}-specific dashboard`);
      sections.push(`- [ ] Add ${role.role}-only features`);
      sections.push(`- [ ] Test permissions and access control`);
      sections.push('');
    });
  }

  sections.push('---');
  sections.push('');

  // Phase 4: Testing
  sections.push('## 🧪 Phase 4: Testing & Quality');
  sections.push('');
  sections.push('### 4.1 Unit Tests');
  sections.push('- [ ] Write tests for Cloud Functions');
  sections.push('- [ ] Test validation schemas (Zod)');
  sections.push('- [ ] Test utility functions and helpers');
  sections.push('');
  sections.push('### 4.2 Integration Tests');
  sections.push('- [ ] Test Firestore rules with @firebase/rules-unit-testing');
  sections.push('- [ ] Test Cloud Functions with Firebase Emulator');
  sections.push('- [ ] Test API integrations with mock data');
  sections.push('');
  sections.push('### 4.3 E2E Tests');
  sections.push('- [ ] Set up Playwright or Cypress');
  sections.push('- [ ] Write critical path tests (auth, CRUD operations)');
  sections.push('- [ ] Test mobile app with Detox (optional)');
  sections.push('');
  sections.push('### 4.4 Manual Testing');
  sections.push('- [ ] Test all user flows');
  sections.push('- [ ] Test on different devices and browsers');
  sections.push('- [ ] Test edge cases and error scenarios');
  sections.push('- [ ] Security audit (check for XSS, CSRF, etc.)');
  sections.push('');
  sections.push('---');
  sections.push('');

  // Phase 5: Deployment
  sections.push('## 🚀 Phase 5: Deployment');
  sections.push('');
  sections.push('### 5.1 Web Deployment');
  sections.push('- [ ] Configure environment variables for production');
  sections.push('- [ ] Build production bundle: `npm run build:web`');
  sections.push('- [ ] Deploy to Firebase Hosting: `firebase deploy --only hosting`');
  sections.push('- [ ] Set up custom domain (optional)');
  sections.push('- [ ] Configure SSL/TLS');
  sections.push('');
  sections.push('### 5.2 Cloud Functions Deployment');
  sections.push('- [ ] Set production environment variables: `firebase functions:config:set`');
  sections.push('- [ ] Deploy functions: `firebase deploy --only functions`');
  sections.push('- [ ] Monitor function logs');
  sections.push('- [ ] Set up error alerting');
  sections.push('');
  sections.push('### 5.3 Mobile Deployment');
  sections.push('**iOS:**');
  sections.push('- [ ] Configure app in Apple Developer account');
  sections.push('- [ ] Set up signing certificates and provisioning profiles');
  sections.push('- [ ] Build: `eas build --platform ios`');
  sections.push('- [ ] Submit to App Store: `eas submit --platform ios`');
  sections.push('');
  sections.push('**Android:**');
  sections.push('- [ ] Configure app in Google Play Console');
  sections.push('- [ ] Generate signing key');
  sections.push('- [ ] Build: `eas build --platform android`');
  sections.push('- [ ] Submit to Play Store: `eas submit --platform android`');
  sections.push('');
  sections.push('### 5.4 Monitoring & Analytics');
  sections.push('- [ ] Set up Firebase Analytics');
  sections.push('- [ ] Configure Firebase Crashlytics');
  sections.push('- [ ] Set up performance monitoring');
  sections.push('- [ ] Create dashboards for key metrics');
  sections.push('');
  sections.push('---');
  sections.push('');

  // Phase 6: Post-Launch
  sections.push('## 📈 Phase 6: Post-Launch');
  sections.push('');
  sections.push('### 6.1 Immediate');
  sections.push('- [ ] Monitor error rates and performance');
  sections.push('- [ ] Gather user feedback');
  sections.push('- [ ] Fix critical bugs');
  sections.push('- [ ] Optimize slow queries and functions');
  sections.push('');
  sections.push('### 6.2 Ongoing');
  sections.push('- [ ] Weekly deploys with new features and fixes');
  sections.push('- [ ] Review and optimize Firebase costs');
  sections.push('- [ ] Update dependencies monthly');
  sections.push('- [ ] Security audits quarterly');
  sections.push('- [ ] User testing and UX improvements');
  sections.push('');
  sections.push('---');
  sections.push('');

  // Tips for using Claude Code
  sections.push('## 💡 Tips for Building with Claude Code');
  sections.push('');
  sections.push('### Start Small');
  sections.push('Don\'t try to implement everything at once. Focus on one feature at a time:');
  sections.push('```');
  sections.push('Example: "Implement the createUser Cloud Function with email validation"');
  sections.push('```');
  sections.push('');
  sections.push('### Be Specific');
  sections.push('Give Claude Code clear context and requirements:');
  sections.push('```');
  sections.push('Example: "Add a search bar to the User list page that filters by name and email');
  sections.push('in real-time. Use the existing useUserList hook and add a search state."');
  sections.push('```');
  sections.push('');
  sections.push('### Iterate');
  sections.push('Build → Test → Refine → Repeat');
  sections.push('```');
  sections.push('1. "Create the basic UI for the dashboard"');
  sections.push('2. "Add real data fetching to the dashboard"');
  sections.push('3. "Add loading states and error handling"');
  sections.push('4. "Make the dashboard responsive for mobile"');
  sections.push('```');
  sections.push('');
  sections.push('### Use the Generated Context');
  sections.push('Claude Code has full access to:');
  sections.push('- `.claude/ARCHITECTURE.md` - System design and data models');
  sections.push('- `.claude/guides/` - How-to guides for common tasks');
  sections.push('- `.claude/prompts/` - Pre-written prompts for features');
  sections.push('');
  sections.push('Ask Claude to reference these when implementing features!');
  sections.push('');
  sections.push('---');
  sections.push('');

  // Next Steps
  sections.push('## 🎯 Immediate Next Steps');
  sections.push('');
  sections.push('1. **Review this roadmap** and prioritize features');
  sections.push('2. **Start with Phase 2.1** - Implement one Cloud Function');
  sections.push('3. **Ask Claude Code** to help implement each task');
  sections.push('4. **Test frequently** in the browser and mobile simulator');
  sections.push('5. **Commit often** to track progress');
  sections.push('');
  sections.push('**Suggested first ask to Claude Code:**');
  sections.push('```');
  if (config.cloudFunctions && config.cloudFunctions.length > 0) {
    const firstFunction = config.cloudFunctions[0];
    sections.push(`"Implement the ${firstFunction.name} Cloud Function. ${firstFunction.description || ''}`);
    sections.push('Add proper error handling and validation."');
  } else {
    sections.push('"Show me the current project structure and help me implement the first feature."');
  }
  sections.push('```');
  sections.push('');
  sections.push('---');
  sections.push('');
  sections.push('**Good luck building! 🚀**');

  return sections.join('\n');
}

/**
 * Build enhanced TASKS.md based on roadmap
 */
function buildEnhancedTasks(config) {
  const sections = [];

  sections.push(`# Development Tasks: ${config.displayName || config.projectName}`);
  sections.push('');
  sections.push('> This file tracks the current development tasks. Check off items as you complete them!');
  sections.push('');
  sections.push('## 📋 Current Sprint');
  sections.push('');
  sections.push('### Priority 1: Cloud Functions');
  sections.push('');

  if (config.cloudFunctions && config.cloudFunctions.length > 0) {
    config.cloudFunctions.slice(0, 5).forEach((fn, i) => {
      sections.push(`- [ ] Implement \`${fn.name}\` function`);
      if (fn.description) {
        sections.push(`  - ${fn.description}`);
      }
    });
  } else {
    sections.push('- [ ] Define and implement first Cloud Function');
  }

  sections.push('');
  sections.push('### Priority 2: UI Components');
  sections.push('');

  if (config.dataModels && config.dataModels.length > 0) {
    config.dataModels.slice(0, 3).forEach((model, i) => {
      sections.push(`- [ ] Enhance ${model.name} components`);
      sections.push(`  - [ ] Add form validation`);
      sections.push(`  - [ ] Add error handling`);
      sections.push(`  - [ ] Add loading states`);
    });
  } else {
    sections.push('- [ ] Build first UI component');
  }

  sections.push('');
  sections.push('### Priority 3: Integrations');
  sections.push('');

  if (config.integrations && config.integrations.length > 0) {
    config.integrations.slice(0, 3).forEach((integration, i) => {
      sections.push(`- [ ] Implement ${integration.name} integration`);
    });
  } else {
    sections.push('- [ ] Identify required integrations');
  }

  sections.push('');
  sections.push('## 📝 Backlog');
  sections.push('');
  sections.push('- [ ] Write unit tests for Cloud Functions');
  sections.push('- [ ] Add E2E tests for critical paths');
  sections.push('- [ ] Optimize Firestore queries');
  sections.push('- [ ] Set up CI/CD pipeline');
  sections.push('- [ ] Performance optimization');
  sections.push('- [ ] Security audit');
  sections.push('');
  sections.push('## ✅ Completed');
  sections.push('');
  sections.push('- [x] Project structure created');
  sections.push('- [x] Firebase project configured');
  sections.push('- [x] Data models defined');
  sections.push('- [x] Security rules deployed');
  sections.push('- [x] Git repository initialized');
  sections.push('');
  sections.push('---');
  sections.push('');
  sections.push('💡 **Tip:** Use Claude Code to help implement each task. Be specific in your requests!');
  sections.push('');
  sections.push('See `ROADMAP.md` for the complete development plan.');

  return sections.join('\n');
}

/**
 * Display roadmap generation summary
 */
export function displayRoadmapSummary() {
  console.log(chalk.cyan('\n📋 Development Roadmap:\n'));
  console.log(chalk.white('   Generated comprehensive roadmap in .claude/ROADMAP.md'));
  console.log(chalk.white('   Updated task list in .claude/TASKS.md'));
  console.log(chalk.gray('\n   Review these files to plan your development with Claude Code\n'));
}
