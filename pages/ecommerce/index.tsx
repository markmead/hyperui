import type { NextPage } from 'next'
import Head from 'next/head'

import { Collection } from '../../interface/collection'
import { collections } from '../../lib/collections'

import Banner from '../../components/content/banner'
import Grid from '../../components/collection/grid'

export async function getStaticProps() {
  return {
    props: {
      collections,
    },
  }
}

const Ecommerce: NextPage = () => {
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
          name="description"
          content="Free Tailwind CSS components that can be used in your ecommerce projects. Perfect for Shopify, WooCommerce, Magento, BigCommerce and more."
          key="description"
        />
      </Head>

      <Banner
        title="HyperUI Ecommerce"
        subtitle="Tailwind CSS Components for Ecommerce Projects"
      />

      <div className="max-w-screen-xl px-4 py-8 mx-auto" id="componentGrid">
        <Grid
          className="gap-4 sm:grid-cols-2 md:grid-cols-4"
          blocks={ecommerce}
        />
      </div>
    </>
  )
}

export default Ecommerce
