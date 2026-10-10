import Image from "next/image"
import { cn } from "@/ui/utils"

/** An app screenshot in a dark phone bezel. Screens live in /public/assets/screens. */
export const Phone = ({ screen, alt = "", className, priority }: {
  screen: string
  alt?: string
  className?: string
  priority?: boolean
}) => (
  <div className={cn("relative bg-neutral-900 p-1.5 rounded-[30px] shadow-[0_56px_110px_-24px_rgba(28,14,3,0.2)]", className)}>
    <div className="relative rounded-[24px] overflow-hidden bg-neutral-0">
      <Image
        src={`/assets/screens/${screen}.webp`}
        alt={alt}
        width={720}
        height={1560}
        sizes="300px"
        className="w-full h-auto"
        priority={priority}
      />
    </div>
  </div>
)
