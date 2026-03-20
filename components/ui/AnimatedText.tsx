'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimatedTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  staggerDelay?: number
}

const container = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
}

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
}

export function AnimatedText({
  text,
  as: Tag = 'p',
  className,
  staggerDelay = 0.04,
}: AnimatedTextProps) {
  const words = text.split(' ')

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      custom={staggerDelay}
      aria-label={text}
    >
      <Tag className={cn(className)}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={child}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
