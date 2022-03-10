import { FunctionComponent } from 'react'
import { Component } from '../interface/component'
import Example from './example'

type Props = {
  list: Array<Component>
}

const List: FunctionComponent<Props> = ({ list }) => {
  return (
    <section>
      <ul>
        {list.map((component) => (
          <li key={component.id}>
            <Example id={component.id} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default List
