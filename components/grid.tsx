import type { FunctionComponent } from 'react'
import { Collection } from '../interface/collection'

import Card from './card'

type Props = {
  className: string
  blocks: Array<Collection>
}

const Grid: FunctionComponent<Props> = ({ className, blocks }) => {
  return (
    <div className={`grid ${className}`}>
      {blocks.map((block, index) => (
        <Card collection={block} key={index} />
      ))}
    </div>
  )
}

export default Grid
