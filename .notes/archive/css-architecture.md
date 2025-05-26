# PSAI CSS Architecture Simplification

This document provides an overview of the simplified CSS architecture implemented as part of the ES6 modernization plan.

## Architecture Overview

The CSS has been completely restructured to align with the modern ES6 class-based JavaScript architecture. This new structure:

1. Reduces the number of files from 18+ to 10 core files
2. Eliminates code duplication
3. Creates a clear component-based organization
4. Improves maintainability and performance

## Directory Structure

```
src/css/
├── main.css              # Single entry point for all CSS
├── utilities.css         # All utility classes in one file
├── base/
│   ├── reset.css         # CSS reset
│   ├── variables.css     # Design tokens and variables
│   ├── typography.css    # Typography and font styles
│   └── global.css        # Base element styles
└── components/
    ├── components.css    # Shared component styles
    ├── navbar.css        # Navbar component
    ├── modal.css         # Modal system
    ├── cards.css         # Content cards
    ├── buttons.css       # Button styles
    ├── footer.css        # Footer component
    ├── gallery.css       # FightingAIGallery component
    ├── carousel.css      # SpotAICarousel component
    └── hero.css          # HeroAnimations component
```

## Core Principles

### 1. CSS Layers

The architecture uses CSS layers to control specificity and cascade order:

```css
@layer base, components, utilities;
```

This ensures proper cascade while avoiding deep nesting and specificity issues.

### 2. Component Alignment

Each JS class has a corresponding CSS component file:

- `FightingAIGallery.js` → `components/gallery.css`
- `SpotAICarousel.js` → `components/carousel.css`
- `Modal.js` → `components/modal.css`
- `HeroAnimations.js` → `components/hero.css`

### 3. Custom Properties

All design tokens are centralized in `variables.css` using CSS custom properties (variables):

```css
:root {
  --color-primary: #ff4f2a;
  --space-4: 1rem;
  --font-size-lg: clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem);
  /* etc. */
}
```

### 4. Flat Selectors

The architecture avoids deep nesting to prevent specificity wars:

```css
/* Before */
.fightingAI .images-gallery .item .overlay {
  ...;
}

/* After */
.gallery-item-overlay {
  ...;
}
```

## Benefits

1. **Improved Performance**: Reduced file size and HTTP requests
2. **Better Maintainability**: Clear organization and reduced duplication
3. **Clearer Structure**: Each component has its own dedicated CSS
4. **Easier Updates**: Changes to components only require updating one file
5. **Better Developer Experience**: CSS closely mirrors JS architecture

## Migration Notes

The migration was performed using the `migrate-css.sh` script, which:

1. Created a backup of the old CSS architecture
2. Established the new directory structure
3. Migrated and consolidated files into the new structure
4. Updated references in HTML to point to the new main.css file

## Future Considerations

As new components are added:

1. Create a dedicated CSS file in the components directory
2. Import it in main.css
3. Ensure it follows the established architectural principles
