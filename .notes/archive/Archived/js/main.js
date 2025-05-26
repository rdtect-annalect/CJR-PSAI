// main.js - Main application file using ES modules
import { initSpotAI } from './spotAI.js';
import { initFightingAI } from './fightingAI.js';

/**
 * Initialize UI enhancements like smooth scrolling and header behavior
 * These are general UI behaviors not specific to any module
 */
function initUIEnhancements() {
  // Navigation styling and auto-hide feature
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
  
  // Smooth scroll and section snap
  
  // Enable scroll snap on <html> and all <section> elements for proper section snapping
  //  $('html').css({
  //   'scroll-behavior': 'smooth',
  //   'scroll-snap-type': 'y mandatory'
  // });
  // $('section').css({
  //   'scroll-snap-align': 'start'
  // });


  // (Removed scroll snap CSS for html and section)
  $('html').css({
    'scroll-behavior': 'smooth'
  });

  // Anchor navigation: just smooth scroll (no snap disabling)
  $('.navbar-nav .nav-link[href^="#"]').on('click', function(e) {
    const targetId = $(this).attr('href');
    const $target = $(targetId);
    if ($target.length) {
      e.preventDefault();
      // Calculate offset for fixed header if present
      let headerHeight = 0;
      const $header = $('header');
      if ($header.css('position') === 'fixed' || $header.hasClass('fixed') || $header.hasClass('navbar-fixed-top')) {
        headerHeight = $header.outerHeight() || 0;
      }
      window.scrollTo({
        top: $target.offset().top - headerHeight,
        behavior: 'smooth'
      });
      // Set active nav link immediately
      $('.navbar-nav .nav-link').removeClass('active');
      $(this).addClass('active');
    }
  });

  // Highlight nav link for section in view (IntersectionObserver)
  const sectionIds = $('.navbar-nav .nav-link[href^="#"]').map(function(){
    return $(this).attr('href');
  }).get();
  const navLinks = $('.navbar-nav .nav-link');
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = '#' + entry.target.id;
        if (entry.isIntersecting) {
          navLinks.removeClass('active');
          navLinks.filter(`[href="${id}"]`).addClass('active');
        }
      });
    }, {
      root: null,
      rootMargin: `-${headerHeight + 1}px 0px 0px 0px`,
      threshold: 0.6
    });
    sectionIds.forEach(id => {
      if (id && $(id).length) {
        observer.observe($(id)[0]);
      }
    });
  }

  // Robust fix: Anchor clicks in navbar should smooth scroll, not snap
  $('.navbar-nav .nav-link[href^="#"]').on('click', function(e) {
    const targetId = $(this).attr('href');
    const $target = $(targetId);
    if ($target.length) {
      e.preventDefault();
      // Detect scroll container: html or body
      const $html = $('html');
      const $body = $('body');
      // Disable scroll snap on both (covers all cases)
      $html.css('scroll-snap-type', 'none');
      $body.css('scroll-snap-type', 'none');
      // Calculate offset for fixed header if present
      let headerHeight = 0;
      const $header = $('header');
      if ($header.css('position') === 'fixed' || $header.hasClass('fixed') || $header.hasClass('navbar-fixed-top')) {
        headerHeight = $header.outerHeight() || 0;
      }
      // Perform smooth scroll with offset
      window.scrollTo({
        top: $target.offset().top - headerHeight,
        behavior: 'smooth'
      });
      // Re-enable snap after scroll completes (longer timeout for reliability)
      setTimeout(function() {
        $html.css('scroll-snap-type', 'y mandatory');
        $body.css('scroll-snap-type', 'y mandatory');
      }, 1000);
    }
  });
  
  // Restore images gallery effect
  $('.images-gallery-wrapper').mousemove(function(event) {
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    $('.images-gallery img').each(function() {
      const img = $(this);
      const randomX = Math.random() * 10 - 5;  // Random X offset between -5px and 5px
      img.css('transform', `translate(${randomX + (mouseX / 100)}px)`);
    });
  });
  
  // Setup video handlers
  $('#watchTutorial').on('click', function() {
    var videoSrc = $(this).data('src');
    $('#videoModal iframe').attr('src', videoSrc);
    $('#videoModal').fadeIn();
  });
  
  $('#videoModal .close').on('click', function() {
    $('#videoModal iframe').attr('src', '');
    $('#videoModal').fadeOut();
  });
}

/**
 * Main application initialization
 */
async function initApplication() {
  try {
    console.log('Initializing application...');
    
    // 1. Initialize general UI enhancements first
    initUIEnhancements();
    console.log('UI enhancements initialized');
    
    // 2. Initialize SpotAI carousel
    const spotAIResult = await initSpotAI();
    console.log('SpotAI module initialized:', spotAIResult ? 'success' : 'failed');
    
    // 3. Initialize FightingAI grid/modal
    const fightingAIResult = await initFightingAI();
    console.log('FightingAI module initialized:', fightingAIResult ? 'success' : 'failed');
    
    console.log('Application initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing application:', error);
    // Display a general error message
    $('body').prepend('<div class="alert alert-danger m-3">Error initializing the application. Please refresh and try again.</div>');
    return false;
  }
}

// Start the application when the DOM is ready
$(document).ready(function() {
  initApplication();
});
