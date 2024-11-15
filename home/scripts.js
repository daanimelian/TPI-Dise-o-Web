$(document).ready(function () {
    // Placeholder for future jQuery functionality, e.g., animations or form handling
    $('#login-button').click(function() {
        alert('Login functionality goes here.');
    });

    $('#cart-button').click(function() {
        alert('Carrito functionality goes here.');
    });
});

$(document).ready(function () {
    $(".bxslider").bxSlider({
      mode: "horizontal",
      randomStart: true,
      keyboardEnabled: true,
    });
  });

function initMap() {
    // Configuración inicial del mapa.
    const mapOptions = {
        center: { lat: -34.59878302067477, lng: -58.468255415001515 }, // Coordenadas de ejemplo
        zoom: 15,
    };

    // Inicializa el mapa en el div con id "map".
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Añadir marcador.
    const marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: "¡Estamos aquí!",
    });
}

