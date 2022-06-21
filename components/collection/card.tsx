import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { ComponentCard } from '../../interface/component'
import { urlSlug } from '../../utils/slug'

type Props = {
  item: ComponentCard
  category: string
  collection: string
}

const Card: FunctionComponent<Props> = ({ item, category, collection }) => {
  const { title, slug, emoji, count, tags } = item

  let realCollectionSlug = urlSlug(collection, category)

  let realComponentSlug = urlSlug(slug, category)

  return (
    <Link
      href={`/components/${category}/${realCollectionSlug}/${realComponentSlug}`}
    >
      <a className="block p-4 border-2 border-black rounded-md hover:bg-black hover:text-white">
        {/* <Tags tags={tags} card={true} /> */}

        <h5 className="font-medium">{title}</h5>

        <p className="mt-1 text-sm leading-relaxed">{count} components</p>
      </a>
    </Link>
  )
}

export default Card
