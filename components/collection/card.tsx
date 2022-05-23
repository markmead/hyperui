import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { ComponentCard } from '../../interface/component'

type Props = {
  item: ComponentCard
}

const Card: FunctionComponent<Props> = ({ item }) => {
  const {
    title,
    slug,
    emoji,
    count,
    unreleased = false,
    updated = false,
  } = item

  return (
    <Link href={`/components/${slug}`}>
      <a
        className={`relative block group ${
          unreleased && 'pointer-events-none opacity-50'
        }`}
      >
        <span
          className="absolute inset-0 border-2 border-black border-dashed rounded-lg"
          aria-hidden="true"
        ></span>

        {updated && <span>New</span>}

        <div className="transition bg-white border-2 border-black rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-6">
            <span className="text-xl" role="img" aria-hidden="true">
              {emoji}
            </span>

            <p className="mt-4 text-lg font-medium">{title}</p>

            <p className="mt-1 text-xs">
              {unreleased ? (
                <span>Coming Soon</span>
              ) : (
                <span>
                  {count} {count > 1 ? ' components' : ' component'}
                </span>
              )}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
