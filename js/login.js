/* ==========================================================================
   login.js — Validación del formulario de inicio de sesión
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-login");
  if (!formulario) return;

  const reglas = {
    "login-correo": [
      { test: esRequerido, mensaje: "Ingresa tu correo electrónico." },
      { test: (v) => largoMaximo(v, 100), mensaje: "El correo no puede superar los 100 caracteres." },
      { test: esCorreoValido, mensaje: "Ingresa un correo con formato válido (ej: nombre@correo.cl)." },
    ],
    "login-clave": [
      { test: esRequerido, mensaje: "Ingresa tu contraseña." },
      { test: (v) => largoEntre(v, 4, 10), mensaje: "La contraseña debe tener entre 4 y 10 caracteres." },
    ],
  };

  activarValidacionEnVivo("form-login", reglas);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!validarFormulario(reglas)) {
      mostrarMensajeFormulario("mensaje-login", "Revisa los campos marcados en rojo antes de continuar.", "error");
      return;
    }

    const correo = document.getElementById("login-correo").value.trim();
    iniciarSesionSimulada(correo, "cliente");
    mostrarMensajeFormulario("mensaje-login", "Sesión iniciada correctamente. Redirigiendo al catálogo…", "exito");
    setTimeout(() => (window.location.href = "catalogo.html"), 900);
  });
});
