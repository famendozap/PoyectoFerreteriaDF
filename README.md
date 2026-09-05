# Ferretería Los Maestros — Sitio Web (Evaluación Parcial 1)

Proyecto académico para el curso **DSY1104 — Desarrollo FullStack II**, carrera Analista Programador, Duoc UC.

Sitio web estático (HTML5 + CSS3 + JavaScript) construido a partir del caso **Ferretería Los Maestros** (La Serena, Forma E), según lo solicitado en las *Instrucciones Evaluación 1*: estructura y etiquetado HTML actual, hoja de estilos CSS externa, validaciones e interacción con JavaScript, datos servidos desde arreglos de JavaScript, uso de LocalStorage, y trabajo colaborativo en GitHub.

> Esta evaluación **no requiere conexión a base de datos ni backend**: los formularios y mantenedores validan datos en el navegador y usan LocalStorage para simular persistencia.

## Cómo abrir el proyecto

No necesitas instalar nada. Basta con abrir `index.html` en tu navegador (Chrome, Edge o Firefox).

Si prefieres levantar un servidor local (recomendado para que el mapa de Leaflet y las rutas relativas funcionen igual que en producción):

```bash
# Python 3
python3 -m http.server 8080
# luego visita http://localhost:8080
```

o con la extensión **Live Server** de VS Code.

## Estructura del proyecto

```
proyecto-ferreteria/
├── index.html                Página de inicio
├── nosotros.html              Historia de la empresa y equipo
├── catalogo.html              Catálogo con filtro por categoría y buscador
├── producto-detalle.html      Ficha de producto (según ?id=)
├── seleccion.html             Lista de selección / carrito (LocalStorage)
├── novedades.html             Listado de noticias / consejos
├── novedad-detalle.html       Detalle de una noticia (según ?id=)
├── contacto.html               Formulario de contacto + mapa de cobertura
├── registro.html               Registro de usuario (cliente/contratista)
├── login.html                  Inicio de sesión
├── css/
│   └── styles.css              Hoja de estilos externa del sitio público
├── js/
│   ├── data.js                 Productos, categorías, noticias, regiones/comunas
│   ├── validaciones.js         Funciones de validación reutilizables (RUN, correo, largo…)
│   ├── main.js                 Menú hamburguesa, LocalStorage de selección, sesión simulada
│   ├── catalogo.js              Render y filtros del catálogo
│   ├── producto-detalle.js      Ficha de producto
│   ├── seleccion.js             Lógica de la lista de selección
│   ├── novedades.js             Listado y detalle de noticias
│   ├── login.js / registro.js / contacto.js   Validación de cada formulario
├── admin/                       Área administrativa (visualmente diferenciada)
│   ├── index.html               Panel principal con KPIs
│   ├── productos.html           Mantenedor de productos (listar/crear/editar/eliminar)
│   ├── usuarios.html            Mantenedor de usuarios (listar/crear/editar/desactivar)
│   ├── css/admin.css
│   └── js/admin-productos.js, admin-usuarios.js
└── img/                         Imágenes SVG propias (logo, categorías, banners)
```

## Datos usados

Los productos del catálogo son una muestra representativa tomada de la planilla real `Catálogo Ferretería Los Maestros.xlsx` entregada para el caso (código, categoría, marca, unidad, precio y stock). El catálogo completo de la ferretería supera las 800 referencias; aquí se modelan ~40 productos distribuidos en las 10 categorías del negocio para efectos de la evaluación.

## Validaciones implementadas

- **Inicio de sesión:** correo obligatorio (máx. 100 caracteres, formato válido) y contraseña (4 a 10 caracteres).
- **Contacto:** nombre (máx. 100), correo (máx. 100, formato válido) y comentario (obligatorio, máx. 500 caracteres, con contador en vivo).
- **Registro / mantenedor de usuarios:** RUN con validación de dígito verificador, nombre (máx. 50), apellidos (máx. 100), correo (máx. 100, formato válido), región/comuna dependientes cargadas desde un arreglo JS, dirección (máx. 300) y confirmación de contraseña.

## Equipo de desarrollo

Reemplaza los nombres de ejemplo en `nosotros.html` por los integrantes reales de tu equipo antes de la entrega.

## Flujo de trabajo en GitHub sugerido

1. Crea un repositorio público (ej. `ferreteria-los-maestros-dsy1104`).
2. `git init`, `git add .`, `git commit -m "Estructura inicial del sitio"`.
3. `git remote add origin <url-de-tu-repo>` y `git push -u origin main`.
4. Cada integrante trabaja en una rama (`feature/catalogo`, `feature/admin`, etc.) y hace *pull request* hacia `main`, con commits descriptivos y frecuentes (no un solo commit gigante).
5. Documenten en el `README.md` quién trabajó en qué módulo si el docente lo pide.

## Próximos pasos (siguientes evaluaciones)

- Construcción del backend con microservicios Spring Boot y base de datos MySQL/PostgreSQL (según la Sección 0 del documento de caso).
- Autenticación real con JWT y roles.
- Conexión de los formularios de registro/login/mantenedores a la API REST.
- Mapa interactivo con zona de cobertura real de despacho.
