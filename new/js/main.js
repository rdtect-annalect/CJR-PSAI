


  

  const CarouselData = [
    {
      title: "Title 1 <br/> Check Hands and Fingers",
      description: "Description for card 1.",
    images:{
        small:"https://via.placeholder.com/200x150",
        medium:"https://via.placeholder.com/400x300",
    }
    },
    {
      title: "Title 2  <br/> Check Hands and Fingers",
      description: "Description for card 2.",
          images:{
        small:"https://via.placeholder.com/200x150",
        medium:"https://via.placeholder.com/400x300",
    }
      
    },
    {
        title: "Title 3 <br/> Check Hands and Fingers",
        description: "Description for card 2.",
            images:{
        small:"https://via.placeholder.com/200x150",
        medium:"https://via.placeholder.com/400x300",
    }
        
      },
      {
        title: "Title 4 <br/> Check Hands and Fingers",
        description: "Description for card 2.",
            images:{
        small:"https://via.placeholder.com/200x150",
        medium:"https://via.placeholder.com/400x300",
    }
        
      },
      {
        title: "Title 5 <br/> Check Hands and Fingers",
        description: "Description for card 2.",
            images:{
        small:"https://via.placeholder.com/200x150",
        medium:"https://via.placeholder.com/400x300",
    }
        
      },
      {
        title: "Title 6 <br/> Check Hands and Fingers",
        description: "Description for card 2.",
            images:{
        small:"https://via.placeholder.com/200x150",
        medium:"https://via.placeholder.com/400x300",
    }
        
      }
  ];



  
  $(document).ready(function () {
    
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


  });
  