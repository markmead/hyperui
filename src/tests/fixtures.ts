import { test as base } from '@playwright/test'

/**
 * Ads and analytics never load in tests, so test runs don't count as ad
 * impressions or visits, and don't depend on outside services.
 */
const BLOCKED_HOSTS = /^https:\/\/([a-z0-9-]+\.)*(ethicalads\.io|cloudflareinsights\.com)\//

export const test = base.extend({
  context: async ({ context }, use) => {
    await context.route(BLOCKED_HOSTS, (route) => route.abort('blockedbyclient'))

    await use(context)
  },
})

export * from '@playwright/test'

const escapeRegExp = (value: string) => value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)

/**
 * Matches a page URL with or without a trailing slash. The dev server serves
 * `/faqs`, while the built site redirects it to `/faqs/`.
 */
export const pageURL = (path: string, hash = '') =>
  new RegExp(`${escapeRegExp(path.replace(/\/$/, ''))}/?${escapeRegExp(hash)}$`)
