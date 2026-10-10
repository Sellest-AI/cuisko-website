import Image from "next/image"
import { CalendarDays, Camera, Check, ChefHat, Globe, Link2, Mic, ShoppingCart, Undo2, UtensilsCrossed, ArrowRight, Type } from "lucide-react"
import { Phone } from "@/components/phone"
import { Feature, Stage } from "@/components/landing/feature"
import { MealCard } from "@/ui/components/meal-card"
import { TiltedPhoto } from "@/ui/components/tilted-photo"

const Highlight = ({ children }: { children: React.ReactNode }) => <span className="text-primary-500">{children}</span>

const STAGE = "h-[500px] md:h-[560px]"
const PHONE = "absolute left-1/2 -translate-x-1/2 top-12 w-[250px] md:w-[280px]"

const PlanVisual = () => (
  <Stage className={STAGE}>
    <Phone screen="planning" alt="The week's plan in Cuisko" className={PHONE} />
    <MealCard
      dish="tikka-masala" title="Tikka masala" minutes={35} meal="Dinner"
      status={{ label: "In stock", tone: "success" }}
      className="absolute left-3 sm:left-6 top-24 animate-float"
    />
    <Image src="/assets/mascot/calendar.webp" alt="" width={750} height={987} className="absolute -left-4 -bottom-6 w-36 md:w-44 drop-shadow-xl" />
  </Stage>
)

const ShopVisual = () => (
  <Stage className={STAGE}>
    <Phone screen="grocery-list" alt="The grocery list in Cuisko" className={PHONE} />
    <div className="glass shadow-lifted absolute left-3 sm:left-8 top-28 rounded-sm p-4 w-44 animate-float">
      <p className="text-xs font-semibold text-muted">This week needs</p>
      <p className="font-display text-3xl mt-1">32 items</p>
      <div className="h-2 rounded-full bg-neutral-200 mt-3 overflow-hidden"><div className="h-full w-[72%] bg-secondary-500 rounded-full" /></div>
      <p className="text-xs font-semibold text-secondary-500 mt-2">23 already at home</p>
    </div>
    <div className="glass shadow-lifted absolute right-3 sm:right-6 bottom-10 rounded-full pl-2 pr-2 py-2 flex items-center gap-3 animate-float [animation-delay:-3s]">
      <span className="size-8 rounded-full bg-secondary-500 text-white flex items-center justify-center"><Check size={16} strokeWidth={3} /></span>
      <span className="text-sm font-semibold">Carrots moved to the cellar</span>
      <span className="size-8 rounded-full bg-neutral-100 flex items-center justify-center"><Undo2 size={15} strokeWidth={2.3} /></span>
    </div>
    <TiltedPhoto tilt={5} className="hidden sm:block absolute right-6 md:right-8 top-6 w-32 md:w-36 aspect-3/4">
      <video className="scale-[1.7] origin-[45%_42%]" src="/assets/videos/eating-apple.mp4" poster="/assets/videos/eating-apple-poster.webp" autoPlay muted loop playsInline />
    </TiltedPhoto>
  </Stage>
)

const CookVisual = () => (
  <Stage className={STAGE}>
    <Phone screen="cooking-step" alt="Cooking mode in Cuisko" className={PHONE} />
    <TiltedPhoto tilt={-6} className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 w-36 sm:w-44 aspect-square">
      <video src="/assets/videos/cooking-pot.mp4" poster="/assets/videos/cooking-pot-poster.webp" autoPlay muted loop playsInline />
    </TiltedPhoto>
    <span className="absolute right-3 sm:right-8 top-28 inline-flex items-center gap-3 rounded-full border-2 border-white/20 bg-primary-500 text-white pl-5 pr-1.5 py-1.5 font-semibold shadow-lifted animate-float">
      Next step
      <span className="size-8 rounded-full bg-white/25 flex items-center justify-center"><ArrowRight size={16} strokeWidth={2.3} /></span>
    </span>
  </Stage>
)

const SOURCES = [
  { icon: Camera, label: "Instagram reel", className: "left-4 sm:left-8 top-20" },
  { icon: Globe, label: "Any website", className: "right-4 sm:right-8 top-36" },
  { icon: Type, label: "Your own notes", className: "left-6 sm:left-12 bottom-24" },
  { icon: Link2, label: "TikTok video", className: "right-6 sm:right-10 bottom-14" },
]

const ImportVisual = () => (
  <Stage className="h-[460px]">
    <Phone screen="import-social" alt="Importing a recipe from social media in Cuisko" className="absolute left-1/2 -translate-x-1/2 top-10 w-[230px]" />
    {SOURCES.map(({ icon: Icon, label, className }, index) => (
      <span
        key={label}
        className={`glass shadow-lifted absolute ${className} flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5 text-sm font-semibold animate-float`}
        style={{ animationDelay: `${index * -1.5}s` }}
      >
        <span className="size-7 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center"><Icon size={14} strokeWidth={2.3} /></span>
        {label}
      </span>
    ))}
  </Stage>
)

const AssistantVisual = () => (
  <Stage className="h-[460px]">
    <Phone screen="assistant-plan" alt="Asking Cuisko to plan a meal" className="absolute left-1/2 -translate-x-1/2 top-10 w-[230px]" />
    {/* Lighter than `glass`, so the chat shows through like the app's floating bar. Inline because it must win over the utility. */}
    <div className="glass shadow-lifted absolute left-1/2 -translate-x-1/2 w-[min(calc(100%-24px),380px)] bottom-6 rounded-full p-1.5 flex items-center gap-2" style={{ background: "rgb(255 253 251 / 0.6)" }}>
      <span className="size-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0"><Camera size={18} strokeWidth={2.3} /></span>
      <span className="flex-1 text-muted font-medium truncate">What can I cook tonight?</span>
      <Mic size={18} strokeWidth={2.3} className="shrink-0" />
      <span className="size-10 rounded-full bg-secondary-500 text-white flex items-center justify-center shrink-0"><UtensilsCrossed size={18} strokeWidth={2.3} /></span>
    </div>
    <Image src="/assets/mascot/winking-head.webp" alt="" width={912} height={934} className="absolute right-4 top-8 w-20 drop-shadow-xl animate-float" />
  </Stage>
)

const SmallFeature = ({ label, title, text, visual }: { label: string, title: React.ReactNode, text: string, visual: React.ReactNode }) => (
  <div>
    {visual}
    <p className="font-semibold text-primary-500 mt-8">{label}</p>
    <h3 className="font-display text-3xl md:text-4xl leading-tight mt-2">{title}</h3>
    <p className="text-lg font-medium text-muted mt-3">{text}</p>
  </div>
)

export const Features = () => (
  <section className="px-4 sm:px-6 pb-24 md:pb-32">
    <div className="max-w-6xl mx-auto flex flex-col gap-24 md:gap-32">
      <Feature
        icon={CalendarDays}
        label="Plan the week"
        title={<>A week of meals, <Highlight>from your own fridge.</Highlight></>}
        text="Answer a few quick questions (who's eating, what you fancy, allergies, the gear in your kitchen) and Cuisko builds the week around what you already have. Whatever goes off first lands on the earliest days."
        points={["Uses what's in your cellar first", "Swap any plate for a runner-up", "Respects every diet and allergy at home"]}
        visual={<PlanVisual />}
      />
      <Feature
        reverse
        icon={ShoppingCart}
        label="Shop only the gap"
        title={<>A grocery list that&apos;s <Highlight>actually short.</Highlight></>}
        text="Your list is what the week needs minus what you already own. Sorted by aisle or by meal, shared with everyone at home, and one tap moves what you bought into the cellar."
        points={["Grams and kilos merged into one line", "Shared with your whole household", "Every tick can be undone"]}
        visual={<ShopVisual />}
      />
      <Feature
        icon={ChefHat}
        label="Cook"
        title={<>One step at a time, <Highlight>then it tidies up.</Highlight></>}
        text="Big text, one step per screen, quantities scaled to the plate you planned. When you finish, Cuisko takes what you used out of the cellar, so your stock stays right without typing."
        points={["Made for a phone on the counter", "Quantities scaled to your servings", "Your stock updates itself"]}
        visual={<CookVisual />}
      />

      <div className="grid md:grid-cols-2 gap-14 md:gap-8">
        <SmallFeature
          label="Recipes from anywhere"
          title={<>Paste it, <Highlight>cook it.</Highlight></>}
          text="Free text, a web page, an Instagram reel or a TikTok: Cuisko turns it into a clean recipe with every ingredient matched, in English and French."
          visual={<ImportVisual />}
        />
        <SmallFeature
          label="Ask Cuisko"
          title={<>A chef who knows <Highlight>your kitchen.</Highlight></>}
          text="Type or talk. Cuisko answers from what's really in your cellar, suggests swaps for what's missing, and can plan the meal for you, with an undo."
          visual={<AssistantVisual />}
        />
      </div>
    </div>
  </section>
)
