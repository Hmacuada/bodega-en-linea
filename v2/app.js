const M = window.MANUAL;
const UK = ((window.Auth && Auth.get()) || {}).user || "anon";
const $ = s => document.querySelector(s), app = $("#app");
const sec = id => M.secciones.find(s => s.id === id);
const proc = id => M.procedimientos.find(p => p.id === id);
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ---- contenido ampliado (detalle*.js) se fusiona con los procedimientos ----
Object.entries(window.DET || {}).forEach(([id, d]) => {
  const p = proc(id); if (!p) return;
  const { bloques, tips, ...rest } = d;
  Object.assign(p, rest);
  p.bloques = [...(p.bloques || []), ...(bloques || [])];
  p.tips = [...(p.tips || []), ...(tips || []).filter(t => !(p.tips || []).some(o => o.texto === t.texto))];
});
const stepT = s => Array.isArray(s) ? s[0] : s;

// ---- estado local ----
const ls = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
const readSet = () => new Set(JSON.parse(ls.get("bodega_read_" + UK) || "[]"));
const saveRead = s => ls.set("bodega_read_" + UK, JSON.stringify([...s]));
const scores = () => JSON.parse(ls.get("bodega_quiz_" + UK) || "{}");
function toast(t) { const e = document.createElement("div"); e.className = "toast"; e.textContent = t; document.body.append(e); setTimeout(() => e.remove(), 1800); }

// ---- búsqueda ----
const textOf = p => [p.titulo, p.resumen, p.objetivo, p.alcance, p.ejemplo, ...p.parrafos, ...(p.pasos || []).flat(), ...(p.errores || []), ...(p.controles || []),
  ...(p.bloques || []).flatMap(b => b.lista || b.tabla.rows.flat())].filter(Boolean).join(" ");
function search(q, filtro) {
  const nq = norm(q).split(/\s+/).filter(Boolean);
  if (!nq.length) return [];
  return M.procedimientos.filter(p => !filtro || p.origen === filtro).map(p => {
    const body = norm(textOf(p)), title = norm(p.titulo + " " + sec(p.seccion).titulo);
    let score = 0;
    for (const w of nq) { if (title.includes(w)) score += 5; if (body.includes(w)) score += 1; else if (!title.includes(w)) return { p, score: 0 }; }
    return { p, score };
  }).filter(r => r.score).sort((a, b) => b.score - a.score).map(r => r.p);
}
const qEl = $("#q"), drop = $("#drop");
qEl.addEventListener("input", () => {
  const r = search(qEl.value).slice(0, 6);
  drop.hidden = !qEl.value.trim();
  drop.innerHTML = r.length ? r.map(p => `<a href="#/proc/${p.id}"><b>${p.titulo}</b><small>${sec(p.seccion).titulo}</small></a>`).join("") + `<a href="#/buscar?q=${encodeURIComponent(qEl.value)}"><small>Ver todos los resultados →</small></a>` : `<a><small>Sin resultados</small></a>`;
});
qEl.addEventListener("keydown", e => { if (e.key === "Enter" && qEl.value.trim()) { location.hash = "#/buscar?q=" + encodeURIComponent(qEl.value); drop.hidden = true; qEl.blur(); } if (e.key === "Escape") { drop.hidden = true; qEl.blur(); } });
document.addEventListener("click", e => { if (!e.target.closest("#searchBox")) drop.hidden = true; else if (e.target.closest("#drop a")) drop.hidden = true; });
document.addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); qEl.focus(); qEl.select(); } });

// ---- navegación lateral ----
const ICON = {
  home: '<path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z" fill="#fff" stroke="none"/>',
  generalidades: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8.5 11l1.5 1.5L13 9.5M8.5 17h7"/>',
  almacenamiento: '<path d="M4 15v-4l2-5h10l2 5v4M3 15h18v3H3zM7 18v2M17 18v2M7 11h10"/>',
  recepcion: '<path d="M3 8h18v12H3zM3 8l3-4h12l3 4M9 13h6"/>',
  despacho: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h5M8 12h8M8 16h5"/><circle cx="17" cy="17" r="3.5" fill="#0a2253"/><path d="m15.5 17 1 1 2-2"/>',
  inventario: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  seguridad: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" fill="#fff" stroke="none"/><path d="m8.5 12 2.5 2.5 4.5-5" stroke="#0a2253" stroke-width="2.4"/>',
  herramientas: '<path d="M14.5 6a4 4 0 0 0 4.8 5L8 22l-4-4L15 6.8A4 4 0 0 0 14.5 6z"/><path d="m16 5 3-2 2 2-2 3"/>',
  formularios: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'
};
const ico = k => `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;
function renderNav(view, id) {
  let cur = null;
  if (view === "proc") cur = proc(id)?.seccion; else if (view === "seccion") cur = id;
  else if (view === "quiz") cur = (M.quizzes[id] || {}).seccion;
  $("#nav").innerHTML = `<a class="${view === "home" ? "on" : ""}" href="#/"><span class="ic">${ico("home")}</span>Inicio</a><div class="gap"></div>` +
    M.secciones.map(s => `<a class="${cur === s.id ? "on" : ""}" href="#/seccion/${s.id}"><span class="ic">${ico(s.id)}</span>${s.n}.&nbsp;&nbsp;${s.titulo}</a>`).join("") + `<hr>`;
}

// ---- diagramas ----
function wrapWords(t, max) {
  const out = []; let cur = "";
  for (const w of t.split(/\s+/)) { if ((cur + " " + w).trim().length > max && cur) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim(); }
  if (cur) out.push(cur); return out.slice(0, 3);
}
function flowSVG(steps) {
  const per = 4, W = 150, H = 74, G = 34, rows = Math.ceil(steps.length / per), vw = per * W + (per - 1) * G, vh = rows * H + (rows - 1) * 38 + 8;
  let s = `<svg viewBox="0 0 ${vw} ${vh}" role="img" aria-label="Diagrama de flujo del procedimiento"><defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 8 4 0 8z" fill="#2563eb"/></marker></defs>`;
  steps.forEach((st, i) => {
    const r = Math.floor(i / per), c = i % per, x = c * (W + G), y = r * (H + 38) + 4;
    let t = stepT(st).replace(/[.:].*$/, "").trim(); if (t.length > 54) t = t.slice(0, 52) + "…";
    const lines = wrapWords(t, 20);
    s += `<g><rect x="${x}" y="${y}" width="${W}" height="${H}" rx="12" fill="#fff" stroke="#9db8ee" stroke-width="1.5"/><circle cx="${x + 18}" cy="${y + 18}" r="12" fill="#2563eb"/><text x="${x + 18}" y="${y + 22.5}" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">${i + 1}</text>`;
    lines.forEach((l, k) => s += `<text x="${x + W / 2 + 6}" y="${y + 36 + k * 14}" font-size="11.5" fill="#14213a" text-anchor="middle">${esc(l)}</text>`);
    s += `</g>`;
    if (i < steps.length - 1) {
      if (c < per - 1) s += `<path d="M${x + W + 3} ${y + H / 2} H${x + W + G - 4}" stroke="#2563eb" stroke-width="2" marker-end="url(#ah)" fill="none"/>`;
      else s += `<path d="M${x + W / 2} ${y + H + 2} V${y + H + 17} H${W / 2} V${y + H + 32}" stroke="#2563eb" stroke-width="2" marker-end="url(#ah)" fill="none"/>`;
    }
  });
  return s + `</svg>`;
}
function figure(p) {
  const il = window.ILL && ILL[p.id];
  if (il) return `<figure class="fig"><div class="art">${il.svg()}</div><figcaption>${il.cap}</figcaption></figure>`;
  if ((p.pasos || []).length >= 3) return `<figure class="fig"><div class="art">${flowSVG(p.pasos)}</div><figcaption>Flujo del procedimiento: ${esc(p.titulo)}.</figcaption></figure>`;
  return "";
}

// ---- piezas ----
function resCard(p, read) {
  const s = sec(p.seccion);
  return `<a class="card res" href="#/proc/${p.id}"><span class="badge ${p.origen === "complemento" ? "comp" : "man"}">${p.origen === "complemento" ? "Complemento" : "Manual"}</span> ${read ? '<span class="badge man">✓ Leído</span>' : ""}
    <h3>${p.titulo}</h3><p>${p.resumen}</p><p style="margin-top:8px;font-size:12px"><span style="color:${s.color}">●</span> ${s.titulo}</p></a>`;
}
function notFound() { return `<div class="empty"><h1 class="h1">Página no encontrada</h1><p><a class="btn p" href="#/">Volver al inicio</a></p></div>`; }
const bloqueHTML = (b, i) => `<h2 id="b${i}">${b.t}</h2>` + (b.lista ? `<div class="card"><ul class="list">${b.lista.map(x => `<li>${x}</li>`).join("")}</ul></div>`
  : `<div class="card tbl"><table><thead><tr>${b.tabla.cols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>${b.tabla.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);

// ---- vistas ----
const views = {
  manual() { location.replace("#/"); return ""; },
  home() {
    const rd = readSet(), last = proc(ls.get("bodega_last_" + UK) || "");
    const complete = M.secciones.filter(s => { const ps = M.procedimientos.filter(p => p.seccion === s.id); return ps.length && ps.every(p => rd.has(p.id)); }).length;
    const pct = Math.round(complete / M.secciones.length * 100);
    const epi = (d, t) => `<a href="#/proc/uso-epp"><i><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b2a63" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg></i>${t}</a>`;
    const qi = (bg, svg) => `<span class="qi" style="background:${bg}"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${svg}</svg></span>`;
    const pill = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z" fill="#2146a8"/><path d="m8.5 12 2.5 2.5 4.5-5" stroke="#fff" stroke-width="2" fill="none"/></svg>';
    const clock = '<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2146a8"/><path d="M12 6v6l4 2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
    const team = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 21V12h4v9zM10 21V4h4v17zM17 21V9h4v12z" fill="#2146a8"/></svg>';
    return `<div class="home">
    <section class="hero"><img src="img/hero.png" alt="">
      <div class="txt"><small class="k">MANUAL DE OPERACIONES</small><h1>Bodega</h1>
        <p>Aquí encontrarás los procedimientos, normas y buenas prácticas para el correcto funcionamiento de la bodega.</p>
        <div class="pills"><span>${pill}Organización</span><span>${pill}Seguridad</span><span>${clock}Eficiencia</span><span>${team}Trabajo en equipo</span></div></div></section>
    <div class="quick">
      <a class="qc" href="#/todas">${qi("#2563eb", '<path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6"/>')}<span><b>Procedimientos</b><small>${M.secciones.length} secciones principales</small></span><span class="ch">›</span></a>
      <a class="qc" href="#/proc/normativa">${qi("#16a34a", '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>')}<span><b>Normas de seguridad</b><small>5 normas aplicables</small></span><span class="ch">›</span></a>
      <a class="qc" href="#/documentos">${qi("#7c3aed", '<path d="M12 3 4 7.5v9L12 21l8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9"/>')}<span><b>Formatos y registros</b><small>${M.documentos.length} documentos</small></span><span class="ch">›</span></a>
      <a class="qc" href="#/recursos">${qi("#f59e0b", '<path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6zM12 6v14"/>')}<span><b>Recursos útiles</b><small>Guías y anexos</small></span><span class="ch">›</span></a>
    </div>
    <section class="panel"><div class="head"><div><h2>Secciones del manual</h2><p class="sub">Revisa cada área para conocer los procedimientos paso a paso.</p></div><a class="pill" href="#/todas">Ver todas &nbsp;→</a></div>
      <div class="secs">${M.secciones.map(s => `<a class="sc" href="#/seccion/${s.id}"><span class="num" style="background:${s.color}">${s.n}</span><span class="tx"><h3>${s.titulo}</h3><p>${s.desc}</p><span class="pill sm">Ver sección &nbsp;→</span></span><img src="img/s${s.n}.png" alt=""></a>`).join("")}</div></section>
    <div class="rcol">
      <section class="safe2"><div class="st"><h3>La seguridad<br>es prioridad</h3><p>Usa siempre tu EPP y sigue las normas de la bodega.</p><a class="pill w" href="#/seccion/seguridad">Ver normas de seguridad &nbsp;→</a></div><img class="wk" src="img/epp.png" alt="Trabajador con casco, lentes, chaleco y guantes"><div class="eplist"><b>EPP</b>${epi('<path d="M4 15a8 8 0 0 1 16 0zM2 15h20v2.5H2z"/>', "Casco")}${epi('<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a5 5 0 0 1-4-2l-3-4a1.5 1.5 0 0 1 2.4-1.8L8 15"/>', "Guantes")}${epi('<path d="M6 3h6v8l7 3a2 2 0 0 1 1 2v3H6zM6 17h14"/>', "Zapatos")}${epi('<path d="M8 3l4 4 4-4 3 3-2 3v11H7V9L5 6zM12 7v14"/>', "Chaleco")}</div></section>
      <section class="panel prog"><div class="ring" style="--p:${pct}"><i>${pct}%</i></div><div style="flex:1"><h3>Tu progreso en el manual</h3>
        <small>Has completado ${complete} de ${M.secciones.length} secciones</small><div class="bar"><i style="width:${pct}%"></i></div>
        <a class="pill sm" href="#/${last ? "proc/" + last.id : "proc/objetivo-manual"}">Continuar donde quedaste &nbsp;→</a></div></section>
      <section class="panel recu"><span class="bulb">💡</span><div><h3>Recuerda</h3><p>“Una bodega ordenada, segura y bien administrada, hace la diferencia.”</p></div></section>
      <section class="panel ups"><h3>📄 Últimas actualizaciones <a href="#/todas">Ver todas →</a></h3>
        ${M.actualizaciones.map(u => `<a class="r" href="${u.link}"><span class="d">${u.fecha}</span>${u.texto}<em>›</em></a>`).join("")}</section>
      <a class="panel help" href="#/recursos"><i>💬</i><span><b>¿Necesitas ayuda?</b><small>Contacta a tu supervisor o al área de operaciones.</small></span><em>›</em></a>
    </div></div>`;
  },
  recursos() {
    const it = (h, i, t, d) => `<a class="card res" href="${h}"><div style="font-size:26px">${i}</div><h3>${t}</h3><p>${d}</p></a>`;
    return `<h1 class="h1">Recursos útiles</h1><p class="lead">Guías y anexos del manual.</p><div class="grid g3">
      ${it("#/bodega", "🗺️", "Plano de la bodega", "Zonas, racks y áreas especiales.")}${it("#/proc/glosario", "📚", "Glosario", "Términos usados en el manual.")}${it("#/proc/normativa", "⚖️", "Normativa chilena aplicable", "Ley 20.949, DS 43, DS 594, DS 132.")}
      ${it("#/documentos", "📝", "Formatos imprimibles", "Plantillas listas para imprimir y llenar.")}${it("#/proc/indicadores", "📈", "Indicadores de control", "Fórmulas de identificación y homologación.")}${it("#/quiz/epp", "🎓", "Entrenamiento de EPP", "Módulo interactivo con evaluación.")}</div>`;
  },
  todas() {
    const rd = readSet();
    return `<h1 class="h1">Todos los procedimientos</h1><p class="lead">${M.procedimientos.length} procedimientos en ${M.secciones.length} secciones.</p>` +
      M.secciones.map(s => `<h2 class="sec-t"><span class="dot" style="background:${s.color}">${s.n}</span> ${s.titulo}</h2><div class="grid g2">${M.procedimientos.filter(p => p.seccion === s.id).map(p => resCard(p, rd.has(p.id))).join("")}</div>`).join("");
  },
  seccion(id) {
    const s = sec(id); if (!s) return notFound();
    const rd = readSet(), ps = M.procedimientos.filter(p => p.seccion === id), n = ps.filter(p => rd.has(p.id)).length, best = scores()[id];
    const q = M.quizzes[id];
    return `<div class="crumbs"><a href="#/">Inicio</a> / ${s.titulo}</div>
    <section class="shead" style="--c:${s.color}"><span class="num" style="background:${s.color}">${s.n}</span>
      <div class="tx"><h1 class="h1">${s.titulo}</h1><p>${s.desc}</p>
        <div class="meta"><span class="pill sm">${ps.length} procedimientos</span><span class="pill sm">${n} leídos</span>${q ? `<a class="btn p sm" href="#/quiz/${id}">🎓 Evaluación de la sección${best != null ? ` · mejor ${best}/${q.preguntas.length}` : ""}</a>` : ""}${id === "seguridad" ? `<a class="btn o sm" href="#/quiz/epp">Entrenamiento de EPP</a>` : ""}</div></div>
      <img src="img/s${s.n}.png" alt=""></section>
    <h2 class="sec-t">Procedimientos de esta sección</h2>
    <div class="grid g2">${ps.map((p, i) => `<a class="card res pc" href="#/proc/${p.id}" style="--c:${s.color}"><span class="pn" style="background:${s.color}">${s.n}.${i + 1}</span><div><span class="badge ${p.origen === "complemento" ? "comp" : "man"}">${p.origen === "complemento" ? "Complemento" : "Manual"}</span>${rd.has(p.id) ? ' <span class="badge man">✓ Leído</span>' : ""}<h3>${p.titulo}</h3><p>${p.resumen}</p></div></a>`).join("")}</div>`;
  },
  proc(id) {
    const p = proc(id); if (!p) return notFound();
    ls.set("bodega_last_" + UK, id);
    const s = sec(p.seccion), rd = readSet(), isRead = rd.has(id), idx = M.procedimientos.indexOf(p);
    const prev = M.procedimientos[idx - 1], next = M.procedimientos[idx + 1];
    const pasos = p.pasos || [], tips = p.tips || [], bl = p.bloques || [];
    const rel = M.procedimientos.filter(x => x.seccion === p.seccion && x.id !== id).slice(0, 5);
    const fig = figure(p);
    const toc = [["resumen", "Descripción"], fig && ["fig", "Esquema"], pasos.length && ["pasos", "Paso a paso"], ...bl.map((b, i) => ["b" + i, b.t]), p.ejemplo && ["ejemplo", "Ejemplo práctico"], (p.errores || p.controles) && ["control", "Controles y errores comunes"], p.zona && ["zonas", "Zonas relacionadas"]].filter(Boolean);
    const stepHTML = pasos.map(t => Array.isArray(t) ? `<li><b>${t[0]}</b><span>${t[1]}</span></li>` : `<li><b>${t}</b></li>`).join("");
    const ctrl = (p.controles || p.errores) ? `<h2 id="control">Controles y errores comunes</h2><div class="two">
      ${p.controles ? `<div class="card good"><h3>✔ Puntos de control</h3><ul class="list">${p.controles.map(x => `<li>${x}</li>`).join("")}</ul></div>` : ""}
      ${p.errores ? `<div class="card bad"><h3>⚠ Errores comunes</h3><ul class="list">${p.errores.map(x => `<li>${x}</li>`).join("")}</ul></div>` : ""}</div>` : "";
    return `<div class="crumbs"><a href="#/">Inicio</a> / <a href="#/seccion/${s.id}">${s.titulo}</a> / ${p.titulo}</div>
    <div class="phead" style="--c:${s.color}">
      ${p.origen === "complemento" ? '<span class="badge comp">⚖️ Complemento · información vigente</span>' : '<span class="badge man">✔ Del manual 2026</span>'}
      <h1 class="h1" style="margin-top:10px">${p.titulo}</h1><p class="lead" style="margin:6px 0 0">${p.resumen}</p>
      <div class="tl2"><button class="btn o read ${isRead ? "on" : ""}" id="readBtn">${isRead ? "✓ Leído" : "Marcar como leído"}</button><button class="btn o" onclick="print()">🖨 Imprimir</button>${id === "uso-epp" ? '<a class="btn p" href="#/quiz/epp">🎓 Iniciar entrenamiento</a>' : ""}</div>
    </div>
    <div class="proc"><aside class="toc"><b>Contenido</b>${toc.map(([a, t]) => `<a href="#" data-anchor="${a}">${t}</a>`).join("")}</aside>
    <div class="pbody"><h2 id="resumen">Descripción</h2><div class="card">
      ${p.objetivo ? `<p><b>Objetivo.</b> ${p.objetivo}</p>` : ""}${p.alcance ? `<p><b>Alcance.</b> ${p.alcance}</p>` : ""}${p.parrafos.map(t => `<p>${t}</p>`).join("")}</div>
    ${fig ? `<span id="fig"></span>${fig}` : ""}
    ${pasos.length ? `<h2 id="pasos">Paso a paso</h2><div class="card"><ol class="tl">${stepHTML}</ol></div>` : ""}
    ${bl.map(bloqueHTML).join("")}
    ${p.ejemplo ? `<h2 id="ejemplo">Ejemplo práctico</h2><div class="card ex"><span class="exi">📌</span><p style="margin:0">${p.ejemplo}</p></div>` : ""}
    ${ctrl}
    ${p.zona ? `<h2 id="zonas">Zonas relacionadas</h2>${p.zona.map(z => { const zz = M.zonas.find(x => x.id === z); return `<a class="chip" href="#/bodega?z=${z}">🗺️ ${zz ? zz.nombre : z}</a>`; }).join("")}` : ""}
    <div class="pnav">${prev ? `<a href="#/proc/${prev.id}"><small>← Anterior</small><b>${prev.titulo}</b></a>` : "<span></span>"}${next ? `<a class="nx" href="#/proc/${next.id}"><small>Siguiente →</small><b>${next.titulo}</b></a>` : ""}</div>
    </div>
    <aside class="aside"><div class="card ac"><img src="img/s${s.n}.png" alt=""><b>${s.n}. ${s.titulo}</b><small>${s.desc}</small></div>
      ${tips.map(t => `<div class="tip ${t.tipo}"><span>${t.tipo === "ok" ? "💡" : "ℹ️"}</span><span><b>${t.tipo === "ok" ? "Tip" : "Importante"}</b><br>${t.texto}</span></div>`).join("")}
      ${rel.length ? `<div class="card rl"><b>En esta sección</b>${rel.map(x => `<a href="#/proc/${x.id}">${x.titulo}</a>`).join("")}</div>` : ""}
      ${M.quizzes[p.seccion] ? `<a class="card qa" href="#/quiz/${p.seccion}">🎓 <b>Verifica lo aprendido</b><small>Evaluación de ${s.titulo}</small></a>` : ""}</aside></div>`;
  },
  bodega(params) {
    const pos = { R01: [14, 20, 22, 17], R02: [40, 20, 22, 17], Q01: [72, 20, 22, 24], G01: [14, 50, 16, 24], MESA: [34, 50, 22, 17], P01: [60, 52, 34, 27], ZID: [14, 80, 24, 13], CUAR: [42, 80, 20, 13] };
    const sel = params.get("z"), z = M.zonas.find(x => x.id === sel);
    return `<h1 class="h1">Plano de la bodega</h1><p class="lead">Selecciona una zona para ver su función y el procedimiento asociado. Los colores del plano son referenciales; ajústalos al layout real.</p>
    <div class="plan-wrap"><div class="plan"><div class="roof">Patio lateral techado</div>
      ${M.zonas.map(x => { const [l, t, w, h] = pos[x.id]; return `<button class="zone ${x.id === sel ? "sel" : ""}" data-z="${x.id}" style="background:${x.color};left:${l}%;top:${t}%;width:${w}%;height:${h}%">${x.nombre}</button>`; }).join("")}
      <span class="door" style="left:1.5%;top:44%">Portón ▸</span><span class="door" style="left:2%;bottom:2%">▲ Puerta peatonal</span></div>
    <div><div class="zl">${M.zonas.map(x => `<button data-z="${x.id}" class="${x.id === sel ? "sel" : ""}"><i style="background:${x.color}"></i><span><b>${x.nombre}</b></span></button>`).join("")}</div>
    ${z ? `<div class="card" style="margin-top:14px"><h3>${z.nombre}</h3><p style="color:var(--muted);margin:6px 0 12px">${z.desc}</p><a class="btn p" href="#/proc/${z.proc}">Ver procedimiento →</a></div>` : ""}</div></div>`;
  },
  documentos() {
    return `<h1 class="h1">Formularios y registros</h1><p class="lead">Plantillas listas para imprimir y llenar. Ábrelas y usa el botón «Imprimir».</p>
    <div class="grid g3">${M.formatos.map(f => `<a class="card res" href="#/formato/${f.id}"><div style="font-size:28px">📄</div><h3 style="margin:8px 0 6px">${f.nombre}</h3><p>${f.uso}</p><p style="margin-top:12px"><span class="pill sm">Abrir formato →</span></p></a>`).join("")}</div>
    <p style="margin-top:18px"><a class="btn o" href="#/proc/formatos">Ver qué documentos se usan en cada procedimiento →</a></p>`;
  },
  formato(id) {
    const f = M.formatos.find(x => x.id === id); if (!f) return notFound();
    const blank = n => Array.from({ length: n });
    return `<div class="crumbs"><a href="#/documentos">Formularios y registros</a> / ${f.nombre}</div>
    <div class="tl2" style="margin-bottom:14px"><button class="btn p" onclick="print()">🖨 Imprimir formato</button><a class="btn o" href="#/documentos">← Volver</a></div>
    <article class="sheet"><header><div><img class="slogo" src="img/logo.png" alt="Cerro del Cobre – Operaciones mineras"></div><div class="ver"><b>${f.nombre}</b><small>Versión 2026 · ${f.id.toUpperCase()}</small></div></header>
      <div class="fields">${f.campos.map(c => `<label><span>${c}</span><i></i></label>`).join("")}</div>
      ${f.lista ? `<h4>${f.lista.t}</h4><table><thead><tr><th>Punto</th>${f.lista.cols.map(c => `<th class="c">${c}</th>`).join("")}</tr></thead><tbody>${f.lista.items.map(i => `<tr><td>${i}</td>${f.lista.cols.map(() => '<td class="c">☐</td>').join("")}</tr>`).join("")}</tbody></table>` : ""}
      ${f.tabla ? `<table><thead><tr>${f.tabla.cols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>${blank(f.tabla.filas).map(() => `<tr>${f.tabla.cols.map(() => "<td>&nbsp;</td>").join("")}</tr>`).join("")}</tbody></table>` : ""}
      ${f.checks ? `<h4>${f.checks.t}</h4><div class="checks">${f.checks.items.map(i => `<span>☐ ${i}</span>`).join("")}</div>` : ""}
      <h4>Observaciones</h4><div class="obs"></div>
      <div class="sign">${f.firmas.map(x => `<div><i></i><span>${x}</span></div>`).join("")}</div></article>`;
  },
  quiz(id) {
    if (!M.quizzes[id]) return notFound();
    return `<div id="quizRoot"></div>`;
  },
  buscar(params) {
    const q = (params.get("q") || "").trim(), f = params.get("o") || "";
    const r = search(q, f), base = "#/buscar?q=" + encodeURIComponent(q);
    return `<h1 class="h1">Buscar</h1><p class="lead">${q ? `${r.length} resultado(s) para “${esc(q)}”` : "Escribe en el buscador o usa Ctrl K."}</p>
    <div><a class="chip ${!f ? "on" : ""}" href="${base}">Todos</a><a class="chip ${f === "manual" ? "on" : ""}" href="${base}&o=manual">Del manual</a><a class="chip ${f === "complemento" ? "on" : ""}" href="${base}&o=complemento">Complementos</a></div>
    <div class="grid g2" style="margin-top:12px">${r.map(p => resCard(p, readSet().has(p.id))).join("") || (q ? '<div class="card empty">Sin resultados. Prueba con otra palabra (ej.: “código”, “EPP”, “homologar”).</div>' : "")}</div>
    <h2 class="sec-t">Explorar por sección</h2><div>${M.secciones.map(s => `<a class="chip" href="#/seccion/${s.id}">${s.icon} ${s.titulo}</a>`).join("")}</div>`;
  }
};

// ---- evaluación / entrenamiento ----
const EPP_SPOTS = [
  { x: 49, y: 12, t: "Casco de seguridad", d: "Protege contra golpes y caída de objetos. Revise grietas y que el arnés ajuste bien antes de cada turno." },
  { x: 48, y: 27, t: "Lentes de protección", d: "Protegen de partículas, polvo y salpicaduras. Deben ajustar bien y no estar rayados." },
  { x: 40, y: 57, t: "Chaleco reflectante", d: "Hace visible al trabajador para los operadores de equipos. Obligatorio donde hay tránsito de equipos." },
  { x: 31, y: 69, t: "Guantes de trabajo", d: "Según la tarea: anticorte, para químicos o de uso general. Cámbielos si están rotos o contaminados." },
  { x: null, y: null, t: "Calzado de seguridad", d: "Con punta reforzada y suela antideslizante. Protege de golpes, aplastamiento y resbalones. No se ve en la imagen porque es de cuerpo superior." }
];
function mountQuiz(id) {
  const root = $("#quizRoot"); if (!root) return;
  const q = M.quizzes[id], s = sec(q.seccion), epp = id === "epp";
  const mix = () => q.preguntas.map(p => { const ix = p.o.map((_, k) => k); for (let k = ix.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [ix[k], ix[j]] = [ix[j], ix[k]]; } return { q: p.q, o: ix.map(k => p.o[k]), a: ix.indexOf(p.a), exp: p.exp }; });
  let qs = mix(); let i = 0, sel = null, done = false, score = 0, ans = [], spot = null;
  const draw = () => {
    const total = qs.length, pr = qs[i];
    const left = epp
      ? `<div class="hot"><div class="hwrap"><img class="eppimg" src="img/epp.png" alt="Trabajador con EPP">${EPP_SPOTS.map((h, k) => h.x == null ? "" : `<button class="hs ${spot === k ? "on" : ""}" data-hs="${k}" style="left:${h.x}%;top:${h.y}%" aria-label="${h.t}">+</button>`).join("")}</div>
         <div class="epchips">${EPP_SPOTS.map((h, k) => `<button class="chip ${spot === k ? "on" : ""}" data-hs="${k}">${h.t}</button>`).join("")}</div>
         <div class="hinfo">${spot != null ? `<b>${EPP_SPOTS[spot].t}</b><br>${EPP_SPOTS[spot].d}` : "Haz clic en los puntos «+» o en los botones para conocer cada elemento de protección."}</div></div>`
      : `<div class="hot lite"><img src="img/s${s.n}.png" alt=""><h3>${s.titulo}</h3><p>${s.desc}</p><a class="pill sm" href="#/seccion/${s.id}">Repasar la sección →</a></div>`;
    let right;
    if (done) {
      const pass = score / total >= 0.6;
      right = `<h2>Resultado</h2><div class="res-big ${pass ? "ok" : "no"}"><b>${score}/${total}</b><span>${pass ? "¡Aprobado! Buen trabajo." : "Repasa la sección e inténtalo de nuevo."}</span></div>
        <ul class="rev">${qs.map((x, k) => `<li class="${ans[k] === x.a ? "y" : "n"}"><b>${k + 1}. ${x.q}</b><small>Respuesta correcta: ${x.o[x.a]}. ${x.exp}</small></li>`).join("")}</ul>
        <div class="tl2"><button class="btn p" data-act="retry">Reintentar</button><a class="btn o" href="#/seccion/${s.id}">Volver a la sección</a></div>`;
    } else {
      right = `<div class="qh"><small>Pregunta ${i + 1} de ${total}</small></div><h3 class="qq">${pr.q}</h3>
        <div class="opts">${pr.o.map((o, k) => `<button class="opt ${sel === k ? "sel" : ""} ${sel != null && k === pr.a ? "right" : ""} ${sel === k && k !== pr.a ? "wrong" : ""}" data-opt="${k}" ${sel != null ? "disabled" : ""}><i></i>${o}</button>`).join("")}</div>
        ${sel != null ? `<div class="tip ${sel === pr.a ? "ok" : "info"}" style="margin-top:12px"><span>${sel === pr.a ? "✅" : "ℹ️"}</span><span>${pr.exp}</span></div><button class="btn p" data-act="next" style="margin-top:14px">${i + 1 < total ? "Siguiente →" : "Ver resultado"}</button>` : ""}`;
    }
    root.innerHTML = `<div class="crumbs"><a href="#/">Inicio</a> / <a href="#/seccion/${s.id}">${s.titulo}</a> / Evaluación</div><h1 class="h1">${q.titulo}</h1>
      <div class="qbar"><i style="width:${done ? 100 : i / total * 100}%"></i></div>
      <div class="qgrid"><div class="card">${left}</div><div class="card qr">${right}</div></div>`;
  };
  root.onclick = e => {
    const o = e.target.closest("[data-opt]"), h = e.target.closest("[data-hs]"), a = e.target.closest("[data-act]");
    if (h) { spot = +h.dataset.hs; draw(); }
    if (o && sel == null) { sel = +o.dataset.opt; ans[i] = sel; if (sel === qs[i].a) score++; draw(); }
    if (a && a.dataset.act === "next") {
      sel = null;
      if (i + 1 < qs.length) i++;
      else { done = true; const sc = scores(); if ((sc[id] ?? -1) < score) sc[id] = score; ls.set("bodega_quiz_" + UK, JSON.stringify(sc)); }
      draw();
    }
    if (a && a.dataset.act === "retry") { qs = mix(); i = 0; sel = null; done = false; score = 0; ans = []; draw(); }
  };
  draw();
}

// ---- router ----
let spy;
function render() {
  const [path, query] = (location.hash.slice(1) || "/").split("?"), params = new URLSearchParams(query || "");
  const [, r, id] = path.split("/"), view = r || "home";
  app.innerHTML = views[view] ? views[view](["bodega", "buscar"].includes(view) ? params : id) : notFound();
  renderNav(view, id);
  $("#side").classList.remove("open"); $("#scrim").classList.remove("open");
  if (view === "buscar") qEl.value = params.get("q") || "";
  if (view === "quiz") mountQuiz(id);
  window.scrollTo(0, 0);
  const secs = [...document.querySelectorAll(".pbody h2[id], .pbody span#fig")];
  spy?.disconnect();
  if (secs.length) {
    spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) document.querySelectorAll(".toc a").forEach(a => a.classList.toggle("on", a.dataset.anchor === e.target.id)); }), { rootMargin: "-80px 0px -70% 0px" });
    secs.forEach(s => spy.observe(s));
  }
}
app.addEventListener("click", e => {
  const z = e.target.closest("[data-z]"); if (z) location.hash = "#/bodega?z=" + z.dataset.z;
  const a = e.target.closest("[data-anchor]"); if (a) { e.preventDefault(); document.getElementById(a.dataset.anchor)?.scrollIntoView({ behavior: "smooth" }); }
  if (e.target.closest("#readBtn")) {
    const id = location.hash.split("/")[2], rd = readSet(), on = !rd.has(id); on ? rd.add(id) : rd.delete(id); saveRead(rd);
    const b = $("#readBtn"); b.classList.toggle("on", on); b.textContent = on ? "✓ Leído" : "Marcar como leído"; if (on) toast("Marcado como leído");
  }
});
$("#menuBtn").onclick = () => { $("#side").classList.add("open"); $("#scrim").classList.add("open"); };
$("#scrim").onclick = () => { $("#side").classList.remove("open"); $("#scrim").classList.remove("open"); };
window.addEventListener("hashchange", render);
render();
