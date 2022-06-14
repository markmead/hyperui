import { Collection } from './collection'

export interface Category {
  title: string
  slug: string
  children: Array<Collection>
  collections: string[]
}
