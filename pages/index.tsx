import type { NextPage } from 'next'

import { Category } from '../interface/category'

import { getCategoryBySlug } from '../lib/categories'

import Banner from '../components/content/banner'
import Listing from '../components/category/listing'

export async function getStaticProps() {
  const marketingCategory = getCategoryBySlug('marketing', [
    'title',
    'slug',
    'collections',
  ])

  const applicationCategory = getCategoryBySlug('application-ui', [
    'title',
    'slug',
    'collections',
  ])

  const ecommerceCategory = getCategoryBySlug('ecommerce', [
    'title',
    'slug',
    'collections',
  ])

  return {
    props: {
      marketingCategory,
      applicationCategory,
      ecommerceCategory,
    },
  }
}

type Props = {
  marketingCategory: Category
  applicationCategory: Category
  ecommerceCategory: Category
}

const Home: NextPage<Props> = ({
  marketingCategory,
  applicationCategory,
  ecommerceCategory,
}) => {
  return (
    <>
      <Banner title="Open Source Tailwind CSS Components" subtitle="HyperUI">
        HyperUI is an open source Tailwind CSS component library featuring over
        200+ components. As HyperUI is open source these components are free to
        use. It also means that you are welcome to create a pull request and add
        your own components 🥳.
      </Banner>

      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-16 sm:px-6 lg:px-8 sm:pb-24">
        <Listing
          title={marketingCategory.title}
          category={marketingCategory.slug}
          collections={marketingCategory.children}
        />

        <Listing
          title={applicationCategory.title}
          category={applicationCategory.slug}
          collections={applicationCategory.children}
        />

        <Listing
          title={ecommerceCategory.title}
          category={ecommerceCategory.slug}
          collections={ecommerceCategory.children}
        />
      </div>
    </>
  )
}

export default Home
