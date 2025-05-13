<script lang="ts">
  // Unified component for all digital UI elements (Arrow, Dot, Corner)
  
  /**
   * @param {string} type - The type of element to render ('arrow', 'dot', 'corner')
   * @param {string} pos - CSS positioning class (e.g., 'top-6 left-8')
   * @param {string} color - Color for the element (default varies by element type)
   * @param {number} size - Size of the element (for corner only) 
   * @param {number} rotate - Rotation angle in degrees (for corner only)
   * @param {string} className - Additional CSS classes
   */
  // Define valid element types
  type ElementType = "arrow" | "dot" | "corner" | "cornerSquare";
  
  
  interface Props {
    // Props for customizing elements
    type?: ElementType;
    pos?: string;
    color?: string;
    size?: number;
    rotate?: number;
    className?: string;
  }

  let {
    type = "arrow",
    pos = "",
    color = "",
    size = 0,
    rotate = 0,
    className = ""
  }: Props = $props();
  
  // Default colors if not specified
  const defaultColors: Record<ElementType, string> = {
    arrow: "#FFF9EB",
    dot: "#FFF9EB",
    corner: "var(--color-primary)",
    cornerSquare: "var(--color-secondary)"
  };
  
  // Use specified color or fall back to default
  const elementColor = color || defaultColors[type];
  
  // Default sizes
  const defaultSizes = {
    arrow: { width: 6, height: 7 },
    dot: { width: 6, height: 6 },
    corner: { width: size || 20, height: size || 20 }
  };
</script>

{#if type === "arrow"}
  <svg 
    width={defaultSizes.arrow.width} 
    height={defaultSizes.arrow.height} 
    viewBox="0 0 6 7" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    class={`absolute ${pos} animate-arrow-micro transition-opacity duration-150 ${className}`} 
    aria-hidden="true"
  >
    <path d="M0.830078 7V0L5.17351 3.5L0.830078 7Z" fill={elementColor} />
  </svg>
{:else if type === "dot"}
  <svg 
    width={defaultSizes.dot.width} 
    height={defaultSizes.dot.height} 
    viewBox="0 0 6 6" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    class={`absolute ${pos} animate-dot-micro ${className}`} 
    aria-hidden="true"
  >
    <rect width="6" height="6" rx="1" fill={elementColor} />
  </svg>
{:else if type === "corner"}
  <svg
    width={defaultSizes.corner.width}
    height={defaultSizes.corner.height}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={`absolute ${pos} ${className}`}
    style={`transform: rotate(${rotate}deg);`}
    aria-hidden="true"
  >
    <path 
      d="M6.7972 1.21288L1.21357 6.79341C0.440165 7.56638 0 8.62215 0 9.71563V24H5.69683C6.96697 24 8.00446 22.9694 8.00446 21.6936V7.99999H21.7057C22.9759 7.99999 24.0134 6.96937 24.0134 5.69364V0H9.72106C8.62697 0 7.57061 0.433617 6.7972 1.21288Z" 
      fill={elementColor}
    />
  </svg>
{:else if type === "cornerSquare"}
  <div 
    class={`absolute ${pos} w-2 h-2 ${className}`} 
    style={`background-color: ${elementColor}; width: ${size || 8}px; height: ${size || 8}px; transform: rotate(${rotate}deg);`}
  ></div>
{/if}

<style>
  /* Arrow animation */
  @keyframes arrow-micro {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  .animate-arrow-micro {
    animation: arrow-micro 1.2s infinite cubic-bezier(.4,0,.2,1);
  }

  /* Dot animation */
  @keyframes dot-micro {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  .animate-dot-micro {
    animation: dot-micro 1.4s infinite cubic-bezier(.4,0,.2,1);
  }

  /* Common styles */
  svg {
    pointer-events: none;
  }
</style>
