# Frontend — Landing personal de Patricia

Página estática HTML/CSS en español.

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Página principal |
| `styles.css` | Estilos |
| `favicon.svg` | Icono del sitio |

## Cómo ver la página

Abre `index.html` en el navegador o sirve esta carpeta con un servidor estático:

```powershell
cd frontend
python -m http.server 8080
```

Luego visita http://localhost:8080/

## Dependencias externas

### Google Fonts (CDN)

La página carga dos familias tipográficas desde Google Fonts:

- **Fraunces** — títulos y nombre principal
- **DM Sans** — texto de cuerpo

Enlaces en `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:...&family=Fraunces:...&display=swap" rel="stylesheet">
```

**Requisitos:** conexión a internet en la primera carga. Si el CDN no está disponible, el navegador usa las fuentes de respaldo definidas en CSS (`Georgia`, `system-ui`).

**Alternativa sin CDN:** descargar las fuentes y servirlas localmente; actualizar `--font-display` y `--font-body` en `styles.css`.

### OpenStreetMap

El enlace de ubicación apunta a búsqueda en OpenStreetMap (solo al hacer clic; no carga recursos al abrir la página).

## Personalización

Sustituir los datos de ejemplo en `index.html`:

- `patricia@ejemplo.com`
- `+34 600 000 000`
- Ubicación: Madrid, España