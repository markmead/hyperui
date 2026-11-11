const SITE_URL = 'https://hyperui.dev'

type CopyForAiHeaderOptions = {
  collectionTitle: string
  componentTitle: string
  description?: string
  category: string
  slug: string
  anchorId: string
  dark: boolean
  plugins?: string[]
}

/**
 * Context placed above a component's HTML by the "Copy for AI" button, so an
 * AI assistant knows what the snippet is and what setup it relies on.
 */
export function buildCopyForAiHeader({
  collectionTitle,
  componentTitle,
  description,
  category,
  slug,
  anchorId,
  dark,
  plugins = [],
}: CopyForAiHeaderOptions): string {
  const setup = [
    'Plain HTML styled with Tailwind CSS v4 utility classes. No framework or JavaScript library is required.',
    'Form elements assume the `@tailwindcss/forms` plugin.',
  ]

  if (dark) {
    setup.push(
      'Dark mode uses a class-based `dark:` variant. In Tailwind CSS v4, add `@custom-variant dark (&:where(.dark, .dark *));` to your CSS and put the `dark` class on an ancestor such as `<html>`.',
    )
  }

  if (plugins.length) {
    setup.push(`Also requires: ${plugins.join(', ')}.`)
  }

  return [
    `# ${collectionTitle}: ${componentTitle}`,
    description ?? '',
    `Source: HyperUI (free, MIT licensed), ${SITE_URL}/components/${category}/${slug}#${anchorId}`,
    setup.map((line) => `- ${line}`).join('\n'),
  ]
    .filter(Boolean)
    .join('\n\n')
}
