'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'

export function AgencyIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%'])

  // 13g.fr style — color blob that moves with scroll
  const blobY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <section ref={ref} id="agencia" className="relative py-32 md:py-44 bg-sazu-black overflow-hidden">

      {/* Moving purple blob — 13g.fr style */}
      <motion.div
        className="color-blob w-[500px] h-[500px] opacity-10 pointer-events-none"
        style={{ background: 'var(--purple)', right: '-10%', top: '10%', y: blobY }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">

        <Reveal>
          <span className="text-sazu-ghost uppercase tracking-widest block mb-8" style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}>
            Sobre Sazú
          </span>
        </Reveal>

        {/* Animated line */}
        <div className="relative mb-16 h-px bg-sazu-border overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0" style={{ width: lineWidth, background: 'var(--purple)' }} />
        </div>

        {/* Main statement — big and impactful */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="font-display text-sazu-white leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.025em' }}>
                Marcas que<br />significan algo.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <Reveal delay={0.2}>
              <p className="text-sazu-off-white leading-relaxed mb-6" style={{ fontSize: '1.05rem' }}>
                Somos una agencia creativa integral con sede en Bogotá. 
                Trabajamos con organizaciones que quieren construir marcas 
                relevantes, duraderas y con impacto real en sus mercados.
              </p>
              <p className="text-sazu-ghost leading-relaxed" style={{ fontSize: '0.9rem' }}>
                Branding · Estrategia · Marketing digital · Producto
              </p>
            </Reveal>
          </div>
        </div>

        {/* Liquid glass stats — dialedweb.com style */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '+80', label: 'proyectos entregados' },
            { value: '+5',  label: 'años de experiencia' },
            { value: '+10', label: 'sectores atendidos' },
          ].map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 0.1} variant="fadeIn">
              <div className="glass-purple p-8 md:p-12 text-center rounded-sm">
                <span
                  className="font-display text-sazu-white block mb-2 leading-none"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--purple-light)' }}
                >
                  {value}
                </span>
                <span className="text-sazu-ghost uppercase tracking-widest block" style={{ fontSize: '0.6rem', letterSpacing: '0.14em' }}>
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
