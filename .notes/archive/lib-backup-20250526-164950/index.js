/**
 * @file index.js
 * @description Main library exports for PSAI application
 * @module lib
 */

// Base components
export { default as BaseComponent } from './components/base/BaseComponent.js';

// UI Components
export { default as NavbarComponent } from './components/ui/NavbarComponent.js';
export { default as HeroComponent } from './components/ui/HeroComponent.js';
export { default as VideoComponent } from './components/ui/VideoComponent.js';
export { default as ParticleSystem } from './components/ui/ParticleSystem.js';

// Feature Components
export { default as SpotAICarousel } from './components/features/SpotAICarousel.js';
export { default as FightingAIGallery } from './components/features/FightingAIGallery.js';
export { default as ReadMoreSection } from './components/features/ReadMoreSection.js';

// Service exports
export { default as appService } from './services/AppService.js';
export { default as eventBus } from './services/EventBus.js';
export { default as ModalService } from './services/ModalService.js';

// Utilities
export { Animation, DOM } from './utils/index.js';
