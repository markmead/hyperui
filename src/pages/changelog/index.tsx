import Head from 'next/head'
import Link from 'next/link'

import { getChangelogs } from '@/services/api/changelogs'
import { ChangelogCard } from '@/interface/changelog'

import Banner from '@/components/HeroBanner'

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
        subtitle="Project Updates and Changelog"
      >
        Learn Tailwind CSS tips and tricks that you can use in your work to help
        write cleaner, more maintainable code and help you be more productive.
      </Banner>

      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <ul className="list-disc space-y-8">
          {changelogPosts.map((changelogPost) => (
            <li key={changelogPost.slug}>
              <Link
                href="/changelog/[slug]"
                as={`/changelog/${changelogPost.slug}`}
              >
                <a title={`HyperUI Changelog ${changelogPost.title}`}>
                  <h2>{changelogPost.title}</h2>

                  <p>{changelogPost.description}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const changelogPosts = getChangelogs(['title', 'slug', 'description'])

  return {
    props: { changelogPosts },
  }
}

export default ChangelogIndex
