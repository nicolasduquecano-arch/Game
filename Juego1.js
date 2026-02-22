jugador_vivo=vida_Jugador>0
enemigo_vivo=vida_Enemigo>0
const resultado=vida_Jugador>0?"ganaste":"perdiste"
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Variables del jugador
let vida_Jugador = 100;
let vida_Enemigo = 80;
let defendiendo = false;

function mostrar_Estado() {
    console.log("\n=== ESTADO ===");
    console.log("Jugador:", vida_Jugador);
    console.log("Enemigo:", vida_Enemigo);
}

function menu() {
    mostrar_Estado();

    console.log("\nElige una acción:");
    console.log("1. Atacar");
    console.log("2. Defender");
    console.log("3. Curarse");

    rl.question("Opción: ", (opcion) => {
        console.log("Elegiste:", opcion);
        rl.close();
    });
}

menu();