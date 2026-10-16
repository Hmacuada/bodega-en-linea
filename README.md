# Bodega en línea – Cerro del Cobre (prototipo)

Manual de administración de bodega e inventario como sitio web estático (HTML/CSS/JS).

## Estructura
- `v2/portada.html` – portada pública. `v2/login.html` – ingreso. `v2/index.html` – el manual (requiere sesión).
- `data.js`, `data2.js`, `detalle1-4.js` – contenido del manual (procedimientos, evaluaciones, formatos).
- `v2/usuarios.js` – usuarios de demostración (solo huellas SHA-256 con sal). Las contraseñas están en `CREDENCIALES-DEMO.txt` (no se sube a GitHub).
- `v2/topbar.js` – notificaciones, ayuda y menú de usuario.

## Ver localmente
`powershell -ExecutionPolicy Bypass -File serve.ps1` y abrir http://localhost:5173/v2/

## Importante sobre el acceso
El login se valida en el navegador: sirve como puerta de entrada de demostración y para guardar el avance por usuario,
pero **no es seguridad real** (cualquiera puede leer los archivos del sitio). Para información sensible hace falta un servidor de autenticación.

## Publicar
GitHub Pages (Settings → Pages → rama `main`, carpeta raíz): la portada quedaría en `/v2/portada.html`.
