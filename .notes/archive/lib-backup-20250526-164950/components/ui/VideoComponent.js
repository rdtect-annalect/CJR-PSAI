/**
 * Video Component
 * Handles lazy loading and play button functionality for embedded videos
 */

export class VideoComponent {
  constructor(selector = '#videoContainer') {
    this.selector = selector;
    this.container = null;
    this.playButton = null;
    this.iframe = null;
    this.observer = null;
  }

  init() {
    this.container = document.querySelector(this.selector);
    if (!this.container) return;

    this.playButton = this.container.querySelector('.play-button');
    this.iframe = this.container.querySelector('iframe');

    if (!this.playButton || !this.iframe) return;

    this.setupEventListeners();
    this.setupIntersectionObserver();

    return this;
  }

  loadAndPlayVideo() {
    const src = this.iframe.dataset.src;
    if (!src) return;

    // Show loading state
    this.container.classList.add('loading');
    
    // Set the iframe source with autoplay
    this.iframe.src = `${src}&autoplay=1`;
    
    // Hide play button
    this.playButton.style.display = 'none';
    
    // Remove loading state when video is loaded
    this.iframe.onload = () => {
      this.container.classList.remove('loading');
      const videoId = new URL(src).searchParams.get('v');
      if (videoId) {
        console.log('YouTube video loaded:', videoId);
      }
    };
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.loadAndPlayVideo();
    }
  }

  setupEventListeners() {
    this.playButton.addEventListener('click', () => this.loadAndPlayVideo());
    this.playButton.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.iframe.src) {
          // Load video but don't autoplay
          this.iframe.src = this.iframe.dataset.src;
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '200px',
      threshold: 0.1
    });

    this.observer.observe(this.container);
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.playButton) {
      this.playButton.removeEventListener('click', this.loadAndPlayVideo);
      this.playButton.removeEventListener('keydown', this.handleKeyDown);
    }
  }
}

export default VideoComponent;
