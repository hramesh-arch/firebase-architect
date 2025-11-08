# Quick Start Guide

Get from idea to working Firebase app in 5 minutes!

## Prerequisites (2 minutes)

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Get Gemini API key (for AI features)
# Visit: https://makersuite.google.com/app/apikey
export GEMINI_API_KEY=your_key_here
```

## Run Firebase Architect (30 seconds)

```bash
cd /Users/harshithramesh/Builds/firebase-architect
npm install
node index.js
```

## Example Session (2 minutes)

### Option 1: AI-Guided (Recommended for first time)

```
🤖 AI Architect Mode

? What are you building?
> A task management app with teams, projects, and real-time collaboration

[AI analyzes...]

📐 Proposed Architecture
Type: monorepo
Platforms: web, mobile, functions

Data Models:
  - Team
  - Project
  - Task
  - User

Firebase Services:
  - Auth, Firestore, Functions

? Proceed with this architecture? Yes

? Project name: task-manager
? Create new Firebase project? Yes

[Generating...]

✅ Setup complete!

Next steps:
1. cd task-manager
2. Review ARCHITECTURE.md
3. Check .claude/ directory
4. npm run dev:web
```

### Option 2: Custom Prompt (Your Jet Charter Example)

```
✨ Custom Prompt Mode

[Paste your jet charter requirements]

[AI analyzes...]

📐 Proposed Architecture
... [shows complete architecture]

? Generate project? Yes

✅ Project created!
```

## What Happens Next (1 minute)

Your generated project includes:

```
task-manager/
├── apps/web/          # Ready to run: npm run dev:web
├── apps/mobile/       # Ready to run: npm run dev:mobile
├── apps/functions/    # Ready to deploy
├── packages/          # Shared code
└── .claude/           # Claude Code guides
```

## Run Your App

```bash
cd task-manager

# Configure Firebase
# 1. Get config from https://console.firebase.google.com
# 2. Update apps/web/.env
# 3. Update apps/mobile/.env

# Start development
npm run dev:web      # http://localhost:3000
```

## Use Claude Code (Recommended)

Open your project in VS Code with Claude Code:

```bash
cd task-manager
code .
```

Claude Code will see the `.claude/` directory and offer:
- Project context and architecture
- Implementation guides
- Task breakdown
- Code generation prompts

Ask Claude:
- "Help me implement user authentication"
- "Add a new data model for Comments"
- "Create a CRUD component for Tasks"

## Deploy (When Ready)

```bash
# Deploy to Firebase
firebase deploy

# Your app is live at:
# https://YOUR_PROJECT.web.app
```

## Example Projects

Try these prompts with Firebase Architect:

### 1. E-commerce Platform
```
A multi-vendor e-commerce platform with:
- Vendor dashboards
- Product catalog with categories
- Shopping cart and checkout
- Order management
- Payment processing (Stripe)
- Admin analytics
```

### 2. Healthcare Portal
```
A patient management system with:
- Patient records
- Appointment scheduling
- Telemedicine (video calls)
- Prescription management
- HIPAA-compliant security
- Multi-role access (doctor, nurse, admin)
```

### 3. Social Network
```
A social platform with:
- User profiles and connections
- Posts and comments
- Real-time messaging
- Notifications
- Media uploads
- Content moderation
```

## Tips

1. **Be Specific**: More detail = better architecture
2. **Mention Roles**: "admin, user, moderator" helps with security rules
3. **List Integrations**: "Stripe, Twilio, SendGrid" generates stubs
4. **Describe Flows**: "user signs up → onboarding → dashboard"

## Troubleshooting

**"Gemini API key required"**
```bash
export GEMINI_API_KEY=your_key_here
```

**"Firebase CLI not found"**
```bash
npm install -g firebase-tools
```

**"Not logged into Firebase"**
```bash
firebase login
```

## Next Steps

After generation:
1. ✅ Review ARCHITECTURE.md
2. ✅ Check .claude/TASKS.md for development plan
3. ✅ Read .claude/guides/ for how-tos
4. ✅ Use .claude/prompts/ with Claude Code
5. ✅ Start building!

## Get Help

- Check `.claude/guides/` in your generated project
- Read the main [README.md](README.md)
- Review [ARCHITECTURE.md](docs/ARCHITECTURE.md) (in generated project)

---

**You're ready!** Run `node index.js` and build something amazing.
