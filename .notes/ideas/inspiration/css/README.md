# KanSearch CSS Architecture - Optimized

## Overview

This is a modular, maintainable CSS architecture for the KanSearch project using 100% vanilla CSS with modern features like CSS variables, cascade layers (@layer), and native nesting.

## File Structure

```
/css
├─ base.css            @layer utilities, base  /* design tokens, utilities & core styles */
├─ effects.css         @layer components       /* animations & visual effects */
├─ responsive.css      @layer responsive       /* global media-range helpers & breakpoint variables */
├─ main.css            /* import orchestrator - for build systems */
├─ overrides.css       @layer overrides        /* emergency patches, loaded last */
├─ components/
│  ├─ ui-components.css  @layer components     /* shared UI components */
│  └─ card-components.css @layer components    /* card styles and hover effects */
└─ sections/
   ├─ header.css       @layer components       /* #header: navigation styles */
   ├─ hero.css         @layer components       /* #hero: hero section styles */
   ├─ problem.css      @layer components       /* #problem: problem section styles */
   ├─ solution.css     @layer components       /* #solution: solution section styles */
   ├─ services.css     @layer components       /* #services: services section styles */
   ├─ why-us.css       @layer components       /* #why-us: why us section styles */
   ├─ expertise.css    @layer components       /* #expertise: expertise section styles */
   ├─ clients.css      @layer components       /* #clients: clients section styles */
   ├─ contact.css      @layer components       /* #contact: contact section styles */
   └─ footer.css       @layer components       /* footer styles */
```

## Loading Order

1. **Base Styles** - Loaded directly in HTML for fastest paint:

   - `base.css` - Consolidated design tokens, utilities, reset, and core styles

2. **Effects & Components** - Visual elements and reusable components:

   - `effects.css` - Animations and visual effects (renamed from animations.css)
   - Component styles from the `/components` directory

3. **Section Styles** - Section-specific layouts and components

4. **Responsive & Overrides** - Loaded last to ensure they take precedence:
   - `responsive.css` - Breakpoint-specific adjustments
   - `overrides.css` - Emergency fixes and overrides (use sparingly)

## Cascade Layers

This architecture uses @layer to manage the cascade order:

1. `@layer utilities` - Design tokens, CSS variables, atomic utility classes
2. `@layer base` - Reset, typography, and foundational styles
3. `@layer components` - Reusable components and section-specific styles
4. `@layer responsive` - Responsive adjustments and media queries
5. `@layer overrides` - Critical fixes and overrides (use sparingly)

## Recent Optimizations

1. **Consolidated Base Styles**: Combined `utilities.css` and `style.css` into a single `base.css` file
2. **Renamed Animations**: Changed `animations.css` to `effects.css` to better reflect its content
3. **Improved Organization**: Moved component CSS files to a dedicated `/components` directory
4. **Fixed Hero Animation**: Improved animation performance with will-change properties
5. **Removed Redundancy**: Eliminated duplicate CSS rules and unnecessary wave effects

## Design Tokens

All design tokens (colors, spacing, shadows, etc.) are defined as CSS variables in `utilities.css`.

Example usage:

```css
.card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-md);
}
```

## Utility Classes

Utility classes for common patterns are available in `utilities.css`.

Examples:

```html
<div class="flex items-center justify-between">
  <div class="card-base hover-lift mb-md">Content</div>
  <div class="text-center">Centered text</div>
</div>
```

## Section-Specific Styles

Each main section of the website has its own CSS file in the `/sections` directory. This keeps related styles together and makes maintenance easier.

## Maintenance Guidelines

1. **Add new section styles** to the appropriate section file
2. **Add new shared components or global elements** to `style.css`
3. **Add new animation keyframes** to `animations.css`
4. **Add new responsive helpers** to `responsive.css`
5. **Use overrides.css sparingly** and only for critical fixes

## Browser Support

This architecture uses modern CSS features including:

- CSS Variables (Custom Properties)
- CSS Cascade Layers (@layer)
- CSS Nesting
- Modern Range Queries

These features are supported in all modern browsers.

## Version Control

Each CSS file includes a version comment (e.g., `/* v1.0.0 Tokens */`) to track changes.
