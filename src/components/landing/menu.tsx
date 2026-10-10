import { Plate } from "@/ui/components/plate"

const PLATES = [
  { dish: "bouillabaisse", name: "Bouillabaisse", caption: "Monday · Dinner" },
  { dish: "meatballs-orzo", name: "Meatballs with orzo", caption: "Tuesday · Dinner" },
  { dish: "salad-nicoise", name: "Salade niçoise", caption: "Wednesday · Lunch" },
  { dish: "paella", name: "Seafood paella", caption: "Thursday · Dinner" },
  { dish: "ribollita", name: "Ribollita", caption: "Friday · Lunch" },
  { dish: "shakshuka", name: "Shakshuka", caption: "Saturday · Brunch" },
  { dish: "tikka-masala", name: "Tikka masala", caption: "Sunday · Dinner" },
]

/** A week of plates sliding by, as the home carousel shows them. */
export const Menu = () => (
  <section className="relative overflow-hidden bg-neutral-0 pt-24 md:pt-32 pb-12 md:pb-16">
    <div className="glow size-[640px] -top-[120px] left-1/2 -translate-x-1/2 opacity-10" />
    <div className="relative text-center px-4">
      <h2 className="font-display text-4xl md:text-6xl leading-tight">
        &ldquo;What&apos;s for dinner?&rdquo;<br /><span className="text-primary-500">Already answered.</span>
      </h2>
      <p className="text-lg font-medium text-muted mt-5 max-w-xl mx-auto">
        Real recipes people already cook, varied across the week, so the same dish never lands twice in a row.
      </p>
    </div>

    {/* Edge fades are overlays, not a mask-image: a mask would stop the pills' backdrop blur. */}
    <div className="relative mt-16">
      <div className="absolute inset-y-0 left-0 w-[10%] z-10 bg-linear-to-r from-neutral-0 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[10%] z-10 bg-linear-to-l from-neutral-0 pointer-events-none" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...PLATES, ...PLATES].map((plate, index) => (
          <Plate key={index} {...plate} sizes="260px" className="w-52 md:w-64 mx-6 md:mx-8 mb-6" />
        ))}
      </div>
    </div>
  </section>
)
