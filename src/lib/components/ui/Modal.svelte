<script lang="ts">
  import Icon from './Icon.svelte';
  import { onMount } from 'svelte';
  
  export let isOpen: boolean = false;
  export let onClose: () => void;
  export let title: string | null = null;
  export let maxWidth: string = "4xl";
  export let bgColor: string = "#FFF9EB";
  export let showCloseButton: boolean = true;
  export let rounded: string = "lg";
  export let padding: string = "6";
  export let zIndex: string = "50";
  
  // Handle backdrop click - close only if the click was on the backdrop
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }
  
  // Handle escape key press
  function handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
  
  // Add/remove event listeners
  onMount(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  });
</script>

{#if isOpen}
  <div 
    class="fixed inset-0 z-{zIndex} flex items-center justify-center overflow-hidden animate-modalIn"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    onclick={handleBackdropClick}
    onkeydown={handleEscapeKey}
  >
    <!-- Backdrop overlay -->
    <div class="absolute inset-0 bg-black opacity-80"></div>
    
    <!-- Close handler overlay (separate from visual backdrop) -->
    <button
      class="absolute inset-0 bg-transparent border-0"
      onclick={onClose}
      onkeydown={handleEscapeKey}
      aria-label="Close modal"
    ></button>
    <div class="relative z-10 bg-[{bgColor}] max-w-{maxWidth} w-full mx-4 rounded-{rounded} p-{padding} shadow-2xl">
      {#if showCloseButton}
        <button 
          class="absolute right-6 top-6 text-black hover:text-gray-700 transition-colors"
          onclick={onClose}
          aria-label="Close modal"
        >
          <Icon name="close" size="24" />
        </button>
      {/if}
      
      {#if title}
        <h3 class="font-paplane text-black text-3xl mb-4">{title}</h3>
      {/if}
      
      <div class="flex flex-col gap-4">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  /* Add any modal-specific styles here */
</style>
