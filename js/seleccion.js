/* ==========================================================================
   seleccion.js — Lista de interés / preselección de pedido (LocalStorage)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const listaEl = document.getElementById("lista-seleccion");
  const resumenEl = document.getElementById("resumen-seleccion");
  const vacioEl = document.getElementById("estado-vacio-seleccion");
  if (!listaEl) return;

  function obtenerItemsConDatos() {
    return obtenerSeleccion()
      .map((item) => {
        const producto = PRODUCTOS.find((p) => p.id === item.id);
        return producto ? { ...item, producto } : null;
      })
      .filter(Boolean);
  }

  function render() {
    const items = obtenerItemsConDatos();

    if (items.length === 0) {
      listaEl.innerHTML = "";
      vacioEl.style.display = "block";
      resumenEl.innerHTML = "";
      return;
    }

    vacioEl.style.display = "none";
    listaEl.innerHTML = "";

    let total = 0;
    let totalUnidades = 0;

    items.forEach(({ id, cantidad, producto }) => {
      const subtotal = producto.precio * cantidad;
      total += subtotal;
      totalUnidades += cantidad;

      const fila = document.createElement("div");
      fila.className = "fila-seleccion";
      fila.innerHTML = `
        <img src="img/prod-${producto.categoria}.svg" alt="" width="70" height="70">
        <div>
          <strong>${escaparHtml(producto.nombre)}</strong><br>
          <span class="marca">${escaparHtml(producto.marca)} · ${formatoCLP(producto.precio)} c/u</span>
        </div>
        <input type="number" min="1" value="${cantidad}" data-cantidad="${id}" aria-label="Cantidad de ${escaparHtml(producto.nombre)}">
        <strong>${formatoCLP(subtotal)}</strong>
        <button type="button" class="boton boton-linea boton-pequeno" data-quitar="${id}" aria-label="Quitar ${escaparHtml(producto.nombre)}">Quitar</button>
      `;
      listaEl.appendChild(fila);
    });

    resumenEl.innerHTML = `
      <h3 class="mt-0">Resumen</h3>
      <div class="linea"><span>Productos distintos</span><span>${items.length}</span></div>
      <div class="linea"><span>Unidades totales</span><span>${totalUnidades}</span></div>
      <div class="linea total"><span>Total estimado</span><span>${formatoCLP(total)}</span></div>
      <div class="campo" style="margin-top:16px;">
        <label for="modo-entrega">Modo de entrega</label>
        <select id="modo-entrega">
          <option value="retiro">Retiro en tienda</option>
          <option value="despacho">Despacho a domicilio</option>
        </select>
      </div>
      <label style="display:flex; gap:8px; align-items:flex-start; font-size:0.88rem; margin:12px 0;">
        <input type="checkbox" id="usar-cuenta-corriente" style="width:auto; margin-top:3px;">
        <span>Cargar a mi cuenta corriente (pago pendiente a fin de mes)</span>
      </label>
      <button type="button" class="boton boton-primario" id="btn-confirmar-pedido" style="width:100%;">Confirmar pedido</button>
      <p style="font-size:0.8rem; color:var(--text-muted); margin-top:10px;">
        Este resumen no se envía a un servidor en esta versión del sitio: es una vista previa de cómo funcionará el flujo de pedidos.
      </p>
    `;

    document.getElementById("btn-confirmar-pedido").addEventListener("click", () => {
      const modo = document.getElementById("modo-entrega").value;
      const cuentaCorriente = document.getElementById("usar-cuenta-corriente").checked;
      alert(
        `¡Gracias! Tu pedido de ${totalUnidades} unidad(es) por ${formatoCLP(total)} quedó registrado como "${modo === "retiro" ? "Retiro en tienda" : "Despacho a domicilio"}"${cuentaCorriente ? " con cargo a cuenta corriente" : ""}.\n\nUn vendedor confirmará la disponibilidad final.`
      );
      guardarSeleccion([]);
      render();
    });
  }

  listaEl.addEventListener("click", (evento) => {
    const btnQuitar = evento.target.closest("[data-quitar]");
    if (btnQuitar) {
      quitarDeSeleccion(btnQuitar.dataset.quitar);
      render();
    }
  });

  listaEl.addEventListener("change", (evento) => {
    const input = evento.target.closest("[data-cantidad]");
    if (!input) return;
    let valor = parseInt(input.value, 10);
    if (isNaN(valor) || valor < 1) valor = 1;
    const lista = obtenerSeleccion();
    const item = lista.find((i) => i.id === input.dataset.cantidad);
    if (item) item.cantidad = valor;
    guardarSeleccion(lista);
    render();
  });

  document.getElementById("btn-vaciar-seleccion")?.addEventListener("click", () => {
    if (confirm("¿Vaciar toda tu lista de selección?")) {
      guardarSeleccion([]);
      render();
    }
  });

  render();
});
