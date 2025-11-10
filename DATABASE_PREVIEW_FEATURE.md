# Database Structure Preview Feature

**Added:** 2025-11-10
**Version:** 3.1.0

---

## Overview

The **Database Structure Preview** feature allows users to visualize and validate their complete Firestore database structure **before generating the project**. This helps catch design issues early and ensures the data model meets requirements.

## What It Shows

### 1. **Database Overview Statistics**
```
┌─────────────────────────────┐
│   Database Overview         │
│                             │
│   Collections:    5         │
│   Total Fields:   42        │
│   Relationships:  8         │
│   Indexes:        3         │
│   User Roles:     2         │
└─────────────────────────────┘
```

### 2. **Collections & Fields**
Detailed tables showing:
- Collection names (Firestore path)
- Field names and types
- Required vs optional fields
- Default values

Example:
```
1. users/
   Collection for: User

   ┌─────────────────────┬─────────┬──────────┬─────────┐
   │ Field               │ Type    │ Required │ Default │
   ├─────────────────────┼─────────┼──────────┼─────────┤
   │ email               │ string  │ ✓ Yes    │ -       │
   │ displayName         │ string  │ ✓ Yes    │ -       │
   │ role                │ string  │ ✓ Yes    │ agent   │
   │ createdAt           │ timestamp│ ✓ Yes    │ -       │
   │ lastLogin           │ timestamp│ No       │ -       │
   └─────────────────────┴─────────┴──────────┴─────────┘
```

### 3. **Relationships Diagram**
Visual representation of how collections relate to each other:
```
User:
   → * Task (via userId)
   → * Document (via ownerId)

Task:
   * → User (via userId)
   → Status (via statusId)
```

Relationship types:
- `→ *` = One-to-Many
- `* →` = Many-to-One
- `→` = One-to-One
- `* ↔ *` = Many-to-Many

### 4. **Security Rules Summary**
Shows who can read/write/delete each collection:
```
┌─────────────────────┬──────────────────┬──────────────┬──────────────┐
│ Collection          │ Read             │ Write        │ Delete       │
├─────────────────────┼──────────────────┼──────────────┼──────────────┤
│ users               │ Owner + Admin    │ Owner + Admin│ Admin only   │
│ tasks               │ Authenticated    │ Admin only   │ Admin only   │
│ documents           │ Owner + Admin    │ Owner + Admin│ Admin only   │
│ public-content      │ All users        │ Admin only   │ Admin only   │
└─────────────────────┴──────────────────┴──────────────┴──────────────┘
```

### 5. **Firestore Indexes**
Lists composite indexes that will be created:
```
users:
   1. Composite: [createdAt, role]
   2. Composite: [role, lastLogin]

tasks:
   1. Composite: [userId, status, dueDate]
```

### 6. **Storage Estimates**
Estimates document sizes and free tier capacity:
```
┌─────────────────────┬──────────────────┬─────────────┬──────────────────────────┐
│ Collection          │ Est. Doc Size    │ Free Tier   │ Notes                    │
├─────────────────────┼──────────────────┼─────────────┼──────────────────────────┤
│ users               │ ~350B            │ 2.9M docs   │ Typical size             │
│ tasks               │ ~500B            │ 2.0M docs   │ Typical size             │
│ documents           │ ~2.5KB           │ 400K docs   │ May be larger (arrays)   │
└─────────────────────┴──────────────────┴─────────────┴──────────────────────────┘

   Firebase Free Tier: 1GB storage, 50K reads/day, 20K writes/day
   Estimated sufficient for: Development and small-scale production
```

### 7. **Entity Relationship Diagram (ERD)**
ASCII visualization of entity relationships:
```
   ┌─────────────────────────────────────┐
   │ users                               │
   │  ↓                                  │
   ├─────────────────────────────────────┤
   │ tasks                               │
   │  ↓                                  │
   ├─────────────────────────────────────┤
   │ documents                           │
   └─────────────────────────────────────┘
```

---

## How to Use

### During Project Generation

When running Firebase Architect, the database preview is automatically offered:

**Conversational Mode:**
```bash
firebase-architect
# Choose: AI-Guided Setup

# After AI analyzes your requirements:
# You'll see the architecture overview
# Then you'll be asked:
? View detailed database structure preview? (Y/n)
```

**Prompt Mode:**
```bash
firebase-architect
# Choose: Custom from Prompt

# After pasting requirements and AI analysis:
? View detailed database structure preview? (Y/n)
```

### Standalone Preview (Programmatic)

You can also use the preview programmatically:

```javascript
import { DatabasePreviewer } from './generators/database-previewer.js';

const architecture = {
  projectName: 'my-app',
  dataModels: [
    {
      name: 'User',
      collection: 'users',
      fields: [
        { name: 'email', type: 'string', required: true },
        { name: 'displayName', type: 'string', required: true }
      ]
    }
  ],
  userRoles: [
    { role: 'admin', permissions: ['read', 'write', 'delete'] }
  ]
};

// Display in terminal
const previewer = new DatabasePreviewer(architecture);
previewer.display();
previewer.displayERD();

// Export to markdown
const markdown = previewer.toMarkdown();
fs.writeFileSync('database-structure.md', markdown);

// Export to JSON
const json = JSON.stringify(previewer.toJSON(), null, 2);
fs.writeFileSync('database-structure.json', json);
```

---

## Export Options

### Export to Markdown

```javascript
import { exportPreview } from './generators/database-previewer.js';

const markdown = exportPreview(architecture, 'markdown');
fs.writeFileSync('database-preview.md', markdown);
```

**Use cases:**
- Share with team members
- Include in documentation
- Version control for database schema

### Export to JSON

```javascript
const json = exportPreview(architecture, 'json');
fs.writeFileSync('database-preview.json', json);
```

**Use cases:**
- Programmatic analysis
- CI/CD validation
- Schema comparison tools

---

## Benefits

### 1. **Early Validation**
- Catch missing fields before generation
- Identify incorrect data types
- Spot missing relationships
- Verify index coverage

### 2. **Better Planning**
- Understand data structure at a glance
- See security implications before deployment
- Estimate storage needs
- Plan query patterns

### 3. **Team Communication**
- Share database design with stakeholders
- Get feedback before implementation
- Document architecture decisions
- Onboard new developers faster

### 4. **Cost Awareness**
- See storage estimates upfront
- Understand free tier limitations
- Plan for scale

---

## Examples

### Example 1: Simple Blog
```javascript
const blogArchitecture = {
  dataModels: [
    {
      name: 'Post',
      fields: [
        { name: 'title', type: 'string', required: true },
        { name: 'content', type: 'string', required: true },
        { name: 'authorId', type: 'string', required: true },
        { name: 'publishedAt', type: 'timestamp', required: true },
        { name: 'tags', type: 'array', required: false }
      ],
      relationships: [
        { model: 'User', type: 'manyToOne', field: 'authorId' }
      ],
      indexes: [
        ['authorId', 'publishedAt'],
        ['tags', 'publishedAt']
      ]
    },
    {
      name: 'User',
      fields: [
        { name: 'email', type: 'string', required: true },
        { name: 'displayName', type: 'string', required: true }
      ]
    }
  ],
  userRoles: [
    { role: 'author', permissions: ['read', 'write'] },
    { role: 'reader', permissions: ['read'] }
  ]
};
```

**Preview Output:**
```
📊 Collections & Fields

1. posts/
   Fields: title (string), content (string), authorId (string),
           publishedAt (timestamp), tags (array)
   Relationships: Many-to-One with User via authorId
   Indexes: [authorId, publishedAt], [tags, publishedAt]

2. users/
   Fields: email (string), displayName (string)
   Relationships: One-to-Many with Post

💫 Relationships
Post:
   * → User (via authorId)

🔐 Security Rules
posts: Read (Authenticated), Write (Author only), Delete (Author only)
users: Read (Owner + Admin), Write (Owner + Admin), Delete (Admin only)

💾 Storage Estimates
posts: ~800B per document, ~1.2M documents in free tier
users: ~200B per document, ~5M documents in free tier
```

### Example 2: E-Commerce
```javascript
const ecommerceArchitecture = {
  dataModels: [
    {
      name: 'Product',
      fields: [
        { name: 'name', type: 'string', required: true },
        { name: 'price', type: 'number', required: true },
        { name: 'inventory', type: 'number', required: true },
        { name: 'categoryId', type: 'string', required: true }
      ],
      indexes: [['categoryId', 'price']]
    },
    {
      name: 'Order',
      fields: [
        { name: 'userId', type: 'string', required: true },
        { name: 'items', type: 'array', required: true },
        { name: 'total', type: 'number', required: true },
        { name: 'status', type: 'string', required: true },
        { name: 'createdAt', type: 'timestamp', required: true }
      ],
      relationships: [
        { model: 'User', type: 'manyToOne', field: 'userId' }
      ],
      indexes: [
        ['userId', 'status', 'createdAt']
      ]
    }
  ]
};
```

---

## Technical Details

### File Location
`generators/database-previewer.js`

### Dependencies
- `chalk` - Terminal colors
- `cli-table3` - ASCII tables
- `boxen` - Bordered boxes

### Class: DatabasePreviewer

**Methods:**
```javascript
constructor(config)          // Initialize with architecture config
display()                    // Display full preview in terminal
displayOverview()            // Display statistics
displayCollections()         // Display collections with fields
displayRelationships()       // Display relationship diagram
displaySecurityRules()       // Display security rules
displayIndexes()             // Display Firestore indexes
displayStorageEstimates()    // Display storage estimates
displayERD()                 // Display entity relationship diagram
toJSON()                     // Export as JSON object
toMarkdown()                 // Export as markdown string
```

### Integration Points

The preview is integrated at these decision points:

1. **After AI analysis** (conversational mode)
2. **After requirements parsing** (prompt mode)
3. **After architecture refinement** (when user modifies)

---

## Future Enhancements

### Planned Features

1. **Interactive Mode**
   - Navigate between collections
   - Drill down into field details
   - Edit structure in preview

2. **Validation Warnings**
   - Missing indexes for common queries
   - Potential security rule issues
   - Field type inconsistencies

3. **Schema Comparison**
   - Compare before/after refinement
   - Show differences between versions
   - Track schema evolution

4. **Query Preview**
   - See sample queries for each collection
   - Visualize which indexes will be used
   - Estimate query performance

5. **Cost Calculator**
   - More accurate storage estimates
   - Read/write operation predictions
   - Monthly cost projections

6. **Export to Diagram Tools**
   - Export to draw.io
   - Export to Mermaid diagram
   - Export to PlantUML

---

## FAQ

**Q: Can I skip the preview?**
A: Yes, just answer "No" when asked if you want to view the preview.

**Q: Does the preview affect generation?**
A: No, it's purely informational. Whether you view it or not doesn't change what gets generated.

**Q: Can I save the preview?**
A: Yes, use the `toMarkdown()` or `toJSON()` methods programmatically, or copy from terminal output.

**Q: What if my database structure is complex?**
A: The preview handles any number of collections, fields, and relationships. Very large schemas may take a moment to render.

**Q: Can I preview changes after refinement?**
A: Yes, after you refine the architecture, you'll be offered to view the preview again.

**Q: Does this work for existing projects?**
A: Currently, the preview works during generation only. Analyzing existing projects is a planned feature.

---

## Changelog

### v3.1.0 (2025-11-10)
- ✨ **NEW**: Database structure preview feature
- Added `DatabasePreviewer` class
- Integrated into conversational and prompt modes
- Added preview after architecture refinement
- Export to markdown and JSON
- Entity relationship diagram visualization
- Storage estimates and free tier calculations
- Security rules visualization

---

## Contributing

To improve the database preview feature:

1. **Add new visualization types** in `database-previewer.js`
2. **Improve estimates** with more accurate calculations
3. **Add validation warnings** for common issues
4. **Create export formats** (SVG diagrams, etc.)

See `CODEBASE_REVIEW_AND_RECOMMENDATIONS.md` for more enhancement ideas.

---

**Enjoy visualizing your database structure before you build!** 🎨📊
