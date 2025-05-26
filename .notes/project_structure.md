# CJR-PSAI Project Structure

This document outlines the structure and key architectural decisions for the CJR-PSAI project after refactoring to remove jQuery and Bootstrap dependencies.

## Core Architecture

The project follows a modular, component-based architecture using vanilla JavaScript and custom CSS:

- **CSS Framework**: Custom framework using BEM methodology in `src/css/framework.css`
- **JavaScript Modules**: Self-contained modules in `src/modules/`
- **Utility Functions**: Shared helpers in `src/utils/`
- **Animation System**: AnimeJS-based utilities in `src/utils/animeUtils.js`

## Key Components

### CSS Framework
- Modern layout system with CSS Grid and Flexbox
- Responsive breakpoints and utility classes
- Custom component styling without Bootstrap dependencies

### Module System
- `spotAI.js`: Handles the "How to Spot AI" interactive carousel
- `fightingAI.js`: Manages the "Fighting AI with AI" interactive gallery
- `modal.js`: Provides specialized modal implementations
- `carousel.js`: Custom vanilla JS carousel implementation

### Utility Layer
- `dom.js`: DOM manipulation utilities (replaces jQuery)
- `events.js`: Event management utilities
- `animeUtils.js`: Animation helpers based on AnimeJS
- `performance.js`: Performance monitoring utilities

## Animations

Animations are handled by AnimeJS with our custom utility layer that provides:

1. Consistent API for all components
2. Defensive programming and error handling
3. Performance optimizations
4. Proper cleanup to prevent memory leaks

## Development Guidelines

When extending the project:

1. Follow BEM methodology for CSS classes
2. Use ES modules for JavaScript
3. Keep components self-contained with clean interfaces
4. Maintain consistent error handling
5. Document component APIs and behaviors

## Browser Support

The implementation targets modern browsers with support for:
- ES Modules
- CSS Grid and Flexbox
- Custom Properties (CSS Variables)
- Intersection Observer API
