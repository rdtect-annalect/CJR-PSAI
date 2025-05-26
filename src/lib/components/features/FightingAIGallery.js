import BaseComponent from '../base/BaseComponent.js';
import { $, observe } from '../../utils/dom.js';
import { animate, presets } from '../../utils/anime.js';

export default class FightingAIGallery extends BaseComponent {
  constructor(config = {}) {
    super(config);
    this.config = {
      containerSelector: '.fighting-ai',
      gallerySelector: '[data-gallery]',
      dataPath: '/src/data/fightingAI.json',
      ...config
    };
    this.galleryData = [];
  }

  async init() {
    try {
      this.container = $(this.config.containerSelector);
      if (!this.container) throw new Error('Container not found');
      await this.loadAllData();
      if (this.galleryData && this.galleryData.length > 0) {
        this.renderGallery();
        this.setupEventListeners();
      }
      return this;
    } catch (error) {
      console.error('Failed to initialize FightingAIGallery:', error);
      throw error;
    }
  }

  async loadAllData() {
    try {
      const response = await fetch(this.config.dataPath);
      const data = await response.json();
      
      if (data && data.batches) {
        // Flatten all batches into one array
        this.galleryData = [];
        Object.values(data.batches).forEach(batch => {
          if (Array.isArray(batch)) {
            this.galleryData = this.galleryData.concat(batch);
          }
        });
      } else if (Array.isArray(data)) {
        this.galleryData = data;
      } else if (data && Array.isArray(data.items)) {
        this.galleryData = data.items;
      } else {
        this.galleryData = [];
      }
      
      console.log(`Loaded ${this.galleryData.length} gallery items successfully`);
    } catch (error) {
      console.error('Failed to load gallery data:', error);
      this.galleryData = [];
    }
  }
  renderGallery() {
    const galleryContainer = $(this.config.gallerySelector);
    if (!galleryContainer) return;

    galleryContainer.innerHTML = '';
    galleryContainer.className = 'gallery gallery-collage';
    
    // Create collage layout with enhanced interactions
    this.galleryData.slice(0, 12).forEach((item, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = `gallery-item gallery-item-${index + 1}`;
      galleryItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          ${item.stats && item.stats.views ? `<span class="views">${item.stats.views.toLocaleString()} views</span>` : ''}
        </div>
      `;
      
      // Enhanced mouse interactions with AnimeJS
      this.on(galleryItem, 'mouseenter', () => {
        animate(galleryItem, {
          scale: { to: 1.05 },
          duration: 300,
          ease: 'outQuart'
        });
        
        // Animate overlay
        const overlay = galleryItem.querySelector('.gallery-overlay');
        if (overlay) {
          animate(overlay, {
            opacity: { to: 1, from: 0 },
            duration: 200,
            ease: 'outCubic'
          });
        }
      });
      
      this.on(galleryItem, 'mouseleave', () => {
        animate(galleryItem, {
          scale: { to: 1 },
          duration: 300,
          ease: 'outQuart'
        });
        
        // Animate overlay out
        const overlay = galleryItem.querySelector('.gallery-overlay');
        if (overlay) {
          animate(overlay, {
            opacity: { to: 0 },
            duration: 200,
            ease: 'outCubic'
          });
        }
      });
      
      // Click handler for modal
      this.on(galleryItem, 'click', () => {
        this.openModal(item);
      });
      
      galleryContainer.appendChild(galleryItem);
    });
    
    // Add scroll-triggered animation for initial load
    this.addScrollAnimation(galleryContainer);
  }

  setupEventListeners() {
    const refreshBtn = this.container.querySelector('[data-refresh]');
    if (refreshBtn) {
      this.on(refreshBtn, 'click', () => {
        this.shuffleGallery();
      });
    }
  }

  shuffleGallery() {
    // Simple shuffle and re-render with animation
    this.galleryData = this.galleryData.sort(() => Math.random() - 0.5);
    this.renderGallery();
  }
  
  addScrollAnimation(container) {
    const items = container.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation for each item
          animate(entry.target, {
            ...presets.slideUp,
            delay: index * 100
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    items.forEach(item => observer.observe(item));
  }

  openModal(item) {
    // Find existing modal or create one
    let modal = document.querySelector('.modal');
    if (modal) {
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="modal-image">
          <div class="modal-body">
            <h2 class="modal-title">${item.title}</h2>
            <p class="modal-description">${item.description}</p>
            ${item.stats ? `
              <div class="modal-stats">
                ${item.stats.views ? `<span>Views: ${item.stats.views.toLocaleString()}</span>` : ''}
                ${item.stats.likes ? `<span>Likes: ${item.stats.likes.toLocaleString()}</span>` : ''}
                ${item.stats.shares ? `<span>Shares: ${item.stats.shares.toLocaleString()}</span>` : ''}
              </div>
            ` : ''}
            ${item.sources && item.sources.length > 0 ? `
              <div class="modal-sources">
                <h4>Sources:</h4>
                ${item.sources.map(source => `<a href="${source}" target="_blank" rel="noopener noreferrer">${source}</a>`).join('')}
              </div>
            ` : ''}
          </div>
        `;
        
        // Show modal
        modal.showModal();
        modal.classList.add('active');
      }
    }
  }
}