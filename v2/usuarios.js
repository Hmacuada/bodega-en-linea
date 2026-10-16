// Usuarios del prototipo (acceso de demostración).
// Las contraseñas NO están aquí: solo su huella SHA-256 con sal (ver auth.js).
// Las contraseñas de demostración están en CREDENCIALES-DEMO.txt (no se publica).
// IMPORTANTE: es un control del lado del navegador; no reemplaza una autenticación real con servidor.
window.USUARIOS = [
  { user: "operador", nombre: "Usuario Operador", cargo: "Operador de bodega", rol: "Operador", avatar: "img/avatar.png", salt: "0f78e3902bee4d3a", hash: "bfe052c008d95f3dfd3e8e17134eb3122a65dfbe58daa60df9b7bf8a6a717ac9" },
  { user: "supervisor", nombre: "Usuario Supervisor", cargo: "Supervisor de bodega", rol: "Supervisor", avatar: "", salt: "269180e16ca54000", hash: "33e71deae40f7e1b08136619cebcc64ae5d773dcf011a83531724b290fdba82f" },
  { user: "admin", nombre: "Administrador", cargo: "Administrador del manual", rol: "Administrador", avatar: "", salt: "c77ee5b612ae4f69", hash: "4ca43e60384bab2c3dfe2a0426a5b742184f239e4312e7f0dcc34c21c3048db5" }
];
// Completa el correo para habilitar el botón «Escribir al supervisor» en el panel de ayuda.
window.CONTACTO = { area: "Área de Operaciones", correo: "" };
