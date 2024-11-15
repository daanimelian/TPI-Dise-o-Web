$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 5,
    responsiveClass: true,
    autoplay: true,
    dots: true,
    navText: ["<", ">"],
    mouseDrag: true,

    autoplayHoverPause: true,
    autoplaySpeed: 1500,
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
        mouseDrag: false,
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

      // Inicializa las tarjetas para que funcionen con el carrito
      var newCards = extraCards.querySelectorAll(".card-column.d-none"); // Selecciona las tarjetas que están ocultas
      newCards.forEach((card) => {
        card.classList.remove("d-none"); // Elimina la clase para hacerlas visibles
        initializeProductCard(card); // Inicializa la funcionalidad del carrito en cada tarjeta
      });
    } else {
      extraCards.style.display = "none"; // Oculta las tarjetas
      this.innerText = "Ver más"; // Cambia el texto del botón

      // Opcional: Puedes reocultar las tarjetas con `d-none` si lo necesitas
      var visibleCards = extraCards.querySelectorAll(".card-column");
      visibleCards.forEach((card) => {
        card.classList.add("d-none"); // Reoculta las tarjetas
      });
    }
  });
}

// Objeto simple para simular el carrito
// Objeto simple para simular el carrito
// Objeto simple para simular el carrito
// Objeto simple para simular el carrito
const cart = {
  items: [],
  addItem(item) {
    const existingItem = this.items.find((i) => i.name === item.name);
    if (existingItem) {
      // Incrementa la cantidad si el producto ya existe
      existingItem.quantity += 1;
    } else {
      // Añade un nuevo producto al carrito con cantidad inicial de 1
      this.items.push({ ...item, quantity: 1 });
    }
    this.updateTotal();
  },
  removeItem(itemName) {
    const existingItem = this.items.find((i) => i.name === itemName);
    if (existingItem) {
      // Decrementa la cantidad si el producto existe y reduce la cantidad
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        // Elimina el producto si la cantidad llega a cero
        this.items = this.items.filter((i) => i.name !== itemName);
      }
    }
    this.updateTotal();
  },
  updateTotal() {
    const total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Formatear el total a pesos argentinos
    const formatter = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });

    document.getElementById("cart-total").textContent = formatter.format(total);
  },
};

// Función para inicializar la tarjeta de producto
function initializeProductCard(card) {
  const addOneBtn = card.querySelector(".add-one");
  const removeOneBtn = card.querySelector(".remove-one");
  const quantityDisplay = card.querySelector(".quantity");

  let quantity = 0;
  const productName = addOneBtn.getAttribute("data-name");
  const productPrice = parseFloat(addOneBtn.getAttribute("data-price"));

  // Evento para añadir uno al contador y actualizar el carrito
  addOneBtn.addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;

    // Añade el producto al carrito o incrementa la cantidad si ya está en el carrito
    cart.addItem({
      name: productName,
      price: productPrice,
    });
  });

  // Evento para quitar uno al contador y actualizar el carrito
  removeOneBtn.addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      quantityDisplay.textContent = quantity;

      // Decrementa la cantidad del producto en el carrito o lo elimina si llega a cero
      cart.removeItem(productName);
    }
  });
}

// Inicializa todas las tarjetas de producto en la página
document.querySelectorAll(".card").forEach(initializeProductCard);
