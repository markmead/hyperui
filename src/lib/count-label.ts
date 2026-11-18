interface Countable {
  category: string
  components: { dark?: unknown }[]
}

/**
 * What a collection card says it holds. Templates are counted in pages, since
 * a template's dark file is the same page. Components count each light and
 * dark example.
 */
export function countLabel({ category, components }: Countable): string {
  if (category === 'templates') {
    return `${components.length} ${components.length === 1 ? 'page' : 'pages'}`
  }

  const count = components.length + components.filter(({ dark }) => !!dark).length

  return `${count} components`
}
