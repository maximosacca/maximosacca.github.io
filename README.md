# Portfolio de Máximo Sacca

Sitio personal de Máximo Sacca, desarrollador web y diseñador creativo. Incluye presentación, proyectos, formulario de contacto y un mapa de ubicación.

## Stack

- React 19 + Vite 8
- React Router 8
- GSAP (`ImageHover`) y Framer Motion (`TypingText`)
- EmailJS para el formulario
- `@vis.gl/react-google-maps` para el mapa
- CSS propio con tokens en `src/App.css`

## Requisitos

- Node.js 20.19+ o 22.12+ (requisito de Vite 8). Probado con Node 24.
- npm 10+

## Instalación

```sh
npm install
cp .env.example .env.local
```

Completar `VITE_GOOGLE_MAPS_KEY` en `.env.local` con una clave de Google Maps restringida por HTTP referrer. Si falta, la sección de Contacto muestra un enlace alternativo a Google Maps en lugar del mapa.

## Scripts

```sh
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Previsualizar el build
npm run lint     # ESLint
npm run deploy   # Build + 404.html + publicación en gh-pages
```

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `VITE_GOOGLE_MAPS_KEY` | Clave pública de Google Maps para el componente `MapForm` |

El archivo `.env.local` está ignorado por Git. No commitear claves privadas.

## Deploy

El sitio se publica en GitHub Pages con `gh-pages`:

```sh
npm run deploy
```

`predeploy` ejecuta el build y copia `dist/index.html` a `dist/404.html` para que las rutas de React Router funcionen en recargas directas.

## Estructura

```text
src/
  components/
    Contacto/       Formulario y mapa
    Home/           Hero, About e ImageHover
    Layout/         Header, Footer, Layout y widget de datos random
    Proyectos/      Grilla y tarjetas
    Utils/          ScrollToAnchor, TypingText, ErrorBoundary y DocumentTitle
  pages/            Home, Contacto, Proyectos y NotFound
  service/          api.js (proyectos) y facts.js (datos random)
public/
  data/             proyectos.json
  images/           Assets optimizados en WebP
```

## Integraciones

- **Datos random:** `FactsButton` consume `uselessfacts.jsph.pl` y traduce con MyMemory. Si la traducción falla, muestra el dato original en inglés.
- **EmailJS:** la configuración del servicio y template está en `Formulario.jsx`.
- **Google Maps:** se carga solo si `VITE_GOOGLE_MAPS_KEY` está definida; ante errores muestra un fallback.

## Calidad

El workflow de CI ejecuta `npm ci`, `npm run lint` y `npm run build` en cada push a `main`/`secondary` y en pull requests.
