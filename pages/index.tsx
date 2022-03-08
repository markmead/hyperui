import type { NextPage } from 'next'

import { Collection } from '../interface/collection'
import { collections } from '../lib/collections'

import Banner from '../components/content/banner'
import Grid from '../components/collection/grid'

export async function getStaticProps() {
  return {
    props: {
      collections,
    },
  }
}

type Props = {
  collections: Array<Collection>
}

const Home: NextPage<Props> = ({ collections }) => {
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
        <Grid
          blocks={collections}
          className="gap-4 sm:grid-cols-2 md:grid-cols-4"
        />
      </div>
    </>
  )
}

export default Home
