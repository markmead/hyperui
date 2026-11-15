import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
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

const CATEGORIES = ['application', 'marketing', 'neobrutalism', 'templates'] as const

let publishedExamples: Promise<Set<string>> | null = null

/**
 * Every example the site publishes, as `{category}/{slug}/{n}` and
 * `{category}/{slug}/{n}-dark`, from the same collections the pages use.
 * Built once per Worker instance.
 */
function getPublishedExamples(): Promise<Set<string>> {
  publishedExamples ??= Promise.all(CATEGORIES.map((category) => getCollection(category))).then(
    (collections) => {
      const examples = new Set<string>()

      for (const entry of collections.flat()) {
        entry.data.components.forEach((component, index) => {
          const path = `${entry.data.category}/${entry.data.slug}/${index + 1}`

          examples.add(path)

          if (component.dark) {
            examples.add(`${path}-dark`)
          }
        })
      }

      return examples
    },
  )

  return publishedExamples
}

export const POST: APIRoute = async ({ request }) => {
  // Browsers send Sec-Fetch-Site on every request, and the preview toolbar's
  // beacon is always same-origin. Rejecting anything else stops other sites
  // from sending counts from their visitors' browsers. Clients that don't
  // send the header at all are left to the Cloudflare rate-limiting rule.
  const fetchSite = request.headers.get('Sec-Fetch-Site')

  if (fetchSite !== null && fetchSite !== 'same-origin') {
    return new Response(null, { status: 403 })
  }

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

  if (!(await getPublishedExamples()).has(`${category}/${slug}/${variant}${dark ?? ''}`)) {
    return new Response(null, { status: 400 })
  }

  // The binding is missing under `astro dev`, so counting is skipped there.
  env.COPY_EVENTS?.writeDataPoint({
    indexes: [`${category}/${slug}`],
    blobs: [category, slug, variant, dark ? 'dark' : 'light', kind],
    doubles: [1],
  })

  return new Response(null, { status: 204 })
}
