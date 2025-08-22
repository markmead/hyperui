'use client'

import ComponentPreview from '@component/ComponentPreview'

export default function CollectionList({ componentsData }) {
  return (
    <div className="not-prose mx-auto mt-8 lg:mt-12 xl:max-w-[1348px]">
      <ul className="space-y-8 lg:space-y-12">
        {componentsData.map((componentData) => (
          <li key={componentData.key}>
            <ComponentPreview componentData={componentData} />
          </li>
        ))}
      </ul>
    </div>
  )
}
