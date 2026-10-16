// Ilustraciones vectoriales propias (SVG) para el manual. Cada entrada: ILL[idDelProcedimiento] = { svg(), cap }.
(function () {
  const F = 'font-family="Segoe UI,system-ui,sans-serif"';
  const tx = (x, y, t, o = {}) => `<text x="${x}" y="${y}" font-size="${o.s || 13}" font-weight="${o.w || 400}" fill="${o.c || "#14213a"}" text-anchor="${o.a || "middle"}" ${F}>${t}</text>`;
  const rc = (x, y, w, h, f, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 8}" fill="${f}" stroke="${o.s || "none"}" stroke-width="${o.sw || 1.5}"${o.d ? ` stroke-dasharray="${o.d}"` : ""}${o.op ? ` opacity="${o.op}"` : ""}/>`;
  const ci = (x, y, r, f, o = {}) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${o.s || "none"}" stroke-width="${o.sw || 1.5}"/>`;
  const ln = (x1, y1, x2, y2, c = "#2563eb", w = 2, o = "") => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" ${o}/>`;
  const arrowDefs = `<defs><marker id="ar" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 9 4.5 0 9z" fill="#2563eb"/></marker><marker id="ag" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 9 4.5 0 9z" fill="#16a34a"/></marker></defs>`;
  const arrow = (x1, y1, x2, y2, c = "ar") => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c === "ag" ? "#16a34a" : "#2563eb"}" stroke-width="2.4" fill="none" marker-end="url(#${c})"/>`;
  const wrap = (vw, vh, body, label) => `<svg viewBox="0 0 ${vw} ${vh}" role="img" aria-label="${label}">${arrowDefs}${body}</svg>`;
  const ILL = {};

  // ---------- EPP (trabajador, usado en el módulo de entrenamiento) ----------
  ILL.epp = { cap: "Elementos de protección personal básicos para la bodega.", svg: () => wrap(300, 380, `
    ${rc(110, 250, 36, 92, "#1f3a68", { r: 6 })}${rc(154, 250, 36, 92, "#1f3a68", { r: 6 })}
    ${rc(102, 336, 48, 26, "#3b2f2a", { r: 8 })}${rc(150, 336, 48, 26, "#3b2f2a", { r: 8 })}${rc(106, 352, 40, 6, "#16110f", { r: 3 })}${rc(154, 352, 40, 6, "#16110f", { r: 3 })}
    ${rc(92, 150, 116, 112, "#1f3a68", { r: 14 })}
    <path d="M100 152H132L150 180L168 152H200V264H100Z" fill="#f59e0b"/>
    ${rc(100, 206, 100, 12, "#e5e7eb", { r: 2 })}${rc(100, 238, 100, 12, "#e5e7eb", { r: 2 })}
    ${rc(76, 184, 148, 30, "#1f3a68", { r: 15 })}
    ${ci(84, 199, 15, "#facc15", { s: "#ca8a04" })}${ci(216, 199, 15, "#facc15", { s: "#ca8a04" })}
    ${rc(138, 126, 24, 28, "#b9805c", { r: 6 })}
    ${ci(150, 104, 30, "#c58c66")}${ci(120, 106, 6, "#b9805c")}${ci(180, 106, 6, "#b9805c")}
    <path d="M114 100A36 32 0 0 1 186 100Z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>${rc(106, 98, 88, 9, "#eab308", { r: 4 })}${rc(144, 70, 12, 28, "#eab308", { r: 3 })}
    ${rc(126, 104, 48, 15, "#cfeaf8", { r: 7, s: "#1f2937", sw: 2, op: 0.9 })}${ln(134, 126, 166, 126, "#7a4b2c", 2)}`, "Trabajador con EPP").replace('viewBox="0 0 300 380"', 'viewBox="50 40 200 330"') };

  // ---------- Ciclo del material ----------
  ILL["objetivo-manual"] = { cap: "Ruta del material dentro de la bodega: cada etapa tiene su procedimiento en este manual.", svg: () => {
    const st = [["Recepción", "#f59e0b"], ["Identificación", "#0ea5e9"], ["Homologación", "#7c3aed"], ["Almacenamiento", "#16a34a"], ["Despacho", "#db2777"], ["Inventario", "#ef4444"]];
    let b = "";
    st.forEach(([n, c], i) => { const x = 14 + i * 108; b += rc(x, 70, 92, 80, "#fff", { s: c, sw: 2.5, r: 12 }) + ci(x + 46, 98, 15, c) + tx(x + 46, 103, String(i + 1), { c: "#fff", w: 700 }) + tx(x + 46, 132, n, { s: 11.5, w: 600 }); if (i < 5) b += arrow(x + 94, 110, x + 106, 110); });
    b += `<path d="M600 156V196H60V158" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-dasharray="6 5" marker-end="url(#ar)"/>${tx(330, 216, "Control continuo: las diferencias de inventario se corrigen en el origen", { s: 12, c: "#2563eb", w: 600 })}`;
    b += tx(330, 36, "Trazabilidad de punta a punta", { s: 16, w: 700 }) + tx(330, 54, "Cada material tiene documentos, código, etiqueta y ubicación", { s: 12, c: "#5f6f8c" });
    return wrap(670, 240, b, "Ciclo del material");
  } };

  // ---------- Roles ----------
  ILL.roles = { cap: "Estructura de responsabilidades: el jefe de bodega coordina con las áreas de apoyo.", svg: () => {
    const box = (x, y, w, t, c) => rc(x, y, w, 46, "#fff", { s: c, sw: 2.5, r: 10 }) + tx(x + w / 2, y + 28, t, { s: 12.5, w: 600 });
    let b = box(250, 14, 170, "Jefe de bodega", "#0b2a63") + ln(335, 60, 335, 86, "#9db8ee") + ln(110, 86, 560, 86, "#9db8ee");
    [[40, "Encargado de inventario", "#2563eb"], [250, "Bodeguero", "#16a34a"], [460, "Administrativo de bodega", "#7c3aed"]].forEach(([x, t, c]) => { b += ln(x + 85, 86, x + 85, 108, "#9db8ee") + box(x, 108, 170, t, c); });
    b += rc(40, 188, 250, 44, "#f4f8ff", { s: "#9db8ee", r: 10, d: "5 4" }) + tx(165, 215, "Apoyo: Mantenimiento · Prevención", { s: 12 });
    b += rc(380, 188, 250, 44, "#f4f8ff", { s: "#9db8ee", r: 10, d: "5 4" }) + tx(505, 215, "Apoyo: Abastecimiento / Compras", { s: 12 });
    return wrap(670, 250, b, "Roles de la bodega");
  } };

  // ---------- Muelle / descarga ----------
  ILL.descarga = { cap: "Vista superior del área de descarga: zona delimitada, operador autorizado y carga ordenada por ítem.", svg: () => '<img class="figimg" src="img/descarga.png" alt="Vista superior del área de descarga con camión, zona de recepción delimitada con conos, grúa horquilla y bodeguero con EPP">' };

// ---------- Documentos de recepción ----------
  const doc = (x, y, t, c) => rc(x, y, 130, 100, "#fff", { s: c, sw: 2.2, r: 8 }) + rc(x, y, 130, 24, c, { r: 8 }) + tx(x + 65, y + 17, t, { s: 12, w: 700, c: "#fff" }) + [38, 54, 70, 86].map(o => ln(x + 14, y + o, x + 116 - (o % 3) * 10, y + o, "#cbd5e1", 3)).join("");
  ILL["recepcion-documentos"] = { cap: "La recepción cruza tres documentos con lo que llega físicamente.", svg: () => wrap(670, 250,
    doc(20, 30, "Orden de compra", "#2563eb") + doc(20, 140, "Guía de despacho", "#f59e0b") + doc(190, 85, "Factura", "#16a34a") +
    arrow(152, 80, 186, 120) + arrow(152, 190, 186, 160) + arrow(322, 135, 368, 135) +
    rc(372, 40, 270, 190, "#fff", { s: "#9db8ee", r: 12 }) + tx(507, 66, "Revisión en andén", { s: 14, w: 700 }) +
    ["Datos del proveedor y N° de OC", "Cantidad y descripción", "Estado visual de la carga", "Hora de llegada y observaciones"].map((t, i) => ci(396, 96 + i * 30, 8, "#16a34a") + `<path d="M392 ${96 + i * 30}l3 3 6-6" stroke="#fff" stroke-width="2" fill="none"/>` + tx(414, 100 + i * 30, t, { s: 12, a: "start" })).join("") +
    tx(507, 222, "Resultado: Conforme / Con observaciones", { s: 11.5, w: 600, c: "#14532d" }), "Cruce de documentos") };

  // ---------- Verificación triple ----------
  ILL.verificacion = { cap: "Regla de las tres coincidencias antes de firmar la guía.", svg: () => {
    const col = (x, t, c, items) => rc(x, 30, 180, 190, "#fff", { s: c, sw: 2.2, r: 12 }) + rc(x, 30, 180, 32, c, { r: 12 }) + tx(x + 90, 52, t, { s: 13, w: 700, c: "#fff" }) + items.map((i, k) => tx(x + 16, 92 + k * 28, "• " + i, { s: 12, a: "start" })).join("");
    return wrap(670, 250, col(20, "Documento (guía / OC)", "#2563eb", ["Cantidad", "Código / N° de parte", "Marca y modelo", "Unidad de medida"]) +
      col(245, "Físico (lo que llegó)", "#f59e0b", ["Contar, pesar, medir", "Etiqueta y N° de parte", "Estado y vencimiento", "Embalaje íntegro"]) +
      col(470, "Sistema (ERP)", "#16a34a", ["Código existente", "Descripción estándar", "Unidad de control", "Ubicación prevista"]) +
      tx(214, 130, "=", { s: 34, w: 700, c: "#2563eb" }) + tx(439, 130, "=", { s: 34, w: 700, c: "#2563eb" }) +
      rc(200, 232, 270, 0.1, "#fff") + tx(335, 244, "Si una no coincide: separar y registrar discrepancia", { s: 12, w: 700, c: "#b91c1c" }), "Tres coincidencias");
  } };

  // ---------- Etiqueta ----------
  const bars = (x, y, w, h) => { let s = "", cx = x, i = 0; while (cx < x + w) { const bw = [2, 3, 1.5, 4, 2, 1.5, 3][i++ % 7]; s += `<rect x="${cx}" y="${y}" width="${bw}" height="${h}" fill="#111"/>`; cx += bw + [2, 1.5, 3, 2][i % 4]; } return s; };
  const qr = (x, y, n) => { let s = rc(x, y, n, n, "#fff", { r: 2, s: "#111", sw: 1 }), c = n / 11, seed = 7; for (let i = 0; i < 11; i++) for (let j = 0; j < 11; j++) { seed = (seed * 31 + i * 7 + j * 13) % 97; const corner = (i < 3 && j < 3) || (i < 3 && j > 7) || (i > 7 && j < 3); if (corner || seed % 2 === 0) s += `<rect x="${x + i * c}" y="${y + j * c}" width="${c}" height="${c}" fill="#111"/>`; } return s; };
  const etiqueta = { cap: "Anatomía de una etiqueta de material: legible, resistente y coincidente con el ERP.", svg: () => {
    let b = rc(20, 20, 420, 210, "#fff", { s: "#111", sw: 2.5, r: 10 }) + rc(20, 20, 420, 34, "#0b2a63", { r: 10 }) + tx(230, 43, "CERRO DEL COBRE · BODEGA", { s: 13, w: 700, c: "#fff" });
    [["Código", "000123"], ["Descripción", "FILTRO DE ACEITE MOTOR"], ["Unidad", "UN"], ["Lote / Serie", "L-2026-0415"], ["Ingreso", "10/10/2026"], ["Ubicación", "R01-B-03"]].forEach(([k, v], i) => { const y = 80 + i * 22; b += tx(52, y, k + ":", { s: 11, a: "start", c: "#5f6f8c" }) + tx(124, y, v, { s: 12, a: "start", w: 600 }); });
    b += bars(300, 68, 124, 52) + tx(362, 134, "000123", { s: 10 }) + qr(344, 146, 70);
    const mk = (x, y, n) => ci(x, y, 10, "#f59e0b", { s: "#fff", sw: 2 }) + tx(x, y + 4, String(n), { s: 11, w: 700, c: "#fff" });
    b += mk(34, 76, 1) + mk(34, 98, 2) + mk(34, 142, 3) + mk(34, 186, 4) + mk(286, 94, 5) + mk(330, 182, 6);
    ["Código único del ERP", "Descripción estandarizada", "Lote o serie: trazabilidad", "Ubicación asignada", "Código de barras", "QR con más datos"].forEach((t, i) => { b += mk(480, 62 + i * 32, i + 1) + tx(498, 66 + i * 32, t, { s: 12.5, a: "start", w: 600 }); });
    return wrap(670, 245, b, "Etiqueta de material");
  } };
  ILL["uso-epp"] = { cap: "EPP básico en bodega: casco, lentes de protección, chaleco reflectante, guantes y calzado de seguridad (este último no se ve en la imagen).", svg: () => '<div class="eppfig"><img src="img/epp.png" alt="Trabajador con casco, lentes, chaleco reflectante y guantes"></div>' };

ILL.etiquetar = etiqueta; ILL["codificar-etiquetar"] = etiqueta;

  // ---------- Homologación ----------
  ILL.homologar = { cap: "Homologar: muchos nombres para un mismo producto se transforman en un único registro estándar.", svg: () => '<img class="figimg hm" src="img/homologar.png" alt="Cuatro nombres distintos para un filtro de aceite que, tras validar N° de parte y marca, se transforman en un único registro estándar">' };

// ---------- ABC / ubicación ----------
  ILL.ubicacion = { cap: "Clasificación ABC: lo que más rota queda más cerca de la salida.", svg: () => {
    let b = rc(60, 20, 580, 210, "#fff", { s: "#334155", sw: 3, r: 10 }) + rc(52, 100, 16, 60, "#f59e0b", { r: 3 }) + tx(30, 94, "Puerta", { s: 11, w: 600 }) + tx(30, 108, "salida", { s: 11, w: 600 });
    b += rc(78, 34, 150, 182, "#dcfce7", { s: "#16a34a", r: 8 }) + tx(153, 66, "A", { s: 34, w: 700, c: "#15803d" }) + tx(153, 92, "Alta rotación", { s: 12, w: 600 }) + tx(153, 110, "cerca de la salida", { s: 11 });
    b += rc(238, 34, 190, 182, "#fef9c3", { s: "#ca8a04", r: 8 }) + tx(333, 66, "B", { s: 34, w: 700, c: "#a16207" }) + tx(333, 92, "Rotación media", { s: 12, w: 600 }) + tx(333, 110, "zona central", { s: 11 });
    b += rc(438, 34, 190, 182, "#e2e8f0", { s: "#64748b", r: 8 }) + tx(533, 66, "C", { s: 34, w: 700, c: "#475569" }) + tx(533, 92, "Baja rotación", { s: 12, w: 600 }) + tx(533, 110, "al fondo", { s: 11 });
    [[96, 140], [96, 176], [122, 140], [122, 176], [262, 150], [292, 150], [262, 180], [292, 180], [462, 150], [492, 150], [462, 180], [492, 180]].forEach(([x, y]) => b += rc(x, y, 22, 26, "#e7c58a", { s: "#a16207", r: 2 }));
    b += arrow(530, 232, 100, 232, "ag") + tx(330, 250, "Flujo de salida de materiales", { s: 11.5, c: "#15803d", w: 600 });
    return wrap(670, 262, b, "Zonificación ABC");
  } };

  // ---------- FIFO / FEFO ----------
  ILL["rotacion-fifo-fefo"] = { cap: "FEFO: sale primero el lote que vence antes; FIFO: el que entró primero.", svg: () => {
    let b = rc(110, 40, 440, 120, "none", { s: "#475569", sw: 3, r: 4 }) + ln(110, 160, 550, 160, "#475569", 6);
    [["Lote 1", "vence 03/2027", "#ef4444", 130], ["Lote 2", "vence 08/2027", "#f59e0b", 262], ["Lote 3", "vence 02/2028", "#16a34a", 394]].forEach(([l, v, c, x]) => b += rc(x, 62, 110, 82, "#e7c58a", { s: "#a16207", r: 4 }) + rc(x, 62, 110, 20, c, { r: 4 }) + tx(x + 55, 77, l, { s: 12, w: 700, c: "#fff" }) + tx(x + 55, 110, v, { s: 12, w: 600 }) + tx(x + 55, 128, "lote " + l.slice(-1), { s: 10.5, c: "#7c5a0b" }));
    b += arrow(110, 192, 32, 192, "ar") + tx(70, 214, "SALE PRIMERO", { s: 12, w: 700, c: "#b91c1c" }) + arrow(560, 192, 640, 192, "ag") + tx(600, 214, "ENTRA ÚLTIMO", { s: 12, w: 700, c: "#15803d" });
    b += tx(330, 24, "Mismo producto, lotes distintos", { s: 14, w: 700 }) + tx(330, 232, "El ERP indica qué lote retirar; no mezclar lotes en una misma posición", { s: 12, c: "#2563eb", w: 600 });
    return wrap(670, 244, b, "FIFO y FEFO");
  } };

  // ---------- Manejo manual de cargas ----------
  ILL["manejo-cargas"] = { cap: "Técnica correcta de levantamiento y límites legales (Ley 20.949).", svg: () => '<img class="figimg" src="img/cargas.png" alt="Levantamiento correcto con rodillas flectadas frente a espalda curvada, y límites de 25 kg para hombres adultos y 20 kg para mujeres y menores de 18 años">' };

// ---------- Grúa horquilla ----------
  const gruaFig = { cap: "Puntos de inspección previa de la grúa horquilla (ver check list de equipo).", svg: () => {
    const L = ["Mástil y cadenas", "Horquillas sin grietas", "Frenos y estacionamiento", "Cabina y cinturón de seguridad", "Neumáticos o ruedas", "Alarma de retroceso y luces", "Extintor", "Fugas de aceite / batería o combustible"];
    return `<div class="gru"><img src="img/grua.png" alt="Grúa horquilla con 8 puntos de inspección numerados"><div><ol class="gl">${L.map((t, i) => `<li><b>${i + 1}</b>${t}</li>`).join("")}</ol><p class="alert">Falla crítica: no operar y rotular «Fuera de servicio».</p></div></div>`;
  } };
  ILL["grua-horquilla"] = gruaFig; ILL["checklist-equipos"] = gruaFig;


// ---------- Sustancias peligrosas ----------
  ILL["sustancias-peligrosas"] = { cap: "Esquema referencial de las clases de peligro (NCh 382). Siempre rige la HDS del producto.", svg: () => {
    const dm = (x, f, t, sub, o = {}) => `<path d="M${x} 24L${x + 52} 76L${x} 128L${x - 52} 76Z" fill="${f}" stroke="${o.s || "#111"}" stroke-width="2"/>` + (o.half ? `<path d="M${x} 76L${x + 52} 76L${x} 128Z" fill="#111"/><path d="M${x} 76L${x - 52} 76L${x} 128Z" fill="#fff"/>` : "") + tx(x, 82, t, { s: 20, w: 700, c: o.c || "#111" }) + tx(x, 152, sub, { s: 11.5, w: 600 });
    return wrap(670, 190,
      dm(60, "#16a34a", "2", "Gases") + dm(150, "#dc2626", "3", "Líq. inflamables", { c: "#fff" }) + dm(240, "#fecaca", "4", "Sól. inflamables") + dm(330, "#facc15", "5", "Comburentes") + dm(420, "#fff", "6", "Tóxicos") + dm(510, "#fff", "8", "Corrosivos", { half: true, c: "#fff" }) + dm(600, "#fff", "9", "Varias") +
      tx(335, 178, "Segregar incompatibles · Mantener HDS vigente · Envases originales rotulados", { s: 12, w: 600, c: "#2563eb" }), "Clases de peligro NCh 382");
  } };

  // ---------- Emergencias ----------
  ILL.emergencias = { cap: "Ejemplo de vías de evacuación, extintores y punto de encuentro (adapte al plano real).", svg: () => '<img class="figimg ev" src="img/evacuacion.png" alt="Plano de ejemplo con salidas, ruta de evacuación en verde, extintores y punto de encuentro">' };

// ---------- 5S ----------
  ILL["orden-aseo"] = { cap: "Las 5S aplicadas a la bodega.", svg: () => {
    const it = [["1", "Clasificar", "Retirar lo innecesario", "#2563eb"], ["2", "Ordenar", "Cada cosa en su lugar", "#16a34a"], ["3", "Limpiar", "Derrames y residuos", "#f59e0b"], ["4", "Estandarizar", "Demarcar y señalizar", "#7c3aed"], ["5", "Disciplina", "Revisar cada turno", "#ef4444"]];
    let b = ""; it.forEach(([n, t, d, c], i) => { const x = 66 + i * 134; b += ci(x, 80, 42, c) + tx(x, 92, n, { s: 34, w: 700, c: "#fff" }) + tx(x, 150, t, { s: 14, w: 700 }) + tx(x, 170, d, { s: 11.5, c: "#475569" }); if (i < 4) b += arrow(x + 46, 80, x + 86, 80); });
    return wrap(670, 195, b, "5S");
  } };

  // ---------- Reposición ----------
  ILL["reposicion-stock"] = { cap: "Gráfico de stock: el pedido se emite al llegar al punto de reorden para que llegue antes de entrar en el stock de seguridad. El stock de seguridad da un margen de tiempo ante variaciones imprevistas de la demanda o retrasos de entrega, asegurando la continuidad operativa hasta la llegada del nuevo pedido.", svg: () => '<img class="figimg rp" src="img/reorden.png" alt="Gráfico de stock en el tiempo con punto de reorden, stock de seguridad, plazo de entrega y riesgo de desabastecimiento">' };

window.ILL = ILL;
})();
