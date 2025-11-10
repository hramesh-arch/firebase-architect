import chalk from 'chalk';
import Table from 'cli-table3';
import boxen from 'boxen';

/**
 * Database Structure Previewer
 * Shows users what their Firestore database will look like before generation
 */

export class DatabasePreviewer {
  constructor(config) {
    this.config = config;
  }

  /**
   * Display complete database structure preview
   */
  display() {
    console.log('\n' + chalk.cyan.bold('═══════════════════════════════════════════════════════'));
    console.log(chalk.cyan.bold('           DATABASE STRUCTURE PREVIEW'));
    console.log(chalk.cyan.bold('═══════════════════════════════════════════════════════\n'));

    if (!this.config.dataModels || this.config.dataModels.length === 0) {
      console.log(chalk.yellow('⚠️  No data models defined yet.\n'));
      return;
    }

    // Overview statistics
    this.displayOverview();

    // Collections and their structure
    this.displayCollections();

    // Relationships diagram
    this.displayRelationships();

    // Security rules summary
    this.displaySecurityRules();

    // Indexes summary
    this.displayIndexes();

    // Storage estimates
    this.displayStorageEstimates();

    console.log(chalk.cyan.bold('═══════════════════════════════════════════════════════\n'));
  }

  /**
   * Display database overview statistics
   */
  displayOverview() {
    const stats = {
      collections: this.config.dataModels.length,
      totalFields: this.config.dataModels.reduce((sum, m) => sum + (m.fields?.length || 0), 0),
      relationships: this.config.dataModels.reduce((sum, m) => sum + (m.relationships?.length || 0), 0),
      indexes: this.config.dataModels.reduce((sum, m) => sum + (m.indexes?.length || 0), 0),
      roles: this.config.userRoles?.length || 0
    };

    const overview = boxen(
      chalk.white.bold('Database Overview\n\n') +
      chalk.gray(`Collections:    ${stats.collections}\n`) +
      chalk.gray(`Total Fields:   ${stats.totalFields}\n`) +
      chalk.gray(`Relationships:  ${stats.relationships}\n`) +
      chalk.gray(`Indexes:        ${stats.indexes}\n`) +
      chalk.gray(`User Roles:     ${stats.roles}`),
      {
        padding: 1,
        borderColor: 'cyan',
        borderStyle: 'round',
        margin: { bottom: 1 }
      }
    );

    console.log(overview);
  }

  /**
   * Display all collections with their fields
   */
  displayCollections() {
    console.log(chalk.yellow.bold('📊 Collections & Fields\n'));

    this.config.dataModels.forEach((model, index) => {
      const collectionName = model.collection || model.name.toLowerCase() + 's';

      console.log(chalk.white.bold(`${index + 1}. ${collectionName}/`));
      console.log(chalk.gray(`   Collection for: ${model.name}`));

      if (model.fields && model.fields.length > 0) {
        // Create table for fields
        const fieldsTable = new Table({
          head: [
            chalk.cyan('Field'),
            chalk.cyan('Type'),
            chalk.cyan('Required'),
            chalk.cyan('Default')
          ],
          colWidths: [25, 15, 12, 20],
          style: { head: [], border: [] }
        });

        model.fields.forEach(field => {
          fieldsTable.push([
            field.name,
            chalk.blue(field.type),
            field.required ? chalk.green('✓ Yes') : chalk.gray('No'),
            field.default || chalk.gray('-')
          ]);
        });

        console.log(fieldsTable.toString());
      } else {
        console.log(chalk.gray('   No fields defined'));
      }

      console.log(); // Spacing
    });
  }

  /**
   * Display relationship diagram
   */
  displayRelationships() {
    const hasRelationships = this.config.dataModels.some(m =>
      m.relationships && m.relationships.length > 0
    );

    if (!hasRelationships) {
      console.log(chalk.gray('💫 No relationships defined\n'));
      return;
    }

    console.log(chalk.yellow.bold('💫 Relationships\n'));

    this.config.dataModels.forEach(model => {
      if (!model.relationships || model.relationships.length === 0) return;

      console.log(chalk.white.bold(`${model.name}:`));

      model.relationships.forEach(rel => {
        const arrow = rel.type === 'oneToMany' ? '→ *' :
                     rel.type === 'manyToOne' ? '* →' :
                     rel.type === 'oneToOne' ? '→' : '* ↔ *';

        console.log(chalk.gray(`   ${arrow} ${rel.model}`) +
                   chalk.blue(` (via ${rel.field})`));
      });

      console.log();
    });
  }

  /**
   * Display security rules summary
   */
  displaySecurityRules() {
    console.log(chalk.yellow.bold('🔐 Security Rules\n'));

    if (!this.config.userRoles || this.config.userRoles.length === 0) {
      console.log(chalk.gray('   Default rules: Authenticated read/write\n'));
      return;
    }

    // Display roles
    console.log(chalk.white('User Roles:'));
    this.config.userRoles.forEach(role => {
      console.log(chalk.gray(`   • ${role.role}: `) +
                 chalk.blue(role.permissions?.join(', ') || 'standard permissions'));
    });

    console.log();

    // Display collection-level rules
    const rulesTable = new Table({
      head: [
        chalk.cyan('Collection'),
        chalk.cyan('Read'),
        chalk.cyan('Write'),
        chalk.cyan('Delete')
      ],
      colWidths: [25, 20, 20, 20],
      style: { head: [], border: [] }
    });

    this.config.dataModels.forEach(model => {
      const collectionName = model.collection || model.name.toLowerCase() + 's';

      // Determine access rules based on model characteristics
      const isUserData = model.name.toLowerCase().includes('user');
      const isPublic = model.name.toLowerCase().includes('public');

      let readRule, writeRule, deleteRule;

      if (isPublic) {
        readRule = chalk.green('All users');
        writeRule = chalk.yellow('Admin only');
        deleteRule = chalk.yellow('Admin only');
      } else if (isUserData) {
        readRule = chalk.green('Owner + Admin');
        writeRule = chalk.green('Owner + Admin');
        deleteRule = chalk.yellow('Admin only');
      } else {
        readRule = chalk.green('Authenticated');
        writeRule = chalk.yellow('Admin only');
        deleteRule = chalk.yellow('Admin only');
      }

      rulesTable.push([collectionName, readRule, writeRule, deleteRule]);
    });

    console.log(rulesTable.toString());
    console.log();
  }

  /**
   * Display indexes that will be created
   */
  displayIndexes() {
    const hasIndexes = this.config.dataModels.some(m =>
      m.indexes && m.indexes.length > 0
    );

    if (!hasIndexes) {
      console.log(chalk.gray('📑 No composite indexes defined (auto-indexes will be used)\n'));
      return;
    }

    console.log(chalk.yellow.bold('📑 Firestore Indexes\n'));

    this.config.dataModels.forEach(model => {
      if (!model.indexes || model.indexes.length === 0) return;

      const collectionName = model.collection || model.name.toLowerCase() + 's';
      console.log(chalk.white(`${collectionName}:`));

      model.indexes.forEach((index, i) => {
        console.log(chalk.gray(`   ${i + 1}. Composite: [`) +
                   chalk.blue(index.join(', ')) +
                   chalk.gray(']'));
      });

      console.log();
    });
  }

  /**
   * Estimate storage requirements
   */
  displayStorageEstimates() {
    console.log(chalk.yellow.bold('💾 Storage Estimates\n'));

    const estimatesTable = new Table({
      head: [
        chalk.cyan('Collection'),
        chalk.cyan('Est. Doc Size'),
        chalk.cyan('Free Tier'),
        chalk.cyan('Notes')
      ],
      colWidths: [25, 18, 15, 35],
      style: { head: [], border: [] }
    });

    this.config.dataModels.forEach(model => {
      const collectionName = model.collection || model.name.toLowerCase() + 's';

      // Estimate document size based on fields
      const fieldCount = model.fields?.length || 0;
      const avgFieldSize = 50; // bytes per field (rough estimate)
      const estimatedSize = fieldCount * avgFieldSize;

      let sizeDisplay;
      if (estimatedSize < 1024) {
        sizeDisplay = `~${estimatedSize}B`;
      } else {
        sizeDisplay = `~${(estimatedSize / 1024).toFixed(1)}KB`;
      }

      // Free tier documents (rough estimate)
      const freeGigabyte = 1024 * 1024 * 1024;
      const docsInFreeTier = Math.floor(freeGigabyte / estimatedSize);
      const freeTierDisplay = docsInFreeTier > 1000000 ?
        `${(docsInFreeTier / 1000000).toFixed(1)}M docs` :
        `${(docsInFreeTier / 1000).toFixed(0)}K docs`;

      // Usage notes
      let notes = '';
      if (model.fields?.some(f => f.type === 'array' || f.type === 'object')) {
        notes = 'May be larger (arrays/objects)';
      } else if (fieldCount > 20) {
        notes = 'Large document';
      } else {
        notes = 'Typical size';
      }

      estimatesTable.push([
        collectionName,
        chalk.blue(sizeDisplay),
        chalk.green(freeTierDisplay),
        chalk.gray(notes)
      ]);
    });

    console.log(estimatesTable.toString());
    console.log();

    // Free tier summary
    console.log(chalk.gray('   Firebase Free Tier: 1GB storage, 50K reads/day, 20K writes/day'));
    console.log(chalk.gray('   Estimated sufficient for: Development and small-scale production\n'));
  }

  /**
   * Generate visual ERD (Entity Relationship Diagram)
   */
  displayERD() {
    console.log(chalk.yellow.bold('📐 Entity Relationship Diagram\n'));

    const hasRelationships = this.config.dataModels.some(m =>
      m.relationships && m.relationships.length > 0
    );

    if (!hasRelationships) {
      console.log(chalk.gray('   (No relationships to visualize)\n'));
      return;
    }

    // Simple ASCII ERD
    console.log(chalk.gray('   ┌─────────────────────────────────────┐'));
    this.config.dataModels.forEach((model, index) => {
      const collectionName = model.collection || model.name.toLowerCase() + 's';
      console.log(chalk.gray('   │ ') + chalk.white.bold(collectionName.padEnd(35)) + chalk.gray(' │'));

      if (model.relationships && model.relationships.length > 0) {
        model.relationships.forEach(rel => {
          const arrow = rel.type === 'oneToMany' ? '  ↓' :
                       rel.type === 'manyToOne' ? '  ↑' : '  ↔';
          console.log(chalk.gray('   │') + chalk.blue(arrow.padEnd(37)) + chalk.gray('│'));
        });
      }

      if (index < this.config.dataModels.length - 1) {
        console.log(chalk.gray('   ├─────────────────────────────────────┤'));
      }
    });
    console.log(chalk.gray('   └─────────────────────────────────────┘\n'));
  }

  /**
   * Generate a preview report as JSON (for programmatic use)
   */
  toJSON() {
    return {
      overview: {
        collections: this.config.dataModels.length,
        totalFields: this.config.dataModels.reduce((sum, m) => sum + (m.fields?.length || 0), 0),
        relationships: this.config.dataModels.reduce((sum, m) => sum + (m.relationships?.length || 0), 0),
        indexes: this.config.dataModels.reduce((sum, m) => sum + (m.indexes?.length || 0), 0)
      },
      collections: this.config.dataModels.map(model => ({
        name: model.collection || model.name.toLowerCase() + 's',
        model: model.name,
        fieldCount: model.fields?.length || 0,
        fields: model.fields || [],
        relationships: model.relationships || [],
        indexes: model.indexes || []
      })),
      security: {
        roles: this.config.userRoles || [],
        rulesGenerated: true
      }
    };
  }

  /**
   * Export preview to markdown file
   */
  toMarkdown() {
    let md = '# Database Structure Preview\n\n';
    md += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    md += '---\n\n';

    // Overview
    md += '## Overview\n\n';
    md += `- **Collections:** ${this.config.dataModels.length}\n`;
    md += `- **Total Fields:** ${this.config.dataModels.reduce((sum, m) => sum + (m.fields?.length || 0), 0)}\n`;
    md += `- **Relationships:** ${this.config.dataModels.reduce((sum, m) => sum + (m.relationships?.length || 0), 0)}\n`;
    md += `- **User Roles:** ${this.config.userRoles?.length || 0}\n\n`;

    // Collections
    md += '## Collections\n\n';
    this.config.dataModels.forEach(model => {
      const collectionName = model.collection || model.name.toLowerCase() + 's';
      md += `### ${collectionName}\n\n`;
      md += `**Model:** ${model.name}\n\n`;

      if (model.fields && model.fields.length > 0) {
        md += '**Fields:**\n\n';
        md += '| Field | Type | Required | Default |\n';
        md += '|-------|------|----------|----------|\n';
        model.fields.forEach(field => {
          md += `| ${field.name} | ${field.type} | ${field.required ? '✓' : ''} | ${field.default || '-'} |\n`;
        });
        md += '\n';
      }

      if (model.relationships && model.relationships.length > 0) {
        md += '**Relationships:**\n\n';
        model.relationships.forEach(rel => {
          md += `- ${rel.type} with \`${rel.model}\` via \`${rel.field}\`\n`;
        });
        md += '\n';
      }

      if (model.indexes && model.indexes.length > 0) {
        md += '**Indexes:**\n\n';
        model.indexes.forEach(index => {
          md += `- Composite: [${index.join(', ')}]\n`;
        });
        md += '\n';
      }
    });

    return md;
  }
}

/**
 * Interactive preview mode - allows user to explore database structure
 */
export async function interactivePreview(config) {
  const previewer = new DatabasePreviewer(config);

  // Display full preview
  previewer.display();

  // Optional: Display ERD
  previewer.displayERD();

  return previewer;
}

/**
 * Export database preview to file
 */
export function exportPreview(config, format = 'markdown') {
  const previewer = new DatabasePreviewer(config);

  if (format === 'json') {
    return JSON.stringify(previewer.toJSON(), null, 2);
  } else if (format === 'markdown') {
    return previewer.toMarkdown();
  }

  throw new Error(`Unsupported format: ${format}`);
}
