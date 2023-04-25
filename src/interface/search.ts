export interface SearchResult {
  id: string
  slug: string
  name: string
  category: SearchResultCategory
  count?: number
}

export interface SearchResultCategory {
  slug: string
  title: string
  emoji: string
}
