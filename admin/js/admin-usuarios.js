

const CLAVE_USUARIOS_ADMIN = "losmaestros_admin_usuarios";

function obtenerUsuariosAdmin() {
  try {
    const datos = localStorage.getItem(CLAVE_USUARIOS_ADMIN);
    return datos ? JSON.parse(datos) : JSON.parse(JSON.stringify(USUARIOS_INICIALES));
  } catch (e) {
    return JSON.parse(JSON.stringify(USUARIOS_INICIALES));
  }
}

function guardarUsuariosAdmin(lista) {
  localStorage.setItem(CLAVE_USUARIOS_ADMIN, JSON.stringify(lista));
}

document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.getElementById("cuerpo-tabla-usuarios");
  if (!tablaBody) return;

  let usuarios = obtenerUsuariosAdmin();
  const panelEdicion = document.getElementById("panel-edicion-usuario");
  const formulario = document.getElementById("form-editar-usuario");

  llenarRegionesAdmin();
  actualizarComunasAdmin();
  document.getElementById("edit-usr-region").addEventListener("change", actualizarComunasAdmin);

  function renderTabla() {
    tablaBody.innerHTML = "";
    usuarios.forEach((u) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${escaparHtml(u.run)}</td>
        <td>${escaparHtml(u.nombre)} ${escaparHtml(u.apellidos)}</td>
        <td>${escaparHtml(u.correo)}</td>
        <td><span class="admin-badge admin-badge-rolchip">${escaparHtml(u.tipo)}</span></td>
        <td>${escaparHtml(u.comuna)}</td>
        <td class="admin-acciones">
          <button type="button" class="boton boton-linea boton-pequeno" data-editar="${u.run}">Editar</button>
          <button type="button" class="boton boton-peligro boton-pequeno" data-eliminar="${u.run}">Desactivar</button>
        </td>
      `;
      tablaBody.appendChild(fila);
    });
    document.getElementById("total-usuarios-admin").textContent = usuarios.length;
  }

  function abrirEdicion(usuario) {
    panelEdicion.style.display = "block";
    document.getElementById("edit-usr-run-original").value = usuario ? usuario.run : "";
    document.getElementById("edit-usr-run").value = usuario ? usuario.run : "";
    document.getElementById("edit-usr-run").disabled = !!usuario;
    document.getElementById("edit-usr-nombre").value = usuario ? usuario.nombre : "";
    document.getElementById("edit-usr-apellidos").value = usuario ? usuario.apellidos : "";
    document.getElementById("edit-usr-correo").value = usuario ? usuario.correo : "";
    document.getElementById("edit-usr-tipo").value = usuario ? usuario.tipo : "Contratista";
    document.getElementById("edit-usr-direccion").value = usuario ? usuario.direccion : "";
    llenarRegionesAdmin(usuario ? usuario.region : "");
    actualizarComunasAdmin(usuario ? usuario.comuna : "");
    document.getElementById("titulo-panel-edicion-usuario").textContent = usuario ? `Editar usuario ${usuario.run}` : "Nuevo usuario";
    panelEdicion.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  document.getElementById("btn-nuevo-usuario").addEventListener("click", () => abrirEdicion(null));
  document.getElementById("btn-cancelar-edicion-usuario").addEventListener("click", () => (panelEdicion.style.display = "none"));

  tablaBody.addEventListener("click", (evento) => {
    const btnEditar = evento.target.closest("[data-editar]");
    if (btnEditar) {
      abrirEdicion(usuarios.find((u) => u.run === btnEditar.dataset.editar));
      return;
    }
    const btnEliminar = evento.target.closest("[data-eliminar]");
    if (btnEliminar) {
      if (confirm(`¿Desactivar al usuario con RUN ${btnEliminar.dataset.eliminar}?`)) {
        usuarios = usuarios.filter((u) => u.run !== btnEliminar.dataset.eliminar);
        guardarUsuariosAdmin(usuarios);
        renderTabla();
      }
    }
  });

  const reglas = {
    "edit-usr-run": [
      { test: esRequerido, mensaje: "El RUN es obligatorio." },
      { test: esRunValido, mensaje: "El RUN no es válido (verifica el dígito verificador)." },
    ],
    "edit-usr-nombre": [
      { test: esRequerido, mensaje: "El nombre es obligatorio." },
      { test: (v) => largoMaximo(v, 50), mensaje: "Máximo 50 caracteres." },
    ],
    "edit-usr-apellidos": [
      { test: esRequerido, mensaje: "Los apellidos son obligatorios." },
      { test: (v) => largoMaximo(v, 100), mensaje: "Máximo 100 caracteres." },
    ],
    "edit-usr-correo": [
      { test: esRequerido, mensaje: "El correo es obligatorio." },
      { test: (v) => largoMaximo(v, 100), mensaje: "Máximo 100 caracteres." },
      { test: esCorreoValido, mensaje: "Ingresa un correo con formato válido." },
    ],
    "edit-usr-tipo": [{ test: esRequerido, mensaje: "Selecciona un tipo o rol de usuario." }],
    "edit-usr-region": [{ test: esRequerido, mensaje: "Selecciona una región." }],
    "edit-usr-comuna": [{ test: esRequerido, mensaje: "Selecciona una comuna." }],
    "edit-usr-direccion": [
      { test: esRequerido, mensaje: "La dirección es obligatoria." },
      { test: (v) => largoMaximo(v, 300), mensaje: "Máximo 300 caracteres." },
    ],
  };
  activarValidacionEnVivo("form-editar-usuario", reglas);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!validarFormulario(reglas)) return;

    const runOriginal = document.getElementById("edit-usr-run-original").value;
    const datosUsuario = {
      run: document.getElementById("edit-usr-run").value.trim(),
      nombre: document.getElementById("edit-usr-nombre").value.trim(),
      apellidos: document.getElementById("edit-usr-apellidos").value.trim(),
      correo: document.getElementById("edit-usr-correo").value.trim(),
      tipo: document.getElementById("edit-usr-tipo").value,
      region: document.getElementById("edit-usr-region").value,
      comuna: document.getElementById("edit-usr-comuna").value,
      direccion: document.getElementById("edit-usr-direccion").value.trim(),
    };

    if (runOriginal) {
      usuarios = usuarios.map((u) => (u.run === runOriginal ? datosUsuario : u));
    } else {
      if (usuarios.some((u) => u.run === datosUsuario.run)) {
        alert("Ya existe un usuario registrado con ese RUN.");
        return;
      }
      usuarios.push(datosUsuario);
    }
    guardarUsuariosAdmin(usuarios);
    renderTabla();
    panelEdicion.style.display = "none";
  });

  renderTabla();
});

function llenarRegionesAdmin(seleccion) {
  const select = document.getElementById("edit-usr-region");
  select.innerHTML = '<option value="">Selecciona una región</option>';
  REGIONES.forEach((r) => {
    const opcion = document.createElement("option");
    opcion.value = r.region;
    opcion.textContent = r.region;
    if (r.region === seleccion) opcion.selected = true;
    select.appendChild(opcion);
  });
}

function actualizarComunasAdmin(seleccion) {
  const selectRegion = document.getElementById("edit-usr-region");
  const selectComuna = document.getElementById("edit-usr-comuna");
  const regionInfo = REGIONES.find((r) => r.region === selectRegion.value);
  selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
  selectComuna.disabled = !regionInfo;
  if (regionInfo) {
    regionInfo.comunas.forEach((comuna) => {
      const opcion = document.createElement("option");
      opcion.value = comuna;
      opcion.textContent = comuna;
      if (comuna === seleccion) opcion.selected = true;
      selectComuna.appendChild(opcion);
    });
  }
}
