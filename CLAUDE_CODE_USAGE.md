# Using Firebase Architect with Claude Code

This is the **recommended way** to set up your Firebase project environment.

**Firebase Architect** sets up your environment → **Claude Code** builds your features

---

## 🚀 Quick Start

### **Step 1: Open parent directory in VS Code**
```bash
cd /home/user
code .
```

### **Step 2: Invoke the setup wizard**

Type the slash command:
```
/new-firebase-app
```

Or just describe what you want:
```
"Build me a task management app with teams, projects,
and real-time collaboration. Web and mobile apps."
```

### **Step 3: Describe your app**

Claude Code will ask:
```
Tell me about your app - what are you building?
```

Give a detailed description:
```
"I'm building TaskMaster, a team task management platform where
companies can create projects, assign tasks to team members, track
progress with real-time updates, and view analytics dashboards.
We need both web and mobile apps. Admins can manage everything,
regular users only see their assigned tasks. Use Google and email
authentication."
```

### **Step 4: Answer clarifying questions**

Claude Code will only ask about missing details:
```
- Should tasks support comments or file attachments?
- Any integrations needed (Stripe, SendGrid, etc.)?
- Mobile: iOS, Android, or both?
```

### **Step 5: Environment setup (automatic)**

Firebase Architect runs and sets up:
```
📁 Phase 1: Generating project structure...
✅ Monorepo created (web + mobile + functions)
✅ Claude Code context files generated
✅ Firestore security rules generated
✅ TypeScript types generated

🔥 Phase 2: Setting up Firebase...
✅ Firebase project created
✅ Firebase Web App created
✅ Firebase config saved to .env.example

📦 Phase 3: Installing dependencies...
✅ All dependencies installed

🚀 Phase 4: Deploying Firebase resources...
✅ Firestore rules deployed
✅ Firestore indexes deployed

📦 Phase 5: Setting up version control...
✅ Git repository initialized
✅ GitHub repository created

🎉 Setup Complete!
```

### **Step 6: Claude Code starts building**

Claude reads the handoff prompt and begins feature development:
```
I've reviewed your project setup. Environment is fully configured!

Starting Phase 1: Authentication System

Creating:
- Auth context provider
- Login/signup forms
- Protected route wrapper
- User profile components

[Claude builds all the features...]
```

---

## 💬 Example Conversations

### **Example 1: E-commerce Platform**

**You:**
```
/new-firebase-app
```

**Claude:**
```
Tell me about your app - what are you building?
```

**You:**
```
I'm building an e-commerce platform with:
- Product catalog with categories and search
- Shopping cart and checkout
- Order management and tracking
- Admin dashboard for inventory
- Customer reviews and ratings
- Stripe payment integration
- Both web and mobile apps
```

**Claude:**
```
Great! A few clarifying questions:

- Should vendors be able to add their own products (marketplace style)?
- Do you need real-time inventory updates?
- Email notifications for orders via SendGrid?
```

**You:**
```
Yes to all three!
```

**Claude:**
```
Perfect! Setting up your environment...

[Runs firebase-architect]

✅ Environment ready at /home/user/ecommerce-platform/

I've set up:
- Data Models: Product, Order, Cart, Review, Vendor, Customer
- User Roles: Admin, Vendor, Customer
- Integrations: Stripe, SendGrid
- Firestore security rules for marketplace

Now building the product catalog...
```

---

### **Example 2: Healthcare Portal**

**You:**
```
Build me a telemedicine platform with patient and doctor portals,
video consultations, prescription management, and appointment scheduling.
Web app only. HIPAA-compliant security.
```

**Claude:**
```
I'll create a telemedicine platform. A few questions:

- Video consultations via Twilio or another service?
- Should prescriptions integrate with pharmacies?
- Insurance claim tracking needed?
```

**You:**
```
Use Twilio. No pharmacy integration yet. Yes to insurance tracking.
```

**Claude:**
```
Setting up your healthcare platform...

[Runs firebase-architect]

✅ Environment ready at /home/user/telemedicine-portal/

I've configured:
- Data Models: Patient, Doctor, Appointment, Prescription, InsuranceClaim
- User Roles: Doctor, Nurse, Patient, Admin
- Integrations: Twilio (video), SendGrid (notifications)
- HIPAA-compliant Firestore security rules
- Audit logging for all data access

Now building the patient portal...
```

---

## 🎯 What Gets Automated

### Environment Setup (Firebase Architect)
- ✅ Project folder structure
- ✅ Firebase project creation
- ✅ Firebase Web App creation
- ✅ **Firebase config auto-fetched** (no copy/paste!)
- ✅ Firestore security rules (generated & deployed)
- ✅ TypeScript types for data models
- ✅ Git + GitHub repository
- ✅ All dependencies installed
- ✅ Development roadmap

### Feature Development (Claude Code)
- ✅ React components
- ✅ API endpoints
- ✅ Cloud Functions
- ✅ UI screens
- ✅ Business logic
- ✅ Tests

**Result: You describe what you want, everything gets built!**

---

## 📋 What Claude Code Can Do After Setup

Once the environment is ready, Claude Code can:

1. **Read the handoff prompt** - Complete context about your app
2. **Follow the roadmap** - Phase-by-phase development plan
3. **Build features** - Implement according to architecture
4. **Adapt to feedback** - "Actually, use Zustand instead of Context API"
5. **Fix bugs** - Debug and resolve issues
6. **Add tests** - Write unit and integration tests
7. **Optimize** - Improve performance and code quality

---

## 🔑 Key Advantages

### vs. Manual Setup
- ❌ Manual: 2-3 hours of setup before coding
- ✅ Claude: 2 minutes setup, immediate development

### vs. Templates
- ❌ Templates: Rigid structure, outdated dependencies
- ✅ Claude: Custom architecture, latest best practices

### vs. Code Generators
- ❌ Generators: Generic boilerplate, modify everything
- ✅ Claude: Tailored to your exact requirements

---

## 📖 Additional Resources

- **[HOW_TO_USE_FIREBASE_ARCHITECT.md](../HOW_TO_USE_FIREBASE_ARCHITECT.md)** - Complete guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick reference
- **[START_HERE.md](START_HERE.md)** - Getting started

---

## ❓ Common Questions

**Q: Does Claude Code generate all the application code?**
Yes! After Firebase Architect sets up the environment, Claude Code builds all your features.

**Q: Can I customize the generated code?**
Absolutely! Just tell Claude what changes you want, and it will adapt.

**Q: What if I need to add a feature later?**
Just describe the new feature to Claude, and it will implement it.

**Q: Do I need any API keys?**
No Gemini API key needed. Just Firebase CLI (for setup) and gh CLI (optional, for GitHub).

**Q: Can I use this for existing projects?**
This is for new projects only. It creates the complete structure from scratch.

---

**Ready to build?** Open Claude Code and type `/new-firebase-app` 🚀
