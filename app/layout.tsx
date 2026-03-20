import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import "./globals.css"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] })
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: { default: "Standard IA — L'IA expliquée simplement", template: "%s — Standard IA" },
  description: "Outils, actualités et conseils IA en français. La référence pour comprendre et utiliser l'intelligence artificielle.",
  metadataBase: new URL("https://standard-ia.pro"),
  openGraph: {
    title: "Standard IA",
    description: "L'IA expliquée simplement, en français.",
    locale: "fr_FR",
    type: "website",
    siteName: "Standard IA",
    url: "https://standard-ia.pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Standard IA",
    description: "L'IA expliquée simplement, en français.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://standard-ia.pro" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script async src="https://subscribe-forms.beehiiv.com/embed.js" />
        <script async src="https://subscribe-forms.beehiiv.com/attribution.js" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
