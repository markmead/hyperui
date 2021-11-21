import type { NextPage } from 'next'

import { Collection } from '../interface/collection'
import { collections } from '../lib/collections'

import Banner from '../components/banner'
import Grid from '../components/grid'

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
        subtitle="An Open Source Tailwind CSS Component Library"
        button={true}
        buttonText="Get Started"
        buttonLink="#componentGrid"
      />

      <div className="container py-8" id="componentGrid">
        <Grid
          className="gap-4 sm:grid-cols-2 md:grid-cols-4"
          blocks={collections}
        />
      </div>
    </>
  )
}

export default Home
