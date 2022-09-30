interface Blog {
  emoji: string
  title: string
  slug: string
  date: Date
}

export interface BlogCard extends Blog {}

export interface BlogFrontmatter extends Blog {
  description: string
}

export interface BlogPost extends BlogFrontmatter {
  content: string
}
