interface Core {
  title: string
  slug: string
}

export interface ComponentCard extends Core {
  emoji: string
  count: number
  category: string
}

export interface Component extends Core {
  spacing?: string
  creator?: string
  variants?: Array<ComponentVariant>
}

export interface ComponentVariant {
  id: string
  title: string
  spacing?: string
}
