import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Navbar } from "@/components/navbar"
import "./globals.css"
import { Separator } from "@/components/ui/separator"
import { QueryClientProvider } from "@/components/query-provider"
import { Toaster } from "@/components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "elohoops",
  description: "The next generation of NBA player rankings. Vote who you think is the best.",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col w-full min-h-screen`}
      >
        <Navbar />
        <Separator />
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
