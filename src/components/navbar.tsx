"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Swords,
  Grid3X3,
  Users,
  TrendingUp,
  GraduationCap,
  Heart,
} from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const NAV_ITEMS = [
  { href: "/", label: "Pokédex", icon: Grid3X3 },
  { href: "/team-builder", label: "Team Builder", icon: Users },
  { href: "/meta", label: "Meta", icon: TrendingUp },
  { href: "/battle-bot", label: "Battle Bot", icon: Swords },
  { href: "/learn", label: "PokéSchool", icon: GraduationCap },
  { href: "/about", label: "About", icon: Heart },
];

export function Navbar() {
  const pathname = usePathname();

  // Close mobile nav on route change (body class is set by inline script in layout)
  useEffect(() => {
    document.body.classList.remove('mobile-open');
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="transition-transform duration-150 group-hover:scale-105 group-active:scale-95">
                <Image
                  src="/logo.png"
                  alt="Champions Lab"
                  width={64}
                  height={64}
                  className="-my-3"
                  unoptimized
                />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Champions Lab
                </span>
                <span className="hidden sm:block text-[10px] text-muted-foreground -mt-1 tracking-widest uppercase">
                  Your competitive edge starts here
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => trackEvent("nav_click", "navigation", item.label)}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                      isActive
                        ? "text-foreground bg-gray-900/[0.05] border border-gray-900/[0.08]"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <a
                href="https://buymeacoffee.com/championslab"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("support_click", "engagement", "desktop")}
                className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-sm shadow-orange-500/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Support Us</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Mobile nav panel — visibility controlled by body.mobile-open class (set by inline script in layout) */}
        <nav className="mobile-nav-panel md:hidden border-t border-gray-200/60 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => trackEvent("nav_click", "navigation", `mobile_${item.label}`)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-900/[0.05] text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-gray-900/[0.03]"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://buymeacoffee.com/championslab"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("support_click", "engagement", "mobile")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
          >
            <Heart className="w-5 h-5 fill-white" />
            Support Us
          </a>
        </nav>
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
