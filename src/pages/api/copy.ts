import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'

/**
 * Counts copies from the preview toolbar (see `PreviewCopy.astro`) in the
 * `hyperui_copies` Workers Analytics Engine dataset. Each data point records
 * which component variant was copied and how, and nothing about the visitor.
 *
 * blob1 category, blob2 slug, blob3 variant number, blob4 light/dark,
 * blob5 html/ai. index1 is `{category}/{slug}`.
 */
export const prerender = false

const SRC_PATTERN =
  /^\/examples\/(application|marketing|neobrutalism|templates)\/([a-z0-9-]+)\/(\d{1,3})(-dark)?\.html$/

const COPY_KINDS = new Set(['html', 'ai'])

export const POST: APIRoute = async ({ request }) => {
  let payload: unknown

  try {
    payload = JSON.parse(await request.text())
  } catch {
    return new Response(null, { status: 400 })
  }

  const { src, kind } = (payload ?? {}) as { src?: unknown; kind?: unknown }
  const match = typeof src === 'string' ? SRC_PATTERN.exec(src) : null

  if (!match || typeof kind !== 'string' || !COPY_KINDS.has(kind)) {
    return new Response(null, { status: 400 })
  }

  // The pattern guarantees the first three groups.
  const [, category = '', slug = '', variant = '', dark] = match

  // The binding is missing under `astro dev`, so counting is skipped there.
  env.COPY_EVENTS?.writeDataPoint({
    indexes: [`${category}/${slug}`],
    blobs: [category, slug, variant, dark ? 'dark' : 'light', kind],
    doubles: [1],
  })

  return new Response(null, { status: 204 })
}
