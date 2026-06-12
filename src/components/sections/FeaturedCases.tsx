'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { CaseStudy } from '@/types'

function CaseCard({ caseData, index }: { caseData: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y    = useTransform(scrollYProgress, [0, 0.3], ['40px', '0px'])
  const op   = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const isEven = index % 2 === 0

  return (
    <motion.article ref={ref} style={{ y, opacity: op }} className="group border-b border-sazu-border last:border-b-0">
      <Link href={`/casos/${caseData.slug}`} className="grid grid-cols-1 md:grid-cols-2 min-h-[55vh] case-card" style={{ cursor: 'none' }}>

        {/* Image */}
        <div
          className={`relative overflow-hidden aspect-[16/10] md:aspect-auto ${isEven ? 'md:order-1' : 'md:order-2'}`}
          style={{ background: caseData.coverColor ?? '#111' }}
        >
          {caseData.coverImage && (
            <motion.div className="absolute inset-0 case-image" style={{ y: imgY }}>
              <Image
                src={caseData.coverImage}
                alt={caseData.client}
                fill
                className="object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          )}
          {/* Liquid glass hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-display text-white italic text-2xl" style={{ fontWeight: 300 }}>Ver caso →</span>
          </motion.div>
          {/* Purple bottom line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
            style={{ background: 'var(--purple)', scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Content */}
        <div className={`flex flex-col justify-between p-10 md:p-16 bg-sazu-surface group-hover:bg-sazu-elevated transition-colors duration-500 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sazu-ghost uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.14em' }}>{caseData.industry}</span>
              <span className="w-3 h-px bg-sazu-muted" />
              <span className="text-sazu-ghost uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.14em' }}>{caseData.year}</span>
            </div>
            {/* Title with purple hover */}
            <h3
              className="font-display mb-4 leading-tight transition-colors duration-300 group-hover:text-sazu-purple"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F5F3EF',
              }}
            >
              {caseData.client}
            </h3>
            <p className="text-sazu-off-white leading-relaxed mb-8" style={{ fontSize: '0.95rem' }}>{caseData.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {caseData.services.map(s => (
                <span key={s} className="text-sazu-ghost border border-sazu-border px-3 py-1.5 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-10 text-sazu-ghost group-hover:text-sazu-white transition-colors duration-300">
            <span className="uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.14em' }}>Ver caso</span>
            <motion.span initial={{ x: 0 }} whileHover={{ x: 6 }} transition={{ duration: 0.3 }}>→</motion.span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export function FeaturedCases({ cases }: { cases: CaseStudy[] }) {
  return (
    <section id="casos" className="bg-sazu-black">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-32 pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <Reveal>
              <span className="text-sazu-ghost uppercase block mb-6" style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}>Casos destacados</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-sazu-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.025em' }}>
                Trabajo que<br />importa.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-sazu-ghost max-w-xs leading-relaxed" style={{ fontSize: '0.9rem' }}>
              Cada proyecto es una historia de transformación real.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="border-t border-sazu-border">
        {cases.map((c, i) => <CaseCard key={c.slug} caseData={c} index={i} />)}
      </div>
    </section>
  )
}
