import { Carta } from "./carta.js";
import { crearCarta, meterCarta } from "./util_cartas.js"

document.addEventListener("DOMContentLoaded", cargarGuardados);

function cargarGuardados() {
    const contenedor = document.getElementById("cartas");
    contenedor.innerHTML = "";

    let datos = JSON.parse(localStorage.getItem("cartas"));
    if (datos === null) datos = [];
    const mostrarBoton = false;

    datos.forEach(datoCarta => {
        meterCarta(contenedor, crearCarta(datoCarta), mostrarBoton)
    });
}

window.ordenarPorValor = () => {
    let cartas = JSON.parse(localStorage.getItem("cartas"));
    if (cartas === null) cartas = [];

    cartas.sort((a, b) => a.value.localeCompare(b.value));

    localStorage.setItem("cartas", JSON.stringify(cartas));

    cargarGuardados();
};