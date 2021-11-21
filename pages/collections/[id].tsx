import type { NextPage } from 'next'

// Interfaces
import { Collection } from '../../interface/collection'
import { Component } from '../../interface/component'

// Toast
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Context
import ToastContext from '../../context/toast'

// Components
import Banner from '../../components/banner'
import Example from '../../components/example'

// Libs
import { currentCollectionComponents } from '../../lib/components'
import { collectionIds, currentCollection } from '../../lib/collections'

export async function getStaticPaths() {
  let paths = collectionIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { id } }: Params) {
  let collection = currentCollection(id)
  let components = currentCollectionComponents(id)

  return {
    props: {
      collection,
      components,
    },
  }
}

type Params = {
  params: {
    id: string
  }
}

type Props = {
  collection: Collection
  components: Array<Component>
}

const Collection: NextPage<Props> = ({ collection, components }) => {
  let { spacing } = collection

  return (
    <ToastContext.Provider value={toast}>
      <div>
        <Banner
          title={collection.title}
          subtitle={`${collection.count} Components`}
          button={false}
        />

        <div className="container py-8 sm:py-16">
          <ul className="space-y-8 sm:space-y-16">
            {components.map((component, index) => (
              <Example
                key={index}
                component={component}
                parentSpacing={spacing}
              />
            ))}
          </ul>
        </div>

        <ToastContainer
          hideProgressBar
          limit={1}
          closeButton={false}
          draggable={false}
          position="bottom-center"
          theme="dark"
          className="text-center"
        />
      </div>
    </ToastContext.Provider>
  )
}

export default Collection
