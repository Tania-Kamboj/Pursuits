import React from 'react'
import { Navbar } from '@/shared/ui/Navbar'
import { Footer } from '@/shared/ui/Footer'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f9fb',
      }}
    >
      <Navbar />
      
      <main style={{ flex: 1, paddingTop: '72px' }}>
        {children}
      </main>
      
      <Footer />
    </div>
  )
}