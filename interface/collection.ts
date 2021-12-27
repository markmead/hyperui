import { Component } from './component'

export interface Collection {
  id: string
  title: string
  count: number
  spacing?: string
  components: Array<Component>
  ecommerce?: boolean
}
