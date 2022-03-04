import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Collection } from '../../interface/collection'

type Props = {
  collection: Collection
}

const Card: FunctionComponent<Props> = ({ collection }) => {
  let { count, emoji, id, title } = collection

  return (
    <Link href={`/components/${id}`}>
      <a className="p-6 border-2 border-black hover:bg-black rounded-xl hover:text-white">
        <span className="text-xl" role="img">
          {emoji}
        </span>

        <h2 className="mt-4 text-lg font-medium">{title}</h2>

        <p className="mt-1 text-xs">
          {count} {count > 1 ? ' components' : ' component'}
        </p>
      </a>
    </Link>
  )
}

export default Card
