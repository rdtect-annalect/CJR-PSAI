// spotAI.js - Module for handling SpotAI carousel functionality

// Data container for carousel
let CarouselData = [];

/**
 * Opens the carousel modal to display a specific slide
 * @param {number} slickIndex - Index of the slide to show
 */
function openModal(slickIndex) {
  $('.modalSlider').empty();

  const slide = `
    <div class="slick-slide1">
       <div class="ti_img-thumbnail">
          <img src="${CarouselData[slickIndex].images.medium}" class="img-fluid" alt="Image " />

          <div class="tip_content para-box-wrapper">
          <h3>${CarouselData[slickIndex].title}</h3>
           <h4>${CarouselData[slickIndex].subtitle}</h4>
           <hr class="opacity-1" />
          <p>${CarouselData[slickIndex].description}</p>
                  <div class="corner-square tl"></div>
        <div class="corner-square tr"></div>
        <div class="corner-square bl"></div>
        <div class="corner-square br"></div>
        </div>
        </div>
    
                  </div>
  `;
  $('.modalSlider').append(slide);

  $('.modalSlider').on('init', function () {
    $('.modalSliderWrapper').addClass('show');
  });
}

/**
 * Truncates text in card descriptions for better display
 */
function textTrim() {
  $('#cardsContainer .card .card-body p').each(function() {
      const text = $(this).text();
      const truncatedText = text.substring(0, 50) + '...'
      $(this).text(truncatedText);
  });
}

/**
 * Initialize carousel with event handlers
 */
function initCarousel() {
  const cardsContainer = $('#cardsContainer');
  
  // Create carousel cards
  CarouselData.forEach((item, index) => {
    const card = `
      <div class="card" data-index="${index}" data-bs-toggle="modal" data-bs-target="#carouselModal">
        <img src="${item.images.small}" alt="Card ${index + 1}" class="img-fluid" />
        <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
      
        </div>
      </div>
    `;
    cardsContainer.append(card);
  });
  
  // Initialize slick carousel
  $('#cardsContainer').slick({
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    dots: false,
    draggable: false,
    infinite: false,
    prevArrow: $('.how-tospot-ai-sec .slider_arrow_left'),
    nextArrow: $('.how-tospot-ai-sec .slider_arrow_right'),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  // Set up event handlers
  $(document).on('click', '.card', function () {
    const slickIndex = $(this).closest('.slick-slide').data('slick-index');
    openModal(slickIndex);
  });
  
  // Modal events
  $('#carouselModal').on('shown.bs.modal', function () {
    setTimeout(function () {
      // Additional modal setup if needed
    }, 300);
  });

  $('#carouselModal').on('hidden.bs.modal', function () {
    if ($('.modalSlider').hasClass('slick-initialized')) {
      // Clean up if needed
    }
    $('.modalSlider').empty();
  });

  // Close modal if click outside modal-dialog (backdrop click)
  $('#carouselModal').on('mousedown', function(e) {
    const $dialog = $(this).find('.modal-dialog');
    // If click is outside the modal-dialog, close the modal
    if (!$dialog.is(e.target) && $dialog.has(e.target).length === 0) {
      $(this).modal('hide');
    }
  });
  
  // Handle text trimming
  if(window.innerWidth < 1600) {
    textTrim();
  }
  
  $(window).on('resize', function() {
    textTrim();
  });
}

/**
 * Initialize the SpotAI module - loads data and sets up carousel
 * @returns {Promise<boolean>} - Promise that resolves when initialization is complete
 */
async function initSpotAI() {
  try {
    // Load carousel data
    const response = await fetch('./data/carouselData.json');
    CarouselData = await response.json();
    
    // Initialize the carousel
    initCarousel();
    
    return true;
  } catch (error) {
    console.error('Error initializing SpotAI:', error);
    return false;
  }
}

// Export only the initSpotAI function
export { initSpotAI };
