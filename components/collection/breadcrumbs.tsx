import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Collection } from '../../interface/collection'

type Props = {
  collection: Collection
}

const Breadcrumbs: FunctionComponent<Props> = ({ collection }) => {
  return (
    <nav className="text-xs text-gray-500">
      <ol className="flex items-center h-12 max-w-screen-xl px-4 mx-auto space-x-1">
        <li className="inline-flex items-center">
          <Link href="/">
            <a className="underline">Components</a>
          </Link>
        </li>

        <li>&raquo;</li>

        <li>{collection.title}</li>
      </ol>
    </nav>
  )
}

export default Breadcrumbs
