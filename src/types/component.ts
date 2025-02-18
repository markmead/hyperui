export interface ComponentItem {
  title: string
  container?: string
  creator?: string
  dark?: boolean
  interactive?: boolean
}

export interface CategoryItem {
  title: string
  subtitle: string
  description: string
  emoji: string
}

export interface CollectionItem {
  title: string
  emoji: string
  category: string
  container: string
  wrapper: string
  tag: string
  seo: {
    title: string
    description: string
  }
  components: ComponentItem[]
}
