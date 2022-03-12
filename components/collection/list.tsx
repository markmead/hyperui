import { FunctionComponent } from 'react'

import { Component } from '../../interface/component'

import Example from '../component/example'

type Props = {
  name: string
  items: Array<Component>
  spacing: string
}

const List: FunctionComponent<Props> = ({ name, items, spacing }) => {
  return (
    <div className="xl:max-w-[1348px] xl:-ml-[34px] xl:w-screen not-prose mt-24">
      <ul className="space-y-16">
        {items.map((item) => (
          <li key={item.id}>
            <Example name={name} item={item} spacing={spacing} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
