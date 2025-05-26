/\*\*

- CJR PSAi - CSS Architecture Simplification Plan
- This document outlines the strategy for simplifying the CSS architecture
- to align with the modern ES6 class-based JavaScript approach.
  \*/

/\*\*

- CURRENT STRUCTURE ASSESSMENT
-
- Current CSS organization:
- - Multiple separate CSS files in subdirectories
- - Component-based organization in /components
- - Section-based styles in /sections
- - Utility styles in /utils
- - Core files (reset, variables, etc.) at root level
- - Using @import to combine everything in styles.css
- - Using CSS layers for cascade control
-
- STRENGTHS:
- - Good separation of concerns
- - Logical file organization
- - Modern CSS features (layers, custom properties)
- - Clear naming conventions
-
- WEAKNESSES:
- - Too many small files leading to fragmentation
- - Potential for duplication across files
- - Complex import hierarchy
- - Scattered related styles
    \*/

/\*\*

- SIMPLIFIED ARCHITECTURE STRATEGY
-
- Goal: Create a more maintainable CSS structure that:
- 1.  Reduces the number of files
- 2.  Maintains logical organization
- 3.  Eliminates duplication
- 4.  Aligns with component-based JS architecture
- 5.  Preserves cascade control with CSS layers
      \*/

/\*\*

- NEW FILE STRUCTURE
-
- /src/css/
- ├── main.css # Single entry point that imports all CSS
- ├── base/
- │ ├── reset.css # CSS reset
- │ ├── variables.css # Design tokens and variables
- │ ├── typography.css # Font definitions and basic text styles
- │ └── global.css # Global styles (body, etc.)
- ├── components/
- │ ├── components.css # Entry point for component styles
- │ ├── navbar.css # Navbar component styles
- │ ├── modal.css # Modal system styles
- │ ├── cards.css # Content card styles
- │ └── buttons.css # Button styles
- └── utilities.css # All utility classes
  \*/

/\*\*

- CSS ARCHITECTURE PRINCIPLES
-
- 1.  COMPONENT ALIGNMENT
- Each JS component class gets a corresponding CSS file
- - FightingAIGallery.js → fighting-ai-gallery.css
- - Modal.js → modal.css
- - SpotAICarousel.js → spot-ai-carousel.css
-
- 2.  LAYER ORGANIZATION
- Maintain CSS cascade control with @layer
- @layer base, components, utilities;
-
- 3.  VARIABLE NAMING
- Use consistent naming conventions for custom properties
- --component-element-property
-
- 4.  FLAT SELECTORS
- Minimize nesting to reduce specificity issues
- .component-name\_\_element instead of .component > .element
-
- 5.  SINGLE SOURCE OF TRUTH
- Each style has only one definition place
- Define all color values only in variables.css
  \*/

/\*\*

- IMPLEMENTATION STEPS
-
- 1.  Create the new directory structure
- 2.  Consolidate CSS reset and typography
- 3.  Merge utility classes into a single file
- 4.  Create component CSS files aligned with JS classes
- 5.  Update main.css imports
- 6.  Remove duplicate definitions
- 7.  Test across all browser sizes
      \*/

/\*\*

- SUCCESS METRICS
-
- - Reduced file count: from 18+ files to ~10 files
- - Improved load time
- - Simplified maintenance
- - Better alignment with JS architecture
- - No CSS duplication
- - Clean selector specificity
    \*/
