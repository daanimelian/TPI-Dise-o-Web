document.addEventListener('DOMContentLoaded', function () {
  // Placeholder para futuras funcionalidades, como animaciones o manejo de formularios
  const loginButton = document.getElementById('login-button');
  const cartButton = document.getElementById('cart-button');

  if (loginButton) {
      loginButton.addEventListener('click', function () {
          alert('Login functionality goes here.');
      });
  }

  if (cartButton) {
      cartButton.addEventListener('click', function () {
          alert('Carrito functionality goes here.');
      });
  }

  // Inicialización de bxSlider usando JavaScript puro
  if (typeof jQuery !== 'undefined' && jQuery('.bxslider').bxSlider) {
      jQuery('.bxslider').bxSlider({
          mode: "horizontal",
          randomStart: true,
          keyboardEnabled: true,
      });
  }
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

// Selecciona todas las secciones de hamburguesas
const burgerSections = document.querySelectorAll('.burger-section');

window.addEventListener('scroll', () => {
  // Detecta el scroll y ajusta la visibilidad de cada sección
  burgerSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.clientHeight;

      // Agrega la clase 'active' si la sección está en el viewport
      if (sectionTop < window.innerHeight && sectionTop + sectionHeight > 0) {
          section.classList.add('active');
      } else {
          section.classList.remove('active');
      }
  });
});
