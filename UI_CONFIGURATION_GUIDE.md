# UI Configuration Guide

## Overview

Firebase Architect includes a **UI Template System** that generates pre-configured design systems, component libraries, and responsive layouts for your web app.

---

## 🎨 Available UI Templates

### 1. Material Modern (Default)
**Framework:** Material-UI (MUI)
**Best for:** Enterprise apps, data-heavy dashboards, admin panels

**Features:**
- Google Material Design principles
- Comprehensive component library (30+ components)
- Built-in data grid and date pickers
- Professional elevation/shadow system
- Responsive layouts out of the box

**Default Colors:**
- Primary: `#1976d2` (Blue)
- Secondary: `#dc004e` (Pink)
- Success: `#4caf50` (Green)
- Warning: `#ff9800` (Orange)
- Error: `#f44336` (Red)

**Components Included:**
- AppBar, Drawer, DataGrid, Card, Button, TextField
- Select, Autocomplete, DatePicker, Dialog, Snackbar
- Tabs, Stepper, Accordion, Chip, Avatar, Badge

**Layouts:**
- Dashboard, List View, Form View, Detail View, Settings

**Dependencies Added:**
```json
{
  "@mui/material": "^5.15.0",
  "@mui/icons-material": "^5.15.0",
  "@mui/x-data-grid": "^6.18.0",
  "@mui/x-date-pickers": "^6.18.0",
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0"
}
```

---

### 2. Ant Design Pro
**Framework:** Ant Design
**Best for:** Enterprise applications, B2B SaaS, Fortune 500 companies

**Features:**
- Battle-tested by Alibaba and Fortune 500 companies
- Pro Components for business scenarios
- Advanced table with inline editing
- Professional form layouts
- Chart integration ready

**Default Colors:**
- Primary: `#1890ff` (Blue)
- Success: `#52c41a` (Green)
- Warning: `#faad14` (Gold)
- Error: `#f5222d` (Red)

**Components Included:**
- Layout, Menu, Table, Form, Card, Button, Input
- Select, DatePicker, Modal, Message, Notification
- Tabs, Steps, Collapse, Tag, Avatar, Badge, Descriptions

**Layouts:**
- Pro Layout (sidebar + header), List Page, Form Page, Detail Page, Result Page

**Dependencies Added:**
```json
{
  "antd": "^5.12.0",
  "@ant-design/icons": "^5.2.0",
  "@ant-design/pro-components": "^2.6.0",
  "@ant-design/pro-layout": "^7.17.0"
}
```

---

### 3. TailAdmin Modern
**Framework:** Tailwind CSS (utility-first)
**Best for:** Custom designs, developer-focused teams, modern startups

**Features:**
- Utility-first CSS for maximum flexibility
- No component library lock-in
- Highly customizable
- Minimal bundle size
- Dark mode ready

**Default Colors:**
- Primary: `#3c50e0` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Error: `#ef4444` (Red)

**Components Included:**
- Pre-built Tailwind component templates
- Headless UI components
- Form components
- Card templates
- Navigation patterns

**Layouts:**
- Dashboard, Analytics, Data Tables, Forms, Profile

**Dependencies Added:**
```json
{
  "tailwindcss": "^3.4.0",
  "@headlessui/react": "^1.7.0",
  "@heroicons/react": "^2.1.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0"
}
```

---

### 4. CoreUI Enterprise
**Framework:** Bootstrap 5 + React
**Best for:** Bootstrap fans, traditional enterprise apps, government projects

**Features:**
- Bootstrap 5 styling
- Professional admin template
- Chart.js integration
- Icon library included
- Familiar Bootstrap patterns

**Default Colors:**
- Primary: `#321fdb` (Purple)
- Secondary: `#9da5b1` (Gray)
- Success: `#2eb85c` (Green)
- Warning: `#f9b115` (Yellow)
- Error: `#e55353` (Red)

**Components Included:**
- Sidebar, Header, Table, Form, Card, Button, Input
- Select, Modal, Toast, Alert, Tabs, Accordion
- Badge, Spinner, Progress, Dropdown, Pagination

**Dependencies Added:**
```json
{
  "@coreui/react": "^4.11.0",
  "@coreui/icons": "^3.0.1",
  "@coreui/icons-react": "^2.2.1",
  "react-bootstrap": "^2.9.0",
  "bootstrap": "^5.3.0"
}
```

---

### 5. shadcn/ui Modern
**Framework:** Radix UI + Tailwind
**Best for:** Modern web apps, design-conscious teams, copy-paste workflow

**Features:**
- Copy-paste components (no npm package)
- Built on Radix UI primitives
- Fully accessible (ARIA compliant)
- Customizable with CSS variables
- TypeScript-first

**Default Colors:**
- Primary: `hsl(222, 47%, 11%)` (Dark blue)
- Secondary: `hsl(210, 40%, 96%)` (Light gray)
- Accent: `hsl(210, 40%, 96%)`
- Muted: `hsl(210, 40%, 96%)`

**Components Included:**
- Button, Card, Dialog, Dropdown, Form, Input
- Label, Select, Switch, Textarea, Toast, Tooltip
- Sheet, Tabs, Table, Avatar, Badge, Skeleton

**Dependencies Added:**
```json
{
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-select": "^2.0.0",
  "class-variance-authority": "^0.7.0",
  "tailwindcss": "^3.4.0"
}
```

---

### 6. Clean Accessible
**Framework:** Minimal (Tailwind + Headless UI)
**Best for:** Accessibility-first apps, government sites, healthcare

**Features:**
- WCAG 2.1 AAA compliant
- Keyboard navigation optimized
- Screen reader tested
- High contrast support
- Focus management

**Default Colors:**
- Primary: `#0066cc` (Accessible blue)
- Secondary: `#5f6368` (High contrast gray)
- Success: `#0d7520` (Accessible green)
- Warning: `#b95000` (Accessible orange)
- Error: `#d93025` (Accessible red)

**Components Included:**
- All components meet WCAG 2.1 Level AA
- Skip links, focus indicators
- ARIA labels and descriptions
- Semantic HTML

---

## 🔧 Configuration Options

### Basic Usage

```javascript
const architecture = {
  projectName: 'my-app',
  platforms: ['web'],

  // UI Template Configuration
  uiTemplate: {
    templateId: 'material-modern',  // Choose template
    customization: {
      colors: {
        primary: '#3B82F6',        // Custom primary color
        secondary: '#8B5CF6'       // Custom secondary color
      }
    }
  }
};
```

### Full Customization

```javascript
uiTemplate: {
  templateId: 'ant-design-pro',

  customization: {
    // Color customization
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
      background: '#F9FAFB',
      surface: '#FFFFFF',
      text: {
        primary: '#111827',
        secondary: '#6B7280'
      }
    },

    // Typography customization
    typography: {
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      lineHeight: 1.5,
      letterSpacing: 'normal'
    },

    // Spacing customization
    spacing: 8,  // Base spacing unit (8px)

    // Border radius customization
    borderRadius: {
      small: 4,
      medium: 8,
      large: 12,
      full: 9999
    },

    // Shadows
    shadows: {
      small: '0 1px 2px rgba(0,0,0,0.05)',
      medium: '0 4px 6px rgba(0,0,0,0.1)',
      large: '0 10px 15px rgba(0,0,0,0.1)',
      xl: '0 20px 25px rgba(0,0,0,0.15)'
    },

    // Breakpoints (responsive)
    breakpoints: {
      xs: 480,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  }
}
```

---

## 📁 What Gets Generated

### Theme Configuration File

**For Material-UI:**
```typescript
// apps/web/src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
    },
    secondary: {
      main: '#8B5CF6',
    },
    // ... full palette
  },
  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    // ... full typography
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  // ... full theme config
});
```

**For Tailwind CSS:**
```javascript
// apps/web/tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        // ... full color palette
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      spacing: {
        // Custom spacing scale
      },
      borderRadius: {
        // Custom border radius
      },
    },
  },
  // ... full config
};
```

### Component Templates

Example generated components:

```
apps/web/src/components/
├── ui/                    # Base UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   └── ...
├── layouts/               # Layout components
│   ├── DashboardLayout.tsx
│   ├── FormLayout.tsx
│   └── DetailLayout.tsx
└── examples/              # Example implementations
    ├── DashboardExample.tsx
    ├── FormExample.tsx
    └── TableExample.tsx
```

### Responsive Configuration

```typescript
// apps/web/src/config/responsive.ts
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const containerMaxWidths = {
  xs: '100%',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Media query helpers
export const media = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`
};
```

---

## 🎨 Color System

### How Colors Are Used

**Primary:** Main brand color, CTAs, links
**Secondary:** Accent color, secondary actions
**Success:** Success states, positive feedback
**Warning:** Warning states, caution messages
**Error:** Error states, destructive actions
**Info:** Informational messages
**Background:** Page background
**Surface:** Card/component backgrounds
**Text Primary:** Main text color
**Text Secondary:** Subtle text, descriptions

### Accessible Color Pairings

The tool automatically ensures:
- Text on background meets WCAG AA (4.5:1 contrast)
- Primary/secondary colors are distinguishable
- Error/warning colors are accessible
- Focus states have 3:1 contrast

---

## 📱 Responsive Design

### Default Breakpoints

```javascript
{
  xs: '480px',   // Extra small (mobile)
  sm: '640px',   // Small (large mobile)
  md: '768px',   // Medium (tablet)
  lg: '1024px',  // Large (laptop)
  xl: '1280px',  // Extra large (desktop)
  '2xl': '1536px' // 2X extra large (large desktop)
}
```

### Generated Responsive Utilities

```typescript
// Example usage in components
<Box
  sx={{
    fontSize: { xs: '14px', md: '16px', lg: '18px' },
    padding: { xs: 2, md: 3, lg: 4 },
    display: { xs: 'block', md: 'flex' }
  }}
>
  Responsive content
</Box>
```

---

## 🔌 Integration with Generated Code

### Automatic Integration

The UI template automatically:

1. **Wraps your app with theme provider:**
```typescript
// apps/web/src/App.tsx
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

2. **Configures component defaults:**
```typescript
// All buttons use primary color by default
<Button>Click me</Button>

// All cards use surface background
<Card>Card content</Card>
```

3. **Sets up responsive containers:**
```typescript
// Containers respect breakpoints
<Container maxWidth="lg">
  {/* Content */}
</Container>
```

---

## 🎯 Use Cases

### Dashboard Application

```javascript
uiTemplate: {
  templateId: 'material-modern',  // or 'ant-design-pro'
  customization: {
    colors: {
      primary: '#1976d2',  // Professional blue
      secondary: '#dc004e'
    }
  }
}
```

**Generates:**
- Dashboard layout with sidebar
- Data grid for tables
- Chart components ready
- Form layouts
- Settings pages

---

### Consumer App

```javascript
uiTemplate: {
  templateId: 'tailadmin-modern',  // or 'shadcn-modern'
  customization: {
    colors: {
      primary: '#8B5CF6',  // Brand purple
      secondary: '#EC4899'  // Brand pink
    },
    borderRadius: {
      medium: 16  // Rounded, friendly feel
    }
  }
}
```

**Generates:**
- Modern, consumer-friendly UI
- Large, touch-friendly buttons
- Smooth animations
- Mobile-first responsive design

---

### Accessibility-First App

```javascript
uiTemplate: {
  templateId: 'clean-accessible',
  customization: {
    colors: {
      primary: '#0066cc',  // WCAG AAA blue
      // High contrast colors
    },
    typography: {
      fontSize: 16,  // Minimum 16px
      lineHeight: 1.5  // Readable line height
    }
  }
}
```

**Generates:**
- WCAG 2.1 Level AA compliant
- Skip links for navigation
- Focus indicators
- Screen reader optimized
- Keyboard navigation

---

## 🛠️ Customization After Generation

### Update Theme Colors

```typescript
// apps/web/src/theme/theme.ts
export const theme = createTheme({
  palette: {
    primary: {
      main: '#YOUR_NEW_COLOR',
    },
  },
});
```

### Add Custom Components

```typescript
// apps/web/src/components/ui/MyButton.tsx
import { Button as MuiButton } from '@mui/material';

export function MyButton(props) {
  return (
    <MuiButton
      {...props}
      sx={{
        // Custom styles
        borderRadius: 2,
        textTransform: 'none',
        ...props.sx
      }}
    />
  );
}
```

### Override Component Defaults

```typescript
// apps/web/src/theme/theme.ts
export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});
```

---

## 📊 Template Comparison

| Feature | Material | Ant Design | Tailwind | CoreUI | shadcn | Clean |
|---------|----------|------------|----------|--------|--------|-------|
| **Best for** | Enterprise | B2B SaaS | Startups | Traditional | Modern | Accessibility |
| **Components** | 30+ | 50+ | DIY | 40+ | 40+ | 30+ |
| **Bundle Size** | Large | Large | Small | Medium | Small | Small |
| **Customization** | Medium | Low | High | Medium | High | High |
| **Learning Curve** | Medium | Medium | Low | Low | Low | Medium |
| **Mobile Ready** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Dark Mode** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Accessibility** | Good | Good | DIY | Good | Excellent | Excellent |
| **TypeScript** | Excellent | Excellent | Good | Good | Excellent | Excellent |

---

## 🚀 Quick Start Examples

### Example 1: Material Dashboard

```javascript
import { generateProject } from './firebase-architect/claude-generator.js';

await generateProject({
  projectName: 'admin-dashboard',
  platforms: ['web'],

  uiTemplate: {
    templateId: 'material-modern',
    customization: {
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e'
      }
    }
  },

  dataModels: [/* ... */]
});
```

**Result:**
- Professional Material-UI dashboard
- Data grids for tables
- Pre-styled forms
- Responsive layouts

---

### Example 2: Custom Brand Colors

```javascript
uiTemplate: {
  templateId: 'tailadmin-modern',
  customization: {
    colors: {
      primary: '#FF6B6B',     // Brand red
      secondary: '#4ECDC4',   // Brand teal
      success: '#95E1D3',     // Light green
      warning: '#FFE66D',     // Light yellow
      error: '#F38181'        // Light red
    },
    typography: {
      fontFamily: "'Poppins', sans-serif"
    },
    borderRadius: {
      medium: 12
    }
  }
}
```

---

## 📚 Additional Resources

- **Template Documentation:** Each template includes detailed docs in `.claude/guides/UI_GUIDE.md`
- **Component Examples:** See `apps/web/src/components/examples/`
- **Theme Reference:** Check `apps/web/src/theme/theme.ts`
- **Responsive Guide:** Review `.claude/guides/RESPONSIVE_DESIGN.md`

---

## 💡 Tips

1. **Start with a template** - Don't build from scratch
2. **Customize colors** - Make it your brand
3. **Test responsive** - Check all breakpoints
4. **Follow conventions** - Use generated component patterns
5. **Dark mode** - Most templates include dark mode support
6. **Accessibility** - Use semantic HTML and ARIA labels

---

## Summary

UI Configuration in Firebase Architect provides:

✅ **6 professional templates** to choose from
✅ **Full customization** of colors, typography, spacing
✅ **Responsive design** system built-in
✅ **30-50+ components** per template
✅ **Pre-configured layouts** (dashboard, forms, tables)
✅ **TypeScript types** for theme system
✅ **Accessibility support** (WCAG 2.1)
✅ **Dark mode ready** for most templates

**Result:** Production-ready UI system configured in seconds, fully customizable to your brand!
