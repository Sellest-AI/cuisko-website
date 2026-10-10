import { Check, type LucideIcon } from "lucide-react"
import { cn } from "@/ui/utils"

/** A screen-like ground for a visual: the app's peach-to-white gradient with a glow off one edge. */
export const Stage = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("relative overflow-hidden rounded-lg bg-screen border-2 border-white shadow-soft", className)}>
    <div className="glow size-[520px] -top-[200px] -left-[200px] opacity-15" />
    {children}
  </div>
)

/** A feature: the copy on one side, a stage of app pieces on the other. */
export const Feature = ({ icon: Icon, label, title, text, points, visual, reverse }: {
  icon: LucideIcon
  label: string
  title: React.ReactNode
  text: string
  points: string[]
  visual: React.ReactNode
  reverse?: boolean
}) => (
  <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
    <div className={cn(reverse && "lg:order-2")}>
      <p className="flex items-center gap-2 font-semibold text-primary-500">
        <span className="size-9 rounded-full bg-primary-100 flex items-center justify-center"><Icon size={18} strokeWidth={2.3} /></span>
        {label}
      </p>
      <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mt-5">{title}</h2>
      <p className="text-lg font-medium text-muted mt-5 max-w-lg">{text}</p>
      <ul className="mt-8 space-y-4">
        {points.map(point => (
          <li key={point} className="flex items-center gap-3 font-semibold">
            <span className="size-6 rounded-full bg-secondary-100 text-secondary-500 flex items-center justify-center shrink-0">
              <Check size={14} strokeWidth={3} />
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
    {visual}
  </div>
)
