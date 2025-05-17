// components/ThemeProvider.tsx (por ejemplo)

'use client'

import { ThemeProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import React from 'react'

const MyThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <ThemeProvider {...props}>
      {children}
    </ThemeProvider>
  )
}

export default MyThemeProvider
