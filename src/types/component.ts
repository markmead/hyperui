export interface iComponentItem {
  title: string
  container?: string
  creator?: string
  dark?: boolean
  interactive?: boolean
}

export interface iCategoryItem {
  title: string
  subtitle: string
  description: string
  emoji: string
}

export interface iCollectionItem {
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
  components: iComponentItem[]
}
