let datosMedioPago = {};

function asociarTarjeta() {
    const numeroTarjeta = document.getElementById("numeroTarjeta").value.trim();
    const fechaExpiracion = document.getElementById("fechaExpiracion").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    const validaciones = {
        tarjeta: numeroTarjeta.length === 16 && /^\d+$/.test(numeroTarjeta),
        fecha: /^\d{2}\/\d{2}$/.test(fechaExpiracion),
        cvv: /^\d{3}$/.test(cvv)
    };

    if (validaciones.tarjeta && validaciones.fecha && validaciones.cvv) {
        datosMedioPago = { numeroTarjeta, fechaExpiracion, cvv };
        document.getElementById("botonMedioPago").textContent = "Cambiar medios de pago asociados";
        const modal = bootstrap.Modal.getInstance(document.getElementById("asociarMediosModal"));
        modal.hide();
        document.getElementById("medioPagoForm").reset();
    } else {
        let errores = [];
        if (!validaciones.tarjeta) errores.push("El número de tarjeta debe tener 16 dígitos.");
        if (!validaciones.fecha) errores.push("La fecha debe estar en formato MM/AA.");
        if (!validaciones.cvv) errores.push("El CVV debe tener 3 dígitos.");
        
        alert("Por favor, corrige los siguientes errores:\n" + errores.join("\n"));
    }
}

document.getElementById("botonMedioPago").addEventListener("click", () => {
    if (Object.keys(datosMedioPago).length !== 0) {
        document.getElementById("numeroTarjeta").value = datosMedioPago.numeroTarjeta;
        document.getElementById("fechaExpiracion").value = datosMedioPago.fechaExpiracion;
        document.getElementById("cvv").value = datosMedioPago.cvv;
    }
});

document.getElementById("fechaExpiracion").addEventListener("input", function(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    e.target.value = value;
});

document.getElementById("numeroTarjeta").addEventListener("input", function(e) {
    e.target.value = e.target.value.replace(/\D/g, "");
});

document.getElementById("cvv").addEventListener("input", function(e) {
    e.target.value = e.target.value.replace(/\D/g, "");
});

let puntosDisponibles = 5000;
const maxPuntos = 10000;

function actualizarPuntos() {
    document.getElementById("total-puntos").innerText = `${puntosDisponibles}/${maxPuntos}`;
    document.getElementById("puntos-disponibles").innerText = puntosDisponibles;
    const porcentaje = (puntosDisponibles / maxPuntos) * 100;
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = `${porcentaje}%`;
    progressBar.setAttribute("aria-valuenow", porcentaje);
}

function canjearPuntos(costo) {
    if (puntosDisponibles >= costo) {
        puntosDisponibles -= costo;
        actualizarPuntos();
        document.getElementById("canjeMensaje").innerText = `¡Canje realizado! Has gastado ${costo} puntos.`;
        new bootstrap.Modal(document.getElementById("canjeModal")).show();
    } else {
        document.getElementById("canjeMensaje").innerText = "No tienes suficientes puntos para este canje.";
        new bootstrap.Modal(document.getElementById("canjeModal")).show();
    }
}

actualizarPuntos();