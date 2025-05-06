// document.addEventListener("DOMContentLoaded", () => {
//     console.log("Welcome to My Static App!");
// });


$(window).on('load', function () {
    $('.figtingWithAISlider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        speed:1000,
        fade:true,
        prevArrow: $('.slider_arrow_left'),
        nextArrow: $('.slider_arrow_right'),
    });
});

  