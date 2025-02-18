'use client'

import { ComponentItem } from '@type/component'
import ComponentPreview from '@component/ComponentPreview'

interface ComponentData extends ComponentItem {
  id: string
  slug: string
  category: string
}

interface Props {
  componentsData: ComponentData[]
  componentContainer: {
    previewInner: string
    previewHeight: string
  }
}

export default function CollectionList({ componentsData, componentContainer }: Props) {
  return (
    <div className="not-prose mx-auto xl:max-w-[1348px]">
      <ul className="space-y-8 lg:space-y-12">
        {componentsData.map((componentData) => (
          <li key={componentData.slug}>
            <ComponentPreview
              componentData={componentData}
              componentContainer={componentContainer}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
