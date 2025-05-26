# KanSearch UI Utilities

This directory contains utility classes that provide common functionality for the KanSearch UI components.

## Constants.js

The `Constants` utility provides centralized, application-wide constants to ensure consistency and ease of maintenance. It contains common string literals, CSS class names, animation settings, and other configuration values.

**Use cases:**

- Ensuring consistency across components
- Centralizing configuration values
- Making updates easier by changing values in one place
- Reducing magic strings and numbers throughout the codebase

**Example:**

```javascript
import { Constants } from "../utils/Constants.js";

// Using CSS classes
element.classList.add(Constants.CSS_CLASSES.ACTIVE);

// Using animation settings
setTimeout(callback, Constants.ANIMATION.COUNTER_DURATION);

// Using text templates
const message = Constants.TEXT.ROLES_DETAIL_TEMPLATE.replace(
  "{{roles}}",
  rolesList
);
```

## Throttle.js

The `Throttle` utility limits the rate at which a function can fire. It ensures a function is called at most once in a specified time period.

**Use cases:**

- Scroll event handlers
- Resize event handlers where you want regular updates during resizing
- Mouse move events
- Any event that fires rapidly where you want to limit the execution frequency

**Example:**

```javascript
import { Throttle } from "../utils/Throttle.js";

window.addEventListener(
  "scroll",
  Throttle.create(myScrollHandler, 100) // Execute at most once every 100ms
);
```

## Debounce.js

The `Debounce` utility delays the execution of a function until after a specified wait time has elapsed since the last time it was invoked. It's ideal for situations where you want to wait until an action has stopped before executing a function.

**Use cases:**

- Window resize completion handlers
- Search input handlers (wait until user stops typing)
- Form input validation where you want to wait until the user finishes typing
- Any event where you want to wait until the user has finished their action

**Example:**

```javascript
import { Debounce } from "../utils/Debounce.js";

window.addEventListener(
  "resize",
  Debounce.create(myResizeHandler, 250) // Execute 250ms after resizing stops
);
```

## EventBus.js

The `EventBus` utility enables loose coupling between components through a publish/subscribe pattern. Components can communicate without directly referencing each other.

**Use cases:**

- Cross-component communication
- Implementing application-wide events
- Decoupling UI interactions from business logic

**Example:**

```javascript
import { EventBus } from "../utils/EventBus.js";

// Subscribe to an event
const unsubscribe = EventBus.subscribe("roleSelected", (role) => {
  console.log(`Role selected: ${role}`);
});

// Publish an event
EventBus.publish("roleSelected", "CEO");

// Unsubscribe when no longer needed
unsubscribe();
```

## DOMUtils.js

The `DOMUtils` utility provides helper methods for common DOM operations, making it easier to create, manipulate, and animate elements.

**Use cases:**

- Creating elements with complex attributes
- Animating elements with CSS transitions
- Checking element visibility
- Streamlining DOM manipulation across components

**Example:**

```javascript
import { DOMUtils } from "../utils/DOMUtils.js";

// Create a complex element
const button = DOMUtils.createElement(
  "button",
  {
    classList: ["btn", "primary"],
    id: "submitBtn",
    disabled: true,
    title: "Submit form",
    onclick: () => handleSubmit(),
  },
  "Submit"
);

// Animate an element
DOMUtils.animateElement(
  element,
  {
    opacity: "1",
    transform: "translateY(0)",
  },
  300,
  "ease-out"
).then(() => console.log("Animation complete"));

// Check if an element is in viewport
if (DOMUtils.isInViewport(element, 100)) {
  // Element is visible with 100px offset
}
```

## When to use which?

- **Constants**: When you need to ensure consistency across components and want to centralize configuration
- **Throttle**: When you want regular updates during an ongoing action (scrolling, dragging, resizing)
- **Debounce**: When you want to wait until an action has completed before responding (resize complete, typing finished)
- **EventBus**: When you want components to communicate without direct references to each other
- **DOMUtils**: When you want to simplify DOM manipulation and ensure consistent practices

These utilities help improve code organization, reduce duplication, and enhance performance by providing standardized solutions to common challenges in frontend development.
