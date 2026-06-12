import { Variants, Transition } from 'framer-motion'

// ── Base Transitions ──────────────────────────────────────────────
export const cinemaTransition: Transition = {
  ease: [0.16, 1, 0.3, 1],
  duration: 0.9,
}

export const revealTransition: Transition = {
  ease: [0.77, 0, 0.175, 1],
  duration: 0.7,
}

export const subtleTransition: Transition = {
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.6,
}

// ── Scroll Reveal ─────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: cinemaTransition },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: cinemaTransition },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: cinemaTransition },
}

// ── Text Reveal (clip) ────────────────────────────────────────────
export const textRevealContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const textRevealWord: Variants = {
  hidden:  { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { ...cinemaTransition, duration: 0.75 },
  },
}

// ── Stagger Container ─────────────────────────────────────────────
export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
})

// ── Page Transitions ──────────────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter:   { opacity: 1, y: 0,  transition: { ...cinemaTransition, duration: 1 } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.4, ease: 'easeIn' } },
}

// ── Line Reveal ───────────────────────────────────────────────────
export const lineReveal: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { ...revealTransition, duration: 0.8 } },
}

// ── Counter ───────────────────────────────────────────────────────
export const counterVariant: Variants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: cinemaTransition },
}

// ── Image Parallax (used with useScroll) ──────────────────────────
export const parallaxConfig = {
  inputRange:  [0, 1] as [number, number],
  outputRange: ['-8%', '8%'] as string[],
}

// ── Cursor label ──────────────────────────────────────────────────
export const cursorLabel: Variants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
}

// ── Nav ───────────────────────────────────────────────────────────
export const navVariants: Variants = {
  top:      { backgroundColor: 'rgba(8,8,8,0)',      backdropFilter: 'blur(0px)' },
  scrolled: { backgroundColor: 'rgba(8,8,8,0.88)',  backdropFilter: 'blur(16px)' },
}
