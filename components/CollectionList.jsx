'use client'

import ComponentPreview from '@component/ComponentPreview'

function CollectionList({ componentsData, componentContainer }) {
  return (
    <div className="not-prose mx-auto xl:max-w-[1348px]">
      <ul className="space-y-16">
        {componentsData.map((componentData) => (
          <li key={componentData.id}>
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

export default CollectionList
