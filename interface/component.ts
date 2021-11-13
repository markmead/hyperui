export interface Component {
  id: number
  title: string
  spacing?: string
}

export interface ComponentGroup {
  id: string
  components: Array<Component>
  spacing?: string
}
