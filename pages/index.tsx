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
    'updated',
    'latest',
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

      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-bold sm:text-xl">Marketing Components</h2>

          <Grid items={componentsMarketing} />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold sm:text-xl">Ecommerce Components</h2>

          <Grid items={componentsEcommerce} />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold sm:text-xl">
            Application UI Components
          </h2>

          <Grid items={componentsApplication} />
        </div>
      </div>
    </>
  )
}

export default Home
