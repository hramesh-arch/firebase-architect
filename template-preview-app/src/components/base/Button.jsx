// Button: Theme-aware button component
// Automatically adapts styling based on design system (Material, Shadcn, Linear)

import { useDesignSystem } from '../../providers/DesignSystemProvider';

export default function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'danger'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  ...props
}) {
  const ds = useDesignSystem();
  const pattern = ds.getComponentPattern('button');

  // Size mappings
  const sizeMap = {
    sm: { x: 3, y: 1 },
    md: { x: pattern.padding.x || 4, y: pattern.padding.y || 2 },
    lg: { x: 5, y: 3 }
  };

  const paddingSize = sizeMap[size];
  const paddingX = ds.getSpacing(paddingSize.x);
  const paddingY = ds.getSpacing(paddingSize.y);
  const borderRadius = ds.getBorderRadius(pattern.borderRadius || 'md');

  // Variant-based styling
  const getVariantStyles = () => {
    const baseStyles = {
      fontWeight: ds.getFontWeight(pattern.fontWeight || 'medium'),
      textTransform: pattern.textTransform || 'none',
      letterSpacing: pattern.letterSpacing || 'normal',
      transition: ds.getTransition('all', 'fast')
    };

    // Design system specific styling
    switch (pattern.variant) {
      case 'elevated': // Material Design
        return {
          ...baseStyles,
          backgroundColor: variant === 'primary' ? ds.colors.primary :
                          variant === 'danger' ? ds.colors.error :
                          variant === 'secondary' ? ds.colors.secondary : '#f3f4f6',
          color: variant === 'ghost' ? ds.colors.primary : '#ffffff',
          boxShadow: variant === 'ghost' ? 'none' : ds.getShadow(pattern.shadow || 'md'),
          border: 'none',
          ...(variant === 'ghost' && {
            backgroundColor: 'transparent',
            color: ds.colors.primary
          })
        };

      case 'outlined': // Shadcn
        return {
          ...baseStyles,
          backgroundColor: variant === 'primary' ? ds.colors.primary :
                          variant === 'danger' ? ds.colors.error :
                          'transparent',
          color: variant === 'primary' || variant === 'danger' ? '#ffffff' : ds.colors.primary,
          border: variant === 'primary' || variant === 'danger' ? 'none' : ds.getBorder('default'),
          boxShadow: 'none'
        };

      case 'ghost': // Linear
        return {
          ...baseStyles,
          backgroundColor: variant === 'primary' ? ds.colors.primary :
                          variant === 'danger' ? ds.colors.error :
                          'transparent',
          color: variant === 'primary' || variant === 'danger' ? '#ffffff' : ds.colors.primary,
          border: 'none',
          boxShadow: 'none'
        };

      default:
        return baseStyles;
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <button
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        padding: `${paddingY} ${paddingX}`,
        borderRadius,
        ...variantStyles
      }}
      {...props}
    >
      {children}
    </button>
  );
}
