import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { PokeballParticles } from "@/components/pokeball-particles";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Champions Lab - Pokémon Champions 2026",
  description:
    "The ultimate competitive companion for Pokémon Champions. Season tracking, team builder, battle simulator, and deep Pokémon data - all in one immersive hub.",
  keywords: ["Pokemon Champions", "VGC", "team builder", "battle simulator", "competitive Pokemon", "Pokemon Champions 2026", "VGC team builder", "Pokemon meta"],
  metadataBase: new URL("https://championslab.xyz"),
  openGraph: {
    title: "Champions Lab - Pokémon Champions 2026",
    description: "The ultimate competitive companion for Pokémon Champions. Team builder, battle simulator, META analysis, and VGC learning - all in one hub.",
    url: "https://championslab.xyz",
    siteName: "Champions Lab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Champions Lab - Pokémon Champions 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Champions Lab - Pokémon Champions 2026",
    description: "The ultimate competitive companion for Pokémon Champions. Team builder, battle simulator, META analysis & more.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://championslab.xyz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PokeballParticles />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
      </body>
    </html>
  );
}
