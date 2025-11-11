// Input: Theme-aware input component
// Automatically adapts styling based on design system (Material, Shadcn, Linear)

import { useDesignSystem } from '../../providers/DesignSystemProvider';

export default function Input({
  type = 'text',
  placeholder = '',
  className = '',
  ...props
}) {
  const ds = useDesignSystem();
  const pattern = ds.getComponentPattern('input');

  const paddingX = ds.getSpacing(pattern.padding?.x || 3);
  const paddingY = ds.getSpacing(pattern.padding?.y || 2);
  const borderRadius = ds.getBorderRadius(pattern.borderRadius || 'md');

  // Design system specific styling
  const getInputStyles = () => {
    const baseStyles = {
      fontFamily: ds.fontFamily,
      fontSize: '14px',
      transition: ds.getTransition('all', 'fast'),
      outline: 'none'
    };

    switch (pattern.variant) {
      case 'filled': // Material Design
        return {
          ...baseStyles,
          backgroundColor: '#f5f5f5',
          border: 'none',
          borderBottom: '2px solid transparent',
          color: '#000000'
        };

      case 'outlined': // Shadcn
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          border: ds.getBorder('default'),
          color: '#000000'
        };

      case 'ghost': // Linear
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          border: 'none',
          color: '#000000'
        };

      default:
        return baseStyles;
    }
  };

  const inputStyles = getInputStyles();

  // Focus styles based on design system
  const getFocusClass = () => {
    switch (pattern.focusStyle) {
      case 'underline': // Material
        return 'focus:border-b-2';
      case 'ring': // Shadcn
        return 'focus:ring-2 focus:ring-offset-1';
      case 'subtle-background': // Linear
        return 'focus:bg-gray-50';
      default:
        return 'focus:ring-2';
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${className} ${getFocusClass()}`}
      style={{
        padding: `${paddingY} ${paddingX}`,
        borderRadius,
        ...inputStyles
      }}
      {...props}
    />
  );
}
