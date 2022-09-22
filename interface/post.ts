export interface PostCard {
  emoji: string
  title: string
  slug: string
  date: Date
}

export interface PostFrontmatter {
  emoji: string
  title: string
  description: string
  slug: string
  date: Date
}

export interface Post extends PostFrontmatter {
  content: string
}
