import { notFound } from 'next/navigation'

import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

import { ogMeta, twitterMeta } from '@data/metadata'

import Ad from '@component/Ad'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'
import CollectionList from '@component/CollectionList'

const mdxComponents = {
  CollectionList,
}

const componentsDirectory = join(process.cwd(), '/src/data/components')

export async function generateMetadata(props) {
  const params = await props.params
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

async function getCollection(params) {
  try {
    const componentPath = join(componentsDirectory, `${params.category}-${params.collection}.mdx`)
    const componentItem = await fs.readFile(componentPath, 'utf-8')

    const mdxSource = await serialize(componentItem, {
      parseFrontmatter: true,
    })

    return {
      collectionData: {
        ...mdxSource.frontmatter,
        slug: params.collection,
      },
      collectionContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page(props) {
  const params = await props.params
  const { collectionData, collectionContent } = await getCollection(params)

  const componentsData = {
    componentContainer: {
      previewInner: collectionData.container || '',
      previewHeight: collectionData.wrapper || '',
    },
    componentsData: Object.entries(collectionData.components).map(
      ([componentId, componentItem]) => {
        return {
          id: componentId,
          title: componentItem.title,
          slug: collectionData.slug,
          category: collectionData.category,
          container: componentItem.container || '',
          wrapper: componentItem.wrapper || '',
          creator: componentItem.creator || '',
          dark: !!componentItem.dark,
          interactive: !!componentItem.interactive,
        }
      }
    ),
  }

  return (
    <Container id="mainContent" classNames="py-8 lg:py-12 space-y-8">
      <Ad />

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
