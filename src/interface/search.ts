export interface SearchResult {
  id: string
  slug: string
  name: string
  category: SearchResultCategory
}

interface SearchResultCategory {
  slug: string
  title: string
}
