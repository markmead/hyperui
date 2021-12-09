export interface Component {
  id: number
  center?: boolean
  height?: string
  spacing?: string
}

export interface ComponentGroup {
  id: string
  components: Array<Component>
  center?: boolean
  height?: string
  spacing?: string
}
