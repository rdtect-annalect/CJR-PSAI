/**
 * @file ParticleSystem.js
 * @description Interactive particle system with cursor interactions
 * @module components/ui/ParticleSystem
 */

import { BaseComponent } from '../../components/base/BaseComponent.js';

/**
 * Particle class for individual particles in the system
 * @private
 */
class Particle {
  constructor(canvas, options = {}) {
    const { width, height } = canvas;
    this.canvas = canvas;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.baseSize = Math.random() * 1.5 + 0.5;
    this.size = this.baseSize;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.dirX = Math.random() > 0.5 ? 1 : -1;
    this.dirY = Math.random() > 0.5 ? 1 : -1;
    this.angle = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.1 + 0.05;
    this.baseAlpha = Math.random() * 0.3 + 0.1;
    this.alpha = this.baseAlpha;
    this.color = options.color;
    this.visible = false;
  }

  /**
   * Update particle position with more natural movement
   * @param {number} mouseX - Current mouse X position
   * @param {number} mouseY - Current mouse Y position
   * @param {number} connectionDist - Max distance for mouse connection
   * @param {number} visibilityDist - Max distance for visibility
   */
  update(mouseX, mouseY, connectionDist, visibilityDist) {
    const t = Date.now() * 0.001;
    const offset = 0.15;
    this.size = this.baseSize + Math.sin(t * this.pulseSpeed) * 0.3;
    this.x += this.speedX + Math.sin(t + this.angle) * offset * this.dirX;
    this.y += this.speedY + Math.cos(t + this.angle) * offset * this.dirY;

    this.visible = false;
    this.alpha = this.baseAlpha * 0.3;

    if (mouseX != null && mouseY != null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < visibilityDist) {
        this.visible = true;
        this.alpha = this.baseAlpha * (1 - dist / visibilityDist);
        if (dist < connectionDist * 0.3) {
          this.alpha = Math.min(this.alpha * 2, 0.8);
          this.size = this.baseSize * (1 + (1 - dist / (connectionDist * 0.3)));
        }
      }
    }

    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  /**
   * Draw the particle
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   */
  draw(ctx) {
    if (!this.visible) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color.replace(/[\\d.]+\\)$/g, `${this.alpha})`);;
    ctx.fill();
  }
}

/**
 * Interactive particle system with cursor connections
 * Creates a canvas with animated particles that interact with the cursor
 */
export class ParticleSystem extends BaseComponent {
  /**
   * Create a new ParticleSystem component
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    super(config);
    
    // Particle system configuration
    this.config = {
      selector: 'body',            // Where to append the canvas
      zIndex: 5,                   // Canvas z-index (positive to be visible)
      particleCount: 50,           // Number of particles
      connectionDistance: 150,     // Max distance for connections
      visibilityDistance: 250,     // Only show particles within this distance of mouse
      primaryColor: 'rgba(255, 255, 255, 0.8)',  // Main particle color
      secondaryColor: 'rgba(255, 139, 56, 0.8)', // Orange color for connections
      responsive: true,            // Resize with window
      ...config
    };
    
    // System state
    this.canvas = null;
    this.ctx = null;
    this.containers = [];
    this.particles = [];
    this.mouseX = null;
    this.mouseY = null;
    this.isActive = true;
    this._animationFrame = null;
    
    // Bind methods to this context
    this._onMouse = this._onMouse.bind(this);
    this._resize = this._resize.bind(this);
    this._animate = this._animate.bind(this);
  }

  /**
   * Initialize the particle system
   * @returns {Promise} Promise that resolves when initialized
   */
  async init() {
    await super.init();
    
    // Find containers
    this.containers = document.querySelectorAll(this.config.selector);
    console.log(`[ParticleSystem] Found ${this.containers.length} containers with selector: ${this.config.selector}`);
    
    if (this.containers.length === 0) {
      console.warn(`[ParticleSystem] No containers found with selector: ${this.config.selector}`);
      return this;
    }
    
    // Initialize each container
    this.containers.forEach(container => {
      this._initContainer(container);
    });
    
    // Start animation
    this._animate();
    
    return this;
  }
  
  /**
   * Initialize a container with a particle canvas
   * @param {HTMLElement} container - Container element
   * @private
   */
  _initContainer(container) {
    // Force position relative if static
    if (window.getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.className = 'particle-canvas';
    
    // Style canvas
    Object.assign(this.canvas.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: this.config.zIndex || 0
    });
    
    // Add canvas to container
    container.insertBefore(this.canvas, container.firstChild);
    
    // Set initial size
    this._resize();
    
    // Create observer for container resizing
    this._observer = new ResizeObserver(this._resize);
    this._observer.observe(container);
    
    // Generate particles
    this._generateParticles();
    
    // Bind events
    this.on(container, 'mousemove', this._onMouse);
    this.on(window, 'resize', this._resize);
    
    this.container = container;
  }

  /**
   * Set canvas dimensions based on container
   * @private
   */
  _resize() {
    if (!this.canvas || !this.container) return;
    
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /**
   * Generate particles based on configuration
   * @private
   */
  _generateParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(new Particle(this.canvas, { 
        color: this.config.primaryColor
      }));
    }
  }

  /**
   * Handle mouse movement
   * @param {MouseEvent} e - Mouse event
   * @private
   */
  _onMouse(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  /**
   * Animation loop
   * @private
   */
  _animate() {
    if (!this.isActive || !this.canvas) {
      return;
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and collect visible particles
    const visible = [];
    this.particles.forEach(p => {
      p.update(
        this.mouseX, 
        this.mouseY, 
        this.config.connectionDistance,
        this.config.visibilityDistance
      );
      if (p.visible) visible.push(p);
    });
    
    // Draw visible particles
    visible.forEach(p => p.draw(this.ctx));
    
    // Draw connections between particles
    visible.forEach((a, i) => {
      for (let j = i + 1; j < visible.length; j++) {
        const b = visible[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.config.connectionDistance) {
          const opacity = 0.2 * (1 - distance / this.config.connectionDistance);
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.config.primaryColor.replace(/[\\d.]+\\)$/g, `${opacity})`);;
          this.ctx.lineWidth = 0.3;
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
        }
      }
    });
    
    // Request next frame
    this._animationFrame = requestAnimationFrame(this._animate);
  }

  /**
   * Pause the animation
   * @returns {ParticleSystem} This instance for chaining
   */
  pause() {
    this.isActive = false;
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }
    return this;
  }

  /**
   * Resume the animation
   * @returns {ParticleSystem} This instance for chaining
   */
  resume() {
    if (!this.isActive) {
      this.isActive = true;
      this._animate();
    }
    return this;
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Call parent destroy for event cleanup
    super.destroy();
    
    // Stop animation
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
    }
    
    // Disconnect observer
    if (this._observer) {
      this._observer.disconnect();
    }
    
    // Remove canvas from DOM
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export default ParticleSystem;