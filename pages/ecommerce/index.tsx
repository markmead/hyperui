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
      <Banner
        title="HyperUI Ecommerce"
        subtitle="Free Open Source Ecommerce Tailwind CSS Components"
      >
        Working on an ecommerce project? HyperUI has a growing range of
        ecommerce Tailwind CSS components, that will help you build your next
        ecommerce website in Shopify, BigCommerce, Magento and more.
      </Banner>

      <Grid items={components} />
    </>
  )
}

export default Ecommerce
