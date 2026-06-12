'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useScrollDirection } from '@/hooks'
import { useState } from 'react'

function SazuLogo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Sazú"
      width={80}
      height={30}
      className={className}
      priority
    />
  )
}

export function Navigation() {
  const { scrollY } = useScrollDirection()
  const isScrolled = scrollY > 80
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/#agencia',  label: 'Agencia' },
    { href: '/#clientes', label: 'Clientes' },
    { href: '/#casos',    label: 'Casos' },
    { href: '/#contacto', label: 'Contacto' },
  ]

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{
          backgroundColor: isScrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4 }}
      >
        <nav className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/">
            <SazuLogo />
          </Link>
          <ul className="hidden md:flex items-center gap-10">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sazu-ghost hover:text-sazu-white transition-colors duration-300 uppercase tracking-widest" style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <motion.span className="block w-6 h-px bg-sazu-white" animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
            <motion.span className="block w-4 h-px bg-sazu-white" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="block w-6 h-px bg-sazu-white" animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
          </button>
        </nav>
      </motion.header>

      <motion.div
        className="fixed inset-0 z-40 bg-sazu-void flex flex-col justify-center px-10 md:hidden"
        initial={{ opacity: 0, x: '100%' }}
        animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
      >
        <ul className="flex flex-col gap-8">
          {links.map(({ href, label }, i) => (
            <motion.li key={href} initial={{ opacity: 0, x: 20 }} animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }} transition={{ delay: 0.1 + i * 0.07 }}>
              <Link href={href} onClick={() => setMenuOpen(false)} className="font-display text-sazu-white" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontStyle: 'italic', fontWeight: 300 }}>
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </>
  )
}
