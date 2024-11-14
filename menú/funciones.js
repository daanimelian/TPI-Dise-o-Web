$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 5,
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
var botonesVerMas = document.getElementsByClassName("boton-ver-mas");

for (var i = 0; i < botonesVerMas.length; i++) {
  botonesVerMas[i].addEventListener("click", function () {
    // Selecciona el contenedor de las tarjetas (puede estar dentro de un contenedor específico)
    var extraCards = this.nextElementSibling; // Asumimos que el contenedor de tarjetas está justo después del botón

    if (
      extraCards.style.display === "none" ||
      extraCards.style.display === ""
    ) {
      extraCards.style.display = "flex"; // Muestra las tarjetas adicionales
      this.innerText = "Ver menos"; // Cambia el texto del botón
    } else {
      extraCards.style.display = "none"; // Oculta las tarjetas
      this.innerText = "Ver más"; // Cambia el texto del botón
    }
  });
}
