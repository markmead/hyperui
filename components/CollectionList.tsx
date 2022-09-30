import { FunctionComponent } from 'react'

import { Component } from '../interface/component'

import Example from './Preview'

type Props = {
  items: Array<Component>
  spacing: string
}

const List: FunctionComponent<Props> = ({ items, spacing }) => {
  return (
    <>
      <div className="xl:max-w-[1348px] not-prose mt-16 lg:mt-24">
        <ul className="space-y-16">
          {items.map((item) => (
            <li key={item.id}>
              <Example item={item} spacing={spacing} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default List
