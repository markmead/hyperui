import type { FunctionComponent } from 'react'

import Card from '../card'

type Props = {
  items: Array<any>
}

const Grid: FunctionComponent<Props> = ({ items }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      {items.map((item) => (
        <Card item={item} key={item.slug} />
      ))}
    </div>
  )
}

export default Grid
