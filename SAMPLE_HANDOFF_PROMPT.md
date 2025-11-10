# Claude Code Handoff Prompt

This is what Firebase Architect would generate as the final output - the prompt you'd paste into Claude Code to begin development.

---

## 🚀 START OF PROMPT FOR CLAUDE CODE

---

# Build Task Management Platform

## Context
I've set up the complete development environment for a task management platform. Everything is configured and ready for you to start building.

## Original Requirements
```
A task management app for teams with:
- Team workspaces where multiple users can collaborate
- Projects to organize work
- Tasks with assignments, priorities, and due dates
- Real-time collaboration so team members see updates instantly
- Analytics dashboard showing team productivity
- User roles: owner (full access), admin (manage team), member (basic access)
- Both web and mobile apps
```

## Environment Setup (COMPLETE ✅)

### What's Already Done
- ✅ **Firebase Project:** `task-manager` created and configured
  - Project ID: `task-manager`
  - Console: https://console.firebase.google.com/project/task-manager

- ✅ **Services Enabled:**
  - Cloud Firestore (database)
  - Firebase Authentication (ready for email/password)
  - Cloud Functions (TypeScript)
  - Firebase Hosting (web deployment)
  - Cloud Storage (file uploads)

- ✅ **Project Structure:** Monorepo created at `/Users/you/Builds/task-manager/`
  ```
  task-manager/
  ├── apps/
  │   ├── web/          # React + Vite + TypeScript
  │   ├── mobile/       # React Native + Expo
  │   └── functions/    # Cloud Functions (TypeScript)
  ├── packages/
  │   ├── core/         # Shared types, validators
  │   ├── ui/           # Shared components
  │   └── data/         # Firebase hooks
  └── .claude/          # Your development guides
  ```

- ✅ **Configuration Files:** All generated (package.json, tsconfig, vite.config, etc.)

- ✅ **Security Rules:** Deployed to Firestore
  - Role-based access control (RBAC) configured
  - Rules for owner, admin, member roles

- ✅ **Firestore Indexes:** Deployed for optimal queries

- ✅ **Dependencies:** Installed and ready
  - React 18, TypeScript, Tailwind CSS
  - TanStack Query for data fetching
  - Zod for validation
  - Firebase SDK v10

- ✅ **Git Repository:** Initialized with initial commit

## Architecture Overview

### Data Models
The following data models have been identified and need implementation:

1. **Team**
   - `id` (auto-generated)
   - `name` (string)
   - `ownerId` (string, Firebase UID)
   - `createdAt` (timestamp)
   - `updatedAt` (timestamp)

2. **Project**
   - `id` (auto-generated)
   - `name` (string)
   - `description` (string, optional)
   - `teamId` (string, reference to Team)
   - `status` (enum: active, completed, archived)
   - `dueDate` (timestamp, optional)
   - `createdAt` (timestamp)
   - `updatedAt` (timestamp)

3. **Task**
   - `id` (auto-generated)
   - `title` (string)
   - `description` (string, optional)
   - `projectId` (string, reference to Project)
   - `assignedTo` (string, Firebase UID, optional)
   - `status` (enum: todo, in_progress, done)
   - `priority` (enum: low, medium, high)
   - `dueDate` (timestamp, optional)
   - `createdAt` (timestamp)
   - `updatedAt` (timestamp)

4. **User** (Firebase Auth + Firestore profile)
   - `uid` (Firebase UID)
   - `email` (string)
   - `displayName` (string)
   - `role` (enum: owner, admin, member)
   - `teamId` (string, reference to Team)
   - `createdAt` (timestamp)

### User Roles & Permissions
- **Owner:** Full access, can delete team, manage billing, change member roles
- **Admin:** Can manage projects, tasks, and invite/remove members
- **Member:** Can view team data, create/edit own tasks

### Technical Stack
- **Frontend (Web):** React 18 + Vite + TypeScript + Tailwind CSS + React Router
- **Frontend (Mobile):** React Native + Expo + NativeWind + Expo Router
- **Backend:** Firebase Cloud Functions (TypeScript)
- **Database:** Cloud Firestore
- **Authentication:** Firebase Auth
- **State Management:** TanStack Query for server state
- **Validation:** Zod schemas

## Development Roadmap

**📍 IMPORTANT:** A complete development roadmap is located at `.claude/ROADMAP.md`

**Your job is to follow this roadmap step by step and mark items as complete as you go.**

The roadmap contains 8 phases:
- ✅ Phase 0: Environment Setup (COMPLETE)
- 🎯 Phase 1: Foundation & Data Layer (START HERE)
- Phase 2: Core UI Components
- Phase 3: Real-time Features & Collaboration
- Phase 4: Analytics & Dashboard
- Phase 5: Authentication & User Management
- Phase 6: Testing
- Phase 7: Deployment & DevOps
- Phase 8: Post-Launch

### How to Use the Roadmap
1. **Open:** `.claude/ROADMAP.md`
2. **Follow:** Each phase sequentially
3. **Mark complete:** Check off items as you finish them using `- [x]`
4. **Update status:** Change phase status from 🔴 Not Started → 🟡 In Progress → 🟢 Complete
5. **Add notes:** Add any decisions or issues to the Notes section

## Current Task: Phase 1.1

**Start with:** Define TypeScript Types

**Your first task is:**
1. Open `packages/core/src/types.ts`
2. Define TypeScript interfaces for all data models:
   - Team, Project, Task, User interfaces
   - Enums: UserRole, TaskStatus, TaskPriority, ProjectStatus
3. Export all types from `packages/core/src/index.ts`

**Acceptance criteria:**
- All data models have complete TypeScript interfaces
- All enums are properly defined
- Types are exported and can be imported by other packages

**Reference the roadmap** for detailed specifications of each type.

## Important Files & Locations

### Documentation
- `.claude/ROADMAP.md` - Complete development roadmap (FOLLOW THIS!)
- `.claude/TASKS.md` - Current sprint tasks
- `.claude/ARCHITECTURE.md` - System architecture details
- `ARCHITECTURE.md` - Root architecture document

### Guides
- `.claude/guides/adding-data-model.md` - How to add new data models
- `.claude/guides/adding-page.md` - How to add new pages
- `.claude/guides/adding-cloud-function.md` - How to add Cloud Functions

### Code Structure
- `packages/core/src/types.ts` - TypeScript type definitions
- `packages/core/src/validators.ts` - Zod validation schemas
- `packages/data/src/hooks/` - Firestore CRUD hooks (TanStack Query)
- `apps/web/src/pages/` - React pages
- `apps/mobile/app/` - React Native screens
- `apps/functions/src/` - Cloud Functions

### Configuration
- `firestore.rules` - Security rules (already deployed)
- `firestore.indexes.json` - Database indexes (already deployed)
- `firebase.json` - Firebase configuration

## Development Commands

### Run Locally
```bash
# Web app
npm run dev:web

# Mobile app (Expo)
npm run dev:mobile

# Cloud Functions (emulator)
npm run dev:functions

# All in parallel
npm run dev
```

### Build
```bash
npm run build:web
npm run build:functions
```

### Deploy
```bash
# Everything
firebase deploy

# Just functions
firebase deploy --only functions

# Just hosting
firebase deploy --only hosting

# Just rules
firebase deploy --only firestore:rules
```

### Testing
```bash
# Run all tests
npm test

# Test with coverage
npm run test:coverage

# Test specific package
npm test --workspace=packages/core
```

## Key Reminders

### As You Build
1. **Follow the roadmap** - Don't skip ahead, complete each phase
2. **Mark items complete** - Update ROADMAP.md as you go
3. **Write tests** - Add tests as you implement features
4. **Use existing hooks** - Data hooks are in `packages/data/src/hooks/`
5. **Real-time by default** - Use Firestore listeners for live updates
6. **Validate inputs** - Use Zod schemas for all user inputs
7. **Handle errors** - Show user-friendly error messages
8. **Security first** - Verify security rules match your implementation

### Coding Standards
- **TypeScript:** Strict mode enabled, no `any` types
- **Components:** Functional components with hooks
- **Styling:** Tailwind CSS utility classes
- **Naming:** camelCase for functions/variables, PascalCase for components
- **Imports:** Absolute imports from workspace packages (e.g., `@task-manager/core`)

### Firebase Best Practices
- Use batch writes for multiple updates
- Add Firestore security rule tests
- Use composite indexes for complex queries
- Implement pagination for large lists
- Use Cloud Functions for server-side logic

## Questions or Issues?

If you encounter blockers:
1. Check `.claude/guides/` for how-to documentation
2. Review `.claude/ARCHITECTURE.md` for design decisions
3. Check Firebase documentation
4. Ask me for clarification

## Ready to Start?

**Your first task:** Open `packages/core/src/types.ts` and define the TypeScript interfaces for Team, Project, Task, and User.

**When done:** Mark task 1.1 as complete in `.claude/ROADMAP.md` and move to task 1.2 (Create Zod Validation Schemas).

Let's build this! 🚀

---

## 🛑 END OF PROMPT FOR CLAUDE CODE

---

# What This Prompt Accomplishes

This prompt gives Claude Code:
1. ✅ **Full context** - Original requirements + what's been set up
2. ✅ **Clear roadmap** - Knows exactly what to build and in what order
3. ✅ **Environment details** - Firebase project, file structure, commands
4. ✅ **Current task** - Knows where to start (Phase 1.1)
5. ✅ **Instructions** - Must follow roadmap and mark items complete
6. ✅ **Standards** - Coding conventions, best practices
7. ✅ **Resources** - Points to guides, docs, and architecture files

Claude Code can now start implementing immediately without needing to ask setup questions.
