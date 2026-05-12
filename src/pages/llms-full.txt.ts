import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

const categoryTitles = {
  application: 'Application',
  marketing: 'Marketing',
  neobrutalism: 'Neobrutalism',
} as const

const componentSourceByPath = import.meta.glob('../../public/examples/**/*.html', {
  query: '?raw',
  import: 'default',
})

function cleanBlogBody(body: string) {
  return body
    .replace(/^import\s+.*$/gm, '')
    .replace(/^<BaseAd\s*\/>\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

async function getComponentSource(category: string, slug: string, index: number, dark: boolean) {
  const filename = dark ? `${index}-dark.html` : `${index}.html`
  const path = `../../public/examples/${category}/${slug}/${filename}`
  const getSource = componentSourceByPath[path]

  if (!getSource) {
    return '<!-- Source unavailable -->'
  }

  return getSource() as Promise<string>
}

export const prerender = true

export const GET: APIRoute = async () => {
  const sections: string[] = []

  sections.push('# HyperUI - llms-full')
  sections.push('')
  sections.push('## Metadata')
  sections.push(`- Name: ${SITE_TITLE}`)
  sections.push(`- Description: ${SITE_DESCRIPTION}`)
  sections.push('- Site: https://hyperui.dev')
  sections.push('- Type: Open-source Tailwind CSS v4 component library')
  sections.push('')
  sections.push('---')
  sections.push('')
  sections.push('## Components')

  for (const category of ['application', 'marketing', 'neobrutalism'] as const) {
    const entries = await getCollection(category)

    sections.push('')
    sections.push(`### ${categoryTitles[category]}`)

    for (const entry of entries.sort((a, b) => a.data.title.localeCompare(b.data.title))) {
      sections.push('')
      sections.push(`#### ${entry.data.title}`)
      sections.push(entry.data.description)

      for (const [index, component] of entry.data.components.entries()) {
        const number = index + 1
        const componentDescription = component.description ?? 'Tailwind CSS component example.'

        sections.push('')
        sections.push(`##### Component ${number}: ${component.title}`)
        sections.push(componentDescription)
        sections.push('```html')
        sections.push(await getComponentSource(category, entry.data.slug, number, false))
        sections.push('```')

        if (component.dark) {
          sections.push('')
          sections.push(`##### Component ${number} (Dark): ${component.title}`)
          sections.push(componentDescription)
          sections.push('```html')
          sections.push(await getComponentSource(category, entry.data.slug, number, true))
          sections.push('```')
        }
      }
    }
  }

  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.updatedDate.valueOf() - a.data.updatedDate.valueOf(),
  )

  sections.push('')
  sections.push('---')
  sections.push('')
  sections.push('## Blog')

  for (const post of posts) {
    sections.push('')
    sections.push(`### ${post.data.title}`)
    sections.push(`- Slug: ${post.data.slug}`)
    sections.push(`- Published: ${post.data.pubDate.toISOString().slice(0, 10)}`)
    sections.push(`- Updated: ${post.data.updatedDate.toISOString().slice(0, 10)}`)
    sections.push(`- Description: ${post.data.description}`)
    sections.push('')
    sections.push(cleanBlogBody(post.body ?? ''))
  }

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
