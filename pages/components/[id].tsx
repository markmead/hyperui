import type { NextPage } from 'next'
import Head from 'next/head'

import { Collection } from '../../interface/collection'
import { Component } from '../../interface/component'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ToastContext from '../../context/toast'

import Breadcrumbs from '../../components/collection/breadcrumbs'
import Banner from '../../components/content/banner'
import Example from '../../components/component/example'

import {
  collectionIds,
  currentCollection,
  currentCollectionComponents,
} from '../../lib/collections'

export async function getStaticPaths() {
  let paths = collectionIds()

  return {
    fallback: false,
    paths,
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

  let perfectFor = collection.ecommerce
    ? 'Shopify, WooCommerce, Magento, BigCommerce'
    : 'Laravel, Rails, React, Vue'

  let metaDescription = `Free Tailwind CSS components for ${collection.title.toLowerCase()} that can be used in your next project. Perfect for ${perfectFor} and more`

  return (
    <ToastContext.Provider value={toast}>
      <>
        <Head>
          <title>
            {collection.title} | Free Open Source Tailwind CSS Components |
            HyperUI
          </title>

          <meta
            content={metaDescription}
            key="description"
            name="description"
          ></meta>
        </Head>

        <div>
          <Breadcrumbs collection={collection} />

          <Banner title={collection.title}>{collection.description}</Banner>

          <div className="px-4 py-8 mx-auto max-w-[1380px] sm:py-16">
            <ul className="space-y-8 lg:space-y-16">
              {components.map((component, index) => (
                <Example
                  collection={collection}
                  component={component}
                  key={index}
                  parentSpacing={spacing}
                />
              ))}
            </ul>
          </div>

          <ToastContainer
            className="text-center"
            closeButton={false}
            draggable={false}
            hideProgressBar
            limit={1}
            position="bottom-center"
            theme="dark"
          />
        </div>
      </>
    </ToastContext.Provider>
  )
}

export default Collection
