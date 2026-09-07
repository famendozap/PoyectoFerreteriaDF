
const CATEGORIAS = [
  { slug: "mat-construccion",       nombre: "Materiales de Construcción", img: "img/mat-construccion .jpeg" },
  { slug: "pinturas",               nombre: "Pinturas y Recubrimientos",  img: "img/Pinturas-recubrimiento.jpeg" },
  { slug: "herramientas-manuales",  nombre: "Herramientas Manuales",      img: "img/herramientas-manuales.jpeg" },
  { slug: "herramientas-electricas",nombre: "Herramientas Eléctricas",    img: "img/herramientas electricas.jpeg" },
  { slug: "gasfiteria",             nombre: "Gasfitería",                 img: "img/gasfiteria.jpeg" },
  { slug: "electricidad",           nombre: "Electricidad",               img: "img/electricidad.jpeg" },
  { slug: "tornilleria",            nombre: "Tornillería y Fijaciones",   img: "img/tornillos.jpeg" },
  { slug: "madera",                 nombre: "Madera y Tableros",          img: "img/madera.jpeg" },
  { slug: "seguridad",              nombre: "Seguridad y EPP",            img: "img/seguridad .jpeg" },
  { slug: "jardin",                 nombre: "Jardín y Exterior",          img: "img/jardin y exterior .jpeg" },
];
//aca van las imagenes del catalogo77 porsiacaso

const PRODUCTOS = [
  { id: "MC001", categoria: "mat-construccion", nombre: "Cemento Polpaico gris 25 kg", marca: "Polpaico", unidad: "Saco", precio: 5990, stock: 80, stockMinimo: 20 },
  { id: "MC002", categoria: "mat-construccion", nombre: "Cemento Melón blanco 25 kg", marca: "Melón", unidad: "Saco", precio: 7490, stock: 40, stockMinimo: 10 },
  { id: "MC003", categoria: "mat-construccion", nombre: "Mortero cola cerámica 25 kg", marca: "Volcán", unidad: "Saco", precio: 5200, stock: 50, stockMinimo: 15 },
  { id: "MC005", categoria: "mat-construccion", nombre: "Arena fina construcción 25 kg", marca: "Granel", unidad: "Saco", precio: 1800, stock: 60, stockMinimo: 20 },
  { id: "MC007", categoria: "mat-construccion", nombre: "Ladrillo fiscal N°5", marca: "Local", unidad: "Unidad", precio: 380, stock: 500, stockMinimo: 100 },
  { id: "MC009", categoria: "mat-construccion", nombre: "Bloque de hormigón 19x19x39 cm", marca: "Volcán", unidad: "Unidad", precio: 1200, stock: 200, stockMinimo: 50 },

  { id: "PT001", categoria: "pinturas", nombre: "Pintura látex interior 1 galón blanco", marca: "Sipa", unidad: "Galón", precio: 9990, stock: 40, stockMinimo: 10 },
  { id: "PT003", categoria: "pinturas", nombre: "Pintura látex exterior 1 galón blanco", marca: "Kömex", unidad: "Galón", precio: 13990, stock: 25, stockMinimo: 8 },
  { id: "PT005", categoria: "pinturas", nombre: "Esmalte sintético 1 litro (varios col.)", marca: "Sipa", unidad: "1 litro", precio: 9490, stock: 30, stockMinimo: 10 },
  { id: "PT006", categoria: "pinturas", nombre: "Pintura antihumedad 1 galón blanco", marca: "Kömex", unidad: "Galón", precio: 17990, stock: 15, stockMinimo: 5 },
  { id: "PT007", categoria: "pinturas", nombre: "Rodillo lana 23 cm con mango", marca: "Wurth", unidad: "Unidad", precio: 3990, stock: 30, stockMinimo: 10 },

  { id: "HM001", categoria: "herramientas-manuales", nombre: "Martillo carpintero 500g", marca: "Stanley", unidad: "Unidad", precio: 7990, stock: 20, stockMinimo: 5 },
  { id: "HM002", categoria: "herramientas-manuales", nombre: "Alicate universal 8\"", marca: "Stanley", unidad: "Unidad", precio: 7290, stock: 15, stockMinimo: 5 },
  { id: "HM005", categoria: "herramientas-manuales", nombre: "Llave ajustable 10\"", marca: "Bahco", unidad: "Unidad", precio: 8490, stock: 12, stockMinimo: 4 },
  { id: "HM008", categoria: "herramientas-manuales", nombre: "Nivel de burbuja 60 cm", marca: "Stanley", unidad: "Unidad", precio: 10490, stock: 8, stockMinimo: 3 },
  { id: "HM010", categoria: "herramientas-manuales", nombre: "Cinta métrica 8m autoblocante", marca: "Stanley", unidad: "Unidad", precio: 6490, stock: 20, stockMinimo: 6 },

  { id: "HE001", categoria: "herramientas-electricas", nombre: "Taladro percutor 650W 13mm", marca: "Makita", unidad: "Unidad", precio: 79990, stock: 8, stockMinimo: 2 },
  { id: "HE003", categoria: "herramientas-electricas", nombre: "Amoladora angular 4.5\" 800W", marca: "Makita", unidad: "Unidad", precio: 54990, stock: 8, stockMinimo: 2 },
  { id: "HE004", categoria: "herramientas-electricas", nombre: "Sierra circular 7-1/4\" 1200W", marca: "Skil", unidad: "Unidad", precio: 72990, stock: 4, stockMinimo: 1 },
  { id: "HE005", categoria: "herramientas-electricas", nombre: "Lijadora orbital 180W", marca: "Black+Decker", unidad: "Unidad", precio: 34990, stock: 6, stockMinimo: 2 },

  { id: "GS001", categoria: "gasfiteria", nombre: "Cañería PVC 1/2\" x 6m", marca: "Tigre", unidad: "Unidad", precio: 5490, stock: 30, stockMinimo: 10 },
  { id: "GS007", categoria: "gasfiteria", nombre: "Llave de paso esfera 1/2\" latón", marca: "Emmeti", unidad: "Unidad", precio: 3490, stock: 30, stockMinimo: 10 },
  { id: "GS009", categoria: "gasfiteria", nombre: "Grifería lavamanos monocomando cromo", marca: "Corona", unidad: "Unidad", precio: 22990, stock: 10, stockMinimo: 3 },
  { id: "GS012", categoria: "gasfiteria", nombre: "Silicona transparente 280ml", marca: "Wacker", unidad: "Cartucho", precio: 5490, stock: 25, stockMinimo: 8 },

  { id: "EL004", categoria: "electricidad", nombre: "Enchufe empotrar 16A c/tierra (schuko)", marca: "Bticino", unidad: "Unidad", precio: 3690, stock: 50, stockMinimo: 15 },
  { id: "EL008", categoria: "electricidad", nombre: "Tablero eléctrico 4 espacios DIN", marca: "Legrand", unidad: "Unidad", precio: 22990, stock: 8, stockMinimo: 2 },
  { id: "EL011", categoria: "electricidad", nombre: "Ampolleta LED 9W E27 luz fría", marca: "Philips", unidad: "Unidad", precio: 3990, stock: 60, stockMinimo: 20 },
  { id: "EL013", categoria: "electricidad", nombre: "Panel LED empotrar 18W 22cm", marca: "Ledvance", unidad: "Unidad", precio: 11490, stock: 20, stockMinimo: 6 },

  { id: "TR001", categoria: "tornilleria", nombre: "Tornillo autoperf. 8x1\" caja 100 unid.", marca: "Hilti", unidad: "Caja", precio: 2990, stock: 40, stockMinimo: 12 },
  { id: "TR004", categoria: "tornilleria", nombre: "Taco fisher S6 bolsa 100 unid.", marca: "Fischer", unidad: "Bolsa", precio: 3190, stock: 35, stockMinimo: 10 },
  { id: "TR008", categoria: "tornilleria", nombre: "Anclaje químico epoxi 300ml", marca: "Fischer", unidad: "Cartucho", precio: 15990, stock: 8, stockMinimo: 2 },

  { id: "MD003", categoria: "madera", nombre: "Terciado estructural 18mm 1.22x2.44m", marca: "Arauco", unidad: "Plancha", precio: 34990, stock: 20, stockMinimo: 5 },
  { id: "MD006", categoria: "madera", nombre: "Volcanita estándar 10mm 1.2x2.4m", marca: "Volcán", unidad: "Plancha", precio: 8990, stock: 30, stockMinimo: 8 },

  { id: "SE001", categoria: "seguridad", nombre: "Casco de seguridad blanco", marca: "3M", unidad: "Unidad", precio: 6990, stock: 15, stockMinimo: 5 },
  { id: "SE002", categoria: "seguridad", nombre: "Guantes de cuero talla L", marca: "3M", unidad: "Par", precio: 3690, stock: 20, stockMinimo: 6 },
  { id: "SE005", categoria: "seguridad", nombre: "Arnés de seguridad 1 punto", marca: "3M", unidad: "Unidad", precio: 34990, stock: 4, stockMinimo: 1 },

  { id: "JA001", categoria: "jardin", nombre: "Manguera de riego 3/4\" x 25m", marca: "Tigre", unidad: "Unidad", precio: 22990, stock: 6, stockMinimo: 2 },
  { id: "JA004", categoria: "jardin", nombre: "Pala punta redonda #2 con mango", marca: "Corona", unidad: "Unidad", precio: 10990, stock: 8, stockMinimo: 2 },
];


const DESTACADOS = ["HE001", "MC001", "PT001", "HM001", "GS009", "SE001", "EL011", "MD003"];


const NOTICIAS = [
  {
    id: 1,
    titulo: "Cómo elegir el cemento correcto para tu obra",
    resumen: "Grado, marca y uso: te contamos qué considerar antes de comprar sacos de cemento para tu próximo proyecto.",
    imagen: "img/cemento.jpeg",
    fecha: "2026-08-12",
    autor: "Equipo Los Maestros",
    contenido: [
      "No todos los cementos sirven para lo mismo. El cemento gris Polpaico es el más usado en estructuras (fundaciones, pilares, radieres), mientras que el cemento blanco Melón se reserva para trabajos de terminación donde importa la estética, como enchapes o detalles decorativos.",
      "Antes de comprar, calcula la cantidad de sacos según los metros cúbicos de hormigón o mortero que necesitas: un saco de 25 kg rinde aproximadamente 0,015 a 0,02 m³ dependiendo de la dosificación.",
      "Recuerda almacenar los sacos sobre una tarima, en un lugar seco y ventilado. La humedad es el principal enemigo del cemento y puede dejarlo inutilizable en pocos días.",
      "En Ferretería Los Maestros contamos con stock permanente de cemento Polpaico y Melón. Si compras en volumen para tu obra, consulta por nuestra modalidad de cuenta corriente para contratistas."
    ]
  },
  {
    id: 2,
    titulo: "Nueva forma de consultar stock antes de ir a la tienda",
    resumen: "Estamos digitalizando la consulta de disponibilidad para que contratistas y clientes no tengan que llamar por teléfono.",
    imagen: "img/despacho.jpeg",
    fecha: "2026-08-20",
    autor: "Equipo Los Maestros",
    contenido: [
      "Sabemos que en días de alta demanda el teléfono de la tienda se satura y muchas llamadas para consultar stock se pierden. Por eso estamos incorporando el catálogo en línea, donde puedes revisar la disponibilidad estimada de cada producto antes de venir a retirarlo.",
      "Esta primera versión del sitio te permite navegar el catálogo, ver el detalle de cada producto y armar una lista de interés con lo que necesitas para tu próxima visita o pedido.",
      "Muy pronto sumaremos el registro de cuenta corriente para contratistas frecuentes, con historial de compras y estado de pago disponible en línea.",
      "Si tienes sugerencias sobre qué funcionalidades te gustaría ver en el sitio, escríbenos desde el formulario de contacto."
    ]
  }
];


const REGIONES = [
  { region: "Región de Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle", "Vicuña", "Andacollo"] },
  { region: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio", "Los Andes"] },
  { region: "Región Metropolitana", comunas: ["Santiago", "Maipú", "Puente Alto", "Las Condes", "La Florida"] },
  { region: "Región del Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Chillán", "Coronel"] },
  { region: "Región de La Araucanía", comunas: ["Temuco", "Villarrica", "Angol", "Pucón", "Lautaro"] },
];


const USUARIOS_INICIALES = [
  { run: "111111111", nombre: "Pedro", apellidos: "Álvarez Muñoz", correo: "pedro.alvarez@lomaestros.cl", tipo: "Administrador", region: "Región de Coquimbo", comuna: "La Serena", direccion: "Av. Francisco de Aguirre 450" },
  { run: "222222222", nombre: "Marcela", apellidos: "Rojas Peña", correo: "marcela.rojas@lomaestros.cl", tipo: "Vendedor", region: "Región de Coquimbo", comuna: "La Serena", direccion: "Los Carrera 812" },
  { run: "333333333", nombre: "Juan", apellidos: "Contreras Silva", correo: "juan.contreras@gmail.com", tipo: "Contratista", region: "Región de Coquimbo", comuna: "Coquimbo", direccion: "Sector El Sauce, obra particular" },
];
