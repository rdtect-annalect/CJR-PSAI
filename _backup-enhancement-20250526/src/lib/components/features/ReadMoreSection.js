import BaseComponent from "../base/BaseComponent.js";
import { $ } from "../../utils/dom.js";

export default class ReadMoreSection extends BaseComponent {
  constructor(config = {}) {
    super(config);
    this.config = {
      dataPath: "/src/data/readMore.json",
      containerSelector: "#reading",
      ...config,
    };
    this.articlesData = null;
  }

  async init() {
    try {
      await this.loadArticlesData();
      if (this.articlesData && Array.isArray(this.articlesData)) {
        this.renderArticles();
        this.setupEventListeners();
        return this;
      } else {
        throw new Error("No articles data available");
      }
    } catch (error) {
      console.error("Failed to initialize ReadMoreSection:", error);
      throw error;
    }
  }

  async loadArticlesData() {
    try {
      const response = await fetch(this.config.dataPath);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        this.articlesData = data;
      } else if (data && Array.isArray(data.articles)) {
        this.articlesData = data.articles;
      } else {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Failed to load articles data:", error);
      return false;
    }
  }
  renderArticles() {
    this.container = $(this.config.containerSelector);
    if (!this.container) return;

    let articlesGrid = this.container.querySelector(".articles-grid");
    if (!articlesGrid) {
      articlesGrid = document.createElement("div");
      articlesGrid.className = "articles-grid";
      this.container.appendChild(articlesGrid);
    }

    articlesGrid.innerHTML = "";
    this.articlesData.forEach((article) => {
      const cardElement = this.createArticleCard(article);
      articlesGrid.appendChild(cardElement);
    });
  }

  createArticleCard(article) {
    const card = document.createElement("div");
    card.className = "read-more-card";
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>
      <div class="card-content">
        <h3 class="card-title">${article.title || ''}</h3>
        <p class="card-author">${article.authors || ''}</p>
        <p class="card-date">${article.date || ''}</p>
        <button class="read-more-btn">
          READ MORE
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 1L7 7M7 7V1M7 7H1" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
      </div>
    `;

    if (article.link) {
      this.on(card, 'click', () => {
        window.open(article.link, '_blank', 'noopener,noreferrer');
      });
      card.style.cursor = 'pointer';
    }

    return card;
  }

  setupEventListeners() {
    if (!this.container) return;
    
    this.on(this.container, 'keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const card = event.target.closest('.read-more-card');
        if (card) {
          event.preventDefault();
          card.click();
        }
      }
    });
  }
}