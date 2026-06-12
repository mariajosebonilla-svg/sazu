'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'


// Animated counter - pure JS, no framer animate()
function useCounter(to: number, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 2200
    const step = 16
    const inc = to / (duration / step)
    const t = setInterval(() => {
      start += inc
      if (start >= to) { setCount(to); clearInterval(t) }
      else setCount(Math.round(start))
    }, step)
    return () => clearInterval(t)
  }, [active, to])
  return count
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 600)
    return () => clearTimeout(t)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Headline rises up as user scrolls — eventbeds.com style
  const headlineY  = useTransform(scrollYProgress, [0, 0.5], ['60px', '0px'])
  const headlineOp = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  // Counter fades out on scroll
  const counterOp  = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const counterSc  = useTransform(scrollYProgress, [0, 0.25], [1, 0.85])
  // Background parallax
  const bgY        = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const projects = useCounter(80, started)
  const years    = useCounter(5,  started)
  const sectors  = useCounter(10, started)

  return (
    <section
      ref={containerRef}
      className="relative h-[180vh]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Background with purple glow — 13g.fr style */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <div className="absolute inset-0 bg-sazu-black" />
          {/* Purple glow blob */}
          <motion.div
            className="color-blob w-[600px] h-[600px] bg-sazu-purple opacity-20"
            style={{ bottom: '-10%', left: '-5%' }}
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="color-blob w-[400px] h-[400px] opacity-10"
            style={{ top: '20%', right: '10%', background: '#7B70FF' }}
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#F5F3EF 1px,transparent 1px),linear-gradient(90deg,#F5F3EF 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </motion.div>

        {/* ── COUNTER — visible at top, fades on scroll ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ opacity: counterOp, scale: counterSc }}
        >
          {/* Big number */}
          <div className="text-center mb-8">
            <motion.div
              className="font-display text-sazu-white leading-none"
              style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', fontWeight: 300, letterSpacing: '-0.04em' }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              +{projects}
            </motion.div>
            <motion.div
              className="text-sazu-ghost uppercase tracking-[0.3em] text-sm mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              proyectos entregados
            </motion.div>
          </div>

          {/* Secondary stats */}
          <motion.div
            className="flex gap-16 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { val: years, suffix: '+', label: 'años' },
              { val: sectors, suffix: '+', label: 'sectores' },
            ].map(({ val, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-sazu-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {suffix}{val}
                </div>
                <div className="text-sazu-ghost uppercase tracking-widest text-xs mt-1">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.div
              className="w-px h-12 origin-top"
              style={{ background: 'var(--purple)' }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-sazu-ghost uppercase tracking-[0.2em] text-xs">scroll</span>
          </motion.div>
        </motion.div>

        {/* ── HEADLINE — rises in from bottom as you scroll ── */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end z-20 pointer-events-none"
          style={{ opacity: headlineOp }}
        >
          <motion.div
            className="w-full max-w-screen-xl mx-auto px-6 md:px-10 pb-16 md:pb-24"
            style={{ y: headlineY }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="accent-line" />
              <span className="text-sazu-ghost uppercase tracking-widest" style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}>
                Portafolio
              </span>
            </div>
            <h1
              className="font-display text-sazu-white leading-none"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)', letterSpacing: '-0.03em', fontWeight: 300 }}
            >
              We build brands<br />
              <em style={{ fontStyle: 'italic' }}>that mean business.</em>
            </h1>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sazu-black to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
