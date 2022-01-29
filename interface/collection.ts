import { Component } from './component'

export interface Collection {
  id: string
  title: string
  count: number
  emoji: string
  spacing?: string
  height?: string
  components: Array<Component>
  ecommerce?: boolean
}
