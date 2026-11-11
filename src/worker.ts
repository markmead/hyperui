import { handle } from '@astrojs/cloudflare/handler'

/**
 * Markdown for Agents: content negotiation on the `Accept` header.
 *
 * Every HTML page has a prerendered Markdown twin at `{path}.md` (see
 * `src/pages/[...path].md.ts`). When a client prefers `text/markdown` over
 * `text/html`, we serve that twin from the same URL. Everyone else (browsers)
 * gets HTML as before. Both variants carry `Vary: Accept` so caches keep them
 * apart.
 */

type AcceptEntry = { type: string; q: number }

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(',')
    .map((part) => {
      const [type = '', ...params] = part.trim().toLowerCase().split(';')
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1

      return { type: type.trim(), q: Number.isFinite(q) ? q : 0 }
    })
    .filter(({ type }) => type)
}

function qualityFor(entries: AcceptEntry[], type: string): number {
  const [major] = type.split('/')
  const exact = entries.find((entry) => entry.type === type)

  if (exact) {
    return exact.q
  }

  const partial = entries.find((entry) => entry.type === `${major}/*`)

  if (partial) {
    return partial.q
  }

  return entries.find((entry) => entry.type === '*/*')?.q ?? 0
}

export function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) {
    return false
  }

  const entries = parseAccept(acceptHeader)

  // Only opt in when markdown is asked for explicitly, never via wildcards.
  const explicit = entries.find((entry) => entry.type === 'text/markdown')

  if (!explicit || explicit.q <= 0) {
    return false
  }

  return explicit.q >= qualityFor(entries, 'text/html')
}

export function markdownPathFor(pathname: string): string | null {
  // Collapse repeated slashes so a path like `//evil.com` can never become a
  // protocol-relative `//evil.com.md` in the Link or Content-Location headers.
  const trimmed = pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '')

  if (trimmed === '' || trimmed === '/index.html') {
    return '/index.md'
  }

  // Leave real files (css, js, images, examples, .md itself) alone.
  if (/\.[a-z0-9]+$/i.test(trimmed.split('/').pop() ?? '')) {
    return null
  }

  return `${trimmed}.md`
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

/**
 * HTML responses vary on `Accept`, and successful ones advertise their
 * Markdown twin with an RFC 8288 `Link: <...>; rel="alternate"` header.
 */
function withHtmlHeaders(request: Request, response: Response): Response {
  const contentType = response.headers.get('Content-Type') ?? ''

  if (!contentType.includes('text/html')) {
    return response
  }

  const patched = new Response(response.body, response)
  patched.headers.append('Vary', 'Accept')

  const markdownPath = markdownPathFor(new URL(request.url).pathname)

  if (response.status === 200 && markdownPath) {
    patched.headers.append('Link', `<${markdownPath}>; rel="alternate"; type="text/markdown"`)
  }

  return patched
}

async function serveMarkdown(request: Request, env: Env): Promise<Response | null> {
  const url = new URL(request.url)
  const markdownPath = markdownPathFor(url.pathname)

  if (!markdownPath) {
    return null
  }

  const assetUrl = new URL(url.origin)
  assetUrl.pathname = markdownPath

  const assetResponse = await env.ASSETS.fetch(assetUrl)

  if (!assetResponse.ok) {
    return null
  }

  const markdown = await assetResponse.text()

  const headers = new Headers({
    'Content-Type': 'text/markdown; charset=utf-8',
    'Content-Location': markdownPath,
    Vary: 'Accept',
    'X-Markdown-Tokens': String(estimateTokens(markdown)),
  })

  const cacheControl = assetResponse.headers.get('Cache-Control')
  if (cacheControl) {
    headers.set('Cache-Control', cacheControl)
  }

  return new Response(request.method === 'HEAD' ? null : markdown, { status: 200, headers })
}

export default {
  async fetch(request, env, ctx) {
    if (
      (request.method === 'GET' || request.method === 'HEAD') &&
      prefersMarkdown(request.headers.get('Accept'))
    ) {
      const markdownResponse = await serveMarkdown(request, env)

      if (markdownResponse) {
        return markdownResponse
      }
    }

    return withHtmlHeaders(request, await handle(request, env, ctx))
  },
} satisfies ExportedHandler<Env>
