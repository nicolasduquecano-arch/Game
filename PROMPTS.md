# Prompts básicos para generar el juego `Juego1.js`

Este archivo contiene prompts (en español) que puedes usar con un modelo de lenguaje para generar paso a paso el juego de consola mostrado en `Juego1.js`.

---

## 1) Prompt inicial — descripción del proyecto

"Escribe un juego de combate por turnos en Node.js que funcione por consola. Requisitos:
- Usar `readline` para entrada/salida.
- Un jugador y un enemigo con puntos de vida.
- Acciones: atacar, defender, curarse.
- Sistema de rondas: al derrotar al enemigo, comienza la siguiente ronda con un enemigo más fuerte.
- Tope de vida para el jugador (por ejemplo 100).
- Mensajes claros e inmersivos.
- Manejar entrada inválida y permitir salir con 'q'.
Devuelve el código completo en un solo archivo llamado `Juego1.js`."

**Resultado esperado:** archivo Node.js funcional con la estructura básica del juego.

---

## 2) Prompt para la estructura básica y constantes

"Genera la estructura del archivo:
- import de `readline`
- constantes: `MAX_VIDA_JUGADOR`, `ENEMIGO_VIDA_BASE`
- variables de estado: `vida_Jugador`, `vida_Enemigo`, `defendiendo`, `ronda`
- funciones vacías: `mostrar_Estado()`, `ataque_Jugador()`, `ataque_Enemigo()`, `verificar_Vida()`, `menu()`
Devuélvelo como código listo para completar." 

**Resultado esperado:** esqueleto del juego con comentarios donde implementar lógica.

---

## 3) Prompt para la lógica de ataque y defensa

"Implementa `ataque_Jugador()` y `ataque_Enemigo()`:
- `ataque_Jugador()` debe hacer daño aleatorio entre 10 y 20 y restarlo a `vida_Enemigo`.
- `ataque_Enemigo()` hace daño aleatorio entre 8 y 17; si `defendiendo` es true, reducir a la mitad.
- Evitar valores negativos (clamp a 0).
Incluye mensajes descriptivos de la acción." 

**Resultado esperado:** funciones que actualizan vidas y imprimen lo que sucede.

---

## 4) Prompt para la verificación de vidas y rondas

"Implementa `verificar_Vida()` para:
- Si `vida_Enemigo <= 0` y `vida_Jugador > 0`: aumentar `ronda`, generar nuevo `vida_Enemigo` (base + 20*(ronda-1)), curar al jugador +20 sin superar `MAX_VIDA_JUGADOR`, y volver a `menu()`.
- Si `vida_Jugador <= 0` y `vida_Enemigo > 0`: cerrar `readline` y finalizar con mensaje de derrota.
- Si ambos <= 0: declarar empate y cerrar `readline`.
- Si nadie muere: volver a `menu()` para continuar el turno.
Asegúrate de usar retornos/llamadas para no dejar el flujo estancado." 

**Resultado esperado:** transición correcta entre rondas y fin del juego.

---

## 5) Prompt para el menú y validación de entrada

"Implementa `menu()`:
- Mostrar estado y opciones: 1=Atacar, 2=Defender, 3=Curarse, q=Salir.
- Validar entrada (trim y toLowerCase) y manejar entradas inválidas pidiendo de nuevo.
- Aplicar la acción elegida, ejecutar `ataque_Enemigo()` si el enemigo sigue vivo, y llamar a `verificar_Vida()` al final.
- No uses promesas externas; usa callbacks de `rl.question`.
Incluye mensajes inmersivos y claros." 

**Resultado esperado:** ciclo de juego interactivo y robusto ante entradas inválidas.

---

## 6) Prompt para pulir UX y detalles

"Añade:
- Manejo de Ctrl+C para cerrar readline limpiamente.
- Mensajes más inmersivos al inicio y entre rondas.
- Tope de curación para que `vida_Jugador` no supere `MAX_VIDA_JUGADOR`.
- Comentarios claros en todas las funciones.
Devuélvelo como el archivo final listo para ejecutar." 

**Resultado esperado:** juego con buena experiencia de consola y documentación inline.

---

## 7) Prompt para pruebas manuales y ejemplo de ejecución

"Proporciona 3 escenarios de prueba manual:
1) Atacar repetidamente hasta derrotar al enemigo.
2) Defender y ver reducción de daño.
3) Curarse cuando la vida está cerca del tope.
Incluye la secuencia de entradas esperadas y el resultado observable en consola." 

**Resultado esperado:** casos de prueba manual para verificar comportamiento.

---

## 8) Prompt para refactor opcional (mejor mantenimiento)

"Refactoriza el archivo para separar constantes, lógica del juego y la interfaz en funciones pequeñas. Agrega comentarios JSDoc y convierte nombres con caracteres no ASCII (p.ej. `danio` en lugar de `daño`) si prefieres compatibilidad máxima." 

**Resultado esperado:** versión más modular y comentada.

---

## Uso rápido

Para ejecutar el juego generado:

```bash
node Juego1/Juego1.js
```

(ajusta la ruta según la ubicación real del archivo en tu workspace).

---