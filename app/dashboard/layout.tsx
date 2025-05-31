'use client'

import React from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#0F1824] p-4">
      {children}
    </main>
  )
} 