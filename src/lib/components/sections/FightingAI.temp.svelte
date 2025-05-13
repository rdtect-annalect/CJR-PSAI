<script lang="ts">
  import { onMount } from 'svelte';
  import { fightingAIData, getRandomBatch, getImagesByBatch, getRandomImagesFromBatch, type GalleryItem } from '$lib/data/fightingAI';
  import DigitalElements from '../ui/DigitalElements.svelte';
  import { formatNumber } from '$lib/utils/format';
  
  // State for current batch, modal, and active batch number
  let batch = $state<GalleryItem[]>([]);
  let modalOpen = $state<boolean>(false);
  let currentItem = $state<GalleryItem | null>(null);
  let activeBatchNumber = $state<number>(0); // 0 means random from all batches
  let currentBatchIndex = $state<number>(0); // Track which batch we're on for UI
  
  // Position layouts type definition
  type PositionData = {
    width: string;
    height: string;
    top: string;
    left?: string;
    right?: string;
    zIndex: number;
    rotate: number;
    scale: number;
  };
  
  // Array of image positioning data that will be randomized for each batch
  let positionLayouts = $state<PositionData[]>([]);
  
  // Function to get a batch of images
  function getBatchImages(): GalleryItem[] {
    if (activeBatchNumber === 0) {
      // Get random images from all batches
      return getRandomBatch(10);
    } else {
      // Get images from the specific batch
      const batchImages = getRandomImagesFromBatch(activeBatchNumber, 10);
      if (batchImages.length === 0) {
        activeBatchNumber = 0;
        return getRandomBatch(10);
      }
      return batchImages;
    }
  }
  
  // Generate randomized position layouts for the collage
  function generatePositionLayouts(): void {
    // Base positions to start with (10 positions for 10 images)
    const basePositions = [
      { width: '15vw', height: '12rem', top: '5vw', left: '8vw', zIndex: 2 },
      { width: '20vw', height: '12rem', top: '13vw', left: '15vw', zIndex: 3 },
      { width: '15vw', height: '12rem', top: '22vw', left: '5vw', zIndex: 2 },
      { width: '20vw', height: '12rem', top: '22vw', left: '32vw', zIndex: 1 },
      { width: '23vw', height: '12rem', top: '13vw', left: '49vw', zIndex: 2 },
      { width: '23vw', height: '12rem', top: '5vw', left: '40vw', zIndex: 1 },
      { width: '12vw', height: '12rem', top: '2vw', right: '26vw', zIndex: 1 },
      { width: '18vw', height: '12rem', top: '8vw', right: '10vw', zIndex: 1 },
      { width: '15vw', height: '12rem', top: '25vw', right: '15vw', zIndex: 1 },
      { width: '18vw', height: '12rem', top: '18vw', right: '25vw', zIndex: 2 }
    ];
    
    // Randomize the positions by shuffling the array
    const shuffled = [...basePositions].sort(() => Math.random() - 0.5);
    
    // Add random rotation and scale to each position
    positionLayouts = shuffled.map(pos => ({
      ...pos,
      rotate: Math.random() * 6 - 3, // -3 to 3 degrees of rotation
      scale: 1 + (Math.random() * 0.1 - 0.05) // 0.95 to 1.05 scale
    }));
  }
  
  // Get position style for an image based on its index
  function getPositionStyle(index: number): string {
    if (positionLayouts.length === 0) return '';
    
    const pos = positionLayouts[index % positionLayouts.length];
    let style = `
      width: ${pos.width}; 
      height: ${pos.height}; 
      top: ${pos.top}; 
      z-index: ${pos.zIndex};
      transform: rotate(${pos.rotate}deg) scale(${pos.scale});
      animation: floating ${5 + index % 3}s ease-in-out infinite;
      animation-delay: ${-1 * (index % 5)}s;
    `;
    
    // Add either left or right positioning
    if (pos.left) style += `left: ${pos.left};`;
    if (pos.right) style += `right: ${pos.right};`;
    
    return style;
  }
  
  // Refresh batch with new images and positions
  function refreshImages(): void {
    currentBatchIndex++;
    batch = getBatchImages();
    generatePositionLayouts();
  }
  
  // Change active batch
  function changeBatch(batchNum: number): void {
    activeBatchNumber = batchNum;
    batch = getBatchImages();
    if (modalOpen) closeModal();
  }

  // Open/close modal
  function openModal(item: GalleryItem): void {
    currentItem = item;
    modalOpen = true;
  }
  
  // Close modal
  function closeModal(): void {
    modalOpen = false;
    // Reset current item after transition
    setTimeout(() => {
      currentItem = null;
    }, 300);
  }

  // Initialize the batch on component mount
  onMount(() => {
    // Initialize with batch images and position layouts
    if (batch.length === 0) {
      batch = getBatchImages();
      generatePositionLayouts();
    }
  });
</script>

<style>
  /* Floating animation for the gallery images */
  @keyframes floating {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(5px, 5px) rotate(1deg);
    }
    50% {
      transform: translate(0, 8px) rotate(0deg);
    }
    75% {
      transform: translate(-5px, 3px) rotate(-1deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }

  /* Add pointer wrapper for enhanced mouse tracking */
  .images-gallery {
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  /* Enhanced hover effects for the gallery images */
  .images-gallery button {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .images-gallery button:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
  
  /* Modal animations and styling */
  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes backdropFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .customPopup {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .customPopup.show {
    opacity: 1;
    visibility: visible;
  }
  
  .customPopup .figtingWithAISlider {
    animation: modalFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
  }
  
  .customPopup::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    animation: backdropFadeIn 0.3s ease-out;
  }
  
  .img-container img {
    transition: transform 0.5s ease;
  }
  
  .img-container:hover img {
    transform: scale(1.03);
  }
  
  /* Custom scrollbar styling */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--color-primary, #FF4F2A);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-primary-dark, #E74322);
  }
</style>

<section 
  id="fighting-ai" 
  class="withAI section-full bg-secondary flex flex-col items-center justify-center py-16 relative">
  
  <!-- Heading -->
  <div class="text-center mb-12 relative z-20">
    <div class="flex justify-center items-center">
      <h2 class="heading-1 font-paplane text-4xl md:text-5xl text-primary">
        FIGHTING AI
      </h2>
      <div class="relative mx-3">
        <h2 class="font-paplane text-4xl md:text-5xl text-primary">
          <span class="border-2 border-primary px-5 rounded-[20px] inline-block">WITH AI</span>
        </h2>
      </div>
    </div>
    <h3 class="sub-heading text-xl mt-4 text-center font-paplane text-black">
      Learn about the images featured in The PSAi
    </h3>
  </div>

  <!-- Asymmetrical Image Collage (matching original design) -->
  <div class="images-gallery-wrapper relative w-full max-w-6xl mx-auto mb-8 px-4">
    <div class="images-gallery relative h-[600px]">
      {#each batch as item, i (item.id)}
        <!-- Apply different positioning for each image based on index -->
        <button 
          type="button"
          class="absolute cursor-pointer rounded-lg overflow-hidden shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:z-10 border-0 p-0 m-0 transform-gpu" 
          style={getPositionStyle(i)}
          onclick={() => openModal(item)}
          onkeydown={e => {
            if (e.key === 'Enter' || e.key === ' ') openModal(item);
          }}
          aria-label={`View details for ${item.title}`}
        >
          <div class="absolute inset-0 bg-primary opacity-0 hover:opacity-20 transition-opacity duration-300 ease-in-out z-10"></div>
          <img 
            src={item.images.small} 
            alt={item.title} 
            class="w-full h-full object-cover transition-all duration-500 ease-out hover:scale-110 transform-gpu" 
          />
        </button>
      {/each}
    </div>
  </div>
  
  <!-- See More Button -->
  <div class="text-center mb-10">
    <button 
      id="seeMoreBtn"
      onclick={() => refreshImages()}
      class="dark_cta mt-2 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-xl px-8 py-2 font-medium flex items-center justify-center gap-2 shadow-md font-paplane"
      aria-label="See more images"
    >
      <span>SEE MORE</span>
    </button>
  </div>

  <!-- Modal -->
  {#if modalOpen && currentItem}
    <div
      id="fighting-ai-modal"
      class="customPopup show fixed inset-0 z-50 flex items-center justify-center"
      tabindex="0"
      role="dialog"
      aria-modal="true"
      aria-label="Image details"
    >
      <!-- Backdrop button for closing modal when clicking outside -->
      <button 
        type="button" 
        class="absolute inset-0 w-full h-full cursor-default" 
        onclick={closeModal}
        onkeydown={e => {
          if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') closeModal();
        }}
        aria-label="Close modal"
      ></button>
      
      <div
        class="figtingWithAISlider relative max-w-5xl w-full mx-4 bg-[#FFF9EB] rounded-2xl overflow-hidden shadow-2xl"
        role="document"
      >
        <button
          class="btn-close absolute top-6 right-6 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl focus:outline-none z-10 hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-90"
          aria-label="Close modal"
          onclick={closeModal}
          tabindex="0"
          onkeydown={e => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') closeModal();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#fff" stroke-width="2.5" d="M6 6l12 12M6 18L18 6"/></svg>
        </button>
        
        <div class="flex flex-col md:flex-row md:h-[650px] max-h-[90vh]">
          <!-- Image -->
          <div class="img-container w-full md:w-1/2 p-6 flex items-center justify-center overflow-hidden">
            <div class="relative overflow-hidden rounded-xl shadow-2xl w-full h-full max-h-[500px] md:max-h-full">
              <img 
                src={currentItem.images.medium} 
                alt={currentItem.title} 
                class="w-full h-full object-cover" 
              />
              <div class="absolute inset-0 shadow-inner pointer-events-none border border-white/10 rounded-xl"></div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="slide-content w-full md:w-1/2 p-8 bg-[#FFF9EB] overflow-y-auto custom-scrollbar">
            <div class="mb-6">              
              <div class="batch-label text-xs mb-2 uppercase tracking-wider inline-block border-2 border-primary rounded-xl px-4 py-1 text-primary font-paplane font-bold">
                {currentItem.batch === 1 ? 'Viral Social Media' : 
                  currentItem.batch === 2 ? 'Celebrity Images' : 
                  currentItem.batch === 3 ? 'News & Political' : 
                  currentItem.batch === 4 ? 'Artistic & Realistic' : 'Unknown'}
              </div>
              
              <h3 class="slider__image-title text-4xl font-bold text-primary mb-4 font-paplane uppercase leading-tight">{currentItem.title}</h3>
              
              <div class="h-1 w-16 bg-primary rounded-full mb-6"></div>
              
              <p class="text-gray-800 mb-8 leading-relaxed font-paplane text-lg">{currentItem.description}</p>
            </div>
            
            {#if currentItem.sourceAttribution}
              <div class="source-attribution bg-white/40 rounded-xl p-4 shadow-sm mb-6">
                <h4 class="slider__person-label text-lg font-semibold mb-2 flex items-center font-paplane">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                  Creator/Source:
                </h4>
                <div class="ml-7">
                  <span class="slider__person-name font-paplane font-bold text-primary text-xl block">{currentItem.sourceAttribution}</span>
                  {#if currentItem.platform}
                    <span class="text-sm text-gray-600 font-paplane flex items-center mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
                      </svg>
                      Platform: {currentItem.platform}
                    </span>
                  {/if}
                </div>
              </div>
            {/if}
            
            <!-- Stats -->
            {#if currentItem.stats}
              <div class="viral-stats-container bg-white/40 rounded-xl p-4 shadow-sm mb-6">
                <h4 class="slider__context-label text-lg font-semibold mb-3 font-paplane flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  Viral Stats:
                </h4>
                <ul class="viral-stats grid grid-cols-1 md:grid-cols-3 gap-3 font-paplane ml-7">
                  {#if currentItem.stats.likes}
                    <li class="stat-card bg-white rounded-lg p-3 shadow-sm flex items-center transition-transform hover:translate-y-[-2px]">
                      <div class="stat-icon bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      </div>
                      <div>
                        <span class="text-primary font-medium text-xs uppercase block">Likes</span>
                        <span class="text-gray-900 font-bold text-lg">{formatNumber(currentItem.stats.likes)}</span>
                      </div>
                    </li>
                  {/if}
                  {#if currentItem.stats.shares}
                    <li class="stat-card bg-white rounded-lg p-3 shadow-sm flex items-center transition-transform hover:translate-y-[-2px]">
                      <div class="stat-icon bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                      </div>
                      <div>
                        <span class="text-primary font-medium text-xs uppercase block">Shares</span>
                        <span class="text-gray-900 font-bold text-lg">{formatNumber(currentItem.stats.shares)}</span>
                      </div>
                    </li>
                  {/if}
                  {#if currentItem.stats.views}
                    <li class="stat-card bg-white rounded-lg p-3 shadow-sm flex items-center transition-transform hover:translate-y-[-2px]">
                      <div class="stat-icon bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <span class="text-primary font-medium text-xs uppercase block">Views</span>
                        <span class="text-gray-900 font-bold text-lg">{formatNumber(currentItem.stats.views)}</span>
                      </div>
                    </li>
                  {/if}
                </ul>
              </div>
            {/if}
            
            <!-- Sources -->
            <div class="source-links bg-white/40 rounded-xl p-4 shadow-sm">
              <h4 class="slider__context-label text-lg font-semibold mb-3 font-paplane flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                </svg>
                Sources:
              </h4>
              <div class="flex flex-wrap gap-2 ml-7">
                {#each currentItem.sources as source, i}
                  <a 
                    href={source} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="flex items-center bg-white text-primary border-2 border-primary px-4 py-2 rounded-xl text-sm hover:bg-primary hover:text-white transition-all duration-300 font-paplane font-medium shadow-sm hover:shadow-md transform hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Source {i + 1}
                  </a>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</section>
