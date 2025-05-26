/**
 * @file index.js
 * @description Centralized exports for PSAi utilities
 */

// DOM Utilities
import * as domUtils from './dom.js';
export * from './dom.js';

// Animation Utilities
import { anime, animate, presets, scrollTrigger, spring, createTimeline, createSpring, utils as animeUtils } from './anime.js';
export { anime, animate, presets, scrollTrigger, spring, createTimeline, createSpring, animeUtils };

// Data Utilities
import * as dataUtils from './data.js';
export * from './data.js';

// Export a unified object for direct access
const utils = {
  dom: domUtils,
  anime: animate, // Use the new animate function as anime
  data: dataUtils,
  presets,
  scrollTrigger,
  spring,
  createTimeline,
  createSpring
};

export default utils;
