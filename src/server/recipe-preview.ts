import "server-only"

import { anyApi } from "convex/server"
import { ConvexHttpClient } from "convex/browser"
import { ConvexError } from "convex/values"

/** The languages a recipe title exists in, `SUPPORTED_LOCALES` in ../cuisko/shared/translations.ts. */
const LOCALES = ["en", "fr"] as const
export type Locale = (typeof LOCALES)[number]

/**
 * The three fields of `getOne.server` this site publishes, and nothing else (ADR 0014 in ../cuisko).
 *
 * The backend hands over the whole recipe: ingredients, instructions, nutrition, the author's name.
 * `getRecipePreview` copies these three out of it before returning, so the rest never reaches a
 * client component, a response body or a log line.
 */
export type RecipePreview = { title: string; description: string; coverImageLargeUrl?: string }

export type RecipePreviewResult =
  | { status: "found"; preview: RecipePreview }
  /** The id names no recipe, malformed or unknown. Stable, so safe to cache. */
  | { status: "missing" }
  /** The backend could not be asked: timeout, network, a refused key. Never cache this. */
  | { status: "failed" }

/**
 * Link crawlers give up after a few seconds, and a page stuck on Convex shows no preview at all,
 * where a fast fallback still shows the site's picture.
 */
const TIMEOUT_MS = 3_000

/** A supported locale from `?lang=`, else none: the backend then answers in English. Never throws. */
export const localeOf = (lang: string | string[] | undefined): Locale | undefined =>
  LOCALES.find((locale) => locale === lang)

const _withTimeout = <T>(promise: Promise<T>): Promise<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out after ${TIMEOUT_MS} ms`)), TIMEOUT_MS)
  })

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

const _isNotFound = (error: unknown) =>
  error instanceof ConvexError && (error.data as { code?: unknown } | undefined)?.code === "NOT_FOUND"

/**
 * A shared recipe's title, description and cover, for its link preview.
 *
 * Called from the server only (`server-only` above fails the build otherwise): it holds
 * `CONVEX_SERVER_KEY`, the backend's `SERVER_PRIVATE_KEY`. `getOne:server` is called by name
 * through `anyApi`, so a rename in ../cuisko/convex breaks this at runtime, not at build.
 */
export const getRecipePreview = async (id: string, locale?: Locale): Promise<RecipePreviewResult> => {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  const serverKey = process.env.CONVEX_SERVER_KEY
  if (!url || !serverKey) {
    console.error("recipe preview: NEXT_PUBLIC_CONVEX_URL or CONVEX_SERVER_KEY is not set")
    return { status: "failed" }
  }

  try {
    const recipe: RecipePreview = await _withTimeout(
      new ConvexHttpClient(url).query(anyApi.router.recipes.getOne.server, { _serverKey: serverKey, id, ...(locale && { locale }) }),
    )

    return {
      status: "found",
      preview: { title: recipe.title, description: recipe.description, coverImageLargeUrl: recipe.coverImageLargeUrl },
    }
  } catch (error) {
    if (_isNotFound(error)) return { status: "missing" }

    console.error("recipe preview: could not read recipe", id, error instanceof Error ? error.message : error)
    return { status: "failed" }
  }
}
