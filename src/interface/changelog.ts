interface Core {
  title: string
  slug: string
  date: Date
}

export interface ChangelogCard extends Core {}

export interface ChangelogFrontmatter extends Core {
  description: string
}

export interface ChangelogPost extends ChangelogFrontmatter {
  content: string
}
