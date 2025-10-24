import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { getCollection, getComponents, componentsDir } from '@service/database'
import { formatSlug, flattenComponents } from '@service/database/helpers'

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
  const { frontmatter } = await getCollection(params.category, params.collection)

  return {
    title: `Tailwind CSS ${frontmatter.title} | HyperUI`,
    description: frontmatter.description,
    alternates: {
      canonical: `/components/${params.category}/${params.collection}`,
    },
  }
}

export default async function Page({ params }) {
  const collectionData = await getCollection(params.category, params.collection)

  const { id, slug, frontmatter } = collectionData

  const flatComponents = flattenComponents(id, slug, frontmatter)

  const allComponents = await getComponents()

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Tailwind CSS ${frontmatter.title} Components`,
    description: frontmatter.description,
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
        <MdxRemoteRender mdxSource={collectionData} mdxScope={{ componentsData: flatComponents }} />
      </div>

      <RelatedComponents
        collectionId={id}
        collectionTerms={frontmatter.terms}
        componentItems={allComponents}
      />
    </div>
  )
}
