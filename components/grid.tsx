import type { FunctionComponent } from 'react'
import Card from './card'

type Props = {
  className: string
  blocks: Array<{ title: string; count: number }>
}

const Grid: FunctionComponent<Props> = ({ className, blocks }) => {
  return (
    <div className={`grid ${className}`}>
      {blocks.map((block, index) => (
        <Card title={block.title} count={block.count} key={index} />
      ))}
    </div>
  )
}

export default Grid
