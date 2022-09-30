import { Component } from '../interface/component'

import Preview from './Preview'

type Props = {
  componentsData: Array<Component>
  componentSpacing: string
}

function List({ componentsData, componentSpacing }: Props) {
  return (
    <div className="xl:max-w-[1348px] mx-auto not-prose mt-16 lg:mt-24">
      <ul className="space-y-16">
        {componentsData.map((componentData: Component) => (
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

export default List
