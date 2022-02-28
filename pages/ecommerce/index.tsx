import type { NextPage } from 'next'
import Head from 'next/head'

import { Collection } from '../../interface/collection'
import { collections } from '../../lib/collections'

import Banner from '../../components/banner'
import Grid from '../../components/grid'

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
        <title>Open Source Ecommerce Tailwind CSS Components | HyperUI</title>
        <meta
          name="description"
          content="Ecommerce components built with Tailwind CSS."
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
