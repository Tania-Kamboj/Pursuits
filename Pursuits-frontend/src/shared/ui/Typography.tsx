import React from 'react'
import { cn } from '@/shared/lib/cn'

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export const DisplayLG: React.FC<TypographyProps> = ({ children, className }) => (
  <h1 className={cn('text-5xl font-extrabold tracking-tight text-on-surface font-sans', className)}>
    {children}
  </h1>
)

export const HeadlineLG: React.FC<TypographyProps> = ({ children, className }) => (
  <h2 className={cn('text-3xl font-bold text-on-surface font-sans', className)}>
    {children}
  </h2>
)

export const HeadlineMD: React.FC<TypographyProps> = ({ children, className }) => (
  <h3 className={cn('text-2xl font-semibold text-on-surface font-sans', className)}>
    {children}
  </h3>
)

export const BodyLG: React.FC<TypographyProps> = ({ children, className }) => (
  <p className={cn('text-lg text-on-surface font-sans leading-relaxed', className)}>
    {children}
  </p>
)

export const BodyMD: React.FC<TypographyProps> = ({ children, className }) => (
  <p className={cn('text-base text-on-surface font-sans', className)}>
    {children}
  </p>
)

export const LabelMD: React.FC<TypographyProps> = ({ children, className }) => (
  <span className={cn('text-sm font-semibold text-on-surface font-sans tracking-wide', className)}>
    {children}
  </span>
)