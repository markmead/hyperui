import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Collection } from '../interface/collection'

type Props = {
  collection: Collection
}

const Card: FunctionComponent<Props> = ({ collection }) => {
  let { id, title, count } = collection

  return (
    <Link href={`collections/${id}`}>
      <a className="p-8 border-2 border-black">
        <p>{count}</p>
        <h2>{title}</h2>
      </a>
    </Link>
  )
}

export default Card
