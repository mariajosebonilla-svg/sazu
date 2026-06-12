'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'
import { TextReveal } from '@/components/animations/TextReveal'
import { CaseStudy } from '@/types'

export function CaseHero({ caseData }: { caseData: CaseStudy }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] flex items-end overflow-hidden"
    >
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div
          className="absolute inset-0"
          style={{ background: caseData.coverColor ?? '#111' }}
        />
        {caseData.coverImage && (
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <Image
              src={caseData.coverImage}
              alt={caseData.client}
              fill
              priority
              className="object-cover opacity-50"
              sizes="100vw"
            />
          </motion.div>
        )}
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-sazu-black via-sazu-black/40 to-sazu-black/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10 pb-20 md:pb-28"
        style={{ opacity }}
      >
        {/* Breadcrumb */}
        <Reveal delay={0.1}>
          <div className="flex items-center gap-3 mb-10 text-label uppercase tracking-widest text-sazu-ghost">
            <span>{caseData.industry}</span>
            <span className="w-3 h-px bg-sazu-muted" />
            <span>{caseData.year}</span>
          </div>
        </Reveal>

        <TextReveal
          text={caseData.client}
          className="font-display text-display-2xl text-sazu-white mb-6"
          tag="h1"
          delay={0.2}
        />

        <Reveal delay={0.5}>
          <p className="text-body-lg text-sazu-off-white max-w-2xl leading-relaxed mb-10">
            {caseData.tagline}
          </p>
        </Reveal>

        {/* Services */}
        <Reveal delay={0.65}>
          <div className="flex flex-wrap gap-2">
            {caseData.services.map(s => (
              <span
                key={s}
                className="text-label uppercase tracking-wider px-3 py-1.5 border border-sazu-border text-sazu-ghost"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </motion.div>
    </section>
  )
}
