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


  