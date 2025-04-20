import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { getCollection, formatSlug } from '@util/db'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'
import CollectionList from '@component/CollectionList'

const mdxComponents = {
  CollectionList,
}

const componentsDirectory = join(process.cwd(), '/src/data/components')

export const dynamic = 'force-static'

export async function generateStaticParams() {
  let staticParams = []

  const categoryFolders = await fs.readdir(componentsDirectory)

  for (const categoryFolder of categoryFolders) {
    const categoryPath = join(componentsDirectory, categoryFolder)
    const categoryStat = await fs.stat(categoryPath)

    if (!categoryStat.isDirectory()) {
      continue
    }

    const collectionFiles = await fs.readdir(categoryPath)

    for (const collectionFile of collectionFiles) {
      if (!collectionFile.endsWith('.mdx')) {
        continue
      }

      staticParams = [
        ...staticParams,
        {
          category: categoryFolder,
          collection: formatSlug(collectionFile),
        },
      ]
    }
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const mdxSource = await getCollection(params)

  return {
    title: `Tailwind CSS ${mdxSource.frontmatter.title} | HyperUI`,
    description: mdxSource.frontmatter.description,
    alternates: {
      canonical: `/components/${params.category}/${params.collection}`,
    },
  }
}

export default async function Page({ params }) {
  const mdxSource = await getCollection(params)

  const flatComponents = mdxSource.frontmatter.components.flatMap(
    (componentItem, componentIndex) => {
      const {
        title,
        container: componentContainer,
        wrapper: componentWrapper,
        creator: componentCreator,
        plugins: componentPlugins,
        dark: isDark,
      } = componentItem

      const {
        category,
        container: collectionContainer,
        wrapper: collectionWrapper,
      } = mdxSource.frontmatter

      const componentId = componentIndex + 1

      const newComponent = {
        id: componentId,
        title,
        slug: mdxSource.slug,
        category,
        container: componentContainer ?? collectionContainer ?? '',
        wrapper: componentWrapper ?? collectionWrapper ?? 'h-[400px] lg:h-[600px]',
        creator: componentCreator ?? 'markmead',
        plugins: componentPlugins ?? [],
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
  )

  return (
    <Container id="mainContent" classNames="py-8 lg:py-12 ">
      <div className="prose prose-p:max-w-prose prose-pre:rounded-3xl! max-w-none">
        <MdxRemoteRender
          mdxSource={mdxSource}
          mdxComponents={mdxComponents}
          mdxScope={{ componentsData: flatComponents }}
        />
      </div>
    </Container>
  )
}
