import fs from 'fs';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';

/**
 * Generate Development Mode features
 * Enables fast prototyping without authentication
 */
export async function generateDevMode(config, projectPath) {
  if (!config.developmentMode?.enabled) return;

  const spinner = ora('Setting up development mode...').start();

  try {
    // 1. Generate mock authentication system
    await generateMockAuth(config, projectPath);

    // 2. Generate role switcher UI component
    await generateRoleSwitcher(config, projectPath);

    // 3. Update security rules for dev mode
    await generateDevSecurityRules(config, projectPath);

    // 4. Add dev mode environment variable
    await addDevModeEnvVar(projectPath);

    // 5. Generate dev data seeder (optional)
    if (config.developmentMode.features?.devDataGenerator) {
      await generateDataSeeder(config, projectPath);
    }

    // 6. Update App.tsx to use dev mode
    await updateAppWithDevMode(config, projectPath);

    spinner.succeed(chalk.green('Development mode configured'));

    // Show helpful message
    console.log(chalk.cyan('\n📝 Development Mode Features:'));
    console.log(chalk.white('   • Mock authentication (no login required)'));
    console.log(chalk.white('   • Role switcher UI (bottom-right corner)'));
    console.log(chalk.white('   • Open security rules (read/write all)'));
    console.log(chalk.yellow('\n⚠️  Remember: Set VITE_DEV_MODE=false before deploying to production!\n'));

  } catch (error) {
    spinner.fail('Development mode setup failed');
    throw error;
  }
}

/**
 * Generate mock authentication context
 */
async function generateMockAuth(config, projectPath) {
  const authDir = path.join(projectPath, 'packages/data/src/auth');
  fs.mkdirSync(authDir, { recursive: true });

  const mockRoles = config.developmentMode.mockRoles || [
    {
      role: 'admin',
      displayName: 'Admin User',
      email: 'admin@dev.local',
      permissions: ['read', 'write', 'delete']
    },
    {
      role: 'user',
      displayName: 'Regular User',
      email: 'user@dev.local',
      permissions: ['read', 'write-own']
    }
  ];

  // Build MOCK_USERS object
  const mockUsersObj = mockRoles.map((role, index) => {
    return `  ${role.role}: {
    uid: 'dev-${role.role}-${String(index + 1).padStart(3, '0')}',
    email: '${role.email}',
    displayName: '${role.displayName}',
    role: '${role.role}',
    permissions: ${JSON.stringify(role.permissions)}
  }`;
  }).join(',\n');

  const devAuthContent = `import React, { createContext, useContext, useState, useEffect } from 'react';

interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  permissions: string[];
}

interface DevAuthContextType {
  currentUser: MockUser | null;
  switchRole: (role: string) => void;
  availableRoles: MockUser[];
}

const DevAuthContext = createContext<DevAuthContextType | null>(null);

// Mock users for development
const MOCK_USERS: Record<string, MockUser> = {
${mockUsersObj}
};

export function DevAuthProvider({ children }: { children: React.ReactNode }) {
  // Load saved role from localStorage or default to first role
  const defaultRole = Object.keys(MOCK_USERS)[0];
  const [currentUser, setCurrentUser] = useState<MockUser>(() => {
    const savedRole = localStorage.getItem('dev-current-role');
    return MOCK_USERS[savedRole || defaultRole];
  });

  const switchRole = (role: string) => {
    if (MOCK_USERS[role]) {
      setCurrentUser(MOCK_USERS[role]);
      localStorage.setItem('dev-current-role', role);
    }
  };

  const availableRoles = Object.values(MOCK_USERS);

  return (
    <DevAuthContext.Provider value={{ currentUser, switchRole, availableRoles }}>
      {children}
    </DevAuthContext.Provider>
  );
}

export function useDevAuth() {
  const context = useContext(DevAuthContext);
  if (!context) {
    throw new Error('useDevAuth must be used within DevAuthProvider');
  }
  return context;
}

// Hook that returns current user (works in dev and production)
export function useAuth() {
  if (import.meta.env.VITE_DEV_MODE === 'true') {
    return useDevAuth();
  }
  // TODO: In production, return real Firebase auth
  // return useFirebaseAuth();
  throw new Error('Production auth not implemented yet. Set VITE_DEV_MODE=false');
}

// Helper to check if current user has a permission
export function usePermission(permission: string): boolean {
  const { currentUser } = useDevAuth();
  return currentUser?.permissions.includes(permission) || false;
}

// Helper to check if current user has a specific role
export function useRole(role: string): boolean {
  const { currentUser } = useDevAuth();
  return currentUser?.role === role;
}
`;

  fs.writeFileSync(path.join(authDir, 'dev-auth.tsx'), devAuthContent);
}

/**
 * Generate role switcher UI component
 */
async function generateRoleSwitcher(config, projectPath) {
  const uiDir = path.join(projectPath, 'packages/ui/src');
  fs.mkdirSync(uiDir, { recursive: true });

  const roleSwitcherContent = `import React, { useState } from 'react';

interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  permissions: string[];
}

interface DevAuthContextType {
  currentUser: MockUser | null;
  switchRole: (role: string) => void;
  availableRoles: MockUser[];
}

// This component is only visible in development mode
export function DevRoleSwitcher() {
  // Only render in development mode
  if (import.meta.env.VITE_DEV_MODE !== 'true') {
    return null;
  }

  // Dynamically import dev auth to avoid bundle in production
  const { useDevAuth } = require('@${config.projectName}/data/auth/dev-auth');
  const { currentUser, switchRole, availableRoles } = useDevAuth();
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-600 z-50"
      >
        🔧 Dev Tools
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border-2 border-yellow-500 rounded-lg shadow-lg w-72 z-50">
      <div className="bg-yellow-500 text-white px-4 py-2 rounded-t-md flex justify-between items-center">
        <span className="font-bold text-sm">🔧 DEV MODE</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-yellow-200"
        >
          ✕
        </button>
      </div>

      <div className="p-4">
        <div className="text-xs text-yellow-800 mb-2 font-medium">
          Current User
        </div>
        <div className="bg-white rounded p-2 mb-3">
          <div className="font-bold text-sm">{currentUser?.displayName}</div>
          <div className="text-xs text-gray-600">{currentUser?.email}</div>
          <div className="text-xs text-gray-500 mt-1">Role: {currentUser?.role}</div>
        </div>

        <div className="text-xs text-yellow-800 mb-2 font-medium">
          Switch Role
        </div>
        <div className="space-y-1 mb-3">
          {availableRoles.map((role) => (
            <button
              key={role.uid}
              onClick={() => switchRole(role.role)}
              className={\`
                w-full text-left px-3 py-2 rounded text-sm transition-colors
                \${currentUser?.uid === role.uid
                  ? 'bg-yellow-500 text-white font-medium'
                  : 'bg-white text-gray-700 hover:bg-yellow-200 border border-gray-200'
                }
              \`}
            >
              <div className="font-medium">{role.role}</div>
              <div className="text-xs opacity-75">{role.displayName}</div>
            </button>
          ))}
        </div>

        <div className="border-t border-yellow-400 pt-2">
          <div className="text-xs text-yellow-800 mb-1 font-medium">
            Permissions
          </div>
          <div className="flex flex-wrap gap-1">
            {currentUser?.permissions.map((perm) => (
              <span
                key={perm}
                className="px-2 py-0.5 bg-yellow-500 text-white text-xs rounded"
              >
                {perm}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 px-4 py-2 text-xs text-yellow-800 rounded-b-md">
        ⚠️ Disable dev mode before production
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(uiDir, 'DevRoleSwitcher.tsx'), roleSwitcherContent);

  // Update ui package index to export the component
  const uiIndexPath = path.join(uiDir, 'index.ts');
  let uiIndexContent = '';
  if (fs.existsSync(uiIndexPath)) {
    uiIndexContent = fs.readFileSync(uiIndexPath, 'utf-8');
  }
  if (!uiIndexContent.includes('DevRoleSwitcher')) {
    uiIndexContent += `export { DevRoleSwitcher } from './DevRoleSwitcher';\n`;
    fs.writeFileSync(uiIndexPath, uiIndexContent);
  }
}

/**
 * Generate development security rules (open access)
 */
async function generateDevSecurityRules(config, projectPath) {
  const rulesPath = path.join(projectPath, 'firestore.rules');

  // Calculate expiration date (1 year from now)
  const expDate = new Date();
  expDate.setFullYear(expDate.getFullYear() + 1);
  const year = expDate.getFullYear();
  const month = expDate.getMonth() + 1;
  const day = expDate.getDate();

  const devRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ⚠️ DEVELOPMENT MODE - OPEN ACCESS ⚠️
    // This allows all reads and writes for prototyping
    // IMPORTANT: Change this before deploying to production!

    match /{document=**} {
      // Allow all access until expiration date
      // This prevents accidentally leaving dev mode in production
      allow read, write: if request.time < timestamp.date(${year}, ${month}, ${day});

      // After expiration, all access is denied
      // This forces you to implement proper security rules
    }

    // ========================================
    // PRODUCTION RULES (Uncomment when ready)
    // ========================================

    /*
${generateProductionRulesComments(config)}
    */
  }
}
`;

  fs.writeFileSync(rulesPath, devRules);
}

/**
 * Generate commented production rules based on data models
 */
function generateProductionRulesComments(config) {
  if (!config.dataModels || config.dataModels.length === 0) {
    return `    // Define your production rules here
    // Example:
    // match /users/{userId} {
    //   allow read: if request.auth != null;
    //   allow write: if request.auth.uid == userId;
    // }`;
  }

  return config.dataModels.map(model => {
    const collection = model.collection || model.name.toLowerCase() + 's';
    return `    // ${model.name} collection
    // match /${collection}/{docId} {
    //   allow read: if request.auth != null;
    //   allow write: if request.auth.token.role == 'admin';
    // }`;
  }).join('\n\n');
}

/**
 * Add dev mode environment variable
 */
async function addDevModeEnvVar(projectPath) {
  const envExamplePath = path.join(projectPath, 'apps/web/.env.example');
  let envContent = '';

  if (fs.existsSync(envExamplePath)) {
    envContent = fs.readFileSync(envExamplePath, 'utf-8');
  }

  if (!envContent.includes('VITE_DEV_MODE')) {
    envContent = `# Development Mode
# Set to 'true' for prototyping without authentication
# Set to 'false' for production with real auth
VITE_DEV_MODE=true

` + envContent;

    fs.writeFileSync(envExamplePath, envContent);
  }

  // Also create actual .env file
  const envPath = path.join(projectPath, 'apps/web/.env');
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, 'VITE_DEV_MODE=true\n');
  }
}

/**
 * Generate development data seeder
 */
async function generateDataSeeder(config, projectPath) {
  const devDir = path.join(projectPath, 'packages/data/src/dev');
  fs.mkdirSync(devDir, { recursive: true });

  const seederContent = `import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Seed development data
 * Only runs in development mode
 */
export async function seedDevData() {
  if (import.meta.env.VITE_DEV_MODE !== 'true') {
    console.warn('⚠️  Cannot seed data - not in development mode');
    return;
  }

  console.log('🌱 Seeding development data...');

  try {
${generateSeedDataForModels(config)}

    console.log('✅ Development data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

// Uncomment to auto-seed on app start
// if (import.meta.env.VITE_DEV_MODE === 'true') {
//   seedDevData();
// }
`;

  fs.writeFileSync(path.join(devDir, 'seed-data.ts'), seederContent);
}

/**
 * Generate seed data based on data models
 */
function generateSeedDataForModels(config) {
  if (!config.dataModels || config.dataModels.length === 0) {
    return `    // Add your seed data here
    // Example:
    // await addDoc(collection(db, 'items'), {
    //   name: 'Sample Item',
    //   createdAt: Date.now()
    // });`;
  }

  return config.dataModels.map(model => {
    const collection = model.collection || model.name.toLowerCase() + 's';
    const sampleData = generateSampleData(model);

    return `    // Seed ${model.name} data
    const sample${model.name} = ${JSON.stringify(sampleData, null, 4)};
    await addDoc(collection(db, '${collection}'), sample${model.name});`;
  }).join('\n\n');
}

/**
 * Generate sample data for a model
 */
function generateSampleData(model) {
  const data = {};

  if (model.fields) {
    model.fields.forEach(field => {
      if (field.name === 'id' || field.name === 'uid') return;

      switch (field.type) {
        case 'string':
          data[field.name] = `Sample ${field.name}`;
          break;
        case 'number':
          data[field.name] = 0;
          break;
        case 'boolean':
          data[field.name] = false;
          break;
        case 'timestamp':
          data[field.name] = 'Date.now()';
          break;
        case 'array':
          data[field.name] = [];
          break;
        case 'object':
          data[field.name] = {};
          break;
        default:
          data[field.name] = null;
      }
    });
  }

  return data;
}

/**
 * Update App.tsx to use dev mode
 */
async function updateAppWithDevMode(config, projectPath) {
  const appPath = path.join(projectPath, 'apps/web/src/App.tsx');

  if (!fs.existsSync(appPath)) {
    console.warn('⚠️  App.tsx not found, skipping dev mode integration');
    return;
  }

  const appContent = `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevAuthProvider } from '@${config.projectName}/data/auth/dev-auth';
import { DevRoleSwitcher } from '@${config.projectName}/ui';

const queryClient = new QueryClient();

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-4">${config.displayName || config.projectName}</h1>
      <p className="text-gray-600">Welcome to your Firebase application!</p>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          🔧 Development Mode Active
        </h2>
        <p className="text-sm text-blue-800">
          Use the role switcher in the bottom-right corner to test different user perspectives.
        </p>
      </div>
    </div>
  );
}

function App() {
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

  return (
    <QueryClientProvider client={queryClient}>
      {isDevMode ? (
        <DevAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
            <DevRoleSwitcher />
          </BrowserRouter>
        </DevAuthProvider>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      )}
    </QueryClientProvider>
  );
}

export default App;
`;

  fs.writeFileSync(appPath, appContent);
}

export default generateDevMode;
