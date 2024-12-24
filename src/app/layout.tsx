import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import {Toaster}  from 'sonner'
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const font = DM_Sans({
  subsets: ['latin', 'latin-ext']
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className}  overflow-x-hidden flex flex-col min-h-screen antialiased`}
      >
        <ThemeProvider 
        attribute='class'
        defaultTheme="sytem"
        enableSystem
        disableTransitionOnChange
        >
          <SessionProvider>
        <Toaster/>
        {children}
        </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
