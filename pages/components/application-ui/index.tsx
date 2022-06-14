import type { NextPage } from 'next'

import Head from 'next/head'

import { Category } from '../../../interface/category'

import { getCategoryBySlug } from '../../../lib/categories'

import Banner from '../../../components/content/banner'
import Listing from '../../../components/category/listing'

export async function getStaticProps() {
  const applicationCategory = getCategoryBySlug('application-ui', [
    'title',
    'slug',
    'collections',
  ])

  return {
    props: {
      applicationCategory,
    },
  }
}

type Props = {
  applicationCategory: Category
}

const Application: NextPage<Props> = ({ applicationCategory }) => {
  return (
    <>
      <Head>
        <title>
          Application UI | Free Open Source Tailwind CSS Components | HyperUI
        </title>

        <meta
          content="Free Tailwind CSS components that can be used in your application UI project. Perfect for a CMS, admin hub, ecommerce platform or any other project that needs a set of components."
          key="description"
          name="description"
        />
      </Head>

      <Banner
        title="Application UI"
        subtitle="Free Open Source Application UI Tailwind CSS Components"
      >
        Working on an CMS, ecommerce platform or admin hub? HyperUI has a
        growing range of application UI Tailwind CSS components, that will help
        you build an accessible, responsive application for your next project.
      </Banner>

      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-16 sm:px-6 lg:px-8 sm:pb-24">
        <Listing
          title={applicationCategory.title}
          category={applicationCategory.slug}
          collections={applicationCategory.children}
        />
      </div>
    </>
  )
}

export default Application
