/**
 * @file index.js
 * @description Main library exports for PSAI application
 * @module lib
 */

// Core exports
export * from './psai.js';

// Component exports
export { default as NavbarComponent } from './components/ui/NavbarComponent.js';
export { default as HeroComponent } from './components/ui/HeroComponent.js';
export { default as SpotAICarousel } from './components/features/SpotAICarousel.js';
export { default as FightingAIGallery } from './components/features/FightingAIGallery.js';
export { default as ReadMoreSection } from './components/features/ReadMoreSection.js';

// Service exports
export { default as EventBus } from './services/EventBus.js';
export { default as ModalService } from './services/ModalService.js';
