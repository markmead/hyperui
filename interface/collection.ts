import { Component } from './component'

export interface Collection {
  components: Array<Component>
  count: number
  description?: string
  ecommerce?: boolean
  emoji: string
  id: string
  spacing?: string
  title: string
}
