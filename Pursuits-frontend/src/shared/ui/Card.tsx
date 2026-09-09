import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/shared/lib/cn'

interface CardProps {
  children: React.ReactNode
  tilt?: boolean
  className?: string
}

export const Card = ({ children, tilt = false, className = '' }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })
  const rotateX = useTransform(springY, [0, 1], [-10, 10])
  const rotateY = useTransform(springX, [0, 1], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => { x.set(0.5); y.set(0.5) }

  const base = "bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card"

  if (tilt) {
    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cn(base, className)}
      >
        <div style={{ transform: 'translateZ(40px)' }}>{children}</div>
      </motion.div>
    )
  }

  return <div className={cn(base, className)}>{children}</div>
}
