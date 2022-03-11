interface SEO {
  title: string
  description: string
}

interface Components {
  title: string
  spacing?: string
}

export interface FrontMatter {
  title: string
  emoji: string
  spacing: string
  seo: SEO
  components: Components
}
