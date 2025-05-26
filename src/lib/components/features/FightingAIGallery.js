/**
 * @file Fighting AI Gallery component for showcasing AI-generated fighting images
 * @description Manages interactive gallery with filtering and modal integration
 * @extends BaseComponent
 */

import { BaseComponent, PSAI } from "../../psai.js";
import eventBus from "../../services/EventBus.js";

/** @typedef {import('../../../types').GalleryItem} GalleryItem */

/**
 * @typedef {Object} GalleryConfig
 * @property {string} [containerSelector="#fightAI"]
 * @property {string} [gallerySelector="#fighting-ai-gallery"]
 * @property {string} [collageSelector="#fighting-ai-collage"]
 * @property {string} [gridSelector="#gallery-grid"]
 * @property {string} [itemSelector=".gallery-item"]
 * @property {string} [collageItemSelector=".collage-item"]
 * @property {string} [filterSelector=".filter-button"]
 * @property {string} [activeFilterClass="active"]
 * @property {string} [animatedItemClass="animated"]
 * @property {string} [visibleItemClass="visible"]
 * @property {string} [dialogId="ai-dialog"]
 * @property {string} [dialogContentId="ai-dialog-content"]
 * @property {number} [animationDuration=400]
 * @property {number} [animationStagger=50]
 * @property {string} [defaultFilter="all"]
 */

export class FightingAIGallery extends BaseComponent {
  /**
   * Create a new FightingAIGallery instance
   * @param {GalleryConfig} config - Component configuration
   */
  constructor(config = {}) {
    super({
      // Default configuration
      containerSelector: "#fightAI",
      gallerySelector: "#fighting-ai-gallery",
      collageSelector: "#fighting-ai-collage",
      gridSelector: "#gallery-grid",
      itemSelector: ".gallery-item",
      collageItemSelector: ".collage-item",
      filterSelector: ".filter-button",
      activeFilterClass: "active",
      animatedItemClass: "animated",
      visibleItemClass: "visible",
      dialogId: "ai-dialog",
      dialogContentId: "ai-dialog-content",
      animationDuration: 400,
      animationStagger: 50,
      defaultFilter: "all",
      dataPath: "/src/data/fightingAI.json",
      ...config
    });

    // State
    this.activeFilter = this.config.defaultFilter;
    this.allGalleryItems = [];
    this.renderedItems = [];
    this.filterCategories = new Set();
    this.isDesktop = window.innerWidth >= 768;
    this.currentItemCount = 0;
    this.lastRenderTime = 0;

    // Mouse tracking for parallax
    this._lastMousePosition = { x: 0, y: 0 };
    this._mouseVelocity = { x: 0, y: 0 };
    this._mouseMoveProcessing = false;
    this._animationFrameId = null;

    // Bind methods
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.openModal = this.openModal.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  /**
   * Initialize the gallery
   * @returns {Promise<this>} - This component instance
   */
  async init() {
    try {
      console.log("Initializing FightingAIGallery...");
      
      // Call parent initialization
      await super.init();

      // Get main container
      this.container = PSAI.DOM.select(this.config.containerSelector);
      
      // Early validation
      if (!this.container) {
        console.error("FightingAIGallery: Container not found:", this.config.containerSelector);
        return Promise.reject(new Error("Gallery element not found"));
      }

      // First load the gallery items, then proceed with initialization
      // This ensures we have items before trying to set up filters and event listeners
      return this.loadAllData()
        .then((data) => {
          console.log(`Loaded ${this.allGalleryItems.length} gallery items successfully`);

          // Set up collage layout for desktop
          if (this.isDesktop) {
            this.setupCollageLayout();
          } else {
            this.setupMobileLayout();
          }

          // Set up event listeners
          this.setupEventListeners();

          return this;
        })
        .catch((error) => {
          console.error("Failed to load gallery data:", error);
          return Promise.reject(error);
        });
    } catch (error) {
      console.error("Error initializing FightingAIGallery:", error);
      return Promise.reject(error);
    }
  }

  /**
   * Load all gallery data
   * @returns {Promise<Object>} - Loaded data
   */
  async loadAllData() {
    try {
      const data = await PSAI.Data.load(this.config.dataPath);
      
      if (!data || !data.items || !Array.isArray(data.items)) {
        console.error("Invalid gallery data format:", data);
        return Promise.reject(new Error("Invalid gallery data"));
      }
      
      // Process and store items
      this.allGalleryItems = data.items.map((item, index) => ({
        ...item,
        id: item.id || `gallery-item-${index}`,
        categories: item.categories || ["uncategorized"]
      }));
      
      // Extract all unique categories
      this.allGalleryItems.forEach(item => {
        if (item.categories && Array.isArray(item.categories)) {
          item.categories.forEach(category => {
            this.filterCategories.add(category);
          });
        }
      });
      
      return data;
    } catch (error) {
      console.error("Failed to load gallery data:", error);
      return Promise.reject(error);
    }
  }

  /**
   * Set up the gallery layout for desktop (collage style)
   * @private
   */
  setupCollageLayout() {
    // Get the collage container
    this.collageContainer = this.container.querySelector(this.config.collageSelector);
    
    if (!this.collageContainer) {
      console.warn("Collage container not found:", this.config.collageSelector);
      return;
    }
    
    // Clear existing content
    this.collageContainer.innerHTML = "";
    
    // Create collage layout
    this.renderCollageItems();
    
    // Show the collage container
    this.collageContainer.style.display = "block";
    
    // Hide the grid container if it exists
    const gridContainer = this.container.querySelector(this.config.gridSelector);
    if (gridContainer) {
      gridContainer.style.display = "none";
    }
  }

  /**
   * Set up the gallery layout for mobile devices (grid style)
   * @private
   */
  setupMobileLayout() {
    // Get the grid container
    const gridContainer = this.container.querySelector(this.config.gridSelector);
    
    if (!gridContainer) {
      console.warn("Grid container not found:", this.config.gridSelector);
      return;
    }
    
    // Clear existing content
    gridContainer.innerHTML = "";
    
    // Create grid layout
    this.renderGridItems();
    
    // Show the grid container
    gridContainer.style.display = "block";
    
    // Hide the collage container if it exists
    const collageContainer = this.container.querySelector(this.config.collageSelector);
    if (collageContainer) {
      collageContainer.style.display = "none";
    }
  }

  /**
   * Create and render collage items for desktop
   * @private
   */
  renderCollageItems() {
    if (!this.collageContainer) return;
    
    // Use a subset of items for the initial render
    const initialItems = this.getFilteredItems().slice(0, 12);
    
    // Create collage items with varied sizes and positions
    initialItems.forEach((item, index) => {
      // Create container
      const itemContainer = document.createElement("div");
      itemContainer.className = `${this.config.collageItemSelector.substring(1)} ${this.config.visibleItemClass}`;
      itemContainer.setAttribute("data-id", item.id);
      itemContainer.setAttribute("tabindex", "0");
      
      // Add categories as data attributes for filtering
      if (item.categories) {
        itemContainer.setAttribute("data-categories", item.categories.join(" "));
      }
      
      // Create image element
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title || "Fighting AI image";
      img.loading = "lazy";
      
      // Create title overlay
      const titleOverlay = document.createElement("div");
      titleOverlay.className = "item-title-overlay";
      titleOverlay.textContent = item.title;
      
      // Append elements
      itemContainer.appendChild(img);
      itemContainer.appendChild(titleOverlay);
      
      // Set random position and size for collage effect
      this.positionCollageItem(itemContainer, index);
      
      // Add to container
      this.collageContainer.appendChild(itemContainer);
      
      // Add to rendered items
      this.renderedItems.push(itemContainer);
      
      // Add click event for modal
      itemContainer.addEventListener("click", () => this.openModal(item));
      
      // Add keyboard event for accessibility
      itemContainer.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.openModal(item);
        }
      });
    });
    
    // Start animations
    this.animateItems();
  }

  /**
   * Position a collage item with an interesting layout
   * @param {HTMLElement} element - The element to position
   * @param {number} index - Index for deterministic randomization
   * @private
   */
  positionCollageItem(element, index) {
    if (!element) return;
    
    // Grid-based positioning for more controlled layout
    const gridSize = 4; // Virtual grid size
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    
    // Base position from grid
    let leftBase = (col / gridSize) * 100;
    let topBase = (row / gridSize) * 60; // Less vertical spacing for denser layout
    
    // Add randomization to make it look more organic
    // Using index for deterministic randomization
    const seed = index * 13.37;
    const randLeft = this.seededRandom(seed) * 15 - 7.5; // ±7.5%
    const randTop = this.seededRandom(seed + 1) * 15 - 7.5; // ±7.5%
    
    // Randomize size slightly
    const sizeVariation = 0.8 + (this.seededRandom(seed + 2) * 0.4); // 0.8-1.2
    
    // Calculate final position
    const left = leftBase + randLeft;
    const top = topBase + randTop;
    
    // Apply positions and size
    element.style.position = "absolute";
    element.style.left = `${Math.max(0, Math.min(85, left))}%`;
    element.style.top = `${Math.max(0, Math.min(85, top))}%`;
    element.style.width = `${15 * sizeVariation}%`;
    element.style.height = "auto";
    
    // Set z-index for overlap effect - later items on top
    element.style.zIndex = index + 1;
    
    // Store original position for animations
    element.dataset.originalLeft = element.style.left;
    element.dataset.originalTop = element.style.top;
    
    // Store randomized sensitivity for animation
    // Most items have subtle movement, a few have more dramatic movement
    const sensitivity = 0.04 + Math.pow(this.seededRandom(seed + 3), 2) * 0.7; // 0.04-0.74 with exponential distribution
    element.dataset.sensitivity = sensitivity;
    
    // Limit movement based on position to prevent overcrowding
    const movementLimit = 0.7 + (this.seededRandom(seed + 4) * 1.5); // 0.7-2.2
    element.dataset.movementLimit = movementLimit;
    
    // Variable transition speed for more natural feeling
    const transitionDuration = 0.4 + (this.seededRandom(seed + 5) * 0.5); // 0.4-0.9s
    element.style.transition = `transform ${transitionDuration}s ease-out`;
  }

  /**
   * Seeded random number generator for deterministic layouts
   * @param {number} seed - Seed value
   * @returns {number} - Random number between 0-1
   * @private
   */
  seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  /**
   * Create and render grid items for mobile
   * @private
   */
  renderGridItems() {
    const gridContainer = this.container.querySelector(this.config.gridSelector);
    if (!gridContainer) return;
    
    // Clear existing content
    gridContainer.innerHTML = "";
    
    // Get filtered items
    const filteredItems = this.getFilteredItems();
    
    // Limit initial items for performance
    const initialItems = filteredItems.slice(0, 8);
    
    // Create grid items
    initialItems.forEach((item) => {
      // Create item container
      const itemContainer = document.createElement("div");
      itemContainer.className = `${this.config.itemSelector.substring(1)}`;
      itemContainer.setAttribute("data-id", item.id);
      
      // Add categories as data attributes for filtering
      if (item.categories) {
        itemContainer.setAttribute("data-categories", item.categories.join(" "));
      }
      
      // Create image container for aspect ratio
      const imageContainer = document.createElement("div");
      imageContainer.className = "item-image-container";
      
      // Create image
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title || "Fighting AI image";
      img.loading = "lazy";
      
      // Create title
      const title = document.createElement("div");
      title.className = "item-title";
      title.textContent = item.title;
      
      // Assemble elements
      imageContainer.appendChild(img);
      itemContainer.appendChild(imageContainer);
      itemContainer.appendChild(title);
      
      // Add to grid
      gridContainer.appendChild(itemContainer);
      
      // Add to rendered items
      this.renderedItems.push(itemContainer);
      
      // Add click event for modal
      itemContainer.addEventListener("click", () => this.openModal(item));
    });
    
    // Add "Load More" button if there are more items
    if (filteredItems.length > initialItems.length) {
      const loadMoreBtn = document.createElement("button");
      loadMoreBtn.className = "load-more-btn";
      loadMoreBtn.textContent = "Load More";
      loadMoreBtn.addEventListener("click", this.loadMore);
      
      gridContainer.appendChild(loadMoreBtn);
    }
  }

  /**
   * Set up event listeners
   * @private
   */
  setupEventListeners() {
    // Window resize handler
    window.addEventListener("resize", this.handleResize);
    
    // Mouse move for parallax effect (desktop only)
    if (this.isDesktop && this.collageContainer) {
      this.collageContainer.addEventListener("mousemove", this.handleMouseMove);
    }
    
    // Filter buttons
    const filterButtons = PSAI.DOM.select(this.config.filterSelector, document, true);
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        if (category) {
          this.toggleFilter(category);
        }
      });
    });
    
    // Register these listeners for automatic cleanup
    this.on(window, "resize", this.handleResize);
    
    if (this.isDesktop && this.collageContainer) {
      this.on(this.collageContainer, "mousemove", this.handleMouseMove);
    }
  }

  /**
   * Toggle a category filter
   * @param {string} category - Category to toggle
   */
  toggleFilter(category) {
    // Update active filter
    this.activeFilter = category;
    
    // Update active class on filter buttons
    const filterButtons = PSAI.DOM.select(this.config.filterSelector, document, true);
    filterButtons.forEach(button => {
      const buttonCategory = button.getAttribute("data-category");
      if (buttonCategory === category) {
        button.classList.add(this.config.activeFilterClass);
      } else {
        button.classList.remove(this.config.activeFilterClass);
      }
    });
    
    // Re-render gallery based on layout
    if (this.isDesktop) {
      this.updateCollageFiltering();
    } else {
      this.updateGridFiltering();
    }
  }

  /**
   * Update collage items based on active filter
   * @private
   */
  updateCollageFiltering() {
    if (!this.collageContainer) return;
    
    // Get all collage items
    const items = this.collageContainer.querySelectorAll(this.config.collageItemSelector);
    
    // Filter based on category
    items.forEach(item => {
      const categories = item.getAttribute("data-categories");
      
      // Show all items if filter is "all"
      if (this.activeFilter === "all") {
        item.classList.add(this.config.visibleItemClass);
        return;
      }
      
      // Otherwise, check if item has the active category
      if (categories && categories.includes(this.activeFilter)) {
        item.classList.add(this.config.visibleItemClass);
      } else {
        item.classList.remove(this.config.visibleItemClass);
      }
    });
    
    // Re-animate items
    this.animateItems();
  }

  /**
   * Update grid items based on active filter
   * @private
   */
  updateGridFiltering() {
    const gridContainer = this.container.querySelector(this.config.gridSelector);
    if (!gridContainer) return;
    
    // Clear existing content
    gridContainer.innerHTML = "";
    
    // Get filtered items
    const filteredItems = this.getFilteredItems();
    
    // Reset current count and render items
    this.currentItemCount = 8;
    const initialItems = filteredItems.slice(0, this.currentItemCount);
    
    // Re-render grid with filtered items
    this.renderGridItems();
  }

  /**
   * Get items filtered by active category
   * @returns {Array<GalleryItem>} - Filtered items
   * @private
   */
  getFilteredItems() {
    // Return all items if filter is "all"
    if (this.activeFilter === "all") {
      return this.allGalleryItems;
    }
    
    // Otherwise, filter by category
    return this.allGalleryItems.filter(item => 
      item.categories && item.categories.includes(this.activeFilter)
    );
  }

  /**
   * Animate gallery items
   * @private
   */
  animateItems() {
    if (!this.isDesktop) return;
    
    // Get visible items
    const visibleItems = this.collageContainer.querySelectorAll(
      `${this.config.collageItemSelector}.${this.config.visibleItemClass}`
    );
    
    // Add animation class with staggered delay
    visibleItems.forEach((item, index) => {
      // Remove existing animation class
      item.classList.remove(this.config.animatedItemClass);
      
      // Force reflow
      void item.offsetWidth;
      
      // Add animation class with delay
      setTimeout(() => {
        item.classList.add(this.config.animatedItemClass);
      }, index * this.config.animationStagger);
    });
  }

  /**
   * Load more items in grid view
   * @private
   */
  loadMore() {
    const gridContainer = this.container.querySelector(this.config.gridSelector);
    if (!gridContainer) return;
    
    // Remove existing load more button
    const existingButton = gridContainer.querySelector(".load-more-btn");
    if (existingButton) {
      existingButton.remove();
    }
    
    // Get filtered items
    const filteredItems = this.getFilteredItems();
    
    // Calculate next batch
    const nextBatchStart = this.currentItemCount;
    const nextBatchEnd = nextBatchStart + 8;
    const nextBatch = filteredItems.slice(nextBatchStart, nextBatchEnd);
    
    // Update count
    this.currentItemCount = nextBatchEnd;
    
    // Render next batch
    nextBatch.forEach((item) => {
      // Create item container
      const itemContainer = document.createElement("div");
      itemContainer.className = `${this.config.itemSelector.substring(1)}`;
      itemContainer.setAttribute("data-id", item.id);
      
      // Add categories as data attributes for filtering
      if (item.categories) {
        itemContainer.setAttribute("data-categories", item.categories.join(" "));
      }
      
      // Create image container for aspect ratio
      const imageContainer = document.createElement("div");
      imageContainer.className = "item-image-container";
      
      // Create image
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title || "Fighting AI image";
      img.loading = "lazy";
      
      // Create title
      const title = document.createElement("div");
      title.className = "item-title";
      title.textContent = item.title;
      
      // Assemble elements
      imageContainer.appendChild(img);
      itemContainer.appendChild(imageContainer);
      itemContainer.appendChild(title);
      
      // Add to grid before the load more button
      gridContainer.appendChild(itemContainer);
      
      // Add to rendered items
      this.renderedItems.push(itemContainer);
      
      // Add click event for modal
      itemContainer.addEventListener("click", () => this.openModal(item));
    });
    
    // Add "Load More" button if there are more items
    if (filteredItems.length > this.currentItemCount) {
      const loadMoreBtn = document.createElement("button");
      loadMoreBtn.className = "load-more-btn";
      loadMoreBtn.textContent = "Load More";
      loadMoreBtn.addEventListener("click", this.loadMore);
      
      gridContainer.appendChild(loadMoreBtn);
    }
  }

  /**
   * Handle window resize
   * @private
   */
  handleResize() {
    // Determine if layout should change
    const wasDesktop = this.isDesktop;
    this.isDesktop = window.innerWidth >= 768;
    
    // Only change layout if needed
    if (wasDesktop !== this.isDesktop) {
      if (this.isDesktop) {
        this.setupCollageLayout();
        
        // Add mouse move listener for desktop
        if (this.collageContainer) {
          this.collageContainer.addEventListener("mousemove", this.handleMouseMove);
          this.on(this.collageContainer, "mousemove", this.handleMouseMove);
        }
      } else {
        this.setupMobileLayout();
        
        // Remove mouse move listener for mobile
        if (this.collageContainer) {
          this.collageContainer.removeEventListener("mousemove", this.handleMouseMove);
        }
      }
    }
  }

  /**
   * Handle mouse move for parallax effect
   * @param {MouseEvent} event - Mouse event
   * @private
   */
  handleMouseMove(event) {
    // Early return if no container or already processing
    if (!this.collageContainer || this._mouseMoveProcessing) {
      return;
    }
    
    // Set processing flag and store animation frame ID for cleanup
    this._mouseMoveProcessing = true;
    
    // Store animation frame ID for cleanup
    this._animationFrameId = requestAnimationFrame(() => {
      try {
        // Get container position and dimensions
        const rect = this.collageContainer.getBoundingClientRect();
        
        // Calculate mouse position relative to container center (normalized -1 to 1)
        const containerCenterX = rect.left + rect.width / 2;
        const containerCenterY = rect.top + rect.height / 2;
        
        // Calculate normalized position (-1 to 1)
        const normalizedX = (event.clientX - containerCenterX) / (rect.width / 2);
        const normalizedY = (event.clientY - containerCenterY) / (rect.height / 2);
        
        // Calculate velocity (change in position)
        this._mouseVelocity = {
          x: normalizedX - this._lastMousePosition.x,
          y: normalizedY - this._lastMousePosition.y
        };
        
        // Store current position for next frame
        this._lastMousePosition = {
          x: normalizedX,
          y: normalizedY
        };
        
        // Apply parallax effect to visible items
        const items = this.collageContainer.querySelectorAll(
          `${this.config.collageItemSelector}.${this.config.visibleItemClass}`
        );
        
        // Apply movement based on mouse position
        items.forEach(item => {
          // Get item-specific sensitivity and movement limit
          const sensitivity = parseFloat(item.dataset.sensitivity) || 0.1;
          const movementLimit = parseFloat(item.dataset.movementLimit) || 1.0;
          
          // Calculate movement based on mouse position and sensitivity
          const moveX = normalizedX * sensitivity * movementLimit;
          const moveY = normalizedY * sensitivity * movementLimit;
          
          // Apply transform with hardware acceleration
          item.style.transform = `translate3d(${moveX * 30}px, ${moveY * 30}px, 0)`;
        });
      } catch (error) {
        console.error("Error in parallax effect:", error);
      } finally {
        // Reset processing flag
        this._mouseMoveProcessing = false;
      }
    });
  }

  /**
   * Open modal with gallery item
   * @param {GalleryItem} item - Gallery item to display
   */
  openModal(item) {
    if (!item) return;
    
    // Emit event for modal service to handle
    eventBus.emit("modal:open", {
      id: this.config.dialogId,
      contentId: this.config.dialogContentId,
      data: item
    });
  }

  /**
   * Clean up resources
   */
  destroy() {
    // Remove window listeners
    window.removeEventListener("resize", this.handleResize);
    
    // Remove collage listeners
    if (this.collageContainer) {
      this.collageContainer.removeEventListener("mousemove", this.handleMouseMove);
    }
    
    // Cancel any pending animation frame
    if (this._animationFrameId) {
      cancelAnimationFrame(this._animationFrameId);
    }
    
    // Call parent destroy
    super.destroy();
  }
}

export default FightingAIGallery;
