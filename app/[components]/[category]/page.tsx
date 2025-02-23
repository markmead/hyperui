import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { use } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'

import CollectionGrid from '@component/CollectionGrid'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import { PageCategory } from '@type/page'
import { PageMeta } from '@type/site'
import { CategoryItem, CollectionItem } from '@type/component'

type Params = Promise<{ category: string }>

interface CollectionData
  extends Omit<CollectionItem, 'container' | 'wrapper' | 'seo' | 'components'> {
  slug: string
  count: number
}

interface PageData {
  categoryData: CategoryItem
  componentItems: CollectionData[]
}

export async function generateMetadata(props: { params: Params }): Promise<PageMeta> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = use(props.params)

  const { categoryData }: Awaited<{ categoryData: PageCategory }> = await getCategory(params)

  return {
    title: `Tailwind CSS ${categoryData.title} Components | HyperUI`,
    description: categoryData.description,
    alternates: {
      canonical: `/components/${params.category}`,
    },
  }
}

async function getCategory(params: { category: string }): Promise<PageData> {
  try {
    const componentsPath: string = join(process.cwd(), '/src/data/components')
    const categoriesPath: string = join(process.cwd(), '/src/data/categories')

    const categorySlug: string = params.category
    const categoryPath: string = join(categoriesPath, `${categorySlug}.mdx`)

    const componentSlugs: Awaited<string[]> = await fs.readdir(componentsPath)
    const categoryItem: Awaited<string> = await fs.readFile(categoryPath, 'utf-8')

    const { frontmatter: categoryData }: Awaited<{ frontmatter: CategoryItem }> = await serialize(
      categoryItem,
      { parseFrontmatter: true }
    )

    const componentItems: Awaited<CollectionData[]> = await Promise.all(
      componentSlugs
        .filter((componentSlug) => componentSlug.includes(categorySlug))
        .map(async (componentSlug) => {
          const componentPath: string = join(componentsPath, componentSlug)
          const componentItem: Awaited<string> = await fs.readFile(componentPath, 'utf-8')

          const { frontmatter: componentData }: Awaited<{ frontmatter: CollectionItem }> =
            await serialize(componentItem, { parseFrontmatter: true })

          const componentSlugFormatted: string = componentSlug.replace('.mdx', '')
          const componentSlugTrue: string = componentSlugFormatted.replace(`${categorySlug}-`, '')
          const componentCount: number = Object.values(componentData.components).length

          return {
            title: componentData.title,
            slug: componentSlugTrue,
            category: componentData.category,
            emoji: componentData.emoji,
            count: componentCount,
            tag: componentData.tag,
            id: componentSlugFormatted,
          }
        })
    )

    componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

    return {
      categoryData,
      componentItems,
    }
  } catch {
    notFound()
  }
}

export default async function Page(props: { params: Params }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = use(props.params)

  const { categoryData, componentItems }: Awaited<PageData> = await getCategory(params)

  return (
    <>
      <HeroBanner title={categoryData.title} subtitle={categoryData.subtitle}>
        {categoryData.description}
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12 space-y-8">
        <CollectionGrid componentItems={componentItems} />
      </Container>
    </>
  )
}
