export interface Component {
  id: number
  spacing?: string
}

export interface ComponentGroup {
  id: string
  components: Array<Component>
  spacing?: string
}
