#!/usr/bin/env node

/**
 * Simple runner for firebase-architect that accepts JSON architecture
 * Usage: node run-generator.js '{"projectName": "my-app", ...}'
 */

import { generateProject } from './claude-generator.js';

async function main() {
  try {
    // Get architecture from command line argument or stdin
    let architectureJson;

    if (process.argv[2]) {
      // From command line argument
      architectureJson = process.argv[2];
    } else {
      // From stdin (for piping)
      architectureJson = await new Promise((resolve) => {
        let data = '';
        process.stdin.on('data', (chunk) => (data += chunk));
        process.stdin.on('end', () => resolve(data));
      });
    }

    const architecture = JSON.parse(architectureJson);

    console.log('🚀 Starting Firebase Architect...\n');
    console.log(`Project: ${architecture.displayName || architecture.projectName}\n`);

    const result = await generateProject(architecture);

    console.log('\n✅ Setup complete!\n');
    console.log(`📁 Project: ${result.projectPath}`);
    console.log(`📋 Handoff: ${result.handoffPrompt}`);
    console.log(`🗺️  Roadmap: ${result.roadmap}\n`);

    // Output result as JSON to stdout for programmatic access
    process.stdout.write('\n__RESULT_JSON_START__\n');
    process.stdout.write(JSON.stringify(result, null, 2));
    process.stdout.write('\n__RESULT_JSON_END__\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
