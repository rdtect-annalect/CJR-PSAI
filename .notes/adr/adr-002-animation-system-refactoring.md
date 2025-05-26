# ADR-002: Animation System Refactoring

## Status
✅ Accepted

## Context
Our animation system was fragmented across multiple files with inconsistent APIs and performance bottlenecks. We needed a more maintainable and performant solution.

## Decision
Refactor the animation system using AnimeJS v4 with a centralized `animeUtils.js` module that provides:
- Predefined animation presets
- Consistent timing and easing
- Better performance through hardware acceleration
- Cleaner integration with our component system

## Key Features
```javascript
// Basic fade in
createAnimation(element, animations.fadeIn);

// Chained animations
createAnimation(element, [
  animations.fadeIn,
  { ...animations.slideUp, delay: 200 }
]);

// Custom animation
createAnimation(element, {
  duration: 1000,
  easing: 'easeOutQuad',
  properties: {
    opacity: [0, 1],
    translateY: [20, 0]
  }
});
```

## Implementation Details
- Uses AnimeJS v4's `animate` function
- Implements proper cleanup on component unmount
- Provides sensible defaults for common animations
- Supports both single elements and groups

## Performance Considerations
- Uses `will-change` for optimized animations
- Implements `transform` and `opacity` for hardware acceleration
- Automatically cleans up animation instances
- Supports `requestAnimationFrame` for smooth animations

## Migration Path
1. Replace direct AnimeJS calls with `createAnimation`
2. Use predefined animation presets where possible
3. Update any custom animations to use the new API

## Related ADRs
- ADR-001: Unified DOM Utilities
- ADR-003: Module System Implementation
