import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import darkRules from '../../scripts/dark-mode.config.json'
import { applyFixes, checkMarkup, findingsForAi } from '../lib/checker/index.js'
import { normalizeConfig } from '../lib/dark-mode/config.js'
import { readComponentMarkup } from '../utils/componentMarkup'
import { COMPONENT_CATEGORIES, SITE_URL } from '../utils/markdown'

/**
 * A stateless remote MCP server (Streamable HTTP, JSON responses only), so an
 * agent can search HyperUI and pull components into what it is building. It
 * has no sessions, no accounts and stores nothing.
 *
 * Tools: list_categories, search_components, get_component, check_markup.
 */
export const prerender = false

const PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05']
const MAX_MARKUP_LENGTH = 200_000
const MAX_RESULTS = 20

type Category = (typeof COMPONENT_CATEGORIES)[number]

type Entry = {
  category: Category
  slug: string
  title: string
  description: string
  terms: string[]
  components: { title: string; description?: string; dark?: boolean; plugins?: string[] }[]
}

const darkConfig = normalizeConfig(darkRules)

let entries: Promise<Entry[]> | null = null

function getEntries(): Promise<Entry[]> {
  entries ??= Promise.all(
    COMPONENT_CATEGORIES.map(async (category) =>
      (await getCollection(category)).map(({ data }) => ({
        category,
        slug: data.slug,
        title: data.title,
        description: data.description,
        terms: data.terms ?? [],
        components: data.components,
      })),
    ),
  ).then((groups) => groups.flat() as Entry[])

  return entries
}

const TOOLS = [
  {
    name: 'list_categories',
    description:
      'List HyperUI component categories (application, marketing, neobrutalism, templates) and how many component groups each has.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'search_components',
    description:
      'Search free Tailwind CSS v4 components by keyword, such as "pricing", "sidebar" or "file upload". Returns group slugs and how many variants each has. Use get_component to fetch the HTML.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keywords to look for.' },
        category: { type: 'string', enum: [...COMPONENT_CATEGORIES] },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_component',
    description:
      'Get the HTML of a component. Without `variant` it returns every variant in the group. Set `dark` for the dark mode version where one exists.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', enum: [...COMPONENT_CATEGORIES] },
        slug: { type: 'string', description: 'For example "pricing" or "accordions".' },
        variant: { type: 'integer', minimum: 1, description: 'Variant number, from 1.' },
        dark: { type: 'boolean' },
      },
      required: ['category', 'slug'],
    },
  },
  {
    name: 'check_markup',
    description:
      'Check Tailwind CSS HTML against the rules HyperUI components pass: focus outlines, SVG icons, right-to-left (logical utilities) and dark mode. Returns findings with lines, a prompt listing them, and the fixed HTML.',
    inputSchema: {
      type: 'object',
      properties: { html: { type: 'string', description: 'The markup to check.' } },
      required: ['html'],
    },
  },
]

const text = (value: string, isError = false) => ({
  content: [{ type: 'text', text: value }],
  ...(isError ? { isError: true } : {}),
})

const asString = (value: unknown) => (typeof value === 'string' ? value : '')

async function callTool(name: string, args: Record<string, unknown>) {
  const all = await getEntries()

  if (name === 'list_categories') {
    return text(
      COMPONENT_CATEGORIES.map((category) => {
        const count = all.filter((entry) => entry.category === category).length

        return `- ${category}: ${count} groups (${SITE_URL}/components/${category})`
      }).join('\n'),
    )
  }

  if (name === 'search_components') {
    const words = asString(args.query).toLowerCase().split(/\s+/).filter(Boolean)
    const category = asString(args.category)

    if (words.length === 0) {
      return text('Give a `query`.', true)
    }

    const results = all
      .filter((entry) => !category || entry.category === category)
      .map((entry) => {
        const haystack = {
          title: `${entry.title} ${entry.slug}`.toLowerCase(),
          terms: entry.terms.join(' ').toLowerCase(),
          description: entry.description.toLowerCase(),
          variants: entry.components
            .map((component) => component.title)
            .join(' ')
            .toLowerCase(),
        }
        const score = words.reduce(
          (total, word) =>
            total +
            (haystack.title.includes(word) ? 4 : 0) +
            (haystack.terms.includes(word) ? 2 : 0) +
            (haystack.variants.includes(word) ? 1 : 0) +
            (haystack.description.includes(word) ? 1 : 0),
          0,
        )

        return { entry, score }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
      .slice(0, MAX_RESULTS)

    return text(
      results.length === 0
        ? 'No matches. Try list_categories or a broader keyword.'
        : results
            .map(
              ({ entry }) =>
                `- ${entry.category}/${entry.slug}: ${entry.title}, ${entry.components.length} variants. ${entry.description}`,
            )
            .join('\n'),
    )
  }

  if (name === 'get_component') {
    const entry = all.find(
      (candidate) =>
        candidate.category === asString(args.category) && candidate.slug === asString(args.slug),
    )

    if (!entry) {
      return text('No such component. Use search_components to find the slug.', true)
    }

    const wanted = typeof args.variant === 'number' ? Math.trunc(args.variant) : null

    if (wanted !== null && (wanted < 1 || wanted > entry.components.length)) {
      return text(`${entry.slug} has variants 1 to ${entry.components.length}.`, true)
    }

    const dark = args.dark === true
    const sections = entry.components.flatMap((component, index) => {
      const number = index + 1

      if (wanted !== null && wanted !== number) {
        return []
      }

      const useDark = dark && component.dark
      const file = `/examples/${entry.category}/${entry.slug}/${number}${useDark ? '-dark' : ''}.html`
      const markup = readComponentMarkup(file)

      if (!markup) {
        return []
      }

      const notes = [
        dark && !component.dark ? 'No dark version, showing light.' : '',
        component.plugins?.length ? `Requires: ${component.plugins.join(', ')}` : '',
      ].filter(Boolean)

      return [[`## ${number}. ${component.title}`, ...notes, '```html', markup, '```'].join('\n')]
    })

    return text(
      [
        `# ${entry.title} (${SITE_URL}/components/${entry.category}/${entry.slug})`,
        'Tailwind CSS v4, plain HTML. Keep the aria attributes, logical utilities and `dark:` classes when adapting.',
        ...sections,
      ].join('\n\n'),
    )
  }

  if (name === 'check_markup') {
    const html = asString(args.html)

    if (!html) {
      return text('Give some `html`.', true)
    }

    if (html.length > MAX_MARKUP_LENGTH) {
      return text('That markup is too large to check. Send up to about 200 KB.', true)
    }

    const { findings } = checkMarkup(html, darkConfig)

    return text(
      JSON.stringify(
        {
          findings: findings.map(({ group, rule, line, message, why, snippet }) => ({
            group,
            rule,
            line,
            message,
            why,
            snippet,
          })),
          prompt: findingsForAi(findings),
          fixedHtml: applyFixes(
            html,
            findings.map(({ fix }) => fix),
          ),
        },
        null,
        2,
      ),
    )
  }

  return null
}

type Message = { jsonrpc?: string; id?: string | number | null; method?: string; params?: unknown }

async function handle(message: Message) {
  const { id, method } = message
  const params = (message.params ?? {}) as Record<string, unknown>

  // Notifications and responses have no `id` to answer.
  if (id === undefined || typeof method !== 'string') {
    return null
  }

  const reply = (result: unknown) => ({ jsonrpc: '2.0', id, result })
  const fail = (code: number, errorMessage: string) => ({
    jsonrpc: '2.0',
    id,
    error: { code, message: errorMessage },
  })

  if (method === 'initialize') {
    const requested = asString(params.protocolVersion)

    return reply({
      protocolVersion: PROTOCOL_VERSIONS.includes(requested) ? requested : PROTOCOL_VERSIONS[0],
      capabilities: { tools: {} },
      serverInfo: { name: 'hyperui', version: '1.0.0' },
      instructions: `Free Tailwind CSS v4 components from ${SITE_URL}. Search with search_components, fetch with get_component, and run check_markup on generated HTML.`,
    })
  }

  if (method === 'ping') {
    return reply({})
  }

  if (method === 'tools/list') {
    return reply({ tools: TOOLS })
  }

  if (method === 'tools/call') {
    const args = (params.arguments ?? {}) as Record<string, unknown>
    const result = await callTool(asString(params.name), args)

    return result ? reply(result) : fail(-32602, `Unknown tool: ${asString(params.name)}`)
  }

  return fail(-32601, `Method not found: ${method}`)
}

const JSON_HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }

export const POST: APIRoute = async ({ request }) => {
  const raw = await request.text()

  if (raw.length > MAX_MARKUP_LENGTH * 2) {
    return new Response(null, { status: 413 })
  }

  let body: unknown

  try {
    body = JSON.parse(raw)
  } catch {
    return Response.json(
      { jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } },
      { status: 400, headers: JSON_HEADERS },
    )
  }

  const messages = (Array.isArray(body) ? body : [body]) as Message[]
  const replies = (await Promise.all(messages.map((message) => handle(message ?? {})))).filter(
    Boolean,
  )

  if (replies.length === 0) {
    return new Response(null, { status: 202, headers: { 'Access-Control-Allow-Origin': '*' } })
  }

  return Response.json(Array.isArray(body) ? replies : replies[0], { headers: JSON_HEADERS })
}

// Stateless: there is no server-to-client stream to open.
export const GET: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: 'POST, OPTIONS' } })

export const OPTIONS: APIRoute = () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Protocol-Version',
    },
  })
