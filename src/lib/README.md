# PSAI Component Architecture

## Overview

This directory contains the core JavaScript components, services, and utilities for the PSAI application. The architecture follows a simple component-based approach with clean separation of concerns.

## Directory Structure

```
src/lib/
├── components/            # UI and feature components
│   ├── base/              # Base component classes
│   ├── ui/                # UI components (Navbar, Hero, etc.)
│   └── features/          # Feature components (SpotAICarousel, FightingAIGallery)
├── services/              # Service classes
│   ├── AppService.js      # Core application service
│   ├── EventBus.js        # Event bus for component communication
│   └── ModalService.js    # Modal management service
├── anime.js               # Animation utilities using AnimeJS
├── BaseComponent.js       # Base component class
├── dom.js                 # DOM manipulation utilities
└── index.js               # Centralized exports
```

## Architecture

### Component-Based Structure

PSAI uses a straightforward component architecture with simple imports from centralized index.js:

```javascript
// Import services and components
import {
  appService,
  eventBus,
  NavbarComponent,
  HeroComponent
} from './lib/index.js';
```

### BaseComponent

All components extend `BaseComponent` which provides:

- Promise-based initialization via `init()` method
- Resource cleanup via `destroy()` method
- Event listener management with automatic cleanup
- Timer and animation management

### Core Services

- `appService`: Manages component registration and lifecycle
- `eventBus`: Handles cross-component communication
- `ModalService`: Manages modal dialogs

### Event Communication

Components communicate through the eventBus:

```javascript
// Publishing an event
eventBus.emit('modal:open', modalId);

// Subscribing to an event
eventBus.on('app:ready', () => {
  console.log('App is ready');
});
```

### Memory Management

Components handle cleanup in their `destroy` method:

```javascript
// In BaseComponent's destroy method
destroy() {
  // Clean up event listeners
  this._listeners?.forEach(listener => {
    listener.element.removeEventListener(listener.event, listener.handler);
  });
  this._listeners = [];
}
```

## Core Utilities

### DOM Utilities

```javascript
// Select elements
const element = $('.my-selector');
const elements = $('.my-items', true);

// Create elements
const div = create('div', {
  className: 'my-class',
  textContent: 'Hello World',
  style: { color: 'red' }
});
```

### Animation Utilities

```javascript
// Create animations
anime({
  targets: element,
  translateY: [20, 0],
  opacity: [0, 1],
  duration: 600
});

// Use scroll trigger animations
scrollTrigger({
  targets: element,
  translateY: [50, 0],
  opacity: [0, 1],
  threshold: 0.2
});
```

### Event Handling

```javascript
// In BaseComponent extensions
this.on(element, 'click', this.handleClick.bind(this));

// Using EventBus
eventBus.on('app:ready', this.initialize.bind(this));
eventBus.emit('component:loaded', { id: this.id });
```

## Implementation Guide

### Creating a New Component

```javascript
// Import the BaseComponent and necessary utilities
import { BaseComponent } from '../BaseComponent.js';
import { $ } from '../dom.js';
import anime from '../anime.js';

export default class MyComponent extends BaseComponent {
  constructor(options = {}) {
    super();
    this.options = options;
    this.container = null;
  }
  
  init() {
    // Find the container
    this.container = $(this.options.selector || '.my-component');
    if (!this.container) return Promise.resolve(this);
    
    // Set up event listeners with automatic cleanup
    this.on(this.container, 'click', this.handleClick.bind(this));
    
    // Return promise for async initialization
    return Promise.resolve(this);
  }
  
  handleClick(e) {
    // Component logic
    console.log('Component clicked');
  }
  
  destroy() {
    // Custom cleanup logic
    
    // Call parent destroy to handle common cleanup
    super.destroy();
  }
}
```

### Registering Components

```javascript
// In main.js
import { appService } from './lib/index.js';
import MyComponent from './lib/components/features/MyComponent.js';

// Register component
appService.register('myComponent', new MyComponent({
  selector: '.my-component-container'
}));

// Initialize all components
appService.init()
  .then(() => console.log('Application ready'));
```

## Usage Example

```javascript
import {
  appService,
  eventBus,
  ModalService,
  NavbarComponent,
  HeroComponent,
  ParticleSystem
} from './lib/index.js';

// Set debug mode
appService.debug = location.hostname === 'localhost';

// Register components
appService
  .register('modal', new ModalService())
  .register('navbar', new NavbarComponent())
  .register('hero', new HeroComponent({
    logoSelector: '.the-PSAI img',
    topGifSelector: '.coders-gifs .top-img',
    bottomGifSelector: '.coders-gifs .bottom-img'
  }))
  .register('particles', new ParticleSystem({
    selector: '.particle-container',
    particleCount: 70
  }));

// Initialize all components
appService.init()
  .then(() => console.log('✅ Application ready!'))
  .catch(err => console.error('❌ Init failed:', err));

// Global cleanup
window.addEventListener('beforeunload', () => appService.destroy());
```

## Best Practices

1. **Return Promises from init()**: Always return Promise.resolve(this) from component init methods
2. **Clean up in destroy()**: Call super.destroy() in component destroy methods
3. **Use the event bus**: For cross-component communication
4. **Register all components before init**: Add all components to appService before calling init()
5. **Use options objects**: Pass configuration through constructor options
6. **Handle element absence**: Check if target elements exist before attaching behavior
