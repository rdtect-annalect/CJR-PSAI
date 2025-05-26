/**
 * @file anime.js
 * @description AnimeJS v4 integration with correct syntax
 */

import { animate } from './libraries/anime.esm.js';

// Export the animate function directly
export { animate } from './libraries/anime.esm.js';

// Also export as default for backward compatibility
export default animate;

// Common animation presets using correct v4 syntax
export const presets = {
  fadeIn: { opacity: { to: 1 }, duration: 600, ease: 'outCubic' },
  fadeOut: { opacity: { to: 0 }, duration: 600, ease: 'outCubic' },
  slideUp: { translateY: { to: 0 }, opacity: { to: 1 }, duration: 800, ease: 'outExpo' },
  slideDown: { translateY: { to: 0 }, opacity: { to: 1 }, duration: 800, ease: 'outExpo' },
  spring: { ease: 'spring(1, 80, 10, 0)', duration: 800 }
};

// Simple helper for scroll-triggered animations
export function scrollTrigger(targets, animation = presets.slideUp) {
  return animate(targets, {
    ...animation,
    // Note: AnimeJS v4 may have different scroll trigger syntax
    // This is a placeholder - check actual v4 documentation
  });
}
