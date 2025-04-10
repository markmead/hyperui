import { notFound } from 'next/navigation'
import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

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
    title: `Tailwind CSS ${collectionData.title} | HyperUI`,
    description: collectionData.description,
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
    const categorySlug = params.category
    const componentSlug = params.collection

    const componentPath = join(componentsDirectory, categorySlug, `${componentSlug}.mdx`)
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
    componentsData: collectionData.components.flatMap((componentItem, componentIndex) => {
      const { dark: isDark } = componentItem

      const componentId = componentIndex + 1

      const newComponent = {
        id: componentId,
        title: componentItem.title,
        slug: collectionData.slug,
        category: collectionData.category,
        container: componentItem?.container || collectionData?.container || '',
        wrapper: componentItem?.wrapper || collectionData?.wrapper || 'h-[400px] lg:h-[600px]',
        creator: componentItem?.creator || 'markmead',
        plugins: componentItem?.plugins || [],
        dark: false,
      }

      if (!isDark) {
        return newComponent
      }

      // We create an array of two components, one light and one dark
      return [
        newComponent,
        {
          ...newComponent,
          id: `${componentId}-dark`,
          title: `${newComponent.title} (Dark)`,
          dark: true,
        },
      ]
    }),
  }

  return (
    <Container id="mainContent" classNames="py-8 lg:py-12 ">
      <div className="prose prose-p:max-w-prose prose-pre:rounded-3xl! max-w-none">
        <MdxRemoteRender
          mdxSource={collectionContent}
          mdxComponents={mdxComponents}
          mdxScope={componentsData}
        />
      </div>
    </Container>
  )
}
