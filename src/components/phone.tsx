import Image from "next/image"
import { cn } from "@/ui/utils"

/** An app screenshot in a dark phone bezel. Screens live in /public/assets/screens. */
export const Phone = ({ screen, alt = "", className, priority }: {
  screen: string
  alt?: string
  className?: string
  priority?: boolean
}) => (
  <div className={cn("relative bg-neutral-900 p-[7px] rounded-[42px] shadow-[0_30px_60px_-20px_rgba(28,14,3,0.5)]", className)}>
    <div className="relative rounded-[35px] overflow-hidden bg-neutral-0">
      <Image
        src={`/assets/screens/${screen}.webp`}
        alt={alt}
        width={674}
        height={1400}
        className="w-full h-auto"
        priority={priority}
      />
    </div>
  </div>
)
