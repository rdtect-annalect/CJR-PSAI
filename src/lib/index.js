/**
 * @file index.js
 * @description Centralized exports for PSAi component architecture
 */

// Core Services
export { default as appService } from './services/AppService.js';
export { default as eventBus } from './services/EventBus.js';
export { default as BaseComponent } from './components/base/BaseComponent.js';

// Utilities 
export { default as utils } from './utils/index.js';
export { animate, anime, presets, scrollTrigger, spring, createTimeline, createSpring } from './utils/anime.js';
export { $, create, observe, exists } from './utils/dom.js';
export { load, loadCached, loadMultiple } from './utils/data.js';

// Services
export { default as ModalService } from './services/ModalService.js';

// UI Components
export { default as NavbarComponent } from './components/ui/NavbarComponent.js';
export { default as HeroComponent } from './components/ui/HeroComponent.js';
export { default as ParallaxVideo } from './components/ui/ParallaxVideo.js';
export { default as ScrollAnimations } from './components/ui/ScrollAnimations.js';
export { default as MatrixOverlay } from './components/ui/MatrixOverlay.js';
export { default as ParticleSystem } from './components/ui/ParticleSystem.js';

// Feature Components
export { default as SpotAICarousel } from './components/features/SpotAICarousel.js';
export { default as FightingAIGallery } from './components/features/FightingAIGallery.js';
export { default as ReadMoreSection } from './components/features/ReadMoreSection.js';
