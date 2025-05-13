<script lang="ts">
  import { onMount } from 'svelte';
  import GridOverlay from '../ui/GridOverlay.svelte';
  import DigitalAccents from '../ui/DigitalAccents.svelte';
  import DigitalElements from '../ui/DigitalElements.svelte';
  import CornerSquares from '../ui/CornerSquares.svelte';
  import SpotAICard from '../ui/SpotAICard.svelte';
  import SectionTitle from '../ui/SectionTitle.svelte';
  import { spotAIData } from '$lib/data/spotAI';

  // Carousel data from spotAI.ts which follows the structure of carouselData.json
  const carouselItems = spotAIData;
  
  // Modal functionality
  let modalOpen = $state(false);
  let selectedItem = $state<typeof carouselItems[0] | null>(null);

  let currentGroup = $state(0);
  let isTransitioning = $state(false);
  let touchStart = $state(0);
  let touchEnd = $state(0);

  // Responsive cards per group
  let cardsPerGroup = $state(5);
  function updateCardsPerGroup() {
    cardsPerGroup = window.innerWidth < 768 ? 2 : 5;
  }
  if (typeof window !== 'undefined') {
    updateCardsPerGroup();
  }

  $effect(() => {
    window.addEventListener('resize', updateCardsPerGroup);
    return () => window.removeEventListener('resize', updateCardsPerGroup);
  });

  const totalGroups = $derived(() => Math.ceil(carouselItems.length / cardsPerGroup));
  const groupStart = $derived(() => currentGroup * cardsPerGroup);
  const groupItems = $derived(() => carouselItems.slice(groupStart(), groupStart() + cardsPerGroup));

  const totalGroupsVal = $derived(() => totalGroups());
  const groupItemsArr = $derived(() => groupItems());

  function handleNextGroup() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentGroup = (currentGroup + 1) % totalGroups();
    setTimeout(() => { isTransitioning = false; }, 300);
  }

  function handlePrevGroup() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentGroup = (currentGroup - 1 + totalGroups()) % totalGroups();
    setTimeout(() => { isTransitioning = false; }, 300);
  }

  function handleDotClick(idx: number) {
    if (isTransitioning || idx === currentGroup) return;
    isTransitioning = true;
    currentGroup = idx;
    setTimeout(() => { isTransitioning = false; }, 300);
  }

  function handleTouchStart(event: TouchEvent) {
    touchStart = event.touches[0].clientX;
  }

  function handleTouchMove(event: TouchEvent) {
    touchEnd = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    const swipeThreshold = 50;
    const swipeLength = touchEnd - touchStart;
    if (Math.abs(swipeLength) > swipeThreshold) {
      if (swipeLength > 0) handlePrevGroup();
      else handleNextGroup();
    }
  }

  $effect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') handlePrevGroup();
      if (event.key === 'ArrowRight') handleNextGroup();
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  });
</script>

<section id="spotAI" class="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FF5F33] py-16 md:py-24">

  <!-- Layered digital grid overlays for depth -->
  <GridOverlay color="rgba(255,255,255,0.08)" size="40px" class="absolute inset-0 z-0 pointer-events-none" />
  <GridOverlay color="rgba(255,255,255,0.03)" size="32px" />
  <div class="opacity-30"><DigitalAccents /></div>
  <CornerSquares color="var(--color-accent, #FF4F2A)" size={16} offset={-2} class="absolute -top-6 -left-6 z-10" />
  <CornerSquares color="var(--color-accent, #FF4F2A)" size={16} offset={-2} class="absolute -top-6 -right-6 z-10" />
  <CornerSquares color="var(--color-accent, #FF4F2A)" size={16} offset={-2} class="absolute -bottom-6 -left-6 z-10" />
  <CornerSquares color="var(--color-accent, #FF4F2A)" size={16} offset={-2} class="absolute -bottom-6 -right-6 z-10" />
  <div class="absolute inset-0 pointer-events-none z-10">
    <div class="opacity-70"><DigitalElements type="dot" pos="top-[10%] left-[15%]" color="white" /></div>
    <div class="opacity-70"><DigitalElements type="dot" pos="bottom-[15%] right-[10%]" color="white" /></div>
    <div class="opacity-50"><DigitalElements type="arrow" pos="top-[20%] right-[15%]" color="white" /></div>
    <div class="opacity-50"><DigitalElements type="arrow" pos="bottom-[25%] left-[5%]" color="white" /></div>
  </div>

  <div class="relative z-20 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="mb-16">
      <h2 class="font-paplane text-6xl md:text-7xl font-extrabold uppercase text-center text-white tracking-[0.22em]">
        HOW TO SPOT AI
      </h2>
      <p class="text-white text-center mt-2 font-paplane text-lg tracking-wide">
        Signs to look for
      </p>
    </div>
    <div class="relative flex flex-col items-center w-full max-w-5xl mx-auto">
      <!-- Desktop navigation controls (hidden on mobile) -->
      <div class="slider_arrows white mt-0 hidden md:flex justify-between absolute w-full top-1/2 -translate-y-1/2 px-4 z-20">
        <div class="slider_arrow_left">
          <button 
            onclick={handlePrevGroup}
            disabled={isTransitioning}
            aria-label="Previous group"
            tabindex="0"
            class="bg-transparent hover:opacity-80 focus:outline-none"
          >
            <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.922 5.98305L11.9246 -5.31127e-07L1.27123 10.746C0.452341 11.5672 2.03821e-06 12.6856 1.93633e-06 13.851L0.0233987 22.2194C0.0233985 23.3847 0.491336 24.4953 1.31023 25.3165L12.0338 36L18 29.9857L5.9974 18.0274L17.922 5.98305Z"
                fill="#FF4F2A" />
            </svg>
          </button>
        </div>
        
        <div class="dash">
          <svg width="155" height="1" viewBox="0 0 155 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="0.5" x2="155" y2="0.5" stroke="#FF4F2A" stroke-dasharray="2 2" />
          </svg>
        </div>
        
        <div class="slider_arrow_right">
          <button 
            onclick={handleNextGroup}
            disabled={isTransitioning}
            aria-label="Next group"
            tabindex="0"
            class="bg-transparent hover:opacity-80 focus:outline-none"
          >
            <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.0779896 30.0169L6.07539 36L16.7288 25.254C17.5477 24.4328 18 23.3144 18 22.149L17.9766 13.7806C17.9766 12.6153 17.5087 11.5047 16.6898 10.6835L5.9662 0L0 6.01434L12.0026 17.9726L0.0779896 30.0169Z"
                fill="#FF4F2A" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Carousel Container with touch support -->
      <div 
        class="relative w-full px-0 py-6 flex flex-col items-center"
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
        ontouchend={handleTouchEnd}
      >
        <!-- Scrollable container for mobile -->
        <div class="flex flex-row justify-start md:justify-center items-stretch gap-4 w-full overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
          {#each groupItemsArr() as item, i}
            <div class="snap-center w-[175px] sm:w-[200px] md:w-[220px] flex-shrink-0">
              <SpotAICard 
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                image={{ src: item.images.medium, alt: `Tip ${i+1}`, tipNumber: parseInt(item.title.replace('Tip ', '')) || (groupStart() + i + 1) }} 
                on:click={() => {
                  selectedItem = item;
                  modalOpen = true;
                }}
              />
            </div>
          {/each}
        </div>
        
        <!-- Mobile navigation buttons -->
        <div class="slider_arrows white flex md:hidden justify-center w-full mt-8">
          <div class="slider_arrow_left">
            <button 
              onclick={handlePrevGroup}
              disabled={isTransitioning}
              aria-label="Previous group"
              class="bg-transparent hover:opacity-80 focus:outline-none"
            >
              <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.922 5.98305L11.9246 -5.31127e-07L1.27123 10.746C0.452341 11.5672 2.03821e-06 12.6856 1.93633e-06 13.851L0.0233987 22.2194C0.0233985 23.3847 0.491336 24.4953 1.31023 25.3165L12.0338 36L18 29.9857L5.9974 18.0274L17.922 5.98305Z"
                  fill="#FF4F2A" />
              </svg>
            </button>
          </div>
          
          <div class="dash mx-4">
            <svg width="155" height="1" viewBox="0 0 155 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="0.5" x2="155" y2="0.5" stroke="#FF4F2A" stroke-dasharray="2 2" />
            </svg>
          </div>
          
          <div class="slider_arrow_right">
            <button 
              onclick={handleNextGroup}
              disabled={isTransitioning}
              aria-label="Next group"
              class="bg-transparent hover:opacity-80 focus:outline-none"
            >
              <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.0779896 30.0169L6.07539 36L16.7288 25.254C17.5477 24.4328 18 23.3144 18 22.149L17.9766 13.7806C17.9766 12.6153 17.5087 11.5047 16.6898 10.6835L5.9662 0L0 6.01434L12.0026 17.9726L0.0779896 30.0169Z"
                  fill="#FF4F2A" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Indicator Dots -->
      <div class="flex items-center justify-center gap-1 mt-10">
        {#each Array(totalGroupsVal()) as _, idx}
          <button
            class="w-4 h-4 rounded-full border border-white transition-all duration-200 focus:outline-none mx-1"
            class:bg-white={idx === currentGroup}
            class:bg-transparent={idx !== currentGroup}
            aria-label={`Go to group ${idx + 1}`}
            onclick={() => handleDotClick(idx)}
            disabled={isTransitioning}
            tabindex="0"
          ></button>
        {/each}
      </div>
      <div class="mt-6 text-xs font-paplane text-white opacity-80 text-center tracking-widest">
        © Columbia Journalism Review
      </div>
    </div>
  </div>
  
  <!-- Modal for displaying card details -->
  <div id="carouselModal" class="modal fade" tabindex="-1" aria-labelledby="carouselModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-fullscreen-lg-down">
      <div class="modal-content bg-transparent border-0">
        <div class="modal-header border-0">
          <button 
            type="button" 
            class="btn-close btn-close-white" 
            onclick={() => modalOpen = false}
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-0">
          <div class="modalSliderWrapper">
            <div class="modalLoader" id="modalLoader">
              <!-- Loader spinner would go here -->
            </div>
            
            <div class="modalSlider">
              {#if selectedItem}
                <div class="slick-slide1">
                  <div class="ti_img-thumbnail">
                    <img src={selectedItem.images.medium} class="img-fluid" alt="" />
                    
                    <div class="tip_content para-box-wrapper">
                      <h3>{selectedItem.title}</h3>
                      <h4>{@html selectedItem.subtitle}</h4>
                      <hr class="opacity-1" />
                      <p>{selectedItem.description}</p>
                      <div class="corner-square tl"></div>
                      <div class="corner-square tr"></div>
                      <div class="corner-square bl"></div>
                      <div class="corner-square br"></div>
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Show modal when a card is clicked -->
  {#if modalOpen && selectedItem}
    <script>
      // Modal functionality would be handled by Bootstrap in the original implementation
      // This script tag will be executed to show the modal
      document.addEventListener('DOMContentLoaded', () => {
        const modalElement = document.getElementById('carouselModal');
        if (modalElement) {
          // Bootstrap modal initialization would go here
        }
      });
    </script>
  {/if}
</section>

<style>
  /* Modal styling to match the original implementation */
  :global(.modal) {
    background-color: rgba(0, 0, 0, 0.9);
  }
  
  :global(.modal-dialog) {
    max-width: 90vw;
    margin: 1.75rem auto;
  }
  
  :global(.ti_img-thumbnail) {
    position: relative;
    height: 90vh;
  }
  
  :global(.ti_img-thumbnail img) {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  :global(.tip_content) {
    position: absolute;
    width: 25%;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    height: 80%;
    left: 5rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 2.5rem;
  }
  
  :global(.tip_content.para-box-wrapper) {
    margin: 0;
    border-color: #FF5F33;
  }
  
  :global(.tip_content.para-box-wrapper .corner-square) {
    width: 10px;
    height: 10px;
    position: absolute;
  }
  
  :global(.tip_content.para-box-wrapper .corner-square.tl) { top: -3px; left: -3px; border-top: 2px solid #FF5F33; border-left: 2px solid #FF5F33; }
  :global(.tip_content.para-box-wrapper .corner-square.tr) { top: -3px; right: -3px; border-top: 2px solid #FF5F33; border-right: 2px solid #FF5F33; }
  :global(.tip_content.para-box-wrapper .corner-square.bl) { bottom: -3px; left: -3px; border-bottom: 2px solid #FF5F33; border-left: 2px solid #FF5F33; }
  :global(.tip_content.para-box-wrapper .corner-square.br) { bottom: -3px; right: -3px; border-bottom: 2px solid #FF5F33; border-right: 2px solid #FF5F33; }
  
  @media (max-width: 992px) {
    :global(.tip_content) {
      width: 90%;
      left: 5%;
      height: auto;
      bottom: 2rem;
      top: auto;
      transform: none;
    }
  }
</style>
