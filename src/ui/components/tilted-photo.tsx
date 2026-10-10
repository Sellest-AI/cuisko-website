import { cn } from "@/ui/utils"

/**
 * The app's `TiltedPhoto`: a picture on a white mat, laid at a slight angle — a photo on a
 * table is never quite square to it. Takes any media as children.
 */
export const TiltedPhoto = ({ tilt = -4, className, children }: {
  tilt?: number
  className?: string
  children: React.ReactNode
}) => (
  <div
    className={cn("rounded-sm bg-neutral-0 p-1.5 shadow-[0_10px_36px_rgba(0,0,0,0.045)]", className)}
    style={{ transform: `rotate(${tilt}deg)` }}
  >
    <div className="rounded-[10px] overflow-hidden size-full [&>*]:size-full [&>*]:object-cover">
      {children}
    </div>
  </div>
)
