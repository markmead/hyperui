export interface Component {
  id: number
  title: string
}

export interface ComponentGroup {
  id: string
  components: Array<Component>
}
