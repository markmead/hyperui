import { ComponentCard } from './component'

export interface Collection {
  title: string
  slug: string
  children: Array<ComponentCard>
  components: string[]
  description?: string
}
