import type { FunctionComponent } from 'react'

type Props = {
  title: string
  count: number
}

const Card: FunctionComponent<Props> = ({ title, count }) => {
  return (
    <div className="p-8 border-2 border-black">
      <p>{count}</p>
      <h2>{title}</h2>
    </div>
  )
}

export default Card
