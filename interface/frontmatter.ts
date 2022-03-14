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
  height?: string
  seo: SEO
  components: Components
}
