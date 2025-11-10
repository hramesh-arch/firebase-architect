import fs from 'fs';
import path from 'path';
import ora from 'ora';

export async function generateDocs(config, projectPath) {
  const spinner = ora('Generating documentation...').start();

  // Generate README.md
  const readme = generateReadme(config);
  fs.writeFileSync(path.join(projectPath, 'README.md'), readme);

  // Generate DEPLOYMENT.md
  const deployment = generateDeploymentGuide(config);
  fs.writeFileSync(path.join(projectPath, 'DEPLOYMENT.md'), deployment);

  // Generate CONTRIBUTING.md
  const contributing = generateContributingGuide(config);
  fs.writeFileSync(path.join(projectPath, 'CONTRIBUTING.md'), contributing);

  // Generate .env.example files for each app
  generateEnvExamples(config, projectPath);

  spinner.succeed('Documentation generated');
}

function generateReadme(config) {
  return `# ${config.displayName || config.projectName}

${config.description || 'A modern Firebase-powered application with web and mobile interfaces.'}

## Features

${config.features?.map(f => `- ${f}`).join('\n') || '- Features to be documented'}

## Tech Stack

### Frontend
${config.platforms?.includes('web') ? '- **Web**: React + Vite + TypeScript + Tailwind CSS' : ''}
${config.platforms?.includes('mobile') ? '- **Mobile**: React Native + Expo + NativeWind' : ''}

### Backend
- **Firebase Authentication**: User management with custom claims
- **Cloud Firestore**: NoSQL database
- **Cloud Functions**: Serverless backend
- **Cloud Storage**: File storage

### Shared Packages
- **@${config.projectName}/core**: Shared types, validators, and utilities
- **@${config.projectName}/ui**: Reusable UI components
- **@${config.projectName}/data**: Firebase SDK wrappers and hooks

## Project Structure

\`\`\`
${config.projectName}/
├── apps/
│   ├── web/              # React web application
│   ├── mobile/           # React Native mobile app
│   └── functions/        # Firebase Cloud Functions
├── packages/
│   ├── core/             # Shared types and validators
│   ├── ui/               # Shared UI components
│   └── data/             # Firebase data layer
├── .claude/              # Claude Code context files
├── firestore.rules       # Firestore security rules
├── firestore.indexes.json # Firestore indexes
├── storage.rules         # Storage security rules
└── firebase.json         # Firebase configuration
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase CLI: \`npm install -g firebase-tools\`
- Expo CLI (for mobile): \`npm install -g expo-cli\`${config.includeGemini ? '\n- Gemini API Key: https://makersuite.google.com/app/apikey' : ''}

### Installation

1. **Clone and install dependencies**

\`\`\`bash
cd ${config.projectName}
npm install
\`\`\`

2. **Configure Firebase**

Create a Firebase project at https://console.firebase.google.com

Get your Firebase configuration:
- Go to Project Settings
- Scroll to "Your apps"
- Copy the configuration

3. **Set up environment variables**

\`\`\`bash
# Web app
cp apps/web/.env.example apps/web/.env
# Edit apps/web/.env with your Firebase config

# Mobile app
cp apps/mobile/.env.example apps/mobile/.env
# Edit apps/mobile/.env with your Firebase config

# Functions
cp apps/functions/.env.example apps/functions/.env
# Add any API keys for integrations
\`\`\`

4. **Enable Firebase services**

In the Firebase Console:
- **Authentication**: Enable Email/Password sign-in
- **Firestore**: Create database (start in test mode, we'll deploy rules)
- **Storage**: Get started (start in test mode, we'll deploy rules)

5. **Deploy Firestore rules and indexes**

\`\`\`bash
firebase deploy --only firestore,storage
\`\`\`

### Development

**Run all services in parallel** (recommended during development):

\`\`\`bash
# Terminal 1: Web app
npm run dev:web

# Terminal 2: Mobile app
npm run dev:mobile

# Terminal 3: Functions emulator
npm run dev:functions
\`\`\`

Or run individually:

\`\`\`bash
npm run dev:web      # Web app at http://localhost:3000
npm run dev:mobile   # Mobile app (scan QR with Expo Go)
npm run dev:functions # Functions emulator at http://localhost:5001
\`\`\`

### Building for Production

\`\`\`bash
# Build all apps
npm run build

# Or build individually
npm run build:web
npm run build:mobile
npm run build:functions
\`\`\`

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick deploy:**

\`\`\`bash
# Deploy everything to Firebase
npm run deploy

# Or deploy individually
firebase deploy --only hosting  # Web app
firebase deploy --only functions # Cloud Functions
\`\`\`

For mobile deployment, see [DEPLOYMENT.md](DEPLOYMENT.md#mobile-deployment).

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture documentation.

**Key design decisions:**
- Monorepo structure with npm workspaces
- Shared packages for code reuse between web and mobile
- TypeScript for type safety across the stack
- TanStack Query for data fetching and caching
- Role-based access control (RBAC) in security rules

## User Roles

${config.userRoles?.map(r => `- **${r.role}**: ${r.description || r.permissions?.join(', ')}`).join('\n') || '- Roles to be documented'}

## Scripts

\`\`\`bash
# Development
npm run dev:web        # Start web dev server
npm run dev:mobile     # Start Expo dev server
npm run dev:functions  # Start functions emulator

# Build
npm run build          # Build all apps
npm run build:web      # Build web app only
npm run build:mobile   # Build mobile app only
npm run build:functions # Build functions only

# Testing
npm test               # Run all tests
npm run lint           # Lint all code

# Deployment
npm run deploy         # Deploy everything
\`\`\`

## Database Schema

${config.dataModels?.map(m => `### ${m.name}
Collection: \`${m.collection || m.name.toLowerCase() + 's'}\`

${m.fields?.map(f => `- \`${f.name}\`: ${f.type}${f.required ? ' (required)' : ''}`).join('\n') || ''}`).join('\n\n') || 'See ARCHITECTURE.md for data models'}

## Security

- **Authentication**: Firebase Auth with Email/Password
- **Authorization**: Role-based access control via custom claims
- **Data Validation**: Zod schemas + Firestore rules
- **Security Rules**: See [firestore.rules](firestore.rules) and [storage.rules](storage.rules)

**Security best practices:**
- Never commit \`.env\` files
- Use environment-specific Firebase projects (dev/staging/prod)
- Review security rules before deploying to production
- Enable Firebase App Check for abuse prevention

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Troubleshooting

### Common Issues

**"Module not found" errors**
\`\`\`bash
npm install
\`\`\`

**"Permission denied" errors with Firestore**
- Check your security rules in \`firestore.rules\`
- Ensure user is authenticated
- Verify custom claims (role) are set correctly

**Functions not working locally**
- Ensure emulator is running: \`npm run dev:functions\`
- Check functions logs for errors
- Verify environment variables in \`apps/functions/.env\`

**Mobile app not loading**
- Check Expo is installed: \`npm install -g expo-cli\`
- Clear cache: \`cd apps/mobile && npx expo start -c\`
- Check Firebase config in \`apps/mobile/.env\`

## Support

- **Documentation**: Check [.claude/](.claude/) directory for guides
- **Firebase**: https://firebase.google.com/docs
- **React**: https://react.dev
- **Expo**: https://docs.expo.dev

## License

[MIT](LICENSE)

---

**Built with Firebase Architect** - AI-powered project generation
`;
}

function generateDeploymentGuide(config) {
  return `# Deployment Guide

## Prerequisites

- Firebase CLI installed and logged in
- Firebase project created and configured
- Production environment variables set

## Pre-Deployment Checklist

- [ ] All tests passing: \`npm test\`
- [ ] No lint errors: \`npm run lint\`
- [ ] Environment variables configured for production
- [ ] Security rules reviewed and tested
- [ ] Database indexes deployed
- [ ] Secrets/API keys stored securely (Firebase Functions config)

## Web Deployment (Firebase Hosting)

### 1. Build the Web App

\`\`\`bash
npm run build:web
\`\`\`

### 2. Deploy to Firebase Hosting

\`\`\`bash
firebase deploy --only hosting
\`\`\`

Your web app will be available at:
\`https://YOUR_PROJECT_ID.web.app\`
\`https://YOUR_PROJECT_ID.firebaseapp.com\`

### Custom Domain (Optional)

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. SSL certificate will be auto-provisioned

## Cloud Functions Deployment

### 1. Build Functions

\`\`\`bash
npm run build:functions
\`\`\`

### 2. Set Environment Variables

\`\`\`bash
firebase functions:config:set someservice.key="THE API KEY"
\`\`\`

Or use \`.env\` files with Firebase Functions (recommended):

\`\`\`bash
cd apps/functions
firebase functions:secrets:set SECRET_NAME
\`\`\`

### 3. Deploy Functions

\`\`\`bash
firebase deploy --only functions
\`\`\`

**Selective deployment:**
\`\`\`bash
firebase deploy --only functions:functionName
\`\`\`

## Mobile Deployment

### iOS App Store

#### Prerequisites
- Apple Developer account ($99/year)
- Mac with Xcode
- EAS CLI: \`npm install -g eas-cli\`

#### Steps

1. **Configure EAS**
\`\`\`bash
cd apps/mobile
eas build:configure
\`\`\`

2. **Build for iOS**
\`\`\`bash
eas build --platform ios
\`\`\`

3. **Submit to App Store**
\`\`\`bash
eas submit --platform ios
\`\`\`

### Google Play Store

#### Prerequisites
- Google Play Developer account ($25 one-time)
- EAS CLI: \`npm install -g eas-cli\`

#### Steps

1. **Build for Android**
\`\`\`bash
cd apps/mobile
eas build --platform android
\`\`\`

2. **Submit to Play Store**
\`\`\`bash
eas submit --platform android
\`\`\`

### Over-the-Air (OTA) Updates

For instant updates without app store review:

\`\`\`bash
cd apps/mobile
eas update --branch production
\`\`\`

## Firestore Rules & Indexes

### Deploy Security Rules

\`\`\`bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
\`\`\`

### Deploy Indexes

\`\`\`bash
firebase deploy --only firestore:indexes
\`\`\`

## Environment-Specific Deployments

### Development
\`\`\`bash
firebase use dev
firebase deploy
\`\`\`

### Staging
\`\`\`bash
firebase use staging
firebase deploy
\`\`\`

### Production
\`\`\`bash
firebase use production
firebase deploy
\`\`\`

## Post-Deployment

### 1. Verify Deployment

- [ ] Visit web app URL and test critical flows
- [ ] Check Cloud Functions logs for errors
- [ ] Test mobile app (TestFlight/Internal Testing)
- [ ] Monitor Firebase Console for errors

### 2. Enable Monitoring

- **Performance Monitoring**: Firebase Console → Performance
- **Crashlytics**: For mobile app crash reporting
- **Analytics**: Firebase Analytics for user tracking

### 3. Backup Strategy

\`\`\`bash
# Backup Firestore (requires Blaze plan)
gcloud firestore export gs://[BUCKET_NAME]/backups/$(date +%Y-%m-%d)
\`\`\`

Schedule daily backups using Cloud Scheduler.

## Rollback Procedures

### Web App
\`\`\`bash
firebase hosting:rollback
\`\`\`

### Cloud Functions
Redeploy previous version from git:
\`\`\`bash
git checkout <previous-commit>
firebase deploy --only functions
\`\`\`

### Mobile App
- iOS: Reject build in App Store Connect
- Android: Promote previous version in Play Console
- OTA: \`eas update --branch production --message "Rollback"\`

## CI/CD Integration

### GitHub Actions Example

\`\`\`.yaml
name: Deploy to Firebase
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '\${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '\${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: your-project-id
\`\`\`

## Cost Optimization

- Enable **Firebase Hosting CDN** for faster delivery
- Use **Cloud Scheduler** to shut down unused resources
- Monitor **Firebase Billing** for unexpected costs
- Set **budget alerts** in Google Cloud Console

## Troubleshooting

### Deploy Fails
- Check Firebase CLI version: \`firebase --version\`
- Re-login: \`firebase login --reauth\`
- Check project: \`firebase projects:list\`

### Functions Timeout
- Increase timeout in firebase.json
- Optimize function code
- Use background functions for long tasks

### Mobile Build Fails
- Check EAS build logs
- Verify app.json configuration
- Ensure all native dependencies are compatible

## Security Checklist Before Production

- [ ] Firebase App Check enabled
- [ ] Security rules tested with emulator
- [ ] No API keys in client-side code
- [ ] HTTPS enforced (automatic with Firebase)
- [ ] Rate limiting implemented for sensitive operations
- [ ] User input validation (client + server)
- [ ] SQL injection prevention (use parameterized queries)
- [ ] XSS prevention (sanitize user content)

## Support

- Firebase Status: https://status.firebase.google.com
- Firebase Support: https://firebase.google.com/support
`;
}

function generateContributingGuide(config) {
  return `# Contributing Guide

Thank you for contributing to ${config.displayName || config.projectName}!

## Getting Started

1. **Fork and clone**
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/${config.projectName}.git
cd ${config.projectName}
npm install
\`\`\`

2. **Create a branch**
\`\`\`bash
git checkout -b feature/your-feature-name
\`\`\`

3. **Make your changes**

## Development Workflow

### Code Style

- **TypeScript**: All code must be TypeScript
- **ESLint**: Run \`npm run lint\` before committing
- **Prettier**: Code is auto-formatted on commit

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

\`\`\`
feat: add user profile page
fix: resolve authentication bug
docs: update README
refactor: simplify data hooks
test: add unit tests for validators
\`\`\`

### Testing

\`\`\`bash
# Run all tests
npm test

# Run specific test
npm test -- --match "test name"

# Run with coverage
npm test -- --coverage
\`\`\`

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**: \`npm test\`
4. **Run linter**: \`npm run lint\`
5. **Update TASKS.md** with your changes
6. **Create PR** with clear description

### PR Title Format

\`\`\`
[Type] Brief description

Types: Feature, Fix, Docs, Refactor, Test, Chore
\`\`\`

### Code Review

- PRs require at least 1 approval
- Address all review comments
- Keep PRs focused and small

## Project Structure

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture.

### Key Directories

- \`apps/web/\` - React web application
- \`apps/mobile/\` - React Native mobile app
- \`apps/functions/\` - Firebase Cloud Functions
- \`packages/core/\` - Shared types and validators
- \`packages/ui/\` - Shared UI components
- \`packages/data/\` - Firebase data layer

### Adding New Features

See [.claude/guides/](.claude/guides/) for step-by-step guides:
- Adding a data model
- Adding a new page
- Adding a Cloud Function

## Testing Guidelines

### Unit Tests
- Test pure functions and utilities
- Test validators and helpers
- Mock Firebase services

### Integration Tests
- Test Cloud Functions
- Test security rules
- Test API integrations

### E2E Tests (Future)
- Test critical user flows
- Test across web and mobile

## Security

### Reporting Vulnerabilities

**Do not** open public issues for security vulnerabilities.

Email: security@example.com (Update this!)

### Security Best Practices

- Never commit \`.env\` files
- Never expose API keys in client code
- Always validate user input
- Follow principle of least privilege
- Review security rules changes carefully

## Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for architectural changes
- Add inline comments for complex logic
- Update \`.claude/\` guides if adding patterns

## Questions?

- Check [.claude/guides/](.claude/guides/)
- Review [ARCHITECTURE.md](ARCHITECTURE.md)
- Ask in GitHub Discussions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
`;
}

function generateEnvExamples(config, projectPath) {
  // Web .env.example
  const webEnv = `# Firebase Configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Development
VITE_USE_EMULATOR=false
`;
  fs.writeFileSync(path.join(projectPath, 'apps/web/.env.example'), webEnv);

  // Mobile .env.example
  const mobileEnv = `# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=

# Development
EXPO_PUBLIC_USE_EMULATOR=false
`;
  fs.writeFileSync(path.join(projectPath, 'apps/mobile/.env.example'), mobileEnv);

  // Functions .env.example (if integrations exist)
  if (config.integrations && config.integrations.length > 0) {
    let functionsEnv = `# API Keys for Integrations\n`;
    config.integrations.forEach(int => {
      const name = (int.name || int).toUpperCase().replace('-', '_');
      functionsEnv += `${name}_API_KEY=\n`;
    });
    fs.writeFileSync(path.join(projectPath, 'apps/functions/.env.example'), functionsEnv);
  }

  // Root .gitignore
  const gitignore = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production builds
dist/
build/
lib/
*.log

# Environment
.env
.env.local
.env.*.local
apps/*/.env
apps/*/.env.local

# Firebase
.firebase/
firebase-debug.log
firestore-debug.log
ui-debug.log
functions/lib/

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Expo
apps/mobile/.expo/
apps/mobile/expo-env.d.ts

# Mobile
*.jks
*.p8
*.p12
*.key
*.mobileprovision
`;

  fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);
}
