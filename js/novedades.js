/* ==========================================================================
   novedades.js — Listado y detalle de noticias/consejos
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderListadoNoticias();
  renderDetalleNoticia();
});

function renderListadoNoticias() {
  const grilla = document.getElementById("grilla-noticias");
  if (!grilla) return;
  grilla.innerHTML = "";
  NOTICIAS.forEach((n) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-noticia";
    tarjeta.innerHTML = `
      <a href="novedad-detalle.html?id=${n.id}">
        <img src="${n.imagen}" alt="${escaparHtml(n.titulo)}" width="480" height="260">
      </a>
      <div class="cont">
        <span class="fecha">${formatoFecha(n.fecha)} · ${escaparHtml(n.autor)}</span>
        <h3><a href="novedad-detalle.html?id=${n.id}">${escaparHtml(n.titulo)}</a></h3>
        <p>${escaparHtml(n.resumen)}</p>
        <a href="novedad-detalle.html?id=${n.id}" class="boton boton-linea boton-pequeno" style="align-self:flex-start;">Leer más</a>
      </div>
    `;
    grilla.appendChild(tarjeta);
  });
}

function renderDetalleNoticia() {
  const contenedor = document.getElementById("detalle-noticia");
  if (!contenedor) return;

  const id = Number(obtenerParametro("id"));
  const noticia = NOTICIAS.find((n) => n.id === id);

  if (!noticia) {
    contenedor.innerHTML = `
      <div class="estado-vacio">
        <img src="img/caja-vacia.svg" alt="" width="120" height="96">
        <h2>Publicación no encontrada</h2>
        <a class="boton boton-secundario" href="novedades.html">Volver a novedades</a>
      </div>`;
    return;
  }

  document.title = `${noticia.titulo} — Ferretería Los Maestros`;
  const migaNombre = document.getElementById("miga-nombre-noticia");
  if (migaNombre) migaNombre.textContent = noticia.titulo;

  contenedor.innerHTML = `
    <span class="fecha">${formatoFecha(noticia.fecha)} · ${escaparHtml(noticia.autor)}</span>
    <h1>${escaparHtml(noticia.titulo)}</h1>
    <img src="${noticia.imagen}" alt="" style="width:100%; max-width:720px; margin:18px 0; border:1px solid var(--concrete-dark);">
    ${noticia.contenido.map((parrafo) => `<p>${escaparHtml(parrafo)}</p>`).join("")}
    <a href="novedades.html" class="boton boton-linea" style="margin-top:20px;">Volver a novedades</a>
  `;
}

function formatoFecha(iso) {
  const fecha = new Date(iso + "T00:00:00");
  return fecha.toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" });
}
