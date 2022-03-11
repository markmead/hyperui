import type { NextPage } from 'next'
import Head from 'next/head'

import { Collection } from '../../interface/collection'

import { collections } from '../../lib/collections'
import { getAllEcommerceExamples } from '../../lib/examples'

import Banner from '../../components/content/banner'
import Grid from '../../components/collection/grid'

export async function getStaticProps() {
  const examples = getAllEcommerceExamples(['title', 'slug', 'ecommerce'])

  return {
    props: {
      collections,
      examples,
    },
  }
}

type Props = {
  examples: Array<Collection>
}

const Ecommerce: NextPage<Props> = ({ examples }) => {
  let ecommerce = collections.filter(
    (collection: Collection) => collection.ecommerce
  )

  return (
    <>
      <Head>
        <title>
          Ecommerce | Free Open Source Tailwind CSS Components | HyperUI
        </title>

        <meta
          content="Free Tailwind CSS components that can be used in your ecommerce projects. Perfect for Shopify, WooCommerce, Magento, BigCommerce and more."
          key="description"
          name="description"
        />
      </Head>

      <Banner
        title="HyperUI Eccomerce"
        subtitle="Free Open Source Eccomerce Tailwind CSS Components"
      >
        Working on an ecommerce project? HyperUI has a evergrowing range of
        eccomerce Tailwind CSS components, that will help you build your next
        ecommerce website in Shopify, BigCommerce, Magento and more.
      </Banner>

      <div className="max-w-screen-xl px-4 py-8 mx-auto" id="componentGrid">
        <Grid
          blocks={examples}
          className="gap-4 sm:grid-cols-2 md:grid-cols-4"
        />
      </div>
    </>
  )
}

export default Ecommerce
