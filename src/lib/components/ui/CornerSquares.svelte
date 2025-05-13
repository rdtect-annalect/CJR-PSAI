<script>
  import DigitalElements from './DigitalElements.svelte';
  
  
  /**
   * @typedef {Object} Props
   * @property {string} [color] - Props for customizing corners
   * @property {number} [size]
   * @property {number} [offset] - How far the squares extend from the edges
   * @property {string} [class] - Additional classes for wrapper div
   */

  /** @type {Props} */
  let { color = "var(--color-secondary)", size = 8, offset = 1, class: className = "" } = $props();
</script>

<div class={`pointer-events-none w-full h-full relative ${className}`}>
  <!-- Top Left corner -->
  <DigitalElements 
    type="cornerSquare" 
    pos={`-top-${offset} -left-${offset}`} 
    color={color}
    size={size}
  />
  <!-- Top Right corner -->
  <DigitalElements 
    type="cornerSquare" 
    pos={`-top-${offset} -right-${offset}`} 
    color={color}
    size={size}
  />
  <!-- Bottom Left corner -->
  <DigitalElements 
    type="cornerSquare" 
    pos={`-bottom-${offset} -left-${offset}`} 
    color={color}
    size={size}
  />
  <!-- Bottom Right corner -->
  <DigitalElements 
    type="cornerSquare" 
    pos={`-bottom-${offset} -right-${offset}`} 
    color={color}
    size={size}
  />
</div>
