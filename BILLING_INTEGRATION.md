# Billing Setup Integration

## Overview

Firebase Architect now includes an **interactive billing setup helper** that guides users through Firebase billing configuration during project generation.

---

## How It Works

### Automatic Detection

The tool automatically detects if your project needs billing by checking for:
- Cloud Functions in the architecture
- `functions` platform specified
- Cloud Functions services enabled

If detected, it will prompt you to set up billing during project generation.

---

## User Experience

### For Projects WITHOUT Cloud Functions

**No prompts shown** - billing not needed for Firestore, Auth, Storage, and Hosting.

```
✅ Firebase project configured
⚡ Auto-configuring Firebase services...
   ✅ Firestore Database - Ready to use
   ✅ Cloud Storage - Bucket created
   ✅ Firebase config - Saved to .env files
```

### For Projects WITH Cloud Functions

**Interactive billing setup:**

```
✅ Firebase project configured
⚡ Auto-configuring Firebase services...
   ✅ Firestore Database - Ready to use
   ✅ Cloud Storage - Bucket created

💳 Firebase Billing Setup

Firebase has two pricing plans:

  1. ✨ Spark Plan (Free)
     - Good for: Development, testing, small apps
     - Limitations: No Cloud Functions

  2. 🚀 Blaze Plan (Pay as you go)
     - Good for: Production apps
     - Includes: Everything + Cloud Functions
     - Cost: Free tier included, then pay for usage

? Do you need to set up billing (Blaze Plan)? (y/N)
```

**If user says YES:**

```
? How would you like to proceed?
  🌐 Open Firebase Console to set up billing now
  🔗 Link to existing billing account (gcloud)
  ⏭️  Skip for now (set up later)
```

**If user chooses "Open Firebase Console":**

```
📋 Opening Firebase Console for billing setup...

   URL: https://console.firebase.google.com/project/my-app/usage

   Steps:
   1. Click "Modify plan"
   2. Select "Blaze (Pay as you go)"
   3. Enter payment information
   4. Review and confirm

[Browser opens automatically]

? Have you completed billing setup? (y/N)
```

---

## Configuration Options

### Enable Billing Helper (Default for Cloud Functions)

```javascript
const architecture = {
  projectName: 'my-app',
  platforms: ['web', 'functions'],

  firebase: {
    create: true,
    autoConfig: true,
    setupBilling: true  // Will prompt if needed (default: true)
  },

  cloudFunctions: [
    { name: 'myFunction', type: 'https' }
  ]
};
```

### Disable Billing Prompts

```javascript
const architecture = {
  firebase: {
    create: true,
    setupBilling: false  // Skip billing prompts
  }
};
```

### Skip for Non-Interactive Environments (CI/CD)

```javascript
// For automated workflows
const architecture = {
  firebase: {
    create: true,
    autoConfig: true,
    setupBilling: false  // Don't prompt in CI/CD
  }
};
```

---

## What the Helper Does

### 1. Checks Current Billing Status

```bash
# Automatically runs:
gcloud billing projects describe YOUR_PROJECT_ID
```

If billing is already enabled, skips prompts:
```
✅ Billing already enabled: My Billing Account
```

### 2. Lists Available Billing Accounts

If user chooses to link an existing account:

```bash
# Automatically runs:
gcloud billing accounts list
```

Shows interactive menu:
```
? Select billing account to link:
  My Personal Account (012345-ABCDEF-678910)
  My Company Account (098765-FEDCBA-123456)
```

### 3. Links Billing Account

```bash
# Automatically runs:
gcloud billing projects link YOUR_PROJECT_ID \
  --billing-account=BILLING_ACCOUNT_ID
```

### 4. Opens Firebase Console

Automatically opens the billing page in your browser for final setup.

---

## Benefits

### For Users
- ✅ **Guided experience** - No need to remember billing setup steps
- ✅ **Auto-detection** - Only prompts when necessary
- ✅ **Time-saving** - Direct links to correct pages
- ✅ **Informative** - Clear cost information upfront
- ✅ **Flexible** - Skip if not ready, set up later

### For Teams
- ✅ **Consistent setup** - Everyone follows same process
- ✅ **No forgotten steps** - Billing configured before deployment
- ✅ **Cost awareness** - Team sees pricing info during setup

### For CI/CD
- ✅ **Non-blocking** - Can disable prompts
- ✅ **Automation-friendly** - Respects non-interactive environments

---

## Cost Information Shown

During setup, users see:

```
Firebase Pricing:

  ✨ Spark Plan (Free)
     - Good for: Development, testing
     - Includes: Firestore, Auth, Storage (with limits)
     - No Cloud Functions

  🚀 Blaze Plan (Pay as you go)
     - Includes FREE tier:
       • 2M Cloud Function invocations/month
       • 50K Firestore reads/day
       • 20K Firestore writes/day
       • 5GB Storage

     - Typical costs:
       • Small app: $0-10/month
       • Medium app: $10-50/month
       • Large app: $50-200/month

     - Budget alerts recommended!
```

---

## Related Documentation

- **[FIREBASE_BILLING_GUIDE.md](FIREBASE_BILLING_GUIDE.md)** - Complete billing guide
- **[generators/firebase-billing-helper.js](generators/firebase-billing-helper.js)** - Implementation
- **[examples/autonomous-setup-example.js](examples/autonomous-setup-example.js)** - Usage examples

---

## Common Scenarios

### Scenario 1: New Developer, First Firebase Project

```
User generates project with Cloud Functions
→ Sees billing prompt explaining Spark vs Blaze
→ Chooses "Open Console"
→ Browser opens to correct page
→ Sets up billing in 5 minutes
→ Returns to confirm completion
→ Project generation continues
```

### Scenario 2: Experienced Developer, Has Billing Account

```
User generates project with Cloud Functions
→ Sees billing prompt
→ Chooses "Link existing account"
→ Selects from list of billing accounts
→ Account linked automatically
→ Completes upgrade in Firebase Console
→ Done!
```

### Scenario 3: Development Environment, No Billing Needed Yet

```
User generates project for testing
→ Sees billing prompt
→ Chooses "Skip for now"
→ Shown reminder to set up billing before deploying functions
→ Project generation continues
```

### Scenario 4: CI/CD Pipeline

```
Pipeline generates project
→ setupBilling: false in config
→ No prompts shown
→ Billing set up separately via gcloud
→ Pipeline completes successfully
```

---

## Future Enhancements

Potential improvements for future versions:

- [ ] Automatic budget alert setup
- [ ] Cost estimation based on architecture
- [ ] Integration with gcloud billing APIs
- [ ] Batch billing setup for multiple projects
- [ ] Team billing account management
- [ ] Billing account templates

---

## Summary

The billing helper provides a **seamless, guided experience** for setting up Firebase billing:

✅ **Smart detection** - Only prompts when needed
✅ **Multiple options** - Console, gcloud, or skip
✅ **Clear information** - Upfront cost transparency
✅ **Time-saving** - Direct links and automation
✅ **Non-blocking** - Can skip and set up later
✅ **CI/CD friendly** - Easy to disable

**Result:** Users set up billing correctly, understand costs, and avoid deployment issues later.
