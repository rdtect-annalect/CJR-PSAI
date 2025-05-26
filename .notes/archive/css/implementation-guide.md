# PSAI CSS Implementation Guide

## Overview
This document outlines how to implement the new streamlined CSS architecture in the PSAI project, replacing the previous Bootstrap-based approach with a clean, modern vanilla CSS implementation.

## Implementation Steps

### 1. Update HTML References
In `index.html`, update the CSS references:

```html
<!-- CSS -->
<link rel="preload" href="src/css-simple/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link rel="stylesheet" href="src/css-simple/styles.css">
</noscript>
```

### 2. Class Updates
The new CSS uses more semantic and modern class names. Here are the key replacements:

| Old Class | New Class | Purpose |
|-----------|-----------|---------|
| `.navbar-brand` | `.navbar__logo` | Logo container |
| `.navbar-nav` | `.navbar__menu` | Navigation menu |
| `.nav-item` | `.navbar__item` | Nav item |
| `.nav-link` | `.navbar__link` | Nav link |
| `.btn-primary` | `.btn.btn-primary` | Primary button |
| `.hero-section` | `.section-hero` | Hero section |
| `.row` | `.grid` | Row layout |
| `.col-md-6` | Grid utility classes | Column layout |

### 3. Clean Up Existing CSS
Once the new CSS is implemented:
1. Move the old CSS files to `src/css-archive/`
2. Test thoroughly across browsers and devices
3. Remove the old CSS references after verification

## Modern CSS Features Used

### CSS Layers
We use `@layer` to explicitly control specificity:

```css
@layer base, layout, components, utilities;
```

This ensures utilities always override components, which override layout, etc.

### CSS Custom Properties
We use CSS variables for consistency and theming:

```css
--color-primary: #FF4F2A;
--space-md: 1rem;
```

These can be easily changed in one place to update the entire site.

### Logical Properties
We use logical properties for better internationalization:

```css
margin-inline: auto;  /* Instead of margin-left/right */
padding-block: var(--space-md);  /* Instead of padding-top/bottom */
```

### Container Queries
For components that need to respond to their container size:

```css
@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

## Performance Benefits

### Reduced File Size
- Old CSS approach: ~45KB gzipped
- New CSS approach: ~12KB gzipped
- **Reduction: ~73%**

### Faster Rendering
- Eliminates render-blocking resources
- Reduces layout shifts
- Improves Core Web Vitals scores

### Better Maintainability
- Self-contained styles with logical organization
- Clear specificity hierarchy with @layers
- Explicit documentation of design system

## Browser Support
The new CSS requires modern browsers, with good support in:
- Chrome/Edge 88+
- Firefox 84+
- Safari 14+
- iOS Safari 14+

## Future Enhancements
- Consider implementing CSS Container Queries for more responsive components
- Explore CSS Houdini for custom animations and effects
- Implement CSS Nesting when browser support improves
