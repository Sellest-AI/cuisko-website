import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { cn } from "@/ui/utils"

/**
 * The app's `ButtonPill` as a link: a full pill with its icon on a lighter disc at the side.
 * Same variants, same 2px highlight edge.
 */
const VARIANTS = {
  primary: { pill: "bg-primary-500 text-white hover:bg-primary-300", disc: "bg-white/25" },
  secondary: { pill: "bg-secondary-500 text-white hover:bg-secondary-300", disc: "bg-white/25" },
  neutral: { pill: "bg-neutral-900 text-neutral-0 hover:bg-neutral-900/85", disc: "bg-white/15" },
  glass: { pill: "glass text-neutral-900 hover:bg-white", disc: "bg-neutral-100" },
}

export const PillLink = ({ href, variant = "primary", icon: Icon = ArrowRight, children, className }: {
  href: string
  variant?: keyof typeof VARIANTS
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
}) => (
  <Link
    href={href}
    className={cn(
      "group inline-flex items-center gap-3 rounded-full border-2 border-white/20 pl-6 pr-2 py-2 font-semibold shadow-lifted transition-colors",
      VARIANTS[variant].pill,
      className
    )}
  >
    {children}
    <span className={cn("size-9 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5", VARIANTS[variant].disc)}>
      <Icon size={18} strokeWidth={2.3} />
    </span>
  </Link>
)
