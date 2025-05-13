<script>
  // Props for customizing grid
  let { 
    color = "rgba(255,255,255,0.1)", 
    size = "40px",
    class: additionalClass = ""
  } = $props();
</script>

<div
  class={`absolute inset-0 w-full h-full pointer-events-none z-0 ${additionalClass}`}
  style="background-image:
    linear-gradient(to right, {color} 1px, transparent 1px),
    linear-gradient(to bottom, {color} 1px, transparent 1px);
    background-size: {size} {size};"
  aria-hidden="true"
></div>
