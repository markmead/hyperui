export interface SearchItem {
  title: string
  description?: string | undefined
  terms?: string[] | undefined
  variants?: string[] | undefined
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replaceAll(/[̀-ͯ]/g, '')
    .replaceAll(/[^a-z0-9]+/g, ' ')
    .trim()

// "card" and "cards" are the same word to someone searching.
const stem = (word: string) => (word.length > 3 && /[^s]s$/.test(word) ? word.slice(0, -1) : word)

const tokenize = (text: string) =>
  normalize(text)
    .split(' ')
    .filter(Boolean)
    .map((word) => stem(word))

type Field = 'title' | 'terms' | 'variants' | 'description'

// What a token is worth in each field, as an exact word or as the start of one.
const WORD_SCORES: Record<Field, { exact: number; prefix: number }> = {
  title: { exact: 30, prefix: 20 },
  terms: { exact: 12, prefix: 8 },
  variants: { exact: 4, prefix: 2 },
  description: { exact: 3, prefix: 1 },
}

const MIN_DESCRIPTION_PREFIX_LENGTH = 3

function scoreToken(token: string, fields: Record<Field, string[]>): number {
  let score = 0

  for (const field of Object.keys(WORD_SCORES) as Field[]) {
    const words = fields[field]
    const { exact, prefix } = WORD_SCORES[field]

    if (words.includes(token)) {
      score += exact

      continue
    }

    const canPrefix = field !== 'description' || token.length >= MIN_DESCRIPTION_PREFIX_LENGTH

    if (canPrefix && words.some((word) => word.startsWith(token))) {
      score += prefix

      continue
    }

    // "bar" inside "sidebar", for a title only.
    if (field === 'title' && token.length >= 3 && words.some((word) => word.includes(token))) {
      score += 8
    }
  }

  return score
}

/**
 * How well an item matches a query, or 0 when it doesn't. Every word in the
 * query has to match somewhere. The title counts most, so "product" puts
 * "Product Cards" ahead of anything that only mentions products.
 */
export function scoreItem(item: SearchItem, query: string): number {
  const queryTokens = tokenize(query)

  if (queryTokens.length === 0) {
    return 0
  }

  const titleTokens = tokenize(item.title)

  const fields: Record<Field, string[]> = {
    title: titleTokens,
    terms: (item.terms ?? []).flatMap((term) => tokenize(term)),
    variants: (item.variants ?? []).flatMap((variant) => tokenize(variant)),
    description: tokenize(item.description ?? ''),
  }

  let score = 0

  for (const token of queryTokens) {
    const tokenScore = scoreToken(token, fields)

    if (tokenScore === 0) {
      return 0
    }

    score += tokenScore
  }

  const queryPhrase = queryTokens.join(' ')
  const titlePhrase = titleTokens.join(' ')

  if (titlePhrase === queryPhrase) {
    score += 100
  } else if (titlePhrase.startsWith(queryPhrase)) {
    score += 40
  } else if (` ${titlePhrase} `.includes(` ${queryPhrase} `)) {
    score += 20
  }

  // Of two equal matches, the more focused title wins.
  return score - titleTokens.length * 0.5
}

export function searchItems<T extends SearchItem>(items: T[], query: string, limit = 10): T[] {
  return items
    .map((item) => ({ item, score: scoreItem(item, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map(({ item }) => item)
}
