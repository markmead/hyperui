import { SEO } from './seo'

export interface PostCard {
  emoji: string
  title: string
  slug: string
  date: Date
}

export interface PostFrontmatter {
  emoji: string
  title: string
  slug: string
  date: Date
  seo: SEO
}

export interface Post extends PostFrontmatter {
  content: string
}
