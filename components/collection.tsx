// groupedSavedCollections

import { FunctionComponent } from 'react'
import Example from './example'

type Props = {
  collection: string
  components: Array<string>
}

const Collection: FunctionComponent<Props> = ({ collection, components }) => {
  let newCollection = {
    title: collection,
    spacing: '',
    id: '',
    emoji: '',
    components: [],
    count: 0,
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-[1380px] sm:py-16">
      <h2 className="text-xl font-bold sm:text-2xl">{collection}</h2>

      <ul className="mt-8 space-y-8 lg:space-y-16">
        {components.map((component) => {
          let newComponent = {
            id: parseInt(component),
            title: component,
          }

          return (
            <Example
              key={component}
              component={newComponent}
              parentSpacing={newCollection.spacing}
              collection={newCollection}
              target={`/components/${newCollection.title}`}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default Collection
