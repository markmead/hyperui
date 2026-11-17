import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { env } from 'cloudflare:workers'

/**
 * Counts clicks on the "I'm interested" button on template pages (see
 * `TemplateInterest.astro`) in the `hyperui_interest` Workers Analytics
 * Engine dataset. Each data point records the template slug, and nothing
 * about the visitor.
 *
 * blob1 slug. index1 is the slug.
 */
export const prerender = false

const SLUG_PATTERN = /^[a-z0-9-]{1,64}$/

let templateSlugs: Promise<Set<string>> | null = null

/** The templates the site publishes. Built once per Worker instance. */
function getTemplateSlugs(): Promise<Set<string>> {
  templateSlugs ??= getCollection('templates').then(
    (entries) => new Set(entries.map((entry) => entry.data.slug)),
  )

  return templateSlugs
}

export const POST: APIRoute = async ({ request }) => {
  // Same rule as /api/copy: the button's beacon is always same-origin, so
  // anything else is another site sending clicks from its visitors.
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

  const { slug } = (payload ?? {}) as { slug?: unknown }

  if (
    typeof slug !== 'string' ||
    !SLUG_PATTERN.test(slug) ||
    !(await getTemplateSlugs()).has(slug)
  ) {
    return new Response(null, { status: 400 })
  }

  // The binding is missing under `astro dev`, so counting is skipped there.
  env.INTEREST_EVENTS?.writeDataPoint({
    indexes: [slug],
    blobs: [slug],
    doubles: [1],
  })

  return new Response(null, { status: 204 })
}
