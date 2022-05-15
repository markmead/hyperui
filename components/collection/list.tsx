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
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Example name={name} item={item} spacing={spacing} />
        </li>
      ))}
    </ul>
  )
}

export default List
