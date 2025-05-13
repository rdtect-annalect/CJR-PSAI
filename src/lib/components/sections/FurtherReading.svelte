<script lang="ts">
  import CornerSquares from '../ui/CornerSquares.svelte';
  import GridOverlay from '../ui/GridOverlay.svelte';
  import DigitalElements from '../ui/DigitalElements.svelte';
  import FurtherReadingCard from '../ui/FurtherReadingCard.svelte';
  import { articles } from '$lib/data/furtherReading';
  
  // Handle visibility for cards and accessibility
  const articleVisible = (index: number) => index < articles.length;
</script>

<section class="h-screen bg-[#FFF9EB] px-4 flex flex-col items-center justify-center relative" id="furtherReading">
  <!-- Subtle grid overlay for depth -->
  <GridOverlay color="rgba(255,79,42,0.03)" size="40px" class="absolute inset-0 pointer-events-none z-0" />
  
  <div class="max-w-7xl w-full mx-auto relative z-10">
    <!-- Section Title with minimalist design -->
    <div class="text-center mb-8">
      <h2 class="uppercase text-orange-500 tracking-[0.22em] text-3xl md:text-3xl font-extrabold font-paplane">FURTHER READING ON</h2>
      <div class="flex flex-col md:flex-row justify-center items-center mt-2">
        <span class="uppercase text-orange-500 tracking-[0.22em] text-2xl md:text-2xl md:mr-4 font-extrabold font-paplane">HOW</span>
        <span class="rounded-full border border-orange-500 px-6 md:px-10 py-2 md:py-3 mt-2 md:mt-0 font-paplane text-orange-500 text-2xl md:text-2xl tracking-[0.22em] uppercase font-extrabold">AI RESHAPES JOURNALISM</span>
      </div>
    </div>
    <!-- Card Grid: simple 3-column layout -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-3 w-full mb-6"> 
      {#each articles as article, index}
        <div class="w-[70%] mx-auto relative">
          <FurtherReadingCard {article} />
          {#if (index + 1) % 3 !== 0}
            <div class="red-square absolute right-[-30px] top-1/2 transform -translate-y-1/2 hidden md:block"></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .red-square {
    width: 8px;
    height: 8px;
    background-color: #FF4F2A;
  }
</style>
