import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Collection } from '../../interface/collection'
import { ComponentCard } from '../../interface/component'

import Card from '../collection/card'

type Props = {
  title: string
  category: string
  collections: Array<Collection>
}

const Listing: FunctionComponent<Props> = ({
  title,
  category,
  collections,
}) => {
  return (
    <div>
      <h2 className="text-xl font-medium">
        <Link href={`/components/${category}`}>{title}</Link>
      </h2>

      <div className="mt-4 space-y-8">
        {collections.map((collection: Collection) => {
          return (
            <div key={collection.title}>
              <h2 className="font-medium">
                <Link href={`/components/${category}/${collection.slug}`}>
                  {collection.title}
                </Link>
              </h2>

              <p className="mt-1 text-gray-700 max-w-prose">
                {collection.description}
              </p>

              <ul className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 lg:grid-cols-5">
                {collection.children.map((component: ComponentCard) => (
                  <Card
                    key={component.title}
                    item={component}
                    category={category}
                    collection={collection.slug}
                  />
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Listing
