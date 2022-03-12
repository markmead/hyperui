import type { NextPage } from 'next'

import { ComponentCard } from '../interface/component'

import { getComponents } from '../lib/components'

import Banner from '../components/content/banner'
import Grid from '../components/collection/grid'

export async function getStaticProps() {
  const components = getComponents(['title', 'slug', 'emoji', 'count'])

  return {
    props: {
      components,
    },
  }
}

type Props = {
  components: Array<ComponentCard>
}

const Home: NextPage<Props> = ({ components }) => {
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

      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <Grid items={components} />
      </div>
    </>
  )
}

export default Home
