// groupedSavedCollections

import { FunctionComponent } from 'react'

import { currentCollection } from '../lib/collections'

import Example from './example'

type Props = {
  id: string
  components: Array<string>
}

const Collection: FunctionComponent<Props> = ({ id, components }) => {
  let collection = currentCollection(id)

  let collectionComponents = collection.components.filter((component) =>
    components.includes(component.id)
  )

  return (
    <div className="px-4 py-8 mx-auto max-w-[1380px] sm:py-16">
      <h2 className="text-xl font-bold sm:text-2xl">{collection?.title}</h2>

      <ul className="mt-8 space-y-8 lg:space-y-16">
        {collectionComponents.map((component) => {
          return (
            <Example
              key={component.id}
              component={component}
              parentSpacing={collection.spacing}
              collection={collection}
              target={`/components/${collection.title}`}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default Collection
