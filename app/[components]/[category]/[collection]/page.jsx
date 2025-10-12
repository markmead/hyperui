import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import {
  getCollection,
  getComponents,
  formatSlug,
  flattenComponents,
  componentsDir,
} from '@service/database'

import MdxRemoteRender from '@component/MdxRemoteRender'
import RelatedComponents from '@component/RelatedComponents'

export async function generateStaticParams() {
  const categoryFolders = await fs.readdir(componentsDir)
  const staticParams = []

  for (const categoryFolder of categoryFolders) {
    const categoryPath = join(componentsDir, categoryFolder)
    const categoryStat = await fs.stat(categoryPath)

    if (!categoryStat.isDirectory()) {
      continue
    }

    const collectionFiles = await fs.readdir(categoryPath)

    for (const collectionFile of collectionFiles) {
      if (!collectionFile.endsWith('.mdx')) {
        continue
      }

      staticParams.push({
        category: categoryFolder,
        collection: formatSlug(collectionFile),
      })
    }
  }

  return staticParams
}

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

export default async function Page({ params }) {
  const { collectionData, collectionContent } = await getCollection(params)

  const flatComponents = flattenComponents(collectionData)

  const allComponents = await getComponents()

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Tailwind CSS ${collectionData.title} Components`,
    description: collectionData.description,
    url: `https://www.hyperui.dev/components/${params.category}/${params.collection}`,
    numberOfItems: flatComponents.length,
    itemListElement: flatComponents.map((componentItem, componentIndex) => ({
      '@type': 'ListItem',
      position: componentIndex + 1,
      name: componentItem.title,
      url: `https://www.hyperui.dev/components/${componentItem.category}/${componentItem.slug}#component-${componentItem.id}`,
    })),
  }

  return (
    <div id="mainContent" className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="prose prose-p:max-w-prose max-w-none">
        <MdxRemoteRender
          mdxSource={collectionContent}
          mdxScope={{ componentsData: flatComponents }}
        />
      </div>

      <RelatedComponents
        collectionId={collectionData.id}
        collectionTerms={collectionData.terms}
        componentItems={allComponents}
      />
    </div>
  )
}
