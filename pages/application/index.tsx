import type { NextPage } from 'next'

import Head from 'next/head'

import { ComponentCard } from '../../interface/component'

import { getApplicationComponents } from '../../lib/components'

import Banner from '../../components/content/banner'
import Grid from '../../components/collection/grid'

export async function getStaticProps() {
  const components = getApplicationComponents([
    'title',
    'slug',
    'application',
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

const Application: NextPage<Props> = ({ components }) => {
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

      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <Grid items={components} />
      </div>
    </>
  )
}

export default Application
