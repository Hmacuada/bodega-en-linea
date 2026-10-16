const M = window.MANUAL;
const app = document.getElementById("app");
const sec = id => M.secciones.find(s => s.id === id);
const proc = id => M.procedimientos.find(p => p.id === id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function secCard(s) {
  const n = M.procedimientos.filter(p => p.seccion === s.id).length;
  return `<a class="card sec" href="#/seccion/${s.id}">
    <div class="num" style="background:${s.color}">${s.n}</div>
    <div><h3>${s.titulo}</h3><p>${s.desc}</p><span class="btn">Ver sección → (${n})</span></div>
    <div class="ico">${s.icon}</div></a>`;
}
function procCard(p) {
  const s = sec(p.seccion);
  return `<a class="card" href="#/proc/${p.id}"><h3 style="margin:0 0 4px">${p.titulo}</h3>
    <p style="margin:0 0 6px;color:var(--muted);font-size:13px">${p.resumen}</p><span class="tag">${s.titulo}</span>${p.origen === "complemento" ? '<span class="badge comp">Complemento</span>' : ""}</a>`;
}

const views = {
  home() {
    const tiles = ["recepcion", "almacenamiento", "inventario", "seguridad"].map(id => {
      const s = sec(id);
      return `<a class="card tile" href="#/seccion/${id}"><div class="ico">${s.icon}</div><h3>${s.titulo}</h3><p>${s.desc}</p></a>`;
    }).join("");
    const tot = M.procedimientos.length, man = M.procedimientos.filter(p => p.origen === "manual").length, pct = Math.round(man / tot * 100);
    return `<h1>Manual de operaciones de bodega</h1><p class="sub">Procedimientos claros para una operación segura y eficiente.</p>
    <div class="home-top">
      <div class="hero"><h2>Una bodega bien gestionada impulsa la continuidad operacional</h2><p>Consulta los procedimientos, ubica las zonas y capacítate.</p></div>
      <div class="card"><b>Progreso del manual</b><div class="bar"><i style="width:${pct}%"></i></div><small style="color:var(--muted)">${man} de ${tot} procedimientos vienen del manual · ${pct}%. El resto es complemento vigente.</small>
        <div class="quick"><b style="font-size:13px;display:block;margin-top:12px">Accesos rápidos</b>
          <a href="#/documentos">🚨 Registrar incidencia</a><a href="#/buscar?q=glosario">📚 Consultar glosario</a><a href="#/documentos">⬇️ Descargar documentos</a></div></div>
    </div>
    <h2>Explora el manual</h2><div class="grid g4">${tiles}</div>
    <h2>Últimas actualizaciones</h2><div class="card">${M.actualizaciones.map(u => `<div class="upd"><i style="background:${u.color}"></i>${u.texto}<span>${u.fecha}</span></div>`).join("")}</div>`;
  },
  manual() {
    return `<h1>Secciones del manual</h1><p class="sub">Revisa cada área para conocer los procedimientos paso a paso.</p>
    <div class="grid g2">${M.secciones.map(secCard).join("")}</div>`;
  },
  seccion(id) {
    const s = sec(id); if (!s) return notFound();
    const ps = M.procedimientos.filter(p => p.seccion === id);
    return `<div class="crumbs"><a href="#/manual">Manual</a> / ${s.titulo}</div><h1>${s.icon} ${s.titulo}</h1><p class="sub">${s.desc}</p>
    <div class="grid g2">${ps.map(procCard).join("") || '<div class="card">Sin procedimientos publicados aún.</div>'}</div>`;
  },
  proc(id) {
    const p = proc(id); if (!p) return notFound();
    const s = sec(p.seccion);
    const pasos = p.pasos || [], tips = p.tips || [], bl = p.bloques || [];
    const toc = [["resumen", "Descripción"], pasos.length && ["pasos", "Pasos del procedimiento"], ...bl.map((b, i) => ["b" + i, b.t]), p.zona && ["zonas", "Zonas relacionadas"], tips.length && ["tips", "Recomendaciones"]].filter(Boolean);
    const bloque = (b, i) => `<h2 id="b${i}">${b.t}</h2>` + (b.lista
      ? `<div class="card"><ul class="list">${b.lista.map(x => `<li>${x}</li>`).join("")}</ul></div>`
      : `<div class="card tbl"><table><thead><tr>${b.tabla.cols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>${b.tabla.rows.map(r => `<tr>${r.map((c, j) => `<td${j === 0 ? " class=\"k\"" : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
    const badge = p.origen === "complemento"
      ? `<span class="badge comp" title="Este procedimiento no está en el manual original; se completó con información vigente.">Complemento · información vigente</span>`
      : `<span class="badge man">Del manual 2026</span>`;
    return `<div class="crumbs"><a href="#/manual">Manual</a> / <a href="#/seccion/${s.id}">${s.titulo}</a> / ${p.titulo}</div>
    <h1>${p.titulo}</h1><p class="sub">${badge} Actualizado: ${p.fecha}</p>
    <div class="proc"><aside class="toc"><b>Contenido</b>${toc.map(([a, t], i) => `<a href="#" data-anchor="${a}">${i + 1}. ${t}</a>`).join("")}</aside>
    <div><div class="card" id="resumen">${p.parrafos.map(t => `<p style="margin:0 0 8px">${t}</p>`).join("")}</div>
    ${pasos.length ? `<h2 id="pasos">Pasos del procedimiento</h2><div class="card"><ol class="steps">${pasos.map((t, i) => `<li><b>${i + 1}</b>${t}</li>`).join("")}</ol></div>` : ""}
    ${bl.map(bloque).join("")}
    ${p.zona ? `<h2 id="zonas">Zonas relacionadas</h2>${p.zona.map(z => `<a class="tag" href="#/bodega?z=${z}">${z}</a>`).join("")}` : ""}
    ${tips.length ? `<h2 id="tips">Recomendaciones</h2>${tips.map(t => `<div class="tip ${t.tipo}">${t.tipo === "ok" ? "💡" : "ℹ️"} ${t.texto}</div>`).join("")}` : ""}
    </div></div>`;
  },
  bodega(params) {
    const pos = { R01: "left:17%;top:70px;width:22%;height:70px", R02: "left:45%;top:70px;width:22%;height:70px", Q01: "left:76%;top:70px;width:20%;height:90px",
      G01: "left:17%;top:190px;width:16%;height:100px", MESA: "left:37%;top:200px;width:24%;height:70px", P01: "left:65%;top:190px;width:31%;height:130px",
      ZID: "left:17%;top:320px;width:22%;height:60px", CUAR: "left:43%;top:320px;width:20%;height:60px" };
    const sel = params.get("z");
    const z = M.zonas.find(x => x.id === sel);
    return `<h1>Zonas de la bodega</h1><p class="sub">Selecciona una zona para ver su descripción y procedimiento.</p>
    <div class="plan"><div class="roof">Patio lateral techado</div>
      ${M.zonas.map(x => `<button class="zone ${x.id === sel ? "sel" : ""}" data-z="${x.id}" style="background:${x.color};${pos[x.id]}">${x.nombre.replace(/ (R|Q|G|P)\d+$/, "")} ${/^[RQGP]\d/.test(x.id) ? "(" + x.id + ")" : ""}</button>`).join("")}
      <span class="door" style="left:6px;top:200px">Portón<br>de acceso ▸</span><span class="door" style="left:20px;bottom:6px">▲ Puerta peatonal</span></div>
    ${z ? `<div class="card" style="margin-top:14px;max-width:760px"><h3 style="margin:0 0 4px">${z.nombre}</h3><p style="margin:0 0 8px;color:var(--muted)">${z.desc}</p><a class="btn" href="#/proc/${z.proc}">Ver procedimiento →</a></div>` : ""}`;
  },
  documentos() {
    return `<h1>Formularios y registros</h1><p class="sub">Formatos citados en el manual. <a href="#/proc/formatos" style="color:var(--blue)">Ver listado completo →</a> (prototipo: aún sin archivos descargables).</p>
    <div class="grid g2">${M.documentos.map(d => `<div class="card sec"><div class="ico" style="margin:0;font-size:30px">📄</div><div><b>${d.nombre}</b><p style="margin:2px 0 0">${d.ext}</p></div><span class="btn" style="margin-left:auto">Descargar</span></div>`).join("")}</div>`;
  },
  buscar(params) {
    const q = (params.get("q") || "").trim(), nq = norm(q);
    const hits = q ? M.procedimientos.map(p => {
      const txt = norm([p.titulo, p.resumen, ...p.parrafos, ...(p.pasos || []), ...(p.bloques || []).flatMap(b => b.lista || b.tabla.rows.flat())].join(" "));
      const score = nq.split(/\s+/).reduce((a, w) => a + (norm(p.titulo).includes(w) ? 3 : 0) + (txt.includes(w) ? 1 : 0), 0);
      return { p, score };
    }).filter(r => r.score).sort((a, b) => b.score - a.score) : [];
    return `<h1>Resultados de búsqueda</h1><p class="sub">${q ? `${hits.length} resultado(s) para “${esc(q)}”` : "Escribe algo en el buscador."}</p>
    <div class="results grid g3">${hits.map(r => procCard(r.p)).join("")}</div>
    <h2>Categorías de temas</h2><div class="grid g3">${M.secciones.map(s => `<a class="card sec" href="#/seccion/${s.id}"><div class="num" style="background:${s.color}">${s.icon}</div><b>${s.titulo}</b></a>`).join("")}</div>`;
  }
};
function notFound() { return `<h1>No encontrado</h1><p class="sub"><a href="#/">Volver al inicio</a></p>`; }

function render() {
  const [path, query] = (location.hash.slice(1) || "/").split("?");
  const params = new URLSearchParams(query || "");
  const [, r, id] = path.split("/");
  const view = r || "home";
  app.innerHTML = (views[view] ? views[view](id || params, params) : notFound());
  if (view === "seccion" || view === "proc") { /* id passed */ }
  document.getElementById("q").value = view === "buscar" ? params.get("q") || "" : "";
  const map = { home: "home", manual: "manual", seccion: "manual", proc: "manual", bodega: "bodega", documentos: "doc" };
  document.querySelectorAll(".sidebar a").forEach(a => a.classList.toggle("active", a.dataset.nav === (map[view] || "")));
  document.getElementById("sidebar").classList.remove("open");
  window.scrollTo(0, 0);
}
// bodega y buscar reciben params, no id
const _b = views.bodega, _s = views.buscar;
views.bodega = (a, p) => _b(p || a); views.buscar = (a, p) => _s(p || a);

app.addEventListener("click", e => {
  const z = e.target.closest("[data-z]");
  if (z) location.hash = "#/bodega?z=" + z.dataset.z;
  const a = e.target.closest("[data-anchor]");
  if (a) { e.preventDefault(); document.getElementById(a.dataset.anchor)?.scrollIntoView({ behavior: "smooth" }); }
});
document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault(); location.hash = "#/buscar?q=" + encodeURIComponent(document.getElementById("q").value);
});
document.getElementById("menuBtn").onclick = () => document.getElementById("sidebar").classList.toggle("open");
window.addEventListener("hashchange", render);
render();
