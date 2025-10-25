import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { getCategory, componentsDir } from '@service/database'

import Hero from '@component/global/Hero'
import CollectionGrid from '@component/CollectionGrid'

export async function generateStaticParams() {
  const categoryFolders = await fs.readdir(componentsDir)
  const staticParams = []

  for (const categoryFolder of categoryFolders) {
    const categoryPath = join(componentsDir, categoryFolder)
    const categoryStat = await fs.stat(categoryPath)

    if (!categoryStat.isDirectory()) {
      continue
    }

    staticParams.push({ category: categoryFolder })
  }

  return staticParams
}

export async function generateMetadata({ params }) {
  const { categoryData } = await getCategory(params)

  return {
    title: `Tailwind CSS ${categoryData.title} Components | HyperUI`,
    description: categoryData.description,
    alternates: {
      canonical: `/components/${params.category}`,
    },
  }
}

export default async function Page({ params }) {
  const { categoryData, componentItems } = await getCategory(params)

  const categoryItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Tailwind CSS ${categoryData.title} Component Collections`,
    description: categoryData.description,
    url: `https://www.hyperui.dev/components/${params.category}`,
    numberOfItems: componentItems.length,
    itemListElement: componentItems.map((componentItem, componentIndex) => ({
      '@type': 'ListItem',
      position: componentIndex + 1,
      name: componentItem.title,
      url: `https://www.hyperui.dev/components/${componentItem.category}/${componentItem.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryItemListSchema) }}
      />

      <Hero title={categoryData.title} subtitle={categoryData.subtitle}>
        {categoryData.description}
      </Hero>

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
        <CollectionGrid componentItems={componentItems} />
      </div>
    </>
  )
}
