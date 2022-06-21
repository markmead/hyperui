import type { NextPage } from 'next'

import Head from 'next/head'

import { collectionSlugs, getCollectionBySlug } from '../../../lib/collections'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Collection } from '../../../interface/collection'
import { ComponentCard } from '../../../interface/component'
import Card from '../../../components/collection/card'
import Banner from '../../../components/content/banner'

type Props = {
  source: any
  category: string
  collection: Collection
}

const Collection: NextPage<Props> = ({ source, category, collection }) => {
  return (
    <>
      <Banner title="Open Source Tailwind CSS Components" subtitle="HyperUI">
        HyperUI is an open source Tailwind CSS component library featuring over
        200+ components. As HyperUI is open source these components are free to
        use. It also means that you are welcome to create a pull request and add
        your own components 🥳.
      </Banner>

      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-16 sm:px-6 lg:px-8 sm:pb-24">
        <div className="prose max-w-none">
          <MDXRemote {...source} />
        </div>

        <div>
          <h2 className="font-medium">{collection.title}</h2>

          <p className="mt-1 text-gray-700 max-w-prose">
            {collection.description}
          </p>

          <ul className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 lg:grid-cols-5">
            {collection.children.map((component: ComponentCard) => (
              <Card
                key={component.title}
                item={component}
                category={category}
                collection={collection.slug}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

type Params = {
  params: {
    category: string
    collection: string
  }
}

export async function getStaticProps({
  params: { category, collection },
}: Params) {
  let realSlug = `${category}-${collection}`

  const source = fs.readFileSync(`data/collections/${realSlug}.mdx`)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  let collectionData = getCollectionBySlug(realSlug, [
    'title',
    'slug',
    'description',
    'components',
  ])

  return {
    props: {
      source: mdxSource,
      category: category,
      collection: collectionData,
    },
  }
}

export async function getStaticPaths() {
  const paths = collectionSlugs()

  return {
    paths,
    fallback: false,
  }
}

export default Collection
