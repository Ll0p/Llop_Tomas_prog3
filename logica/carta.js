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

    createHtmlElement(){
        const div = document.createElement("div");
        const code = document.createElement("h3");
        const value = document.createElement("p");
        const suit = document.createElement("p");
        const imagen = document.createElement("img");
        const botonGuardado = document.createElement("button");

        imagen.addEventListener("click", () => {
            window.open(this.imagen, "_blank");
        });

        botonGuardado.addEventListener("click", () => {
            Carta.guardarCarta(this);
        });

        div.className = "carta";
        code.textContent = this.code;
        value.textContent = this.value;
        suit.textContent = this.suit;
        imagen.src = this.imagen;
        botonGuardado.textContent = "Guardar";

        div.append(code, imagen, value, suit, botonGuardado);
        
        return div;
    }

    static guardarCarta(carta) {
        let cartas = JSON.parse(localStorage.getItem("cartas"));
        if (cartas === null) cartas = [];

        const existe = cartas.some(c => c.code === carta.code);

        if (!existe) {
            cartas.push(carta);
            localStorage.setItem("cartas", JSON.stringify(cartas));
        } else {
            window.alert("La carta ya está en la colección.");
        }
    }

}
