

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-registro");
  if (!formulario) return;

  llenarRegiones("registro-region");
  actualizarComunas("registro-region", "registro-comuna");
  document.getElementById("registro-region").addEventListener("change", () => {
    actualizarComunas("registro-region", "registro-comuna");
  });

  const reglas = {
    "registro-run": [
      { test: esRequerido, mensaje: "El RUN es obligatorio." },
      { test: esRunValido, mensaje: "El RUN no es válido (verifica el dígito verificador). Ingresa sin puntos ni guion." },
    ],
    "registro-nombre": [
      { test: esRequerido, mensaje: "El nombre es obligatorio." },
      { test: (v) => largoMaximo(v, 50), mensaje: "El nombre no puede superar los 50 caracteres." },
    ],
    "registro-apellidos": [
      { test: esRequerido, mensaje: "Los apellidos son obligatorios." },
      { test: (v) => largoMaximo(v, 100), mensaje: "Los apellidos no pueden superar los 100 caracteres." },
    ],
    "registro-correo": [
      { test: esRequerido, mensaje: "El correo es obligatorio." },
      { test: (v) => largoMaximo(v, 100), mensaje: "El correo no puede superar los 100 caracteres." },
      { test: esCorreoValido, mensaje: "Ingresa un correo con formato válido." },
    ],
    "registro-tipo": [{ test: esRequerido, mensaje: "Selecciona un tipo de usuario." }],
    "registro-region": [{ test: esRequerido, mensaje: "Selecciona una región." }],
    "registro-comuna": [{ test: esRequerido, mensaje: "Selecciona una comuna." }],
    "registro-direccion": [
      { test: esRequerido, mensaje: "La dirección es obligatoria." },
      { test: (v) => largoMaximo(v, 300), mensaje: "La dirección no puede superar los 300 caracteres." },
    ],
    "registro-clave": [
      { test: esRequerido, mensaje: "Crea una contraseña." },
      { test: (v) => largoEntre(v, 4, 10), mensaje: "La contraseña debe tener entre 4 y 10 caracteres." },
    ],
    "registro-clave2": [
      { test: esRequerido, mensaje: "Confirma tu contraseña." },
      {
        test: (v) => v === document.getElementById("registro-clave").value,
        mensaje: "Las contraseñas no coinciden.",
      },
    ],
  };

  activarValidacionEnVivo("form-registro", reglas);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!validarFormulario(reglas)) {
      mostrarMensajeFormulario("mensaje-registro", "Revisa los campos marcados en rojo antes de continuar.", "error");
      return;
    }
    mostrarMensajeFormulario(
      "mensaje-registro",
      "¡Registro validado correctamente!",
      "exito"
    );
    formulario.reset();
    actualizarComunas("registro-region", "registro-comuna");
  });
});

function llenarRegiones(idSelect) {
  const select = document.getElementById(idSelect);
  if (!select) return;
  select.innerHTML = '<option value="">Selecciona una región</option>';
  REGIONES.forEach((r) => {
    const opcion = document.createElement("option");
    opcion.value = r.region;
    opcion.textContent = r.region;
    select.appendChild(opcion);
  });
}

function actualizarComunas(idSelectRegion, idSelectComuna) {
  const selectRegion = document.getElementById(idSelectRegion);
  const selectComuna = document.getElementById(idSelectComuna);
  if (!selectRegion || !selectComuna) return;

  const regionInfo = REGIONES.find((r) => r.region === selectRegion.value);
  selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
  selectComuna.disabled = !regionInfo;

  if (regionInfo) {
    regionInfo.comunas.forEach((comuna) => {
      const opcion = document.createElement("option");
      opcion.value = comuna;
      opcion.textContent = comuna;
      selectComuna.appendChild(opcion);
    });
  }
}
