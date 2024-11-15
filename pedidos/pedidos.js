const orders = [
  {
    status: "ENTREGADO",
    date: "01 de nov",
    items: 5,
    price: "19,555",
    paymentMethod: "Efectivo"
  },
  {
    status: "ENTREGADO",
    date: "22 de sep",
    items: 2,
    price: "2,570",
    paymentMethod: "Mercado Pago"
  }
];

let currentOrder = {
  id: 2255,
  status: "pedido confirmado",
  estimatedTime: calculateEstimatedTime(30)
};

// Función para calcular la fecha y hora estimada
function calculateEstimatedTime(minutesToAdd) {
  const now = new Date();
  const estimatedTime = new Date(now.getTime() + minutesToAdd * 60000);
  const options = {
    hour: '2-digit',
    minute: '2-digit'
  };
  const startTime = now.toLocaleTimeString('es-ES', options);
  const endTime = estimatedTime.toLocaleTimeString('es-ES', options);
  return `${startTime} - ${endTime}`;
}

// Función para mostrar el estado del pedido actual
function displayCurrentOrder() {
  const orderStatusContainer = document.querySelector(".order-status");
  orderStatusContainer.innerHTML = `
    <p>Pedido #${currentOrder.id}</p>
    <p>${getOrderStatusMessage(currentOrder.status)}</p>
    <div class="time">
      <span class="icon">🕒</span>
      <span>${currentOrder.estimatedTime}</span>
    </div>
  `;
}

// Función para obtener el mensaje según el estado del pedido
function getOrderStatusMessage(status) {
  switch (status) {
    case "pedido confirmado":
      return "Tu pedido ha sido confirmado.";
    case "estamos preparando el pedido":
      return "Estamos preparando tu pedido.";
    case "el delivery esta en camino":
      return "El repartidor está en camino con tu pedido.";
    case "ENTREGADO":
      return "Tu pedido ha sido entregado.";
    default:
      return "Estado desconocido.";
  }
}

// Función para actualizar el estado del pedido
function updateOrderStatus() {
  if (currentOrder.status === "pedido confirmado") {
    currentOrder.status = "estamos preparando el pedido";
  } else if (currentOrder.status === "estamos preparando el pedido") {
    currentOrder.status = "el delivery esta en camino";
  } else if (currentOrder.status === "el delivery esta en camino") {
    currentOrder.status = "ENTREGADO";
    moveOrderToHistory();
  }
  displayCurrentOrder();
}

// Función para mover el pedido al historial una vez entregado
function moveOrderToHistory() {
  orders.push({
    status: currentOrder.status,
    date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
    items: 3,
    price: "20,000",
    paymentMethod: "Tarjeta"
  });
  displayOrderHistory();
}

// Función para mostrar el historial de pedidos
function displayOrderHistory() {
  const orderHistoryContainer = document.getElementById("orderHistoryContainer");
  const noOrdersMessage = document.getElementById("noOrdersMessage");

  if (orders.length === 0) {
    noOrdersMessage.style.display = "block";
  } else {
    noOrdersMessage.style.display = "none";
    orderHistoryContainer.innerHTML = "";
    orders.forEach((order) => {
      const orderCard = document.createElement("div");
      orderCard.className = "order-card";
      orderCard.innerHTML = `
        <p><strong>${order.status}</strong></p>
        <p>${order.date} • ${order.items} productos</p>
        <p>- $${order.price} - ${order.paymentMethod}</p>
        <div class="actions">
          <a href="#" class="action-link">Opinar</a>
          <span>|</span>
          <a href="#" class="action-link">Repetir</a>
        </div>
      `;
      orderHistoryContainer.appendChild(orderCard);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayOrderHistory();
  displayCurrentOrder();
});


setInterval(updateOrderStatus, 6000);

// Activar y desactivar el menú en dispositivos móviles
document.querySelector(".navbar-toggler").addEventListener("click", () => {
  document.querySelector(".navbar-menu").classList.toggle("active");
});
