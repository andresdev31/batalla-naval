import Swal from "sweetalert2";
import {
  generarMatriz2Html,
  generarMatrizJug1Def,
  randomBarcos,
  randomBarcos2,
  matrizJug1,
  matrizAtaque,
  matrizJug2,
  coordOcupadas2,
  coordOcupadas1, 
  limpiarMatriz,
} from "./barcos.js";

// Exportar variables importantes
export let turnoActual = -1;
export let cordAtaqueExitoMaquina = [];
export let coordAtaqueExitoJug = [];
export let filaAtaqueMaquina;
export let columnaAtaqueMaquina;
export let cordAtaqueFallidoMaquina;
export let arrClicks = [];
export let verificacionGanoMaquina = false;
export let verificacionGanoJug = false;

// Función del boton jugar en el menú
export function botonJuego() {
  const botonJugar = document.getElementById("botonJugar");
  const menu = document.getElementById("menu");
  const juego = document.getElementById("reordenarBarcos");
  const botonVolumen = document.getElementById("volumenControl");
  botonJugar.addEventListener("click", function () {
    menu.style.display = "none";
    botonVolumen.style.display = "none";
    juego.style.display = "flex";
  });
}

// Función para uso del boton jugar
export function IniciarJuego() {
  // Boton de jugar de la pantalla de reordenar
  const botonPlay = document.getElementById("botonJugar2");
  // Pantalla del menu
  const menu = document.getElementById("menu");
  // Pantalla del reordenar barcos
  const reordenar = document.getElementById("reordenarBarcos");
  // Pantalla del juego principal
  const juegoPrincipal = document.getElementById("juegoPrincipal");
  const botonVolumen = document.getElementById("volumenControl");

  botonPlay.addEventListener("click", function () {
    menu.style.display = "none";
    reordenar.style.display = "none";
    botonVolumen.style.display = "none";
    juegoPrincipal.style.display = "flex";
    console.log(matrizJug2);
    generarMatrizJug1Def(matrizJug1);
    generarMatriz2Html(matrizAtaque);
  });
}

// Función para pantalla de settings
export function settings() {
  const settings = document.getElementById("botonAjustes");
  // Pantalla del menu
  const menu = document.getElementById("menu");
  const botonVolumen = document.getElementById("volumenControl");
  settings.addEventListener("click", function () {
    menu.style.display = "none";
    botonVolumen.style.display = "flex";
    alertaIntento;
  });
}

// Función para iniciar juego desde la pantalla jugar
export function juego() {
  // Boton jugar de la pantalla del juego
  const play = document.getElementById("jugar");

  play.addEventListener("click", function () {
    play.style.display = "none";
    turnoActual = 0;
    turnos();
  });
}

// Función para el turno del jugador
export function iniciarMovJugador() {
  let coordAtaqueExitoJug = [];
  let cordAtaqueFallidoJug = [];

  Swal.fire({
    html: "<h2>It´s your turn!!</h2>",
    icon: "info",
    confirmButtonText: "Aceptar",
    background: "#053966",
    backdrop: "rgba(0, 0, 0, 0.5)",
  });
  document
      .getElementById("matriz2Div")
      .addEventListener("click", manejarClickCelda);

  function manejarClickCelda(event) {
    let filaClick = 0;
    let columnaClick = 0;

    if (event.target.classList.contains("celdas")) {
      let celda = event.target;
      filaClick = celda.parentElement.rowIndex;
      columnaClick = celda.cellIndex;
      let arrClicks = [filaClick, columnaClick];

      let golpeExitosoJug = false;

      for (let i = 0; i < coordOcupadas2.length; i++) {
        let coordBarco = coordOcupadas2[i];
        if (coordAtaqueExitoJug.length === coordOcupadas2) {
          verificacionGanoJug= true;
          terminoJuego();
          break;
        }
        else if (coordBarco[0] === arrClicks[0] && coordBarco[1] === arrClicks[1]) {
          Swal.fire({
            html: "<h2>The player has hit a target!!</h2>",
            icon: "success",
            confirmButtonText: "Aceptar",
            background: "#053966",
            backdrop: "rgba(0, 0, 0, 0.5)",
          });
          coordAtaqueExitoJug.push([filaClick,columnaClick]);
          golpeExitosoJug = true;
          celda.innerHTML = "X";
          turnoActual++;
          document
              .getElementById("matriz2Div")
              .removeEventListener("click", manejarClickCelda);
          turnos();
        }
      }
      if (!golpeExitosoJug) {
        Swal.fire({
          html: "<h2>The player has not hit a target</h2>",
          icon: "error",
          confirmButtonText: "Aceptar",
          background: "#053966",
          backdrop: "rgba(0, 0, 0, 0.5)",
        });
        cordAtaqueFallidoJug.push([filaClick,columnaClick]);
        celda.innerHTML = "0";
        turnoActual++;
        document
            .getElementById("matriz2Div")
            .removeEventListener("click", manejarClickCelda);
        turnos();
      }
    } else {
      alert("Debes hacer clic en una celda");
    }
  }
  document
      .getElementById("matriz2Div")
      .addEventListener("click", manejarClickCelda);
}

// Función para el turno de la maquina
export function movimientoMaquina() {

  filaAtaqueMaquina = Math.floor(Math.random() * 10) + 1;
  columnaAtaqueMaquina = Math.floor(Math.random() * 10) + 1;

  const celda = document.createElement("td");
  const fila = document.createElement("tr");
  let golpeExitosoMaquina = false;
  Swal.fire({
    html: "<h2>Machine's turn</h2>",
    icon: "info",
    showConfirmButton: false,
    background: "#053966",
    backdrop: "rgba(0, 0, 0, 0.5)",
  });
  for (let i = 0; i < coordOcupadas1.length; i++) {

    if (cordAtaqueExitoMaquina.length === coordOcupadas1) {
      terminoJuego();
    }
    else if (
        coordOcupadas1[i][0] === filaAtaqueMaquina[0] &&
        coordOcupadas1[i][1] === columnaAtaqueMaquina[1]
    ) {
      Swal.fire({
        html: "<h2>The machine has hit a target</h2>",
        icon: "success",
        confirmButtonText: "Aceptar",
        background: "#053966",
        backdrop: "rgba(0, 0, 0, 0.5)",
      });
      cordAtaqueExitoMaquina = [filaAtaqueMaquina, columnaAtaqueMaquina];
      golpeExitosoMaquina = true;
      celda.textContent = "X";
      fila.appendChild(celda);
      turnoActual--;
      turnos();
      break;
    }
  }
  if (!golpeExitosoMaquina) {
    Swal.fire({
      html: "<h2>The machine has not hit a target</h2>",
      icon: "error",
      confirmButtonText: "Aceptar",
      background: "#053966",
      backdrop: "rgba(0, 0, 0, 0.5)",
    });
    cordAtaqueFallidoMaquina = [filaAtaqueMaquina, columnaAtaqueMaquina];
    generarMatrizJug1Def.celda.textContent = "0";
    fila.appendChild(celda);
    turnoActual--;
    turnos();
  }
}

// Función para manejar el orden de los turnos
export function turnos() {
  const user = document.getElementById("textUser");
  if (turnoActual === 1) {
    movimientoMaquina();
  }
  else if (turnoActual === 0) {
    iniciarMovJugador();
  }
}

// Función para verificar si ya se gano el juego
export function terminoJuego() {
  Swal.fire({
    html: "<h2> The game ended</h2>",
    icon: "info",
    showConfirmButton: false,
    background: "#053966",
    backdrop: "rgba(0, 0, 0, 0.5)",
  });
  const jugarDeNuevo = document.getElementById("JugarDenuevo");
  const salir = document.getElementById("salir");
  if (jugarDeNuevo) {
    limpiarMatriz(matrizJug1);
    limpiarMatriz(matrizJug2);
    menu.style.display = "none";
    reordenar.style.display = "flex";
    juegoPrincipal.style.display = "none";

  } else if (salir) {
    menu.style.display = "flex";
    reordenar.style.display = "none";
    juegoPrincipal.style.display = "none";
  }
}

// Función para volver al menu por medio del boton
export function backToMenu() {
  const back = document.getElementById("back");
  const botonVolumen = document.getElementById("volumenControl");
  back.addEventListener("click", function () {
    menu.style.display = "flex";
    botonVolumen.style.display = "none";
    juego.style.display = "none";
  });
}
