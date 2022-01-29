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
  let meta = {
    title: 'Open Source Ecommerce Tailwind CSS Components | HyperUI',
    description: 'Ecommerce components for Tailwind CSS components.',
  }

  let ecommerce = collections.filter(
    (collection: Collection) => collection.ecommerce
  )

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta
          property="description"
          content={meta.description}
          key="description"
        />
        <meta property="og:title" content={meta.title} key="og:title" />
        <meta
          property="og:description"
          content={meta.description}
          key="og:description"
        />
        <meta
          property="twitter:title"
          content={meta.title}
          key="twitter:title"
        />
        <meta
          property="twitter:description"
          content={meta.description}
          key="twitter:description"
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
