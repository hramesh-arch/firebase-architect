// DesignSystemProvider: React Context for design system and theme
// Provides design system foundations + user theme to all components

import { createContext, useContext } from 'react';

const DesignSystemContext = createContext(null);

/**
 * DesignSystemProvider wraps the app and provides:
 * - Design system foundations (spacing, borders, shadows, typography)
 * - User theme (colors)
 * - Helper functions to access design tokens
 */
export function DesignSystemProvider({ system, theme, children }) {
  // Merge design system foundations with user theme
  const value = {
    // Design system metadata
    id: system.id,
    name: system.name,

    // Foundations (immutable per design system)
    foundations: system.foundations,
    patterns: system.patterns,

    // User theme (colors can be customized)
    colors: theme.colors,

    // Helper functions to get design tokens
    getSpacing: (scale) => {
      const value = system.foundations.spacing.scale[scale];
      return value !== undefined ? `${value}px` : '0px';
    },

    getBorderRadius: (size) => {
      const value = system.foundations.borderRadius[size];
      return value !== undefined ? `${value}px` : '0px';
    },

    getShadow: (size) => {
      return system.foundations.shadows[size] || 'none';
    },

    getBorder: (strength = 'default') => {
      if (!system.foundations.borders) return 'none';
      const width = system.foundations.borders.width.thin || 1;
      const color = system.foundations.borders.colors[strength] || system.foundations.borders.colors.default;
      return `${width}px solid ${color}`;
    },

    getComponentPattern: (component) => {
      return system.patterns[component] || {};
    },

    // Typography helpers
    fontFamily: system.foundations.typography.fontFamily,
    getFontWeight: (weight) => {
      return system.foundations.typography.fontWeights[weight] || 400;
    },

    // Transition helpers
    getTransition: (properties = 'all', duration = 'normal') => {
      const durationValue = system.foundations.transitions.duration[duration] || '200ms';
      const easing = system.foundations.transitions.easing.standard;
      return `${properties} ${durationValue} ${easing}`;
    }
  };

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}

/**
 * useDesignSystem hook
 * Access design system and theme from any component
 */
export function useDesignSystem() {
  const context = useContext(DesignSystemContext);

  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }

  return context;
}
