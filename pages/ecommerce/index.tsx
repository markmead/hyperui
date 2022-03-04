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
          content="Free Tailwind CSS components that can be used in your ecommerce projects. Perfect for Shopify, WooCommerce, Magento, BigCommerce and more."
          key="description"
          name="description"
        />
      </Head>

      <Banner
        subtitle="Tailwind CSS Components for Ecommerce Projects"
        title="HyperUI Ecommerce"
      />

      <div className="max-w-screen-xl px-4 py-8 mx-auto" id="componentGrid">
        <Grid
          blocks={ecommerce}
          className="gap-4 sm:grid-cols-2 md:grid-cols-4"
        />
      </div>
    </>
  )
}

export default Ecommerce
