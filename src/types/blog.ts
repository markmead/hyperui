export interface iBlogSchema {
  '@context': string
  '@type': string
  headline: string
  image: string
  datePublished: string
}

export interface iBlogItem {
  title: string
  slug: string
  emoji: string
  date: string
  tag?: string
  description?: string
}
