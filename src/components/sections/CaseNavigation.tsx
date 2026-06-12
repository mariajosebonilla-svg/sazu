'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface Props {
  nextSlug?: string
  prevSlug?: string
  nextClient?: string
  prevClient?: string
}

export function CaseNavigation({ nextSlug, prevSlug, nextClient, prevClient }: Props) {
  return (
    <nav className="border-t border-sazu-border bg-sazu-void">
      <div className="grid grid-cols-2 divide-x divide-sazu-border">

        {prevSlug ? (
          <Link
            href={`/casos/${prevSlug}`}
            className="group flex items-center gap-6 px-10 md:px-16 py-16 md:py-24 hover:bg-sazu-surface transition-colors duration-500"
            style={{ cursor: 'none' }}
          >
            <motion.span
              className="text-sazu-ghost group-hover:text-sazu-purple transition-colors duration-300 text-2xl"
              whileHover={{ x: -8 }}
              transition={{ duration: 0.3 }}
            >
              ←
            </motion.span>
            <div>
              <span className="text-sazu-ghost uppercase block mb-2" style={{ fontSize: '0.6rem', letterSpacing: '0.14em' }}>Caso anterior</span>
              <span
                className="font-display text-sazu-white group-hover:text-sazu-purple transition-colors duration-300"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
              >
                {prevClient ?? prevSlug}
              </span>
            </div>
          </Link>
        ) : <div />}

        {nextSlug ? (
          <Link
            href={`/casos/${nextSlug}`}
            className="group flex items-center justify-end gap-6 px-10 md:px-16 py-16 md:py-24 hover:bg-sazu-surface transition-colors duration-500"
            style={{ cursor: 'none' }}
          >
            <div className="text-right">
              <span className="text-sazu-ghost uppercase block mb-2" style={{ fontSize: '0.6rem', letterSpacing: '0.14em' }}>Siguiente caso</span>
              <span
                className="font-display text-sazu-white group-hover:text-sazu-purple transition-colors duration-300"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic' }}
              >
                {nextClient ?? nextSlug}
              </span>
            </div>
            <motion.span
              className="text-sazu-ghost group-hover:text-sazu-purple transition-colors duration-300 text-2xl"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </Link>
        ) : <div />}

      </div>
    </nav>
  )
}
