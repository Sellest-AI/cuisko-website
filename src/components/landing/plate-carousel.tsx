"use client"

import { useEffect, useState } from "react"
import { Plate } from "@/ui/components/plate"
import { cn } from "@/ui/utils"

const DISHES = [
  { dish: "salad-nicoise", name: "Salade niçoise", caption: "Ready to cook" },
  { dish: "shakshuka", name: "Shakshuka", caption: "Ready to cook" },
  { dish: "tikka-masala", name: "Tikka masala", caption: "Short a few" },
  { dish: "paella", name: "Seafood paella", caption: "Short a few" },
  { dish: "ribollita", name: "Ribollita", caption: "Ready to cook" },
  { dish: "spaghetti-clams", name: "Spaghetti alle vongole", caption: "Short a few" },
  { dish: "beef-ramen", name: "Beef ramen", caption: "Ready to cook" },
  { dish: "huevos-rancheros", name: "Huevos rancheros", caption: "Ready to cook" },
  { dish: "cobb-salad", name: "Cobb salad", caption: "Short a few" },
  { dish: "bibimbap", name: "Bibimbap", caption: "Ready to cook" },
]

const INTERVAL_MS = 3000

/**
 * Signed distance of a plate from the active one, wrapped into [-5, 4]. Five plates show; the
 * ones left over sit faded out past both edges, so the plate entering on either side slides in
 * from there, and the one wrapping around does it while invisible. Fewer than eight dishes and an
 * edge runs out of hidden slots: its new plate pops in place instead of sliding.
 */
const offsetOf = (index: number, active: number) =>
  ((index - active + DISHES.length + DISHES.length / 2) % DISHES.length) - DISHES.length / 2

/** By distance from the centre: how far out (in `--step`s), how big, how opaque. */
const POSITIONS = [
  { x: 0, scale: 1, fade: 1 },
  { x: 1, scale: 0.64, fade: 0.85 },
  { x: 1.75, scale: 0.56, fade: 0.4 },
  { x: 2.4, scale: 0.5, fade: 0 },
]

/** The app's home plate carousel, turning on its own: the day's plate in the middle, its neighbours fading off. */
export const PlateCarousel = ({ className }: { className?: string }) => {
  // The previous index too, to spot the plate that wraps from one end to the other.
  const [{ active, previous }, setIndex] = useState({ active: 0, previous: 0 })
  const [isPaused, setIsPaused] = useState(false)

  const show = (next: (active: number) => number) =>
    setIndex(index => ({ active: next(index.active), previous: index.active }))

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = setInterval(() => show(index => (index + 1) % DISHES.length), INTERVAL_MS)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <div
      aria-roledescription="carousel"
      aria-label="This week's plates"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn("relative w-full h-[calc(var(--size)+16px)] [--size:280px] [--step:230px] sm:[--size:320px] sm:[--step:270px] md:[--size:400px] md:[--step:330px]", className)}
    >
      {DISHES.map((slot, index) => {
        const offset = offsetOf(index, active)
        const distance = Math.min(Math.abs(offset), POSITIONS.length - 1)
        // A plate that wrapped around jumps instead of sliding across the whole row.
        const wrapped = Math.abs(offset - offsetOf(index, previous)) > 1
        const { x, scale, fade } = POSITIONS[distance]
        const isNeighbour = distance === 1

        return (
          <button
            key={index}
            type="button"
            onClick={() => show(() => index)}
            disabled={distance === 0}
            tabIndex={isNeighbour ? 0 : -1}
            aria-hidden={distance > 1}
            aria-label={`Show ${slot.name}`}
            className={cn(
              "absolute top-0 left-1/2 w-(--size) ease-[cubic-bezier(0.22,1,0.36,1)]",
              !wrapped && "transition-transform duration-700",
              isNeighbour ? "cursor-pointer" : "cursor-default",
              distance > 1 && "pointer-events-none"
            )}
            style={{
              transform: `translateX(calc(-50% + ${Math.sign(offset) * x} * var(--step))) scale(${scale})`,
              zIndex: 10 - distance,
            }}
          >
            <Plate
              {...slot}
              fade={fade}
              labelHidden={distance > 1}
              priority={index === 0}
              sizes="420px"
            />
          </button>
        )
      })}
    </div>
  )
}
