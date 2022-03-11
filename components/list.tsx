import { FunctionComponent } from 'react'
import { Collection } from '../interface/collection'

import { Component } from '../interface/component'

import Example from './example'

type Props = {
  collection: Collection
  list: Array<Component>
  name: string
  spacing: Array<object> | string
}

const List: FunctionComponent<Props> = ({
  collection,
  list,
  name,
  spacing,
}) => {
  return (
    <div className="xl:max-w-[1348px] xl:-ml-[34px] xl:w-screen not-prose mt-24">
      <ul className="space-y-16">
        {list.map((component) => (
          <li key={component.id}>
            <Example
              id={component.id}
              collection={collection}
              name={name}
              title={component.title}
              spacing={spacing}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
