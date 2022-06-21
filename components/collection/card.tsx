import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { ComponentCard } from '../../interface/component'

type Props = {
  item: ComponentCard
  category: string
  collection: string
}

const Card: FunctionComponent<Props> = ({ item, category, collection }) => {
  const { title, slug, emoji, count, tags } = item

  let realCollection = collection.replace(`${category}-`, '')
  let realSlug = slug.replace(`${category}-`, '')

  return (
    <Link href={`/components/${category}/${realCollection}/${realSlug}`}>
      <a className="block p-4 border-2 border-black rounded-md hover:bg-black hover:text-white">
        {/* <Tags tags={tags} card={true} /> */}

        <h5 className="font-medium">{title}</h5>

        <p className="mt-1 text-sm leading-relaxed">{count} components</p>
      </a>
    </Link>
  )
}

export default Card
