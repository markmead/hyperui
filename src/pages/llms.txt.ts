import type { APIRoute } from 'astro'

import { renderLlmsTxt } from '../utils/markdown'

export const GET: APIRoute = async () =>
  new Response(await renderLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
