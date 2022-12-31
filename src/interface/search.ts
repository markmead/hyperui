export interface SearchResult {
  id: string
  slug: string
  name: string
  category: SearchResultCategory
}

export interface SearchResultCategory {
  slug: string
  title: string
  emoji: string
}
