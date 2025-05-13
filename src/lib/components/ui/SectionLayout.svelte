<script lang="ts">
  import { onMount } from 'svelte';
  import GridOverlay from './GridOverlay.svelte';
  import DigitalAccents from './DigitalAccents.svelte';
  
  // Define props using $props() without type parameter
  const props = $props();
  
  // Declare derived props with defaults
  let id = $derived(props.id ?? null);
  let bgColor = $derived(props.bgColor ?? "black");
  let fullHeight = $derived(props.fullHeight ?? true);
  let centered = $derived(props.centered ?? true);
  let padding = $derived(props.padding ?? "py-20");
  let withGrid = $derived(props.withGrid ?? true);
  let withAccents = $derived(props.withAccents ?? true);
  let accentVariant = $derived(props.accentVariant ?? "scattered");
  let accentColor = $derived(props.accentColor ?? "var(--color-primary)");
  let containerClass = $derived(props.containerClass ?? "container mx-auto px-4");
  let animateOnVisible = $derived(props.animateOnVisible ?? true);
  let className = $derived(props.className ?? "");
  
  // Define children prop for content
  let children = $derived(props.children);
  
  let sectionRef: HTMLElement;
  let isVisible = $state(false);
  
  onMount(() => {
    if (animateOnVisible) {
      // Set up intersection observer for animation triggers
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            isVisible = true;
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      
      if (sectionRef) {
        observer.observe(sectionRef);
      }
      
      return () => {
        observer?.disconnect();
      };
    } else {
      isVisible = true;
    }
  });
</script>

<section 
  id={id}
  class="relative {fullHeight ? 'min-h-screen' : ''} flex flex-col {centered ? 'items-center justify-center' : ''} 
         bg-{bgColor} {padding} overflow-hidden {className}"
  bind:this={sectionRef}
  class:opacity-0={!isVisible}
  class:animate-fadeIn={isVisible}
>
  <!-- Grid overlay background pattern -->
  {#if withGrid}
    <GridOverlay color="rgba(255,255,255,0.04)" size="32px" />
  {/if}
  
  <!-- Digital accent elements -->
  {#if withAccents}
    <DigitalAccents variant={accentVariant} color={accentColor} class="absolute inset-0 pointer-events-none z-10 opacity-40" />
  {/if}
  
  <!-- Main content container -->
  <div class={containerClass + " relative z-20"}>
    {#if children}
      {children}
    {/if}
  </div>
</section>
