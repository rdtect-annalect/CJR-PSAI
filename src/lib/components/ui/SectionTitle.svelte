<script>
  import DigitalElements from './DigitalElements.svelte';
  
  /**
   * @typedef {Object} Props
   * @property {string} [title]
   * @property {string} [color]
   * @property {boolean} [withBorder]
   * @property {string} [fontSize]
   * @property {string} [class]
   */

  /** @type {Props} */
  let {
    title = "",
    color = "var(--color-primary)",
    withBorder = true,
    fontSize = "text-4xl md:text-5xl",
    class: className = ""
  } = $props();
</script>

<div class={`section-title-wrapper text-center mb-10 relative ${className}`}>
  <!-- Corner accents using DigitalElements -->
  <DigitalElements type="cornerSquare" pos="-top-4 -left-4" color={color} size={8} />
  <DigitalElements type="cornerSquare" pos="-top-4 -right-4" color={color} size={8} />
  
  <!-- Title -->
  <h2 class="font-paplane {fontSize} uppercase relative inline-block px-8 py-2 {withBorder ? `border-b-2` : ``}" 
      style="color: {color}; {withBorder ? `border-color: ${color}` : ''}">
    {title}
  </h2>
</div>
