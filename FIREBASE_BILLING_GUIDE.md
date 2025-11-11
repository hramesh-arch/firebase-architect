# Firebase Billing Setup Guide

## Overview

Firebase offers two pricing plans:

### 🆓 Spark Plan (Free)
- **Cost:** $0/month
- **Best for:** Development, testing, hobby projects
- **Includes:**
  - Firestore Database (limited reads/writes)
  - Authentication
  - Hosting
  - Storage (limited)
  - Realtime Database
- **Limitations:**
  - ❌ No Cloud Functions
  - Limited quotas
  - No external API calls from functions

### 💳 Blaze Plan (Pay as you go)
- **Cost:** Pay for what you use (includes free tier)
- **Best for:** Production apps, apps with Cloud Functions
- **Includes:**
  - Everything in Spark Plan
  - ✅ Cloud Functions
  - ✅ Higher quotas
  - ✅ External API calls
  - ✅ No hard limits (scales with usage)
- **Requires:** Credit card for verification

---

## When Do You Need Billing?

### ✅ You NEED Blaze Plan If:
- You're using **Cloud Functions**
- Your app needs to scale beyond free tier limits
- You need external API calls from backend
- Production app with real users

### ❌ Spark Plan Is Fine If:
- Development/testing only
- Small hobby project
- No Cloud Functions needed
- Within free tier limits

---

## Setup Methods

### Method 1: Firebase Console (Easiest)

**Step-by-step:**

1. **Go to your project:**
   ```
   https://console.firebase.google.com/project/YOUR_PROJECT_ID
   ```

2. **Navigate to Billing:**
   - Click the ⚙️ gear icon (top left)
   - Click "Usage and billing"
   - Click "Details & settings"

3. **Upgrade to Blaze:**
   - Click "Modify plan"
   - Select "Blaze (Pay as you go)"
   - Click "Continue"

4. **Add payment method:**
   - Enter credit/debit card information
   - Set billing alerts (recommended)
   - Review and confirm

5. **Set budget alerts:**
   - Click "Set budget & alerts"
   - Set a monthly budget (e.g., $10, $50, $100)
   - Enable email alerts at 50%, 90%, 100%

**Time:** 5 minutes

---

### Method 2: gcloud CLI (For Automation)

**Prerequisites:**
```bash
# Install gcloud CLI
brew install google-cloud-sdk

# Login
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID
```

**List billing accounts:**
```bash
gcloud billing accounts list
```

**Link billing account to project:**
```bash
gcloud billing projects link YOUR_PROJECT_ID \
  --billing-account=BILLING_ACCOUNT_ID
```

**Check billing status:**
```bash
gcloud billing projects describe YOUR_PROJECT_ID
```

---

### Method 3: Using Firebase Architect Helper

If you want, I can integrate billing setup into the Firebase Architect workflow:

```javascript
import { guideBillingSetup } from './generators/firebase-billing-helper.js';

// During project generation
const billingResult = await guideBillingSetup(projectId);
```

This will:
- Detect if your project needs billing (e.g., has Cloud Functions)
- Guide you through the setup process
- Optionally open Firebase Console for you
- Link existing billing accounts

---

## Cost Estimates

### Free Tier Limits (Blaze Plan includes these for free)

**Firestore:**
- 50K reads/day
- 20K writes/day
- 20K deletes/day
- 1 GB storage

**Cloud Functions:**
- 2M invocations/month
- 400K GB-seconds compute
- 200K GHz-seconds compute
- 5 GB egress

**Storage:**
- 5 GB stored
- 1 GB downloaded/day

**Authentication:**
- Unlimited (free)

### Typical Small App Costs

**Example 1: Simple Todo App (< 1000 users)**
- Monthly cost: **$0-5**
- Easily within free tier

**Example 2: Social App (5,000 users)**
- Firestore: ~$2-5
- Cloud Functions: ~$3-7
- Storage: ~$1-3
- **Total: ~$6-15/month**

**Example 3: Production SaaS (50,000 users)**
- Firestore: ~$50-100
- Cloud Functions: ~$30-60
- Storage: ~$10-20
- **Total: ~$90-180/month**

---

## Setting Budget Alerts (Highly Recommended!)

### Why Budget Alerts?
- Prevents surprise bills
- Alerts you before costs get high
- Helps catch runaway queries or infinite loops

### How to Set Up:

1. **Go to Cloud Console:**
   ```
   https://console.cloud.google.com/billing
   ```

2. **Create budget alert:**
   - Select your billing account
   - Click "Budgets & alerts"
   - Click "CREATE BUDGET"

3. **Configure budget:**
   - Name: "Firebase Monthly Budget"
   - Projects: Select your Firebase project
   - Budget amount: $10 (or your expected monthly cost)
   - Alert thresholds: 50%, 90%, 100%
   - Email recipients: Your email

4. **Save and enable**

---

## Monitoring Costs

### Firebase Console
```
https://console.firebase.google.com/project/YOUR_PROJECT_ID/usage
```

View:
- Current month usage
- Cost breakdown by service
- Historical trends
- Quota usage

### Cloud Console
```
https://console.cloud.google.com/billing
```

More detailed:
- Daily cost breakdown
- Cost by SKU
- Forecasted costs
- Custom reports

---

## Common Questions

### Q: Will I be charged immediately after upgrading to Blaze?
**A:** No, you're only charged for usage beyond the free tier.

### Q: Can I switch back to Spark Plan?
**A:** Yes, but you'll lose Cloud Functions and other Blaze features.

### Q: What if I forget to set a budget and get a huge bill?
**A:**
- Google is usually understanding for first-time mistakes
- Contact Firebase support
- They may waive unexpected charges for legitimate cases
- Always set budget alerts to prevent this!

### Q: Do I need different billing for development/production?
**A:**
- Best practice: Use separate Firebase projects
- Dev project: Can use Spark Plan
- Production project: Use Blaze Plan with budget alerts

### Q: Can I use Firebase for free in production?
**A:**
- Yes, if your app is small and doesn't use Cloud Functions
- But set up billing anyway - you won't be charged until you exceed free tier
- Billing allows scaling if your app suddenly grows

---

## Integration with Firebase Architect

### Option 1: Manual Setup (Current)
After Firebase Architect generates your project:
1. Visit Firebase Console
2. Set up billing manually
3. Takes ~5 minutes

### Option 2: Automated Helper (Available)
I've created a billing helper module. Want me to integrate it into the main workflow?

It would:
- Detect if your project needs billing
- Guide you through setup
- Open Firebase Console automatically
- Link existing billing accounts
- Set up budget alerts

Would you like me to add this to the generator?

---

## Quick Commands

```bash
# Check if billing is enabled
gcloud billing projects describe YOUR_PROJECT_ID

# List your billing accounts
gcloud billing accounts list

# Link billing account
gcloud billing projects link YOUR_PROJECT_ID \
  --billing-account=BILLING_ACCOUNT_ID

# Open Firebase Console billing page
open "https://console.firebase.google.com/project/YOUR_PROJECT_ID/usage"
```

---

## Recommendations

### For Development:
1. ✅ Use Spark Plan (free)
2. ✅ Test without Cloud Functions first
3. ✅ Upgrade to Blaze only when needed

### For Production:
1. ✅ Use Blaze Plan from the start
2. ✅ Set budget alerts immediately
3. ✅ Monitor costs weekly
4. ✅ Optimize queries to reduce costs
5. ✅ Use separate project from development

### Cost Optimization Tips:
1. **Index your Firestore queries** - Reduces reads
2. **Cache data locally** - Reduces Firestore calls
3. **Batch operations** - More efficient
4. **Use Cloud Functions efficiently** - Avoid infinite loops
5. **Monitor usage** - Catch issues early

---

## Need Help?

- **Firebase Pricing:** https://firebase.google.com/pricing
- **Calculator:** https://firebase.google.com/pricing#blaze-calculator
- **Support:** https://firebase.google.com/support
- **Community:** https://stackoverflow.com/questions/tagged/firebase

---

## Summary

**For most Firebase Architect projects:**

1. **Start with Spark Plan (free)** during development
2. **Upgrade to Blaze when:**
   - You add Cloud Functions
   - You're ready to launch
   - You exceed free tier limits
3. **Set budget alerts immediately** after upgrading
4. **Monitor costs monthly** - Usually very affordable

**Total time to set up billing: ~5 minutes**
**Typical cost for small production app: $0-20/month**
