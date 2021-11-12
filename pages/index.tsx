import type { NextPage } from 'next'

import Banner from '../components/banner'
import Grid from '../components/grid'

const Home: NextPage = () => {
  let blocks = [
    {
      title: 'What is this?',
      count: 4,
    },
    {
      title: 'How does it work?',
      count: 8,
    },
  ]

  return (
    <div>
      <Banner
        title="HyperUI"
        subtitle="An Open Source Tailwind CSS Component Library"
        button={true}
        buttonText="Get Started"
        buttonLink="/docs/getting-started"
      />

      <div className="container py-8">
        <Grid className="grid-cols-2 gap-4 sm:grid-cols-4" blocks={blocks} />
      </div>
    </div>
  )
}

export default Home
