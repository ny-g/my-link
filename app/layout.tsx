import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/Header"
import { Providers } from "./providers"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    template: "%s | MyLink",
    default: "MyLink - 멀티 링크 프로필 서비스",
  },
  description: "개발자, 크리에이터 등 다양한 채널을 한 곳에 모아 공유하는 나만의 멀티 링크 프로필.",
  openGraph: {
    title: "MyLink - 멀티 링크 프로필 서비스",
    description: "개발자, 크리에이터 등 다양한 채널을 한 곳에 모아 공유하는 나만의 멀티 링크 프로필.",
    type: "website",
    locale: "ko_KR",
    siteName: "MyLink",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLink - 멀티 링크 프로필 서비스",
    description: "개발자, 크리에이터 등 다양한 채널을 한 곳에 모아 공유하는 나만의 멀티 링크 프로필.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
