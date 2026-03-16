import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Standard IA — Solutions IA pour entreprises françaises",
  description: "Réceptionniste IA, chatbot, automatisations — déployés en 7 jours pour les entreprises françaises.",
  metadataBase: new URL("https://standard-ia.pro"),
  openGraph: {
    title: "Standard IA",
    description: "L'IA qui fait tourner votre business.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
