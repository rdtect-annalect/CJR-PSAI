# Modern CSS Approach for PSAI

## Overview
This document outlines the modern CSS approach used for the PSAI static website. We've moved away from Bootstrap dependencies toward a clean, modern vanilla CSS implementation.

## Key Features

### Modern CSS Features Used
- **CSS Custom Properties** (variables) for consistent theming and easier maintenance
- **@import** for modular CSS organization without HTTP request penalties
- **@layer** for explicit cascade layering and priority management
- **CSS Grid & Flexbox** for modern, responsive layouts
- **Fluid Typography** using `clamp()` for responsive text without breakpoints
- **Logical Properties** for better internationalization support
- **Focus-visible** for improved accessibility

### File Structure
We've simplified to a three-file approach:
1. **styles.css** - Main entry point that imports all other CSS
2. **reset.css** - Modern CSS reset based on best practices
3. **fonts.css** - Font declarations and typography rules

### Layer Structure
We use the @layer directive to explicitly control specificity:

```css
@layer base, layout, components, utilities;
```

1. **base** - CSS reset, typography, and foundational styles
2. **layout** - Page structure, grid systems, and layout containers
3. **components** - Reusable UI components like cards, buttons, modals
4. **utilities** - Helper classes and overrides (highest specificity)

### Performance Considerations
- Single bundled CSS file for production
- Self-hosted fonts with preloading
- Minimal use of heavy selectors
- Mobile-first responsive design
- Progressive enhancement principles

## Theming System
We use a comprehensive set of CSS custom properties for consistent design:

- Color palette
- Typography scales
- Spacing system
- Breakpoints
- Shadows and elevation
- Animation timings

## Browser Support
This implementation targets modern browsers with good CSS support:
- Chrome/Edge 88+
- Firefox 84+
- Safari 14+
- iOS Safari 14+
- Samsung Internet 15+

## Migration Notes
This represents a complete shift from the previous Bootstrap-based approach to modern, vanilla CSS. The benefits include:

- Reduced CSS bundle size by ~70%
- Improved performance
- Better design consistency
- Easier maintenance
- No external dependencies

## Further Resources
- [MDN Web Docs: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Every Layout](https://every-layout.dev/)
- [Utopia.fyi](https://utopia.fyi/)
- [Modern CSS Solutions](https://moderncss.dev/)
