interface Core {
  emoji: string
  title: string
  slug: string
  date: Date
}

export interface BlogCard extends Core {}

export interface BlogFrontmatter extends Core {
  description: string
}

export interface BlogPost extends BlogFrontmatter {
  content: string
}
