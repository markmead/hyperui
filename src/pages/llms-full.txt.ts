import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

const CONTENT_CATEGORIES = ['application', 'marketing', 'neobrutalism'] as const

const categoryTitles = {
  application: 'Application',
  marketing: 'Marketing',
  neobrutalism: 'Neobrutalism',
} as const satisfies Record<(typeof CONTENT_CATEGORIES)[number], string>

const DEFAULT_COMPONENT_DESCRIPTION = 'Tailwind CSS component example.'

const SECTION_SEPARATOR = '=== HYPERUI SECTION ==='
const COMPONENT_SEPARATOR = '=== HYPERUI COMPONENT ==='

const componentSourceByPath = import.meta.glob<string>('../../public/examples/**/*.html', {
  query: '?raw',
  import: 'default',
})

function getComponentSourcePath(
  componentCategory: string,
  componentSlug: string,
  componentIndex: number,
  isDarkVariant: boolean,
) {
  const componentFilename = isDarkVariant ? `${componentIndex}-dark.html` : `${componentIndex}.html`

  return `../../public/examples/${componentCategory}/${componentSlug}/${componentFilename}`
}

function cleanBlogBody(blogBody: string) {
  const bodyLines = blogBody.split('\n')
  const cleanedLines: string[] = []

  let inCodeFence = false

  for (const bodyLine of bodyLines) {
    const trimmedLine = bodyLine.trim()

    // Respect fenced blocks so valid code samples are not modified.
    if (trimmedLine.startsWith('```') || trimmedLine.startsWith('~~~')) {
      inCodeFence = !inCodeFence

      cleanedLines.push(bodyLine)

      continue
    }

    if (!inCodeFence) {
      const isMdxImport = /^\s*import\s+[\w*\s{},]+\s+from\s+['"][^'"]+['"]\s*;?\s*$/.test(bodyLine)
      const isBaseAdTag = /^\s*<BaseAd(?:\s[^>]*)?\/>\s*$/.test(bodyLine)

      if (isMdxImport || isBaseAdTag) {
        continue
      }
    }

    cleanedLines.push(bodyLine)
  }

  return cleanedLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function normalizeSnippetIndentation(snippetSource: string) {
  const snippetLines = snippetSource.split('\n')
  const nonEmptySnippetLines = snippetLines.filter((snippetLine) => snippetLine.trim().length > 0)

  if (nonEmptySnippetLines.length === 0) {
    return snippetSource.trim()
  }

  const minimumIndent = nonEmptySnippetLines.reduce((smallestIndent, snippetLine) => {
    const leadingIndentMatch = snippetLine.match(/^\s*/)
    const indentLength = leadingIndentMatch ? leadingIndentMatch[0].length : 0

    return Math.min(smallestIndent, indentLength)
  }, Number.POSITIVE_INFINITY)

  if (!Number.isFinite(minimumIndent) || minimumIndent <= 0) {
    return snippetSource.trim()
  }

  return snippetLines
    .map((snippetLine) => {
      if (snippetLine.trim().length === 0) {
        return ''
      }

      return snippetLine.slice(minimumIndent)
    })
    .join('\n')
    .trim()
}

function extractBodyContent(snippetSource: string) {
  const bodyMatch = snippetSource.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)

  if (!bodyMatch || typeof bodyMatch[1] !== 'string') {
    return normalizeSnippetIndentation(snippetSource)
  }

  return normalizeSnippetIndentation(bodyMatch[1])
}

async function getComponentSource(
  componentCategory: string,
  componentSlug: string,
  componentIndex: number,
  isDarkVariant: boolean,
) {
  const componentSourcePath = getComponentSourcePath(
    componentCategory,
    componentSlug,
    componentIndex,
    isDarkVariant,
  )
  const sourceLoader = componentSourceByPath[componentSourcePath]

  if (typeof sourceLoader !== 'function') {
    return `<!-- Source unavailable: ${componentSourcePath} -->`
  }

  const componentSource = await sourceLoader()

  return extractBodyContent(componentSource)
}

export const prerender = true

export const GET: APIRoute = async () => {
  const contentSections: string[] = []

  contentSections.push('# HyperUI - llms-full')
  contentSections.push('')
  contentSections.push('## Metadata')
  contentSections.push(`- Name: ${SITE_TITLE}`)
  contentSections.push(`- Description: ${SITE_DESCRIPTION}`)
  contentSections.push('- Site: https://hyperui.dev')
  contentSections.push('- Type: Open-source Tailwind CSS v4 component library')
  contentSections.push('')
  contentSections.push(SECTION_SEPARATOR)
  contentSections.push('')
  contentSections.push('## Components')

  for (const contentCategory of CONTENT_CATEGORIES) {
    const categoryEntries = await getCollection(contentCategory)

    contentSections.push('')
    contentSections.push(`### ${categoryTitles[contentCategory]}`)

    for (const categoryEntry of [...categoryEntries].sort((firstEntry, secondEntry) =>
      firstEntry.data.title.localeCompare(secondEntry.data.title),
    )) {
      contentSections.push('')
      contentSections.push(`#### ${categoryEntry.data.title}`)
      contentSections.push(categoryEntry.data.description)

      const componentBlocks = await Promise.all(
        categoryEntry.data.components.map(async (componentItem, componentIndex) => {
          const componentNumber = componentIndex + 1
          const componentDescription = componentItem.description ?? DEFAULT_COMPONENT_DESCRIPTION
          const defaultSourcePath = getComponentSourcePath(
            contentCategory,
            categoryEntry.data.slug,
            componentNumber,
            false,
          )

          const blockLines: string[] = []

          blockLines.push('')
          blockLines.push(COMPONENT_SEPARATOR)
          blockLines.push(`##### Component ${componentNumber}: ${componentItem.title}`)
          blockLines.push(`- Category: ${categoryTitles[contentCategory]}`)
          blockLines.push(`- Slug: ${categoryEntry.data.slug}`)
          blockLines.push(`- Variant: default`)
          blockLines.push(`- Source: ${defaultSourcePath}`)
          blockLines.push(componentDescription)
          blockLines.push('~~~')
          blockLines.push(
            await getComponentSource(
              contentCategory,
              categoryEntry.data.slug,
              componentNumber,
              false,
            ),
          )
          blockLines.push('~~~')

          if (componentItem.dark) {
            blockLines.push('')
            blockLines.push(COMPONENT_SEPARATOR)
            blockLines.push(`##### Component ${componentNumber} (Dark): ${componentItem.title}`)
            blockLines.push(`- Category: ${categoryTitles[contentCategory]}`)
            blockLines.push(`- Slug: ${categoryEntry.data.slug}`)
            blockLines.push(`- Variant: dark`)
            blockLines.push(
              `- Source: ${getComponentSourcePath(contentCategory, categoryEntry.data.slug, componentNumber, true)}`,
            )
            blockLines.push(componentDescription)
            blockLines.push('~~~')
            blockLines.push(
              await getComponentSource(
                contentCategory,
                categoryEntry.data.slug,
                componentNumber,
                true,
              ),
            )
            blockLines.push('~~~')
          }

          return blockLines
        }),
      )

      for (const blockLines of componentBlocks) {
        contentSections.push(...blockLines)
      }
    }
  }

  const blogPosts = (await getCollection('blog')).sort(
    (leftPost, rightPost) =>
      rightPost.data.updatedDate.valueOf() - leftPost.data.updatedDate.valueOf(),
  )

  contentSections.push('')
  contentSections.push(SECTION_SEPARATOR)
  contentSections.push('')
  contentSections.push('## Blog')

  for (const blogPost of blogPosts) {
    contentSections.push('')
    contentSections.push(`### ${blogPost.data.title}`)
    contentSections.push(`- Slug: ${blogPost.data.slug}`)
    contentSections.push(`- Published: ${blogPost.data.pubDate.toISOString().slice(0, 10)}`)
    contentSections.push(`- Updated: ${blogPost.data.updatedDate.toISOString().slice(0, 10)}`)
    contentSections.push(`- Description: ${blogPost.data.description}`)
    contentSections.push('')
    contentSections.push(cleanBlogBody(blogPost.body ?? ''))
  }

  return new Response(contentSections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
