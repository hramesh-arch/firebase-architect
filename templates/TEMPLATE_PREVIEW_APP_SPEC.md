# Template Preview Web App Specification

## Overview

A standalone web application that allows users to preview, customize, and select UI templates for their Firebase projects. Users can see live examples, customize colors and fonts, and generate a configuration code to use with Firebase Architect.

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: React Context + useState
- **Code Highlighting**: Prism.js or Shiki
- **Color Picker**: react-colorful
- **Font Selection**: Google Fonts API

## Application Structure

```
template-preview-app/
├── src/
│   ├── components/
│   │   ├── TemplateGallery.jsx
│   │   ├── TemplateCard.jsx
│   │   ├── TemplatePreview.jsx
│   │   ├── Customizer.jsx
│   │   ├── ColorPicker.jsx
│   │   ├── FontSelector.jsx
│   │   ├── CodeGenerator.jsx
│   │   └── CategoryFilter.jsx
│   ├── templates/
│   │   ├── material-modern/
│   │   ├── ant-design-pro/
│   │   ├── tailadmin/
│   │   ├── coreui/
│   │   ├── shadcn/
│   │   └── med-refills/
│   ├── data/
│   │   └── templates.js (imported from firebase-architect)
│   ├── utils/
│   │   ├── colorUtils.js
│   │   └── themeGenerator.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── templates/ (screenshots, thumbnails)
└── package.json
```

## Key Features

### 1. Template Gallery

**UI Components:**
- Grid layout with template cards
- Category filters (Enterprise, Modern, Healthcare)
- Search bar
- Sort by (Popularity, Name, Category)

**Template Card:**
```jsx
<TemplateCard>
  <Thumbnail image={template.preview.thumbnail} />
  <TemplateName>{template.name}</TemplateName>
  <Framework>{template.framework}</Framework>
  <Description>{template.description}</Description>
  <ActionButtons>
    <Button>Preview</Button>
    <Button>Customize</Button>
  </ActionButtons>
</TemplateCard>
```

### 2. Live Preview

**Features:**
- Full-page iframe preview of template
- Multiple example pages (Dashboard, Table, Form)
- Mobile/Tablet/Desktop responsive preview
- Dark mode toggle (where supported)

**Preview Controls:**
```jsx
<PreviewControls>
  <DeviceSelector>
    <Button>Desktop</Button>
    <Button>Tablet</Button>
    <Button>Mobile</Button>
  </DeviceSelector>
  <PageSelector>
    <Select>
      <Option>Dashboard</Option>
      <Option>Data Table</Option>
      <Option>Forms</Option>
      <Option>Detail View</Option>
    </Select>
  </PageSelector>
</PreviewControls>
```

### 3. Customization Panel

**Color Customization:**
```jsx
<ColorCustomizer>
  <ColorPicker label="Primary" value={colors.primary} onChange={handlePrimaryChange} />
  <ColorPicker label="Secondary" value={colors.secondary} onChange={handleSecondaryChange} />
  <ColorPicker label="Success" value={colors.success} onChange={handleSuccessChange} />
  <ColorPicker label="Warning" value={colors.warning} onChange={handleWarningChange} />
  <ColorPicker label="Error" value={colors.error} onChange={handleErrorChange} />

  <PalettePresets>
    <PresetButton palette="blue-professional" />
    <PresetButton palette="green-healthcare" />
    <PresetButton palette="purple-creative" />
  </PalettePresets>
</ColorCustomizer>
```

**Font Customization:**
```jsx
<FontCustomizer>
  <FontSelector
    label="Font Family"
    value={typography.fontFamily}
    options={FONT_COMBINATIONS}
    onChange={handleFontChange}
  />
  <FontSizeSlider
    label="Base Font Size"
    value={typography.fontSize}
    min={12}
    max={18}
    onChange={handleFontSizeChange}
  />
</FontCustomizer>
```

**Spacing & Layout:**
```jsx
<LayoutCustomizer>
  <Slider label="Spacing Scale" value={spacing} onChange={handleSpacingChange} />
  <Slider label="Border Radius" value={borderRadius} onChange={handleRadiusChange} />
</LayoutCustomizer>
```

### 4. Code Generator

**Output:**
- Configuration JSON
- One-line command for CLI
- Copy-paste instructions

**UI:**
```jsx
<CodeGenerator>
  <Tabs>
    <Tab label="Configuration">
      <CodeBlock language="json">
        {JSON.stringify(configuration, null, 2)}
      </CodeBlock>
      <CopyButton />
    </Tab>

    <Tab label="CLI Command">
      <CodeBlock language="bash">
        {`/new-firebase-app --template=${templateId} --config='${configString}'`}
      </CodeBlock>
      <CopyButton />
    </Tab>

    <Tab label="Instructions">
      <Instructions>
        1. Copy the configuration code above
        2. Open Claude Code in VS Code
        3. Type /new-firebase-app
        4. When asked about UI template, paste the configuration
        5. Claude Code will set up your project with this template!
      </Instructions>
    </Tab>
  </Tabs>
</CodeGenerator>
```

### 5. Component Showcase

**For Each Template:**
- List of all available components
- Interactive component examples
- Code snippets for each component

```jsx
<ComponentShowcase>
  <ComponentGrid>
    {template.components.map(component => (
      <ComponentCard key={component}>
        <ComponentPreview component={component} />
        <ComponentName>{component}</ComponentName>
        <ViewCodeButton />
      </ComponentCard>
    ))}
  </ComponentGrid>
</ComponentShowcase>
```

## User Flow

### Flow 1: Quick Selection

```
User lands on gallery
→ Browses templates
→ Clicks "Customize" on a template
→ Sees live preview
→ Clicks "Use This Template"
→ Gets configuration code
→ Copies code
→ Returns to Claude Code
→ Pastes configuration when prompted
```

### Flow 2: Deep Customization

```
User lands on gallery
→ Selects a template
→ Opens customization panel
→ Adjusts colors using color picker
→ Tries different color palettes
→ Changes font family
→ Adjusts spacing/border radius
→ Sees changes live in preview
→ Switches between different example pages
→ Tests mobile/tablet views
→ Satisfied with customization
→ Clicks "Generate Code"
→ Copies configuration
→ Returns to Claude Code
```

## API Endpoints (If Needed)

### GET /api/templates
Returns list of all templates with metadata

### GET /api/templates/:id
Returns full template details

### POST /api/generate-config
Generates configuration based on customization
**Input:**
```json
{
  "templateId": "material-modern",
  "colors": {...},
  "typography": {...}
}
```
**Output:**
```json
{
  "config": {...},
  "cliCommand": "...",
  "dependencies": [...]
}
```

## Deployment

### Option 1: Static Hosting
- Deploy to Vercel/Netlify
- URL: https://templates.firebase-architect.com
- Free, fast, CDN-distributed

### Option 2: Firebase Hosting
- Deploy to Firebase Hosting
- URL: https://templates.firebaseapp.com
- Integrated with Firebase Architect ecosystem

### Option 3: GitHub Pages
- Deploy to GitHub Pages
- URL: https://firebase-architect.github.io/templates
- Free, version-controlled

## URL Structure

```
https://templates.firebase-architect.com/

Routes:
/ - Gallery homepage
/templates/:id - Template detail page
/templates/:id/customize - Customization page
/templates/:id/preview - Full-screen preview
/compare - Compare multiple templates side-by-side
```

## Configuration Output Format

When user finalizes their customization, generate this:

```json
{
  "uiTemplate": {
    "templateId": "material-modern",
    "templateName": "Material Modern",
    "framework": "Material-UI (MUI)",
    "customization": {
      "colors": {
        "primary": "#1976d2",
        "secondary": "#dc004e",
        "success": "#4caf50",
        "warning": "#ff9800",
        "error": "#f44336",
        "info": "#2196f3"
      },
      "typography": {
        "fontFamily": "'Roboto', sans-serif",
        "fontSize": 14
      },
      "spacing": 8,
      "borderRadius": 4
    },
    "components": ["AppBar", "Drawer", "DataGrid", ...],
    "layouts": ["dashboard", "list-view", "form-view"],
    "dependencies": {
      "@mui/material": "^5.15.0",
      "@mui/icons-material": "^5.15.0"
    }
  }
}
```

## Integration with Firebase Architect

### In Claude Code Session:

**User:**
```
/new-firebase-app
```

**Claude:**
```
Tell me about your app - what are you building?
```

**User:**
```
[Describes app]
```

**Claude:**
```
Would you like to select a UI template?

You can:
A) Use default styling (Material-UI)
B) Choose and customize a template

If you want to customize, visit: https://templates.firebase-architect.com
Browse templates, customize colors/fonts, and paste the configuration code here.
```

**User:**
```
[Pastes configuration JSON from template app]
```

**Claude:**
```
Great! I'll use the Material Modern template with your custom colors.
Setting up your environment with:
- Primary color: #1976d2
- Font: Roboto
- 20+ pre-styled components

[Continues with setup...]
```

## Mobile Experience

- Fully responsive design
- Touch-friendly customization controls
- Swipeable template gallery
- Mobile preview mode by default
- Save customizations to local storage
- Share configuration via URL parameters

## Accessibility

- WCAG AA compliant
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators
- Alt text for all images

## Performance

- Lazy load template previews
- Optimize images (WebP format)
- Code splitting
- CDN for static assets
- Service worker for offline access
- < 3s initial load time

## Future Enhancements

1. **Template Marketplace**
   - User-submitted templates
   - Ratings and reviews
   - Premium templates

2. **AI-Powered Recommendations**
   - "Templates similar to your description"
   - "Other users building [app type] chose..."

3. **Team Collaboration**
   - Save and share customizations
   - Team template libraries
   - Approval workflows

4. **Advanced Customization**
   - Custom component creation
   - CSS override editor
   - Import custom fonts

5. **Version Control**
   - Save multiple versions
   - Compare versions
   - Rollback to previous

## Development Timeline

**Phase 1 (Week 1):** Core gallery + basic preview
**Phase 2 (Week 2):** Customization panel + live updates
**Phase 3 (Week 3):** Code generation + Firebase Architect integration
**Phase 4 (Week 4):** Polish, testing, deployment

## Success Metrics

- Template selection rate: >70%
- Customization usage: >40%
- Configuration copy rate: >90%
- Average time to selection: <5 minutes
- User satisfaction: >4.5/5

---

**Note:** This web app can be built as a separate project or included as part of Firebase Architect. The key is seamless integration with the Claude Code workflow.
