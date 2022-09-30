import type { FunctionComponent } from 'react'

import { ComponentCard } from '../interface/component'

import Card from './ComponentCard'

type Props = {
  componentsData: Array<ComponentCard>
}

function CollectionGrid({ componentsData }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {componentsData.map((componentData: ComponentCard) => (
        <Card componentData={componentData} key={componentData.slug} />
      ))}
    </div>
  )
}

export default CollectionGrid
