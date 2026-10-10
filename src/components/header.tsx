"use client"

import { Menu as MenuIcon, X } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { DOWNLOAD_HREF } from "@/components/download"
import { WEBSITE } from "@/global"
import { cn } from "@/ui/utils"

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: WEBSITE.APP_STORE_URL, label: "App Store" },
  { href: WEBSITE.PLAY_STORE_URL, label: "Play Store" },
  { href: "/contact", label: "Contact" },
]

/**
 * Sticky, and drawn over the page rather than above it: the wrapper is zero-height, so the hero's
 * gradient runs up behind the bar and each page leaves room for it at its top. Once the page
 * scrolls, the bar frosts so it stays legible over content, and narrows to a centred pill.
 *
 * Rendered once, in the root layout: a sticky element stops sticking inside any `overflow-hidden`
 * ancestor, and every section here clips its glows.
 */
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50 h-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 pt-3 sm:pt-4">
        <header className={cn(
          "relative mx-auto flex items-center justify-between gap-4 rounded-full pl-2 sm:pl-3 pr-1.5 py-1.5 transition-[max-width,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // Stuck, it draws in to a pill just wide enough for its contents.
          isScrolled ? "glass shadow-lifted max-w-[880px]" : "border-2 border-transparent max-w-7xl"
        )}>
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/assets/mascot/icon.webp" alt="" width={72} height={72} className="size-9 rounded-[11px] shadow-soft" />
            <span className="font-display text-2xl">{WEBSITE.NAME}</span>
          </Link>

          <nav className={cn("hidden md:flex items-center gap-1 rounded-full p-1 text-sm font-semibold", !isScrolled && "glass shadow-soft")}>
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} className="px-4 py-2 rounded-full text-neutral-900/80 hover:text-neutral-900 hover:bg-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={DOWNLOAD_HREF}
              className="flex items-center gap-2 rounded-full border-2 border-white/20 bg-primary-500 text-white pl-4 pr-1.5 py-1.5 text-sm font-semibold shadow-lifted hover:bg-primary-300 transition-colors"
            >
              Get the app
              <span className="size-7 rounded-full bg-white/25 flex items-center justify-center">
                <Image src="/assets/mascot/winking-head.webp" alt="" width={48} height={48} className="size-5" />
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="md:hidden glass shadow-soft size-10 rounded-full flex items-center justify-center"
            >
              {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>

          {isOpen && (
            <nav className="md:hidden glass absolute top-full mt-3 inset-x-0 rounded-lg p-2 flex flex-col shadow-lifted">
              {LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-sm hover:bg-white font-semibold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </header>
      </div>
    </div>
  )
}
