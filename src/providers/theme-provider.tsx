"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [isMounted, setIsMounter] = React.useState(false)
  React.useEffect(()=>{
 setIsMounter(true)
  },[])
  if(isMounted)
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
