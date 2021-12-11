export interface Component {
  id: number
  center?: boolean
  height?: string
  spacing?: string
}

export interface ComponentGroup {
  id: string
  center?: boolean
  height?: string
  spacing?: string
  components: Array<Component>
  ecommerce?: boolean
}
