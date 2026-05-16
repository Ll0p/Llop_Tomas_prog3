import { Carta } from "./carta.js";
import { crearCarta, meterCarta, conseguirCartasStorage } from "./util_cartas.js"

const ordenValores = {
    "ACE": 14,
    "KING": 13,
    "QUEEN": 12,
    "JACK": 11,
    "10": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2
};

document.addEventListener("DOMContentLoaded", cargarGuardados);

function cargarGuardados() {
    const contenedor = document.getElementById("cartas");
    contenedor.innerHTML = "";

    let cartas = conseguirCartasStorage();
    const MOSTRAR_BOTON = false;

    cartas.forEach(datoCarta => {
        meterCarta(contenedor, crearCarta(datoCarta), MOSTRAR_BOTON);
    });
}

window.ordenarPorValor = () => {
    let cartas = conseguirCartasStorage();

    cartas.sort((a, b) => ordenValores[a.value] - ordenValores[b.value]);

    localStorage.setItem("cartas", JSON.stringify(cartas));

    cargarGuardados();
};