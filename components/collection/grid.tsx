import type { FunctionComponent } from 'react'

import { Collection } from '../../interface/collection'

import Card from '../card'

type Props = {
  blocks: Array<any>
  className: string
}

const Grid: FunctionComponent<Props> = ({ className, blocks }) => {
  return (
    <div className={`grid ${className}`}>
      {blocks.map((block, index) => (
        <Card title={block.title} slug={block.slug} key={index} />
      ))}
    </div>
  )
}

export default Grid
