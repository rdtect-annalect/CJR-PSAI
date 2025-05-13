<script>
  
  /**
   * @typedef {Object} Props
   * @property {string} [variant] - Props for customizing accents - default, minimal, scattered
   * @property {string} [color]
   * @property {string} [class]
   */

  /** @type {Props} */
  let { variant = "default", color = "var(--color-secondary)", class: className = "" } = $props();
</script>

<div class={`digital-accents relative w-full h-full pointer-events-none ${className}`}>
  {#if variant === "default" || variant === "scattered"}
    <!-- Code Blocks/GIFs -->
    <img
      src="/images/desktop/gif/white/CJR_CODE_01.gif"
      alt="Digital Accent"
      class="absolute top-[15%] left-[5%] max-w-[350px] w-[150px]"
      draggable="false"
    />
    <img
      src="/images/desktop/gif/white/CJR_CODE_02.gif"
      alt="Digital Accent"
      class="absolute bottom-[10%] right-[5%] max-w-[250px] w-[200px]"
      draggable="false"
    />
  {/if}
  
  {#if variant === "minimal"}
    <!-- Simplified accents for less busy sections -->
    <div class="absolute top-[10%] left-[8%] w-[80px] h-[40px] border-l-2 border-t-2" style="border-color: {color};"></div>
    <div class="absolute bottom-[10%] right-[8%] w-[80px] h-[40px] border-r-2 border-b-2" style="border-color: {color};"></div>
  {/if}
  
  {#if variant === "scattered"}
    <!-- Additional scattered dots for more complex patterns -->
    <div class="absolute top-[30%] left-[20%] w-2 h-2" style="background-color: {color};"></div>
    <div class="absolute top-[60%] right-[25%] w-2 h-2" style="background-color: {color};"></div>
    <div class="absolute bottom-[40%] left-[15%] w-2 h-2" style="background-color: {color};"></div>
  {/if}
</div>
