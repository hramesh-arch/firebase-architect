# Conversation Patterns for Project Generation

## Questions to Ask Users

When a user requests a new Firebase project, ask these questions to provide the best experience:

### 1. Project Location
```
User: "Create a task management app"

You: "I'll create that for you! A few quick questions:

     1. Where should I create the project?
        - Default: /Users/harshithramesh/Builds/task-management
        - Custom: Let me know a different path

     2. Do you want Git initialized?
        - I can create an initial commit with all generated files
        - Optionally connect to a GitHub repo

     What would you prefer?"
```

### 2. Git Configuration

**Option A: User has existing repo**
```
User: "I already created a GitHub repo at github.com/user/task-app"

You: "Perfect! I'll:
     ✅ Initialize git
     ✅ Create initial commit
     ✅ Add your remote
     ✅ Push to GitHub

     Proceeding with generation..."

// Call with:
{
  git: {
    init: true,
    initialCommit: true,
    remote: "git@github.com:user/task-app.git",
    push: true
  }
}
```

**Option B: User wants to create repo later**
```
User: "Just initialize git, I'll create the repo myself"

You: "Got it! I'll initialize git and create an initial commit.
     You can add your remote later with:
     git remote add origin <your-repo-url>

     Proceeding..."

// Call with:
{
  git: {
    init: true,
    initialCommit: true,
    remote: null,
    push: false
  }
}
```

**Option C: No git yet**
```
User: "Skip git for now"

You: "No problem! I'll skip git initialization.
     You can run 'git init' later when ready."

// Call with:
{
  git: {
    init: false
  }
}
```

### 3. Clarifying Project Details

**Always ask if unclear:**

```
User: "Create a blog"

You: "I'd love to help! To design the best architecture, I need a bit more detail:

     1. Single author or multi-author?
     2. Will posts support scheduled publishing?
     3. Do you need comments/reactions?
     4. Any special content types (videos, code snippets)?
     5. SEO requirements?

     These details help me generate the optimal data model."

User: "Multi-author, yes to scheduling and comments, markdown support"

You: [Now you have enough detail to generate perfect architecture]
```

## Example Full Conversations

### Example 1: Simple App

```
User: "Create a todo app with teams"

You: "I'll create a team-based todo app for you!

     Quick questions:
     1. Where should I create it? (default: /Users/harshithramesh/Builds/todo-app)
     2. Do you have a GitHub repo ready, or should I just initialize git locally?

User: "Default location is fine, just local git"

You: "Perfect! Generating your todo app with:

     📊 Data Models:
     - Team (with members)
     - Task (assigned to team/user)
     - User (with team membership)

     🔐 Roles:
     - Team Admin (manage team, all tasks)
     - Team Member (manage own tasks)

     🚀 Features:
     - Team collaboration
     - Task assignment
     - Real-time updates

     Creating project..."

     [Calls generateProject with appropriate config]

     "✅ Created at: /Users/harshithramesh/Builds/todo-app

     Your todo app is ready! I've included:
     - Web dashboard with team management
     - Mobile app for task tracking
     - Real-time collaboration
     - Git initialized with initial commit

     Next steps:
     1. cd todo-app
     2. npm install
     3. Configure Firebase credentials in .env
     4. npm run dev:web

     What feature should we implement first?"
```

### Example 2: Complex Platform with GitHub

```
User: "Create a jet charter platform with the requirements from my clipboard"

You: "I see comprehensive requirements for a jet charter platform!
     This will be a full monorepo with web, mobile, and functions.

     Where should I create it, and do you have a GitHub repository?"

User: "Create it at /Users/harshithramesh/Projects/jet-charter
      I already made the repo: github.com/mycompany/jet-charter-platform"

You: "Perfect! I'll:
     ✅ Create at /Users/harshithramesh/Projects/jet-charter
     ✅ Initialize git with initial commit
     ✅ Connect to github.com/mycompany/jet-charter-platform
     ✅ Push the initial generated code

     Analyzing your requirements...

     📐 Architecture:
     - 7 Data Models (User, Client, Quote, TrainingModule, Message, Analytics, AuditLog)
     - 3 User Roles (admin, agent, master_qa)
     - 6 Cloud Functions (quiz grading, analytics, messaging, integrations)
     - 4 External Integrations (Avinode, Stellar, Stripe, Twilio)

     Proceeding with generation..."

     [Calls generateProject with:
       targetDirectory: "/Users/harshithramesh/Projects",
       projectName: "jet-charter",
       git: {
         init: true,
         initialCommit: true,
         remote: "git@github.com:mycompany/jet-charter-platform.git",
         push: true
       }
     ]

     "✅ Generated and pushed to GitHub!

     Your jet charter platform is ready at:
     /Users/harshithramesh/Projects/jet-charter

     Repository: github.com/mycompany/jet-charter-platform

     Included:
     ✅ Complete monorepo (web + mobile + functions)
     ✅ All 7 data models with TypeScript types
     ✅ RBAC security rules
     ✅ LMS structure with quiz system
     ✅ CRM components
     ✅ Integration stubs for Avinode, Stellar, Stripe, Twilio
     ✅ Complete documentation
     ✅ Git initialized and pushed

     Ready to start implementing! What should we build first?"
```

### Example 3: Refinement During Generation

```
User: "Create an e-commerce platform"

You: "I'd love to help with your e-commerce platform!

     To design it properly, I need to understand:

     1. Single vendor or multi-vendor marketplace?
     2. Product types (physical, digital, both)?
     3. Payment processing (Stripe, PayPal, both)?
     4. Inventory management needs?
     5. Shipping integrations?
     6. Admin features needed?

     The more specific you are, the better the generated code!"

User: "Multi-vendor, physical products only, Stripe, yes to inventory, integrate with Shippo, and I need vendor dashboards"

You: "Excellent details! I'll create a multi-vendor e-commerce platform with:

     📊 Data Models:
     - Vendor (with dashboard access)
     - Product (linked to vendor, with inventory)
     - Order (with line items)
     - Customer
     - Payment (Stripe integration)
     - Shipment (Shippo integration)

     🔐 Roles:
     - Vendor (manage own products/orders)
     - Customer (browse and purchase)
     - Admin (platform management)

     🚀 Features:
     - Vendor onboarding
     - Product catalog with inventory
     - Shopping cart and checkout
     - Stripe payment processing
     - Shippo shipping integration
     - Vendor analytics dashboard
     - Order management

     Where should I create the project?"

User: "Default location, and connect to github.com/mystore/ecommerce-platform"

You: [Generates with all those features + Git push]
```

## Handling Edge Cases

### User Doesn't Know Location
```
User: "I don't know where to put it"

You: "No worries! I'll use the default location:
     /Users/harshithramesh/Builds/[your-project-name]

     You can always move it later. Sound good?"
```

### User Wants Different Structure
```
User: "Can you create it without the monorepo structure?"

You: "Absolutely! I can create just a web app, or just mobile, or functions only.
     What platform(s) do you need?

     Options:
     - Web only (React + Vite)
     - Mobile only (React Native + Expo)
     - Just Cloud Functions
     - Web + Functions (no mobile)

     Which would you prefer?"
```

### Git Issues
```
// If git push fails

You: "⚠️ I created the project and initialized git, but couldn't push to the remote.
     This might be due to:
     - SSH key not configured
     - Repository doesn't exist yet
     - Permission issues

     No worries! Everything is generated locally. You can push manually:

     cd [project-name]
     git remote add origin [url]
     git push -u origin main

     The project is ready to use regardless!"
```

## Best Practices

### 1. Always Confirm Before Pushing
Don't auto-push unless user explicitly confirms:

```
You: "I can push the initial code to your GitHub repo.
     Would you like me to do that, or would you prefer to review first?"
```

### 2. Provide Clear Next Steps
After generation, always tell them what to do next:

```
You: "✅ Project created!

     Next steps:
     1. cd [project-name]
     2. npm install
     3. Add Firebase config to .env files
     4. npm run dev:web

     What feature should we implement first?"
```

### 3. Continue the Conversation
Don't just generate and stop - offer to help implement:

```
You: "Your platform is ready! I've set up the structure.

     I can help you implement:
     - User authentication flow
     - First data CRUD operations
     - Dashboard UI
     - Deploy to Firebase

     Where would you like to start?"
```

## Summary

**Always ask:**
1. ✅ Where to create the project
2. ✅ Git preferences (init, commit, remote, push)
3. ✅ Clarifying questions for better architecture

**Always provide:**
1. ✅ Clear summary of what you're building
2. ✅ Location where it's created
3. ✅ Next steps
4. ✅ Offer to continue helping

This makes the experience smooth and predictable!
