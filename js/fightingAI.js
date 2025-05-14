// fightingAI.js - Module for handling Fighting AI tips, grid, and modal functionality

// Global variables
let FightWithAIData = {};
let currentBatch = 'batch1';
let currentBatchIndex = 0;
let batches = [];
let positionLayouts = [];

// Global mouse position for parallax
let lastParallaxEvent = { x: window.innerWidth/2, y: window.innerHeight/2 };
// Smoothed mouse coordinates to prevent jitter
let smoothMouse = { x: window.innerWidth/2, y: window.innerHeight/2 };

/**
 * Get the corrected image path by removing '../' prefix if it exists
 * This ensures paths are relative to the site root
 * @param {Object} item - The item containing image data
 * @returns {string} - The corrected image path
 */
function getImagePathForItem(item) {
  if (!item || !item.image) return '';
  
  // Force the path to be absolute from root to avoid any relative path issues
  let path = item.image;
  if (path.startsWith('../')) {
    path = path.substring(3);
  } else if (!path.startsWith('/') && !path.startsWith('http')) {
    // Ensure it starts with / for absolute path from root
    path = '/' + path;
  }
  
  return path;
}

/**
 * Get images from the current batch
 * @returns {Array} - Array of items from the current batch
 */
function getCurrentBatchItems() {
  return FightWithAIData.batches[currentBatch] || [];
}

/**
 * Get next batch and cycle through batches if needed
 * @returns {string} - The next batch name
 */
function getNextBatch() {
  const batches = Object.keys(FightWithAIData.batches);
  const currentIndex = batches.indexOf(currentBatch);
  const nextIndex = (currentIndex + 1) % batches.length;
  return batches[nextIndex];
}

/**
 * Load the next batch of images
 */
function loadNextBatch() {
  console.log('Current batch before change:', currentBatch);
  
  currentBatch = getNextBatch();
  console.log('New batch loaded:', currentBatch);
  
  const items = getCurrentBatchItems();
  console.log('Items in new batch:', items.length);
  
  renderSmallImages(items);
}

/**
 * Helper function to get a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random integer
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate randomized position layouts for the collage with minimal overlap
 * @returns {Array} - Array of position data objects
 */
function generatePositionLayouts() {
  // Create a wider spread layout with less overlap (with 15% increased widths)
  const positions = [
    // Left side positions
    { width: '20.7%', height: '15vh', top: '5%', left: '2%', zIndex: randomZIndex() },  // 18% * 1.15
    { width: '23%', height: '18vh', top: '20%', left: '5%', zIndex: randomZIndex() },   // 20% * 1.15
    { width: '18.4%', height: '22vh', top: '52%', left: '8%', zIndex: randomZIndex() }, // 16% * 1.15
    
    // Middle-left positions
    { width: '25.3%', height: '20vh', top: '15%', left: '26%', zIndex: randomZIndex() }, // 22% * 1.15
    { width: '21.85%', height: '20vh', top: '45%', left: '30%', zIndex: randomZIndex() }, // 19% * 1.15
    
    // Center positions
    { width: '27.6%', height: '22vh', top: '50%', left: '50%', zIndex: randomZIndex() }, // 24% * 1.15
    { width: '24.15%', height: '20vh', top: '12%', left: '52%', zIndex: randomZIndex() }, // 21% * 1.15
    
    // Middle-right positions
    { width: '23%', height: '20vh', top: '38%', left: '70%', zIndex: randomZIndex() },  // 20% * 1.15
    
    // Right side positions
    { width: '19.55%', height: '15vh', top: '8%', left: '78%', zIndex: randomZIndex() }, // 17% * 1.15
    { width: '21.85%', height: '15vh', top: '55%', left: '76%', zIndex: randomZIndex() } // 19% * 1.15
  ];
  
  // Helper function for random z-index
  function randomZIndex() {
    return Math.floor(Math.random() * 5) + 1;
  }

  // Randomize the positions by shuffling the array
  const shuffled = [...positions].sort(() => Math.random() - 0.5);

  // Add dynamic properties to each position
  return shuffled.map(pos => ({
    ...pos,
    // More pronounced visual properties
    rotate: Math.random() * 12 - 6, // -6 to 6 degrees of rotation
    scale: 1 + (Math.random() * 0.2 - 0.1), // 0.9 to 1.1 scale
    
    // Movement sensitivity - more responsive to mouse
    sensitivity: Math.random() * 0.12 + 0.05, // 0.05 to 0.17 movement multiplier
    maxMove: 30 + Math.random() * 20, // Maximum pixel movement (30-50px)
    
    // Different aspect ratios for variety
    aspectRatio: ['3/4', '4/3', '1/1', '16/9', '3/2'][Math.floor(Math.random() * 5)],
    
    // Store original position for reference during movement
    originalLeft: pos.left,
    originalTop: pos.top
  }));
}

/**
 * Render small images for the AI tips grid using an asymmetrical collage layout
 * @param {Array} items - Array of items from the current batch to render
 */
function renderSmallImages(items) {
  console.log('Rendering items:', items.length);
  
  // Create container for the asymmetrical collage
  const gallery = $('.images-gallery');
  gallery.empty();
  
  // Add custom CSS for collage layout and image styling based on designs
  if ($('#fight-ai-styles').length === 0) {
    $('head').append(
      '<style id="fight-ai-styles">' +
      '  .image-collage {' +
      '    position: relative; ' +
      '    height: 75vh; ' +
      '    width: 100%; ' +
      '    background-color: transparent;' +
      '  }' +
      '  .gallery-item {' +
      '    position: absolute;' +
      '    will-change: transform;' +
      '    cursor: pointer;' +
      '    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);' +
      '    border-radius: 4px;' +
      '    display: block;' +
      '    padding: 0;' +
      '    margin: 0;' +
      '    overflow: hidden;' +
      '  }' +
      '  .gallery-item:hover {' +
      '    z-index: 50 !important;' +
      '    transform: translateY(-5px) scale(1.08) !important;' +
      '    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);' +
      '  }' +
      '  .gallery-item:after {' +
      '    content: attr(data-title);' +
      '    position: absolute;' +
      '    top: 0;' +
      '    left: 0;' +
      '    right: 0;' +
      '    padding: 15px;' +
      '    background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);' +
      '    color: white;' +
      '    font-size: 14px;' +
      '    font-weight: 500;' +
      '    text-align: left;' +
      '    opacity: 0;' +
      '    transition: opacity 0.3s ease;' +
      '  }' +
      '  .gallery-item:hover:after {' +
      '    opacity: 1;' +
      '  }' +
      '</style>'
    );
  }
  
  // Create container for gallery with proper dimensions
  const container = $('<div class="image-collage"></div>');
  gallery.append(container);
  
  // Generate position layouts if not already set
  if (!positionLayouts.length) {
    positionLayouts = generatePositionLayouts();
  }
  
  // Render each item
  items.forEach((item, i) => {
    const imagePath = getImagePathForItem(item);
    const pos = positionLayouts[i % positionLayouts.length];
    let posStyle = `width: ${pos.width};height: ${pos.height};top: ${pos.top};left: ${pos.left};z-index: ${pos.zIndex};transform: rotate(${pos.rotate}deg) scale(${pos.scale});aspect-ratio: ${pos.aspectRatio};`;
    if (pos.left) posStyle += `left: ${pos.left};`;
    if (pos.right) posStyle += `right: ${pos.right};`;
    const randomSensitivity = (Math.random() * Math.random() * 0.7) + 0.04;
    const galleryItem = $(
      '<img class="gallery-item" src="' + imagePath + '" style="' + posStyle + '"' +
        ' alt="' + (item.title || 'Image') + '"' +
        ' data-sensitivity="' + randomSensitivity + '"' +
        ' data-max-move="' + pos.maxMove + '"' +
        ' data-original-left="' + pos.left + '"' +
        ' data-original-top="' + pos.top + '"' +
        ' data-rotate="' + pos.rotate + '"' +
        ' data-scale="' + pos.scale + '"' +
        ' data-title="' + (item.title || 'Untitled') + '"' +
        ' data-index="' + i + '"' +
        ' data-parallax="' + randomSensitivity + '"' +
      '/>'
    );
    // Add click handler to open Bootstrap modal
    galleryItem.on('click', function() {
      openFightingAIModal(i, currentBatch);
    });
    container.append(galleryItem);
  });

// --- Modal Logic for FightingAI (SpotAI-like, new structure) ---
let fightingAI_modal_currentIndex = 0;
let fightingAI_modal_currentBatch = '';

function openFightingAIModal(index, batch) {
  const items = FightWithAIData.batches[batch] || [];
  if (!items.length || !items[index]) return;
  fightingAI_modal_currentIndex = index;
  fightingAI_modal_currentBatch = batch;
  const item = items[index];

  // Title
  $('#fightingAIModalLabel').text(item.title || 'Image Details');

  // Image (right)
  const imgHtml = `<picture>
    <source media="(min-width:1024px)" srcset="${getImagePathForItem(item)}">
    <img src="${getImagePathForItem(item)}" alt="${item.title || ''}" class="img-fluid" />
  </picture>`;
  $('#fightingAI-modal-img-container').html(imgHtml);

  // Content (left)
  let contentHtml = '';
  if (item.title) contentHtml += `<p class="slider__image-title text-dark-orange">${item.title}</p>`;
  if (item.context) contentHtml += `<h3 class="slider__context-label">CONTEXT:</h3>`;
  if (item.description) contentHtml += `<p>${item.description}</p>`;
  // Viral stats
  if (item.stats) {
    contentHtml += '<ul class="viral-stats p-0 m-0 mt-4">';
    contentHtml += '<li class="d-flex gap-2 align-items-center"><img src="images/fightingwithAI/ICON_04.svg" /><span class="text-dark-orange">Viral Stats:</span></li>';
    if (item.stats.likes) contentHtml += `<li>${item.stats.likes} <span class="text-dark-orange">likes</span></li>`;
    if (item.stats.shares) contentHtml += `<li>${item.stats.shares} <span class="text-dark-orange">shares</span></li>`;
    contentHtml += '</ul>';
  }
  // Insert modal arrows after stats
  contentHtml += `
    <div class="fightingAI-modal-arrows d-flex align-items-center justify-content-center mt-3 mb-3">
      <div class="slider_arrow_left">
        <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.922 5.98305L11.9246 -5.31127e-07L1.27123 10.746C0.452341 11.5672 2.03821e-06 12.6856 1.93633e-06 13.851L0.0233987 22.2194C0.0233985 23.3847 0.491336 24.4953 1.31023 25.3165L12.0338 36L18 29.9857L5.9974 18.0274L17.922 5.98305Z" fill="#FF4F2A"></path>
        </svg>
      </div>
      <div class="dash mx-2">
        <svg width="155" height="1" viewBox="0 0 155 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="0.5" x2="155" y2="0.5" stroke="#FF4F2A" stroke-dasharray="2 2"></line>
        </svg>
      </div>
      <div class="slider_arrow_right">
        <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.0779896 30.0169L6.07539 36L16.7288 25.254C17.5477 24.4328 18 23.3144 18 22.149L17.9766 13.7806C17.9766 12.6153 17.5087 11.5047 16.6898 10.6835L5.9662 0L0 6.01434L12.0026 17.9726L0.0779896 30.0169Z" fill="#FF4F2A"></path>
        </svg>
      </div>
    </div>
  `;
  // Source links
  if (item.sources && Array.isArray(item.sources) && item.sources.length) {
    contentHtml += '<div class="d-flex gap-2 align-items-center mt-4 btn_links-list">';
    item.sources.forEach((src, i) => {
      contentHtml += `<a href="${src}" class="dark_cta" target="_blank">SOURCE LINK <span class="text-dark-orange d-block">[ ${String(i+1).padStart(2, '0')} ]</span></a>`;
    });
    contentHtml += '</div>';
  } else if (item.source) {
    contentHtml += `<div class="d-flex gap-2 align-items-center mt-4 btn_links-list"><a href="${item.source}" class="dark_cta" target="_blank">SOURCE LINK</a></div>`;
  }
  $('#fightingAI-modal-slide-content').html(contentHtml);

  // Show modal
  $('#fightingAIModal').modal('show');
}

// Modal navigation
function fightingAIModalPrev() {
  const items = FightWithAIData.batches[fightingAI_modal_currentBatch] || [];
  if (!items.length) return;
  let idx = fightingAI_modal_currentIndex - 1;
  if (idx < 0) idx = items.length - 1;
  openFightingAIModal(idx, fightingAI_modal_currentBatch);
}
function fightingAIModalNext() {
  const items = FightWithAIData.batches[fightingAI_modal_currentBatch] || [];
  if (!items.length) return;
  let idx = fightingAI_modal_currentIndex + 1;
  if (idx >= items.length) idx = 0;
  openFightingAIModal(idx, fightingAI_modal_currentBatch);
}

// Arrow event handlers
$(document).ready(function() {
  $(document).on('click', '.fightingAI-modal-arrows .slider_arrow_left', fightingAIModalPrev);
  $(document).on('click', '.fightingAI-modal-arrows .slider_arrow_right', fightingAIModalNext);
  $('#fightingAIModal').on('hidden.bs.modal', function() {
    $('#fightingAI-modal-img-container').empty();
    $('#fightingAI-modal-slide-content').empty();
  });
});

  
  console.log('Gallery rendering complete');
}

/**
 * Set up event handlers for the Fighting AI section
 */
function setupEventHandlers() {
  // Set up the refresh button to load the next batch
  $('#refreshBtn').off('click').on('click', function() {
    console.log('Refresh button clicked');
    loadNextBatch();
    // Reset position layouts to get a new arrangement
    positionLayouts = generatePositionLayouts();
  });
  
  // Close the modal ONLY with the close button
  
}

/**
 * Initialize the Fighting AI module - loads data, renders grid, and sets up event handlers
 * @returns {Promise<boolean>} - Promise that resolves when initialization is complete
 */
async function initFightingAI() {
  try {
    // Load the data
    const response = await fetch('./data/fightingAi.json');
    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }
    
    // Parse the JSON data
    FightWithAIData = await response.json();
    
    // Start with the first batch
    const batchKeys = Object.keys(FightWithAIData.batches);
    if (batchKeys.length > 0) {
      currentBatch = batchKeys[0];
      batches = batchKeys;
    }
    
    console.log('Setting up Fighting AI gallery...');
    console.log('Available batches:', batches);
    
    // Generate initial position layouts
    positionLayouts = generatePositionLayouts();
    
    // Render the first batch of images
    renderSmallImages(getCurrentBatchItems());
    
    // Set up event handlers
    setupEventHandlers();
    
    // Center the See More button
    centerSeeMoreButton();
    
    // Set proper height for the section
    adjustSectionHeight();
    
    return true;
  } catch (error) {
    console.error('Error initializing Fighting AI:', error);
    return false;
  }
}

/**
 * Center the See More button for better aesthetics
 */
function centerSeeMoreButton() {
  // Add CSS to center the button
  const btnContainer = $('#refreshBtn').parent();
  btnContainer.css({
    'display': 'flex',
    'justify-content': 'center',
    'width': '100%',
    'margin-top': '30px'
  });
  
  // Style the button itself
  $('#refreshBtn').css({
    'border': '2px solid #FF4F2A',
    'border-radius': '10px',
    'padding': '8px 20px',
    'background-color': 'transparent',
    'color': '#FF4F2A',
    'font-weight': 'bold',
    'transition': 'all 0.3s ease'
  }).hover(
    function() {
      $(this).css({
        'background-color': '#FF4F2A',
        'color': 'white'
      });
    },
    function() {
      $(this).css({
        'background-color': 'transparent',
        'color': '#FF4F2A'
      });
    }
  );
}

/**
 * Adjust the section height to accommodate the collage layout
 */
function adjustSectionHeight() {
  // Set appropriate styling for the section based on the design
  $('#fightAI').css({
    'min-height': '90vh',
    'padding': '60px 0',
    'background-color': '#FFF9EB'
  });
  
  // Style the heading to match design
  $('.heading-container').css({
    'margin-bottom': '30px'
  });
  
  // Style the SEE MORE button to match design
  $('#refreshBtn').css({
    'border': '2px solid #FF4F2A',
    'border-radius': '30px',
    'background-color': 'transparent',
    'color': '#FF4F2A',
    'text-transform': 'uppercase',
    'font-size': '14px',
    'letter-spacing': '1px',
    'padding': '10px 40px',
    'margin-top': '40px',
    'transition': 'all 0.3s ease'
  }).hover(
    function() {
      $(this).css({
        'background-color': '#FF4F2A',
        'color': 'white'
      });
    },
    function() {
      $(this).css({
        'background-color': 'transparent',
        'color': '#FF4F2A'
      });
    }
  );
}

// Capture mousemove for parallax
document.addEventListener('mousemove', (e) => {
  lastParallaxEvent.x = e.pageX;
  lastParallaxEvent.y = e.pageY;
});

// Animation loop for parallax
function updateAnimations() {
  requestAnimationFrame(updateAnimations);

  const items = $('.image-collage .gallery-item');
  if (!items.length) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  // Smooth mouse movement for easing jitter
  const easeFactor = 0.12;
  smoothMouse.x += (lastParallaxEvent.x - smoothMouse.x) * easeFactor;
  smoothMouse.y += (lastParallaxEvent.y - smoothMouse.y) * easeFactor;

  // Center relative to the collage container
  const containerElem = document.querySelector('.image-collage');
  const rect = containerElem.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dxGlobal = smoothMouse.x - centerX;
  const dyGlobal = smoothMouse.y - centerY;

  items.each(function() {
    const $item = $(this);
    const rotate = $item.data('rotate') || 0;
    const scale = $item.data('scale') || 1;
    // Depth factor for parallax
    const depth = parseFloat($item.data('parallax')) || 1;
    // Max movement to stay within container
    const maxMove = parseFloat($item.data('maxMove')) || 30;
    // Soft raw movement then clamp
    const rawX = (dxGlobal * depth) / 20;
    const rawY = (dyGlobal * depth) / 20;
    let x = Math.max(Math.min(rawX, maxMove), -maxMove);
    let y = Math.max(Math.min(rawY, maxMove), -maxMove);
    // Apply transform directly (no CSS transition)
    $item.css('transform', `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`);
  });
}

// Start the animation
updateAnimations();

// Export only the initFightingAI function
export { initFightingAI };