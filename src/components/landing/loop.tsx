import { CalendarDays, Plus, ShoppingCart, Store, type LucideIcon } from "lucide-react"
import { cn } from "@/ui/utils"

const TILES: { icon: LucideIcon, title: string, caption: string, text: string, tile: string, disc: string, muted: string }[] = [
  {
    icon: CalendarDays,
    title: "Plan the week",
    caption: "7 dinners planned",
    text: "A week of meals built on what's already in your kitchen, starting with whatever goes off first.",
    tile: "bg-linear-to-br from-primary-500 to-primary-300 text-white",
    disc: "bg-white/25",
    muted: "text-white/85",
  },
  {
    icon: ShoppingCart,
    title: "Grocery list",
    caption: "9 items to buy",
    text: "Only the gap between the plan and your cellar. Tick a line and it moves into the cellar.",
    tile: "bg-secondary-500 text-white",
    disc: "bg-white/25",
    muted: "text-white/85",
  },
  {
    icon: Store,
    title: "The cellar",
    caption: "23 items in stock",
    text: "Shopping fills it, cooking empties it. Your stock stays true without anyone typing it in.",
    tile: "glass text-neutral-900",
    disc: "bg-neutral-100",
    muted: "text-muted",
  },
]

/** Plan → shop → cook, drawn as the home screen's Quick Access tiles. */
export const Loop = () => (
  <section id="how-it-works" className="relative px-4 sm:px-6 pt-8 pb-24 md:pb-32 scroll-mt-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl leading-tight">
          One loop.{" "}<br className="sm:hidden" /><span className="text-primary-500">No spreadsheet.</span>
        </h2>
        <p className="text-lg font-medium text-muted mt-5">
          Meal planners ignore your fridge, pantry apps make you catalogue it. Cuisko does both at once, so each step feeds the next.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-14">
        {TILES.map(({ icon: Icon, ...tile }, index) => (
          <div key={tile.title}>
            <div className={cn("relative rounded-md border-2 border-white/30 p-5 h-44 flex flex-col justify-between shadow-soft", tile.tile)}>
              <div className="flex justify-between">
                <span className={cn("size-11 rounded-full flex items-center justify-center", tile.disc)}><Icon size={20} strokeWidth={2.3} /></span>
                <span className={cn("size-11 rounded-full flex items-center justify-center", tile.disc)}><Plus size={20} strokeWidth={2.3} /></span>
              </div>
              <div>
                <p className="font-display text-2xl">{tile.title}</p>
                <p className={cn("text-sm font-medium", tile.muted)}>{tile.caption}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-5 px-1">
              <span className="font-display text-primary-500 text-lg">0{index + 1}</span>
              <p className="font-medium text-neutral-900/75">{tile.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
