import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { ComponentCard } from '../../interface/component'

type Props = {
  item: ComponentCard
}

const Card: FunctionComponent<Props> = ({ item }) => {
  const { title, slug, emoji, count, latest, updated } = item

  return (
    <Link href={`/components/${slug}`}>
      <a className="relative block group">
        <span
          className="absolute inset-0 border-2 border-black border-dashed rounded-lg"
          aria-hidden="true"
        ></span>

        <div className="transition bg-white border-2 border-black rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <span className="text-xl" role="img" aria-hidden="true">
                {emoji}
              </span>

              <div className="flex gap-1.5 -mt-3 -mr-3">
                {latest && (
                  <span className="text-[10px] text-white bg-black rounded py-1 px-3">
                    New
                  </span>
                )}

                {updated && (
                  <span className="text-[10px] text-white bg-black rounded py-1 px-3">
                    Updated
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-lg font-medium">{title}</p>

            <p className="mt-1 text-xs">
              {count} {count > 1 ? ' components' : ' component'}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
