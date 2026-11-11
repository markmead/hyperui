import type { APIRoute } from 'astro'

/**
 * On-demand route. Besides being a cheap health check, it is what makes the
 * Cloudflare adapter emit a worker at all: with every route prerendered the
 * build is assets-only and `src/worker.ts` (Markdown content negotiation)
 * would be dropped.
 */
export const prerender = false

export const GET: APIRoute = () =>
  new Response('ok', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  })
