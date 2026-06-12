# Sazú — Portfolio Web

Portfolio premium para agencia creativa integral. Next.js 14 + Tailwind CSS + Framer Motion + TypeScript.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS v3
- **Animaciones**: Framer Motion v11
- **Tipado**: TypeScript
- **Tipografías**: Cormorant Garamond (display) + Inter (body)
- **Deploy**: Vercel / Netlify (gratuito)

---

## Inicio rápido

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Estructura de carpetas

```
sazu/
├── content/
│   └── casos/              ← JSON de casos (agrega aquí nuevos)
│       ├── bancolombia-identidad.json
│       ├── ecopetrol-marca.json
│       └── avianca-producto.json
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout
│   │   ├── page.tsx            ← Home
│   │   ├── globals.css         ← Estilos globales
│   │   ├── not-found.tsx
│   │   └── casos/
│   │       └── [slug]/
│   │           └── page.tsx    ← Página de caso individual
│   │
│   ├── components/
│   │   ├── animations/
│   │   │   ├── Reveal.tsx      ← Scroll reveal wrapper
│   │   │   └── TextReveal.tsx  ← Animación de texto por línea
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AgencyIntro.tsx
│   │   │   ├── ClientsEcosystem.tsx
│   │   │   ├── FeaturedCases.tsx
│   │   │   ├── ProjectsGrid.tsx
│   │   │   ├── CaseHero.tsx
│   │   │   ├── CaseContent.tsx
│   │   │   └── CaseNavigation.tsx
│   │   └── ui/
│   │       └── Cursor.tsx
│   │
│   ├── hooks/
│   │   └── index.ts            ← useScrollProgress, useCursor, etc.
│   ├── lib/
│   │   ├── animations.ts       ← Variantes Framer Motion
│   │   └── cases.ts            ← Loader de JSONs
│   └── types/
│       └── index.ts            ← TypeScript types
```

---

## Agregar un nuevo caso

1. Crea un archivo en `content/casos/nombre-del-caso.json`
2. Sigue la estructura del tipo `CaseStudy` en `src/types/index.ts`
3. El caso aparece automáticamente en la grilla y en rutas `/casos/[slug]`

### Estructura mínima de un caso:

```json
{
  "slug": "mi-cliente-proyecto",
  "client": "Nombre del Cliente",
  "industry": "Industria",
  "services": ["Branding", "UX/UI"],
  "year": 2024,
  "tagline": "Una línea que resume el impacto.",
  "coverImage": "https://...",
  "coverColor": "#0D0D0D",
  "featured": false,
  "order": 10,
  "context": "...",
  "challenge": "...",
  "solution": "...",
  "process": [],
  "results": [],
  "gallery": []
}
```

---

## Sistema de diseño — Tokens

### Colores
| Token             | Hex       | Uso                    |
|-------------------|-----------|------------------------|
| `sazu-black`      | `#080808` | Fondo principal        |
| `sazu-void`       | `#0D0D0D` | Fondos alternativos    |
| `sazu-surface`    | `#111111` | Cards, secciones       |
| `sazu-elevated`   | `#181818` | Hover states           |
| `sazu-border`     | `#252525` | Bordes, divisores      |
| `sazu-muted`      | `#3A3A3A` | Elementos secundarios  |
| `sazu-ember`      | `#C8602A` | Acento principal       |
| `sazu-ember-light`| `#E8824E` | Hover del acento       |
| `sazu-white`      | `#F5F3EF` | Texto principal        |
| `sazu-off-white`  | `#B8B4AE` | Texto secundario       |
| `sazu-ghost`      | `#6B6760` | Texto terciario, labels|

### Tipografía
- **Display**: Cormorant Garamond 300–500 — titulares, énfasis, italiano
- **Body**: Inter 300–500 — párrafos, UI, labels
- **Scale**: `display-2xl` → `display-md` → `body-lg` → `body-sm` → `label`

---

## Deploy en Vercel

```bash
# 1. Push a GitHub
git init && git add . && git commit -m "initial"

# 2. En vercel.com → Import → selecciona el repo
# 3. Framework: Next.js (autodetectado)
# 4. Deploy → ✓
```

No requiere variables de entorno para la versión base.

---

## SEO

- Metadata dinámica por caso via `generateMetadata`
- `generateStaticParams` para SSG completo
- Open Graph configurado en `layout.tsx`
- Alt texts en todas las imágenes
- Semántica HTML correcta (h1 único por página, nav, main, article, section)

---

## Performance

- Imágenes via `next/image` (lazy load + AVIF/WebP automático)
- Fonts self-hosted via Google Fonts con `display=swap`
- Animaciones respetan `prefers-reduced-motion`
- `optimizeCss: true` en next.config.js
- SSG completo — 0 server-side rendering en producción
