// Barra superior operativa: notificaciones, ayuda y menú de usuario (perfil, contraseña, cerrar sesión).
(function () {
  const M = window.MANUAL, S = window.Auth && Auth.get();
  if (!S) return;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ls = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
  const secs = id => M.secciones.find(s => s.id === id);

  // ---- chip de usuario ----
  $("uName").textContent = S.nombre; $("uRole").textContent = S.cargo;
  const avatar = (cls = "") => S.avatar ? `<img class="${cls}" src="${S.avatar}" alt="">` : `<span class="avi ${cls}">${esc(S.ini)}</span>`;
  $("uAv").outerHTML = S.avatar ? `<img id="uAv" src="${S.avatar}" alt="">` : `<span id="uAv" class="avi">${esc(S.ini)}</span>`;

  // ---- ventanas emergentes ----
  const pops = ["bellPop", "helpPop", "userPop"];
  const closeAll = () => pops.forEach(id => $(id).hidden = true);
  function toggle(id) { const was = !$(id).hidden; closeAll(); if (!was) { $(id).hidden = false; } }
  $("bellBtn").onclick = e => { e.stopPropagation(); renderBell(); toggle("bellPop"); };
  $("helpBtn").onclick = e => { e.stopPropagation(); renderHelp(); toggle("helpPop"); };
  $("userBtn").onclick = e => { e.stopPropagation(); renderUser(); toggle("userPop"); };
  document.addEventListener("click", e => { if (!e.target.closest(".pw")) closeAll(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeAll(); closeModal(); } });
  pops.forEach(id => $(id).addEventListener("click", e => { if (e.target.closest("a[href]")) closeAll(); }));

  // ---- modal ----
  const modal = $("modal");
  function openModal(html) { $("mbody").innerHTML = html; modal.hidden = false; closeAll(); }
  function closeModal() { modal.hidden = true; $("mbody").innerHTML = ""; }
  $("mx").onclick = closeModal;
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  // ---- notificaciones ----
  const nk = "bodega_notif_" + S.user;
  const readN = () => { try { return new Set(JSON.parse(ls.get(nk) || "[]")); } catch { return new Set(); } };
  const saveN = s => ls.set(nk, JSON.stringify([...s]));
  const items = () => (M.actualizaciones || []).map(u => Object.assign({ id: u.texto }, u));
  function pending() {
    let rd = new Set(); try { rd = new Set(JSON.parse(ls.get("bodega_read_" + S.user) || "[]")); } catch {}
    return M.procedimientos.length - M.procedimientos.filter(p => rd.has(p.id)).length;
  }
  function badge() {
    const n = items().filter(i => !readN().has(i.id)).length, el = $("bellCount");
    el.textContent = n; el.hidden = n === 0;
  }
  function renderBell() {
    const rd = readN(), its = items(), pend = pending();
    $("bellPop").innerHTML = `<div class="ph"><b>Notificaciones</b><button class="lk" id="markAll">Marcar todas como leídas</button></div>
      <div class="pl">${pend > 0 ? `<a class="ni info" href="#/todas"><span class="nd off"></span><span><b>Tienes ${pend} procedimientos por leer</b><small>Continúa con tu avance del manual</small></span></a>` : ""}
      ${its.map((n, i) => `<a class="ni" href="${n.link}" data-n="${i}"><span class="nd ${rd.has(n.id) ? "off" : ""}"></span><span><b>${esc(n.texto)}</b><small>${esc(n.fecha)}</small></span></a>`).join("") || '<p class="empty-s">Sin notificaciones.</p>'}</div>`;
    $("markAll").onclick = e => { e.stopPropagation(); saveN(new Set(its.map(n => n.id))); badge(); renderBell(); };
    $("bellPop").querySelectorAll("[data-n]").forEach(a => a.addEventListener("click", () => { const s = readN(); s.add(its[+a.dataset.n].id); saveN(s); badge(); }));
  }

  // ---- ayuda ----
  function renderHelp() {
    const c = window.CONTACTO || {};
    $("helpPop").innerHTML = `<div class="ph"><b>¿Necesitas ayuda?</b></div><div class="pl pad">
      <p class="hp">Contacta a tu supervisor o al área de operaciones. Mientras tanto, estos accesos pueden ayudarte:</p>
      <a class="hl" href="#/formato/registro-incidencias">🚨 Registrar una incidencia</a>
      <a class="hl" href="#/proc/glosario">📚 Glosario de términos</a>
      <a class="hl" href="#/proc/normativa">⚖️ Normativa aplicable</a>
      <a class="hl" href="#/bodega">🗺️ Plano de la bodega</a>
      <a class="hl" href="#/quiz/epp">🎓 Entrenamiento de EPP</a>
      <details class="fq"><summary>¿Cómo marco un procedimiento como leído?</summary><p>Abre el procedimiento y pulsa «Marcar como leído». Tu avance se guarda en tu usuario.</p></details>
      <details class="fq"><summary>¿Cómo imprimo un formato?</summary><p>Entra a Formularios y registros, abre el formato y pulsa «Imprimir formato».</p></details>
      <details class="fq"><summary>¿Qué significa «Complemento»?</summary><p>Es un procedimiento que no estaba en el manual original y se completó con información vigente. Verifícalo con tu supervisor.</p></details>
      <p class="hp sm">Atajo: pulsa <kbd class="k">Ctrl</kbd> + <kbd class="k">K</kbd> para buscar.</p>
      ${c.correo ? `<a class="btn p sm full" href="mailto:${esc(c.correo)}?subject=${encodeURIComponent("Consulta sobre el Manual de Bodega")}">✉️ Escribir al supervisor</a>` : `<p class="hp sm">Contacto: ${esc(c.area || "Área de Operaciones")}.</p>`}</div>`;
  }

  // ---- menú de usuario ----
  function renderUser() {
    $("userPop").innerHTML = `<div class="uh">${avatar("big")}<div><b>${esc(S.nombre)}</b><small>${esc(S.cargo)}</small><span class="rol">${esc(S.rol)}</span></div></div>
      <div class="pl"><button class="mi" id="miPerfil">👤 Mi perfil y progreso</button><button class="mi" id="miPass">🔑 Cambiar contraseña</button><button class="mi out" id="miOut">⎋ Cerrar sesión</button></div>`;
    $("miPerfil").onclick = perfil; $("miPass").onclick = cambiar; $("miOut").onclick = () => { Auth.logout(); location.replace("portada.html"); };
  }
  function perfil() {
    let rd = new Set(), qz = {};
    try { rd = new Set(JSON.parse(ls.get("bodega_read_" + S.user) || "[]")); qz = JSON.parse(ls.get("bodega_quiz_" + S.user) || "{}"); } catch {}
    const done = M.secciones.filter(s => { const ps = M.procedimientos.filter(p => p.seccion === s.id); return ps.length && ps.every(p => rd.has(p.id)); }).length;
    const pct = Math.round(rd.size / M.procedimientos.length * 100), last = Auth.lastLogin(S.user);
    const qs = Object.keys(M.quizzes).filter(k => qz[k] != null);
    openModal(`<div class="uh pf">${avatar("big")}<div><h3>${esc(S.nombre)}</h3><small>${esc(S.cargo)} · usuario <b>${esc(S.user)}</b> · rol ${esc(S.rol)}</small><small>Último ingreso: ${last ? new Date(last).toLocaleString("es-CL") : "—"}</small></div></div>
      <div class="pst"><div><b>${rd.size}/${M.procedimientos.length}</b><span>procedimientos leídos</span></div><div><b>${done}/${M.secciones.length}</b><span>secciones completas</span></div><div><b>${qs.length}/${Object.keys(M.quizzes).length}</b><span>evaluaciones rendidas</span></div></div>
      <div class="bar2"><i style="width:${pct}%"></i></div><small class="pg">Avance general: ${pct}%</small>
      <h4>Resultados de evaluaciones</h4>
      ${qs.length ? `<ul class="rl2">${qs.map(k => `<li><span>${esc(M.quizzes[k].titulo.replace(/^(Evaluación|Módulo de entrenamiento): ?/, ""))}</span><b>${qz[k]}/${M.quizzes[k].preguntas.length}</b></li>`).join("")}</ul>` : '<p class="empty-s">Aún no has rendido evaluaciones.</p>'}
      <div class="mf"><button class="btn o sm" id="pClose">Cerrar</button><button class="btn p sm" id="pOut">Cerrar sesión</button></div>`);
    $("pClose").onclick = closeModal; $("pOut").onclick = () => { Auth.logout(); location.replace("portada.html"); };
  }
  function cambiar() {
    openModal(`<h3>Cambiar contraseña</h3><p class="hp">Se guarda solo en este equipo. Mínimo 8 caracteres.</p>
      <form id="pf" class="pform"><div class="err" id="pErr"></div>
      <label>Contraseña actual<input type="password" id="pa" autocomplete="current-password" required></label>
      <label>Nueva contraseña<input type="password" id="pn" autocomplete="new-password" required minlength="8"></label>
      <label>Repetir nueva contraseña<input type="password" id="pr" autocomplete="new-password" required></label>
      <div class="mf"><button type="button" class="btn o sm" id="pCancel">Cancelar</button><button class="btn p sm" type="submit">Guardar</button></div></form>`);
    $("pCancel").onclick = closeModal;
    $("pf").onsubmit = async e => {
      e.preventDefault(); const er = $("pErr"); er.classList.remove("on");
      if ($("pn").value !== $("pr").value) { er.textContent = "Las contraseñas nuevas no coinciden."; er.classList.add("on"); return; }
      const r = await Auth.changePassword(S.user, $("pa").value, $("pn").value);
      if (!r.ok) { er.textContent = r.error; er.classList.add("on"); return; }
      closeModal(); const t = document.createElement("div"); t.className = "toast"; t.textContent = "Contraseña actualizada"; document.body.append(t); setTimeout(() => t.remove(), 2000);
    };
  }
  badge();
})();
