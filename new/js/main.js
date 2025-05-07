


  

  const CarouselData = [
    {
      title: "Title 1 Check Hands and Fingers",
      description: "AI often struggles with realistic hand placement and finger details, including extra fingers and warped hands.",
    images:{
        small:"images/spot-ai/1.png",
        medium:"images/spot-ai/1-m.png",
    }
    },
    {
      title: "Tip 02 Look at facial features",
      description: "Check for asymmetry in facial features, odd eye placement, unnatural skin textures, hair that’s perfectly smooth and clean, or expressions that don't match the situation.",
          images:{
        small:"images/spot-ai/2.png",
        medium:"images/spot-ai/1-m.png",
    }
      
    },
    {
        title: "Tip 03 Scan the background",
        description: "Look for blurry or distorted background elements, or faces and objects that don't fit the scene.",
            images:{
        small:"images/spot-ai/3.png",
        medium:"images/spot-ai/1-m.png",
    }
        
      },
      {
        title: "Tip 04 Spot contextual errors",
        description: "Pay attention to details that might not make sense within the image. If it seems like it isn’t real, it probably isn’t.",
            images:{
        small:"images/spot-ai/4.png",
        medium:"images/spot-ai/1-m.png",
    }
        
      },
      {
        title: "Tip 05 Look for distorted logos or text",
        description: "Look for minor details that appear off, like distorted logos, warped numbers and words that don’t make sense.",
            images:{
        small:"images/spot-ai/5.png",
        medium:"images/spot-ai/1-m.png",
    },
    
        
      },

      {
        title: "Tip 06 Look for distorted logos or text",
        description: "Look for minor details that appear off, like distorted logos, warped numbers and words that don’t make sense.",
            images:{
        small:"images/spot-ai/1.png",
        medium:"images/spot-ai/1-m.png",
    },
    
        
      }
  ];



  
  $(document).ready(function () {
    
    const cardsContainer = $('#cardsContainer');
    CarouselData.forEach((item, index) => {
      const card = `
        <div class="card" data-index="${index}" data-bs-toggle="modal" data-bs-target="#carouselModal">
          <img src="${item.images.small}" alt="Card ${index + 1}" class="img-fluid" />
          <div class="card-body">
          <h3 class="card-title">${item.title}</h3>
          <p>${item.description}</p>
          </div>
        </div>
      `;
      cardsContainer.append(card);
    });
    
    $('#cardsContainer').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
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
              slidesToShow: 3
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
            slidesToShow: 1
          }
        }
      ]
    });
    
    function openModal(slickIndex) {
      $('#modalLoader').show();
      $('.modalSliderWrapper').hide();
    
      if ($('.modalSlider').hasClass('slick-initialized')) {
        $('.modalSlider').slick('unslick');
      }
    
      $('.modalSlider').empty();
    
      CarouselData.forEach((item, index) => {
        const slide = `
          <div class="slick-slide">
            <div class="d-flex align-items-center flex-wrap">
              <div class="w-50 p-3">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                    <div class="slider_arrows mt-0"> <div class="slider_arrow_left"> <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17.922 5.98305L11.9246 -5.31127e-07L1.27123 10.746C0.452341 11.5672 2.03821e-06 12.6856 1.93633e-06 13.851L0.0233987 22.2194C0.0233985 23.3847 0.491336 24.4953 1.31023 25.3165L12.0338 36L18 29.9857L5.9974 18.0274L17.922 5.98305Z" fill="#FF4F2A"/> </svg> </div> <div class="dash"> <svg width="155" height="1" viewBox="0 0 155 1" fill="none" xmlns="http://www.w3.org/2000/svg"> <line y1="0.5" x2="155" y2="0.5" stroke="#FF4F2A" stroke-dasharray="2 2"/> </svg> </div> <div class="slider_arrow_right"> <svg width="18" height="36" viewBox="0 0 18 36" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.0779896 30.0169L6.07539 36L16.7288 25.254C17.5477 24.4328 18 23.3144 18 22.149L17.9766 13.7806C17.9766 12.6153 17.5087 11.5047 16.6898 10.6835L5.9662 0L0 6.01434L12.0026 17.9726L0.0779896 30.0169Z" fill="#FF4F2A"/> </svg> </div> </div>
              </div>
              <div class="w-50 text-center">
                <img src="${item.images.medium}" class="img-fluid" alt="Image ${index + 1}" />
              </div>
            </div>
          </div>
        `;
        $('.modalSlider').append(slide);
      });
    
      $('.modalSlider').on('init', function () {
        $('#modalLoader').show();
        $('.modalSliderWrapper').fadeIn();
      });
    
      $('.modalSlider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        adaptiveHeight: true,
        infinite: false,
        centerMode: false,
        focusOnSelect: true,
        fade:true,
        initialSlide: slickIndex,
        prevArrow: $('#carouselModal .slider_arrow_left'),
        nextArrow: $('#carouselModal .slider_arrow_right'),
      });
    }
    
    $(document).on('click', '.card', function () {
      const slickIndex = $(this).closest('.slick-slide').data('slick-index');
      openModal(slickIndex);
    });
    
    // Ensure proper layout on modal open
    $('#carouselModal').on('shown.bs.modal', function () {
      setTimeout(function () {
        $('.modalSlider').slick('setPosition');
        $('#modalLoader').hide();
      }, 300);
    });
    
    $('#carouselModal').on('hidden.bs.modal', function () {
      if ($('.modalSlider').hasClass('slick-initialized')) {
        $('.modalSlider').slick('unslick');
      }
      $('.modalSlider').empty();
    });

function textTrim() {
    $('#cardsContainer .card .card-body p').each(function() {
        const text = $(this).text();
        const truncatedText = text.substring(0, 50) + '...'
        $(this).text(truncatedText);
    }   );
}
    if(window.innerWidth < 1600) {
        textTrim()
    }

    $(window).on('resize', function() {
        textTrim()
    })


    $('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
		
	});
    
    
    var lastScrollTop = 0;
  $(window).on("scroll", function () {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > lastScrollTop) {
      // Scrolling down - hide header
      $("header").addClass("hide-header");
      $("header").removeClass("stretched-header");

    } else {
      // Scrolling up - show header
      $("header").removeClass("hide-header");
      $("header").addClass("stretched-header");

    }
    lastScrollTop = currentScroll;

    if(currentScroll < 100) {
      $("header").removeClass("stretched-header");
    }
  });


  $('.images-gallery-wrapper').mousemove(function(event) {
    // Get the mouse position relative to the document
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    // Loop through each image and apply a random transformation
    $('.images-gallery img').each(function() {
      const img = $(this);
      
      // Generate random offsets for the image movement
      const randomX = Math.random() * 10 - 5;  // Random X offset between -5px and 5px

      // Apply the random transform to move the image
      img.css('transform', `translate(${randomX + (mouseX / 100)}px)`);
    });
  });

  });
  