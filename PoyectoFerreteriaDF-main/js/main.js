

document.addEventListener("DOMContentLoaded", () => {
  inicializarMenuMovil();
  marcarEnlaceActivo();
  actualizarContadorSeleccion();
  inicializarSesionUI();
});


function inicializarMenuMovil() {
  const boton = document.querySelector(".boton-menu");
  const cabecera = document.querySelector(".cabecera");
  if (!boton || !cabecera) return;

  boton.addEventListener("click", () => {
    const abierto = cabecera.classList.toggle("menu-abierto");
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
  });
}


function marcarEnlaceActivo() {
  const actual = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-principal a").forEach((enlace) => {
    const destino = enlace.getAttribute("href");
    if (destino === actual) enlace.classList.add("activo");
  });
}


const CLAVE_SELECCION = "losmaestros_seleccion";

function obtenerSeleccion() {
  try {
    const datos = localStorage.getItem(CLAVE_SELECCION);
    return datos ? JSON.parse(datos) : [];
  } catch (e) {
    console.warn("No se pudo leer la selección guardada:", e);
    return [];
  }
}

function guardarSeleccion(lista) {
  localStorage.setItem(CLAVE_SELECCION, JSON.stringify(lista));
  actualizarContadorSeleccion();
}

function agregarASeleccion(idProducto, cantidad = 1) {
  const lista = obtenerSeleccion();
  const existente = lista.find((item) => item.id === idProducto);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    lista.push({ id: idProducto, cantidad });
  }
  guardarSeleccion(lista);
}

function quitarDeSeleccion(idProducto) {
  const lista = obtenerSeleccion().filter((item) => item.id !== idProducto);
  guardarSeleccion(lista);
}

function actualizarContadorSeleccion() {
  const contador = document.querySelector("[data-contador-seleccion]");
  if (!contador) return;
  const total = obtenerSeleccion().reduce((acc, item) => acc + item.cantidad, 0);
  contador.textContent = total;
  contador.style.display = total > 0 ? "inline-flex" : "none";
}


const CLAVE_SESION = "losmaestros_sesion";

function iniciarSesionSimulada(correo, tipo) {
  sessionStorage.setItem(CLAVE_SESION, JSON.stringify({ correo, tipo }));
}

function cerrarSesionSimulada() {
  sessionStorage.removeItem(CLAVE_SESION);
  window.location.href = "index.html";
}

function obtenerSesion() {
  try {
    const datos = sessionStorage.getItem(CLAVE_SESION);
    return datos ? JSON.parse(datos) : null;
  } catch (e) {
    return null;
  }
}

function inicializarSesionUI() {
  const zona = document.querySelector("[data-zona-sesion]");
  if (!zona) return;
  const sesion = obtenerSesion();
  if (sesion) {
    zona.innerHTML = `
      <span class="boton boton-linea boton-pequeno" style="cursor:default;">Hola, ${escaparHtml(sesion.correo.split("@")[0])}</span>
      <button type="button" class="boton boton-secundario boton-pequeno" id="btn-cerrar-sesion">Cerrar sesión</button>
    `;
    document.getElementById("btn-cerrar-sesion").addEventListener("click", cerrarSesionSimulada);
  }
}


function formatoCLP(numero) {
  return "$" + Number(numero).toLocaleString("es-CL");
}

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function obtenerParametro(nombre) {
  return new URLSearchParams(window.location.search).get(nombre);
}
