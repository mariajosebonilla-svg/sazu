'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  threshold?: number
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function TextReveal({
  text,
  className,
  delay = 0,
  threshold = 0.1,
  tag: Tag = 'p',
}: TextRevealProps) {
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

  const lines = text.split('\n')

  return (
    <Tag ref={ref as any} className={className} aria-label={text}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reduced ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            animate={
              inView || reduced
                ? { y: '0%', opacity: 1 }
                : { y: '110%', opacity: 0 }
            }
            transition={{
              ease: [0.16, 1, 0.3, 1],
              duration: 0.85,
              delay: delay + lineIdx * 0.09,
            }}
            aria-hidden
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
