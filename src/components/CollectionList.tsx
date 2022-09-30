import { Component } from '@/interface/component'

import Preview from '@/components/Preview'

type ComponentData = Component & {
  id: string
}

type Props = {
  componentsData: Array<ComponentData>
  componentSpacing: string
}

function CollectionList({ componentsData, componentSpacing }: Props) {
  return (
    <div className="not-prose mx-auto mt-16 lg:mt-24 xl:max-w-[1348px]">
      <ul className="space-y-16">
        {componentsData.map((componentData: ComponentData) => (
          <li key={componentData.id}>
            <Preview
              componentData={componentData}
              componentSpacing={componentSpacing}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CollectionList
