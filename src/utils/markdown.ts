import { getCollection, type CollectionEntry } from 'astro:content'

import {
  SEO_DESCRIPTION_APPLICATION_COMPONENTS,
  SEO_DESCRIPTION_BLOG,
  SEO_DESCRIPTION_MARKETING_COMPONENTS,
  SEO_DESCRIPTION_NEOBRUTALISM_COMPONENTS,
  SEO_DESCRIPTION_SITE,
  SEO_DESCRIPTION_TEMPLATES_COMPONENTS,
  SEO_DESCRIPTION_TOOLS,
  SEO_TITLE_APPLICATION_COMPONENTS,
  SEO_TITLE_BLOG,
  SEO_TITLE_MARKETING_COMPONENTS,
  SEO_TITLE_NEOBRUTALISM_COMPONENTS,
  SEO_TITLE_SITE,
  SEO_TITLE_TEMPLATES_COMPONENTS,
  SEO_TITLE_TOOLS,
} from '../constants/seo'

import { readComponentMarkup } from './componentMarkup'

export const SITE_URL = 'https://hyperui.dev'

export const COMPONENT_CATEGORIES = [
  'application',
  'marketing',
  'neobrutalism',
  'templates',
] as const

type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number]

type ComponentEntry = CollectionEntry<ComponentCategory>

const CATEGORY_META: Record<ComponentCategory, { title: string; description: string }> = {
  application: {
    title: SEO_TITLE_APPLICATION_COMPONENTS,
    description: SEO_DESCRIPTION_APPLICATION_COMPONENTS,
  },
  marketing: {
    title: SEO_TITLE_MARKETING_COMPONENTS,
    description: SEO_DESCRIPTION_MARKETING_COMPONENTS,
  },
  neobrutalism: {
    title: SEO_TITLE_NEOBRUTALISM_COMPONENTS,
    description: SEO_DESCRIPTION_NEOBRUTALISM_COMPONENTS,
  },
  templates: {
    title: SEO_TITLE_TEMPLATES_COMPONENTS,
    description: SEO_DESCRIPTION_TEMPLATES_COMPONENTS,
  },
}

function frontmatter(fields: Record<string, string>): string {
  const lines = Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`)

  return ['---', ...lines, '---'].join('\n')
}

function document(
  meta: { title: string; description: string; path: string },
  body: string[],
): string {
  return (
    [
      frontmatter({
        title: meta.title,
        description: meta.description,
        url: new URL(meta.path, SITE_URL).toString(),
      }),
      `# ${meta.title}`,
      meta.description,
      ...body,
    ]
      .filter(Boolean)
      .join('\n\n')
      .trim() + '\n'
  )
}

function codeFence(code: string, language = 'html'): string {
  const longestRun = Math.max(2, ...(code.match(/`+/g) ?? []).map((run) => run.length))
  const fence = '`'.repeat(longestRun + 1)

  return `${fence}${language}\n${code}\n${fence}`
}

function sortByTitle<T extends { data: { title: string } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => a.data.title.localeCompare(b.data.title))
}

async function getCategory(category: ComponentCategory): Promise<ComponentEntry[]> {
  return sortByTitle((await getCollection(category)) as ComponentEntry[])
}

export async function renderHomeMarkdown(): Promise<string> {
  const sections = await Promise.all(
    COMPONENT_CATEGORIES.map(async (category) => {
      const entries = await getCategory(category)
      const links = entries.map(
        ({ data }) =>
          `- [${data.title}](${SITE_URL}/components/${category}/${data.slug}): ${data.description}`,
      )

      return [
        `## ${CATEGORY_META[category].title}`,
        `${CATEGORY_META[category].description} See [all ${category} components](${SITE_URL}/components/${category}).`,
        links.join('\n'),
      ].join('\n\n')
    }),
  )

  return document({ title: SEO_TITLE_SITE, description: SEO_DESCRIPTION_SITE, path: '/' }, [
    'HyperUI is a collection of free, open source Tailwind CSS v4 components. Copy the HTML and paste it into your project; there is nothing to install.',
    ...sections,
    `## More`,
    [
      `- [Blog](${SITE_URL}/blog): ${SEO_DESCRIPTION_BLOG}`,
      `- [Tools](${SITE_URL}/tools): ${SEO_DESCRIPTION_TOOLS}`,
    ].join('\n'),
  ])
}

export async function renderCategoryMarkdown(category: ComponentCategory): Promise<string> {
  const entries = await getCategory(category)

  return document({ ...CATEGORY_META[category], path: `/components/${category}` }, [
    entries
      .map(
        ({ data }) =>
          `- [${data.title}](${SITE_URL}/components/${category}/${data.slug}) (${data.components.length} components): ${data.description}`,
      )
      .join('\n'),
  ])
}

export function renderComponentMarkdown(entry: ComponentEntry): string {
  const { category, slug, title, description, components, terms, updated } = entry.data
  const basePath = `/examples/${category}/${slug}`

  const sections = components.map((component, index) => {
    const number = index + 1
    const variants: { label: string; src: string }[] = [
      { label: 'Light', src: `${basePath}/${number}.html` },
    ]

    if (component.dark) {
      variants.push({ label: 'Dark', src: `${basePath}/${number}-dark.html` })
    }

    const blocks = variants.flatMap(({ label, src }) => {
      const markup = readComponentMarkup(src)

      if (!markup) {
        return []
      }

      return [
        variants.length > 1 ? `### ${component.title} (${label})` : '',
        codeFence(markup),
      ].filter(Boolean)
    })

    const details = [
      component.description,
      component.plugins?.length ? `Requires: ${component.plugins.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join('\n\n')

    return [`## ${number}. ${component.title}`, details, ...blocks].filter(Boolean).join('\n\n')
  })

  const meta = [
    `- Category: ${category}`,
    terms.length ? `- Keywords: ${terms.join(', ')}` : '',
    updated ? `- Updated: ${updated.date.toISOString().slice(0, 10)}` : '',
    '- Built with: Tailwind CSS v4 (plain HTML, copy and paste)',
  ]
    .filter(Boolean)
    .join('\n')

  return document(
    {
      title: `Tailwind CSS ${title}`,
      description,
      path: `/components/${category}/${slug}`,
    },
    [meta, ...sections],
  )
}

const COMPONENT_PREVIEW_PATTERN =
  /(?:<div\b[^>]*>\s*)?<ComponentPreview\b([^>]*?)\/>(?:\s*<\/div>)?/g

const JSX_SELF_CLOSING_PATTERN = /<[A-Z][\w.]*\b[^>]*\/>/g

const MDX_COMMENT_PATTERN = /\{\/\*[\s\S]*?\*\/\}/g

/**
 * Turn the MDX outside code fences into plain Markdown: drop ESM imports and
 * exports, replace `<ComponentPreview src="..." />` demos (and their wrapping
 * `<div>`) with the demo's HTML, and drop other JSX components and
 * `{/* *\/}` comments. Tags may span several lines.
 */
function cleanMdxProse(prose: string): string {
  return prose
    .replace(/^(?:import|export)\s.*$/gm, '')
    .replace(MDX_COMMENT_PATTERN, '')
    .replace(COMPONENT_PREVIEW_PATTERN, (_match, attributes: string) => {
      const src = attributes.match(/\bsrc=["']([^"']+)["']/)?.[1]
      const markup = src ? readComponentMarkup(src) : ''

      return markup ? codeFence(markup) : ''
    })
    .replace(JSX_SELF_CLOSING_PATTERN, '')
}

/**
 * Blog posts are MDX. Clean the prose between code fences and leave fenced
 * code untouched.
 */
function cleanMdxBody(body: string): string {
  const lines = body.split('\n')
  const segments: { fenced: boolean; text: string[] }[] = []
  let inFence = false

  for (const line of lines) {
    const isFenceLine = /^\s*(```|~~~)/.test(line)

    if (isFenceLine && !inFence) {
      inFence = true
      segments.push({ fenced: true, text: [line] })
      continue
    }

    const current = segments.at(-1)

    if (inFence && current) {
      current.text.push(line)

      if (isFenceLine) {
        inFence = false
      }

      continue
    }

    if (current && !current.fenced) {
      current.text.push(line)
    } else {
      segments.push({ fenced: false, text: [line] })
    }
  }

  return segments
    .map(({ fenced, text }) => (fenced ? text.join('\n') : cleanMdxProse(text.join('\n'))))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function renderBlogIndexMarkdown(): Promise<string> {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.updatedDate.valueOf() - a.data.updatedDate.valueOf(),
  )

  return document({ title: SEO_TITLE_BLOG, description: SEO_DESCRIPTION_BLOG, path: '/blog' }, [
    posts
      .map(
        ({ data }) =>
          `- [${data.title}](${SITE_URL}/blog/${data.slug}) (${data.updatedDate.toISOString().slice(0, 10)}): ${data.description}`,
      )
      .join('\n'),
  ])
}

export function renderBlogPostMarkdown(post: CollectionEntry<'blog'>): string {
  const { title, description, slug, pubDate, updatedDate } = post.data

  return document({ title, description, path: `/blog/${slug}` }, [
    `Published ${pubDate.toISOString().slice(0, 10)}, updated ${updatedDate.toISOString().slice(0, 10)}.`,
    cleanMdxBody(post.body ?? ''),
  ])
}

export async function renderToolsMarkdown(): Promise<string> {
  const tools = await getCollection('tools')

  return document({ title: SEO_TITLE_TOOLS, description: SEO_DESCRIPTION_TOOLS, path: '/tools' }, [
    tools
      .map(({ data }) => {
        const label = data.href ? `[${data.title}](${SITE_URL}${data.href})` : data.title
        const status = data.status === 'coming-soon' ? ' (coming soon)' : ''

        return `- ${label}${status}: ${data.description}`
      })
      .join('\n'),
  ])
}

export function renderToolMarkdown(tool: CollectionEntry<'tools'>): string {
  const { title, description, href } = tool.data

  return document({ title, description, path: href ?? '/tools' }, [
    `This is an interactive, browser-based tool. Open ${SITE_URL}${href} in a browser to use it.`,
  ])
}

export type MarkdownPage = {
  /** Page path without a leading slash, e.g. `components/application/accordions`. */
  path: string
  title: string
  description: string
  section: 'Home' | 'Components' | 'Blog' | 'Tools'
  markdown: string
}

/**
 * Every page that has a Markdown version, in a stable order. Used for the
 * `{path}.md` files, `llms.txt` and `llms-full.txt`.
 */
export async function getMarkdownPages(): Promise<MarkdownPage[]> {
  const pages: MarkdownPage[] = [
    {
      path: 'index',
      title: SEO_TITLE_SITE,
      description: SEO_DESCRIPTION_SITE,
      section: 'Home',
      markdown: await renderHomeMarkdown(),
    },
  ]

  for (const category of COMPONENT_CATEGORIES) {
    pages.push({
      path: `components/${category}`,
      ...CATEGORY_META[category],
      section: 'Components',
      markdown: await renderCategoryMarkdown(category),
    })

    for (const entry of await getCategory(category)) {
      pages.push({
        path: `components/${category}/${entry.data.slug}`,
        title: `Tailwind CSS ${entry.data.title}`,
        description: entry.data.description,
        section: 'Components',
        markdown: renderComponentMarkdown(entry),
      })
    }
  }

  pages.push({
    path: 'blog',
    title: SEO_TITLE_BLOG,
    description: SEO_DESCRIPTION_BLOG,
    section: 'Blog',
    markdown: await renderBlogIndexMarkdown(),
  })

  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.updatedDate.valueOf() - a.data.updatedDate.valueOf(),
  )

  for (const post of posts) {
    pages.push({
      path: `blog/${post.data.slug}`,
      title: post.data.title,
      description: post.data.description,
      section: 'Blog',
      markdown: renderBlogPostMarkdown(post),
    })
  }

  pages.push({
    path: 'tools',
    title: SEO_TITLE_TOOLS,
    description: SEO_DESCRIPTION_TOOLS,
    section: 'Tools',
    markdown: await renderToolsMarkdown(),
  })

  for (const tool of await getCollection('tools')) {
    if (!tool.data.href) {
      continue
    }

    pages.push({
      path: tool.data.href.replace(/^\//, ''),
      title: tool.data.title,
      description: tool.data.description,
      section: 'Tools',
      markdown: renderToolMarkdown(tool),
    })
  }

  return pages
}

const LLMS_SECTIONS: MarkdownPage['section'][] = ['Components', 'Blog', 'Tools']

/** https://llmstxt.org index: a short summary plus links to every `.md` page. */
export async function renderLlmsTxt(): Promise<string> {
  const pages = await getMarkdownPages()

  const sections = LLMS_SECTIONS.map((section) => {
    const links = pages
      .filter((page) => page.section === section)
      .map((page) => `- [${page.title}](${SITE_URL}/${page.path}.md): ${page.description}`)

    return [`## ${section}`, links.join('\n')].join('\n\n')
  })

  return (
    [
      '# HyperUI',
      `> ${SEO_DESCRIPTION_SITE}`,
      [
        'HyperUI is a collection of free, open source Tailwind CSS v4 components. Each component is plain HTML with Tailwind classes: copy it into your project, there is nothing to install. Many components have a dark mode variant.',
        `Every page on ${SITE_URL} has a Markdown version at the same path with \`.md\` appended (the home page is ${SITE_URL}/index.md). Component pages include the full HTML for every variant. ${SITE_URL}/llms-full.txt contains all of them in one file.`,
      ].join('\n\n'),
      ...sections,
      ['## Optional', `- [Home](${SITE_URL}/index.md): ${SEO_DESCRIPTION_SITE}`].join('\n\n'),
    ].join('\n\n') + '\n'
  )
}

/** Every Markdown page in one file, separated by horizontal rules. */
export async function renderLlmsFullTxt(): Promise<string> {
  const pages = await getMarkdownPages()

  const intro = [
    '# HyperUI',
    `> ${SEO_DESCRIPTION_SITE}`,
    `Every Markdown page from ${SITE_URL} in one file. See ${SITE_URL}/llms.txt for an index.`,
  ].join('\n\n')

  return [intro, ...pages.map((page) => page.markdown.trim())].join('\n\n---\n\n') + '\n'
}
