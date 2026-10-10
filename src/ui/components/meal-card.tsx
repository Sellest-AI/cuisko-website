import Image from "next/image"
import { Clock } from "lucide-react"
import { cn } from "@/ui/utils"

/**
 * The app's `MealCard`: a plate overlapping a frosted card with uneven corners, so the plate
 * reads as sitting on it rather than inside it.
 */
export const MealCard = ({ dish, title, minutes, meal, status, className }: {
  dish: string
  title: string
  minutes: number
  meal: string
  status?: { label: string, tone: "success" | "warning" }
  className?: string
}) => (
  <div className={cn("flex items-center", className)}>
    <div className="relative size-20 shrink-0 -mr-3 z-10">
      <Image src="/assets/plates/shadow.webp" alt="" width={512} height={512} className="absolute -top-[10%] left-0 size-[120%] max-w-none opacity-40" />
      <Image src={`/assets/plates/${dish}.webp`} alt="" width={480} height={480} sizes="80px" className="relative size-full" />
    </div>
    <div className="glass-subtle shadow-soft pl-6 pr-5 py-2.5 rounded-[96px_128px_128px_48px] min-w-0">
      <p className="font-semibold leading-tight truncate">{title}</p>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="flex items-center gap-1 text-xs font-medium text-muted">
          <Clock size={12} strokeWidth={2.3} />{minutes} min · {meal}
        </span>
        {status && (
          <span className={cn(
            "text-[11px] font-semibold rounded-full px-2 py-0.5",
            status.tone === "success" ? "bg-secondary-100 text-secondary-500" : "bg-primary-100 text-primary-500"
          )}>
            {status.label}
          </span>
        )}
      </div>
    </div>
  </div>
)
