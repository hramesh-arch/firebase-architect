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

  // Generate HANDOFF_PROMPT.md for Claude Code
  const handoffPrompt = buildHandoffPrompt(config);
  fs.writeFileSync(path.join(claudeDir, 'HANDOFF_PROMPT.md'), handoffPrompt);

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
 * Build handoff prompt for Claude Code
 * This is the first file Claude Code should read when starting development
 */
function buildHandoffPrompt(config) {
  const sections = [];

  sections.push(`# Handoff Prompt: ${config.displayName || config.projectName}`);
  sections.push('');
  sections.push('**Welcome to your Firebase project!** This environment has been fully configured and is ready for feature development.');
  sections.push('');
  sections.push(`**Generated:** ${new Date().toLocaleString()}`);
  sections.push('');
  sections.push('---');
  sections.push('');

  // Environment Summary
  sections.push('## 🏗️ Environment Summary');
  sections.push('');
  sections.push('Your development environment is **100% configured**. All setup work is complete:');
  sections.push('');
  sections.push('### ✅ Completed Setup');
  sections.push('- **Project Structure**: Monorepo with web, mobile, and functions');
  sections.push('- **Firebase Project**: Created and configured');
  sections.push('- **Firestore Rules**: Generated and deployed');
  sections.push('- **Firestore Indexes**: Generated and deployed');
  sections.push('- **TypeScript Types**: All data models defined');
  sections.push('- **Git Repository**: Initialized with initial commit');
  sections.push('- **Dependencies**: All packages installed');
  sections.push('- **Development Roadmap**: Complete plan in ROADMAP.md');
  sections.push('');

  // UI Template Section (if configured)
  if (config.uiTemplate) {
    sections.push('### 🎨 UI Template');
    sections.push('');
    sections.push(`**Template:** ${config.uiTemplate.templateName || config.uiTemplate.templateId}`);
    sections.push(`**Framework:** ${config.uiTemplate.framework || 'Material-UI'}`);
    sections.push('');
    sections.push('**Configuration:**');
    sections.push('```javascript');
    sections.push(JSON.stringify(config.uiTemplate, null, 2));
    sections.push('```');
    sections.push('');
    sections.push('**Files Created:**');
    if (config.uiTemplate.themePath) {
      sections.push(`- Theme: \`${config.uiTemplate.themePath}\``);
    }
    sections.push('- Component Library Setup: `apps/web/src/lib/ui-setup.ts`');
    sections.push('- Example Components: `apps/web/src/components/`');
    sections.push('');
    sections.push('**Available Components:**');
    if (config.uiTemplate.components && config.uiTemplate.components.length > 0) {
      sections.push(config.uiTemplate.components.slice(0, 10).join(', '));
      if (config.uiTemplate.components.length > 10) {
        sections.push(`... and ${config.uiTemplate.components.length - 10} more`);
      }
    }
    sections.push('');
    sections.push('**Usage Example:**');
    sections.push('```typescript');
    sections.push('import UIProvider from \'./lib/ui-setup\';');
    sections.push('');
    sections.push('function App() {');
    sections.push('  return (');
    sections.push('    <UIProvider>');
    sections.push('      {/* Your app content */}');
    sections.push('    </UIProvider>');
    sections.push('  );');
    sections.push('}');
    sections.push('```');
    sections.push('');
  }

  sections.push('---');
  sections.push('');

  // Architecture Overview
  sections.push('## 🏛️ Architecture Overview');
  sections.push('');
  sections.push(`**Description:** ${config.description || 'Firebase-powered application'}`);
  sections.push('');
  sections.push(`**Type:** ${config.projectType}`);
  sections.push(`**Platforms:** ${config.platforms?.join(', ') || 'Web, Mobile'}`);
  sections.push(`**Firebase Services:** ${config.firebaseServices?.join(', ') || 'Auth, Firestore, Storage, Functions'}`);
  sections.push('');

  // Tech Stack
  if (config.recommendedStack || config.uiTemplate) {
    sections.push('### 📚 Tech Stack');
    sections.push('');
    if (config.recommendedStack) {
      Object.entries(config.recommendedStack).forEach(([key, value]) => {
        sections.push(`- **${key}**: ${value}`);
      });
    }
    if (config.uiTemplate) {
      sections.push(`- **UI Framework**: ${config.uiTemplate.framework || 'Material-UI'}`);
    }
    sections.push('');
  }

  // Data Models
  if (config.dataModels && config.dataModels.length > 0) {
    sections.push('### 📊 Data Models');
    sections.push('');
    config.dataModels.forEach(model => {
      sections.push(`**${model.name}**`);
      sections.push(`- Collection: \`${model.collection || model.name.toLowerCase() + 's'}\``);
      sections.push(`- Fields: ${model.fields?.length || 0} defined`);
      if (model.fields && model.fields.length > 0) {
        model.fields.slice(0, 5).forEach(field => {
          sections.push(`  - ${field.name}: ${field.type}${field.required ? ' (required)' : ''}`);
        });
        if (model.fields.length > 5) {
          sections.push(`  - ... and ${model.fields.length - 5} more`);
        }
      }
      sections.push('');
    });
  }

  // User Roles
  if (config.userRoles && config.userRoles.length > 0) {
    sections.push('### 👥 User Roles');
    sections.push('');
    config.userRoles.forEach(role => {
      sections.push(`**${role.role}**`);
      sections.push(`- ${role.description || role.permissions?.join(', ') || 'Permissions defined in security rules'}`);
      sections.push('');
    });
  }

  // Integrations
  if (config.integrations && config.integrations.length > 0) {
    sections.push('### 🔌 External Integrations');
    sections.push('');
    config.integrations.forEach(integration => {
      sections.push(`- **${integration.name || integration}**: ${integration.purpose || 'Integration configured'}`);
    });
    sections.push('');
  }

  sections.push('---');
  sections.push('');

  // What to Build Next
  sections.push('## 🚀 What to Build Next');
  sections.push('');
  sections.push('The environment is ready. Now it\'s time to build features!');
  sections.push('');
  sections.push('### Recommended First Steps');
  sections.push('');
  sections.push('1. **Review the complete roadmap**: Read `ROADMAP.md` for the full development plan');
  sections.push('2. **Start with Cloud Functions**: Implement backend logic first (Phase 2.1)');
  sections.push('3. **Build UI Components**: Create the interface (Phase 2.2)');
  sections.push('4. **Add Integrations**: Connect external services (Phase 2.3)');
  sections.push('5. **Test & Deploy**: Verify everything works (Phases 4-5)');
  sections.push('');

  // Suggested First Task
  sections.push('### ✨ Suggested First Task');
  sections.push('');
  if (config.cloudFunctions && config.cloudFunctions.length > 0) {
    const firstFunction = config.cloudFunctions[0];
    sections.push(`Implement the **${firstFunction.name}** Cloud Function:`);
    sections.push('');
    sections.push('```');
    sections.push(`Task: Implement ${firstFunction.name}`);
    if (firstFunction.description) {
      sections.push(`Description: ${firstFunction.description}`);
    }
    sections.push(`Type: ${firstFunction.type}`);
    sections.push(`Location: apps/functions/src/index.ts`);
    sections.push('```');
    sections.push('');
    sections.push('Ask me: "Implement the ' + firstFunction.name + ' Cloud Function with proper error handling and validation"');
  } else if (config.dataModels && config.dataModels.length > 0) {
    const firstModel = config.dataModels[0];
    sections.push(`Build CRUD components for **${firstModel.name}**:`);
    sections.push('');
    sections.push('```');
    sections.push(`Task: Create ${firstModel.name} UI components`);
    sections.push(`Components: List view, Create/Edit form, Detail view`);
    sections.push(`Location: apps/web/src/components/${firstModel.name}/`);
    sections.push('```');
    sections.push('');
    sections.push('Ask me: "Create CRUD components for ' + firstModel.name + ' with list view, forms, and validation"');
  } else {
    sections.push('Review the roadmap and decide which feature to implement first.');
    sections.push('');
    sections.push('Ask me: "Show me the project structure and help me implement the first feature"');
  }
  sections.push('');

  sections.push('---');
  sections.push('');

  // Development Commands
  sections.push('## 💻 Development Commands');
  sections.push('');
  sections.push('```bash');
  sections.push('# Web Development');
  sections.push('npm run dev:web                 # Start web dev server');
  sections.push('npm run build:web               # Build web app');
  sections.push('');
  sections.push('# Mobile Development');
  sections.push('npm run dev:mobile              # Start Expo dev server');
  sections.push('npm run build:mobile            # Build mobile app');
  sections.push('');
  sections.push('# Cloud Functions');
  sections.push('npm run dev:functions           # Start functions emulator');
  sections.push('npm run build:functions         # Build functions');
  sections.push('');
  sections.push('# Firebase');
  sections.push('firebase emulators:start        # Start all emulators');
  sections.push('firebase deploy                 # Deploy everything');
  sections.push('firebase deploy --only firestore:rules   # Deploy rules only');
  sections.push('firebase deploy --only functions         # Deploy functions only');
  sections.push('firebase deploy --only hosting           # Deploy web app only');
  sections.push('');
  sections.push('# Testing');
  sections.push('npm test                        # Run all tests');
  sections.push('npm run test:web                # Test web app');
  sections.push('npm run test:functions          # Test Cloud Functions');
  sections.push('```');
  sections.push('');

  sections.push('---');
  sections.push('');

  // File Locations
  sections.push('## 📁 Key File Locations');
  sections.push('');
  sections.push('### Web App');
  sections.push('- Components: `apps/web/src/components/`');
  sections.push('- Pages: `apps/web/src/pages/`');
  sections.push('- Hooks: `apps/web/src/hooks/`');
  if (config.uiTemplate) {
    sections.push('- Theme: `apps/web/src/theme/`');
    sections.push('- UI Setup: `apps/web/src/lib/ui-setup.ts`');
  }
  sections.push('');
  sections.push('### Mobile App');
  sections.push('- Screens: `apps/mobile/app/`');
  sections.push('- Components: `apps/mobile/app/components/`');
  sections.push('');
  sections.push('### Cloud Functions');
  sections.push('- Main file: `apps/functions/src/index.ts`');
  sections.push('- Integrations: `apps/functions/src/integrations/`');
  sections.push('');
  sections.push('### Shared Packages');
  sections.push('- Types: `packages/types/src/`');
  sections.push('- Utilities: `packages/shared/src/`');
  sections.push('');
  sections.push('### Firebase Config');
  sections.push('- Security Rules: `firestore.rules`');
  sections.push('- Indexes: `firestore.indexes.json`');
  sections.push('- Firebase Config: `firebase.json`');
  sections.push('- Environment: `.env.example` (copy to `.env`)');
  sections.push('');

  sections.push('---');
  sections.push('');

  // Coding Standards
  sections.push('## 📝 Coding Standards');
  sections.push('');
  sections.push('### TypeScript');
  sections.push('- Use strict type checking');
  sections.push('- Define interfaces for all data models');
  sections.push('- Avoid `any` type unless absolutely necessary');
  sections.push('- Use Zod for runtime validation');
  sections.push('');
  sections.push('### React/React Native');
  sections.push('- Use functional components with hooks');
  sections.push('- Use TanStack Query for data fetching');
  sections.push('- Implement proper loading and error states');
  sections.push('- Follow component composition patterns');
  sections.push('');
  if (config.uiTemplate) {
    sections.push('### UI Components');
    sections.push(`- Use ${config.uiTemplate.framework || 'Material-UI'} components from the template`);
    sections.push('- Follow the theme configuration for colors and typography');
    sections.push('- Ensure responsive design for all screen sizes');
    sections.push('- Maintain accessibility standards (WCAG AA minimum)');
    sections.push('');
  }
  sections.push('### Firebase');
  sections.push('- Always check user authentication before data access');
  sections.push('- Use batch writes for multiple operations');
  sections.push('- Implement pagination for large lists');
  sections.push('- Use real-time listeners sparingly (consider polling)');
  sections.push('');
  sections.push('### Security');
  sections.push('- Validate all user inputs');
  sections.push('- Never trust client-side data in Cloud Functions');
  sections.push('- Use Firebase Security Rules as primary defense');
  sections.push('- Implement rate limiting for sensitive operations');
  sections.push('');

  sections.push('---');
  sections.push('');

  // Additional Resources
  sections.push('## 📚 Additional Resources');
  sections.push('');
  sections.push('### Documentation Files');
  sections.push('- **ROADMAP.md**: Complete development plan with phases');
  sections.push('- **ARCHITECTURE.md**: System design and technical decisions');
  sections.push('- **TASKS.md**: Current sprint tasks');
  sections.push('- **guides/**: How-to guides for common operations');
  sections.push('- **prompts/**: Pre-written prompts for feature implementation');
  sections.push('');
  sections.push('### Firebase Console');
  if (config.projectName) {
    sections.push(`- Project: https://console.firebase.google.com/project/${config.projectName}`);
    sections.push(`- Firestore: https://console.firebase.google.com/project/${config.projectName}/firestore`);
    sections.push(`- Authentication: https://console.firebase.google.com/project/${config.projectName}/authentication`);
    sections.push(`- Functions: https://console.firebase.google.com/project/${config.projectName}/functions`);
  }
  sections.push('');

  sections.push('---');
  sections.push('');

  // Call to Action
  sections.push('## 🎯 Ready to Build!');
  sections.push('');
  sections.push('Your environment is fully configured. Start implementing features from the roadmap!');
  sections.push('');
  sections.push('**Next Steps:**');
  sections.push('1. Read `ROADMAP.md` for the complete plan');
  sections.push('2. Pick a task from Phase 2');
  sections.push('3. Ask me to implement it!');
  sections.push('');
  sections.push('**Example Request:**');
  sections.push('```');
  if (config.cloudFunctions && config.cloudFunctions.length > 0) {
    sections.push(`"Implement the ${config.cloudFunctions[0].name} Cloud Function"`);
  } else if (config.dataModels && config.dataModels.length > 0) {
    sections.push(`"Create the ${config.dataModels[0].name} list view component with search"`);
  } else {
    sections.push('"Show me the current structure and help implement the first feature"');
  }
  sections.push('```');
  sections.push('');
  sections.push('**Let\'s build something amazing! 🚀**');

  return sections.join('\n');
}

/**
 * Display roadmap generation summary
 */
export function displayRoadmapSummary() {
  console.log(chalk.cyan('\n📋 Development Roadmap:\n'));
  console.log(chalk.white('   Generated comprehensive roadmap in .claude/ROADMAP.md'));
  console.log(chalk.white('   Generated handoff prompt in .claude/HANDOFF_PROMPT.md'));
  console.log(chalk.white('   Updated task list in .claude/TASKS.md'));
  console.log(chalk.gray('\n   Review these files to plan your development with Claude Code\n'));
}
