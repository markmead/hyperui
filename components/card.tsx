import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Collection } from '../interface/collection'

type Props = {
  collection: Collection
}

const Card: FunctionComponent<Props> = ({ collection }) => {
  let { id, title, count } = collection

  return (
    <Link href={`/components/${id}`}>
      <a className="p-8 border-2 border-black rounded-lg hover:opacity-75">
        <p className="text-sm">{count} Components</p>
        <h2 className="mt-1 text-lg font-medium">{title}</h2>
      </a>
    </Link>
  )
}

export default Card
