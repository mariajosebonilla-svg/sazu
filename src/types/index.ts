// ── Case Study Types ──────────────────────────────────────────────
export interface CaseStudy {
  slug: string
  title?: string
  client: string
  industry: string
  services: string[]
  year: string | number
  tagline: string
  coverImage: string
  coverColor: string        // CSS color for fallback background
  heroVideo?: string        // optional video URL for hero
  featured: boolean
  order: number             // controls display order
  // Story sections
  context: string
  challenge: string
  solution: string
  process: ProcessStep[]
  results: Result[]
  gallery: GalleryItem[]   // can be image or video
  // Navigation
  nextCase?: string         // slug of next case
  prevCase?: string         // slug of prev case
  // Closing statement
  closingParagraph?: string
  // SEO
  metaDescription?: string
}

export interface ProcessStep {
  phase: string             // e.g. "Descubrimiento"
  description: string
  detail?: string
}

export interface Result {
  metric: string            // e.g. "+240%"
  label: string             // e.g. "incremento en conversión"
  description?: string
}

// Gallery item can be an image OR a video (YouTube/Vimeo/mp4)
export interface GalleryItem {
  src: string               // image path or video URL
  alt?: string
  caption?: string
  size?: 'full' | 'half' | 'third'  // grid layout hint
  type?: 'image' | 'video'  // defaults to 'image'; auto-detected if URL matches youtube/vimeo
}

// Backwards compat alias
export type GalleryImage = GalleryItem

// ── Client Types ──────────────────────────────────────────────────
export interface Client {
  name: string
  logo?: string             // path to SVG/PNG logo
  industry?: string
}

// ── Navigation ────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
}

// ── Animation Variants (Framer Motion) ───────────────────────────
export interface AnimationConfig {
  initial?: object
  animate?: object
  exit?: object
  transition?: object
}
