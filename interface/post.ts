interface SEO {
  title: string
  description: string
}

export interface Post {
  title: string
  slug: string
  date: Date
  emoji: string
  seo: SEO
  content: string
}

export interface PostCard {
  title: string
  slug: string
  date: Date
  emoji: string
}
