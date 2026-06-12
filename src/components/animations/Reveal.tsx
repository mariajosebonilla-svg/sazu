'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'
import { fadeUp, fadeIn, scaleIn } from '@/lib/animations'
import { useReducedMotion } from '@/hooks'

type RevealVariant = 'fadeUp' | 'fadeIn' | 'scaleIn'

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  threshold?: number
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const variantMap: Record<RevealVariant, Variants> = {
  fadeUp,
  fadeIn,
  scaleIn,
}

export function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  threshold = 0.1,
  className,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const reduced = useReducedMotion()

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

  const MotionTag = motion[Tag as 'div']

  return (
    <MotionTag
      ref={ref as any}
      className={className}
      variants={variantMap[variant]}
      initial={reduced ? 'visible' : 'hidden'}
      animate={inView || reduced ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
