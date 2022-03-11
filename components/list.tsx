import { FunctionComponent } from 'react'

import { Component } from '../interface/component'

import Example from './example'

type Props = {
  name: string
  items: Array<Component>
  spacing: Array<object>
}

const List: FunctionComponent<Props> = ({ name, items, spacing }) => {
  return (
    <div className="xl:max-w-[1348px] xl:-ml-[34px] xl:w-screen not-prose mt-24">
      <ul className="space-y-16">
        {items.map(({ id, title }) => (
          <li key={id}>
            <Example id={id} name={name} title={title} spacing={spacing} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
