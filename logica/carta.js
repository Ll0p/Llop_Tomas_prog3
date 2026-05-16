import { conseguirCartasStorage } from "./util_cartas.js"

export class Carta {
    code // string
    value // string
    suit // string
    imagen // string (ES EL URL DE LA IMAGEN)

    constructor(code, value, suit, imagen) {
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.imagen = imagen;
    }

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(json) {
        const datos = JSON.parse(json);
        return new Carta(
            datos.code,
            datos.value,
            datos.suit,
            datos.imagen
        );
    }

    createHtmlElement(mostrarBoton = true){
        const div = document.createElement("div");
        const code = document.createElement("h3");
        const value = document.createElement("p");
        const suit = document.createElement("p");
        const imagen = document.createElement("img");

        imagen.addEventListener("click", () => {
            window.open(this.imagen, "_blank");
        });

        div.className = "carta";

        const claseTexto = "texto";
        code.className = claseTexto;
        value.className = claseTexto;
        suit.className = claseTexto;

        code.textContent = this.code;
        value.textContent = this.value;
        suit.textContent = this.suit;
        imagen.src = this.imagen;

        div.append(code, imagen, value, suit);
        
        if (mostrarBoton) {
            const botonGuardado = document.createElement("button");
            botonGuardado.textContent = "Guardar";


            botonGuardado.addEventListener("click", () => {
                Carta.guardarCarta(this);
            });

            div.append(botonGuardado)
        }

        return div;
    }

    static guardarCarta(carta) {
        let cartas = conseguirCartasStorage();

        const existe = cartas.some(c => c.code === carta.code);

        if (!existe) {
            cartas.push(carta);
            localStorage.setItem("cartas", JSON.stringify(cartas));
        } else {
            window.alert("La carta ya está en la colección.");
        }
    }

}
