$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 7,
    responsiveClass: true,
    autoplay: true,
    dots: true,

    autoplayHoverPause: true,
    autoplaySpeed: 1000,
    responsive: {
      0: {
        items: 1,
        nav: false,
        loop: true,
      },
      600: {
        items: 2,
        nav: false,
        loop: true,
      },
      1000: {
        items: 3,
        nav: true,
        loop: true,
      },
    },
  });
});
