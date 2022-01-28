import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Collection } from '../interface/collection'

type Props = {
  collection: Collection
}

const Card: FunctionComponent<Props> = ({ collection }) => {
  let { id, title, count, emoji } = collection

  return (
    <Link href={`/components/${id}`}>
      <a className="p-6 transition-shadow border-2 border-black rounded-xl shadow-cartoon hover:shadow-none">
        <span role="img" className="text-xl">
          {emoji}
        </span>
        <h2 className="mt-4 text-lg font-medium">{title}</h2>
        <p className="mt-1 text-xs">
          {count}
          {count > 1 ? ' components' : ' component'}
        </p>
      </a>
    </Link>
  )
}

export default Card
