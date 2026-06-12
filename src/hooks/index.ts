'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

// ── useScrollProgress ─────────────────────────────────────────────
// Returns scroll progress (0-1) for a given element ref
export function useScrollProgress(options?: { offset?: readonly [string, string] }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (options?.offset ?? ['start end', 'end start']) as any,
  })
  return { ref, scrollYProgress }
}

// ── useParallax ───────────────────────────────────────────────────
// Returns a translateY motion value based on scroll
export function useParallax(
  scrollYProgress: MotionValue<number>,
  distance = 80
): MotionValue<string> {
  return useTransform(
    scrollYProgress,
    [0, 1],
    [`-${distance / 2}px`, `${distance / 2}px`]
  )
}

// ── useScrollDirection ────────────────────────────────────────────
export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [scrollY, setScrollY] = useState(0)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setDirection(current > prevScrollY.current ? 'down' : 'up')
      setScrollY(current)
      prevScrollY.current = current
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { direction, scrollY }
}

// ── useCursor ─────────────────────────────────────────────────────
export function useCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const ringRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const lerp = (start: number, end: number, t: number) =>
        start + (end - start) * t

      const animate = () => {
        ringRef.current = {
          x: lerp(ringRef.current.x, e.clientX, 0.12),
          y: lerp(ringRef.current.y, e.clientY, 0.12),
        }
        setRingPosition({ ...ringRef.current })
        rafRef.current = requestAnimationFrame(animate)
      }
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const onEnter = useCallback((text?: string) => {
    setIsHovering(true)
    if (text) setLabel(text)
  }, [])

  const onLeave = useCallback(() => {
    setIsHovering(false)
    setLabel(null)
  }, [])

  return { position, ringPosition, isHovering, label, onEnter, onLeave }
}

// ── useReducedMotion ──────────────────────────────────────────────
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

// ── useInView ─────────────────────────────────────────────────────
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
