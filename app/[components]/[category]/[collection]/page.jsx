import { notFound } from 'next/navigation'

import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

import Ad from '@component/Ad'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'
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
    alternates: {
      canonical: `/components/${params.category}/${params.collection}`,
    },
  }
}

export async function generateStaticParams() {
  return await fs.readdir(componentsDirectory)
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

export default async function Page({ params }) {
  const { collectionData, collectionContent } = await getCollection(params)

  const componentsData = {
    componentsData: Object.entries(collectionData.components).flatMap(
      ([componentId, componentItem]) => {
        const { dark: isDark } = componentItem

        const newComponent = {
          id: componentId,
          title: componentItem.title,
          slug: collectionData.slug,
          category: collectionData.category,
          container: componentItem.container || collectionData.container || '',
          wrapper: componentItem.wrapper || collectionData.wrapper || 'h-[400px] lg:h-[600px]',
          creator: componentItem.creator || '',
          dark: false,
        }

        if (!isDark) {
          return newComponent
        }

        return [
          newComponent,
          {
            ...newComponent,
            id: `${componentId}-dark`,
            title: `${newComponent.title} (Dark)`,
            dark: true,
          },
        ]
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
