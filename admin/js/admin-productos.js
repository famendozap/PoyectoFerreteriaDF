/* ==========================================================================
   admin-productos.js — Mantenedor de productos (listado + edición)
   Los cambios se guardan en LocalStorage para simular persistencia,
   ya que esta evaluación no requiere conexión a base de datos.
   ========================================================================== */

const CLAVE_PRODUCTOS_ADMIN = "losmaestros_admin_productos";

function obtenerProductosAdmin() {
  try {
    const datos = localStorage.getItem(CLAVE_PRODUCTOS_ADMIN);
    return datos ? JSON.parse(datos) : JSON.parse(JSON.stringify(PRODUCTOS));
  } catch (e) {
    return JSON.parse(JSON.stringify(PRODUCTOS));
  }
}

function guardarProductosAdmin(lista) {
  localStorage.setItem(CLAVE_PRODUCTOS_ADMIN, JSON.stringify(lista));
}

document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.getElementById("cuerpo-tabla-productos");
  if (!tablaBody) return;

  let productos = obtenerProductosAdmin();
  const panelEdicion = document.getElementById("panel-edicion-producto");
  const formulario = document.getElementById("form-editar-producto");
  const selectCategoria = document.getElementById("edit-categoria");

  CATEGORIAS.forEach((c) => {
    const opcion = document.createElement("option");
    opcion.value = c.slug;
    opcion.textContent = c.nombre;
    selectCategoria.appendChild(opcion);
  });

  function renderTabla() {
    tablaBody.innerHTML = "";
    productos.forEach((p) => {
      const catInfo = CATEGORIAS.find((c) => c.slug === p.categoria);
      const bajoStock = p.stock <= p.stockMinimo;
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${escaparHtml(p.id)}</td>
        <td>${escaparHtml(p.nombre)}</td>
        <td>${escaparHtml(catInfo ? catInfo.nombre : p.categoria)}</td>
        <td>${formatoCLP(p.precio)}</td>
        <td>${p.stock} <span class="admin-badge ${bajoStock ? "admin-badge-alerta" : "admin-badge-ok"}">${bajoStock ? "Bajo mínimo" : "OK"}</span></td>
        <td class="admin-acciones">
          <button type="button" class="boton boton-linea boton-pequeno" data-editar="${p.id}">Editar</button>
          <button type="button" class="boton boton-peligro boton-pequeno" data-eliminar="${p.id}">Eliminar</button>
        </td>
      `;
      tablaBody.appendChild(fila);
    });
    document.getElementById("total-productos-admin").textContent = productos.length;
    document.getElementById("total-bajo-stock-admin").textContent = productos.filter((p) => p.stock <= p.stockMinimo).length;
  }

  function abrirEdicion(producto) {
    panelEdicion.style.display = "block";
    document.getElementById("edit-id").value = producto ? producto.id : "";
    document.getElementById("edit-id-visible").value = producto ? producto.id : "(nuevo producto)";
    document.getElementById("edit-nombre").value = producto ? producto.nombre : "";
    document.getElementById("edit-marca").value = producto ? producto.marca : "";
    document.getElementById("edit-unidad").value = producto ? producto.unidad : "";
    document.getElementById("edit-precio").value = producto ? producto.precio : "";
    document.getElementById("edit-stock").value = producto ? producto.stock : "";
    document.getElementById("edit-stock-minimo").value = producto ? producto.stockMinimo : "";
    selectCategoria.value = producto ? producto.categoria : CATEGORIAS[0].slug;
    document.getElementById("titulo-panel-edicion").textContent = producto ? `Editar producto ${producto.id}` : "Nuevo producto";
    panelEdicion.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  document.getElementById("btn-nuevo-producto").addEventListener("click", () => abrirEdicion(null));
  document.getElementById("btn-cancelar-edicion").addEventListener("click", () => (panelEdicion.style.display = "none"));

  tablaBody.addEventListener("click", (evento) => {
    const btnEditar = evento.target.closest("[data-editar]");
    if (btnEditar) {
      const producto = productos.find((p) => p.id === btnEditar.dataset.editar);
      abrirEdicion(producto);
      return;
    }
    const btnEliminar = evento.target.closest("[data-eliminar]");
    if (btnEliminar) {
      if (confirm(`¿Eliminar el producto ${btnEliminar.dataset.eliminar} del catálogo?`)) {
        productos = productos.filter((p) => p.id !== btnEliminar.dataset.eliminar);
        guardarProductosAdmin(productos);
        renderTabla();
      }
    }
  });

  const reglas = {
    "edit-nombre": [
      { test: esRequerido, mensaje: "El nombre del producto es obligatorio." },
      { test: (v) => largoMaximo(v, 120), mensaje: "Máximo 120 caracteres." },
    ],
    "edit-marca": [{ test: esRequerido, mensaje: "La marca es obligatoria." }],
    "edit-unidad": [{ test: esRequerido, mensaje: "Indica la unidad de venta (ej: Unidad, Saco, Caja)." }],
    "edit-precio": [
      { test: esRequerido, mensaje: "El precio es obligatorio." },
      { test: (v) => Number(v) > 0, mensaje: "El precio debe ser mayor a 0." },
    ],
    "edit-stock": [
      { test: esRequerido, mensaje: "El stock es obligatorio." },
      { test: (v) => Number(v) >= 0, mensaje: "El stock no puede ser negativo." },
    ],
    "edit-stock-minimo": [
      { test: esRequerido, mensaje: "El stock mínimo es obligatorio." },
      { test: (v) => Number(v) >= 0, mensaje: "El stock mínimo no puede ser negativo." },
    ],
  };
  activarValidacionEnVivo("form-editar-producto", reglas);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!validarFormulario(reglas)) return;

    const idExistente = document.getElementById("edit-id").value;
    const datosProducto = {
      id: idExistente || "P" + Date.now().toString().slice(-6),
      categoria: selectCategoria.value,
      nombre: document.getElementById("edit-nombre").value.trim(),
      marca: document.getElementById("edit-marca").value.trim(),
      unidad: document.getElementById("edit-unidad").value.trim(),
      precio: Number(document.getElementById("edit-precio").value),
      stock: Number(document.getElementById("edit-stock").value),
      stockMinimo: Number(document.getElementById("edit-stock-minimo").value),
    };

    if (idExistente) {
      productos = productos.map((p) => (p.id === idExistente ? datosProducto : p));
    } else {
      productos.push(datosProducto);
    }
    guardarProductosAdmin(productos);
    renderTabla();
    panelEdicion.style.display = "none";
  });

  document.getElementById("btn-restaurar-catalogo")?.addEventListener("click", () => {
    if (confirm("Esto restaura el catálogo original de la planilla (se pierden tus cambios de prueba). ¿Continuar?")) {
      productos = JSON.parse(JSON.stringify(PRODUCTOS));
      guardarProductosAdmin(productos);
      renderTabla();
    }
  });

  renderTabla();
});
