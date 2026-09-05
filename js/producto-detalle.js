/* ==========================================================================
   producto-detalle.js — Renderiza la ficha de un producto según ?id=
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("detalle-producto");
  if (!contenedor) return;

  const id = obtenerParametro("id");
  const producto = PRODUCTOS.find((p) => p.id === id);

  if (!producto) {
    contenedor.innerHTML = `
      <div class="estado-vacio" style="grid-column:1/-1;">
        <img src="img/caja-vacia.svg" alt="" width="120" height="96">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o fue retirado del catálogo.</p>
        <a class="boton boton-secundario" href="catalogo.html">Volver al catálogo</a>
      </div>`;
    return;
  }

  const catInfo = CATEGORIAS.find((c) => c.slug === producto.categoria);
  const bajoStock = producto.stock <= producto.stockMinimo;
  document.title = `${producto.nombre} — Ferretería Los Maestros`;

  const migaCategoria = document.getElementById("miga-categoria");
  if (migaCategoria) {
    migaCategoria.textContent = catInfo ? catInfo.nombre : producto.categoria;
    migaCategoria.href = `catalogo.html?categoria=${encodeURIComponent(producto.categoria)}`;
  }
  const migaNombre = document.getElementById("miga-nombre");
  if (migaNombre) migaNombre.textContent = producto.nombre;

  contenedor.innerHTML = `
    <div>
      <img src="img/prod-${producto.categoria}.svg" alt="${escaparHtml(producto.nombre)}" width="480" height="480">
    </div>
    <div>
      <span class="categoria">${escaparHtml(catInfo ? catInfo.nombre : producto.categoria)}</span>
      <h1>${escaparHtml(producto.nombre)}</h1>
      <p class="marca">Marca ${escaparHtml(producto.marca)} · Código ${escaparHtml(producto.id)}</p>
      <p class="precio-grande">${formatoCLP(producto.precio)}</p>
      <span class="badge ${bajoStock ? "badge-bajo" : "badge-ok"}">
        ${bajoStock ? "Quedan pocas unidades" : "Stock disponible"}
      </span>

      <table class="ficha-tecnica">
        <tr><td>Unidad de venta</td><td>${escaparHtml(producto.unidad)}</td></tr>
        <tr><td>Stock estimado en tienda</td><td>${producto.stock} ${escaparHtml(producto.unidad.toLowerCase())}(s)</td></tr>
        <tr><td>Categoría</td><td>${escaparHtml(catInfo ? catInfo.nombre : producto.categoria)}</td></tr>
        <tr><td>Retiro</td><td>En tienda, La Serena (mesón de despacho)</td></tr>
        <tr><td>Despacho a domicilio</td><td>Disponible dentro de la zona de cobertura</td></tr>
      </table>

      <div class="hero-cta">
        <div class="campo" style="max-width:110px;">
          <label for="cantidad-detalle">Cantidad</label>
          <input type="number" id="cantidad-detalle" min="1" value="1">
        </div>
      </div>
      <div class="hero-cta">
        <button type="button" class="boton boton-primario" id="btn-agregar-detalle">Agregar a mi lista</button>
        <a href="seleccion.html" class="boton boton-linea">Ver mi lista</a>
      </div>
      <p id="confirmacion-agregado" class="mensaje-formulario exito" style="margin-top:16px;"></p>
    </div>
  `;

  document.getElementById("btn-agregar-detalle").addEventListener("click", () => {
    const cantidadInput = document.getElementById("cantidad-detalle");
    let cantidad = parseInt(cantidadInput.value, 10);
    if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
    agregarASeleccion(producto.id, cantidad);

    const aviso = document.getElementById("confirmacion-agregado");
    aviso.textContent = `Agregaste ${cantidad} unidad(es) de "${producto.nombre}" a tu lista.`;
    aviso.classList.add("visible");
  });
});
