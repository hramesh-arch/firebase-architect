# Firebase Architect v3.2 - Quick Reference Card

## 🚀 What's New in v3.2

**Two major features:**
1. ⚡ Autonomous Firebase Configuration
2. 👥 GitHub Collaborator Management

**Result:** 99% automation, 3-5 min setup (down from 10-20 min)

---

## ⚡ Quick Start

### From Claude Code
```
"Create a [project type] app with Firebase.

Team: alice (dev), bob (admin), charlie (viewer)

Auto-configure everything."
```

### From Code
```javascript
import { generateProject } from './firebase-architect/claude-generator.js';

await generateProject({
  projectName: 'my-app',
  platforms: ['web', 'mobile'],

  firebase: {
    create: true,
    autoConfig: true  // NEW!
  },

  github: {
    create: true,
    collaborators: ['alice', 'bob']  // NEW!
  },

  dataModels: [/* ... */]
});
```

---

## 🔧 Configuration Quick Reference

### Firebase Auto-Config

```javascript
firebase: {
  create: true,           // Create Firebase project
  autoConfig: true,       // Enable auto-configuration (default: true)
  projectId: 'my-app'     // Custom project ID (optional)
}
```

**What Gets Auto-Configured:**
- ✅ Firestore Database
- ✅ Authentication (Email/Password + Google)
- ✅ Cloud Storage
- ✅ Firebase config → .env files

**To Disable:**
```javascript
firebase: { create: true, autoConfig: false }
```

### GitHub Collaborators

```javascript
github: {
  create: true,
  visibility: 'private',
  collaborators: [
    'username1',                              // Simple (defaults to 'push')
    { username: 'username2', permission: 'admin' }  // With permission
  ]
}
```

**Permission Levels:**
- `pull` - Read-only
- `push` - Read + Write (default)
- `admin` - Full access
- `maintain` - Maintain repository
- `triage` - Manage issues/PRs

**To Skip:**
```javascript
github: { create: true, collaborators: [] }
```

---

## 📋 Common Patterns

### 1. Full Automation (Recommended)
```javascript
{
  firebase: { create: true, autoConfig: true },
  github: { create: true, collaborators: ['alice', 'bob'] }
}
```

### 2. Firebase Only
```javascript
{
  firebase: { create: true, autoConfig: true },
  github: { create: false }
}
```

### 3. Manual Configuration
```javascript
{
  firebase: { create: true, autoConfig: false },
  github: { create: true, collaborators: [] }
}
```

### 4. Team with Roles
```javascript
{
  github: {
    collaborators: [
      { username: 'lead', permission: 'admin' },
      { username: 'dev1', permission: 'push' },
      { username: 'dev2', permission: 'push' },
      { username: 'viewer', permission: 'pull' }
    ]
  }
}
```

---

## 📊 Time Savings Calculator

| Projects | Before v3.2 | After v3.2 | Time Saved |
|----------|-------------|-----------|------------|
| 1 | 10-20 min | 3-5 min | 7-15 min |
| 5 | 50-100 min | 15-25 min | 35-75 min |
| 10 | 100-200 min | 30-50 min | 70-150 min |
| 50 | 500-1000 min | 150-250 min | 350-750 min |

---

## 🐛 Troubleshooting

### Firebase Auto-Config Not Working

**Check:**
```bash
firebase login
firebase projects:list
```

**Fix:** Ensure you have Firebase project owner permissions

### Collaborators Not Added

**Check:**
```bash
gh auth status
gh auth login
```

**Fix:** Ensure GitHub CLI is authenticated and you have repo admin access

### .env Files Missing

**Manual Fix:**
```bash
cd your-project
firebase apps:sdkconfig WEB
# Copy output to apps/web/.env
```

---

## 📚 Documentation Links

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Getting started |
| [NEW_FEATURES_v3.2.md](NEW_FEATURES_v3.2.md) | Detailed feature guide |
| [MIGRATION_GUIDE_v3.2.md](MIGRATION_GUIDE_v3.2.md) | Upgrade instructions |
| [RELEASE_NOTES_v3.2.md](RELEASE_NOTES_v3.2.md) | Complete release notes |
| [examples/](examples/) | Code examples |

---

## 🎯 Best Practices

✅ **DO:**
- Use auto-config by default
- Specify collaborators upfront
- Test in development first
- Use appropriate permission levels

❌ **DON'T:**
- Disable auto-config unnecessarily
- Give admin access to everyone
- Skip testing before production
- Ignore error messages

---

## 🚦 Upgrade Steps

```bash
# 1. Update Firebase Architect
cd firebase-architect
git pull origin main
npm install

# 2. Verify version
node -e "console.log(require('./package.json').version)"
# Should output: 3.2.0

# 3. Test with example
node examples/autonomous-setup-example.js 1

# 4. Update your code (optional - backward compatible!)
# 5. Start using new features!
```

---

## 💡 Tips

1. **For Speed:** Use auto-config + pre-defined collaborators
2. **For Teams:** Define collaborators in config file (version controlled)
3. **For CI/CD:** Perfect for automated project creation
4. **For Learning:** Use interactive prompts to explore features

---

## 🎓 Examples

### Minimal Setup
```javascript
{
  projectName: 'my-app',
  platforms: ['web'],
  dataModels: [{ name: 'User', fields: [...] }]
}
// Everything else uses defaults (auto-config enabled)
```

### Full-Featured
```javascript
{
  projectName: 'enterprise-app',
  platforms: ['web', 'mobile', 'functions'],

  firebase: {
    create: true,
    autoConfig: true,
    projectId: 'enterprise-app-prod'
  },

  github: {
    create: true,
    visibility: 'private',
    collaborators: [
      { username: 'tech-lead', permission: 'admin' },
      { username: 'dev1', permission: 'push' },
      { username: 'dev2', permission: 'push' },
      { username: 'product-manager', permission: 'maintain' },
      { username: 'stakeholder', permission: 'pull' }
    ]
  },

  dataModels: [/* ... */],
  cloudFunctions: [/* ... */]
}
```

---

## 📞 Getting Help

**Quick Help:**
1. Check this reference card
2. Review examples: `examples/autonomous-setup-example.js`
3. Read docs: [NEW_FEATURES_v3.2.md](NEW_FEATURES_v3.2.md)

**Need More Help:**
- 📖 Full documentation
- 🐛 GitHub Issues
- 💬 GitHub Discussions

---

## ✅ Checklist for First Use

- [ ] Firebase CLI installed and logged in
- [ ] GitHub CLI installed and authenticated
- [ ] Updated to v3.2
- [ ] Read quick reference (you're here!)
- [ ] Reviewed examples
- [ ] Tested with sample project
- [ ] Ready to use in production

---

**Firebase Architect v3.2**
*99% Automation - Setup in 3-5 Minutes*

Last Updated: November 10, 2024
