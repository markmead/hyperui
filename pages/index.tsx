import type { NextPage } from 'next'

import { Collection } from '../interface/collection'
import { collections } from '../lib/collections'

import Banner from '../components/banner'
import Grid from '../components/grid'
import Header from '../components/header'

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
    <div>
      <Header />

      <Banner
        title="HyperUI"
        subtitle="An Open Source Tailwind CSS Component Library"
        button={true}
        buttonText="Get Started"
        buttonLink="/docs/getting-started"
      />

      <div className="container py-8">
        <Grid
          className="grid-cols-2 gap-4 sm:grid-cols-4"
          blocks={collections}
        />
      </div>
    </div>
  )
}

export default Home
