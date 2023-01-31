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
  container?: string
  creator?: string
  dark?: boolean
  interactive?: boolean
}
