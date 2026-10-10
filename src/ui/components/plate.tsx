import Image from "next/image"
import { cn } from "@/ui/utils"

/**
 * A cut-out plate on its soft shadow, as the app's plate carousel draws it: the shadow pushed
 * down and right as if lit from the upper left, and the dish's name in a frosted pill below.
 *
 * `fade` dims the dish and its shadow, never the figure: opacity on an ancestor would switch off
 * the pill's backdrop blur. Both it and `labelHidden` animate, for the carousel.
 */
export const Plate = ({ dish, name, caption, className, sizes = "300px", priority, fade = 1, labelHidden }: {
  /** A file in /public/assets/plates. */
  dish: string
  name?: string
  caption?: string
  className?: string
  sizes?: string
  priority?: boolean
  /** Opacity of the dish, 0–1. */
  fade?: number
  labelHidden?: boolean
}) => (
  <figure className={cn("relative aspect-square", className)}>
    <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: fade }}>
      <Image
        src="/assets/plates/shadow.webp"
        alt=""
        width={512}
        height={512}
        className="absolute inset-0 scale-[1.18] translate-x-[4%] translate-y-[7%] opacity-55 pointer-events-none"
      />
      <Image
        src={`/assets/plates/${dish}.webp`}
        alt={name ?? ""}
        width={480}
        height={480}
        sizes={sizes}
        priority={priority}
        className="relative size-full object-contain"
      />
    </div>
    {name && (
      <figcaption className={cn(
        "glass-subtle absolute left-1/2 -translate-x-1/2 bottom-0 w-max min-w-[40%] rounded-full px-5 py-1.5 text-center shadow-[0_6px_24px_rgba(0,0,0,0.08)] whitespace-nowrap transition-opacity duration-500",
        labelHidden && "opacity-0"
      )}>
        <span className="block font-semibold text-sm leading-tight">{name}</span>
        {caption && <span className="block text-[11px] font-medium text-muted leading-tight">{caption}</span>}
      </figcaption>
    )}
  </figure>
)
