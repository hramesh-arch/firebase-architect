# Claude Code Integration Guide

**How to Ensure Claude Code Uses Firebase Architect Correctly**

---

## The Problem

When you ask Claude Code to "build a Firebase app," it might:
- ❌ Try to manually create files one by one (slow, error-prone)
- ❌ Generate the project structure without using the tool
- ❌ Skip important setup steps (Firebase config, Git, dependencies)
- ❌ Not follow the proper architecture patterns

**What we want:**
- ✅ Claude Code invokes the firebase-architect tool
- ✅ Uses AI for requirements analysis
- ✅ Lets the tool handle environment setup
- ✅ Then continues with feature development using the generated context

---

## Solution: Proper Integration Pattern

### 1. **Use the Claude-Native Generator** (Recommended)

The tool has TWO entry points:

**❌ `index.js`** - Standalone CLI (for manual use)
- Interactive prompts
- Requires user input
- Not ideal for Claude Code automation

**✅ `claude-generator.js`** - Claude Code Native
- Programmatic API
- No interactive prompts
- Designed to be called by Claude Code
- Takes pre-analyzed architecture as input

### 2. **Create a Slash Command** (Best Practice)

Create a file that tells Claude Code exactly how to use the tool:

**File: `.claude/commands/new-firebase-app.md`**
```markdown
You are helping create a new Firebase application using the firebase-architect tool.

## Step 1: Gather Requirements

Ask the user these questions:
1. What is the app name? (lowercase-with-hyphens format)
2. What is the display name? (Human readable)
3. What are the main features?
4. What platforms? (web, mobile, both)
5. What user roles are needed?
6. Any external integrations? (Stripe, Twilio, etc.)

## Step 2: Analyze and Design Architecture

Use your AI capabilities to analyze the requirements and create a complete architecture object:

```javascript
const architecture = {
  projectName: "user-provided-name",
  displayName: "User Provided Name",
  description: "Brief description of what the app does",
  projectType: "monorepo", // or "spa", "fullstack-web", "mobile"
  platforms: ["web", "mobile", "functions"],

  features: [
    "Feature 1",
    "Feature 2",
    // Extract from user requirements
  ],

  userRoles: [
    {
      role: "admin",
      permissions: ["read", "write", "delete"],
      description: "System administrator"
    },
    {
      role: "user",
      permissions: ["read", "write"],
      description: "Regular user"
    }
  ],

  dataModels: [
    {
      name: "User",
      collection: "users",
      fields: [
        { name: "email", type: "string", required: true },
        { name: "displayName", type: "string", required: true },
        { name: "role", type: "string", required: true, default: "user" },
        { name: "createdAt", type: "timestamp", required: true }
      ],
      relationships: [],
      indexes: [["role", "createdAt"]]
    },
    // Add more models based on requirements
  ],

  cloudFunctions: [
    {
      name: "functionName",
      type: "callable", // or "http", "scheduled", "trigger"
      description: "What this function does"
    }
  ],

  firebaseServices: ["auth", "firestore", "storage", "functions"],

  integrations: [
    { name: "stripe", purpose: "Payment processing" }
  ],

  firebase: {
    create: true,
    projectId: "project-name" // defaults to projectName
  },

  github: {
    create: true,
    visibility: "private"
  },

  vscode: {
    open: true
  }
};
```

## Step 3: Display Preview

Show the user what will be created:
- Number of collections
- Data models
- Features
- Platforms

Ask: "Does this architecture look correct?"

## Step 4: Invoke the Generator

IMPORTANT: Use the claude-generator.js, NOT index.js!

```javascript
import { generateProject } from './firebase-architect/claude-generator.js';

try {
  const result = await generateProject(architecture);

  console.log('✅ Project generated successfully!');
  console.log(`📁 Location: ${result.projectPath}`);
  console.log(`📋 Next steps: Check ${result.handoffPrompt}`);

} catch (error) {
  console.error('❌ Generation failed:', error.message);
  // Handle error - ask user what to do
}
```

## Step 5: Read Handoff Prompt

After generation completes:

1. Read the file at `result.handoffPrompt` (usually `.claude/HANDOFF_PROMPT.md`)
2. Follow the instructions in that file
3. Start implementing features from the roadmap

## What NOT to Do

❌ DO NOT manually create files like `package.json`, `tsconfig.json`, etc.
❌ DO NOT try to set up Firebase project manually
❌ DO NOT create security rules manually
❌ DO NOT install dependencies manually

The tool handles ALL of that.

## What YOU Should Do

✅ Gather requirements from user
✅ Use your AI to analyze and structure the architecture
✅ Invoke the tool with the architecture object
✅ Read and follow the generated HANDOFF_PROMPT.md
✅ Implement features using the generated context

## Verification Checklist

After running the tool, verify:
- [ ] Project directory was created
- [ ] package.json exists with workspaces
- [ ] apps/web, apps/mobile, apps/functions directories exist
- [ ] packages/core, packages/ui, packages/data exist
- [ ] .claude/ directory has ROADMAP.md and TASKS.md
- [ ] Firebase project was created (check Firebase console)
- [ ] Git repository initialized
- [ ] Dependencies installed (node_modules exists)

## Example Full Conversation

User: "Build me a task management app with teams"

You: "I'll help you create a Firebase task management app. Let me gather some details:

1. What should we call this project? (e.g., team-task-manager)
2. Do you need both web and mobile apps, or just web?
3. What user roles do you need? (e.g., admin, team-lead, member)
4. Any integrations? (e.g., Slack notifications, email)

Once you answer, I'll design the architecture and use the firebase-architect tool to set everything up."

[User answers]

You: "Great! Based on your requirements, here's the architecture I've designed:

**Collections:**
- Users (email, role, teamId)
- Teams (name, ownerId, members)
- Tasks (title, description, assigneeId, status, dueDate)

**User Roles:**
- Admin: Full access
- Team Lead: Manage team and tasks
- Member: View and update assigned tasks

**Features:**
- Task creation and assignment
- Team management
- Status tracking
- Due date reminders

Does this look correct? I'll generate the complete project structure for you."

[User confirms]

You: [Invokes generateProject() with the architecture]

You: "✅ Project generated successfully! I've created a complete Firebase development environment at `/home/user/team-task-manager`.

The project includes:
- React web app with Vite
- React Native mobile app with Expo
- Firebase Cloud Functions
- All dependencies installed
- Security rules configured
- Git repository initialized

I'm now reading the handoff prompt to start implementing features..."

[Reads HANDOFF_PROMPT.md and starts feature development]
```

---

## 3. **Guardrails in .claudeproject**

Add this to your `.claudeproject` file in the parent directory:

**File: `/home/user/.claudeproject`**
```json
{
  "rules": [
    "When creating Firebase applications, ALWAYS use the firebase-architect tool from ~/firebase-architect/",
    "Use claude-generator.js for programmatic generation, NOT index.js",
    "Gather requirements first, then design architecture, then invoke the tool",
    "After generation, read .claude/HANDOFF_PROMPT.md before implementing features",
    "Do NOT manually create project structure - let the tool handle it"
  ],

  "patterns": {
    "firebase-app-creation": {
      "trigger": ["build firebase app", "create firebase project", "new firebase application"],
      "action": "Use ~/firebase-architect/claude-generator.js with proper architecture object",
      "context": [
        "~/firebase-architect/.claude/project-guide.md",
        "~/firebase-architect/claude-generator.js"
      ]
    }
  }
}
```

---

## 4. **Create a Clear Prompt Template**

**File: `.claude/prompts/new-firebase-app.md`**
```markdown
# Create New Firebase Application

I need to create a new Firebase application. Here are my requirements:

**App Name:** [project-name-here]
**Display Name:** [Human Readable Name]

**Features:**
- Feature 1
- Feature 2
- Feature 3

**User Roles:**
- Admin: Full access
- User: Limited access

**Platforms:**
- [ ] Web (React + Vite)
- [ ] Mobile (React Native + Expo)
- [ ] Cloud Functions

**Data Models:**
1. User
   - email (string, required)
   - role (string, required)

2. [Other models...]

**External Integrations:**
- [ ] Stripe (payments)
- [ ] Twilio (SMS)
- [ ] SendGrid (email)

---

## Instructions for Claude Code

1. Review the requirements above
2. Design a complete architecture with data models, relationships, and security rules
3. Show me the architecture for confirmation
4. Use firebase-architect tool to generate the project
5. Read the generated HANDOFF_PROMPT.md
6. Start implementing features from the roadmap

**Important:**
- Use `claude-generator.js`, not `index.js`
- Let the tool handle ALL environment setup
- Focus on feature implementation after generation
```

---

## 5. **Verification Steps During Conversation**

### As Claude Code, verify at each step:

**Before Generation:**
```
✅ I have gathered all requirements
✅ I have designed a complete architecture
✅ User has confirmed the architecture
✅ I am about to invoke claude-generator.js (NOT index.js)
✅ I have a valid architecture object
```

**During Generation:**
```
⏳ Invoking generateProject()...
⏳ Waiting for completion...
⏳ Checking for errors...
```

**After Generation:**
```
✅ Project directory created at [path]
✅ Firebase project configured
✅ Dependencies installed
✅ Git repository initialized
✅ HANDOFF_PROMPT.md exists

Next: Read HANDOFF_PROMPT.md and start feature development
```

---

## 6. **Common Mistakes to Avoid**

### ❌ Mistake 1: Using index.js instead of claude-generator.js
```javascript
// WRONG - This requires interactive prompts
import './firebase-architect/index.js';
```

```javascript
// CORRECT - This is the programmatic API
import { generateProject } from './firebase-architect/claude-generator.js';
```

### ❌ Mistake 2: Trying to generate files manually
```javascript
// WRONG - Don't do this!
fs.writeFileSync('package.json', JSON.stringify({...}));
fs.writeFileSync('apps/web/src/App.tsx', '...');
```

```javascript
// CORRECT - Let the tool do it
await generateProject(architecture);
```

### ❌ Mistake 3: Incomplete architecture object
```javascript
// WRONG - Missing critical fields
const architecture = {
  projectName: 'my-app'
  // Where are the data models? Features? Platforms?
};
```

```javascript
// CORRECT - Complete architecture
const architecture = {
  projectName: 'my-app',
  displayName: 'My App',
  description: 'What the app does',
  projectType: 'monorepo',
  platforms: ['web', 'mobile', 'functions'],
  dataModels: [...],
  userRoles: [...],
  cloudFunctions: [...],
  firebaseServices: [...]
};
```

### ❌ Mistake 4: Not reading the handoff prompt
```javascript
// WRONG - Start implementing immediately
await generateProject(architecture);
// Start creating components...
```

```javascript
// CORRECT - Read the handoff first
const result = await generateProject(architecture);
const handoffPrompt = fs.readFileSync(result.handoffPrompt, 'utf-8');
// Now I know what to do next...
```

---

## 7. **Testing the Integration**

### Test Script

Create this file to test if Claude Code can properly invoke the tool:

**File: `test-claude-integration.js`**
```javascript
import { generateProject } from './firebase-architect/claude-generator.js';

const testArchitecture = {
  projectName: 'test-app-' + Date.now(),
  displayName: 'Test Application',
  description: 'Testing Claude Code integration',
  projectType: 'monorepo',
  platforms: ['web', 'functions'],

  features: [
    'User authentication',
    'Data management'
  ],

  userRoles: [
    { role: 'admin', permissions: ['read', 'write', 'delete'] }
  ],

  dataModels: [
    {
      name: 'User',
      collection: 'users',
      fields: [
        { name: 'email', type: 'string', required: true }
      ]
    }
  ],

  cloudFunctions: [
    {
      name: 'testFunction',
      type: 'callable',
      description: 'Test function'
    }
  ],

  firebaseServices: ['auth', 'firestore', 'functions'],

  firebase: { create: false }, // Don't actually create Firebase project in test
  github: { create: false },   // Don't create GitHub repo in test
  vscode: { open: false }       // Don't open VS Code in test
};

console.log('🧪 Testing Firebase Architect integration...\n');

try {
  const result = await generateProject(testArchitecture);

  console.log('✅ SUCCESS!');
  console.log(`Project created at: ${result.projectPath}`);
  console.log(`Handoff prompt: ${result.handoffPrompt}`);
  console.log(`Roadmap: ${result.roadmap}`);

  // Verify structure
  const fs = await import('fs');
  const checks = [
    'package.json',
    'apps/web',
    'apps/functions',
    'packages/core',
    '.claude/ROADMAP.md'
  ];

  console.log('\n🔍 Verifying structure:');
  checks.forEach(file => {
    const exists = fs.existsSync(`${result.projectPath}/${file}`);
    console.log(exists ? `  ✅ ${file}` : `  ❌ ${file}`);
  });

} catch (error) {
  console.error('❌ FAILED!');
  console.error(error.message);
  process.exit(1);
}
```

Run it:
```bash
node test-claude-integration.js
```

If it passes, Claude Code integration is working correctly.

---

## 8. **Prompt Examples for Users**

### Good Prompts (What to Say)

✅ **"Create a Firebase task management app"**
- Claude will gather requirements and use the tool

✅ **"I need a Firebase app for [specific use case]"**
- Claude will design architecture and use the tool

✅ **"Use firebase-architect to set up a new project"**
- Explicitly tells Claude to use the tool

### Bad Prompts (What Not to Say)

❌ **"Create a package.json for a Firebase project"**
- Too specific, might bypass the tool

❌ **"Set up React and Firebase manually"**
- Explicitly asks to bypass the tool

❌ **"Write me a Firebase app from scratch"**
- Might make Claude generate everything manually

---

## 9. **Monitoring and Debugging**

### How to Tell if Claude Code is Using the Tool Correctly

**Good signs:**
- ✅ You see "Invoking generateProject()..."
- ✅ Project appears in expected location
- ✅ All folders created (apps/, packages/, .claude/)
- ✅ Dependencies installed automatically
- ✅ Firebase project created
- ✅ Handoff prompt is read

**Bad signs:**
- ❌ Claude creates files one by one
- ❌ No mention of firebase-architect
- ❌ Missing folders or incomplete structure
- ❌ No .claude/ directory
- ❌ No handoff prompt

### Debug Checklist

If something goes wrong:

1. **Check the architecture object**
   - Is it complete?
   - Are all required fields present?
   - Are data models properly structured?

2. **Check the import**
   - Are you using `claude-generator.js`?
   - Is the path correct?

3. **Check permissions**
   - Can Claude Code write to the target directory?
   - Are Firebase CLI and GitHub CLI authenticated?

4. **Check the output**
   - What error message was returned?
   - Check the error log file if created

---

## 10. **Best Practices Summary**

### For Claude Code:
1. ✅ Always gather requirements first
2. ✅ Use AI to analyze and design architecture
3. ✅ Show architecture to user for confirmation
4. ✅ Use `claude-generator.js` programmatically
5. ✅ Wait for generation to complete
6. ✅ Read and follow HANDOFF_PROMPT.md
7. ✅ Focus on feature implementation, not setup

### For Users:
1. ✅ Be clear about what you want to build
2. ✅ Let Claude Code design the architecture
3. ✅ Review and confirm the architecture
4. ✅ Trust the tool to handle setup
5. ✅ Focus on feature requirements, not technical setup

### For Architecture Design:
1. ✅ Include all data models with complete field definitions
2. ✅ Define user roles and permissions clearly
3. ✅ Specify all required platforms
4. ✅ List all cloud functions needed
5. ✅ Include external integrations
6. ✅ Add relationship mappings between models

---

## 11. **Example: Perfect Integration**

Here's what a perfect interaction looks like:

```
User: "I want to build a fitness tracking app with workout plans and progress tracking"

Claude Code: "I'll help you create a Firebase fitness tracking app. Let me gather requirements:

1. Project name? (e.g., fitness-tracker)
2. Platforms? Web, mobile, or both?
3. User roles? (e.g., coach, athlete)
4. Key features? (workout plans, progress tracking, what else?)
5. Integrations? (Strava, Apple Health, etc.?)

User:
1. fit-progress
2. Both web and mobile
3. coach (create plans), athlete (track progress)
4. Workout plans, progress tracking, exercise library, goal setting
5. Maybe Strava later

Claude Code: "Perfect! Here's the architecture I've designed:

**Data Models:**
- User (email, role, coachId, goals)
- WorkoutPlan (name, coachId, exercises, schedule)
- ProgressEntry (userId, workoutPlanId, date, metrics)
- Exercise (name, description, category, difficulty)

**Features:**
- Workout plan creation (coaches)
- Progress tracking (athletes)
- Exercise library (both)
- Goal setting and monitoring
- Coach-athlete relationships

**Platforms:**
- Web app (React + Vite)
- Mobile app (React Native + Expo)
- Cloud Functions (backend logic)

Does this match your vision?"

User: "Yes, perfect!"

Claude Code: [Invokes firebase-architect tool]

"✅ Project generated successfully!

Your fitness tracking app is ready at /home/user/fit-progress

What's been set up:
- Complete monorepo structure
- React web app with Tailwind CSS
- React Native mobile app with NativeWind
- Cloud Functions with TypeScript
- Firebase project created and configured
- All dependencies installed
- Git repository initialized
- Security rules for role-based access
- Development roadmap with phased tasks

I'm now reading the handoff prompt to start implementing features..."

[Reads HANDOFF_PROMPT.md]

"I'll start with Phase 2 of the roadmap: implementing the workout plan creation feature for coaches. This will include:
1. WorkoutPlan CRUD operations
2. Exercise library integration
3. Coach dashboard UI
4. Form validation

Let me begin with the Cloud Function for creating workout plans..."
```

---

## Summary

### The Right Way:
```
User Request
    ↓
Claude Code Gathers Requirements
    ↓
Claude Code Designs Architecture (AI-powered)
    ↓
Claude Code Shows Architecture to User
    ↓
User Confirms
    ↓
Claude Code Invokes claude-generator.js
    ↓
Tool Generates Complete Project
    ↓
Claude Code Reads HANDOFF_PROMPT.md
    ↓
Claude Code Implements Features
```

### The Wrong Way:
```
User Request
    ↓
Claude Code Manually Creates Files ❌
    ↓
Incomplete Structure ❌
    ↓
Missing Configuration ❌
    ↓
User Has to Fix Everything ❌
```

---

## Quick Reference Card

**To Use Firebase Architect from Claude Code:**

```javascript
// 1. Import
import { generateProject } from '~/firebase-architect/claude-generator.js';

// 2. Create Architecture
const architecture = {
  projectName: 'app-name',
  displayName: 'App Name',
  // ... complete architecture object
};

// 3. Generate
const result = await generateProject(architecture);

// 4. Read Handoff
const handoff = fs.readFileSync(result.handoffPrompt, 'utf-8');

// 5. Implement Features
// Follow instructions in handoff prompt
```

**That's it!** Let the tool handle setup, you handle features.

---

**Questions?** Check:
- `DATABASE_PREVIEW_FEATURE.md` - Preview feature details
- `CODEBASE_REVIEW_AND_RECOMMENDATIONS.md` - Full tool analysis
- `.claude/project-guide.md` - Integration patterns
- `SAMPLE_HANDOFF_PROMPT.md` - Example handoff

**Remember:** Trust the tool, focus on features! 🚀
