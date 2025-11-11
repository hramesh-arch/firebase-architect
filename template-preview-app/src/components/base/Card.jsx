// Card: Theme-aware card component
// Automatically adapts styling based on design system (Material, Shadcn, Linear)

import { useDesignSystem } from '../../providers/DesignSystemProvider';

export default function Card({
  children,
  className = '',
  hover = true,
  ...props
}) {
  const ds = useDesignSystem();
  const pattern = ds.getComponentPattern('card');

  const padding = ds.getSpacing(pattern.padding || 5);
  const borderRadius = ds.getBorderRadius(pattern.borderRadius || 'lg');

  // Design system specific styling
  const getCardStyles = () => {
    const baseStyles = {
      transition: ds.getTransition('all', 'normal')
    };

    switch (pattern.variant) {
      case 'elevated': // Material Design
        return {
          ...baseStyles,
          backgroundColor: '#ffffff',
          boxShadow: ds.getShadow(pattern.shadow || 'elevated'),
          border: 'none'
        };

      case 'outlined': // Shadcn
        return {
          ...baseStyles,
          backgroundColor: '#ffffff',
          border: ds.getBorder('thin'),
          boxShadow: 'none'
        };

      case 'flat': // Linear
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none'
        };

      default:
        return baseStyles;
    }
  };

  const cardStyles = getCardStyles();

  // Hover styles based on design system
  const getHoverStyles = () => {
    if (!hover) return {};

    if (pattern.hover?.shadow) {
      return {
        ':hover': {
          boxShadow: ds.getShadow(pattern.hover.shadow),
          transform: pattern.hover.translate ? `translateY(${pattern.hover.translate})` : undefined
        }
      };
    }

    if (pattern.hover?.borderColor) {
      return {
        ':hover': {
          borderColor: ds.getBorder(pattern.hover.borderColor)
        }
      };
    }

    return {};
  };

  return (
    <div
      className={`${className} ${hover ? 'hover-card' : ''}`}
      style={{
        padding,
        borderRadius,
        ...cardStyles
      }}
      {...props}
    >
      {children}
    </div>
  );
}
