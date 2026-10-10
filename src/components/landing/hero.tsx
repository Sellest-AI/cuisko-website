import Image from "next/image"
import { ChevronDown, ShoppingCart, Store } from "lucide-react"
import { DOWNLOAD_HREF } from "@/components/download"
import { PillLink } from "@/ui/components/pill-link"
import { PlateCarousel } from "@/components/landing/plate-carousel"

/** The app's home screen at web scale: the plate carousel, with the list and the cellar floating by. */
export const Hero = () => (
  <section className="relative overflow-hidden bg-screen">
    <div className="glow size-[900px] -top-[420px] -left-[360px] opacity-12" />
    <div className="glow size-[700px] top-[160px] -right-[420px] opacity-10" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-6">
      {/* Room for the sticky header */}
      <div className="h-14" />

      <div className="flex flex-col items-center text-center mt-16 md:mt-20">
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <Image src="/assets/mascot/winking-head.webp" alt="" width={56} height={56} className="size-8" />
          Meet Cuisko, your red panda chef
        </span>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] max-w-4xl mt-6">
          Cook from what you <span className="text-primary-500">already own.</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-muted mt-6 max-w-2xl">
          Cuisko plans your week from the food in your kitchen, lists only what&apos;s missing, and keeps your stock up to date as you cook.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-9">
          <PillLink href={DOWNLOAD_HREF}>Get the app — it&apos;s free</PillLink>
          <PillLink href="#how-it-works" variant="glass" icon={ChevronDown}>How it works</PillLink>
        </div>
      </div>
    </div>

    <div className="relative mt-16 md:mt-20">
      <PlateCarousel />

      <div className="hidden xl:flex z-20 border-2 border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.09)] absolute left-[calc(50%-560px)] -top-6 items-center gap-3 rounded-sm bg-secondary-500 text-white p-3 pr-5 animate-float">
        <span className="size-10 rounded-full bg-white/25 flex items-center justify-center"><ShoppingCart size={18} strokeWidth={2.3} /></span>
        <span className="text-left">
          <span className="block font-semibold leading-tight">Grocery list</span>
          <span className="block text-xs font-medium text-white/85">9 items to buy</span>
        </span>
      </div>
      <div className="hidden xl:flex z-20 glass shadow-[0_12px_40px_rgba(0,0,0,0.09)] absolute right-[calc(50%-560px)] top-10 items-center gap-3 rounded-sm p-3 pr-5 animate-float [animation-delay:-3s]">
        <span className="size-10 rounded-full bg-neutral-100 flex items-center justify-center"><Store size={18} strokeWidth={2.3} /></span>
        <span className="text-left">
          <span className="block font-semibold leading-tight">The cellar</span>
          <span className="block text-xs font-medium text-muted">23 items in stock</span>
        </span>
      </div>
    </div>

    <div className="pb-20 md:pb-28" />
  </section>
)
