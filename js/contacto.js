/* ==========================================================================
   contacto.js — Validación del formulario de contacto
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-contacto");
  if (!formulario) return;

  const reglas = {
    "contacto-nombre": [
      { test: esRequerido, mensaje: "Ingresa tu nombre." },
      { test: (v) => largoMaximo(v, 100), mensaje: "El nombre no puede superar los 100 caracteres." },
    ],
    "contacto-correo": [
      { test: esRequerido, mensaje: "Ingresa tu correo electrónico." },
      { test: (v) => largoMaximo(v, 100), mensaje: "El correo no puede superar los 100 caracteres." },
      { test: esCorreoValido, mensaje: "Ingresa un correo con formato válido." },
    ],
    "contacto-mensaje": [
      { test: esRequerido, mensaje: "Cuéntanos tu consulta o mensaje." },
      { test: (v) => largoMaximo(v, 500), mensaje: "El mensaje no puede superar los 500 caracteres." },
    ],
  };

  activarValidacionEnVivo("form-contacto", reglas);

  const contadorMensaje = document.getElementById("contador-caracteres");
  const areaMensaje = document.getElementById("contacto-mensaje");
  if (contadorMensaje && areaMensaje) {
    areaMensaje.addEventListener("input", () => {
      contadorMensaje.textContent = `${areaMensaje.value.length} / 500 caracteres`;
    });
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!validarFormulario(reglas)) {
      mostrarMensajeFormulario("mensaje-contacto", "Revisa los campos marcados en rojo antes de enviar.", "error");
      return;
    }
    const nombre = document.getElementById("contacto-nombre").value.trim();
    mostrarMensajeFormulario(
      "mensaje-contacto",
      `¡Gracias, ${nombre}! Recibimos tu mensaje y te responderemos a la brevedad.`,
      "exito"
    );
    formulario.reset();
    if (contadorMensaje) contadorMensaje.textContent = "0 / 500 caracteres";
  });
});
