import type { NextPage } from 'next'

import Head from 'next/head'

import { Category } from '../../../interface/category'

import { getCategoryBySlug } from '../../../lib/categories'

import Banner from '../../../components/content/banner'
import Listing from '../../../components/category/listing'

export async function getStaticProps() {
  const marketingCategory = getCategoryBySlug('marketing', [
    'title',
    'slug',
    'collections',
  ])

  return {
    props: {
      marketingCategory,
    },
  }
}

type Props = {
  marketingCategory: Category
}

const Marketing: NextPage<Props> = ({ marketingCategory }) => {
  return (
    <>
      <Head>
        <title>
          Marketing | Free Open Source Tailwind CSS Components | HyperUI
        </title>

        <meta
          content="Free Tailwind CSS components that can be used in your ecommerce projects. Perfect for Shopify, WooCommerce, Magento, BigCommerce and more."
          key="description"
          name="description"
        />
      </Head>

      <Banner
        title="HyperUI Marketing"
        subtitle="Free Open Source Marketing Tailwind CSS Components"
      >
        Working on an ecommerce project? HyperUI has a growing range of
        ecommerce Tailwind CSS components, that will help you build your next
        ecommerce website in Shopify, BigCommerce, Magento and more.
      </Banner>

      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-16 sm:px-6 lg:px-8 sm:pb-24">
        <Listing
          title={marketingCategory.title}
          category={marketingCategory.slug}
          collections={marketingCategory.children}
        />
      </div>
    </>
  )
}

export default Marketing