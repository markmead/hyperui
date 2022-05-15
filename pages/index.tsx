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

      <section>
        <h2>Marketing Components</h2>
        <Grid items={componentsMarketing} />

        <h2>Ecommerce Components</h2>
        <Grid items={componentsEcommerce} />

        <h2>Application UI Components</h2>
        <Grid items={componentsApplication} />
      </section>
    </>
  )
}

export default Home
