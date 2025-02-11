import CollectionCard from '@component/CollectionCard'

import { iCollectionItem } from '@type/component'

interface iCollectionData
  extends Omit<iCollectionItem, 'container' | 'wrapper' | 'seo' | 'components'> {
  slug: string
  count: number
}

interface iProps {
  componentItems: iCollectionData[]
}

export default function CollectionGrid({ componentItems }: iProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {componentItems.map((componentData, componentIndex) => (
        <li key={componentIndex}>
          <CollectionCard componentData={componentData} />
        </li>
      ))}
    </ul>
  )
}
