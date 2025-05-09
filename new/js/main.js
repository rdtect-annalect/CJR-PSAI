

let CarouselData = [];

let FightWithAIData = [
  {
    title: "Shrimp Jesus ",
    description: "Surreal images like this have gone viral, fooling many people into believing they were real.",
    stats: {
      likes: 2900000,
      shares: 53000
    },
    sources: [
      "https://www.forbes.com/sites/danidiplacido/2024/04/28/facebooks-surreal-shrimp-jesus-trend-explained/",
      "https://www.linkedin.com/pulse/shrimp-jesus-ai-tsunami-navigating-sea-digital-sanzana-ph-d--4ubyc/",
      "https://manofmany.com/tech/shrimp-jesus-explained",
      "https://www.youtube.com/watch?v=nFsZ-mOw4Sc",
      "https://x.com/TheHornetsFury/status/1767792068947329106?lang=en"
    ],
    images: {
      small: "images/spot-ai/small/1.png",
      medium: "images/spot-ai/large/1.png"
    }
  },
  {
    title: "Baby Skydiving ",
    description: "A digital creator introduced his series of images featuring babies skydiving on Facebook. ",
    stats: {
      likes: 20000,
      shares: 91000
    },
    sources: [
      "https://www.boredpanda.com/ai-generated-images-of-babies-skydiving-timothy-j-nemeth/"
    ],
    images: {
      small: "images/spot-ai/small/2.png",
      medium: "images/spot-ai/large/2.png"
    }
  },
  {
    title: "David Attenborough Polar Bear",
    description: "This AI generated image was created my Mid Journey proving how crazy AI images are getting ",
    stats: {
      likes: 16000,
      shares: 791
    },
    sources: [
      "https://cheezburger.com/19000069/_",
      "https://www.reddit.com/r/weirddalle/comments/zlptxd/david_attenborough_wrestling_a_polar_bear/",
      "https://x.com/weirddalle/status/1603338506939645957"
    ],
    images: {
      small: "images/spot-ai/small/3.png",
      medium: "images/spot-ai/large/3.png"
    }
  },
  {
    title: "Women in Old B&W Photo",
    description: "This AI generated image was submitted for a major photography competition and won the top prize.",
    stats: {
      likes: 791,
      shares: 16000
    },
    sources: [
      "https://www.scientificamerican.com/article/how-my-ai-image-won-a-major-photography-competition/"
    ],
    images: {
      small: "images/spot-ai/small/4.png",
      medium: "images/spot-ai/large/4.png"
    }
  },
  {
    title: "Older Women Skateboarding ",
    subtitle: "Look for<br/> distorted<br/> logos or text",
    description: "Mumbai-based artist Ashish Jose has employed AI to generate hyper-realistic images of elderly women skating on the street. ",
    stats: {
      likes: 3600000,
      shares: "-"
    },
    sources: [
      "https://www.ndtv.com/offbeat/ai-generated-pics-show-elderly-women-skating-on-streets-internet-stunned-3962123",
      "https://www.instagram.com/p/CrGRxuAMo7R/?utm_source=ig_embed&img_index=1"
    ],
    images: {
      small: "images/spot-ai/small/5.png",
      medium: "images/spot-ai/large/5.png"
    }
  },
  {
    title: "Queen Elizabeth Dancing",
    description: "Part of a viral series of images rendered by AI. This one depicts the late Queen Elizabeth II breaking it down on the dance floor.",
    stats: {
      likes: 0,
      shares: 0
    },
    sources: [
      "https://nypost.com/2023/05/17/want-to-see-queen-elizabeth-get-low-on-the-dance-floor-thank-ai-for-that/"
    ],
    images: {
      small: "images/spot-ai/small/6.png",
      medium: "images/spot-ai/large/6.png"
    }
  },
  {
    title: "Tip 07 ",
    subtitle: "Look for distorted logos or text",
    description: "Look for minor details that appear off, like distorted logos, warped numbers and words that don’t make sense.",
    stats: {
      likes: 123,
      shares: 456
    },
    sources: [
      "https://example.com/source1",
      "https://example.com/source2",
      "https://example.com/source3",
      "https://example.com/source4"
    ],
    images: {
      small: "images/spot-ai/small/7.png",
      medium: "images/spot-ai/large/7.png"
    }
  },
  {
    title: "Tip 08 ",
    subtitle: "Look for distorted logos or text",
    description: "Look for minor details that appear off, like distorted logos, warped numbers and words that don’t make sense.",
    stats: {
      likes: 123,
      shares: 456
    },
    sources: [
      "https://example.com/source1",
      "https://example.com/source2",
      "https://example.com/source3",
      "https://example.com/source4"
    ],
    images: {
      small: "images/spot-ai/small/8.png",
      medium: "images/spot-ai/large/8.png"
    }
  },
  {
    title: "Tip 09 ",
    subtitle: "Look for distorted logos or text",
    description: "Look for minor details that appear off, like distorted logos, warped numbers and words that don’t make sense.",
    stats: {
      likes: 123,
      shares: 456
    },
    sources: [
      "https://example.com/source1",
      "https://example.com/source2",
      "https://example.com/source3",
      "https://example.com/source4"
    ],
    images: {
      small: "images/spot-ai/small/9.png",
      medium: "images/spot-ai/large/9.png"
    }
  },
  {
    title: "Tip 10 ",
    subtitle: "Look for distorted logos or text",
    description: "Look for minor details that appear off, like distorted logos, warped numbers and words that don’t make sense.",
    stats: {
      likes: 123,
      shares: 456
    },
    sources: [
      "https://example.com/source1",
      "https://example.com/source2",
      "https://example.com/source3",
      "https://example.com/source4"
    ],
    images: {
      small: "images/spot-ai/small/10.png",
      medium: "images/spot-ai/large/10.png"
    }
  }
];

 

  
  $(document).ready( async function () {
    
    CarouselData = await fetch('./data/carouselData.json').then(res => res.json());

    
    const cardsContainer = $('#cardsContainer');
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
    
    $('#cardsContainer').slick({
      slidesToShow: 5,
      slidesToScroll: 2,
      arrows: true,
      dots: false,
      draggable:false,
      infinite:false,
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
            slidesToShow: 1
          }
        }
      ]
    });
    
    function openModal(slickIndex) {
    //   $('#modalLoader').show();
    
    //   if ($('.modalSlider').hasClass('slick-initialized')) {
    //     $('.modalSlider').slick('unslick');
    //   }
    
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
        // $('#modalLoader').show();
        $('.modalSliderWrapper').addClass('show');
      });
    
    //   $('.modalSlider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     dots: false,
    //     adaptiveHeight: true,
    //     infinite: false,
    //     centerMode: false,
    //     focusOnSelect: true,
    //     fade:true,
    //     initialSlide: slickIndex,
    //     prevArrow: $('#carouselModal .slider_arrow_left'),
    //     nextArrow: $('#carouselModal .slider_arrow_right'),
    //   });
    }
    
    $(document).on('click', '.card', function () {
      const slickIndex = $(this).closest('.slick-slide').data('slick-index');
      openModal(slickIndex);
    });
    
    // Ensure proper layout on modal open
    $('#carouselModal').on('shown.bs.modal', function () {
      setTimeout(function () {
        // $('.modalSlider').slick('setPosition');
        // $('#modalLoader').hide();
      }, 300);
    });
    
    $('#carouselModal').on('hidden.bs.modal', function () {
      if ($('.modalSlider').hasClass('slick-initialized')) {
        // $('.modalSlider').slick('unslick');
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
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    $('.images-gallery img').each(function() {
      const img = $(this);
      
      const randomX = Math.random() * 10 - 5;  // Random X offset between -5px and 5px

      img.css('transform', `translate(${randomX + (mouseX / 100)}px)`);
    });
  });


  $('.image-popup-vertical-fit').on('click', function () {
    $('.customPopup').removeClass('show');
    var targetSelector = $(this).data('target'); 
    $(targetSelector).addClass('show'); 
    $('.figtingWithAISlider').slick('refresh');
    $('html, body').addClass('overflow-hidden')

  });

 

  
  $('.customPopup .btn-close').on('click', function () {
    $('.customPopup').removeClass('show'); 
    $('html, body').removeClass('overflow-hidden')
  });


  });
  
  let currentTips = [];
  function getRandomTips(count = 9) {
    const shuffled = [...FightWithAIData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  function renderSmallImages(tips) {
    currentTips = tips; // Save for modal use
    $('#imageGrid').empty();
  
    tips.forEach((tip, index) => {
      $('#imageGrid').append(`
        <a class="img-${index + 1} image-popup-vertical-fit" href="javascript:void(0)" data-target="#modal-1" data-index="${index}">
          <img src="${tip.images.small}" class="img-fluid rounded">
        </a>
      `);
    });
  
    // Bind the click handler to the whole anchor (which holds the data-target and index)
    $('.image-popup-vertical-fit').on('click', function () {
      const index = $(this).data('index');
      const targetSelector = $(this).data('target');
      
      openModalSlider(index); // Open slider with the right slide
      $(targetSelector).addClass('show');
      $('html, body').addClass('overflow-hidden');
    });
  }
  

  function openModalSlider() {
 
  
 
    let allSlidesContent = '';
    FightWithAIData.forEach(tip => {
      const sourcesHtml = tip.sources
      .map((url, i) => `<a href="${url}" target="_blank" class="dark_cta">SOURCE LINK <span class="text-dark-orange d-block">[ ${String(i + 1).padStart(2, '0')} ]</span></a>`)
      .join('');

      let statsHtml = '';
 // Conditionally show stats if they exist
 if (tip.stats?.likes) {
  statsHtml += `<li>${tip.stats.likes} <span class="text-dark-orange">likes</span></li>`;
}
if (tip.stats?.shares) {
  statsHtml += `<li>${tip.stats.shares} <span class="text-dark-orange">shares</span></li>`;
}
if (tip.stats?.views) {
  statsHtml += `<li>${tip.stats.views} <span class="text-dark-orange">views</span></li>`;
}


      allSlidesContent += `
        <div class="slide-item">
            <div class="row flex-lg-row-reverse">
            <div class="col-md-12 col-lg-12 col-xl-6">
            <div class="img-container">
              <img src="${tip.images.medium}" class="img-fluid rounded" />
              </div>
            </div>

            <div class="col-md-12 col-lg-12 col-xl-6">
            <div class="slide-content">
              <h5>${tip.title}</h5>
              <p>${tip.description}</p>

              <ul class="viral-stats p-0 m-0 mt-4">
              <li class="d-flex gap-2 align-items-center">
                <img src="images/fightingwithAI/ICON_04.svg" />
                <span class="text-dark-orange">Viral Stats:</span>
              </li>
              ${statsHtml}
            </ul>

            <div class="d-flex gap-2 align-items-center mt-4 btn_links-list flex-wrap">
              ${sourcesHtml}
            </div>
            </div>
            </div>
          </div>
        </div>
      `;
    });
  
    const $slider = $('.figtingWithAISlider');
    $slider.html(allSlidesContent);
  
    // Reinitialize slick
    if ($slider.hasClass('slick-initialized')) {
      $slider.slick('unslick');
    }
  
    $slider.slick({
          slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots:false,
        speed:1000,
        fade:true,
        infinite:false,
        prevArrow: $('.customPopup .slider_arrow_left'),
        nextArrow: $('.customPopup .slider_arrow_right'),
    });
  
    // Show the modal
    $('.customPopup').addClass('show');
  

  }


  const initialTips = getRandomTips();
  renderSmallImages(initialTips); // ⬅️ This ensures small images show
  $('#refreshBtn').on('click', () => {
    const newTips = getRandomTips();
    renderSmallImages(newTips);
    $('.customPopup').removeClass('show');
  });
  
  // Close button action
  $('.btn-close').on('click', () => {
    $('.customPopup').removeClass('show');
  });
  $(window).on('load', function () {
    // $('.figtingWithAISlider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: true,
    //     arrows: true,
    //     dots:false,
    //     speed:1000,
    //     fade:true,
    //     prevArrow: $('.customPopup .slider_arrow_left'),
    //     nextArrow: $('.customPopup .slider_arrow_right'),
    // });
});
