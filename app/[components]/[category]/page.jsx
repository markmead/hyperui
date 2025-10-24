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
  const { category: slug } = await params
  const { category } = await getCategory(slug)

  return {
    title: `Tailwind CSS ${category.title} Components | HyperUI`,
    description: category.description,
    alternates: {
      canonical: `/components/${slug}`,
    },
  }
}

export default async function Page({ params }) {
  const { category: slug } = await params
  const { category, components } = await getCategory(slug)

  const categoryItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Tailwind CSS ${category.title} Component Collections`,
    description: category.description,
    url: `https://www.hyperui.dev/components/${slug}`,
    numberOfItems: components.length,
    itemListElement: components.map((componentItem, componentIndex) => ({
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

      <Hero title={category.title} subtitle={category.subtitle}>
        {category.description}
      </Hero>

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
        <CollectionGrid componentItems={components} />
      </div>
    </>
  )
}
