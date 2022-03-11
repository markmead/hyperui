export interface Component {
  id?: string
  title: string
  spacing?: string
}

export interface ComponentPage {
  title: string
  slug: string
  emoji?: string
  spacing?: string
  components?: Array<Component>
}
