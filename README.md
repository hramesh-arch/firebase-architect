# Firebase Architect v3.0

**Firebase Environment Setup Tool for Claude Code**

Automatically sets up your complete Firebase development environment - folder structure, Firebase project, Git repo, dependencies, and roadmap. Then hands off to Claude Code to build your application.

## 🎯 What This Does

**Environment Setup (This Tool):**
- ✅ Creates monorepo structure (web + mobile + functions)
- ✅ Sets up Firebase project in the cloud
- ✅ Generates config files and security rules
- ✅ Initializes Git + GitHub repository
- ✅ Installs all dependencies
- ✅ Creates development ROADMAP.md
- ✅ Generates HANDOFF_PROMPT.md for Claude Code

**Feature Development (Claude Code):**
- ✅ Builds React components
- ✅ Implements API endpoints
- ✅ Creates UI screens
- ✅ Adds business logic

**This tool does NOT generate application code - Claude Code does that after setup.**

---

## 📖 Complete Guide

**🟢 [READ THIS FIRST: HOW_TO_USE_FIREBASE_ARCHITECT.md](../HOW_TO_USE_FIREBASE_ARCHITECT.md)**

This comprehensive guide covers:
- Prerequisites and setup
- Directory structure
- How to invoke the tool
- Complete workflow example
- What gets automated
- Troubleshooting
- Tips for best results

---

## ⚡ Quick Start

### 1. Prerequisites (One-Time Setup)
```bash
# Required
npm install -g firebase-tools
firebase login

# Optional but recommended
gh auth login  # For automatic GitHub repo creation
```

### 2. Usage with Claude Code

**Option A: Use the slash command**
```
/new-firebase
```

**Option B: Just describe your app**
```
"Build me a Firebase task management app with teams and projects"
```

Claude Code will:
1. Ask clarifying questions about your requirements
2. Build a complete architecture specification
3. Call the generator tool (`run-generator.js`)
4. Create the full project structure

### 3. What Gets Generated (Automatically)

```
✅ Complete monorepo structure (web + mobile + functions)
✅ TypeScript types from your data models
✅ Zod validation schemas
✅ Firestore security rules with RBAC
✅ TanStack Query hooks for CRUD
✅ Git repository initialized
✅ Dependencies installed
✅ Development roadmap and documentation
```

### 4. Manual Steps (5 minutes)

After generation:
1. Copy `.env.example` to `.env`
2. Enable auth providers in Firebase Console
3. Start development: `npm run dev:web`

**Result: ~85% automated - most manual work is unavoidable Firebase limitations**

---

## Alternative: Command Line

Or run it manually:

## ✨ Key Features

### 🤖 AI-Powered Generation
- Conversational interface guided by Gemini AI
- Parse complex requirements from natural language
- Intelligent data model extraction
- Automatic security rules generation
- Smart TypeScript type inference

### 🏗️ Complete Project Scaffolding
- **Monorepo Structure**: Web + Mobile + Cloud Functions
- **Shared Packages**: Reusable code across platforms
- **TypeScript**: Type-safe across the entire stack
- **Modern Stack**: React, React Native, Vite, Expo
- **Firebase Services**: Auth, Firestore, Storage, Functions

### 🔐 Security First
- Role-based access control (RBAC)
- Firestore security rules auto-generated
- Storage security rules included
- Input validation with Zod schemas
- Custom claims for Firebase Auth

### 📚 Claude Code Integration
- `.claude/` directory with full project context
- Architecture documentation
- Development task breakdown
- Step-by-step implementation guides
- Pre-written prompts for common operations

### 📦 Production Ready
- Complete documentation suite
- Deployment guides (Web, iOS, Android)
- CI/CD examples
- Environment configuration
- Git workflow setup

## 🚀 Quick Start

### Installation

```bash
cd firebase-architect
npm install
```

### Usage

```bash
node index.js
```

You'll be greeted with options:

```
🤖 AI-Guided Setup (Conversational) - Recommended
📋 Quick Setup (Template-based)
✨ Custom from Prompt (Paste detailed requirements)
🔍 Analyze Existing Project
```

## 📖 Usage Modes

### 1. AI-Guided (Conversational)

**Best for:** Learning the system, exploring possibilities

```bash
node index.js
# Choose: AI-Guided Setup

? What are you building?
> A platform for managing jet charter agents with training, CRM, and analytics
```

The AI will:
1. Analyze your requirements
2. Design a complete architecture
3. Show you data models, user roles, and tech stack
4. Ask for confirmation and refinements
5. Generate the complete project

### 2. Custom from Prompt

**Best for:** Detailed requirements, complex projects

```bash
node index.js
# Choose: Custom from Prompt
# Paste your detailed requirements
```

Perfect for pasting specifications like your jet charter example. The AI extracts:
- User roles and permissions
- Data models with relationships
- Required Cloud Functions
- External integrations
- Security requirements

### 3. Template-based

**Best for:** Quick starts, standard patterns

Pre-built templates:
- Single-Page Web App
- Full-Stack Web
- Monorepo Platform (Web + Mobile + Functions)
- Mobile-First
- Healthcare Workflow
- Document Processing

## 🎯 What You Get

### Project Structure

```
your-project/
├── apps/
│   ├── web/              # React + Vite + TypeScript
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   └── App.tsx
│   │   ├── vite.config.ts
│   │   └── package.json
│   ├── mobile/           # React Native + Expo
│   │   ├── app/
│   │   ├── app.json
│   │   └── package.json
│   └── functions/        # Firebase Cloud Functions
│       ├── src/
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
├── packages/
│   ├── core/             # Shared types, validators
│   │   └── src/
│   │       ├── types.ts
│   │       ├── validators.ts
│   │       └── helpers.ts
│   ├── ui/               # Shared UI components
│   │   └── src/
│   │       └── Button.tsx
│   └── data/             # Firebase SDK wrappers
│       └── src/
│           ├── firebase.ts
│           └── hooks.ts
├── .claude/              # Claude Code context
│   ├── PROJECT_CONTEXT.md
│   ├── ARCHITECTURE.md
│   ├── TASKS.md
│   ├── guides/
│   │   ├── adding-data-model.md
│   │   ├── adding-page.md
│   │   └── adding-cloud-function.md
│   └── prompts/
│       ├── create-crud-component.md
│       ├── add-api-integration.md
│       └── implement-feature.md
├── firestore.rules       # Security rules
├── firestore.indexes.json # Database indexes
├── storage.rules         # Storage security
├── firebase.json         # Firebase config
├── ARCHITECTURE.md       # System design docs
├── DEPLOYMENT.md         # Deploy guide
├── CONTRIBUTING.md       # Contribution guide
├── README.md             # Project README
└── package.json          # Monorepo config
```

### Generated Files Include

✅ **TypeScript types** from your data models
✅ **Zod validators** for input validation
✅ **Firestore hooks** (useQuery, useMutation)
✅ **Security rules** with RBAC
✅ **Cloud Functions** with type safety
✅ **React components** with Tailwind CSS
✅ **Mobile screens** with NativeWind
✅ **Complete documentation**

## 🎓 Example: Jet Charter Platform

Let's say you want to build the jet charter agent platform from your requirements. Here's how it works:

### Step 1: Run the tool

```bash
node index.js
# Choose: Custom from Prompt
```

### Step 2: Paste requirements

```
Build a jet charter agent management platform with:
- Agent onboarding and training
- LMS with quizzes and certification
- Agent and client CRM
- Quote management pipeline
- Admin oversight dashboard
- Messaging system
- Analytics and reporting
- Multi-role access (admin, agent)
```

### Step 3: Review architecture

The AI presents:

```
📐 Proposed Architecture

Type: monorepo
Complexity: high

🚀 Platforms:
  • web
  • mobile
  • functions

👥 User Roles:
┌────────┬──────────────────────────────┐
│ Role   │ Permissions                  │
├────────┼──────────────────────────────┤
│ admin  │ read, write, manage_users    │
│ agent  │ read, write_own              │
└────────┴──────────────────────────────┘

📊 Data Models:
  User:
    * email: string
    * role: string
    * certificationStatus: string

  Client:
    * name: string
    * agentId: string
    * email: string

  Quote:
    * clientId: string
    * agentId: string
    * status: string
    * totalPrice: number

... [more models]

? Proceed with this architecture? (Y/n)
```

### Step 4: Generated project

Within minutes, you have:
- Complete monorepo with web, mobile, and functions
- All data models as TypeScript types
- Firestore hooks for every model
- Security rules enforcing RBAC
- Cloud Functions for quiz grading, analytics
- Dashboard UI for both web and mobile
- Complete `.claude/` directory for guided development

### Step 5: Continue with Claude Code

Open the project in VS Code with Claude Code:

```
Your project context is ready!

Check out:
- .claude/PROJECT_CONTEXT.md for overview
- .claude/TASKS.md for development tasks
- .claude/guides/ for how-to guides

Ready to implement your first feature?
```

## 🔧 Configuration

### Environment Variables

Set `GEMINI_API_KEY` for AI features:

```bash
export GEMINI_API_KEY=your_key_here
```

Or provide it when prompted during setup.

### Firebase Prerequisites

- Firebase CLI: `npm install -g firebase-tools`
- Logged in: `firebase login`
- Project created: https://console.firebase.google.com

## 📚 Documentation

- [Architecture Design](docs/ARCHITECTURE.md)
- [CLI Usage](docs/USAGE.md)
- [Generator Reference](docs/GENERATORS.md)
- [Claude Code Integration](docs/CLAUDE_INTEGRATION.md)

## 🤝 Contributing

Firebase Architect is open source! Contributions welcome.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🆚 Comparison

### vs Firebase CLI

| Feature | Firebase CLI | Firebase Architect |
|---------|-------------|-------------------|
| Project init | Manual | AI-guided |
| Data models | Manual | Auto-generated |
| Security rules | Manual | Auto-generated from roles |
| TypeScript types | Manual | Auto-generated |
| Monorepo | Manual | Built-in |
| Mobile support | Separate | Integrated |
| Claude Code context | None | Full integration |
| Documentation | Basic | Complete |

### vs Create React App / Vite

Firebase Architect = CRA/Vite + Firebase + Mobile + Functions + AI + Claude Code

It's a complete platform generator, not just a frontend boilerplate.

## 🎯 Use Cases

Perfect for:
- **SaaS platforms** with web and mobile
- **Internal tools** with admin dashboards
- **Healthcare apps** (HIPAA-ready architecture)
- **E-commerce** with customer and admin portals
- **B2B platforms** with multi-tenant support
- **Social apps** with real-time features

## 🚧 Roadmap

- [ ] Additional project templates
- [ ] Supabase support
- [ ] AWS Amplify support
- [ ] GraphQL API generation
- [ ] Automated testing setup
- [ ] CI/CD pipeline generation
- [ ] Cost estimation tool
- [ ] Existing project analysis

## 💬 Support

- **Issues**: https://github.com/your-repo/issues
- **Discussions**: https://github.com/your-repo/discussions
- **Docs**: https://docs.firebase-architect.dev

## 🙏 Acknowledgments

- **Firebase** - For the incredible backend platform
- **Gemini AI** - For intelligent code generation
- **Claude Code** - For the best AI coding assistant
- **React** & **React Native** - For cross-platform UI
- **Vite** & **Expo** - For amazing DX

---

**Built with Firebase Architect** - From idea to production in minutes.

Get started: `node index.js`
