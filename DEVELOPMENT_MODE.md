# Development Mode Configuration

**Prototype Fast: Role Switching Without Authentication**

---

## The Problem

During prototyping/development:
- ❌ Setting up Firebase Auth slows you down
- ❌ Creating test users is tedious
- ❌ Switching between roles requires logging in/out
- ❌ Security rules block your data access
- ❌ You just want to build features, not auth flows

## The Solution: Development Mode

A special configuration that:
- ✅ **No authentication required** during development
- ✅ **Role switcher UI** - toggle between user types instantly
- ✅ **Open security rules** - read/write everything
- ✅ **Mock user system** - simulate any user without login
- ✅ **Easy migration** - flip a switch for production

---

## Architecture Object Configuration

```javascript
{
  projectName: 'my-prototype',
  displayName: 'My Prototype',
  projectType: 'monorepo',
  platforms: ['web', 'mobile', 'functions'],

  // NEW: Development mode configuration
  developmentMode: {
    enabled: true,
    features: {
      skipAuthentication: true,       // No login required
      mockUsers: true,                // Use fake users
      openSecurityRules: true,        // Allow all reads/writes
      rolesSwitcher: true,            // UI to switch roles
      devDataGenerator: true          // Generate test data
    },

    // Define the roles you want to test
    mockRoles: [
      {
        role: 'admin',
        displayName: 'Admin User',
        email: 'admin@dev.local',
        permissions: ['read', 'write', 'delete', 'manage']
      },
      {
        role: 'manager',
        displayName: 'Manager User',
        email: 'manager@dev.local',
        permissions: ['read', 'write', 'manage-team']
      },
      {
        role: 'user',
        displayName: 'Regular User',
        email: 'user@dev.local',
        permissions: ['read', 'write-own']
      },
      {
        role: 'guest',
        displayName: 'Guest User',
        email: 'guest@dev.local',
        permissions: ['read']
      }
    ]
  },

  // Your regular data models
  dataModels: [
    {
      name: 'Task',
      fields: [
        { name: 'title', type: 'string', required: true },
        { name: 'assigneeId', type: 'string', required: true },
        { name: 'status', type: 'string', required: true }
      ]
    }
  ],

  // Still define roles for when you go to production
  userRoles: [
    { role: 'admin', permissions: ['read', 'write', 'delete'] },
    { role: 'manager', permissions: ['read', 'write'] },
    { role: 'user', permissions: ['read', 'write-own'] },
    { role: 'guest', permissions: ['read'] }
  ]
}
```

---

## What Gets Generated

### 1. Mock Authentication Context

**File:** `packages/data/src/auth/dev-auth.tsx`

```typescript
import React, { createContext, useContext, useState } from 'react';

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

// Mock users based on your configuration
const MOCK_USERS: Record<string, MockUser> = {
  admin: {
    uid: 'dev-admin-001',
    email: 'admin@dev.local',
    displayName: 'Admin User',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage']
  },
  manager: {
    uid: 'dev-manager-001',
    email: 'manager@dev.local',
    displayName: 'Manager User',
    role: 'manager',
    permissions: ['read', 'write', 'manage-team']
  },
  user: {
    uid: 'dev-user-001',
    email: 'user@dev.local',
    displayName: 'Regular User',
    role: 'user',
    permissions: ['read', 'write-own']
  },
  guest: {
    uid: 'dev-guest-001',
    email: 'guest@dev.local',
    displayName: 'Guest User',
    role: 'guest',
    permissions: ['read']
  }
};

export function DevAuthProvider({ children }: { children: React.ReactNode }) {
  // Load saved role from localStorage or default to 'user'
  const savedRole = localStorage.getItem('dev-current-role') || 'user';
  const [currentUser, setCurrentUser] = useState<MockUser>(MOCK_USERS[savedRole]);

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

// Hook that works like Firebase auth but uses mock data
export function useAuth() {
  if (import.meta.env.MODE === 'development') {
    return useDevAuth();
  }
  // In production, use real Firebase auth
  // return useFirebaseAuth();
}

// Helper to check permissions
export function usePermission(permission: string): boolean {
  const { currentUser } = useDevAuth();
  return currentUser?.permissions.includes(permission) || false;
}
```

### 2. Role Switcher Component

**File:** `packages/ui/src/DevRoleSwitcher.tsx`

```typescript
import React from 'react';
import { useDevAuth } from '@myapp/data/auth/dev-auth';

export function DevRoleSwitcher() {
  const { currentUser, switchRole, availableRoles } = useDevAuth();

  // Only show in development
  if (import.meta.env.MODE !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border-2 border-yellow-500 rounded-lg shadow-lg p-4 z-50">
      <div className="text-sm font-bold text-yellow-900 mb-2">
        🔧 DEV MODE - Role Switcher
      </div>

      <div className="text-xs text-yellow-800 mb-2">
        Current: <span className="font-bold">{currentUser?.displayName}</span>
      </div>

      <div className="space-y-1">
        {availableRoles.map((role) => (
          <button
            key={role.uid}
            onClick={() => switchRole(role.role)}
            className={`
              w-full text-left px-3 py-2 rounded text-sm
              ${currentUser?.uid === role.uid
                ? 'bg-yellow-500 text-white font-bold'
                : 'bg-white text-gray-700 hover:bg-yellow-200'
              }
            `}
          >
            <div className="font-medium">{role.role}</div>
            <div className="text-xs opacity-75">{role.email}</div>
          </button>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-yellow-400">
        <div className="text-xs text-yellow-800">
          Permissions:
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
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
  );
}
```

### 3. Open Security Rules (Development)

**File:** `firestore.rules`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // DEVELOPMENT MODE: Allow all access
    // ⚠️ CHANGE THIS BEFORE DEPLOYING TO PRODUCTION!
    match /{document=**} {
      // In development, allow everything
      allow read, write: if request.time < timestamp.date(2025, 12, 31);

      // TODO: When ready for production, replace with:
      // allow read, write: if request.auth != null;
    }

    // PRODUCTION RULES (commented out for dev)
    // Uncomment and customize when moving to production:

    /*
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId ||
                      request.auth.token.role == 'admin';
    }

    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.token.role == 'admin' ||
                               resource.data.assigneeId == request.auth.uid;
    }
    */
  }
}
```

### 4. Environment Variable

**File:** `.env`

```bash
# Development mode flag
VITE_DEV_MODE=true

# When ready for production, set to false
# VITE_DEV_MODE=false
```

### 5. App Setup with Dev Mode

**File:** `apps/web/src/App.tsx`

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevAuthProvider } from '@myapp/data/auth/dev-auth';
import { DevRoleSwitcher } from '@myapp/ui';

const queryClient = new QueryClient();

function App() {
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

  return (
    <QueryClientProvider client={queryClient}>
      {isDevMode ? (
        // Development mode: Use mock auth
        <DevAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Your routes */}
            </Routes>
            {/* Role switcher appears in bottom-right corner */}
            <DevRoleSwitcher />
          </BrowserRouter>
        </DevAuthProvider>
      ) : (
        // Production mode: Use real Firebase auth
        <FirebaseAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </FirebaseAuthProvider>
      )}
    </QueryClientProvider>
  );
}

export default App;
```

### 6. Using Roles in Components

**Example:** `apps/web/src/components/TaskList.tsx`

```typescript
import { useAuth, usePermission } from '@myapp/data/auth/dev-auth';

function TaskList() {
  const { currentUser } = useAuth();
  const canDelete = usePermission('delete');
  const canManage = usePermission('manage');

  return (
    <div>
      <h1>Tasks for {currentUser?.displayName}</h1>

      {/* Show different UI based on role */}
      {canManage && (
        <button>Assign Tasks to Team</button>
      )}

      <div className="tasks">
        {tasks.map(task => (
          <div key={task.id}>
            <h3>{task.title}</h3>

            {/* Only show delete button if user has permission */}
            {canDelete && (
              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Display current user info (dev mode only) */}
      {import.meta.env.VITE_DEV_MODE === 'true' && (
        <div className="mt-4 p-2 bg-gray-100 text-xs">
          <strong>Dev Info:</strong> Logged in as {currentUser?.email}
          ({currentUser?.role})
        </div>
      )}
    </div>
  );
}
```

### 7. Dev Data Generator (Optional)

**File:** `packages/data/src/dev/seed-data.ts`

```typescript
// Generate fake data for testing
export async function seedDevData() {
  if (import.meta.env.MODE !== 'development') {
    console.warn('Cannot seed data in production');
    return;
  }

  console.log('🌱 Seeding development data...');

  // Create sample tasks
  const tasks = [
    {
      title: 'Complete project proposal',
      assigneeId: 'dev-admin-001',
      status: 'in-progress'
    },
    {
      title: 'Review team submissions',
      assigneeId: 'dev-manager-001',
      status: 'pending'
    },
    {
      title: 'Update documentation',
      assigneeId: 'dev-user-001',
      status: 'completed'
    }
  ];

  for (const task of tasks) {
    await addDoc(collection(db, 'tasks'), task);
  }

  console.log('✅ Development data seeded');
}

// Call this on app start in dev mode
if (import.meta.env.VITE_DEV_MODE === 'true') {
  seedDevData();
}
```

---

## User Experience

### What You See During Development:

```
┌─────────────────────────────────────────────────────────┐
│  Your App                                      🔧 DEV   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Dashboard                                              │
│                                                          │
│  Tasks:                                                 │
│  ☐ Complete project (Admin can delete)                 │
│  ☐ Review submissions                                   │
│                                                          │
│                                                          │
│                                              ┌──────────┐│
│                                              │🔧 DEV MODE││
│                                              │Role Switch││
│                                              │          ││
│                                              │Current:  ││
│                                              │Admin User││
│                                              │          ││
│                                              │┌────────┐││
│                                              ││ admin  │││ ← Active
│                                              │└────────┘││
│                                              │┌────────┐││
│                                              ││manager │││ ← Click
│                                              │└────────┘││
│                                              │┌────────┐││
│                                              ││ user   │││ ← Click
│                                              │└────────┘││
│                                              │┌────────┐││
│                                              ││ guest  │││ ← Click
│                                              │└────────┘││
│                                              │          ││
│                                              │Permissions││
│                                              │read write││
│                                              │delete    ││
│                                              └──────────┘│
└─────────────────────────────────────────────────────────┘
```

**Click a role → Instantly switch → UI updates based on permissions**

No login. No logout. Just instant role switching.

---

## Migration to Production

When you're ready to add real authentication:

### Step 1: Update Environment Variable

```bash
# .env
VITE_DEV_MODE=false  # Switch to production mode
```

### Step 2: Uncomment Production Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // PRODUCTION RULES
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId ||
                      request.auth.token.role == 'admin';
    }

    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.token.role == 'admin' ||
                               resource.data.assigneeId == request.auth.uid;
    }
  }
}
```

### Step 3: Implement Real Auth Provider

```typescript
// Already generated, just uncomment:
function App() {
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

  return (
    <QueryClientProvider client={queryClient}>
      {isDevMode ? (
        <DevAuthProvider>...</DevAuthProvider>
      ) : (
        // Use this now:
        <FirebaseAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedDashboard />} />
            </Routes>
          </BrowserRouter>
        </FirebaseAuthProvider>
      )}
    </QueryClientProvider>
  );
}
```

### Step 4: Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

**That's it!** Your app now uses real authentication.

---

## Benefits

### During Development:
✅ **No authentication setup** - Start building immediately
✅ **Instant role switching** - Test all perspectives quickly
✅ **No login/logout dance** - Just click and switch
✅ **Open database** - Read/write anything for testing
✅ **Focus on features** - Not on auth flows
✅ **Fast iteration** - No auth delays

### For Production:
✅ **Easy migration** - One environment variable
✅ **Security rules ready** - Just uncomment them
✅ **Auth provider ready** - Already generated
✅ **Roles defined** - Same roles work in production
✅ **Permissions structure** - Already in your code

---

## Complete Architecture Example

```javascript
const prototypeArchitecture = {
  projectName: 'task-manager-prototype',
  displayName: 'Task Manager',
  projectType: 'monorepo',
  platforms: ['web', 'functions'],

  // Enable dev mode for fast prototyping
  developmentMode: {
    enabled: true,
    features: {
      skipAuthentication: true,
      mockUsers: true,
      openSecurityRules: true,
      rolesSwitcher: true,
      devDataGenerator: true
    },
    mockRoles: [
      { role: 'admin', displayName: 'Admin', permissions: ['read', 'write', 'delete'] },
      { role: 'user', displayName: 'User', permissions: ['read', 'write-own'] }
    ]
  },

  features: [
    'Task management',
    'Team collaboration',
    'File attachments'
  ],

  dataModels: [
    {
      name: 'Task',
      fields: [
        { name: 'title', type: 'string', required: true },
        { name: 'status', type: 'string', required: true },
        { name: 'assigneeId', type: 'string', required: true }
      ]
    }
  ],

  // Define roles for production (used in security rules)
  userRoles: [
    { role: 'admin', permissions: ['read', 'write', 'delete'] },
    { role: 'user', permissions: ['read', 'write-own'] }
  ]
};
```

---

## Command to Enable Dev Mode

When using firebase-architect:

```
Claude: "I'm building a prototype and want to skip authentication during development"

OR

Claude: "Enable development mode with role switching"
```

The tool will:
1. Generate mock auth system
2. Create role switcher UI
3. Set open security rules
4. Add dev mode environment variable
5. Set up easy production migration

---

## FAQ

**Q: Is this secure?**
A: No! But that's the point. It's for **development only**. The security rules have a date limit (expires end of 2025) to prevent accidentally deploying to production.

**Q: Can I use real Firebase Auth alongside this?**
A: Yes! The code is structured so dev mode and production mode are completely separate.

**Q: What if I want some roles in dev but others in production?**
A: Mock roles are just for testing. Production roles come from your `userRoles` configuration.

**Q: How do I test role-specific features?**
A: Just click the role in the switcher. Your UI updates instantly based on the permissions.

**Q: Can I add custom mock users?**
A: Yes! Edit the `MOCK_USERS` object in `dev-auth.tsx` to add more test users.

**Q: Does this work with mobile?**
A: Yes! The same mock auth system works in React Native. The role switcher can be a drawer or modal instead of a floating button.

**Q: What happens if I forget to turn off dev mode in production?**
A: The security rules expire after the date you set, and the role switcher won't render in production mode.

---

## Summary

### Development Mode Gives You:

```
NO authentication   ✅
NO login flows      ✅
NO test users       ✅
NO security rules   ✅
NO waiting          ✅

JUST building       ✅
JUST testing roles  ✅
JUST prototyping    ✅
JUST shipping fast  ✅
```

### One Variable to Switch:

```bash
# Development
VITE_DEV_MODE=true

# Production
VITE_DEV_MODE=false
```

**That's it!** Build your prototype without auth friction, then flip the switch when you're ready for production. 🚀
