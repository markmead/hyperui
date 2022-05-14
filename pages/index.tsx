import type { NextPage } from 'next'

import { ComponentCard } from '../interface/component'

import {
  getMarketingComponents,
  getEcommerceComponents,
  getApplicationComponents,
} from '../lib/components'

import Banner from '../components/content/banner'
import Grid from '../components/collection/grid'

export async function getStaticProps() {
  const componentData = [
    'title',
    'slug',
    'emoji',
    'count',
    'ecommerce',
    'application',
  ]
  const componentsMarketing = getMarketingComponents(componentData)
  const componentsEcommerce = getEcommerceComponents(componentData)
  const componentsApplication = getApplicationComponents(componentData)

  return {
    props: {
      componentsMarketing,
      componentsEcommerce,
      componentsApplication,
    },
  }
}

type Props = {
  componentsMarketing: Array<ComponentCard>
  componentsEcommerce: Array<ComponentCard>
  componentsApplication: Array<ComponentCard>
}

const Home: NextPage<Props> = ({
  componentsMarketing,
  componentsEcommerce,
  componentsApplication,
}) => {
  return (
    <>
      <Banner
        title="HyperUI"
        subtitle="Free Open Source Tailwind CSS Components"
      >
        HyperUI is a collection of free Tailwind CSS components that can be used
        in your next project. With a range of components, you can build your
        next marketing website, admin dashboard, ecommerce store and much more.
      </Banner>

      <section className="relative">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-24 sm:py-16 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              Marketing Components
            </h2>

            <Grid items={componentsMarketing} />
          </div>

          <div className="pt-24 space-y-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold md:text-3xl">
              Ecommerce Components
            </h2>

            <Grid items={componentsEcommerce} />
          </div>

          <div className="pt-24 space-y-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold md:text-3xl">
              Application UI Components
            </h2>

            <Grid items={componentsApplication} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
