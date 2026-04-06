import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { LazyParticles } from "@/components/lazy-particles";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
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
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('championslab-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
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
        {/* Pure HTML hamburger — works instantly, no React hydration needed */}
        <button
          id="mobile-nav-toggle"
          className="md:hidden fixed top-4 right-4 z-[60] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg cursor-pointer"
          aria-label="Toggle menu"
          suppressHydrationWarning
        >
          <svg className="hamburger-open w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg className="hamburger-close w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var b=document.getElementById('mobile-nav-toggle');if(b)b.addEventListener('click',function(){document.body.classList.toggle('mobile-open')});document.addEventListener('click',function(e){if(document.body.classList.contains('mobile-open')&&e.target.closest('.mobile-nav-panel a'))document.body.classList.remove('mobile-open')})})()`,
          }}
        />
        <Navbar />
        <Suspense>
          <main className="flex-1 relative z-10">{children}</main>
        </Suspense>
        <ThemeToggle />
      </body>
    </html>
  );
}
