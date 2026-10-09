import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { DOWNLOAD_HREF, StoreBadges } from "@/components/download"
import { Header } from "@/components/header"
import { Phone } from "@/components/phone"
import { cn } from "@/ui/utils"

const FEATURES = [
  {
    title: "Plan your week in a tap.",
    text: "Cuisko fills your lunches and dinners for the days ahead, matched to your tastes, your allergies and how many of you are eating.",
    screen: "plan",
  },
  {
    title: "Your grocery list writes itself.",
    text: "Every ingredient from your plan, merged and sorted by aisle, and shared with everyone in your household.",
    screen: "groceries",
  },
  {
    title: "Bring any recipe along.",
    text: "Paste a link from any website or write your own. Cuisko turns it into a clean recipe you can actually cook from.",
    screen: "import",
  },
]

const STEPS = [
  { title: "Pick.", text: "Tell Cuisko what you like and what you can't eat." },
  { title: "Plan.", text: "Get a week of meals and the grocery list to match." },
  { title: "Cook.", text: "Follow each recipe step by step, and enjoy." },
]

const DarkButton = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
  <Link
    href={href}
    className={cn(
      "inline-flex items-center gap-1.5 bg-neutral-900 text-white rounded-full pl-6 pr-4 py-3 font-semibold hover:bg-neutral-900/85 transition-colors",
      className
    )}
  >
    {children}
    <ChevronRight size={18} />
  </Link>
)

const Hero = () => (
  <section className="p-3">
    <div className="relative bg-primary-500 rounded-lg overflow-hidden px-5 sm:px-10 pt-6">
      <Header variant="primary" />

      <div className="flex flex-col items-center text-center text-white mt-16 md:mt-20">
        <Image
          src="/assets/mascot/cuisko-winking-head.webp"
          alt="Cuisko"
          width={128}
          height={128}
          className="size-20 object-contain mb-2 drop-shadow-lg"
          priority
        />
        <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-3xl">
          Never wonder what&apos;s for dinner again.
        </h1>
        <p className="text-lg md:text-xl text-white/85 mt-6 max-w-xl">
          Cuisko plans your meals, writes your grocery list and guides you through every recipe — all in one app.
        </p>
        <DarkButton href={DOWNLOAD_HREF} className="mt-8">Download the app</DarkButton>
      </div>

      {/* Three phones, cut off by the bottom of the panel */}
      <div className="relative h-[300px] md:h-[420px] mt-14 max-w-4xl mx-auto">
        <Phone screen="recipes" className="hidden md:block absolute left-[6%] top-16 w-[230px] -rotate-6" />
        <Phone screen="cook" priority alt="A recipe in the Cuisko app" className="absolute left-1/2 -translate-x-1/2 top-0 w-[240px] md:w-[270px] z-10" />
        <Phone screen="plan" className="hidden md:block absolute right-[6%] top-16 w-[230px] rotate-6" />
      </div>
    </div>
  </section>
)

const Statement = () => (
  <section className="px-3">
    <div className="bg-neutral-100 rounded-lg px-6 py-16 md:py-24 flex flex-col items-center text-center">
      <p className="font-display text-3xl md:text-5xl leading-tight max-w-4xl">
        We&apos;re changing the way people cook at home. <span className="text-primary-500">Less thinking, more eating.</span>
      </p>
      <DarkButton href="#features" className="mt-10">How it works</DarkButton>
    </div>
  </section>
)

const Features = () => (
  <section id="features" className="px-4 sm:px-6 py-20 md:py-28 scroll-mt-6">
    <div className="max-w-6xl mx-auto flex flex-col gap-20 md:gap-28">
      {FEATURES.map((feature, index) => (
        <div
          key={feature.screen}
          className={cn("grid md:grid-cols-2 gap-10 md:gap-16 items-center", index % 2 === 1 && "md:[&>*:first-child]:order-2")}
        >
          <div className="bg-primary-500 rounded-lg h-[380px] md:h-[440px] overflow-hidden flex justify-center pt-12">
            <Phone screen={feature.screen} alt={`${feature.title} — Cuisko app`} className="w-[260px] h-fit" />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">{feature.title}</h2>
            <p className="text-lg text-neutral-900/70 mt-5 max-w-md">{feature.text}</p>
            <DarkButton href={DOWNLOAD_HREF} className="mt-8 text-sm">Try it now</DarkButton>
          </div>
        </div>
      ))}
    </div>
  </section>
)

const Steps = () => (
  <section id="download" className="px-3 pb-3 scroll-mt-6">
    <div className="bg-primary-500 rounded-lg px-5 sm:px-10 pt-16 md:pt-20 pb-10 text-white">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display text-4xl md:text-6xl">3 steps to a full plate.</h2>
        <p className="text-lg text-white/85 mt-4">Free on iOS and Android.</p>
        <StoreBadges className="mt-8 justify-center" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-14 max-w-6xl mx-auto">
        {STEPS.map((step, index) => (
          <div key={step.title} className="bg-primary-100/25 ring-1 ring-primary-100/50 text-white rounded-md p-7">
            <span className="size-8 rounded-full bg-white text-primary-500 text-sm font-semibold flex items-center justify-center">
              {index + 1}
            </span>
            <h3 className="font-display text-3xl mt-6">{step.title}</h3>
            <p className="text-white/85 font-medium mt-2">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default function Home() {
  return (
    <main>
      <Hero />
      <Statement />
      <Features />
      <Steps />
    </main>
  )
}
