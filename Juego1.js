const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Variables del jugador
let vida_Jugador = 100;
let vida_Enemigo = 80;
let defendiendo = false;
let ronda = 1;

function mostrar_Estado() {
    console.log('\n=== ESTADO ===');
    console.log('Jugador:', vida_Jugador);
    console.log('Enemigo:', vida_Enemigo);
}

function ataque_Jugador() {
    const daño = Math.floor(Math.random() * 11) + 10;
    console.log(`Atacaste e hiciste ${daño} de daño`);
    vida_Enemigo -= daño;
}

function ataque_Enemigo() {
    let daño = Math.floor(Math.random() * 10) + 8;
    if (defendiendo) {
        daño = Math.floor(daño / 2);
        console.log('Defendiste y redujiste el daño');
    }
    console.log(`El enemigo atacó e hizo ${daño} de daño`);
    vida_Jugador -= daño;
    defendiendo = false;
}

function verificar_Vida() {
    if (vida_Enemigo <= 0 && vida_Jugador > 0) {
        console.log('\nDerrotaste al enemigo!');
        ronda++;
        vida_Enemigo = 80 + (ronda * 20);
        vida_Jugador += 20;
        console.log(`Recuperaste vida. Nueva vida: ${vida_Jugador}`);
        console.log(`Comienza la ronda ${ronda}`);
        return menu();
    }

    if (vida_Jugador <= 0 && vida_Enemigo > 0) {
        console.log('\nPERDISTE');
        rl.close();
        return;
    }

    if (vida_Jugador <= 0 && vida_Enemigo <= 0) {
        console.log('\nEMPATE');
        rl.close();
        return;
    }
}

function menu() {
    mostrar_Estado();
    console.log('\nElige una acción:');
    console.log('1. Atacar');
    console.log('2. Defender');
    console.log('3. Curarse');

    rl.question('Opción: ', (opcion) => {
        if (opcion === '1') {
            ataque_Jugador();
        } else if (opcion === '2') {
            defendiendo = true;
            console.log('Te preparas para defender');
        } else if (opcion === '3') {
            vida_Jugador += 15;
            console.log('Te curaste 15 de vida');
        } else {
            console.log('Opción inválida');
            return menu();
        }

        if (vida_Enemigo > 0) {
            ataque_Enemigo();
        }

        verificar_Vida();
    });
}

menu();