/**
 * ReadMoreSection - Further Reading section component
 * Manages the further reading articles section with dynamic data loading
 */

import { BaseComponent, PSAI } from "../../psai.js";

/**
 * ReadMore section component for showcasing journalism articles
 * @extends BaseComponent
 */
export class ReadMoreSection extends BaseComponent {
  /**
   * Create a new ReadMoreSection instance
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    super(config);

    this.config = {
      dataPath: "/src/data/readMore.json",
      containerSelector: "#furtherReading-sec",
      ...config,
    };

    // Component state
    this.articlesData = null;
    this.isInitialized = false;

    console.log("📚 ReadMoreSection component created");
  }

  /**
   * Initialize the component
   * @returns {Promise<this>} This component instance
   */
  async init() {
    try {
      console.log("📚 Initializing ReadMoreSection...");

      // Load articles data
      await this.loadArticlesData();

      // Render the articles if data exists
      if (this.articlesData && this.articlesData.articles) {
        this.renderArticles();
        this.setupEventListeners();
        this.isInitialized = true;
        console.log("✅ ReadMoreSection initialized successfully");
        return true;
      } else {
        console.warn("⚠️ No articles data available");
        return Promise.reject(new Error("No articles data available"));
      }
    } catch (error) {
      console.error("Failed to initialize ReadMoreSection:", error);
      return Promise.reject(error);
    }
  }

  /**
   * Load articles data from JSON file
   * @returns {Promise<boolean>} Success status
   */
  async loadArticlesData() {
    try {
      const data = await PSAI.Data.load(this.config.dataPath);
      if (!data || !Array.isArray(data.articles)) {
        console.error("Invalid articles data format");
        return false;
      }

      this.articlesData = data.articles;
      return true;
    } catch (error) {
      console.error("Failed to load articles data:", error);
      return false;
    }
  }

  /**
   * Render articles in the DOM using modern ES6 DOM manipulation
   */
  renderArticles() {
    // Find container element using the new DOM utilities
    this.container = select(this.config.containerSelector);
    if (!this.container) {
      console.error("❌ ReadMore container not found");
      return;
    }

    // Check if articles are already rendered to avoid duplication
    const existingContent = this.container.querySelector(
      ".reading-articles-content"
    );
    if (existingContent) {
      console.log("📚 Articles already rendered, skipping...");
      return;
    }

    const articles = this.articlesData.articles;
    const metadata = this.articlesData.metadata;

    // Find the container div
    const containerDiv = this.container.querySelector(".container");
    if (!containerDiv) {
      console.error("❌ Container div not found");
      return;
    }

    // Clear previous content
    containerDiv.innerHTML = "";

    // Create main content container
    const mainContainer = createElement("div");
    mainContainer.className =
      "row justify-content-center align-items-center h-100vh";

    const contentWrapper = createElement("div");
    contentWrapper.className = "text-center reading-articles-content";

    // Create heading
    const heading = createElement("h2");
    heading.className = "heading-1 text-orange mb-3 text-uppercase p-5";
    heading.id = "furtherReading-text";

    const titleParts = metadata.sectionTitle.split(" ");
    const subtitlePart = titleParts.pop();

    heading.innerHTML = `${titleParts.join(" ")}<br/>`;

    const subtitleSpan = createElement("span");
    subtitleSpan.className = "border orange";
    subtitleSpan.textContent = metadata.sectionSubtitle;
    heading.appendChild(subtitleSpan);

    contentWrapper.appendChild(heading);

    // Create grid container
    const grid = createElement("div");
    grid.className = "articles-grid";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
    grid.style.gap = "1rem";
    grid.style.maxWidth = "1200px";
    grid.style.margin = "0 auto";

    // Add articles to grid
    articles.forEach((article) => {
      const cardElement = this.createArticleCardElement(article);
      grid.appendChild(cardElement);
    });

    contentWrapper.appendChild(grid);
    mainContainer.appendChild(contentWrapper);
    containerDiv.appendChild(mainContainer);

    console.log("✅ Articles rendered successfully");

    // Add animations to the cards
    this.addCardAnimations();
  }

  /**
   * Create an article card element using modern ES6 DOM manipulation
   * @param {Object} article - Article data
   * @returns {HTMLElement} Article card element
   */
  createArticleCardElement(article) {
    // Create card container
    const card = createElement("div");
    card.className =
      "article-card col col-lg-3 col-12 bg-white p-3 position-relative";
    card.style.margin = "20px auto";
    card.style.maxWidth = "285px";
    card.style.aspectRatio = "0.8";
    card.style.overflow = "hidden";

    // Add accessibility attributes
    card.setAttribute("role", "article");
    card.setAttribute("aria-labelledby", `article-title-${article.id}`);
    card.setAttribute("tabindex", "0"); // Make card focusable for keyboard navigation

    // Preload images with lazy loading if article has an image
    if (article.imageUrl) {
      const preloadLink = createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "image";
      preloadLink.href = article.imageUrl;
      document.head.appendChild(preloadLink);

      // Set background image if provided
      card.style.backgroundImage = `url(${article.imageUrl})`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";
      card.style.backgroundRepeat = "no-repeat";
    }

    // Add the corners
    this.addCorners(card);

    // Create and add the "read more" link
    const link = createElement("a");
    link.href = article.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Read more about ${article.title}`);
    link.className = "article-link"; // Add class for styling

    const linkSpan = createElement("span");
    linkSpan.className =
      "text-uppercase position-absolute furtherReading-card-cta m-3 ps-3 pe-3 border";
    linkSpan.textContent = "read more";

    link.appendChild(linkSpan);
    card.appendChild(link);

    // Create content container for better structure
    const contentContainer = createElement("div");
    contentContainer.className = "article-content";

    // Create title
    const title = createElement("h3");
    title.className =
      "heading-4 black-text text-uppercase furtherReading-card-titles text-start";
    title.id = `article-title-${article.id}`; // Add ID for aria-labelledby reference

    // Add title lines
    article.titleLines.forEach((line) => {
      if (line) {
        title.innerHTML += `${line} <br/>`;
      } else {
        title.innerHTML += "<br/>";
      }
    });

    // Create author and date paragraphs
    const authorPara = createElement("p");
    authorPara.className = "text-uppercase text-start furtherReading-card-p";
    authorPara.textContent = article.authors;

    // Add aria-label for screen readers if authors are abbreviated
    if (article.authors && article.authors.includes(".")) {
      authorPara.setAttribute("aria-label", `Written by ${article.authors}`);
    }

    const datePara = createElement("p");
    datePara.className = "text-start furtherReading-card-p date";
    datePara.textContent = article.date;

    // Format date for better accessibility
    if (article.date) {
      const dateObj = new Date(article.date);
      if (!isNaN(dateObj)) {
        datePara.setAttribute("datetime", dateObj.toISOString());
      }
    }

    // Add all elements to content container
    contentContainer.appendChild(title);
    contentContainer.appendChild(authorPara);
    contentContainer.appendChild(datePara);

    // Add content container to card
    card.appendChild(contentContainer);

    // Add event listener for keyboard interaction directly on the card
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        link.click(); // Trigger the link click when Enter or Space is pressed on the card
      }
    });

    return card;
  }

  /**
   * Add corner SVGs to the card element with improved accessibility
   * @param {HTMLElement} card - The card element
   */
  addCorners(card) {
    // Use a DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    // Create corner SVGs
    const corners = [
      { position: "top-left", className: "tl" },
      { position: "top-right", className: "tr" },
      { position: "bottom-left", className: "bl" },
      { position: "bottom-right", className: "br" },
    ];

    corners.forEach((corner) => {
      const svg = createElement("svg");
      svg.classList.add(
        "further-corner",
        corner.className,
        "position-absolute"
      );

      // Set attributes based on corner position
      if (corner.position.includes("top")) {
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("viewBox", "0 0 20 20");
      } else {
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "21");
        svg.setAttribute("viewBox", "0 0 20 21");
      }

      // Add ARIA attributes for better accessibility
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      svg.setAttribute("role", "presentation");
      svg.setAttribute("fill", "none");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      // Create path element
      const path = createElement("path");

      // Set path attributes based on corner position
      if (corner.position === "top-left") {
        path.setAttribute(
          "d",
          "M5.45389 0.973724L0.973738 5.45388C0.353177 6.07444 0 6.92204 0 7.7999V19.2677H4.57098C5.59011 19.2677 6.42256 18.4403 6.42256 17.4161V6.42255H17.4161C18.4352 6.42255 19.2677 5.59515 19.2677 4.57097V0H7.79991C6.92205 0 6.07445 0.348116 5.45389 0.973724Z"
        );
      } else if (corner.position === "top-right") {
        path.setAttribute(
          "d",
          "M13.8138 0.973724L18.294 5.45388C18.9145 6.07444 19.2677 6.92204 19.2677 7.7999V19.2677H14.6967C13.6776 19.2677 12.8451 18.4403 12.8451 17.4161V6.42255H1.85159C0.832452 6.42255 0 5.59515 0 4.57097V0H11.4678C12.3456 0 13.1932 0.348116 13.8138 0.973724Z"
        );
      } else if (corner.position === "bottom-left") {
        path.setAttribute(
          "d",
          "M5.45389 19.0415L0.973738 14.5614C0.353177 13.9408 0 13.0932 0 12.2153V0.747559H4.57098C5.59011 0.747559 6.42256 1.57497 6.42256 2.59914V13.5927H17.4161C18.4352 13.5927 19.2677 14.4201 19.2677 15.4443V20.0152H7.79991C6.92205 20.0152 6.07445 19.6671 5.45389 19.0415Z"
        );
      } else if (corner.position === "bottom-right") {
        path.setAttribute(
          "d",
          "M13.8138 19.0415L18.294 14.5614C18.9145 13.9408 19.2677 13.0932 19.2677 12.2153V0.747559H14.6967C13.6776 0.747559 12.8451 1.57497 12.8451 2.59914V13.5927H1.85159C0.832452 13.5927 0 14.4201 0 15.4443V20.0152H11.4678C12.3456 20.0152 13.1932 19.6671 13.8138 19.0415Z"
        );
      }

      path.setAttribute("fill", "#FF4F2A");
      svg.appendChild(path);

      // Position the corners correctly
      if (corner.position === "top-left") {
        svg.style.top = "0";
        svg.style.left = "0";
      } else if (corner.position === "top-right") {
        svg.style.top = "0";
        svg.style.right = "0";
        svg.style.transform = "scaleX(-1)";
      } else if (corner.position === "bottom-left") {
        svg.style.bottom = "0";
        svg.style.left = "0";
        svg.style.transform = "scaleY(-1)";
      } else if (corner.position === "bottom-right") {
        svg.style.bottom = "0";
        svg.style.right = "0";
        svg.style.transform = "scale(-1, -1)";
      }

      fragment.appendChild(svg);
    });

    // Append all corners at once for better performance
    card.appendChild(fragment);
  }

  /**
   * Setup event listeners for article interactions using event delegation
   */
  setupEventListeners() {
    console.log("🔗 Setting up ReadMore event listeners...");

    // Use event delegation for better performance
    const container = this.container;

    if (!container) {
      console.error(
        "ReadMoreSection: Container element not found:",
        this.config.containerSelector
      );
      return Promise.reject(new Error("Container element not found"));
    }

    // Click handler for better analytics and user interactions using event delegation
    this.on(container, "click", (event) => {
      // Check if the clicked element is or is within a read-more link
      const linkElement = event.target.closest(".furtherReading-card-cta");
      if (linkElement) {
        const link = linkElement.closest("a");
        if (link) {
          // Capture click data for analytics
          const articleCard = link.closest(".article-card");
          const titleElement = articleCard?.querySelector(
            ".furtherReading-card-titles"
          );
          const title =
            titleElement?.textContent?.trim() || "Unknown article";

          // Log analytics event
          console.log("📖 Article clicked:", title, link.href);

          // Emit article click event for analytics tracking
          this.emit("readmore:article:click", {
            title,
            url: link.href,
            timestamp: Date.now(),
          });
        }
      }
    });

    // Keyboard navigation support with event delegation
    this.on(container, "keydown", (event) => {
      // Handle Enter or Space key press for accessibility
      if (event.key === "Enter" || event.key === " ") {
        const target = event.target;

        // Check if the pressed element is a card or read more button
        const card = target.closest(".article-card");
        const cta = target.closest(".furtherReading-card-cta");

        if (cta) {
          // Trigger the link click on Enter or Space
          event.preventDefault();
          cta.click();
        } else if (card && !cta) {
          // If pressing on the card but not on the CTA, find and click the CTA
          event.preventDefault();
          const cardLink = card.querySelector(".furtherReading-card-cta");
          if (cardLink) {
            cardLink.click();
          }
        }
      }

      // Handle arrow keys for improved keyboard navigation between cards
      if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
          event.key
        )
      ) {
        const cards = Array.from(container.querySelectorAll(".article-card"));
        const currentCard = event.target.closest(".article-card");

        if (currentCard && cards.length > 1) {
          const currentIndex = cards.indexOf(currentCard);
          let nextIndex;

          // Determine which card to focus based on arrow key
          switch (event.key) {
            case "ArrowLeft":
              nextIndex =
                currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
              break;
            case "ArrowRight":
              nextIndex =
                currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
              break;
            case "ArrowUp":
              // Move up in the grid (assumes 3 columns on desktop)
              nextIndex = currentIndex >= 3 ? currentIndex - 3 : currentIndex;
              break;
            case "ArrowDown":
              // Move down in the grid (assumes 3 columns on desktop)
              nextIndex =
                currentIndex < cards.length - 3
                  ? currentIndex + 3
                  : currentIndex;
              break;
          }

          // Focus the next card if different from current
          if (nextIndex !== currentIndex && cards[nextIndex]) {
            event.preventDefault();
            cards[nextIndex].focus();
          }
        }
      }
    });

    // Add hover effects using event delegation
    this.on(
      container,
      "mouseenter",
      (event) => {
        const card = event.target.closest(".article-card");
        if (card) {
          card.style.transform = "translateY(-5px)";
          card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
        }
      },
      true
    );

    this.on(
      container,
      "mouseleave",
      (event) => {
        const card = event.target.closest(".article-card");
        if (card) {
          card.style.transform = "translateY(0)";
          card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.05)";
        }
      },
      true
    );

    // Add focus handling for accessibility
    this.on(
      container,
      "focus",
      (event) => {
        const card = event.target.closest(".article-card");
        if (card) {
          card.style.transform = "translateY(-5px)";
          card.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
          card.classList.add("focused");
        }
      },
      true
    );

    this.on(
      container,
      "blur",
      (event) => {
        const card = event.target.closest(".article-card");
        if (card) {
          card.style.transform = "translateY(0)";
          card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.05)";
          card.classList.remove("focused");
        }
      },
      true
    );

    console.log(
      "✅ ReadMore event listeners setup complete with enhanced accessibility"
    );
  }

  /**
   * Add animation effects to the cards
   */
  addCardAnimations() {
    const cards = document.querySelectorAll(".article-card");

    // Skip animations if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "none";
        card.classList.add("animate-complete");
      });
      return;
    }

    // Check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
      // Use IntersectionObserver for more efficient animations
      const observerOptions = {
        root: null,
        rootMargin: "50px", // Start loading a bit before they come into view
        threshold: 0.1,
      };

      const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const card = entry.target;

            // Optimize for animation with will-change
            card.style.willChange = "opacity, transform";

            // Add animations with requestAnimationFrame for better performance
            requestAnimationFrame(() => {
              // Use a staggered delay based on index
              const animationTimer = setTimeout(() => {
                card.style.transition =
                  "opacity 0.5s ease, transform 0.5s ease";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
                card.classList.add("animate-complete");

                // Remove will-change after animation completes to free up resources
                const cleanupTimer = setTimeout(() => {
                  card.style.willChange = "auto";
                }, 500); // Match transition duration

                // Track for cleanup
                this.addTimer(cleanupTimer);
              }, 50 * index);

              // Track for cleanup
              this.addTimer(animationTimer);
            });

            // Stop observing this card after animation is applied
            observer.unobserve(card);
          }
        });
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );

      // Track the observer for proper cleanup
      this.addObserver(observer);

      // Set initial state and observe each card
      cards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        // Add tabindex to ensure proper focus order
        if (!card.hasAttribute("tabindex")) {
          card.setAttribute("tabindex", "0");
        }

        // Start observing
        observer.observe(card);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      cards.forEach((card, index) => {
        // Set initial opacity and transform
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        // Add staggered animation with setTimeout
        const timer = setTimeout(() => {
          card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
          card.classList.add("animate-complete");
        }, 100 + index * 100); // Slightly faster stagger

        // Track for cleanup
        this.addTimer(timer);
      });
    }
  }

  /**
   * Get current articles data
   * @returns {Array|null} Articles array
   */
  getArticles() {
    return this.articlesData?.articles || null;
  }

  /**
   * Refresh articles data and re-render
   * @returns {Promise<boolean>} Success status
   */
  async refresh() {
    console.log("🔄 Refreshing ReadMore articles...");
    await this.loadArticlesData();
    this.renderArticles();
    return this.isInitialized;
  }
}

export default ReadMoreSection;
