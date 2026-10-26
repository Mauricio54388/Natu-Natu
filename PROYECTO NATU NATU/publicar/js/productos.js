/* =========================================================
   CATÁLOGO NATÚ NATÚ
   Edita aquí nombres, precios (en pesos colombianos) y
   descripciones. Para agregar un producto copia un bloque {...}.

   categoria: jabones | mantequillas | sales | velas | desodorantes | manuales | kits
   ilustracion: jabon | mantequilla | sal | vela | desodorante | manual | kit
   color: rosa | salvia | mantequilla | agua | arcilla | lila
   foto (opcional): ruta a una foto real, ej. "img/productos/avena.jpg"

   variantes (opcional): tamaños con su propio precio. Ejemplo:
     variantes: [
       { nombre: "Pequeña", precio: 10000 },
       { nombre: "Grande",  precio: 15000 },
     ],
   ========================================================= */

const NATU = {
  whatsapp: "573193265534",          // 57 + número, sin espacios
  instagram: "https://www.instagram.com/",   // cambia por el perfil real
  facebook: "https://www.facebook.com/",     // cambia por la página real
};

const PRODUCTOS = [
  /* ---------- Jabones ---------- */
  {
    id: "jabon-avena-miel",
    foto: "img/productos/jabon-avena-miel.webp",
    nombre: "Jabón de avena y miel",
    categoria: "jabones",
    ilustracion: "jabon",
    color: "mantequilla",
    detalle: "Para piel sensible. Exfolia suave sin resecar.",
    contenido: "Barra",
    precio: 7000,
  },
  {
    id: "jabon-lavanda",
    foto: "img/productos/jabon-lavanda.webp",
    nombre: "Jabón de lavanda",
    categoria: "jabones",
    ilustracion: "jabon",
    color: "lila",
    detalle: "Con flor seca y aceite esencial. El de la noche.",
    contenido: "Barra",
    precio: 7000,
  },
  {
    id: "jabon-carbon",
    foto: "img/productos/jabon-carbon.webp",
    nombre: "Jabón de carbón y árbol de té",
    categoria: "jabones",
    ilustracion: "jabon",
    color: "agua",
    detalle: "Limpieza profunda para piel grasa o con brotes.",
    contenido: "Barra",
    precio: 7000,
  },

  /* ---------- Mantequilla corporal ---------- */
  {
    id: "mantequilla-corporal",
    foto: "img/productos/mantequilla-corporal.webp",
    nombre: "Mantequilla corporal",
    categoria: "mantequillas",
    ilustracion: "mantequilla",
    color: "rosa",
    detalle: "Hidratación profunda con mantecas naturales. Se derrite al tocar la piel.",
    contenido: "Frasco",
    precio: 15000,
  },

  /* ---------- Sales de baño (pequeña y grande) ---------- */
  {
    id: "sales-rosas",
    foto: "img/productos/sales-rosas.webp",
    nombre: "Sales de rosas y lavanda",
    categoria: "sales",
    ilustracion: "sal",
    color: "rosa",
    detalle: "Sal marina con pétalos. Para tina o baño de pies.",
    variantes: [
      { nombre: "Pequeña", precio: 10000 },
      { nombre: "Grande", precio: 15000 },
    ],
  },
  {
    id: "sales-eucalipto",
    foto: "img/productos/sales-eucalipto.webp",
    nombre: "Sales de eucalipto",
    categoria: "sales",
    ilustracion: "sal",
    color: "salvia",
    detalle: "Destapa, relaja y deja el baño oliendo a monte.",
    variantes: [
      { nombre: "Pequeña", precio: 10000 },
      { nombre: "Grande", precio: 15000 },
    ],
  },

  /* ---------- Velas ---------- */
  {
    id: "vela-vainilla",
    foto: "img/productos/vela-vainilla.webp",
    nombre: "Vela de soya · vainilla",
    categoria: "velas",
    ilustracion: "vela",
    color: "arcilla",
    detalle: "Cera de soya y mecha de algodón. Aroma cálido y suave.",
    contenido: "Vela",
    precio: 25000,
  },
  {
    id: "vela-citronela",
    foto: "img/productos/vela-citronela.webp",
    nombre: "Vela de soya · citronela",
    categoria: "velas",
    ilustracion: "vela",
    color: "mantequilla",
    detalle: "Para el patio o el balcón. Aleja los zancudos.",
    contenido: "Vela",
    precio: 25000,
  },

  /* ---------- Desodorantes ---------- */
  {
    id: "desodorante-barra",
    foto: "img/productos/desodorante-barra.webp",
    nombre: "Desodorante en barra",
    categoria: "desodorantes",
    ilustracion: "desodorante",
    color: "salvia",
    detalle: "Sin aluminio ni alcohol. Con bicarbonato suave.",
    contenido: "Barra",
    precio: 10000,
  },
  {
    id: "desodorante-crema",
    foto: "img/productos/desodorante-crema.webp",
    nombre: "Desodorante en crema",
    categoria: "desodorantes",
    ilustracion: "desodorante",
    color: "rosa",
    detalle: "En frasco de vidrio. Se aplica con los dedos.",
    contenido: "Crema",
    precio: 10000,
  },

  /* ---------- Manuales ---------- */
  {
    id: "manual-jabones",
    foto: "img/productos/manual-jabones.webp",
    nombre: "Manual: jabones en casa",
    categoria: "manuales",
    ilustracion: "manual",
    color: "agua",
    detalle: "Paso a paso, con recetas y lista de materiales. PDF.",
    contenido: "Digital",
    precio: 35000,
  },
  {
    id: "manual-velas",
    foto: "img/productos/manual-velas.webp",
    nombre: "Manual: velas de soya",
    categoria: "manuales",
    ilustracion: "manual",
    color: "arcilla",
    detalle: "Desde la mecha hasta el aroma. Ideal para emprender.",
    contenido: "Digital",
    precio: 35000,
  },

  /* ---------- Kits ---------- */
  {
    id: "kit",
    foto: "img/productos/kit.webp",
    nombre: "Kit Natú Natú",
    categoria: "kits",
    ilustracion: "kit",
    color: "lila",
    detalle: "Una caja con varios de nuestros productos. Perfecto para regalar.",
    variantes: [
      { nombre: "Pequeño", precio: 25000 },
      { nombre: "Grande", precio: 35000 },
    ],
  },
];
