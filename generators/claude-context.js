import fs from 'fs';
import path from 'path';
import ora from 'ora';

export async function generateClaudeContext(config, projectPath) {
  const spinner = ora('Generating Claude Code context...').start();

  const claudeDir = path.join(projectPath, '.claude');
  fs.mkdirSync(claudeDir, { recursive: true });

  // 1. PROJECT_CONTEXT.md
  const projectContext = generateProjectContext(config);
  fs.writeFileSync(path.join(claudeDir, 'PROJECT_CONTEXT.md'), projectContext);

  // 2. ARCHITECTURE.md (also goes in root)
  const architecture = generateArchitectureDoc(config);
  fs.writeFileSync(path.join(projectPath, 'ARCHITECTURE.md'), architecture);
  fs.writeFileSync(path.join(claudeDir, 'ARCHITECTURE.md'), architecture);

  // 3. TASKS.md
  const tasks = generateTasksDoc(config);
  fs.writeFileSync(path.join(claudeDir, 'TASKS.md'), tasks);

  // 4. GUIDES directory
  const guidesDir = path.join(claudeDir, 'guides');
  fs.mkdirSync(guidesDir, { recursive: true });

  // Generate guides
  generateGuides(config, guidesDir);

  // 5. PROMPTS directory
  const promptsDir = path.join(claudeDir, 'prompts');
  fs.mkdirSync(promptsDir, { recursive: true});

  generatePrompts(config, promptsDir);

  spinner.succeed('Claude Code context generated');
}

function generateProjectContext(config) {
  return `# Project Context for Claude Code

## Project Overview
**Name:** ${config.displayName || config.projectName}
**Type:** ${config.projectType}
**Generated:** ${new Date().toISOString()}

## Description
${config.description || 'A Firebase-powered application with modern web and mobile interfaces.'}

## Architecture Summary
- **Platforms:** ${config.platforms?.join(', ') || 'Web, Mobile, Functions'}
- **Complexity:** ${config.estimatedComplexity || 'Medium'}
- **Firebase Services:** ${config.firebaseServices?.join(', ') || 'Auth, Firestore, Storage, Functions'}

## Key Features
${config.features?.map(f => `- ${f}`).join('\n') || '- Feature implementation in progress'}

## User Roles
${config.userRoles?.map(r => `- **${r.role}**: ${r.description || r.permissions?.join(', ')}`).join('\n') || '- Roles to be defined'}

## Data Models
${config.dataModels?.map(m => `### ${m.name}
Collection: \`${m.collection || m.name.toLowerCase() + 's'}\`
Fields:
${m.fields?.map(f => `- ${f.name}: ${f.type}${f.required ? ' (required)' : ''}`).join('\n') || 'No fields defined'}`).join('\n\n') || 'No data models defined'}

## Tech Stack
${config.recommendedStack ? Object.entries(config.recommendedStack).map(([k, v]) => `- **${k}**: ${v}`).join('\n') : 'Tech stack to be documented'}

## Project Structure
\`\`\`
${config.projectName}/
├── apps/
│   ├── web/          # React + Vite web app
│   ├── mobile/       # React Native + Expo mobile app
│   └── functions/    # Firebase Cloud Functions
├── packages/
│   ├── core/         # Shared types, validators, helpers
│   ├── ui/           # Shared UI components
│   └── data/         # Firebase SDK wrappers, hooks
├── .claude/          # Claude Code context (this directory)
└── firebase.json     # Firebase configuration
\`\`\`

## Getting Started
1. Review ARCHITECTURE.md for detailed system design
2. Check TASKS.md for current development priorities
3. Explore guides/ for how-to documentation
4. Use prompts/ for common code generation tasks

## Important Files
- \`packages/core/src/types.ts\` - TypeScript type definitions
- \`firestore.rules\` - Security rules for database
- \`apps/functions/src/index.ts\` - Cloud Functions entry point

## Development Commands
\`\`\`bash
npm run dev:web      # Start web dev server
npm run dev:mobile   # Start mobile dev server
npm run dev:functions # Start functions emulator
npm run build        # Build all apps
npm run deploy       # Deploy to Firebase
\`\`\`

## Notes for Claude Code
- All shared code is in \`packages/\` directory
- Data models are defined in \`packages/core/src/types.ts\`
- Firebase hooks are in \`packages/data/src/hooks.ts\`
- Security rules follow role-based access control (RBAC)
- Always validate user input using Zod schemas from \`packages/core\`

${config.originalRequirements ? `## Original Requirements
\`\`\`
${config.originalRequirements}
\`\`\`` : ''}
`;
}

function generateArchitectureDoc(config) {
  return `# Architecture Documentation

## System Overview
${config.description || 'Firebase-powered platform with web and mobile clients.'}

## Architecture Diagram
\`\`\`
┌─────────────────────────────────────────────────┐
│                   Clients                        │
├───────────────────┬─────────────────────────────┤
│   Web (React)     │   Mobile (React Native)     │
│   Vite + Router   │   Expo + Expo Router        │
└────────┬──────────┴──────────┬──────────────────┘
         │                     │
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────┐
         │  Shared Packages    │
         ├─────────────────────┤
         │  - core (types)     │
         │  - ui (components)  │
         │  - data (hooks)     │
         └──────────┬──────────┘
                    │
         ┌──────────▼──────────────────┐
         │       Firebase              │
         ├─────────────────────────────┤
         │  - Auth (user management)   │
         │  - Firestore (database)     │
         │  - Storage (files)          │
         │  - Functions (backend)      │
         │  - Hosting (web deploy)     │
         └─────────────────────────────┘
\`\`\`

## Data Flow

### Authentication Flow
1. User signs in via Firebase Auth (web or mobile)
2. Custom claims set by Cloud Function (role: admin/agent)
3. Token includes role for security rules
4. Client stores auth state in React Context/Hook

### Data Access Flow
1. Client uses hooks from \`@${config.projectName}/data\`
2. Hooks use TanStack Query for caching
3. Firestore SDK performs CRUD operations
4. Security rules validate permissions server-side

## Data Models

${config.dataModels?.map(model => `### ${model.name}
**Collection:** \`${model.collection || model.name.toLowerCase() + 's'}\`

**Fields:**
${model.fields?.map(f => {
  const type = f.type;
  const req = f.required ? '✓' : '';
  const def = f.default ? ` (default: ${f.default})` : '';
  return `| ${f.name} | \`${type}\` | ${req} | ${def} |`;
}).join('\n') || 'No fields'}

**Relationships:**
${model.relationships?.map(r => `- ${r.type} with \`${r.model}\` via \`${r.field}\``).join('\n') || 'None'}

**Security Rules:**
- Read: ${model.name.includes('User') ? 'Owner or Admin' : 'Authenticated'}
- Write: ${model.name.includes('User') ? 'Owner or Admin' : 'Admin only'}

**Indexes:**
${model.indexes?.map(idx => `- Composite: [${idx.join(', ')}]`).join('\n') || 'None (auto-indexed)'}
`).join('\n\n') || 'Data models to be defined'}

## Security Architecture

### Authentication
- Firebase Authentication with Email/Password
- Custom claims for role-based access
- Roles: ${config.userRoles?.map(r => r.role).join(', ') || 'admin, agent'}

### Authorization (Firestore Rules)
\`\`\`javascript
// Role-based access control
function isAdmin() {
  return request.auth.token.role == 'admin';
}

function isOwner(userId) {
  return request.auth.uid == userId;
}
\`\`\`

### Data Validation
- Zod schemas in \`packages/core/src/validators.ts\`
- Client-side validation before submission
- Server-side validation in Cloud Functions

## Cloud Functions

${config.cloudFunctions?.map(func => `### ${func.name}
**Type:** ${func.type}
**Description:** ${func.description}
**Trigger:** ${func.type === 'http' ? 'HTTP request' : func.type === 'scheduled' ? 'Cron schedule' : 'Firestore/Auth event'}
`).join('\n') || 'Cloud Functions to be implemented'}

## External Integrations

${config.integrations?.map(int => `### ${int.name || int}
**Purpose:** ${int.purpose || 'To be documented'}
**Implementation:** See \`apps/functions/src/${int.name || int}.ts\`
`).join('\n') || 'No external integrations'}

## Performance Considerations

### Firestore Optimization
- Composite indexes for common queries
- Pagination using \`startAfter\` cursors
- Real-time listeners only for critical data
- Batch writes for bulk operations

### Caching Strategy
- TanStack Query caching on client
- 5-minute stale time for static data
- Optimistic updates for better UX
- Background refetching on window focus

### Bundle Optimization
- Code splitting per route
- Lazy loading for heavy components
- Tree shaking with ES modules
- Tailwind CSS purging

## Deployment

### Web App
\`\`\`bash
npm run build:web
firebase deploy --only hosting
\`\`\`

### Mobile App
\`\`\`bash
cd apps/mobile
eas build --platform all
\`\`\`

### Cloud Functions
\`\`\`bash
npm run build:functions
firebase deploy --only functions
\`\`\`

## Monitoring & Analytics

- Firebase Analytics for user tracking
- Cloud Functions logs via Firebase console
- Error tracking (to be implemented)
- Performance monitoring (to be implemented)

## Estimated Costs (Firebase Free Tier)

- **Firestore:** 50K reads/day, 20K writes/day
- **Auth:** Unlimited users
- **Storage:** 5GB, 1GB/day download
- **Functions:** 125K invocations/month
- **Hosting:** 10GB storage, 360MB/day bandwidth

**Recommendation:** Start on free tier, upgrade to Blaze plan when scaling.

## Future Enhancements

- [ ] Implement e2e testing with Playwright
- [ ] Add error tracking (Sentry)
- [ ] Implement analytics dashboard
- [ ] Add internationalization (i18n)
- [ ] Implement offline support for mobile
- [ ] Add CI/CD pipeline
- [ ] Implement feature flags
- [ ] Add admin audit logs
`;
}

function generateTasksDoc(config) {
  return `# Development Tasks

## Phase 1: MVP (Current)

### Setup & Infrastructure
- [x] Project scaffolding
- [x] Firebase configuration
- [x] Shared packages setup
- [ ] Configure CI/CD pipeline
- [ ] Setup error tracking

### Authentication
- [ ] Implement email/password auth
- [ ] Add role-based access control
- [ ] Create user profile management
- [ ] Add password reset flow

### Data Layer
${config.dataModels?.map(model => `- [ ] Implement ${model.name} CRUD operations
- [ ] Add ${model.name} validation
- [ ] Create ${model.name} hooks`).join('\n') || '- [ ] Define data models'}

### Web Application
- [ ] Build dashboard UI
- [ ] Implement navigation
- [ ] Add responsive layouts
- [ ] Create forms with validation
${config.features?.map(f => `- [ ] Implement ${f}`).join('\n') || ''}

### Mobile Application
- [ ] Setup navigation structure
- [ ] Implement authentication screens
- [ ] Create core UI components
- [ ] Add offline support
- [ ] Implement push notifications

### Cloud Functions
${config.cloudFunctions?.map(func => `- [ ] Implement ${func.name}`).join('\n') || '- [ ] Define Cloud Functions'}

### Security
- [ ] Review and test Firestore rules
- [ ] Review and test Storage rules
- [ ] Implement input validation
- [ ] Add rate limiting
- [ ] Security audit

### Testing
- [ ] Unit tests for core logic
- [ ] Integration tests for API
- [ ] E2E tests for critical flows
- [ ] Security rules tests

## Phase 2: Enhancements

### Features
- [ ] Advanced search and filtering
- [ ] Export functionality
- [ ] Batch operations
- [ ] Email notifications
- [ ] SMS notifications (Twilio)

### Performance
- [ ] Optimize bundle size
- [ ] Implement lazy loading
- [ ] Add service worker for PWA
- [ ] Database query optimization

### UX Improvements
- [ ] Dark mode support
- [ ] Accessibility audit
- [ ] Loading states
- [ ] Error boundaries
- [ ] Toast notifications

## Phase 3: Scale & Polish

### Monitoring
- [ ] Firebase Analytics integration
- [ ] Performance monitoring
- [ ] Error tracking setup
- [ ] Custom analytics events

### DevOps
- [ ] Staging environment
- [ ] Automated deployments
- [ ] Database backups
- [ ] Monitoring alerts

### Documentation
- [ ] API documentation
- [ ] User guides
- [ ] Admin documentation
- [ ] Deployment runbook

## Current Sprint (This Week)

1. **High Priority**
   - Setup Firebase project and configure services
   - Implement authentication flow
   - Create basic UI layouts

2. **Medium Priority**
   - Build data models and hooks
   - Implement first feature

3. **Low Priority**
   - Setup testing framework
   - Write initial documentation

## Blocked Items
- None currently

## Technical Debt
- None currently

## Notes
- Refer to ARCHITECTURE.md for technical decisions
- Check guides/ for implementation patterns
- Use prompts/ for code generation
`;
}

function generateGuides(config, guidesDir) {
  // Guide: Adding a new data model
  const addDataModelGuide = `# Guide: Adding a New Data Model

## Step 1: Define the Type
Edit \`packages/core/src/types.ts\`:

\`\`\`typescript
export interface MyModel {
  id: string;
  name: string;
  createdAt: number;
  userId: string;
}
\`\`\`

## Step 2: Add Validator
Edit \`packages/core/src/validators.ts\`:

\`\`\`typescript
export const MyModelSchema = z.object({
  name: z.string().min(1),
  createdAt: z.number(),
  userId: z.string()
});
\`\`\`

## Step 3: Create Firestore Hooks
Edit \`packages/data/src/hooks.ts\`:

\`\`\`typescript
export function useMyModel(id: string) {
  return useQuery({
    queryKey: ['mymodels', id],
    queryFn: async () => {
      const docRef = doc(db, 'mymodels', id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    }
  });
}
\`\`\`

## Step 4: Add Security Rules
Edit \`firestore.rules\`:

\`\`\`
match /mymodels/{docId} {
  allow read: if isAuthenticated();
  allow create: if isAuthenticated();
  allow update, delete: if isOwner(resource.data.userId);
}
\`\`\`

## Step 5: Deploy Rules
\`\`\`bash
firebase deploy --only firestore:rules
\`\`\`

## Step 6: Use in Components
\`\`\`typescript
import { useMyModel, useCreateMyModel } from '@${config.projectName}/data';

function MyComponent() {
  const { data, isLoading } = useMyModel('id');
  const createMutation = useCreateMyModel();
  // ...
}
\`\`\`
`;

  fs.writeFileSync(path.join(guidesDir, 'adding-data-model.md'), addDataModelGuide);

  // Guide: Adding a new page
  const addPageGuide = `# Guide: Adding a New Page

## Web App (React Router)

### Step 1: Create Page Component
Create \`apps/web/src/pages/MyPage.tsx\`:

\`\`\`typescript
export default function MyPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">My Page</h1>
    </div>
  );
}
\`\`\`

### Step 2: Add Route
Edit \`apps/web/src/App.tsx\`:

\`\`\`typescript
import MyPage from './pages/MyPage';

<Routes>
  <Route path="/my-page" element={<MyPage />} />
</Routes>
\`\`\`

### Step 3: Add Navigation
Add link to your navigation component:

\`\`\`typescript
<Link to="/my-page">My Page</Link>
\`\`\`

## Mobile App (Expo Router)

### Step 1: Create Page
Create \`apps/mobile/app/my-page.tsx\`:

\`\`\`typescript
import { View, Text } from 'react-native';

export default function MyPage() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold">My Page</Text>
    </View>
  );
}
\`\`\`

### Step 2: Navigation
Expo Router auto-generates routes from file structure. Navigate using:

\`\`\`typescript
import { Link } from 'expo-router';

<Link href="/my-page">Go to My Page</Link>
\`\`\`
`;

  fs.writeFileSync(path.join(guidesDir, 'adding-page.md'), addPageGuide);

  // Guide: Adding Cloud Function
  const addFunctionGuide = `# Guide: Adding a Cloud Function

## HTTP Function

Edit \`apps/functions/src/index.ts\`:

\`\`\`typescript
export const myFunction = functions.https.onRequest((request, response) => {
  // Handle request
  response.json({ message: 'Success' });
});
\`\`\`

## Callable Function (recommended for client calls)

\`\`\`typescript
export const myCallable = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be logged in');
  }

  // Verify admin role
  if (context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Admin only');
  }

  // Process request
  return { success: true, data: 'result' };
});
\`\`\`

## Firestore Trigger

\`\`\`typescript
export const onDocCreated = functions.firestore
  .document('collection/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    // Process new document
  });
\`\`\`

## Scheduled Function

\`\`\`typescript
export const dailyJob = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    // Run daily task
  });
\`\`\`

## Call from Client

\`\`\`typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const myCallable = httpsCallable(functions, 'myCallable');

const result = await myCallable({ param: 'value' });
\`\`\`

## Deploy
\`\`\`bash
npm run build:functions
firebase deploy --only functions
\`\`\`
`;

  fs.writeFileSync(path.join(guidesDir, 'adding-cloud-function.md'), addFunctionGuide);
}

function generatePrompts(config, promptsDir) {
  // Prompt: Create CRUD component
  const crudPrompt = `# Prompt: Create CRUD Component

Use this prompt with Claude Code to generate a complete CRUD component:

---

Create a complete CRUD component for the [MODEL_NAME] data model in my ${config.projectName} project.

Requirements:
1. Use the existing hooks from @${config.projectName}/data
2. Include a list view with table
3. Add create/edit modal with form validation
4. Implement delete confirmation
5. Add loading and error states
6. Use Tailwind CSS for styling
7. Include search and filtering
8. Add pagination if needed

The component should follow the existing patterns in the codebase.

Files to create/modify:
- apps/web/src/components/[ModelName]List.tsx
- apps/web/src/components/[ModelName]Form.tsx
- apps/web/src/pages/[ModelName]Page.tsx
`;

  fs.writeFileSync(path.join(promptsDir, 'create-crud-component.md'), crudPrompt);

  // Prompt: Add API integration
  const apiPrompt = `# Prompt: Add External API Integration

Use this with Claude Code to integrate an external API:

---

Add integration for [API_NAME] to my ${config.projectName} project.

Requirements:
1. Create a new Cloud Function for the API calls
2. Add environment variables for API keys
3. Implement error handling and retries
4. Add TypeScript types for API responses
5. Create client-side hooks to call the function
6. Add loading and error states
7. Include rate limiting if needed

Reference the existing Cloud Functions in apps/functions/src/ for patterns.
`;

  fs.writeFileSync(path.join(promptsDir, 'add-api-integration.md'), apiPrompt);

  // Prompt: Implement feature
  const featurePrompt = `# Prompt: Implement New Feature

Use this to guide feature implementation:

---

Implement [FEATURE_NAME] in my ${config.projectName} project.

Context:
- This is a ${config.projectType} project
- Stack: ${config.recommendedStack ? Object.values(config.recommendedStack).join(', ') : 'React, React Native, Firebase'}
- Existing features: ${config.features?.join(', ') || 'See ARCHITECTURE.md'}

Requirements:
1. Follow the existing architecture in ARCHITECTURE.md
2. Use shared packages (@${config.projectName}/core, ui, data)
3. Implement for both web and mobile if applicable
4. Add proper TypeScript types
5. Include form validation if needed
6. Add error handling
7. Write security rules if database access is needed
8. Update TASKS.md when complete

Provide:
- List of files to create/modify
- Step-by-step implementation plan
- Any new dependencies needed
- Security considerations
`;

  fs.writeFileSync(path.join(promptsDir, 'implement-feature.md'), featurePrompt);
}
