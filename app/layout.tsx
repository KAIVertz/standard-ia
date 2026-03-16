import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import "./globals.css"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] })
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Standard IA — L'IA expliquée simplement",
  description: "Outils, actualités et conseils IA en français. La référence pour comprendre et utiliser l'intelligence artificielle.",
  metadataBase: new URL("https://standard-ia.pro"),
  openGraph: {
    title: "Standard IA",
    description: "L'IA expliquée simplement, en français.",
    locale: "fr_FR",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
