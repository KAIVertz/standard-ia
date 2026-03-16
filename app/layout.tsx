import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Standard IA — L'automatisation IA pour les PME françaises",
  description:
    "Chatbots, workflows, automatisations — nous déployons des solutions IA clés en main pour les PME françaises en moins de 14 jours.",
  metadataBase: new URL("https://standard-ia.pro"),
  openGraph: {
    title: "Standard IA",
    description: "L'automatisation IA pour les PME françaises",
    url: "https://standard-ia.pro",
    siteName: "Standard IA",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Standard IA",
    description: "L'automatisation IA pour les PME françaises",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
