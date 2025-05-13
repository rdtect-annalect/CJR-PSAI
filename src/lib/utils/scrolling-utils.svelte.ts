/**
 * Utility functions for smooth scrolling and section snapping using Svelte 5 runes
 */

// Reactive state variables to control scroll behavior
// State variables with Svelte 5 runes
let isScrolling = $state(false);
let isManualScrolling = $state(false);
let scrollTimeout: number;
let lastScrollPosition = $state(0);
let scrollDirection = $state<'up' | 'down' | 'none'>('none');
let currentSectionIndex = $state(0);
let sections = $state<HTMLElement[]>([]);

/**
 * Handles smooth scrolling to a target element
 * @param targetId - The ID of the element to scroll to (without #)
 * @param offset - Optional vertical offset in pixels (default: 0)
 * @param duration - Optional duration in milliseconds (default: 1000)
 */
export function scrollToElement(targetId: string, offset = 0, duration = 1000): void {
  // Set flag to prevent section snapping during programmatic scrolling
  isScrolling = true;
  
  const targetElement = document.getElementById(targetId);
  
  if (!targetElement) {
    console.warn(`Element with id "${targetId}" not found`);
    isScrolling = false;
    return;
  }
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  function animation(currentTime: number): void {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      // Reset flag after scrolling completes
      setTimeout(() => {
        isScrolling = false;
      }, 50);
    }
  }
  
  // Request animation frame to start smooth scrolling
  requestAnimationFrame(animation);
}

/**
 * Easing function - easeInOutQuad
 */
function ease(t: number, b: number, c: number, d: number): number {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

/**
 * Initialize smooth scroll for all navigation links
 * @param offset - Header offset in pixels
 */
export function initSmoothScroll(offset = 80): void {
  // Run on client-side only
  if (typeof window === 'undefined') return;
  
  // Use effect to ensure lifecycle management
  $effect(() => {
    // Get all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    const eventListeners: { element: Element; listener: EventListener }[] = [];
    
    anchorLinks.forEach(link => {
      const clickHandler = (e: Event) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return; // Skip if it's null or just '#'
        
        e.preventDefault();
        const targetId = href.substring(1); // Remove '#' from the href
        scrollToElement(targetId, offset);
      };
      
      link.addEventListener('click', clickHandler);
      eventListeners.push({ element: link, listener: clickHandler });
    });
    
    // Cleanup function to remove event listeners
    return () => {
      eventListeners.forEach(({ element, listener }) => {
        element.removeEventListener('click', listener);
      });
    };
  });
}

/**
 * Update current section index based on scroll position
 */
function updateCurrentSectionIndex(): void {
  if (sections.length === 0) return;
  
  const scrollPosition = window.scrollY + (window.innerHeight / 2);
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSectionIndex = i;
      break;
    }
  }
}

/**
 * Scroll to the next section
 * @param headerOffset - Offset for fixed header (default: 80)
 */
export function scrollToNextSection(headerOffset = 80): void {
  if (currentSectionIndex < sections.length - 1) {
    const nextSection = sections[currentSectionIndex + 1];
    if (nextSection && nextSection.id) {
      scrollToElement(nextSection.id, headerOffset);
    }
  }
}

/**
 * Scroll to the previous section
 * @param headerOffset - Offset for fixed header (default: 80)
 */
export function scrollToPreviousSection(headerOffset = 80): void {
  if (currentSectionIndex > 0) {
    const prevSection = sections[currentSectionIndex - 1];
    if (prevSection && prevSection.id) {
      scrollToElement(prevSection.id, headerOffset);
    }
  }
}

/**
 * Initialize section snapping when scrolling
 */
export function initSectionSnapping({
  sectionSelector = 'section',
  threshold = 0.2,
  delay = 200,
  headerOffset = 80
} = {}) {
  if (typeof window === 'undefined') return () => {};
  
  // Use effect to manage lifecycle and cleanup
  $effect(() => {
    // Initialize after DOM is fully loaded
    const initTimer = setTimeout(() => {
      sections = Array.from(document.querySelectorAll(sectionSelector)) as HTMLElement[];
      if (sections.length === 0) return;
      
      // Set initial section index based on scroll position
      updateCurrentSectionIndex();
    }, 300);
    
    // Wheel event handler just for direction detection
    const handleWheel = (e: WheelEvent) => {
      // If programmatic scrolling is happening, don't interfere
      if (isScrolling) return;
      
      // Set manual scrolling flag and track direction
      isManualScrolling = true;
      clearTimeout(scrollTimeout);
      scrollDirection = e.deltaY > 0 ? 'down' : 'up';
      updateCurrentSectionIndex();
      
      // Reset manual scrolling flag after delay
      scrollTimeout = setTimeout(() => {
        isManualScrolling = false;
      }, delay + 50) as unknown as number;
    };
    
    // Passive scroll event handler with subtle snapping
    const handleScroll = () => {
      if (isScrolling) return;
      
      // Update scroll direction tracking
      const scrollPos = window.scrollY;
      scrollDirection = scrollPos > lastScrollPosition ? 'down' : 'up';
      lastScrollPosition = scrollPos;
      
      // Don't interfere with manual scrolling
      if (isManualScrolling) return;
      
      // Clear any existing timeout
      clearTimeout(scrollTimeout);
      
      // Only attempt to snap after scrolling stops
      scrollTimeout = setTimeout(() => {
        // Update current section index
        const prevSectionIndex = currentSectionIndex;
        updateCurrentSectionIndex();
        
        // Get the current section
        const currentSection = sections[currentSectionIndex];
        if (!currentSection) return;
        
        // Calculate position within section
        const sectionTop = currentSection.offsetTop;
        const sectionHeight = currentSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        // Calculate relative position within section (0 to 1)
        const relativePosition = (scrollPosition - sectionTop) / (sectionHeight - viewportHeight);
        
        // Only snap if we're close to an edge but not at the edge
        if (relativePosition > 0 && relativePosition < 1) {
          // Determine if we should snap to this section
          if (relativePosition < threshold) {
            // Near the top edge of section - snap to top
            scrollToElement(currentSection.id, headerOffset, 800);
          } else if (relativePosition > (1 - threshold) && 
                   currentSectionIndex < sections.length - 1 && 
                   sectionHeight > viewportHeight * 0.75) {
            // Near the bottom edge and section is tall enough - snap to next section
            // Only snap to next section if current section is significantly taller than viewport
            const nextSection = sections[currentSectionIndex + 1];
            if (nextSection && nextSection.id) {
              scrollToElement(nextSection.id, headerOffset, 800);
            }
          }
        }
      }, delay + 300) as unknown as number; // Longer delay for more natural feel
    };
    
    // Add event listeners with proper options
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll);
    
    // Handle window resize
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCurrentSectionIndex();
      }, 150) as unknown as number;
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      clearTimeout(initTimer);
      clearTimeout(scrollTimeout);
      clearTimeout(resizeTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });
}

/**
 * Simple debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in ms
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait = 300
): (...args: Parameters<T>) => void {
  let timeout: number;
  
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait) as unknown as number;
  };
}

/**
 * Returns the current scroll information
 */
// Scroll info as a derived value for internal use
const scrollInfoDerived = $derived({
  isScrolling,
  isManualScrolling,
  scrollDirection,
  currentSectionIndex,
  totalSections: sections.length
});

/**
 * Returns the current scroll information
 * This uses a regular object return to avoid $derived syntax issues
 */
export function getScrollInfo() {
  // Return a plain object with current values
  return {
    isScrolling,
    isManualScrolling,
    scrollDirection,
    currentSectionIndex,
    totalSections: sections.length
  };
}
