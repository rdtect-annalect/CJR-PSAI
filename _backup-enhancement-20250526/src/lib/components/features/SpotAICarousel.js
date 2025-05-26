import BaseComponent from '../base/BaseComponent.js';
import { $ } from '../../utils/dom.js';

export default class SpotAICarousel extends BaseComponent {
  constructor(config = {}) {
    super(config);
    this.config = {
      containerSelector: '#spotAI',
      carouselSelector: '#spot-ai-carousel',
      dataPath: '/src/data/carouselData.json',
      slidesToShow: 5,
      autoPlayInterval: 5000,
      ...config
    };
    this.data = [];
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.autoplayTimer = null;
    this.carouselTrack = null;
    this.prevBtn = null;
    this.nextBtn = null;
  }

  async init() {
    try {
      this.container = $(this.config.containerSelector);
      if (!this.container) throw new Error('Container not found');
      await this.loadData();
      this.render();
      this.setupEvents();
      this.startAutoplay();
      return this;
    } catch (error) {
      console.error('Failed to initialize SpotAICarousel:', error);
      throw error;
    }
  }

  async loadData() {
    try {
      const response = await fetch(this.config.dataPath);
      this.data = await response.json();
      this.totalSlides = this.data.length;
    } catch (error) {
      console.warn('Could not load carousel data:', error);
      this.data = [];
      this.totalSlides = 0;
    }
  }
  render() {
    const carouselContainer = $(this.config.carouselSelector);
    if (!carouselContainer || !this.data.length) return;

    carouselContainer.innerHTML = `
      <div class="carousel-track">
        ${this.data.map((item, i) => `
          <div class="carousel-slide" data-index="${i}" data-title="${item.title}" data-subtitle="${item.subtitle}" data-description="${item.description}">
            <div class="slide-image-container">
              <img src="${item.images ? item.images.small : ''}" alt="${item.subtitle}" loading="lazy">
              <div class="slide-overlay">
                <div class="tip-header">${item.title}</div>
                <div class="tip-content">
                  <h3>${item.subtitle}</h3>
                  <p>${item.description}</p>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.carouselTrack = carouselContainer.querySelector('.carousel-track');
    this.prevBtn = document.querySelector('.carousel-btn.prev');
    this.nextBtn = document.querySelector('.carousel-btn.next');
  }

  setupEvents() {
    if (this.prevBtn) {
      this.on(this.prevBtn, 'click', () => this.goToPrev());
    }
    if (this.nextBtn) {
      this.on(this.nextBtn, 'click', () => this.goToNext());
    }
    if (this.container) {
      this.on(this.container, 'mouseenter', () => this.stopAutoplay());
      this.on(this.container, 'mouseleave', () => this.startAutoplay());
      
      // Handle slide clicks to open modal
      this.on(this.container, 'click', (e) => {
        const slide = e.target.closest('.carousel-slide');
        if (slide) {
          const index = parseInt(slide.dataset.index);
          this.openModal(this.data[index]);
        }
      });
    }
  }

  goToNext() {
    const maxSlide = Math.max(0, this.totalSlides - this.config.slidesToShow);
    this.currentSlide = this.currentSlide >= maxSlide ? 0 : this.currentSlide + 1;
    this.updatePosition();
  }

  goToPrev() {
    const maxSlide = Math.max(0, this.totalSlides - this.config.slidesToShow);
    this.currentSlide = this.currentSlide <= 0 ? maxSlide : this.currentSlide - 1;
    this.updatePosition();
  }

  updatePosition() {
    if (!this.carouselTrack) return;
    const slideWidth = 100 / this.config.slidesToShow;
    const translateX = -(this.currentSlide * slideWidth);
    this.carouselTrack.style.transform = `translateX(${translateX}%)`;
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = this.interval(() => this.goToNext(), this.config.autoPlayInterval);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  openModal(item) {
    // Find existing modal or create one
    let modal = document.querySelector('.modal');
    if (modal) {
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.innerHTML = `
          <img src="${item.images ? item.images.medium : ''}" alt="${item.subtitle}" class="modal-image">
          <div class="modal-body">
            <h2 class="modal-title">${item.title}</h2>
            <h3>${item.subtitle}</h3>
            <p class="modal-description">${item.description}</p>
          </div>
        `;
        
        // Show modal
        modal.showModal();
        modal.classList.add('active');
      }
    }
  }
}