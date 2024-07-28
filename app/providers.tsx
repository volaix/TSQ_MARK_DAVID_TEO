
'use client'

import client from "./_apollo/apolloClient"
import { ApolloProvider } from "@apollo/client"
import CssBaseline from '@mui/material/CssBaseline'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import getLPTheme from "./getLPTheme"
import { useState } from "react"
import { PaletteMode } from "@mui/material"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const LPtheme = createTheme(getLPTheme('light'))

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <ApolloProvider client={client} > {children} </ApolloProvider>
    </ThemeProvider>
  )
}

