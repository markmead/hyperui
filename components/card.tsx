import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { ComponentCard } from '../interface/component'

type Props = {
  item: ComponentCard
}

const Card: FunctionComponent<Props> = ({ item }) => {
  const { title, slug, emoji, components } = item

  const count: number = Object.keys(components).length

  return (
    <Link href={`/components/${slug}`}>
      <a className="p-6 border-2 border-black hover:bg-black rounded-xl hover:text-white">
        <span className="text-xl" role="img" aria-hidden="true">
          {emoji}
        </span>

        <p className="mt-4 text-lg font-medium">{title}</p>

        <p className="mt-1 text-xs">
          {count} {count > 1 ? ' components' : ' component'}
        </p>
      </a>
    </Link>
  )
}

export default Card
