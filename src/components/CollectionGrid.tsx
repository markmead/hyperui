import { Category } from '@/interface/category'
import { ComponentCard } from '@/interface/component'

import Card from '@/components/ComponentCard'

type Props = {
  componentsData: Array<ComponentCard>
  categoryDetail: Category
}

function CollectionGrid({ componentsData, categoryDetail }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {componentsData.map((componentData: ComponentCard) => (
        <Card
          componentData={componentData}
          categoryTitle={categoryDetail.title}
          key={componentData.slug}
        />
      ))}
    </div>
  )
}

export default CollectionGrid
