import type { FunctionComponent } from 'react'

import { ComponentCard } from '../../interface/component'

import Card from './card'

type Props = {
  items: Array<ComponentCard>
}

const Grid: FunctionComponent<Props> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <Card item={item} key={item.slug} />
      ))}
    </div>
  )
}

export default Grid
