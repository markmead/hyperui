import Head from 'next/head'

import { getChangelogs } from '@/services/api/changelogs'
import { ChangelogCard } from '@/interface/changelog'

import Banner from '@/components/HeroBanner'
import Card from '@/components/ChangelogCard'

type Props = {
  changelogPosts: Array<ChangelogCard>
}

function ChangelogIndex({ changelogPosts }: Props) {
  return (
    <>
      <Head>
        <title>Project Changelog | HyperUI</title>

        {/* <meta
          content="Read the HyperUI blog for tips and tricks on using Tailwind CSS in your projects."
          name="description"
          key="description"
        /> */}
      </Head>

      <Banner
        title="HyperUI Changelog"
        subtitle="Changelog Entries for HyperUI"
      >
        Find out what changes have been made to HyperUI throughout the month, as
        well as new features and ones that have been deleted.
      </Banner>

      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {changelogPosts.map((changelogPost) => (
            <li key={changelogPost.slug}>
              <Card changelogPost={changelogPost} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const changelogPosts = getChangelogs(['title', 'slug', 'description', 'date'])

  return {
    props: { changelogPosts },
  }
}

export default ChangelogIndex
