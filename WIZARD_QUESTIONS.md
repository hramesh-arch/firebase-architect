# Firebase Architect - Conversational Wizard Questions

## Question Flow for Claude Code

This document defines the exact questions Claude Code should ask when setting up a Firebase project interactively.

---

## 🎯 Wizard Flow Overview

**Total Questions:** 8-12 (depending on selections)
**Estimated Time:** 3-5 minutes
**Format:** Conversational, with AI-assisted suggestions

---

## Question Sequence

### Q1: Project Identity 📝

**Question:**
```
What would you like to name your project?

This will be used for:
- Firebase project ID
- GitHub repository name
- Folder name

Tip: Use lowercase with hyphens (e.g., "school-crm", "task-manager")
```

**User Input:**
- Free text (e.g., "school-advancement-crm")

**Validation:**
- Must be lowercase
- Only letters, numbers, hyphens
- 4-30 characters
- No consecutive hyphens

**AI Enhancement:**
- Claude suggests project name based on conversation context
- Offers to clean up invalid names

---

### Q2: Display Name 🏷️

**Question:**
```
What's the display name for your project?

This is the human-readable name shown in:
- Firebase Console
- README files
- Documentation

Examples:
- "School Advancement CRM"
- "Task Management System"
- "E-Commerce Platform"
```

**User Input:**
- Free text (e.g., "School Advancement CRM")

**Default:**
- Automatically generated from project name if user skips

**AI Enhancement:**
- Claude suggests capitalized version of project name
- Can infer from conversation context

---

### Q3: Project Description 📄

**Question:**
```
What does your project do? (Brief description)

This helps me:
- Suggest appropriate templates
- Design better data models
- Choose suitable UI components

Examples:
- "CRM for managing school donors and fundraising campaigns"
- "Task manager with team collaboration features"
- "E-commerce platform for handmade crafts"
```

**User Input:**
- 1-2 sentences

**Optional:**
- Can skip if obvious from context

**AI Enhancement:**
- Claude uses this to make smarter suggestions
- Influences template recommendations

---

### Q4: Project Type 🏗️

**Question:**
```
What type of application are you building?

1. 📊 Dashboard / Admin Panel
   Best for: Internal tools, analytics, data management

2. 🛍️ E-Commerce
   Best for: Online stores, marketplaces

3. 📱 Social / Community
   Best for: Social networks, forums, messaging

4. 📝 CRM / Business Tool
   Best for: Customer management, sales, operations

5. 🎓 Educational
   Best for: Learning platforms, course management

6. 📰 Content / Publishing
   Best for: Blogs, news sites, content platforms

7. 🎮 Other / Custom

Which best describes your project? (1-7)
```

**User Input:**
- Number (1-7) or type name

**AI Enhancement:**
- Claude can infer from description
- Suggests based on conversation

---

### Q5: Platform Selection 💻📱

**Question:**
```
Which platforms do you need?

Select all that apply:

[ ] Web Application
    React + Vite + TypeScript
    Perfect for: Desktop users, dashboards

[ ] Mobile App
    React Native + Expo
    Perfect for: iOS and Android users

[ ] Cloud Functions
    Backend logic, APIs, scheduled tasks
    Perfect for: Business logic, integrations

[ ] Admin Dashboard (separate from main web app)
    Admin-specific interface
    Perfect for: Internal team management

Which platforms? (e.g., "web and mobile" or "all")
```

**User Input:**
- Natural language: "web and functions"
- Or: "all"
- Or: "just web"

**Default:**
- Web only (if user unsure)

**AI Enhancement:**
- Claude suggests based on project type
- CRM → web + functions
- Social app → web + mobile + functions

---

### Q6: UI Template Selection 🎨

**Question:**
```
Let's choose your UI design system!

Based on your [project type], I recommend:

1. ⭐ Material Modern (Recommended for you)
   - Google Material Design
   - Best for: Dashboards, data-heavy apps
   - Components: 30+ (DataGrid, DatePicker, Forms)
   - Preview: https://mui.com/store/previews/...

2. Ant Design Pro
   - Enterprise-grade
   - Best for: Business apps, Fortune 500 style
   - Components: 50+ (Advanced tables, charts)
   - Preview: https://preview.pro.ant.design/

3. TailAdmin Modern
   - Utility-first Tailwind CSS
   - Best for: Custom designs, modern startups
   - Components: Flexible, fully customizable
   - Preview: https://react-demo.tailadmin.com/

4. CoreUI Enterprise
   - Bootstrap 5 based
   - Best for: Traditional enterprise, government
   - Components: 40+ familiar Bootstrap components

5. shadcn/ui Modern
   - Copy-paste components
   - Best for: Modern apps, design-conscious teams
   - Components: Accessible, customizable

6. Clean Accessible
   - WCAG 2.1 compliant
   - Best for: Accessibility-first, healthcare, government
   - Components: Fully accessible

Which template? (1-6 or name)
```

**User Input:**
- Number (1-6)
- Or: Template name
- Or: "recommend for me"

**AI Enhancement:**
- Claude pre-selects best match
- Shows why it's recommended
- Can explain differences

---

### Q7: Color Customization 🎨

**Question:**
```
Would you like to customize the color scheme?

Current template: [Material Modern]
Default colors:
- Primary: Blue (#1976d2)
- Secondary: Pink (#dc004e)

Options:
1. Use default colors (looks great!)
2. Describe your brand (e.g., "professional blue and gray")
3. Provide hex codes (e.g., "#3B82F6" for primary)
4. Choose from presets:
   - 🔵 Professional Blue (default)
   - 🟣 Modern Purple
   - 🟢 Fresh Green
   - 🟠 Energetic Orange
   - ⚫ Minimal Grayscale

Your choice?
```

**User Input:**
- Option number
- Or: Color description
- Or: Hex codes
- Or: "defaults are fine"

**Default:**
- Use template defaults

**AI Enhancement:**
- Claude can interpret brand descriptions
- "professional" → blue/gray
- "energetic startup" → purple/orange
- "eco-friendly" → green

---

### Q8: Data Models 📊

**Question:**
```
What data will your application manage?

Think about the main "things" in your system.

Examples for a CRM:
- Donors, Campaigns, Events, Donations

Examples for a Task Manager:
- Tasks, Projects, Teams, Comments

Examples for E-commerce:
- Products, Orders, Customers, Reviews

What are your main data types? (comma-separated)
```

**User Input:**
- Comma-separated list: "donors, campaigns, events"

**AI Enhancement:**
- Claude suggests based on project type
- CRM → donors, campaigns, events, communications
- Task app → tasks, projects, teams, comments
- E-commerce → products, orders, customers, cart

---

### Q8b: Data Model Details (For Each Model) 📝

**Question:**
```
Let's define the [Donor] data model.

What information do you need to track about each donor?

Common fields I can add automatically:
✓ id (unique identifier)
✓ createdAt (timestamp)
✓ updatedAt (timestamp)

What else? (e.g., "name, email, phone, donation history")

Or say "use AI suggestions" and I'll design it based on best practices.
```

**User Input:**
- Field list: "name, email, phone, total donated"
- Or: "AI suggestions"
- Or: "standard CRM donor fields"

**For Each Field Asked:**
```
Is [totalDonated] a:
1. Text
2. Number
3. Date/Time
4. True/False
5. List of items
6. Reference to another model

Type? (or I can infer automatically)
```

**AI Enhancement:**
- Claude infers field types intelligently
- "email" → string with email validation
- "phone" → string with phone format
- "total donated" → number (currency)
- "created" → timestamp

---

### Q9: User Roles & Permissions 👥

**Question:**
```
Who will use your application?

Do you need different permission levels?

Examples:
- CRM: Admin, Manager, Staff, Read-only
- Task Manager: Admin, Team Lead, Member
- E-commerce: Admin, Store Manager, Support

Options:
1. Simple (just admin and regular users)
2. Custom (I'll help you define roles)
3. No roles needed (everyone has same access)

Your choice?
```

**User Input:**
- 1, 2, or 3
- Or: Role list directly

**If Custom Selected:**
```
Let's define your roles.

Role 1: Admin
- Full access to everything (automatically configured)

Role 2: [name]?
Example: "Manager" or "Staff Member"

What can they do?
- Read all data?
- Create/edit their own data?
- Manage users?
- View reports?

(I'll configure security rules based on this)
```

**AI Enhancement:**
- Claude suggests roles based on project type
- Configures Firestore security rules automatically

---

### Q10: Cloud Functions 🔧

**Question (only if Functions platform selected):**
```
Your project includes Cloud Functions!

Which backend features do you need?

Common options:
[ ] Send emails (welcome emails, notifications)
[ ] Generate PDFs (reports, invoices, receipts)
[ ] Scheduled tasks (daily cleanup, weekly reports)
[ ] Payment processing (Stripe integration)
[ ] Data aggregation (calculate totals, statistics)
[ ] Third-party integrations (Slack, Zapier, etc.)
[ ] Custom API endpoints

Select all that apply (or "skip" to add later)
```

**User Input:**
- List: "emails, PDFs, scheduled tasks"
- Or: "skip"

**AI Enhancement:**
- Claude suggests based on project type
- CRM → email, PDFs, scheduled reports
- E-commerce → payment, email, order processing

---

### Q11: GitHub & Team Collaboration 🤝

**Question:**
```
Let's set up your GitHub repository!

Repository name: [project-name]

Settings:
? Make repository private or public?
  - Private (recommended for most projects)
  - Public (open source)

? Add team members now?
  - Yes (I'll ask for GitHub usernames)
  - No (I'll set it up, you can add later)
```

**If Yes to Team Members:**
```
Team member 1:
? GitHub username: alice
? What's their role?
  1. Admin (full access)
  2. Developer (read + write code)
  3. Viewer (read-only)

Choice? [2]

Add another team member? (yes/no)
```

**User Input:**
- Privacy: "private" or "public"
- Team: usernames with roles
- Or: "skip GitHub" to skip entirely

**AI Enhancement:**
- Claude validates GitHub usernames
- Suggests appropriate permissions

---

### Q12: Firebase Billing (Conditional) 💳

**Question (only if Cloud Functions detected):**
```
⚠️  Your project uses Cloud Functions

Cloud Functions require Firebase Blaze Plan (pay-as-you-go).

Good news:
✓ Generous free tier (2M invocations/month)
✓ Most small apps stay free
✓ Only pay for usage beyond free tier

Typical costs:
- Small app: $0-5/month
- Medium app: $5-20/month
- Large app: $20-100/month

What would you like to do?
1. Set up billing now (I'll guide you)
2. Skip for now (set up before deploying)
3. Remove Cloud Functions (use Spark Plan - free)

Your choice?
```

**User Input:**
- 1, 2, or 3

**If Option 1:**
- Opens billing helper (existing feature)
- Guides through Firebase Console

**AI Enhancement:**
- Claude explains billing clearly
- Shows cost estimates based on project

---

### Q13: Review & Confirmation ✅

**Question:**
```
📋 Let's review your configuration:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PROJECT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project: School Advancement CRM
ID: school-advancement-crm
Type: CRM / Business Tool

Platforms:
✓ Web Application (React + Vite)
✓ Cloud Functions (Backend)

UI Design:
✓ Material Modern
✓ Professional Blue theme
✓ 30+ pre-styled components

Data Models (4):
✓ Donor (name, email, phone, totalDonated)
✓ Campaign (name, goal, current, status)
✓ Event (name, date, location, attendees)
✓ Donation (donorId, amount, date, campaign)

User Roles:
✓ Admin - Full access
✓ Staff - Manage donors & events
✓ Read-only - View reports

Cloud Functions:
✓ Send donation receipts (email)
✓ Generate campaign reports (PDF)
✓ Daily donor engagement (scheduled)

GitHub:
✓ Private repository
✓ Team: alice (admin), bob (developer)

Firebase:
✓ Auto-configure Firestore & Storage
✓ Billing setup: Skip for now

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Everything look good?

1. ✅ Yes, generate my project!
2. ✏️  Edit something (I'll ask what)
3. ❌ Cancel

Your choice?
```

**User Input:**
- 1, 2, or 3

**If Edit:**
```
What would you like to change?
1. Project name/description
2. Platforms
3. UI template/colors
4. Data models
5. User roles
6. Cloud Functions
7. GitHub settings

Which? (or say what to change)
```

**AI Enhancement:**
- Claude allows editing any section
- Re-asks only relevant questions

---

## 🎯 Alternative Flows

### Quick Mode (Experienced Users)

**Single Question:**
```
I can set up your Firebase project quickly!

Just tell me:
1. What you're building
2. Any specific requirements

Example:
"CRM for school fundraising with donor tracking,
campaign management, and event registration.
Use Material-UI with professional blue theme.
Add alice as admin and bob as developer."

What are you building?
```

**AI Parsing:**
- Claude extracts all info from description
- Asks clarifying questions only if needed
- Much faster for power users

---

### Template Mode (Pre-configured)

**Question:**
```
Want to start from a template?

1. 📊 CRM / Customer Management
   - Contacts, Deals, Communications
   - Material-UI, Blaze Plan

2. ✅ Task / Project Management
   - Tasks, Projects, Teams
   - Tailwind, Free tier OK

3. 🛍️ E-Commerce Store
   - Products, Orders, Customers
   - Ant Design, Blaze Plan

4. 📱 Social App
   - Users, Posts, Comments
   - shadcn/ui, Blaze Plan

5. 🎓 Learning Platform
   - Courses, Lessons, Students
   - Material-UI, Blaze Plan

6. ❌ Custom (answer all questions)

Choose template? (1-6)
```

**If Template Selected:**
- Pre-fills most answers
- Only asks for:
  - Project name
  - Colors (optional)
  - Team members (optional)
  - Any customizations

---

## 📊 Question Decision Tree

```
START
  ├─ Project Name (always)
  ├─ Display Name (always)
  ├─ Description (optional)
  ├─ Project Type (always)
  │
  ├─ Platform Selection (always)
  │   ├─ If includes Web → UI Template
  │   │                  └─ Color Customization
  │   ├─ If includes Mobile → (uses same UI config)
  │   └─ If includes Functions → Cloud Functions features
  │
  ├─ Data Models (always)
  │   └─ For each model → Fields & types
  │
  ├─ User Roles (always)
  │   └─ If custom → Define each role
  │
  ├─ GitHub Setup (always)
  │   ├─ Privacy
  │   └─ Team members (optional)
  │
  ├─ Firebase Billing (if Cloud Functions)
  │   └─ Setup now / later / remove functions
  │
  └─ Review & Confirm (always)
      └─ Generate or Edit
```

---

## 🎨 Conversation Style

**Tone:**
- Friendly and encouraging
- Professional but not formal
- Explains options without overwhelming

**Format:**
- Clear section headers (━━━)
- Emoji for visual hierarchy
- Examples for every question
- Default suggestions offered

**AI Behavior:**
- Remembers context from earlier in conversation
- Makes intelligent suggestions
- Can accept natural language answers
- Validates and cleans input
- Explains why certain options are recommended

---

## ⏱️ Estimated Time per Section

| Section | Time | Questions |
|---------|------|-----------|
| Project Identity | 30s | 2-3 |
| Platform & UI | 1-2min | 2-3 |
| Data Models | 1-2min | 3-5 |
| Roles & Functions | 30s-1min | 2-3 |
| GitHub & Billing | 30s-1min | 2-3 |
| Review | 30s | 1 |
| **Total** | **4-7min** | **12-18** |

**Quick Mode:** 1-2 minutes
**Template Mode:** 2-3 minutes

---

## Summary

This conversational wizard provides:

✅ **Guided experience** - Clear questions with examples
✅ **AI-enhanced** - Smart suggestions and validation
✅ **Flexible** - Natural language or structured input
✅ **Fast** - 4-7 minutes for complete setup
✅ **Informative** - Explains options and tradeoffs
✅ **Forgiving** - Can edit any section before generating

**Result:** Users get exactly the Firebase project they need, configured perfectly for their use case, in a natural conversation with Claude Code.
