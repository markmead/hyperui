import type { FunctionComponent } from 'react'

import { ComponentCard } from '../../interface/component'

import Card from './card'

type Props = {
  items: Array<ComponentCard>
}

const Grid: FunctionComponent<Props> = ({ items }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <Card item={item} key={item.slug} />
      ))}
    </div>
  )
}

export default Grid
