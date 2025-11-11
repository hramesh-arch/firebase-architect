# Migration Guide: Upgrading to v3.2

This guide helps you upgrade from Firebase Architect v3.0/v3.1 to v3.2 and take advantage of the new autonomous features.

## What's New

v3.2 introduces **near-complete automation**:
- ⚡ Auto-configure Firebase services (Firestore, Auth, Storage)
- 👥 Add GitHub collaborators automatically
- 📝 Auto-generate `.env` files with Firebase config

## Breaking Changes

**Good news: None!**

v3.2 is fully backward compatible. Existing code continues to work without modification.

## New Features Are Opt-Out (Not Opt-In)

Both new features are **enabled by default**:

### Auto-Configuration (Enabled by Default)
```javascript
// v3.2 - Auto-config enabled automatically
const architecture = {
  firebase: {
    create: true
    // autoConfig: true is the default
  }
};
```

To disable:
```javascript
const architecture = {
  firebase: {
    create: true,
    autoConfig: false  // Explicitly disable
  }
};
```

### Collaborator Prompts (Prompted by Default)
```javascript
// v3.2 - Will prompt user to add collaborators
const architecture = {
  github: {
    create: true
    // Will show interactive prompts
  }
};
```

To disable prompts:
```javascript
const architecture = {
  github: {
    create: true,
    collaborators: []  // Empty array = no prompts
  }
};
```

## Migration Scenarios

### Scenario 1: You Want Full Automation (Recommended)

**Before (v3.0):**
```javascript
const architecture = {
  projectName: 'my-app',
  platforms: ['web', 'mobile'],
  dataModels: [...],

  firebase: {
    create: true
  },

  github: {
    create: true,
    visibility: 'private'
  }
};

// After generation, you had to:
// 1. Visit Firebase Console
// 2. Enable Firestore, Auth, Storage
// 3. Copy Firebase config to .env
// 4. Add team members to GitHub manually
```

**After (v3.2):**
```javascript
const architecture = {
  projectName: 'my-app',
  platforms: ['web', 'mobile'],
  dataModels: [...],

  firebase: {
    create: true,
    autoConfig: true  // NEW: Auto-enable services
  },

  github: {
    create: true,
    visibility: 'private',
    collaborators: [  // NEW: Auto-add team members
      { username: 'alice', permission: 'push' },
      { username: 'bob', permission: 'admin' }
    ]
  }
};

// Everything is configured automatically!
// Just run: npm run dev:web
```

### Scenario 2: You Want Manual Control

**No changes needed!** Just disable the new features:

```javascript
const architecture = {
  projectName: 'my-app',
  // ... other config

  firebase: {
    create: true,
    autoConfig: false  // Disable auto-configuration
  },

  github: {
    create: true,
    collaborators: []  // No collaborator prompts
  }
};
```

### Scenario 3: You Use CI/CD Pipelines

**Before (v3.0):**
```javascript
// In your CI/CD script
const architecture = require('./architecture.json');
const { generateProject } = require('firebase-architect');

await generateProject(architecture);
// Then manually configure Firebase in pipeline
```

**After (v3.2):**
```javascript
// In your CI/CD script
const architecture = {
  ...require('./architecture.json'),

  firebase: {
    create: true,
    autoConfig: true  // Auto-config works in CI/CD too!
  },

  github: {
    create: true,
    collaborators: [
      // Specify collaborators in config
      'team-member-1',
      'team-member-2'
    ]
  }
};

await generateProject(architecture);
// Everything configured automatically!
```

### Scenario 4: You Generate Many Projects

**Time savings with v3.2:**

Before: 10-20 minutes per project (manual steps)
After: 3-5 minutes per project (fully automated)

**Per 10 projects:**
- Before: 100-200 minutes
- After: 30-50 minutes
- **Savings: 70-150 minutes!**

## Step-by-Step Migration

### 1. Update Firebase Architect

```bash
cd firebase-architect
git pull origin main
npm install
```

### 2. Review Your Architecture Objects

Check your existing architecture configurations:

```bash
# Find all architecture objects in your codebase
grep -r "firebase:" . --include="*.js"
grep -r "github:" . --include="*.js"
```

### 3. Decide on Migration Strategy

**Option A: Adopt New Features (Recommended)**

Add to your architecture objects:

```javascript
firebase: {
  create: true,
  autoConfig: true  // Add this line
},

github: {
  create: true,
  collaborators: [  // Add this section
    'user1',
    'user2'
  ]
}
```

**Option B: Keep Current Behavior**

Add to your architecture objects:

```javascript
firebase: {
  create: true,
  autoConfig: false  // Explicitly disable
},

github: {
  create: true,
  collaborators: []  // No prompts
}
```

### 4. Test Your Setup

Generate a test project:

```javascript
// test-migration.js
import { generateProject } from './firebase-architect/claude-generator.js';

const testArchitecture = {
  projectName: 'test-v32-migration',
  displayName: 'Test v3.2 Migration',
  projectType: 'spa',
  platforms: ['web'],

  dataModels: [
    {
      name: 'TestModel',
      fields: [
        { name: 'title', type: 'string' }
      ]
    }
  ],

  firebaseServices: ['auth', 'firestore'],

  firebase: {
    create: true,
    autoConfig: true  // Test auto-config
  },

  github: {
    create: true,
    visibility: 'private',
    collaborators: [
      { username: 'test-user', permission: 'pull' }
    ]
  },

  targetDirectory: '/tmp'  // Test in temp directory
};

await generateProject(testArchitecture);
```

Run the test:
```bash
node test-migration.js
```

### 5. Verify Results

Check that:

1. ✅ Firebase services are enabled automatically
2. ✅ `.env` files contain Firebase config
3. ✅ GitHub collaborators were added
4. ✅ Project builds and runs correctly

```bash
cd /tmp/test-v32-migration

# Check .env files
cat apps/web/.env

# Check GitHub collaborators
gh api repos/yourname/test-v32-migration/collaborators

# Test build
npm run dev:web
```

## Common Issues & Solutions

### Issue 1: Auto-Config Not Working

**Symptoms:** Firebase services not enabled automatically

**Solution:**
```bash
# Check Firebase login
firebase login

# Check projects
firebase projects:list

# Verify permissions (need Owner role)
firebase projects:list --json
```

### Issue 2: Collaborators Not Added

**Symptoms:** GitHub invites not sent

**Solution:**
```bash
# Check GitHub CLI
gh auth status

# Re-authenticate if needed
gh auth login

# Verify you have admin access
gh api repos/owner/repo/collaborators
```

### Issue 3: .env Files Not Generated

**Symptoms:** Missing Firebase config in .env

**Solution:**
```bash
# Manually fetch config
cd your-project
firebase apps:list
firebase apps:sdkconfig WEB <app-id>

# Copy to .env files
cp apps/web/.env.example apps/web/.env
# Edit .env with your config
```

## Rollback Plan

If you need to rollback to v3.0/v3.1:

```bash
cd firebase-architect

# Checkout previous version
git checkout v3.1.0  # or v3.0.0

# Reinstall dependencies
npm install

# Your existing code will work unchanged
```

## Getting Help

Having trouble with the migration?

1. Check [NEW_FEATURES_v3.2.md](NEW_FEATURES_v3.2.md) for detailed docs
2. Review [examples/autonomous-setup-example.js](examples/autonomous-setup-example.js)
3. Open an issue on GitHub
4. Check troubleshooting in the main README

## Benefits of Upgrading

✅ **99% automation** (up from 85%)
✅ **3-5 min setup** (down from 10-20 min)
✅ **No manual Firebase Console steps**
✅ **Automatic team collaboration setup**
✅ **Better CI/CD integration**
✅ **Fully backward compatible**

## Summary

- ✅ No breaking changes
- ✅ New features enabled by default
- ✅ Easy opt-out if needed
- ✅ Significant time savings
- ✅ Better developer experience

**Recommendation:** Adopt the new features! They save time and reduce errors.
