// Inicializa los puntos disponibles
let puntosDisponibles = 500;

function canjearPuntos(costo) {
    // Verifica si hay suficientes puntos disponibles
    if (puntosDisponibles >= costo) {
        puntosDisponibles -= costo; // Resta los puntos
        // Actualiza la visualización de puntos
        document.getElementById("total-puntos").innerText = puntosDisponibles;
        document.getElementById("puntos-disponibles").innerText = puntosDisponibles;
        alert("¡Canje realizado! Has gastado " + costo + " puntos.");
    } else {
        alert("No tienes suficientes puntos para este canje.");
    }
}