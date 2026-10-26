/* =========================================================
   NATÚ NATÚ · tienda, bolsa de pedido y WhatsApp
   ========================================================= */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const pesos = new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0,
  });

  const linkWA = (texto) =>
    `https://wa.me/${NATU.whatsapp}?text=${encodeURIComponent(texto)}`;

  /* ---------- Ilustraciones de producto (SVG a mano) ---------- */
  const DIBUJOS = {
    jabon: `
      <ellipse cx="100" cy="150" rx="66" ry="9" class="sombra"/>
      <path d="M44 92c0-12 8-20 20-20h72c12 0 20 8 20 20v38c0 9-7 16-16 16H60c-9 0-16-7-16-16Z" class="relleno"/>
      <path d="M50 86c2-8 8-12 16-12h68c8 0 14 4 16 12" class="trazo"/>
      <ellipse cx="100" cy="108" rx="30" ry="15" class="trazo"/>
      <text x="100" y="113" text-anchor="middle" class="sello">natú</text>
      <path d="M150 62c6-10 16-12 22-8-4 8-12 12-22 8Z M148 64c4-4 10-8 18-9" class="hoja"/>`,
    sal: `
      <ellipse cx="100" cy="152" rx="52" ry="8" class="sombra"/>
      <rect x="62" y="44" width="76" height="18" rx="4" class="tapa"/>
      <path d="M58 70h84v66c0 9-7 14-14 14H72c-7 0-14-5-14-14Z" class="vidrio"/>
      <path d="M62 104c12-6 22 4 38-2s26 2 38-2v34c0 6-5 10-10 10H72c-5 0-10-4-10-10Z" class="relleno"/>
      <circle cx="78" cy="118" r="3" class="punto"/><circle cx="96" cy="128" r="2.5" class="punto"/>
      <circle cx="116" cy="116" r="3" class="punto"/><circle cx="124" cy="132" r="2" class="punto"/>
      <rect x="74" y="78" width="52" height="18" rx="2" class="etiqueta"/>`,
    vela: `
      <ellipse cx="100" cy="152" rx="56" ry="8" class="sombra"/>
      <path d="M56 84h88v54c0 8-6 12-12 12H68c-6 0-12-4-12-12Z" class="relleno"/>
      <ellipse cx="100" cy="84" rx="44" ry="9" class="cera"/>
      <path d="M100 82V70" class="trazo"/>
      <path d="M100 42c8 10 9 18 0 26-9-8-8-16 0-26Z" class="llama"/>
      <rect x="72" y="104" width="56" height="24" rx="2" class="etiqueta"/>`,
    desodorante: `
      <ellipse cx="100" cy="152" rx="40" ry="7" class="sombra"/>
      <rect x="74" y="38" width="52" height="26" rx="10" class="tapa"/>
      <rect x="70" y="62" width="60" height="88" rx="10" class="relleno"/>
      <rect x="80" y="88" width="40" height="36" rx="2" class="etiqueta"/>
      <path d="M86 98h28M86 106h22M86 114h26" class="trazo fino"/>`,
    manual: `
      <ellipse cx="100" cy="154" rx="62" ry="7" class="sombra"/>
      <path d="M48 46h56c8 0 12 4 12 10v92c0-6-4-8-12-8H48Z" class="relleno" transform="rotate(-4 100 100)"/>
      <path d="M152 46h-36c-8 0-12 4-12 10v92c0-6 4-8 12-8h36Z" class="hoja-libro" transform="rotate(-4 100 100)"/>
      <path d="M118 70h24M118 80h20M118 90h24M118 100h14" class="trazo fino" transform="rotate(-4 100 100)"/>
      <path d="M62 68c10 2 18 10 18 22-12-2-18-10-18-22Z" class="hoja" transform="rotate(-4 100 100)"/>`,
    mantequilla: `
      <ellipse cx="100" cy="150" rx="62" ry="8" class="sombra"/>
      <path d="M46 92h108v42c0 9-7 14-15 14H61c-8 0-15-5-15-14Z" class="relleno"/>
      <rect x="40" y="70" width="120" height="24" rx="8" class="tapa"/>
      <path d="M76 66c4-14 20-20 30-10 6-8 20-4 18 8" class="crema-remolino"/>
      <rect x="70" y="106" width="60" height="26" rx="3" class="etiqueta"/>
      <path d="M80 116h40M84 123h32" class="trazo fino"/>`,
    kit: `
      <ellipse cx="100" cy="154" rx="70" ry="8" class="sombra"/>
      <path d="M62 66c-6-14 6-22 16-10l6 8" class="trazo"/>
      <path d="M50 60c4-10 14-10 18 0Z" class="hoja"/>
      <rect x="112" y="40" width="22" height="32" rx="5" class="tapa"/>
      <rect x="138" y="52" width="20" height="22" rx="4" class="cera"/>
      <path d="M36 76h128v62c0 6-5 10-10 10H46c-5 0-10-4-10-10Z" class="relleno"/>
      <rect x="30" y="68" width="140" height="18" rx="4" class="etiqueta"/>
      <path d="M92 68v80M108 68v80" class="lazo"/>
      <path d="M100 68c-14-16-30-8-18 2 6 4 18-2 18-2Zm0 0c14-16 30-8 18 2-6 4-18-2-18-2Z" class="lazo-relleno"/>`,
  };

  const ilustracion = (p) => p.foto
    ? `<img src="${p.foto}" alt="${p.nombre}" loading="lazy" width="400" height="400">`
    : `<svg viewBox="0 0 200 180" role="img" aria-label="${p.nombre}" class="dibujo dibujo--${p.ilustracion}">${DIBUJOS[p.ilustracion] || DIBUJOS.jabon}</svg>`;

  /* ---------- Catálogo ---------- */
  const catalogo = $("#catalogo");

  /* Un producto con tamaños se guarda como "id:posición" (ej. "sales-rosas:1") */
  function buscar(clave) {
    const [id, pos] = String(clave).split(":");
    const p = PRODUCTOS.find((x) => x.id === id);
    if (!p) return null;
    if (!p.variantes) return { ...p, clave: id };
    const v = p.variantes[Number(pos) || 0];
    if (!v) return null;
    return { ...p, clave: `${id}:${p.variantes.indexOf(v)}`,
      nombre: `${p.nombre} · ${v.nombre}`, contenido: v.nombre, precio: v.precio };
  }

  const preguntar = (x) =>
    linkWA(`Hola Natú Natú, me interesa: ${x.nombre} – ${pesos.format(x.precio)}. ¿Está disponible?`);

  function tarjeta(p, i) {
    const x = buscar(p.id);
    const tallas = p.variantes ? `
          <div class="tallas" role="group" aria-label="Tamaño">
            ${p.variantes.map((v, n) => `
              <button class="talla${n ? "" : " activa"}" data-talla="${p.id}:${n}" aria-pressed="${!n}">
                ${v.nombre}<span>${pesos.format(v.precio)}</span>
              </button>`).join("")}
          </div>` : "";
    return `
      <li class="producto tono--${p.color}" style="--i:${i}" data-producto="${p.id}">
        <div class="producto__lienzo">
          ${ilustracion(p)}
          <span class="producto__peso">${x.contenido}</span>
        </div>
        <div class="producto__info">
          <p class="producto__cat">${p.categoria}</p>
          <h3>${p.nombre}</h3>
          <p class="producto__detalle">${p.detalle}</p>
          ${tallas}
          <div class="producto__pie">
            <span class="producto__precio"><b>${pesos.format(x.precio)}</b><small>+ envío</small></span>
            <button class="btn-agregar" data-agregar="${x.clave}" aria-label="Agregar ${x.nombre} al pedido">Agregar</button>
          </div>
          <a class="producto__directo" target="_blank" rel="noopener" href="${preguntar(x)}">
             Preguntar por este →
          </a>
        </div>
      </li>`;
  }

  function pintarCatalogo(filtro = "todo") {
    const lista = PRODUCTOS.filter((p) => filtro === "todo" || p.categoria === filtro);
    catalogo.innerHTML = lista.map(tarjeta).join("");
  }

  function elegirTalla(boton) {
    const x = buscar(boton.dataset.talla);
    const card = boton.closest(".producto");
    $$(".talla", card).forEach((b) => {
      const on = b === boton;
      b.classList.toggle("activa", on);
      b.setAttribute("aria-pressed", on);
    });
    $(".producto__precio b", card).textContent = pesos.format(x.precio);
    $(".producto__peso", card).textContent = x.contenido;
    const agregar = $(".btn-agregar", card);
    agregar.dataset.agregar = x.clave;
    agregar.setAttribute("aria-label", `Agregar ${x.nombre} al pedido`);
    $(".producto__directo", card).href = preguntar(x);
  }

  $$(".filtro").forEach((b) => b.addEventListener("click", () => activarFiltro(b.dataset.filtro)));

  function activarFiltro(f) {
    $$(".filtro").forEach((b) => {
      const on = b.dataset.filtro === f;
      b.classList.toggle("activo", on);
      b.setAttribute("aria-pressed", on);
    });
    pintarCatalogo(f);
  }

  $$("[data-ir-filtro]").forEach((a) =>
    a.addEventListener("click", () => activarFiltro(a.dataset.irFiltro)));

  /* ---------- Bolsa (pedido) ---------- */
  const CLAVE = "natu-bolsa";
  let bolsa = {};
  try { bolsa = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { bolsa = {}; }
  /* limpia productos que ya no existen o claves de versiones anteriores */
  bolsa = Object.entries(bolsa).reduce((acc, [clave, cant]) => {
    const x = buscar(clave);
    if (x && cant > 0) acc[x.clave] = (acc[x.clave] || 0) + cant;
    return acc;
  }, {});

  const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(bolsa)); } catch (e) {} };
  function items() {
    return Object.entries(bolsa)
      .map(([clave, cant]) => ({ p: buscar(clave), cant }))
      .filter((x) => x.p && x.cant > 0);
  }
  const total = () => items().reduce((s, x) => s + x.p.precio * x.cant, 0);

  function pintarBolsa() {
    const lista = items();
    const unidades = lista.reduce((s, x) => s + x.cant, 0);
    const contador = $("#contador");
    contador.textContent = unidades;
    contador.classList.toggle("lleno", unidades > 0);

    $("#bolsaLista").innerHTML = lista.map(({ p, cant }) => `
      <li class="linea tono--${p.color}">
        <div class="linea__mini">${ilustracion(p)}</div>
        <div class="linea__info">
          <p class="linea__nombre">${p.nombre}</p>
          <p class="linea__precio">${pesos.format(p.precio)} · ${p.contenido}</p>
          <div class="cantidad" role="group" aria-label="Cantidad de ${p.nombre}">
            <button data-menos="${p.clave}" aria-label="Quitar uno">−</button>
            <span>${cant}</span>
            <button data-mas="${p.clave}" aria-label="Agregar uno">+</button>
          </div>
        </div>
        <button class="linea__quitar" data-quitar="${p.clave}" aria-label="Eliminar ${p.nombre}">Quitar</button>
      </li>`).join("");

    $("#bolsaVacia").hidden = lista.length > 0;
    $("#formPedido").hidden = lista.length === 0;
    $("#bolsaTotal").textContent = pesos.format(total());
  }

  function cambiar(id, delta) {
    bolsa[id] = Math.max(0, (bolsa[id] || 0) + delta);
    if (!bolsa[id]) delete bolsa[id];
    guardar();
    pintarBolsa();
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.talla) elegirTalla(t);
    if (t.dataset.agregar) {
      cambiar(t.dataset.agregar, 1);
      avisar(`${buscar(t.dataset.agregar).nombre} quedó en tu pedido`);
      volarAlPedido(t);
      t.classList.add("agregado");
      t.textContent = "¡Listo!";
      setTimeout(() => { t.classList.remove("agregado"); t.textContent = "Agregar"; }, 1200);
      $("#contador").animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.35)" }, { transform: "scale(1)" }],
        { duration: 320, easing: "ease-out" });
    }
    if (t.dataset.mas) cambiar(t.dataset.mas, 1);
    if (t.dataset.menos) cambiar(t.dataset.menos, -1);
    if (t.dataset.quitar) { delete bolsa[t.dataset.quitar]; guardar(); pintarBolsa(); }
  });

  /* Abrir / cerrar */
  const panel = $("#bolsa"), velo = $("#velo");
  let ultimoFoco = null;

  function abrirBolsa() {
    ultimoFoco = document.activeElement;
    velo.hidden = false;
    panel.removeAttribute("inert");
    panel.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => { panel.classList.add("abierta"); velo.classList.add("visible"); });
    document.body.classList.add("sin-scroll");
    $("#cerrarBolsa").focus();
  }
  function cerrarBolsa() {
    panel.classList.remove("abierta");
    velo.classList.remove("visible");
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("inert", "");
    document.body.classList.remove("sin-scroll");
    setTimeout(() => { velo.hidden = true; }, 250);
    if (ultimoFoco) ultimoFoco.focus();
  }
  $("#abrirBolsa").addEventListener("click", abrirBolsa);
  $("#cerrarBolsa").addEventListener("click", cerrarBolsa);
  velo.addEventListener("click", cerrarBolsa);
  $$("[data-cerrar-bolsa]").forEach((a) => a.addEventListener("click", cerrarBolsa));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("abierta")) cerrarBolsa();
  });

  /* Enviar pedido */
  $("#formPedido").addEventListener("submit", (e) => {
    e.preventDefault();
    const lista = items();
    if (!lista.length) return;
    const nombre = $("#pNombre").value.trim();
    const ciudad = $("#pCiudad").value.trim();
    const nota = $("#pNota").value.trim();

    let msg = "Hola Natú Natú, quiero hacer este pedido:\n\n";
    lista.forEach(({ p, cant }) => {
      msg += `• ${cant} × ${p.nombre} · ${pesos.format(p.precio)} c/u = ${pesos.format(p.precio * cant)}\n`;
    });
    msg += `\nUnidades: ${lista.reduce((s, x) => s + x.cant, 0)}`;
    msg += `\nSubtotal: ${pesos.format(total())} (sin costo de envío)`;
    if (nombre) msg += `\nNombre: ${nombre}`;
    if (ciudad) msg += `\nCiudad: ${ciudad}`;
    if (nota) msg += `\nNota: ${nota}`;
    msg += "\n\n¿Me confirman disponibilidad y cuánto sale el envío?";

    window.open(linkWA(msg), "_blank", "noopener");
  });

  /* ---------- Enlaces de WhatsApp y redes ---------- */
  $$("[data-wa]").forEach((a) => {
    a.href = linkWA(a.dataset.waMsg || "Hola Natú Natú, quiero más información.");
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$("[data-red]").forEach((a) => { a.href = NATU[a.dataset.red] || "#"; });

  /* ---------- Animaciones ---------- */
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Una flor sale del botón y vuela hasta la bolsa */
  function volarAlPedido(boton) {
    if (quieto) return;
    const a = boton.getBoundingClientRect();
    const b = $("#abrirBolsa").getBoundingClientRect();
    const flor = document.createElement("span");
    flor.className = "flor-vuela";
    flor.style.left = `${a.left + a.width / 2 - 11}px`;
    flor.style.top = `${a.top + a.height / 2 - 11}px`;
    document.body.appendChild(flor);
    setTimeout(() => flor.remove(), 1200);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2);
    const dy = b.top + b.height / 2 - (a.top + a.height / 2);
    flor.animate([
      { transform: "translate(0,0) scale(.6) rotate(0)", opacity: 0 },
      { transform: `translate(${dx * .35}px, ${dy * .35 - 90}px) scale(1.4) rotate(140deg)`, opacity: 1, offset: .4 },
      { transform: `translate(${dx}px, ${dy}px) scale(.5) rotate(320deg)`, opacity: .9 },
    ], { duration: 750, easing: "cubic-bezier(.5,0,.3,1)" }).onfinish = () => {
      flor.remove();
      $("#abrirBolsa").animate(
        [{ transform: "rotate(0)" }, { transform: "rotate(-8deg)" }, { transform: "rotate(6deg)" }, { transform: "rotate(0)" }],
        { duration: 400, easing: "ease-out" });
    };
  }

  /* Pétalos de cerezo cayendo en la portada */
  const petalos = $("#petalos");
  if (petalos && !quieto) {
    const cuantos = innerWidth < 600 ? 9 : 16;
    for (let i = 0; i < cuantos; i++) {
      const p = document.createElement("span");
      const tam = 10 + Math.random() * 12;
      p.style.cssText = `left:${Math.random() * 100}%;width:${tam}px;height:${tam}px;` +
        `animation-duration:${9 + Math.random() * 9}s,${3 + Math.random() * 3}s;` +
        `animation-delay:${-Math.random() * 16}s,${-Math.random() * 3}s;opacity:${.55 + Math.random() * .4}`;
      petalos.appendChild(p);
    }
  }

  /* Aparecer al bajar */
  const revelar = [
    ".encabezado-seccion", ".filtros", ".pasos__lista li", ".taller__grid > *",
    ".nosotras__intro", ".nosotras__logo", ".ficha", ".valores__titulo", ".valores > div",
    ".voz", ".pie__grid > *",
  ];
  const mirador = "IntersectionObserver" in window && new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visto"); mirador.unobserve(e.target); }
    });
  }, { threshold: .15, rootMargin: "0px 0px -40px 0px" });

  revelar.forEach((sel) => $$(sel).forEach((el) => {
    const hermanos = [...el.parentElement.children];
    el.style.setProperty("--d", `${Math.min(hermanos.indexOf(el), 5) * 90}ms`);
    el.classList.add("revelar");
    mirador ? mirador.observe(el) : el.classList.add("visto");
  }));
  if (mirador) mirador.observe(catalogo); else catalogo.classList.add("visto");

  /* ---------- Menú móvil ---------- */
  const btnMenu = $("#btnMenu"), menu = $("#menu");
  btnMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    btnMenu.setAttribute("aria-expanded", abierto);
  });
  $$("a", menu).forEach((a) => a.addEventListener("click", () => {
    menu.classList.remove("abierto");
    btnMenu.setAttribute("aria-expanded", "false");
  }));

  /* Cabecera con borde al bajar */
  const cabecera = $("#cabecera");
  addEventListener("scroll", () => cabecera.classList.toggle("bajando", scrollY > 30), { passive: true });

  /* ---------- Aviso ---------- */
  let tAviso;
  function avisar(texto) {
    const a = $("#aviso");
    a.textContent = texto;
    a.classList.add("visible");
    clearTimeout(tAviso);
    tAviso = setTimeout(() => a.classList.remove("visible"), 2600);
  }

  $("#anio").textContent = new Date().getFullYear();
  pintarCatalogo();
  pintarBolsa();
})();
