# AnimeJS v4 Migration and Implementation Notes

## Key Changes in AnimeJS v4

AnimeJS v4 introduces several major changes compared to v3, based on the official migration guide at https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4.

## Project-Specific Implementation

In our CJR-PSAI project, we've implemented AnimeJS for animations as part of our transition away from jQuery and Bootstrap dependencies. Our implementation focuses on creating smooth, efficient animations using vanilla JS and AnimeJS.

### Implementation Details

1. **Utility Layer**: We've created a wrapper utility (`animeUtils.js`) that abstracts AnimeJS functionality and provides consistent APIs for our components.

2. **Integration with Modules**: 
   - FightingAI module uses animations for gallery item movements and hover effects
   - SpotAI module uses animations for card transitions
   - Carousel implementation uses AnimeJS for smooth sliding

3. **Defensive Programming**: Our implementation includes safeguards for:
   - Missing DOM elements
   - Animation errors
   - Browser compatibility issues

4. **Performance Optimizations**:
   - Batch animations for better performance
   - Staggered initialization to prevent main thread blocking
   - Proper cleanup to prevent memory leaks

### Usage Examples from Project

```javascript
// Creating floating animations for gallery items
import { createFloatingAnimation, batchAnimations } from '../utils/animeUtils.js';

// Batch animate multiple gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
batchAnimations(galleryItems, element => 
  createFloatingAnimation(element, {
    duration: 3000 + Math.random() * 3000
  })
);

// Hover effects using our utility
import { createHoverAnimation } from '../utils/animeUtils.js';

const item = document.querySelector('.interactive-item');
const hoverAnimation = createHoverAnimation(item);
item.addEventListener('mouseenter', hoverAnimation.enter);
item.addEventListener('mouseleave', hoverAnimation.leave);
```

### Import Changes

AnimeJS v4 is now distributed as an ES module:

```javascript
// v3 (CommonJS)
const anime = require('animejs');

// v4 (ESM)
import anime from 'animejs';
```

### New API Structure

In v4, AnimeJS exports named functions instead of a default export:

```javascript
// v3
import anime from 'animejs';
anime({ /* ... */ });

// v4
import { animate, utils, createDraggable, createSpring } from 'animejs';
animate({ /* ... */ });
```

The default export is no longer available in v4, so this will not work:

```javascript
// This will NOT work in v4
import anime from 'animejs'; // Error: module doesn't provide a default export
```

### New Utilities

AnimeJS v4 adds several new utility functions:

```javascript
import { animate, utils, createDraggable, createSpring } from 'animejs';

// DOM utilities
const elements = utils.$('.element');

// Create draggable elements
const draggable = createDraggable('.element', {
  container: [0, 0, 0, 0],
  releaseEase: createSpring({ stiffness: 200 })
});

// Define multi-step animations
animate('.element', {
  translateX: [
    { to: 100, ease: 'in(2)', duration: 200 },
    { to: 0, ease: createSpring({ stiffness: 300 }) }
  ]
});

// Staggered animations
animate('.elements', {
  translateY: 100,
  delay: animate.stagger(50)
});
```

### Key Parameter Changes

1. **`ease` instead of `easing`**:
   ```javascript
   // v3
   anime({
     targets: '.element',
     translateX: 100,
     easing: 'easeOutExpo'
   });
   
   // v4
   animate({
     targets: '.element',
     translateX: 100,
     ease: 'out(3)' // Note: 'ease', not 'easing'
   });
   ```

2. **`to` property for sequence animations**:
   ```javascript
   // v3
   anime({
     targets: '.element',
     translateX: [0, 100, 50],
   });
   
   // v4
   animate({
     targets: '.element',
     translateX: [
       { to: 100, duration: 1000 },
       { to: 50, duration: 500 }
     ]
   });
   ```

### Parametric Easings and Springs

AnimeJS v4 introduces parametric easings and spring physics:

```javascript
// Parametric easings
animate('.element', {
  translateX: 100,
  ease: 'out(3)' // Parameter controls the strength
});

// Spring physics
animate('.element', {
  translateX: 100,
  ease: createSpring({ stiffness: 300, damping: 20, mass: 1 })
});
```

### Timeline API

The timeline API has been streamlined:

```javascript
// Create a timeline
const timeline = animate.timeline();

// Add animations to the timeline
timeline
  .add({
    targets: '.element1',
    translateX: 100
  })
  .add({
    targets: '.element2',
    translateY: 100
  }, '-=600'); // Start 600ms before the previous animation ends
```

### Other Changes

- **Performance improvements**: Better handling of large animations
- **Extended stagger API**: More options for staggered animations
- **Better type definitions**: Improved TypeScript support
- **Smaller bundle size**: Optimized for modern browsers

## Implementation Recommendations

When implementing animations in our vanilla JS project:

1. Use the ES module import for better tree-shaking
2. Leverage spring physics for more natural animations
3. Use the timeline API for complex sequences
4. Implement staggered animations for better visual appeal
5. Organize animation code into reusable utility functions

## Browser Support

AnimeJS v4 supports all modern browsers with ES modules support. For older browsers, a bundler like Webpack or Rollup is recommended to transpile the code.

## References

- [Official AnimeJS v4 Migration Guide](https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4)
- [AnimeJS Documentation](https://animejs.com/documentation/)
- [AnimeJS GitHub Repository](https://github.com/juliangarnier/anime)
