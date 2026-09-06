

document.addEventListener("DOMContentLoaded", () => {
  const grilla = document.getElementById("grilla-catalogo");
  const selectCategoria = document.getElementById("filtro-categoria");
  const inputBuscar = document.getElementById("filtro-buscar");
  const contador = document.getElementById("contador-resultados");
  if (!grilla) return;

  llenarSelectCategorias(selectCategoria);

  
  const categoriaUrl = obtenerParametro("categoria");
  if (categoriaUrl) selectCategoria.value = categoriaUrl;

  function render() {
    const catSeleccionada = selectCategoria.value;
    const texto = inputBuscar.value.trim().toLowerCase();

    const resultado = PRODUCTOS.filter((p) => {
      const coincideCategoria = catSeleccionada === "todas" || p.categoria === catSeleccionada;
      const coincideTexto =
        texto === "" ||
        p.nombre.toLowerCase().includes(texto) ||
        p.marca.toLowerCase().includes(texto) ||
        p.id.toLowerCase().includes(texto);
      return coincideCategoria && coincideTexto;
    });

    grilla.innerHTML = "";
    if (resultado.length === 0) {
      grilla.innerHTML = `
        <div class="estado-vacio" style="grid-column:1/-1;">
          <img src="img/caja-vacia.svg" alt="" width="120" height="96">
          <p>No encontramos productos que coincidan con tu búsqueda. Prueba con otra categoría o palabra clave.</p>
        </div>`;
    } else {
      resultado.forEach((p) => grilla.appendChild(crearTarjetaProducto(p)));
    }

    if (contador) {
      contador.textContent = `${resultado.length} producto${resultado.length === 1 ? "" : "s"} encontrado${resultado.length === 1 ? "" : "s"}`;
    }
  }

  selectCategoria.addEventListener("change", render);
  inputBuscar.addEventListener("input", render);

  render();

  grilla.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-agregar]");
    if (!boton) return;
    agregarASeleccion(boton.dataset.agregar, 1);
    boton.textContent = "Agregado ✓";
    setTimeout(() => (boton.textContent = "Agregar a mi lista"), 1200);
  });
});

function llenarSelectCategorias(select) {
  if (!select) return;
  CATEGORIAS.forEach((cat) => {
    const opcion = document.createElement("option");
    opcion.value = cat.slug;
    opcion.textContent = cat.nombre;
    select.appendChild(opcion);
  });
}

function crearTarjetaProducto(p) {
  const div = document.createElement("div");
  div.className = "tarjeta-producto";
  const catInfo = CATEGORIAS.find((c) => c.slug === p.categoria);
  const imgSrc = `img/prod-${p.categoria}.svg`;
  const bajoStock = p.stock <= p.stockMinimo;

  div.innerHTML = `
    <a class="img-wrap" href="producto-detalle.html?id=${encodeURIComponent(p.id)}">
      <img src="${imgSrc}" alt="${escaparHtml(p.nombre)}" width="240" height="240" loading="lazy">
    </a>
    <div class="cont">
      <span class="categoria">${escaparHtml(catInfo ? catInfo.nombre : p.categoria)}</span>
      <h3><a href="producto-detalle.html?id=${encodeURIComponent(p.id)}">${escaparHtml(p.nombre)}</a></h3>
      <span class="marca">${escaparHtml(p.marca)} · ${escaparHtml(p.unidad)}</span>
      <span class="badge ${bajoStock ? "badge-bajo" : "badge-ok"}">${bajoStock ? "Stock bajo" : "Stock disponible"}</span>
      <span class="precio">${formatoCLP(p.precio)}</span>
      <div class="fila-final">
        <a href="producto-detalle.html?id=${encodeURIComponent(p.id)}" class="boton boton-linea boton-pequeno">Ver detalle</a>
        <button type="button" class="boton boton-primario boton-pequeno" data-agregar="${p.id}">Agregar a mi lista</button>
      </div>
    </div>
  `;
  return div;
}
