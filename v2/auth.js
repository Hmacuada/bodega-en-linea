// Sesión del prototipo. Control del lado del navegador: sirve como puerta de entrada de demostración,
// pero NO es seguridad real (cualquiera puede leer los archivos del sitio). Para producción se necesita un servidor.
window.Auth = (function () {
  const SESSION = "bodega_session", FAIL = "bodega_fail", DIAS = 7, MAX = 5, BLOQUEO_MS = 30000;
  const store = k => { try { return window[k]; } catch { return null; } };
  const get = (s, k) => { try { return store(s).getItem(k); } catch { return null; } };
  const set = (s, k, v) => { try { store(s).setItem(k, v); } catch {} };
  const del = (s, k) => { try { store(s).removeItem(k); } catch {} };

  async function sha(texto) {
    if (!(window.crypto && crypto.subtle)) throw new Error("El navegador no permite cifrado en esta página. Abre el sitio desde http://localhost o https.");
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
    return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, "0")).join("");
  }
  const findUser = u => (window.USUARIOS || []).find(x => x.user.toLowerCase() === String(u || "").trim().toLowerCase());
  const override = user => { try { return JSON.parse(get("localStorage", "bodega_pw_" + user) || "null"); } catch { return null; } };
  async function check(user, pass) {
    const o = override(user.user), salt = o ? o.salt : user.salt, hash = o ? o.hash : user.hash;
    return (await sha(salt + ":" + pass)) === hash;
  }
  function pub(u) { return { user: u.user, nombre: u.nombre, cargo: u.cargo, rol: u.rol, avatar: u.avatar || "", ini: u.nombre.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase() }; }

  function current() {
    let raw = get("sessionStorage", SESSION), persist = false;
    if (!raw) { raw = get("localStorage", SESSION); persist = true; }
    if (!raw) return null;
    try {
      const s = JSON.parse(raw);
      if (persist && s.exp && Date.now() > s.exp) { del("localStorage", SESSION); return null; }
      if (!findUser(s.user)) return null;
      return s;
    } catch { return null; }
  }
  function lock() { try { return JSON.parse(get("localStorage", FAIL) || "{}"); } catch { return {}; } }
  function lockedFor() { const l = lock(); return l.until && Date.now() < l.until ? Math.ceil((l.until - Date.now()) / 1000) : 0; }

  async function login(usuario, clave, recordar) {
    const wait = lockedFor();
    if (wait) return { ok: false, error: `Demasiados intentos. Espera ${wait} segundos e inténtalo de nuevo.` };
    const u = findUser(usuario);
    let ok = false;
    try { ok = !!u && await check(u, clave); } catch (e) { return { ok: false, error: e.message }; }
    if (!ok) {
      const l = lock(), n = (l.until && Date.now() >= l.until ? 0 : l.n || 0) + 1;
      if (n >= MAX) { set("localStorage", FAIL, JSON.stringify({ n: 0, until: Date.now() + BLOQUEO_MS })); return { ok: false, error: `Demasiados intentos. Espera ${BLOQUEO_MS / 1000} segundos.` }; }
      set("localStorage", FAIL, JSON.stringify({ n, until: 0 }));
      return { ok: false, error: `Usuario o contraseña incorrectos. Intentos restantes: ${MAX - n}.` };
    }
    del("localStorage", FAIL);
    const s = Object.assign(pub(u), { t: Date.now(), exp: Date.now() + DIAS * 864e5 });
    del("sessionStorage", SESSION); del("localStorage", SESSION);
    set(recordar ? "localStorage" : "sessionStorage", SESSION, JSON.stringify(s));
    set("localStorage", "bodega_last_login_" + u.user, String(Date.now()));
    return { ok: true, session: s };
  }
  function logout() { del("sessionStorage", SESSION); del("localStorage", SESSION); }
  async function changePassword(user, actual, nueva) {
    const u = findUser(user);
    if (!u || !(await check(u, actual))) return { ok: false, error: "La contraseña actual no es correcta." };
    if (nueva.length < 8) return { ok: false, error: "La nueva contraseña debe tener al menos 8 caracteres." };
    const salt = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
    set("localStorage", "bodega_pw_" + u.user, JSON.stringify({ salt, hash: await sha(salt + ":" + nueva) }));
    return { ok: true };
  }
  return { get: current, login, logout, changePassword, lockedFor, lastLogin: u => Number(get("localStorage", "bodega_last_login_" + u) || 0) };
})();
