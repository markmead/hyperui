import type { NextPage } from 'next'

import Head from 'next/head'

import { ComponentCard } from '../../interface/component'

import { getEcommerceComponents } from '../../lib/components'

import Banner from '../../components/content/banner'
import Grid from '../../components/collection/grid'

export async function getStaticProps() {
  const components = getEcommerceComponents([
    'title',
    'slug',
    'ecommerce',
    'emoji',
    'count',
    'tags',
  ])

  return {
    props: {
      components,
    },
  }
}

type Props = {
  components: Array<ComponentCard>
}

const Ecommerce: NextPage<Props> = ({ components }) => {
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
        title="HyperUI Ecommerce"
        subtitle="Free Open Source Ecommerce Tailwind CSS Components"
      >
        Working on an ecommerce project? HyperUI has a growing range of
        ecommerce Tailwind CSS components, that will help you build your next
        ecommerce website in Shopify, BigCommerce, Magento and more.
      </Banner>

      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <Grid items={components} />
      </div>
    </>
  )
}

export default Ecommerce
