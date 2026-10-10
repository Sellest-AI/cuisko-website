import Image from "next/image"
import { HeartHandshake, SkipForward, Users } from "lucide-react"

const PROMISES = [
  { icon: HeartHandshake, title: "Information, never a verdict", text: "Nutrition is shown plainly. No red warnings, no blown budgets." },
  { icon: SkipForward, title: "Skip without guilt", text: "Didn't cook tonight? One gesture, and its groceries leave the list." },
  { icon: Users, title: "Built for a household", text: "One cellar, one list, one plan, with everyone's own diet respected." },
]

export const Calm = () => (
  <section className="px-4 sm:px-6 pt-12 md:pt-16 pb-24 md:pb-32">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
      <div className="relative w-44 md:w-56 mx-auto">
        {/* A soft contact shadow under his feet (right of centre: the tail takes the left), so he stands on the page */}
        <div className="absolute -bottom-[3%] left-[26%] right-[4%] h-[8%] rounded-[50%] bg-neutral-900/40 blur-md" />
        <Image
          src="/assets/mascot/forbidden.webp"
          alt="Cuisko holding a no sign"
          width={703}
          height={1007}
          className="relative w-full h-auto drop-shadow-xl"
        />
      </div>
      <div>
        <h2 className="font-display text-4xl md:text-5xl leading-tight">
          No streaks. No scolding. <span className="text-primary-500">Just dinner.</span>
        </h2>
        <p className="text-lg font-medium text-muted mt-5 max-w-2xl">
          Cuisko isn&apos;t an app that wants your attention every day. It plans, it steps back, and it cheers the small wins.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {PROMISES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass shadow-soft rounded-md p-5">
              <span className="size-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center"><Icon size={18} strokeWidth={2.3} /></span>
              <p className="font-semibold mt-4">{title}</p>
              <p className="text-sm font-medium text-muted mt-1.5">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)
