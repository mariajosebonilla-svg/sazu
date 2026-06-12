'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { CaseStudy } from '@/types'

export function ProjectsGrid({ cases }: { cases: CaseStudy[] }) {
  const industries = ['Todos', ...Array.from(new Set(cases.map(c => c.industry)))]
  const [active, setActive] = useState('Todos')
  const filtered = active === 'Todos' ? cases : cases.filter(c => c.industry === active)

  return (
    <section className="py-32 md:py-44 bg-sazu-void">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="mb-12">
          <Reveal>
            <span className="text-sazu-ghost uppercase block mb-4" style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}>Todos los proyectos</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-sazu-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.025em' }}>
              La biblioteca.
            </h2>
          </Reveal>
        </div>

        {/* Filter pills */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-12">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setActive(ind)}
                className="uppercase transition-all duration-300 px-4 py-2 border"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  borderColor: active === ind ? 'var(--purple)' : '#222',
                  color: active === ind ? 'var(--purple)' : '#5A5754',
                  background: active === ind ? 'rgba(91,79,232,0.08)' : 'transparent',
                }}
              >
                {ind}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-sazu-border">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                key={c.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-sazu-void"
              >
                <Link href={`/casos/${c.slug}`} className="group block relative overflow-hidden" style={{ aspectRatio: '16/10', cursor: 'none' }}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: c.coverColor }}>
                    {c.coverImage && (
                      <Image
                        src={c.coverImage}
                        alt={c.client}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-sazu-ghost uppercase block mb-1" style={{ fontSize: '0.6rem', letterSpacing: '0.12em' }}>{c.industry}</span>
                    <h3
                      className="font-display text-white group-hover:text-sazu-purple transition-colors duration-300 leading-tight"
                      style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 300, fontStyle: 'italic' }}
                    >
                      {c.client}
                    </h3>
                  </div>
                  {/* Purple top line on hover */}
                  <motion.div
                    className="absolute top-0 left-0 h-0.5 w-full origin-left"
                    style={{ background: 'var(--purple)', scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
