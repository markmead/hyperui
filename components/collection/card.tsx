import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Collection } from '../../interface/collection'

type Props = {
  collection: Collection
}

const Card: FunctionComponent<Props> = ({ collection }) => {
  let { count, emoji, id, name } = collection

  return (
    <Link href={`/components/${id}`}>
      <a className="p-6 border-2 border-black hover:bg-black rounded-xl hover:text-white">
        <span aria-hidden="true" className="text-xl" role="img">
          {emoji}
        </span>

        <p className="mt-4 text-lg font-medium">{name}</p>

        <p className="mt-1 text-xs">
          {count} {count > 1 ? ' components' : ' component'}
        </p>
      </a>
    </Link>
  )
}

export default Card
