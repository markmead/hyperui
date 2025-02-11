'use client'

import { iComponentItem } from '@type/component'

import ComponentPreview from '@component/ComponentPreview'

interface iComponentData extends iComponentItem {
  id: string
  slug: string
  category: string
}

interface iProps {
  componentsData: iComponentData[]
  componentContainer: {
    previewInner: string
    previewHeight: string
  }
}

export default function CollectionList({ componentsData, componentContainer }: iProps) {
  return (
    <div className="not-prose mx-auto xl:max-w-[1348px]">
      <ul className="space-y-8 lg:space-y-12">
        {componentsData.map((componentData, componentIndex) => (
          <li key={componentIndex}>
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
