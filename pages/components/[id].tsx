import type { NextPage } from 'next'
import Head from 'next/head'

import { Collection } from '../../interface/collection'
import { Component } from '../../interface/component'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ToastContext from '../../context/toast'

import Banner from '../../components/banner'
import Example from '../../components/example'

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
  let meta = {
    title: `${collection.title} Tailwind CSS Components | HyperUI`,
    description: `Range of ${collection.title} Tailwind CSS components.`,
  }

  let { spacing } = collection

  return (
    <ToastContext.Provider value={toast}>
      <>
        <Head>
          <title>{meta.title}</title>
          <meta property="og:title" content={meta.title} />
          <meta name="description" content={meta.description}></meta>
          <meta property="og:description" content={meta.description} />
        </Head>

        <div>
          <Banner
            title={collection.title}
            subtitle={`${collection.count} Components`}
            button={false}
          />

          <div className="container py-8 sm:py-16">
            <div className="flow-root">
              <ul className="-my-8 divide-y divide-gray-100 lg:-my-16">
                {components.map((component, index) => (
                  <Example
                    key={index}
                    component={component}
                    parentSpacing={spacing}
                    collection={collection.title}
                  />
                ))}
              </ul>
            </div>
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
      </>
    </ToastContext.Provider>
  )
}

export default Collection
