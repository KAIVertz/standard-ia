import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Standard IA — Solutions IA pour les entreprises françaises",
  description:
    "Réceptionniste IA, chatbot, automatisations — Standard IA déploie des solutions IA sur-mesure pour les PME françaises en moins de 7 jours.",
  metadataBase: new URL("https://standard-ia.pro"),
  openGraph: {
    title: "Standard IA",
    description: "Solutions IA pour les entreprises françaises",
    url: "https://standard-ia.pro",
    siteName: "Standard IA",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
