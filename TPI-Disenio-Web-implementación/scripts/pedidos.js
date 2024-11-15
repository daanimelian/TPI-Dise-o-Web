let orders = [
  {
    status: "ENTREGADO",
    date: "01 de nov",
    items: 5,
    price: "19,555",
    paymentMethod: "Efectivo",
    opinionSent: false
  },
  {
    status: "ENTREGADO",
    date: "22 de sep",
    items: 2,
    price: "2,570",
    paymentMethod: "Mercado Pago",
    opinionSent: false
  }
];

let currentOrder = {
  id: 2255,
  status: "pedido confirmado",
  estimatedTime: calculateEstimatedTime(30)
};

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

function moveOrderToHistory() {
  orders.push({
    status: currentOrder.status,
    date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
    items: 3,
    price: "20,000",
    paymentMethod: "Tarjeta",
    opinionSent: false
  });
  displayOrderHistory();
  checkNoPendingOrders();
}

function displayOrderHistory() {
  const orderHistoryContainer = document.getElementById("orderHistoryContainer");
  const noOrdersMessage = document.getElementById("noOrdersMessage");

  if (orders.length === 0) {
    noOrdersMessage.style.display = "block";
  } else {
    noOrdersMessage.style.display = "none";
    orderHistoryContainer.innerHTML = "";
    orders.forEach((order, index) => {
      const orderCard = document.createElement("div");
      orderCard.className = "order-card";
      orderCard.innerHTML = `
        <p><strong>${order.status}</strong></p>
        <p>${order.date} • ${order.items} productos</p>
        <p>- $${order.price} - ${order.paymentMethod}</p>
        <div class="actions">
          ${
            order.opinionSent
              ? '<span class="opinion-sent">Opinión enviada</span>'
              : `<a href="#" class="action-link" onclick="enableOpinionInput(${index}, event)">Opinar</a>`
          }
          <span>|</span>
          <a href="#" class="action-link reorder">Repetir</a>
        </div>
      `;
      orderHistoryContainer.appendChild(orderCard);
    });
  }
}

function checkNoPendingOrders() {
  if (orders.filter(order => order.status !== "ENTREGADO").length === 0) {
    const orderStatusContainer = document.querySelector(".order-status");
    orderStatusContainer.innerHTML = "<p>No hay pedidos en curso.</p>";
  }
}

function startOrderProcessing() {
  const processingInterval = setInterval(() => {
    if (currentOrder.status !== "ENTREGADO") {
      updateOrderStatus();
    } else {
      clearInterval(processingInterval);
    }
  }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
  displayOrderHistory();
  displayCurrentOrder();
  startOrderProcessing();
});

function enableOpinionInput(index, event) {
  event.preventDefault();

  const order = orders[index];
  if (order.opinionSent) return;

  const opinionBox = document.createElement("div");
  opinionBox.className = "opinion-box";
  opinionBox.innerHTML = `
    <textarea id="opinionInput" placeholder="Escribe tu opinión..." rows="4" cols="50"></textarea>
    <button class="submit-opinion" onclick="submitOpinion(${index})">Enviar Opinión</button>
  `;

  const actionsContainer = event.target.closest(".actions");
  actionsContainer.appendChild(opinionBox);

  event.target.style.pointerEvents = "none";
  event.target.style.color = "#aaa";
}

function submitOpinion(index) {
  const opinionInput = document.getElementById("opinionInput");
  const order = orders[index];

  if (opinionInput.value.trim() === "") {
    alert("Por favor, escribe una opinión.");
    return;
  }

  order.opinionSent = true;

  alert("Gracias por tu opinión!");

  const opinionLink = document.querySelector(`.order-card:nth-child(${index + 1}) .action-link`);
  opinionLink.innerHTML = "Opinión enviada";
  opinionLink.style.pointerEvents = "none";
  opinionLink.style.color = "#aaa";

  const opinionBox = document.querySelector(".opinion-box");
  opinionBox.remove();

  displayOrderHistory();
}
