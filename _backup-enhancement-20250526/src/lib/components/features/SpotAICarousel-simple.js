/**
 * Simple Spot AI Carousel - Vanilla implementation
 * Shows 5 cards, cycles through data, opens modal on click
 */
import BaseComponent from '../../BaseComponent.js';
import anime from '../../anime.js';
import events from '../../events.js';
import { $ } from '../../dom.js';

export default class SpotAICarousel extends BaseComponent {
  constructor() {
    super();
    this.data = [];
    this.currentIndex = 0;
    this.cardsToShow = 5;
  }

  async init() {
    this.container = $('#spot-ai-carousel');
    if (!this.container) return;

    await this.loadData();
    this.render();
    this.setupEvents();
    this.startAutoplay();

    return this;
  }

  async loadData() {
    try {
      const response = await fetch('/src/data/carouselData.json');
      this.data = await response.json();
    } catch (error) {
      // Fallback data
      this.data = [
        {
          title: "Check for hands and fingers",
          description: "AI often struggles with realistic hand details",
          images: { small: "assets/images/spot-ai/small/1.png", medium: "assets/images/spot-ai/large/1.png" }
        },
        {
          title: "Look at facial features", 
          description: "Check for asymmetry in faces",
          images: { small: "assets/images/spot-ai/small/2.png", medium: "assets/images/spot-ai/large/2.png" }
        },
        {
          title: "Scan the background",
          description: "Background elements often have errors", 
          images: { small: "assets/images/spot-ai/small/3.png", medium: "assets/images/spot-ai/large/3.png" }
        },
        {
          title: "Spot contextual errors",
          description: "Check if elements match the context",
          images: { small: "assets/images/spot-ai/small/4.png", medium: "assets/images/spot-ai/large/4.png" }
        },
        {
          title: "Look for distorted logos or text",
          description: "AI struggles with text and logos",
          images: { small: "assets/images/spot-ai/small/5.png", medium: "assets/images/spot-ai/large/5.png" }
        }
      ];
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="carousel-track">
        ${this.data.map((item, i) => `
          <div class="carousel-card" data-index="${i}">
            <div class="card-header">TIP ${i + 1}</div>
            <img src="${item.images.small}" alt="${item.title}">
            <div class="card-footer">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="carousel-dots">
        ${Array(Math.ceil(this.data.length / this.cardsToShow)).fill(0).map((_, i) => `
          <button class="dot ${i === 0 ? 'active' : ''}" data-page="${i}"></button>
        `).join('')}
      </div>
    `;
  }

  setupEvents() {
    // Card clicks
    this.on(this.container, 'click', (e) => {
      const card = e.target.closest('.carousel-card');
      if (card) {
        const index = parseInt(card.dataset.index);
        this.openModal(this.data[index]);
      }
    });

    // Dot navigation
    this.on(this.container, 'click', (e) => {
      const dot = e.target.closest('.dot');
      if (dot) {
        const page = parseInt(dot.dataset.page);
        this.goToPage(page);
      }
    });

    // Pause on hover
    this.on(this.container, 'mouseenter', () => this.stopAutoplay());
    this.on(this.container, 'mouseleave', () => this.startAutoplay());
  }

  goToPage(page) {
    const track = this.container.querySelector('.carousel-track');
    const offset = page * this.cardsToShow * -20; // 20% per card

    anime({
      targets: track,
      translateX: `${offset}%`,
      duration: 500,
      easing: 'easeOutCubic'
    });

    // Update dots
    this.container.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === page);
    });

    this.currentIndex = page;
  }

  openModal(item) {
    const modal = $('.modal');
    modal.querySelector('.modal-content').innerHTML = `
      <img src="${item.images.medium}" alt="${item.title}">
      <div class="modal-body">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      </div>
    `;
    
    events.emit('modal:open', 'modal');
  }

  startAutoplay() {
    this.autoplayTimer = this.interval(() => {
      const nextPage = (this.currentIndex + 1) % Math.ceil(this.data.length / this.cardsToShow);
      this.goToPage(nextPage);
    }, 3000);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
}
