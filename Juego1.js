const readline = require('readline');

// Interfaz de entrada/salida
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- Constantes y estado del juego ---
const MAX_VIDA_JUGADOR = 100; // tope de vida del jugador
const ENEMIGO_VIDA_BASE = 80; // vida base del primer enemigo

let vida_Jugador = MAX_VIDA_JUGADOR;
let vida_Enemigo = ENEMIGO_VIDA_BASE;
let defendiendo = false;
let ronda = 1;

// Muestra el estado actual: ronda y vidas (clamped a 0)
function mostrar_Estado() {
    const pj = Math.max(0, vida_Jugador);
    const pe = Math.max(0, vida_Enemigo);
    console.log(`\n=== RONDA ${ronda} — ESTADO ===`);
    console.log('Jugador:', pj, `/${MAX_VIDA_JUGADOR}`);
    console.log('Enemigo:', pe);
}

// Acción de ataque del jugador (daño aleatorio)
function ataque_Jugador() {
    const daño = Math.floor(Math.random() * 11) + 10; // 10-20
    console.log(`Atacas al enemigo y le infliges ${daño} puntos de daño.`);
    vida_Enemigo -= daño;
    if (vida_Enemigo < 0) vida_Enemigo = 0;
}

// Acción de ataque del enemigo (respeta si el jugador defiende)
function ataque_Enemigo() {
    let daño = Math.floor(Math.random() * 10) + 8; // 8-17
    if (defendiendo) {
        daño = Math.floor(daño / 2);
        console.log('Te mantienes firme: la defensa reduce el daño recibido.');
    }
    console.log(`El enemigo contraataca y hace ${daño} puntos de daño.`);
    vida_Jugador -= daño;
    if (vida_Jugador < 0) vida_Jugador = 0;
    defendiendo = false; // la defensa se consume en el golpe
}

// Verifica condiciones de fin de combate y maneja transición de rondas
function verificar_Vida() {
    // Si el enemigo muere y el jugador sigue con vida, se avanza de ronda
    if (vida_Enemigo <= 0 && vida_Jugador > 0) {
        console.log('\nHas derrotado al enemigo de esta ronda!');
        ronda++;
        // Aumenta dificultad: vida del siguiente enemigo
        vida_Enemigo = ENEMIGO_VIDA_BASE + (ronda - 1) * 20;
        // Curación entre rondas, sin superar el tope
        vida_Jugador = Math.min(MAX_VIDA_JUGADOR, vida_Jugador + 20);
        console.log(`Te recuperas tras la batalla. Vida: ${vida_Jugador}/${MAX_VIDA_JUGADOR}`);
        console.log(`Te enfrentas ahora a un enemigo más fuerte (Ronda ${ronda}).`);
        return menu(); // iniciar siguiente ronda
    }

    // Si el jugador muere
    if (vida_Jugador <= 0 && vida_Enemigo > 0) {
        console.log('\nHas sido derrotado... El viaje termina aquí.');
        console.log(`Llegaste hasta la ronda ${ronda}.`);
        rl.close();
        return;
    }

    // Si ambos caen
    if (vida_Jugador <= 0 && vida_Enemigo <= 0) {
        console.log('\nAmbos cayeron: empate épico.');
        rl.close();
        return;
    }

    // Si nadie ha muerto, continuar con el siguiente turno (nuevo prompt)
    return menu();
}

// Menú principal: elige acción (1/2/3) o salir con 'q'
function menu() {
    mostrar_Estado();
    console.log('\nElige una acción:');
    console.log('1. Atacar');
    console.log('2. Defender');
    console.log('3. Curarse (15 puntos)');
    console.log("Escribe 'q' para rendirte y salir.");

    rl.question('Opción: ', (entrada) => {
        const opcion = (entrada || '').toString().trim().toLowerCase();

        // Opción para salir inmediatamente
        if (opcion === 'q' || opcion === 'salir') {
            console.log('\nTe retiras. Hasta la próxima aventura.');
            rl.close();
            return;
        }

        if (opcion === '1') {
            ataque_Jugador();
        } else if (opcion === '2') {
            defendiendo = true;
            console.log('Te pones en guardia, listo para amortiguar el siguiente golpe.');
        } else if (opcion === '3') {
            vida_Jugador += 15;
            // Aplicar tope de vida
            if (vida_Jugador > MAX_VIDA_JUGADOR) vida_Jugador = MAX_VIDA_JUGADOR;
            console.log('Te aplicas un vendaje y recuperas 15 puntos de vida.');
        } else {
            console.log('Opción inválida — escribe 1, 2, 3 o q.');
            return menu(); // pedir opción de nuevo
        }

        // Turno del enemigo si sigue vivo
        if (vida_Enemigo > 0) {
            ataque_Enemigo();
        }

        // Revisar estado tras los turnos
        verificar_Vida();
    });
}

// Manejo de Ctrl+C para cerrar readline de forma limpia
process.on('SIGINT', () => {
    console.log('\nInterrupción recibida. Saliendo...');
    rl.close();
    process.exit();
});

// Inicia el juego
console.log('Bienvenido — prepárate para la batalla!');
menu();