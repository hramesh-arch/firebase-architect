# Project Location and Git - Quick Reference

## 📍 Where Projects Are Created

### Default Location
```
/Users/harshithramesh/Builds/[project-name]/
```

### Custom Location
When Claude asks "Where should I create the project?", you can specify:

```
/Users/harshithramesh/Projects/my-app
~/Desktop/prototypes/new-app
/path/to/anywhere/you/want
```

### Examples
```
✅ /Users/harshithramesh/Builds/jet-charter
✅ /Users/harshithramesh/Projects/ecommerce-platform
✅ ~/Desktop/hackathon/todo-app
✅ /Users/harshithramesh/clients/acme/their-project
```

---

## 🔄 Git Integration

### Automatic Git Setup

By default, Firebase Architect will:
1. ✅ Initialize git repository
2. ✅ Create initial commit
3. ❓ Ask about remote repository
4. ❓ Ask about pushing

### Option 1: Just Local Git
```
You: "Create a blog platform"

Claude: "Where should I create it, and do you want Git?"

You: "Default location, just local git"

Result:
✅ Git initialized
✅ Initial commit created
❌ No remote
❌ Not pushed
```

### Option 2: With GitHub (Manual Push)
```
You: "Create a blog platform"

Claude: "Where and Git preferences?"

You: "Default location, I have a repo at github.com/user/blog"

Claude: "Should I push the initial code, or let you review first?"

You: "Let me review first"

Result:
✅ Git initialized
✅ Initial commit created
✅ Remote added (origin)
❌ Not pushed (you do it manually)
```

Then you can:
```bash
cd blog
git push -u origin main
```

### Option 3: Fully Automated Push
```
You: "Create a blog, repo is github.com/user/blog, go ahead and push"

Result:
✅ Git initialized
✅ Initial commit created
✅ Remote added
✅ Pushed to main branch
```

### Option 4: No Git Yet
```
You: "Skip git for now"

Result:
❌ No git initialization

You can add later:
```bash
cd project
git init
git add .
git commit -m "Initial commit"
```

---

## 📝 Commit Message

The initial commit message will be:

```
Initial commit: Firebase Architect generated project

🤖 Generated with Firebase Architect

Project: [Your Display Name]
Type: monorepo
Platforms: web, mobile, functions
```

Example:
```
Initial commit: Firebase Architect generated project

🤖 Generated with Firebase Architect

Project: Jet Charter Platform
Type: monorepo
Platforms: web, mobile, functions
```

---

## 🎯 Common Scenarios

### Scenario 1: Quick Prototype (No GitHub Yet)
```
You: "Create a quick prototype for a task app"

Claude: "Where and Git?"

You: "~/Desktop/prototypes/task-app, local git only"

✅ Created at Desktop
✅ Git initialized
✅ Can push to GitHub later when ready
```

### Scenario 2: Client Project (Push to Their Repo)
```
You: "Create client project, they gave me github.com/acme/portal"

Claude: "I'll create it and push to their repo. Where locally?"

You: "/Users/harshithramesh/clients/acme/portal"

✅ Created in clients folder
✅ Git initialized
✅ Connected to acme/portal
✅ Pushed to their repo
```

### Scenario 3: Personal Project (Review Before Push)
```
You: "Create my side project, repo is github.com/me/side-project"

Claude: "Push initial code or review first?"

You: "Let me review first"

✅ Created
✅ Git initialized
✅ Remote added
❌ Not pushed yet

You review, then:
git push -u origin main
```

### Scenario 4: Multiple Environments
```
You: "Create a SaaS platform, I have dev and prod repos"

Claude: "I'll create with dev repo. You can add prod remote later."

You: "Perfect, use github.com/company/saas-dev"

✅ Created
✅ Connected to dev repo
✅ You add prod remote manually later:

git remote add production github.com/company/saas-prod
```

---

## 🔧 Git Configuration Options

When Claude generates your project, you can specify:

### Full Control
```javascript
{
  targetDirectory: "/custom/path",
  git: {
    init: true,              // Initialize repo
    initialCommit: true,     // Create first commit
    remote: "git@github.com:user/repo.git",
    push: false              // Push automatically
  }
}
```

### Common Presets

**Local Only:**
```javascript
{
  git: {
    init: true,
    initialCommit: true
  }
}
```

**With Remote, No Push:**
```javascript
{
  git: {
    init: true,
    initialCommit: true,
    remote: "git@github.com:user/repo.git",
    push: false
  }
}
```

**Fully Automated:**
```javascript
{
  git: {
    init: true,
    initialCommit: true,
    remote: "git@github.com:user/repo.git",
    push: true
  }
}
```

**No Git:**
```javascript
{
  git: {
    init: false
  }
}
```

---

## ⚠️ Important Notes

### SSH vs HTTPS
Make sure your Git remote uses the format you have configured:

**SSH (Recommended):**
```
git@github.com:user/repo.git
```

**HTTPS:**
```
https://github.com/user/repo.git
```

### Pre-requisites for Auto-Push
For auto-push to work:
- ✅ SSH keys configured (for SSH remotes)
- ✅ GitHub CLI authenticated (for HTTPS)
- ✅ Repository must exist
- ✅ You must have push access

If any fail, Claude will create locally and you can push manually.

### .gitignore Included
Every generated project includes a comprehensive `.gitignore`:

```
node_modules/
.env
.env.local
dist/
build/
.firebase/
.DS_Store
```

So your secrets and build artifacts are never committed!

---

## 🎓 Examples

### Example 1: Default Everything
```
You: "Create a blog"
Claude: [Creates at /Users/harshithramesh/Builds/blog with local git]
```

### Example 2: Custom Location
```
You: "Create at ~/Projects/my-blog"
Claude: [Creates at ~/Projects/my-blog with local git]
```

### Example 3: With GitHub
```
You: "Create blog, push to github.com/me/blog"
Claude: [Creates, connects, asks if should push]
You: "Yes, push it"
Claude: [Pushes]
```

### Example 4: No Git
```
You: "Create blog, no git yet"
Claude: [Creates without git]
```

---

## 📊 Summary

| You Say | Location | Git Init | Commit | Remote | Push |
|---------|----------|----------|---------|--------|------|
| "Create app" | Default | ✅ | ✅ | ❌ | ❌ |
| "Create at ~/Projects" | Custom | ✅ | ✅ | ❌ | ❌ |
| "Push to github.com/me/app" | Default | ✅ | ✅ | ✅ | ✅* |
| "Repo is X, don't push" | Default | ✅ | ✅ | ✅ | ❌ |
| "No git" | Default | ❌ | ❌ | ❌ | ❌ |

*Claude will ask for confirmation before auto-pushing

---

**Bottom Line:**
- Projects go to `/Users/harshithramesh/Builds/` by default
- Git is initialized by default
- You control remote and push behavior
- Everything is flexible based on what you tell Claude!
