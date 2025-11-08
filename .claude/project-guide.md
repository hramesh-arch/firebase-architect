# Firebase Architect - Claude Code Integration Guide

## Overview

Firebase Architect is designed to work seamlessly WITH Claude Code. When a user asks you to create a Firebase project, you (Claude Code) handle the AI analysis, and Firebase Architect handles the code generation.

## How It Works

### User Request
```
User: "Create a jet charter agent management platform with training, CRM, and analytics"
```

### Your Role (Claude Code)
1. **Analyze Requirements** - You understand what they're building
2. **Extract Architecture** - You identify:
   - Data models (User, Client, Quote, TrainingModule, etc.)
   - User roles (admin, agent, master_qa)
   - Relationships (Client belongs to Agent, Quote belongs to Client)
   - Required Cloud Functions (quiz grading, analytics aggregation)
   - External integrations (Avinode, Stellar, Stripe, Twilio)
   - Security requirements (RBAC, agent can only see their data)

3. **Call the Generator** - You invoke `claude-generator.js` with the architecture

4. **Continue Guiding** - After generation, you help them implement features using the `.claude/` context

## Architecture Schema

When calling the generator, provide this structure:

```javascript
{
  projectName: "jet-charter",
  displayName: "Jet Charter Platform",
  description: "Agent management platform for jet charter operations",
  projectType: "monorepo",  // spa|fullstack-web|monorepo|mobile
  platforms: ["web", "mobile", "functions"],

  // Optional: Where to create the project (defaults to /Users/harshithramesh/Builds)
  targetDirectory: "/Users/harshithramesh/Builds",

  // Optional: Git configuration
  git: {
    init: true,              // Initialize git repo (default: true)
    initialCommit: true,     // Create initial commit (default: true)
    remote: "git@github.com:user/repo.git",  // Optional: Git remote URL
    push: false              // Auto-push to remote (default: false, ask user first)
  },

  features: [
    "Agent onboarding and training",
    "LMS with quizzes and certification",
    "Agent CRM for managing clients",
    "Client contact management",
    "Quote pipeline management",
    "Admin dashboard with analytics",
    "Broadcast messaging",
    "Role-based access control"
  ],

  userRoles: [
    {
      role: "admin",
      permissions: ["read_all", "write_all", "manage_users"],
      description: "Full system access"
    },
    {
      role: "agent",
      permissions: ["read_own", "write_own", "create_clients", "create_quotes"],
      description: "Manage own clients and quotes"
    },
    {
      role: "master_qa",
      permissions: ["read_all", "review_submissions"],
      description: "QA oversight"
    }
  ],

  dataModels: [
    {
      name: "User",
      collection: "users",
      fields: [
        { name: "uid", type: "string", required: true },
        { name: "email", type: "string", required: true },
        { name: "displayName", type: "string", required: true },
        { name: "role", type: "string", required: true },
        { name: "region", type: "string", required: false },
        { name: "certificationStatus", type: "string", required: true },
        { name: "createdAt", type: "timestamp", required: true },
        { name: "updatedAt", type: "timestamp", required: true }
      ],
      indexes: [["role", "createdAt"]]
    },
    {
      name: "Client",
      collection: "clients",
      fields: [
        { name: "id", type: "string", required: true },
        { name: "agentId", type: "string", required: true },
        { name: "name", type: "string", required: true },
        { name: "email", type: "string", required: false },
        { name: "phone", type: "string", required: false },
        { name: "notes", type: "string", required: false },
        { name: "tags", type: "array", required: false },
        { name: "createdAt", type: "timestamp", required: true },
        { name: "updatedAt", type: "timestamp", required: true }
      ],
      relationships: [
        { model: "User", type: "manyToOne", field: "agentId" }
      ],
      indexes: [["agentId", "createdAt"]]
    },
    {
      name: "Quote",
      collection: "quotes",
      fields: [
        { name: "id", type: "string", required: true },
        { name: "clientId", type: "string", required: true },
        { name: "agentId", type: "string", required: true },
        { name: "route", type: "object", required: true },
        { name: "aircraftType", type: "string", required: false },
        { name: "totalPrice", type: "number", required: false },
        { name: "status", type: "string", required: true },
        { name: "notes", type: "string", required: false },
        { name: "createdAt", type: "timestamp", required: true },
        { name: "updatedAt", type: "timestamp", required: true }
      ],
      relationships: [
        { model: "Client", type: "manyToOne", field: "clientId" },
        { model: "User", type: "manyToOne", field: "agentId" }
      ],
      indexes: [["agentId", "status", "createdAt"], ["clientId", "createdAt"]]
    },
    {
      name: "TrainingModule",
      collection: "trainingModules",
      fields: [
        { name: "id", type: "string", required: true },
        { name: "title", type: "string", required: true },
        { name: "slug", type: "string", required: true },
        { name: "contentUrl", type: "string", required: false },
        { name: "order", type: "number", required: true },
        { name: "quiz", type: "object", required: true },
        { name: "createdAt", type: "timestamp", required: true },
        { name: "updatedAt", type: "timestamp", required: true }
      ],
      indexes: [["order"]]
    },
    {
      name: "Message",
      collection: "messages",
      fields: [
        { name: "id", type: "string", required: true },
        { name: "fromUserId", type: "string", required: true },
        { name: "toUserId", type: "string", required: false },
        { name: "isBroadcast", type: "boolean", required: true },
        { name: "content", type: "string", required: true },
        { name: "createdAt", type: "timestamp", required: true }
      ],
      indexes: [["toUserId", "createdAt"], ["isBroadcast", "createdAt"]]
    }
  ],

  firebaseServices: ["auth", "firestore", "storage", "functions", "hosting"],

  cloudFunctions: [
    {
      name: "setUserRole",
      type: "callable",
      description: "Set custom claim for user role (admin only)"
    },
    {
      name: "submitQuiz",
      type: "callable",
      description: "Grade quiz answers and update certification status"
    },
    {
      name: "generateDailyAnalytics",
      type: "scheduled",
      description: "Aggregate daily stats for agents and global metrics"
    },
    {
      name: "sendBroadcastMessage",
      type: "callable",
      description: "Send message to all agents (admin only)"
    },
    {
      name: "onMessageCreated",
      type: "firestore-trigger",
      description: "Send FCM push notification when message is created"
    },
    {
      name: "createExternalQuote",
      type: "callable",
      description: "Integration stub for Avinode/Stellar API"
    }
  ],

  integrations: [
    { name: "avinode", purpose: "Charter quote aggregation" },
    { name: "stellar", purpose: "Alternative charter quote source" },
    { name: "stripe", purpose: "Payment processing" },
    { name: "twilio", purpose: "SMS notifications" }
  ],

  recommendedStack: {
    web: "React + Vite + TypeScript + Tailwind CSS",
    mobile: "React Native + Expo + NativeWind",
    functions: "TypeScript + Firebase Admin SDK"
  }
}
```

## Usage Pattern

### Step 1: User Describes Project
```
User: "Build a healthcare platform for telemedicine with patient/doctor portals,
       video calls, prescriptions, HIPAA compliance, and Stripe payments"
```

### Step 2: You Analyze (Claude Code)
```javascript
// You understand this needs:
// - Data models: Patient, Doctor, Appointment, Prescription, Payment
// - Roles: patient, doctor, admin
// - External: Twilio (video), Stripe (payments)
// - Security: HIPAA compliance (field-level encryption, audit logs)
// - Features: Real-time scheduling, video calls, e-prescriptions
```

### Step 3: You Generate Architecture
```javascript
const architecture = {
  projectName: "telehealth-platform",
  displayName: "TeleHealth Platform",
  description: "HIPAA-compliant telemedicine platform",
  projectType: "monorepo",
  // ... (fill in based on your analysis)
};
```

### Step 4: You Call Generator
```javascript
import generateProject from './claude-generator.js';

const result = await generateProject(architecture);

// Returns:
// {
//   projectPath: "/path/to/telehealth-platform",
//   nextSteps: [...]
// }
```

### Step 5: You Guide Implementation
```
Claude: "I've created your TeleHealth platform! Here's what I generated:

✅ 5 data models with HIPAA-compliant security
✅ Web dashboard for doctors and admins
✅ Mobile app for patients
✅ Cloud Functions for appointments and prescriptions
✅ Twilio and Stripe integration stubs
✅ Complete documentation

The project is ready at ./telehealth-platform/

Would you like me to:
1. Implement the video call feature using Twilio
2. Set up Stripe subscription billing
3. Create the prescription approval workflow
4. Add appointment scheduling UI

What should we build first?"
```

## Example Conversations

### Simple App
```
User: "Create a todo app with teams"

Claude Code:
1. Analyzes: Needs User, Team, Task models
2. Identifies: Team admin vs member roles
3. Generates architecture object
4. Calls generateProject()
5. Responds: "Created! Let's implement the drag-and-drop task board"
```

### Complex Platform
```
User: "Build the jet charter platform from my clipboard"

Claude Code:
1. Reads pasted requirements
2. Extracts 7+ data models
3. Identifies 3 user roles
4. Plans 6 Cloud Functions
5. Maps external integrations
6. Generates architecture object
7. Calls generateProject()
8. Responds: "Your jet charter platform is ready!
             I've created the LMS, CRM, quote pipeline, and analytics.
             Let's start by implementing the quiz grading system..."
```

## What the Generator Creates

When you call `generateProject(architecture)`, it creates:

```
project-name/
├── apps/
│   ├── web/              # React app with all pages
│   ├── mobile/           # React Native app
│   └── functions/        # Cloud Functions with stubs
├── packages/
│   ├── core/
│   │   └── src/
│   │       ├── types.ts       # From architecture.dataModels
│   │       └── validators.ts  # Zod schemas
│   ├── ui/               # Reusable components
│   └── data/
│       └── src/
│           └── hooks.ts       # Generated CRUD hooks
├── .claude/
│   ├── PROJECT_CONTEXT.md     # For future you!
│   ├── ARCHITECTURE.md
│   ├── TASKS.md
│   └── guides/
├── firestore.rules            # From architecture.userRoles
├── firestore.indexes.json     # From architecture.dataModels[].indexes
├── ARCHITECTURE.md
└── README.md
```

## Your Advantages

### You Don't Need Gemini Because:
1. **You understand context better** - You're reading the conversation
2. **You can ask clarifying questions** - "Should quotes be editable after sending?"
3. **You know best practices** - You suggest improvements
4. **You continue helping** - After generation, you implement features

### Example Clarification
```
User: "Create a blog platform"

You: "Great! A few questions to design the best architecture:

     1. Single author or multi-author per post?
     2. Should posts support scheduled publishing?
     3. Do you need comments and reactions?
     4. Any special content types (videos, code snippets)?
     5. SEO requirements?

     This helps me generate the optimal data model and features."

User: "Multi-author, yes scheduling, yes comments, support markdown and code blocks"

You: [Creates perfect architecture with those features]
     [Calls generateProject()]
     [Returns] "Built! I've added:
               - CollaborativePost model with multiple authors
               - Scheduled publishing Cloud Function
               - Comment threads with reactions
               - Markdown editor with syntax highlighting

               Let's implement the collaborative editing feature first..."
```

## Integration Flow

```
┌─────────────────────────────────────────────────────────┐
│ User: "Create a [project description]"                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ Claude Code (You):                                       │
│ 1. Understand requirements                              │
│ 2. Ask clarifying questions if needed                   │
│ 3. Design architecture                                  │
│ 4. Extract data models, roles, functions               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ Call: generateProject(architecture)                     │
│                                                          │
│ Returns: { projectPath, nextSteps }                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ Claude Code (You):                                       │
│ "✅ Created! Here's what I built... What feature        │
│  should we implement first?"                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ User: "Implement user authentication"                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ Claude Code (You):                                       │
│ 1. Read .claude/PROJECT_CONTEXT.md                      │
│ 2. Follow .claude/guides/adding-auth.md                 │
│ 3. Implement using project's patterns                   │
│ 4. Update TASKS.md                                      │
└─────────────────────────────────────────────────────────┘
```

## Benefits of This Approach

1. **No External API Dependency** - No Gemini API key needed
2. **Better Context** - You see the full conversation
3. **Interactive** - You can ask questions, they can refine
4. **Seamless** - One conversation from idea to implementation
5. **Consistent** - You use the same context for generation and implementation
6. **Cost Effective** - No additional API costs

## When User Opens Generated Project

They get the `.claude/` directory you created, which tells future-you:
- What this project is
- How it's architected
- What patterns to follow
- What tasks remain

**Example:**
```
User: [Opens telehealth-platform]
      "Add appointment reminders via SMS"

You: [Reads .claude/PROJECT_CONTEXT.md]
     [Sees it's a HIPAA platform with Twilio integration]
     [Follows the patterns in .claude/guides/]

     "I'll add SMS reminders using Twilio. Based on your architecture:

     1. Create scheduled Cloud Function to check upcoming appointments
     2. Use Twilio service (already stubbed)
     3. Add reminder preferences to Patient model
     4. Implement opt-out mechanism for compliance

     Here's the implementation..."
```

## Summary

**Old way (with Gemini):**
- User describes → Gemini analyzes → Generator creates → Claude helps after

**New way (Claude-native):**
- User describes → Claude analyzes → Generator creates → Claude continues

**You handle everything!** No external AI needed. You're already the best AI for this job.
