'use client'

import { motion } from 'framer-motion'
import { Reveal } from '@/components/animations/Reveal'

const clients = [
  'Liliana Illera',
  'Megalabs',
  'Anturio Capital',
  'Scotiabank',
  'Boston Scientific',
  'Fundación Santa Fe',
  'Engel & Völkers',
  'Multiflora',
  'Hub Bariátrico',
  'Colsanitas',
]

function MarqueeRow({ direction = 1, speed = 28 }: { direction?: 1 | -1; speed?: number }) {
  const list = [...clients, ...clients, ...clients]
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap py-3"
        animate={{ x: direction === 1 ? ['0%', '-33.333%'] : ['-33.333%', '0%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {list.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex-shrink-0 flex items-center gap-12"
          >
            <span
              className="font-display text-sazu-off-white hover:text-sazu-white transition-colors duration-300"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                opacity: 0.75,
              }}
            >
              {name}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: 'var(--purple)', opacity: 0.5 }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function ClientsEcosystem() {
  return (
    <section id="clientes" className="py-20 md:py-32 bg-sazu-black overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal>
            <span className="text-label uppercase tracking-widest text-sazu-ghost block mb-3">
              Clientes
            </span>
            <h2
              className="font-display text-sazu-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.025em' }}
            >
              Marcas que<br />confían en nosotros.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-md text-sazu-ghost max-w-xs leading-relaxed">
              Trabajamos con organizaciones que tienen algo importante que decir.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Marquee — dos filas, velocidades distintas */}
      <div className="flex flex-col gap-0 border-y border-sazu-border">
        <div className="py-5 border-b border-sazu-border">
          <MarqueeRow direction={1} speed={32} />
        </div>
        <div className="py-5">
          <MarqueeRow direction={-1} speed={26} />
        </div>
      </div>
    </section>
  )
}
