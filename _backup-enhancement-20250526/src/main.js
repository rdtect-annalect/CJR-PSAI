/**
 * @file main.js
 * @description PSAi application initialization using component architecture
 */

// Import all components through the centralized index
import {
  // Core services
  appService,
  eventBus,
  
  // Services
  ModalService,
  
  // UI Components
  NavbarComponent,
  // HeroComponent,
 
  ParticleSystem,
  
  // Feature Components
  SpotAICarousel,
  FightingAIGallery,
  ReadMoreSection,
  
  // Utilities
  animate
} from './lib/index.js';

function initApp() {
  console.log('🚀 Starting PSAi...');

  // Set debug mode
  appService.debug = location.hostname === 'localhost' || location.search.includes('debug');

  // Simple navbar scroll behavior
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('[data-navbar]');
  
  if (navbar) {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          navbar.classList.add('navbar-hidden');
        } else {
          // Scrolling up
          navbar.classList.remove('navbar-hidden');
        }
      } else {
        // At top
        navbar.classList.remove('navbar-hidden');
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Register components
  appService
    .register('modal', new ModalService())
    .register('navbar', new NavbarComponent())
    // .register('hero', new HeroComponent({
    //   logoSelector: '.the-PSAI img',
    //   topGifSelector: '.coders-gifs .top-img',
    //   bottomGifSelector: '.coders-gifs .bottom-img'
    // }))
    .register('particles', new ParticleSystem({
      selector: '.particle-container',
      particleCount: 70,
      connectionDistance: 150,
      visibilityDistance: 350,
      primaryColor: 'rgba(255, 255, 255, 0.8)',
      secondaryColor: 'rgba(237, 9, 119, 0.8)',
      zIndex: 100
    }))
    .register('spotAI', new SpotAICarousel({
      containerSelector: '#spotAI',
      carouselSelector: '#spot-ai-carousel',
      prevBtnSelector: '.carousel-btn.prev',
      nextBtnSelector: '.carousel-btn.next',
      dataPath: '/src/data/carouselData.json',
      slidesToShow: 5,
      slidesToScroll: 1,
      enableAutoPlay: true,
      autoPlayInterval: 5000,
      pauseOnHover: true,
      showModalOnClick: true
    }))
    .register('fightingAI', new FightingAIGallery())
    .register('readMore', new ReadMoreSection({
      containerSelector: '#reading',
      dataPath: '/src/data/readMore.json'
    }))
   

  // Initialize app
  appService.init()
    .then(() => console.log('✅ PSAi ready!'))
    .catch(err => console.error('❌ Init failed:', err));

  // Global cleanup
  window.addEventListener('beforeunload', () => appService.destroy());

  // Expose for debugging
  if (appService.debug) {
    window.psai = { appService, eventBus };
  }
}

// Initialize when ready
document.readyState === 'loading' 
  ? document.addEventListener('DOMContentLoaded', initApp)
  : initApp();

export { appService, eventBus };
