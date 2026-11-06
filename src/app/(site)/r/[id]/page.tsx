import { createHash } from "node:crypto"
import Image from "next/image"
import { Metadata } from "next"
import { StoreBadges } from "@/components/download"
import { WEBSITE } from "@/global"
import { getRecipePreview, localeOf } from "@/server/recipe-preview"

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ lang?: string | string[] }>
}

const FALLBACK_TITLE = "A recipe in " + WEBSITE.NAME
const FALLBACK_DESCRIPTION = "Someone shared a recipe with you on " + WEBSITE.NAME + "."

/** Past this, link crawlers cut the description themselves, mid-word. */
const DESCRIPTION_MAX = 160

/**
 * `text` cut at the last word that fits `DESCRIPTION_MAX`, with an ellipsis when anything was cut.
 *
 * Only ordinary whitespace is flattened: the non-breaking spaces French puts before `!` and inside
 * « » stay, so a preview never wraps with a line starting on `!`. A last space in the first half
 * would leave next to nothing (a short word, then a long link), so the cut is then made mid-word.
 * What would dangle before the ellipsis (an opening « or bracket, an ellipsis already there) goes.
 */
const _trim = (text: string) => {
  const flat = text.replace(/[ \t\r\n]+/g, " ").trim()
  if (flat.length <= DESCRIPTION_MAX) return flat

  /** A space right after the room left for the ellipsis still ends a whole word. */
  const lastSpace = flat.lastIndexOf(" ", DESCRIPTION_MAX - 1)
  const cut =
    lastSpace >= DESCRIPTION_MAX / 2
      ? flat.slice(0, lastSpace)
      : flat.slice(0, DESCRIPTION_MAX - 1).replace(/[\uD800-\uDBFF]$/, "")
  return cut.replace(/[\s.,;:!?…«(\[“"'-]+$/, "") + "…"
}

/**
 * Changes when the cover does. Crawlers and the CDN keep the image by its address for a week, so a
 * regenerated cover would otherwise preview as the old one until then.
 */
const _coverVersion = (coverUrl: string) => createHash("sha1").update(coverUrl).digest("hex").slice(0, 8)

/** The site's own picture, `src/app/opengraph-image.jpg`, with the text of its `.alt.txt`. */
const FALLBACK_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Cuisko's red panda chef cooking in a sunny kitchen beside a phone showing the app's week of planned meals",
}

/**
 * The link preview a messaging app draws: "Cuisko: <recipe name>", its description trimmed to a
 * line or two (the fixed line when it has none), and its cover with the app icon when it
 * has one (`og/route.ts`). Anything else, from a recipe without a cover to a backend that did not
 * answer, previews with the site's own picture.
 *
 * Both images are named on every outcome. A page that sets `openGraph` replaces the layout's whole
 * block, images included, so leaving `images` out would leave the preview with no picture at all,
 * and `type` and `siteName` are repeated for the same reason. `twitter.images` is set rather than
 * left for Next to copy.
 *
 * `?lang=` is the sharer's language, added by the app; without it the title is the English one.
 */
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ id }, { lang }] = await Promise.all([params, searchParams])
  const result = await getRecipePreview(id, localeOf(lang))

  const preview = result.status === "found" ? result.preview : undefined
  const title = preview ? `${WEBSITE.NAME}: ${preview.title}` : FALLBACK_TITLE
  const description = (preview?.description && _trim(preview.description)) || FALLBACK_DESCRIPTION
  const image = preview?.coverImageLargeUrl
    ? { url: `/r/${encodeURIComponent(id)}/og?v=${_coverVersion(preview.coverImageLargeUrl)}`, width: 1200, height: 630, alt: preview.title }
    : FALLBACK_IMAGE

  return {
    title,
    description,
    robots: { index: false },
    openGraph: { type: "website", siteName: WEBSITE.NAME, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}

/**
 * Where a shared recipe link lands when the app did not open it: Cuisko is not installed, or the
 * installed build predates the link. The recipe reaches only the link preview (`generateMetadata`):
 * the page itself shows no recipe, only the way in.
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
