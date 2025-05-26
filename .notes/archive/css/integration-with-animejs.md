# CSS Integration with AnimeJS v4

## Overview
This document explains how our modern CSS architecture integrates with AnimeJS v4 for seamless animations and interactions in the PSAI project.

## Key Integration Points

### Animation Classes
We've designed CSS classes that work harmoniously with AnimeJS:

```css
.animated-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.animated-element.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

These classes provide fallback transitions for when JavaScript is disabled, and also serve as initial states for AnimeJS animations.

### CSS Custom Properties for Animation
We use CSS variables for animation timing and easing that match AnimeJS defaults:

```css
:root {
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}
```

This creates consistency between CSS transitions and JavaScript animations.

## Animation Architecture

### AnimeJS v4 Implementation
The project now uses AnimeJS v4 with its modernized import structure:

```javascript
// For development
import * as anime from '../libs/anime.esm.js';

// For production
// import * as anime from '../libs/anime.esm.min.js';
```

The core functions are exported for direct use:
```javascript
export const { animate, utils, createDraggable, createSpring, timeline } = anime;
```

### Animation Utility Functions
The following utility functions have been implemented and optimized for AnimeJS v4:

1. `createFloatingAnimation` - Creates smooth floating animations for elements
2. `createParallaxAnimation` - Implements parallax effects based on mouse movement
3. `createHoverAnimation` - Handles hover state animations with spring physics
4. `batchAnimations` - Efficiently processes animations in batches for performance
5. `stopAnimations` - Properly cleans up animations to prevent memory leaks

### Animation Integration with CSS
- CSS handles static styling and initial states
- CSS transitions provide fallbacks for non-JS environments
- AnimeJS handles complex animations, physics, and interactive effects
- CSS custom properties ensure consistency between both systems

## Best Practices

1. **Minimal DOM Manipulation**: Use CSS for static styling, AnimeJS for dynamic animations
2. **Performance First**: Use CSS transforms and opacity for smooth 60fps animations
3. **Progressive Enhancement**: Ensure basic functionality without JavaScript
4. **Consistent Timing**: Match CSS transition timing with AnimeJS durations
5. **Hardware Acceleration**: Use `will-change` for complex animations

## Gallery Animation Implementation
For the FightingAI gallery, we use a combination of CSS and AnimeJS:

1. CSS handles basic hover states and transitions
2. AnimeJS handles the floating animation, parallax effects, and complex interactions
3. The SmartLayoutGenerator integrates with both systems by:
   - Generating the grid layout with CSS positioning
   - Providing element references to AnimeJS for animations
   - Maintaining responsive behavior through CSS

## Production Optimization
When preparing for production:

1. Switch to minified AnimeJS import
2. Consider using PostCSS to process and optimize CSS
3. Split animations into separate JavaScript bundles for code-splitting
4. Use `content-visibility: auto` for off-screen content
