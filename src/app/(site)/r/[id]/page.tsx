import Image from "next/image"
import { Metadata } from "next"
import { StoreBadges } from "@/components/download"
import { WEBSITE } from "@/global"

export const metadata: Metadata = {
  title: "A recipe in " + WEBSITE.NAME,
  description: "Someone shared a recipe with you on " + WEBSITE.NAME + ".",
  robots: { index: false },
}

/**
 * Where a shared recipe link lands when the app did not open it: Cuisko is not installed, or the
 * installed build predates the link. The site has no backend, so it shows no recipe, only the way in.
 *
 * The badges come first. The scheme link is secondary because on iOS Safari it shows an "address
 * is invalid" alert when the app is missing, and its label only invites someone who has the app.
 */
export default async function SharedRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <main className="relative overflow-hidden bg-screen px-4 sm:px-6 pt-5 sm:pt-6 pb-24">
      <div className="glow size-[800px] -top-[400px] -left-[350px] opacity-10" />
      <div className="h-14 mb-16" />
      <div className="md:h-[10vh]" />
      <div className="relative max-w-4xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-start">
        <div>
          <h1 className="font-display text-5xl md:text-6xl">A recipe is waiting for you in {WEBSITE.NAME}</h1>
          <p className="text-lg text-neutral-900/80 mt-6 max-w-lg">
            Get the app, then open this link again.
          </p>

          <StoreBadges className="mt-8" />

          <a
            href={`${WEBSITE.APP_SCHEME_URL}recipe/${encodeURIComponent(id)}`}
            className="inline-block mt-10 text-primary-500 underline"
          >
            Already have {WEBSITE.NAME}? Open the recipe
          </a>
        </div>

        <Image
          src="/assets/mascot/winking-head.webp"
          alt=""
          width={910}
          height={950}
          className="order-first md:order-0 w-28 md:w-56 drop-shadow-xl"
        />
      </div>
      <div className="md:h-[10vh]" />
    </main>
  )
}
