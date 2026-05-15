import { Carta } from "./carta.js";

const TOTAL_CARTAS = 52;
const CARTAS_POR_PAGINA = 6;
const MAX_PAGINAS = 9; 
const URL = "https://deckofcardsapi.com/api/deck/new/draw/?count=" + TOTAL_CARTAS;

let cartas = [];
let paginaActual = 1;

document.addEventListener("DOMContentLoaded", () => {
    cargarCartas();
    document.getElementById("siguiente").onclick = irPaginaSiguiente;
    document.getElementById("anterior").onclick = irPaginaAnterior;
});


function cargarCartas() {
    if (cartas.length === 0) {
        fetch(URL)
            .then(conseguirData)
            .then(datos => {
                cartas = datos.cards;
                renderizar();
            })
            .catch(console.log);
    } else {
        renderizar();
    }
    
}

function renderizar() {
    const contenedor = document.getElementById("cartas");
    contenedor.innerHTML = "";

    const inicio = CARTAS_POR_PAGINA * (paginaActual - 1);
    const fin = inicio + CARTAS_POR_PAGINA;

    const meterCarta = (carta) => contenedor.appendChild(carta.createHtmlElement());

    cartas.slice(inicio, fin).forEach(datoCarta => {
        meterCarta(crearCarta(datoCarta))
    });
}

function conseguirData(respuesta) {
    if (!respuesta.ok) {
        throw new Error(`Error de petición: ${respuesta.status}`);
    }
    return respuesta.json();
}

function crearCarta(datos) {
    return new Carta(datos.code, datos.value, datos.suit, datos.image);
}

function irPaginaSiguiente() {
    if (paginaActual < MAX_PAGINAS) { 
        paginaActual++;
        renderizar();
    }
}

function irPaginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        renderizar();
    }
}