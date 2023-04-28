import React from "react";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {children}
    </main>
  )
}