import { notFound } from 'next/navigation'

import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'
import CollectionLinks from '@component/CollectionLinks'
import CollectionList from '@component/CollectionList'

const mdxComponents = {
  CollectionList,
}

const componentsDirectory = join(process.cwd(), '/src/data/components')

export async function generateMetadata({ params }) {
  const { collectionData } = await getCollection(params)

  return {
    title: `Tailwind CSS ${collectionData.seo.title} | HyperUI`,
    description: collectionData.seo.description,
    openGraph: {
      title: `Tailwind CSS ${collectionData.seo.title} | HyperUI`,
      description: collectionData.seo.description,
      ...ogMeta,
    },
    twitter: {
      title: `Tailwind CSS ${collectionData.seo.title} | HyperUI`,
      description: collectionData.seo.description,
      ...twitterMeta,
    },
  }
}

export async function generateStaticParams() {
  return await fs.readdir(componentsDirectory)
}

async function getCollection(params) {
  try {
    const componentPath = join(componentsDirectory, `${params.category}-${params.collection}.mdx`)

    const postItem = await fs.readFile(componentPath, 'utf-8')

    const { content, data: frontmatter } = matter(postItem)

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      scope: frontmatter,
    })

    return {
      collectionData: {
        ...frontmatter,
        slug: params.collection,
      },
      collectionContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page({ params }) {
  const { collectionData, collectionContent } = await getCollection(params)

  const componentsData = {
    componentContainer: collectionData.container || '',
    componentsData: Object.entries(collectionData.components).map(
      ([componentId, componentItem]) => {
        return {
          id: componentId,
          title: componentItem.title,
          slug: collectionData.slug,
          category: collectionData.category,
          container: componentItem.container || '',
          creator: componentItem.creator || '',
          dark: !!componentItem.dark,
          interactive: !!componentItem.interactive,
        }
      }
    ),
  }

  return (
    <Container classNames="py-8 lg:py-12 space-y-8 lg:space-y-12">
      <CollectionLinks activeCollection={params.collection} activeCategory={params.category} />

      <div className="prose max-w-none">
        <MdxRemoteRender
          mdxSource={collectionContent}
          mdxComponents={mdxComponents}
          mdxScope={componentsData}
        />
      </div>
    </Container>
  )
}
