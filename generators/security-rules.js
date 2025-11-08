import fs from 'fs';
import path from 'path';
import ora from 'ora';

export async function generateSecurityRules(config, projectPath) {
  const spinner = ora('Generating security rules...').start();

  // Generate Firestore rules
  let firestoreRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() && request.auth.token.role == 'admin';
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

`;

  if (config.dataModels) {
    config.dataModels.forEach(model => {
      const collectionName = model.collection || model.name.toLowerCase() + 's';

      // Generate rules based on user roles and relationships
      firestoreRules += `    // ${model.name} collection\n`;
      firestoreRules += `    match /${collectionName}/{docId} {\n`;

      // Check if model has ownership field
      const ownerField = model.fields?.find(f =>
        f.name.includes('userId') || f.name.includes('agentId') || f.name.includes('ownerId')
      );

      if (ownerField) {
        firestoreRules += `      // Admins can read/write all, owners can manage their own\n`;
        firestoreRules += `      allow read: if isAuthenticated();\n`;
        firestoreRules += `      allow create: if isAuthenticated();\n`;
        firestoreRules += `      allow update, delete: if isAdmin() || isOwner(resource.data.${ownerField.name});\n`;
      } else if (model.name.toLowerCase().includes('user')) {
        firestoreRules += `      // Users can read their own profile, admins can read/write all\n`;
        firestoreRules += `      allow read: if isAdmin() || isOwner(docId);\n`;
        firestoreRules += `      allow create: if isAuthenticated();\n`;
        firestoreRules += `      allow update: if isAdmin() || (isOwner(docId) && request.resource.data.role == resource.data.role);\n`;
        firestoreRules += `      allow delete: if isAdmin();\n`;
      } else {
        firestoreRules += `      // Default: authenticated users can read, admins can write\n`;
        firestoreRules += `      allow read: if isAuthenticated();\n`;
        firestoreRules += `      allow write: if isAdmin();\n`;
      }

      firestoreRules += `    }\n\n`;
    });
  }

  firestoreRules += `  }\n}\n`;

  fs.writeFileSync(path.join(projectPath, 'firestore.rules'), firestoreRules);

  // Generate Storage rules
  const storageRules = `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User uploads - users can only access their own files
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Admin uploads - only admins can access
    match /admin/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.token.role == 'admin';
    }

    // Public files - anyone can read, only admins can write
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
  }
}
`;

  fs.writeFileSync(path.join(projectPath, 'storage.rules'), storageRules);

  // Generate Firestore indexes
  const indexes = {
    indexes: [],
    fieldOverrides: []
  };

  if (config.dataModels) {
    config.dataModels.forEach(model => {
      const collectionName = model.collection || model.name.toLowerCase() + 's';

      // Add common indexes
      if (model.fields) {
        const timestampFields = model.fields.filter(f => f.type === 'timestamp');
        const ownerFields = model.fields.filter(f =>
          f.name.includes('userId') || f.name.includes('agentId')
        );

        // Create composite indexes for owner + timestamp sorting
        ownerFields.forEach(ownerField => {
          timestampFields.forEach(timeField => {
            indexes.indexes.push({
              collectionGroup: collectionName,
              queryScope: 'COLLECTION',
              fields: [
                { fieldPath: ownerField.name, order: 'ASCENDING' },
                { fieldPath: timeField.name, order: 'DESCENDING' }
              ]
            });
          });
        });
      }

      // Add custom indexes from config
      if (model.indexes) {
        model.indexes.forEach(indexFields => {
          indexes.indexes.push({
            collectionGroup: collectionName,
            queryScope: 'COLLECTION',
            fields: indexFields.map(field => ({
              fieldPath: field,
              order: 'ASCENDING'
            }))
          });
        });
      }
    });
  }

  fs.writeFileSync(
    path.join(projectPath, 'firestore.indexes.json'),
    JSON.stringify(indexes, null, 2)
  );

  spinner.succeed('Security rules generated');
}
