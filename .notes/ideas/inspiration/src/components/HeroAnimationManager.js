import { Debounce } from "../utils/Debounce.js";

/**
 * Manages the hero section animation
 */
export class HeroAnimationManager {
  constructor() {
    // Configuration
    this.config = {
      particleCount: 70,
      talentWordsCount: 30,
      connectionDistance: 150,
      maxTrails: 10,
      talentKeywords: [
        "Leadership",
        "Innovation",
        "Strategy",
        "Design",
        "Technology",
        "Marketing",
        "Finance",
        "Operations",
        "Analytics",
        "Creative",
        "Growth",
        "Executive",
        "Product",
        "Engineering",
        "Sales",
        "Research",
        "Consulting",
        "Development",
        "Management",
        "Director",
      ],
      wordActivationThreshold: 3, // Number of active words needed to trigger KaN SEARCH
      animationCycleDuration: 2000, // Duration in ms for each stage of the animation cycle
      animationHoldDuration: 2000, // Duration to hold at each stage before transitioning
    };

    // State
    this.particles = [];
    this.talentWords = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.trails = [];
    this.trailIndex = 0;
    this.isActive = false;
    this.kanSearchActive = false;
    this.animationCycleTimers = [];
    this.currentAnimationState = "logo"; // States: 'logo', 'kanSearch', 'whirlwind'

    // DOM Elements - will be initialized in init()
    this.heroSection = null;
    this.particlesContainer = null;
    this.magnifier = null;
    this.magnifierContent = null;
    this.kanSearchText = null;
    this.canvas = null;
    this.ctx = null;
    this.whirlwind = null;
  }

  /**
   * Initialize hero animation
   */
  init() {
    // Wait a bit for other scripts to finish
    setTimeout(() => this.initHeroBackgroundAnimation(), 800);

    // Refresh the animation on window resize to fix potential layout issues
    window.addEventListener("resize", this.handleResize.bind(this));

    // Performance optimization: Pause animations when page is not visible
    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange.bind(this)
    );

    // Create a global property to store animation timers
    window.heroAnimationTimers = [];
  }

  /**
   * Handle visibility change to pause/resume animations
   */
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden, pause animations
      this.isAnimating = false;
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }

      // Clear all animation timers
      if (window.heroAnimationTimers) {
        window.heroAnimationTimers.forEach((timer) => clearTimeout(timer));
        window.heroAnimationTimers = [];
      }
    } else {
      // Page is visible again, resume animations
      this.isAnimating = true;
      // Restart the hero animation
      const heroSection = document.getElementById("hero");
      if (heroSection && heroSection.offsetParent !== null) {
        // Check if visible
        this.animateParticles();
        this.drawConnections();
      }
    }
  }

  /**
   * Handle resize event
   */
  handleResize() {
    // Debounce the resize event
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      // Reinitialize the animation
      const existingCanvas = document.getElementById("connectLines");
      const existingContainer = document.getElementById("particlesContainer");

      if (existingCanvas) {
        existingCanvas.width = document.getElementById("hero").offsetWidth;
        existingCanvas.height = document.getElementById("hero").offsetHeight;
      }

      // Force reflow to ensure proper layout
      if (existingContainer) {
        existingContainer.style.display = "none";
        existingContainer.offsetHeight; // Force reflow
        existingContainer.style.display = "block";
      }
    }, 250);
  }

  /**
   * Main initialization function for hero background animation
   */
  initHeroBackgroundAnimation() {
    // DOM elements
    this.heroSection = document.getElementById("hero");
    this.particlesContainer = document.getElementById("particlesContainer");
    this.magnifier = document.getElementById("magnifier");
    this.magnifierContent = document.getElementById("magnifierContent");
    this.kanSearchText = document.getElementById("kanSearchText");
    this.canvas = document.getElementById("connectLines");
    this.whirlwind = document.getElementById("whirlwind");

    if (
      !this.heroSection ||
      !this.particlesContainer ||
      !this.magnifier ||
      !this.canvas
    )
      return;

    // Canvas setup
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.heroSection.offsetWidth;
    this.canvas.height = this.heroSection.offsetHeight;

    // Initialize
    this.initialize();
    this.createFloatingTexts();
  }

  /**
   * Initialize hero animation components
   */
  initialize() {
    // Create talent keywords
    this.createTalentKeywords();

    // Create particles
    this.createParticles();

    // Initialize trails
    this.initTrails();

    // Start animation
    this.animateParticles();
    this.drawConnections();

    // Set up event listeners
    this.setupEventListeners();

    // Add debounced resize handler
    window.addEventListener(
      "resize",
      Debounce.create(this.handleCanvasResize.bind(this), 150)
    );
    // Initial resize to ensure correct sizing
    this.handleCanvasResize();
  }

  /**
   * Resize handler for canvas
   */
  handleCanvasResize() {
    // Update canvas size
    this.canvas.width = this.heroSection.offsetWidth;
    this.canvas.height = this.heroSection.offsetHeight;
    // Reposition particles
    this.particles.forEach((p) => {
      // Keep them within bounds
      p.x = Math.min(p.x, this.heroSection.offsetWidth - p.size);
      p.y = Math.min(p.y, this.heroSection.offsetHeight - p.size);
      p.element.style.left = `${p.x}px`;
      p.element.style.top = `${p.y}px`;
    });
    // Reposition talent words
    this.talentWords.forEach((w) => {
      w.x = Math.min(w.x, this.heroSection.offsetWidth - w.size);
      w.y = Math.min(w.y, this.heroSection.offsetHeight - w.size);
      w.originalX = Math.min(
        w.originalX,
        this.heroSection.offsetWidth - w.size
      );
      w.originalY = Math.min(
        w.originalY,
        this.heroSection.offsetHeight - w.size
      );
      w.element.style.left = `${w.x}px`;
      w.element.style.top = `${w.y}px`;
    });
  }

  /**
   * Create talent keywords
   */
  createTalentKeywords() {
    for (let i = 0; i < this.config.talentKeywords.length; i++) {
      const word = document.createElement("div");
      word.className = "talent-words";
      word.textContent = this.config.talentKeywords[i];

      // Random position
      const posX = 10 + Math.random() * (this.heroSection.offsetWidth - 20);
      const posY = 10 + Math.random() * (this.heroSection.offsetHeight - 20);

      // Random size - reduced size range for less prominence
      const size = 12 + Math.random() * 10; // Changed from 14 + Math.random() * 18

      // Random color gradient
      const colors = [
        "#44C8F5",
        "#ED0977",
        "#D7E026",
        "#37B04A",
        "#C82127",
        "#EE4599",
      ];
      const color1 = colors[Math.floor(Math.random() * colors.length)];
      const color2 = colors[Math.floor(Math.random() * colors.length)];

      word.style.left = `${posX}px`;
      word.style.top = `${posY}px`;
      word.style.fontSize = `${size}px`;
      word.style.backgroundImage = `linear-gradient(45deg, ${color1}, ${color2})`;
      word.style.opacity = "0"; // Start fully transparent

      // Store position data
      this.talentWords.push({
        element: word,
        x: posX,
        y: posY,
        originalX: posX,
        originalY: posY,
        size: size,
        active: false,
      });

      this.particlesContainer.appendChild(word);

      // Fade in gradually with varying delays for a more dynamic appearance
      setTimeout(() => {
        word.style.opacity = "0.2"; // Fade to subtle visibility
      }, 1000 + Math.random() * 1000);
    }
  }

  /**
   * Create particles
   */
  createParticles() {
    for (let i = 0; i < this.config.particleCount; i++) {
      // Create particle element
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random properties
      const size = 3 + Math.random() * 7;
      const posX = Math.random() * this.heroSection.offsetWidth;
      const posY = Math.random() * this.heroSection.offsetHeight;
      const speedX = (Math.random() - 0.5) * 0.7;
      const speedY = (Math.random() - 0.5) * 0.7;
      const delay = Math.random() * 2;

      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.transitionDelay = `${delay}s`;

      // Store particle data
      this.particles.push({
        element: particle,
        x: posX,
        y: posY,
        size: size,
        speedX: speedX,
        speedY: speedY,
      });

      this.particlesContainer.appendChild(particle);

      // Trigger appearance animation
      setTimeout(() => {
        particle.style.opacity = 0.2 + Math.random() * 0.5;
        particle.style.transform = "scale(1)";
      }, 100);
    }
  }

  /**
   * Initialize trails
   */
  initTrails() {
    for (let i = 0; i < this.config.maxTrails; i++) {
      const trail = document.createElement("div");
      trail.className = "trail";
      this.trails.push(trail);
      this.heroSection.appendChild(trail);
    }
  }

  /**
   * Animate particles
   */
  animateParticles() {
    // Move particles
    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Boundary check
      if (particle.x < 0 || particle.x > this.heroSection.offsetWidth) {
        particle.speedX *= -1;
      }

      if (particle.y < 0 || particle.y > this.heroSection.offsetHeight) {
        particle.speedY *= -1;
      }

      // Apply position
      particle.element.style.left = `${particle.x}px`;
      particle.element.style.top = `${particle.y}px`;
    });

    // Add trailing effect for mouse
    if (this.isActive) {
      const trail = this.trails[this.trailIndex];
      trail.style.left = `${this.mouseX}px`;
      trail.style.top = `${this.mouseY}px`;
      trail.style.opacity = 1;

      // Fade out effect
      setTimeout(() => {
        trail.style.opacity = 0;
      }, 500);

      // Cycle through trails array
      this.trailIndex = (this.trailIndex + 1) % this.trails.length;
    }

    // Count active words
    let activeWordCount = 0;
    let nearbyWordCount = 0;

    // Animate talent words - REDUCED MOVEMENT
    this.talentWords.forEach((word) => {
      // Calculate distance from magnifier
      const dx = word.x - this.mouseX;
      const dy = word.y - this.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Activate if close to magnifier
      if (this.isActive && distance < 200) {
        const scale = 1 - distance / 300;
        // Ensure scaleFactor is at least 0.8 (matching KeywordAnimationFix) and goes up to 1.0
        const scaleFactor = Math.max(0.8, 0.8 + scale * 0.2);
        // Opacity from 0.15 (matching KeywordAnimationFix) up to 1.0
        const opacity = 0.15 + Math.max(0, 1 - distance / 200) * 0.85;

        word.element.style.transform = `scale(${scaleFactor})`;
        word.element.style.opacity = opacity;
        word.active = true;

        // REDUCED movement toward the magnifier
        const pull = 0.02;
        word.x += (this.mouseX - word.x) * pull;
        word.y += (this.mouseY - word.y) * pull;

        word.element.style.left = `${word.x}px`;
        word.element.style.top = `${word.y}px`;

        activeWordCount++;

        // Count very nearby words (for KaN SEARCH trigger)
        if (distance < 80) {
          nearbyWordCount++;
        }
      } else if (word.active) {
        // SLOWED return to original position
        word.x += (word.originalX - word.x) * 0.01;
        word.y += (word.originalY - word.y) * 0.01;

        word.element.style.left = `${word.x}px`;
        word.element.style.top = `${word.y}px`;

        // Return to the initial state set by KeywordAnimationFix
        word.element.style.transform = "scale(0.8)";
        word.element.style.opacity = "0.15";

        // Check if returned to original position
        const homeDistance = Math.sqrt(
          Math.pow(word.x - word.originalX, 2) +
            Math.pow(word.y - word.originalY, 2)
        );

        if (homeDistance < 1) {
          word.active = false;
        }
      } else {
        // Ensure words maintain their initial state if not active and not returning
        // This might be redundant if KeywordAnimationFix.js handles the initial state correctly
        // and words only become active on mouse interaction.
        // However, it's a safeguard.
        if (word.element.style.opacity !== "0.15") {
          // Check to avoid unnecessary style changes
          word.element.style.opacity = "0.15";
        }
        if (word.element.style.transform !== "scale(0.8)") {
          // Check to avoid unnecessary style changes
          word.element.style.transform = "scale(0.8)";
        }
      }
    });

    // Check if enough words are close to trigger KaN SEARCH
    if (
      nearbyWordCount >= this.config.wordActivationThreshold &&
      !this.kanSearchActive
    ) {
      // Activate KaN SEARCH
      this.kanSearchActive = true;

      // Add particle burst effect
      this.createParticleBurst();

      // Clear any existing animation timers
      this.animationCycleTimers.forEach((timer) => clearTimeout(timer));
      this.animationCycleTimers = [];

      // Start the animation cycle
      this.startAnimationCycle();
    } else if (
      nearbyWordCount < this.config.wordActivationThreshold &&
      this.kanSearchActive
    ) {
      // Deactivate KaN SEARCH
      this.kanSearchActive = false;

      // Clear all animation timers
      this.animationCycleTimers.forEach((timer) => clearTimeout(timer));
      this.animationCycleTimers = [];

      // Reset to logo state
      this.resetToLogoState();
    }

    this.animationFrame = requestAnimationFrame(
      this.animateParticles.bind(this)
    );
  }

  /**
   * Create a burst of particles
   */
  createParticleBurst() {
    // Create a burst of particles when KaN SEARCH activates
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Position at mouse location
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 50;
      const posX = this.mouseX + Math.cos(angle) * distance;
      const posY = this.mouseY + Math.sin(angle) * distance;

      // Random size
      const size = 2 + Math.random() * 4;

      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      particle.style.transform = "scale(1)";
      particle.style.opacity = "1";
      particle.style.transition = "all 1s ease-out";

      this.particlesContainer.appendChild(particle);

      // Animation
      setTimeout(() => {
        const newDistance = distance + 100 + Math.random() * 50;
        particle.style.left = `${
          this.mouseX + Math.cos(angle) * newDistance
        }px`;
        particle.style.top = `${this.mouseY + Math.sin(angle) * newDistance}px`;
        particle.style.opacity = "0";
      }, 50);

      // Remove after animation
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  }

  /**
   * Start the animation cycle
   */
  startAnimationCycle() {
    // Get DOM elements
    if (!this.magnifierContent || !this.kanSearchText || !this.whirlwind)
      return;

    // Set current animation state
    this.currentAnimationState = "logo";

    // Animation sequence: logo → KaN SEARCH → whirlwind → logo
    const runAnimationCycle = () => {
      // Clear opacity styles
      const resetStyles = () => {
        this.magnifierContent.style.opacity = "0";
        this.kanSearchText.style.opacity = "0";
        this.whirlwind.style.opacity = "0";
      };

      // Show logo (starting point)
      if (this.currentAnimationState === "logo") {
        resetStyles();
        this.magnifierContent.style.opacity = "0.9";

        // Schedule next state: KaN SEARCH
        const timer = setTimeout(() => {
          this.currentAnimationState = "kanSearch";
          runAnimationCycle();
        }, this.config.animationHoldDuration);

        // Store timer in both local and global arrays for cleanup
        this.animationCycleTimers.push(timer);
        if (window.heroAnimationTimers) {
          window.heroAnimationTimers.push(timer);
        }
      }
      // Show KaN SEARCH text
      else if (this.currentAnimationState === "kanSearch") {
        resetStyles();
        this.kanSearchText.style.opacity = "1";

        // Schedule next state: whirlwind
        const timer = setTimeout(() => {
          this.currentAnimationState = "whirlwind";
          runAnimationCycle();
        }, this.config.animationHoldDuration);

        // Store timer in both local and global arrays for cleanup
        this.animationCycleTimers.push(timer);
        if (window.heroAnimationTimers) {
          window.heroAnimationTimers.push(timer);
        }
      }
      // Show whirlwind effect
      else if (this.currentAnimationState === "whirlwind") {
        resetStyles();
        this.whirlwind.style.opacity = "1";

        // Schedule next state: back to logo
        const timer = setTimeout(() => {
          this.currentAnimationState = "logo";
          runAnimationCycle();
        }, this.config.animationHoldDuration);

        // Store timer in both local and global arrays for cleanup
        this.animationCycleTimers.push(timer);
        if (window.heroAnimationTimers) {
          window.heroAnimationTimers.push(timer);
        }
      }
    };

    // Start the animation cycle
    runAnimationCycle();
  }

  /**
   * Reset to logo state
   */
  resetToLogoState() {
    if (!this.magnifierContent || !this.kanSearchText || !this.whirlwind)
      return;

    // Reset to logo state
    this.magnifierContent.style.opacity = "0.9";
    this.kanSearchText.style.opacity = "0";
    this.whirlwind.style.opacity = "0";
    this.currentAnimationState = "logo";
  }

  /**
   * Draw connections between particles
   */
  drawConnections() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections between particles
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.connectionDistance) {
          const opacity = 1 - distance / this.config.connectionDistance;
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;

          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw connections from mouse/magnifier to nearby particles
    if (this.isActive) {
      // Use different color for connections when KaN SEARCH is active
      const baseColor = this.kanSearchActive
        ? "rgba(237, 9, 119, 0.3)"
        : "rgba(68, 200, 245, 0.2)";
      this.ctx.strokeStyle = baseColor;
      this.ctx.lineWidth = 1.5;

      for (let i = 0; i < this.particles.length; i++) {
        const dx = this.mouseX - this.particles[i].x;
        const dy = this.mouseY - this.particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const opacity = 1 - distance / 200;
          this.ctx.strokeStyle = this.kanSearchActive
            ? `rgba(237, 9, 119, ${opacity * 0.6})`
            : `rgba(68, 200, 245, ${opacity * 0.5})`;

          this.ctx.beginPath();
          this.ctx.moveTo(this.mouseX, this.mouseY);
          this.ctx.lineTo(this.particles[i].x, this.particles[i].y);
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(this.drawConnections.bind(this));
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Get hero section boundaries
    const heroRect = this.heroSection.getBoundingClientRect();

    // Mouse move event
    this.heroSection.addEventListener("mousemove", (e) => {
      // Calculate mouse position relative to hero section
      this.mouseX = e.clientX - heroRect.left;
      this.mouseY = e.clientY - heroRect.top;

      // Update magnifier position
      this.magnifier.style.left = `${this.mouseX - 110}px`;
      this.magnifier.style.top = `${this.mouseY - 110}px`;

      // Show magnifier
      this.magnifier.style.transform = "scale(1)";
      this.isActive = true;
    });

    // Mouse leave event
    this.heroSection.addEventListener("mouseleave", () => {
      this.magnifier.style.transform = "scale(0)";
      this.isActive = false;

      // Reset KaN SEARCH state
      this.magnifierContent.style.opacity = "0.9";
      this.kanSearchText.style.opacity = "0";
      this.kanSearchActive = false;
    });

    // Resize event
    window.addEventListener("resize", () => {
      const newHeroRect = this.heroSection.getBoundingClientRect();
      this.canvas.width = newHeroRect.width;
      this.canvas.height = newHeroRect.height;
    });
  }

  /**
   * Create floating texts
   */
  createFloatingTexts() {
    const texts = [
      "Leadership",
      "Innovation",
      "Strategy",
      "Executive",
      "Creative",
      "Technical",
      "Management",
      "Director",
      "C-Suite",
    ];

    texts.forEach((text, index) => {
      setTimeout(() => {
        const floatingText = document.createElement("div");
        floatingText.className = "floating-text";
        floatingText.textContent = text;

        const posX = 50 + Math.random() * (this.heroSection.offsetWidth - 100);
        const posY = 50 + Math.random() * (this.heroSection.offsetHeight - 100);

        floatingText.style.left = `${posX}px`;
        floatingText.style.top = `${posY}px`;
        floatingText.style.animationDelay = `${index * 2}s`;

        this.heroSection.appendChild(floatingText);

        // Remove after animation
        setTimeout(() => {
          floatingText.remove();
        }, 10000);
      }, index * 2000);
    });

    // Repeat the process
    setTimeout(() => this.createFloatingTexts(), texts.length * 2000);
  }
}
