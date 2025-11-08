import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';

export async function generateMonorepo(config) {
  const spinner = ora('Creating monorepo structure...').start();

  // Create package.json for monorepo
  const rootPackage = {
    name: config.projectName,
    version: '1.0.0',
    private: true,
    workspaces: ['apps/*', 'packages/*'],
    scripts: {
      'dev:web': 'npm run dev --workspace=web',
      'dev:mobile': 'npm run start --workspace=mobile',
      'dev:functions': 'npm run serve --workspace=functions',
      'build:web': 'npm run build --workspace=web',
      'build:mobile': 'npm run build --workspace=mobile',
      'build:functions': 'npm run build --workspace=functions',
      'test': 'npm run test --workspaces',
      'lint': 'npm run lint --workspaces',
      'deploy': 'firebase deploy'
    },
    devDependencies: {
      '@typescript-eslint/eslint-plugin': '^6.0.0',
      '@typescript-eslint/parser': '^6.0.0',
      'eslint': '^8.45.0',
      'prettier': '^3.0.0',
      'husky': '^8.0.3',
      'lint-staged': '^14.0.0'
    }
  };

  fs.writeFileSync('package.json', JSON.stringify(rootPackage, null, 2));

  // Create directory structure
  const directories = [
    'apps/web',
    'apps/mobile',
    'apps/functions',
    'packages/core/src',
    'packages/ui/src',
    'packages/data/src',
    '.claude'
  ];

  directories.forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
  });

  spinner.text = 'Generating shared packages...';

  // Generate packages/core
  await generateCorePackage(config);

  // Generate packages/ui
  await generateUIPackage(config);

  // Generate packages/data
  await generateDataPackage(config);

  spinner.text = 'Setting up web app...';
  await generateWebApp(config);

  spinner.text = 'Setting up mobile app...';
  await generateMobileApp(config);

  spinner.text = 'Setting up Cloud Functions...';
  await generateFunctionsApp(config);

  spinner.text = 'Configuring Firebase...';
  await configureFirebase(config);

  spinner.text = 'Installing dependencies...';
  try {
    execSync('npm install', { stdio: 'ignore' });
  } catch (error) {
    spinner.warn('Dependencies installation skipped (run npm install manually)');
  }

  spinner.succeed('Monorepo structure created');
}

async function generateCorePackage(config) {
  const corePackage = {
    name: '@' + config.projectName + '/core',
    version: '1.0.0',
    main: './src/index.ts',
    types: './src/index.ts',
    dependencies: {
      'zod': '^3.22.0'
    }
  };

  fs.writeFileSync('packages/core/package.json', JSON.stringify(corePackage, null, 2));

  // Generate types from data models
  let typesContent = `// Generated types from data models\n\n`;

  if (config.dataModels) {
    config.dataModels.forEach(model => {
      typesContent += `export interface ${model.name} {\n`;
      if (model.fields) {
        model.fields.forEach(field => {
          const optional = field.required ? '' : '?';
          typesContent += `  ${field.name}${optional}: ${mapTypeToTS(field.type)};\n`;
        });
      }
      typesContent += `}\n\n`;
    });
  }

  // Add user roles
  if (config.userRoles) {
    const roles = config.userRoles.map(r => `'${r.role}'`).join(' | ');
    typesContent += `export type UserRole = ${roles};\n\n`;
  }

  typesContent += `export * from './validators';\n`;
  typesContent += `export * from './helpers';\n`;

  fs.writeFileSync('packages/core/src/types.ts', typesContent);

  // Generate Zod validators
  let validatorsContent = `import { z } from 'zod';\n\n`;

  if (config.dataModels) {
    config.dataModels.forEach(model => {
      validatorsContent += `export const ${model.name}Schema = z.object({\n`;
      if (model.fields) {
        model.fields.forEach(field => {
          const zodType = mapTypeToZod(field.type);
          const optional = field.required ? '' : '.optional()';
          validatorsContent += `  ${field.name}: z.${zodType}${optional},\n`;
        });
      }
      validatorsContent += `});\n\n`;
    });
  }

  fs.writeFileSync('packages/core/src/validators.ts', validatorsContent);

  // Generate helpers
  const helpersContent = `// Utility functions\n\nexport function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString();
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
`;

  fs.writeFileSync('packages/core/src/helpers.ts', helpersContent);

  // Index file
  const indexContent = `export * from './types';\nexport * from './validators';\nexport * from './helpers';\n`;
  fs.writeFileSync('packages/core/src/index.ts', indexContent);
}

async function generateUIPackage(config) {
  const uiPackage = {
    name: '@' + config.projectName + '/ui',
    version: '1.0.0',
    main: './src/index.ts',
    dependencies: {
      'react': '^18.2.0',
      'clsx': '^2.0.0'
    }
  };

  fs.writeFileSync('packages/ui/package.json', JSON.stringify(uiPackage, null, 2));

  // Generate basic UI components
  const buttonComponent = `import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
`;

  fs.writeFileSync('packages/ui/src/Button.tsx', buttonComponent);

  const indexContent = `export { Button } from './Button';\n`;
  fs.writeFileSync('packages/ui/src/index.ts', indexContent);
}

async function generateDataPackage(config) {
  const dataPackage = {
    name: '@' + config.projectName + '/data',
    version: '1.0.0',
    main: './src/index.ts',
    dependencies: {
      'firebase': '^10.0.0',
      '@tanstack/react-query': '^5.0.0'
    }
  };

  fs.writeFileSync('packages/data/package.json', JSON.stringify(dataPackage, null, 2));

  // Firebase initialization
  const firebaseInit = `import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
`;

  fs.writeFileSync('packages/data/src/firebase.ts', firebaseInit);

  // Generate hooks for each data model
  if (config.dataModels) {
    let hooksContent = `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';\n\n`;

    config.dataModels.forEach(model => {
      const collectionName = model.collection || model.name.toLowerCase() + 's';

      hooksContent += `// ${model.name} hooks
export function use${model.name}(id: string) {
  return useQuery({
    queryKey: ['${collectionName}', id],
    queryFn: async () => {
      const docRef = doc(db, '${collectionName}', id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    }
  });
}

export function use${model.name}List() {
  return useQuery({
    queryKey: ['${collectionName}'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, '${collectionName}'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  });
}

export function useCreate${model.name}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      return await addDoc(collection(db, '${collectionName}'), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${collectionName}'] });
    }
  });
}

export function useUpdate${model.name}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const docRef = doc(db, '${collectionName}', id);
      return await updateDoc(docRef, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${collectionName}'] });
    }
  });
}

`;
    });

    fs.writeFileSync('packages/data/src/hooks.ts', hooksContent);
  }

  const indexContent = `export * from './firebase';\nexport * from './hooks';\n`;
  fs.writeFileSync('packages/data/src/index.ts', indexContent);
}

async function generateWebApp(config) {
  const webPackage = {
    name: 'web',
    version: '1.0.0',
    type: 'module',
    scripts: {
      'dev': 'vite',
      'build': 'tsc && vite build',
      'preview': 'vite preview',
      'lint': 'eslint src --ext ts,tsx'
    },
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.20.0',
      '@tanstack/react-query': '^5.0.0',
      [`@${config.projectName}/core`]: '*',
      [`@${config.projectName}/ui`]: '*',
      [`@${config.projectName}/data`]: '*'
    },
    devDependencies: {
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@vitejs/plugin-react': '^4.2.0',
      'typescript': '^5.3.0',
      'vite': '^5.0.0',
      'tailwindcss': '^3.4.0',
      'autoprefixer': '^10.4.0',
      'postcss': '^8.4.0'
    }
  };

  fs.writeFileSync('apps/web/package.json', JSON.stringify(webPackage, null, 2));

  // Vite config
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});
`;

  fs.writeFileSync('apps/web/vite.config.ts', viteConfig);

  // tsconfig
  const tsConfig = {
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: ['src'],
    references: [
      { path: '../../packages/core' },
      { path: '../../packages/ui' },
      { path: '../../packages/data' }
    ]
  };

  fs.writeFileSync('apps/web/tsconfig.json', JSON.stringify(tsConfig, null, 2));

  // Create src directory
  fs.mkdirSync('apps/web/src', { recursive: true });

  // Basic App.tsx
  const appTsx = `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-4">${config.displayName || config.projectName}</h1>
      <p className="text-gray-600">Welcome to your new Firebase application!</p>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
`;

  fs.writeFileSync('apps/web/src/App.tsx', appTsx);

  // main.tsx
  const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  fs.writeFileSync('apps/web/src/main.tsx', mainTsx);

  // index.css with Tailwind
  const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;

  fs.writeFileSync('apps/web/src/index.css', indexCss);

  // index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.displayName || config.projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

  fs.writeFileSync('apps/web/index.html', indexHtml);

  // Tailwind config
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;

  fs.writeFileSync('apps/web/tailwind.config.js', tailwindConfig);

  // PostCSS config
  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;

  fs.writeFileSync('apps/web/postcss.config.js', postcssConfig);

  // .env.example
  const envExample = `VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
`;

  fs.writeFileSync('apps/web/.env.example', envExample);
}

async function generateMobileApp(config) {
  const mobilePackage = {
    name: 'mobile',
    version: '1.0.0',
    main: 'index.js',
    scripts: {
      'start': 'expo start',
      'android': 'expo start --android',
      'ios': 'expo start --ios',
      'web': 'expo start --web'
    },
    dependencies: {
      'expo': '~50.0.0',
      'expo-router': '~3.4.0',
      'react': '18.2.0',
      'react-native': '0.73.0',
      'nativewind': '^2.0.11',
      [`@${config.projectName}/core`]: '*',
      [`@${config.projectName}/data`]: '*'
    },
    devDependencies: {
      '@babel/core': '^7.20.0',
      'tailwindcss': '^3.3.2'
    }
  };

  fs.writeFileSync('apps/mobile/package.json', JSON.stringify(mobilePackage, null, 2));

  // app.json
  const appJson = {
    expo: {
      name: config.displayName || config.projectName,
      slug: config.projectName,
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/icon.png',
      userInterfaceStyle: 'light',
      splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: `com.${config.projectName}.app`
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#ffffff'
        },
        package: `com.${config.projectName}.app`
      }
    }
  };

  fs.writeFileSync('apps/mobile/app.json', JSON.stringify(appJson, null, 2));

  // Create app directory
  fs.mkdirSync('apps/mobile/app', { recursive: true });

  // index.tsx
  const indexTsx = `import { View, Text } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">${config.displayName || config.projectName}</Text>
      <Text className="text-gray-600 mt-2">Mobile App</Text>
    </View>
  );
}
`;

  fs.writeFileSync('apps/mobile/app/index.tsx', indexTsx);

  // .env.example
  const envExample = `EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
`;

  fs.writeFileSync('apps/mobile/.env.example', envExample);
}

async function generateFunctionsApp(config) {
  const functionsPackage = {
    name: 'functions',
    version: '1.0.0',
    main: 'lib/index.js',
    engines: {
      node: '18'
    },
    scripts: {
      'build': 'tsc',
      'serve': 'npm run build && firebase emulators:start --only functions',
      'shell': 'npm run build && firebase functions:shell',
      'deploy': 'firebase deploy --only functions',
      'logs': 'firebase functions:log'
    },
    dependencies: {
      'firebase-admin': '^12.0.0',
      'firebase-functions': '^5.0.0',
      [`@${config.projectName}/core`]: '*'
    },
    devDependencies: {
      'typescript': '^5.3.0'
    }
  };

  fs.writeFileSync('apps/functions/package.json', JSON.stringify(functionsPackage, null, 2));

  // Create src directory
  fs.mkdirSync('apps/functions/src', { recursive: true });

  // index.ts
  let functionsIndex = `import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Example HTTP function
export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({ message: 'Hello from ${config.projectName}!' });
});

// Set user role custom claim on account creation
export const setUserRole = functions.auth.user().onCreate(async (user) => {
  await admin.auth().setCustomUserClaims(user.uid, { role: 'agent' });

  // Create user document in Firestore
  await admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    role: 'agent',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
});

`;

  // Add custom functions based on config
  if (config.cloudFunctions) {
    config.cloudFunctions.forEach(func => {
      if (func.type === 'http') {
        functionsIndex += `\n// ${func.description}
export const ${func.name} = functions.https.onRequest((request, response) => {
  // TODO: Implement ${func.name}
  response.json({ message: '${func.name} not implemented' });
});\n`;
      } else if (func.type === 'callable') {
        functionsIndex += `\n// ${func.description}
export const ${func.name} = functions.https.onCall(async (data, context) => {
  // TODO: Implement ${func.name}
  return { success: true };
});\n`;
      }
    });
  }

  fs.writeFileSync('apps/functions/src/index.ts', functionsIndex);

  // tsconfig.json
  const tsConfig = {
    compilerOptions: {
      module: 'commonjs',
      noImplicitReturns: true,
      noUnusedLocals: true,
      outDir: 'lib',
      sourceMap: true,
      strict: true,
      target: 'es2017'
    },
    compileOnSave: true,
    include: ['src']
  };

  fs.writeFileSync('apps/functions/tsconfig.json', JSON.stringify(tsConfig, null, 2));
}

async function configureFirebase(config) {
  // firebase.json
  const firebaseJson = {
    hosting: {
      public: 'apps/web/dist',
      ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
      rewrites: [{ source: '**', destination: '/index.html' }]
    },
    functions: [{
      source: 'apps/functions',
      codebase: 'default',
      runtime: 'nodejs18'
    }],
    firestore: {
      rules: 'firestore.rules',
      indexes: 'firestore.indexes.json'
    },
    storage: {
      rules: 'storage.rules'
    }
  };

  fs.writeFileSync('firebase.json', JSON.stringify(firebaseJson, null, 2));

  // .firebaserc
  const firebaserc = {
    projects: {
      default: config.projectName
    }
  };

  fs.writeFileSync('.firebaserc', JSON.stringify(firebaserc, null, 2));
}

// Helper functions
function mapTypeToTS(type) {
  const typeMap = {
    'string': 'string',
    'number': 'number',
    'boolean': 'boolean',
    'timestamp': 'number',
    'array': 'any[]',
    'object': 'Record<string, any>'
  };
  return typeMap[type.toLowerCase()] || 'any';
}

function mapTypeToZod(type) {
  const typeMap = {
    'string': 'string()',
    'number': 'number()',
    'boolean': 'boolean()',
    'timestamp': 'number()',
    'array': 'array(z.any())',
    'object': 'record(z.string(), z.any())'
  };
  return typeMap[type.toLowerCase()] || 'any()';
}
