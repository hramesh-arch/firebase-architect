#!/usr/bin/env node

/**
 * Example: Using Firebase Architect v3.2 with Autonomous Configuration
 *
 * This example demonstrates:
 * 1. Auto-configuration of Firebase services
 * 2. Adding GitHub collaborators automatically
 * 3. Complete end-to-end project setup
 */

import { generateProject } from '../claude-generator.js';

// Example 1: Full Autonomous Setup
async function exampleFullAutomation() {
  console.log('Example 1: Full Autonomous Setup\n');

  const architecture = {
    projectName: 'team-task-app',
    displayName: 'Team Task Manager',
    description: 'Collaborative task management app with real-time updates',
    projectType: 'monorepo',
    platforms: ['web', 'mobile', 'functions'],

    features: [
      'User authentication',
      'Real-time task boards',
      'Team collaboration',
      'File attachments',
      'Push notifications'
    ],

    userRoles: [
      { role: 'admin', permissions: ['all'], description: 'System administrator' },
      { role: 'manager', permissions: ['manage_teams', 'view_analytics'], description: 'Team manager' },
      { role: 'member', permissions: ['create_tasks', 'comment'], description: 'Team member' }
    ],

    dataModels: [
      {
        name: 'Task',
        fields: [
          { name: 'title', type: 'string', required: true },
          { name: 'description', type: 'string' },
          { name: 'status', type: 'string', enum: ['todo', 'in_progress', 'done'] },
          { name: 'assigneeId', type: 'string', ref: 'users' },
          { name: 'teamId', type: 'string', ref: 'teams' },
          { name: 'dueDate', type: 'timestamp' },
          { name: 'priority', type: 'string', enum: ['low', 'medium', 'high'] },
          { name: 'createdAt', type: 'timestamp', serverTimestamp: true },
          { name: 'updatedAt', type: 'timestamp', serverTimestamp: true }
        ],
        relationships: [
          { type: 'belongsTo', model: 'User', foreignKey: 'assigneeId' },
          { type: 'belongsTo', model: 'Team', foreignKey: 'teamId' }
        ]
      },
      {
        name: 'Team',
        fields: [
          { name: 'name', type: 'string', required: true },
          { name: 'description', type: 'string' },
          { name: 'ownerId', type: 'string', ref: 'users', required: true },
          { name: 'memberIds', type: 'array', items: 'string' },
          { name: 'createdAt', type: 'timestamp', serverTimestamp: true }
        ]
      }
    ],

    firebaseServices: ['auth', 'firestore', 'storage', 'functions'],

    cloudFunctions: [
      { name: 'sendTaskNotification', type: 'firestore', description: 'Send notification when task is assigned' },
      { name: 'generateTeamReport', type: 'https', description: 'Generate analytics report for team' }
    ],

    // NEW v3.2: Autonomous Firebase Configuration
    firebase: {
      create: true,
      autoConfig: true,    // Enable automatic service configuration
      setupBilling: true,  // Interactive billing setup (auto-detected for Cloud Functions)
      projectId: 'team-task-app'
    },

    // NEW v3.2: GitHub Collaborators
    github: {
      create: true,
      visibility: 'private',
      collaborators: [
        // Simple format (defaults to 'push' access)
        'alice-dev',
        'bob-designer',

        // Detailed format with specific permissions
        { username: 'team-lead', permission: 'admin' },
        { username: 'product-manager', permission: 'maintain' },
        { username: 'stakeholder', permission: 'pull' }
      ]
    },

    vscode: {
      open: true
    }
  };

  try {
    const result = await generateProject(architecture);
    console.log('\n✅ Project generated successfully!');
    console.log(`📁 Location: ${result.projectPath}`);
    console.log(`📋 Roadmap: ${result.roadmap}`);
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
  }
}

// Example 2: Firebase Auto-Config Only (No Collaborators)
async function exampleFirebaseOnly() {
  console.log('Example 2: Firebase Auto-Config Only\n');

  const architecture = {
    projectName: 'simple-blog',
    displayName: 'Simple Blog',
    projectType: 'spa',
    platforms: ['web'],

    dataModels: [
      {
        name: 'Post',
        fields: [
          { name: 'title', type: 'string', required: true },
          { name: 'content', type: 'string', required: true },
          { name: 'authorId', type: 'string', ref: 'users' },
          { name: 'publishedAt', type: 'timestamp' }
        ]
      }
    ],

    firebaseServices: ['auth', 'firestore'],

    firebase: {
      create: true,
      autoConfig: true  // Auto-configure Firebase
    },

    github: {
      create: true,
      visibility: 'public',
      collaborators: []  // Empty = no prompts
    },

    vscode: {
      open: false
    }
  };

  try {
    const result = await generateProject(architecture);
    console.log('\n✅ Project generated successfully!');
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
  }
}

// Example 3: Manual Configuration (Disable Auto-Features)
async function exampleManualSetup() {
  console.log('Example 3: Manual Configuration\n');

  const architecture = {
    projectName: 'custom-setup',
    displayName: 'Custom Setup Project',
    projectType: 'monorepo',
    platforms: ['web', 'functions'],

    dataModels: [
      {
        name: 'User',
        fields: [
          { name: 'email', type: 'string', required: true },
          { name: 'name', type: 'string', required: true }
        ]
      }
    ],

    firebaseServices: ['auth', 'firestore'],

    firebase: {
      create: true,
      autoConfig: false  // Disable auto-config for manual control
    },

    github: {
      create: false  // Don't create GitHub repo
    },

    vscode: {
      open: false
    }
  };

  try {
    const result = await generateProject(architecture);
    console.log('\n✅ Project generated successfully!');
    console.log('⚠️  Manual Firebase configuration required');
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
  }
}

// Example 4: Interactive Collaborator Prompts
async function exampleInteractiveCollaborators() {
  console.log('Example 4: Interactive Collaborator Prompts\n');

  const architecture = {
    projectName: 'team-project',
    displayName: 'Team Project',
    projectType: 'spa',
    platforms: ['web'],

    dataModels: [
      {
        name: 'Document',
        fields: [
          { name: 'title', type: 'string', required: true },
          { name: 'content', type: 'string' }
        ]
      }
    ],

    firebaseServices: ['auth', 'firestore'],

    firebase: {
      create: true,
      autoConfig: true
    },

    github: {
      create: true,
      visibility: 'private',
      // Don't specify collaborators = interactive prompts will ask
    },

    vscode: {
      open: true
    }
  };

  try {
    const result = await generateProject(architecture);
    console.log('\n✅ Project generated successfully!');
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
  }
}

// Run examples
const examples = {
  '1': exampleFullAutomation,
  '2': exampleFirebaseOnly,
  '3': exampleManualSetup,
  '4': exampleInteractiveCollaborators
};

const exampleNumber = process.argv[2] || '1';

if (examples[exampleNumber]) {
  console.log(`\n${'='.repeat(60)}`);
  console.log('Firebase Architect v3.2 - Autonomous Setup Examples');
  console.log(`${'='.repeat(60)}\n`);

  examples[exampleNumber]()
    .then(() => {
      console.log('\n✅ Example completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Example failed:', error);
      process.exit(1);
    });
} else {
  console.log(`
Firebase Architect v3.2 - Examples

Usage:
  node examples/autonomous-setup-example.js [example-number]

Examples:
  1 - Full Autonomous Setup (default)
      • Auto-configure Firebase services
      • Add GitHub collaborators automatically
      • Complete end-to-end automation

  2 - Firebase Auto-Config Only
      • Enable Firebase services automatically
      • Skip GitHub collaborators

  3 - Manual Configuration
      • Disable auto-features for custom setup
      • Traditional manual configuration flow

  4 - Interactive Collaborators
      • Auto-configure Firebase
      • Prompt for collaborators interactively

Run:
  node examples/autonomous-setup-example.js 1
  `);
  process.exit(0);
}
