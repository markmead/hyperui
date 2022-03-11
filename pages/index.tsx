import type { NextPage } from 'next'

import Banner from '../components/content/banner'
import Grid from '../components/collection/grid'

import { getComponents } from '../lib/components'

export async function getStaticProps() {
  const components = getComponents(['title', 'slug', 'emoji', 'components'])

  return {
    props: {
      components,
    },
  }
}

type Props = {
  components: Array<{}>
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

      <div className="max-w-screen-xl px-4 py-8 mx-auto" id="componentGrid">
        <Grid items={components} />
      </div>
    </>
  )
}

export default Home
