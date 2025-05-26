/**
 * @file simplified-index.js
 * @description Simplified exports for PSAi
 */

// Core
export { default as app } from './App.js';
export { default as anime, presets, scrollTrigger } from './anime.js';
export { default as events } from './events.js';
export { $, create, observe } from './dom.js';
export { default as BaseComponent } from './BaseComponent.js';

// Components (update paths as needed)
export { default as NavbarComponent } from './components/ui/NavbarComponent.js';
export { default as HeroComponent } from './components/ui/HeroComponent.js';
export { default as VideoComponent } from './components/ui/VideoComponent.js';
export { default as ParticleSystem } from './components/ui/ParticleSystem.js';
export { default as SpotAICarousel } from './components/features/SpotAICarousel.js';
export { default as FightingAIGallery } from './components/features/FightingAIGallery.js';
export { default as ReadMoreSection } from './components/features/ReadMoreSection.js';
export { default as ModalService } from './services/ModalService.js';
