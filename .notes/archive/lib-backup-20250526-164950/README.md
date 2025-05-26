# PSAI Component Architecture

## Overview

This directory contains the core JavaScript components, services, and utilities for the PSAI application. The architecture follows modern JavaScript patterns and best practices, emphasizing maintainability, performance, and clean code.

## Directory Structure

```
src/lib/
├── components/            # UI and feature components
│   ├── ui/                # UI components (Navbar, Hero)
│   └── features/          # Feature components (SpotAICarousel, FightingAIGallery)
├── services/              # Service classes
│   ├── EventBus.js        # Event bus for cross-component communication
│   └── ModalService.js    # Modal management service
├── deprecated/            # Legacy code kept for reference
└── psai.js                # Core library with consolidated utilities for easy importing
```

## Architecture

### Modern Class-based Architecture

The PSAI library uses a streamlined, class-based architecture with a single source of truth for utilities:

```javascript
// Import all core utilities from a single file
import { PSAI, BaseComponent, appService } from './psai.js';
```

### PSAI Core Utilities

The `PSAI` class provides all core utilities in a clean, organized structure:

- `PSAI.DOM`: DOM manipulation utilities (select, create, etc.)
- `PSAI.Animation`: Animation utilities using AnimeJS v4
- `PSAI.Events`: Event handling utilities (add, debounce, throttle)
- `PSAI.Data`: Data loading and processing utilities

### Component Architecture

All components extend `BaseComponent` which provides:

- Promise-based lifecycle management (init, destroy)
- Automatic resource cleanup
- Event listener management
- Timer and animation frame tracking

### Service Architecture

- `EventBus`: Centralized event system for cross-component communication
- `AppService`: Application service that registers and initializes components
- `ModalService`: Manages modals with consistent behavior and accessibility

### Event-Driven Communication

Components communicate through the EventBus service:

```javascript
// Publishing an event
eventBus.emit('my-event', { data: 'example' });

// Subscribing to an event
const unsubscribe = eventBus.on('my-event', (data) => {
  // Handle event
});

// Cleaning up when done
unsubscribe();
```

### Memory Management

All components implement proper cleanup in their `destroy` method:

- Event listeners
- Timers and intervals
- Animation frames
- IntersectionObserver instances

## Core Utilities

### DOM Utilities

```javascript
// Select elements
const element = PSAI.DOM.select('.my-selector');
const elements = PSAI.DOM.select('.my-items', document, true);

// Create elements
const div = PSAI.DOM.create('div', {
  className: 'my-class',
  text: 'Hello World',
  style: { color: 'red' }
});
```

### Animation Utilities

```javascript
// Create animations
PSAI.Animation.create(element, {
  translateY: [20, 0],
  opacity: [0, 1],
  duration: 600
});

// Create spring animations
PSAI.Animation.spring(element, {
  translateY: 0,
  duration: 800
});
```

### Event Utilities

```javascript
// Add event with automatic cleanup
const cleanup = PSAI.Events.add(element, 'click', handleClick);

// Create debounced function
const debouncedResize = PSAI.Events.debounce(handleResize, 200);

// Create throttled function
const throttledScroll = PSAI.Events.throttle(handleScroll, 100);
```

### Data Utilities

```javascript
// Load JSON data
const data = await PSAI.Data.load('/path/to/data.json');
```

## Migration Guide

Follow these steps to migrate components from the old architecture to the new streamlined architecture:

### 1. Update Imports

**Old**:
```javascript
import BaseComponent from "../base/BaseComponent.js";
import { loadData } from "../../utils/dataUtils.js";
import { select, selectAll } from "../../core/dom.js";
import { animate } from "../../core/animation.js";
```

**New**:
```javascript
import { BaseComponent, PSAI } from "../../psai.js";
import eventBus from "../../services/EventBus.js";
```

### 2. Update DOM Methods

**Old**:
```javascript
const element = select(".my-selector");
const elements = selectAll(".my-items");
```

**New**:
```javascript
const element = PSAI.DOM.select(".my-selector");
const elements = PSAI.DOM.select(".my-items", document, true);
```

### 3. Update Animation Code

**Old**:
```javascript
animate(element, {
  translateY: [20, 0],
  opacity: [0, 1],
  duration: 600
});
```

**New**:
```javascript
PSAI.Animation.create(element, {
  translateY: [20, 0],
  opacity: [0, 1],
  duration: 600
});
```

### 4. Update Data Loading

**Old**:
```javascript
const data = await loadData('/path/to/data.json');
```

**New**:
```javascript
const data = await PSAI.Data.load('/path/to/data.json');
```

### 5. Update Event Handling

**Old**:
```javascript
this.on(element, "click", this.handleClick);
```

**New**:
```javascript
// In components extending BaseComponent
this.on(element, "click", this.handleClick);

// Or using PSAI utilities directly
const cleanup = PSAI.Events.add(element, "click", this.handleClick);
```

### Animation

Enhanced animation utilities built on AnimeJS v4:

- Hardware-accelerated animations
- Physics-based animations with springs
- Standardized easing functions
- Performance optimizations

### DOM

Simplified DOM manipulation:

- Element selection and creation
- Attribute management
- Class manipulation
- IntersectionObserver utilities

### Events

Robust event handling:

- EventEmitter with memory safety
- Event tracking for automatic cleanup
- Debounce and throttle utilities

## Usage Example

```javascript
import { 
  appService, 
  NavbarComponent, 
  HeroComponent 
} from './lib/index.js';

// Register components
appService.registerComponent('navbar', new NavbarComponent());
appService.registerComponent('hero', new HeroComponent());

// Initialize application
appService.init()
  .then(() => {
    console.log('Application initialized successfully');
  })
  .catch(error => {
    console.error('Initialization failed:', error);
  });
```

## Best Practices

1. **Always clean up resources**: Use the destroy() method to release references
2. **Use event delegation**: Prefer delegated events for better performance
3. **Avoid direct DOM manipulation**: Use the DOM utilities for consistency
4. **Leverage hardware acceleration**: Use transform and opacity for animations
5. **Follow Promise patterns**: Properly handle async operations with catch blocks
