'use client'

import { useCursor } from '@/hooks'
import { motion, AnimatePresence } from 'framer-motion'

export function Cursor() {
  const { position, ringPosition, isHovering, label } = useCursor()

  return (
    <>
      {/* Dot */}
      <motion.div
        className={`cursor ${isHovering ? 'is-hovering' : ''}`}
        style={{ left: position.x, top: position.y }}
        animate={{ scale: isHovering ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        className={`cursor-ring ${isHovering ? 'is-hovering' : ''}`}
        style={{ left: ringPosition.x, top: ringPosition.y }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                whiteSpace: 'nowrap',
                fontSize: '0.625rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#F5F3EF',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                pointerEvents: 'none',
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
