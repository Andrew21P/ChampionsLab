import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { LazyParticles } from "@/components/lazy-particles";
import { ThemeToggle } from "@/components/theme-toggle";

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
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('championslab-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('click',function(e){var d=document.getElementById('mobile-nav-details');if(d&&d.open&&e.target.closest('#mobile-nav-details nav a'))d.removeAttribute('open')})`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NVYVM8YJZN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NVYVM8YJZN');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LazyParticles />
        <Navbar />
        <Suspense>
          <main className="flex-1 relative z-10">{children}</main>
        </Suspense>
        <ThemeToggle />
      </body>
    </html>
  );
}
