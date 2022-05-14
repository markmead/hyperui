import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { ComponentCard } from '../../interface/component'

type Props = {
  item: ComponentCard
}

const Card: FunctionComponent<Props> = ({ item }) => {
  const { title, slug, emoji, count } = item

  return (
    <Link href={`/components/${slug}`}>
      <a className="flex px-6 py-4 transition border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-sm">
        <span className="text-2xl" role="img" aria-hidden="true">
          {emoji}
        </span>

        <div className="ml-4">
          <strong className="md:text-lg">{title}</strong>

          <p className="mt-1 text-sm">
            {count} {count > 1 ? ' components' : ' component'}
          </p>
        </div>
      </a>
    </Link>
  )
}

export default Card
