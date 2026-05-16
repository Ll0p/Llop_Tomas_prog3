import { Carta } from "./carta.js";

export function crearCarta(datos) {
    return new Carta(datos.code, datos.value, datos.suit, datos.image || datos.imagen);
}

export function meterCarta(contenedor, carta, mostrarGuardado) {
    contenedor.appendChild(carta.createHtmlElement(mostrarGuardado));
}