import { readFile } from "node:fs/promises"
import sharp from "sharp"
import { getRecipePreview } from "@/server/recipe-preview"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const WIDTH = 1200
const HEIGHT = 630
/** The app icon's side as drawn; `og-badge.png` holds it at 2x. */
const ICON_SIZE = 150
/**
 * Room around the icon for its drop shadow, baked into `og-badge.png` (200 px at 2x). The shadow is
 * two layers: a wide, soft one that fades out over most of this room, and a faint tight one under
 * the icon. Wider than the margin on purpose: the shadow spreads off the image's edge and `sharp`
 * clips what overflows, where a canvas cut at the margin would end the blur in a hard line.
 */
const SHADOW_ROOM = 100
const BADGE_SIZE = ICON_SIZE + 2 * SHADOW_ROOM
/** From the icon's edge, not the shadow's, to the image's bottom-right corner. */
const BADGE_MARGIN = 32
/**
 * The whole answer, Convex read and cover download included, within the few seconds a crawler
 * waits: past it, the preview goes out with no picture at all, worse than the site's own.
 */
const BUDGET_MS = 5_000
/** Kept back from the budget for sharp to decode, resize and encode the cover. */
const COMPOSE_ROOM_MS = 500

/**
 * How long each answer may be kept. A failure is never kept, so the next crawl asks again rather
 * than a CDN serving the site's picture for a week because Convex blinked once.
 */
const CACHE = {
  /** Covers rarely change once generated, and a new one gets a new address (the page's `?v=`). */
  COVER: "public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400",
  /** No such recipe today means none tomorrow: an id never comes back. */
  MISSING: "public, max-age=604800, s-maxage=604800",
  /** A cover still rendering after an import, or one that failed to load: worth asking again soon. */
  RETRY_SOON: "public, max-age=300, s-maxage=300",
  FAILED: "no-store",
}

let _badgeLoad: Promise<Buffer | null> | undefined

/**
 * The app icon drawn over the cover, with its rounded corners and drop shadow, read once it has
 * loaded. The `import.meta.url` form, not a `process.cwd()` path, so Next's output tracing ships the
 * file with the server bundle. A failed read costs the icon, never the preview: it is logged, the
 * cover goes out alone, and the next request tries again rather than the process going without it.
 */
const _badge = (): Promise<Buffer | null> =>
  (_badgeLoad ??= readFile(new URL("./og-badge.png", import.meta.url))
    .then((file) => sharp(file).resize(BADGE_SIZE, BADGE_SIZE).png().toBuffer())
    .catch((error: unknown) => {
      console.error("recipe preview: the app icon did not load, this cover goes out without it", error)
      _badgeLoad = undefined
      return null
    }))

/** Loaded with the module, so the first cover does not spend its crawler's seconds on it. */
void _badge()

/**
 * The site's own picture, `src/app/opengraph-image.jpg`, kept for as long as the outcome allows.
 * A relative address: behind a proxy, `request.url` can carry the internal origin.
 */
const _fallback = (cacheControl: string) =>
  new Response(null, {
    status: 302,
    headers: { Location: "/opengraph-image.jpg", "Cache-Control": cacheControl },
  })

/**
 * Covers arrive as WebP, the `large` rendition (at most 1024px wide, slightly enlarged to fill
 * 1200×630); crawlers want 1200×630, and not all of them read WebP. A transparent cover is laid on
 * white, where JPEG would fill it with black. `withBadge` is false when the icon did not load, so
 * that image is not kept as long as a whole one.
 */
const _compose = async (cover: ArrayBuffer): Promise<{ jpeg: Buffer; withBadge: boolean }> => {
  const badge = await _badge()
  const image = sharp(Buffer.from(cover)).resize(WIDTH, HEIGHT, { fit: "cover" })
  if (badge) {
    image.composite([
      {
        input: badge,
        left: WIDTH - BADGE_MARGIN - ICON_SIZE - SHADOW_ROOM,
        top: HEIGHT - BADGE_MARGIN - ICON_SIZE - SHADOW_ROOM,
      },
    ])
  }

  return { jpeg: await image.flatten({ background: "#ffffff" }).jpeg({ quality: 82 }).toBuffer(), withBadge: badge !== null }
}

/**
 * A shared recipe's link-preview image: its cover, cropped to 1200×630, with the app icon in the
 * bottom-right corner. No words, so no `?lang=`: one image per recipe in every language. The
 * page's `?v=` only changes the address when the cover changes; nothing here reads it.
 *
 * The page points here only when the recipe has a cover, but a crawler can arrive anyway from a
 * page it cached earlier, so every other outcome redirects to the site's own picture. Never throws:
 * an error here would leave the preview with no picture at all.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const started = Date.now()
  const { id } = await params
  const result = await getRecipePreview(id)

  if (result.status === "failed") return _fallback(CACHE.FAILED)
  if (result.status === "missing") return _fallback(CACHE.MISSING)

  const coverUrl = result.preview.coverImageLargeUrl
  if (!coverUrl) return _fallback(CACHE.RETRY_SOON)

  try {
    /** The recipe read gives up at 3 s, so at least 1.5 s is left here. */
    const left = BUDGET_MS - COMPOSE_ROOM_MS - (Date.now() - started)

    const response = await fetch(coverUrl, { signal: AbortSignal.timeout(Math.max(left, 0)) })
    if (!response.ok) throw new Error(`cover answered ${response.status}`)

    const { jpeg, withBadge } = await _compose(await response.arrayBuffer())

    return new Response(new Uint8Array(jpeg), {
      headers: { "Content-Type": "image/jpeg", "Cache-Control": withBadge ? CACHE.COVER : CACHE.RETRY_SOON },
    })
  } catch (error) {
    console.error("recipe preview: could not draw the cover of", id, error instanceof Error ? error.message : error)
    return _fallback(CACHE.RETRY_SOON)
  }
}
