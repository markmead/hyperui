interface Core {
  title: string
  slug: string
  date: Date
  description: string
}

export interface ChangelogCard extends Core {}

export interface ChangelogFrontmatter extends Core {}

export interface ChangelogPost extends Core {
  content: string
}
