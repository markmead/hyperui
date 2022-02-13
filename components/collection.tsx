// groupedSavedCollections

import { FunctionComponent, useEffect, useState } from 'react'

import { Component } from '../interface/component'
import { Collection } from '../interface/collection'
import { currentCollection } from '../lib/collections'

import Example from './example'

type Props = {
  id: string
  components: Array<string>
}

const Collection: FunctionComponent<Props> = ({ id, components }) => {
  let [collection, setCollection] = useState<Collection>()
  let [collectionComponents, setCollectionComponents] = useState<
    Array<Component>
  >([])

  useEffect(() => {
    let collection = currentCollection(id)

    if (collection) {
      setCollection(collection)

      setCollectionComponents(
        collection.components.filter((component: Component) => {
          return (components as any).includes(component.id)
        })
      )
    }
  }, [components])

  return (
    <>
      {collection && (
        <div className="px-4 py-8 mx-auto max-w-[1380px] sm:py-16">
          <h2 className="text-xl font-bold sm:text-2xl">{collection?.title}</h2>

          <ul className="mt-8 space-y-8 lg:space-y-16">
            {collectionComponents.map((component) => {
              if (component && collection) {
                return (
                  <Example
                    key={component.id}
                    component={component}
                    parentSpacing={collection?.spacing}
                    collection={collection}
                    target={`/components/${collection.id}`}
                  />
                )
              }
            })}
          </ul>
        </div>
      )}
    </>
  )
}

export default Collection
