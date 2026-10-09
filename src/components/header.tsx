"use client"

import { cn } from "@/ui/utils"
import { Menu as MenuIcon, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { DOWNLOAD_HREF } from "@/components/download"
import { WEBSITE } from "@/global"

const LINKS = [
  { href: WEBSITE.APP_STORE_URL, label: "App Store" },
  { href: WEBSITE.PLAY_STORE_URL, label: "Play Store" },
  { href: "/contact", label: "Contact" },
]

/** `primary` sits on the orange hero; `neutral` on the plain pages. */
export const Header = ({ variant = "neutral" }: { variant?: "primary" | "neutral" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onPrimary = variant === "primary"

  return (
    <header className="relative z-50 flex items-center justify-between gap-4">
      <Link href="/" className={cn("font-display text-2xl", onPrimary ? "text-white" : "text-neutral-900")}>
        Cuisko
      </Link>

      <nav className={cn(
        "hidden sm:flex items-center gap-1 rounded-full p-1 text-sm font-medium",
        onPrimary ? "bg-neutral-900/10" : "bg-neutral-100"
      )}>
        {LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-1.5 rounded-full transition-colors",
              onPrimary ? "text-white hover:bg-white/15" : "text-neutral-900 hover:bg-white"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Link
          href={DOWNLOAD_HREF}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-85",
            onPrimary ? "bg-white text-neutral-900" : "bg-neutral-900 text-white"
          )}
        >
          <span className={cn("size-1.5 rounded-full", onPrimary ? "bg-neutral-900" : "bg-primary-500")} />
          Download app
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={cn("sm:hidden size-9 rounded-full flex items-center justify-center", onPrimary ? "text-white" : "text-neutral-900")}
        >
          {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {isOpen && (
        <nav className="sm:hidden absolute top-full mt-3 inset-x-0 bg-white rounded-md p-2 flex flex-col shadow-xl">
          {LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-neutral-900 px-4 py-3 rounded-sm hover:bg-neutral-100 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
