import { CollectionItem } from '@type/component'
import CollectionCard from '@component/CollectionCard'

interface CollectionData
  extends Omit<CollectionItem, 'container' | 'wrapper' | 'seo' | 'components'> {
  slug: string
  count: number
}

interface Props {
  componentItems: CollectionData[]
}

export default function CollectionGrid({ componentItems }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {componentItems.map((componentData) => (
        <li key={componentData.slug}>
          <CollectionCard componentData={componentData} />
        </li>
      ))}
    </ul>
  )
}
