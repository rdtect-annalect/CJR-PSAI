<script>
  import GridOverlay from './GridOverlay.svelte';
  import DigitalElements from './DigitalElements.svelte';
  import CornerSquares from './CornerSquares.svelte';
  
  
  /**
   * @typedef {Object} Props
   * @property {string} [bgColor] - Component props
   * @property {string} [borderColor]
   * @property {string} [textColor]
   * @property {boolean} [showArrows]
   * @property {boolean} [showGrid]
   * @property {string} [padding]
   * @property {string} [width]
   * @property {string} [maxWidth]
   * @property {string} [class]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let {
    bgColor = "var(--color-primary)",
    borderColor = "var(--color-secondary)",
    textColor = "var(--color-secondary)",
    showArrows = true,
    showGrid = true,
    padding = "p-8 md:p-12 lg:p-24",
    width = "w-full",
    maxWidth = "max-w-6xl",
    class: className = "",
    children
  } = $props();
</script>

<div class={`relative ${width} ${maxWidth} ${className}`}>
  <div class="relative">
    <!-- Corners using our new CornerSquares component -->
    <CornerSquares color={borderColor} size={8} offset={1} />
    
    <div class="relative border border-[{borderColor}] shadow-xl" style="background-color: {bgColor};">
      {#if showGrid}
        <!-- Grid overlay -->
        <div
          class="absolute inset-0 w-full h-full pointer-events-none z-0"
          style="background-image:
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 40px 40px;"
          aria-hidden="true"
        ></div>
      {/if}
      
      {#if showArrows}
        <!-- Digital accent SVGs using DigitalElements -->
        <DigitalElements type="arrow" pos="top-6 left-8" />
        <DigitalElements type="arrow" pos="top-6 left-9" />
        <DigitalElements type="arrow" pos="top-6 left-10" />
        <DigitalElements type="arrow" pos="bottom-6 right-8" />
        <DigitalElements type="arrow" pos="bottom-6 right-9" />
        <DigitalElements type="arrow" pos="bottom-6 right-10" />
      {/if}
      
      <!-- Card content -->
      <div class={`relative z-10 ${padding}`} style="color: {textColor}">
        {@render children?.()}
      </div>
    </div>
  </div>
</div>
