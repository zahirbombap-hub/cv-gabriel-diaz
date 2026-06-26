# CV — Gabriel David Díaz Garavito

CV web personal y portafolio de **Gabriel Díaz** — Tecnólogo en Desarrollo de
Software especializado en automatización con IA y agentes conversacionales.

- 🌐 Demo: <https://cv.donprueba.online> (tras deploy)
- 📧 Contacto: <gddiazga@gmail.com>
- 🐙 GitHub: <https://github.com/zahirbombap-hub>
- 💼 LinkedIn: <https://www.linkedin.com/in/gabriel-david-diaz-garavito-3a013b2a0/>

## Stack

- **React 19** + **Create React App** + **Tailwind CSS 3**
- **react-router-dom 7** (rutas `/`, `/cv`, `/sobre-mi`, `/gabriel`)
- **Schema.org Person** JSON-LD para SEO
- **Vercel** para deploy (free tier, `vercel.json` con SPA rewrites)

## Características

- 🌗 **Modo oscuro / claro** con persistencia en `localStorage` y detección
  de `prefers-color-scheme`
- 🎨 **Paleta amable a la vista:** dark `#0E1117` con índigo `#7C9CFF`,
  light crema `#F4F1EA` (no blanco nuclear) con índigo `#4F46E5`
- 📸 **Foto optimizada** a WebP `@1x` y `@2x` (10.6 KB + 25.2 KB)
- 🤖 **Portafolio IA-first** — 3 proyectos destacados con badge
  *IA / Automatización* + 4 mini-proyectos personales
- ✉️ **Formulario mailto** — abre el cliente de correo con el mensaje
  pre-llenado, sin backend (compatible con Vercel free tier)
- ♿ **Accesibilidad:** respeta `prefers-reduced-motion`, focus rings
  globales, contraste WCAG AA en ambos modos

## Comandos

```bash
npm install        # Instalar dependencias
npm start          # Dev server en http://localhost:3000
npm run build      # Build de producción → ./build
npm test           # Tests (si los hay)
```

## Estructura

```
src/
├── components/
│   ├── Seo.jsx                  ← gestión de meta tags + JSON-LD
│   └── cv/                      ← secciones del CV
│       ├── cvData.js            ← fuente única de contenido (editable)
│       ├── CvHero.jsx           ← foto + nombre + tagline + CTAs
│       ├── CvAbout.jsx          ← bio + stat cards
│       ├── CvExperience.jsx     ← cronología laboral
│       ├── CvSkills.jsx         ← stack técnico con barras
│       ├── CvProjects.jsx       ← portafolio (3 featured + 4 bonus)
│       ├── CvProjectCard.jsx
│       ├── CvEducation.jsx      ← formación
│       ├── CvContact.jsx        ← 4 enlaces + form mailto
│       └── CvThemeToggle.jsx    ← botón flotante sol/luna
├── hooks/
│   ├── useThemeMode.js          ← persistencia de tema
│   └── useReveal.js             ← IntersectionObserver para reveals
├── routes/
│   └── cv.jsx                   ← ensamblador de la página
├── seo/
│   ├── index.js
│   └── seo.config.json          ← rutas y keywords
└── styles/
    └── theme.css                ← tokens CSS (light + dark)
```

## Editar contenido

Toda la información personal vive en `src/components/cv/cvData.js`.
Cambia nombre, proyectos, skills, contacto → se refleja sin tocar
componentes.

## Deploy

```bash
# Crear repo en GitHub primero, luego:
git remote add origin git@github.com:zahirbombap-hub/cv-gabriel-diaz.git
git push -u origin main

# Primer deploy
npx vercel

# Producción
npx vercel --prod
```

## Licencia

Código: MIT. Contenido personal (foto, datos, copy): © Gabriel David Díaz Garavito.
