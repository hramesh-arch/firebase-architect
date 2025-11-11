# Changelog

All notable changes to Firebase Architect will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2024-11-10

### Added - Major Automation Features! 🚀

#### ⚡ Autonomous Firebase Configuration
- **Auto-enable Firebase services**: Firestore, Authentication, and Storage are now enabled automatically during project creation
- **Auth provider setup**: Email/Password and Google Sign-In providers configured out of the box
- **Config generation**: Firebase configuration automatically fetched and saved to `.env` files
- **Zero manual steps**: No need to visit Firebase Console for basic service setup
- **Graceful fallback**: Falls back to manual instructions if auto-config encounters issues
- Configuration controlled via `architecture.firebase.autoConfig` (default: `true`)

#### 👥 GitHub Collaborator Management
- **Automatic team invites**: Add collaborators to GitHub repository during project creation
- **Permission levels**: Support for all GitHub permission levels (pull, push, admin, maintain, triage)
- **Flexible input**: Accept array of usernames or objects with permission specifications
- **Interactive prompts**: User-friendly CLI prompts for adding team members
- **Batch operations**: Add multiple collaborators in one go
- **Error handling**: Continues with remaining collaborators if some fail
- Configuration via `architecture.github.collaborators` array

### Changed
- Setup automation improved from ~85% to ~99%
- Setup time reduced from 10-20 minutes to 3-5 minutes per project
- Firebase configuration now fully automated (was manual)
- GitHub team setup now automated (was manual)

### Documentation
- Added [NEW_FEATURES_v3.2.md](NEW_FEATURES_v3.2.md) with comprehensive guide
- Updated [README.md](README.md) with new feature highlights
- Created example scripts in `examples/autonomous-setup-example.js`
- Enhanced JSDoc comments in `claude-generator.js`

### Technical Details
- New module: `generators/firebase-auto-config.js`
- Enhanced: `generators/git-setup.js` with collaborator functions
- Updated: `claude-generator.js` with new phase for auto-configuration
- New functions:
  - `autoConfigureFirebaseServices()`
  - `addGitHubCollaborators()`
  - `promptAddCollaborators()`

---

## [3.1.0] - 2024-11-07

### Added
- **Database Structure Preview**: Visual preview of Firestore database before generation
- **Development Mode**: Pre-configured Firebase projects for faster testing
- **Enhanced Documentation**: Comprehensive guides in `.claude/` directory

---

## [3.0.0] - 2024-11-01

### Added
- Complete rewrite for Claude Code integration
- Monorepo structure with Turborepo
- UI template system with multiple frameworks
- Responsive design standards
- Enhanced RBAC security rules
- Development roadmap generation

### Changed
- Migrated from interactive CLI to Claude Code tool
- Simplified architecture for better maintainability
- Improved documentation structure

---

## [2.0.0] - 2024-09-15

### Added
- AI-guided conversational setup
- Gemini AI integration
- GitHub repository automation
- VS Code integration

---

## [1.0.0] - 2024-08-01

### Added
- Initial release
- Basic Firebase project scaffolding
- TypeScript support
- Firestore security rules
- React web app template
