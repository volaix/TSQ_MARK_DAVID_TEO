
'use client'

import client from "./_apollo/apolloClient"
import { ApolloProvider } from "@apollo/client"
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider, createTheme } from '@mui/material/styles'
import getLPTheme from "./getLPTheme"
import { useState } from "react"
import { PaletteMode } from "@mui/material"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mode, setMode] = useState<PaletteMode>('light')
  const [showCustomTheme, setShowCustomTheme] = useState(true)

  const LPtheme = createTheme(getLPTheme(mode))
  const defaultTheme = createTheme({ palette: { mode } })

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <ApolloProvider client={client} > {children} </ApolloProvider>
    </ThemeProvider>
  )
}

