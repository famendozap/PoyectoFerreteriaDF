

function esRequerido(valor) {
  return valor !== null && valor !== undefined && String(valor).trim().length > 0;
}

function largoMaximo(valor, maximo) {
  return String(valor || "").trim().length <= maximo;
}

function largoEntre(valor, minimo, maximo) {
  const largo = String(valor || "").trim().length;
  return largo >= minimo && largo <= maximo;
}

function esCorreoValido(valor) {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(String(valor || "").trim());
}


function esRunValido(valorOriginal) {
  const valor = String(valorOriginal || "").trim().toUpperCase().replace(/[^0-9K]/g, "");
  if (valor.length < 2) return false;

  const cuerpo = valor.slice(0, -1);
  const dv = valor.slice(-1);
  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = String(resto);

  return dv === dvEsperado;
}



function validarFormulario(reglas) {
  let formularioValido = true;

  Object.keys(reglas).forEach((idCampo) => {
    const campoInput = document.getElementById(idCampo);
    if (!campoInput) return;
    const contenedor = campoInput.closest(".campo") || campoInput.parentElement;
    const spanError = contenedor ? contenedor.querySelector(".mensaje-error") : null;

    let mensajeFallo = "";
    for (const regla of reglas[idCampo]) {
      if (!regla.test(campoInput.value)) {
        mensajeFallo = regla.mensaje;
        break;
      }
    }

    if (mensajeFallo) {
      formularioValido = false;
      if (contenedor) contenedor.classList.add("invalido");
      if (spanError) spanError.textContent = mensajeFallo;
    } else {
      if (contenedor) contenedor.classList.remove("invalido");
      if (spanError) spanError.textContent = "";
    }
  });

  return formularioValido;
}

function limpiarValidacion(idCampo) {
  const campoInput = document.getElementById(idCampo);
  if (!campoInput) return;
  const contenedor = campoInput.closest(".campo") || campoInput.parentElement;
  if (contenedor) contenedor.classList.remove("invalido");
}


function activarValidacionEnVivo(idFormulario, reglas) {
  const formulario = document.getElementById(idFormulario);
  if (!formulario) return;
  Object.keys(reglas).forEach((idCampo) => {
    const campoInput = document.getElementById(idCampo);
    if (!campoInput) return;
    campoInput.addEventListener("blur", () => {
      validarFormulario({ [idCampo]: reglas[idCampo] });
    });
    campoInput.addEventListener("input", () => {
      const contenedor = campoInput.closest(".campo") || campoInput.parentElement;
      if (contenedor && contenedor.classList.contains("invalido")) {
        validarFormulario({ [idCampo]: reglas[idCampo] });
      }
    });
  });
}

function mostrarMensajeFormulario(idContenedor, texto, tipo) {
  const caja = document.getElementById(idContenedor);
  if (!caja) return;
  caja.textContent = texto;
  caja.className = "mensaje-formulario visible " + tipo;
  caja.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
