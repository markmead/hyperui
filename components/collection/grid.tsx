import type { FunctionComponent } from 'react'

import { Collection } from '../../interface/collection'

import Card from './card'

type Props = {
  blocks: Array<Collection>
  className: string
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
