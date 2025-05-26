# PSAi Optimizations Guide

## Current Implementation Status

✅ **Fighting AI Gallery** - Now loads and displays all batches from JSON  
✅ **Spot AI Carousel** - Images with overlaid text, click opens modal with medium images  
✅ **Reading Section** - 6 article cards in 3x2 grid with corner decorations  
✅ **Navbar** - Simple hide-on-scroll-down behavior added  

## JavaScript Optimizations

### 1. Performance Improvements

**Lazy Loading & Intersection Observer**
```javascript
// Current: Basic image loading
// Optimize with IntersectionObserver for better performance
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
}, { rootMargin: '50px' });

// Apply to all carousel and gallery images
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

**Event Delegation**
```javascript
// Current: Individual event listeners per element
// Optimize with event delegation
container.addEventListener('click', (e) => {
  const slide = e.target.closest('.carousel-slide');
  const galleryItem = e.target.closest('.gallery-item');
  
  if (slide) this.openModal(this.data[slide.dataset.index]);
  if (galleryItem) this.openGalleryModal(galleryItem.dataset.item);
});
```

**Debounced Scroll Handler**
```javascript
// Current: Direct scroll listener
// Optimize with debouncing for better performance
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

window.addEventListener('scroll', debounce(handleScroll, 16), { passive: true });
```

### 2. Memory Management

**Component Cleanup**
```javascript
// Add to BaseComponent destroy method
destroy() {
  // Clear intervals and timeouts
  this._cleanup.forEach(fn => fn());
  
  // Remove event listeners
  this.observers?.forEach(observer => observer.disconnect());
  
  // Clear references
  this.data = null;
  this.container = null;
  
  super.destroy();
}
```

**Image Preloading Strategy**
```javascript
// Preload next carousel images
preloadNextImages(currentIndex) {
  const nextIndexes = [currentIndex + 1, currentIndex + 2].filter(i => i < this.data.length);
  nextIndexes.forEach(index => {
    if (this.data[index]?.images?.medium) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = this.data[index].images.medium;
      document.head.appendChild(link);
    }
  });
}
```

### 3. Data Loading Optimizations

**Progressive Data Loading**
```javascript
// Load critical data first, then secondary data
async init() {
  // Load essential data immediately
  await Promise.all([
    this.loadCarouselData(),
    this.loadArticleData()
  ]);
  
  // Load gallery data in background
  setTimeout(() => this.loadGalleryData(), 100);
  
  this.render();
}
```

**Data Caching**
```javascript
// Simple cache implementation
const dataCache = new Map();

async loadCached(url) {
  if (dataCache.has(url)) {
    return dataCache.get(url);
  }
  
  const data = await fetch(url).then(r => r.json());
  dataCache.set(url, data);
  return data;
}
```

## CSS Optimizations

### 1. Performance Improvements

**GPU Acceleration**
```css
/* Use transform3d to trigger hardware acceleration */
.carousel-slide {
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

.carousel-slide:hover {
  transform: translate3d(0, -5px, 0);
}

/* Remove will-change after animation */
.carousel-slide.animation-complete {
  will-change: auto;
}
```

**Optimized Animations**
```css
/* Use transform instead of changing layout properties */
.navbar-hidden {
  transform: translateY(-100%);
  /* Better than: top: -100%; */
}

.gallery-item:hover {
  transform: scale(1.05);
  /* Better than: width/height changes */
}
```

**Efficient Selectors**
```css
/* Specific selectors instead of deep nesting */
.carousel-slide {
  /* Direct class selector */
}

/* Instead of: */
.spot-ai .carousel-container .carousel-track .carousel-slide {
  /* Overly specific */
}
```

### 2. Loading Optimizations

**Critical CSS Inlining**
```html
<!-- Inline critical above-the-fold CSS -->
<style>
  .hero { height: 100vh; }
  .navbar { position: fixed; top: 0; }
  /* Essential layout styles */
</style>

<!-- Load full stylesheet asynchronously -->
<link rel="preload" href="/src/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

**Font Loading Strategy**
```css
/* Use font-display for better loading */
@font-face {
  font-family: 'YourFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}
```

### 3. Responsive Optimizations

**Container Queries (Future)**
```css
/* When supported, use container queries for components */
@container carousel (min-width: 768px) {
  .carousel-slide {
    width: 20%; /* 5 slides */
  }
}

@container carousel (max-width: 767px) {
  .carousel-slide {
    width: 50%; /* 2 slides */
  }
}
```

**Efficient Media Queries**
```css
/* Mobile-first approach */
.carousel-slide {
  width: 100%; /* Mobile default */
}

@media (min-width: 576px) {
  .carousel-slide { width: 50%; }
}

@media (min-width: 768px) {
  .carousel-slide { width: 33.333%; }
}

@media (min-width: 1024px) {
  .carousel-slide { width: 20%; }
}
```

## Bundle Size Optimizations

### 1. Code Splitting
```javascript
// Lazy load non-critical components
const LazyGallery = () => import('./FightingAIGallery.js');

// Load only when needed
if (document.querySelector('[data-gallery]')) {
  const { default: FightingAIGallery } = await LazyGallery();
  new FightingAIGallery().init();
}
```

### 2. Tree Shaking
```javascript
// Import only what you need
import { $, create } from './utils/dom.js';
// Instead of: import * as dom from './utils/dom.js';
```

### 3. Asset Optimization
```javascript
// Use WebP with fallback
function getOptimizedImageSrc(imagePath) {
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  return supportsWebP 
    ? imagePath.replace(/\.(jpg|png)$/, '.webp')
    : imagePath;
}
```

## Accessibility Optimizations

### 1. Keyboard Navigation
```javascript
// Enhanced keyboard support
handleKeydown(e) {
  const { key } = e;
  const currentIndex = parseInt(e.target.dataset.index);
  
  switch(key) {
    case 'ArrowLeft':
      this.focusSlide(currentIndex - 1);
      break;
    case 'ArrowRight':
      this.focusSlide(currentIndex + 1);
      break;
    case 'Home':
      this.focusSlide(0);
      break;
    case 'End':
      this.focusSlide(this.data.length - 1);
      break;
  }
}
```

### 2. Screen Reader Support
```css
/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 3. Focus Management
```javascript
// Proper focus management for modals
openModal(item) {
  const modal = document.querySelector('.modal');
  modal.showModal();
  
  // Store previous focus
  this.previousFocus = document.activeElement;
  
  // Focus first focusable element in modal
  const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  firstFocusable?.focus();
}

closeModal() {
  const modal = document.querySelector('.modal');
  modal.close();
  
  // Restore previous focus
  this.previousFocus?.focus();
}
```

## Monitoring & Analytics

### 1. Performance Monitoring
```javascript
// Measure component initialization time
const initStart = performance.now();
await component.init();
const initTime = performance.now() - initStart;

console.log(`Component initialized in ${initTime}ms`);

// Monitor carousel performance
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.name.includes('carousel')) {
      console.log('Carousel animation took:', entry.duration);
    }
  });
});
observer.observe({ entryTypes: ['measure'] });
```

### 2. Error Tracking
```javascript
// Global error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  // Send to analytics service
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
  // Send to analytics service
});
```

## Implementation Priority

### High Priority (Immediate)
1. ✅ Fix component errors (DONE)
2. ✅ Add missing section functionality (DONE)
3. ✅ Implement navbar hide behavior (DONE)
4. Add lazy loading for images
5. Implement event delegation

### Medium Priority (Next Sprint)
1. Add preloading for carousel images
2. Implement proper focus management
3. Add keyboard navigation
4. Optimize CSS animations
5. Add error boundaries

### Low Priority (Future)
1. Implement service worker for caching
2. Add performance monitoring
3. Implement container queries
4. Add advanced analytics

## File Structure Recommendations

```
src/
├── components/
│   ├── base/
│   │   └── BaseComponent.js
│   ├── features/
│   │   ├── SpotAICarousel.js
│   │   ├── FightingAIGallery.js
│   │   └── ReadMoreSection.js
│   └── ui/
├── utils/
│   ├── dom.js
│   ├── performance.js
│   └── accessibility.js
├── services/
│   ├── DataService.js
│   └── AnalyticsService.js
└── css/
    ├── base.css
    ├── components.css
    └── utilities.css
```

This optimization guide provides a roadmap for improving the PSAi application's performance, accessibility, and maintainability while keeping the current working functionality intact.