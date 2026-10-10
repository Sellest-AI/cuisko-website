import Image from "next/image"
import { StoreBadges } from "@/components/download"

/** The closing call, drawn as a selected choice tile: an orange gradient, white text. */
export const GetTheApp = () => (
  <section id="download" className="px-3 pb-3 scroll-mt-6">
    <div className="relative overflow-hidden rounded-[28px] border-2 border-white/30 bg-linear-to-br from-primary-500 to-primary-300 text-white px-6 sm:px-12 md:px-20 pt-16 md:pt-20 pb-12 md:pb-20">
      <div className="absolute size-[600px] -top-[300px] -right-[200px] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),transparent)]" />
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center">
        <div className="max-md:text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-2xl">
            Tonight&apos;s dinner is already in your kitchen.
          </h2>
          <p className="text-lg md:text-xl font-medium text-white/85 mt-5">Free on iOS and Android.</p>
          <StoreBadges className="mt-8 max-md:justify-center" />
        </div>
        <div className="relative w-56 md:w-72 mx-auto md:-mb-4">
          {/* Contact shadow under his feet, mid-stride and right of centre; a burnt orange, not grey, on this ground */}
          <div className="absolute -bottom-[2%] left-[36%] right-[10%] h-[7%] rounded-[50%] bg-[#7a2a00]/35 blur-md" />
          <Image
            src="/assets/mascot/saucepan.webp"
            alt="Cuisko carrying a saucepan"
            width={786}
            height={884}
            className="relative w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
)
